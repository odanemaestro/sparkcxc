import React, { useEffect, useMemo, useState } from "react";

function Card({ title, children }) {
  return <div className="it-lab-card">
    <div className="it-lab-card-head">
      <div><span>Interactive lab</span><h3>{title}</h3></div>
      <em>Change the controls and observe what happens.</em>
    </div>
    {children}
  </div>;
}

function ChoiceChallenge({ title, prompt, options, answer, explanation, nextLabel, onNext }) {
  const [choice, setChoice] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChoice(null);
    setChecked(false);
  }, [prompt]);

  const correct = choice === answer;

  return <Card title={title}>
    <p className="it-lab-prompt">{prompt}</p>
    <div className="it-choice-row it-choice-column">
      {options.map((option, index) => (
        <button
          type="button"
          key={option}
          className={[
            choice === index ? "selected" : "",
            checked && index === answer ? "correct" : "",
            checked && choice === index && !correct ? "wrong" : "",
          ].filter(Boolean).join(" ")}
          onClick={() => { setChoice(index); setChecked(false); }}
        >
          {option}
        </button>
      ))}
    </div>
    <div className="it-lab-actions">
      <button type="button" className="it-primary" disabled={choice == null} onClick={() => setChecked(true)}>Check</button>
      {onNext && <button type="button" className="it-lab-next" onClick={onNext}>{nextLabel || "Next challenge"} <span aria-hidden="true">→</span></button>}
    </div>
    {checked && <p className={`it-feedback ${correct ? "ok" : "bad"}`} role="status"><strong>{correct ? "Correct." : "Try again."}</strong> {explanation}</p>}
  </Card>;
}

function SystemSelector() {
  const rows = [
    { prompt: "A weather research centre must process huge scientific datasets.", options: ["Laptop", "Supercomputer", "Embedded computer", "Tablet"], answer: 1, why: "A supercomputer is designed for extremely demanding processing." },
    { prompt: "A controller is built inside a microwave oven.", options: ["Mainframe", "Desktop", "Embedded computer", "Supercomputer"], answer: 2, why: "An embedded computer performs a specific task inside another device." },
    { prompt: "A bank must support a very large organisational workload and many users.", options: ["Mainframe", "Tablet", "Smartphone", "Embedded controller"], answer: 0, why: "A mainframe is suited to large organisational workloads and many users." },
  ];
  const [index, setIndex] = useState(0);
  const row = rows[index];
  return <ChoiceChallenge title="Computer System Selector" prompt={row.prompt} options={row.options} answer={row.answer} explanation={row.why} onNext={() => setIndex((index + 1) % rows.length)}/>;
}

function IposLab() {
  const scenarios = [
    { name: "Supermarket checkout", steps: [["Barcode scanned","Input"],["Find item and price","Processing"],["Save the sale","Storage"],["Price shown","Output"]] },
    { name: "School attendance", steps: [["Student ID entered","Input"],["Match student record","Processing"],["Save attendance","Storage"],["Confirmation shown","Output"]] },
    { name: "Digital thermometer", steps: [["Temperature sensed","Input"],["Convert reading","Processing"],["Store reading","Storage"],["Temperature shown","Output"]] },
  ];
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selected, setSelected] = useState({});
  const scenario = scenarios[scenarioIndex];
  const labels = ["Input","Processing","Storage","Output"];
  const complete = scenario.steps.every(([_, answer], index) => selected[index] === answer);

  useEffect(() => setSelected({}), [scenarioIndex]);

  return <Card title="Build the IPOS Cycle">
    <div className="it-lab-head-row">
      <p className="it-lab-prompt">{scenario.name}</p>
      <button type="button" className="it-secondary" onClick={() => setScenarioIndex((scenarioIndex + 1) % scenarios.length)}>New scenario</button>
    </div>
    <div className="it-ipos-builder">
      {scenario.steps.map(([text, answer], index) => (
        <div className="it-ipos-row" key={text}>
          <span>{text}</span>
          <select value={selected[index] || ""} onChange={event => setSelected({ ...selected, [index]: event.target.value })}>
            <option value="">Choose stage</option>
            {labels.map(label => <option key={label}>{label}</option>)}
          </select>
          <strong className={selected[index] ? (selected[index] === answer ? "it-ok" : "it-no") : ""}>{selected[index] ? (selected[index] === answer ? "✓" : "×") : ""}</strong>
        </div>
      ))}
    </div>
    <p className={`it-feedback ${complete ? "ok" : ""}`} role="status">{complete ? "Cycle complete. Every stage is in the correct place." : "Classify each action as Input, Processing, Storage or Output."}</p>
  </Card>;
}

