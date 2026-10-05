import React, { useState } from "react";
import EnglishAPaper1Exam from "./EnglishAPaper1Exam";
import EnglishAPaper2Exam from "./EnglishAPaper2Exam";
import { englishAPastPaperArchiveSummary } from "../data/englishAPastPaperArchive";
import { englishAPaper2ArchiveSummary } from "../data/englishAPaper2Archive";
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

  if (mode === "paper2") {
    return (
      <EnglishAPaper2Exam
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

        <div className="ea-practice-mode-grid">
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

          <section className="ea-practice-card">
            <span className="ea-practice-eyebrow">REVISED 2027 FORMAT</span>
            <h2>English A Paper 2</h2>
            <p>
              Practise full written papers with informative, literary and persuasive
              responses. Each original SPARK paper follows the revised three-module
              120-mark structure and gives a detailed marking rubric after submission.
            </p>
            <div className="ea-practice-specs">
              <span>6 responses</span>
              <span>165 minutes</span>
              <span>120 marks</span>
              <span>40 marks per module</span>
              <span>3 full practice sets</span>
            </div>
            <button type="button" className="ea-practice-primary" onClick={() => setMode("paper2")}>
              Open Paper 2 Simulator
            </button>
          </section>
        </div>

        <section className="ea-practice-source-note">
          <strong>Built from your English A past-paper archives</strong>
          <p>
            Paper 1 uses {englishAPastPaperArchiveSummary.suppliedFiles} supplied source files for
            format and language-pattern review. Paper 2 has {englishAPaper2ArchiveSummary.verifiedFiles}
            verified historical files from {englishAPaper2ArchiveSummary.years[0]} to {englishAPaper2ArchiveSummary.years[1]},
            with no filename/content mismatches found in the Paper 2 archive. The original SPARK simulators
            use those historical task patterns while following the revised CXC 01/G/SYLL 25 examination structure.
          </p>
        </section>
      </div>
    </main>
  );
}
