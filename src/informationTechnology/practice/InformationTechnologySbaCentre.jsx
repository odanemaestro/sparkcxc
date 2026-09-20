import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import {
  IT_SBA_COMPONENTS,
  IT_SBA_CURRENT_LIMITS,
  IT_SBA_MARKS,
  IT_SBA_PROJECTS,
  findItSbaComponent,
  findItSbaProject,
} from "./itSbaProjects";
import { getItSbaProjectTasks } from "./itSbaProjectTasks";
import { useInformationTechnologySbaRoute } from "../../routing/sparkRoutingV270";
import "./informationTechnologySba.css";

const PROGRESS_PREFIX = "spark-it-sba-progress-v2-";
const COMPONENT_FILE = {
  database: "database-completed.pdf",
  spreadsheet: "spreadsheet-completed.pdf",
  word: "word-completed.pdf",
  web: "web-completed.pdf",
  programming: "programming-completed.pdf",
};

const IT_SBA_NATIVE_FILES = {
  "sports-academy": {
    database: [
      { label: "Completed Access database", file: "SportsAcademy_Database.accdb", format: "Microsoft Access (.accdb)", detail: "Inspect the tables, sample records, relationships and saved queries." },
      { label: "Database schema reference", file: "Database_Schema.sql", format: "Access SQL (.sql)", detail: "Fallback structure and sample-data script used to build the reference database." },
    ],
    spreadsheet: [
      { label: "Completed Excel workbook", file: "SportsAcademy_Financials.xlsx", format: "Microsoft Excel (.xlsx)", detail: "Members, programme lookups, formulas, summary values and chart." },
    ],
    word: [
      { label: "Athlete registration form", file: "Registration_Form.docx", format: "Microsoft Word (.docx)", detail: "Completed form layout with the required control types." },
      { label: "Generic mail merge", file: "Generic_Mail_Merge.docx", format: "Microsoft Word (.docx)", detail: "Main document showing the merge fields before the merge." },
      { label: "Merged output", file: "Merged_Output.docx", format: "Microsoft Word (.docx)", detail: "Completed personalised reference output using fictional data." },
    ],
    web: [
      { label: "Completed web page", file: "Web_Page.html", format: "Web page (.html)", detail: "Open it in a browser to inspect the finished one-page SBA design.", preview: true },
    ],
    programming: [
      { label: "Pascal source code", file: "AcademyFees.pas", format: "Pascal source (.pas)", detail: "Working reference implementation matching the algorithm." },
      { label: "Program documentation", file: "Program_Documentation.docx", format: "Microsoft Word (.docx)", detail: "Problem definition, pseudocode, trace table, source code and evidence section." },
    ],
  },
  "medical-centre": {
    database: [
      { label: "Completed Access database", file: "IslandCare_Database.accdb", format: "Microsoft Access (.accdb)", detail: "Inspect patient, service and appointment data plus saved queries." },
      { label: "Database schema reference", file: "Database_Schema.sql", format: "Access SQL (.sql)", detail: "Fallback structure and sample-data script used to build the reference database." },
    ],
    spreadsheet: [{ label: "Completed Excel workbook", file: "MedicalAccounts.xlsx", format: "Microsoft Excel (.xlsx)", detail: "Accounts, service lookups, senior discount, balances, dashboard and chart." }],
    word: [
      { label: "Patient information form", file: "Registration_Form.docx", format: "Microsoft Word (.docx)", detail: "Reference form layout with suitable control types." },
      { label: "Generic mail merge", file: "Generic_Mail_Merge.docx", format: "Microsoft Word (.docx)", detail: "Appointment and balance notice with merge fields." },
      { label: "Merged output", file: "Merged_Output.docx", format: "Microsoft Word (.docx)", detail: "Completed fictional patient notice." },
    ],
    web: [{ label: "Completed web page", file: "Web_Page.html", format: "Web page (.html)", detail: "Patient-information page with internal and email links.", preview: true }],
    programming: [
      { label: "Pascal source code", file: "MedicalBalances.pas", format: "Pascal source (.pas)", detail: "Working balance-calculation program." },
      { label: "Program documentation", file: "Program_Documentation.docx", format: "Microsoft Word (.docx)", detail: "Problem definition, algorithm, trace table and source code." },
    ],
  },
  "community-market": {
    database: [
      { label: "Completed Access database", file: "YardFresh_Database.accdb", format: "Microsoft Access (.accdb)", detail: "Inspect product, supplier and stock-purchase data plus saved queries." },
      { label: "Database schema reference", file: "Database_Schema.sql", format: "Access SQL (.sql)", detail: "Fallback structure and sample-data script used to build the reference database." },
    ],
    spreadsheet: [{ label: "Completed Excel workbook", file: "SalesAnalysis.xlsx", format: "Microsoft Excel (.xlsx)", detail: "Sales formulas, discount, GCT, dashboard and category chart." }],
    word: [
      { label: "Supplier registration form", file: "Registration_Form.docx", format: "Microsoft Word (.docx)", detail: "Reference supplier form layout." },
      { label: "Generic mail merge", file: "Generic_Mail_Merge.docx", format: "Microsoft Word (.docx)", detail: "Reorder notice with merge fields." },
      { label: "Merged output", file: "Merged_Output.docx", format: "Microsoft Word (.docx)", detail: "Completed fictional supplier notice." },
    ],
    web: [{ label: "Completed web page", file: "Web_Page.html", format: "Web page (.html)", detail: "Completed market information page.", preview: true }],
    programming: [
      { label: "Pascal source code", file: "MarketCheckout.pas", format: "Pascal source (.pas)", detail: "Working checkout, discount and GCT program." },
      { label: "Program documentation", file: "Program_Documentation.docx", format: "Microsoft Word (.docx)", detail: "Completed problem-solving documentation." },
    ],
  },
  "community-library": {
    database: [
      { label: "Completed Access database", file: "HarbourView_Database.accdb", format: "Microsoft Access (.accdb)", detail: "Inspect member, book and loan records plus saved queries." },
      { label: "Database schema reference", file: "Database_Schema.sql", format: "Access SQL (.sql)", detail: "Fallback structure and sample-data script used to build the reference database." },
    ],
    spreadsheet: [{ label: "Completed Excel workbook", file: "LoansAnalysis.xlsx", format: "Microsoft Excel (.xlsx)", detail: "Late-day formulas, concessions, fine analysis, dashboard and chart." }],
    word: [
      { label: "Membership form", file: "Registration_Form.docx", format: "Microsoft Word (.docx)", detail: "Reference membership form layout." },
      { label: "Generic mail merge", file: "Generic_Mail_Merge.docx", format: "Microsoft Word (.docx)", detail: "Overdue notice with merge fields." },
      { label: "Merged output", file: "Merged_Output.docx", format: "Microsoft Word (.docx)", detail: "Completed fictional overdue notice." },
    ],
    web: [{ label: "Completed web page", file: "Web_Page.html", format: "Web page (.html)", detail: "Completed library information page.", preview: true }],
    programming: [
      { label: "Pascal source code", file: "LibraryFines.pas", format: "Pascal source (.pas)", detail: "Working overdue-fine program." },
      { label: "Program documentation", file: "Program_Documentation.docx", format: "Microsoft Word (.docx)", detail: "Completed problem-solving documentation." },
    ],
  },
  "island-tours": {
    database: [
      { label: "Completed Access database", file: "BlueWave_Database.accdb", format: "Microsoft Access (.accdb)", detail: "Inspect customer, package and booking records plus saved queries." },
      { label: "Database schema reference", file: "Database_Schema.sql", format: "Access SQL (.sql)", detail: "Fallback structure and sample-data script used to build the reference database." },
    ],
    spreadsheet: [{ label: "Completed Excel workbook", file: "TourBookings.xlsx", format: "Microsoft Excel (.xlsx)", detail: "Package lookups, booking calculations, discount, balance, dashboard and chart." }],
    word: [
      { label: "Booking request form", file: "Registration_Form.docx", format: "Microsoft Word (.docx)", detail: "Reference tour-booking form layout." },
      { label: "Generic mail merge", file: "Generic_Mail_Merge.docx", format: "Microsoft Word (.docx)", detail: "Booking confirmation with merge fields." },
      { label: "Merged output", file: "Merged_Output.docx", format: "Microsoft Word (.docx)", detail: "Completed fictional booking confirmation." },
    ],
    web: [{ label: "Completed web page", file: "Web_Page.html", format: "Web page (.html)", detail: "Completed visitor information page.", preview: true }],
    programming: [
      { label: "Pascal source code", file: "TourBookings.pas", format: "Pascal source (.pas)", detail: "Working booking-cost and balance program." },
      { label: "Program documentation", file: "Program_Documentation.docx", format: "Microsoft Word (.docx)", detail: "Completed problem-solving documentation." },
    ],
  },
};