function CloudLab() {
  const scenarios = [
    { text: "A student needs the same project file at home and school.", answer: 0, why: "Cloud storage supports authorised access from different locations." },
    { text: "A lab must keep working when its Internet connection fails.", answer: 1, why: "A local copy remains available without Internet access." },
    { text: "A team in several parishes edits shared documents.", answer: 0, why: "Cloud storage can make remote collaboration easier." },
  ];
  const [index, setIndex] = useState(0);
  const row = scenarios[index];
  return <ChoiceChallenge title="Cloud vs Local Storage" prompt={row.text} options={["Cloud storage","Local storage"]} answer={row.answer} explanation={row.why} onNext={() => setIndex((index + 1) % scenarios.length)}/>;
}

function DeviceMatcher() {
  const rows = [
    { p: "Read shaded examination responses", a: "OMR", options: ["OMR","OCR","MICR","3D printer"] },
    { p: "Convert printed text into editable computer text", a: "OCR", options: ["OMR","OCR","MICR","Barcode reader"] },
    { p: "Read magnetic characters on banking documents", a: "MICR", options: ["OCR","OMR","MICR","Webcam"] },
    { p: "Capture a fingerprint", a: "Biometric scanner", options: ["Plotter","Biometric scanner","Speaker","Laser printer"] },
  ];
  const [index, setIndex] = useState(0);
  const row = rows[index];
  return <ChoiceChallenge title="Device Scenario Matcher" prompt={row.p} options={row.options} answer={row.options.indexOf(row.a)} explanation={`${row.a} is the most suitable device or technology for this job.`} onNext={() => setIndex((index + 1) % rows.length)}/>;
}

function SpecLab() {
  const cases = [
    { p: "The monitor has no image.", options: ["Check monitor power and cable connections","Format the storage drive","Delete user files","Replace all software"], a: 0, why: "Start with the simplest physical checks." },
    { p: "A laptop will not start and its battery indicator is empty.", options: ["Charge/check the battery","Replace the keyboard","Delete browser history","Reinstall the printer"], a: 0, why: "A flat or loose battery is a reasonable first check." },
    { p: "A printer will not print.", options: ["Check power, connection, paper and cartridge","Replace the operating system","Remove RAM","Turn off security"], a: 0, why: "Basic printer troubleshooting begins with power, connection and consumables." },
  ];
  const [index, setIndex] = useState(0);
  const row = cases[index];
  return <ChoiceChallenge title="Troubleshooting Lab" prompt={row.p} options={row.options} answer={row.a} explanation={row.why} onNext={() => setIndex((index + 1) % cases.length)}/>;
}

function ValidationLab() {
  const [mode, setMode] = useState("range");
  const [value, setValue] = useState("85");
  const [second, setSecond] = useState("85");

  let result = "";
  let ok = false;
  if (mode === "range") {
    ok = value !== "" && Number(value) >= 0 && Number(value) <= 100;
    result = ok ? "Passes the range check." : "Fails the range check.";
  } else if (mode === "length") {
    ok = value.length === 8;
    result = ok ? "Passes the 8-character length check." : `Length is ${value.length}. Eight characters are required.`;
  } else {
    ok = value === second && value !== "";
    result = ok ? "Both entries match. Verification passes." : "The two entries do not match.";
  }

  return <Card title="Validation and Verification Lab">
    <div className="it-segmented">
      <button type="button" className={mode === "range" ? "active" : ""} onClick={() => { setMode("range"); setValue("85"); }}>Range</button>
      <button type="button" className={mode === "length" ? "active" : ""} onClick={() => { setMode("length"); setValue("AB123456"); }}>Length</button>
      <button type="button" className={mode === "verify" ? "active" : ""} onClick={() => { setMode("verify"); setValue("STU2048"); setSecond("STU2048"); }}>Double entry</button>
    </div>
    <div className="it-control-row">
      <label>{mode === "range" ? "Mark" : mode === "length" ? "Customer ID" : "First entry"}<input value={value} onChange={event => setValue(event.target.value)}/></label>
      {mode === "verify" && <label>Second entry<input value={second} onChange={event => setSecond(event.target.value)}/></label>}
    </div>
    <p className={`it-feedback ${ok ? "ok" : "bad"}`} role="status">{result}</p>
  </Card>;
}

