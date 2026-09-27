import React, { useMemo, useState } from "react";
import "./excretionEgestionExplorer.css";

const ITEMS = {
  carbonDioxide:{
    title:"Carbon dioxide",
    origin:"Produced by aerobic respiration in body cells.",
    route:"Carried in the blood to the lungs and breathed out.",
    type:"excretion",
    organ:"Lungs",
  },
  urea:{
    title:"Urea",
    origin:"Formed in the liver after excess amino acids are deaminated.",
    route:"Carried in the blood to the kidneys and removed in urine.",
    type:"excretion",
    organ:"Kidneys",
  },
  sweat:{
    title:"Water and salts in sweat",
    origin:"Excess water and mineral salts are present in body fluids. A small amount of urea is also lost in sweat.",
    route:"Sweat glands release sweat onto the skin surface.",
    type:"excretion",
    organ:"Skin",
  },
  bilePigment:{
    title:"Bile pigments",
    origin:"Produced from the breakdown of haemoglobin from old red blood cells.",
    route:"Processed by the liver, released in bile into the gut and removed from the body with faecal material.",
    type:"excretion",
    organ:"Liver to gut",
  },
  faeces:{
    title:"Undigested food in faeces",
    origin:"Material that was not digested and absorbed into body cells.",
    route:"Passes through the large intestine and leaves through the anus.",
    type:"egestion",
    organ:"Alimentary canal",
  },
};

function DecisionScene() {
  return (
    <div className="spark-excretion-decision">
      <svg className="spark-excretion-decision-svg" viewBox="0 0 980 600" role="img" aria-label="Decision pathway distinguishing excretion from egestion by tracing whether material was produced by metabolism inside the body or remained undigested and unabsorbed in the alimentary canal">
        <defs>
          <marker id="ee-decision-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0 0L9 4.5L0 9Z" className="eed-arrow-head"/>
          </marker>
        </defs>

        <rect className="eed-start" x="330" y="35" width="320" height="90" rx="18"/>
        <text className="eed-heading" x="490" y="72" textAnchor="middle">Where did the material come from?</text>
        <text className="eed-small" x="490" y="100" textAnchor="middle">trace its origin before naming the process</text>

        <path className="eed-branch excretion" d="M420 125Q300 175 245 230" markerEnd="url(#ee-decision-arrow)"/>
        <path className="eed-branch egestion" d="M560 125Q680 175 735 230" markerEnd="url(#ee-decision-arrow)"/>

        <g className="eed-origin-cell" transform="translate(80 210)">
          <rect x="0" y="0" width="340" height="185" rx="18"/>
          <circle className="eed-cell" cx="85" cy="80" r="48"/>
          <circle className="eed-nucleus" cx="85" cy="80" r="18"/>
          <path className="eed-metabolism-arrow" d="M145 80H210" markerEnd="url(#ee-decision-arrow)"/>
          <circle className="eed-waste-dot" cx="232" cy="80" r="12"/>
          <text className="eed-card-title" x="170" y="135" textAnchor="middle">made by metabolism</text>
          <text className="eed-card-note" x="170" y="160" textAnchor="middle">or present in excess in the internal body environment</text>
        </g>

        <g className="eed-origin-gut" transform="translate(560 210)">
          <rect x="0" y="0" width="340" height="185" rx="18"/>
          <path className="eed-gut" d="M70 35H155V72H120V122H155V158H70V122H103V72H70Z"/>
          <g className="eed-food-dots">
            <circle cx="92" cy="61" r="7"/><circle cx="129" cy="96" r="7"/><circle cx="91" cy="137" r="7"/>
          </g>
          <path className="eed-not-absorbed" d="M175 96H230" markerEnd="url(#ee-decision-arrow)"/>
          <text className="eed-card-title" x="170" y="135" textAnchor="middle">undigested or unabsorbed food</text>
          <text className="eed-card-note" x="170" y="160" textAnchor="middle">remains inside the alimentary canal</text>
        </g>

        <path className="eed-outcome-arrow excretion" d="M250 405V465" markerEnd="url(#ee-decision-arrow)"/>
        <path className="eed-outcome-arrow egestion" d="M730 405V465" markerEnd="url(#ee-decision-arrow)"/>

        <g className="eed-outcome excretion">
          <rect x="90" y="475" width="320" height="90" rx="18"/>
          <text className="eed-outcome-title" x="250" y="512" textAnchor="middle">EXCRETION</text>
          <text className="eed-small" x="250" y="540" textAnchor="middle">removal of metabolic wastes or excess substances</text>
        </g>

        <g className="eed-outcome egestion">
          <rect x="570" y="475" width="320" height="90" rx="18"/>
          <text className="eed-outcome-title" x="730" y="512" textAnchor="middle">EGESTION</text>
          <text className="eed-small" x="730" y="540" textAnchor="middle">removal of undigested material from the alimentary canal</text>
        </g>

        <text className="eed-example" x="250" y="590" textAnchor="middle">CO₂, urea, excess salts and water</text>
        <text className="eed-example" x="730" y="590" textAnchor="middle">undigested fibre in faeces</text>
      </svg>
    </div>
  );
}

