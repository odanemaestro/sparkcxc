import React, { useMemo, useState } from "react";

function Panel({ title, children }) {
  return <div className="it-visual-panel"><h3>{title}</h3>{children}</div>;
}

function ScaleBars({ rows }) {
  return <div className="it-scale-table">
    {rows.map(row => <div className="it-scale-row" key={row[0]}>
      <strong>{row[0]}</strong>
      <span>{row[1]}</span>
      <div className="it-scale-track"><i style={{ width: `${row[2]}%` }}/></div>
    </div>)}
  </div>;
}

function Topic1() {
  const systems = {
    "Supercomputer": [["Processing","Very high",100],["Storage","Very high",95],["Portability","Very low",8]],
    "Mainframe": [["Processing","High",82],["Storage","Very high",95],["Portability","Very low",8]],
    "Desktop": [["Processing","Moderate-high",62],["Storage","High",72],["Portability","Low",25]],
    "Mobile": [["Processing","Moderate",48],["Storage","Moderate",48],["Portability","High",92]],
    "Embedded": [["Processing","Task-specific",35],["Storage","Task-specific",28],["Portability","Built-in",70]],
  };
  const [selected, setSelected] = useState("Desktop");
  return <Panel title="Compare computer-system types">
    <div className="it-visual-tabs">{Object.keys(systems).map(name => <button type="button" key={name} className={selected===name?"active":""} onClick={()=>setSelected(name)}>{name}</button>)}</div>
    <ScaleBars rows={systems[selected]}/>
    <p className="it-visual-note">The bars are qualitative. In an exam, compare the system against the stated job rather than memorising one fixed specification.</p>
  </Panel>;
}

function Topic2() {
  return <Panel title="How the computer system works together">
    <div className="it-ipos-diagram">
      <div><strong>INPUT</strong><span>Keyboard · scanner · sensor</span></div><b>→</b>
      <div><strong>PROCESSING</strong><span>CPU works on data</span></div><b>→</b>
      <div><strong>OUTPUT</strong><span>Monitor · printer · speaker</span></div>
      <div className="storage"><strong>STORAGE</strong><span>RAM/ROM + secondary storage</span></div>
    </div>
    <div className="it-memory-compare">
      <div><strong>RAM</strong><span>Temporary working memory</span><em>Volatile</em></div>
      <div><strong>ROM</strong><span>Retains stored instructions</span><em>Non-volatile</em></div>
      <div><strong>Secondary storage</strong><span>Hard disk · tape · flash · optical</span><em>Longer-term</em></div>
    </div>
  </Panel>;
}

function Topic3() {
  const [criterion,setCriterion]=useState("Accessibility");
  const info = {
    Accessibility:["Cloud","Can be reached from different authorised locations when connectivity is available.","Local","Directly available at the local device or site."],
    Security:["Cloud","Requires strong account, provider and network security.","Local","Requires physical protection, permissions and local backups."],
    Cost:["Cloud","May involve subscription or service costs.","Local","May require hardware purchase, maintenance and replacement."],
    Capacity:["Cloud","Can often be expanded through a service plan.","Local","Limited by installed/local hardware capacity."]
  };
  return <Panel title="Cloud storage vs local storage">
    <div className="it-visual-tabs">{Object.keys(info).map(key=><button type="button" key={key} className={criterion===key?"active":""} onClick={()=>setCriterion(key)}>{key}</button>)}</div>
    <div className="it-compare-two"><div><strong>{info[criterion][0]}</strong><p>{info[criterion][1]}</p></div><div><strong>{info[criterion][2]}</strong><p>{info[criterion][3]}</p></div></div>
  </Panel>;
}

function Topic4() {
  return <Panel title="Input → computer → output">
    <div className="it-device-map">
      <div><strong>INPUT</strong><span>OMR</span><span>OCR</span><span>MICR</span><span>scanner</span><span>biometric</span><span>sensor</span></div>
      <div className="computer-box">COMPUTER<br/><small>hardware + software</small></div>
      <div><strong>OUTPUT</strong><span>monitor</span><span>laser/inkjet</span><span>plotter</span><span>3D printer</span><span>speaker</span></div>
    </div>
    <div className="it-mini-compare"><div><b>System software</b><span>Operating system · utilities</span></div><div><b>Application software</b><span>General-purpose · special-purpose</span></div></div>
  </Panel>;
}

