import { evaluateCell } from "./workbookModel.mjs";

/**
 * Evaluate every populated formula and expose errors without altering the workbook.
 * Results are deterministic and suitable for the spreadsheet teaching interface.
 */
export function auditWorkbook(workbook) {
  const issues = [];
  let formulaCount = 0;
  for (const [sheet, cells] of Object.entries(workbook || {})) {
    if (!cells || typeof cells !== "object" || Array.isArray(cells)) continue;
    for (const [address, raw] of Object.entries(cells)) {
      if (typeof raw !== "string" || !raw.startsWith("=")) continue;
      formulaCount += 1;
      const result = evaluateCell(workbook, sheet, address);
      if (result.error) {
        issues.push({
          sheet,
          address,
          cell: `${sheet}!${address}`,
          code: String(result.value),
          message: result.error,
        });
      }
    }
  }
  return { formulaCount, issues };
}
