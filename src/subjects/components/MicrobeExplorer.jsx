import React, { useState } from "react";
import "./microbeExplorer.css";

const VIEWS = {
  compare:{
    label:"Compare microbes",
    title:"Viruses, bacteria and fungi differ in structure and reproduction",
    note:"Bacteria are single-celled organisms. Fungi include yeasts and moulds. Viruses are not cells and reproduce only inside living host cells.",
  },
  bacterial:{
    label:"Bacterial cell",
    title:"A bacterium is a prokaryotic cell with specialised structures",
    note:"A typical bacterium has cytoplasm, ribosomes, a cell membrane and cell wall. Its main chromosome lies free in the cytoplasm. Some bacteria also have plasmids, a capsule or slime layer, pili and one or more flagella.",
  },
  fungal:{
    label:"Fungal cell",
    title:"A fungal cell is eukaryotic and contains a membrane-bound nucleus",
    note:"This budding yeast example shows the cell wall, cell membrane, cytoplasm, nucleus, vacuole and mitochondria. Fungi are eukaryotes, unlike bacteria, and fungal cells do not contain chloroplasts.",
  },
  useful:{
    label:"Useful roles",
    title:"Microorganisms support food production and nutrient cycling",
    note:"Selected bacteria ferment milk to make yoghurt, nitrogen-fixing bacteria help legumes obtain usable nitrogen compounds, and decomposer bacteria and fungi recycle nutrients.",
  },
  harmful:{
    label:"Harmful roles",
    title:"Some microbes cause disease or spoil food",
    note:"Viruses cause illnesses such as influenza. Bacteria cause diseases including tuberculosis. Fungi cause infections such as ringworm and athlete's foot and can also spoil food.",
  },
  antibiotics:{
    label:"Antibiotics",
    title:"Antibiotics act on bacteria, not viruses",
    note:"Penicillin was originally obtained from the mould Penicillium. Antibiotics target bacterial structures or processes and do not treat viral infections such as influenza.",
  },
};

function CompareScene() {
  return (
    <div className="spark-microbe-cards">
      <article>
        <div className="spark-microbe-visual bacteria" aria-label="Simplified bacterium">
          <svg viewBox="0 0 250 180">
            <rect x="45" y="45" width="145" height="85" rx="42" />
            <path d="M190 85q45-35 45 10q0 35-35 25" />
            {[75,110,145].map(x=><circle key={x} cx={x} cy="85" r="6" />)}
            <path className="microbe-dna" d="M75 105q35-35 70 0q20 18 38-2" />
          </svg>
        </div>
        <b>Bacterium</b>
        <span>Single cell. Many are harmless or useful. Some cause disease.</span>
      </article>
      <article>
        <div className="spark-microbe-visual virus" aria-label="Simplified virus particle">
          <svg viewBox="0 0 250 180">
            <circle cx="125" cy="90" r="52" />
            {[0,45,90,135,180,225,270,315].map(angle=>{
              const r=75,rad=angle*Math.PI/180;
              const x1=125+Math.cos(rad)*52,y1=90+Math.sin(rad)*52;
              const x2=125+Math.cos(rad)*r,y2=90+Math.sin(rad)*r;
              return <g key={angle}><line x1={x1} y1={y1} x2={x2} y2={y2}/><circle cx={x2} cy={y2} r="7"/></g>;
            })}
            <path className="microbe-genetic" d="M90 88q18-30 36 0t36 0" />
          </svg>
        </div>
        <b>Virus</b>
        <span>Not a cell. Reproduces only inside a living host cell.</span>
      </article>
      <article>
        <div className="spark-microbe-visual fungus" aria-label="Simplified mould fungus">
          <svg viewBox="0 0 250 180">
            <path d="M40 140Q80 110 115 140T205 138" />
            <path d="M85 140V65M135 140V45M180 138V75" />
            <circle cx="85" cy="58" r="25" />
            <circle cx="135" cy="38" r="25" />
            <circle cx="180" cy="68" r="25" />
            {[70,82,94,120,135,150,165,180,195].map((x,i)=><circle className="microbe-spore" key={i} cx={x} cy={25+(i%3)*13} r="5"/>)}
          </svg>
        </div>
        <b>Fungus</b>
        <span>Includes yeasts and moulds. Many decompose organic material.</span>
      </article>
    </div>
  );
}

