import React, { useState } from "react";
import EnglishAPaper1Exam from "./EnglishAPaper1Exam";
import { englishAPastPaperArchiveSummary } from "../data/englishAPastPaperArchive";
import "./englishAExam.css";

export default function EnglishAPracticeHub({ supabase, userId, onBack }) {
  const [mode,setMode] = useState("home");

  if (mode === "paper1") {
    return (
      <EnglishAPaper1Exam
        supabase={supabase}
        userId={userId}
        onBack={() => setMode("home")}
      />
    );
  }

  return (
    <main className="ea-practice-shell">
      <div className="ea-practice-home">
        <header className="ea-practice-hero">
          <div>
            <span className="ea-practice-eyebrow">CSEC ENGLISH A PRACTICE</span>
            <h1>Choose a practice mode</h1>
            <p>
              Practise the revised English A Paper 01 format with original SPARK
              questions modelled on the structure, language and skill demands of
              the supplied CSEC Paper 1 archive.
            </p>
          </div>
          <button type="button" className="ea-practice-back" onClick={onBack}>
            <span aria-hidden="true">{"←"}</span> Change subject
          </button>
        </header>

        <section className="ea-practice-card">
          <span className="ea-practice-eyebrow">FULL EXAMINATION SIMULATOR</span>
          <h2>English A Paper 1</h2>
          <p>
            Sit a complete 60-item paper covering Informative, Literary and
            Persuasive Discourse. Each module contains 5 discrete language items
            and 15 reading-comprehension items based on two stimuli.
          </p>
          <div className="ea-practice-specs">
            <span>60 questions</span>
            <span>90 minutes</span>
            <span>60 marks</span>
            <span>20 questions per module</span>
            <span>Automatic marking</span>
          </div>
          <button type="button" className="ea-practice-primary" onClick={() => setMode("paper1")}>
            Open Paper 1 Simulator
          </button>
        </section>

        <section className="ea-practice-source-note">
          <strong>Built from your English A Paper 1 archive</strong>
          <p>
            SPARK has indexed {englishAPastPaperArchiveSummary.suppliedFiles} supplied source files
            for format and language-pattern review. {englishAPastPaperArchiveSummary.confirmedPaper1Files} are
            confirmed Paper 01 files; one supplied file has a filename/content mismatch and is held out of
            Paper 01 extraction until it is corrected. The live simulator questions are newly written so
            students get fresh practice without simply memorising past-paper answers.
          </p>
        </section>
      </div>
    </main>
  );
}
