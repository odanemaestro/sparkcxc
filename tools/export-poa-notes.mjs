import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
const output = process.argv[2];
if (!output) throw new Error("Pass an output directory.");
fs.mkdirSync(output, { recursive: true });
const bundle = await build({
  stdin: {
    contents: 'export * from "./src/principlesOfAccounts/data/poaCourse.js";',
    resolveDir: process.cwd(),
  },
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
});
const { POA_TOPICS, POA_SECTIONS, POA_SYLLABUS_URL, POA_COVERAGE } =
  await import(
    "data:text/javascript;base64," +
      Buffer.from(bundle.outputFiles[0].text).toString("base64")
  );
const escape = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const sectionHtml = POA_SECTIONS.map(
  (section) =>
    `<section id="${section.id}" class="section"><p class="kicker">CSEC PRINCIPLES OF ACCOUNTS</p><h2>${escape(section.title)}</h2>${POA_TOPICS.filter(
      (t) => t.sectionId === section.id,
    )
      .map((t) => {
        const l = t.metadata.lesson;
        return `<article id="${t.id}"><p class="codes">${t.metadata.syllabus.objectiveCodes.join(" · ")}</p><h3>${escape(t.title)}</h3><p>${escape(l.introduction)}</p>${l.sections.map((b) => `<div class="${b.title === "Worked example" ? "example" : b.title === "Common mistake" ? "mistake" : ""}"><h4>${escape(b.title)}</h4>${b.paragraphs.map((p) => `<p>${escape(p)}</p>`).join("")}</div>`).join("")}<details><summary>Check your understanding: ${escape(l.check.question)}</summary><p>${escape(l.check.answer)}</p></details></article>`;
      })
      .join("")}</section>`,
).join("");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SPARK — Principles of Accounts study notes</title><style>:root{color-scheme:light dark;--ink:#183248;--paper:#fff;--back:#f3f7f8;--line:#d5e1e7;--accent:#126d75}*{box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:Inter,system-ui,-apple-system,sans-serif;background:var(--back);color:var(--ink);margin:0;line-height:1.8}.wrap{display:grid;grid-template-columns:260px minmax(0,800px);max-width:1160px;margin:auto;gap:44px;padding:40px 24px}aside{position:sticky;top:28px;align-self:start;font-size:.85rem}aside a{display:block;padding:6px 0;color:inherit;text-decoration:none}aside a:hover{text-decoration:underline}main{min-width:0}.hero{padding:24px 0 44px;border-bottom:1px solid var(--line)}h1{font-size:clamp(2.2rem,5vw,3.6rem);line-height:1.12;letter-spacing:-.035em;max-width:16ch}h2{font-size:1.8rem;line-height:1.3;letter-spacing:-.02em}h3{font-size:1.4rem;line-height:1.35;letter-spacing:-.015em}h4{font-size:1rem;margin:20px 0 8px}p{margin:10px 0 18px;max-width:74ch}a{color:var(--accent)}.kicker,.codes{font-size:.75rem;font-weight:750;letter-spacing:.04em;color:var(--accent)}.section{padding-top:36px;scroll-margin-top:24px}article{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:clamp(20px,4vw,34px);margin:22px 0;scroll-margin-top:24px}.example,.mistake{padding:4px 0 4px 18px;border-left:3px solid var(--accent);margin-top:24px}.mistake{border-left-color:#bd8159}details{border-top:1px solid var(--line);padding-top:16px;margin-top:20px}summary{font-weight:650;cursor:pointer}summary:focus-visible,a:focus-visible{outline:3px solid var(--accent);outline-offset:4px}.note{font-size:.85rem}footer{border-top:1px solid var(--line);padding-top:24px;font-size:.85rem}@media(max-width:800px){.wrap{grid-template-columns:1fr;padding:22px 16px;gap:10px}aside{position:static;border-bottom:1px solid var(--line);padding-bottom:20px}aside a{display:inline-block;margin-right:14px}h1{max-width:18ch}.hero{padding-top:4px}}@media(prefers-color-scheme:dark){:root{--ink:#e9f1f8;--paper:#14263a;--back:#0c1929;--line:#34475b;--accent:#77c9c7}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}@media print{.wrap{display:block;max-width:none;padding:0}aside{display:none}body{background:white;color:black;font-size:11pt}article{border:0;border-radius:0;padding:0;margin:24px 0}.section{break-before:page}h2,h3,h4{break-after:avoid}details{display:block}details>p{display:block}a{color:inherit}}</style></head><body><div class="wrap"><aside aria-label="Course contents"><strong>SPARK · Study notes</strong>${POA_SECTIONS.map((s) => `<a href="#${s.id}">${escape(s.title)}</a>`).join("")}</aside><main><header class="hero"><p class="kicker">LEARN · UNDERSTAND · PRACTISE</p><h1>Principles of Accounts</h1><p>Clear explanations, worked examples and common mistakes across all 11 sections of CXC 10/G/SYLL 17.</p><p class="note">33 lessons · 106 mapped objectives · Original SPARK teaching material. Amounts are illustrative dollars unless an exercise specifies a currency. Payroll examples use supplied exercise deductions.</p><a href="${POA_SYLLABUS_URL}">Official syllabus reference</a></header>${sectionHtml}<footer><p>These notes support study of the supplied 2017 syllabus, effective for examinations from May/June 2019. Historical papers can use earlier formats. Check the syllabus applicable to your examination sitting.</p><p>The SPARK course also includes accounting tools and original examination practice. Historical PDFs are retained as sources; they are not represented as automatically scored papers.</p></footer></main></div></body></html>`;
fs.writeFileSync(
  path.join(output, "Principles-of-Accounts-Study-Notes.html"),
  html,
);
const md = [
  "# SPARK — Principles of Accounts study notes",
  "",
  `Syllabus: CXC 10/G/SYLL 17. Official reference: ${POA_SYLLABUS_URL}`,
  "",
  "33 lessons and 106 mapped objectives. Original SPARK teaching notes. Exercise amounts are illustrative.",
  ...POA_SECTIONS.flatMap((section) => [
    "",
    `## ${section.title}`,
    ...POA_TOPICS.filter((t) => t.sectionId === section.id).flatMap((t) => {
      const l = t.metadata.lesson;
      return [
        "",
        `### ${t.title}`,
        t.metadata.syllabus.objectiveCodes.join(", "),
        "",
        l.introduction,
        ...l.sections.flatMap((s) => [
          "",
          `#### ${s.title}`,
          ...s.paragraphs.flatMap((p) => ["", p]),
        ]),
        "",
        "#### Key points",
        ...l.keyPoints.map((point) => `- ${point}`),
        "",
        `**Summary:** ${l.summary}`,
        "",
        `**Check:** ${l.check.question}`,
        "",
        `**Answer:** ${l.check.answer}`,
      ];
    }),
  ]),
].join("\n");
fs.writeFileSync(
  path.join(output, "Principles-of-Accounts-Study-Notes.md"),
  md,
);
fs.writeFileSync(
  path.join(output, "Principles-of-Accounts-Coverage.json"),
  JSON.stringify(POA_COVERAGE, null, 2),
);
console.log(
  "Exported study notes:",
  md.split(/\s+/).length,
  "words; 33 lessons; 106 objective mappings.",
);