function BacterialCellScene() {
  const ribosomes=[[360,180],[405,155],[455,190],[505,160],[555,200],[392,235],[448,255],[520,245],[575,265],[335,275],[410,305],[490,300],[550,325],[610,300],[375,350],[460,370],[535,365],[600,350]];
  const pili=[[[255,150],[205,115]],[[245,205],[185,190]],[[255,330],[195,360]],[[665,145],[725,105]],[[680,205],[750,190]],[[670,320],[735,355]]];
  return (
    <div className="spark-bacterial-cell-scene">
      <svg className="spark-bacterial-cell-svg" viewBox="0 0 980 560" role="img" aria-label="Labelled bacterium showing capsule, cell wall, cell membrane, cytoplasm, ribosomes, chromosome, plasmid, storage granules, pili and flagellum">
        <defs>
          <clipPath id="bacteria-inner-clip"><rect x="265" y="125" width="390" height="300" rx="150"/></clipPath>
        </defs>

        <rect className="bac-capsule" x="225" y="85" width="470" height="380" rx="190"/>
        <rect className="bac-wall" x="245" y="105" width="430" height="340" rx="170"/>
        <rect className="bac-membrane" x="265" y="125" width="390" height="300" rx="150"/>
        <rect className="bac-cytoplasm" x="275" y="135" width="370" height="280" rx="140"/>

        <g clipPath="url(#bacteria-inner-clip)">
          {ribosomes.map(([cx,cy],i)=><circle key={i} className="bac-ribosome" cx={cx} cy={cy} r="6"/>)}
          <ellipse className="bac-nucleoid" cx="475" cy="292" rx="145" ry="112"/>
          <path className="bac-chromosome" d="M365 270C390 205 430 330 462 245C493 167 527 330 564 245C589 187 614 248 590 295C562 350 510 255 475 335C449 394 404 323 386 357C363 399 330 350 350 310C370 270 390 295 405 265"/>
          <path className="bac-plasmid" d="M330 205C300 180 292 232 323 238C356 245 363 213 340 199C328 191 313 195 308 207"/>
          <path className="bac-plasmid second" d="M575 215C550 190 535 232 560 245C589 260 611 231 594 207C584 194 566 195 556 208"/>
          <circle className="bac-inclusion" cx="330" cy="330" r="18"/>
          <circle className="bac-inclusion" cx="596" cy="335" r="15"/>
        </g>

        {pili.map((p,i)=><line key={i} className="bac-pilus" x1={p[0][0]} y1={p[0][1]} x2={p[1][0]} y2={p[1][1]}/>)}
        <path className="bac-flagellum" d="M690 275C760 215 790 350 840 288C890 226 935 300 900 355"/>

        <g className="bac-callouts">
          <path d="M250 120L115 75"/><text x="105" y="72" textAnchor="end">capsule / slime layer</text>
          <path d="M260 155L118 145"/><text x="108" y="150" textAnchor="end">cell wall</text>
          <path d="M275 185L120 215"/><text x="110" y="220" textAnchor="end">cell membrane</text>
          <path d="M330 330L135 310"/><text x="125" y="315" textAnchor="end">storage granule</text>
          <path d="M365 280L142 395"/><text x="132" y="400" textAnchor="end">nucleoid, chromosome region</text>

          <path d="M555 198L805 95"/><text x="818" y="100">ribosomes</text>
          <path d="M575 220L805 165"/><text x="818" y="170">plasmid</text>
          <path d="M612 275L805 245"/><text x="818" y="250">cytoplasm</text>
          <path d="M680 205L805 320"/><text x="818" y="325">pilus</text>
          <path d="M820 290L805 395"/><text x="818" y="405">flagellum</text>
        </g>

        <text className="bac-caption" x="460" y="520" textAnchor="middle">prokaryotic cell, no membrane-bound nucleus</text>
      </svg>
      <div className="spark-bacterial-cell-notes">
        <article><b>Cell envelope</b><p>The cell membrane controls movement of substances. The cell wall supports the cell. A capsule or slime layer can add protection and help attachment.</p></article>
        <article><b>Genetic material</b><p>The main circular chromosome occupies a nucleoid region in the cytoplasm. The nucleoid is not surrounded by a membrane. Small extra DNA rings called plasmids may also occur.</p></article>
        <article><b>Protein synthesis</b><p>Ribosomes make proteins. Bacterial ribosomes are smaller than those in eukaryotic cells.</p></article>
        <article><b>Movement and attachment</b><p>Some bacteria use flagella for movement and pili for attachment or DNA transfer.</p></article>
      </div>
    </div>
  );
}

