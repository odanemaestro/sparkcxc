-- SPARK REFERENCE - DO NOT SUBMIT
-- SportsAcademy_Database.accdb
-- Access SQL reference used to construct the SPARK practice database.

CREATE TABLE [Programme] ([ProgrammeCode] TEXT(10), [ProgrammeName] TEXT(60), [MonthlyFee] CURRENCY, [Coach] TEXT(60), [TrainingDays] TEXT(80), CONSTRAINT [PK_Programme] PRIMARY KEY ([ProgrammeCode]));

CREATE TABLE [Athlete] ([AthleteID] TEXT(10), [FirstName] TEXT(30), [LastName] TEXT(30), [DOB] DATETIME, [Gender] TEXT(1), [ProgrammeCode] TEXT(10), [JoinDate] DATETIME, [Status] TEXT(15), CONSTRAINT [PK_Athlete] PRIMARY KEY ([AthleteID]));

CREATE TABLE [Guardian] ([GuardianID] TEXT(10), [AthleteID] TEXT(10), [FullName] TEXT(70), [Relation] TEXT(20), [Phone] TEXT(20), [Email] TEXT(80), CONSTRAINT [PK_Guardian] PRIMARY KEY ([GuardianID]));

INSERT INTO [Programme] ([ProgrammeCode], [ProgrammeName], [MonthlyFee], [Coach], [TrainingDays]) VALUES ('SWM', 'Swimming', 9000, 'Coach Grant', 'Mon/Wed/Fri');
INSERT INTO [Programme] ([ProgrammeCode], [ProgrammeName], [MonthlyFee], [Coach], [TrainingDays]) VALUES ('FTB', 'Football', 7500, 'Coach Lewis', 'Tue/Thu/Sat');
INSERT INTO [Programme] ([ProgrammeCode], [ProgrammeName], [MonthlyFee], [Coach], [TrainingDays]) VALUES ('NET', 'Netball', 7000, 'Coach Blake', 'Mon/Thu');
INSERT INTO [Programme] ([ProgrammeCode], [ProgrammeName], [MonthlyFee], [Coach], [TrainingDays]) VALUES ('ATH', 'Athletics', 8000, 'Coach Brown', 'Wed/Fri/Sat');

INSERT INTO [Athlete] ([AthleteID], [FirstName], [LastName], [DOB], [Gender], [ProgrammeCode], [JoinDate], [Status]) VALUES ('A001', 'Alicia', 'Brown', #05/12/2014#, 'F', 'SWM', #01/08/2026#, 'Active');
INSERT INTO [Athlete] ([AthleteID], [FirstName], [LastName], [DOB], [Gender], [ProgrammeCode], [JoinDate], [Status]) VALUES ('A002', 'Dario', 'King', #03/19/2011#, 'M', 'FTB', #01/10/2026#, 'Active');
INSERT INTO [Athlete] ([AthleteID], [FirstName], [LastName], [DOB], [Gender], [ProgrammeCode], [JoinDate], [Status]) VALUES ('A003', 'Renee', 'Blake', #11/02/2015#, 'F', 'NET', #02/01/2026#, 'Active');
INSERT INTO [Athlete] ([AthleteID], [FirstName], [LastName], [DOB], [Gender], [ProgrammeCode], [JoinDate], [Status]) VALUES ('A004', 'Malik', 'Grant', #08/21/2012#, 'M', 'ATH', #02/10/2026#, 'Active');

INSERT INTO [Guardian] ([GuardianID], [AthleteID], [FullName], [Relation], [Phone], [Email]) VALUES ('G001', 'A001', 'Marsha Brown', 'Mother', '(876) 555-1101', 'marsha@example.com');
INSERT INTO [Guardian] ([GuardianID], [AthleteID], [FullName], [Relation], [Phone], [Email]) VALUES ('G002', 'A002', 'Paul King', 'Father', '(876) 555-1102', 'paul@example.com');
INSERT INTO [Guardian] ([GuardianID], [AthleteID], [FullName], [Relation], [Phone], [Email]) VALUES ('G003', 'A003', 'Denise Blake', 'Mother', '(876) 555-1103', 'denise@example.com');
INSERT INTO [Guardian] ([GuardianID], [AthleteID], [FullName], [Relation], [Phone], [Email]) VALUES ('G004', 'A004', 'Howard Grant', 'Guardian', '(876) 555-1104', 'howard@example.com');

ALTER TABLE [Athlete] ADD CONSTRAINT [FK_Athlete_ProgrammeCode] FOREIGN KEY ([ProgrammeCode]) REFERENCES [Programme] ([ProgrammeCode]);
ALTER TABLE [Guardian] ADD CONSTRAINT [FK_Guardian_AthleteID] FOREIGN KEY ([AthleteID]) REFERENCES [Athlete] ([AthleteID]);

-- Saved query: Junior Athletes
SELECT AthleteID, FirstName, LastName, ProgrammeCode FROM Athlete WHERE DateDiff('yyyy',[DOB],Date()) < 13 ORDER BY LastName;

-- Saved query: Athlete Finance
SELECT Athlete.AthleteID, Athlete.FirstName, Athlete.LastName, Programme.ProgrammeName, Programme.MonthlyFee, [MonthlyFee]*3 AS TermFee FROM Programme INNER JOIN Athlete ON Programme.ProgrammeCode = Athlete.ProgrammeCode;
