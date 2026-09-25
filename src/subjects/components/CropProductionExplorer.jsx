import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./cropProductionExplorer.css";

const METHODS = {
  hydroponics:{
    title:"Hydroponics",
    note:"Plants grow without soil. Roots receive water containing dissolved mineral nutrients.",
    advantage:"Useful where soil is poor or space is limited.",
    limitation:"Needs careful control of nutrient solution, water supply and equipment.",
  },
  greenhouse:{
    title:"Greenhouse farming",
    note:"Crops grow inside a protected structure where temperature, humidity, water and pests are easier to manage.",
    advantage:"Supports protected or out-of-season production.",
    limitation:"Construction, cooling and maintenance can be costly.",
  },
  container:{
    title:"Container gardening",
    note:"Plants grow in pots, boxes, buckets or similar containers filled with a suitable growing medium.",
    advantage:"Works in small spaces such as patios, balconies and yards.",
    limitation:"Containers dry out quickly and restrict root space.",
  },
  rotation:{
    title:"Crop rotation",
    note:"Different crops are grown on the same plot in a planned sequence from season to season.",
    advantage:"Can improve nutrient use and break pest and disease cycles.",
    limitation:"Requires planning and suitable crop combinations.",
  },
  strip:{
    title:"Strip planting",
    note:"Different crops are planted in alternating strips across a field.",
    advantage:"Helps reduce erosion and can slow the spread of pests.",
    limitation:"Field layout and machinery use may be more difficult.",
  },
  tissueCulture:{
    title:"Tissue culture",
    note:"Small pieces of plant tissue are grown under sterile conditions on a nutrient medium until they form plantlets.",
    advantage:"Produces many genetically identical plants quickly and can provide disease-free planting material.",
    limitation:"Requires sterile technique, trained workers and specialised equipment.",
  },
  organic:{
    title:"Organic farming",
    note:"Natural nutrient sources and biological pest controls are emphasised instead of synthetic fertilisers and pesticides.",
    advantage:"Reduces synthetic chemical residues and can improve soil organic matter.",
    limitation:"Pest control may be harder and yields may be lower in some systems.",
  },
};

