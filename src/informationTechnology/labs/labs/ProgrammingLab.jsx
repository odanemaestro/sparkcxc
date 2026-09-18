import React, { useMemo, useState } from "react";
import { LabFrame, RibbonTabs, WindowBar } from "../components/LabFrame";

const models = {
  "Visual Basic": {
    extension: "vb",
    starter: `Dim mark As Integer\nmark = CInt(InputBox("Enter mark"))\n\n' Write the IF / ELSE selection here`,
    answer: `Dim mark As Integer\nmark = CInt(InputBox("Enter mark"))\nIf mark >= 50 Then\n    MsgBox("PASS")\nElse\n    MsgBox("FAIL")\nEnd If`,
  },
  Pascal: {
    extension: "pas",
    starter: `program ResultCheck;\nvar mark: integer;\nbegin\n  readln(mark);\n  { write the IF / ELSE selection here }\nend.`,
    answer: `program ResultCheck;\nvar mark: integer;\nbegin\n  readln(mark);\n  if mark >= 50 then\n    writeln('PASS')\n  else\n    writeln('FAIL');\nend.`,
  },
  C: {
    extension: "c",
    starter: `#include <stdio.h>\nint main(void) {\n  int mark;\n  scanf("%d", &mark);\n  /* write the IF / ELSE selection here */\n  return 0;\n}`,
    answer: `#include <stdio.h>\nint main(void) {\n  int mark;\n  scanf("%d", &mark);\n  if (mark >= 50) {\n    printf("PASS");\n  } else {\n    printf("FAIL");\n  }\n  return 0;\n}`,
  },
};

function selectionDetected(language, code) {
  const lower = code.toLowerCase();
  if (language === "Visual Basic") return /if\s+mark\s*>=\s*50\s+then/.test(lower) && /else/.test(lower) && /end\s+if/.test(lower) && /pass/.test(lower) && /fail/.test(lower);
  if (language === "Pascal") return /if\s+mark\s*>=\s*50\s+then/.test(lower) && /else/.test(lower) && /pass/.test(lower) && /fail/.test(lower);
  return /if\s*\(\s*mark\s*>=\s*50\s*\)/.test(lower) && /else/.test(lower) && /pass/.test(lower) && /fail/.test(lower);
}

