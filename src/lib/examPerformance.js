export function getExamPerformanceStatus(percent) {
  const numeric = Number(percent);
  const value = Number.isFinite(numeric) ? Math.max(0, Math.min(100, numeric)) : 0;

  if (value < 40) return { key: "needs-attention", label: "Needs attention" };
  if (value < 60) return { key: "developing", label: "Developing" };
  if (value < 80) return { key: "satisfactory", label: "Satisfactory" };
  return { key: "strong", label: "Strong" };
}
