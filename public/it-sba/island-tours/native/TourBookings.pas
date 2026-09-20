{ SPARK REFERENCE - DO NOT SUBMIT AS YOUR OWN SBA }
{ Use this fictional project to study program structure and testing. }

program TourBookings;
var
  i, bookingCount, adults, children: integer;
  customerName, packageCode: string;
  adultRate, childRate, amountPaid, cost, discount, finalCost, balance, totalValue: real;
begin
  totalValue := 0;
  write('Number of bookings: '); readln(bookingCount);
  for i := 1 to bookingCount do
  begin
    write('Customer name: '); readln(customerName);
    write('Package code: '); readln(packageCode);
    write('Adults: '); readln(adults);
    write('Children: '); readln(children);
    write('Amount paid: '); readln(amountPaid);
    if packageCode = 'CUL' then begin adultRate := 6000; childRate := 2500; end
    else if packageCode = 'ADV' then begin adultRate := 7000; childRate := 4000; end
    else begin adultRate := 7000; childRate := 3000; end;
    cost := (adults * adultRate) + (children * childRate);
    if adults + children >= 5 then discount := cost * 0.08 else discount := 0;
    finalCost := cost - discount;
    balance := finalCost - amountPaid;
    totalValue := totalValue + finalCost;
    writeln(customerName, ' balance: ', balance:0:2);
  end;
  writeln('Total booking value: ', totalValue:0:2);
end.
