import React, { useEffect, useMemo, useRef, useState } from "react";
import course from "../course/itCourseData.json";
import InformationTechnologyTools from "./InformationTechnologyTools";
import InformationTechnologyVisuals from "./InformationTechnologyVisuals";
import InformationTechnologyPracticalLabs from "../labs/InformationTechnologyPracticalLabs";
import { useInformationTechnologyStudyRoute } from "../../routing/sparkRoutingV270";
import objectiveCoverage from "../course/itObjectiveCoverage.json";
import "./informationTechnology.css";

function BackIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 5.5 8 10l4.5 4.5M8 10h8"/></svg>;
}

const LESSON_STEPS = [
  { id: "learn", label: "Learn" },
  { id: "see", label: "See it" },
  { id: "try", label: "Try it" },
  { id: "practice", label: "Practise it" },
  { id: "check", label: "Check it" },
  { id: "exam", label: "Exam it" },
];

const IT_STUDY_PROGRESS_PREFIX = "spark-it-study-progress-v1";

function itStudyProgressKey(userId) {
  return `${IT_STUDY_PROGRESS_PREFIX}:${userId || "student"}`;
}

function readInformationTechnologyStudyProgress(userId) {
  try {
    return JSON.parse(localStorage.getItem(itStudyProgressKey(userId)) || "{}") || {};
  } catch {
    return {};
  }
}

function writeInformationTechnologyStudyProgress(userId, progress) {
  try {
    localStorage.setItem(itStudyProgressKey(userId), JSON.stringify(progress || {}));
  } catch {
    // Database progress still records when browser storage is unavailable.
  }
}

const PRACTICE_BANK = {
  1: { q: "Which system is most suitable for very large scientific calculations?", choices: ["Tablet", "Supercomputer", "Embedded system", "Smartphone"], answer: 1, why: "A supercomputer is designed for extremely demanding scientific and mathematical workloads." },
  2: { q: "Which stage of IPOS presents the result to the user?", choices: ["Input", "Processing", "Storage", "Output"], answer: 3, why: "Output is the information produced after processing." },
  3: { q: "Which is an advantage of cloud storage?", choices: ["It never needs security", "It always works without Internet", "Files can be accessed from different locations", "It has no cost"], answer: 2, why: "Cloud storage can make authorised remote access easier." },
  4: { q: "Which technology reads shaded examination responses?", choices: ["OCR", "OMR", "MICR", "3D printing"], answer: 1, why: "OMR detects marks placed in predetermined positions." },
  5: { q: "A monitor has no image. What should be checked first?", choices: ["Delete all files", "Display power and cable connections", "Replace the operating system", "Format the storage drive"], answer: 1, why: "Basic troubleshooting begins with simple physical checks such as power and cable connections." },
  6: { q: "A mark must be between 0 and 100. Which check is most suitable?", choices: ["Length check", "Range check", "Proofreading", "Double entry"], answer: 1, why: "A range check tests whether a value lies within specified limits." },
  7: { q: "Which network normally covers a school computer lab?", choices: ["LAN", "WAN", "Mobile network", "Extranet"], answer: 0, why: "A LAN covers a limited local area such as a school or office." },
  8: { q: "Which device connects different networks?", choices: ["Switch", "Router", "Scanner", "Printer"], answer: 1, why: "A router forwards data between different networks." },
  9: { q: "Which technology identifies the location of a web resource?", choices: ["HTML", "URL", "FTP", "WWW"], answer: 1, why: "A URL identifies where a web resource is located." },
  10: { q: "A fake banking email asks for your password. What is this?", choices: ["Phishing", "Validation", "Mail merge", "Telemedicine"], answer: 0, why: "Phishing uses deception to trick users into revealing sensitive information." },
  11: { q: "Which control helps protect files if a laptop is stolen?", choices: ["Encryption", "Page numbering", "Word count", "Sorting"], answer: 0, why: "Encryption makes stored information difficult to read without the correct key or credentials." },
  12: { q: "Who studies requirements and helps design information-system solutions?", choices: ["Systems analyst", "Printer operator", "Social-media user", "Data-entry clerk"], answer: 0, why: "A systems analyst studies needs and helps design suitable system solutions." },
  13: { q: "Which feature changes every occurrence of the same word efficiently?", choices: ["Search and replace", "Mail merge", "Word count", "Footnote"], answer: 0, why: "Search and replace finds repeated text and substitutes new text." },
  14: { q: "Which feature creates personalised letters from one standard document?", choices: ["Mail merge", "Track changes", "Page break", "Word count"], answer: 0, why: "Mail merge combines a primary document with a data source." },
  15: { q: "What should be decided before creating a website?", choices: ["Purpose and audience", "Final visitor count", "Broken-link total", "Browser cache size"], answer: 0, why: "Planning starts with the site's purpose and intended audience." },
  16: { q: "Which function counts non-empty spreadsheet cells?", choices: ["COUNT", "COUNTA", "MAX", "PMT"], answer: 1, why: "COUNTA counts cells that are not empty." },
  17: { q: "Which reference stays fixed when copied?", choices: ["B4", "$B$4", "B4:B10", "4B"], answer: 1, why: "The dollar signs make both the column and row absolute." },
  18: { q: "Which chart is most suitable for showing a trend over twelve months?", choices: ["Line graph", "Pie chart", "Single cell", "Mail merge"], answer: 0, why: "A line graph is well suited to change across an ordered time sequence." },
  19: { q: "Which key uniquely identifies each record?", choices: ["Primary key", "Foreign key", "Calculated field", "Report title"], answer: 0, why: "The primary key uniquely identifies a record in a table." },
  20: { q: "Which database object retrieves records that match criteria?", choices: ["Query", "Report header", "Primary key", "Field label"], answer: 0, why: "A query retrieves records that satisfy specified conditions." },
  21: { q: "What are the three parts of an IPO chart?", choices: ["Input, Process, Output", "Internet, Program, Output", "Input, Password, Operator", "Index, Process, Object"], answer: 0, why: "IPO stands for Input, Process and Output." },
  22: { q: "Which data type is suitable for a full name?", choices: ["String", "Boolean", "Integer", "Real"], answer: 0, why: "A string stores a sequence of characters." },
  23: { q: "What does MOD return?", choices: ["The remainder after division", "The quotient only", "A Boolean value", "A string"], answer: 0, why: "MOD returns the remainder after integer division." },
  24: { q: "A program runs but calculates the wrong result. What type of error is likely?", choices: ["Logic error", "Syntax error", "Cable error", "Validation rule"], answer: 0, why: "A logic error allows the program to run but produces an incorrect result." },
  25: { q: "Which loop is suitable when the number of repetitions is known?", choices: ["FOR", "Single IF", "Assignment", "Comment"], answer: 0, why: "A FOR loop is commonly used when the repetition count is known." },
  26: { q: "Which is external documentation?", choices: ["User manual", "Variable name", "Indentation", "Source-code comment"], answer: 0, why: "A user manual is documentation supplied outside the program code." },
};