export default function ProgrammingLab({ lab, completed, onBack, onComplete }) {
  const [tab, setTab] = useState("Code");
  const [language, setLanguage] = useState("Visual Basic");
  const [code, setCode] = useState(models["Visual Basic"].starter);
  const [mark, setMark] = useState(72);
  const [runCount, setRunCount] = useState(0);
  const [loopChoice, setLoopChoice] = useState("");
  const [debugChoice, setDebugChoice] = useState("");
  const [commented, setCommented] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [testCases, setTestCases] = useState([]);

  const detected = selectionDetected(language, code);
  const lower = code.toLowerCase();
  const declaration = language === "Visual Basic"
    ? lower.includes("dim mark as integer")
    : language === "Pascal"
      ? lower.includes("mark: integer")
      : lower.includes("int mark");

  const tasks = [
    { id: "language", label: "Work in one of the high-level language styles used in CXC IT materials", done: Boolean(language), help: "SPARK supports Visual Basic, Pascal and C syntax practice." },
    { id: "variable", label: "Declare and read an integer variable", done: declaration && lower.includes("mark") },
    { id: "selection", label: "Write a complete PASS / FAIL IF-ELSE selection", done: detected },
    { id: "test", label: "Run at least two test values", done: testCases.length >= 2 },
    { id: "loop", label: "Choose a FOR loop for exactly five repetitions", done: loopChoice === "FOR" },
    { id: "debug", label: "Identify a logic error", done: debugChoice === "Logic" },
    { id: "docs", label: "Add useful internal documentation", done: commented },
  ];

  const output = Number(mark) >= 50 ? "PASS" : "FAIL";
  const trace = useMemo(() => [
    `READ mark → ${mark}`,
    `Evaluate mark >= 50 → ${Number(mark) >= 50 ? "TRUE" : "FALSE"}`,
    `DISPLAY ${output}`,
  ], [mark, output]);

  function changeLanguage(value) {
    setLanguage(value);
    setCode(models[value].starter);
    setRunCount(0);
    setTestCases([]);
    setShowModel(false);
  }

  function run() {
    if (!detected) return;
    setRunCount(value => value + 1);
    setTestCases(current => [...current, { mark: Number(mark), output }].slice(-5));
  }

  function addComment() {
    const prefix = language === "Visual Basic" ? "' " : language === "Pascal" ? "{ " : "// ";
    const suffix = language === "Pascal" ? " }" : "";
    setCode(`${prefix}Display PASS for marks of 50 or more${suffix}\n${code}`);
    setCommented(true);
  }

  return (
    <LabFrame lab={lab} tasks={tasks} completed={completed} onBack={onBack} onComplete={onComplete}
      footer={<span>{language} · Runs: {runCount} · Test cases: {testCases.length}</span>}>
      <div className="itv2-code-window">
        <WindowBar title={`result_check.${models[language].extension}`} subtitle="SPARK Programming Studio" status="Local practice"/>
        <RibbonTabs tabs={["Code","Test","Debug","Documentation"]} active={tab} onChange={setTab}/>

        <div className="itv2-code-toolbar">
          <label>Language<select value={language} onChange={e => changeLanguage(e.target.value)}><option>Visual Basic</option><option>Pascal</option><option>C</option></select></label>
          <button onClick={run} disabled={!detected}>▶ Run</button>
          <button onClick={() => setShowModel(!showModel)}>{showModel ? "Hide model" : "Compare model"}</button>
        </div>

        {tab === "Code" && <div className="itv2-ide-layout">
          <aside className="itv2-project-tree"><strong>Project</strong><span>▾ ResultCheck</span><b>▤ result_check.{models[language].extension}</b></aside>
          <section>
            <div className="itv2-editor-tab">result_check.{models[language].extension}</div>
            <textarea className="itv2-code-editor" spellCheck="false" value={code} onChange={e => setCode(e.target.value)}/>
            <div className={`itv2-code-status ${detected ? "ok" : ""}`}>{detected ? "✓ Complete selection structure detected." : "Complete the PASS / FAIL IF-ELSE structure before running."}</div>
          </section>
        </div>}

        {tab === "Test" && <div className="itv2-test-layout">
          <div className="itv2-test-controls"><label>Test mark<input type="number" min="0" max="100" value={mark} onChange={e => setMark(e.target.value)}/></label><button onClick={run} disabled={!detected}>Run test</button></div>
          <div className="itv2-console"><span>OUTPUT</span><strong>{runCount ? output : "No program output yet."}</strong></div>
          <table><thead><tr><th>Test value</th><th>Expected / actual output</th></tr></thead><tbody>{testCases.map((test,index) => <tr key={`${test.mark}-${index}`}><td>{test.mark}</td><td>{test.output}</td></tr>)}</tbody></table>
        </div>}

        {tab === "Debug" && <div className="itv2-debug-layout">
          <div className="itv2-trace"><strong>Execution trace</strong>{trace.map((line,index) => <div key={line}><span>{index + 1}</span><code>{line}</code></div>)}</div>
          <label>A program runs but uses 50% tax instead of 15%. What type of error?<select value={debugChoice} onChange={e => setDebugChoice(e.target.value)}><option value="">Choose</option><option>Syntax</option><option>Logic</option><option>Runtime</option></select></label>
          <label>Read exactly five marks. Which loop is the clearest choice?<select value={loopChoice} onChange={e => setLoopChoice(e.target.value)}><option value="">Choose</option><option>FOR</option><option>WHILE</option><option>REPEAT</option></select></label>
        </div>}

        {tab === "Documentation" && <div className="itv2-docs-layout"><button className={commented ? "active" : ""} onClick={addComment}>Add useful comment</button><p>Good internal documentation uses meaningful identifiers, comments, indentation and effective whitespace. External documentation includes material such as a user manual.</p></div>}

        {showModel && <pre className="itv2-model-code">{models[language].answer}</pre>}
      </div>
    </LabFrame>
  );
}
