
create or replace function create_booking(
  p_worker_id uuid,
  p_category_id uuid,
  p_scheduled_time timestamptz,
  p_address text,
  p_hours numeric default 1
)
returns bookings
language plpgsql
security definer
as $$
declare
  v_customer_id uuid;
  v_society_id uuid;
  v_rate numeric;
  v_visit_charge numeric;
  v_price numeric;
  v_booking bookings;
begin
  select id into v_customer_id from customers where user_id = (select app_user_id from current_app_user());
  if v_customer_id is null then
    raise exception 'Only customers can create bookings';
  end if;

  select society_id into v_society_id from workers where id = p_worker_id;
  select hourly_rate, visit_charge into v_rate, v_visit_charge
    from worker_services where worker_id = p_worker_id and category_id = p_category_id;

  if v_rate is null then
    raise exception 'This worker does not offer that service category';
  end if;

  v_price := (v_rate * p_hours) + coalesce(v_visit_charge, 0);

  insert into bookings (customer_id, worker_id, society_id, category_id, status, scheduled_time, address, price_total)
  values (v_customer_id, p_worker_id, v_society_id, p_category_id, 'pending', p_scheduled_time, p_address, v_price)
  returning * into v_booking;

  return v_booking;
end;
$$;

create or replace function update_booking_status(
  p_booking_id uuid,
  p_new_status booking_status
)
returns bookings
language plpgsql
security definer
as $$
declare
  v_booking bookings;
  v_caller_role user_role;
  v_caller_user_id uuid;
  v_pay_id uuid;
  v_worker_amt numeric;
  v_welfare_amt numeric;
  v_society_amt numeric;
  v_federation_amt numeric;
  v_running_balance numeric;
begin
  select app_user_id, role into v_caller_user_id, v_caller_role from current_app_user();
  select * into v_booking from bookings where id = p_booking_id;

  if v_booking is null then
    raise exception 'Booking not found';
  end if;

 
  if p_new_status in ('accepted', 'in_progress', 'completed') then
    if v_caller_user_id is distinct from (select user_id from workers where id = v_booking.worker_id) then
      raise exception 'Only the assigned worker can set this status';
    end if;
  elsif p_new_status = 'cancelled' then
    if v_caller_user_id is distinct from (select user_id from customers where id = v_booking.customer_id) then
      raise exception 'Only the customer can cancel';
    end if;
  end if;

  update bookings set status = p_new_status, updated_at = now() where id = p_booking_id
    returning * into v_booking;

  if p_new_status = 'completed' then
    v_pay_id := gen_random_uuid();
    v_worker_amt := round(v_booking.price_total * 0.80, 2);
    v_welfare_amt := round(v_booking.price_total * 0.10, 2);
    v_society_amt := round(v_booking.price_total * 0.05, 2);
    v_federation_amt := round(v_booking.price_total * 0.05, 2);

    insert into payments (id, booking_id, amount, status) values (v_pay_id, v_booking.id, v_booking.price_total, 'paid');
    insert into payment_splits (payment_id, worker_amount, welfare_amount, society_amount, federation_amount)
      values (v_pay_id, v_worker_amt, v_welfare_amt, v_society_amt, v_federation_amt);

    select coalesce(sum(amount), 0) into v_running_balance from welfare_ledger where worker_id = v_booking.worker_id;
    v_running_balance := v_running_balance + v_welfare_amt;
    insert into welfare_ledger (worker_id, booking_id, amount, balance_after)
      values (v_booking.worker_id, v_booking.id, v_welfare_amt, v_running_balance);

    update workers set jobs_this_week = jobs_this_week + 1 where id = v_booking.worker_id;
  end if;

  return v_booking;
end;
$$;


create or replace function next_recommended_worker(
  p_category_id uuid,
  p_society_id uuid
)
returns workers
language sql
stable
as $$
  select w.*
  from workers w
  join worker_services ws on ws.worker_id = w.id
  where ws.category_id = p_category_id
    and w.society_id = p_society_id
    and w.jobs_this_week < w.daily_job_cap
  order by w.jobs_this_week asc, w.rating_avg desc
  limit 1;
$$;