function assetUrl(path) {
  return `${process.env.PUBLIC_URL || ""}${path}`;
}

function projectPdf(projectId) {
  return assetUrl(`/it-sba/${projectId}/full-sba.pdf`);
}

function completedPdf(projectId, componentId) {
  return assetUrl(`/it-sba/${projectId}/${COMPONENT_FILE[componentId]}`);
}

function nativeAssetUrl(projectId, file) {
  return assetUrl(`/it-sba/${projectId}/native/${file}`);
}

function NativeFileDownloads({ project, componentId = null, compact = false }) {
  const groups = componentId
    ? [[componentId, IT_SBA_NATIVE_FILES[project.id]?.[componentId] || []]]
    : IT_SBA_COMPONENTS.map(item => [item.id, IT_SBA_NATIVE_FILES[project.id]?.[item.id] || []]);

  return (
    <section className={`it-sba-native-card ${compact ? "compact" : ""}`}>
      <div className="it-sba-native-heading">
        <div>
          <div className="it-practice-label">Actual working files</div>
          <h2>Open the files in the software used for the SBA.</h2>
          <p>These are the working reference files behind the completed PDFs. Open the Excel workbook in spreadsheet software, the Word files in a word processor, the web page in a browser, the Pascal source in a code editor and the Access database in Microsoft Access.</p>
        </div>
      </div>
      <div className="it-sba-native-groups">
        {groups.map(([id,files]) => {
          const meta = IT_SBA_COMPONENTS.find(item => item.id === id);
          if (!meta || !files.length) return null;
          return <div className="it-sba-native-group" key={id}>
            <div className="it-sba-native-group-title"><SbaIcon type={id} size={19}/><strong>{meta.title}</strong></div>
            <div className="it-sba-native-grid">
              {files.map(file => <a key={file.file} className="it-sba-native-file" href={nativeAssetUrl(project.id,file.file)} {...(file.preview ? { target:"_blank", rel:"noreferrer" } : { download:true })}>
                <span className="it-sba-native-file-icon"><SbaIcon type={file.preview ? "web" : "download"} size={20}/></span>
                <span className="it-sba-native-file-copy"><strong>{file.label}</strong><small>{file.format}</small><em>{file.detail}</em></span>
              </a>)}
            </div>
          </div>;
        })}
      </div>
      <div className="it-sba-native-note"><strong>SPARK reference protection</strong><p>The Word files and Excel sheets contain visible SPARK reference markings. The HTML and source files also carry a reference notice. The Access database includes a SPARK reference table when it is generated. The files are for study and comparison, not submission.</p></div>
    </section>
  );
}

