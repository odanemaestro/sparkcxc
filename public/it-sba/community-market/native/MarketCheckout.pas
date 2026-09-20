{ SPARK REFERENCE - DO NOT SUBMIT AS YOUR OWN SBA }
{ Use this fictional project to study program structure and testing. }

program MarketCheckout;
var
  i, customerCount: integer;
  customerName: string;
  subtotal, discount, taxableAmount, gct, finalAmount, totalSales: real;
begin
  totalSales := 0;
  write('Number of customers: '); readln(customerCount);
  for i := 1 to customerCount do
  begin
    write('Customer name: '); readln(customerName);
    write('Subtotal: '); readln(subtotal);
    if subtotal >= 10000 then discount := subtotal * 0.05 else discount := 0;
    taxableAmount := subtotal - discount;
    gct := taxableAmount * 0.15;
    finalAmount := taxableAmount + gct;
    totalSales := totalSales + finalAmount;
    writeln(customerName, ' pays ', finalAmount:0:2);
  end;
  writeln('Total sales: ', totalSales:0:2);
end.
