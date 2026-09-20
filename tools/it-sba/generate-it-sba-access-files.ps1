param([switch]$Quiet)
$ErrorActionPreference = "Stop"

function Write-Step([string]$Message) {
  if (-not $Quiet) { Write-Host $Message -ForegroundColor Cyan }
}

function New-SparkAccessDatabase {
  param(
    [Parameter(Mandatory=$true)][string]$OutputPath,
    [Parameter(Mandatory=$true)][array]$Tables,
    [array]$Relationships = @(),
    [array]$Queries = @()
  )

  $full = Join-Path (Get-Location) $OutputPath
  $dir = Split-Path $full

  if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  if (Test-Path $full) {
    Remove-Item $full -Force
  }

  $access = $null
  try {
    $access = New-Object -ComObject Access.Application
    $access.NewCurrentDatabase($full)
    $db = $access.CurrentDb()

    $db.Execute("CREATE TABLE [SPARK_REFERENCE] ([Notice] TEXT(255), [Purpose] TEXT(255));")
    $db.Execute("INSERT INTO [SPARK_REFERENCE] ([Notice],[Purpose]) VALUES ('SPARK REFERENCE - DO NOT SUBMIT AS YOUR OWN SBA','Fictional SPARK practice database for learning and comparison only.');")

    foreach ($table in $Tables) {
      $db.Execute($table.Create)
      foreach ($rowSql in $table.Rows) {
        $db.Execute($rowSql)
      }
    }

    foreach ($sql in $Relationships) {
      $db.Execute($sql)
    }

    foreach ($query in $Queries) {
      $null = $db.CreateQueryDef($query.Name, $query.Sql)
    }

    $access.CloseCurrentDatabase()
    $access.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($access) | Out-Null

    Write-Host "Created Access database: $OutputPath" -ForegroundColor Green
    return
  }
  catch {
    $fullAccessError = $_.Exception.Message

    if ($access) {
      try { $access.CloseCurrentDatabase() } catch {}
      try { $access.Quit() } catch {}
      try { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($access) | Out-Null } catch {}
    }

    if (Test-Path $full) {
      Remove-Item $full -Force -ErrorAction SilentlyContinue
    }

    if (-not $Quiet) {
      Write-Warning "Full Access automation was unavailable for $OutputPath. Trying ACE. $fullAccessError"
    }
  }

  $providers = @(
    "Microsoft.ACE.OLEDB.16.0"
    "Microsoft.ACE.OLEDB.12.0"
  )

  foreach ($provider in $providers) {
    $catalog = $null
    try {
      $catalog = New-Object -ComObject ADOX.Catalog
      $catalog.Create("Provider=$provider;Data Source=$full;")
      $conn = $catalog.ActiveConnection

      $conn.Execute("CREATE TABLE [SPARK_REFERENCE] ([Notice] TEXT(255), [Purpose] TEXT(255));") | Out-Null
      $conn.Execute("INSERT INTO [SPARK_REFERENCE] ([Notice],[Purpose]) VALUES ('SPARK REFERENCE - DO NOT SUBMIT AS YOUR OWN SBA','Fictional SPARK practice database for learning and comparison only.');") | Out-Null

      foreach ($table in $Tables) {
        $conn.Execute($table.Create) | Out-Null
        foreach ($rowSql in $table.Rows) {
          $conn.Execute($rowSql) | Out-Null
        }
      }

      foreach ($sql in $Relationships) {
        $conn.Execute($sql) | Out-Null
      }

      $conn.Close()
      [System.Runtime.InteropServices.Marshal]::ReleaseComObject($catalog) | Out-Null

      Write-Host "Created Access database with ${provider}: $OutputPath" -ForegroundColor Green
      Write-Warning "Microsoft Access itself was not available, so saved QueryDef objects were not embedded. Tables, records, keys and relationships were created. Query SQL remains in Database_Schema.sql."
      return
    }
    catch {
      if ($catalog) {
        try { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($catalog) | Out-Null } catch {}
      }

      if (Test-Path $full) {
        Remove-Item $full -Force -ErrorAction SilentlyContinue
      }
    }
  }

  throw "Microsoft Access or the Microsoft Access Database Engine is required to create $OutputPath. Database_Schema.sql remains available."
}

