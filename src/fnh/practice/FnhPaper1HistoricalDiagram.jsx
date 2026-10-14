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

 // Reconstructed from the user-supplied 2018 Paper 01 scan. These source-style
 // figures are for examination context, not independent marking evidence.
 if(type==="place-setting-2018")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 640 355" role="img" aria-label="2018 question 12, place setting: napkin and knife V left of plate, spoon III and knife IV above, fork I and spoon II to the right.">
   <title>2018 Paper 01 Question 12, five labelled pieces of cutlery</title>
   <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
    <rect x="45" y="40" width="550" height="260"/><circle cx="333" cy="188" r="101"/>
    <path d="M86 207 L158 135 L158 273 Z"/><path d="M190 118 Q184 110 182 135 L182 273 Q188 288 194 272 L194 138 Q194 124 190 118 Z"/>
    <path d="M222 62 C210 50 229 45 245 50 L358 50 Q379 57 360 64 L244 64 C235 71 218 69 222 62 Z"/>
    <path d="M218 86 H366 Q381 84 371 92 L215 92 Q204 88 218 86 Z"/>
    <path d="M466 137 L466 258 Q472 273 478 258 L478 137 M466 138 V125 M470 138 V125 M474 138 V125 M478 138 V125"/>
    <ellipse cx="520" cy="151" rx="15" ry="26"/><path d="M520 177 V260 Q526 276 531 259 L531 174"/>
   </g>
   <g fill="currentColor" fontFamily="Georgia,serif" fontSize="22" fontWeight="600">
    <text x="175" y="292">V</text><text x="200" y="63">III</text><text x="199" y="93">IV</text>
    <text x="459" y="288">I</text><text x="514" y="288">II</text>
   </g>
  </svg><figcaption>Question 12. Source-style place setting. The Roman numerals follow the original cutlery labels.</figcaption>
 </figure>;
 if(type==="luncheon-menu-2018")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 750 230" role="img" aria-label="Question 43, three-column luncheon menu listing stewed beef and dumplings, baked chicken and rice, and curried chicken and roti.">
   <title>2018 Paper 01 Question 43, luncheon menu</title>
   <g fill="none" stroke="currentColor" strokeWidth="2"><rect x="18" y="20" width="714" height="187"/><path d="M256 20 V207 M494 20 V207"/></g>
   <g fill="currentColor" fontSize="19" fontFamily="Georgia,serif" textAnchor="middle">
    <text x="137" y="66">Stewed Beef</text><text x="137" y="114">Dumplings</text><text x="137" y="162">Stewed Lentils</text>
    <text x="375" y="66">Baked Chicken</text><text x="375" y="114">Boiled Rice</text><text x="375" y="162">Stewed Pigeon Peas</text>
    <text x="613" y="50">Curried Chicken</text><text x="613" y="94">Roti (Shells/Skins)</text>
    <text x="613" y="140">Curried Potato or</text><text x="613" y="166">Channa or Chickpeas</text>
   </g>
  </svg><figcaption>Question 43. Three sample luncheon menus in the same column order as the source.</figcaption>
 </figure>;
 if(type==="kitchen-u-shaped-2018")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 620 445" role="img" aria-label="Question 44, U-shaped kitchen with cooking hob on left, sink at top, refrigerator on the right.">
   <title>2018 Paper 01 Question 44, U-shaped kitchen floor plan</title>
   <g stroke="currentColor" fill="none" strokeWidth="3">
    <path d="M100 58 H520 V373 H437 V133 H183 V373 H100 Z"/>
    <rect x="245" y="68" width="140" height="56" rx="5"/>
    <rect x="280" y="84" width="75" height="22"/>
    <path d="M250 76 H380 M253 114 H378"/>
    <circle cx="298" cy="63" r="5"/><circle cx="333" cy="63" r="5"/>
    <rect x="111" y="210" width="62" height="100" rx="4"/>
    <circle cx="129" cy="234" r="11"/><circle cx="156" cy="234" r="11"/>
    <circle cx="129" cy="278" r="11"/><circle cx="156" cy="278" r="11"/>
    <rect x="441" y="270" width="75" height="90"/><path d="M441 293 H516"/>
   </g>
   <text x="478" y="322" textAnchor="middle" fontSize="20" fill="currentColor" fontWeight="700">REF</text>
  </svg><figcaption>Question 44. Cooker at left, sink above and refrigerator on the right hand side.</figcaption>
 </figure>;
 if(type==="refrigerator-positions-2018")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 755 370" role="img" aria-label="Question 50, food storage table with Door, Crisper and Freezing Compartment columns and Rows I to IV.">
   <title>2018 Paper 01 Question 50, original refrigerator positions</title>
   <g stroke="currentColor" fill="none" strokeWidth="2">
    <rect x="18" y="22" width="719" height="315"/><path d="M120 22 V337 M315 22 V337 M515 22 V337"/>
    <path d="M18 107 H737 M18 165 H737 M18 222 H737 M18 280 H737"/>
   </g>
   <g fill="currentColor" fontFamily="Georgia,serif" fontSize="19" textAnchor="middle">
    <text x="215" y="74" fontWeight="700">Door</text><text x="416" y="74" fontWeight="700">Crisper</text>
    <text x="626" y="59" fontWeight="700">Freezing</text><text x="626" y="83" fontWeight="700">Compartment</text>
    {["I.","II.","III.","IV."].map((v,i)=><text key={v} x="68" y={146+i*57}>{v}</text>)}
    {[["Lettuce","Eggs","Beef"],["Lettuce","Beef","Eggs"],["Eggs","Lettuce","Beef"],["Beef","Lettuce","Eggs"]].map((entries,i)=>
     entries.map((entry,j)=><text key={i+"-"+j} x={[215,416,626][j]} y={146+i*57}>{entry}</text>))}
   </g>
  </svg><figcaption>Question 50. All four original arrangements and positions, retained for source interpretation.</figcaption>
 </figure>;
 if(type==="luncheon-presentation-2018")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 640 270" role="img" aria-label="Question 55 luncheon menu: baked fish and tomato sauce, vegetable rice, garden salad, golden apple pie.">
   <title>2018 Paper 01 Question 55, luncheon menu</title>
   <rect x="55" y="19" width="530" height="227" fill="none" stroke="currentColor" strokeWidth="2.5"/>
   <g fill="currentColor" fontSize="24" fontFamily="Georgia,serif" textAnchor="middle">
    <text x="320" y="68">Baked Fish/Tomato Sauce</text><text x="320" y="122">Vegetable Rice</text>
    <text x="320" y="176">Garden Salad</text><text x="320" y="230">Golden Apple Pie</text>
   </g>
  </svg><figcaption>Question 55. The four original dishes in their source order.</figcaption>
 </figure>;
 if(type==="meal-comparison-2018")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 720 350" role="img" aria-label="Question 60 comparing Meal I and Meal II. Meal I steamed fish, creamed yams, tomato slices, stewed fruit and orange juice. Meal II fried fish, peas and rice, tomato slices, jam tarts and lemonade.">
   <title>2018 Paper 01 Question 60, two meal comparisons</title>
   <g fill="none" stroke="currentColor" strokeWidth="2"><rect x="15" y="20" width="690" height="305"/><path d="M360 20 V325"/></g>
   <g fill="currentColor" fontSize="21" fontFamily="Georgia,serif" textAnchor="middle">
    <text x="187" y="57" fontWeight="700">Meal I</text><text x="534" y="57" fontWeight="700">Meal II</text>
    {["Steamed fish","Creamed yams","Tomato slices","Stewed fruit with","chocolate sauce","Orange juice"].map((s,i)=><text key={s} x="187" y={97+i*39}>{s}</text>)}
    {["Fried fish","Peas and rice","Tomato slices","Jam tarts","Lemonade"].map((s,i)=><text key={s} x="534" y={97+i*39}>{s}</text>)}
   </g>
  </svg><figcaption>Question 60. Two meals transcribed from the source for dietary suitability comparison.</figcaption>
 </figure>;

 // Source-style SVG redraws from the nine-page May/June 2020 Paper 01 scan.
 // This source lacks a cover and the historical answer keys remain unverified.
 if(type==="place-setting-2020")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 680 390" role="img" aria-label="2020 Question 10 place setting, knife V and folded napkin to the left of a circular plate, horizontal spoons III and IV above, fork I and spoon II to the right">
   <title>2020 Paper 01 Question 10, original labelled place setting</title>
   <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="46" y="34" width="588" height="304"/>
    <circle cx="347" cy="199" r="115"/>
    <path d="M94 240 L181 154 V286 Z"/>
    <path d="M211 128 Q203 126 203 145 V291 Q211 312 219 290 V146 Q219 131 211 128 Z"/>
    <path d="M300 68 C269 65 270 46 297 45 C312 45 320 55 324 62 L426 59 Q445 59 444 67 Q445 73 426 73 L324 71 C320 78 309 80 300 68 Z"/>
    <path d="M287 102 Q278 92 286 89 L435 89 Q451 95 441 101 Q428 108 424 101 Z"/>
    <path d="M483 120 V275 Q488 296 495 275 V120 M482 148 V112 M487 148 V112 M493 148 V112 M498 148 V112"/>
    <ellipse cx="554" cy="154" rx="17" ry="28"/><path d="M554 182 V279 Q560 298 567 278 V183"/>
   </g>
   <g fontSize="23" fontWeight="700" fill="currentColor" fontFamily="Georgia,serif">
    <text x="190" y="326">V</text><text x="261" y="72">III</text><text x="259" y="106">IV</text>
    <text x="482" y="313">I</text><text x="549" y="313">II</text>
   </g>
  </svg><figcaption>Question 10. Five cutlery labels follow the scanned place setting.</figcaption>
 </figure>;
 if(type==="kitchen-u-shaped-2020")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 630 470" role="img" aria-label="2020 Question 21 U-shaped kitchen floor plan with left cooker, upper sink, and right refrigerator">
   <title>2020 Paper 01 Question 21, source kitchen layout</title>
   <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
    <path d="M122 60 H520 V400 H443 V149 H203 V400 H122 Z"/>
    <rect x="257" y="80" width="158" height="49" rx="2"/>
    <path d="M275 93 H399 M275 112 H399 M300 81 V128 M371 81 V128"/>
    <circle cx="301" cy="69" r="6"/><circle cx="366" cy="69" r="6"/>
    <rect x="132" y="240" width="59" height="82"/>
    <circle cx="145" cy="261" r="10"/><circle cx="177" cy="261" r="10"/>
    <circle cx="145" cy="295" r="10"/><circle cx="177" cy="295" r="10"/>
    <rect x="446" y="280" width="72" height="117"/><path d="M446 326 H518"/>
   </g>
   <text x="482" y="311" fontSize="21" fontWeight="700" textAnchor="middle" fill="currentColor">REF</text>
  </svg><figcaption>Question 21. U-shaped kitchen with three surrounding work surfaces.</figcaption>
 </figure>;
 if(type==="caribbean-dishes-2020")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 900 335" role="img" aria-label="2020 Question 35 ingredient table: Split-pea Soup: green split-peas, fresh beef, dumplings, green plantains, seasonings and herbs. Pelau: chicken, rice, dried pigeon peas, seasonings and herbs. Chicken Roti: chicken, roti shells or skins, potatoes, curry, seasonings.">
   <title>2020 Paper 01 Question 35, three local-dishes ingredients table</title>
   <g fill="none" stroke="currentColor" strokeWidth="2"><rect x="16" y="21" width="868" height="288"/><path d="M311 21 V309 M583 21 V309 M16 77 H884"/></g>
   <g fontFamily="Georgia,serif" fill="currentColor" fontSize="23">
    <text x="29" y="56" fontWeight="700">Split-pea Soup</text>
    <text x="326" y="56" fontWeight="700">Pelau</text>
    <text x="599" y="56" fontWeight="700">Chicken Roti</text>
    {["Green split-peas","Fresh beef","Dumplings","Green plantains","Seasonings/herbs"].map((t,i)=><text key={t} x="29" y={110+i*41}>{t}</text>)}
    {["Chicken","Rice","Dried pigeon peas","Seasonings/herbs"].map((t,i)=><text key={t} x="326" y={110+i*41}>{t}</text>)}
    {["Chicken","Roti (shells/skins)","Potatoes","Curry","Seasonings"].map((t,i)=><text key={t} x="599" y={110+i*41}>{t}</text>)}
   </g>
  </svg><figcaption>Question 35. Ingredients of three local dishes, with their original column order.</figcaption>
 </figure>;
 if(type==="refrigerator-storage-2020")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 760 340" role="img" aria-label="2020 Question 38 refrigerator table. Door Crisper Freezing Compartment; row I lettuce eggs beef; row II lettuce beef eggs; row III eggs lettuce beef; row IV eggs beef beef.">
   <title>2020 Paper 01 Question 38, refrigerator food positions</title>
   <g fill="none" stroke="currentColor" strokeWidth="2"><rect x="18" y="18" width="726" height="298"/><path d="M117 18 V316 M300 18 V316 M523 18 V316"/><path d="M18 97 H744 M18 152 H744 M18 207 H744 M18 262 H744"/></g>
   <g fontFamily="Georgia,serif" fontSize="22" fill="currentColor" textAnchor="middle">
    <text x="208" y="68" fontWeight="700">Door</text><text x="412" y="68" fontWeight="700">Crisper</text>
    <text x="634" y="53" fontWeight="700">Freezing</text><text x="634" y="80" fontWeight="700">Compartment</text>
    {["I.","II.","III.","IV."].map((t,i)=><text key={t} x="67" y={132+i*55}>{t}</text>)}
    {[["Lettuce","Eggs","Beef"],["Lettuce","Beef","Eggs"],["Eggs","Lettuce","Beef"],["Eggs","Beef","Beef"]].map((r,i)=>r.map((txt,j)=><text key={i+"-"+j} x={[208,412,634][j]} y={132+i*55}>{txt}</text>))}
   </g>
  </svg><figcaption>Question 38. All four original rows are retained, including two entries for beef in Row IV.</figcaption>
 </figure>;
 if(type==="luncheon-presentation-2020")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 710 290" role="img" aria-label="2020 Question 60 menu containing baked fish with tomato sauce, vegetable rice, garden salad and golden apple pie">
   <title>2020 Paper 01 Question 60, luncheon menu stimulus</title>
   <rect x="71" y="24" width="568" height="242" fill="none" stroke="currentColor" strokeWidth="2.3"/>
   <g fill="currentColor" fontFamily="Georgia,serif" fontSize="27" textAnchor="middle">
    <text x="355" y="79">Baked Fish/Tomato Sauce</text>
    <text x="355" y="137">Vegetable Rice</text>
    <text x="355" y="195">Garden Salad</text>
    <text x="355" y="252">Golden Apple Pie</text>
   </g>
  </svg><figcaption>Question 60. Source menu and sequence retained for garnish selection.</figcaption>
 </figure>;
 // Source-checked visual stimuli reused across 2018–2020 examinations.
 // Preserve each year's question and option order in its own data bank.
 if(type==="meal-comparison-2019")return <FnhPaper1HistoricalDiagram type="meal-comparison-2018"/>;
 if(type==="kitchen-u-shaped-2019")return <FnhPaper1HistoricalDiagram type="kitchen-u-shaped-2020"/>;
 if(type==="luncheon-presentation-2019")return <FnhPaper1HistoricalDiagram type="luncheon-presentation-2020"/>;

 // Technical Proficiency 2026: original label/food figures.
 if(type==="guava-jam-label-2026")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 760 380" role="img" aria-label="2026 question 11, ILL'S GUAVA JAM label, ingredients guava pulp sugar pectin, net weight 4 without unit, manufacture date and use by date">
   <title>2026 Paper 01 Question 11, source guava-jam label</title>
   <rect x="72" y="38" width="622" height="298" fill="none" stroke="currentColor" strokeWidth="3"/>
   <g fill="currentColor" fontFamily="Georgia,serif" fontSize="29">
    <text x="382" y="91" textAnchor="middle" fontWeight="700">ILL’S GUAVA JAM</text>
    <text x="107" y="154">Ingredients: Guava pulp, sugar, pectin</text>
    <text x="107" y="199">Net Weight: 4</text>
    <text x="107" y="244">Manufacture Date: 2018-11-08</text>
    <text x="107" y="291">Use by Date: 2020-05-08</text>
   </g>
  </svg><figcaption>Question 11. The source prints “Net Weight: 4” without a measurement unit.</figcaption>
 </figure>;
 if(type==="nutrient-types-2026")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 660 225" role="img" aria-label="2026 Question 37, two-column table: sodium protein; carbohydrate calcium; potassium magnesium">
   <title>2026 Paper 01 Question 37, nutrient types</title>
   <g fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="22" y="26" width="616" height="176"/><path d="M330 26 V202 M22 84 H638 M22 143 H638"/></g>
   <g fill="currentColor" fontSize="30" fontFamily="Georgia,serif">
    {["Sodium","Carbohydrate","Potassium"].map((t,i)=><text key={t} x="42" y={68+i*58}>{t}</text>)}
    {["Protein","Calcium","Magnesium"].map((t,i)=><text key={t} x="353" y={68+i*58}>{t}</text>)}
   </g>
  </svg><figcaption>Question 37. Six nutrients in the original table order.</figcaption>
 </figure>;
 if(type==="nutrition-label-2026")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 790 730" role="img" aria-label="2026 Question 56 nutrition label includes sodium 850 g 37%, as printed in source">
   <title>2026 Paper 01 Question 56, snack nutrition label</title>
   <rect x="65" y="26" width="650" height="663" stroke="currentColor" strokeWidth="3" fill="none"/>
   <g fill="currentColor" fontFamily="Arial,sans-serif" fontSize="23">
    <text x="690" y="65" textAnchor="end" fontSize="18" fontWeight="700">% Daily Value*</text>
    {[
      ["Total Fat 9 g","12%",true],
      ["Saturated Fat 4.5 g","23%",false],
      ["Trans Fat 0 g","",false],
      ["Cholesterol 35 mg","12%",true],
      ["Sodium 850 g","37%",true],
      ["Total Carbohydrate 34 g","12%",true],
      ["Dietary Fibre 4 g","14%",false],
      ["Total Sugars 6 g","",false],
      ["Includes 0 g Added Sugars","0%",false],
      ["Protein 15 g","",true],
      ["Vitamin D 0 mcg","0%",false],
      ["Calcium 320 mg","25%",false],
      ["Iron 1.6 mg","8%",false],
      ["Potassium 510 mg","10%",false],
    ].map(([name,pct,strong],i)=>{
      const y=103+i*41;
      return <g key={name}>
        <text x={i===1||i===2||i===6||i===7||i===8?105:82} y={y} fontWeight={strong?"700":"400"}>{name}</text>
        {pct&&<text x="687" y={y} fontWeight="700" textAnchor="end">{pct}</text>}
        <path d={"M80 "+(y+9)+" H700"} stroke="currentColor" strokeWidth={i===2||i===8||i===9?4:1.3}/>
      </g>;
    })}
   </g>
  </svg><figcaption>Question 56. The source prints “Sodium 850 g, 37%”. The unit is inconsistent and requires verification.</figcaption>
 </figure>;
 if(type==="kitchen-u-shaped-2026")return <FnhPaper1HistoricalDiagram type="kitchen-u-shaped-2020"/>;
 if(type==="meal-comparison-2026")return <FnhPaper1HistoricalDiagram type="meal-comparison-2018"/>;
 if(type==="luncheon-presentation-2026")return <FnhPaper1HistoricalDiagram type="luncheon-presentation-2020"/>;
 return null;
}
