import {
  cents,
  validateJournal,
  ledger,
  trialBalance,
  cashBook,
  reconcileBank,
  depreciate,
  payroll,
  ratios,
  valueInventory,
  cashForecast,
  productionBudget,
  pettyCash,
} from "./accountingEngine";
const entry = (id, lines, date = "2026-01-01") =>
  validateJournal({
    id,
    date,
    description: id,
    lines: lines.map(([account, debit, credit]) => ({
      account,
      debit,
      credit,
    })),
  });
test("keeps cents exact and rejects ambiguous or negative posted amounts", () => {
  expect(cents("0.29")).toBe(29);
  expect(cents("123.45")).toBe(12345);
  for (const amount of ["1.001", "-1", "NaN", "1e3", "1,000", "", null])
    expect(() => cents(amount)).toThrow();
});
test("journal validates both sides, dates and recognised accounts", () => {
  expect(() =>
    entry("unbalanced", [
      ["bank", 10, 0],
      ["capital", 0, 9],
    ]),
  ).toThrow("must equal");
  expect(() =>
    entry("two sides", [
      ["bank", 10, 10],
      ["capital", 0, 1],
    ]),
  ).toThrow("never both");
  expect(() =>
    entry("bad account", [
      ["imaginary", 1, 0],
      ["capital", 0, 1],
    ]),
  ).toThrow("recognised");
  expect(() =>
    entry(
      "bad date",
      [
        ["bank", 1, 0],
        ["capital", 0, 1],
      ],
      "2026-02-30",
    ),
  ).toThrow("date");
});
test("investment, contra, credit sale and discounted settlement reconcile across books", () => {
  const entries = [
    entry("investment", [
      ["bank", 10000, 0],
      ["capital", 0, 10000],
    ]),
    entry("office cash", [
      ["cash", 1000, 0],
      ["bank", 0, 1000],
    ]),
    entry("sale", [
      ["receivables", 2000, 0],
      ["sales", 0, 2000],
    ]),
    entry("settlement", [
      ["bank", 1960, 0],
      ["discount-allowed", 40, 0],
      ["receivables", 0, 2000],
    ]),
  ];
  const accounts = ledger(entries),
    balance = (id) => accounts.find((a) => a.id === id).balance;
  expect(balance("bank")).toBe(1096000);
  expect(balance("cash")).toBe(100000);
  expect(balance("receivables")).toBe(0);
  expect(balance("sales")).toBe(-200000);
  const trial = trialBalance(entries);
  expect(trial.debit).toBe(trial.credit);
  const book = cashBook(entries);
  expect(book).toHaveLength(3);
  expect(book[1].contra).toBe(true);
  expect(book[2].discountAllowed).toBe(4000);
});
test("reconciliation handles positive balances and overdrafts", () => {
  expect(
    reconcileBank({
      cashBookBalance: 8000,
      bankCharges: 200,
      directCredits: 1000,
      unpresented: 1500,
      outstanding: 2300,
      statementBalance: 8000,
    }),
  ).toEqual({ adjustedCashBook: 8800, expectedStatement: 8000, difference: 0 });
  expect(
    reconcileBank({
      cashBookBalance: -2000,
      unpresented: 500,
      outstanding: 300,
      statementBalance: -1800,
    }).difference,
  ).toBe(0);
});
test("depreciation schedules respect residual value and method", () => {
  const straight = depreciate({ cost: 50000, residual: 5000, years: 5 });
  expect(straight[0].charge).toBe(9000);
  expect(straight.at(-1).carrying).toBe(5000);
  const reducing = depreciate({
    cost: 50000,
    residual: 5000,
    years: 2,
    rate: 20,
    method: "reducing-balance",
  });
  expect(reducing[1].charge).toBe(8000);
  expect(reducing[1].carrying).toBe(32000);
  expect(() => depreciate({ cost: 100, residual: 200, years: 5 })).toThrow();
});
test("payroll separates gross, deductions and net without fixed tax assumptions", () => {
  expect(
    payroll({
      hours: 40,
      rate: 500,
      overtimeHours: 6,
      multiplier: 1.5,
      bonus: 1000,
      deductionPercent: 5,
      fixedDeductions: 2500,
    }),
  ).toEqual({
    ordinaryPay: 20000,
    overtimePay: 4500,
    gross: 25500,
    deductions: 3775,
    net: 21725,
  });
  expect(() =>
    payroll({ hours: 1, rate: 100, fixedDeductions: 101 }),
  ).toThrow();
});
test("ratios use the correct denominators and preserve undefined values", () => {
  const v = ratios({
    sales: 100000,
    costOfSales: 60000,
    netProfit: 10000,
    currentAssets: 30000,
    currentLiabilities: 15000,
    inventory: 12000,
    openingInventory: 18000,
    capital: 50000,
  });
  expect(v.grossMargin).toBe(40);
  expect(v.netMargin).toBe(10);
  expect(v.markUp).toBeCloseTo(66.6667);
  expect(v.currentRatio).toBe(2);
  expect(v.acidTest).toBe(1.2);
  expect(v.inventoryTurnover).toBe(4);
  expect(v.returnOnCapital).toBe(20);
  expect(
    ratios({
      sales: 0,
      costOfSales: 0,
      netProfit: 0,
      currentAssets: 0,
      currentLiabilities: 0,
      inventory: 0,
      openingInventory: 0,
      capital: 0,
    }).currentRatio,
  ).toBeNull();
});
test.each([
  ["FIFO", 56, 64],
  ["LIFO", 40, 80],
  ["AVCO", 48, 72],
])("%s preserves stock value plus issue costs", (method, value, issue) => {
  const result = valueInventory(
    [
      { type: "receipt", quantity: 10, unitCost: 5 },
      { type: "receipt", quantity: 10, unitCost: 7 },
      { type: "issue", quantity: 12 },
    ],
    method,
  );
  expect(result.quantity).toBe(8);
  expect(result.value).toBe(value);
  expect(result.rows[2].issueCost).toBe(issue);
  expect(value + issue).toBe(120);
});
test("inventory moving average weights quantities and rejects overselling", () => {
  expect(
    valueInventory(
      [
        { type: "receipt", quantity: 5, unitCost: 4 },
        { type: "receipt", quantity: 15, unitCost: 8 },
        { type: "issue", quantity: 10 },
      ],
      "AVCO",
    ).value,
  ).toBe(70);
  expect(() => valueInventory([{ type: "issue", quantity: 1 }])).toThrow(
    "more stock",
  );
});
test("budgets carry balances and distinguish units from cash", () => {
  const forecast = cashForecast(5000, [
    { inflows: 12000, outflows: 14000 },
    { inflows: 10000, outflows: 15000 },
  ]);
  expect(forecast[1].opening).toBe(3000);
  expect(forecast[1].closing).toBe(-2000);
  const production = productionBudget(
    [
      { sales: 200, closing: 50, price: 150 },
      { sales: 300, closing: 60, price: 150 },
    ],
    30,
  );
  expect(production[0].production).toBe(220);
  expect(production[0].revenue).toBe(30000);
  expect(production[1].opening).toBe(50);
  expect(production[1].production).toBe(310);
});
test("petty cash reimbursement supports an increased float", () => {
  expect(
    pettyCash({
      float: 5000,
      payments: [{ amount: 800 }, { amount: 1250 }],
      target: 6000,
    }),
  ).toEqual({ spent: 2050, remaining: 2950, reimbursement: 3050 });
  expect(() =>
    pettyCash({ float: 5, payments: [{ amount: 6 }], target: 5 }),
  ).toThrow();
});
