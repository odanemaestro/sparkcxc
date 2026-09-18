import React from "react";

export default function InformationTechnologyQuestionVisual({ visual }) {
  if (!visual) return null;

  if (visual.type === "table" || visual.type === "trace") {
    return (
      <figure className="it-p1-visual">
        <figcaption>{visual.caption || (visual.type === "trace" ? "Trace table" : "Table")}</figcaption>
        <div className="it-p1-table-wrap">
          <table>
            <thead><tr>{visual.columns.map(col => <th key={col}>{col}</th>)}</tr></thead>
            <tbody>
              {visual.rows.map((row, r) => (
                <tr key={r}>{row.map((cell, c) => <td key={c}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </figure>
    );
  }

  if (visual.type === "spreadsheet") {
    const cols = visual.columns || [];
    return (
      <figure className="it-p1-visual">
        <figcaption>Worksheet extract</figcaption>
        <div className="it-p1-sheet" style={{ gridTemplateColumns: `42px repeat(${cols.length}, minmax(90px, 1fr))` }}>
          <div className="corner"></div>
          {cols.map(col => <div className="head" key={col}>{col}</div>)}
          {visual.rows.map((row, r) => (
            <React.Fragment key={r}>
              <div className="head">{r + 1}</div>
              {row.map((cell, c) => (
                <div key={c} className={String(cell).startsWith("=") ? "formula" : ""}>{cell}</div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </figure>
    );
  }

  if (visual.type === "flow") {
    return (
      <figure className="it-p1-visual">
        <figcaption>{visual.caption || "Process diagram"}</figcaption>
        <div className="it-p1-flow">
          {visual.nodes.map((node, index) => (
            <React.Fragment key={`${node}-${index}`}>
              <div>
                <strong>{node}</strong>
                {visual.subLabels?.[index] && <span>{visual.subLabels[index]}</span>}
              </div>
              {index < visual.nodes.length - 1 && <b aria-hidden="true">→</b>}
            </React.Fragment>
          ))}
        </div>
      </figure>
    );
  }

  if (visual.type === "network") {
    return (
      <figure className="it-p1-visual">
        <figcaption>{visual.caption || "Network diagram"}</figcaption>
        <div className="it-p1-network">
          {visual.nodes.map(([name, kind], index) => (
            <div key={`${name}-${index}`}>
              <span className="node">{name}<small>{kind}</small></span>
              {index < visual.nodes.length - 1 && <b>↔</b>}
            </div>
          ))}
        </div>
      </figure>
    );
  }

  if (visual.type === "document") {
    return (
      <figure className="it-p1-visual">
        <figcaption>{visual.title}</figcaption>
        <div className="it-p1-document">{visual.lines.map((line, index) => <div key={index}>{line}</div>)}</div>
      </figure>
    );
  }

  if (visual.type === "diagram") {
    return (
      <figure className="it-p1-visual">
        <figcaption>{visual.title}</figcaption>
        <div className="it-p1-diagram">{visual.items.map((item, index) => <div key={index}>{item}</div>)}</div>
      </figure>
    );
  }

  if (visual.type === "formula") {
    return (
      <figure className="it-p1-visual">
        <figcaption>Given information</figcaption>
        <div className="it-p1-formula">{visual.lines.map((line, index) => <code key={index}>{line}</code>)}</div>
      </figure>
    );
  }

  if (visual.type === "form") {
    return (
      <figure className="it-p1-visual">
        <figcaption>Electronic form</figcaption>
        <div className="it-p1-form">
          {visual.fields.map(([label, value]) => <div key={label}><strong>{label}</strong><span>{value}</span></div>)}
        </div>
      </figure>
    );
  }

  if (visual.type === "website") {
    return (
      <figure className="it-p1-visual">
        <figcaption>Website test</figcaption>
        <div className="it-p1-website">
          {visual.pages.map(([page, state]) => (
            <div key={page}>
              <strong>{page}</strong>
              <span className={state.toLowerCase().includes("broken") ? "bad" : "ok"}>{state}</span>
            </div>
          ))}
        </div>
      </figure>
    );
  }

  if (visual.type === "chart") {
    const max = Math.max(...visual.values, 1);
    return (
      <figure className="it-p1-visual">
        <figcaption>{visual.caption}</figcaption>
        <div className="it-p1-chart">
          {visual.values.map((value, index) => (
            <div key={visual.labels[index]}>
              <span style={{ height: `${Math.max(8, (value / max) * 100)}%` }}></span>
              <small>{visual.labels[index]}</small>
            </div>
          ))}
        </div>
      </figure>
    );
  }

  if (visual.type === "database") {
    return (
      <figure className="it-p1-visual">
        <figcaption>{visual.relationship || "Database structure"}</figcaption>
        <div className="it-p1-db">
          {visual.tables.map(table => (
            <div key={table.name}>
              <strong>{table.name}</strong>
              {table.fields.map(([field, type]) => <span key={field}>{field}<small>{type}</small></span>)}
            </div>
          ))}
        </div>
      </figure>
    );
  }

  if (visual.type === "code") {
    return (
      <figure className="it-p1-visual">
        <figcaption>Code / pseudocode</figcaption>
        <pre className="it-p1-code">{visual.lines.join("\n")}</pre>
      </figure>
    );
  }

  if (visual.type === "codeCompare") {
    return (
      <figure className="it-p1-visual">
        <figcaption>Compare the two versions</figcaption>
        <div className="it-p1-code-compare">
          <div><strong>{visual.leftTitle}</strong><pre>{visual.left.join("\n")}</pre></div>
          <div><strong>{visual.rightTitle}</strong><pre>{visual.right.join("\n")}</pre></div>
        </div>
      </figure>
    );
  }

  return null;
}