function NetworkScale() {
  const rows = [
    { p: "Computers inside one school campus", options: ["LAN","MAN","WAN","Mobile network"], a: 0, why: "A LAN covers a limited local area." },
    { p: "Connected offices across several countries", options: ["LAN","WAN","Bluetooth","Hotspot"], a: 1, why: "A WAN covers a large geographical area." },
    { p: "Phone users communicate while travelling", options: ["Mobile network","Intranet","LAN only","Extranet only"], a: 0, why: "A mobile network supports communication while users move between locations." },
  ];
  const [index, setIndex] = useState(0);
  const row = rows[index];
  return <ChoiceChallenge title="Network Scale Visualiser" prompt={row.p} options={row.options} answer={row.a} explanation={row.why} onNext={() => setIndex((index + 1) % rows.length)}/>;
}

function NetworkParts() {
  const rows = [
    { p: "Forward data between devices on the same local network.", options: ["Switch","Router","Modem","NIC"], a: 0, why: "A switch forwards traffic within the local network." },
    { p: "Connect different networks.", options: ["Switch","Router","Scanner","Printer"], a: 1, why: "A router connects and forwards data between networks." },
    { p: "Allow a computer to connect to a network.", options: ["NIC","Plotter","Projector","Speaker"], a: 0, why: "A network interface card or adapter provides network connectivity." },
  ];
  const [index, setIndex] = useState(0);
  const row = rows[index];
  return <ChoiceChallenge title="Network Component Matcher" prompt={row.p} options={row.options} answer={row.a} explanation={row.why} onNext={() => setIndex((index + 1) % rows.length)}/>;
}

function WebTech() {
  const rows = [
    { p: "Identifies the location of a web resource", a: "URL" },
    { p: "Structures web-page content", a: "HTML" },
    { p: "Transfers files between systems", a: "FTP" },
    { p: "Supports communication between web clients and servers", a: "HTTP" },
  ];
  const [index, setIndex] = useState(0);
  const row = rows[index];
  const options = ["URL","HTML","FTP","HTTP"];
  return <ChoiceChallenge title="Web Technology Map" prompt={row.p} options={options} answer={options.indexOf(row.a)} explanation={`${row.a} is the correct web technology for this function.`} onNext={() => setIndex((index + 1) % rows.length)}/>;
}

function SecurityLab({ misuse = false }) {
  const rows = misuse ? [
    { p: "A fake bank email asks you to enter your password on an unfamiliar website.", options: ["Phishing","Validation","Backup","Telemedicine"], a: 0, why: "Phishing impersonates a trusted source to steal sensitive information." },
    { p: "An attacker floods a service so legitimate users cannot access it.", options: ["Denial-of-service attack","Mail merge","Verification","Compression"], a: 0, why: "A denial-of-service attack tries to make a service unavailable." },
    { p: "Commercial software is copied and distributed without permission.", options: ["Software piracy","Encryption","Authentication","Sorting"], a: 0, why: "Unauthorised copying and distribution is software piracy." },
  ] : [
    { p: "Protect confidential files if a laptop is stolen.", options: ["Encryption","Word count","Page number","Sorting"], a: 0, why: "Encryption protects stored data from being easily read." },
    { p: "Recover files after storage failure.", options: ["Backup and recovery","Font formatting","Hyperlink","Pivot table"], a: 0, why: "Backups allow data to be restored after loss or damage." },
    { p: "Reduce malicious-software risk.", options: ["Anti-malware","Mail merge","Slide master","VLOOKUP"], a: 0, why: "Anti-malware tools detect and remove malicious software." },
  ];
  const [index, setIndex] = useState(0);
  const row = rows[index];
  return <ChoiceChallenge title={misuse ? "Computer Misuse Scenarios" : "Security Control Matcher"} prompt={row.p} options={row.options} answer={row.a} explanation={row.why} onNext={() => setIndex((index + 1) % rows.length)}/>;
}

