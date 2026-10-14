import React from "react";
// EAN-13 source digits on 2012 Paper 02, page 5: 5 011415 000726.
const eanL=["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"];
const eanG=["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"];
const eanR=["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"];
const eanParity=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"];
function ean13Bars(code){
  const text=String(code||"");
  if(!/^\d{13}$/.test(text))return [];
  const parity=eanParity[Number(text[0])];
  const left=text.slice(1,7).split("").map((digit,i)=>(parity[i]==="L"?eanL:eanG)[Number(digit)]).join("");
  const right=text.slice(7).split("").map(digit=>eanR[Number(digit)]).join("");
  return ("101"+left+"01010"+right+"101").split("").map((bit,i)=>({i,bit}));
}


/** Reconstructed from the user's 2008 Paper 02, page 5.
 * Diagram represents Ria's Super Flour Mix carton and its front/side labels.
 * Keep the original missing-quantity and missing-directions clues intact.
 */
export default function FnhHistoricalDiagram({type}){
  if(type==="table-setting-four-2005")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 850 570" width="100%" role="img" aria-label="Four-person lunch table with plate settings and serving items arranged around a central rectangular table">
      <title>2005 Paper 1, Item 23: Lunch table laid for four</title>
      <rect x="48" y="40" width="752" height="475" fill="none" stroke="currentColor" strokeWidth="2"/>
      <g fill="none" stroke="currentColor" strokeWidth="2.6">
        {/* Four individually laid plates and drinking vessels. */}
        {[[425,118],[424,429],[144,278],[699,279]].map(([cx,cy],i)=><g key={i}>
          <circle cx={cx} cy={cy} r="48"/><circle cx={cx} cy={cy} r="33"/>
        </g>)}
        {/* Napkins and folded linen. */}
        <path d="M86 142 L177 190 L165 200 L86 163 Z M680 405 L765 430 L739 450 L675 420 Z"/>
        {/* Fork and spoon settings around each place. */}
        <path d="M337 93 V146 M332 92 V105 M341 92 V105 M352 92 V105 M352 92 V146 M496 93 V147"/>
        <ellipse cx="511" cy="95" rx="7" ry="14"/><path d="M511 109 V149"/>
        <path d="M338 406 V453 M338 405 H348 M348 405 V453 M499 405 V453"/>
        <ellipse cx="518" cy="414" rx="7" ry="13"/><path d="M518 427 V458"/>
        <path d="M73 247 H111 M73 262 H111 M190 247 H231 M190 264 H230 M614 246 H657 M614 264 H657 M751 245 H789 M751 264 H789"/>
        {/* Four centre service platters. */}
        {[[313,255],[379,255],[475,255],[540,255]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="20"/>)}
        {/* Sauce jug and side dishes. */}
        <path d="M398 299 C410 280 440 283 447 301 L438 327 H403 Z M448 300 Q470 293 459 319"/>
      </g>
      <g fill="currentColor" fontFamily="Arial,sans-serif" textAnchor="middle" fontSize="19" fontWeight="700">
        <text x="425" y="553">Figure: Four lunch place settings</text>
      </g>
    </svg>
    <figcaption>2005 Paper 1, Question 23. SVG reconstruction of a shared lunch table with four place settings, adapted from the supplied line illustration.</figcaption>
  </figure>;
  if(type==="food-safety-four-2005")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 800 515" width="100%" role="img" aria-label="Four food safety controls clean hands and surfaces, separate raw and ready-to-eat foods, chill in a refrigerator, cook to an appropriate temperature">
      <title>2005 Paper 1, Questions 48 and 49: Food safety methods</title>
      <g stroke="currentColor" strokeWidth="2.6" fill="none">
        <rect x="70" y="30" width="660" height="410"/>
        <path d="M400 30 V440 M70 235 H730"/>
        {/* Handwashing faucet and water droplets. */}
        <path d="M117 87 H275 V105 H253 V116 H274 M245 116 L245 135"/>
        {[250,264,278].map(x=><path key={x} d={`M${x} 142 l-4 10 l4 5 l4 -5 Z`}/>)}
        {/* Raw food and cooked food in separate trays. */}
        <path d="M454 131 H615 L602 172 H469 Z M456 191 H612 L600 221 H467 Z"/>
        <path d="M480 121 C502 101 524 102 543 123 M488 186 C502 174 527 174 544 186"/>
        {/* Refrigerator icon. */}
        <rect x="200" y="275" width="123" height="140" rx="8"/>
        <path d="M200 335 H323 M307 301 V317 M307 359 V390"/>
        {/* Stove flame. */}
        <path d="M499 410 C455 373 493 348 498 321 C513 341 543 356 534 384 C543 375 551 361 548 354 C570 388 555 410 499 410 Z"/>
      </g>
      <g fontFamily="Arial,sans-serif" fill="currentColor">
        <text x="90" y="63" fontSize="22" fontWeight="700">CLEAN</text><text x="420" y="63" fontSize="22" fontWeight="700">SEPARATE</text>
        <text x="91" y="266" fontSize="22" fontWeight="700">CHILL</text><text x="420" y="266" fontSize="22" fontWeight="700">COOK</text>
        <text x="91" y="199" fontSize="15">Wash hands and surfaces</text>
        <text x="420" y="199" fontSize="15">Prevent cross-contamination</text>
        <text x="91" y="457" fontSize="15">Refrigerate perishable food</text>
        <text x="420" y="457" fontSize="15">Cook thoroughly</text>
      </g>
    </svg>
    <figcaption>2005 Paper 1, Questions 48–49. Four food-safety actions reproduced as a readable, theme-aware SVG.</figcaption>
  </figure>;
  if(type==="place-setting-2004")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 810 400" width="100%" role="img" aria-label="2004 Paper 1 Question 25 source place setting, knife on left marked A, fork right marked B, spoon right marked C, two utensils horizontally above the plate marked D and E">
      <title>2004 Paper 1 Item 25: Labelled dinner place setting</title>
      <rect x="72" y="50" width="663" height="277" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>
      <g fill="none" stroke="currentColor" strokeWidth="3">
        <circle cx="402" cy="209" r="103"/>
        {/* Folded napkin at far left. */}
        <path d="M170 225 L250 149 L250 301 Z"/>
        {/* Incorrectly placed knife on the left. */}
        <path d="M274 122 Q282 132 280 181 L281 264 Q277 281 273 263 Z"/>
        {/* Fork shown on right as in supplied diagram. */}
        <path d="M535 132 V166 M543 132 V166 M551 132 V166 M559 132 V166 M531 131 L531 179 Q544 196 559 179 L559 131 M545 189 V272 Q539 282 535 270"/>
        {/* Right spoon. */}
        <ellipse cx="615" cy="152" rx="12" ry="30"/><path d="M615 182 V269 Q615 286 610 269"/>
        {/* Two pieces placed above plate, source labels D and E. */}
        <ellipse cx="365" cy="75" rx="36" ry="11"/><path d="M399 75 H477 Q489 75 479 80 H399"/>
        <path d="M330 105 H484 Q496 105 487 110 H330 Z"/>
      </g>
      <g fontFamily="Arial,sans-serif" fill="currentColor" fontSize="24" fontWeight="700" textAnchor="middle">
        <text x="276" y="312">A</text><text x="545" y="312">B</text><text x="615" y="312">C</text><text x="331" y="72">D</text><text x="331" y="112">E</text>
      </g>
    </svg>
    <figcaption>2004 Paper 1, Question 25. Source positions A–E preserved for identifying correctly placed cutlery.</figcaption>
  </figure>;
  if(type==="kitchen-layout-2004")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 760 450" width="100%" role="img" aria-label="U-shaped kitchen plan, sink along the rear counter, cooker on the left, fridge on the right">
      <title>2004 Paper 1 Item 52: Kitchen layout</title>
      <g fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M147 75 H609 V354 H515 V169 H240 V354 H147 Z"/>
        <rect x="316" y="88" width="121" height="50" rx="4"/>
        <rect x="335" y="96" width="84" height="29" rx="2"/>
        <circle cx="349" cy="82" r="4"/><circle cx="399" cy="82" r="4"/>
        <rect x="157" y="210" width="72" height="84" rx="5"/>
        {[175,213].flatMap(cx=>[228,274].map(cy=><circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="11"/>))}
        <path d="M520 245 H606 M520 288 H606"/>
      </g>
      <text x="562" y="272" fontFamily="Arial,sans-serif" fontSize="23" fontWeight="700" textAnchor="middle" fill="currentColor">REF</text>
      <text x="380" y="407" fontFamily="Arial,sans-serif" fontSize="22" textAnchor="middle" fill="currentColor">Three-sided kitchen counters form a U-shape</text>
    </svg>
    <figcaption>2004 Paper 1, Question 52. U-shaped kitchen plan redrawn from the supplied scan.</figcaption>
  </figure>;
  if(type==="refrigerator-storage-table-2004")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 790 420" width="100%" role="img" aria-label="2004 source refrigerator table of four rows, with food placements in door, crisper and freezing compartment">
      <title>2004 Paper 1 Item 58: Refrigerator storage locations</title>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="40" y="45" width="710" height="325"/>
        {[105,170,235,300].map(y=><line key={y} x1="40" y1={y} x2="750" y2={y}/>)}
        {[125,310,510].map(x=><line key={x} x1={x} y1="45" x2={x} y2="370"/>)}
      </g>
      <g fill="currentColor" fontFamily="Arial,sans-serif" fontSize="21" textAnchor="middle">
        <text x="218" y="83" fontWeight="700">Door</text><text x="410" y="83" fontWeight="700">Crisper</text>
        <text x="630" y="70" fontWeight="700">Freezing</text><text x="630" y="96" fontWeight="700">Compartment</text>
        {["I","II","III","IV"].map((x,i)=><text key={x} x="82" y={147+i*65} fontWeight="700">{x}</text>)}
        {["lettuce","lettuce","eggs","eggs"].map((x,i)=><text key={i} x="218" y={147+i*65}>{x}</text>)}
        {["eggs","beef","lettuce","beef"].map((x,i)=><text key={i} x="410" y={147+i*65}>{x}</text>)}
        {["beef","eggs","beef","beef"].map((x,i)=><text key={i} x="630" y={147+i*65}>{x}</text>)}
      </g>
    </svg>
    <figcaption>2004 Paper 1, Question 58. Source table reproduced with all four options. Current storage guidance differs from some historical placements.</figcaption>
  </figure>;
  if(type==="disease-table-2026")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 820 370" width="100%" role="img" aria-label="2026 Table 1 compares Disease A symptoms frequent urination, unusual thirst, extreme hunger, unusual weight loss and extreme fatigue with Disease B symptoms severe headaches, vision problems, fatigue, irregular heartbeat and chest pain">
      <title>2026 Table 1: Symptoms of Diseases A and B</title>
      <g stroke="currentColor" fill="none" strokeWidth="1.7">
        <rect x="68" y="68" width="684" height="264"/>
        <line x1="410" y1="68" x2="410" y2="332"/>
        {[112,156,200,244,288].map(y=><line key={y} x1="68" y1={y} x2="752" y2={y}/>)}
      </g>
      <g fill="currentColor" fontFamily="Arial,sans-serif">
        <text x="410" y="32" textAnchor="middle" fontWeight="700" fontSize="20">TABLE 1: SYMPTOMS OF DISEASES A AND B</text>
        <text x="239" y="98" textAnchor="middle" fontWeight="700" fontSize="19">Disease A</text>
        <text x="581" y="98" textAnchor="middle" fontWeight="700" fontSize="19">Disease B</text>
        {["Frequent urination","Unusual thirst","Extreme hunger","Unusual weight loss","Extreme fatigue (weak and tired)"].map((x,i)=><text key={i} x="84" y={140+i*44} fontSize="17">{x}</text>)}
        {["Severe headaches","Vision problems","Fatigue","Irregular heartbeat","Chest pain"].map((x,i)=><text key={i} x="426" y={140+i*44} fontSize="17">{x}</text>)}
      </g>
    </svg>
    <figcaption>2026 Paper 2, Question 1. The two source symptom lists are preserved, without displaying the diagnostic answer.</figcaption>
  </figure>;
  if(type==="household-accidents-2026")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 840 380" width="100%" role="img" aria-label="Three 2026 home accident illustrations: child pulling the cord of a hot iron on an ironing board, person in danger of falling from a ladder, person using scissors near a damaged live electrical cord">
      <title>2026 Paper 2 Question 5: Three household accidents</title>
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {[17,293,569].map(x=><rect key={x} x={x} y="28" width="255" height="278" strokeWidth="2.2"/>)}
        {/* Figure 1: iron, board, trailing flex and child. */}
        <path d="M54 134 H228 L213 148 H65 Z M84 148 L187 270 M187 148 L84 270 M73 270 H94 M176 270 H197"/>
        <path d="M149 130 L171 112 L181 132 Z M161 116 V93 Q161 79 174 83 L179 101 L171 112"/>
        <path d="M172 83 Q220 84 223 145 Q225 175 210 185"/>
        <circle cx="215" cy="204" r="19"/><path d="M212 223 L212 265 M212 238 L189 254 M212 241 L236 257 M212 265 L195 290 M212 265 L232 290"/>
        {/* Figure 2: angled stepladder and precarious person. */}
        <path d="M337 287 L419 80 L489 286 M368 216 L474 216 M383 181 H458 M399 139 H447 M346 272 H483 M423 80 H456 L474 287"/>
        <circle cx="447" cy="125" r="17"/><path d="M445 143 L434 194 M434 159 L394 174 M434 160 L465 188 M434 194 L407 242 M434 194 L466 238"/>
        <path d="M515 220 V148 H545 V286 H506"/>
        {/* Figure 3: table, lead, person, scissors and plug. */}
        <path d="M614 256 H796 M649 255 V303 M777 255 V303"/>
        <circle cx="676" cy="109" r="29"/><path d="M657 135 Q656 168 675 184 L712 198 M686 134 L711 164 M711 164 L747 195"/>
        <path d="M744 196 L758 185 M744 196 L758 207 M753 180 L764 187 M753 211 L764 203"/>
        <path d="M761 196 Q785 191 794 214 L795 228"/>
        <rect x="786" y="225" width="24" height="18" rx="3"/>
      </g>
      <g fill="currentColor" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="21" textAnchor="middle">
        <text x="144" y="338">Figure 1</text><text x="420" y="338">Figure 2</text><text x="696" y="338">Figure 3</text>
      </g>
    </svg>
    <figcaption>2026 Paper 2, Question 5. SVG redraws of the hot-iron cord, unstable ladder and electrical hazard shown in the supplied paper.</figcaption>
  </figure>;
  if(type==="nutrients-table-2024")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 760 370" width="100%" role="img" aria-label="2024 Table 1 Nutrients and health-related conditions: missing nutrient for heart disease, protein with missing condition, missing nutrient for scurvy, water with missing condition">
      <title>2024 Paper2 Question2: Nutrients and health-related conditions</title>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="32" y="50" width="695" height="270"/>
        <path d="M32 104 H727 M32 158 H727 M32 212 H727 M32 266 H727"/>
        <path d="M347 50 V320"/>
      </g>
      <g fill="currentColor" fontFamily="Arial,sans-serif" fontSize="21">
        <text x="179" y="85" textAnchor="middle" fontWeight="700">Nutrient</text>
        <text x="536" y="85" textAnchor="middle" fontWeight="700">Health-related condition</text>
        <text x="53" y="140">(i) __________________</text>
        <text x="373" y="140">Heart disease</text>
        <text x="53" y="194">(ii) Protein</text>
        <text x="373" y="194">__________________</text>
        <text x="53" y="248">(iii) __________________</text>
        <text x="373" y="248">Scurvy</text>
        <text x="53" y="302">(iv) Water</text>
        <text x="373" y="302">__________________</text>
      </g>
      <text x="380" y="27" textAnchor="middle" fontFamily="Georgia,serif" fontSize="21" fontWeight="700" fill="currentColor">Table 1: Nutrients and health-related conditions</text>
    </svg>
    <figcaption>2024 Paper 2, Question 2. Fill the four missing entries in the original source table.</figcaption>
  </figure>;
  if(type==="kitchen-layouts-2021")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 900 440" width="100%" role="img" aria-label="2021 kitchen comparison: A a single wall kitchen with tall cupboards, cooker, sink and refrigerator; B an L-shaped kitchen with refrigerator at one end, two counter runs, sink and overhead cupboards">
      <title>2021 Paper 2 Question 5, kitchen layouts A and B</title>
      <g stroke="currentColor" strokeWidth="2.1" fill="none" strokeLinejoin="round">
        <rect x="18" y="50" width="422" height="270" rx="3"/><rect x="461" y="50" width="422" height="270" rx="3"/>
        {/* Source A: straight kitchen wall and full-height storage. */}
        <rect x="34" y="88" width="63" height="205"/><rect x="104" y="89" width="65" height="55"/>
        <rect x="172" y="89" width="65" height="55"/><rect x="241" y="89" width="65" height="55"/>
        <rect x="308" y="89" width="66" height="55"/><rect x="380" y="90" width="45" height="204"/>
        <path d="M101 185 H377 V206 H101 M101 206 V293 M171 206 V293 M237 206 V293 M309 206 V293 M378 206 V293"/>
        <rect x="189" y="222" width="65" height="66"/><rect x="197" y="235" width="49" height="39"/>
        <path d="M181 184 V169 H191 M244 184 V169 H252"/>
        <circle cx="200" cy="213" r="4"/><circle cx="238" cy="213" r="4"/>
        <path d="M336 185 V168 H349"/><path d="M330 191 Q346 202 360 191"/>
        <path d="M113 210 V280 M164 210 V280 M302 210 V280"/>
        {/* Source B: L-shaped set of two counter runs. */}
        <rect x="482" y="133" width="89" height="157"/><path d="M482 169 H571"/>
        <path d="M575 235 L715 186 L861 214 L718 266 Z"/>
        <path d="M575 235 V291 L713 312 V265 M713 312 L860 285 V215"/>
        <path d="M626 223 V300 M674 206 V309 M758 257 V300 M811 237 V295"/>
        <path d="M756 115 L858 126 V178 L756 168 Z M807 121 V174"/>
        <path d="M714 189 L714 264 M854 215 V280"/>
        <ellipse cx="780" cy="248" rx="22" ry="9"/>
        <path d="M782 238 V220 H793"/>
        <path d="M612 248 V234 H620 M644 251 V236 H652"/>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" textAnchor="middle" fontWeight="700">
        <text x="229" y="354" fontSize="24">A</text>
        <text x="672" y="354" fontSize="24">B</text>
        <text x="229" y="387" fontSize="16">Single-wall kitchen</text>
        <text x="672" y="387" fontSize="16">L-shaped kitchen</text>
      </g>
    </svg>
    <figcaption>2021 Paper 2, Question 5: the two source kitchen layouts recreated as SVG for comparison. A uses one wall; B has two connected work surfaces.</figcaption>
  </figure>;
  if(type==="nutrition-labels-2021"){
    const labels=[
      {name:"A",servings:"8",size:"2/3 cup (55 g)",cal:"230",rows:[["Total Fat","8 g","10%"],["Saturated Fat","1 g","5%"],["Trans Fat","0 g",""],["Cholesterol","0 mg","0%"],["Sodium","160 mg","7%"],["Total Carbohydrate","37 g","13%"],["Dietary Fibre","4 g","14%"],["Total Sugars","12 g",""],["Added Sugars","10 g","20%"],["Protein","3 g",""],["Vitamin D","2 mcg","10%"],["Calcium","260 mg","20%"],["Iron","8 mg","45%"],["Potassium","240 mg","6%"]]},
      {name:"B",servings:"2",size:"1 cup (255 g)",cal:"220",rows:[["Total Fat","5 g","6%"],["Saturated Fat","2 g","10%"],["Trans Fat","0 g",""],["Cholesterol","15 mg","5%"],["Sodium","240 mg","10%"],["Total Carbohydrate","35 g","13%"],["Dietary Fibre","6 g","21%"],["Total Sugars","7 g",""],["Added Sugars","4 g","8%"],["Protein","9 g",""],["Vitamin D","5 mcg","25%"],["Calcium","200 mg","15%"],["Iron","1 mg","6%"],["Potassium","470 mg","10%"]]}
    ];
    return <figure className="fnh-historical-figure">
      <svg viewBox="0 0 900 820" width="100%" role="img" aria-label="2021 nutrition facts source labels A and B. A serving 55g, 230 calories, 37g carbohydrate, 12g sugars, 10g added sugar. B serving 255g, 220 calories, 35g carbohydrate, 7g sugars, 4g added sugar">
        <title>2021 Paper 2 Question 6, nutrition facts for Product A and Product B</title>
        {labels.map((item,index)=>{
          const x=index?460:22;
          return <g key={item.name} transform={`translate(${x} 18)`} fill="currentColor" fontFamily="Arial,sans-serif">
            <rect x="0" y="0" width="410" height="738" stroke="currentColor" strokeWidth="3" fill="none"/>
            <text x="16" y="56" fontSize="39" fontWeight="900">Nutrition Facts</text>
            <text x="16" y="89" fontSize="17">{item.servings} servings per container</text>
            <text x="16" y="113" fontSize="17" fontWeight="700">Serving size {item.size}</text>
            <rect x="12" y="125" width="385" height="12"/>
            <text x="16" y="169" fontSize="16">Amount per serving</text>
            <text x="16" y="211" fontSize="35" fontWeight="850">Calories</text>
            <text x="388" y="211" fontSize="39" fontWeight="900" textAnchor="end">{item.cal}</text>
            <rect x="12" y="230" width="385" height="10"/>
            <text x="388" y="262" textAnchor="end" fontSize="14" fontWeight="700">% Daily Value</text>
            {item.rows.map(([name,value,pct],i)=><g key={name} transform={`translate(0 ${275+i*30})`}>
              <line x1="12" x2="397" y1="-15" y2="-15" stroke="currentColor" opacity=".45" strokeWidth="1"/>
              <text x="16" y="8" fontSize="16" fontWeight={["Total Fat","Total Carbohydrate","Protein"].includes(name)?800:400}>{name} {value}</text>
              <text x="388" y="8" textAnchor="end" fontSize="15" fontWeight="600">{pct}</text>
            </g>)}
            <text x="205" y="796" textAnchor="middle" fontSize="24" fontWeight="850">{item.name}</text>
          </g>;
        })}
      </svg>
      <figcaption>2021 Paper 2, Question 6: SVG recreation of both original nutrition labels with the serving size, carbohydrate, fibre and sugar values used in the question.</figcaption>
    </figure>;
  }
  if(type==="green-bean-cells-2013")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 850 430" width="100%" role="img" aria-label="2013 green bean cell wall illustration: I normal intact cell, II cell ruptured by sharp ice crystals during freezing, III irregular collapsed cell wall on thawing">
      <title>2013 Paper 2 Question 2: Normal, ruptured and thawed green bean cells</title>
      <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        {/* I. Normal cell, double-layer rounded rectangular plant cell wall. */}
        <path d="M135 123 C104 122 95 149 95 176 L95 268 C95 306 123 319 169 317 C204 315 218 299 218 273 L215 172 C214 141 193 122 166 121 Z"/>
        <path d="M143 133 C121 128 107 146 105 175 L105 264 C103 285 122 305 151 304 L181 305 C199 299 206 286 205 263 L203 173 C202 143 184 134 166 133 Z" strokeWidth="2"/>
        {/* II. Ice crystal fringe ruptures the cell membrane. */}
        <path d={Array.from({length:46},(_,i)=>{
          const a=2*Math.PI*i/46,rad=i%2?69:100;
          return (i?"L":"M")+(421+Math.cos(a)*rad).toFixed(1)+" "+(216+Math.sin(a)*rad).toFixed(1);
        }).join(" ")+" Z"} strokeWidth="2.3"/>
        <path d="M389 160 C405 151 434 153 447 165 C461 178 469 228 453 254 C442 277 412 286 391 266 C375 243 377 191 389 160 Z" strokeWidth="1.8"/>
        {/* III. Collapsed distorted membranes after thawing. */}
        <path d="M673 130 C694 119 710 131 711 147 C709 164 720 172 731 175 C734 195 717 213 734 227 C742 237 755 237 761 257 C776 272 775 302 754 304 C730 308 712 296 684 301 C660 302 641 284 650 264 C658 242 668 235 655 212 C644 193 645 171 656 155 C661 146 663 137 673 130 Z"/>
        <path d="M681 140 C696 137 701 149 703 165 C697 181 709 194 724 199 C720 217 712 225 728 245 C738 263 759 264 754 286 C738 287 713 282 692 289 C666 284 659 276 670 255 C678 233 679 226 663 203 C653 185 663 153 681 140 Z" strokeWidth="1.6"/>
        <path d="M468 220 H539" strokeWidth="2"/>
        <path d="M536 216 L544 220 L536 225" strokeWidth="2"/>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" textAnchor="middle" fontWeight="600">
        <text x="156" y="364" fontSize="19">I. Normal cell</text>
        <text x="423" y="364" fontSize="19">II. Cell ruptured</text>
        <text x="703" y="364" fontSize="19">III. Cell on thawing</text>
        <text x="569" y="211" fontSize="16" textAnchor="start">Ice crystal</text>
        <text x="425" y="410" fontSize="20">Figure 1. A normal green bean cell wall during and after freezing</text>
      </g>
    </svg>
    <figcaption>2013 Paper 2, Question 2. Original three-stage cell diagram recreated as SVG to show ice-crystal damage and collapse after thawing.</figcaption>
  </figure>;
  if(type==="product-comparison-2012")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 850 690" width="100%" role="img" aria-label="2012 Paper 2 Question 6: barcode 5011415000726, box A carrot cake mix with ingredients flour fat sugar carrot, and box B carrot cake mix with ingredients flour carrot extract sugar salt">
      <title>Figures 1, 2 and 3: Barcode and comparison of carrot cake mixes</title>
      <g fill="currentColor" fontFamily="Georgia,serif" fontWeight="600">
        <text x="425" y="32" textAnchor="middle" fontSize="18">Figure 1: Bar Code</text>
      </g>
      <g fill="currentColor">{ean13Bars("5011415000726").filter(b=>b.bit==="1").map(b=>
        <rect key={b.i} x={281+b.i*3} y="48" width="3" height={b.i<3||b.i>=92||b.i>=45&&b.i<50?93:82}/>)}</g>
      <text x="425" y="168" textAnchor="middle" fontSize="18" fontFamily="Georgia,serif" fill="currentColor">5 011415 000726</text>
      <g stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round">
        {/* Box A: perspective panel and side wall. */}
        <path d="M123 253 L170 215 H320 V429 L278 467 H123 Z"/>
        <path d="M123 253 H278 V467 M278 253 L320 215 M278 253 V467"/>
        <path d="M123 253 L170 215 H320" strokeWidth="1.7"/>
        {/* Box B: separate carton. */}
        <path d="M479 253 L525 215 H674 V429 L632 467 H479 Z"/>
        <path d="M479 253 H632 V467 M632 253 L674 215 M632 253 V467"/>
        <path d="M479 253 L525 215 H674" strokeWidth="1.7"/>
        {/* Small stylised slice of cake and celebratory cake illustrations. */}
        <path d="M165 344 L213 329 L249 346 L207 364 Z M165 344 V383 L207 403 L207 364 M207 403 L249 384 V346" strokeWidth="1.6"/>
        <circle cx="208" cy="321" r="6" fill="currentColor"/>
        <path d="M520 374 C535 354 551 354 559 374 C567 352 583 351 596 374 V396 H520 Z" fill="currentColor"/>
        <circle cx="533" cy="346" r="5" fill="currentColor"/>
        <circle cx="559" cy="339" r="5" fill="currentColor"/>
        <circle cx="585" cy="346" r="5" fill="currentColor"/>
      </g>
      <g fill="currentColor" fontFamily="Arial,sans-serif" textAnchor="middle">
        <text x="202" y="277" fontSize="19" fontWeight="700">Carrot Cake</text>
        <text x="202" y="302" fontSize="19" fontWeight="700">Mix</text>
        <text x="556" y="277" fontSize="19" fontWeight="700">Carrot</text>
        <text x="556" y="302" fontSize="19" fontWeight="700">Cake Mix</text>
      </g>
      <g fill="currentColor" opacity=".72">
        <rect x="124" y="401" width="153" height="66"/>
        <rect x="479" y="393" width="152" height="74"/>
      </g>
      <g fill="white" fontFamily="Arial,sans-serif" fontSize="17" textAnchor="middle">
        <text x="201" y="422">Flour, Fat</text>
        <text x="201" y="443">Sugar, Carrot</text>
        <text x="555" y="415">Flour,</text>
        <text x="555" y="436">Carrot Extract</text>
        <text x="555" y="456">Sugar, Salt</text>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" fontWeight="600" fontSize="21" textAnchor="middle">
        <text x="201" y="515">Figure 2: Box A</text>
        <text x="555" y="515">Figure 3: Box B</text>
      </g>
    </svg>
    <figcaption>2012 Paper 2, Question 6. Recreated source figures, including a standard EAN-13 bar code representing the exact printed digits and both original ingredient lists.</figcaption>
  </figure>;
  if(type==="kitchen-layout-2011")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 760 530" width="100%" role="img" aria-label="2011 Food and Nutrition kitchen floor plan. Food cupboard and refrigerator along the upper wall near the back door, sink beneath right-side window, cooker along lower wall, two work surfaces, and a door to the hall on the left.">
      <title>2011 Paper 2, Question 7: A well-organised kitchen</title>
      <g stroke="currentColor" strokeWidth="3.2" fill="none" strokeLinecap="square">
        {/* Outer room boundary, interrupted for the rear and hall doors. */}
        <path d="M180 105 H265 M325 105 H565 V385 H180 V318 M180 258 V105"/>
        {/* Back door leaf, hinge at 265 and swing. */}
        <path d="M265 105 L265 154"/>
        <path d="M265 154 A49 49 0 0 0 314 105" strokeWidth="1.7"/>
        {/* Hall door leaf and inward swing, hinge at 180,318. */}
        <path d="M180 318 L228 318"/>
        <path d="M228 318 A48 48 0 0 0 180 270" strokeWidth="1.7"/>
        {/* Cabinet/refrigerator banks along back wall. */}
        <path d="M340 105 V171 H474 V105 M389 105 V171 M428 105 V171"/>
        {/* L-shaped counters, at right and lower edges. */}
        <path d="M474 171 H522 V331 H338 V385 M522 171 H565 M338 331 V385"/>
        {/* Right-side sink basin. */}
        <rect x="531" y="220" width="27" height="64" rx="2" strokeWidth="2.1"/>
        <path d="M541 220 V213 H552" strokeWidth="1.5"/>
        {/* Window along right wall. */}
        <path d="M563 192 V292 M568 192 V292" strokeWidth="1.7"/>
        {/* Cooker on lower right. */}
        <rect x="459" y="344" width="45" height="41" rx="2" strokeWidth="2"/>
        <circle cx="472" cy="354" r="5" strokeWidth="1.7"/>
        <circle cx="492" cy="354" r="5" strokeWidth="1.7"/>
        <circle cx="472" cy="374" r="5" strokeWidth="1.7"/>
        <circle cx="492" cy="374" r="5" strokeWidth="1.7"/>
        {/* Source figure marks additional cupboards above the work surface. */}
        <path d="M338 331 H448 M448 331 V338 M338 339 H448" strokeWidth="1.5" strokeDasharray="4 4"/>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" fontSize="18" fontWeight="600">
        <text x="235" y="92">back door</text>
        <text x="206" y="273" textAnchor="end">door to hall</text>
        <text x="300" y="58">food cupboard</text>
        <text x="460" y="58">refrigerator</text>
        <text x="582" y="253">window</text>
        <text x="476" y="309">sink</text>
        <text x="477" y="440">cooker</text>
        <text x="373" y="440" textAnchor="middle">work surfaces with</text>
        <text x="373" y="461" textAnchor="middle">cupboards above</text>
      </g>
      <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M338 60 L348 102 M476 61 L452 102"/>
        <path d="M508 303 L535 255 M480 414 L481 388 M378 416 L378 387"/>
      </g>
      <text x="380" y="509" fontFamily="Georgia,serif" fontSize="19" fontWeight="600" textAnchor="middle" fill="currentColor">Figure 1: A well-organised kitchen</text>
    </svg>
    <figcaption>2011 Paper 2, Question 7. SVG redraw of the source kitchen floor plan with cupboard, refrigerator, sink, window, cooker, work surfaces and door positions.</figcaption>
  </figure>;
  if(type==="kitchen-tools-2010")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 760 470" width="100%" role="img" aria-label="Four food preparation utensils, numbered 1 kitchen knife, 2 blender, 3 muffin tray and 4 pastry brush">
      <title>2010 Paper 2, Question 5: Four kitchen tools</title>
      <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Kitchen knife, with tapered blade and riveted handle. */}
        <path d="M61 147 C99 117 161 120 236 125 L237 162 C155 162 99 163 61 147 Z"/>
        <path d="M235 125 L364 125 Q386 145 364 163 L235 163 Z"/>
        <path d="M243 131 L350 131 Q365 144 350 157 L243 157 Z"/>
        {[268,302,333].map(x=><circle key={x} cx={x} cy="144" r="4" fill="currentColor"/>)}
        {/* Blender jar, lid, base and buttons. */}
        <path d="M515 44 L591 44 L584 148 L529 148 Z"/>
        <ellipse cx="553" cy="43" rx="38" ry="6"/>
        <path d="M585 74 C618 71 614 125 584 129 M582 83 C600 87 600 112 583 118"/>
        <path d="M531 151 L583 151 L598 205 Q600 218 556 220 Q512 222 511 207 L531 151 Z"/>
        <path d="M537 155 Q553 178 578 155 M523 199 Q553 208 587 197"/>
        {[543,557,572].map(x=><circle key={x} cx={x} cy="200" r="4" />)}
        {/* Muffin tin, two-dimensional perspective and 3 x 4 cavities. */}
        <path d="M88 306 L263 284 L321 330 L139 375 Z"/>
        {Array.from({length:12},(_,i)=>{
          const row=Math.floor(i/4),col=i%4;
          const x=132+col*39+row*12,y=308+row*18+col*1;
          return <ellipse key={i} cx={x} cy={y} rx="16" ry="8"/>;
        })}
        {/* Pastry brush, neck and bristles. */}
        <path d="M491 342 L536 337 L539 369 L494 377 Z"/>
        <path d="M539 344 L666 320 Q691 314 695 322 Q700 329 671 334 L539 357"/>
        <path d="M539 357 L670 335 M510 346 L514 374 M523 342 L527 371"/>
        <circle cx="677" cy="323" r="3"/>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" fontWeight="bold" fontSize="23">
        <text x="24" y="159">1.</text><text x="475" y="165">2.</text>
        <text x="46" y="364">3.</text><text x="455" y="379">4.</text>
      </g>
    </svg>
    <figcaption>2010 Paper 2, Question 5. Four original source items recreated as SVG: knife, blender, muffin tray and pastry brush.</figcaption>
  </figure>;
  if(type==="first-aid-kit-2014")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 720 480" width="100%" role="img" aria-label="Four first aid kit items: instant cold compress packet, liquid antiseptic bottle, tweezers and latex disposable gloves box">
      <title>2014 Paper 2 Question 5: items from a first aid kit</title>
      <g stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinejoin="round">
        <rect x="108" y="22" width="505" height="423"/>
        <path d="M159 128 L256 123 L261 247 L164 255 Z"/>
        <path d="M166 138 L245 135 L250 245 L170 248 Z"/>
        <rect x="181" y="151" width="64" height="82" rx="3"/>
        <rect x="414" y="55" width="45" height="34" rx="12"/>
        <path d="M419 91 L454 91 L463 109 Q482 114 482 143 L482 263 Q482 286 458 286 L408 286 Q387 286 387 262 L387 143 Q387 113 410 107 Z"/>
        <rect x="402" y="159" width="65" height="102" rx="17"/>
        <ellipse cx="434" cy="139" rx="33" ry="20"/>
        <path d="M145 420 L295 315 Q308 300 315 312 Q320 321 304 336 L151 424 Z"/>
        <path d="M154 410 L298 318 M177 399 L298 320"/>
        <path d="M302 334 L348 320 L577 320 L577 396 L526 428 L304 427 Z"/>
        <path d="M303 334 L523 334 L577 320 M523 334 L523 427 M304 374 L523 374"/>
        <path d="M404 377 C413 358 419 356 424 365 L436 349 Q445 340 453 351 Q464 345 471 356 L485 372 Q485 390 472 395 L454 405 L435 392 Z"/>
        <path d="M440 355 L440 375 M455 354 L457 371 M468 360 L470 376"/>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" textAnchor="middle">
        <text x="214" y="168" fontSize="13" fontWeight="bold">INSTANT</text>
        <text x="214" y="185" fontSize="13" fontWeight="bold">COLD</text>
        <text x="214" y="202" fontSize="13" fontWeight="bold">COMPRESS</text>
        <text x="433" y="145" fontSize="18" fontWeight="bold">ABC</text>
        <text x="433" y="204" fontSize="15">LIQUID</text>
        <text x="433" y="222" fontSize="15">ANTISEPTIC</text>
        <text x="341" y="365" fontSize="18" fontWeight="bold">Latex</text>
        <text x="412" y="413" fontSize="12">Disposable gloves</text>
      </g>
    </svg>
    <figcaption>2014 Paper 2, Figure 1. First-aid kit items recreated as SVG.</figcaption>
  </figure>;
  if(type==="place-setting-2014")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 770 390" width="100%" role="img" aria-label="Lunch place setting. Dessert fork A and dessert spoon B horizontally above the dinner plate. Dinner fork D to left. Soup spoon C to right. Two knives beside plate, side plate and drinking glass.">
      <title>2014 Paper 2 Question 7: basic lunch place setting</title>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
        <rect x="32" y="20" width="695" height="339"/>
        <circle cx="394" cy="216" r="96"/><circle cx="394" cy="216" r="85"/><circle cx="394" cy="216" r="67"/>
        {Array.from({length:36},(_,i)=>{const angle=(i/36)*Math.PI*2;return <circle key={i} cx={394+90*Math.cos(angle)} cy={216+90*Math.sin(angle)} r="3.1"/>;})}
        <circle cx="150" cy="234" r="74"/><circle cx="150" cy="234" r="55"/><path d="M144 168 L217 320 L98 235 Z"/>
        <circle cx="629" cy="88" r="40"/><circle cx="629" cy="88" r="33"/>
        <ellipse cx="544" cy="100" rx="25" ry="26"/>
        {/* Dessert spoon B. */}
        <ellipse cx="326" cy="73" rx="29" ry="15"/><path d="M355 68 Q410 61 441 69 Q454 76 441 81 L355 78 Z"/>
        {/* Dessert fork A. */}
        <path d="M294 105 Q309 94 329 103 L371 103 L371 111 L330 111 Q306 122 294 113 Z"/>
        {[0,1,2,3].map(i=><path key={i} d={`M${370+i*6} 102 L${439} ${102+i*5}`}/>)}
        {/* Dinner fork D. */}
        <path d="M280 214 L284 310 Q289 340 274 338 Q260 337 265 312 L265 214"/>
        {[0,1,2,3].map(i=><path key={i} d={`M${265+i*6} 214 L${265+i*6} 172`}/>)}
        {/* Two knives on right. */}
        <path d="M541 150 Q553 134 558 137 L559 238 L565 315 Q571 339 557 340 Q547 342 546 321 L546 241 Z"/>
        <path d="M593 167 Q606 145 612 150 L612 241 L619 314 Q623 337 611 340 Q596 340 599 318 L599 242 Z"/>
        {/* Soup spoon C. */}
        <ellipse cx="658" cy="187" rx="17" ry="33"/><path d="M650 219 L650 319 Q650 343 659 343 Q670 342 668 320 L668 219"/>
      </g>
      <g fill="currentColor" fontSize="21" fontWeight="bold" fontFamily="Georgia,serif">
        <text x="458" y="78">B</text><text x="453" y="113">A</text>
        <text x="289" y="341">D</text><text x="676" y="347">C</text>
      </g>
    </svg>
    <figcaption>2014 Paper 2, Figure 2. Basic lunch place setting, including labels A, B, C and D.</figcaption>
  </figure>;
  if(type==="egg-parts-2015")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 650 470" width="100%" role="img" aria-label="Cross-section of a hen egg, A points to central egg yolk and B points to albumen (egg white) surrounding yolk">
      <title>2015 Paper 2, Figure 1: Egg anatomy labels A and B</title>
      <g stroke="currentColor" strokeWidth="2.6" fill="none" strokeLinejoin="round">
        <path d="M323 29 C236 29 175 174 176 306 C175 390 237 438 323 438 C410 438 473 390 470 306 C468 174 408 29 323 29 Z"/>
        <path d="M323 48 C249 48 193 181 195 307 C195 382 246 415 323 421 C399 416 453 383 452 307 C451 180 397 48 323 48 Z"/>
        <ellipse cx="325" cy="253" rx="111" ry="104"/>
        {/* Twisted chalaza near upper and lower ends of yolk. */}
        <path d="M319 151 L311 133 L321 118 L312 101 L322 83 L313 70 L323 48
                 M330 151 L341 131 L330 118 L340 103 L331 84 L342 71 L335 48
                 M317 357 L307 373 L316 385 L307 400 L322 418
                 M335 356 L345 375 L332 389 L345 404 L325 419"/>
        <path d="M412 249 L535 249"/>
        <path d="M346 408 L468 462"/>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" fontSize="24" fontWeight="bold">
        <text x="545" y="257">A</text><text x="480" y="468">B</text>
      </g>
    </svg>
    <figcaption>2015 Paper 2, Figure 1. Egg cross-section, A yolk and B albumen.</figcaption>
  </figure>;
  if(type!=="flour-mix-2008")return null;
  return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 760 485" width="100%" role="img"
      aria-label="Ria's Super Flour Mix carton. The front label reads Ria's Super Flour Mix for Johnny Cakes, Bakes, Fried Dumplings, with ingredients and manufacturer. The side panel shows nutrition facts and a blank Directions for Use area. The net weight is missing.">
      <title>Ria's Super Flour Mix, 2008 Paper 02, Question 6</title>
      <desc>Front and side labels of a three-dimensional flour-mix packet. Candidates identify missing net weight and provide directions for use.</desc>
      <g fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round">
        <path d="M192 105 L455 105 L455 411 L192 411 Z"/>
        <path d="M455 105 L579 62 L579 358 L455 411 Z"/>
        <path d="M192 105 L316 62 L579 62 L455 105 Z"/>
        <path d="M192 296 Q319 265 455 296" opacity=".4"/>
        <ellipse cx="324" cy="257" rx="99" ry="29"/>
        <ellipse cx="324" cy="257" rx="85" ry="22"/>
        {[[275,248],[307,244],[346,244],[383,250],[267,266],[305,262],[345,266],[379,268]].map(([x,y],i)=>
          <ellipse key={i} cx={x} cy={y} rx="12" ry="5" />)}
        <path d="M100 265 H197 M576 271 H664"/>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" textAnchor="middle" fontWeight="600">
        <text x="324" y="137" fontSize="21">Ria's Super Flour Mix</text>
        <text x="324" y="159" fontSize="13">for</text>
        <text x="324" y="187" fontSize="16">Johnny Cakes, Bakes,</text>
        <text x="324" y="206" fontSize="16">Fried Dumplings</text>
        <text x="324" y="335" fontSize="12">Ingredients: Flour, fat, sugar,</text>
        <text x="324" y="351" fontSize="12">baking powder, salt</text>
        <text x="324" y="380" fontSize="11">Ria Ali, 110 Joy Street, Arima,</text>
        <text x="324" y="394" fontSize="11">Trinidad and Tobago</text>
        <text x="78" y="253" fontSize="14">Front</text>
        <text x="78" y="273" fontSize="14">label</text>
        <text x="683" y="259" fontSize="14">Side</text>
        <text x="683" y="279" fontSize="14">label</text>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" textAnchor="middle" fontSize="12.5" fontWeight="600"
        transform="translate(514 113) rotate(-21)">
        <text y="0">Nutrition Facts</text>
        <text y="32">Carbohydrates 80%</text>
        <text y="49">Fat 6%</text>
        <text y="66">Dietary Fibre 8%</text>
        <text y="83">Calcium 3%</text>
        <text y="100">Iron 2%</text>
        <text y="117">Thiamine 3%</text>
        <text y="151">Directions for use:</text>
      </g>
    </svg>
    <figcaption>2008 Paper 2, Question 6. Recreated as an SVG from the supplied carton illustration.</figcaption>
  </figure>;
}
