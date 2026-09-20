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
      <article className="start">
        <span>START</span>
        <strong>Where did the material come from?</strong>
      </article>
      <div className="spark-excretion-decision-arrows">
        <span>made by metabolism in body cells</span>
        <span>never absorbed into body cells</span>
      </div>
      <div className="spark-excretion-decision-outcomes">
        <article className="excretion">
          <b>EXCRETION</b>
          <p>Removal of metabolic waste products from the body.</p>
          <small>Examples: carbon dioxide, urea, excess salts and water.</small>
        </article>
        <article className="egestion">
          <b>EGESTION</b>
          <p>Removal of undigested or unabsorbed food from the alimentary canal.</p>
          <small>Example: undigested fibre leaving in faeces.</small>
        </article>
      </div>
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
