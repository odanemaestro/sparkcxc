import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeDocx } from "../models/officeExports.mjs";
import { readLabWorkspace, writeLabWorkspace } from "../models/workspacePersistence.mjs";
import { buildDocumentHtml } from "../models/documentExport.mjs";
import { mergeLetter, parseMergeRecipients } from "../models/mailMerge.mjs";
import { sanitizeDocumentMarkup } from "../models/documentMarkup.mjs";
import { LabFrame, RibbonTabs, WindowBar } from "../components/LabFrame";
import { ReducedMotionNotice, StatusMessage, ToolGroup, WorkspaceViewport, useTaskEvidence } from "../components/ProductivityKit";
import { countTextMatches, replaceTextMatches } from "../models/documentModel.mjs";

const STARTING_BODY = "The school club meets each Tuesday. The club welcomes new members. Club activities include coding, robotics and digital design.";

function selectionInside(editor, selection) {
  if (!editor || !selection || selection.rangeCount === 0 || selection.isCollapsed) return false;
  const range = selection.getRangeAt(0);
  return editor.contains(range.commonAncestorContainer);
}

export default function WordLab({ lab, userId, completed, onBack, onComplete }) {
  const saved = useRef(readLabWorkspace(userId, "word", {})).current;
  const editorRef = useRef(null);
  const savedRange = useRef(null);
  const [tab, setTab] = useState("Home");
  const [heading, setHeading] = useState(saved.heading ?? false);
  const [font, setFont] = useState(saved.font ?? "Aptos");
  const [size, setSize] = useState(saved.size ?? 11);
  const [align, setAlign] = useState(saved.align ?? "left");
  const [bullets, setBullets] = useState(saved.bullets ?? false);
  const [columns, setColumns] = useState(saved.columns ?? 1);
  const [orientation, setOrientation] = useState(saved.orientation ?? "portrait");
  const [table, setTable] = useState(saved.table ?? false);
  const [tableRows, setTableRows] = useState(saved.tableRows ?? [["Coding","Tuesday","3:30 pm"],["Robotics","Thursday","3:30 pm"]]);
  const [header, setHeader] = useState(saved.header ?? "");
  const [footer, setFooter] = useState(saved.footer ?? "");
  const [trackChanges, setTrackChanges] = useState(saved.trackChanges ?? false);
  const [comment, setComment] = useState(saved.comment ?? "");
  const [findText, setFindText] = useState("club");
  const [replaceText, setReplaceText] = useState("technology club");
  const [bodyText, setBodyText] = useState(saved.bodyText ?? STARTING_BODY);
  const [bodyHtml, setBodyHtml] = useState(saved.bodyHtml ?? "");
  useEffect(() => {
    if (editorRef.current && saved.bodyHtml) {
      editorRef.current.innerHTML = sanitizeDocumentMarkup(saved.bodyHtml);
      setBodyText(editorRef.current.innerText || "");
    }
  }, [saved]);
  const [selectionText, setSelectionText] = useState("");
  const [lastReplacement, setLastReplacement] = useState(0);
  const [mergeField, setMergeField] = useState(saved.mergeField ?? false);
  const [recipientsCsv, setRecipientsCsv] = useState(saved.recipientsCsv ?? "ParentName,Parish\nAlicia Brown,Kingston\nDario Lewis,Clarendon");
  const [previewIndex, setPreviewIndex] = useState(0);
  const recipients = useMemo(() => parseMergeRecipients(recipientsCsv), [recipientsCsv]);
  const [formControl, setFormControl] = useState(saved.formControl ?? false);
  const [message, setMessage] = useState("Select text in the document, then choose a formatting command.");
  const { evidence, record } = useTaskEvidence();

  useEffect(() => {
    writeLabWorkspace(userId, "word", { bodyText, bodyHtml, heading, font, size, align, bullets, columns, orientation, table, tableRows, header, footer, trackChanges, comment, mergeField, recipientsCsv, formControl });
  }, [userId, bodyText, bodyHtml, heading, font, size, align, bullets, columns, orientation, table, tableRows, header, footer, trackChanges, comment, mergeField, recipientsCsv, formControl]);

  function exportDocx() {
    const data = makeDocx({ title: "SPARK Technology Club Newsletter", body: editorRef.current?.innerText ?? bodyText, header, footer, orientation, tableRows:table?tableRows:[] });
    const url = URL.createObjectURL(new Blob([data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "SPARK-Technology-Club.docx";
    document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
    setMessage("Basic DOCX exported. Check advanced formatting in Word before submitting any document.");
  }

  function exportHtml() {
    const html = buildDocumentHtml({ title: "SPARK Technology Club Newsletter", body: editorRef.current?.innerText ?? bodyText, bodyHtml: sanitizeDocumentMarkup(editorRef.current?.innerHTML ?? bodyHtml), header, footer, orientation, columns, table, tableRows, bullets, mergeField });
    const url = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "SPARK-Technology-Club.html";
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    URL.revokeObjectURL(url);
    setMessage("HTML document exported. Open it in a browser or print it.");
  }

  const words = useMemo(() => bodyText.trim() ? bodyText.trim().split(/\s+/).length : 0, [bodyText]);
  const matchCount = useMemo(() => countTextMatches(bodyText, findText), [bodyText, findText]);
  const tasks = [
    { id: "heading", label: "Apply a heading style to the title", done: heading },
    { id: "format", label: "Select and format body text using font, emphasis and alignment", done: evidence.has("font") && evidence.has("emphasis") && evidence.has("alignment"), help: "Select body text before applying font and emphasis." },
    { id: "layout", label: "Change the page layout to two columns", done: columns === 2 },
    { id: "table", label: "Insert a table for the activity schedule", done: table },
    { id: "replace", label: "Use Find and Replace", done: evidence.has("replace") && lastReplacement > 0 },
    { id: "header-footer", label: "Add a header and footer", done: header.trim().length > 3 && footer.trim().length > 3 },
    { id: "review", label: "Turn on Track Changes and add a comment", done: trackChanges && comment.trim().length > 5 },
    { id: "advanced", label: "Insert a mail-merge field and a form control", done: mergeField && formControl },
  ];

  function captureSelection() {
    const selection = window.getSelection();
    if (!selectionInside(editorRef.current, selection)) {
      setSelectionText("");
      return;
    }
    savedRange.current = selection.getRangeAt(0).cloneRange();
    setSelectionText(selection.toString());
  }

  function restoreSelection() {
    if (!savedRange.current) return false;
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedRange.current);
    return true;
  }

  function syncDocument() {
    const text = editorRef.current?.innerText || "";
    setBodyText(text);
    setBodyHtml(sanitizeDocumentMarkup(editorRef.current?.innerHTML || ""));
    setSelectionText("");
  }

  function formatSelection(command, value, evidenceId, label) {
    if (!restoreSelection() || !selectionText.trim()) {
      setMessage("Select the text you want to format first.");
      return;
    }
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    record(evidenceId);
    syncDocument();
    setMessage(`${label} was applied to the selected text.`);
  }

  function applyAlignment(value) {
    if (!restoreSelection() || !selectionText.trim()) {
      setMessage("Select a paragraph before changing its alignment.");
      return;
    }
    editorRef.current?.focus();
    document.execCommand(`justify${value}`, false);
    setAlign(value);
    record("alignment");
    syncDocument();
    setMessage(`The selected paragraph is now ${value}-aligned.`);
  }

  function replaceInTextNodes(replaceAll) {
    const editor = editorRef.current;
    if (!editor || !findText.trim()) {
      setMessage("Enter text in the Find box first.");
      return;
    }
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let total = 0;
    for (const node of nodes) {
      if (!replaceAll && total > 0) break;
      const result = replaceTextMatches(node.nodeValue || "", findText, replaceText, replaceAll);
      if (result.replaced > 0) {
        node.nodeValue = result.text;
        total += replaceAll ? result.replaced : 1;
      }
    }
    setLastReplacement(total);
    if (total > 0) {
      record("replace");
      setBodyText(editor.innerText || "");
      setBodyHtml(sanitizeDocumentMarkup(editor.innerHTML));
      setMessage(`${total} ${total === 1 ? "match was" : "matches were"} replaced.`);
    } else {
      setMessage("No matching text was found.");
    }
  }

  return (
    <LabFrame lab={lab} tasks={tasks} completed={completed} onBack={onBack} onComplete={onComplete}
      footer={<span>Page 1 of 1 · {words} words · English (Caribbean)</span>}>
      <div className="itv2-office-window word">
        <WindowBar title="Technology Club Newsletter.docx" subtitle="SPARK Word Processing Studio"/>
        <RibbonTabs tabs={["Home", "Insert", "Layout", "Review", "Mailings", "File"]} active={tab} onChange={setTab}/>
        <div className="itv2-ribbon" aria-label={`${tab} tools`}>
          {tab === "File" && <ToolGroup label="Export"><button type="button" onClick={exportDocx}>Export DOCX</button><button type="button" onClick={exportHtml}>Export HTML</button><button type="button" onClick={() => window.print()}>Print</button></ToolGroup>}
          {tab === "Home" && <>
            <ToolGroup label="Font">
              <label htmlFor="word-font">Typeface</label><select id="word-font" value={font} onChange={event => { const value = event.target.value; setFont(value); formatSelection("fontName", value, "font", value); }}><option>Aptos</option><option>Arial</option><option>Georgia</option></select>
              <label htmlFor="word-size">Size</label><select id="word-size" value={size} onChange={event => { const value = Number(event.target.value); setSize(value); formatSelection("fontSize", value >= 18 ? "5" : value >= 14 ? "4" : value >= 12 ? "3" : "2", "font", `${value} point`); }}><option>10</option><option>11</option><option>12</option><option>14</option><option>18</option></select>
              <button type="button" aria-label="Bold selected text" onMouseDown={event => event.preventDefault()} onClick={() => formatSelection("bold", null, "emphasis", "Bold")}><b>B</b></button>
              <button type="button" aria-label="Italicise selected text" onMouseDown={event => event.preventDefault()} onClick={() => formatSelection("italic", null, "emphasis", "Italic")}><i>I</i></button>
              <button type="button" aria-label="Underline selected text" onMouseDown={event => event.preventDefault()} onClick={() => formatSelection("underline", null, "emphasis", "Underline")}><u>U</u></button>
            </ToolGroup>
            <ToolGroup label="Paragraph">
              <button type="button" className={heading ? "active" : ""} aria-pressed={heading} onClick={() => setHeading(value => !value)}>Heading 1</button>
              <button type="button" className={bullets ? "active" : ""} aria-pressed={bullets} onClick={() => setBullets(value => !value)}>• Bullets</button>
              {["left", "center", "right"].map(value => <button type="button" aria-label={`Align selected paragraph ${value}`} aria-pressed={align === value} key={value} className={align === value ? "active" : ""} onMouseDown={event => event.preventDefault()} onClick={() => applyAlignment(value)}>{value[0].toUpperCase()}</button>)}
            </ToolGroup>
          </>}
          {tab === "Insert" && <ToolGroup label="Document elements">
            <button type="button" className={table ? "active" : ""} aria-pressed={table} onClick={() => setTable(value => !value)}>Table</button>{table && <button type="button" onClick={() => setTableRows(rows => [...rows, ["","",""]])}>Add table row</button>}
            <label htmlFor="word-header">Header</label><input id="word-header" value={header} onChange={event => setHeader(event.target.value)} placeholder="Technology Club"/>
            <label htmlFor="word-footer">Footer</label><input id="word-footer" value={footer} onChange={event => setFooter(event.target.value)} placeholder="Page 1"/>
            <button type="button" className={formControl ? "active" : ""} aria-pressed={formControl} onClick={() => setFormControl(value => !value)}>Check box</button>
          </ToolGroup>}
          {tab === "Layout" && <ToolGroup label="Page setup">
            <label htmlFor="word-columns">Columns</label><select id="word-columns" value={columns} onChange={event => setColumns(Number(event.target.value))}><option value="1">One</option><option value="2">Two</option></select>
            <label htmlFor="word-orientation">Orientation</label><select id="word-orientation" value={orientation} onChange={event => setOrientation(event.target.value)}><option value="portrait">Portrait</option><option value="landscape">Landscape</option></select>
          </ToolGroup>}
          {tab === "Review" && <>
            <ToolGroup label="Review"><button type="button" className={trackChanges ? "active" : ""} aria-pressed={trackChanges} onClick={() => setTrackChanges(value => !value)}>Track Changes</button><label htmlFor="word-comment">Comment</label><input id="word-comment" value={comment} onChange={event => setComment(event.target.value)} placeholder="Add a review comment"/></ToolGroup>
            <ToolGroup label="Find and Replace"><label htmlFor="word-find">Find</label><input id="word-find" value={findText} onChange={event => { setFindText(event.target.value); setLastReplacement(0); }}/><label htmlFor="word-replace">Replace</label><input id="word-replace" value={replaceText} onChange={event => setReplaceText(event.target.value)}/><button type="button" onClick={() => replaceInTextNodes(false)}>Replace</button><button type="button" onClick={() => replaceInTextNodes(true)}>Replace All</button></ToolGroup>
          </>}
          {tab === "Mailings" && <ToolGroup label="Mail merge">
            <button type="button" className={mergeField ? "active" : ""} aria-pressed={mergeField} onClick={() => setMergeField(value => !value)}>Insert «ParentName»</button>
            <label htmlFor="word-merge-csv">Recipients (CSV)</label>
            <textarea id="word-merge-csv" rows="3" value={recipientsCsv} onChange={event => { setRecipientsCsv(event.target.value); setPreviewIndex(0); }}/>
            <span>{recipients.length} valid recipients</span>
            <button type="button" disabled={!recipients.length} onClick={() => setPreviewIndex(i => (i + 1) % recipients.length)}>Next recipient</button>
          </ToolGroup>}
          <ReducedMotionNotice/>
        </div>
        <StatusMessage tone={selectionText ? "success" : "neutral"}><strong>{selectionText ? `${selectionText.length} characters selected` : "No text selected"}</strong><span>{message}</span></StatusMessage>
        {tab === "Review" && <div className="itv2-find-summary" role="status" aria-live="polite"><strong>{matchCount} {matchCount === 1 ? "match" : "matches"}</strong><span>for “{findText || ""}” in the document</span>{lastReplacement > 0 && <b>{lastReplacement} replaced</b>}</div>}
        <WorkspaceViewport label="Editable word-processing document" className="itv2-word-stage">
          <article className={`itv2-word-page ${orientation} columns-${columns}`}>
            {header && <header>{header}</header>}
            <h2 className={heading ? "heading-style" : ""}>SPARK Technology Club Newsletter</h2>
            {mergeField && <p className="merge-line">{recipients.length ? mergeLetter("Dear «ParentName»,",recipients[Math.min(previewIndex,recipients.length-1)]) : "Dear «ParentName»,"}</p>}
            <div ref={editorRef} className="itv2-word-body" contentEditable suppressContentEditableWarning role="textbox" aria-label="Document body" aria-multiline="true" onInput={syncDocument} onKeyUp={captureSelection} onMouseUp={captureSelection} onTouchEnd={captureSelection}>{saved.bodyText ?? STARTING_BODY}</div>
            {bullets && <ul><li>Coding club</li><li>Robotics club</li><li>Digital design club</li></ul>}
            {table && <table><thead><tr><th>Activity</th><th>Day</th><th>Time</th><th>Action</th></tr></thead><tbody>{tableRows.map((row,rowIndex) => <tr key={rowIndex}>{row.map((cell,columnIndex) => <td key={columnIndex}><input style={{width:"100%",minWidth:64}} aria-label={`Table row ${rowIndex+1} column ${columnIndex+1}`} value={cell} onChange={event => setTableRows(rows => rows.map((current,index) => index===rowIndex?current.map((value,col) => col===columnIndex?event.target.value:value):current))}/></td>)}<td><button type="button" aria-label={`Remove table row ${rowIndex+1}`} disabled={tableRows.length===1} onClick={() => setTableRows(rows => rows.filter((_,index)=>index!==rowIndex))}>Remove</button></td></tr>)}</tbody></table>}
            {formControl && <label className="itv2-doc-checkbox"><input type="checkbox"/> I will attend the technology showcase</label>}
            {footer && <footer>{footer}</footer>}
            {trackChanges && <aside className="itv2-review-mark">TRACK CHANGES ON{comment && <small>{comment}</small>}</aside>}
          </article>
        </WorkspaceViewport>
      </div>
    </LabFrame>
  );
}