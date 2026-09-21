import React,{useMemo,useState} from "react";
import "./breathingMechanismExplorer.css";

function AnatomyView(){
  return <div className="spark-respiratory-anatomy">
    <svg className="spark-respiratory-anatomy-svg" viewBox="0 0 900 720" role="img" aria-label="Human respiratory system showing nasal cavity, oral cavity, pharynx, epiglottis, larynx, trachea, bronchi, bronchioles, lungs and diaphragm">
      <path className="ra-profile" d="M330 72Q275 88 260 130Q253 176 292 205Q315 220 325 250V320"/>
      <path className="ra-nasal" d="M270 130Q320 103 357 130Q337 155 302 163Q283 159 270 130Z"/>
      <path className="ra-oral" d="M286 176Q323 160 354 181Q331 202 302 203Q289 196 286 176Z"/>
      <path className="ra-pharynx" d="M354 132Q378 175 357 222"/>
      <path className="ra-epiglottis" d="M350 218Q372 223 364 245Q347 241 350 218Z"/>
      <path className="ra-larynx" d="M348 238Q375 248 365 284H341Q331 250 348 238Z"/>
      <path className="ra-trachea" d="M353 280V404"/>
      {[300,322,344,366,388].map(y=><line key={y} className="ra-ring" x1="339" y1={y} x2="367" y2={y}/>)}
      <path className="ra-bronchi" d="M353 405Q315 430 288 456M353 405Q391 430 418 456"/>
      <path className="ra-lung left" d="M245 365Q177 400 170 510Q172 604 265 630Q328 605 327 492Q323 401 278 372Q260 362 245 365Z"/>
      <path className="ra-lung right" d="M461 365Q529 400 536 510Q534 604 441 630Q378 605 379 492Q383 401 428 372Q446 362 461 365Z"/>
      <g className="ra-bronchioles">
        <path d="M288 456Q250 475 228 510M288 456Q303 492 299 535M228 510Q210 535 210 566M299 535Q318 555 310 582"/>
        <path d="M418 456Q456 475 478 510M418 456Q403 492 407 535M478 510Q496 535 496 566M407 535Q388 555 396 582"/>
      </g>
      <g className="ra-alveoli">
        <circle cx="210" cy="575" r="11"/><circle cx="224" cy="584" r="11"/><circle cx="238" cy="575" r="11"/>
        <circle cx="468" cy="575" r="11"/><circle cx="482" cy="584" r="11"/><circle cx="496" cy="575" r="11"/>
      </g>
      <path className="ra-diaphragm" d="M155 626Q353 675 551 626"/>

      <g className="ra-labels">
        <path d="M303 140L100 102"/><text x="86" y="106" textAnchor="end">nasal cavity</text>
        <path d="M308 184L100 170"/><text x="86" y="175" textAnchor="end">oral cavity</text>
        <path d="M359 180L100 238"/><text x="86" y="243" textAnchor="end">pharynx</text>
        <path d="M356 230L100 300"/><text x="86" y="305" textAnchor="end">epiglottis</text>
        <path d="M353 258L100 350"/><text x="86" y="355" textAnchor="end">larynx</text>

        <path d="M353 330L670 185"/><text x="685" y="190">trachea</text>
        <path d="M391 430L670 265"/><text x="685" y="270">primary bronchi</text>
        <path d="M454 490L670 345"/><text x="685" y="350">bronchioles</text>
        <path d="M462 430L670 425"/><text x="685" y="430">right lung</text>
        <path d="M238 575L670 505"/><text x="685" y="510">alveoli</text>
        <path d="M440 642L670 590"/><text x="685" y="595">diaphragm</text>
      </g>
      <path className="ra-airway-arrow" d="M303 120Q330 135 341 165Q350 195 353 245V395"/>
      <text className="ra-caption" x="355" y="700" textAnchor="middle">air pathway: nose or mouth → pharynx → larynx → trachea → bronchi → bronchioles → alveoli</text>
    </svg>
    <div className="spark-respiratory-anatomy-notes">
      <article><b>Upper airway</b><p>The nose filters, warms and moistens incoming air. The pharynx conducts air towards the larynx.</p></article>
      <article><b>Epiglottis and larynx</b><p>The epiglottis helps protect the airway during swallowing. The larynx contains the vocal folds.</p></article>
      <article><b>Conducting passages</b><p>The trachea divides into bronchi. These branch repeatedly into smaller bronchioles inside the lungs.</p></article>
      <article><b>Exchange region</b><p>Bronchioles lead to alveoli, where oxygen and carbon dioxide diffuse between air and blood.</p></article>
    </div>
  </div>;
}