function CareersLab() {
  const cases = [
    { p: "Study an organisation's requirements and design a suitable information-system solution.", a: "Systems analyst" },
    { p: "Manage database systems, access and availability.", a: "Database administrator" },
    { p: "Design or manage network infrastructure.", a: "Network engineer" },
    { p: "Build and maintain software applications.", a: "Software developer" },
  ];
  const [index, setIndex] = useState(0);
  const options = cases.map(item => item.a);
  const row = cases[index];
  return <ChoiceChallenge title="IT Career Explorer" prompt={row.p} options={options} answer={options.indexOf(row.a)} explanation={`${row.a} best matches those responsibilities.`} onNext={() => setIndex((index + 1) % cases.length)}/>;
}

function DocumentLab() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [align, setAlign] = useState("left");
  const [columns, setColumns] = useState(false);

  return <Card title="SPARK Document Lab">
    <div className="it-toolbar">
      <button type="button" className={bold ? "active" : ""} onClick={() => setBold(!bold)}>Bold</button>
      <button type="button" className={italic ? "active" : ""} onClick={() => setItalic(!italic)}>Italic</button>
      <button type="button" className={align === "left" ? "active" : ""} onClick={() => setAlign("left")}>Left</button>
      <button type="button" className={align === "center" ? "active" : ""} onClick={() => setAlign("center")}>Centre</button>
      <button type="button" className={columns ? "active" : ""} onClick={() => setColumns(!columns)}>2 columns</button>
    </div>
    <div
      className={`it-document ${columns ? "two-columns" : ""}`}
      contentEditable
      suppressContentEditableWarning
      style={{ fontWeight: bold ? 700 : 400, fontStyle: italic ? "italic" : "normal", textAlign: align }}
    >
      SPARK Technology Club Newsletter. Edit this text, then use the controls to practise document formatting.
    </div>
  </Card>;
}

function FormLab() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [level, setLevel] = useState("Form 4");
  const [consent, setConsent] = useState(false);

  return <Card title="Fillable Form Builder">
    <div className="it-form-stack">
      <label>Text box<input value={name} onChange={event => setName(event.target.value)} placeholder="Student name"/></label>
      <label>Date picker<input type="date" value={date} onChange={event => setDate(event.target.value)}/></label>
      <label>Drop-down list<select value={level} onChange={event => setLevel(event.target.value)}><option>Form 4</option><option>Form 5</option></select></label>
    </div>
    <label className="it-check"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)}/> Parent/guardian consent received</label>
    <div className="it-form-preview">
      <strong>Live form data</strong>
      <span>Name: {name || "Not entered"}</span>
      <span>Date: {date || "Not selected"}</span>
      <span>Level: {level}</span>
      <span>Consent: {consent ? "Yes" : "No"}</span>
    </div>
  </Card>;
}

function WebLab() {
  const [broken, setBroken] = useState(false);
  const [audience, setAudience] = useState("students");
  return <Card title="SPARK Web Lab">
    <label className="it-single-control">Target audience
      <select value={audience} onChange={event => setAudience(event.target.value)}>
        <option value="students">Students</option>
        <option value="parents">Parents</option>
        <option value="public">General public</option>
      </select>
    </label>
    <div className="it-browser">
      <div className="it-browser-bar">spark.local/student-project</div>
      <h4>School Technology Club</h4>
      <p>Information prepared for {audience}.</p>
      <a href="#demo" onClick={event => event.preventDefault()}>Activities</a>
    </div>
    <label className="it-check"><input type="checkbox" checked={broken} onChange={event => setBroken(event.target.checked)}/> Simulate a broken Activities link</label>
    <p className={`it-feedback ${broken ? "bad" : "ok"}`} role="status">{broken ? "Link checker: 1 broken link. Fix it before publishing." : "Link checker: all practice links working."}</p>
  </Card>;
}