function Topic5() {
  const [purpose,setPurpose]=useState("Video editing");
  const profiles = {
    "Web browsing":[["CPU","Moderate",45],["RAM","Moderate",45],["Storage","Moderate",40]],
    "Video editing":[["CPU","Strong",92],["RAM","High",88],["Storage","Fast + large",92]],
    "Graphic design":[["CPU","Strong",80],["RAM","High",82],["Storage","Large",75]],
    "Gaming":[["CPU","Strong",85],["RAM","High",78],["Storage","Fast",78]]
  };
  return <Panel title="Match specifications to the job">
    <select className="it-visual-select" value={purpose} onChange={e=>setPurpose(e.target.value)}>{Object.keys(profiles).map(x=><option key={x}>{x}</option>)}</select>
    <ScaleBars rows={profiles[purpose]}/>
    <div className="it-troubleshoot-flow"><span>Problem</span><b>→</b><span>Check simple physical cause</span><b>→</b><span>Test again</span><b>→</b><span>Escalate only if needed</span></div>
  </Panel>;
}

function Topic6() {
  const [mode,setMode]=useState("Validation");
  return <Panel title="Information-processing decisions">
    <div className="it-visual-tabs"><button className={mode==="Validation"?"active":""} onClick={()=>setMode("Validation")}>Validation vs verification</button><button className={mode==="Access"?"active":""} onClick={()=>setMode("Access")}>File access</button><button className={mode==="Reliability"?"active":""} onClick={()=>setMode("Reliability")}>Online reliability</button></div>
    {mode==="Validation" && <div className="it-compare-two"><div><strong>Validation</strong><p>Does the data follow the rule?</p><span>Range · format · type · presence · length</span></div><div><strong>Verification</strong><p>Was the data entered accurately?</p><span>Double entry · proofreading</span></div></div>}
    {mode==="Access" && <div className="it-access-visual"><div><b>Sequential</b><span>1 → 2 → 3 → 4 → target</span></div><div><b>Direct / random</b><span>1 · 2 · 3 · 4 ⇢ target</span></div></div>}
    {mode==="Reliability" && <div className="it-four-grid">{["Authenticity","Currency","Relevance","Bias"].map(x=><div key={x}><strong>{x}</strong><span>Ask a question before trusting the source.</span></div>)}</div>}
  </Panel>;
}

function Topic7() {
  const [type,setType]=useState("LAN");
  const data={LAN:["School / office","Small local area"],MAN:["Town / city","Metropolitan area"],WAN:["Country / region / world","Large geographic area"],Mobile:["Moving users","Radio-based carrier network"]};
  return <Panel title="Network scale and privacy">
    <div className="it-network-scale">
      {Object.keys(data).map((x,i)=><button key={x} className={`${type===x?"active":""} size-${i+1}`} onClick={()=>setType(x)}>{x}</button>)}
    </div>
    <div className="it-visual-result"><strong>{type}</strong><span>{data[type][0]} · {data[type][1]}</span></div>
    <div className="it-privacy-strip"><span>Internet: public</span><span>Intranet: internal</span><span>Extranet: controlled external access</span></div>
  </Panel>;
}

function Topic8() {
  return <Panel title="How a network message travels">
    <svg className="it-network-svg" viewBox="0 0 720 220" role="img" aria-label="Network showing computer, switch, router and Internet">
      <rect x="30" y="70" width="125" height="75" rx="14"/><text x="92" y="102" textAnchor="middle">Computer</text><text x="92" y="125" textAnchor="middle">NIC</text>
      <line x1="155" y1="107" x2="255" y2="107"/><text x="205" y="92" textAnchor="middle">wired / wireless</text>
      <rect x="255" y="70" width="110" height="75" rx="14"/><text x="310" y="114" textAnchor="middle">Switch</text>
      <line x1="365" y1="107" x2="465" y2="107"/>
      <rect x="465" y="70" width="110" height="75" rx="14"/><text x="520" y="114" textAnchor="middle">Router</text>
      <line x1="575" y1="107" x2="660" y2="107"/>
      <circle cx="680" cy="107" r="35"/><text x="680" y="112" textAnchor="middle">WAN</text>
    </svg>
    <div className="it-media-strip"><span>Twisted pair</span><span>Coaxial</span><span>Fibre</span><span>Infrared</span><span>Microwave</span><span>Satellite</span></div>
  </Panel>;
}