function CoreNotes({ text }) {
  const paragraphs = String(text || "").split("\n").map(item => item.trim()).filter(Boolean);
  const blocks = [];
  let current = null;

  paragraphs.forEach(line => {
    const heading = line === line.toUpperCase() && /[A-Z]/.test(line) && line.length < 80;
    if (heading) {
      current = { heading: line, body: [] };
      blocks.push(current);
    } else {
      if (!current) {
        current = { heading: "", body: [] };
        blocks.push(current);
      }
      current.body.push(line);
    }
  });

  return (
    <div className="it-core-notes">
      {blocks.map((block, index) => (
        <section className="it-note-block" key={`${block.heading}-${index}`}>
          {block.heading && <h3>{block.heading}</h3>}
          {block.body.map((line, lineIndex) => <p key={lineIndex}>{line}</p>)}
        </section>
      ))}
    </div>
  );
}

function TopicPractice({ topicId }) {
  const item = PRACTICE_BANK[topicId];
  const [choice, setChoice] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChoice(null);
    setChecked(false);
  }, [topicId]);

  if (!item) return null;
  const correct = choice === item.answer;

  return (
    <div className="it-topic-practice">
      <div className="it-practice-question">{item.q}</div>
      <div className="it-practice-options">
        {item.choices.map((option, index) => (
          <button
            type="button"
            key={option}
            className={[
              choice === index ? "selected" : "",
              checked && index === item.answer ? "correct" : "",
              checked && choice === index && !correct ? "wrong" : "",
            ].filter(Boolean).join(" ")}
            onClick={() => { setChoice(index); setChecked(false); }}
          >
            <span>{String.fromCharCode(65 + index)}</span>
            <p>{option}</p>
          </button>
        ))}
      </div>
      <div className="it-practice-check-row">
        <button type="button" className="it-primary" disabled={choice == null} onClick={() => setChecked(true)}>Check answer</button>
        {checked && (
          <div className={`it-inline-feedback ${correct ? "correct" : "wrong"}`} role="status">
            <strong>{correct ? "Correct." : "Not quite."}</strong> {item.why}
          </div>
        )}
      </div>
    </div>
  );
}

