// Parse one complete monetary or numeric response, never a number buried in prose.
export function parseAccountingNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string" || value.length > 100) return null;
  let text = value.trim(), negative = false;
  if (/^\([^()]+\)$/.test(text)) { negative = true; text = text.slice(1, -1).trim(); }
  text = text.replace(/^(?:J\$|US\$|EC\$|TT\$|BDS\$|\$)\s*/i, "");
  if (!/^[+-]?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(text) || (negative && /^[+-]/.test(text))) return null;
  const result = Number(text.replaceAll(",", "")) * (negative ? -1 : 1);
  return Number.isFinite(result) ? result : null;
}
