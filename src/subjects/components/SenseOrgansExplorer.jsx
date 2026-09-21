import React, { useState } from "react";
import "./senseOrgansExplorer.css";

const SENSES = {
  eye:{
    title:"Eye",
    stimulus:"Light",
    receptor:"Photoreceptors in the retina",
    message:"Light-sensitive receptor cells convert light energy into nerve impulses.",
  },
  ear:{
    title:"Ear",
    stimulus:"Sound vibrations and head movement",
    receptor:"Mechanoreceptors",
    message:"Receptors in the inner ear respond to sound and also contribute to balance.",
  },
  nose:{
    title:"Nose",
    stimulus:"Chemicals in the air",
    receptor:"Chemoreceptors",
    message:"Odour molecules dissolve in mucus and stimulate smell receptors.",
  },
  tongue:{
    title:"Tongue",
    stimulus:"Chemicals dissolved in saliva",
    receptor:"Taste receptors in taste buds",
    message:"Taste receptors detect dissolved chemicals. Smell contributes strongly to flavour.",
  },
  skin:{
    title:"Skin",
    stimulus:"Touch, pressure, pain and temperature",
    receptor:"Several receptor types in the skin",
    message:"Receptor density varies. Fingertips are especially sensitive because they contain many touch receptors.",
  },
};

function EyeIcon() {
  return <svg viewBox="0 0 300 210" role="img" aria-label="Eye"><path className="so-eye" d="M30 105Q150 20 270 105Q150 190 30 105Z"/><circle className="so-iris" cx="150" cy="105" r="48"/><circle className="so-pupil" cx="150" cy="105" r="22"/></svg>;
}
function EarIcon() {
  return <svg viewBox="0 0 300 210" role="img" aria-label="Ear"><path className="so-ear" d="M175 25Q85 20 70 110Q65 180 135 188Q190 190 195 140Q195 100 155 100Q125 100 130 135Q135 160 165 145Q185 135 182 110"/><path className="so-ear-canal" d="M165 145Q205 125 240 130"/></svg>;
}
function NoseIcon() {
  return <svg className="so-receptor-anatomy-svg" viewBox="0 0 420 280" role="img" aria-label="Nose and olfactory epithelium showing odour molecules dissolving in mucus and stimulating smell receptors">
    <path className="so-nose" d="M95 35Q85 115 58 170Q73 199 98 184Q124 203 145 176Q117 125 95 35Z"/>
    <path className="so-nostril" d="M66 176Q80 167 94 176M105 176Q122 167 139 176"/>
    <path className="so-nasal-cavity" d="M150 92Q235 46 326 83Q354 106 338 140Q322 169 274 168Q225 165 185 190"/>
    <path className="so-olfactory-epithelium" d="M211 83Q266 64 317 88Q296 110 250 111Q223 108 211 83Z"/>
    <path className="so-mucus-layer" d="M216 78Q264 59 311 82"/>
    <g className="so-olfactory-receptors">
      {[225,244,263,282,301].map((x,i)=><g key={x}><circle cx={x} cy="96" r="5"/><path d={"M"+x+" 101V132Q"+(x-6)+" 144 "+x+" 154"}/></g>)}
    </g>
    <g className="so-odour-molecules">
      {[[185,52],[215,40],[250,46],[285,38]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="6"/>)}
    </g>
    <path className="so-sensory-nerve" d="M225 155Q270 205 340 210"/>
    <text className="so-anatomy-label" x="255" y="28" textAnchor="middle">odour molecules</text>
    <text className="so-anatomy-label" x="320" y="72">mucus</text>
    <text className="so-anatomy-label" x="315" y="128">olfactory receptors</text>
    <text className="so-anatomy-label" x="285" y="235">sensory nerve impulses</text>
  </svg>;
}
function TongueIcon() {
  return <svg className="so-receptor-anatomy-svg" viewBox="0 0 420 280" role="img" aria-label="Tongue and taste bud showing dissolved chemicals entering a taste pore and stimulating receptor cells connected to sensory nerves">
    <path className="so-mouth" d="M30 70Q115 36 200 70Q170 104 115 109Q60 104 30 70Z"/>
    <path className="so-tongue" d="M60 96Q115 86 170 96Q170 165 115 178Q60 165 60 96Z"/>
    <g className="so-taste-papillae">{[82,108,134,158].map((x,i)=><circle key={x} cx={x} cy={126+(i%2)*12} r="6"/>)}</g>

    <path className="so-taste-bud-outline" d="M260 72Q300 45 340 72Q360 115 340 165Q300 195 260 165Q240 115 260 72Z"/>
    <path className="so-taste-pore" d="M292 62H308"/>
    <g className="so-taste-cells">
      <path d="M275 83Q288 115 278 157"/><path d="M290 78Q300 115 292 165"/><path d="M305 78Q300 115 308 165"/><path d="M320 83Q312 115 322 157"/>
    </g>
    <g className="so-taste-molecules">
      {[[275,30],[298,24],[322,34]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="6"/>)}
    </g>
    <path className="so-taste-nerve" d="M300 170Q300 215 350 235"/>
    <text className="so-anatomy-label" x="300" y="15" textAnchor="middle">chemicals dissolved in saliva</text>
    <text className="so-anatomy-label" x="347" y="67">taste pore</text>
    <text className="so-anatomy-label" x="342" y="128">taste receptor cells</text>
    <text className="so-anatomy-label" x="300" y="260" textAnchor="middle">sensory nerve</text>
  </svg>;
}
function SkinIcon() {
  return <svg className="so-receptor-anatomy-svg" viewBox="0 0 420 300" role="img" aria-label="Cross-section of skin showing epidermis, dermis, free nerve endings, touch receptor, pressure receptor and sensory nerves">
    <rect className="so-skin-epidermis" x="35" y="45" width="350" height="52"/>
    <rect className="so-skin-dermis" x="35" y="97" width="350" height="150"/>
    <rect className="so-skin-subcutaneous" x="35" y="247" width="350" height="35"/>

    <path className="so-hair" d="M115 160Q104 95 120 35"/>
    <ellipse className="so-hair-follicle" cx="112" cy="168" rx="18" ry="48" transform="rotate(-8 112 168)"/>
    <path className="so-free-nerve" d="M205 225Q195 185 205 150Q215 120 208 92M205 145L190 125M207 132L222 112"/>
    <ellipse className="so-touch-receptor" cx="285" cy="128" rx="20" ry="14"/>
    <g className="so-pressure-receptor">
      <ellipse cx="300" cy="213" rx="34" ry="24"/><ellipse cx="300" cy="213" rx="25" ry="17"/><ellipse cx="300" cy="213" rx="15" ry="10"/>
    </g>
    <path className="so-sensory-nerve" d="M205 224V276M285 142V276M300 237V276"/>
    <text className="so-anatomy-label" x="48" y="76">epidermis</text>
    <text className="so-anatomy-label" x="48" y="118">dermis</text>
    <text className="so-anatomy-label" x="180" y="105">free nerve endings, pain and temperature</text>
    <text className="so-anatomy-label" x="278" y="102">touch receptor</text>
    <text className="so-anatomy-label" x="256" y="198">pressure receptor</text>
  </svg>;
}

