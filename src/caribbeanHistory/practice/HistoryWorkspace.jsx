import React, { useState } from "react";
import { useSavedPracticeState } from "../../routing/usePracticeRouteState";

export const HISTORY_TOOLS = ["timeline", "source", "essay", "sba"];
const titles = { timeline: "Timeline", source: "Source analysis", essay: "Essay planner", sba: "SBA source log" };
const dates = [
  [1838, "Apprenticeship ends in British Caribbean colonies that still use it"],
  [1492, "Columbus reaches the Caribbean"],
  [1973, "Treaty of Chaguaramas establishes CARICOM"],
  [1804, "Haiti declares independence"],
  [1914, "The Panama Canal opens"],
  [1834, "British emancipation takes effect"],
];
const fields = {
  source: [
    ["Creator and date", "Who created this record, and when?"],
    ["Purpose and audience", "Who was supposed to read it? What was it meant to do?"],
    ["Evidence", "What claim could you support with a specific detail?"],
    ["Limitation and comparison", "What question would you ask a second source?"],
  ],
  essay: [
    ["Question", "Paste or write the question. Identify the command word, place and dates."],
    ["Main argument", "Give your answer in one sentence."],
    ["First point and evidence", "Name an event, place or group and explain the link."],
    ["Second point and evidence", "Add a different reason or a comparison."],
    ["Third point and evidence", "What other factor or perspective matters?"],
    ["Judgement", "How do the points fit together? Which mattered most and why?"],
  ],
  sba: [
    ["Research question", "Name a specific place, time period and historical issue."],
    ["Source 1", "Record the creator, title, date, page or link and a useful detail."],
    ["Source 2", "Record a second source with a different purpose or point of view."],
    ["Compare the sources", "Where do they agree? What can each one tell you?"],
    ["Next step", "What evidence still needs to be found or checked?"],
  ],
};

export default function HistoryWorkspace({ userId, tool, onToolChange }) {
  const [notes, setNotes] = useSavedPracticeState(`spark:caribbean-history:workspace:v1:${userId || "guest"}`, {});
  const [datesChosen, setDatesChosen] = useState({});
  const [checked, setChecked] = useState(false);
  return <section className="poa-library-card ch-workspace">
    <h1>History skills workshop</h1>
    <div className="poa-library-tabs" role="group" aria-label="History tools">
      {HISTORY_TOOLS.map(id => <button type="button" key={id} aria-pressed={tool === id} onClick={() => onToolChange(id)}>{titles[id]}</button>)}
    </div>
    {tool === "timeline" ? <>
      <h2>Match the event to its year</h2>
      <div className="ch-workshop-fields">
        {dates.map(([year, event]) => <label key={year}>{event}
          <select value={datesChosen[year] || ""} onChange={e => { setChecked(false); setDatesChosen({ ...datesChosen, [year]: e.target.value }); }}>
            <option value="">Choose a year</option>
            {dates.map(([date]) => date).sort((a, b) => a - b).map(date => <option key={date} value={date}>{date}</option>)}
          </select>
          {checked && <span>{Number(datesChosen[year]) === year ? "Correct" : `Correct year: ${year}`}</span>}
        </label>)}
      </div>
      <button className="oa-primary" type="button" disabled={dates.some(([year]) => !datesChosen[year])} onClick={() => setChecked(true)}>Check years</button>
      {checked && <p role="status">{dates.filter(([year]) => Number(datesChosen[year]) === year).length} of {dates.length} correct.</p>}
    </> : <>
      <h2>{titles[tool]}</h2>
      {tool === "source" && <blockquote className="ch-exam-source">Practice source · SPARK summary of a Barbados governor’s proclamation, 1834. Apprentices continued to owe labour to their former owners. A magistrate could hear complaints, and apprentices had limited time to work for their own pay.</blockquote>}
      <div className="ch-workshop-fields">
        {fields[tool].map(([label, hint], i) => <label key={label}>{label}<span>{hint}</span>
          <textarea rows={3} maxLength={8000} value={notes[tool]?.[i] || ""}
            onChange={event => setNotes(previous => ({ ...previous, [tool]: { ...previous[tool], [i]: event.target.value } }))} />
        </label>)}
      </div>
      <p>Drafts are saved on this device.</p>
      {tool === "source" && <details><summary>Compare your analysis</summary><p>The proclamation is useful for what the government expected apprenticeship to do. It cannot show whether a particular apprentice could use their free time or get a fair hearing. Test the official account against testimony or magistrates’ records.</p></details>}
    </>}
  </section>;
}