function MechanismView(){
  const [phase,setPhase]=useState("inhale");
  const inhale=phase==="inhale";
  return <div className="spark-breathing-mechanism">
    <div className="spark-breathing-toggle">
      <button type="button" className={inhale?"active":""} onClick={()=>setPhase("inhale")}>Inhalation</button>
      <button type="button" className={!inhale?"active":""} onClick={()=>setPhase("exhale")}>Exhalation</button>
    </div>
    <div className={"spark-breathing-chest "+(inhale?"inhale":"exhale")}>
      <svg viewBox="0 0 700 440" role="img" aria-label={inhale?"Chest changes during inhalation":"Chest changes during exhalation"}>
        <path className="bm-ribcage" d={inhale
          ?"M155 88Q350 25 545 88Q610 210 545 342Q350 400 155 342Q90 210 155 88Z"
          :"M190 108Q350 58 510 108Q560 210 510 316Q350 360 190 316Q140 210 190 108Z"}/>

        <path className="bm-trachea" d="M350 30V145M350 142L295 192M350 142L405 192"/>
        {[65,85,105,125].map(y=><line key={y} className="bm-tracheal-ring" x1="338" y1={y} x2="362" y2={y}/>)}

        <path className="bm-lung left" d={inhale
          ?"M229 126Q166 190 190 298Q219 354 313 338Q338 265 325 177Q298 124 229 126Z"
          :"M247 146Q201 201 219 282Q244 322 310 310Q327 253 317 194Q296 149 247 146Z"}/>
        <path className="bm-lung right" d={inhale
          ?"M471 126Q534 190 510 298Q481 354 387 338Q362 265 375 177Q402 124 471 126Z"
          :"M453 146Q499 201 481 282Q456 322 390 310Q373 253 383 194Q404 149 453 146Z"}/>

        <g className="bm-bronchioles">
          <path d="M295 192Q263 214 246 247M296 193Q312 226 307 270M405 192Q437 214 454 247M404 193Q388 226 393 270"/>
          <path d="M254 236Q238 263 238 288M446 236Q462 263 462 288"/>
        </g>

        <g className="bm-ribs">
          {[0,1,2,3,4].map(i=>{
            const y=115+i*45;
            const leftX=inhale?145+i*3:180+i*2;
            const rightX=inhale?555-i*3:520-i*2;
            return <path key={i} d={`M${leftX} ${y}Q350 ${y-45} ${rightX} ${y}`}/>;
          })}
        </g>

        <path className="bm-sternum" d="M350 102V315"/>
        <path className="bm-diaphragm" d={inhale?"M150 340Q350 365 550 340":"M180 320Q350 255 520 320"}/>

        <path className="bm-air-arrow" d={inhale?"M350 5V65":"M350 65V5"}/>
        <text className="bm-air-label" x="370" y="42">{inhale?"air enters":"air leaves"}</text>

        <path className="bm-rib-arrow left" d={inhale?"M165 215L115 180":"M120 180L170 215"}/>
        <path className="bm-rib-arrow right" d={inhale?"M535 215L585 180":"M580 180L530 215"}/>
        <text className="bm-rib-label" x="350" y="405" textAnchor="middle">{inhale?"ribs move up and out; diaphragm flattens":"ribs move down and in; diaphragm domes upward"}</text>
      </svg>
      <div className="spark-breathing-facts">
        <article><span>Diaphragm</span><strong>{inhale?"contracts and flattens":"relaxes and becomes dome-shaped"}</strong></article>
        <article><span>Ribs</span><strong>{inhale?"move up and out":"move down and in"}</strong></article>
        <article><span>Thoracic volume</span><strong>{inhale?"increases":"decreases"}</strong></article>
        <article><span>Pressure in lungs</span><strong>{inhale?"falls below atmospheric pressure":"rises above atmospheric pressure"}</strong></article>
      </div>
    </div>
  </div>;
}

