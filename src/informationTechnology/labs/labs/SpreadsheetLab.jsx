import React, { useMemo, useRef, useState } from "react";
import { LabFrame, RibbonTabs, WindowBar } from "../components/LabFrame";
import { ReducedMotionNotice, StatusMessage, ToolGroup, WorkspaceViewport, useTaskEvidence, useWorkspaceHistory } from "../components/ProductivityKit";
import { evaluateCell, explainFormula, formulaDependencies, translateFormula } from "../models/workbookModel.mjs";

const STARTING_SALES = {
  A1: "Item", B1: "Qty", C1: "Unit Price", D1: "Total Cost", E1: "Band", F1: "Taxed Total", H1: 0.15,
  A2: "Notebook", B2: 4, C2: 500, G2: "Kingston",
  A3: "Printer", B3: 2, C3: 18500, G3: "Clarendon",
  A4: "Mouse", B4: 8, C4: 2200, G4: "Kingston",
  A5: "Flash Drive", B5: 6, C5: 1800, G5: "St. Catherine",
};

const FORMULA_EXAMPLES = {
  SUM: "=SUM(D2:D5)", AVERAGE: "=AVERAGE(D2:D5)", DATE: "=DATE(2026,6,30)", MAX: "=MAX(D2:D5)", MIN: "=MIN(D2:D5)",
  COUNT: "=COUNT(D2:D5)", COUNTA: "=COUNTA(A2:A5)", COUNTIF: '=COUNTIF(D2:D5,">=10000")', IF: '=IF(D2>=10000,"HIGH","LOW")',
  VLOOKUP: '=VLOOKUP("Mouse",A2:D5,4,FALSE)', PMT: "=PMT(0.01,12,120000)",
};

const COLUMNS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const ROWS = [1, 2, 3, 4, 5, 6, 7];
const FORMULA_NAMES = Object.keys(FORMULA_EXAMPLES);

function displayValue(result, currency = false) {
  if (typeof result === "number") return currency ? new Intl.NumberFormat("en-JM", { style: "currency", currency: "JMD", maximumFractionDigits: 2 }).format(result) : Number(result.toFixed(2)).toLocaleString();
  return String(result ?? "");
}

