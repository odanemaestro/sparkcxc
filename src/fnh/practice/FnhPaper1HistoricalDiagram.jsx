import React from "react";
import "./fnhPaper1HistoricalDiagram.css";
// SVG redraws based on user-provided CSEC Food and Nutrition May/June 2004 Paper 1.
// These figures are retained with the draft bank until all 60 source questions
// and correct answer keys pass independent verification.
export default function FnhPaper1HistoricalDiagram({type}){
 if(type==="place-setting-2004")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 660 350" role="img" aria-label="2004 question 25: Plate at centre, napkin and knife A on left, fork B and spoon C on right, spoon D and knife E above the plate.">
   <title>2004 Paper 1 Question 25, labelled place setting</title>
   <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
    <rect x="48" y="44" width="564" height="260" rx="4" strokeWidth="1.5"/>
    <circle cx="330" cy="184" r="91"/><circle cx="330" cy="184" r="85" strokeWidth="1"/>
    <path d="M120 210 L183 147 L183 263 Z"/>
    <path d="M235 118 L235 260 Q243 271 251 260 L251 119 Q247 105 243 105 Q239 105 235 118 Z" strokeWidth="2"/>
    <path d="M461 132 L461 235 Q470 255 479 235 L479 132 M462 133 L462 119 M468 133 L468 119 M474 133 L474 119 M480 133 L480 119" strokeWidth="2"/>
    <path d="M508 152 L508 252 Q518 271 528 252 L528 152 C528 121 508 121 508 152 Z" strokeWidth="2"/>
    <path d="M285 70 H410 M287 70 C272 66 272 57 287 55 H410 Q425 63 410 70" strokeWidth="2"/>
    <path d="M285 96 L410 96 M285 89 L410 89 M285 89 C275 88 275 97 285 96" strokeWidth="2"/>
   </g>
   <g fill="currentColor" fontFamily="Georgia,serif" fontSize="20" fontWeight="700">
    <text x="238" y="291">A</text><text x="462" y="286">B</text><text x="510" y="287">C</text>
    <text x="262" y="72">D</text><text x="262" y="98">E</text>
   </g>
  </svg>
  <figcaption>Figure for Question 25. Identifiers A–E follow the original source; positions are intended for student interpretation.</figcaption>
 </figure>;
 if(type==="kitchen-u-shaped-2004")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 650 400" role="img" aria-label="2004 question 52: U-shaped kitchen floor plan with three counters, cooker on left, sink along upper wall and refrigerator on right.">
   <title>2004 Paper 1 Question 52, kitchen layout</title>
   <g fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M122 55 H520 V335 H451 V122 H190 V335 H122 Z" strokeWidth="3"/>
    <rect x="266" y="65" width="115" height="40" rx="3"/>
    <path d="M279 80 H369 M281 90 H367" strokeWidth="2"/>
    <circle cx="308" cy="74" r="4"/><circle cx="344" cy="74" r="4"/>
    <rect x="132" y="190" width="46" height="80"/>
    <circle cx="146" cy="212" r="8"/><circle cx="165" cy="212" r="8"/><circle cx="146" cy="248" r="8"/><circle cx="165" cy="248" r="8"/>
    <rect x="454" y="230" width="62" height="74"/>
    <path d="M454 245 H516"/>
   </g>
   <text x="485" y="276" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="19" fontWeight="700" fill="currentColor">REF</text>
  </svg>
  <figcaption>Question 52. Source-style floor plan with cooker, sink and refrigerator along three connected work runs.</figcaption>
 </figure>;
 if(type==="refrigerator-table-2004")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 650 330" role="img" aria-label="2004 question 58 table of refrigerator food placement: columns Door, Crisper and Freezing Compartment; rows I lettuce eggs beef, II lettuce beef eggs, III eggs lettuce beef, IV eggs beef beef.">
   <title>2004 Paper 1 Question 58, refrigerator storage table</title>
   <g stroke="currentColor" fill="none" strokeWidth="2">
    <rect x="60" y="40" width="530" height="237"/>
    <path d="M130 40 V277 M280 40 V277 M428 40 V277 M60 94 H590 M60 140 H590 M60 186 H590 M60 232 H590"/>
   </g>
   <g fontFamily="Georgia,serif" fontSize="18" fill="currentColor" textAnchor="middle">
    <text x="205" y="72" fontWeight="700">Door</text><text x="354" y="72" fontWeight="700">Crisper</text>
    <text x="508" y="61" fontWeight="700">Freezing</text><text x="508" y="82" fontWeight="700">compartment</text>
    {["I.","II.","III.","IV."].map((v,i)=><text key={v} x="96" y={124+i*46}>{v}</text>)}
    {[
      ["lettuce","eggs","beef"],["lettuce","beef","eggs"],
      ["eggs","lettuce","beef"],["eggs","beef","beef"]
    ].map((row,i)=>row.map((v,j)=><text key={i+"-"+j} x={[205,354,508][j]} y={124+i*46}>{v}</text>))}
   </g>
  </svg>
  <figcaption>Question 58. The four original refrigerator-position rows are preserved for multiple-choice interpretation.</figcaption>
 </figure>;
 return null;
}