function BellJarView(){
  const [pulled,setPulled]=useState(true);
  return <div className="spark-bell-jar">
    <div className="spark-bell-jar-controls"><button type="button" className={pulled?"active":""} onClick={()=>setPulled(true)}>Pull sheet down</button><button type="button" className={!pulled?"active":""} onClick={()=>setPulled(false)}>Push sheet up</button></div>
    <svg viewBox="0 0 760 430" role="img" aria-label="Bell jar model of breathing">
      <path className="bj-jar" d="M210 65H550V345Q550 385 510 385H250Q210 385 210 345Z"/>
      <path className="bj-tube" d="M380 35V160M380 155L315 220M380 155L445 220"/>
      <ellipse className={"bj-balloon "+(pulled?"inflated":"deflated")} cx="300" cy="255" rx={pulled?65:45} ry={pulled?95:65}/>
      <ellipse className={"bj-balloon "+(pulled?"inflated":"deflated")} cx="460" cy="255" rx={pulled?65:45} ry={pulled?95:65}/>
      <path className="bj-sheet" d={pulled?"M205 365Q380 410 555 365":"M205 365Q380 315 555 365"}/>
      <text className="bj-label" x="380" y="418" textAnchor="middle">{pulled?"rubber sheet pulled down":"rubber sheet pushed up"}</text>
    </svg>
    <p>{pulled?"Pulling the sheet down increases jar volume and lowers internal pressure, so air enters the balloons and they inflate.":"Pushing the sheet up decreases jar volume and raises internal pressure, so air leaves the balloons and they deflate."}</p>
    <small>The rubber sheet represents the diaphragm. The balloons represent the lungs. The jar wall does not model rib movement accurately, so this is a simplified model.</small>
  </div>;
}

function AirView(){
  const rows=[
    ["Oxygen","about 21%","about 16%","Some oxygen diffuses into the blood."],
    ["Carbon dioxide","about 0.04%","about 4%","Carbon dioxide from respiration diffuses from blood into alveolar air."],
    ["Nitrogen","about 78%","about 78%","Little net exchange occurs."],
    ["Water vapour","variable","higher","Air is humidified in the respiratory tract."],
  ];
  return <div className="spark-air-comparison"><div className="spark-air-head"><span>Gas</span><strong>Inhaled</strong><strong>Exhaled</strong><strong>Reason</strong></div>{rows.map(row=><div key={row[0]}><span>{row[0]}</span><p>{row[1]}</p><p>{row[2]}</p><p>{row[3]}</p></div>)}</div>;
}

function CPRView(){
  return <div className="spark-cpr-view">
    <article><span>1</span><div><b>Check safety and response</b><p>Make sure the scene is safe. Check whether the person responds and activate emergency help if the person is unresponsive.</p></div></article>
    <article><span>2</span><div><b>Check breathing</b><p>If the person is not breathing normally or is only gasping, begin CPR and get an AED as soon as one is available.</p></div></article>
    <article><span>3</span><div><b>Chest compressions</b><p>For an adult, current AHA guidance uses a rate of about 100 to 120 compressions per minute.</p></div></article>
    <article><span>4</span><div><b>Conventional CPR</b><p>For trained rescuers without an advanced airway, the standard cycle is 30 compressions followed by 2 breaths.</p></div></article>
    <article><span>5</span><div><b>Hands-only option</b><p>For an untrained bystander who witnesses a sudden adult collapse, hands-only CPR is an accepted approach while emergency help and an AED are obtained.</p></div></article>
  </div>;
}

export default function BreathingMechanismExplorer(){
  const [view,setView]=useState("mechanism");
  const summary=useMemo(()=>({
    anatomy:"Air travels through a branching respiratory tract before reaching the alveoli for gaseous exchange.",
    mechanism:"Air moves because respiratory muscles change thoracic volume and therefore pressure.",
    model:"The bell-jar model demonstrates the pressure-volume principle but does not reproduce every feature of the rib cage.",
    air:"Exhaled air contains less oxygen and more carbon dioxide and water vapour than inhaled air.",
    cpr:"CPR combines rapid recognition, emergency activation, chest compressions and, for trained rescuers, rescue breaths.",
  })[view],[view]);

  return <section className="spark-breathing-mechanism-explorer">
    <header><span>MECHANISM OF BREATHING</span><h3>Link muscle action to chest volume, pressure and airflow</h3><p>Breathing depends on pressure differences created when the diaphragm and intercostal muscles change the volume of the thoracic cavity.</p></header>
    <div className="spark-breathing-tabs">{[["anatomy","Respiratory anatomy"],["mechanism","Inhale and exhale"],["model","Bell-jar model"],["air","Air composition"],["cpr","CPR"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-breathing-stage">
      {view==="anatomy"&&<AnatomyView/>}
      {view==="mechanism"&&<MechanismView/>}
      {view==="model"&&<BellJarView/>}
      {view==="air"&&<AirView/>}
      {view==="cpr"&&<CPRView/>}
    </div>
    <div className="spark-breathing-summary"><strong>{summary}</strong><span>Inhalation is active during quiet breathing because the diaphragm and external intercostal muscles contract. Quiet exhalation is mainly passive as these muscles relax and elastic tissues recoil.</span></div>
  </section>;
}
