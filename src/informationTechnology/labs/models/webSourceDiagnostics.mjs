export function inspectWebSource(files) {
  const issues = [];
  const html = String(files?.["index.html"] || "");
  const css = String(files?.["styles.css"] || "");
  const add = (file, severity, message) => issues.push({ file, severity, message });
  if (!/<!doctype\s+html\s*>/i.test(html)) add("index.html", "warning", "Add an HTML5 doctype.");
  if (!/<html\b[^>]*\blang\s*=\s*["'][^"']+["']/i.test(html)) add("index.html", "warning", "Set a language on the html element.");
  if (!/<title\b[^>]*>\s*[^<\s]/i.test(html)) add("index.html", "warning", "Add a meaningful page title.");
  if (!/<h1\b/i.test(html)) add("index.html", "warning", "Add a main heading.");
  if (/<img\b(?![^>]*\balt\s*=)/i.test(html)) add("index.html", "warning", "Images need alt text.");
  if (/<\s*(script|iframe|object|embed)\b|\bon[a-z]+\s*=|javascript\s*:/i.test(html)) add("index.html", "error", "Active content is unavailable in the safe preview.");
  if (/\@import\b|url\s*\(/i.test(css)) add("styles.css", "warning", "External CSS resources are not loaded by the isolated preview.");
  let depth = 0;
  for (const char of css) { if (char === "{") depth++; if (char === "}") depth--; if (depth < 0) break; }
  if (depth !== 0) add("styles.css", "error", "Check unmatched CSS braces.");
  return issues;
}