function FungalCellScene() {
  return (
    <div className="spark-fungal-cell-scene">
      <svg className="spark-fungal-cell-svg" viewBox="0 0 980 580" role="img" aria-label="Labelled budding yeast fungal cell showing cell wall, cell membrane, cytoplasm, nucleus, nucleolus, vacuole, mitochondria and a developing bud">
        <defs>
          <marker id="fungal-callout-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0 0L9 4.5L0 9Z" className="fc-arrow-head"/>
          </marker>
        </defs>

        <ellipse className="fc-wall" cx="480" cy="290" rx="245" ry="205"/>
        <ellipse className="fc-membrane" cx="480" cy="290" rx="226" ry="186"/>
        <ellipse className="fc-cytoplasm" cx="480" cy="290" rx="211" ry="171"/>

        <circle className="fc-vacuole" cx="545" cy="302" r="82"/>
        <circle className="fc-nucleus" cx="400" cy="245" r="58"/>
        <circle className="fc-nucleolus" cx="414" cy="237" r="17"/>

        <g className="fc-mitochondria">
          <g transform="translate(365 352) rotate(-18)">
            <ellipse cx="0" cy="0" rx="54" ry="25"/>
            <path d="M-35 -3Q-20 -18 -6 -3T24 -3T39 -3"/>
          </g>
          <g transform="translate(575 190) rotate(22)">
            <ellipse cx="0" cy="0" rx="48" ry="23"/>
            <path d="M-31 -2Q-17 -15 -4 -2T20 -2T34 -2"/>
          </g>
        </g>

        <g className="fc-ribosomes">
          {[[330,205],[345,285],[378,315],[438,365],[485,180],[610,265],[620,340],[505,405],[420,160],[650,300]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5"/>)}
        </g>

        <g className="fc-bud">
          <ellipse className="fc-bud-wall" cx="700" cy="185" rx="83" ry="72"/>
          <ellipse className="fc-bud-membrane" cx="700" cy="185" rx="69" ry="59"/>
          <path className="fc-bud-neck" d="M642 225Q627 249 606 258"/>
          <circle className="fc-bud-nucleus" cx="681" cy="181" r="23"/>
        </g>

        <g className="fc-callouts">
          <path d="M271 180L145 105" markerEnd="url(#fungal-callout-arrow)"/><text x="130" y="104" textAnchor="end">cell wall</text>
          <path d="M286 220L150 185" markerEnd="url(#fungal-callout-arrow)"/><text x="135" y="190" textAnchor="end">cell membrane</text>
          <path d="M331 301L150 285" markerEnd="url(#fungal-callout-arrow)"/><text x="135" y="290" textAnchor="end">cytoplasm</text>
          <path d="M390 244L150 385" markerEnd="url(#fungal-callout-arrow)"/><text x="135" y="390" textAnchor="end">nucleus</text>

          <path d="M548 302L802 305" markerEnd="url(#fungal-callout-arrow)"/><text x="818" y="310">large vacuole</text>
          <path d="M573 191L804 175" markerEnd="url(#fungal-callout-arrow)"/><text x="818" y="180">mitochondrion</text>
          <path d="M701 184L810 90" markerEnd="url(#fungal-callout-arrow)"/><text x="824" y="94">developing bud</text>
          <path d="M420 237L805 405" markerEnd="url(#fungal-callout-arrow)"/><text x="818" y="410">nucleolus</text>
        </g>

        <text className="fc-caption" x="480" y="542" textAnchor="middle">budding yeast example, a eukaryotic fungal cell</text>
      </svg>

      <div className="spark-fungal-cell-notes">
        <article><b>Cell wall and membrane</b><p>The cell wall supports and protects the fungal cell. The cell membrane controls movement of substances into and out of the cytoplasm.</p></article>
        <article><b>Nucleus</b><p>Fungal DNA is enclosed inside a membrane-bound nucleus, which distinguishes fungi from prokaryotic bacteria.</p></article>
        <article><b>Vacuole and mitochondria</b><p>Vacuoles store dissolved substances and help cell balance. Mitochondria release usable energy during aerobic respiration.</p></article>
        <article><b>Budding</b><p>Many yeasts reproduce asexually by budding. A small outgrowth enlarges and separates to form a new cell.</p></article>
      </div>
    </div>
  );
}

function UsefulScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Useful roles of microbes in yoghurt production nitrogen fixation and decomposition">
      <g transform="translate(60 80)">
        <rect className="microbe-food-cup" x="10" y="80" width="210" height="210" rx="25" />
        <path className="microbe-milk" d="M35 135Q115 115 195 135V260H35Z" />
        {[70,110,150,180].map((x,i)=><circle className="microbe-bacteria-dot" key={x} cx={x} cy={170+(i%2)*42} r="9"/>)}
        <text className="microbe-label" x="115" y="330" textAnchor="middle">bacteria make yoghurt</text>
      </g>

      <g transform="translate(360 55)">
        <path className="microbe-plant" d="M130 320V95m0 90q-75-50-105 0q60 50 105 25m0-55q80-55 118-5q-68 55-118 28" />
        <path className="microbe-roots" d="M130 315Q75 360 55 420M130 315Q150 370 185 420M130 330Q100 375 100 430M130 330Q195 360 220 410" />
        {[75,102,160,190].map((x,i)=><circle className="microbe-nodule" key={x} cx={x} cy={390+(i%2)*25} r="13"/>)}
        <text className="microbe-label" x="130" y="465" textAnchor="middle">root-nodule bacteria fix nitrogen</text>
      </g>

      <g transform="translate(660 70)">
        <path className="microbe-leaf-dead" d="M45 170Q120 95 220 165Q190 270 75 265Q35 230 45 170Z" />
        <path className="microbe-leaf-vein" d="M70 245Q120 205 190 145" />
        {[80,120,165,205].map((x,i)=><circle className="microbe-decomposer-dot" key={x} cx={x} cy={300+(i%2)*30} r="10"/>)}
        <path className="microbe-down-arrow" d="M130 275V365" />
        <rect className="microbe-soil" x="25" y="370" width="230" height="65" rx="12" />
        <text className="microbe-label" x="140" y="470" textAnchor="middle">decomposers recycle minerals</text>
      </g>
    </svg>
  );
}