function Scene({ method }) {
  if (method === "hydroponics") {
    return (
      <ReviewedScienceDiagram site="CropProductionExplorer.jsx:52"><svg viewBox="0 0 900 430" role="img" aria-label="Hydroponic crop system">
        <rect className="cp-tank" x="170" y="275" width="560" height="95" rx="22" />
        <path className="cp-solution" d="M185 310H715V355H185Z" />
        {[250,450,650].map(x => (
          <g key={x}>
            <rect className="cp-pot" x={x-45} y="225" width="90" height="55" rx="10" />
            <path className="cp-root" d={"M" + x + " 275Q" + (x-35) + " 315 " + (x-15) + " 350M" + x + " 275Q" + (x+30) + " 320 " + (x+15) + " 350"} />
            <path className="cp-stem" d={"M" + x + " 225V115"} />
            <ellipse className="cp-leaf" cx={x-35} cy="145" rx="48" ry="23" transform={"rotate(-25 " + (x-35) + " 145)"} />
            <ellipse className="cp-leaf" cx={x+35} cy="170" rx="48" ry="23" transform={"rotate(25 " + (x+35) + " 170)"} />
          </g>
        ))}
        <text className="cp-label" x="450" y="405" textAnchor="middle">nutrient solution supplies mineral ions to roots</text>
      </svg></ReviewedScienceDiagram>
    );
  }

  if (method === "greenhouse") {
    return (
      <ReviewedScienceDiagram site="CropProductionExplorer.jsx:71"><svg viewBox="0 0 900 430" role="img" aria-label="Greenhouse crop production">
        <path className="cp-greenhouse" d="M120 360V160L260 65H640L780 160V360Z" />
        <path className="cp-greenhouse-line" d="M260 65V360M640 65V360M120 160H780" />
        {[250,380,520,650].map(x => (
          <g key={x}>
            <path className="cp-stem" d={"M" + x + " 350V235"} />
            <ellipse className="cp-leaf" cx={x-25} cy="270" rx="36" ry="18" />
            <ellipse className="cp-leaf" cx={x+25} cy="300" rx="36" ry="18" />
          </g>
        ))}
        <circle className="cp-sun" cx="90" cy="70" r="36" />
        <text className="cp-label" x="450" y="405" textAnchor="middle">protected environment, controlled growing conditions</text>
      </svg></ReviewedScienceDiagram>
    );
  }

  if (method === "container") {
    return (
      <ReviewedScienceDiagram site="CropProductionExplorer.jsx:89"><svg viewBox="0 0 900 430" role="img" aria-label="Container gardening">
        {[220,450,680].map((x,index) => (
          <g key={x}>
            <path className="cp-container" d={"M" + (x-70) + " 260H" + (x+70) + "L" + (x+50) + " 375H" + (x-50) + "Z"} />
            <path className="cp-stem" d={"M" + x + " 260V115"} />
            <ellipse className="cp-leaf" cx={x-42} cy={155+index*8} rx="48" ry="23" />
            <ellipse className="cp-leaf" cx={x+42} cy={200-index*6} rx="48" ry="23" />
          </g>
        ))}
        <path className="cp-floor" d="M100 380H800" />
        <text className="cp-label" x="450" y="415" textAnchor="middle">food production in limited urban space</text>
      </svg></ReviewedScienceDiagram>
    );
  }

  if (method === "rotation") {
    return (
      <ReviewedScienceDiagram site="CropProductionExplorer.jsx:106"><svg viewBox="0 0 900 430" role="img" aria-label="Crop rotation plan">
        {[
          ["Year 1","Corn",130],
          ["Year 2","Peas",340],
          ["Year 3","Sweet potato",550],
        ].map(row => (
          <g key={row[0]}>
            <rect className="cp-field-card" x={row[2]} y="120" width="180" height="180" rx="20" />
            <text className="cp-year" x={row[2]+90} y="165" textAnchor="middle">{row[0]}</text>
            <text className="cp-crop" x={row[2]+90} y="225" textAnchor="middle">{row[1]}</text>
          </g>
        ))}
        <path className="cp-cycle-arrow" d="M310 210H330M520 210H540M730 315Q450 395 130 315" />
        <text className="cp-label" x="450" y="405" textAnchor="middle">changing crops helps break pest cycles and balance soil use</text>
      </svg></ReviewedScienceDiagram>
    );
  }

  if (method === "strip") {
    return (
      <ReviewedScienceDiagram site="CropProductionExplorer.jsx:126"><svg viewBox="0 0 900 430" role="img" aria-label="Strip planting across a field">
        <path className="cp-hillside" d="M70 340Q450 135 830 340V390H70Z" />
        {[0,1,2,3,4].map(i => (
          <path key={i} className={i%2 ? "cp-strip alt" : "cp-strip"} d={"M" + (120+i*135) + " 330Q" + (180+i*100) + " 230 " + (245+i*95) + " 175"} />
        ))}
        <text className="cp-label" x="450" y="415" textAnchor="middle">alternating crop strips across the field</text>
      </svg></ReviewedScienceDiagram>
    );
  }

  if (method === "tissueCulture") {
    return (
      <ReviewedScienceDiagram site="CropProductionExplorer.jsx:138"><svg viewBox="0 0 900 430" role="img" aria-label="Plant tissue culture production">
        <rect className="cp-lab-bench" x="90" y="335" width="720" height="28" rx="8" />
        {[215,450,685].map((x,index) => (
          <g key={x}>
            <path className="cp-culture-flask" d={"M" + (x-42) + " 130H" + (x+42) + "V185L" + (x+78) + " 315Q" + (x+82) + " 335 " + (x+60) + " 335H" + (x-60) + "Q" + (x-82) + " 335 " + (x-78) + " 315L" + (x-42) + " 185Z"} />
            <path className="cp-culture-medium" d={"M" + (x-66) + " 285Q" + x + " 270 " + (x+66) + " 285L" + (x+78) + " 315Q" + (x+82) + " 335 " + (x+60) + " 335H" + (x-60) + "Q" + (x-82) + " 335 " + (x-78) + " 315Z"} />
            <path className="cp-stem" d={"M" + x + " 282V" + (225-index*10)} />
            <ellipse className="cp-leaf" cx={x-26} cy={245-index*8} rx="30" ry="15" transform={"rotate(-24 " + (x-26) + " " + (245-index*8) + ")"} />
            <ellipse className="cp-leaf" cx={x+27} cy={260-index*8} rx="30" ry="15" transform={"rotate(24 " + (x+27) + " " + (260-index*8) + ")"} />
            <rect className="cp-flask-stop" x={x-48} y="112" width="96" height="24" rx="7" />
          </g>
        ))}
        <text className="cp-label" x="450" y="402" textAnchor="middle">sterile nutrient medium supports many identical plantlets</text>
      </svg></ReviewedScienceDiagram>
    );
  }

  return (
    <ReviewedScienceDiagram site="CropProductionExplorer.jsx:156"><svg viewBox="0 0 900 430" role="img" aria-label="Organic farming system">
      <rect className="cp-compost" x="95" y="250" width="210" height="115" rx="16" />
      <text className="cp-compost-text" x="200" y="305" textAnchor="middle">COMPOST</text>
      <g className="cp-ladybird" transform="translate(700 125)">
        <circle cx="0" cy="0" r="38" /><line x1="0" y1="-35" x2="0" y2="35" />
        <circle cx="-14" cy="-10" r="5" /><circle cx="16" cy="10" r="5" />
      </g>
      {[410,520,630].map(x => (
        <g key={x}>
          <path className="cp-stem" d={"M" + x + " 340V220"} />
          <ellipse className="cp-leaf" cx={x-30} cy="255" rx="40" ry="20" />
          <ellipse className="cp-leaf" cx={x+30} cy="290" rx="40" ry="20" />
        </g>
      ))}
      <path className="cp-floor" d="M340 350H760" />
      <text className="cp-label" x="450" y="405" textAnchor="middle">compost, manure and biological pest control</text>
    </svg></ReviewedScienceDiagram>
  );
}

export default function CropProductionExplorer() {
  const [method,setMethod] = useState("hydroponics");
  const info = METHODS[method];

  return (
    <section className="spark-crop-production">
      <header>
        <span>CROP PRODUCTION SYSTEMS</span>
        <h3>Choosing a method for the farm or home</h3>
        <p>Compare how each system works and identify the situations where its advantages are useful.</p>
      </header>
      <div className="spark-crop-tabs">
        {Object.entries(METHODS).map(([key,item]) => (
          <button type="button" key={key} className={method === key ? "active" : ""} onClick={() => setMethod(key)}>
            {item.title}
          </button>
        ))}
      </div>
      <div className="spark-crop-grid">
        <div className="spark-crop-stage"><Scene method={method} /></div>
        <aside>
          <strong>{info.title}</strong>
          <p>{info.note}</p>
          <div><b>Advantage</b><span>{info.advantage}</span></div>
          <div><b>Limitation</b><span>{info.limitation}</span></div>
        </aside>
      </div>
    </section>
  );
}
