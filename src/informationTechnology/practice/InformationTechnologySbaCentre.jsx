import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import {
  IT_SBA_COMPONENTS,
  IT_SBA_CURRENT_LIMITS,
  IT_SBA_MARKING_GUIDE,
  IT_SBA_MARKS,
  IT_SBA_PROJECTS,
  findItSbaComponent,
  findItSbaProject,
} from "./itSbaProjects";
import { useInformationTechnologySbaRoute } from "../../routing/sparkRoutingV270";
import "./informationTechnologySba.css";

const PROGRESS_PREFIX = "spark-it-sba-progress-v1-";

function SbaIcon({ type = "project", size = 24 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    focusable: "false",
    "aria-hidden": "true",
  };

  if (type === "database") {
    return <svg {...common}><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>;
  }
  if (type === "spreadsheet") {
    return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 8h16M9 8v13M15 8v13M4 13h16M4 17h16"/></svg>;
  }
  if (type === "word") {
    return <svg {...common}><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h4M9 12h7M9 16h7"/></svg>;
  }
  if (type === "web") {
    return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 13h8M8 16h5"/></svg>;
  }
  if (type === "programming") {
    return <svg {...common}><path d="m9 8-4 4 4 4M15 8l4 4-4 4M13 5l-2 14"/></svg>;
  }
  if (type === "download") {
    return <svg {...common}><path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M5 20h14"/></svg>;
  }
  if (type === "check") {
    return <svg {...common}><path d="m5 12 4 4L19 6"/></svg>;
  }
  if (type === "calendar") {
    return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>;
  }
  return <svg {...common}><path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5"/></svg>;
}

