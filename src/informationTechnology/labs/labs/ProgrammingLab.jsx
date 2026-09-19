import React, { useMemo, useState } from "react";
import { LabFrame, RibbonTabs, WindowBar } from "../components/LabFrame";
import { ReducedMotionNotice, StatusMessage, useTaskEvidence } from "../components/ProductivityKit";
import { PlayIcon } from "../components/Icons";
import {
  PROGRAMMING_TEMPLATES,
  assessSelectionProgram,
  assessTaxDebug,
  containsUsefulComment,
  runLoopProgram,
  runSelectionProgram,
  runTaxProgram,
} from "../models/programmingModel.mjs";

const EXERCISES = Object.freeze({
  selection: { label: "Selection", title: "PASS / FAIL selection", prompt: "Read an integer mark. Display PASS for 50 or more; otherwise display FAIL." },
  loop: { label: "Iteration", title: "Running total", prompt: "Use a FOR loop to add the integers 1 to 5 and display the total." },
  debug: { label: "Debug", title: "Correct the tax program", prompt: "The program should calculate 15% tax. Find the logic error, correct it and run all debug tests." },
});

function emptyRun(message = "Run the program to see its output and trace.") {
  return { ok: null, output: "", trace: [], errors: [], message };
}

function TraceTable({ trace }) {
  if (!trace.length) return <p className="itv2-trace-empty">No trace recorded yet.</p>;
  const variableNames = [...new Set(trace.flatMap(step => Object.keys(step.variables)))];
  return (
    <div className="itv2-trace-table-wrap">
      <table className="itv2-trace-table">
        <thead><tr><th>Step</th><th>Line</th><th>Statement</th>{variableNames.map(name => <th key={name}>{name}</th>)}<th>Result</th></tr></thead>
        <tbody>{trace.map((step, index) => <tr key={`${step.statement}-${index}`}><td>{index + 1}</td><td>{step.line ?? "—"}</td><td><code>{step.statement}</code></td>{variableNames.map(name => <td key={name}>{step.variables[name] ?? "—"}</td>)}<td>{step.detail}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export default function ProgrammingLab({ lab, completed, onBack, onComplete }) {
  const [tab, setTab] = useState("Code");
  const [language, setLanguage] = useState("Visual Basic");
  const [exercise, setExercise] = useState("selection");
  const [sources, setSources] = useState(() => ({
    selection: PROGRAMMING_TEMPLATES["Visual Basic"].selection,
    loop: PROGRAMMING_TEMPLATES["Visual Basic"].loop,
    debug: PROGRAMMING_TEMPLATES["Visual Basic"].debug,
  }));
  const [selectionInput, setSelectionInput] = useState("72");
  const [debugInput, setDebugInput] = useState("100");
  const [lastRun, setLastRun] = useState(() => emptyRun());
  const [selectionTests, setSelectionTests] = useState([]);
  const [debugTests, setDebugTests] = useState([]);
  const [runCount, setRunCount] = useState(0);
  const { evidence, record } = useTaskEvidence();
  const code = sources[exercise];
  const template = PROGRAMMING_TEMPLATES[language];

  const sourceAssessment = useMemo(() => assessSelectionProgram(language, sources.selection), [language, sources.selection]);
  const commentPresent = useMemo(() => Object.values(sources).some(source => containsUsefulComment(language, source)), [language, sources]);
  const distinctSelectionValues = new Set(selectionTests.filter(test => test.ok).map(test => test.input)).size;
  const hasBoundaryTests = [49, 50].every(value => selectionTests.some(test => test.ok && test.input === value));

  const tasks = [
    { id: "language", label: "Work in a high-level language style used in CSEC IT", done: Boolean(language) },
    { id: "variable", label: "Declare, read and trace an integer variable", done: evidence.has("variable-trace") },
    { id: "selection", label: "Run a correct PASS / FAIL IF–ELSE selection", done: sourceAssessment.passed && evidence.has("selection-run") },
    { id: "test", label: "Run distinct test values, including 49 and 50", done: distinctSelectionValues >= 3 && hasBoundaryTests },
    { id: "loop", label: "Run a FOR loop for exactly five repetitions", done: evidence.has("loop-pass") },
    { id: "debug", label: "Correct the tax logic error and pass every debug test", done: evidence.has("debug-pass") },
    { id: "docs", label: "Add useful internal documentation", done: commentPresent && evidence.has("comment-run") },
  ];

  function updateCode(value) {
    setSources(current => ({ ...current, [exercise]: value }));
    setLastRun(emptyRun("Source changed. Run again to verify the result."));
  }

  function changeLanguage(value) {
    const next = PROGRAMMING_TEMPLATES[value];
    setLanguage(value);
    setSources({ selection: next.selection, loop: next.loop, debug: next.debug });
    setSelectionTests([]);
    setDebugTests([]);
    setLastRun(emptyRun());
  }

  function changeExercise(value) {
    setExercise(value);
    setLastRun(emptyRun());
  }

  function execute() {
    let run;
    if (exercise === "selection") run = runSelectionProgram({ language, code, input: selectionInput });
    else if (exercise === "loop") run = runLoopProgram({ language, code });
    else run = runTaxProgram({ language, code, input: debugInput });
    setRunCount(count => count + 1);
    setLastRun({ ...run, message: run.ok ? "Program completed successfully." : "The program did not run. Correct the reported issue and try again." });
    if (!run.ok) return;
    if (commentPresent) record("comment-run");
    if (exercise === "selection") {
      const input = Number(selectionInput);
      const expected = input >= 50 ? "PASS" : "FAIL";
      const correct = run.output.trim().toUpperCase() === expected;
      setSelectionTests(current => [...current.filter(test => test.input !== input), { input, output: run.output, expected, ok: correct }].slice(-8));
      if (correct) {
        record("selection-run");
        record("variable-trace");
      }
    }
    if (exercise === "loop" && run.output === "15" && run.trace.filter(step => step.statement.includes("total ←")).length === 5) record("loop-pass");
  }

  function runDebugSuite() {
    const assessment = assessTaxDebug(language, sources.debug);
    setRunCount(count => count + assessment.runs.length);
    setDebugTests(assessment.runs.map(item => ({ input: item.input, expected: item.expected, output: item.run.output, ok: item.run.ok && item.run.output === item.expected })));
    const displayedRun = runTaxProgram({ language, code: sources.debug, input: debugInput });
    setLastRun({ ...displayedRun, message: assessment.passed ? "All three debug tests passed. The logic error is corrected." : "Debug tests failed. The tax must be 15% for every test value." });
    if (assessment.passed) {
      record("debug-pass");
      if (commentPresent) record("comment-run");
    }
  }

  function addComment() {
    if (containsUsefulComment(language, code)) return;
    updateCode(`${template.comment}\n${code}`);
  }

  const tests = exercise === "selection" ? selectionTests : debugTests;
  return (
    <LabFrame lab={lab} tasks={tasks} completed={completed} onBack={onBack} onComplete={onComplete}
      footer={<span>{language} · Runs: {runCount} · Verified tests: {selectionTests.filter(test => test.ok).length + debugTests.filter(test => test.ok).length}</span>}>
      <div className="itv2-code-window">
        <WindowBar title={`${exercise}.${template.extension}`} subtitle="SPARK Programming Studio" status={lastRun.ok === false ? "Needs correction" : lastRun.ok ? "Run successful" : "Ready"}/>
        <RibbonTabs tabs={["Code", "Test & Output", "Variable Trace", "Debug"]} active={tab} onChange={setTab}/>
        <div className="itv2-code-toolbar">
          <label>Language<select aria-label="Programming language" value={language} onChange={event => changeLanguage(event.target.value)}><option>Visual Basic</option><option>Pascal</option><option>C</option></select></label>
          <div className="itv2-exercise-switch" role="group" aria-label="Programming exercise">{Object.entries(EXERCISES).map(([id, item]) => <button type="button" className={exercise === id ? "active" : ""} aria-pressed={exercise === id} key={id} onClick={() => changeExercise(id)}>{item.label}</button>)}</div>
          <button type="button" className="itv2-run-button" onClick={execute}><PlayIcon/> <span>Run</span></button>
          {exercise === "debug" && <button type="button" onClick={runDebugSuite}>Run all debug tests</button>}
          <ReducedMotionNotice/>
        </div>

        <div className="itv2-program-brief"><strong>{EXERCISES[exercise].title}</strong><span>{EXERCISES[exercise].prompt}</span></div>
        <StatusMessage tone={lastRun.ok === false ? "error" : lastRun.ok ? "success" : "neutral"}><strong>{lastRun.ok === false ? "Run stopped" : lastRun.ok ? "Run complete" : "Ready"}</strong><span>{lastRun.message}</span></StatusMessage>

        {tab === "Code" && <div className="itv2-ide-layout">
          <aside className="itv2-project-tree"><strong>Project</strong><span>▾ CSEC_Practice</span>{Object.entries(EXERCISES).map(([id, item]) => <button type="button" className={exercise === id ? "active" : ""} key={id} onClick={() => changeExercise(id)}>▤ {item.label}.{template.extension}</button>)}</aside>
          <section><div className="itv2-editor-tab">{exercise}.{template.extension}</div><textarea aria-label={`${EXERCISES[exercise].title} source code`} className="itv2-code-editor" spellCheck="false" wrap="off" value={code} onChange={event => updateCode(event.target.value)}/><div className="itv2-editor-actions"><button type="button" onClick={addComment}>Add useful comment</button><span>{code.split("\n").length} lines</span></div></section>
        </div>}

        {tab === "Test & Output" && <div className="itv2-test-layout">
          {exercise !== "loop" && <div className="itv2-test-controls"><label>{exercise === "selection" ? "Test mark" : "Test price"}<input aria-label={exercise === "selection" ? "Test mark" : "Test price"} type="number" value={exercise === "selection" ? selectionInput : debugInput} onChange={event => exercise === "selection" ? setSelectionInput(event.target.value) : setDebugInput(event.target.value)}/></label><button type="button" onClick={execute}>Run this value</button>{exercise === "debug" && <button type="button" onClick={runDebugSuite}>Run all debug tests</button>}</div>}
          {exercise === "loop" && <button type="button" className="itv2-standalone-run" onClick={execute}>Run five repetitions</button>}
          <div className="itv2-console" role="log" aria-live="polite"><span>PROGRAM OUTPUT</span><strong>{lastRun.ok ? lastRun.output : "No successful output yet."}</strong>{lastRun.errors.map((item, index) => <p key={`${item.message}-${index}`}>{item.line ? `Line ${item.line}: ` : ""}{item.message}</p>)}</div>
          {tests.length > 0 && <table><thead><tr><th>Input</th><th>Expected</th><th>Actual</th><th>Result</th></tr></thead><tbody>{tests.map(test => <tr key={test.input}><td>{test.input}</td><td>{test.expected}</td><td>{test.output || "—"}</td><td className={test.ok ? "itv2-pass" : "itv2-fail"}>{test.ok ? "PASS" : "FAIL"}</td></tr>)}</tbody></table>}
        </div>}

        {tab === "Variable Trace" && <div className="itv2-debug-layout"><div className="itv2-trace-heading"><strong>Execution trace</strong><span>Values shown are from the most recent successful run.</span></div><TraceTable trace={lastRun.ok ? lastRun.trace : []}/></div>}

        {tab === "Debug" && <div className="itv2-debug-layout"><h3>Debug by testing</h3><p>The faulty program calculates 50% tax instead of 15%. Correct the source, then run all three tests. Choosing an error type alone does not complete this task.</p><button type="button" className="itv2-debug-run" onClick={() => { setExercise("debug"); setTab("Code"); }}>Open faulty program</button><button type="button" className="itv2-debug-run" onClick={() => { setExercise("debug"); runDebugSuite(); }}>Run all debug tests</button>{debugTests.length > 0 && <div className={`itv2-debug-verdict ${debugTests.every(test => test.ok) ? "pass" : "fail"}`} role="status">{debugTests.every(test => test.ok) ? "All debug tests passed." : `${debugTests.filter(test => !test.ok).length} debug test(s) still failing.`}</div>}</div>}
      </div>
    </LabFrame>
  );
}