function SbaIcon({ type = "project", size = 24 }) {
  const common = { width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:1.8, strokeLinecap:"round", strokeLinejoin:"round", focusable:"false", "aria-hidden":"true" };
  if (type === "database") return <svg {...common}><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>;
  if (type === "spreadsheet") return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 8h16M9 8v13M15 8v13M4 13h16M4 17h16"/></svg>;
  if (type === "word") return <svg {...common}><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h4M9 12h7M9 16h7"/></svg>;
  if (type === "web") return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 13h8M8 16h5"/></svg>;
  if (type === "programming") return <svg {...common}><path d="m9 8-4 4 4 4M15 8l4 4-4 4M13 5l-2 14"/></svg>;
  if (type === "download") return <svg {...common}><path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M5 20h14"/></svg>;
  if (type === "pdf") return <svg {...common}><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h4M9 12h6M9 16h4"/></svg>;
  if (type === "check") return <svg {...common}><path d="m5 12 4 4L19 6"/></svg>;
  if (type === "calendar") return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>;
  return <svg {...common}><path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5"/></svg>;
}

function progressStorageKey(userId, projectId) {
  return `${PROGRESS_PREFIX}${String(userId || "guest")}:${projectId}`;
}

function readProgress(userId, projectId) {
  try {
    const key = progressStorageKey(userId, projectId);
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed && typeof parsed === "object" ? parsed : {};
    }

    // V2/V3 compatibility. Migrate the old device-only project key into the
    // signed-in learner's key once, then keep all future review state separate.
    if (userId) {
      const legacyKey = `${PROGRESS_PREFIX}${projectId}`;
      const legacy = localStorage.getItem(legacyKey);
      if (legacy) {
        const parsed = JSON.parse(legacy);
        const safe = parsed && typeof parsed === "object" ? parsed : {};
        localStorage.setItem(key, JSON.stringify(safe));
        localStorage.removeItem(legacyKey);
        return safe;
      }
    }

    return {};
  } catch {
    return {};
  }
}

