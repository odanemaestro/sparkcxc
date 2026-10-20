import React, { useEffect, useMemo, useState } from "react";
import {
  ACCOUNTS as BASE_ACCOUNTS,
  validateJournal,
  ledger,
  trialBalance,
  cashBook,
  money,
  reconcileBank,
  depreciate,
  payroll,
  ratios,
  valueInventory,
  cashForecast,
  productionBudget,
  pettyCash,
} from "../accountingEngine";
import "./accountingWorkspace.css";
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const blankLine = () => ({ account: "bank", debit: "", credit: "" });
export function accountingCsvCell(value) {
  const text = String(value);
  const safe = /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
  return '"' + safe.replaceAll('"', '""') + '"';
}
const decimal = (x) =>
  x == null
    ? "Undefined"
    : Number(x).toLocaleString("en", { maximumFractionDigits: 2 });
const SEED = {
  customAccounts: [],
  opening: "0",
  productionOpening: "0",
  float: "5000",
  target: "5000",
  calculatorValues: {},
  inventory: [],
  inventoryMethod: "FIFO",
  entries: [],
  petty: [],
  sba: {},
  forecast: Array.from({ length: 6 }, (_, i) => ({
    month: `Month ${i + 1}`,
    inflows: "0",
    outflows: "0",
  })),
  production: Array.from({ length: 3 }, (_, i) => ({
    month: `Month ${i + 1}`,
    sales: "0",
    closing: "0",
    price: "0",
  })),
};
export function validateAccountingWork(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Invalid workspace file.");
  const v = { ...structuredClone(SEED), ...value };
  if (
    !Array.isArray(v.customAccounts) ||
    v.customAccounts.length > 200 ||
    !Array.isArray(v.entries) ||
    v.entries.length > 10000 ||
    !Array.isArray(v.petty) ||
    !Array.isArray(v.forecast) ||
    v.forecast.length !== 6 ||
    !Array.isArray(v.production) ||
    v.production.length !== 3 ||
    !Array.isArray(v.inventory) ||
    !v.sba ||
    typeof v.sba !== "object" ||
    !v.calculatorValues ||
    typeof v.calculatorValues !== "object"
  )
    throw new Error("Invalid workspace structure.");
  const chart = [...BASE_ACCOUNTS],
    ids = new Set(chart.map((a) => a.id));
  for (const a of v.customAccounts) {
    if (
      !a ||
      typeof a.id !== "string" ||
      ids.has(a.id) ||
      typeof a.name !== "string" ||
      !a.name.trim() ||
      a.name.length > 80 ||
      ![
        "asset",
        "liability",
        "equity",
        "income",
        "expense",
        "drawings",
        "contra-asset",
      ].includes(a.type)
    )
      throw new Error("Invalid custom account.");
    ids.add(a.id);
    chart.push(a);
  }
  const entries = new Set();
  for (const e of v.entries) {
    if (
      !e ||
      typeof e.id !== "string" ||
      entries.has(e.id) ||
      !Array.isArray(e.lines)
    )
      throw new Error("Invalid journal record.");
    entries.add(e.id);
    for (const l of e.lines)
      if (
        !Number.isSafeInteger(l.debit) ||
        !Number.isSafeInteger(l.credit) ||
        l.debit < 0 ||
        l.credit < 0
      )
        throw new Error("Invalid saved journal amount.");
    validateJournal(
      {
        ...e,
        lines: e.lines.map((l) => ({
          ...l,
          debit: (l.debit / 100).toFixed(2),
          credit: (l.credit / 100).toFixed(2),
        })),
      },
      chart,
    );
  }
  if (
    ledger(v.entries, chart)
      .find((a) => a.id === "cash")
      .rows.some((r) => r.balance < 0)
  )
    throw new Error("Saved cash cannot be negative.");
  valueInventory(v.inventory, v.inventoryMethod);
  return v;
}
export function loadAccountingWork(key) {
  try {
    const v = JSON.parse(localStorage.getItem(key) || "null");
    if (v) return validateAccountingWork(v);
  } catch {}
  return structuredClone(SEED);
}