function Icon({sense}) {
  if (sense === "eye") return <EyeIcon />;
  if (sense === "ear") return <EarIcon />;
  if (sense === "nose") return <NoseIcon />;
  if (sense === "tongue") return <TongueIcon />;
  return <SkinIcon />;
}

export default function SenseOrgansExplorer() {
  const [sense,setSense] = useState("eye");
  const info = SENSES[sense];

  return (
    <section className="spark-sense-organs">
      <header>
        <span>SENSE ORGANS AND RECEPTORS</span>
        <h3>From stimulus to nerve impulse</h3>
        <p>Sense organs contain receptors that detect changes in the environment and convert those stimuli into nerve impulses.</p>
      </header>

      <div className="spark-sense-tabs">
        {Object.entries(SENSES).map(([key,item]) => (
          <button type="button" key={key} className={sense===key ? "active" : ""} onClick={()=>setSense(key)}>
            {item.title}
          </button>
        ))}
      </div>

      <div className="spark-sense-grid">
        <div className="spark-sense-icon"><Icon sense={sense} /></div>
        <div className="spark-sense-flow">
          <article><b>Stimulus</b><span>{info.stimulus}</span></article>
          <div className="spark-sense-arrow">→</div>
          <article><b>Receptor</b><span>{info.receptor}</span></article>
          <div className="spark-sense-arrow">→</div>
          <article><b>Signal</b><span>Nerve impulses travel towards the central nervous system.</span></article>
        </div>
      </div>

      <div className="spark-sense-summary">
        <strong>{info.title}</strong>
        <span>{info.message}</span>
      </div>

      {sense === "tongue" && (
        <div className="spark-sense-flavour">
          <b>Why food tastes bland with a blocked nose</b>
          <span>Taste receptors still work, but reduced smell means fewer odour signals reach the brain, so flavour seems weaker.</span>
        </div>
      )}
    </section>
  );
}