function writeProgress(userId, projectId, progress) {
  try { localStorage.setItem(progressStorageKey(userId, projectId), JSON.stringify(progress)); } catch {}
}

function emitSbaReviewActivity(onActivity, project, componentId, completed) {
  if (!project || !componentId) return;
  const component = IT_SBA_COMPONENTS.find(item => item.id === componentId);
  onActivity?.({
    type: "it_sba_section_reviewed",
    projectId: project.id,
    projectTitle: project.title,
    componentId,
    componentTitle: component?.title || componentId,
    title: `${project.title} - ${component?.title || componentId}`,
    completed: Boolean(completed),
    at: new Date().toISOString(),
  });
}

function dateLabel(date) {
  return new Intl.DateTimeFormat(undefined, { day:"numeric", month:"short", year:"numeric" }).format(date);
}

function plannedMilestones(deadlineValue) {
  if (!deadlineValue) return [];
  const deadline = new Date(`${deadlineValue}T12:00:00`);
  if (Number.isNaN(deadline.getTime())) return [];
  const items = [
    ["Final review and backups",0],["Programming documentation",-7],["Program testing",-14],["Web page",-21],["Word Processing",-28],["Spreadsheet",-38],["Database",-50],["Planning and data design",-58],
  ];
  return items.map(([label,offset]) => { const d=new Date(deadline); d.setDate(d.getDate()+offset); return {label,date:d}; }).reverse();
}

function PdfActions({ project, componentId = null, compact = false }) {
  const href = componentId ? completedPdf(project.id, componentId) : projectPdf(project.id);
  const label = componentId ? `completed ${componentId} reference` : "full SBA";
  return (
    <div className={`it-sba-pdf-actions ${compact ? "compact" : ""}`}>
      <a className="it-practice-primary" href={href} target="_blank" rel="noreferrer"><SbaIcon type="pdf" size={18}/><span>View {label} PDF</span></a>
      <a className="it-practice-secondary" href={href} download><SbaIcon type="download" size={18}/><span>Download PDF</span></a>
    </div>
  );
}