function Topic9() {
  const [step,setStep]=useState(0);
  const steps=["Enter URL","Browser sends HTTP request","Web server responds","HTML is interpreted","Page displayed"];
  return <Panel title="From URL to web page">
    <div className="it-web-flow">{steps.map((x,i)=><button type="button" key={x} className={i<=step?"active":""} onClick={()=>setStep(i)}><span>{i+1}</span><strong>{x}</strong></button>)}</div>
    <p className="it-visual-note">FTP is used for file transfer. Upload sends a file away from the local system, while download receives it.</p>
  </Panel>;
}

function Topic10() {
  return <Panel title="Security risk chain">
    <div className="it-risk-chain"><div><strong>Vulnerability</strong><span>Weakness</span></div><b>→</b><div><strong>Threat</strong><span>Possible danger</span></div><b>→</b><div><strong>Attack</strong><span>Attempt to exploit</span></div><b>→</b><div><strong>Impact</strong><span>Harm or loss</span></div></div>
    <div className="it-impact-tags"><span>Individual</span><span>Organisation</span><span>Government</span></div>
  </Panel>;
}

function Topic11() {
  return <Panel title="Layered security">
    <div className="it-security-layers">
      <div><strong>Personal</strong><span>verify email · check URLs · safer Wi-Fi · secure devices</span></div>
      <div><strong>Software</strong><span>authentication · encryption · firewall · anti-malware</span></div>
      <div><strong>Physical / recovery</strong><span>biometrics · hardware firewall · backup and recovery</span></div>
    </div>
  </Panel>;
}

function Topic12() {
  const fields=["Education","Medicine","Business","Law enforcement","Recreation"];
  const [field,setField]=useState("Education");
  const map={
    Education:"access · distance learning · collaboration · plagiarism · online tutoring",
    Medicine:"telemedicine · eHealth · information access · remote expertise",
    Business:"e-commerce · EPOS · telecommuting · email",
    "Law enforcement":"e-surveillance · fingerprinting · biometrics",
    Recreation:"music · gaming"
  };
  return <Panel title="ICT changes work and society">
    <div className="it-visual-tabs">{fields.map(x=><button key={x} className={field===x?"active":""} onClick={()=>setField(x)}>{x}</button>)}</div>
    <div className="it-visual-result"><strong>{field}</strong><span>{map[field]}</span></div>
    <div className="it-balance"><span>Possible job loss</span><b>Automation</b><span>Possible productivity gains</span></div>
  </Panel>;
}

function Topic13() {
  return <Panel title="Anatomy of a well-formatted document">
    <div className="it-document-anatomy">
      <header>HEADER</header>
      <h4>Meaningful heading</h4>
      <p><b>Bold</b>, <i>italic</i>, alignment, spacing, bullets and numbering help organise information.</p>
      <div className="it-fake-table"><span>Table</span><span>Rows</span><span>Columns</span><span>Formatting</span></div>
      <footer>FOOTER · page number</footer>
    </div>
    <p className="it-visual-note">Formatting should improve readability and structure, not simply make a document decorative.</p>
  </Panel>;
}

function Topic14() {
  const [mode,setMode]=useState("Mail merge");
  return <Panel title="Advanced document workflow">
    <div className="it-visual-tabs">{["Review","Protection","Table of contents","Mail merge","Fillable form"].map(x=><button key={x} className={mode===x?"active":""} onClick={()=>setMode(x)}>{x}</button>)}</div>
    {mode==="Mail merge" && <div className="it-risk-chain"><div><strong>Primary document</strong></div><b>+</b><div><strong>Data source</strong></div><b>→</b><div><strong>Personalised output</strong></div></div>}
    {mode==="Table of contents" && <div className="it-toc"><span>1. Introduction ........ 1</span><span>2. Findings ............ 3</span><span>2.1 Sales .............. 4</span></div>}
    {mode==="Fillable form" && <div className="it-control-showcase"><span>Text box</span><span>Check box</span><span>Date picker</span><span>Drop-down</span><span>Command button</span></div>}
    {mode==="Review" && <div className="it-control-showcase"><span>Spelling</span><span>Grammar</span><span>Thesaurus</span><span>Comments</span><span>Track changes</span></div>}
    {mode==="Protection" && <div className="it-control-showcase"><span>Auto-save</span><span>Backup copy</span><span>Password/edit restriction</span></div>}
  </Panel>;
}