function download(name, data, type = "application/json") {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const Field = ({ label, value, onChange, signed = false }) => (
  <label>
    {label}
    <input
      type="number"
      step="any"
      min={signed ? undefined : 0}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);
function DataTable({ caption, headers, rows }) {
  return (
    <div
      className="poa-table-scroll"
      tabIndex="0"
      role="region"
      aria-label={caption}
    >
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {headers.map((h) => (
              <th scope="col" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((v, j) => (
                <td key={j}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const calcDefinitions = {
  reconciliation: {
    title: "Bank reconciliation",
    note: "Use signed balances: negative means overdraft. Update the cash book first, then reconcile timing differences to the statement.",
    fields: {
      cashBookBalance: ["Cash book balance", "8000"],
      bankCharges: ["Unrecorded bank charges", "200"],
      directCredits: ["Unrecorded direct credits", "1000"],
      directDebits: ["Unrecorded direct debits", "0"],
      dishonoured: ["Unrecorded dishonoured cheques", "0"],
      unpresented: ["Unpresented cheques", "1500"],
      outstanding: ["Outstanding lodgements", "2300"],
      statementBalance: ["Actual statement balance", "8000"],
    },
    calculate: reconcileBank,
  },
  depreciation: {
    title: "Depreciation schedule",
    note: "Choose a method. Years means useful life for straight-line and schedule length for reducing balance. The residual value is a floor.",
    fields: {
      cost: ["Asset cost", "50000"],
      residual: ["Residual value", "5000"],
      years: ["Years", "5"],
      rate: ["Reducing balance rate (%)", "20"],
    },
    calculate: depreciate,
  },
  payroll: {
    title: "Payroll calculator",
    note: "Enter rates and deductions supplied by your exercise. This tool does not calculate current statutory taxes.",
    fields: {
      hours: ["Ordinary hours", "40"],
      rate: ["Hourly rate", "500"],
      overtimeHours: ["Overtime hours", "6"],
      multiplier: ["Overtime multiplier", "1.5"],
      bonus: ["Bonus", "1000"],
      deductionPercent: ["Exercise deduction (% of gross)", "5"],
      fixedDeductions: ["Other fixed deductions", "2500"],
    },
    calculate: payroll,
  },
  ratios: {
    title: "Financial ratios",
    note: "All figures must cover the same business and period. Return uses the capital and profit basis you enter; zero denominators display Undefined.",
    fields: {
      sales: ["Net sales", "100000"],
      costOfSales: ["Cost of sales", "60000"],
      netProfit: ["Net profit / loss", "10000"],
      currentAssets: ["Current assets", "30000"],
      currentLiabilities: ["Current liabilities", "15000"],
      inventory: ["Closing inventory", "12000"],
      openingInventory: ["Opening inventory", "18000"],
      capital: ["Capital employed", "50000"],
    },
    calculate: ratios,
  },
};
function Calculator({ kind, values, onValuesChange }) {
  const def = calcDefinitions[kind];
  const [v, setV] = useState(() => ({
    ...Object.fromEntries(
      Object.entries(def.fields).map(([k, r]) => [k, r[1]]),
    ),
    ...values,
  }));
  const [method, setMethod] = useState(values?.method || "straight-line");
  useEffect(() => onValuesChange({ ...v, method }), [v, method]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  return (
    <section>
      <h4>{def.title}</h4>
      <p>{def.note}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            setResult(def.calculate({ ...v, method }));
            setError("");
          } catch (err) {
            setError(err.message);
            setResult(null);
          }
        }}
      >
        <div className="poa-fields">
          {Object.entries(def.fields).map(([key, [label]]) => (
            <Field
              key={key}
              label={label}
              value={v[key]}
              signed={[
                "cashBookBalance",
                "statementBalance",
                "netProfit",
              ].includes(key)}
              onChange={(value) => {
                setV({ ...v, [key]: value });
                setResult(null);
              }}
            />
          ))}
          {kind === "depreciation" && (
            <label>
              Method
              <select
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value);
                  setResult(null);
                }}
              >
                <option value="straight-line">Straight-line</option>
                <option value="reducing-balance">Reducing balance</option>
              </select>
            </label>
          )}
        </div>
        <button type="submit">Calculate</button>
      </form>
      <p role="alert">{error}</p>
      {result &&
        (Array.isArray(result) ? (
          <DataTable
            caption="Annual depreciation"
            headers={[
              "Year",
              "Opening value",
              "Charge",
              "Accumulated",
              "Closing value",
            ]}
            rows={result.map((r) => Object.values(r).map(decimal))}
          />
        ) : (
          <dl className="poa-results">
            {Object.entries(result).map(([k, r]) => (
              <div key={k}>
                <dt>{k.replace(/([A-Z])/g, " $1")}</dt>
                <dd>{decimal(r)}</dd>
              </div>
            ))}
          </dl>
        ))}
    </section>
  );
}
function InventoryLab({ transactions, setTransactions, method, setMethod }) {
  const [type, setType] = useState("receipt"),
    [quantity, setQuantity] = useState("10"),
    [unitCost, setUnitCost] = useState("5"),
    [error, setError] = useState("");
  let result;
  try {
    result = valueInventory(transactions, method);
  } catch (e) {
    result = null;
  }
  return (
    <section>
      <h4>Inventory cost layers</h4>
      <p>
        Add receipts and issues in date order. AVCO uses moving weighted average
        after each receipt. Compare methods using the same transactions.
      </p>
      <label>
        Valuation method
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          {["FIFO", "LIFO", "AVCO"].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            const next = [...transactions, { type, quantity, unitCost }];
            valueInventory(next, method);
            setTransactions(next);
            setError("");
          } catch (err) {
            setError(err.message);
          }
        }}
      >
        <div className="poa-fields">
          <label>
            Movement
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="receipt">Receipt</option>
              <option value="issue">Issue</option>
            </select>
          </label>
          <Field label="Units" value={quantity} onChange={setQuantity} />
          {type === "receipt" && (
            <Field
              label="Cost per unit"
              value={unitCost}
              onChange={setUnitCost}
            />
          )}
        </div>
        <button>Add movement</button>
        <button
          type="button"
          className="secondary"
          disabled={!transactions.length}
          onClick={() => setTransactions(transactions.slice(0, -1))}
        >
          Undo last movement
        </button>
      </form>
      <p role="alert">{error}</p>
      {result && (
        <DataTable
          caption={`${method} inventory record`}
          headers={[
            "Movement",
            "Units",
            "Issue cost",
            "Units remaining",
            "Stock value",
          ]}
          rows={result.rows.map((r) => [
            r.type,
            r.movementQuantity,
            decimal(r.issueCost),
            r.quantity === undefined ? "" : r.quantity,
            decimal(r.value),
          ])}
        />
      )}
      {result && (
        <p>
          Closing stock: {result.quantity} units valued at{" "}
          {decimal(result.value)}.
        </p>
      )}
    </section>
  );
}
const sbaPrompts = {
  title: "Project title and business context",
  aim: "Research aim and objectives",
  questions: "Research questions",
  method: "Data collection method, sample and consent",
  evidence: "Evidence log and source references",
  analysis: "Calculations, findings and interpretation",
  conclusion: "Conclusions linked to objectives",
  recommendations: "Recommendations supported by findings",
  limitations: "Limitations and improvements",
  plan: "Business plan: product, customers, operations, costs, finance and risks",
};
export default function AccountingWorkspace({
  userId,
  topic,
  onActivityComplete,
}) {
  const storageKey = `spark-poa-workspace-v1:${userId || "guest"}`;
  const [work, setWork] = useState(() => loadAccountingWork(storageKey)),
    [tab, setTab] = useState("journal"),
    [entry, setEntry] = useState({
      date: today(),
      description: "",
      lines: [blankLine(), blankLine()],
    }),
    [error, setError] = useState(""),
    [saveError, setSaveError] = useState(""),
    [selectedAccount, setSelectedAccount] = useState("bank");
  const chart = useMemo(
    () => [...BASE_ACCOUNTS, ...work.customAccounts],
    [work.customAccounts],
  );
  const [accountName, setAccountName] = useState(""),
    [accountType, setAccountType] = useState("asset");
  const opening = work.opening,
    productionOpening = work.productionOpening,
    float = work.float,
    target = work.target;
  const setOpening = (v) => setWork({ ...work, opening: v }),
    setProductionOpening = (v) => setWork({ ...work, productionOpening: v }),
    setFloat = (v) => setWork({ ...work, float: v }),
    setTarget = (v) => setWork({ ...work, target: v });
  const [pettyAmount, setPettyAmount] = useState(""),
    [pettyDescription, setPettyDescription] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(work));
      setSaveError("");
    } catch {
      setSaveError(
        "Your browser could not save this work. Export a backup before leaving.",
      );
    }
  }, [work, storageKey]);
  const accounts = useMemo(
    () => ledger(work.entries, chart),
    [work.entries, chart],
  );
  const trial = useMemo(
    () => trialBalance(work.entries, chart),
    [work.entries, chart],
  );
  const book = useMemo(() => cashBook(work.entries), [work.entries]);
  const changeLine = (index, key, value) =>
    setEntry({
      ...entry,
      lines: entry.lines.map((l, i) =>
        i === index ? { ...l, [key]: value } : l,
      ),
    });
  const complete = () =>
    onActivityComplete?.({
      activityId: `poa:${topic?.id || "workspace"}:journal`,
      activityType: "lab",
      title: "Accounting journal exploration",
      topicId: topic?.id,
      sectionId: topic?.sectionId,
    });
  const patch = (key, value) => setWork({ ...work, [key]: value });
  const tabs = [
    ["journal", "Journal"],
    ["ledger", "Ledger"],
    ["trial", "Trial balance"],
    ["cashbook", "Cash book"],
    ["petty", "Petty cash"],
    ["reconciliation", "Bank reconciliation"],
    ["depreciation", "Depreciation"],
    ["ratios", "Ratios"],
    ["inventory", "Inventory"],
    ["payroll", "Payroll"],
    ["budgets", "Budgets"],
    ["sba", "SBA planner"],
  ];
  let forecast, production, petty;
  try {
    forecast = cashForecast(opening, work.forecast);
  } catch {}
  try {
    production = productionBudget(work.production, productionOpening);
  } catch {}
  try {
    petty = pettyCash({ float, payments: work.petty, target });
  } catch {}
  return (
    <section className="poa-workspace" aria-label="Accounting workspace">
      <header>
        <span className="poa-eyebrow">Learn by doing</span>
        <h3>Accounting workspace</h3>
        <p>
          Post a transaction once. Trace it through the journal, ledger, cash
          book and trial balance. Your practice records stay in this browser.
        </p>
      </header>
      <nav aria-label="Accounting tools" className="poa-tool-nav">
        {tabs.map(([id, label]) => (
          <button
            type="button"
            key={id}
            aria-pressed={tab === id}
            onClick={() => {
              setTab(id);
              setError("");
            }}
          >
            {label}
          </button>
        ))}
      </nav>
      <p role="alert">{saveError}</p>
      {tab === "journal" && (
        <section>
          <h4>General journal</h4>
          <p>
            Choose the accounts and enter equal debits and credits. Posting
            checks equality; you must still check that the accounts and amounts
            match the transaction.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              try {
                const posted = validateJournal(entry, chart);
                const proposed = [...work.entries, posted];
                const cash = ledger(proposed, chart).find(
                  (a) => a.id === "cash",
                );
                if (cash.rows.some((r) => r.balance < 0))
                  throw new Error(
                    "Physical cash cannot become negative. Check the transaction or opening entry.",
                  );
                patch("entries", proposed);
                setEntry({
                  date: entry.date,
                  description: "",
                  lines: [blankLine(), blankLine()],
                });
                setError("");
                complete();
              } catch (err) {
                setError(err.message);
              }
            }}
          >
            <div className="poa-fields">
              <label>
                Date
                <input
                  required
                  type="date"
                  value={entry.date}
                  onChange={(e) => setEntry({ ...entry, date: e.target.value })}
                />
              </label>
              <label>
                Transaction description
                <input
                  required
                  maxLength="300"
                  value={entry.description}
                  onChange={(e) =>
                    setEntry({ ...entry, description: e.target.value })
                  }
                />
              </label>
            </div>
            {entry.lines.map((line, i) => (
              <div className="poa-journal-line" key={i}>
                <label>
                  Account {i + 1}
                  <select
                    value={line.account}
                    onChange={(e) => changeLine(i, "account", e.target.value)}
                  >
                    {chart.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </label>
                <Field
                  label={`Debit ${i + 1}`}
                  value={line.debit}
                  onChange={(v) => changeLine(i, "debit", v)}
                />
                <Field
                  label={`Credit ${i + 1}`}
                  value={line.credit}
                  onChange={(v) => changeLine(i, "credit", v)}
                />
                {entry.lines.length > 2 && (
                  <button
                    type="button"
                    className="secondary"
                    onClick={() =>
                      setEntry({
                        ...entry,
                        lines: entry.lines.filter((_, j) => j !== i),
                      })
                    }
                  >
                    Remove line {i + 1}
                  </button>
                )}
              </div>
            ))}
            <div className="poa-actions">
              <button
                type="button"
                className="secondary"
                onClick={() =>
                  setEntry({ ...entry, lines: [...entry.lines, blankLine()] })
                }
              >
                Add split line
              </button>
              <button type="submit">Post transaction</button>
            </div>
          </form>
          <p role="alert">{error}</p>
          {work.entries.length === 0 ? (
            <p>
              No entries yet. Try an opening investment: debit bank and credit
              capital for the same amount.
            </p>
          ) : (
            work.entries.map((e) => (
              <article className="poa-entry" key={e.id}>
                <strong>
                  {e.date} · {e.description}
                </strong>
                <DataTable
                  caption="Journal lines"
                  headers={["Account", "Debit", "Credit"]}
                  rows={e.lines.map((l) => [
                    chart.find((a) => a.id === l.account)?.name,
                    money(l.debit),
                    money(l.credit),
                  ])}
                />
                <button
                  className="secondary"
                  type="button"
                  onClick={() => {
                    const proposed = work.entries.filter((x) => x.id !== e.id);
                    if (
                      ledger(proposed, chart)
                        .find((a) => a.id === "cash")
                        .rows.some((r) => r.balance < 0)
                    ) {
                      setError(
                        "Removing this entry would make physical cash negative. Remove dependent cash payments first.",
                      );
                      return;
                    }
                    patch("entries", proposed);
                  }}
                >
                  Remove this practice transaction
                </button>
              </article>
            ))
          )}
        </section>
      )}
      {tab === "ledger" && (
        <section>
          <h4>Ledger and running balances</h4>
          <details>
            <summary>Add a practice account</summary>
            <p>
              Create customer, supplier, partner capital/current or other
              accounts for the exercise you are studying.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const name = accountName.trim();
                if (
                  !name ||
                  name.length > 80 ||
                  chart.some((a) => a.name.toLowerCase() === name.toLowerCase())
                ) {
                  setError("Use a unique account name of 1–80 characters.");
                  return;
                }
                const account = {
                  id: "custom-" + crypto.randomUUID(),
                  name,
                  type: accountType,
                };
                patch("customAccounts", [...work.customAccounts, account]);
                setSelectedAccount(account.id);
                setAccountName("");
                setError("");
              }}
            >
              <div className="poa-fields">
                <label>
                  New account name
                  <input
                    value={accountName}
                    maxLength="80"
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </label>
                <label>
                  Account category
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                  >
                    {[
                      "asset",
                      "liability",
                      "equity",
                      "income",
                      "expense",
                      "drawings",
                      "contra-asset",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>
              <button>Add account</button>
            </form>
            <p role="alert">{error}</p>
          </details>
          <label>
            Account
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              {chart.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <DataTable
            caption={chart.find((a) => a.id === selectedAccount).name}
            headers={["Date", "Details", "Debit", "Credit", "Balance"]}
            rows={accounts
              .find((a) => a.id === selectedAccount)
              .rows.map((r) => [
                r.date,
                r.description,
                money(r.debit),
                money(r.credit),
                `${money(Math.abs(r.balance))} ${r.balance >= 0 ? "Dr" : "Cr"}`,
              ])}
          />
          <p>
            The closing balance is the difference between the two sides. In a
            T-account, put balance c/d on the smaller side, then bring it down
            on the opposite side. Income and expenses close to profit and loss
            at period end.
          </p>
        </section>
      )}
      {tab === "trial" && (
        <section>
          <h4>Trial balance</h4>
          <DataTable
            caption="Balances from your ledger"
            headers={["Account", "Debit", "Credit"]}
            rows={[
              ...trial.rows.map((r) => [
                r.name,
                money(r.debit),
                money(r.credit),
              ]),
              ["Total", money(trial.debit), money(trial.credit)],
            ]}
          />
          <p>
            Difference: {money(Math.abs(trial.debit - trial.credit))}. Agreement
            does not detect complete omissions, errors of principle or equal
            wrong amounts on both sides.
          </p>
        </section>
      )}
      {tab === "cashbook" && (
        <section>
          <h4>Three-column cash book</h4>
          <p>
            Receipts are debit entries; payments are credit entries. C
            identifies a cash-bank contra transfer. Discount columns are
            totalled, not balanced.
          </p>
          <DataTable
            caption="Cash and bank movements from your journal"
            headers={[
              "Date",
              "Details",
              "C",
              "Cash in",
              "Cash out",
              "Bank in",
              "Bank out",
              "Discount allowed",
              "Discount received",
            ]}
            rows={book.map((r) => [
              r.date,
              r.description,
              r.contra ? "C" : "",
              ...[
                "cashIn",
                "cashOut",
                "bankIn",
                "bankOut",
                "discountAllowed",
                "discountReceived",
              ].map((k) => money(r[k])),
            ])}
          />
          <p>
            Cash balance {money(accounts.find((a) => a.id === "cash").balance)}.
            Bank balance{" "}
            {money(Math.abs(accounts.find((a) => a.id === "bank").balance))}{" "}
            {accounts.find((a) => a.id === "bank").balance < 0
              ? "overdraft"
              : "Dr"}
            .
          </p>
        </section>
      )}
      {tab === "petty" && (
        <section>
          <h4>Petty cash imprest</h4>
          <div className="poa-fields">
            <Field label="Opening float" value={float} onChange={setFloat} />
            <Field
              label="Target float after reimbursement"
              value={target}
              onChange={setTarget}
            />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              try {
                if (!pettyDescription.trim())
                  throw new Error("Describe the payment.");
                const payments = [
                  ...work.petty,
                  {
                    id: crypto.randomUUID(),
                    description: pettyDescription,
                    amount: pettyAmount,
                  },
                ];
                pettyCash({ float, payments, target });
                patch("petty", payments);
                setPettyDescription("");
                setPettyAmount("");
                setError("");
              } catch (err) {
                setError(err.message);
              }
            }}
          >
            <div className="poa-fields">
              <label>
                Payment / analysis category
                <input
                  value={pettyDescription}
                  onChange={(e) => setPettyDescription(e.target.value)}
                />
              </label>
              <Field
                label="Amount"
                value={pettyAmount}
                onChange={setPettyAmount}
              />
            </div>
            <button>Add voucher</button>
          </form>
          <p role="alert">{error}</p>
          <DataTable
            caption="Petty cash vouchers"
            headers={["Details", "Amount", "Action"]}
            rows={work.petty.map((p) => [
              p.description,
              p.amount,
              <button
                type="button"
                className="secondary"
                onClick={() =>
                  patch(
                    "petty",
                    work.petty.filter((x) => x.id !== p.id),
                  )
                }
              >
                Remove
              </button>,
            ])}
          />
          {petty ? (
            <p>
              Spent {decimal(petty.spent)} · Remaining{" "}
              {decimal(petty.remaining)} · Reimbursement{" "}
              {decimal(petty.reimbursement)}
            </p>
          ) : (
            <p role="alert">
              Check the float: it must cover payments, and the target must cover
              cash remaining.
            </p>
          )}
        </section>
      )}
      {calcDefinitions[tab] && (
        <Calculator
          key={tab}
          kind={tab}
          values={work.calculatorValues[tab]}
          onValuesChange={(v) =>
            setWork((w) => ({
              ...w,
              calculatorValues: { ...w.calculatorValues, [tab]: v },
            }))
          }
        />
      )}
      {tab === "inventory" && (
        <InventoryLab
          transactions={work.inventory}
          setTransactions={(v) => patch("inventory", v)}
          method={work.inventoryMethod}
          setMethod={(v) => patch("inventoryMethod", v)}
        />
      )}
      {tab === "budgets" && (
        <section>
          <h4>Cash flow and production budgets</h4>
          <p>
            Forecasts are based on your assumptions. A negative cash balance
            identifies a financing need. Production is measured in units,
            separately from cash.
          </p>
          <Field
            label="Initial cash balance (negative for overdraft)"
            value={opening}
            signed
            onChange={setOpening}
          />
          {work.forecast.map((m, i) => (
            <fieldset key={i}>
              <legend>{m.month}</legend>
              <div className="poa-fields">
                {["inflows", "outflows"].map((k) => (
                  <Field
                    key={k}
                    label={k === "inflows" ? "Cash inflows" : "Cash outflows"}
                    value={m[k]}
                    onChange={(v) =>
                      patch(
                        "forecast",
                        work.forecast.map((row, j) =>
                          i === j ? { ...row, [k]: v } : row,
                        ),
                      )
                    }
                  />
                ))}
              </div>
            </fieldset>
          ))}
          {forecast ? (
            <DataTable
              caption="Six-month cash projection"
              headers={["Month", "Opening", "Net flow", "Closing"]}
              rows={forecast.map((m) => [
                m.month,
                decimal(m.opening),
                decimal(m.net),
                decimal(m.closing),
              ])}
            />
          ) : (
            <p role="alert">Enter valid amounts in every cash flow field.</p>
          )}
          <h4>Three-month production plan</h4>
          <Field
            label="Initial finished goods (units)"
            value={productionOpening}
            onChange={setProductionOpening}
          />
          {work.production.map((m, i) => (
            <fieldset key={i}>
              <legend>{m.month}</legend>
              <div className="poa-fields">
                {[
                  ["sales", "Sales units"],
                  ["closing", "Target closing units"],
                  ["price", "Selling price per unit"],
                ].map(([k, label]) => (
                  <Field
                    key={k}
                    label={label}
                    value={m[k]}
                    onChange={(v) =>
                      patch(
                        "production",
                        work.production.map((row, j) =>
                          i === j ? { ...row, [k]: v } : row,
                        ),
                      )
                    }
                  />
                ))}
              </div>
            </fieldset>
          ))}
          {production ? (
            <DataTable
              caption="Production and sales budget"
              headers={[
                "Month",
                "Opening units",
                "Production units",
                "Revenue",
              ]}
              rows={production.map((m) => [
                m.month,
                m.opening,
                m.production,
                decimal(m.revenue),
              ])}
            />
          ) : (
            <p role="alert">
              Check your plan. Opening stock must not exceed sales plus target
              closing stock.
            </p>
          )}
        </section>
      )}
      {tab === "sba" && (
        <section>
          <h4>SBA research and business planning</h4>
          <p>
            Plan your own research, keep evidence and connect conclusions to
            findings. Use the official CXC business cognate guidelines and your
            school's authentication arrangements. This planner provides learning
            support and does not award an official CXC grade.
          </p>
          <a
            href="https://www.cxc.org/subject/principles-of-accounts-csec/"
            target="_blank"
            rel="noreferrer"
          >
            Official CXC subject and SBA resources
          </a>
          {Object.entries(sbaPrompts).map(([k, label]) => (
            <label className="poa-writing-field" key={k}>
              {label}
              <textarea
                rows="4"
                maxLength="15000"
                value={work.sba[k] || ""}
                onChange={(e) =>
                  patch("sba", { ...work.sba, [k]: e.target.value })
                }
              />
            </label>
          ))}
        </section>
      )}
      <footer className="poa-actions">
        <label>
          Restore workspace backup
          <input
            type="file"
            accept=".json,application/json"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                if (file.size > 5000000)
                  throw new Error("Workspace file must be smaller than 5 MB.");
                const next = validateAccountingWork(
                  JSON.parse(await file.text()),
                );
                setWork(next);
                setSaveError("");
              } catch (err) {
                setSaveError(err.message);
              }
              e.target.value = "";
            }}
          />
        </label>
        <button
          type="button"
          className="secondary"
          onClick={() =>
            download(
              "spark-accounts-workspace.json",
              JSON.stringify(work, null, 2),
            )
          }
        >
          Export workspace backup
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() =>
            download(
              "spark-accounts-trial-balance.csv",
              "Account,Debit,Credit\n" +
                trial.rows
                  .map(
                    (r) =>
                      `${accountingCsvCell(r.name)},${(r.debit / 100).toFixed(2)},${(r.credit / 100).toFixed(2)}`,
                  )
                  .join("\n"),
              "text/csv",
            )
          }
        >
          Export trial balance CSV
        </button>
      </footer>
    </section>
  );
}