Write-Step "Creating SPARK reference Access databases..."
New-SparkAccessDatabase -OutputPath 'public\\it-sba\\sports-academy\\native\\SportsAcademy_Database.accdb' -Tables @(
  @{
    Name = 'Programme'
    Create = 'CREATE TABLE [Programme] ([ProgrammeCode] TEXT(10), [ProgrammeName] TEXT(60), [MonthlyFee] CURRENCY, [Coach] TEXT(60), [TrainingDays] TEXT(80), CONSTRAINT [PK_Programme] PRIMARY KEY ([ProgrammeCode]))'
    Rows = @(
      'INSERT INTO [Programme] ([ProgrammeCode], [ProgrammeName], [MonthlyFee], [Coach], [TrainingDays]) VALUES (''SWM'', ''Swimming'', 9000, ''Coach Grant'', ''Mon/Wed/Fri'')'
      'INSERT INTO [Programme] ([ProgrammeCode], [ProgrammeName], [MonthlyFee], [Coach], [TrainingDays]) VALUES (''FTB'', ''Football'', 7500, ''Coach Lewis'', ''Tue/Thu/Sat'')'
      'INSERT INTO [Programme] ([ProgrammeCode], [ProgrammeName], [MonthlyFee], [Coach], [TrainingDays]) VALUES (''NET'', ''Netball'', 7000, ''Coach Blake'', ''Mon/Thu'')'
      'INSERT INTO [Programme] ([ProgrammeCode], [ProgrammeName], [MonthlyFee], [Coach], [TrainingDays]) VALUES (''ATH'', ''Athletics'', 8000, ''Coach Brown'', ''Wed/Fri/Sat'')'
    )
  }
  @{
    Name = 'Athlete'
    Create = 'CREATE TABLE [Athlete] ([AthleteID] TEXT(10), [FirstName] TEXT(30), [LastName] TEXT(30), [DOB] DATETIME, [Gender] TEXT(1), [ProgrammeCode] TEXT(10), [JoinDate] DATETIME, [Status] TEXT(15), CONSTRAINT [PK_Athlete] PRIMARY KEY ([AthleteID]))'
    Rows = @(
      'INSERT INTO [Athlete] ([AthleteID], [FirstName], [LastName], [DOB], [Gender], [ProgrammeCode], [JoinDate], [Status]) VALUES (''A001'', ''Alicia'', ''Brown'', #05/12/2014#, ''F'', ''SWM'', #01/08/2026#, ''Active'')'
      'INSERT INTO [Athlete] ([AthleteID], [FirstName], [LastName], [DOB], [Gender], [ProgrammeCode], [JoinDate], [Status]) VALUES (''A002'', ''Dario'', ''King'', #03/19/2011#, ''M'', ''FTB'', #01/10/2026#, ''Active'')'
      'INSERT INTO [Athlete] ([AthleteID], [FirstName], [LastName], [DOB], [Gender], [ProgrammeCode], [JoinDate], [Status]) VALUES (''A003'', ''Renee'', ''Blake'', #11/02/2015#, ''F'', ''NET'', #02/01/2026#, ''Active'')'
      'INSERT INTO [Athlete] ([AthleteID], [FirstName], [LastName], [DOB], [Gender], [ProgrammeCode], [JoinDate], [Status]) VALUES (''A004'', ''Malik'', ''Grant'', #08/21/2012#, ''M'', ''ATH'', #02/10/2026#, ''Active'')'
    )
  }
  @{
    Name = 'Guardian'
    Create = 'CREATE TABLE [Guardian] ([GuardianID] TEXT(10), [AthleteID] TEXT(10), [FullName] TEXT(70), [Relation] TEXT(20), [Phone] TEXT(20), [Email] TEXT(80), CONSTRAINT [PK_Guardian] PRIMARY KEY ([GuardianID]))'
    Rows = @(
      'INSERT INTO [Guardian] ([GuardianID], [AthleteID], [FullName], [Relation], [Phone], [Email]) VALUES (''G001'', ''A001'', ''Marsha Brown'', ''Mother'', ''(876) 555-1101'', ''marsha@example.com'')'
      'INSERT INTO [Guardian] ([GuardianID], [AthleteID], [FullName], [Relation], [Phone], [Email]) VALUES (''G002'', ''A002'', ''Paul King'', ''Father'', ''(876) 555-1102'', ''paul@example.com'')'
      'INSERT INTO [Guardian] ([GuardianID], [AthleteID], [FullName], [Relation], [Phone], [Email]) VALUES (''G003'', ''A003'', ''Denise Blake'', ''Mother'', ''(876) 555-1103'', ''denise@example.com'')'
      'INSERT INTO [Guardian] ([GuardianID], [AthleteID], [FullName], [Relation], [Phone], [Email]) VALUES (''G004'', ''A004'', ''Howard Grant'', ''Guardian'', ''(876) 555-1104'', ''howard@example.com'')'
    )
  }
) -Relationships @(
  'ALTER TABLE [Athlete] ADD CONSTRAINT [FK_Athlete_ProgrammeCode] FOREIGN KEY ([ProgrammeCode]) REFERENCES [Programme] ([ProgrammeCode])'
  'ALTER TABLE [Guardian] ADD CONSTRAINT [FK_Guardian_AthleteID] FOREIGN KEY ([AthleteID]) REFERENCES [Athlete] ([AthleteID])'
) -Queries @(
  @{
    Name = 'Junior Athletes'
    Sql = 'SELECT AthleteID, FirstName, LastName, ProgrammeCode FROM Athlete WHERE DateDiff(''yyyy'',[DOB],Date()) < 13 ORDER BY LastName;'
  }
  @{
    Name = 'Athlete Finance'
    Sql = 'SELECT Athlete.AthleteID, Athlete.FirstName, Athlete.LastName, Programme.ProgrammeName, Programme.MonthlyFee, [MonthlyFee]*3 AS TermFee FROM Programme INNER JOIN Athlete ON Programme.ProgrammeCode = Athlete.ProgrammeCode;'
  }
)

