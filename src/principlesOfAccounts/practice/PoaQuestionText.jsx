import React from "react";

export default function PoaQuestionText({ question, response, onChange, disabled }) {
  return <div className="poa-printed-question">
    {(question.blocks || []).map((block, index) => {
      const account = block.variant === "t-account" || /^(?:Cash|Insurance) Account$/.test(block.caption);
      const divider = block.accountDivider || block.columns?.length / 2;
      if (block.type === "table") return <div className="poa-printed-table-scroll" key={index}><table data-account={account || undefined}>
        {(block.caption || block.headingFields) && <caption>{block.headingFields && onChange ? <div className="poa-account-heading">{block.headingFields.map((field) => {
          const id = `${block.answerId}:heading:${field.id}`;
          return <label key={field.id}>{field.label}<input disabled={disabled} aria-label={`${block.answerId}, ${field.label}`} value={response?.cells?.[id] || ""} onChange={(e) => onChange({ ...response, cells: { ...response?.cells, [id]: e.target.value } })}/></label>;
        })}</div> : block.caption?.split(" — ").map((line, i) => <span key={i}>{line}</span>)}</caption>}
        <thead>{block.headerRows ? block.headerRows.map((row, r) => <tr key={r}>{row.map((cell, c) => <th key={c} scope={cell.colSpan > 1 ? "colgroup" : "col"} colSpan={cell.colSpan} rowSpan={cell.rowSpan}>{cell.text}</th>)}</tr>) : <tr>{block.columns.map((label, c) => <th key={c} scope="col" className={account && c === divider - 1 ? "poa-account-divider" : undefined}>{label}</th>)}</tr>}</thead>
        <tbody>{block.rows.map((row, r) => <tr key={r} data-total={block.totalRows?.includes(r) || undefined}>{row.map((cell, c) => {
          const id = `${block.answerId}:${r}:${c}`;
          const editable = block.answerSpace && onChange && !block.readOnlyCells?.includes(`${r}:${c}`) && (cell === "" || block.editableCells?.includes(`${r}:${c}`));
          const Field = block.multiline ? "textarea" : "input";
          return <td key={c} className={[/^[\d\s,$().?−%]+$/.test(cell) ? "poa-number" : "", account && c === divider - 1 ? "poa-account-divider" : ""].filter(Boolean).join(" ") || undefined}>{editable ? <Field rows={block.multiline ? block.minRows || 5 : undefined} disabled={disabled} placeholder={cell || undefined} aria-label={`${block.caption || block.answerId || "Answer form"}, row ${r + 1}, ${block.columns[c] || `column ${c + 1}`}${cell ? ` ${cell}` : ""}`} value={response?.cells?.[id] || ""} onChange={(e) => onChange({ ...response, cells: { ...response?.cells, [id]: e.target.value } })}/> : cell === "" || cell == null ? <span aria-hidden="true">{"\u00a0"}</span> : cell}</td>;
        })}</tr>)}</tbody>
      </table></div>;
      if (block.type === "cheque") {
        const field = (name, label) => block.answerSpace && onChange ? <input disabled={disabled} aria-label={`Cheque ${label}`} value={response?.cells?.[`${block.answerId}:${name}`] || ""} onChange={(e) => onChange({ ...response, cells: { ...response?.cells, [`${block.answerId}:${name}`]: e.target.value } })}/> : "________________________";
        return <div className="poa-printed-cheque" key={index}><p>{block.bank}<br/>{block.address}</p><p className="poa-cheque-date">{field("date", "date")}</p><p>PAY TO {field("payee", "payee")} The sum of</p><p>{field("words", "dollars in words")} DOLLARS</p><p>and {field("cents", "cents in words")} CENTS.</p><p className="poa-cheque-date">{field("signature", "signature")}</p><p>$ {field("amount", "amount in figures")}</p></div>;
      }
      if (block.type === "part") return <div className="poa-printed-part" key={index}><p><strong>{block.label}</strong>{block.label ? " " : ""}{block.text}</p>{block.marks !== undefined && <p className="poa-printed-marks">({block.marks} {block.marks === 1 ? "mark" : "marks"})</p>}</div>;
      return block.text?.trim() ? <p key={index}>{block.text}</p> : null;
    })}
  </div>;
}
