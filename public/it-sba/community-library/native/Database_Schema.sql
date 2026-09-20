-- SPARK REFERENCE - DO NOT SUBMIT
-- HarbourView_Database.accdb
-- Access SQL reference used to construct the SPARK practice database.

CREATE TABLE [Member] ([MemberID] TEXT(10), [FirstName] TEXT(30), [LastName] TEXT(30), [MemberType] TEXT(15), [Phone] TEXT(20), [Email] TEXT(80), CONSTRAINT [PK_Member] PRIMARY KEY ([MemberID]));

CREATE TABLE [Book] ([BookID] TEXT(10), [Title] TEXT(100), [Category] TEXT(30), [Author] TEXT(70), [DailyFine] CURRENCY, CONSTRAINT [PK_Book] PRIMARY KEY ([BookID]));

CREATE TABLE [Loan] ([LoanID] TEXT(10), [MemberID] TEXT(10), [BookID] TEXT(10), [DateBorrowed] DATETIME, [DueDate] DATETIME, [DateReturned] DATETIME, CONSTRAINT [PK_Loan] PRIMARY KEY ([LoanID]));

INSERT INTO [Member] ([MemberID], [FirstName], [LastName], [MemberType], [Phone], [Email]) VALUES ('M001', 'Janelle', 'Rose', 'STUDENT', '(876) 555-4101', 'janelle@example.com');
INSERT INTO [Member] ([MemberID], [FirstName], [LastName], [MemberType], [Phone], [Email]) VALUES ('M002', 'Paul', 'Green', 'ADULT', '(876) 555-4102', 'paul@example.com');
INSERT INTO [Member] ([MemberID], [FirstName], [LastName], [MemberType], [Phone], [Email]) VALUES ('M003', 'Kemar', 'White', 'STUDENT', '(876) 555-4103', 'kemar@example.com');

INSERT INTO [Book] ([BookID], [Title], [Category], [Author], [DailyFine]) VALUES ('BK001', 'Caribbean Voices', 'Literature', 'A. Writer', 100);
INSERT INTO [Book] ([BookID], [Title], [Category], [Author], [DailyFine]) VALUES ('BK002', 'Excel Basics', 'Technology', 'R. Analyst', 100);
INSERT INTO [Book] ([BookID], [Title], [Category], [Author], [DailyFine]) VALUES ('BK003', 'Island History', 'History', 'M. Scholar', 100);

INSERT INTO [Loan] ([LoanID], [MemberID], [BookID], [DateBorrowed], [DueDate], [DateReturned]) VALUES ('L001', 'M001', 'BK001', #09/01/2026#, #09/15/2026#, NULL);
INSERT INTO [Loan] ([LoanID], [MemberID], [BookID], [DateBorrowed], [DueDate], [DateReturned]) VALUES ('L002', 'M002', 'BK002', #08/30/2026#, #09/13/2026#, NULL);
INSERT INTO [Loan] ([LoanID], [MemberID], [BookID], [DateBorrowed], [DueDate], [DateReturned]) VALUES ('L003', 'M003', 'BK003', #09/05/2026#, #09/19/2026#, #09/19/2026#);

ALTER TABLE [Loan] ADD CONSTRAINT [FK_Loan_MemberID] FOREIGN KEY ([MemberID]) REFERENCES [Member] ([MemberID]);
ALTER TABLE [Loan] ADD CONSTRAINT [FK_Loan_BookID] FOREIGN KEY ([BookID]) REFERENCES [Book] ([BookID]);

-- Saved query: Overdue Loans
SELECT Loan.LoanID, Member.FirstName, Member.LastName, Book.Title, Loan.DueDate, DateDiff('d',[DueDate],Date()) AS DaysLate, DateDiff('d',[DueDate],Date())*[DailyFine] AS FineDue FROM (Member INNER JOIN Loan ON Member.MemberID=Loan.MemberID) INNER JOIN Book ON Loan.BookID=Book.BookID WHERE DateReturned Is Null AND DueDate < Date();

-- Saved query: Member Loans
SELECT Member.MemberID, Member.FirstName, Member.LastName, Book.Title, Loan.DateBorrowed, Loan.DueDate, Loan.DateReturned FROM (Member INNER JOIN Loan ON Member.MemberID=Loan.MemberID) INNER JOIN Book ON Loan.BookID=Book.BookID;
