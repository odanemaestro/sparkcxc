-- SPARK REFERENCE - DO NOT SUBMIT
-- BlueWave_Database.accdb
-- Access SQL reference used to construct the SPARK practice database.

CREATE TABLE [Customer] ([CustomerID] TEXT(10), [FullName] TEXT(70), [Phone] TEXT(20), [Email] TEXT(80), CONSTRAINT [PK_Customer] PRIMARY KEY ([CustomerID]));

CREATE TABLE [TourPackage] ([PackageCode] TEXT(10), [PackageName] TEXT(80), [AdultRate] CURRENCY, [ChildRate] CURRENCY, CONSTRAINT [PK_TourPackage] PRIMARY KEY ([PackageCode]));

CREATE TABLE [Booking] ([BookingID] TEXT(10), [CustomerID] TEXT(10), [PackageCode] TEXT(10), [TourDate] DATETIME, [Adults] INTEGER, [Children] INTEGER, [AmountPaid] CURRENCY, CONSTRAINT [PK_Booking] PRIMARY KEY ([BookingID]));

INSERT INTO [Customer] ([CustomerID], [FullName], [Phone], [Email]) VALUES ('C001', 'Nadia Cole', '(876) 555-5101', 'nadia@example.com');
INSERT INTO [Customer] ([CustomerID], [FullName], [Phone], [Email]) VALUES ('C002', 'Eric Stone', '(876) 555-5102', 'eric@example.com');
INSERT INTO [Customer] ([CustomerID], [FullName], [Phone], [Email]) VALUES ('C003', 'Maya Singh', '(876) 555-5103', 'maya@example.com');

INSERT INTO [TourPackage] ([PackageCode], [PackageName], [AdultRate], [ChildRate]) VALUES ('CUL', 'Culture & Heritage', 6000, 2500);
INSERT INTO [TourPackage] ([PackageCode], [PackageName], [AdultRate], [ChildRate]) VALUES ('ADV', 'Adventure', 7000, 4000);
INSERT INTO [TourPackage] ([PackageCode], [PackageName], [AdultRate], [ChildRate]) VALUES ('NAT', 'Nature Escape', 7000, 3000);

INSERT INTO [Booking] ([BookingID], [CustomerID], [PackageCode], [TourDate], [Adults], [Children], [AmountPaid]) VALUES ('B001', 'C001', 'CUL', #10/03/2026#, 2, 1, 5000);
INSERT INTO [Booking] ([BookingID], [CustomerID], [PackageCode], [TourDate], [Adults], [Children], [AmountPaid]) VALUES ('B002', 'C002', 'ADV', #10/05/2026#, 4, 2, 12000);
INSERT INTO [Booking] ([BookingID], [CustomerID], [PackageCode], [TourDate], [Adults], [Children], [AmountPaid]) VALUES ('B003', 'C003', 'NAT', #10/07/2026#, 1, 0, 4000);

ALTER TABLE [Booking] ADD CONSTRAINT [FK_Booking_CustomerID] FOREIGN KEY ([CustomerID]) REFERENCES [Customer] ([CustomerID]);
ALTER TABLE [Booking] ADD CONSTRAINT [FK_Booking_PackageCode] FOREIGN KEY ([PackageCode]) REFERENCES [TourPackage] ([PackageCode]);

-- Saved query: Upcoming Tours
SELECT BookingID, CustomerID, PackageCode, TourDate, Adults, Children FROM Booking WHERE TourDate >= Date() ORDER BY TourDate;

-- Saved query: Outstanding Payments
SELECT Customer.FullName, TourPackage.PackageName, Booking.Adults, Booking.Children, Booking.AmountPaid, ([Adults]*[AdultRate])+([Children]*[ChildRate]) AS BookingCost, (([Adults]*[AdultRate])+([Children]*[ChildRate]))-[AmountPaid] AS Balance FROM (Customer INNER JOIN Booking ON Customer.CustomerID=Booking.CustomerID) INNER JOIN TourPackage ON Booking.PackageCode=TourPackage.PackageCode;
