import React,{useMemo,useState} from "react";
import "./waterPurificationExplorer.css";

function TreatmentView(){
  const [stage,setStage]=useState("sedimentation");
  const stages={
    sedimentation:{title:"Sedimentation",text:"Larger suspended particles settle when water is left still or after coagulation has formed heavier flocs."},
    coagulation:{title:"Coagulation with alum",text:"Alum helps tiny suspended particles clump together into larger flocs that settle more easily."},
    filtration:{title:"Filtration",text:"Sand and other filter media trap fine suspended solids that remain after settling."},
    chlorination:{title:"Chlorination",text:"A controlled chlorine dose disinfects water by killing or inactivating many disease-causing microorganisms."}
  };
  const data=stages[stage];

  return <div className="spark-purification-treatment">
    <div className="spark-purification-buttons">{Object.entries(stages).map(([key,item])=><button key={key} type="button" aria-pressed={stage===key} className={stage===key?"active":""} onClick={()=>setStage(key)}>{item.title}</button>)}</div>

    <div className="spark-treatment-process">
      <svg viewBox="0 0 1080 560" role="img" aria-label="Water treatment plant sequence from raw water through coagulation with alum, sedimentation, sand filtration and chlorination to treated water">
        <defs>
          <linearGradient id="wp-raw-water" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#9dc9d8" />
            <stop offset="100%" stopColor="#6d9fad" />
          </linearGradient>
          <linearGradient id="wp-clean-water" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c9edf7" />
            <stop offset="100%" stopColor="#91cee4" />
          </linearGradient>
        </defs>

        <text className="wp-process-heading" x="540" y="38" textAnchor="middle">Typical municipal water-treatment sequence</text>

        <g className={stage==="coagulation"?"wp-treatment-step active":"wp-treatment-step"} transform="translate(35 92)">
          <rect className="wp-process-card" x="0" y="0" width="220" height="340" rx="18" />
          <text className="wp-step-number" x="28" y="34">1</text>
          <text className="wp-step-title" x="110" y="34" textAnchor="middle">Coagulation</text>
          <rect className="wp-tank" x="28" y="72" width="164" height="180" rx="12" />
          <path className="wp-raw-water" d="M28 135H192V252H28Z" />
          {[55,84,118,151,173].map((x,i)=><circle key={x} className="wp-particle fine" cx={x} cy={155+(i%2)*38} r="5" />)}
          <path className="wp-alum-pipe" d="M110 47V86" />
          <circle className="wp-alum-drop" cx="110" cy="98" r="8" />
          <path className="wp-mixer" d="M110 155V220M80 188H140" />
          <g className="wp-flocs">
            <circle cx="66" cy="210" r="14" /><circle cx="72" cy="205" r="8" />
            <circle cx="145" cy="190" r="16" /><circle cx="155" cy="198" r="9" />
          </g>
          <text className="wp-small" x="110" y="278" textAnchor="middle">alum + mixing</text>
          <text className="wp-small" x="110" y="300" textAnchor="middle">fine particles form flocs</text>
        </g>

        <path className="wp-flow-arrow" d="M262 260H300" />

        <g className={stage==="sedimentation"?"wp-treatment-step active":"wp-treatment-step"} transform="translate(300 92)">
          <rect className="wp-process-card" x="0" y="0" width="220" height="340" rx="18" />
          <text className="wp-step-number" x="28" y="34">2</text>
          <text className="wp-step-title" x="110" y="34" textAnchor="middle">Sedimentation</text>
          <path className="wp-settling-tank" d="M28 86H192V236Q172 255 110 263Q48 255 28 236Z" />
          <path className="wp-settled-water" d="M31 128H189V232Q166 248 110 254Q54 248 31 232Z" />
          {[52,78,109,144,170].map((x,i)=><circle key={x} className="wp-floc-dot" cx={x} cy={150+(i%2)*35} r={7+(i%3)*2} />)}
          <path className="wp-sludge" d="M43 225Q110 198 177 225Q162 247 110 252Q58 247 43 225Z" />
          <path className="wp-settle-arrow" d="M72 160V210M112 145V216M153 165V213" />
          <text className="wp-small" x="110" y="286" textAnchor="middle">flocs settle as sludge</text>
          <text className="wp-small" x="110" y="308" textAnchor="middle">clearer water leaves top</text>
        </g>

        <path className="wp-flow-arrow" d="M527 260H565" />

        <g className={stage==="filtration"?"wp-treatment-step active":"wp-treatment-step"} transform="translate(565 92)">
          <rect className="wp-process-card" x="0" y="0" width="220" height="340" rx="18" />
          <text className="wp-step-number" x="28" y="34">3</text>
          <text className="wp-step-title" x="110" y="34" textAnchor="middle">Filtration</text>
          <rect className="wp-filter" x="36" y="78" width="148" height="188" rx="10" />
          <rect className="wp-water-layer" x="39" y="82" width="142" height="42" />
          <rect className="wp-sand-layer" x="39" y="124" width="142" height="58" />
          <rect className="wp-gravel-layer" x="39" y="182" width="142" height="52" />
          <rect className="wp-filter-outlet" x="39" y="234" width="142" height="28" />
          <path className="wp-filter-arrow" d="M110 94V246" />
          {[65,90,135,158].map((x,i)=><circle key={x} className="wp-particle trapped" cx={x} cy={145+(i%2)*28} r="5" />)}
          <text className="wp-layer-label" x="110" y="154" textAnchor="middle">sand</text>
          <text className="wp-layer-label" x="110" y="214" textAnchor="middle">gravel</text>
          <text className="wp-small" x="110" y="292" textAnchor="middle">fine suspended matter</text>
          <text className="wp-small" x="110" y="314" textAnchor="middle">is trapped</text>
        </g>

        <path className="wp-flow-arrow" d="M792 260H830" />

        <g className={stage==="chlorination"?"wp-treatment-step active":"wp-treatment-step"} transform="translate(830 92)">
          <rect className="wp-process-card" x="0" y="0" width="220" height="340" rx="18" />
          <text className="wp-step-number" x="28" y="34">4</text>
          <text className="wp-step-title" x="110" y="34" textAnchor="middle">Chlorination</text>
          <rect className="wp-contact-tank" x="30" y="86" width="160" height="170" rx="16" />
          <path className="wp-clean-water" d="M34 135H186V252H34Z" />
          <path className="wp-chlorine-pipe" d="M110 52V98" />
          <circle className="wp-chlorine-drop" cx="110" cy="108" r="8" />
          <g className="wp-microbes">
            {[62,92,130,160].map((x,i)=><g key={x} transform={`translate(${x} ${170+(i%2)*32})`}><circle r="10"/><path d="M-14-14L14 14M14-14L-14 14"/></g>)}
          </g>
          <text className="wp-small" x="110" y="282" textAnchor="middle">controlled chlorine dose</text>
          <text className="wp-small" x="110" y="304" textAnchor="middle">disinfects the water</text>
        </g>

        <path className="wp-treated-pipe" d="M1050 260H1070" />
        <text className="wp-raw-label" x="35" y="470">raw water</text>
        <path className="wp-intake-arrow" d="M35 445H120" />
        <text className="wp-treated-label" x="905" y="470">treated water ready for safe distribution</text>
      </svg>
    </div>

    <article><span>{data.title.toUpperCase()}</span><h4>{data.title}</h4><p>{data.text}</p></article>
    <div className="spark-treatment-order"><b>Coagulation + sedimentation</b><span>→</span><b>Filtration</b><span>→</span><b>Disinfection</b></div>
  </div>;
}

