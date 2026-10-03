import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useState} from "react";
import "./photosynthesisEnergyExplorer.css";

const TABS=[
  ["equation","Equation"],
  ["chloroplast","Leaf + chloroplast"],
  ["starch","Starch test"],
  ["evidence","Evidence"],
  ["limits","Limiting factors"],
];

function EquationView(){
  return <div className="spark-photo-equation">
    <div className="spark-photo-equation-row"><span>Carbon dioxide</span><b>+</b><span>Water</span><b>→</b><span>Glucose</span><b>+</b><span>Oxygen</span></div>
    <div className="spark-photo-condition">light energy absorbed by chlorophyll</div>
    <div className="spark-photo-balanced">6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</div>
    <article><strong>Energy conversion</strong><p>Light energy is converted to chemical energy stored in glucose.</p></article>
  </div>;
}


function ChloroplastView(){
  return <div className="spark-photo-chloroplast">
    <ReviewedScienceDiagram site="PhotosynthesisEnergyExplorer.jsx:24"><svg className="spark-photo-chloroplast-svg" viewBox="0 0 980 590" role="img" aria-label="Leaf cross-section with palisade cells containing chloroplasts and an enlarged chloroplast showing grana and stroma">
      <defs>
        <marker id="photo-light-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="pcl-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>

      <g className="pcl-leaf-section" transform="translate(35 55)">
        <path className="pcl-cuticle" d="M55 45Q215 25 380 45Q445 52 500 45"/>
        <path className="pcl-upper-epidermis" d="M55 55Q215 35 380 55Q445 62 500 55V100H55Z"/>
        <g className="pcl-palisade">
          {[82,128,174,220,266,312,358,404,450].map((x,i)=><g key={x}>
            <rect x={x} y={105} width="34" height={150-(i%2)*12} rx="15"/>
            {[126,156,186,216].map((y,j)=><circle key={j} className="pcl-chloroplast-dot" cx={x+17} cy={y+(i%2)*5} r="6"/>)}
          </g>)}
        </g>
        <g className="pcl-spongy">
          {[
            [88,290,38,26],[154,320,44,27],[224,282,42,28],[292,326,45,30],[366,285,41,27],[438,327,44,29],
            [118,385,43,28],[202,380,46,30],[290,392,42,28],[382,382,45,30],[462,392,37,26]
          ].map(([cx,cy,rx,ry],i)=><ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry}/>)}
        </g>
        <rect className="pcl-lower-epidermis" x="55" y="430" width="445" height="50" rx="10"/>
        <g className="pcl-stoma">
          <ellipse cx="276" cy="456" rx="31" ry="14" transform="rotate(-18 276 456)"/>
          <ellipse cx="340" cy="456" rx="31" ry="14" transform="rotate(18 340 456)"/>
          <ellipse className="pcl-stoma-pore" cx="308" cy="456" rx="12" ry="8"/>
        </g>
        <g className="pcl-vein">
          <ellipse cx="454" cy="360" rx="48" ry="34"/>
          <circle className="pcl-xylem" cx="438" cy="352" r="12"/>
          <circle className="pcl-phloem" cx="468" cy="370" r="12"/>
        </g>

        <path className="pcl-light-ray" d="M130 0V80" markerEnd="url(#photo-light-arrow)"/>
        <path className="pcl-light-ray" d="M240 0V80" markerEnd="url(#photo-light-arrow)"/>
        <path className="pcl-light-ray" d="M350 0V80" markerEnd="url(#photo-light-arrow)"/>
        <text className="pcl-label" x="240" y="18" textAnchor="middle">light</text>

        <path className="pcl-co2-arrow" d="M308 535V485" markerEnd="url(#photo-light-arrow)"/>
        <text className="pcl-small" x="308" y="560" textAnchor="middle">CO₂ enters through stomata</text>

        <text className="pcl-label" x="520" y="82">upper epidermis</text><path className="pcl-callout" d="M495 78H510"/>
        <text className="pcl-label" x="520" y="160">palisade mesophyll</text><path className="pcl-callout" d="M470 158H510"/>
        <text className="pcl-label" x="520" y="310">spongy mesophyll</text><path className="pcl-callout" d="M472 306H510"/>
        <text className="pcl-label" x="520" y="385">vascular bundle</text><path className="pcl-callout" d="M490 365H510"/>
        <text className="pcl-label" x="520" y="465">lower epidermis + stoma</text><path className="pcl-callout" d="M470 455H510"/>
      </g>

      <path className="pcl-zoom-line" d="M450 185Q590 165 650 205"/>
      <circle className="pcl-zoom-ring" cx="448" cy="185" r="22"/>

      <g className="pcl-chloroplast-detail" transform="translate(610 135)">
        <ellipse className="pcl-chloroplast-shell" cx="150" cy="155" rx="145" ry="105"/>
        <ellipse className="pcl-chloroplast-inner" cx="150" cy="155" rx="130" ry="90"/>
        <g className="pcl-grana">
          {[ [82,115],[130,190],[188,110],[220,180] ].map(([x,y],i)=><g key={i}>
            <rect x={x-24} y={y-18} width="48" height="8" rx="4"/>
            <rect x={x-24} y={y-7} width="48" height="8" rx="4"/>
            <rect x={x-24} y={y+4} width="48" height="8" rx="4"/>
            <rect x={x-24} y={y+15} width="48" height="8" rx="4"/>
          </g>)}
        </g>
        <path className="pcl-lamella" d="M106 115Q142 145 164 112M154 190Q185 164 198 180"/>
        <circle className="pcl-starch-grain" cx="150" cy="145" r="16"/>
        <text className="pcl-detail-title" x="150" y="20" textAnchor="middle">enlarged chloroplast</text>
        <text className="pcl-label" x="300" y="100">grana</text><path className="pcl-callout" d="M230 110L286 102"/>
        <text className="pcl-label" x="300" y="160">stroma</text><path className="pcl-callout" d="M242 155L286 158"/>
        <text className="pcl-label" x="300" y="215">starch grain</text><path className="pcl-callout" d="M165 150Q240 205 286 210"/>
      </g>

      <text className="pcl-caption" x="750" y="500" textAnchor="middle">chlorophyll in chloroplast membranes absorbs light energy</text>
      <text className="pcl-caption" x="750" y="528" textAnchor="middle">palisade cells contain many chloroplasts near the upper leaf surface</text>
    </svg></ReviewedScienceDiagram>
    <div className="spark-photo-chloroplast-notes">
      <article><b>Palisade mesophyll</b><p>Cells are closely packed near the upper surface and contain many chloroplasts, helping them absorb light.</p></article>
      <article><b>Chloroplast</b><p>Chlorophyll is located in chloroplast membranes and absorbs light energy used during photosynthesis.</p></article>
      <article><b>Stomata</b><p>Carbon dioxide enters through stomata and diffuses through leaf air spaces to photosynthesising cells.</p></article>
      <article><b>Vascular bundle</b><p>Xylem supplies water. Phloem transports sugars and other organic substances away from the leaf.</p></article>
    </div>
  </div>;
}