function CentreHome({ openProject, onBack }) {
  const [deadline,setDeadline]=useState("");
  const milestones=useMemo(()=>plannedMilestones(deadline),[deadline]);
  return <main className="it-sba-page"><section className="it-sba-shell">
    <button type="button" className="it-practice-back it-sba-back" data-spark-action="nav" onClick={onBack}><BackArrowIcon/><span>Information Technology Practice</span></button>
    <header className="it-sba-hero"><div><div className="it-practice-eyebrow">CSEC Information Technology SBA Centre</div><h1>Read the full SBA. Then build it question by question.</h1><p>Each SPARK project now includes the full practice SBA as a PDF, a question-by-question guide and a completed watermarked PDF for every practical section.</p></div><div className="it-sba-hero-badge"><strong>5</strong><span>complete practice SBAs</span></div></header>
    <section className="it-sba-current-card"><div><div className="it-practice-label">How SPARK uses these projects</div><h2>The PDF gives you the assignment. The guide shows you how to answer it.</h2><p>Read the project PDF first so you understand the scenario and exact questions. Then open the guided project and work through each question in order. Your teacher's current assignment and marking instructions always take priority.</p></div><div className="it-sba-mark-grid">{IT_SBA_MARKS.map(item=><div key={item.label}><strong>{item.marks}</strong><span>{item.label}</span></div>)}</div><div className="it-sba-syllabus-note"><strong>Web page reminder</strong><p>SPARK keeps the current practice web task to one web page. Older school projects sometimes used several linked pages. Follow the assignment your teacher gives you.</p></div><div className="it-sba-limit-grid">{IT_SBA_CURRENT_LIMITS.map(item=><article key={item.id}><SbaIcon type={item.id} size={20}/><div><strong>{item.title}</strong><p>{item.text}</p></div></article>)}</div></section>
    <section className="it-sba-projects-section"><div className="it-sba-section-heading"><div><div className="it-practice-label">Full sample SBAs</div><h2>Choose a scenario and read the question paper before you start.</h2><p>The five projects use original SPARK wording and fictional data. Every completed document is watermarked as a reference example.</p></div></div><div className="it-sba-project-grid">{IT_SBA_PROJECTS.map(project=><article className="it-sba-project-card" key={project.id}><div className="it-sba-project-topline"><span>{project.code}</span><em>{project.level}</em></div><div className="it-sba-project-icon"><SbaIcon type="project" size={28}/></div><div className="it-practice-label">{project.sector}</div><h3>{project.title}</h3><p>{project.scenario}</p><div className="it-sba-project-focus">{project.accent}</div><div className="it-sba-card-actions"><button type="button" className="it-practice-primary" onClick={()=>openProject(project.id)}>Open guided project</button><a className="it-practice-secondary" href={projectPdf(project.id)} target="_blank" rel="noreferrer"><SbaIcon type="pdf" size={17}/><span>View full SBA</span></a></div></article>)}</div></section>
    <section className="it-sba-timeline-card"><div className="it-sba-timeline-copy"><SbaIcon type="calendar" size={28}/><div><div className="it-practice-label">SBA timeline planner</div><h2>Work backwards from your school deadline.</h2><p>Enter your target submission date and SPARK will suggest checkpoints. Your teacher's dates take priority.</p></div></div><label className="it-sba-date-field">Target submission date<input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)}/></label>{milestones.length>0&&<div className="it-sba-milestones">{milestones.map(item=><div key={item.label}><strong>{dateLabel(item.date)}</strong><span>{item.label}</span></div>)}</div>}</section>
    <section className="it-sba-integrity-card"><div className="it-sba-integrity-icon"><SbaIcon type="check" size={30}/></div><div><div className="it-practice-label">Reference examples only</div><h2>Study the completed work. Do your own assigned SBA.</h2><p>Every completed PDF carries a SPARK watermark. Do not submit, rename or reproduce the reference projects as your own work. Use them to understand what a complete answer looks like and how one section connects to the next.</p></div></section>
  </section></main>;
}