function SpreadsheetBasic() {
  const [values, setValues] = useState([72, 68, 80, 75]);
  const update = (index, value) => setValues(values.map((item, i) => i === index ? Number(value) || 0 : item));
  const sum = values.reduce((a, b) => a + b, 0);
  const average = sum / values.length;

  return <Card title="SPARK Spreadsheet Lab">
    <div className="it-sheet">
      <div className="head"></div><div className="head">A</div><div className="head">B</div>
      {values.map((value, index) => <React.Fragment key={index}><div className="head">{index + 1}</div><div>Student {index + 1}</div><input aria-label={`Student ${index + 1} mark`} value={value} onChange={event => update(index, event.target.value)}/></React.Fragment>)}
      <div className="head">5</div><div>AVERAGE</div><div className="formula">{average.toFixed(2)}</div>
    </div>
    <div className="it-formula-bar">=AVERAGE(B1:B4) → {average.toFixed(2)} · SUM = {sum}</div>
    <div className="it-bars" aria-label="Bar chart of student marks">{values.map((value, index) => <div key={index}><span style={{ height: `${Math.max(6, Math.min(100, value))}%` }}></span><small>S{index + 1}</small></div>)}</div>
  </Card>;
}

function ReferenceLab() {
  const [row, setRow] = useState(2);
  const priceRef = `B${row}`;
  const formula = `=${priceRef}*$F$2`;
  return <Card title="Relative vs Absolute Reference Animator">
    <div className="it-reference-grid">
      <div><small>Copied to row</small><strong>{row}</strong></div>
      <div><small>Relative part changes</small><strong>{priceRef}</strong></div>
      <div><small>Absolute part stays fixed</small><strong>$F$2</strong></div>
    </div>
    <div className="it-formula-bar">{formula}</div>
    <input aria-label="Row to copy formula to" type="range" min="2" max="10" value={row} onChange={event => setRow(Number(event.target.value))}/>
    <p className="it-lab-note">Move the slider. B changes with the row, while $F$2 stays fixed.</p>
  </Card>;
}

function ChartLab() {
  const scenarios = [
    { p: "Compare sales for five separate products.", a: 0, why: "Bar or column charts compare categories clearly." },
    { p: "Show electricity use from January to December.", a: 1, why: "A line graph shows change across an ordered time period." },
    { p: "Show how one budget is divided among four categories.", a: 2, why: "A pie chart can show parts of one meaningful total." },
  ];
  const options = ["Bar / Column","Line","Pie"];
  const [index, setIndex] = useState(0);
  const row = scenarios[index];
  return <ChoiceChallenge title="Choose the Chart" prompt={row.p} options={options} answer={row.a} explanation={row.why} onNext={() => setIndex((index + 1) % scenarios.length)}/>;
}

function DatabaseLab({ query = false }) {
  const rows = [
    { id: 1, name: "Alicia", age: 19, parish: "Kingston" },
    { id: 2, name: "Dario", age: 17, parish: "St. Catherine" },
    { id: 3, name: "Kareem", age: 22, parish: "Kingston" },
    { id: 4, name: "Nia", age: 20, parish: "Clarendon" },
  ];
  const [adult, setAdult] = useState(query);
  const [parish, setParish] = useState(query ? "Kingston" : "All");
  const [sort, setSort] = useState("id");

  const filtered = useMemo(() => rows
    .filter(row => (!adult || row.age >= 18) && (parish === "All" || row.parish === parish))
    .sort((a, b) => sort === "age" ? a.age - b.age : sort === "name" ? a.name.localeCompare(b.name) : a.id - b.id)
  , [adult, parish, sort]);

  return <Card title={query ? "Query Builder" : "SPARK Database Lab"}>
    <div className="it-control-row">
      <label className="it-check"><input type="checkbox" checked={adult} onChange={event => setAdult(event.target.checked)}/> Age ≥ 18</label>
      <label>Parish<select value={parish} onChange={event => setParish(event.target.value)}><option>All</option><option>Kingston</option><option>St. Catherine</option><option>Clarendon</option></select></label>
      <label>Sort by<select value={sort} onChange={event => setSort(event.target.value)}><option value="id">StudentID</option><option value="name">Name</option><option value="age">Age</option></select></label>
    </div>
    <div className="it-db-table">
      <div className="head">StudentID 🔑</div><div className="head">Name</div><div className="head">Age</div><div className="head">Parish</div>
      {filtered.map(row => <React.Fragment key={row.id}><div>{row.id}</div><div>{row.name}</div><div>{row.age}</div><div>{row.parish}</div></React.Fragment>)}
    </div>
    <p>{filtered.length} record{filtered.length === 1 ? "" : "s"} match.</p>
  </Card>;
}