export default function SpreadsheetLab({ lab, completed, onBack, onComplete, onEvidence }) {
  const [tab, setTab] = useState("Home");
  const [sheet, setSheet] = useState("Sales");
  const [selected, setSelected] = useState("D2");
  const [formulaBar, setFormulaBar] = useState("=B2*C2");
  const { state: workbook, setState: setWorkbook, undo, redo, canUndo, canRedo } = useWorkspaceHistory({ Sales: STARTING_SALES, Summary: { A1: "Annual Summary" } });
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Item");
  const [chart, setChart] = useState("");
  const [pivot, setPivot] = useState(false);
  const [linked, setLinked] = useState(false);
  const [formatCurrency, setFormatCurrency] = useState(false);
  const [message, setMessage] = useState("Select a cell, enter a value or formula, then press Enter.");
  const { evidence, record } = useTaskEvidence(onEvidence);
  const calculationChecks = useRef(new Map());

  const selectedRaw = workbook[sheet]?.[selected] ?? "";
  const selectedResult = evaluateCell(workbook, sheet, selected);
  const values = useMemo(() => Object.fromEntries(COLUMNS.flatMap(column => ROWS.map(row => {
    const address = `${column}${row}`;
    return [address, evaluateCell(workbook, "Sales", address)];
  }))), [workbook]);

  const visibleRows = useMemo(() => [2, 3, 4, 5]
    .filter(row => filter === "All" || values[`G${row}`].value === filter)
    .sort((a, b) => {
      const key = sort === "Qty" ? "B" : sort === "Price" ? "C" : "A";
      const left = values[`${key}${a}`].value; const right = values[`${key}${b}`].value;
      return typeof left === "number" ? left - right : String(left).localeCompare(String(right));
    }), [filter, sort, values]);

  const parishSummary = useMemo(() => [2, 3, 4, 5].reduce((summary, row) => {
    const parish = values[`G${row}`].value; const total = Number(values[`D${row}`].value) || 0;
    summary[parish] = (summary[parish] || 0) + total;
    return summary;
  }, {}), [values]);

  const successfulFunctions = useMemo(() => FORMULA_NAMES.filter(name => Object.keys(workbook.Sales).some(address => {
    const raw = workbook.Sales[address];
    const result = evaluateCell(workbook, "Sales", address);
    const dependencies = formulaDependencies(workbook, "Sales", address);
    const referencesWorksheetData = name === "DATE" || name === "PMT" || dependencies.size > 0;
    return typeof raw === "string" && raw.toUpperCase().startsWith(`=${name}(`) && !result.error && referencesWorksheetData;
  })), [workbook]);

  const totalFormulaValid = [2, 3, 4, 5].every(row => workbook.Sales[`D${row}`] === `=B${row}*C${row}` && values[`D${row}`].value === Number(values[`B${row}`].value) * Number(values[`C${row}`].value));
  const absoluteFormulaValid = [2, 3, 4, 5].every(row => {
    const formula = workbook.Sales[`F${row}`];
    return typeof formula === "string" && /\$H\$1/.test(formula) && values[`F${row}`].value === Number(values[`D${row}`].value) * (1 + Number(values.H1.value));
  });
  const dataResultValid = filter === "Kingston" && sort === "Price" && visibleRows.length === 2 && visibleRows[0] === 2 && visibleRows[1] === 4;
  const linkedResult = evaluateCell(workbook, "Summary", "B2");
  const salesTotal = evaluateCell(workbook, "Sales", "D6");

  const tasks = [
    { id: "formula", label: "Calculate Total Cost, fill down and prove recalculation", done: totalFormulaValid && evidence.has("fill") && evidence.has("recalculation"), help: "After filling D2:D5, change a quantity or unit price and confirm the dependent total changes." },
    { id: "functions", label: "Use SUM, AVERAGE and two other functions successfully", done: ["SUM", "AVERAGE"].every(name => successfulFunctions.includes(name)) && successfulFunctions.length >= 4 },
    { id: "references", label: "Use an absolute reference to calculate taxed totals and fill down", done: absoluteFormulaValid && evidence.has("absolute-fill") },
    { id: "data", label: "Filter to Kingston and sort by price", done: dataResultValid },
    { id: "format", label: "Apply currency formatting to calculated amounts", done: formatCurrency && totalFormulaValid },
    { id: "chart", label: "Create a chart that recalculates from worksheet values", done: Boolean(chart) && totalFormulaValid && chartValues.every((value, index) => value === Number(values[`D${index + 2}`].value)) },
    { id: "pivot", label: "Create a parish summary from the current data", done: pivot && Object.values(parishSummary).reduce((sum, value) => sum + value, 0) === chartValues.reduce((sum, value) => sum + value, 0) },
    { id: "linked", label: "Link the Summary worksheet to a calculated Sales total", done: linked && !salesTotal.error && salesTotal.formula && linkedResult.value === salesTotal.value },
  ];

  function selectCell(address) {
    setSelected(address); setFormulaBar(String(workbook[sheet]?.[address] ?? ""));
  }

  function commitFormula() {
    const value = formulaBar.trim();
    const nextWorkbook = { ...workbook, [sheet]: { ...workbook[sheet], [selected]: value } };
    const dependentCells = Object.keys(workbook.Sales).filter(address => formulaDependencies(workbook, "Sales", address).has(`${sheet}!${selected}`));
    const before = new Map(dependentCells.map(address => [address, evaluateCell(workbook, "Sales", address).value]));
    setWorkbook(nextWorkbook);
    const recalculated = dependentCells.some(address => evaluateCell(nextWorkbook, "Sales", address).value !== before.get(address));
    if (recalculated) {
      record("recalculation");
      calculationChecks.current.set(`${sheet}!${selected}`, true);
    }
    const preview = evaluateCell(nextWorkbook, sheet, selected);
    setMessage(preview.error ? `${preview.value}: ${preview.error}` : `${selected} recalculated successfully.`);
  }

  function fillDown() {
    const match = /^([A-H])(\d+)$/.exec(selected);
    const raw = workbook.Sales[selected];
    if (!match || Number(match[2]) >= 5 || typeof raw !== "string" || !raw.startsWith("=")) { setMessage("Select a formula cell above row 5 before filling down."); return; }
    const startRow = Number(match[2]); const column = match[1];
    const filled = {};
    for (let row = startRow + 1; row <= 5; row += 1) filled[`${column}${row}`] = translateFormula(raw, row - startRow, 0);
    setWorkbook(previous => ({ ...previous, Sales: { ...previous.Sales, ...filled } }));
    if (selected === "D2") record("fill");
    if (/\$[A-Z]+|\$\d+/.test(raw)) record("absolute-fill");
    setMessage(`The ${selected} formula was filled down to ${column}5 with relative references adjusted and absolute references preserved.`);
  }

  function linkSummary() {
    setWorkbook(previous => ({ ...previous, Summary: { ...previous.Summary, A2: "Annual Total", B2: "=Sales!D6" } }));
    setLinked(true); setMessage("Summary!B2 now links to Sales!D6 and recalculates with it.");
  }

  const chartValues = [2, 3, 4, 5].map(row => Number(values[`D${row}`].value) || 0);
  const maxChart = Math.max(1, ...chartValues);

  return (
    <LabFrame lab={lab} tasks={tasks} completed={completed} onBack={onBack} onComplete={onComplete}
      footer={<span>Ready · Selected cell {selected} · Sheet: {sheet}</span>}>
      <div className="itv2-office-window spreadsheet">
        <WindowBar title="School Supplies.xlsx" subtitle="SPARK Spreadsheet Studio" status="Recalculating automatically"/>
        <RibbonTabs tabs={["Home", "Formulas", "Data", "Insert"]} active={tab} onChange={setTab}/>
        <div className="itv2-ribbon" aria-label={`${tab} tools`}>
          {tab === "Home" && <>
            <ToolGroup label="History"><button type="button" onClick={undo} disabled={!canUndo}>Undo</button><button type="button" onClick={redo} disabled={!canRedo}>Redo</button></ToolGroup>
            <ToolGroup label="Number"><button type="button" aria-pressed={formatCurrency} className={formatCurrency ? "active" : ""} onClick={() => setFormatCurrency(value => !value)}>J$ Currency</button></ToolGroup>
            <ToolGroup label="Fill"><button type="button" onClick={fillDown}>Fill selected down</button></ToolGroup>
          </>}
          {tab === "Formulas" && <ToolGroup label="Function library">{FORMULA_NAMES.map(name => <button type="button" key={name} onClick={() => setFormulaBar(FORMULA_EXAMPLES[name])}>{name}</button>)}</ToolGroup>}
          {tab === "Data" && <>
            <ToolGroup label="Filter"><label htmlFor="sheet-filter">Parish</label><select id="sheet-filter" value={filter} onChange={event => setFilter(event.target.value)}><option>All</option><option>Kingston</option><option>Clarendon</option><option>St. Catherine</option></select></ToolGroup>
            <ToolGroup label="Sort"><label htmlFor="sheet-sort">Field</label><select id="sheet-sort" value={sort} onChange={event => setSort(event.target.value)}><option>Item</option><option>Qty</option><option>Price</option></select></ToolGroup>
            <ToolGroup label="Summarise"><button type="button" aria-pressed={pivot} className={pivot ? "active" : ""} onClick={() => setPivot(value => !value)}>Pivot summary</button></ToolGroup>
          </>}
          {tab === "Insert" && <ToolGroup label="Charts"><label htmlFor="chart-type">Type</label><select id="chart-type" value={chart} onChange={event => setChart(event.target.value)}><option value="">Choose</option><option>Column</option><option>Bar</option><option>Line</option><option>Pie</option></select></ToolGroup>}
        </div>

        <div className="itv2-formula-bar">
          <span aria-label="Selected cell">{selected}</span><b aria-hidden="true">fx</b>
          <input aria-label="Formula bar" value={formulaBar} onChange={event => setFormulaBar(event.target.value)} onKeyDown={event => { if (event.key === "Enter") commitFormula(); }} placeholder="Type a value or formula and press Enter"/>
          <button type="button" onClick={commitFormula} aria-label="Enter formula">✓</button>
        </div>

        <StatusMessage tone={selectedResult.error ? "error" : "neutral"}>
          <strong>{selectedResult.error ? selectedResult.error : explainFormula(selectedRaw)}</strong>
          <span>{selectedResult.error ? "Correct the formula or its references." : ` Result: ${displayValue(selectedResult.value, formatCurrency && /[DF]\d+/.test(selected))}`}</span>
        </StatusMessage>
        <StatusMessage tone="success">{message}</StatusMessage>

        <WorkspaceViewport label={`${sheet} worksheet`} className="itv2-sheet-stage">
          {sheet === "Sales" && <table className="itv2-sheet-grid">
            <thead><tr><th aria-label="Row and column headings"/><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th></tr></thead>
            <tbody>{ROWS.map(row => <tr key={row}><th>{row}</th>{COLUMNS.map(column => {
              const address = `${column}${row}`; const result = values[address]; const currency = formatCurrency && ["C", "D", "F"].includes(column) && row > 1;
              const hidden = row > 1 && row < 6 && !visibleRows.includes(row);
              return <td key={address} hidden={hidden} className={`${selected === address ? "selected" : ""} ${result.error ? "error" : ""}`}>
                <button type="button" className="itv2-cell-button" aria-label={`${address}, ${displayValue(result.value, currency) || "blank"}`} onClick={() => selectCell(address)}>{displayValue(result.value, currency)}</button>
              </td>;
            })}</tr>)}</tbody>
          </table>}

          {sheet === "Summary" && <div className="itv2-summary-sheet">
            <h3>Annual Summary</h3><button type="button" className={linked ? "active" : ""} onClick={linkSummary}>Link total from Sales worksheet</button>
            <div className="itv2-summary-cell">Annual Total: {linked ? displayValue(evaluateCell(workbook, "Summary", "B2").value, true) : "Not linked"}</div>
          </div>}

          {pivot && <aside className="itv2-pivot-panel" aria-label="Pivot-style parish summary"><strong>Parish summary</strong>{Object.entries(parishSummary).map(([name, total]) => <div key={name}><span>{name}</span><b>{displayValue(total, true)}</b></div>)}</aside>}
          {chart && <aside className="itv2-chart-panel" aria-label={`${chart} chart`}><strong>{chart} chart</strong><div className="itv2-mini-chart">{chartValues.map((value, index) => <i key={index} style={{ height: `${Math.max(4, value / maxChart * 100)}%` }} title={`${workbook.Sales[`A${index + 2}`]}: ${displayValue(value, true)}`}/>)}</div></aside>}
        </WorkspaceViewport>

        <div className="itv2-sheet-tabs" role="tablist" aria-label="Worksheets">
          {["Sales", "Summary"].map(name => <button type="button" role="tab" aria-selected={sheet === name} key={name} className={sheet === name ? "active" : ""} onClick={() => { setSheet(name); setSelected("A1"); setFormulaBar(String(workbook[name].A1 || "")); }}>{name}</button>)}
          <ReducedMotionNotice/>
        </div>
      </div>
    </LabFrame>
  );
}