function StarchApparatusDiagram(){
  return <ReviewedScienceDiagram site="PhotosynthesisEnergyExplorer.jsx:108"><svg className="spark-photo-starch-svg" viewBox="0 0 980 440" role="img" aria-label="Leaf starch test apparatus showing boiling water, ethanol heated in a water bath, rinsing and iodine test">
    <defs>
      <marker id="photo-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path className="pst-arrow-head" d="M0 0L10 5L0 10Z"/>
      </marker>
    </defs>

    <g transform="translate(35 45)">
      <text className="pst-step" x="115" y="18" textAnchor="middle">1. Boil leaf in water</text>
      <path className="pst-beaker" d="M35 55V270Q35 300 65 300H205Q235 300 235 270V55"/>
      <line className="pst-rim" x1="20" y1="55" x2="250" y2="55"/>
      <path className="pst-water" d="M35 135H235V270Q235 300 205 300H65Q35 300 35 270Z"/>
      <path className="pst-leaf" d="M92 170Q132 126 181 163Q164 222 106 225Q75 211 92 170Z"/>
      <path className="pst-leaf-vein" d="M104 214Q132 190 168 157"/>
      <path className="pst-flame" d="M105 338Q130 300 152 338Q142 370 128 380Q115 365 105 338Z"/>
      <line className="pst-stand" x1="45" y1="318" x2="225" y2="318"/>
      <text className="pst-note" x="135" y="405" textAnchor="middle">kills leaf and stops reactions</text>
    </g>

    <path className="pst-arrow" d="M300 215H365" markerEnd="url(#photo-arrow)"/>

    <g transform="translate(365 45)">
      <text className="pst-step" x="145" y="18" textAnchor="middle">2. Heat leaf in ethanol</text>
      <path className="pst-beaker" d="M40 70V275Q40 302 68 302H238Q266 302 266 275V70"/>
      <line className="pst-rim" x1="25" y1="70" x2="281" y2="70"/>
      <path className="pst-water bath" d="M40 150H266V275Q266 302 238 302H68Q40 302 40 275Z"/>
      <path className="pst-test-tube" d="M118 78V240Q118 267 147 267Q176 267 176 240V78"/>
      <line className="pst-test-rim" x1="108" y1="78" x2="186" y2="78"/>
      <path className="pst-ethanol" d="M118 145H176V240Q176 267 147 267Q118 267 118 240Z"/>
      <path className="pst-leaf small" d="M128 175Q146 153 166 174Q157 208 135 209Q122 201 128 175Z"/>
      <path className="pst-flame" d="M120 338Q145 300 167 338Q157 370 143 380Q130 365 120 338Z"/>
      <line className="pst-stand" x1="48" y1="318" x2="258" y2="318"/>
      <text className="pst-liquid-label" x="147" y="132" textAnchor="middle">ethanol</text>
      <text className="pst-liquid-label" x="225" y="188" textAnchor="middle">hot water bath</text>
      <text className="pst-note warning" x="153" y="405" textAnchor="middle">ethanol is flammable, heat indirectly</text>
    </g>

    <path className="pst-arrow" d="M675 215H735" markerEnd="url(#photo-arrow)"/>

    <g transform="translate(720 45)">
      <text className="pst-step" x="115" y="18" textAnchor="middle">3. Rinse and add iodine</text>
      <rect className="pst-tile" x="20" y="145" width="220" height="150" rx="12"/>
      <path className="pst-leaf result" d="M65 190Q118 135 195 185Q172 258 88 260Q43 239 65 190Z"/>
      <path className="pst-blue-black" d="M85 193Q118 165 162 185Q150 225 101 230Q76 218 85 193Z"/>
      <path className="pst-dropper" d="M175 70L205 105L188 122L158 88Z"/>
      <circle className="pst-iodine-drop" cx="170" cy="133" r="7"/>
      <text className="pst-liquid-label" x="206" y="73">iodine</text>
      <text className="pst-result-label" x="130" y="330" textAnchor="middle">blue-black = starch present</text>
      <text className="pst-note" x="130" y="405" textAnchor="middle">brown/yellow-brown = no starch</text>
    </g>
  </svg></ReviewedScienceDiagram>;
}

