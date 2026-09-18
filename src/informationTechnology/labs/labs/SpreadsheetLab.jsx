import React, { useMemo, useState } from "react";
import { LabFrame, RibbonTabs, WindowBar } from "../components/LabFrame";

const initialRows = [
  ["Notebook", 4, 500, "Kingston"],
  ["Printer", 2, 18500, "Clarendon"],
  ["Mouse", 8, 2200, "Kingston"],
  ["Flash Drive", 6, 1800, "St. Catherine"],
];

function normalize(value) {
  return String(value || "").replace(/\s+/g, "").toUpperCase();
}

export default function SpreadsheetLab({ lab, completed, onBack, onComplete }) {
  const [tab, setTab] = useState("Home");
  const [sheet, setSheet] = useState("Sales");
  const [selected, setSelected] = useState("D2");
  const [formulaBar, setFormulaBar] = useState("");
  const [formulas, setFormulas] = useState({});
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Item");
  const [chart, setChart] = useState("");
  const [pivot, setPivot] = useState(false);
  const [linked, setLinked] = useState(false);
  const [formatCurrency, setFormatCurrency] = useState(false);

  const visibleRows = useMemo(() => {
    const rows = initialRows
      .filter(row => filter === "All" || row[3] === filter)
      .map(row => [...row]);
    rows.sort((a, b) => {
      if (sort === "Qty") return a[1] - b[1];
      if (sort === "Price") return a[2] - b[2];
      return String(a[0]).localeCompare(String(b[0]));
    });
    return rows;
  }, [filter, sort]);

  const d2Ok = ["=B2*C2","=C2*B2"].includes(normalize(formulas.D2));
  const totalOk = normalize(formulas.D6) === "=SUM(D2:D5)";
  const averageOk = normalize(formulas.D7) === "=AVERAGE(D2:D5)";
  const ifOk = /^=IF\(D2>=1000,["']HIGH["'],["']LOW["']\)$/.test(normalize(formulas.E2));
  const countifOk = /^=COUNTIF\(D2:D5,">=1000"\)$/.test(normalize(formulas.E6));
  const lookupOk = /^=VLOOKUP\(/.test(normalize(formulas.E7));
  const absoluteOk = normalize(formulas.F5) === "=D5*$H$1";

  const tasks = [
    { id: "d2", label: "Create the Total Cost formula in D2", done: d2Ok },
    { id: "functions", label: "Use SUM and AVERAGE", done: totalOk && averageOk },
    { id: "logic", label: "Use IF and COUNTIF", done: ifOk && countifOk },
    { id: "lookup", label: "Enter a VLOOKUP formula", done: lookupOk },
    { id: "absolute", label: "Use an absolute reference when copying a formula", done: absoluteOk },
    { id: "data", label: "Filter to Kingston and sort by price", done: filter === "Kingston" && sort === "Price" },
    { id: "format", label: "Apply currency formatting", done: formatCurrency },
    { id: "chart", label: "Create a column chart", done: chart === "Column" },
    { id: "pivot", label: "Create a pivot-style parish summary", done: pivot },
    { id: "linked", label: "Link the Summary worksheet to Sales", done: linked },
  ];

  function commitFormula() {
    setFormulas(prev => ({ ...prev, [selected]: formulaBar }));
  }

  const totals = initialRows.map(row => row[1] * row[2]);
  const parishSummary = initialRows.reduce((acc, row) => {
    acc[row[3]] = (acc[row[3]] || 0) + row[1] * row[2];
    return acc;
  }, {});

  return (
    <LabFrame lab={lab} tasks={tasks} completed={completed} onBack={onBack} onComplete={onComplete}
      footer={<span>Ready · Selected cell {selected} · Sheet: {sheet}</span>}>
      <div className="itv2-office-window spreadsheet">
        <WindowBar title="School Supplies.xlsx" subtitle="SPARK Spreadsheet Studio"/>
        <RibbonTabs tabs={["Home","Formulas","Data","Insert"]} active={tab} onChange={setTab}/>

        <div className="itv2-ribbon">
          {tab === "Home" && <div className="itv2-ribbon-group">
            <button className={formatCurrency ? "active" : ""} onClick={() => setFormatCurrency(!formatCurrency)}>$ Currency</button>
            <button onClick={() => setSort("Item")}>Sort A→Z</button>
          </div>}
          {tab === "Formulas" && <div className="itv2-ribbon-group">
            {["SUM","AVERAGE","IF","COUNTIF","VLOOKUP","PMT"].map(fn => <button key={fn} onClick={() => setFormulaBar(`=${fn}(`)}>{fn}</button>)}
          </div>}
          {tab === "Data" && <div className="itv2-ribbon-group">
            <label>Filter<select value={filter} onChange={e => setFilter(e.target.value)}><option>All</option><option>Kingston</option><option>Clarendon</option><option>St. Catherine</option></select></label>
            <label>Sort<select value={sort} onChange={e => setSort(e.target.value)}><option>Item</option><option>Qty</option><option>Price</option></select></label>
            <button className={pivot ? "active" : ""} onClick={() => setPivot(!pivot)}>Pivot Table</button>
          </div>}
          {tab === "Insert" && <div className="itv2-ribbon-group">
            <label>Chart<select value={chart} onChange={e => setChart(e.target.value)}><option value="">Choose</option><option>Column</option><option>Bar</option><option>Line</option><option>Pie</option></select></label>
          </div>}
        </div>

        <div className="itv2-formula-bar">
          <span>{selected}</span>
          <b>fx</b>
          <input value={formulaBar} onChange={e => setFormulaBar(e.target.value)} onKeyDown={e => e.key === "Enter" && commitFormula()} placeholder="Type a formula and press Enter"/>
          <button onClick={commitFormula}>✓</button>
        </div>

        <div className="itv2-sheet-stage">
          {sheet === "Sales" && <table className="itv2-sheet-grid">
            <thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>H</th></tr></thead>
            <tbody>
              <tr><th>1</th><td>Item</td><td>Qty</td><td>Unit Price</td><td>Total Cost</td><td>Band</td><td>Taxed Total</td><td>Tax Rate</td></tr>
              {visibleRows.map((row, index) => {
                const excelRow = index + 2;
                return <tr key={row[0]}>
                  <th>{excelRow}</th><td>{row[0]}</td><td>{row[1]}</td><td>{formatCurrency ? `$${row[2].toLocaleString()}` : row[2]}</td>
                  <td className={selected === `D${excelRow}` ? "selected" : ""} onClick={() => { setSelected(`D${excelRow}`); setFormulaBar(formulas[`D${excelRow}`] || ""); }}>{formulas[`D${excelRow}`] || (excelRow === 2 ? "Enter formula" : "")}</td>
                  <td className={selected === `E${excelRow}` ? "selected" : ""} onClick={() => { setSelected(`E${excelRow}`); setFormulaBar(formulas[`E${excelRow}`] || ""); }}>{formulas[`E${excelRow}`] || ""}</td>
                  <td className={selected === `F${excelRow}` ? "selected" : ""} onClick={() => { setSelected(`F${excelRow}`); setFormulaBar(formulas[`F${excelRow}`] || ""); }}>{formulas[`F${excelRow}`] || ""}</td>
                  <td>{excelRow === 2 ? "15%" : ""}</td>
                </tr>;
              })}
              <tr><th>6</th><td colSpan="3">Total</td><td className={selected === "D6" ? "selected" : ""} onClick={() => { setSelected("D6"); setFormulaBar(formulas.D6 || ""); }}>{formulas.D6 || ""}</td><td className={selected === "E6" ? "selected" : ""} onClick={() => { setSelected("E6"); setFormulaBar(formulas.E6 || ""); }}>{formulas.E6 || ""}</td><td></td><td></td></tr>
              <tr><th>7</th><td colSpan="3">Average / Lookup</td><td className={selected === "D7" ? "selected" : ""} onClick={() => { setSelected("D7"); setFormulaBar(formulas.D7 || ""); }}>{formulas.D7 || ""}</td><td className={selected === "E7" ? "selected" : ""} onClick={() => { setSelected("E7"); setFormulaBar(formulas.E7 || ""); }}>{formulas.E7 || ""}</td><td></td><td></td></tr>
            </tbody>
          </table>}

          {sheet === "Summary" && <div className="itv2-summary-sheet">
            <h3>Annual Summary</h3>
            <button className={linked ? "active" : ""} onClick={() => setLinked(true)}>Link total from Sales worksheet</button>
            <div className="itv2-summary-cell">Annual Total: {linked ? `=Sales!D6` : "Not linked"}</div>
          </div>}

          {pivot && <aside className="itv2-pivot-panel">
            <strong>Pivot-style summary</strong>
            {Object.entries(parishSummary).map(([name, total]) => <div key={name}><span>{name}</span><b>${total.toLocaleString()}</b></div>)}
          </aside>}

          {chart && <aside className="itv2-chart-panel">
            <strong>{chart} chart preview</strong>
            <div className="itv2-mini-chart">{totals.map((value, index) => <i key={index} style={{ height: `${Math.max(10, value / Math.max(...totals) * 100)}%` }}/>)}</div>
          </aside>}
        </div>

        <div className="itv2-sheet-tabs">
          {["Sales","Summary"].map(name => <button key={name} className={sheet === name ? "active" : ""} onClick={() => setSheet(name)}>{name}</button>)}
          <button disabled>＋</button>
        </div>
      </div>
    </LabFrame>
  );
}
