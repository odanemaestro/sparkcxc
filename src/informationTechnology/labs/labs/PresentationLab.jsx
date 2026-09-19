import React, { useEffect, useMemo, useState } from "react";
import { LabFrame, RibbonTabs, WindowBar } from "../components/LabFrame";
import { ReducedMotionNotice, StatusMessage, ToolGroup, useTaskEvidence } from "../components/ProductivityKit";
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, ChevronUpIcon, PlayIcon } from "../components/Icons";
import { PRESENTATION_LAYOUTS, PRESENTATION_THEMES, PRESENTATION_TRANSITIONS, bulletItems, createSlide, moveSlide, presentationProof, removeSlide, updateSlide } from "../models/presentationModel.mjs";

const FIRST_SLIDE = { ...createSlide(1), title: "Technology Club Project", body: "Purpose, activities and benefits" };

function SlideCanvas({ slide, theme, footer, heading = false }) {
  const items = bulletItems(slide.body);
  return <article className={`itv2-slide theme-${theme.toLowerCase() || "default"}`} aria-label={`Slide: ${slide.title}`}>
    {heading ? <h2>{slide.title || "Untitled slide"}</h2> : <input aria-label="Slide title" className="itv2-slide-title" value={slide.title} readOnly/>}
    {slide.layout !== "Blank" && slide.layout !== "Title Only" && (slide.bullets ? <ul>{items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul> : heading ? <p>{slide.body}</p> : <textarea aria-label="Slide body" value={slide.body} readOnly/>)}
    {slide.graphic && <div className="itv2-slide-media" role="img" aria-label="Technology project graphic">IT</div>}
    <footer>{footer}</footer>
  </article>;
}

export default function PresentationLab({ lab, completed, onBack, onComplete }) {
  const [tab, setTab] = useState("Home");
  const [slides, setSlides] = useState([FIRST_SLIDE]);
  const [selected, setSelected] = useState(1);
  const [theme, setTheme] = useState("");
  const [footer, setFooter] = useState("");
  const [showMode, setShowMode] = useState(false);
  const [showIndex, setShowIndex] = useState(0);
  const [message, setMessage] = useState("Create and edit slides, then run the slide show to verify your presentation.");
  const { evidence, record } = useTaskEvidence();
  const slide = slides.find(item => item.id === selected) ?? slides[0];
  const proof = useMemo(() => presentationProof(slides, theme, footer), [slides, theme, footer]);
  const showSlide = slides[showIndex] ?? slides[0];

  const tasks = [
    { id: "slides", label: "Create and edit at least three slides", done: proof.threeEditedSlides && evidence.has("created-slide") },
    { id: "layout", label: "Use a Title and Content layout", done: proof.validLayout && evidence.has("layout") },
    { id: "theme", label: "Apply one consistent presentation theme", done: proof.consistentTheme && evidence.has("theme") },
    { id: "bullets", label: "Create at least three concise bullet points", done: proof.conciseBullets && evidence.has("bullets") },
    { id: "media", label: "Insert a suitable graphic on a slide", done: proof.graphic && evidence.has("graphic") },
    { id: "transition", label: "Apply a slide transition", done: proof.transition && evidence.has("transition") },
    { id: "notes", label: "Add meaningful speaker notes", done: proof.notes },
    { id: "footer", label: "Add a presentation footer", done: proof.footer },
    { id: "order", label: "Reorder the slide sequence", done: evidence.has("reordered") },
    { id: "show", label: "Run the slide show and navigate between slides", done: evidence.has("show-started") && evidence.has("show-navigation") },
  ];

  function patchSlide(patch) {
    setSlides(current => updateSlide(current, selected, patch));
  }
  function addSlide() {
    const id = Math.max(0, ...slides.map(item => item.id)) + 1;
    setSlides(current => [...current, createSlide(id)]);
    setSelected(id);
    record("created-slide");
    setMessage(`Slide ${slides.length + 1} was created. Add a title and content to prove the skill.`);
  }
  function deleteSlide() {
    const next = removeSlide(slides, selected);
    if (next === slides) { setMessage("A presentation must keep at least one slide."); return; }
    setSlides(next); setSelected(next[Math.max(0, next.length - 1)].id); setMessage("The selected slide was deleted.");
  }
  function reorder(direction) {
    const next = moveSlide(slides, selected, direction);
    if (next === slides) { setMessage("That slide cannot move farther in this direction."); return; }
    setSlides(next); record("reordered"); setMessage("The slide sequence was changed.");
  }
  function startShow() {
    const index = Math.max(0, slides.findIndex(item => item.id === selected));
    setShowIndex(index); setShowMode(true); record("show-started");
  }
  function navigateShow(direction) {
    const next = Math.min(slides.length - 1, Math.max(0, showIndex + direction));
    if (next !== showIndex) record("show-navigation");
    setShowIndex(next);
  }

  useEffect(() => {
    if (!showMode) return undefined;
    const handleKey = event => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); navigateShow(1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); navigateShow(-1); }
      if (event.key === "Escape") setShowMode(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showIndex, showMode, slides.length]);

  return <LabFrame lab={lab} tasks={tasks} completed={completed} onBack={onBack} onComplete={onComplete} footer={<span>Slide {slides.findIndex(item => item.id === selected) + 1} of {slides.length} · Theme: {theme || "Default"}</span>}>
    <div className="itv2-office-window presentation">
      <WindowBar title="Technology Project.pptx" subtitle="SPARK Presentation Studio" status={proof.threeEditedSlides ? "Presentation updated" : "Draft"}/>
      <RibbonTabs tabs={["Home", "Insert", "Design", "Transitions", "Slide Show"]} active={tab} onChange={setTab}/>
      <div className="itv2-ribbon" aria-label={`${tab} tools`}>
        {tab === "Home" && <><ToolGroup label="Slides"><button type="button" onClick={addSlide}>＋ New Slide</button><button type="button" onClick={deleteSlide}>Delete</button><button type="button" aria-label="Move slide earlier" onClick={() => reorder(-1)}><ChevronUpIcon/></button><button type="button" aria-label="Move slide later" onClick={() => reorder(1)}><ChevronDownIcon/></button></ToolGroup><ToolGroup label="Layout"><label>Slide layout<select aria-label="Slide layout" value={slide.layout} onChange={event => { patchSlide({ layout: event.target.value }); record("layout"); }} key={slide.id}>{PRESENTATION_LAYOUTS.map(item => <option key={item}>{item}</option>)}</select></label><button type="button" className={slide.bullets ? "active" : ""} aria-pressed={slide.bullets} onClick={() => { patchSlide({ bullets: !slide.bullets }); record("bullets"); }}>• Bullets</button></ToolGroup></>}
        {tab === "Insert" && <ToolGroup label="Illustrations"><button type="button" className={slide.graphic ? "active" : ""} aria-pressed={slide.graphic} onClick={() => { patchSlide({ graphic: !slide.graphic }); record("graphic"); }}>Picture / Graphic</button></ToolGroup>}
        {tab === "Design" && <ToolGroup label="Themes">{PRESENTATION_THEMES.map(name => <button type="button" key={name} className={theme === name ? "active" : ""} aria-pressed={theme === name} onClick={() => { setTheme(name); record("theme"); }}>{name}</button>)}</ToolGroup>}
        {tab === "Transitions" && <ToolGroup label="Transition"><label>Effect<select aria-label="Slide transition" value={slide.transition} onChange={event => { patchSlide({ transition: event.target.value }); if (event.target.value) record("transition"); }}><option value="">None</option>{PRESENTATION_TRANSITIONS.map(item => <option key={item}>{item}</option>)}</select></label></ToolGroup>}
        {tab === "Slide Show" && <ToolGroup label="Start slide show"><button type="button" onClick={startShow}><PlayIcon/> <span>From Current Slide</span></button><ReducedMotionNotice/></ToolGroup>}
      </div>
      <StatusMessage tone={proof.threeEditedSlides ? "success" : "neutral"}>{message}</StatusMessage>
      <div className="itv2-ppt-layout">
        <aside className="itv2-slide-thumbs" aria-label="Presentation slides">{slides.map((item, index) => <button type="button" key={item.id} className={item.id === selected ? "active" : ""} aria-current={item.id === selected ? "true" : undefined} onClick={() => setSelected(item.id)}><small>{index + 1}</small><span>{item.title || "Untitled slide"}</span></button>)}</aside>
        <section className="itv2-ppt-stage">
          <article className={`itv2-slide theme-${theme.toLowerCase() || "default"}`} aria-label="Editable slide">
            <input aria-label="Slide title" className="itv2-slide-title" value={slide.title} onChange={event => patchSlide({ title: event.target.value })}/>
            {slide.layout !== "Blank" && slide.layout !== "Title Only" && <textarea aria-label="Slide body" value={slide.body} placeholder={slide.bullets ? "Enter one concise bullet per line" : "Add slide content"} onChange={event => patchSlide({ body: event.target.value })}/>}
            {slide.graphic && <div className="itv2-slide-media" role="img" aria-label="Technology project graphic">IT</div>}<footer>{footer}</footer>
          </article>
          <div className="itv2-notes"><span>Notes</span><textarea aria-label="Speaker notes" value={slide.notes} onChange={event => patchSlide({ notes: event.target.value })} placeholder="Add speaker notes for this slide."/></div>
          <label className="itv2-footer-field">Footer<input aria-label="Presentation footer" value={footer} onChange={event => setFooter(event.target.value)} placeholder="Technology Project · 2026"/></label>
        </section>
      </div>
      {showMode && <div className="itv2-slide-show" role="dialog" aria-modal="true" aria-label="Slide show"><SlideCanvas slide={showSlide} theme={theme} footer={footer} heading/><nav aria-label="Slide show controls"><button type="button" onClick={() => navigateShow(-1)} disabled={showIndex === 0}><ArrowLeftIcon/> <span>Previous</span></button><span>{showIndex + 1} / {slides.length}</span><button type="button" onClick={() => navigateShow(1)} disabled={showIndex === slides.length - 1}><span>Next</span> <ArrowRightIcon/></button><button type="button" onClick={() => setShowMode(false)}>End show</button></nav></div>}
    </div>
  </LabFrame>;
}