New-SparkAccessDatabase -OutputPath 'public\\it-sba\\medical-centre\\native\\IslandCare_Database.accdb' -Tables @(
  @{
    Name = 'Patient'
    Create = 'CREATE TABLE [Patient] ([PatientID] TEXT(10), [FirstName] TEXT(30), [LastName] TEXT(30), [DOB] DATETIME, [Gender] TEXT(1), [Phone] TEXT(20), [Parish] TEXT(30), [EmergencyName] TEXT(70), [EmergencyRelation] TEXT(20), [EmergencyPhone] TEXT(20), CONSTRAINT [PK_Patient] PRIMARY KEY ([PatientID]))'
    Rows = @(
      'INSERT INTO [Patient] ([PatientID], [FirstName], [LastName], [DOB], [Gender], [Phone], [Parish], [EmergencyName], [EmergencyRelation], [EmergencyPhone]) VALUES (''P001'', ''Marlon'', ''Reid'', #04/12/1959#, ''M'', ''(876) 555-2101'', ''St. Andrew'', ''Karen Reid'', ''Spouse'', ''(876) 555-2191'')'
      'INSERT INTO [Patient] ([PatientID], [FirstName], [LastName], [DOB], [Gender], [Phone], [Parish], [EmergencyName], [EmergencyRelation], [EmergencyPhone]) VALUES (''P002'', ''Keisha'', ''Hall'', #07/10/1985#, ''F'', ''(876) 555-2102'', ''Kingston'', ''Paul Hall'', ''Brother'', ''(876) 555-2192'')'
      'INSERT INTO [Patient] ([PatientID], [FirstName], [LastName], [DOB], [Gender], [Phone], [Parish], [EmergencyName], [EmergencyRelation], [EmergencyPhone]) VALUES (''P003'', ''Noel'', ''James'', #01/28/1954#, ''M'', ''(876) 555-2103'', ''St. Catherine'', ''Ruth James'', ''Daughter'', ''(876) 555-2193'')'
    )
  }
  @{
    Name = 'Service'
    Create = 'CREATE TABLE [Service] ([ServiceCode] TEXT(10), [ServiceName] TEXT(70), [StandardFee] CURRENCY, CONSTRAINT [PK_Service] PRIMARY KEY ([ServiceCode]))'
    Rows = @(
      'INSERT INTO [Service] ([ServiceCode], [ServiceName], [StandardFee]) VALUES (''GEN'', ''General Consultation'', 6500)'
      'INSERT INTO [Service] ([ServiceCode], [ServiceName], [StandardFee]) VALUES (''WEL'', ''Wellness Check'', 8500)'
      'INSERT INTO [Service] ([ServiceCode], [ServiceName], [StandardFee]) VALUES (''DIA'', ''Diagnostic Service'', 12000)'
    )
  }
  @{
    Name = 'Appointment'
    Create = 'CREATE TABLE [Appointment] ([AppointmentID] TEXT(10), [PatientID] TEXT(10), [ServiceCode] TEXT(10), [VisitDate] DATETIME, [PaidAmount] CURRENCY, [Status] TEXT(20), CONSTRAINT [PK_Appointment] PRIMARY KEY ([AppointmentID]))'
    Rows = @(
      'INSERT INTO [Appointment] ([AppointmentID], [PatientID], [ServiceCode], [VisitDate], [PaidAmount], [Status]) VALUES (''AP001'', ''P001'', ''GEN'', #09/18/2026#, 3000, ''Outstanding'')'
      'INSERT INTO [Appointment] ([AppointmentID], [PatientID], [ServiceCode], [VisitDate], [PaidAmount], [Status]) VALUES (''AP002'', ''P002'', ''WEL'', #09/19/2026#, 8500, ''Paid'')'
      'INSERT INTO [Appointment] ([AppointmentID], [PatientID], [ServiceCode], [VisitDate], [PaidAmount], [Status]) VALUES (''AP003'', ''P003'', ''DIA'', #09/20/2026#, 5000, ''Outstanding'')'
    )
  }
) -Relationships @(
  'ALTER TABLE [Appointment] ADD CONSTRAINT [FK_Appointment_PatientID] FOREIGN KEY ([PatientID]) REFERENCES [Patient] ([PatientID])'
  'ALTER TABLE [Appointment] ADD CONSTRAINT [FK_Appointment_ServiceCode] FOREIGN KEY ([ServiceCode]) REFERENCES [Service] ([ServiceCode])'
) -Queries @(
  @{
    Name = 'Daily Appointments'
    Sql = 'SELECT AppointmentID, PatientID, ServiceCode, VisitDate, Status FROM Appointment ORDER BY VisitDate;'
  }
  @{
    Name = 'Outstanding Accounts'
    Sql = 'SELECT Patient.FirstName, Patient.LastName, Service.ServiceName, Service.StandardFee, Appointment.PaidAmount, [StandardFee]-[PaidAmount] AS Balance FROM (Patient INNER JOIN Appointment ON Patient.PatientID=Appointment.PatientID) INNER JOIN Service ON Appointment.ServiceCode=Service.ServiceCode WHERE [StandardFee]-[PaidAmount] > 0;'
  }
)

