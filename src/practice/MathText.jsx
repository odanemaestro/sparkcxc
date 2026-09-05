import React from "react";
import "./mathText.css";

const TOKEN_OPEN = "\uE000";
const TOKEN_CLOSE = "\uE001";

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[ch]));
}

function createTokenStore() {
  const values = [];
  const put = html => `${TOKEN_OPEN}${values.push(html) - 1}${TOKEN_CLOSE}`;
  const restore = value => {
    let output = value;
    const pattern = new RegExp(`${TOKEN_OPEN}(\\d+)${TOKEN_CLOSE}`, "g");
    for (let pass = 0; pass < 12 && output.includes(TOKEN_OPEN); pass += 1) {
      output = output.replace(pattern, (_, index) => values[Number(index)] ?? "");
    }
    return output;
  };
  return { put, restore };
}

function findMatching(text, start, openChar, closeChar) {
  let depth = 0;
  for (let i = start; i < text.length; i += 1) {
    if (text[i] === openChar) depth += 1;
    else if (text[i] === closeChar) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function formatRoots(text, store, formatInner) {
  let output = "";
  let index = 0;

  while (index < text.length) {
    const rootIndex = text.indexOf("√", index);
    if (rootIndex < 0) {
      output += text.slice(index);
      break;
    }

    output += text.slice(index, rootIndex);
    const next = text[rootIndex + 1];

    if (next === "(" || next === "[") {
      const closeChar = next === "(" ? ")" : "]";
      const end = findMatching(text, rootIndex + 1, next, closeChar);
      if (end > rootIndex + 2) {
        const inner = text.slice(rootIndex + 2, end);
        const formatted = formatInner(inner);
        output += store.put(
          `<span class="math-root"><span class="math-root-symbol">√</span><span class="math-radicand">${formatted}</span></span>`
        );
        index = end + 1;
        continue;
      }
    }

    const bare = text.slice(rootIndex + 1).match(/^([A-Za-z0-9πθ₀-₉²³⁴⁵⁶⁷⁸⁹⁻+.]+)/);
    if (bare) {
      output += store.put(
        `<span class="math-root"><span class="math-root-symbol">√</span><span class="math-radicand">${bare[1]}</span></span>`
      );
      index = rootIndex + 1 + bare[1].length;
      continue;
    }

    output += "√";
    index = rootIndex + 1;
  }

  return output;
}

function formatMatrices(text, store) {
  const matrixPattern = /\[((?:\[[^\]]*\],?)+)\]/g;
  const rowPattern = /\[([^\]]*)\]/g;

  return text.replace(matrixPattern, (match, inner) => {
    const rowMatches = [...inner.matchAll(rowPattern)];
    const rows = rowMatches.map(row => row[1].split(",").map(value => value.trim()));
    if (!rows.length || rows.some(row => !row.length || row.some(value => value === ""))) return match;

    const columns = Math.max(...rows.map(row => row.length));
    const cells = rows
      .map(row => row.map(value => `<span class="mcell">${value}</span>`).join(""))
      .join("");

    return store.put(
      `<span class="matrix"><span class="mbrk mbrk-l"></span><span class="mgrid" style="grid-template-columns:repeat(${columns},minmax(1.3em,auto))">${cells}</span><span class="mbrk mbrk-r"></span></span>`
    );
  });
}

