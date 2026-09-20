{ SPARK REFERENCE - DO NOT SUBMIT AS YOUR OWN SBA }
{ Use this fictional project to study program structure and testing. }

program MedicalBalances;
var
  i, visitCount, age: integer;
  patientName, serviceCode: string;
  serviceFee, amountPaid, discount, balance, totalBalance: real;
begin
  totalBalance := 0;
  write('Number of visits: '); readln(visitCount);
  for i := 1 to visitCount do
  begin
    write('Patient name: '); readln(patientName);
    write('Age: '); readln(age);
    write('Service code: '); readln(serviceCode);
    write('Amount paid: '); readln(amountPaid);
    if serviceCode = 'GEN' then serviceFee := 6500
    else if serviceCode = 'WEL' then serviceFee := 8500
    else serviceFee := 12000;
    if age >= 65 then discount := serviceFee * 0.05 else discount := 0;
    balance := serviceFee - discount - amountPaid;
    totalBalance := totalBalance + balance;
    writeln(patientName, ' balance: ', balance:0:2);
  end;
  writeln('Combined balance: ', totalBalance:0:2);
end.