New-SparkAccessDatabase -OutputPath 'public\\it-sba\\community-market\\native\\YardFresh_Database.accdb' -Tables @(
  @{
    Name = 'Supplier'
    Create = 'CREATE TABLE [Supplier] ([SupplierID] TEXT(10), [SupplierName] TEXT(80), [Phone] TEXT(20), [Email] TEXT(80), [Parish] TEXT(30), CONSTRAINT [PK_Supplier] PRIMARY KEY ([SupplierID]))'
    Rows = @(
      'INSERT INTO [Supplier] ([SupplierID], [SupplierName], [Phone], [Email], [Parish]) VALUES (''SUP01'', ''Kingston Foods Ltd.'', ''(876) 555-3101'', ''orders@kingstonfoods.example'', ''Kingston'')'
      'INSERT INTO [Supplier] ([SupplierID], [SupplierName], [Phone], [Email], [Parish]) VALUES (''SUP02'', ''Island Produce Co.'', ''(876) 555-3102'', ''sales@islandproduce.example'', ''St. Catherine'')'
    )
  }
  @{
    Name = 'Product'
    Create = 'CREATE TABLE [Product] ([ProductID] TEXT(10), [ProductName] TEXT(80), [Category] TEXT(30), [UnitPrice] CURRENCY, [QuantityInStock] INTEGER, [ReorderLevel] INTEGER, [SupplierID] TEXT(10), CONSTRAINT [PK_Product] PRIMARY KEY ([ProductID]))'
    Rows = @(
      'INSERT INTO [Product] ([ProductID], [ProductName], [Category], [UnitPrice], [QuantityInStock], [ReorderLevel], [SupplierID]) VALUES (''PR001'', ''Rice 2kg'', ''Grocery'', 980, 25, 10, ''SUP01'')'
      'INSERT INTO [Product] ([ProductID], [ProductName], [Category], [UnitPrice], [QuantityInStock], [ReorderLevel], [SupplierID]) VALUES (''PR002'', ''Plantain Chips'', ''Snacks'', 350, 8, 12, ''SUP01'')'
      'INSERT INTO [Product] ([ProductID], [ProductName], [Category], [UnitPrice], [QuantityInStock], [ReorderLevel], [SupplierID]) VALUES (''PR003'', ''Fresh Juice'', ''Beverage'', 500, 18, 8, ''SUP02'')'
      'INSERT INTO [Product] ([ProductID], [ProductName], [Category], [UnitPrice], [QuantityInStock], [ReorderLevel], [SupplierID]) VALUES (''PR004'', ''Ground Coffee'', ''Beverage'', 1800, 6, 8, ''SUP01'')'
    )
  }
  @{
    Name = 'StockPurchase'
    Create = 'CREATE TABLE [StockPurchase] ([PurchaseID] TEXT(10), [ProductID] TEXT(10), [PurchaseDate] DATETIME, [QuantityBought] INTEGER, [CostPerUnit] CURRENCY, CONSTRAINT [PK_StockPurchase] PRIMARY KEY ([PurchaseID]))'
    Rows = @(
      'INSERT INTO [StockPurchase] ([PurchaseID], [ProductID], [PurchaseDate], [QuantityBought], [CostPerUnit]) VALUES (''PO001'', ''PR001'', #09/01/2026#, 40, 720)'
      'INSERT INTO [StockPurchase] ([PurchaseID], [ProductID], [PurchaseDate], [QuantityBought], [CostPerUnit]) VALUES (''PO002'', ''PR002'', #09/03/2026#, 36, 240)'
      'INSERT INTO [StockPurchase] ([PurchaseID], [ProductID], [PurchaseDate], [QuantityBought], [CostPerUnit]) VALUES (''PO003'', ''PR004'', #09/05/2026#, 24, 1300)'
    )
  }
) -Relationships @(
  'ALTER TABLE [Product] ADD CONSTRAINT [FK_Product_SupplierID] FOREIGN KEY ([SupplierID]) REFERENCES [Supplier] ([SupplierID])'
  'ALTER TABLE [StockPurchase] ADD CONSTRAINT [FK_StockPurchase_ProductID] FOREIGN KEY ([ProductID]) REFERENCES [Product] ([ProductID])'
) -Queries @(
  @{
    Name = 'Low Stock'
    Sql = 'SELECT ProductID, ProductName, Category, QuantityInStock, ReorderLevel FROM Product WHERE QuantityInStock <= ReorderLevel ORDER BY ProductName;'
  }
  @{
    Name = 'Supplier Orders'
    Sql = 'SELECT Supplier.SupplierName, Product.ProductName, StockPurchase.QuantityBought, StockPurchase.CostPerUnit, [QuantityBought]*[CostPerUnit] AS OrderValue FROM (Supplier INNER JOIN Product ON Supplier.SupplierID=Product.SupplierID) INNER JOIN StockPurchase ON Product.ProductID=StockPurchase.ProductID;'
  }
)