function HarmfulScene() {
  return (
    <div className="spark-microbe-harm-grid">
      <article><b>Virus</b><span>Influenza and the common cold are viral infections.</span></article>
      <article><b>Bacterium</b><span>Tuberculosis is caused by a bacterium.</span></article>
      <article><b>Fungus</b><span>Ringworm and athlete's foot are fungal infections.</span></article>
      <article><b>Food spoilage</b><span>Bacteria and fungi can multiply in food and cause spoilage. Some microorganisms can also cause food-borne illness.</span></article>
    </div>
  );
}

function AntibioticScene() {
  return (
    <svg viewBox="0 0 980 500" role="img" aria-label="Penicillium mould and comparison of antibiotic action on bacteria and viruses">
      <g transform="translate(70 55)">
        <path className="microbe-mould-stem" d="M130 320V115M85 320V150M175 320V145" />
        <circle className="microbe-mould-head" cx="130" cy="100" r="38" />
        <circle className="microbe-mould-head" cx="85" cy="138" r="32" />
        <circle className="microbe-mould-head" cx="175" cy="133" r="32" />
        <text className="microbe-label" x="130" y="385" textAnchor="middle">Penicillium mould</text>
        <text className="microbe-small" x="130" y="415" textAnchor="middle">historical source of penicillin</text>
      </g>
      <path className="microbe-process-arrow" d="M310 235H415" />

      <g transform="translate(455 75)">
        <rect className="microbe-antibiotic-card works" x="0" y="0" width="200" height="300" rx="18" />
        <rect className="microbe-mini-bacterium" x="50" y="75" width="100" height="55" rx="28" />
        <path className="microbe-cross" d="M40 155L160 255M160 155L40 255" />
        <text className="microbe-card-title" x="100" y="40" textAnchor="middle">Bacteria</text>
        <text className="microbe-small" x="100" y="280" textAnchor="middle">antibiotics may work</text>
      </g>

      <g transform="translate(700 75)">
        <rect className="microbe-antibiotic-card no" x="0" y="0" width="200" height="300" rx="18" />
        <circle className="microbe-mini-virus" cx="100" cy="115" r="45" />
        <path className="microbe-no-symbol" d="M45 165L155 255M155 165L45 255" />
        <text className="microbe-card-title" x="100" y="40" textAnchor="middle">Viruses</text>
        <text className="microbe-small" x="100" y="280" textAnchor="middle">antibiotics do not work</text>
      </g>
    </svg>
  );
}

export default function MicrobeExplorer() {
  const [view,setView] = useState("compare");
  const info = VIEWS[view];

  return (
    <section className="spark-microbe-explorer">
      <header>
        <span>SELECTED MICROBES</span>
        <h3>Small organisms, different roles</h3>
        <p>Compare viruses, bacteria and fungi, then connect each group to useful activities and harmful effects.</p>
      </header>

      <div className="spark-microbe-tabs">
        {Object.entries(VIEWS).map(([key,item])=>(
          <button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className={view==="compare"||view==="harmful" ? "spark-microbe-stage cards" : "spark-microbe-stage"}>
        {view==="compare" && <CompareScene />}
        {view==="bacterial" && <BacterialCellScene />}
        {view==="fungal" && <FungalCellScene />}
        {view==="useful" && <UsefulScene />}
        {view==="harmful" && <HarmfulScene />}
        {view==="antibiotics" && <AntibioticScene />}
      </div>

      <div className="spark-microbe-summary">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>
    </section>
  );
}