function DistillationView(){
  return <div className="spark-purification-distillation">
    <svg viewBox="0 0 880 380" role="img" aria-label="Simple distillation apparatus producing fresh water from sea water">
      <rect className="wp-flask" x="80" y="150" width="180" height="145" rx="55"/>
      <path className="wp-water" d="M100 215H240V275Q170 310 100 275Z"/>
      <text className="wp-label" x="170" y="245" textAnchor="middle">sea water</text>
      <path className="wp-steam" d="M170 150Q170 90 315 90"/>
      <rect className="wp-cond" x="315" y="68" width="300" height="44" rx="22"/>
      <path className="wp-condensate" d="M615 90Q700 90 700 185"/>
      <rect className="wp-beaker" x="645" y="185" width="115" height="110" rx="8"/>
      <text className="wp-label" x="703" y="242" textAnchor="middle">fresh water</text>
      <text className="wp-label" x="170" y="330" textAnchor="middle">salt remains</text>
    </svg>
    <p>Distillation boils water, leaves dissolved salts behind and condenses the vapour as fresh water. It can desalinate sea water but requires energy.</p>
  </div>;
}

function ReverseOsmosisView(){
  const [pressure,setPressure]=useState(70);
  return <div className="spark-ro-view">
    <label>Applied pressure<input type="range" min="20" max="100" value={pressure} onChange={e=>setPressure(e.target.value)}/></label>
    <div className="spark-ro-model">
      <div className="spark-ro-feed">salty water<br/><small>water + ions</small></div>
      <div className="spark-ro-membrane">semi-permeable membrane</div>
      <div className="spark-ro-product">fresh water</div>
      <div className="spark-ro-brine">concentrated brine</div>
    </div>
    <p>Reverse osmosis uses pressure to force water through a membrane that rejects most dissolved salts. Higher pressure is required than for ordinary osmosis.</p>
  </div>;
}

function HouseholdView(){
  return <div className="spark-purification-household">
    <article><span>BOILING</span><h4>Emergency disinfection</h4><p>Boiling kills many disease-causing microorganisms. It does not remove dissolved salts, heavy metals or every chemical contaminant.</p></article>
    <article><span>ACTIVATED CARBON</span><h4>Taste and odour control</h4><p>Activated carbon adsorbs many organic compounds that cause unpleasant taste and smell. It is not a complete disinfection method by itself.</p></article>
    <article><span>SAFE STORAGE</span><h4>Avoid recontamination</h4><p>Treated water should be kept in a clean covered container and handled with clean utensils.</p></article>
  </div>;
}

export default function WaterPurificationExplorer(){
  const [view,setView]=useState("treatment");
  const summary=useMemo(()=>({
    treatment:"Water treatment combines physical removal of suspended matter with controlled disinfection.",
    distillation:"Distillation removes non-volatile dissolved salts by evaporating and condensing the water.",
    ro:"Reverse osmosis removes salts by forcing water through a selective membrane under pressure.",
    household:"Household methods can improve safety, but each method has limits."
  })[view],[view]);
  return <section className="spark-water-purification">
    <header><span>WATER PURIFICATION</span><h3>Compare treatment, distillation, reverse osmosis and household methods</h3><p>Purification methods are chosen according to the contaminants present. No single step removes every possible impurity.</p></header>
    <div className="spark-purification-tabs">{[["treatment","Treatment plant"],["distillation","Distillation"],["ro","Reverse osmosis"],["household","Household treatment"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-purification-stage">{view==="treatment"&&<TreatmentView/>}{view==="distillation"&&<DistillationView/>}{view==="ro"&&<ReverseOsmosisView/>}{view==="household"&&<HouseholdView/>}</div>
    <div className="spark-purification-summary"><strong>{summary}</strong><span>Typical sequence: settle/coagulate, filter, then disinfect.</span></div>
  </section>;
}