function LessonContext({ topic }) {
  return <div className="it-lesson-context">
    <article>
      <div className="it-context-label">In plain terms</div>
      <p>{topic.overview}</p>
    </article>
    <article>
      <div className="it-context-label">Why this matters</div>
      <p>{topic.whyItMatters}</p>
    </article>
    <article className="exam-focus">
      <div className="it-context-label">Exam focus</div>
      <p>{topic.examFocus}</p>
    </article>
  </div>;
}

function QuickCheck({ topic }) {
  const [shown, setShown] = React.useState({});
  const allShown = topic.quick.every((_, index) => shown[index]);

  const toggle = index => setShown(current => ({...current, [index]: !current[index]}));

  return <div className="it-quick-check-list">
    <div className="it-quick-check-toolbar">
      <p>Answer each question in your own words first, then reveal the suggested answer.</p>
      <button type="button" className="it-answer-all" onClick={() => {
        if (allShown) setShown({});
        else setShown(Object.fromEntries(topic.quick.map((_, index) => [index, true])));
      }}>{allShown ? "Hide answers" : "Show all answers"}</button>
    </div>
    {topic.quick.map((question, index) => (
      <article className="it-quick-check-item" key={question}>
        <div className="it-quick-number">{index + 1}</div>
        <div>
          <strong>{question}</strong>
          <button type="button" className="it-answer-toggle" onClick={() => toggle(index)}>
            {shown[index] ? "Hide answer" : "Show answer"}
          </button>
          {shown[index] && <div className="it-suggested-answer"><span>Suggested answer</span><p>{topic.quickAnswers[index]}</p></div>}
        </div>
      </article>
    ))}
  </div>;
}

function ExamIt({ topic }) {
  const [answer, setAnswer] = React.useState("");
  const [showGuide, setShowGuide] = React.useState(false);
  const challenge = topic.examChallenge;

  React.useEffect(() => {
    setAnswer("");
    setShowGuide(false);
  }, [topic.id]);

  return <div className="it-exam-it">
    <div className="it-exam-purpose">
      <div>
        <div className="it-context-label">What is Exam it?</div>
        <p>This is where the lesson is turned into a short examination-style task. Try it without the notes, then compare your response with the marking points.</p>
      </div>
      <div className="it-exam-badges"><span>{challenge.paper}</span><span>{challenge.marks} marks</span></div>
    </div>
    <div className="it-exam-question">
      <strong>Try this question</strong>
      <p>{challenge.prompt}</p>
      <textarea value={answer} onChange={event => setAnswer(event.target.value)} placeholder="Write your answer here before viewing the marking guide."/>
    </div>
    <div className="it-exam-it-actions">
      <button type="button" className="it-primary" onClick={() => setShowGuide(value => !value)}>{showGuide ? "Hide marking guide" : "Show marking guide"}</button>
      <span>Full timed papers are available in Practice → Information Technology.</span>
    </div>
    {showGuide && <div className="it-marking-guide">
      <strong>Marking guide</strong>
      <ol>{challenge.answerPoints.map(point => <li key={point}>{point}</li>)}</ol>
    </div>}
  </div>;
}