function ProjectOverview({ project, userId, onActivity, openHome, openComponent }) {
  const [progress,setProgress]=useState(()=>readProgress(userId,project.id));
  const completeCount=IT_SBA_COMPONENTS.filter(item=>progress[item.id]).length;
  useEffect(()=>setProgress(readProgress(userId,project.id)),[userId,project.id]);
  function resetProgress(){
    const reviewedIds=IT_SBA_COMPONENTS.filter(item=>progress[item.id]).map(item=>item.id);
    const next={};
    setProgress(next);
    writeProgress(userId,project.id,next);
    reviewedIds.forEach(componentId=>emitSbaReviewActivity(onActivity,project,componentId,false));
  }
  return <main className="it-sba-page"><section className="it-sba-shell">
    <button type="button" className="it-practice-back it-sba-back" data-spark-action="nav" onClick={openHome}><BackArrowIcon/><span>All SBA projects</span></button>
    <header className="it-sba-project-hero"><div><div className="it-practice-eyebrow">{project.code} - {project.sector}</div><h1>{project.title}</h1><p>{project.scenario}</p></div><div className="it-sba-progress-ring" aria-label={`${completeCount} of 5 sections reviewed`}><strong>{completeCount}/5</strong><span>sections reviewed</span></div></header>
    <section className="it-sba-pdf-feature"><div><div className="it-practice-label">Start here</div><h2>Read the full SBA question paper.</h2><p>This PDF contains the scenario and all questions in the order a student would receive them. Read it before opening the step-by-step guides.</p><PdfActions project={project}/></div><object className="it-sba-pdf-viewer" data={projectPdf(project.id)} type="application/pdf" aria-label={`${project.title} full SBA PDF`}><p>Your browser does not display PDFs inside the page. <a href={projectPdf(project.id)} target="_blank" rel="noreferrer">Open the full SBA PDF</a>.</p></object></section>
    <section className="it-sba-project-purpose"><div className="it-practice-label">Description of Project</div><h2>What you are building</h2><p>{project.purpose}</p></section>
    <section className="it-sba-component-grid">{IT_SBA_COMPONENTS.map((item,index)=>{const component=project.components[item.id];const done=Boolean(progress[item.id]);const count=getItSbaProjectTasks(project.id,item.id).length;return <article key={item.id} className={`it-sba-component-card ${done?"done":""}`}><div className="it-sba-component-head"><div className="it-sba-component-icon"><SbaIcon type={item.id}/></div><span>Section {index+1}</span><strong>{count} questions</strong></div><h2>{item.title}</h2><p>{component.produce}</p><div className="it-sba-card-actions"><button type="button" className={done?"it-practice-secondary":"it-practice-primary"} onClick={()=>openComponent(project.id,item.id)}>{done?"Review questions":"Start questions"}</button><a className="it-sba-text-link" href={completedPdf(project.id,item.id)} target="_blank" rel="noreferrer">View completed PDF</a></div></article>;})}</section>
    <section className="it-sba-download-card"><div><div className="it-practice-label">Completed SBA downloads</div><h2>Download the completed SPARK reference for each section.</h2><p>These are full section PDFs, not short answer sheets. Each one shows the exact questions being answered, the method used and the completed result. The SPARK watermark is placed throughout the document.</p></div><div className="it-sba-download-grid"><a href={projectPdf(project.id)} download><SbaIcon type="pdf"/><span><strong>Full SBA question paper</strong><small>PDF</small></span></a>{IT_SBA_COMPONENTS.map(item=><a key={item.id} href={completedPdf(project.id,item.id)} download><SbaIcon type={item.id}/><span><strong>Completed {item.title}</strong><small>Watermarked PDF</small></span></a>)}</div></section>
    <NativeFileDownloads project={project}/>
    <section className="it-sba-progress-actions"><span>Your review progress is saved to your SPARK progress and kept separately for your account on this device.</span>{completeCount>0&&<button type="button" className="it-practice-secondary" onClick={resetProgress}>Reset review progress</button>}</section>
  </section></main>;
}

function QuestionCard({ task, index }) {
  return <article className="it-sba-question-card"><div className="it-sba-question-number"><span>Question</span><strong>{index+1}</strong></div><div className="it-sba-question-body"><div className="it-sba-question-group">{task.group}</div><h3>{task.question}</h3><div className="it-sba-how"><h4>How to complete this question</h4><ol>{task.how.map(step=><li key={step}>{step}</li>)}</ol></div><div className="it-sba-answer"><h4>What the completed SPARK answer shows</h4><p>{task.answer}</p></div></div></article>;
}

