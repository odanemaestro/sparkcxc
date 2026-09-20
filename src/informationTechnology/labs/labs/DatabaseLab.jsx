import React, { useMemo, useState } from "react";
import { LabFrame, RibbonTabs, WindowBar } from "../components/LabFrame";
import { ReducedMotionNotice, StatusMessage, ToolGroup, useTaskEvidence, useWorkspaceHistory } from "../components/ProductivityKit";
import { addRecord, groupRecords, runQuery, validateSchema } from "../models/databaseModel.mjs";

const STARTING_RECORDS = [
  { CustomerID: 1, Name: "Alicia Brown", Parish: "Kingston", AmountOwed: 7800 },
  { CustomerID: 2, Name: "Dario Lewis", Parish: "Clarendon", AmountOwed: 3200 },
  { CustomerID: 3, Name: "Nia Grant", Parish: "Kingston", AmountOwed: 12500 },
  { CustomerID: 4, Name: "Kareem Blake", Parish: "St. Catherine", AmountOwed: 6100 },
];
const EMPTY_SCHEMA = { CustomerID: { type: "", primaryKey: false }, Name: { type: "" }, Parish: { type: "Short Text" }, AmountOwed: { type: "" } };
const EMPTY_DRAFT = { CustomerID: 5, Name: "", Parish: "Kingston", AmountOwed: 0 };

function money(value) { return new Intl.NumberFormat("en-JM", { style: "currency", currency: "JMD", maximumFractionDigits: 0 }).format(value); }


function RelationshipConnector() {
  return (
    <svg className="itv2-relationship-link" viewBox="0 0 180 54" role="img" aria-label="One-to-many relationship">
      <text x="16" y="33" textAnchor="middle">1</text>
      <line x1="30" y1="27" x2="150" y2="27"/>
      <text x="166" y="33" textAnchor="middle">∞</text>
    </svg>
  );
}