New-SparkAccessDatabase -OutputPath 'public\\it-sba\\community-library\\native\\HarbourView_Database.accdb' -Tables @(
  @{
    Name = 'Member'
    Create = 'CREATE TABLE [Member] ([MemberID] TEXT(10), [FirstName] TEXT(30), [LastName] TEXT(30), [MemberType] TEXT(15), [Phone] TEXT(20), [Email] TEXT(80), CONSTRAINT [PK_Member] PRIMARY KEY ([MemberID]))'
    Rows = @(
      'INSERT INTO [Member] ([MemberID], [FirstName], [LastName], [MemberType], [Phone], [Email]) VALUES (''M001'', ''Janelle'', ''Rose'', ''STUDENT'', ''(876) 555-4101'', ''janelle@example.com'')'
      'INSERT INTO [Member] ([MemberID], [FirstName], [LastName], [MemberType], [Phone], [Email]) VALUES (''M002'', ''Paul'', ''Green'', ''ADULT'', ''(876) 555-4102'', ''paul@example.com'')'
      'INSERT INTO [Member] ([MemberID], [FirstName], [LastName], [MemberType], [Phone], [Email]) VALUES (''M003'', ''Kemar'', ''White'', ''STUDENT'', ''(876) 555-4103'', ''kemar@example.com'')'
    )
  }
  @{
    Name = 'Book'
    Create = 'CREATE TABLE [Book] ([BookID] TEXT(10), [Title] TEXT(100), [Category] TEXT(30), [Author] TEXT(70), [DailyFine] CURRENCY, CONSTRAINT [PK_Book] PRIMARY KEY ([BookID]))'
    Rows = @(
      'INSERT INTO [Book] ([BookID], [Title], [Category], [Author], [DailyFine]) VALUES (''BK001'', ''Caribbean Voices'', ''Literature'', ''A. Writer'', 100)'
      'INSERT INTO [Book] ([BookID], [Title], [Category], [Author], [DailyFine]) VALUES (''BK002'', ''Excel Basics'', ''Technology'', ''R. Analyst'', 100)'
      'INSERT INTO [Book] ([BookID], [Title], [Category], [Author], [DailyFine]) VALUES (''BK003'', ''Island History'', ''History'', ''M. Scholar'', 100)'
    )
  }
  @{
    Name = 'Loan'
    Create = 'CREATE TABLE [Loan] ([LoanID] TEXT(10), [MemberID] TEXT(10), [BookID] TEXT(10), [DateBorrowed] DATETIME, [DueDate] DATETIME, [DateReturned] DATETIME, CONSTRAINT [PK_Loan] PRIMARY KEY ([LoanID]))'
    Rows = @(
      'INSERT INTO [Loan] ([LoanID], [MemberID], [BookID], [DateBorrowed], [DueDate], [DateReturned]) VALUES (''L001'', ''M001'', ''BK001'', #09/01/2026#, #09/15/2026#, NULL)'
      'INSERT INTO [Loan] ([LoanID], [MemberID], [BookID], [DateBorrowed], [DueDate], [DateReturned]) VALUES (''L002'', ''M002'', ''BK002'', #08/30/2026#, #09/13/2026#, NULL)'
      'INSERT INTO [Loan] ([LoanID], [MemberID], [BookID], [DateBorrowed], [DueDate], [DateReturned]) VALUES (''L003'', ''M003'', ''BK003'', #09/05/2026#, #09/19/2026#, #09/19/2026#)'
    )
  }
) -Relationships @(
  'ALTER TABLE [Loan] ADD CONSTRAINT [FK_Loan_MemberID] FOREIGN KEY ([MemberID]) REFERENCES [Member] ([MemberID])'
  'ALTER TABLE [Loan] ADD CONSTRAINT [FK_Loan_BookID] FOREIGN KEY ([BookID]) REFERENCES [Book] ([BookID])'
) -Queries @(
  @{
    Name = 'Overdue Loans'
    Sql = 'SELECT Loan.LoanID, Member.FirstName, Member.LastName, Book.Title, Loan.DueDate, DateDiff(''d'',[DueDate],Date()) AS DaysLate, DateDiff(''d'',[DueDate],Date())*[DailyFine] AS FineDue FROM (Member INNER JOIN Loan ON Member.MemberID=Loan.MemberID) INNER JOIN Book ON Loan.BookID=Book.BookID WHERE DateReturned Is Null AND DueDate < Date();'
  }
  @{
    Name = 'Member Loans'
    Sql = 'SELECT Member.MemberID, Member.FirstName, Member.LastName, Book.Title, Loan.DateBorrowed, Loan.DueDate, Loan.DateReturned FROM (Member INNER JOIN Loan ON Member.MemberID=Loan.MemberID) INNER JOIN Book ON Loan.BookID=Book.BookID;'
  }
)