function formatVectors(text, store) {
  return text.replace(/\\vec\{([A-Za-z0-9']+)\}/g, (_, vector) =>
    store.put(`<span class="vec">${vector}</span>`)
  );
}

function formatPowersAndSubscripts(text, store) {
  let output = text;

  output = output.replace(
    /((?:\([^()\n]{1,60}\)|[A-Za-z0-9πθ₀-₉)\]]+))\^(-?\d+(?:\.\d+)?|\([^()\n]+\)|[A-Za-z]+)/g,
    (_, base, exponent) => {
      const clean = exponent.startsWith("(") && exponent.endsWith(")") ? exponent.slice(1, -1) : exponent;
      return `${base}${store.put(`<sup>${clean}</sup>`)}`;
    }
  );

  output = output.replace(
    /([A-Za-z])_\{?([A-Za-z0-9+-]+)\}?/g,
    (_, base, subscript) => `${base}${store.put(`<sub>${subscript}</sub>`)}`
  );

  return output;
}

function formatFractions(text, store, formatInner) {
  let output = text;
  const fraction = (numerator, denominator) => store.put(
    `<span class="frac"><span class="fnum">${formatInner(numerator)}</span><span class="fden">${formatInner(denominator)}</span></span>`
  );

  // Parenthesised algebraic numerator and denominator.
  output = output.replace(
    /\(([^()\n]{1,90})\)\s*\/\s*\(([^()\n]{1,90})\)/g,
    (_, numerator, denominator) => fraction(numerator, denominator)
  );

  // Parenthesised expression over a simple atom, e.g. (x + 1)/2.
  output = output.replace(
    /\(([^()\n]{1,90})\)\s*\/\s*([A-Za-z0-9πθ₀-₉²³⁴⁵⁶⁷⁸⁹⁻.]+)/g,
    (_, numerator, denominator) => fraction(numerator, denominator)
  );

  // Simple atom over a parenthesised expression.
  output = output.replace(
    /([−-]?[A-Za-z0-9πθ₀-₉²³⁴⁵⁶⁷⁸⁹⁻.]+)\s*\/\s*\(([^()\n]{1,90})\)/g,
    (_, numerator, denominator) => fraction(numerator, denominator)
  );

  // Trigonometric denominators used in the sine rule, e.g. a/sin A.
  output = output.replace(
    /([−-]?[A-Za-z0-9πθ₀-₉²³⁴⁵⁶⁷⁸⁹⁻.]+)\s*\/\s*((?:sin|cos|tan)\s+[A-Za-zθ][A-Za-z0-9θ₀-₉]*)/gi,
    (_, numerator, denominator) => fraction(numerator, denominator)
  );

  // Ordinary numeric/algebraic fractions such as 3/4, k/x, −1/m, 2x/3.
  output = output.replace(
    /(^|[\s=+−\-×÷,(])([−-]?(?:\d+(?:\.\d+)?[A-Za-z]?|[A-Za-z][A-Za-z0-9₀-₉]*))\s*\/\s*((?:\d+(?:\.\d+)?[A-Za-z]?|[A-Za-z][A-Za-z0-9₀-₉]*))(?=$|[\s,.;:)=+−\-×÷])/g,
    (_, prefix, numerator, denominator) => `${prefix}${fraction(numerator, denominator)}`
  );

  return output;
}

function formatCore(escaped, store) {
  const formatInner = inner => formatCore(inner, store);

  let output = escaped
    .replace(/\bsqrt\s*\(/gi, "√(")
    .replace(/<=/g, "≤")
    .replace(/>=/g, "≥")
    .replace(/!=/g, "≠")
    .replace(/\s+\*\s+/g, " × ");

  output = formatMatrices(output, store);
  output = formatVectors(output, store);
  output = formatRoots(output, store, formatInner);
  output = formatFractions(output, store, formatInner);
  output = formatPowersAndSubscripts(output, store);

  return output;
}

export function formatMathHtml(value) {
  const store = createTokenStore();
  // Normalize ASCII comparison shortcuts before escaping. If "<" is escaped
  // first, "<=" becomes "&lt;=" and the operator replacement never sees it.
  const normalized = String(value ?? "")
    .replace(/<=/g, "≤")
    .replace(/>=/g, "≥")
    .replace(/!=/g, "≠");
  const escaped = escapeHtml(normalized);
  const formatted = formatCore(escaped, store);
  return store.restore(formatted);
}

export default function MathText({
  children,
  className = "",
  as: Tag = "span",
  prose = false,
  ...props
}) {
  const classes = ["spark-math", prose ? "spark-math-prose" : "", className].filter(Boolean).join(" ");
  return (
    <Tag
      {...props}
      className={classes}
      dangerouslySetInnerHTML={{ __html: formatMathHtml(children) }}
    />
  );
}
