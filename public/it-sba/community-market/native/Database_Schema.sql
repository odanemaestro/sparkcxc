-- SPARK REFERENCE - DO NOT SUBMIT
-- YardFresh_Database.accdb
-- Access SQL reference used to construct the SPARK practice database.

CREATE TABLE [Supplier] ([SupplierID] TEXT(10), [SupplierName] TEXT(80), [Phone] TEXT(20), [Email] TEXT(80), [Parish] TEXT(30), CONSTRAINT [PK_Supplier] PRIMARY KEY ([SupplierID]));

CREATE TABLE [Product] ([ProductID] TEXT(10), [ProductName] TEXT(80), [Category] TEXT(30), [UnitPrice] CURRENCY, [QuantityInStock] INTEGER, [ReorderLevel] INTEGER, [SupplierID] TEXT(10), CONSTRAINT [PK_Product] PRIMARY KEY ([ProductID]));

CREATE TABLE [StockPurchase] ([PurchaseID] TEXT(10), [ProductID] TEXT(10), [PurchaseDate] DATETIME, [QuantityBought] INTEGER, [CostPerUnit] CURRENCY, CONSTRAINT [PK_StockPurchase] PRIMARY KEY ([PurchaseID]));

INSERT INTO [Supplier] ([SupplierID], [SupplierName], [Phone], [Email], [Parish]) VALUES ('SUP01', 'Kingston Foods Ltd.', '(876) 555-3101', 'orders@kingstonfoods.example', 'Kingston');
INSERT INTO [Supplier] ([SupplierID], [SupplierName], [Phone], [Email], [Parish]) VALUES ('SUP02', 'Island Produce Co.', '(876) 555-3102', 'sales@islandproduce.example', 'St. Catherine');

INSERT INTO [Product] ([ProductID], [ProductName], [Category], [UnitPrice], [QuantityInStock], [ReorderLevel], [SupplierID]) VALUES ('PR001', 'Rice 2kg', 'Grocery', 980, 25, 10, 'SUP01');
INSERT INTO [Product] ([ProductID], [ProductName], [Category], [UnitPrice], [QuantityInStock], [ReorderLevel], [SupplierID]) VALUES ('PR002', 'Plantain Chips', 'Snacks', 350, 8, 12, 'SUP01');
INSERT INTO [Product] ([ProductID], [ProductName], [Category], [UnitPrice], [QuantityInStock], [ReorderLevel], [SupplierID]) VALUES ('PR003', 'Fresh Juice', 'Beverage', 500, 18, 8, 'SUP02');
INSERT INTO [Product] ([ProductID], [ProductName], [Category], [UnitPrice], [QuantityInStock], [ReorderLevel], [SupplierID]) VALUES ('PR004', 'Ground Coffee', 'Beverage', 1800, 6, 8, 'SUP01');

INSERT INTO [StockPurchase] ([PurchaseID], [ProductID], [PurchaseDate], [QuantityBought], [CostPerUnit]) VALUES ('PO001', 'PR001', #09/01/2026#, 40, 720);
INSERT INTO [StockPurchase] ([PurchaseID], [ProductID], [PurchaseDate], [QuantityBought], [CostPerUnit]) VALUES ('PO002', 'PR002', #09/03/2026#, 36, 240);
INSERT INTO [StockPurchase] ([PurchaseID], [ProductID], [PurchaseDate], [QuantityBought], [CostPerUnit]) VALUES ('PO003', 'PR004', #09/05/2026#, 24, 1300);

ALTER TABLE [Product] ADD CONSTRAINT [FK_Product_SupplierID] FOREIGN KEY ([SupplierID]) REFERENCES [Supplier] ([SupplierID]);
ALTER TABLE [StockPurchase] ADD CONSTRAINT [FK_StockPurchase_ProductID] FOREIGN KEY ([ProductID]) REFERENCES [Product] ([ProductID]);

-- Saved query: Low Stock
SELECT ProductID, ProductName, Category, QuantityInStock, ReorderLevel FROM Product WHERE QuantityInStock <= ReorderLevel ORDER BY ProductName;

-- Saved query: Supplier Orders
SELECT Supplier.SupplierName, Product.ProductName, StockPurchase.QuantityBought, StockPurchase.CostPerUnit, [QuantityBought]*[CostPerUnit] AS OrderValue FROM (Supplier INNER JOIN Product ON Supplier.SupplierID=Product.SupplierID) INNER JOIN StockPurchase ON Product.ProductID=StockPurchase.ProductID;