function ComponentGuide({ project, componentId, userId, onActivity, openProject, openComponent }) {
  const component=findItSbaComponent(project,componentId);
  const componentIndex=IT_SBA_COMPONENTS.findIndex(item=>item.id===componentId);
  const meta=IT_SBA_COMPONENTS[componentIndex];
  const questions=getItSbaProjectTasks(project.id,componentId);
  const [progress,setProgress]=useState(()=>readProgress(userId,project.id));
  const done=Boolean(progress[componentId]);
  const nextMeta=IT_SBA_COMPONENTS[componentIndex+1]||null;
  if(!component||!meta)return null;
  function toggleReviewed(){
    const completed=!done;
    const next={...progress,[componentId]:completed};
    setProgress(next);
    writeProgress(userId,project.id,next);
    emitSbaReviewActivity(onActivity,project,componentId,completed);
  }
  const pdf=completedPdf(project.id,componentId);
  return <main className="it-sba-page"><section className="it-sba-shell">
    <button type="button" className="it-practice-back it-sba-back" data-spark-action="nav" onClick={()=>openProject(project.id)}><BackArrowIcon/><span>{project.title}</span></button>
    <header className="it-sba-component-hero"><div className="it-sba-component-icon large"><SbaIcon type={componentId} size={32}/></div><div><div className="it-practice-eyebrow">{project.code} - {questions.length} guided questions</div><h1>{meta.title}</h1><p>{component.produce}</p></div></header>
    <section className="it-sba-question-intro"><div className="it-practice-label">Question-by-question guide</div><h2>Know the exact question before you start clicking.</h2><p>Each card below repeats the practice-SBA question, tells you exactly how to approach it, then shows what the completed SPARK result contains. Keep the full SBA PDF open beside you while you work.</p><a className="it-practice-secondary" href={projectPdf(project.id)} target="_blank" rel="noreferrer"><SbaIcon type="pdf" size={18}/><span>View full SBA</span></a></section>
    <section className="it-sba-question-list">{questions.map((task,index)=><QuestionCard key={task.id} task={task} index={index}/>)}</section>
    <section className="it-sba-section-pdf"><div><div className="it-practice-label">Completed {meta.title} SBA</div><h2>Read the completed section exactly as a reference submission.</h2><p>The PDF answers every question above and includes the completed structures, formulas, layouts, trace data or code needed for this fictional project. The watermark is repeated on every page.</p><PdfActions project={project} componentId={componentId}/></div><object className="it-sba-pdf-viewer section" data={pdf} type="application/pdf" aria-label={`${project.title} ${meta.title} completed PDF`}><p>Your browser does not display PDFs inside the page. <a href={pdf} target="_blank" rel="noreferrer">Open the completed section PDF</a>.</p></object></section>
    <NativeFileDownloads project={project} componentId={componentId} compact/>
    <section className="it-sba-component-actions"><button type="button" className={done?"it-practice-secondary":"it-practice-primary"} onClick={toggleReviewed}><SbaIcon type="check" size={18}/><span>{done?"Marked as reviewed":"Mark section as reviewed"}</span></button>{nextMeta?<button type="button" className="it-practice-primary" onClick={()=>openComponent(project.id,nextMeta.id)}>Next: {nextMeta.title}</button>:<button type="button" className="it-practice-primary" onClick={()=>openProject(project.id)}>Return to project overview</button>}</section>
  </section></main>;
}

export default function InformationTechnologySbaCentre({ userId, onActivity, onBack }) {
  const { page,projectId,componentId,openHome,openProject,openComponent }=useInformationTechnologySbaRoute(true);
  const project=findItSbaProject(projectId);
  useLayoutEffect(()=>{window.scrollTo({top:0,left:0,behavior:"auto"});},[page,projectId,componentId]);
  if(page==="project"&&project)return <ProjectOverview project={project} userId={userId} onActivity={onActivity} openHome={openHome} openComponent={openComponent}/>;
  if(page==="component"&&project&&findItSbaComponent(project,componentId))return <ComponentGuide project={project} componentId={componentId} userId={userId} onActivity={onActivity} openProject={openProject} openComponent={openComponent}/>;
  return <CentreHome openProject={openProject} onBack={onBack}/>;
}