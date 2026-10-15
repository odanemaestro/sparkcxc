export const DEFAULT_WEB_FILES = Object.freeze({
  "index.html": '<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><title>Technology Club</title></head>\n<body>\n  <h1>Technology Club</h1>\n  <p>Welcome to our club.</p>\n</body>\n</html>',
  "styles.css": "body { font-family: system-ui, sans-serif; padding: 2rem; color: #17365b; }\nh1 { font-size: 2rem; }",
});
export function validateWebFiles(files) {
  const errors = [];
  if (!files || typeof files !== "object" || Array.isArray(files)) return ["Invalid file collection."];
  const keys = Object.keys(files);
  if (!keys.includes("index.html") || !keys.includes("styles.css")) errors.push("index.html and styles.css are required.");
  if (keys.length > 10) errors.push("The workspace supports a maximum of ten files.");
  for (const [name, source] of Object.entries(files)) {
    if (!/^[a-zA-Z0-9_-]+\.(html|css)$/.test(name)) errors.push(`Invalid filename: ${name}`);
    if (typeof source !== "string" || source.length > 100000) errors.push(`Invalid source size for ${name}`);
  }
  return errors;
}
export function buildSandboxPreview(files) {
  const errors = validateWebFiles(files);
  if (errors.length) return { html: "", errors };
  const html = files["index.html"];
  const css = files["styles.css"];
  const blocked = /<\s*(script|iframe|object|embed|base|form|meta\s+http-equiv)\b|\bon\w+\s*=|javascript\s*:/i;
  if (blocked.test(html) || blocked.test(css)) return { html: "", errors: ["Active content is blocked in teaching previews."] };
  const encodedCss = css.replace(/<\//g, "<\\/");
  return { html: `<!doctype html><html><head><meta charset="utf-8"><style>${encodedCss}</style></head><body>${html}</body></html>`, errors: [] };
}
