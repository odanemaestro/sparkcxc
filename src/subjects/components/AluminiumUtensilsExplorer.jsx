import React,{useMemo,useState} from "react";
import "./aluminiumUtensilsExplorer.css";

function AdvantagesView(){
  return <div className="spark-aluminium-advantages">
    <article><span>GOOD HEAT CONDUCTOR</span><h4>Heats quickly and spreads heat</h4><p>Aluminium transfers heat efficiently, so pots can heat food rapidly and fairly evenly.</p></article>
    <article><span>LOW DENSITY</span><h4>Light to handle</h4><p>Aluminium cookware and cans have much less mass than equivalent objects made from many denser metals.</p></article>
    <article><span>OXIDE PROTECTION</span><h4>Does not rust like iron</h4><p>A thin aluminium oxide layer forms rapidly and helps protect the underlying metal from further reaction.</p></article>
    <article><span>RECYCLABLE</span><h4>Can be reprocessed</h4><p>Aluminium cans are widely recycled, reducing the need for some new metal production.</p></article>
  </div>;
}

function AcidView(){
  const [food,setFood]=useState("neutral");
  const acidic=food==="acid";
  return <div className="spark-aluminium-acid">
    <div className="spark-aluminium-toggle"><button type="button" className={!acidic?"active":""} onClick={()=>setFood("neutral")}>Neutral food</button><button type="button" className={acidic?"active":""} onClick={()=>setFood("acid")}>Acidic food</button></div>
    <div className="spark-aluminium-pot">
      <div className="spark-pot-rim"></div>
      <div className={"spark-pot-food "+(acidic?"acid":"neutral")}>{acidic?"tomato / acidic food":"neutral food"}</div>
      <div className={acidic?"spark-pot-oxide damaged":"spark-pot-oxide"}></div>
    </div>
    <p>{acidic?"Acidic foods can attack the protective oxide surface and increase the amount of aluminium that transfers into the food. Long storage or prolonged cooking of acidic foods in uncoated aluminium should therefore be avoided.":"With non-acidic foods, the protective oxide layer helps limit reaction between the aluminium surface and the food."}</p>
  </div>;
}

function CareView(){
  const [scrub,setScrub]=useState(false);
  return <div className="spark-aluminium-care">
    <div className="spark-aluminium-toggle"><button type="button" className={!scrub?"active":""} onClick={()=>setScrub(false)}>Gentle cleaning</button><button type="button" className={scrub?"active":""} onClick={()=>setScrub(true)}>Repeated steel-wool scouring</button></div>
    <div className="spark-care-panel">
      <div className={scrub?"spark-care-oxide scratched":"spark-care-oxide"}></div>
      <div className="spark-care-metal">aluminium</div>
    </div>
    <p>{scrub?"Aggressive scouring repeatedly removes or damages the protective surface. Although oxide reforms, harsh abrasion exposes fresh metal and shortens the useful finish of the utensil.":"Gentle cleaning preserves the surface while the naturally forming oxide layer continues to protect the aluminium."}</p>
  </div>;
}

function FoilView(){
  return <div className="spark-aluminium-foil">
    <article><span>LIGHT</span><h4>Very thin sheets add little mass</h4><p>Low density and malleability allow aluminium to be rolled into lightweight foil.</p></article>
    <article><span>EASILY SHAPED</span><h4>Malleable</h4><p>Foil bends around food and containers without needing much force.</p></article>
    <article><span>REFLECTIVE</span><h4>Reflects thermal radiation</h4><p>Its shiny surface reflects a significant fraction of radiant heat, which can help reduce radiative heat loss in some uses.</p></article>
  </div>;
}

function CansView(){
  return <div className="spark-aluminium-cans">
    <div className="spark-can-model"><div className="spark-can-top"></div><div className="spark-can-body">drink can</div></div>
    <div className="spark-can-cards">
      <article><b>Low mass</b><p>Reduces transport weight.</p></article>
      <article><b>Corrosion resistance</b><p>The oxide surface gives good atmospheric corrosion resistance.</p></article>
      <article><b>Easy forming</b><p>Malleability supports high-speed manufacture.</p></article>
      <article><b>Recycling</b><p>Used cans can be melted and reused as aluminium feedstock.</p></article>
    </div>
  </div>;
}

function TradeoffsView(){
  return <div className="spark-aluminium-tradeoffs">
    <article><span>ADVANTAGE</span><h4>Excellent heat transfer</h4><p>Useful for cooking because heat reaches food quickly.</p></article>
    <article><span>ADVANTAGE</span><h4>Light and corrosion resistant</h4><p>Easy to handle and does not rust like iron.</p></article>
    <article><span>DISADVANTAGE</span><h4>Relatively soft</h4><p>Plain aluminium can scratch and dent more easily than harder cookware materials.</p></article>
    <article><span>DISADVANTAGE</span><h4>Reactive with some foods</h4><p>Acidic and strongly alkaline foods can attack uncoated aluminium surfaces, especially during prolonged contact.</p></article>
  </div>;
}

export default function AluminiumUtensilsExplorer(){
  const [view,setView]=useState("advantages");
  const summary=useMemo(()=>({
    advantages:"Aluminium combines good heat conduction, low density, corrosion resistance and recyclability.",
    acid:"Acidic foods can attack uncoated aluminium surfaces and increase metal transfer into food.",
    care:"Careful cleaning helps preserve the protective surface of aluminium utensils.",
    foil:"Malleability, low mass and a reflective surface make aluminium useful as foil.",
    cans:"Aluminium is well suited to cans because it is light, formable, corrosion resistant and recyclable.",
    tradeoffs:"The same softness and chemical reactivity that make aluminium easy to shape also create limitations in use."
  })[view],[view]);

  return <section className="spark-aluminium-utensils">
    <header><span>ALUMINIUM UTENSILS</span><h3>Weigh the advantages and disadvantages of aluminium in cooking, wrapping and canning</h3><p>Aluminium is widely used because it is light, conducts heat well, is easy to shape and protects itself with a thin oxide layer. Its softness and reactivity with some foods are important limitations.</p></header>
    <div className="spark-aluminium-tabs">{[["advantages","Advantages"],["acid","Acidic foods"],["care","Care"],["foil","Foil"],["cans","Cans"],["tradeoffs","Trade-offs"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-aluminium-stage">{view==="advantages"&&<AdvantagesView/>}{view==="acid"&&<AcidView/>}{view==="care"&&<CareView/>}{view==="foil"&&<FoilView/>}{view==="cans"&&<CansView/>}{view==="tradeoffs"&&<TradeoffsView/>}</div>
    <div className="spark-aluminium-summary"><strong>{summary}</strong><span>Aluminium does not stay unreactive because it is low in the reactivity series; it is protected by a thin oxide coating.</span></div>
  </section>;
}
