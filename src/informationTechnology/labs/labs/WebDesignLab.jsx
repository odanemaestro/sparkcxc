import React, { useState } from "react";
import { LabFrame, RibbonTabs, WindowBar } from "../components/LabFrame";

export default function WebDesignLab({ lab, completed, onBack, onComplete }) {
  const [tab, setTab] = useState("Design");
  const [pages, setPages] = useState([
    { id: "home", title: "Home", heading: "Technology Club", body: "Welcome to our technology club website." },
  ]);
  const [selected, setSelected] = useState("home");
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("");
  const [image, setImage] = useState(false);
  const [email, setEmail] = useState(false);
  const [external, setExternal] = useState(false);
  const [preview, setPreview] = useState("desktop");
  const [tested, setTested] = useState(false);

  const page = pages.find(item => item.id === selected) || pages[0];

  const tasks = [
    { id: "plan", label: "Define the site purpose and audience", done: purpose.trim().length >= 8 && audience.trim().length >= 4 },
    { id: "pages", label: "Create a three-page website", done: pages.length === 3 },
    { id: "content", label: "Edit headings and body content", done: pages.some(item => item.body !== "Welcome to our technology club website.") },
    { id: "media", label: "Insert a graphic", done: image },
    { id: "links", label: "Create email and external hyperlinks", done: email && external },
    { id: "responsive", label: "Preview the mobile layout", done: preview === "mobile" },
    { id: "test", label: "Run the link and publishing checks", done: tested && pages.length === 3 && email && external },
  ];

  function addPage() {
    if (pages.length >= 3) return;
    const next = pages.length === 1
      ? { id: "activities", title: "Activities", heading: "Club Activities", body: "Coding, robotics and digital design." }
      : { id: "contact", title: "Contact", heading: "Contact the Club", body: "Get in touch with the technology club." };
    setPages([...pages, next]);
    setSelected(next.id);
    setTested(false);
  }

  function updatePage(patch) {
    setPages(pages.map(item => item.id === selected ? { ...item, ...patch } : item));
    setTested(false);
  }

  return (
    <LabFrame lab={lab} tasks={tasks} completed={completed} onBack={onBack} onComplete={onComplete}
      footer={<span>{pages.length}/3 pages · Preview: {preview} · {tested ? "Publishing checks run" : "Not yet tested"}</span>}>
      <div className="itv2-office-window web">
        <WindowBar title="School Technology Club" subtitle="SPARK Web Design Studio"/>
        <RibbonTabs tabs={["Design","Insert","Preview","Publish"]} active={tab} onChange={setTab}/>

        <div className="itv2-ribbon">
          {tab === "Design" && <div className="itv2-ribbon-group"><label>Purpose<input value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="Promote club activities"/></label><label>Audience<input value={audience} onChange={e => setAudience(e.target.value)} placeholder="Students and parents"/></label><button onClick={addPage} disabled={pages.length >= 3}>＋ Add Page</button></div>}
          {tab === "Insert" && <div className="itv2-ribbon-group"><button className={image ? "active" : ""} onClick={() => setImage(!image)}>Image</button><button className={email ? "active" : ""} onClick={() => { setEmail(!email); setTested(false); }}>Email link</button><button className={external ? "active" : ""} onClick={() => { setExternal(!external); setTested(false); }}>External link</button></div>}
          {tab === "Preview" && <div className="itv2-ribbon-group"><button className={preview === "desktop" ? "active" : ""} onClick={() => setPreview("desktop")}>Desktop</button><button className={preview === "mobile" ? "active" : ""} onClick={() => setPreview("mobile")}>Mobile</button></div>}
          {tab === "Publish" && <div className="itv2-ribbon-group"><button onClick={() => setTested(true)}>Run link checker</button><button disabled={!tested || pages.length !== 3 || !email || !external}>Publish site</button></div>}
        </div>

        <div className="itv2-web-layout">
          <aside className="itv2-site-tree">
            <strong>Site pages</strong>
            {pages.map(item => <button key={item.id} className={item.id === selected ? "active" : ""} onClick={() => setSelected(item.id)}>{item.title}</button>)}
          </aside>

          <section className="itv2-web-editor">
            <div className="itv2-web-fields"><label>Page title<input value={page.title} onChange={e => updatePage({ title: e.target.value })}/></label><label>Heading<input value={page.heading} onChange={e => updatePage({ heading: e.target.value })}/></label><label>Body<textarea value={page.body} onChange={e => updatePage({ body: e.target.value })}/></label></div>
            <div className={`itv2-browser-preview ${preview}`}>
              <div className="itv2-browser-bar">https://spark.local/technology-club/{page.id}</div>
              <nav>{pages.map(item => <button key={item.id} onClick={() => setSelected(item.id)}>{item.title}</button>)}</nav>
              <h2>{page.heading}</h2>
              <p>{page.body}</p>
              {image && <div className="itv2-site-image">Technology Club</div>}
              <div className="itv2-site-links">{email && <a href="mailto:club@example.com" onClick={e => e.preventDefault()}>Email us</a>}{external && <a href="#external" onClick={e => e.preventDefault()}>School website</a>}</div>
            </div>
          </section>
        </div>

        <div className={`itv2-publish-status ${tested ? "tested" : ""}`}>
          {tested
            ? (pages.length === 3 && email && external ? "✓ All required navigation and link checks passed." : "⚠ Publishing check found missing pages or hyperlinks.")
            : "Run the publishing check before the site is considered ready."}
        </div>
      </div>
    </LabFrame>
  );
}
