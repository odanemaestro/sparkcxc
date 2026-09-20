{ SPARK REFERENCE - DO NOT SUBMIT AS YOUR OWN SBA }
{ Use this fictional project to study program structure and testing. }

program LibraryFines;
var
  i, recordCount, daysLate: integer;
  memberName, memberType: string;
  fine, totalFines: real;
begin
  totalFines := 0;
  write('Number of records: '); readln(recordCount);
  for i := 1 to recordCount do
  begin
    write('Member name: '); readln(memberName);
    write('Days late: '); readln(daysLate);
    write('Member type: '); readln(memberType);
    fine := daysLate * 100;
    if memberType = 'STUDENT' then fine := fine * 0.75;
    totalFines := totalFines + fine;
    writeln(memberName, ' fine: ', fine:0:2);
  end;
  writeln('Total fines: ', totalFines:0:2);
end.