function readProgress(projectId) {
  try {
    const parsed = JSON.parse(localStorage.getItem(`${PROGRESS_PREFIX}${projectId}`) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeProgress(projectId, progress) {
  try {
    localStorage.setItem(`${PROGRESS_PREFIX}${projectId}`, JSON.stringify(progress));
  } catch {
    // Local progress is optional.
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function rowsToCsv(rows) {
  return rows.map(row => row.map(csvCell).join(",")).join("\r\n");
}

function safeFilename(value) {
  return String(value || "spark-sba").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function downloadTextFile(filename, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function referenceGuideHtml(project) {
  const componentSections = IT_SBA_COMPONENTS.map(item => {
    const component = project.components[item.id];
    const completed = Array.isArray(component.completed)
      ? component.completed
      : [
          `Problem: ${component.completed.problem}`,
          `Inputs: ${component.completed.inputs.join(", ")}`,
          `Processes: ${component.completed.processes.join(", ")}`,
          `Outputs: ${component.completed.outputs.join(", ")}`,
        ];

    return `
      <section>
        <h2>${escapeHtml(item.title)} - ${escapeHtml(item.marks)} marks</h2>
        <p><strong>What this sample produces:</strong> ${escapeHtml(component.produce)}</p>
        <h3>Marking focus</h3>
        <ul>${IT_SBA_MARKING_GUIDE[item.id].map(mark => `<li>${escapeHtml(mark.label)} - ${escapeHtml(mark.marks)} mark${mark.marks === 1 ? "" : "s"}</li>`).join("")}</ul>
        <h3>Completed SPARK reference</h3>
        <ul>${completed.map(line => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
        ${item.id === "programming" ? `
          <h3>Pseudocode</h3>
          <pre>${escapeHtml(component.completed.pseudocode.join("\n"))}</pre>
          <h3>Pascal reference</h3>
          <pre>${escapeHtml(component.completed.pascal.join("\n"))}</pre>
        ` : ""}
      </section>`;
  }).join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(project.title)} - SPARK SBA Reference</title>
<style>
body{font-family:Arial,sans-serif;max-width:900px;margin:0 auto;padding:32px;color:#172337;line-height:1.6}
h1,h2,h3{color:#17375e}header,section{border-bottom:1px solid #d9e1e8;padding:0 0 24px;margin:0 0 24px}
.notice{padding:16px;border:1px solid #0d8069;background:#eef9f6;border-radius:10px}
pre{white-space:pre-wrap;background:#f4f7fa;border:1px solid #d9e1e8;border-radius:8px;padding:14px;overflow:auto}
table{width:100%;border-collapse:collapse}th,td{border:1px solid #d9e1e8;padding:8px;text-align:left}
small{color:#657488}
</style>
</head>
<body>
<header>
<p>SPARK CSEC Information Technology SBA Centre</p>
<h1>${escapeHtml(project.title)}</h1>
<p>${escapeHtml(project.scenario)}</p>
<div class="notice"><strong>Reference example only.</strong> Learn from the structure, methods and quality of the work. Do not submit this SPARK project, its wording or its data as your own SBA.</div>
</header>
<section>
<h2>Project purpose</h2>
<p>${escapeHtml(project.purpose)}</p>
<h3>Current CXC structure used by SPARK</h3>
<p>The project is organised around Word Processing, Web Page Design, Spreadsheet, Database Management and Problem-Solving and Programming. Follow your teacher's current assignment and deadlines.</p>
<ul>${IT_SBA_CURRENT_LIMITS.map(item => `<li><strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(item.text)}</li>`).join("")}</ul>
</section>
${componentSections}
<section>
<h2>Starter data</h2>
<table>
${project.starterRows.map((row, index) => `<tr>${row.map(cell => index === 0 ? `<th>${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}
</table>
</section>
<section>
<h2>Final self-check</h2>
<ul>
<li>Every required file opens and uses the required filename.</li>
<li>Database relationships, queries, form and report have been tested.</li>
<li>Spreadsheet formulas recalculate and copied references behave correctly.</li>
<li>Word Processing advanced features work with the correct data.</li>
<li>The web page is one clear page and every link works.</li>
<li>The algorithm, trace table, program and screenshots use matching test data.</li>
<li>Names, fees, dates and other project facts agree across all components.</li>
<li>You have followed your teacher's instructions and current CXC guidance.</li>
</ul>
</section>
<footer><small>Created by SPARK as an original practice reference.</small></footer>
</body>
</html>`;
}

function sampleWebPageHtml(project) {
  const web = project.components.web;
  const items = Array.isArray(web.completed) ? web.completed : [];
  const initials = project.title.split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join("").toUpperCase();
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(project.title)}</title>
<style>
body{font-family:Arial,sans-serif;margin:0;background:#f5f7fa;color:#172337}header,main,footer{max-width:960px;margin:auto;padding:24px}
header{background:#17375e;color:white;max-width:none}header>div{max-width:960px;margin:auto;display:flex;align-items:center;gap:14px}
.logo{width:56px;height:56px;border-radius:14px;background:#0d8069;display:grid;place-items:center;font-weight:900;font-size:20px}
nav a{color:#0d8069;font-weight:700;margin-right:16px}section{background:white;border:1px solid #d8e0e8;border-radius:12px;padding:20px;margin:16px 0}
.hero{background:linear-gradient(135deg,#17375e,#0d8069);color:white}footer{color:#657488}
</style>
</head>
<body>
<header><div><div class="logo" role="img" aria-label="${escapeHtml(project.title)} logo">${escapeHtml(initials)}</div><div><h1>${escapeHtml(project.title)}</h1><p>${escapeHtml(project.accent)}</p></div></div></header>
<main>
<nav><a href="#about">About</a><a href="#services">Information</a><a href="#contact">Contact</a></nav>
<section id="about" class="hero"><h2>Welcome</h2><p>${escapeHtml(project.scenario)}</p></section>
<section id="services"><h2>What you need to know</h2><ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
<section id="contact"><h2>Contact</h2><p>Email: <a href="mailto:info@example.com">info@example.com</a></p><p>This is fictional contact information for the SPARK practice project.</p></section>
</main>
<footer>SPARK reference web page. Replace all content with your own project work.</footer>
</body>
</html>`;
}

function checklistText(project) {
  return [
    `SPARK SBA FINAL CHECK - ${project.title}`,
    "",
    "PROJECT CONTROL",
    "[ ] I used my teacher's current project brief.",
    "[ ] Every filename matches the required naming convention.",
    "[ ] I kept backup copies of each component.",
    "[ ] Facts such as names, fees and dates agree across the project.",
    "",
    "DATABASE",
    "[ ] At least two tables use suitable primary keys.",
    "[ ] Relationships match the real situation.",
    "[ ] Simple, complex and calculated queries return correct results.",
    "[ ] The form and subform are easy to use.",
    "[ ] The report includes required grouping, sorting, summary values and title.",
    "",
    "SPREADSHEET",
    "[ ] Formulas use cell references instead of typed answers.",
    "[ ] At least three suitable functions work correctly.",
    "[ ] Relative and absolute references copy correctly.",
    "[ ] Sorting and filtering produce the required records.",
    "[ ] Summary and chart use the correct source data.",
    "[ ] At least one cell links between worksheets.",
    "",
    "WORD PROCESSING",
    "[ ] Page layout and formatting are consistent.",
    "[ ] Required advanced features work.",
    "[ ] Mail merge fields or form controls have been tested.",
    "[ ] Imported charts, tables or graphics fit the page.",
    "",
    "WEB PAGE",
    "[ ] The current SPARK reference uses one page.",
    "[ ] Text and graphics suit the audience.",
    "[ ] At least two required hyperlink types work.",
    "[ ] The page agrees with the other SBA components.",
    "",
    "PROBLEM-SOLVING AND PROGRAMMING",
    "[ ] Problem definition is clear.",
    "[ ] Pseudocode or flowchart includes input, processing, output, selection and looping.",
    "[ ] Trace table uses suitable normal, boundary and invalid data where appropriate.",
    "[ ] Program output matches the expected test results.",
    "[ ] Screenshots clearly show data entry and output.",
    "[ ] Program documentation contains the required evidence.",
    "",
    "INTEGRITY",
    "[ ] I understand this SPARK project is a reference example only.",
    "[ ] I did not copy the SPARK project and present it as my assigned SBA.",
    "[ ] I followed my school's rules and current CXC guidance for any AI-assisted work.",
  ].join("\r\n");
}

function projectBriefText(project) {
  return [
    "CSEC INFORMATION TECHNOLOGY",
    "SPARK PRACTICE SBA",
    project.title.toUpperCase(),
    "",
    "DESCRIPTION OF PROJECT",
    project.scenario,
    "",
    "PURPOSE",
    project.purpose,
    "",
    "CURRENT CXC GUARDRAILS USED BY SPARK",
    ...IT_SBA_CURRENT_LIMITS.flatMap(item => [`${item.title}: ${item.text}`, ""]),
    ...IT_SBA_COMPONENTS.flatMap(item => [
      `${item.title.toUpperCase()} - ${item.marks} MARKS`,
      project.components[item.id].produce,
      "",
    ]),
    "IMPORTANT",
    "This is an original SPARK practice project. Use it to learn how the parts of an SBA connect. Do not submit this project, its data or its wording as your own school-assigned SBA.",
  ].join("\r\n");
}

function traceCsv(project) {
  const trace = project.components.programming.completed.trace;
  const maxColumns = Math.max(1, ...trace.map(row => row.length));
  const headings = Array.from({ length: maxColumns }, (_, index) => index === 0 ? "Test record" : `Trace value ${index}`);
  return rowsToCsv([headings, ...trace]);
}

function dateLabel(date) {
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" }).format(date);
}

function plannedMilestones(deadlineValue) {
  if (!deadlineValue) return [];
  const deadline = new Date(`${deadlineValue}T12:00:00`);
  if (Number.isNaN(deadline.getTime())) return [];
  const plan = [
    ["Planning and folder setup", 98],
    ["Database draft", 84],
    ["Spreadsheet draft", 63],
    ["Word Processing draft", 49],
    ["Web page draft", 35],
    ["Algorithm and trace table", 28],
    ["Program implementation", 18],
    ["Documentation and final testing", 7],
    ["Final submission target", 0],
  ];
  return plan.map(([label, daysBefore]) => {
    const date = new Date(deadline);
    date.setDate(date.getDate() - daysBefore);
    return { label, date };
  });
}

function CentreHome({ openProject, onBack }) {
  const [deadline, setDeadline] = useState("");
  const milestones = useMemo(() => plannedMilestones(deadline), [deadline]);

  return (
    <main className="it-sba-page">
      <section className="it-sba-shell">
        <button type="button" className="it-practice-back it-sba-back" data-spark-action="nav" onClick={onBack}>
          <BackArrowIcon/><span>Information Technology Practice</span>
        </button>

        <header className="it-sba-hero">
          <div>
            <div className="it-practice-eyebrow">CSEC Information Technology SBA Centre</div>
            <h1>Build your SBA one part at a time.</h1>
            <p>Learn what each section is asking you to do, follow a clear step-by-step guide, practise with five original SPARK projects and download completed reference examples to study.</p>
          </div>
          <div className="it-sba-hero-badge"><strong>5</strong><span>complete sample projects</span></div>
        </header>

        <section className="it-sba-current-card">
          <div>
            <div className="it-practice-label">Current CXC structure</div>
            <h2>One practical project with five related areas.</h2>
            <p>SPARK follows the current CSEC Information Technology syllabus structure. The productivity-tool areas total 70 raw marks and are divided by two to give 35 marks. Problem-Solving and Programming contributes 15 marks. Paper 03 therefore contributes 50 marks and 25% of the final subject grade.</p>
          </div>
          <div className="it-sba-mark-grid">
            {IT_SBA_MARKS.map(item => <div key={item.label}><strong>{item.marks}</strong><span>{item.label}</span></div>)}
          </div>
          <div className="it-sba-syllabus-note">
            <strong>Important web-page note</strong>
            <p>The current CXC syllabus states that the Web Page Design SBA task should be limited to one web page. Some older school assignments used several linked pages. SPARK uses one page in these practice projects. Always follow your teacher's current assignment and instructions.</p>
          </div>
          <div className="it-sba-limit-grid">
            {IT_SBA_CURRENT_LIMITS.map(item => (
              <article key={item.id}>
                <SbaIcon type={item.id} size={20}/>
                <div><strong>{item.title}</strong><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="it-sba-roadmap-section">
          <div className="it-sba-section-heading">
            <div>
              <div className="it-practice-label">How the work connects</div>
              <h2>Your SBA should feel like one project, not five unrelated tasks.</h2>
            </div>
          </div>
          <div className="it-sba-roadmap">
            {IT_SBA_COMPONENTS.map((item, index) => (
              <div key={item.id} className="it-sba-roadmap-item">
                <span>{index + 1}</span>
                <SbaIcon type={item.id}/>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="it-sba-projects-section">
          <div className="it-sba-section-heading">
            <div>
              <div className="it-practice-label">Guided sample projects</div>
              <h2>Choose a realistic scenario and work through the full SBA flow.</h2>
              <p>Each project uses original SPARK wording and fictional data. The examples are designed for learning, not for submission as your own SBA.</p>
            </div>
          </div>
          <div className="it-sba-project-grid">
            {IT_SBA_PROJECTS.map(project => (
              <article className="it-sba-project-card" key={project.id}>
                <div className="it-sba-project-topline"><span>{project.code}</span><em>{project.level}</em></div>
                <div className="it-sba-project-icon"><SbaIcon type="project" size={28}/></div>
                <div className="it-practice-label">{project.sector}</div>
                <h3>{project.title}</h3>
                <p>{project.scenario}</p>
                <div className="it-sba-project-focus">{project.accent}</div>
                <button type="button" className="it-practice-primary" onClick={() => openProject(project.id)}>Open guided project</button>
              </article>
            ))}
          </div>
        </section>

        <section className="it-sba-timeline-card">
          <div className="it-sba-timeline-copy">
            <SbaIcon type="calendar" size={28}/>
            <div>
              <div className="it-practice-label">SBA timeline planner</div>
              <h2>Work backwards from your school deadline.</h2>
              <p>Enter your target submission date and SPARK will suggest checkpoints. Your teacher's dates always take priority.</p>
            </div>
          </div>
          <label className="it-sba-date-field">Target submission date
            <input type="date" value={deadline} onChange={event => setDeadline(event.target.value)}/>
          </label>
          {milestones.length > 0 && <div className="it-sba-milestones">
            {milestones.map(item => <div key={item.label}><strong>{dateLabel(item.date)}</strong><span>{item.label}</span></div>)}
          </div>}
        </section>

        <section className="it-sba-integrity-card">
          <div className="it-sba-integrity-icon"><SbaIcon type="check" size={30}/></div>
          <div>
            <div className="it-practice-label">Use SPARK properly</div>
            <h2>Study the examples. Build your own assigned project.</h2>
            <p>These completed examples are SPARK practice projects. Do not submit them, rename them or copy their data as your own SBA. Your teacher should guide and monitor your actual project. If you use AI tools in assessed work, follow your school rules and current CXC disclosure requirements.</p>
          </div>
        </section>
      </section>
    </main>
  );
}

function ProjectOverview({ project, openHome, openComponent }) {
  const [progress, setProgress] = useState(() => readProgress(project.id));
  const completeCount = IT_SBA_COMPONENTS.filter(item => progress[item.id]).length;

  useEffect(() => {
    setProgress(readProgress(project.id));
  }, [project.id]);

  function resetProgress() {
    const next = {};
    setProgress(next);
    writeProgress(project.id, next);
  }

  return (
    <main className="it-sba-page">
      <section className="it-sba-shell">
        <button type="button" className="it-practice-back it-sba-back" data-spark-action="nav" onClick={openHome}>
          <BackArrowIcon/><span>All SBA projects</span>
        </button>

        <header className="it-sba-project-hero">
          <div>
            <div className="it-practice-eyebrow">{project.code} - {project.sector}</div>
            <h1>{project.title}</h1>
            <p>{project.scenario}</p>
          </div>
          <div className="it-sba-progress-ring" aria-label={`${completeCount} of 5 sections reviewed`}>
            <strong>{completeCount}/5</strong>
            <span>sections reviewed</span>
          </div>
        </header>

        <section className="it-sba-project-purpose">
          <div className="it-practice-label">Description of Project</div>
          <h2>What you are building</h2>
          <p>{project.purpose}</p>
        </section>

        <section className="it-sba-component-grid">
          {IT_SBA_COMPONENTS.map((item, index) => {
            const component = project.components[item.id];
            const done = Boolean(progress[item.id]);
            return (
              <article key={item.id} className={`it-sba-component-card ${done ? "done" : ""}`}>
                <div className="it-sba-component-head">
                  <div className="it-sba-component-icon"><SbaIcon type={item.id}/></div>
                  <span>Task {String.fromCharCode(65 + index)}</span>
                  <strong>{item.marks} marks</strong>
                </div>
                <h2>{item.title}</h2>
                <p>{component.produce}</p>
                <button type="button" className={done ? "it-practice-secondary" : "it-practice-primary"} onClick={() => openComponent(project.id, item.id)}>
                  {done ? "Review section" : "Start section"}
                </button>
              </article>
            );
          })}
        </section>

        <section className="it-sba-download-card">
          <div>
            <div className="it-practice-label">SPARK download centre</div>
            <h2>Download the reference material for this practice project.</h2>
            <p>The completed reference is an original SPARK example. Study how the parts connect, then use the same thinking on your own teacher-assigned project.</p>
          </div>
          <div className="it-sba-download-grid">
            <button type="button" onClick={() => downloadTextFile(`${safeFilename(project.title)}-completed-reference.html`, referenceGuideHtml(project), "text/html;charset=utf-8")}>
              <SbaIcon type="download"/><span><strong>Completed reference</strong><small>Full HTML guide</small></span>
            </button>
            <button type="button" onClick={() => downloadTextFile(`${safeFilename(project.title)}-starter-data.csv`, rowsToCsv(project.starterRows), "text/csv;charset=utf-8")}>
              <SbaIcon type="download"/><span><strong>Starter data</strong><small>CSV file</small></span>
            </button>
            <button type="button" onClick={() => downloadTextFile(`${safeFilename(project.title)}-sample-web-page.html`, sampleWebPageHtml(project), "text/html;charset=utf-8")}>
              <SbaIcon type="download"/><span><strong>Sample web page</strong><small>HTML file</small></span>
            </button>
            <button type="button" onClick={() => downloadTextFile(`${safeFilename(project.title)}-sample-program.pas`, project.components.programming.completed.pascal.join("\r\n"))}>
              <SbaIcon type="download"/><span><strong>Sample Pascal program</strong><small>PAS file</small></span>
            </button>
            <button type="button" onClick={() => downloadTextFile(`${safeFilename(project.title)}-trace-table.csv`, traceCsv(project), "text/csv;charset=utf-8")}>
              <SbaIcon type="download"/><span><strong>Trace table</strong><small>CSV file</small></span>
            </button>
            <button type="button" onClick={() => downloadTextFile(`${safeFilename(project.title)}-final-checklist.txt`, checklistText(project))}>
              <SbaIcon type="download"/><span><strong>Final checklist</strong><small>Text file</small></span>
            </button>
            <button type="button" onClick={() => downloadTextFile(`${safeFilename(project.title)}-project-brief.txt`, projectBriefText(project))}>
              <SbaIcon type="download"/><span><strong>Practice project brief</strong><small>Text file</small></span>
            </button>
          </div>
        </section>

        <section className="it-sba-progress-actions">
          <span>Your review progress is stored on this device.</span>
          {completeCount > 0 && <button type="button" className="it-practice-secondary" onClick={resetProgress}>Reset review progress</button>}
        </section>
      </section>
    </main>
  );
}

function CompletedExample({ componentId, component }) {
  if (componentId === "programming") {
    const completed = component.completed;
    return (
      <div className="it-sba-completed-example">
        <h3>Problem definition</h3>
        <p>{completed.problem}</p>
        <div className="it-sba-ipo-grid">
          <div><strong>Inputs</strong><ul>{completed.inputs.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><strong>Processes</strong><ul>{completed.processes.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><strong>Outputs</strong><ul>{completed.outputs.map(item => <li key={item}>{item}</li>)}</ul></div>
        </div>
        <h3>Pseudocode reference</h3>
        <pre className="it-sba-code">{completed.pseudocode.join("\n")}</pre>
        <h3>Sample trace data</h3>
        <div className="it-sba-table-wrap">
          <table className="it-sba-table">
            <tbody>{completed.trace.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <h3>Pascal reference</h3>
        <p className="it-sba-reference-note">SPARK uses Pascal for these reference programs because it matches the style of the supplied practice material. Use the programming language selected by your centre for your assessed SBA.</p>
        <pre className="it-sba-code">{completed.pascal.join("\n")}</pre>
      </div>
    );
  }

  return (
    <div className="it-sba-completed-example">
      <ul>{component.completed.map(item => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

function ComponentGuide({ project, componentId, openProject, openComponent }) {
  const component = findItSbaComponent(project, componentId);
  const componentIndex = IT_SBA_COMPONENTS.findIndex(item => item.id === componentId);
  const meta = IT_SBA_COMPONENTS[componentIndex];
  const [progress, setProgress] = useState(() => readProgress(project.id));
  const done = Boolean(progress[componentId]);
  const nextMeta = IT_SBA_COMPONENTS[componentIndex + 1] || null;

  if (!component || !meta) return null;

  function toggleReviewed() {
    const next = { ...progress, [componentId]: !done };
    setProgress(next);
    writeProgress(project.id, next);
  }

  return (
    <main className="it-sba-page">
      <section className="it-sba-shell">
        <button type="button" className="it-practice-back it-sba-back" data-spark-action="nav" onClick={() => openProject(project.id)}>
          <BackArrowIcon/><span>{project.title}</span>
        </button>

        <header className="it-sba-component-hero">
          <div className="it-sba-component-icon large"><SbaIcon type={componentId} size={32}/></div>
          <div>
            <div className="it-practice-eyebrow">{project.code} - {meta.marks} marks</div>
            <h1>{meta.title}</h1>
            <p>{component.produce}</p>
          </div>
        </header>

        <section className="it-sba-guide-layout">
          <div className="it-sba-guide-main">
            <div className="it-sba-section-heading">
              <div>
                <div className="it-practice-label">Step-by-step guide</div>
                <h2>Complete the section in this order.</h2>
              </div>
            </div>
            <div className="it-sba-step-list">
              {component.steps.map((step, index) => (
                <article key={step.title} className="it-sba-step-card">
                  <span>{index + 1}</span>
                  <div><h3>{step.title}</h3><p>{step.detail}</p></div>
                </article>
              ))}
            </div>
          </div>

          <aside className="it-sba-guide-side">
            <div className="it-sba-side-card">
              <div className="it-practice-label">Before you move on</div>
              <h3>Ask yourself</h3>
              <ul>
                <li>Does this part solve the task stated in the project brief?</li>
                <li>Can I explain why I used each feature?</li>
                <li>Did I test the result instead of assuming it works?</li>
                <li>Does the information agree with the other SBA sections?</li>
              </ul>
            </div>
            <div className="it-sba-side-card marks">
              <div className="it-practice-label">What earns marks</div>
              <div className="it-sba-marking-list">
                {IT_SBA_MARKING_GUIDE[componentId].map(item => (
                  <div key={item.label}><span>{item.label}</span><strong>{item.marks}</strong></div>
                ))}
              </div>
            </div>
            <div className="it-sba-side-card caution">
              <div className="it-practice-label">Common mistakes</div>
              <ul>{component.mistakes.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          </aside>
        </section>

        <section className="it-sba-reference-card">
          <div className="it-practice-label">Completed SPARK reference</div>
          <h2>See what a completed version could include.</h2>
          <p>This is one valid SPARK approach for this fictional practice project. Your teacher may require different fields, formulas, queries, formatting or program logic for your real SBA.</p>
          <CompletedExample componentId={componentId} component={component}/>
        </section>

        <section className="it-sba-component-actions">
          <button type="button" className={done ? "it-practice-secondary" : "it-practice-primary"} onClick={toggleReviewed}>
            <SbaIcon type="check" size={18}/><span>{done ? "Marked as reviewed" : "Mark section as reviewed"}</span>
          </button>
          {nextMeta ? (
            <button type="button" className="it-practice-primary" onClick={() => openComponent(project.id, nextMeta.id)}>Next: {nextMeta.title}</button>
          ) : (
            <button type="button" className="it-practice-primary" onClick={() => openProject(project.id)}>Return to project overview</button>
          )}
        </section>
      </section>
    </main>
  );
}

export default function InformationTechnologySbaCentre({ onBack }) {
  const {
    page,
    projectId,
    componentId,
    openHome,
    openProject,
    openComponent,
  } = useInformationTechnologySbaRoute(true);

  const project = findItSbaProject(projectId);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [page, projectId, componentId]);

  if (page === "project" && project) {
    return <ProjectOverview project={project} openHome={openHome} openComponent={openComponent}/>;
  }

  if (page === "component" && project && findItSbaComponent(project, componentId)) {
    return <ComponentGuide project={project} componentId={componentId} openProject={openProject} openComponent={openComponent}/>;
  }

  return <CentreHome openProject={openProject} onBack={onBack}/>;
}