function ProblemPlanner() {
  const [input, setInput] = useState("three scores");
  const [process, setProcess] = useState("calculate average");
  const [output, setOutput] = useState("average and result");
  return <Card title="IPO Planner">
    <div className="it-form-stack">
      <label>Input<input value={input} onChange={event => setInput(event.target.value)}/></label>
      <label>Process<input value={process} onChange={event => setProcess(event.target.value)}/></label>
      <label>Output<input value={output} onChange={event => setOutput(event.target.value)}/></label>
    </div>
    <div className="it-cycle compact"><div><strong>Input</strong><span>{input}</span></div><div><strong>Process</strong><span>{process}</span></div><div><strong>Output</strong><span>{output}</span></div></div>
  </Card>;
}

function TypeLab() {
  const rows = [
    { p: "Store a student's full name.", options: ["String","Boolean","Integer","Real"], a: 0, why: "A string stores a sequence of characters." },
    { p: "Store whether a fee has been paid.", options: ["Boolean","String","Real","Integer"], a: 0, why: "A Boolean stores one of two logical states." },
    { p: "Store a student's age.", options: ["Integer","String","Boolean","Real only"], a: 0, why: "Age in whole years can be stored as an integer." },
  ];
  const [index, setIndex] = useState(0);
  const row = rows[index];
  return <ChoiceChallenge title="Data Type Sorter" prompt={row.p} options={row.options} answer={row.a} explanation={row.why} onNext={() => setIndex((index + 1) % rows.length)}/>;
}

function FlowTraceLab() {
  const [mark, setMark] = useState(65);
  const [step, setStep] = useState(0);
  const rows = [{ count: 0, total: 0 }, { count: 1, total: 2 }, { count: 2, total: 4 }, { count: 3, total: 6 }];

  return <Card title="Flow and Trace Lab">
    <div className="it-flowchart">
      <div className="terminator">START</div><span>↓</span><div className="io">INPUT mark</div><span>↓</span><div className="decision">mark ≥ 50?</div>
      <div className="it-flow-branches"><span className={mark >= 50 ? "active-path" : ""}>Yes → PASS</span><span className={mark < 50 ? "active-path" : ""}>No → FAIL</span></div>
    </div>
    <label className="it-single-control">Test mark<input type="number" min="0" max="100" value={mark} onChange={event => setMark(Number(event.target.value))}/></label>
    <p className="it-feedback">Path taken: <strong>{mark >= 50 ? "Yes → PASS" : "No → FAIL"}</strong></p>
    <div className="it-trace-table"><div><strong>COUNT</strong><strong>TOTAL</strong></div>{rows.slice(0, step + 1).map((row, index) => <div key={index}><span>{row.count}</span><span>{row.total}</span></div>)}</div>
    <div className="it-choice-row"><button type="button" onClick={() => setStep(Math.max(0, step - 1))}>Previous</button><button type="button" onClick={() => setStep(Math.min(rows.length - 1, step + 1))}>Step</button><button type="button" onClick={() => setStep(0)}>Reset</button></div>
  </Card>;
}

