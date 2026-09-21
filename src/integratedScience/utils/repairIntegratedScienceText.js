const MOJIBAKE_REPLACEMENTS = [
  ["Ã—","×"],
  ["Â²","²"],
  ["Â³","³"],
  ["Â°","°"],
  ["Âµ","µ"],
  ["âˆ’","−"],
  ["â‰¤","≤"],
  ["â‰¥","≥"],
  ["â‰ˆ","≈"],
  ["â†’","→"],
  ["â†","←"],
  ["â€¦","…"],
  ["â€™","’"],
  ["â€œ","“"],
  ["â€","”"],
  ["â€“","–"],
  ["â€”","—"],
  ["Â "," "],
];

export function repairIntegratedScienceText(value = "") {
  let text = String(value ?? "");
  for (const [broken,correct] of MOJIBAKE_REPLACEMENTS) {
    text = text.split(broken).join(correct);
  }
  return text;
}

export function repairIntegratedScienceValue(value) {
  if (typeof value === "string") return repairIntegratedScienceText(value);
  if (Array.isArray(value)) return value.map(repairIntegratedScienceValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key,item]) => [key,repairIntegratedScienceValue(item)])
    );
  }
  return value;
}
