import React from "react";

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[ch]));
}

function applyMath(escaped) {
  return escaped.replace(
    /\\vec\{([A-Za-z0-9']+)\}|√\(([^()]+)\)|√(\d+(?:\.\d+)?)|([A-Za-z0-9)\]])\^(-?\d+(?:\.\d+)?|\([^()]+\))|([-−]?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)/g,
    (match, vector, rootParen, rootBare, expBase, expValue, fractionNumerator, fractionDenominator) => {
      if (vector !== undefined) return `<span class="vec">${vector}</span>`;
      if (rootParen !== undefined) return `√<span class="rtc">${applyMath(rootParen)}</span>`;
      if (rootBare !== undefined) return `√<span class="rtc">${rootBare}</span>`;
      if (expBase !== undefined) {
        let value = expValue;
        if (value[0] === "(" && value[value.length - 1] === ")") value = value.slice(1, -1);
        return `${expBase}<sup>${applyMath(value)}</sup>`;
      }
      if (fractionNumerator !== undefined) {
        return `<span class="frac"><span class="fnum">${fractionNumerator}</span><span class="fden">${fractionDenominator}</span></span>`;
      }
      return match;
    }
  );
}

const MATRIX_PATTERN = new RegExp("\\[((?:\\[[^\\[\\]]*\\],?)+)\\]", "g");
const MATRIX_ROW_PATTERN = new RegExp("\\[([^\\[\\]]*)\\]", "g");

function formatMatrices(escaped) {
  return escaped.replace(MATRIX_PATTERN, (match, inner) => {
    const rowMatches = [...inner.matchAll(MATRIX_ROW_PATTERN)];
    const rows = rowMatches.map(row => row[1].split(",").map(x => x.trim()));
    if (!rows.length || rows.some(row => !row.length || row.some(value => value === ""))) return match;
    const columns = Math.max(...rows.map(row => row.length));
    const cells = rows.map(row => row.map(value => `<span class="mcell">${value}</span>`).join("")).join("");
    return `<span class="matrix"><span class="mbrk mbrk-l"></span><span class="mgrid" style="grid-template-columns:repeat(${columns},minmax(1.3em,auto))">${cells}</span><span class="mbrk mbrk-r"></span></span>`;
  });
}

export function formatMathHtml(value) {
  const normalized = String(value ?? "")
    .replace(/\bsqrt\(([^()]+)\)/gi, "√($1)")
    .replace(/\s+\*\s+/g, " × ");
  return applyMath(formatMatrices(escapeHtml(normalized)));
}

export default function MathText({ children, className = "", as: Tag = "span" }) {
  return <Tag className={`spark-math ${className}`.trim()} dangerouslySetInnerHTML={{ __html: formatMathHtml(children) }} />;
}