function Topic15() {
  const [page,setPage]=useState("Home");
  return <Panel title="Three-page website planner">
    <div className="it-wireframe">
      <nav>{["Home","Activities","Contact"].map(x=><button key={x} className={page===x?"active":""} onClick={()=>setPage(x)}>{x}</button>)}</nav>
      <div className="hero">Logo + page heading</div>
      <div className="content"><span>Text content for {page}</span><span>Graphic / image area</span></div>
      <footer>Internal link · email link · file link</footer>
    </div>
    <p className="it-visual-note">Plan purpose, audience, page content and layout first. Then test links, content accuracy and usability before publishing.</p>
  </Panel>;
}

function Topic16() {
  const functions = {
    SUM: { what: "Adds numeric values.", example: "=SUM(D2:D6)", note: "Use this when you need a total." },
    AVERAGE: { what: "Finds the arithmetic mean.", example: "=AVERAGE(B2:B6)", note: "The values are added and divided by the number of numeric entries." },
    COUNT: { what: "Counts cells containing numbers.", example: "=COUNT(B2:B10)", note: "Text and blank cells are not counted." },
    COUNTA: { what: "Counts cells that are not empty.", example: "=COUNTA(A2:A10)", note: "Both text and numeric entries can be counted." },
    COUNTIF: { what: "Counts cells that meet a condition.", example: '=COUNTIF(B2:B10,">=50")', note: "The criterion tells the function what to count." },
    VLOOKUP: { what: "Looks for a value in the first column of a table and returns related data.", example: "=VLOOKUP(A2,F2:H20,3,FALSE)", note: "The lookup value and table range must be chosen carefully." },
    PMT: { what: "Calculates a periodic loan payment from financial values.", example: "=PMT(rate, periods, loan)", note: "The exact arguments depend on the values supplied in the worksheet." },
    IF: { what: "Returns one result when a condition is true and another when it is false.", example: '=IF(C2>=50,"Pass","Fail")', note: "The logical test comes first, followed by the two possible results." }
  };
  const [selected, setSelected] = useState("SUM");
  const current = functions[selected];

  return <Panel title="Spreadsheet anatomy and functions">
    <div className="it-spreadsheet-explainer">
      <div>
        <strong>Read the worksheet one cell at a time.</strong>
        <p>B2 contains the quantity <b>3</b>. C2 contains the unit price <b>500</b>. A formula can use those cell addresses instead of typing the values again.</p>
      </div>
      <div>
        <strong>Formula in D2</strong>
        <code>=B2*C2</code>
        <p>The spreadsheet reads the value in B2, multiplies it by the value in C2 and produces <b>1500</b>.</p>
      </div>
    </div>

    <div className="it-sheet-mini it-sheet-mini-four">
      <b></b><b>A</b><b>B</b><b>C</b><b>D</b>
      <b>1</b><span>Item</span><span>Qty</span><span>Price</span><span>Total</span>
      <b>2</b><span>Book</span><span className="it-cell-focus">3</span><span className="it-cell-focus">500</span><span className="it-cell-formula">=B2*C2<br/><small>1500</small></span>
    </div>

    <div className="it-formula-explanation">
      <span><b>=</b> tells the spreadsheet that a calculation follows.</span>
      <span><b>B2</b> means column B, row 2.</span>
      <span><b>*</b> means multiply.</span>
      <span><b>C2</b> means column C, row 2.</span>
    </div>

    <h4 className="it-visual-subhead">Functions are ready-made calculations</h4>
    <div className="it-function-grid">
      {Object.keys(functions).map(fn => (
        <button type="button" key={fn} className={selected === fn ? "active" : ""} onClick={() => setSelected(fn)}>
          <strong>{fn}</strong><span>{functions[fn].what}</span>
        </button>
      ))}
    </div>
    <div className="it-function-detail">
      <div><small>What it does</small><strong>{current.what}</strong></div>
      <div><small>Example</small><code>{current.example}</code></div>
      <p>{current.note}</p>
    </div>
    <p className="it-visual-note">The important difference is this: a <b>formula</b> is an expression you build, while a <b>function</b> is a predefined operation supplied by the spreadsheet.</p>
  </Panel>;
}