New-SparkAccessDatabase -OutputPath 'public\\it-sba\\island-tours\\native\\BlueWave_Database.accdb' -Tables @(
  @{
    Name = 'Customer'
    Create = 'CREATE TABLE [Customer] ([CustomerID] TEXT(10), [FullName] TEXT(70), [Phone] TEXT(20), [Email] TEXT(80), CONSTRAINT [PK_Customer] PRIMARY KEY ([CustomerID]))'
    Rows = @(
      'INSERT INTO [Customer] ([CustomerID], [FullName], [Phone], [Email]) VALUES (''C001'', ''Nadia Cole'', ''(876) 555-5101'', ''nadia@example.com'')'
      'INSERT INTO [Customer] ([CustomerID], [FullName], [Phone], [Email]) VALUES (''C002'', ''Eric Stone'', ''(876) 555-5102'', ''eric@example.com'')'
      'INSERT INTO [Customer] ([CustomerID], [FullName], [Phone], [Email]) VALUES (''C003'', ''Maya Singh'', ''(876) 555-5103'', ''maya@example.com'')'
    )
  }
  @{
    Name = 'TourPackage'
    Create = 'CREATE TABLE [TourPackage] ([PackageCode] TEXT(10), [PackageName] TEXT(80), [AdultRate] CURRENCY, [ChildRate] CURRENCY, CONSTRAINT [PK_TourPackage] PRIMARY KEY ([PackageCode]))'
    Rows = @(
      'INSERT INTO [TourPackage] ([PackageCode], [PackageName], [AdultRate], [ChildRate]) VALUES (''CUL'', ''Culture & Heritage'', 6000, 2500)'
      'INSERT INTO [TourPackage] ([PackageCode], [PackageName], [AdultRate], [ChildRate]) VALUES (''ADV'', ''Adventure'', 7000, 4000)'
      'INSERT INTO [TourPackage] ([PackageCode], [PackageName], [AdultRate], [ChildRate]) VALUES (''NAT'', ''Nature Escape'', 7000, 3000)'
    )
  }
  @{
    Name = 'Booking'
    Create = 'CREATE TABLE [Booking] ([BookingID] TEXT(10), [CustomerID] TEXT(10), [PackageCode] TEXT(10), [TourDate] DATETIME, [Adults] INTEGER, [Children] INTEGER, [AmountPaid] CURRENCY, CONSTRAINT [PK_Booking] PRIMARY KEY ([BookingID]))'
    Rows = @(
      'INSERT INTO [Booking] ([BookingID], [CustomerID], [PackageCode], [TourDate], [Adults], [Children], [AmountPaid]) VALUES (''B001'', ''C001'', ''CUL'', #10/03/2026#, 2, 1, 5000)'
      'INSERT INTO [Booking] ([BookingID], [CustomerID], [PackageCode], [TourDate], [Adults], [Children], [AmountPaid]) VALUES (''B002'', ''C002'', ''ADV'', #10/05/2026#, 4, 2, 12000)'
      'INSERT INTO [Booking] ([BookingID], [CustomerID], [PackageCode], [TourDate], [Adults], [Children], [AmountPaid]) VALUES (''B003'', ''C003'', ''NAT'', #10/07/2026#, 1, 0, 4000)'
    )
  }
) -Relationships @(
  'ALTER TABLE [Booking] ADD CONSTRAINT [FK_Booking_CustomerID] FOREIGN KEY ([CustomerID]) REFERENCES [Customer] ([CustomerID])'
  'ALTER TABLE [Booking] ADD CONSTRAINT [FK_Booking_PackageCode] FOREIGN KEY ([PackageCode]) REFERENCES [TourPackage] ([PackageCode])'
) -Queries @(
  @{
    Name = 'Upcoming Tours'
    Sql = 'SELECT BookingID, CustomerID, PackageCode, TourDate, Adults, Children FROM Booking WHERE TourDate >= Date() ORDER BY TourDate;'
  }
  @{
    Name = 'Outstanding Payments'
    Sql = 'SELECT Customer.FullName, TourPackage.PackageName, Booking.Adults, Booking.Children, Booking.AmountPaid, ([Adults]*[AdultRate])+([Children]*[ChildRate]) AS BookingCost, (([Adults]*[AdultRate])+([Children]*[ChildRate]))-[AmountPaid] AS Balance FROM (Customer INNER JOIN Booking ON Customer.CustomerID=Booking.CustomerID) INNER JOIN TourPackage ON Booking.PackageCode=TourPackage.PackageCode;'
  }
)

Write-Host "Access database generation finished." -ForegroundColor Green