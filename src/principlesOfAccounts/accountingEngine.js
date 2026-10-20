// All posted money is held as integer cents. No floating-point equality checks.
export function cents(value) {
  if (typeof value !== "string" && typeof value !== "number")
    throw new Error("Enter an amount.");
  const s = String(value).trim();
  if (!/^\d+(?:\.\d{1,2})?$/.test(s))
    throw new Error(
      "Use a non-negative amount with at most two decimal places.",
    );
  const [whole, fraction = ""] = s.split(".");
  const result = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  if (!Number.isSafeInteger(result) || result > 1e12)
    throw new Error("Amount is too large.");
  return result;
}
export const money = (value) =>
  (value / 100).toLocaleString("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
export const ACCOUNTS = Object.freeze(
  [
    ["cash", "Cash", "asset"],
    ["bank", "Bank", "asset"],
    ["receivables", "Trade receivables", "asset"],
    ["inventory", "Inventory", "asset"],
    ["equipment", "Equipment", "asset"],
    ["prepayments", "Prepaid expenses", "asset"],
    ["payables", "Trade payables", "liability"],
    ["loan", "Loan", "liability"],
    ["accruals", "Accrued expenses", "liability"],
    ["capital", "Capital", "equity"],
    ["drawings", "Drawings", "drawings"],
    ["sales", "Sales", "income"],
    ["returns-out", "Purchases returns", "income"],
    ["discount-received", "Discount received", "income"],
    ["purchases", "Purchases", "expense"],
    ["returns-in", "Sales returns", "expense"],
    ["rent", "Rent", "expense"],
    ["wages", "Wages", "expense"],
    ["discount-allowed", "Discount allowed", "expense"],
    ["bank-charges", "Bank charges", "expense"],
    ["bad-debts", "Bad debts", "expense"],
    ["depreciation", "Depreciation", "expense"],
    ["accum-depreciation", "Accumulated depreciation", "contra-asset"],
  ].map(([id, name, type]) => Object.freeze({ id, name, type })),
);
export function validateJournal(entry, accounts = ACCOUNTS) {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(entry?.date || "") ||
    !Number.isFinite(Date.parse(entry.date)) ||
    new Date(entry.date).toISOString().slice(0, 10) !== entry.date
  )
    throw new Error("Choose a valid transaction date.");
  if (!String(entry?.description || "").trim())
    throw new Error("Describe the transaction so you can trace it later.");
  if (!Array.isArray(entry.lines) || entry.lines.length < 2)
    throw new Error("A journal entry needs at least two lines.");
  const allowed = new Set(accounts.map((a) => a.id));
  let debit = 0,
    credit = 0;
  const lines = entry.lines.map((l) => {
    if (!allowed.has(l.account))
      throw new Error("Choose a recognised account.");
    const d = cents(l.debit || 0),
      c = cents(l.credit || 0);
    if (d > 0 === c > 0)
      throw new Error(
        "Each line needs either a debit or a credit, never both.",
      );
    debit += d;
    credit += c;
    return { account: l.account, debit: d, credit: c };
  });
  if (debit !== credit)
    throw new Error(
      `Debits ${money(debit)} must equal credits ${money(credit)}. Difference: ${money(Math.abs(debit - credit))}.`,
    );
  if (debit > 1e12) throw new Error("Entry total is too large.");
  return {
    id: entry.id || globalThis.crypto.randomUUID(),
    date: entry.date,
    description: String(entry.description).trim(),
    lines,
  };
}
export function ledger(entries, accounts = ACCOUNTS) {
  return accounts.map((account) => {
    let balance = 0;
    const rows = entries
      .flatMap((e) =>
        e.lines
          .filter((l) => l.account === account.id)
          .map((l) => ({
            ...l,
            id: e.id,
            date: e.date,
            description: e.description,
          })),
      )
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((l) => {
        balance += l.debit - l.credit;
        return { ...l, balance };
      });
    return {
      ...account,
      rows,
      balance,
      debit: Math.max(0, balance),
      credit: Math.max(0, -balance),
    };
  });
}
export function trialBalance(entries, accounts = ACCOUNTS) {
  const rows = ledger(entries, accounts).filter((a) => a.rows.length);
  return {
    rows,
    debit: rows.reduce((n, r) => n + r.debit, 0),
    credit: rows.reduce((n, r) => n + r.credit, 0),
  };
}
export function cashBook(entries) {
  return entries
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((e) => e.lines.some((l) => ["cash", "bank"].includes(l.account)))
    .map((e) => {
      const value = (id, side) =>
        e.lines
          .filter((l) => l.account === id)
          .reduce((n, l) => n + l[side], 0);
      const contra =
        (value("cash", "debit") > 0 && value("bank", "credit") > 0) ||
        (value("cash", "credit") > 0 && value("bank", "debit") > 0);
      return {
        id: e.id,
        date: e.date,
        description: e.description,
        contra,
        cashIn: value("cash", "debit"),
        cashOut: value("cash", "credit"),
        bankIn: value("bank", "debit"),
        bankOut: value("bank", "credit"),
        discountAllowed: value("discount-allowed", "debit"),
        discountReceived: value("discount-received", "credit"),
      };
    });
}
const num = (x, label = "value") => {
  if (x === "" || x == null || !Number.isFinite(Number(x)) || Number(x) < 0)
    throw new Error(`Enter a non-negative ${label}.`);
  return Number(x);
};
const n = (x, label) => num(x, label);
export function reconcileBank({
  cashBookBalance,
  bankCharges = 0,
  directCredits = 0,
  directDebits = 0,
  dishonoured = 0,
  unpresented = 0,
  outstanding = 0,
  statementBalance,
}) {
  const cb = Number(cashBookBalance),
    statement = Number(statementBalance);
  if (
    !Number.isFinite(cb) ||
    !Number.isFinite(statement) ||
    String(cashBookBalance).trim() === "" ||
    String(statementBalance).trim() === ""
  )
    throw new Error(
      "Enter signed balances; use a negative number for an overdraft.",
    );
  const adjusted =
    cb - n(bankCharges) - n(directDebits) - n(dishonoured) + n(directCredits);
  const expected = adjusted + n(unpresented) - n(outstanding);
  return {
    adjustedCashBook: adjusted,
    expectedStatement: expected,
    difference: Math.round((expected - statement) * 100) / 100,
  };
}
export function depreciate({
  cost,
  residual = 0,
  years,
  rate = 20,
  method = "straight-line",
}) {
  cost = n(cost);
  residual = n(residual);
  years = n(years);
  rate = n(rate);
  if (
    !Number.isInteger(years) ||
    years < 1 ||
    years > 100 ||
    residual > cost ||
    rate > 100 ||
    !["straight-line", "reducing-balance"].includes(method)
  )
    throw new Error(
      "Use 1–100 whole years, residual no greater than cost, and a rate from 0 to 100.",
    );
  let carrying = cost,
    accumulated = 0;
  return Array.from({ length: years }, (_, i) => {
    const opening = carrying;
    const charge =
      Math.round(
        Math.min(
          carrying - residual,
          method === "straight-line"
            ? i === years - 1
              ? carrying - residual
              : (cost - residual) / years
            : (carrying * rate) / 100,
        ) * 100,
      ) / 100;
    carrying = Math.round((carrying - charge) * 100) / 100;
    accumulated = Math.round((accumulated + charge) * 100) / 100;
    return { year: i + 1, opening, charge, accumulated, carrying };
  });
}
export function payroll({
  hours,
  rate,
  overtimeHours = 0,
  multiplier = 1.5,
  bonus = 0,
  deductionPercent = 0,
  fixedDeductions = 0,
}) {
  const gross =
    n(hours) * n(rate) + n(overtimeHours) * n(rate) * n(multiplier) + n(bonus);
  const deductions = (gross * n(deductionPercent)) / 100 + n(fixedDeductions);
  if (n(deductionPercent) > 100 || deductions > gross)
    throw new Error(
      "Deductions cannot exceed gross pay. Check the exercise values.",
    );
  return {
    ordinaryPay: n(hours) * n(rate),
    overtimePay: n(overtimeHours) * n(rate) * n(multiplier),
    gross,
    deductions,
    net: gross - deductions,
  };
}
export function ratios({
  sales,
  costOfSales,
  netProfit,
  currentAssets,
  currentLiabilities,
  inventory,
  openingInventory,
  capital,
}) {
  const s = n(sales),
    c = n(costOfSales),
    a = n(currentAssets),
    l = n(currentLiabilities),
    stock = n(inventory),
    opening = n(openingInventory),
    cap = n(capital);
  const profit = Number(netProfit);
  if (!Number.isFinite(profit) || String(netProfit).trim() === "" || stock > a)
    throw new Error(
      "Enter valid profit (negative for a loss); inventory cannot exceed current assets.",
    );
  const divide = (x, y, m = 1) => (y === 0 ? null : (x / y) * m);
  return {
    grossProfit: s - c,
    grossMargin: divide(s - c, s, 100),
    netMargin: divide(profit, s, 100),
    markUp: divide(s - c, c, 100),
    workingCapital: a - l,
    currentRatio: divide(a, l),
    acidTest: divide(a - stock, l),
    inventoryTurnover: divide(c, (opening + stock) / 2),
    returnOnCapital: divide(profit, cap, 100),
  };
}
export function valueInventory(transactions, method = "FIFO") {
  if (!["FIFO", "LIFO", "AVCO"].includes(method))
    throw new Error("Choose FIFO, LIFO or AVCO.");
  let layers = [],
    quantity = 0,
    value = 0;
  const rows = [];
  for (const t of transactions) {
    const qty = n(t.quantity);
    if (qty <= 0 || !Number.isInteger(qty))
      throw new Error("Use a positive whole quantity.");
    let issueCost = 0;
    if (t.type === "receipt") {
      const unit = n(t.unitCost);
      layers.push({ quantity: qty, cost: unit });
      quantity += qty;
      value += qty * unit;
    } else if (t.type === "issue") {
      if (qty > quantity)
        throw new Error("Cannot issue more stock than is available.");
      if (method === "AVCO") {
        issueCost = (qty * value) / quantity;
        quantity -= qty;
        value -= issueCost;
        layers = quantity ? [{ quantity, cost: value / quantity }] : [];
      } else {
        let remaining = qty;
        while (remaining) {
          const index = method === "FIFO" ? 0 : layers.length - 1;
          const layer = layers[index],
            take = Math.min(remaining, layer.quantity);
          issueCost += take * layer.cost;
          layer.quantity -= take;
          remaining -= take;
          if (!layer.quantity) layers.splice(index, 1);
        }
        quantity -= qty;
        value -= issueCost;
      }
    } else throw new Error("Choose receipt or issue.");
    rows.push({
      ...t,
      movementQuantity: qty,
      issueCost,
      quantity,
      value: Math.abs(value) < 1e-8 ? 0 : value,
    });
  }
  return { rows, quantity, value: Math.abs(value) < 1e-8 ? 0 : value, layers };
}
export function cashForecast(opening, months) {
  let balance = Number(opening);
  if (!Number.isFinite(balance) || String(opening).trim() === "")
    throw new Error("Enter opening cash.");
  return months.map((m) => {
    const start = balance,
      inflows = n(m.inflows),
      outflows = n(m.outflows);
    balance = Math.round((balance + inflows - outflows) * 100) / 100;
    return { ...m, opening: start, net: inflows - outflows, closing: balance };
  });
}
export function productionBudget(months, opening) {
  let stock = n(opening);
  return months.map((m) => {
    const sales = n(m.sales),
      closing = n(m.closing),
      production = sales + closing - stock;
    if (production < 0)
      throw new Error(
        "Opening stock exceeds planned sales plus closing stock. Revise the plan.",
      );
    const row = {
      ...m,
      opening: stock,
      production,
      revenue: sales * n(m.price),
    };
    stock = closing;
    return row;
  });
}
export function pettyCash({ float, payments, target }) {
  const start = n(float),
    spent = payments.reduce((sum, p) => sum + n(p.amount), 0),
    next = n(target);
  if (spent > start) throw new Error("Payments exceed the available float.");
  if (next < start - spent)
    throw new Error("Target float is below the cash remaining.");
  return {
    spent,
    remaining: start - spent,
    reimbursement: next - (start - spent),
  };
}
