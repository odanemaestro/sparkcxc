import React, { useMemo, useState } from "react";
import { LabFrame, RibbonTabs, WindowBar } from "../components/LabFrame";

export default function WordLab({ lab, completed, onBack, onComplete }) {
  const [tab, setTab] = useState("Home");
  const [heading, setHeading] = useState(false);
  const [font, setFont] = useState("Aptos");
  const [size, setSize] = useState(11);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [align, setAlign] = useState("left");
  const [bullets, setBullets] = useState(false);
  const [columns, setColumns] = useState(1);
  const [orientation, setOrientation] = useState("portrait");
  const [table, setTable] = useState(false);
  const [header, setHeader] = useState("");
  const [footer, setFooter] = useState("");
  const [trackChanges, setTrackChanges] = useState(false);
  const [comment, setComment] = useState("");
  const [findText, setFindText] = useState("club");
  const [replaceText, setReplaceText] = useState("technology club");
  const [body, setBody] = useState("The school club meets each Tuesday. The club welcomes new members. Club activities include coding, robotics and digital design.");
  const [replaceDone, setReplaceDone] = useState(false);
  const [mergeField, setMergeField] = useState(false);
  const [formControl, setFormControl] = useState(false);

  const words = useMemo(() => body.trim() ? body.trim().split(/\s+/).length : 0, [body]);

  const tasks = [
    { id: "heading", label: "Apply a heading style to the title", done: heading },
    { id: "format", label: "Format the body text using font, bold/italic, and alignment", done: font !== "Aptos" && (bold || italic) && align !== "left", help: "Choose a different font, apply bold or italic, and change the alignment." },
    { id: "layout", label: "Change the page layout to two columns", done: columns === 2 },
    { id: "table", label: "Insert a table for the activity schedule", done: table },
    { id: "replace", label: "Use Find and Replace", done: replaceDone },
    { id: "header-footer", label: "Add a header and footer", done: header.trim().length > 3 && footer.trim().length > 3 },
    { id: "review", label: "Turn on Track Changes and add a comment", done: trackChanges && comment.trim().length > 5 },
    { id: "advanced", label: "Insert a mail-merge field and a form control", done: mergeField && formControl },
  ];

  function replaceAll() {
    if (!findText.trim()) return;
    const next = body.split(findText).join(replaceText);
    setReplaceDone(next !== body);
    setBody(next);
  }

  return (
    <LabFrame lab={lab} tasks={tasks} completed={completed} onBack={onBack} onComplete={onComplete}
      footer={<span>Page 1 of 1 · {words} words · English (Caribbean)</span>}>
      <div className="itv2-office-window word">
        <WindowBar title="Technology Club Newsletter.docx" subtitle="SPARK Word Processing Studio"/>
        <RibbonTabs tabs={["Home","Insert","Layout","Review","Mailings"]} active={tab} onChange={setTab}/>

        <div className="itv2-ribbon">
          {tab === "Home" && <>
            <div className="itv2-ribbon-group">
              <label>Font<select value={font} onChange={e => setFont(e.target.value)}><option>Aptos</option><option>Arial</option><option>Georgia</option></select></label>
              <label>Size<select value={size} onChange={e => setSize(Number(e.target.value))}><option>10</option><option>11</option><option>12</option><option>14</option><option>18</option></select></label>
              <button className={bold ? "active" : ""} onClick={() => setBold(!bold)}>B</button>
              <button className={italic ? "active" : ""} onClick={() => setItalic(!italic)}><i>I</i></button>
              <button className={underline ? "active" : ""} onClick={() => setUnderline(!underline)}><u>U</u></button>
            </div>
            <div className="itv2-ribbon-group">
              <button className={heading ? "active" : ""} onClick={() => setHeading(!heading)}>Heading 1</button>
              <button className={bullets ? "active" : ""} onClick={() => setBullets(!bullets)}>• Bullets</button>
              {["left","center","right"].map(value => <button key={value} className={align === value ? "active" : ""} onClick={() => setAlign(value)}>{value[0].toUpperCase()}</button>)}
            </div>
          </>}

          {tab === "Insert" && <div className="itv2-ribbon-group">
            <button className={table ? "active" : ""} onClick={() => setTable(!table)}>Table</button>
            <label>Header<input value={header} onChange={e => setHeader(e.target.value)} placeholder="Technology Club"/></label>
            <label>Footer<input value={footer} onChange={e => setFooter(e.target.value)} placeholder="Page 1"/></label>
            <button className={formControl ? "active" : ""} onClick={() => setFormControl(!formControl)}>Check box</button>
          </div>}

          {tab === "Layout" && <div className="itv2-ribbon-group">
            <label>Columns<select value={columns} onChange={e => setColumns(Number(e.target.value))}><option value="1">One</option><option value="2">Two</option></select></label>
            <label>Orientation<select value={orientation} onChange={e => setOrientation(e.target.value)}><option value="portrait">Portrait</option><option value="landscape">Landscape</option></select></label>
          </div>}

          {tab === "Review" && <>
            <div className="itv2-ribbon-group">
              <button className={trackChanges ? "active" : ""} onClick={() => setTrackChanges(!trackChanges)}>Track Changes</button>
              <label>Comment<input value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a review comment"/></label>
            </div>
            <div className="itv2-ribbon-group">
              <label>Find<input value={findText} onChange={e => setFindText(e.target.value)}/></label>
              <label>Replace<input value={replaceText} onChange={e => setReplaceText(e.target.value)}/></label>
              <button onClick={replaceAll}>Replace All</button>
            </div>
          </>}

          {tab === "Mailings" && <div className="itv2-ribbon-group">
            <button className={mergeField ? "active" : ""} onClick={() => setMergeField(!mergeField)}>Insert «ParentName»</button>
            <button onClick={() => setBody(prev => `${prev}\n\nDear ${mergeField ? "«ParentName»" : "Parent"},`)}>Preview merge</button>
          </div>}
        </div>

        <div className="itv2-word-stage">
          <article className={`itv2-word-page ${orientation} columns-${columns}`}>
            {header && <header>{header}</header>}
            <h2 className={heading ? "heading-style" : ""}>SPARK Technology Club Newsletter</h2>
            {mergeField && <p className="merge-line">Dear «ParentName»,</p>}
            <div
              className="itv2-word-body"
              contentEditable
              suppressContentEditableWarning
              style={{
                fontFamily: font,
                fontSize: `${size}px`,
                fontWeight: bold ? 700 : 400,
                fontStyle: italic ? "italic" : "normal",
                textDecoration: underline ? "underline" : "none",
                textAlign: align,
              }}
              onInput={e => setBody(e.currentTarget.textContent || "")}
            >{body}</div>
            {bullets && <ul><li>Coding club</li><li>Robotics club</li><li>Digital design club</li></ul>}
            {table && <table><thead><tr><th>Activity</th><th>Day</th><th>Time</th></tr></thead><tbody><tr><td>Coding</td><td>Tuesday</td><td>3:30 pm</td></tr><tr><td>Robotics</td><td>Thursday</td><td>3:30 pm</td></tr></tbody></table>}
            {formControl && <label className="itv2-doc-checkbox"><input type="checkbox"/> I will attend the technology showcase</label>}
            {footer && <footer>{footer}</footer>}
            {trackChanges && <aside className="itv2-review-mark">TRACK CHANGES ON{comment && <small>{comment}</small>}</aside>}
          </article>
        </div>
      </div>
    </LabFrame>
  );
}