function RouteScene({itemKey}) {
  const item = ITEMS[itemKey];
  const isEgestion = item.type === "egestion";
  return (
    <div className="spark-excretion-route-layout">
      <div className="spark-excretion-route-stage">
        <svg viewBox="0 0 880 440" role="img" aria-label={item.title + " removal pathway"}>
          <g transform="translate(115 205)">
            <circle className="ee-cell" cx="0" cy="0" r="72" />
            <circle className="ee-nucleus" cx="0" cy="0" r="25" />
            <text className="ee-label" x="0" y="120" textAnchor="middle">{isEgestion ? "gut contents" : "body cells"}</text>
          </g>

          <path className={isEgestion ? "ee-route egestion" : "ee-route excretion"} d="M210 205H360" />
          <circle className={isEgestion ? "ee-item-dot egestion" : "ee-item-dot excretion"} cx="290" cy="205" r="16" />

          <g transform="translate(475 205)">
            {itemKey === "carbonDioxide" && <>
              <ellipse className="ee-lung" cx="-34" cy="0" rx="50" ry="75" />
              <ellipse className="ee-lung" cx="34" cy="0" rx="50" ry="75" />
              <path className="ee-trachea" d="M0-115V-55" />
            </>}
            {itemKey === "urea" && <>
              <path className="ee-kidney" d="M-50-70Q-100-65-90 15Q-80 90-20 85Q25 70 15 20Q5-20 35-55Q10-75-50-70Z" />
              <path className="ee-ureter" d="M-15 82Q0 130 0 155" />
            </>}
            {itemKey === "sweat" && <>
              <rect className="ee-skin" x="-100" y="-60" width="200" height="120" rx="18" />
              <path className="ee-sweat-gland" d="M0 45q-40-20 0-40q40-20 0-40q-40-20 0-40" />
              <path className="ee-sweat-duct" d="M0-75V-135" />
              <circle className="ee-sweat-drop" cx="0" cy="-160" r="16" />
            </>}
            {itemKey === "bilePigment" && <>
              <path className="ee-liver" d="M-105-45Q0-105 110-35Q75 40 0 62Q-70 55-105-45Z" />
              <path className="ee-bile-duct" d="M40 45Q70 90 95 105" />
              <path className="ee-gut" d="M100 105q35 35 0 70q-35 35 0 70" />
            </>}
            {itemKey === "faeces" && <>
              <path className="ee-gut-large" d="M-95-95H95V-45H55V65H95V115H-95V65H-55V-45H-95Z" />
              <path className="ee-egestion-arrow" d="M0 115V175" />
            </>}
            <text className="ee-organ-label" x="0" y="215" textAnchor="middle">{item.organ}</text>
          </g>

          <path className={isEgestion ? "ee-route egestion" : "ee-route excretion"} d="M590 205H760" />
          <text className="ee-exit-label" x="760" y="188" textAnchor="middle">outside</text>
          <path className="ee-exit-arrow" d="M720 205H800" />
        </svg>
      </div>
      <aside>
        <span>{item.type === "excretion" ? "EXCRETORY PRODUCT" : "EGESTED MATERIAL"}</span>
        <h4>{item.title}</h4>
        <div><b>Origin</b><p>{item.origin}</p></div>
        <div><b>Route out</b><p>{item.route}</p></div>
        <div className={item.type === "excretion" ? "classification excretion" : "classification egestion"}>
          <b>Classification</b>
          <strong>{item.type === "excretion" ? "Excretion" : "Egestion"}</strong>
        </div>
      </aside>
    </div>
  );
}

function SortingScene() {
  const rows = [
    ["Carbon dioxide","Respiration in cells","Excretion"],
    ["Urea","Breakdown of excess amino acids","Excretion"],
    ["Water and salts in sweat","Body fluids","Excretion"],
    ["Bile pigments","Breakdown of haemoglobin","Excretion"],
    ["Undigested fibre","Food that was never absorbed","Egestion"],
  ];
  return (
    <div className="spark-excretion-table">
      <table>
        <thead>
          <tr><th>Material</th><th>Origin</th><th>Process</th></tr>
        </thead>
        <tbody>
          {rows.map(([material,origin,process])=>(
            <tr key={material}>
              <td>{material}</td>
              <td>{origin}</td>
              <td><span className={process.toLowerCase()}>{process}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ExcretionEgestionExplorer() {
  const [view,setView] = useState("decision");
  const [itemKey,setItemKey] = useState("carbonDioxide");
  const item = useMemo(() => ITEMS[itemKey],[itemKey]);

  return (
    <section className="spark-excretion-egestion">
      <header>
        <span>EXCRETION OR EGESTION?</span>
        <h3>Classify material by where it came from</h3>
        <p>The key question is whether the material is a waste product of metabolism or undigested material that never became part of body cells.</p>
      </header>

      <div className="spark-excretion-tabs">
        <button type="button" className={view==="decision"?"active":""} onClick={()=>setView("decision")}>Decision path</button>
        <button type="button" className={view==="routes"?"active":""} onClick={()=>setView("routes")}>Waste routes</button>
        <button type="button" className={view==="sort"?"active":""} onClick={()=>setView("sort")}>Compare examples</button>
      </div>

      {view === "decision" && <DecisionScene />}

      {view === "routes" && (
        <>
          <div className="spark-excretion-choice">
            {Object.entries(ITEMS).map(([key,value])=>(
              <button type="button" key={key} className={itemKey===key?"active":""} onClick={()=>setItemKey(key)}>{value.title}</button>
            ))}
          </div>
          <RouteScene itemKey={itemKey} />
          <div className="spark-excretion-selected">
            <strong>{item.title}</strong>
            <span>{item.type === "excretion"
              ? "This is excretion because the removed material is a metabolic waste or excess substance from the internal body environment."
              : "This is egestion because the material was never absorbed into body cells and remains in the alimentary canal."}</span>
          </div>
        </>
      )}

      {view === "sort" && <SortingScene />}
    </section>
  );
}
