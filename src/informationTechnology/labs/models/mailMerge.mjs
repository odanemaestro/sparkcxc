export function parseMergeRecipients(csv) {
  const lines = String(csv ?? "").trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headings = lines[0].split(",").map(value => value.trim());
  if (!headings.includes("ParentName")) return [];
  return lines.slice(1, 51).map(line => {
    const fields = line.split(",").map(value => value.trim());
    return Object.fromEntries(headings.map((heading, index) => [heading, fields[index] || ""]));
  }).filter(record => record.ParentName);
}
export function mergeLetter(template, recipient) {
  return String(template ?? "").replace(/«([A-Za-z][A-Za-z0-9]*)»/g, (_, key) => String(recipient?.[key] ?? ""));
}
