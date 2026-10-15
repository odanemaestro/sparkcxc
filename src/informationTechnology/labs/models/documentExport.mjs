export function escapeDocumentHtml(input) {
  return String(input ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export function buildDocumentHtml(documentData) {
  const { title = "SPARK Document", body = "", header = "", footer = "", orientation = "portrait", columns = 1, table = false, bullets = false, mergeField = false } = documentData || {};
  const safeColumns = columns === 2 ? 2 : 1;
  const safeOrientation = orientation === "landscape" ? "landscape" : "portrait";
  const paragraphs = String(body).split(/\n+/).filter(Boolean).map(value => `<p>${escapeDocumentHtml(value)}</p>`).join("\n");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${escapeDocumentHtml(title)}</title>
<style>@page{size:A4 ${safeOrientation};margin:20mm}body{font-family:Arial,sans-serif;color:#17263b;line-height:1.5}main{column-count:${safeColumns};column-gap:2rem}header,footer{font-size:.85rem;color:#44556a}table{border-collapse:collapse;width:100%}th,td{border:1px solid #758092;padding:8px;text-align:left}h1{break-after:avoid}</style></head>
<body><header>${escapeDocumentHtml(header)}</header><h1>${escapeDocumentHtml(title)}</h1>
${mergeField ? "<p>Dear &laquo;ParentName&raquo;,</p>" : ""}
<main>${paragraphs || "<p></p>"}</main>
${bullets ? "<ul><li>Coding club</li><li>Robotics club</li><li>Digital design club</li></ul>" : ""}
${table ? "<table><thead><tr><th>Activity</th><th>Day</th><th>Time</th></tr></thead><tbody><tr><td>Coding</td><td>Tuesday</td><td>3:30 pm</td></tr><tr><td>Robotics</td><td>Thursday</td><td>3:30 pm</td></tr></tbody></table>" : ""}
<footer>${escapeDocumentHtml(footer)}</footer></body></html>`;
}
