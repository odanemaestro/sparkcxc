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
  return <svg viewBox="0 0 300 210" role="img" aria-label="Nose"><path className="so-nose" d="M150 25Q140 95 110 145Q125 175 150 160Q175 180 195 150Q165 110 150 25Z"/><path className="so-nostril" d="M118 150Q132 142 145 150M160 150Q178 142 190 150"/></svg>;
}
function TongueIcon() {
  return <svg viewBox="0 0 300 210" role="img" aria-label="Tongue"><path className="so-mouth" d="M65 80Q150 45 235 80Q205 115 150 120Q95 115 65 80Z"/><path className="so-tongue" d="M95 105Q150 95 205 105Q205 175 150 185Q95 175 95 105Z"/>{[120,145,170,195].map(x=><circle key={x} className="so-taste" cx={x} cy={135+(x%3)*7} r="5"/>)}</svg>;
}
function SkinIcon() {
  return <svg viewBox="0 0 300 210" role="img" aria-label="Skin receptors"><rect className="so-skin-top" x="45" y="40" width="210" height="55"/><rect className="so-skin-mid" x="45" y="95" width="210" height="80"/><circle className="so-receptor" cx="95" cy="120" r="12"/><circle className="so-receptor" cx="145" cy="145" r="12"/><circle className="so-receptor" cx="205" cy="118" r="12"/><path className="so-nerve" d="M95 132V185M145 157V185M205 130V185"/></svg>;
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
