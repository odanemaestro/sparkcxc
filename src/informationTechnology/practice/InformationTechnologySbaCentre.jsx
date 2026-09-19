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
header{ba