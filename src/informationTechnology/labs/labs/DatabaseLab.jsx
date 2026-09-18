import React, { useMemo, useState } from "react";
import { LabFrame, RibbonTabs, WindowBar } from "../components/LabFrame";

const records = [
  { id: 1, name: "Alicia Brown", parish: "Kingston", amount: 7800 },
  { id: 2, name: "Dario Lewis", parish: "Clarendon", amount: 3200 },
  { id: 3, name: "Nia Grant", parish: "Kingston", amount: 12500 },
  { id: 4, name: "Kareem Blake", parish: "St. Catherine", amount: 6100 },
];

export default function DatabaseLab({ lab, completed, onBack, onComplete }) {
  const [tab, setTab] = useState("Tables");
  const [idType, setIdType] = useState("");
  const [nameType, setNameType] = useState("");
  const [amountType, setAmountType] = useState("");
  const [primaryKey, setPrimaryKey] = useState(false);
  const [relationship, setRelationship] = useState("");
  const [parish, setParish] = useState("All");
  const [amount, setAmount] = useState(0);
  const [logic, setLogic] = useState("");
  const [formCreated, setFormCreated] = useState(false);
  const [groupBy, setGroupBy] = useState("");
  const [summary, setSummary] = useState("");

  const queryRows = useMemo(
    () => records.filter(row => (parish === "All" || row.parish === parish) && (!amount || row.amount > Number(amount))),
    [parish, amount]
  );

  const tasks = [
    { id: "types", label: "Choose appropriate field data types", done: idType === "Number" && nameType === "Short Text" && amountType === "Currency" },
    { id: "pk", label: "Set CustomerID as the primary key", done: primaryKey },
    { id: "relationship", label: "Create a one-to-many Customer → Order relationship", done: relationship === "One-to-many" },
    { id: "query", label: "Build Parish = Kingston AND AmountOwed > 5000", done: parish === "Kingston" && Number(amount) === 5000 && logic === "AND" },
    { id: "form", label: "Create a data-entry form", done: formCreated },
    { id: "report", label: "Group a report by Parish and calculate SUM", done: groupBy === "Parish" && summary === "SUM" },
  ];

  return (
    <LabFrame lab={lab} tasks={tasks} completed={completed} onBack={onBack} onComplete={onComplete}
      footer={<span>Objects: 2 tables · 1 query · {formCreated ? 1 : 0} form · {summary ? 1 : 0} report</span>}>
      <div className="itv2-office-window database">
        <WindowBar title="Customer Database.accdb" subtitle="SPARK Database Studio"/>
        <RibbonTabs tabs={["Tables","Relationships","Queries","Forms","Reports"]} active={tab} onChange={setTab}/>
        <div className="itv2-db-layout">
          <nav className="itv2-db-nav">
            <strong>All Objects</strong>
            <button className={tab === "Tables" ? "active" : ""} onClick={() => setTab("Tables")}>▦ Tables</button>
            <button className={tab === "Queries" ? "active" : ""} onClick={() => setTab("Queries")}>⌕ Queries</button>
            <button className={tab === "Forms" ? "active" : ""} onClick={() => setTab("Forms")}>▤ Forms</button>
            <button className={tab === "Reports" ? "active" : ""} onClick={() => setTab("Reports")}>▥ Reports</button>
          </nav>

          <section className="itv2-db-stage">
            {tab === "Tables" && <>
              <div className="itv2-db-object-title">Customer : Table Design</div>
              <table className="itv2-db-design-table">
                <thead><tr><th>Field Name</th><th>Data Type</th><th>Primary Key</th></tr></thead>
                <tbody>
                  <tr><td>CustomerID</td><td><select value={idType} onChange={e => setIdType(e.target.value)}><option value="">Choose</option><option>Number</option><option>Short Text</option></select></td><td><input type="checkbox" checked={primaryKey} onChange={e => setPrimaryKey(e.target.checked)}/></td></tr>
                  <tr><td>Name</td><td><select value={nameType} onChange={e => setNameType(e.target.value)}><option value="">Choose</option><option>Short Text</option><option>Number</option></select></td><td></td></tr>
                  <tr><td>AmountOwed</td><td><select value={amountType} onChange={e => setAmountType(e.target.value)}><option value="">Choose</option><option>Currency</option><option>Date/Time</option><option>Short Text</option></select></td><td></td></tr>
                </tbody>
              </table>
            </>}

            {tab === "Relationships" && <div className="itv2-relationship-canvas">
              <div><strong>CUSTOMER</strong><span>🔑 CustomerID</span><span>Name</span></div>
              <i>1 ───────── ∞</i>
              <div><strong>ORDER</strong><span>🔑 OrderID</span><span>CustomerID (FK)</span></div>
              <label>Relationship<select value={relationship} onChange={e => setRelationship(e.target.value)}><option value="">Choose</option><option>One-to-one</option><option>One-to-many</option></select></label>
            </div>}

            {tab === "Queries" && <>
              <div className="itv2-db-object-title">KingstonAmounts : Query Design</div>
              <div className="itv2-query-design">
                <label>Field<strong>Parish</strong><select value={parish} onChange={e => setParish(e.target.value)}><option>All</option><option>Kingston</option><option>Clarendon</option><option>St. Catherine</option></select></label>
                <label>Field<strong>AmountOwed</strong><input type="number" value={amount} onChange={e => setAmount(e.target.value)}/></label>
                <label>Logical operator<strong>Combine criteria</strong><select value={logic} onChange={e => setLogic(e.target.value)}><option value="">Choose</option><option>AND</option><option>OR</option></select></label>
              </div>
              <table className="itv2-db-result"><thead><tr><th>CustomerID</th><th>Name</th><th>Parish</th><th>AmountOwed</th></tr></thead><tbody>{queryRows.map(row => <tr key={row.id}><td>{row.id}</td><td>{row.name}</td><td>{row.parish}</td><td>${row.amount.toLocaleString()}</td></tr>)}</tbody></table>
            </>}

            {tab === "Forms" && <div className="itv2-form-designer">
              <button className={formCreated ? "active" : ""} onClick={() => setFormCreated(true)}>Create Form Wizard</button>
              <div className={`itv2-form-preview ${formCreated ? "ready" : ""}`}><h3>Customer Entry Form</h3><label>CustomerID<input value="5" readOnly/></label><label>Name<input placeholder="Customer name"/></label><label>Parish<select><option>Kingston</option><option>Clarendon</option></select></label><label>Amount Owed<input type="number" placeholder="0"/></label></div>
            </div>}

            {tab === "Reports" && <div className="itv2-report-designer">
              <div className="itv2-report-controls"><label>Group by<select value={groupBy} onChange={e => setGroupBy(e.target.value)}><option value="">Choose</option><option>Parish</option><option>Name</option></select></label><label>Summary<select value={summary} onChange={e => setSummary(e.target.value)}><option value="">Choose</option><option>COUNT</option><option>SUM</option><option>AVERAGE</option></select></label></div>
              <article><h3>Outstanding Balances by Parish</h3>{["Kingston","Clarendon","St. Catherine"].map(p => <section key={p}><strong>{p}</strong><span>{summary === "SUM" ? `$${records.filter(r => r.parish === p).reduce((s,r) => s+r.amount,0).toLocaleString()}` : "Summary not selected"}</span></section>)}</article>
            </div>}
          </section>
        </div>
      </div>
    </LabFrame>
  );
}