function ErrorLab() {
  const rows = [
    { p: "A required language symbol is missing.", options: ["Syntax error","Logic error","Runtime error"], a: 0, why: "The language rules have been broken." },
    { p: "The program runs, but tax is calculated using the wrong rate.", options: ["Logic error","Syntax error","Hardware error"], a: 0, why: "The program executes but the logic produces the wrong result." },
    { p: "The program fails while it is executing.", options: ["Runtime error","Mail merge","Validation"], a: 0, why: "A runtime error occurs during program execution." },
  ];
  const [index, setIndex] = useState(0);
  const row = rows[index];
  return <ChoiceChallenge title="Error Type Detective" prompt={row.p} options={row.options} answer={row.a} explanation={row.why} onNext={() => setIndex((index + 1) % rows.length)}/>;
}

function CodeLab() {
  const [a, setA] = useState(7);
  const [b, setB] = useState(12);
  const [showSteps, setShowSteps] = useState(false);
  const result = Math.max(Number(a) || 0, Number(b) || 0);
  const branch = Number(a) > Number(b) ? "A > B is TRUE, so DISPLAY A" : "A > B is FALSE, so the ELSE branch DISPLAY B runs";

  return <Card title="SPARK Code Lab">
    <pre className="it-code">READ A, B{"\n"}IF A &gt; B THEN{"\n"}  DISPLAY A{"\n"}ELSE{"\n"}  DISPLAY B{"\n"}ENDIF</pre>
    <div className="it-control-row"><label>A<input type="number" value={a} onChange={event => setA(event.target.value)}/></label><label>B<input type="number" value={b} onChange={event => setB(event.target.value)}/></label></div>
    <div className="it-console">&gt; {result}</div>
    <button type="button" className="it-secondary" onClick={() => setShowSteps(!showSteps)}>{showSteps ? "Hide execution path" : "Show execution path"}</button>
    {showSteps && <p className="it-feedback">{branch}</p>}
    <p className="it-lab-note">SPARK teaches transferable logic. The current CSEC examination does not require one named programming language.</p>
  </Card>;
}

function DocumentationLab() {
  const [clear, setClear] = useState(false);
  const [comments, setComments] = useState(false);

  return <Card title="Code Documentation Review">
    <pre className="it-code">{clear ? `${comments ? "// Calculate amount due\n" : ""}TotalPayment ← Quantity * UnitPrice` : `${comments ? "// calc\n" : ""}x ← q * p`}</pre>
    <div className="it-segmented">
      <button type="button" className={clear ? "active" : ""} onClick={() => setClear(!clear)}>Meaningful names</button>
      <button type="button" className={comments ? "active" : ""} onClick={() => setComments(!comments)}>Useful comment</button>
    </div>
    <p className="it-feedback">{clear && comments ? "Clearer. The purpose is easier to understand and maintain." : "Improve the example using meaningful names and a useful comment."}</p>
  </Card>;
}

export default function InformationTechnologyTools({ topicId }) {
  if (topicId === 1) return <SystemSelector/>;
  if (topicId === 2) return <IposLab/>;
  if (topicId === 3) return <CloudLab/>;
  if (topicId === 4) return <DeviceMatcher/>;
  if (topicId === 5) return <SpecLab/>;
  if (topicId === 6) return <ValidationLab/>;
  if (topicId === 7) return <NetworkScale/>;
  if (topicId === 8) return <NetworkParts/>;
  if (topicId === 9) return <WebTech/>;
  if (topicId === 10) return <SecurityLab misuse/>;
  if (topicId === 11) return <SecurityLab/>;
  if (topicId === 12) return <CareersLab/>;
  if (topicId === 13) return <DocumentLab/>;
  if (topicId === 14) return <FormLab/>;
  if (topicId === 15) return <WebLab/>;
  if (topicId === 16) return <SpreadsheetBasic/>;
  if (topicId === 17) return <ReferenceLab/>;
  if (topicId === 18) return <ChartLab/>;
  if (topicId === 19) return <DatabaseLab/>;
  if (topicId === 20) return <DatabaseLab query/>;
  if (topicId === 21) return <ProblemPlanner/>;
  if (topicId === 22) return <TypeLab/>;
  if (topicId === 23) return <FlowTraceLab/>;
  if (topicId === 24) return <ErrorLab/>;
  if (topicId === 25) return <CodeLab/>;
  if (topicId === 26) return <DocumentationLab/>;
  return null;
}
