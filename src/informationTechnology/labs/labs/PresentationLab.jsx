import React, { useState } from "react";
import { LabFrame, RibbonTabs, WindowBar } from "../components/LabFrame";

export default function PresentationLab({ lab, completed, onBack, onComplete }) {
  const [tab, setTab] = useState("Home");
  const [slides, setSlides] = useState([
    { id: 1, title: "Technology Club Project", body: "Purpose, activities and benefits", layout: "Title and Content" },
  ]);
  const [selected, setSelected] = useState(1);
  const [theme, setTheme] = useState("");
  const [bullets, setBullets] = useState(false);
  const [graphic, setGraphic] = useState(false);
  const [transition, setTransition] = useState("");
  const [notes, setNotes] = useState("");
  const [footer, setFooter] = useState("");
  const [showMode, setShowMode] = useState(false);

  const slide = slides.find(item => item.id === selected) || slides[0];

  const tasks = [
    { id: "slides", label: "Create at least three slides", done: slides.length >= 3 },
    { id: "layout", label: "Use a Title and Content layout", done: slides.some(item => item.layout === "Title and Content") },
    { id: "theme", label: "Apply a consistent presentation theme", done: Boolean(theme) },
    { id: "bullets", label: "Use concise bullet points", done: bullets },
    { id: "media", label: "Insert a suitable graphic", done: graphic },
    { id: "transition", label: "Apply a slide transition", done: Boolean(transition) },
    { id: "notes", label: "Add speaker notes", done: notes.trim().length >= 12 },
    { id: "footer", label: "Add a footer", done: footer.trim().length >= 4 },
    { id: "show", label: "Preview the slide show", done: showMode },
  ];

  function addSlide() {
    const id = slides.length + 1;
    const next = { id, title: `Slide ${id}`, body: "Add concise content here", layout: "Title and Content" };
    setSlides([...slides, next]);
    setSelected(id);
  }

  function updateSlide(patch) {
    setSlides(slides.map(item => item.id === selected ? { ...item, ...patch } : item));
  }

  return (
    <LabFrame lab={lab} tasks={tasks} completed={completed} onBack={onBack} onComplete={onComplete}
      footer={<span>Slide {selected} of {slides.length} · Theme: {theme || "Default"}</span>}>
      <div className="itv2-office-window presentation">
        <WindowBar title="Technology Project.pptx" subtitle="SPARK Presentation Studio"/>
        <RibbonTabs tabs={["Home","Insert","Design","Transitions","Slide Show"]} active={tab} onChange={setTab}/>
        <div className="itv2-ribbon">
          {tab === "Home" && <div className="itv2-ribbon-group"><button onClick={addSlide}>＋ New Slide</button><label>Layout<select value={slide.layout} onChange={e => updateSlide({ layout: e.target.value })}><option>Title and Content</option><option>Title Only</option><option>Blank</option></select></label><button className={bullets ? "active" : ""} onClick={() => setBullets(!bullets)}>• Bullets</button></div>}
          {tab === "Insert" && <div className="itv2-ribbon-group"><button className={graphic ? "active" : ""} onClick={() => setGraphic(!graphic)}>Picture / Graphic</button></div>}
          {tab === "Design" && <div className="itv2-ribbon-group">{["Ocean","Slate","Light"].map(name => <button key={name} className={theme === name ? "active" : ""} onClick={() => setTheme(name)}>{name}</button>)}</div>}
          {tab === "Transitions" && <div className="itv2-ribbon-group"><label>Transition<select value={transition} onChange={e => setTransition(e.target.value)}><option value="">None</option><option>Fade</option><option>Wipe</option><option>Push</option></select></label></div>}
          {tab === "Slide Show" && <div className="itv2-ribbon-group"><button onClick={() => setShowMode(true)}>▶ From Current Slide</button></div>}
        </div>

        <div className="itv2-ppt-layout">
          <aside className="itv2-slide-thumbs">
            {slides.map(item => <button key={item.id} className={item.id === selected ? "active" : ""} onClick={() => setSelected(item.id)}><small>{item.id}</small><span>{item.title}</span></button>)}
          </aside>

          <section className="itv2-ppt-stage">
            <article className={`itv2-slide theme-${theme.toLowerCase() || "default"}`}>
              <input className="itv2-slide-title" value={slide.title} onChange={e => updateSlide({ title: e.target.value })}/>
              {bullets ? <ul><li>Purpose of the project</li><li>Key activities</li><li>Expected benefits</li></ul> : <textarea value={slide.body} onChange={e => updateSlide({ body: e.target.value })}/>}
              {graphic && <div className="itv2-slide-media">IT</div>}
              <footer>{footer}</footer>
            </article>
            <div className="itv2-notes"><span>Notes</span><textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add speaker notes for this slide."/></div>
            <label className="itv2-footer-field">Footer<input value={footer} onChange={e => setFooter(e.target.value)} placeholder="Technology Project · 2026"/></label>
          </section>
        </div>

        {showMode && <div className="itv2-slide-show" onClick={() => setShowMode(false)}>
          <article className={`itv2-slide theme-${theme.toLowerCase() || "default"}`}><h2>{slide.title}</h2>{bullets ? <ul><li>Purpose of the project</li><li>Key activities</li><li>Expected benefits</li></ul> : <p>{slide.body}</p>}{graphic && <div className="itv2-slide-media">IT</div>}<footer>{footer}</footer></article>
          <small>Click anywhere to end slide show</small>
        </div>}
      </div>
    </LabFrame>
  );
}
