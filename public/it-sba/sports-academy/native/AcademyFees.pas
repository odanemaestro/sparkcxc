{ SPARK REFERENCE - DO NOT SUBMIT AS YOUR OWN SBA }
{ Use this fictional project to study program structure and testing. }

program AcademyFees;
var
  i, athleteCount, age: integer;
  athleteName, programmeCode: string;
  monthlyFee, termFee, discount, finalFee, grandTotal: real;
begin
  grandTotal := 0;
  write('Number of athletes: '); readln(athleteCount);
  for i := 1 to athleteCount do
  begin
    write('Athlete name: '); readln(athleteName);
    write('Age: '); readln(age);
    write('Programme code: '); readln(programmeCode);
    if programmeCode = 'SWM' then monthlyFee := 9000
    else if programmeCode = 'FTB' then monthlyFee := 7500
    else if programmeCode = 'NET' then monthlyFee := 7000
    else monthlyFee := 8000;
    termFee := monthlyFee * 3;
    if age < 13 then discount := termFee * 0.10 else discount := 0;
    finalFee := termFee - discount;
    grandTotal := grandTotal + finalFee;
    writeln(athleteName, ' final fee: ', finalFee:0:2);
  end;
  writeln('Total expected income: ', grandTotal:0:2);
end.