function StarchView(){
  const steps=[
    ["Destarch the plant","Keep the plant in darkness long enough to use stored starch before the investigation."],
    ["Expose the leaf","Allow the selected treatment, for example light versus covered regions."],
    ["Boil the leaf in water","Kills the leaf and stops reactions."],
    ["Heat in ethanol using a water bath","Removes chlorophyll so the iodine colour change is visible. Ethanol is flammable, so do not heat it directly over a flame."],
    ["Rinse and add iodine","A blue-black colour shows starch. Brown or yellow-brown means starch is absent."],
  ];
  return <div className="spark-photo-starch"><StarchApparatusDiagram/>{steps.map((s,i)=><article key={s[0]}><span>{i+1}</span><div><b>{s[0]}</b><p>{s[1]}</p></div></article>)}</div>;
}

function EvidenceView(){
  return <div className="spark-photo-evidence">
    <article><span>VARIEGATED LEAF</span><h4>Chlorophyll is required</h4><p>Only green regions contain chlorophyll. After exposure to light, only green regions turn blue-black with iodine because only those regions make starch.</p></article>
    <article><span>COVERED LEAF</span><h4>Light is required</h4><p>A destarched leaf is partly covered, then exposed to light. The uncovered area turns blue-black and the covered area remains brown.</p></article>
    <article><span>PONDWEED</span><h4>Oxygen is produced</h4><p>Gas collected from illuminated pondweed relights a glowing splint, identifying the gas as oxygen.</p></article>
    <article><span>STORAGE</span><h4>Glucose is converted to starch</h4><p>Starch is insoluble, so plants can store large amounts without strongly affecting osmosis in cells.</p></article>
  </div>;
}

function LimitsView(){
  return <div className="spark-photo-limits">
    <ReviewedScienceDiagram site="PhotosynthesisEnergyExplorer.jsx:183"><svg viewBox="0 0 760 360" role="img" aria-label="Rate of photosynthesis rises with light intensity and then levels off when another factor becomes limiting">
      <line className="ph-axis" x1="85" y1="290" x2="690" y2="290"/><line className="ph-axis" x1="85" y1="290" x2="85" y2="55"/>
      <path className="ph-curve" d="M90 282 C160 230 230 160 340 120 C430 90 540 88 680 88"/>
      <line className="ph-dash" x1="430" y1="88" x2="430" y2="290"/>
      <text className="ph-label" x="385" y="330">Light intensity</text><text className="ph-label" x="25" y="190" transform="rotate(-90 25 190)">Rate of photosynthesis</text>
      <text className="ph-note" x="450" y="78">another factor limits rate</text><text className="ph-note" x="445" y="315">about 6 units in bank example</text>
    </svg></ReviewedScienceDiagram>
    <p>When light is low, increasing light can increase photosynthesis. Once the curve levels off, another factor such as carbon dioxide concentration or temperature is limiting the rate.</p>
  </div>;
}

export default function PhotosynthesisEnergyExplorer(){
  const [view,setView]=useState("equation");
  return <section className="spark-photosynthesis-energy">
    <header><span>PHOTOSYNTHESIS AND ENERGY</span><h3>Follow the evidence from light capture to stored chemical energy</h3><p>Photosynthesis uses carbon dioxide and water to make glucose and oxygen, using light energy absorbed by chlorophyll.</p></header>
    <div className="spark-photo-tabs">{TABS.map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-photo-stage">
      {view==="equation"&&<EquationView/>}
      {view==="starch"&&<StarchView/>}
      {view==="evidence"&&<EvidenceView/>}
      {view==="limits"&&<LimitsView/>}
    </div>
    <div className="spark-photo-summary"><strong>Photosynthesis converts energy</strong><span>Light energy becomes chemical energy in glucose. Plants can convert glucose to insoluble starch for storage.</span></div>
  </section>;
}