function Topic17() {
  const [row,setRow]=useState(2);
  const [tool,setTool]=useState("Sort");
  const tools={
    Sort:["Rearranges records into an order.","Example: sort students by LastName A-Z, then by FirstName A-Z."],
    Filter:["Temporarily displays only records that match criteria.","Example: show Parish = Kingston AND AmountOwed > 5000."],
    "Pivot table":["Summarises a large dataset by selected categories.","Example: total sales by salesperson and month without rewriting the original data."]
  };
  return <Panel title="References, sorting, filtering and pivot tables">
    <div className="it-reference-lesson">
      <div>
        <strong>Relative reference</strong>
        <code>B2</code>
        <p>When the formula is copied down, the row changes because B2 is relative.</p>
      </div>
      <div>
        <strong>Absolute reference</strong>
        <code>$F$2</code>
        <p>The dollar signs lock both column F and row 2, so this reference stays fixed.</p>
      </div>
    </div>

    <div className="it-formula-copy">
      <div><small>Original formula</small><strong>=B2*$F$2</strong></div>
      <b>↓ copy to row {row}</b>
      <div><small>Copied formula</small><strong>=B{row}*$F$2</strong></div>
    </div>
    <input aria-label="Copy formula to another row" type="range" min="2" max="10" value={row} onChange={e=>setRow(Number(e.target.value))}/>
    <p className="it-visual-note">Move the slider. Only the relative row changes. The absolute reference remains $F$2.</p>

    <h4 className="it-visual-subhead">Organising a larger dataset</h4>
    <div className="it-visual-tabs">{Object.keys(tools).map(name=><button type="button" key={name} className={tool===name?"active":""} onClick={()=>setTool(name)}>{name}</button>)}</div>
    <div className="it-tool-explanation"><strong>{tool}</strong><p>{tools[tool][0]}</p><span>{tools[tool][1]}</span></div>
  </Panel>;
}

function Topic18() {
  const [chart,setChart]=useState("Line");
  const info={
    "Bar / Column":["Compare separate categories.","Example: compare total sales for five products."],
    Line:["Show change across an ordered sequence.","Example: monthly sales from January to December."],
    Pie:["Show how one meaningful total is divided into parts.","Example: how a budget is shared among four departments."]
  };
  return <Panel title="Charts and linked worksheets">
    <div className="it-chart-guide">
      <button type="button" className={chart==="Bar / Column"?"active":""} onClick={()=>setChart("Bar / Column")}><div className="bars"><i/><i/><i/></div><strong>Bar / column</strong><span>Compare categories</span></button>
      <button type="button" className={chart==="Line"?"active":""} onClick={()=>setChart("Line")}><svg viewBox="0 0 100 50"><polyline points="5,40 25,30 45,34 65,18 95,8"/></svg><strong>Line</strong><span>Show change over time</span></button>
      <button type="button" className={chart==="Pie"?"active":""} onClick={()=>setChart("Pie")}><div className="pie">◔</div><strong>Pie</strong><span>Parts of one total</span></button>
    </div>
    <div className="it-chart-explanation"><strong>{chart}</strong><p>{info[chart][0]}</p><span>{info[chart][1]}</span></div>
    <p className="it-visual-note">Whichever chart you choose, use a meaningful chart title and suitable axis or data labels where they are needed.</p>

    <h4 className="it-visual-subhead">Why link worksheets?</h4>
    <div className="it-linked-sheets">
      <div><strong>January</strong><span>B5 = 12 000</span></div>
      <div><strong>February</strong><span>B5 = 15 500</span></div>
      <b>→</b>
      <div className="summary"><strong>Summary</strong><span>references source cells</span></div>
    </div>
    <p className="it-visual-note">A linked Summary sheet uses references to values on other worksheets. If the source value changes, the linked calculation can update without retyping the number.</p>
  </Panel>;
}

function Topic19() {
  return <Panel title="Relational database structure">
    <div className="it-db-relationship">
      <div><strong>STUDENT</strong><span>StudentID 🔑</span><span>Name</span><span>ClassID</span></div>
      <b>1 ───── ∞</b>
      <div><strong>PAYMENT</strong><span>PaymentID 🔑</span><span>StudentID 🔗</span><span>Amount</span></div>
    </div>
    <div className="it-control-showcase"><span>Primary key</span><span>Candidate key</span><span>Foreign key</span><span>One-to-one</span><span>One-to-many</span></div>
  </Panel>;
}

function Topic20() {
  const [logic,setLogic]=useState("AND");
  return <Panel title="Query → result → report">
    <div className="it-query-builder">
      <code>Age &gt;= 18</code>
      <select value={logic} onChange={e=>setLogic(e.target.value)}><option>AND</option><option>OR</option></select>
      <code>Parish = "Kingston"</code>
      <b>→</b><span>matching records</span><b>→</b><span>group / sort / SUM / COUNT / AVERAGE</span>
    </div>
  </Panel>;
}