function TopicLesson({ topic, onBack, completed = false, onToggleComplete }) {
  const [toolOpen, setToolOpen] = useState(true);
  const [activeStep, setActiveStep] = useState("learn");
  const refs = useRef({});

  const setSectionRef = id => node => {
    if (node) refs.current[id] = node;
  };

  const moveTo = id => {
    const node = refs.current[id];
    if (!node) return;
    setActiveStep(id);
    node.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      if (typeof node.focus === "function") node.focus({ preventScroll: true });
    }, 380);
  };

  useEffect(() => {
    const nodes = LESSON_STEPS.map(step => refs.current[step.id]).filter(Boolean);
    if (!nodes.length || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target?.dataset?.lessonStep) {
        setActiveStep(visible[0].target.dataset.lessonStep);
      }
    }, { rootMargin: "-18% 0px -58% 0px", threshold: [0.05, 0.2, 0.45] });

    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [topic.id]);

  return (
    <main className="it-subject-view">
      <div className="it-shell">
        <button type="button" className="it-back" onClick={onBack}><BackIcon/><span>Back to section</span></button>

        <header className="it-topic-hero">
          <div className="it-eyebrow">CSEC Information Technology · Section {topic.section}</div>
          <h1>{topic.title}</h1>
          <p>{topic.purpose}</p>
          <div className="it-objective-pill">Specific objectives {topic.objectives}</div>
        </header>

        <section className="it-objective-coverage" aria-label="Syllabus objective coverage">
          <div className="it-objective-coverage-head">
            <div>
              <div className="it-panel-label">Syllabus coverage</div>
              <h2>What CXC expects you to know</h2>
            </div>
            <span>{objectiveCoverage.filter(item => item.topicId === topic.id).length} objective{objectiveCoverage.filter(item => item.topicId === topic.id).length === 1 ? "" : "s"} covered</span>
          </div>
          <div className="it-objective-card-grid">
            {objectiveCoverage.filter(item => item.topicId === topic.id).map(item => (
              <article className="it-objective-card" key={`${item.section}-${item.objective}`}>
                <div className="it-objective-card-number">SO {item.objective}</div>
                <strong>{item.title}</strong>
                <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <nav className="it-learning-flow" aria-label="Lesson sections">
          {LESSON_STEPS.map(step => (
            <button
              type="button"
              key={step.id}
              className={activeStep === step.id ? "active" : ""}
              aria-current={activeStep === step.id ? "location" : undefined}
              onClick={() => moveTo(step.id)}
            >
              {step.label}
            </button>
          ))}
        </nav>

        <section ref={setSectionRef("learn")} data-lesson-step="learn" tabIndex="-1" className="it-panel it-scroll-target">
          <div className="it-panel-label">Learn</div>
          <h2>Core notes</h2>
          <CoreNotes text={topic.core}/>
          <LessonContext topic={topic}/>
        </section>

        <section ref={setSectionRef("see")} data-lesson-step="see" tabIndex="-1" className="it-panel it-scroll-target">
          <div className="it-panel-label">See it</div>
          <h2>Visual guide and worked examples</h2>
          <InformationTechnologyVisuals topicId={topic.id}/>
          <div className="it-example-grid it-example-grid-spaced">
            {(topic.worked || []).map((example, index) => (
              <article className="it-example-card" key={index}>
                <span>{index + 1}</span>
                <p>{example}</p>
              </article>
            ))}
          </div>
        </section>

        <section ref={setSectionRef("try")} data-lesson-step="try" tabIndex="-1" className="it-panel it-tool-panel it-scroll-target">
          <div className="it-panel-label">Try it</div>
          <div className="it-tool-heading">
            <div>
              <h2>SPARK interactive</h2>
              <p>{(topic.tools || []).join(" · ")}</p>
            </div>
            <button type="button" className="it-primary" onClick={() => setToolOpen(value => !value)}>
              {toolOpen ? "Hide interactive" : "Open interactive"}
            </button>
          </div>
          {toolOpen && <InformationTechnologyTools topicId={topic.id}/>}
        </section>

        <section ref={setSectionRef("practice")} data-lesson-step="practice" tabIndex="-1" className="it-panel it-scroll-target">
          <div className="it-panel-label">Practise it</div>
          <h2>Try one yourself</h2>
          <p className="it-section-intro">Choose an answer first. SPARK will explain the result after you check it.</p>
          <TopicPractice topicId={topic.id}/>
        </section>

        <section ref={setSectionRef("check")} data-lesson-step="check" tabIndex="-1" className="it-panel it-scroll-target">
          <div className="it-panel-label">Check it</div>
          <h2>CXC-style quick check</h2>
          <QuickCheck topic={topic}/>
        </section>

        <section ref={setSectionRef("exam")} data-lesson-step="exam" tabIndex="-1" className="it-panel it-scroll-target">
          <div className="it-panel-label">Exam it</div>
          <h2>Apply it under exam conditions</h2>
          <ExamIt topic={topic}/>
          <div className="it-lesson-completion">
            <button
              type="button"
              className={completed ? "it-primary done" : "it-primary"}
              onClick={() => onToggleComplete?.(!completed)}
            >
              {completed ? "✓ Lesson marked complete" : "Mark lesson complete"}
            </button>
            <span>Completion is recorded in your Information Technology progress and reports.</span>
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionView({ section, onBack, onOpenTopic }) {
  const topics = course.topics.filter(topic => topic.section === section.id);

  return (
    <main className="it-subject-view">
      <div className="it-shell">
        <button type="button" className="it-back" onClick={onBack}><BackIcon/><span>All sections</span></button>
        <header className="it-section-hero">
          <div className="it-eyebrow">Section {section.id}</div>
          <h1>{section.title}</h1>
          <p>{topics.length} SPARK topics covering {section.objectives} CXC specific objectives.</p>
        </header>

        <div className="it-topic-grid">
          {topics.map((topic, index) => (
            <button type="button" className="it-topic-card" key={topic.id} onClick={() => onOpenTopic(topic.id)}>
              <span className="it-topic-number">{String(topic.id).padStart(2, "0")}</span>
              <span className="it-topic-copy">
                <small>Topic {index + 1} of {topics.length}</small>
                <strong>{topic.title}</strong>
                <span>{topic.purpose}</span>
                <em>Objectives {topic.objectives}</em>
              </span>
              <span className="it-open-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function InformationTechnologySubjectView({ onBack, userId, onActivity }) {
  const {
    sectionId,
    setSectionId,
    topicId,
    setTopicId,
    labsOpen,
    setLabsOpen,
  } = useInformationTechnologyStudyRoute(course.sections, course.topics);
  const [lessonProgress, setLessonProgress] = useState(() => readInformationTechnologyStudyProgress(userId));

  useEffect(() => {
    setLessonProgress(readInformationTechnologyStudyProgress(userId));
  }, [userId]);

  const setLessonCompleted = (topicItem, completed) => {
    if (!topicItem) return;
    const key = `lesson:${topicItem.id}`;
    setLessonProgress(current => {
      const next = { ...current, [key]: Boolean(completed) };
      writeInformationTechnologyStudyProgress(userId, next);
      return next;
    });
    onActivity?.({
      type: "it_lesson_completion",
      topicId: String(topicItem.id),
      section: String(topicItem.section),
      title: topicItem.title,
      completed: Boolean(completed),
      at: new Date().toISOString(),
    });
  };

  const stats = useMemo(() => ({
    sections: course.sections.length,
    topics: course.topics.length,
    objectives: course.sections.reduce((sum, section) => sum + section.objectives, 0),
  }), []);

  const section = sectionId ? course.sections.find(item => item.id === sectionId) : null;
  const topic = topicId ? course.topics.find(item => item.id === topicId) : null;

  if (topic) return <TopicLesson topic={topic} completed={Boolean(lessonProgress[`lesson:${topic.id}`])} onToggleComplete={value => setLessonCompleted(topic, value)} onBack={() => setTopicId(null)}/>;
  if (labsOpen) return <InformationTechnologyPracticalLabs userId={userId} onActivity={onActivity} onBack={() => setLabsOpen(false)}/>;
  if (section) return <SectionView section={section} onBack={() => setSectionId(null)} onOpenTopic={setTopicId}/>;

  return (
    <main className="it-subject-view">
      <div className="it-shell">
        <header className="it-hero">
          <div>
            {onBack && <button type="button" className="it-back" onClick={onBack}><BackIcon/><span>Back</span></button>}
            <div className="it-eyebrow">CSEC Information Technology</div>
            <h1>Choose a section</h1>
            <p>Learn the theory, see how it works and practise with SPARK tools built around the current CSEC Information Technology syllabus.</p>
          </div>
          <div className="it-stats" aria-label="Information Technology course coverage">
            <div><strong>{stats.sections}</strong><span>sections</span></div>
            <div><strong>{stats.topics}</strong><span>topics</span></div>
            <div><strong>{stats.objectives}</strong><span>objectives</span></div>
          </div>
        </header>

        <section className="it-practical-labs-launch">
          <button type="button" onClick={() => setLabsOpen(true)}>
            <span className="it-practical-labs-mark">LAB</span>
            <span>
              <small>Hands-on practice</small>
              <strong>SPARK Practical Labs</strong>
              <p>Work inside interactive Word, Excel, Access, PowerPoint, web-design and programming simulators. Complete real tasks and record them in your progress.</p>
            </span>
            <b aria-hidden="true">↗</b>
          </button>
        </section>

        <section className="it-section-grid">
          {course.sections.map(sectionItem => {
            const topicCount = course.topics.filter(topicItem => topicItem.section === sectionItem.id).length;
            return (
              <button type="button" className="it-section-card" key={sectionItem.id} onClick={() => setSectionId(sectionItem.id)}>
                <span className="it-section-code">{sectionItem.id}</span>
                <span className="it-section-copy">
                  <small>Available</small>
                  <strong>{sectionItem.title}</strong>
                  <span>{topicCount} topics · {sectionItem.objectives} objectives</span>
                </span>
                <span className="it-open-arrow" aria-hidden="true">↗</span>
              </button>
            );
          })}
        </section>

        <section className="it-explore-note">
          <strong>CXC Core</strong>
          <p>The examinable course follows the current syllabus. Any additional modern enrichment will be clearly labelled SPARK Explore.</p>
        </section>
      </div>
    </main>
  );
}
