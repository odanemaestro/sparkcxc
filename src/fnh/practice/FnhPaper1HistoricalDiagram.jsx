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
 // Source-style redraw from the supplied 2014 Question 23 and 2005 Question 23
 // scanned table illustration. It retains the four full place settings, side
 // dishes, shared condiments, centre numbers and service layout.
 if(type==="lunch-table-2014")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 920 590" role="img" aria-label="Rectangular dining table with four complete settings around its edges. A central collection of shared serving dishes, condiments marked 1 2 3 4 5 6 8, utensils and food appears between the settings.">
   <title>2014 Paper 1 Question 23, four-place table setting with centre dishes</title>
   <g stroke="currentColor" fill="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
    <rect x="22" y="26" width="876" height="538" strokeWidth="3.6"/>
    {[[332,107],[135,305],[332,480],[775,310]].map(([x,y],i)=><g key={i}>
     <circle cx={x} cy={y} r="53"/><circle cx={x} cy={y} r="34"/>
    </g>)}
    <ellipse cx="102" cy="120" rx="65" ry="54"/><path d="M40 119 H164 M77 71 Q100 129 78 170 M126 72 Q100 126 124 166"/>
    <ellipse cx="803" cy="118" rx="57" ry="64"/><path d="M747 119 H860 M780 60 Q805 118 779 178 M830 59 Q803 114 831 177"/>
    <ellipse cx="200" cy="473" rx="52" ry="60"/><path d="M153 472 H247 M177 420 Q200 476 178 524 M224 420 Q200 475 225 526"/>
    <ellipse cx="836" cy="466" rx="56" ry="53"/><path d="M786 469 H889 M813 424 Q835 467 812 513 M857 422 Q838 469 857 515"/>
    {[ [179,98],[218,98],[252,98],[388,93],[389,468],[427,469],[459,469],[690,420],[718,420],
      [152,418],[149,448],[149,478],[679,178],[679,209],[679,242],[825,251],[825,284],[825,317] ].map(([x,y],i)=>
     <path key={i} d={"M"+x+" "+y+" v66"} strokeWidth="5"/>)}
    <circle cx="628" cy="132" r="25"/><circle cx="628" cy="132" r="13"/>
    <circle cx="556" cy="268" r="40"/><circle cx="556" cy="268" r="24"/>
    {[ [609,236],[687,252],[620,302],[696,317] ].map(([x,y],i)=><g key={i}>
      <circle cx={x} cy={y} r="31"/><path d={"M"+(x-14)+" "+(y+6)+" q-10 -27 6 -24 q15 -10 18 11"} />
    </g>)}
    <circle cx="474" cy="224" r="32"/><circle cx="399" cy="328" r="26"/>
    {[ [352,250],[369,272],[349,281] ].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="10"/>
       {[[-3,-3],[4,-1],[-1,5]].map(([dx,dy],j)=><circle key={j} cx={x+dx} cy={y+dy} r="1.5" fill="currentColor" stroke="none"/>)}
    </g>)}
    <ellipse cx="753" cy="102" rx="13" ry="7"/>
    <ellipse cx="734" cy="94" rx="9" ry="6"/>
   </g>
   <g fill="currentColor" fontFamily="Georgia,serif" fontSize="22" textAnchor="middle">
    <text x="628" y="140">2</text><text x="651" y="91">1</text><text x="651" y="117">3</text>
    <text x="474" y="232">5</text><text x="399" y="335">4</text>
    <text x="373" y="305">6</text><text x="556" y="275">8</text>
   </g>
  </svg><figcaption>Question 23. The original scan has four place settings with shared dishes, cutlery and numbered items.</figcaption>
 </figure>;
 if(type==="two-menus-2014")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 840 402" role="img" aria-label="Meal comparison table. Meal I steamed fish, creamed yams, tomato slices, stewed fruit with chocolate sauce, orange juice. Meal II fried fish, peas and rice, tomato slices, jam tarts, lemonade.">
   <title>2014 Paper 1 Questions 39 and 40, Meal I and Meal II table</title>
   <g fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="40" y="34" width="760" height="336"/><path d="M420 34 V370"/></g>
   <g fill="currentColor" fontFamily="Georgia,serif" textAnchor="middle">
    <text x="228" y="81" fontWeight="700" fontSize="31">Meal I</text>
    <text x="610" y="81" fontWeight="700" fontSize="31">Meal II</text>
    {["Steamed fish","Creamed yams","Tomato slices","Stewed fruit with","chocolate sauce","Orange juice"].map((t,i)=><text key={i} x="229" y={134+42*i} fontSize="25">{t}</text>)}
    {["Fried fish","Peas and rice","Tomato slices","Jam tarts","Lemonade"].map((t,i)=><text key={i} x="610" y={134+48*i} fontSize="25">{t}</text>)}
   </g>
  </svg><figcaption>Questions 39–40. The original two-meal comparison and its food choices are retained.</figcaption>
 </figure>;
 if(type==="food-safety-2014")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 840 510" role="img" aria-label="Food safety poster with four sections: CLEAN, wash hands and surfaces often; SEPARATE, don't cross-contaminate; CHILL, refrigerator; COOK, cook to appropriate temperature. Central circle has crossed-out bacteria.">
   <title>2014 Paper 1 Questions 48 and 49, Clean Separate Chill Cook poster</title>
   <g stroke="currentColor" fill="none" strokeWidth="3">
    <rect x="26" y="24" width="788" height="458" strokeWidth="4"/>
    <path d="M420 24 V482 M26 250 H814"/>
    <path d="M63 82 H310 V100 H287 V120 Q287 125 293 125 H311 M272 116 V151" strokeLinecap="round" strokeLinejoin="round" strokeWidth="9"/>
    {[[-26,0],[-10,12],[6,14],[24,1]].map(([dx,dy],i)=><circle key={i} cx={291+dx} cy={180+dy} r="4" fill="currentColor"/> )}
    <path d="M567 169 q-42 -35 0 -62 q40 -24 75 12 q17 30 -16 49 z" />
    <path d="M543 160 L657 198 M552 187 L684 148"/>
    <rect x="103" y="340" width="112" height="119" rx="7"/><path d="M103 394 H215"/>
    {[0,1,2].map((i)=><path key={i} d={"M"+(526+i*55)+" 422 q-22 -35 0 -59 q24 18 0 59z"}/>)}
    <circle cx="418" cy="256" r="103" fill="none" strokeWidth="9"/>
    <circle cx="418" cy="256" r="60" strokeWidth="3"/>
    {[ [390,240],[453,239],[419,285],[449,291],[379,283] ].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="13"/> )}
    <path d="M346 184 L489 328" strokeWidth="18"/>
   </g>
   <g fill="currentColor" fontFamily="Georgia,serif">
    <text x="52" y="291" fontSize="30" fontWeight="700">CLEAN</text>
    <text x="52" y="324" fontSize="22">Wash hands and</text><text x="52" y="350" fontSize="22">surfaces often</text>
    <text x="451" y="64" fontSize="30" fontWeight="700">SEPARATE</text>
    <text x="451" y="97" fontSize="21">Don't cross-contaminate</text>
    <text x="49" y="462" fontSize="30" fontWeight="700">CHILL</text>
    <text x="447" y="290" fontSize="30" fontWeight="700">COOK</text>
    <text x="447" y="320" fontSize="21">Cook to appropriate</text><text x="447" y="344" fontSize="21">temperature</text>
   </g>
  </svg><figcaption>Questions 48–49. The source uses four food-safety actions: clean, separate, chill and cook.</figcaption>
 </figure>;
 if(type==="preschool-lunch-2014")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 800 280" role="img" aria-label="Preschool lunch list, cookies, chicken sandwich, chocolate cupcake and peanut punch.">
   <title>2014 Paper 1 Questions 57–58, preschool lunch list</title>
   <rect x="24" y="23" width="752" height="233" stroke="currentColor" fill="none" strokeWidth="2.4"/>
   <g fontFamily="Georgia,serif" fontSize="29" fill="currentColor" textAnchor="middle">
    <text x="400" y="76" fontWeight="700">A preschooler's school lunch</text>
    <text x="400" y="136">Cookies, chicken sandwich</text>
    <text x="400" y="191">Chocolate cupcake, peanut punch</text>
   </g>
  </svg><figcaption>Questions 57–58. Original lunch items are reproduced as printed in the source.</figcaption>
 </figure>;
 // The 2005 and user-confirmed 2014 scans use the same pictured layouts.
 // Reuse SVG artwork, not option sequences, since their question numbers differ.
 if(type==="lunch-table-2005")return <FnhPaper1HistoricalDiagram type="lunch-table-2014"/>;
 if(type==="menu-comparison-2005")return <FnhPaper1HistoricalDiagram type="two-menus-2014"/>;
 if(type==="food-safety-chart-2005")return <FnhPaper1HistoricalDiagram type="food-safety-2014"/>;

 // Previously withheld original source diagrams; SVG layout is source-style and
 // still needs pixel-fidelity manual QA before a scored paper could be released.
 if(type==="kitchen-layout-2006")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 680 470" role="img" aria-label="U-shaped kitchen plan with cooker to the left, sink on the back counter and refrigerator marked REF on the right">
   <title>Historical Paper 01, U-shaped kitchen source diagram</title>
   <g stroke="currentColor" fill="none" strokeWidth="3" strokeLinejoin="round">
    <rect x="115" y="40" width="438" height="365"/>
    <path d="M115 405 V174 H203 V319 H465 V166 H553 V405 M203 174 V127 H465 V166"/>
    <rect x="275" y="55" width="151" height="51" rx="2"/>
    <path d="M296 75 H407 M296 93 H407"/>
    <circle cx="327" cy="65" r="6"/><circle cx="384" cy="65" r="6"/>
    <rect x="126" y="221" width="68" height="95"/>
    {[ [146,242],[176,242],[146,293],[176,293] ].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="10"/>)}
    <path d="M467 302 H552 M467 359 H552"/>
   </g>
   <text x="507" y="343" textAnchor="middle" fontFamily="Georgia,serif" fill="currentColor" fontSize="23" fontWeight="700">REF</text>
  </svg><figcaption>Kitchen layout. Source-style U-shaped cooker, sink and refrigerator positions.</figcaption>
 </figure>;
 if(type==="place-setting-2007")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 790 330" role="img" aria-label="Place setting: a napkin on far left, two forks, a dinner plate in the middle, knives and a spoon on the right">
   <title>Historical Paper 01, unlabelled dining cover</title>
   <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="32" y="26" width="726" height="276"/>
    <rect x="70" y="122" width="55" height="106"/>
    {[[177,125],[222,125]].map(([x,y],i)=><g key={i}>
      <path d={"M"+(x-11)+" "+(y-18)+" v50 M"+(x-5)+" "+(y-18)+" v50 M"+(x+1)+" "+(y-18)+" v50 M"+(x+7)+" "+(y-18)+" v50 M"+x+" "+(y+40)+" V244 Q"+x+" 255 "+(x+6)+" 244 V165"} />
     </g>)}
    <circle cx="392" cy="167" r="84"/><circle cx="392" cy="167" r="59"/>
    <path d="M536 93 Q529 94 529 111 V246 Q537 259 543 246 V112 Q543 98 536 93 Z"/>
    <path d="M590 98 V243 Q599 260 605 243 V100 Q604 92 600 94 Z"/>
    <ellipse cx="660" cy="119" rx="22" ry="31"/><path d="M660 150 V246 Q668 262 675 246 V151"/>
   </g>
  </svg><figcaption>Dining cover. Original source uses two forks on the left and the knife and spoon on the right.</figcaption>
 </figure>;
 if(type==="knife-collection-2008")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 830 360" role="img" aria-label="Four knives labelled I to IV: long curved knife, serrated bread knife, slim pointed knife and broad rectangular cleaver">
   <title>2008 Paper 01 Question 43, knife shapes I, II, III and IV</title>
   <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
    <path d="M104 225 V128 Q115 90 127 69 L142 58 Q146 105 135 140 L135 225 Z"/>
    <path d="M286 225 V95 H310 L318 111 L311 121 L317 131 L310 141 L317 151 L311 161 L314 225 Z"/>
    <path d="M487 225 V112 Q503 74 515 61 Q525 126 521 163 V225 Z"/>
    <path d="M662 225 V66 H750 V220 H692 V225 Z"/>
    {[ [102,134],[284,316],[485,521],[693,722] ].map(([x1,x2],i)=><g key={i}>
      <path d={"M"+x1+" 224 V294 Q"+((x1+x2)/2)+" 306 "+x2+" 294 V224"}/>
      <circle cx={(x1+x2)/2} cy="270" r="4" fill="currentColor"/>
    </g>)}
   </g>
   <g fill="currentColor" fontSize="29" fontFamily="Georgia,serif" textAnchor="middle">
    {["I","II","III","IV"].map((t,i)=><text key={t} x={[120,300,503,709][i]} y="338">{t}</text>)}
   </g>
  </svg><figcaption>Question 43. Knife silhouettes I–IV are redrawn from the scanned example.</figcaption>
 </figure>;
 if(type==="local-dishes-table-2006")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 955 350" role="img" aria-label="Three local dishes table: split-pea soup green split peas fresh beef dumplings green plantains seasonings or herbs; pelau chicken rice dried pigeon peas seasonings or herbs; chicken roti chicken roti shells or skins potatoes curry seasonings">
   <title>Food and Nutrition source, ingredients of three Caribbean dishes</title>
   <g fill="none" stroke="currentColor" strokeWidth="2"><rect x="15" y="22" width="925" height="306"/><path d="M331 22 V328 M610 22 V328 M15 80 H940"/></g>
   <g fontFamily="Georgia,serif" fontSize="24" fill="currentColor">
    <text x="32" y="60" fontWeight="700">Split-pea Soup</text><text x="347" y="60" fontWeight="700">Pelau</text>
    <text x="624" y="60" fontWeight="700">Chicken Roti</text>
    {["Green split-peas","Fresh beef","Dumplings","Green plantains","Seasonings or herbs"].map((s,i)=><text key={s} x="32" y={116+i*42}>{s}</text>)}
    {["Chicken","Rice","Dried pigeon peas","Seasonings or herbs"].map((s,i)=><text key={s} x="347" y={116+i*42}>{s}</text>)}
    {["Chicken","Roti (shells/skins)","Potatoes","Curry","Seasonings"].map((s,i)=><text key={s} x="624" y={116+i*42}>{s}</text>)}
   </g>
  </svg><figcaption>Source ingredients table for split-pea soup, pelau and chicken roti.</figcaption>
 </figure>;
 if(type==="kitchen-layout-2009")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 880 600" role="img" aria-label="Perspective kitchen layout with five numbered areas: 1 under the sink, 2 counter near refrigerator, 3 worktop by stove, 4 rear left worktop, 5 cooker surface">
   <title>2009 Paper 01 Questions 43–45, perspective kitchen numbered 1–5</title>
   <g stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round">
    <rect x="45" y="43" width="788" height="496"/>
    <path d="M45 43 L273 135 H619 L833 43 M273 135 L273 432 L45 539 M619 135 V435 L833 539"/>
    <path d="M45 308 L273 278 H619 L833 310 M45 333 L273 308 H619 L833 330"/>
    <path d="M45 333 L45 539 M273 308 L273 432 M619 309 L619 434 M833 330 V539"/>
    <path d="M275 314 V459 H618 V316 M389 326 V461 M502 326 V461 M275 358 H618"/>
    <path d="M390 323 V277 Q394 255 408 259 Q426 268 414 286 H406"/>
    <rect x="112" y="326" width="129" height="213"/><path d="M124 390 H233 M149 393 V526"/>
    {[ [112,316],[169,311],[226,306] ].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="22" ry="7"/>)}
    <path d="M666 212 L788 200 V446 L666 456 Z M666 333 L788 326"/>
    <path d="M273 306 L153 356 M619 308 L691 335 M274 317 L153 366"/>
    <rect x="687" y="186" width="101" height="152"/>
   </g>
   <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
    {[[434,500,434,435],[622,228,600,311],[236,203,243,294],[305,220,311,300],[105,225,118,297]].map(([x1,y1,x2,y2],i)=><g key={i}>
      <circle cx={x1} cy={y1} r="20" fill="none"/><path d={"M"+x1+" "+(y1+20)+" L"+x2+" "+y2}/>
    </g>)}
   </g>
   <g fill="currentColor" fontFamily="Georgia,serif" fontSize="26" textAnchor="middle">
    {[[434,500],[622,228],[236,203],[305,220],[105,225]].map(([x,y],i)=><text key={i} x={x} y={y+9}>{i+1}</text>)}
   </g>
  </svg><figcaption>Questions 43–45. Perspective kitchen labels 1–5 preserve the original numbered working areas. Redraw pending final visual comparison.</figcaption>
 </figure>;
 if(type==="luncheon-menu-2009")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 790 310" role="img" aria-label="Menu: Baked fish in tomato sauce, Vegetable rice, Garden salad, Golden apple pie">
   <title>2009 Paper 01 Question 52, luncheon menu</title>
   <rect x="88" y="24" width="616" height="264" fill="none" stroke="currentColor" strokeWidth="2"/>
   <g fill="currentColor" fontFamily="Georgia,serif" fontSize="28" textAnchor="middle">
    {["Baked fish in tomato sauce","Vegetable rice","Garden salad","Golden apple pie"].map((t,i)=><text key={i} x="396" y={79+i*63}>{t}</text>)}
   </g>
  </svg><figcaption>Question 52. Original four-course luncheon menu.</figcaption>
 </figure>;
 if(type==="kitchen-layout-2007")return <FnhPaper1HistoricalDiagram type="kitchen-layout-2006"/>;
 if(type==="place-setting-2008")return <FnhPaper1HistoricalDiagram type="place-setting-2007"/>;
 if(type==="caribbean-dishes-table-2006")return <FnhPaper1HistoricalDiagram type="local-dishes-table-2006"/>;
 if(type==="local-dishes-table-2008")return <FnhPaper1HistoricalDiagram type="local-dishes-table-2006"/>;
 if(type==="two-menus-2009")return <FnhPaper1HistoricalDiagram type="two-menus-2014"/>;
 if(type==="local-dishes-table-2009")return <FnhPaper1HistoricalDiagram type="local-dishes-table-2006"/>;

 // Sources 2015 (herbs and three-menu table) and 2017 (repeated classic
 // labelled cutlery and U-shaped kitchen) from the supplied PDFs.
 if(type==="herbs-2015")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 940 415" role="img" aria-label="Four herb drawings A B C D. A is a branched leafy thyme-style sprig, B slender stems with a round flower head, C clustered parsley-style leaves and D a tall stem with fine needle-like leaves">
   <title>2015 Paper 01 Question 55, original four herb illustrations A–D</title>
   <g stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round">
    <path d="M130 328 Q160 245 136 129 M155 262 Q93 227 81 168 M142 209 Q191 181 191 123"/>
    {[ [134,143],[146,163],[152,188],[142,209],[149,230],[137,260],[117,229],[102,210],[94,190],[157,190],[172,165],[175,145] ].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="12" ry="5" transform={"rotate("+((i%3-1)*42)+" "+x+" "+y+")"}/>)}
    <path d="M356 332 Q348 208 357 128 M357 332 Q391 227 390 151 M357 330 Q333 220 320 182"/>
    <circle cx="355" cy="121" r="15"/><circle cx="390" cy="141" r="12"/><circle cx="319" cy="171" r="9"/>
    {[ [352,119],[348,111],[356,102],[365,116],[392,137],[398,144] ].map(([x,y],i)=><path key={i} d={"M"+x+" "+y+" l6 -6 l4 8 z"}/>)}
    <path d="M595 331 Q591 267 610 208 M590 300 L550 265 M599 259 L645 229"/>
    {[ [548,268],[560,247],[586,234],[610,209],[623,227],[645,235],[578,273],[609,269],[637,263],[593,291] ].map(([x,y],i)=>
      <path key={i} d={"M"+x+" "+y+" q-18 -13 -6 -20 q20 -2 6 20 M"+x+" "+y+" q16 -15 21 -4 q-7 17 -21 4"}/>)}
    <path d="M811 343 V88 M811 116 L792 102 M811 142 L830 125 M811 175 L786 155 M811 202 L835 181 M811 230 L789 213 M811 265 L837 251 M811 287 L790 272"/>
    {[105,130,160,189,220,253,283].map((y,i)=><g key={i}>
      <path d={"M811 "+y+" l-17 -14 M811 "+(y+5)+" l18 -13"}/>
      <path d={"M810 "+y+" l-9 -20 M812 "+y+" l12 -23"}/>
    </g>)}
   </g>
   <g fontFamily="Georgia,serif" fontSize="29" fill="currentColor" textAnchor="middle">
    {["A","B","C","D"].map((t,i)=><text key={t} x={[145,355,596,813][i]} y="386">({t})</text>)}
   </g>
  </svg><figcaption>Question 55. Four different herbs redrawn from the printed stems and leaves, labelled A to D.</figcaption>
 </figure>;
 if(type==="luncheon-menus-2015")return <figure className="fnh-paper1-source-figure">
  <svg viewBox="0 0 980 346" role="img" aria-label="Three luncheon menus: stewed beef dumplings stewed lentils; baked chicken boiled rice stewed pigeon peas; curried chicken roti shells or skins curried potato or channa or chickpeas">
   <title>2015 Paper 01 Question 56, three typical luncheon menus</title>
   <g fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="15" y="22" width="950" height="302"/><path d="M334 22 V324 M647 22 V324"/></g>
   <g fill="currentColor" fontFamily="Georgia,serif" fontSize="27" textAnchor="middle">
    {["Stewed Beef","Dumplings","Stewed Lentils"].map((t,i)=><text key={i} x="175" y={100+i*83}>{t}</text>)}
    {["Baked Chicken","Boiled Rice","Stewed Pigeon Peas"].map((t,i)=><text key={i} x="493" y={100+i*83}>{t}</text>)}
    {["Curried Chicken","Roti (Shells/Skins)","Curried Potato or","Channa or Chickpeas"].map((t,i)=><text key={i} x="804" y={92+i*66}>{t}</text>)}
   </g>
  </svg><figcaption>Question 56. The original three lunch menus retain their source ingredients and columns.</figcaption>
 </figure>;
 if(type==="place-setting-2015"||type==="place-setting-2017")return <FnhPaper1HistoricalDiagram type="place-setting-2004"/>;
 if(type==="kitchen-layout-2015"||type==="kitchen-u-layout-2017")return <FnhPaper1HistoricalDiagram type="kitchen-layout-2006"/>;
 if(type==="luncheon-menu-2015")return <FnhPaper1HistoricalDiagram type="luncheon-presentation-2020"/>;

 return null;
}