function Topic21() {
  return <Panel title="Problem-solving cycle">
    <div className="it-cycle-diagram">{["Define problem","Propose & evaluate","Choose solution","Develop algorithm","Test & validate"].map((x,i)=><div key={x}><span>{i+1}</span><strong>{x}</strong></div>)}</div>
    <div className="it-decompose"><strong>Large problem</strong><b>↓</b><div><span>Task A</span><span>Task B</span><span>Task C</span></div><b>↓</b><strong>Combined solution</strong></div>
  </Panel>;
}

function Topic22() {
  const types=[["Integer","18"],["Real","72.5"],["Character","A"],["Boolean","TRUE"],["String","Odane"]];
  return <Panel title="Choose the right data type">
    <div className="it-type-cards">{types.map(([type,value])=><div key={type}><strong>{type}</strong><code>{value}</code></div>)}</div>
    <div className="it-compare-two"><div><strong>Variable</strong><p>Value may change.</p></div><div><strong>Constant</strong><p>Value remains fixed during execution.</p></div></div>
  </Panel>;
}

function Topic23() {
  return <Panel title="From algorithm to trace table">
    <div className="it-algo-three">
      <div><strong>Flowchart</strong><span>START → INPUT → DECISION → OUTPUT → STOP</span></div>
      <div><strong>Pseudocode</strong><code>IF mark &gt;= 50 THEN DISPLAY "PASS"</code></div>
      <div><strong>Trace table</strong><span>mark | result<br/>65 | PASS</span></div>
    </div>
    <div className="it-truth"><span>AND: both true</span><span>OR: either true</span><span>NOT: reverse truth value</span><span>MOD: remainder</span><span>DIV: integer quotient</span></div>
  </Panel>;
}

function Topic24() {
  return <Panel title="Program implementation pipeline">
    <div className="it-risk-chain"><div><strong>Source code</strong></div><b>→</b><div><strong>Translate / link</strong></div><b>→</b><div><strong>Run</strong></div><b>→</b><div><strong>Maintain</strong></div></div>
    <div className="it-three-errors"><div><b>Syntax</b><span>Language rule broken</span></div><div><b>Logic</b><span>Runs but gives wrong result</span></div><div><b>Runtime</b><span>Error while executing</span></div></div>
  </Panel>;
}

function Topic25() {
  const [structure,setStructure]=useState("IF");
  const examples={IF:'IF mark >= 50 THEN DISPLAY "PASS"',FOR:"FOR count = 1 TO 10",WHILE:"WHILE balance > 0",REPEAT:"REPEAT ... UNTIL valid = TRUE"};
  return <Panel title="Control structures in code">
    <div className="it-visual-tabs">{Object.keys(examples).map(x=><button key={x} className={structure===x?"active":""} onClick={()=>setStructure(x)}>{x}</button>)}</div>
    <pre className="it-code">{examples[structure]}</pre>
    <p className="it-visual-note">The examination assesses the logic and concepts rather than requiring one specific programming language.</p>
  </Panel>;
}

function Topic26() {
  return <Panel title="Readable programs are easier to maintain">
    <div className="it-code-compare">
      <div><small>Hard to understand</small><pre>x=q*p</pre></div>
      <div><small>Clearer internal documentation</small><pre>{"// Calculate amount due\nTotalPayment = Quantity * UnitPrice"}</pre></div>
    </div>
    <p className="it-visual-note">Internal documentation includes meaningful names, comments, indentation and whitespace. A user manual is external documentation.</p>
  </Panel>;
}

export default function InformationTechnologyVisuals({ topicId }) {
  const map = {
    1:<Topic1/>,2:<Topic2/>,3:<Topic3/>,4:<Topic4/>,5:<Topic5/>,6:<Topic6/>,
    7:<Topic7/>,8:<Topic8/>,9:<Topic9/>,10:<Topic10/>,11:<Topic11/>,12:<Topic12/>,
    13:<Topic13/>,14:<Topic14/>,15:<Topic15/>,16:<Topic16/>,17:<Topic17/>,18:<Topic18/>,
    19:<Topic19/>,20:<Topic20/>,21:<Topic21/>,22:<Topic22/>,23:<Topic23/>,24:<Topic24/>,
    25:<Topic25/>,26:<Topic26/>
  };
  return map[topicId] || null;
}
