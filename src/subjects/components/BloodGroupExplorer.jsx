import React, { useMemo, useState } from "react";
import "./bloodGroupExplorer.css";

const GROUPS = {
  A:{
    antigens:["A"],
    antibodies:["anti-B"],
    receive:["A","O"],
    donate:["A","AB"],
    test:{antiA:true,antiB:false},
  },
  B:{
    antigens:["B"],
    antibodies:["anti-A"],
    receive:["B","O"],
    donate:["B","AB"],
    test:{antiA:false,antiB:true},
  },
  AB:{
    antigens:["A","B"],
    antibodies:[],
    receive:["A","B","AB","O"],
    donate:["AB"],
    test:{antiA:true,antiB:true},
  },
  O:{
    antigens:[],
    antibodies:["anti-A","anti-B"],
    receive:["O"],
    donate:["A","B","AB","O"],
    test:{antiA:false,antiB:false},
  },
};

const TEST_SAMPLES = {
  W:{antiA:true,antiB:false,group:"A"},
  X:{antiA:false,antiB:true,group:"B"},
  Y:{antiA:true,antiB:true,group:"AB"},
  Z:{antiA:false,antiB:false,group:"O"},
};

function RedCell({cx,cy,antigens=[]}) {
  return (
    <g>
      <circle className="bg-red-cell" cx={cx} cy={cy} r="72" />
      <circle className="bg-red-cell-centre" cx={cx} cy={cy} r="35" />
      {antigens.includes("A") && <>
        <text className="bg-antigen a" x={cx-52} y={cy-62}>A</text>
        <text className="bg-antigen a" x={cx+46} y={cy+69}>A</text>
      </>}
      {antigens.includes("B") && <>
        <text className="bg-antigen b" x={cx+48} y={cy-60}>B</text>
        <text className="bg-antigen b" x={cx-58} y={cy+66}>B</text>
      </>}
    </g>
  );
}

function Antibody({x,y,label}) {
  return (
    <g transform={"translate("+x+" "+y+")"}>
      <path className={label === "anti-A" ? "bg-antibody a" : "bg-antibody b"} d="M0 32V0M0 12L-22-10M0 12L22-10" />
      <text className="bg-antibody-label" x="0" y="54" textAnchor="middle">{label}</text>
    </g>
  );
}

function ABOScene({group}) {
  const info=GROUPS[group];
  return (
    <div className="spark-blood-group-abo-layout">
      <div className="spark-blood-group-stage">
        <svg viewBox="0 0 840 430" role="img" aria-label={"ABO blood group " + group + " antigens and antibodies"}>
          <rect className="bg-plasma" x="35" y="40" width="770" height="330" rx="28" />
          <RedCell cx={300} cy={205} antigens={info.antigens} />
          {info.antibodies.map((antibody,index)=>(
            <Antibody key={antibody} x={560+index*125} y={160+index*70} label={antibody} />
          ))}
          <text className="bg-heading" x="300" y="330" textAnchor="middle">red-cell antigens: {info.antigens.length ? info.antigens.join(" and ") : "none A or B"}</text>
          <text className="bg-heading" x="620" y="330" textAnchor="middle">plasma antibodies: {info.antibodies.length ? info.antibodies.join(" and ") : "none anti-A or anti-B"}</text>
          <text className="bg-note" x="420" y="405" textAnchor="middle">ABO compatibility shown here refers to red-cell transfusion and does not include the Rhesus factor.</text>
        </svg>
      </div>
      <aside>
        <span>Blood group {group}</span>
        <div><b>Can receive ABO red cells from</b><p>{info.receive.join(", ")}</p></div>
        <div><b>Can donate ABO red cells to</b><p>{info.donate.join(", ")}</p></div>
        <p className="bg-caution">Real transfusions also consider Rh type and other blood-group antigens. Donor and recipient blood is cross-matched before transfusion.</p>
      </aside>
    </div>
  );
}

function ClumpingWell({label,clumps}) {
  return (
    <div className={clumps ? "spark-blood-test-well clumps" : "spark-blood-test-well"}>
      <strong>{label}</strong>
      <svg viewBox="0 0 180 135" role="img" aria-label={clumps ? label + " shows agglutination" : label + " shows no agglutination"}>
        <ellipse className="bg-test-well" cx="90" cy="65" rx="70" ry="48" />
        {clumps ? (
          <>
            <circle className="bg-clump" cx="70" cy="58" r="23" />
            <circle className="bg-clump" cx="96" cy="62" r="24" />
            <circle className="bg-clump" cx="112" cy="78" r="20" />
          </>
        ) : (
          [[55,50],[85,45],[115,55],[65,78],[100,83],[128,75]].map(([x,y],i)=><circle key={i} className="bg-test-cell" cx={x} cy={y} r="9" />)
        )}
      </svg>
      <span>{clumps ? "clumping" : "no clumping"}</span>
    </div>
  );
}

function BloodTestScene({sample}) {
  const result=TEST_SAMPLES[sample];
  return (
    <div className="spark-blood-testing">
      <div className="spark-blood-testing-head">
        <span>Sample {sample}</span>
        <strong>Blood group {result.group}</strong>
      </div>
      <div className="spark-blood-testing-wells">
        <ClumpingWell label="Anti-A serum" clumps={result.antiA} />
        <ClumpingWell label="Anti-B serum" clumps={result.antiB} />
      </div>
      <div className="spark-blood-testing-rule">
        <b>Interpretation rule</b>
        <span>Clumping with anti-A serum means antigen A is present on the red cells. Clumping with anti-B serum means antigen B is present.</span>
      </div>
    </div>
  );
}

