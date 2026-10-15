const ALLOWED_TYPES = new Set(["whole", "decimal", "list"]);

export function validateCellInput(value, rule) {
  if (!rule) return { valid: true, message: "" };
  const raw = String(value ?? "").trim();
  if (raw.startsWith("=")) return { valid: true, message: "" };
  if (raw === "") return { valid: !rule.required, message: rule.required ? "A value is required." : "" };
  if (!ALLOWED_TYPES.has(rule.type)) return { valid: false, message: "Unknown validation rule." };
  if (rule.type === "list") {
    const allowed = Array.isArray(rule.values) ? rule.values : [];
    return allowed.includes(raw)
      ? { valid: true, message: "" }
      : { valid: false, message: `Choose one of: ${allowed.join(", ")}.` };
  }
  const numeric = Number(raw);
  if (!Number.isFinite(numeric)) return { valid: false, message: "Enter a number." };
  if (rule.type === "whole" && !Number.isInteger(numeric)) return { valid: false, message: "Enter a whole number." };
  if (rule.min !== undefined && numeric < rule.min) return { valid: false, message: `Enter a value of at least ${rule.min}.` };
  if (rule.max !== undefined && numeric > rule.max) return { valid: false, message: `Enter a value no greater than ${rule.max}.` };
  return { valid: true, message: "" };
}

export function ruleDescription(rule) {
  if (!rule) return "Any value";
  if (rule.type === "list") return `List: ${(rule.values || []).join(", ")}`;
  const type = rule.type === "whole" ? "Whole number" : "Decimal number";
  const bounds = [rule.min !== undefined ? `minimum ${rule.min}` : "", rule.max !== undefined ? `maximum ${rule.max}` : ""].filter(Boolean).join(", ");
  return bounds ? `${type} (${bounds})` : type;
}