export default function DatabaseLab({ lab, completed, onBack, onComplete, onEvidence }) {
  const [tab, setTab] = useState("Tables");
  const { state: database, setState: setDatabase, undo, redo, canUndo, canRedo } = useWorkspaceHistory({ schema: EMPTY_SCHEMA, records: STARTING_RECORDS });
  const [relationship, setRelationship] = useState("");
  const [parish, setParish] = useState("All");
  const [operator, setOperator] = useState(">");
  const [amount, setAmount] = useState("0");
  const [logic, setLogic] = useState("AND");
  const [sortDirection, setSortDirection] = useState("ASC");
  const [formCreated, setFormCreated] = useState(false);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [groupBy, setGroupBy] = useState("");
  const [summary, setSummary] = useState("");
  const [message, setMessage] = useState("Choose field properties, then run a query against the current records.");
  const { evidence, record } = useTaskEvidence(onEvidence);

  const schemaResult = useMemo(() => validateSchema(database.schema), [database.schema]);
  const criteria = useMemo(() => [
    { field: "Parish", operator: "=", value: parish === "All" ? "" : parish },
    { field: "AmountOwed", operator, value: amount === "" ? "" : Number(amount) },
  ], [amount, operator, parish]);
  const queryRows = useMemo(() => runQuery(database.records, criteria, logic, { field: "AmountOwed", direction: sortDirection }), [criteria, database.records, logic, sortDirection]);
  const reportRows = useMemo(() => groupRecords(database.records, groupBy, summary), [database.records, groupBy, summary]);
  const schemaTypesValid = database.schema.CustomerID.type === "Number" && database.schema.Name.type === "Short Text" && database.schema.Parish.type === "Short Text" && database.schema.AmountOwed.type === "Currency";
  const expectedQueryIds = runQuery(database.records, [{ field: "Parish", operator: "=", value: "Kingston" }, { field: "AmountOwed", operator: ">", value: 5000 }], "AND").map(row => row.CustomerID);
  const queryProof = parish === "Kingston" && operator === ">" && Number(amount) === 5000 && logic === "AND" && queryRows.map(row => row.CustomerID).join() === expectedQueryIds.join() && queryRows.length > 0;
  const reportProof = groupBy === "Parish" && summary === "SUM" && reportRows.length > 1 && reportRows.reduce((sum, row) => sum + row.value, 0) === database.records.reduce((sum, row) => sum + row.AmountOwed, 0);
  const tasks = [
    { id: "types", label: "Choose appropriate field data types", done: schemaTypesValid },
    { id: "pk", label: "Set CustomerID as the primary key", done: database.schema.CustomerID.primaryKey },
    { id: "relationship", label: "Create a valid one-to-many Customer → Order relationship", done: relationship === "One-to-many" && database.schema.CustomerID.primaryKey && database.schema.CustomerID.type === "Number" },
    { id: "query", label: "Return Parish = Kingston AND AmountOwed > 5000", done: queryProof && evidence.has("query-result"), help: "The result must contain only matching current records." },
    { id: "form", label: "Create a form and save a valid new record", done: formCreated && evidence.has("saved-record") },
    { id: "report", label: "Group a report by Parish and calculate SUM", done: reportProof },
  ];

  function updateField(name, property, value) {
    setDatabase(previous => ({ ...previous, schema: { ...previous.schema, [name]: { ...previous.schema[name], [property]: value } } }));
  }
  function confirmQuery() {
    if (queryProof) { record("query-result"); setMessage(`Query verified: ${queryRows.length} matching current records returned.`); }
    else setMessage(`Query recalculated: ${queryRows.length} records returned. Adjust the criteria to match the task.`);
  }
  function saveRecord() {
    const result = addRecord(database.records, draft);
    if (result.errors.length) { setMessage(result.errors.join(" ")); return; }
    setDatabase(previous => ({ ...previous, records: result.records }));
    record("saved-record");
    setDraft({ CustomerID: result.record.CustomerID + 1, Name: "", Parish: "Kingston", AmountOwed: 0 });
    setMessage(`${result.record.Name} was saved. Queries and reports recalculated from ${result.records.length} records.`);
  }

  return <LabFrame lab={lab} tasks={tasks} completed={completed} onBack={onBack} onComplete={onComplete} footer={<span>Objects: 2 tables · 1 live query · {formCreated ? 1 : 0} form · {summary ? 1 : 0} report · {database.records.length} records</span>}>
    <div className="itv2-office-window database">
      <WindowBar title="Customer Database.accdb" subtitle="SPARK Database Studio" status="Results update automatically"/>
      <RibbonTabs tabs={["Tables", "Relationships", "Queries", "Forms", "Reports"]} active={tab} onChange={setTab}/>
      <div className="itv2-ribbon" aria-label={`${tab} tools`}><ToolGroup label="History"><button type="button" onClick={undo} disabled={!canUndo}>Undo</button><button type="button" onClick={redo} disabled={!canRedo}>Redo</button></ToolGroup><ReducedMotionNotice/></div>
      <StatusMessage tone={message.includes("verified") || message.includes("saved") ? "success" : "neutral"}>{message}</StatusMessage>
      <div className="itv2-db-layout">
        <nav className="itv2-db-nav" aria-label="Database objects"><strong>All Objects</strong>{["Tables", "Queries", "Forms", "Reports"].map(name => <button type="button" key={name} className={tab === name ? "active" : ""} onClick={() => setTab(name)}>{name}</button>)}</nav>
        <section className="itv2-db-stage">
          {tab === "Tables" && <><div className="itv2-db-object-title">Customer : Table Design</div><table className="itv2-db-design-table"><thead><tr><th>Field Name</th><th>Data Type</th><th>Primary Key</th></tr></thead><tbody>{Object.entries(database.schema).map(([name, field]) => <tr key={name}><td>{name}</td><td><select aria-label={`${name} data type`} value={field.type} onChange={event => updateField(name, "type", event.target.value)}><option value="">Choose</option><option>Number</option><option>Short Text</option><option>Currency</option><option>Date/Time</option></select></td><td>{name === "CustomerID" && <input aria-label="CustomerID primary key" type="checkbox" checked={field.primaryKey} onChange={event => updateField(name, "primaryKey", event.target.checked)}/>}</td></tr>)}</tbody></table><StatusMessage tone={schemaResult.valid ? "success" : "error"}><strong>{schemaResult.valid ? "Valid table design" : `${schemaResult.errors.length} design issues`}</strong><span>{schemaResult.valid ? "Field types and primary key are suitable." : schemaResult.errors.join(" ")}</span></StatusMessage></>}
          {tab === "Relationships" && <div className="itv2-relationship-canvas"><div><strong>CUSTOMER</strong><span>CustomerID (PK)</span><span>Name</span></div><RelationshipConnector/><div><strong>ORDER</strong><span>OrderID (PK)</span><span>CustomerID (FK)</span></div><label htmlFor="db-relationship">Relationship<select id="db-relationship" value={relationship} onChange={event => setRelationship(event.target.value)}><option value="">Choose</option><option>One-to-one</option><option>One-to-many</option></select></label></div>}
          {tab === "Queries" && <><div className="itv2-db-object-title">KingstonAmounts : Live Query Design</div><div className="itv2-query-design"><label htmlFor="query-parish">Parish<select id="query-parish" value={parish} onChange={event => setParish(event.target.value)}><option>All</option><option>Kingston</option><option>Clarendon</option><option>St. Catherine</option></select></label><label htmlFor="query-amount">AmountOwed<div className="itv2-query-criterion"><select aria-label="Amount comparison" value={operator} onChange={event => setOperator(event.target.value)}><option>&gt;</option><option>&gt;=</option><option>=</option><option>&lt;</option></select><input id="query-amount" type="number" value={amount} onChange={event => setAmount(event.target.value)}/></div></label><label htmlFor="query-logic">Combine criteria<select id="query-logic" value={logic} onChange={event => setLogic(event.target.value)}><option>AND</option><option>OR</option></select></label></div><div className="itv2-query-result-bar"><span aria-live="polite">{queryRows.length} {queryRows.length === 1 ? "record" : "records"}</span><label htmlFor="query-sort">Amount order<select id="query-sort" value={sortDirection} onChange={event => setSortDirection(event.target.value)}><option value="ASC">Lowest first</option><option value="DESC">Highest first</option></select></label><button type="button" onClick={confirmQuery}>Verify result</button></div><table className="itv2-db-result"><thead><tr><th>CustomerID</th><th>Name</th><th>Parish</th><th>AmountOwed</th></tr></thead><tbody>{queryRows.map(row => <tr key={row.CustomerID}><td>{row.CustomerID}</td><td>{row.Name}</td><td>{row.Parish}</td><td>{money(row.AmountOwed)}</td></tr>)}</tbody></table>{queryRows.length === 0 && <p className="itv2-empty-result">No records match the current criteria.</p>}</>}
          {tab === "Forms" && <div className="itv2-form-designer"><button type="button" className={formCreated ? "active" : ""} onClick={() => setFormCreated(true)}>Create Form Wizard</button><div className={`itv2-form-preview ${formCreated ? "ready" : ""}`}><h3>Customer Entry Form</h3>{["CustomerID", "Name", "AmountOwed"].map(name => <label key={name}>{name}<input aria-label={`New ${name}`} disabled={!formCreated} type={["CustomerID", "AmountOwed"].includes(name) ? "number" : "text"} value={draft[name]} onChange={event => setDraft(previous => ({ ...previous, [name]: event.target.value }))}/></label>)}<label>Parish<select aria-label="New Parish" disabled={!formCreated} value={draft.Parish} onChange={event => setDraft(previous => ({ ...previous, Parish: event.target.value }))}><option>Kingston</option><option>Clarendon</option><option>St. Catherine</option></select></label><button type="button" disabled={!formCreated} onClick={saveRecord}>Save record</button></div></div>}
          {tab === "Reports" && <div className="itv2-report-designer"><div className="itv2-report-controls"><label htmlFor="report-group">Group by<select id="report-group" value={groupBy} onChange={event => setGroupBy(event.target.value)}><option value="">Choose</option><option>Parish</option><option>Name</option></select></label><label htmlFor="report-summary">Summary<select id="report-summary" value={summary} onChange={event => setSummary(event.target.value)}><option value="">Choose</option><option>COUNT</option><option>SUM</option><option>AVERAGE</option></select></label></div><article><h3>Outstanding Balances by Parish</h3>{reportRows.length ? reportRows.map(row => <section key={row.group}><strong>{row.group}</strong><span>{summary === "COUNT" ? row.value : money(row.value)}</span></section>) : <p>Select grouping and summary fields.</p>}</article></div>}
        </section>
      </div>
    </div>
  </LabFrame>;
}