function RhScene() {
  return (
    <div className="spark-blood-rh">
      <div className="spark-blood-group-stage">
        <svg viewBox="0 0 900 500" role="img" aria-label="Rhesus incompatibility and anti-D prevention">
          <g transform="translate(170 170)">
            <circle className="bg-mother" cx="0" cy="0" r="72" />
            <text className="bg-person-label" x="0" y="7" textAnchor="middle">Rh−</text>
            <text className="bg-heading" x="0" y="115" textAnchor="middle">mother</text>
          </g>
          <g transform="translate(700 170)">
            <circle className="bg-fetus" cx="0" cy="0" r="72" />
            <text className="bg-person-label" x="0" y="7" textAnchor="middle">Rh+</text>
            <text className="bg-heading" x="0" y="115" textAnchor="middle">foetus</text>
          </g>
          <rect className="bg-placenta" x="405" y="75" width="90" height="220" rx="25" />
          <path className="bg-rh-arrow" d="M625 170H515" />
          <path className="bg-rh-arrow warning" d="M385 215H275" />
          <text className="bg-small" x="450" y="330" textAnchor="middle">small amounts of Rh-positive foetal cells can enter maternal circulation, especially around delivery</text>
          <g transform="translate(450 400)">
            <rect className="bg-injection" x="-110" y="-22" width="160" height="44" rx="12" />
            <line className="bg-needle" x1="50" y1="0" x2="130" y2="0" />
            <text className="bg-injection-text" x="-30" y="7" textAnchor="middle">anti-D</text>
          </g>
          <text className="bg-note" x="450" y="475" textAnchor="middle">anti-D immunoglobulin reduces sensitisation of an Rh-negative mother to Rh-positive red cells</text>
        </svg>
      </div>
      <div className="spark-blood-rh-steps">
        <article><span>1</span><div><b>Possible exposure</b><p>Rh-positive foetal red cells can enter the circulation of an Rh-negative mother.</p></div></article>
        <article><span>2</span><div><b>Sensitisation</b><p>Without prevention, the maternal immune system can form anti-D antibodies and memory cells.</p></div></article>
        <article><span>3</span><div><b>Later pregnancy risk</b><p>Maternal anti-D antibodies can cross the placenta and destroy Rh-positive foetal red cells.</p></div></article>
        <article><span>4</span><div><b>Prevention</b><p>Anti-D immunoglobulin is given at recommended times to reduce maternal sensitisation.</p></div></article>
      </div>
    </div>
  );
}

export default function BloodGroupExplorer() {
  const [view,setView]=useState("abo");
  const [group,setGroup]=useState("A");
  const [sample,setSample]=useState("W");
  const selectedInfo=useMemo(()=>GROUPS[group],[group]);

  return (
    <section className="spark-blood-groups">
      <header>
        <span>BLOOD GROUPS</span>
        <h3>Antigens, antibodies and safe transfusion</h3>
        <p>Use antigen-antibody reactions to identify ABO groups, predict red-cell compatibility and understand why cross-matching matters.</p>
      </header>

      <div className="spark-blood-group-tabs">
        <button type="button" className={view==="abo"?"active":""} onClick={()=>setView("abo")}>ABO groups</button>
        <button type="button" className={view==="testing"?"active":""} onClick={()=>setView("testing")}>Blood typing test</button>
        <button type="button" className={view==="compatibility"?"active":""} onClick={()=>setView("compatibility")}>Compatibility table</button>
        <button type="button" className={view==="rh"?"active":""} onClick={()=>setView("rh")}>Rhesus factor</button>
      </div>

      {view === "abo" && (
        <>
          <div className="spark-blood-group-choice">
            {Object.keys(GROUPS).map(key=><button type="button" key={key} className={group===key?"active":""} onClick={()=>setGroup(key)}>Group {key}</button>)}
          </div>
          <ABOScene group={group} />
          <div className="spark-blood-selected">
            <strong>Group {group}</strong>
            <span>{selectedInfo.antigens.length ? "Antigen " + selectedInfo.antigens.join(" and ") + " present." : "No A or B antigens present."} {selectedInfo.antibodies.length ? selectedInfo.antibodies.join(" and ") + " in plasma." : "No anti-A or anti-B antibodies in plasma."}</span>
          </div>
        </>
      )}

      {view === "testing" && (
        <>
          <div className="spark-blood-group-choice">
            {Object.keys(TEST_SAMPLES).map(key=><button type="button" key={key} className={sample===key?"active":""} onClick={()=>setSample(key)}>Sample {key}</button>)}
          </div>
          <BloodTestScene sample={sample} />
        </>
      )}

      {view === "compatibility" && (
        <div className="spark-blood-compatibility">
          <table>
            <thead><tr><th>ABO group</th><th>Red-cell antigens</th><th>Plasma antibodies</th><th>Can receive ABO red cells from</th></tr></thead>
            <tbody>
              {Object.entries(GROUPS).map(([key,item])=>(
                <tr key={key}>
                  <th>{key}</th>
                  <td>{item.antigens.length ? item.antigens.join(", ") : "None A/B"}</td>
                  <td>{item.antibodies.length ? item.antibodies.join(", ") : "None anti-A/anti-B"}</td>
                  <td>{item.receive.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>For ABO red-cell compatibility only, group O red cells have no A or B antigens, while group AB plasma has no anti-A or anti-B antibodies. In clinical practice, Rh type, other antigens and cross-matching must also be considered.</p>
        </div>
      )}

      {view === "rh" && <RhScene />}
    </section>
  );
}
