-- SPARK REFERENCE - DO NOT SUBMIT
-- IslandCare_Database.accdb
-- Access SQL reference used to construct the SPARK practice database.

CREATE TABLE [Patient] ([PatientID] TEXT(10), [FirstName] TEXT(30), [LastName] TEXT(30), [DOB] DATETIME, [Gender] TEXT(1), [Phone] TEXT(20), [Parish] TEXT(30), [EmergencyName] TEXT(70), [EmergencyRelation] TEXT(20), [EmergencyPhone] TEXT(20), CONSTRAINT [PK_Patient] PRIMARY KEY ([PatientID]));

CREATE TABLE [Service] ([ServiceCode] TEXT(10), [ServiceName] TEXT(70), [StandardFee] CURRENCY, CONSTRAINT [PK_Service] PRIMARY KEY ([ServiceCode]));

CREATE TABLE [Appointment] ([AppointmentID] TEXT(10), [PatientID] TEXT(10), [ServiceCode] TEXT(10), [VisitDate] DATETIME, [PaidAmount] CURRENCY, [Status] TEXT(20), CONSTRAINT [PK_Appointment] PRIMARY KEY ([AppointmentID]));

INSERT INTO [Service] ([ServiceCode], [ServiceName], [StandardFee]) VALUES ('GEN', 'General Consultation', 6500);
INSERT INTO [Service] ([ServiceCode], [ServiceName], [StandardFee]) VALUES ('WEL', 'Wellness Check', 8500);
INSERT INTO [Service] ([ServiceCode], [ServiceName], [StandardFee]) VALUES ('DIA', 'Diagnostic Service', 12000);

INSERT INTO [Patient] ([PatientID], [FirstName], [LastName], [DOB], [Gender], [Phone], [Parish], [EmergencyName], [EmergencyRelation], [EmergencyPhone]) VALUES ('P001', 'Marlon', 'Reid', #04/12/1959#, 'M', '(876) 555-2101', 'St. Andrew', 'Karen Reid', 'Spouse', '(876) 555-2191');
INSERT INTO [Patient] ([PatientID], [FirstName], [LastName], [DOB], [Gender], [Phone], [Parish], [EmergencyName], [EmergencyRelation], [EmergencyPhone]) VALUES ('P002', 'Keisha', 'Hall', #07/10/1985#, 'F', '(876) 555-2102', 'Kingston', 'Paul Hall', 'Brother', '(876) 555-2192');
INSERT INTO [Patient] ([PatientID], [FirstName], [LastName], [DOB], [Gender], [Phone], [Parish], [EmergencyName], [EmergencyRelation], [EmergencyPhone]) VALUES ('P003', 'Noel', 'James', #01/28/1954#, 'M', '(876) 555-2103', 'St. Catherine', 'Ruth James', 'Daughter', '(876) 555-2193');

INSERT INTO [Appointment] ([AppointmentID], [PatientID], [ServiceCode], [VisitDate], [PaidAmount], [Status]) VALUES ('AP001', 'P001', 'GEN', #09/18/2026#, 3000, 'Outstanding');
INSERT INTO [Appointment] ([AppointmentID], [PatientID], [ServiceCode], [VisitDate], [PaidAmount], [Status]) VALUES ('AP002', 'P002', 'WEL', #09/19/2026#, 8500, 'Paid');
INSERT INTO [Appointment] ([AppointmentID], [PatientID], [ServiceCode], [VisitDate], [PaidAmount], [Status]) VALUES ('AP003', 'P003', 'DIA', #09/20/2026#, 5000, 'Outstanding');

ALTER TABLE [Appointment] ADD CONSTRAINT [FK_Appointment_PatientID] FOREIGN KEY ([PatientID]) REFERENCES [Patient] ([PatientID]);
ALTER TABLE [Appointment] ADD CONSTRAINT [FK_Appointment_ServiceCode] FOREIGN KEY ([ServiceCode]) REFERENCES [Service] ([ServiceCode]);

-- Saved query: Daily Appointments
SELECT AppointmentID, PatientID, ServiceCode, VisitDate, Status FROM Appointment ORDER BY VisitDate;

-- Saved query: Outstanding Accounts
SELECT Patient.FirstName, Patient.LastName, Service.ServiceName, Service.StandardFee, Appointment.PaidAmount, [StandardFee]-[PaidAmount] AS Balance FROM (Patient INNER JOIN Appointment ON Patient.PatientID=Appointment.PatientID) INNER JOIN Service ON Appointment.ServiceCode=Service.ServiceCode WHERE [StandardFee]-[PaidAmount] > 0;
