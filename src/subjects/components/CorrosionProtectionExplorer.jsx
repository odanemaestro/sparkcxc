import React,{useMemo,useState} from "react";
import "./corrosionProtectionExplorer.css";

const METHODS=[
  {id:"paint",name:"Painting",barrier:true,text:"Paint forms a physical barrier that keeps oxygen and water away from iron or steel.",use:"Gates, burglar bars and exposed structures."},
  {id:"plastic",name:"Plastic coating",barrier:true,text:"Plastic isolates the metal surface from moisture and oxygen.",use:"Wire fences and coated metal products."},
  {id:"oil",name:"Oil or grease",barrier:true,text:"Oil and grease form a water-repelling barrier and also reduce friction on moving parts.",use:"Bicycle chains, tools and machinery."},
  {id:"galvanise",name:"Galvanising",barrier:false,text:"A zinc coating blocks air and water and can also protect iron sacrificially because zinc is more reactive.",use:"Roofing sheets and outdoor steel."},
  {id:"electroplate",name:"Electroplating",barrier:false,text:"Electric current is used to deposit a thin layer of another metal, improving appearance and corrosion resistance.",use:"Chromium-plated fittings and silver-plated objects."},
  {id:"tin",name:"Tin coating",barrier:false,text:"Tin-plated steel uses a corrosion-resistant surface layer to separate steel from food and moisture.",use:"Food cans."},
];

function MethodView(){
  const [id,setId]=useState("paint");
  const m=METHODS.find(x=>x.id===id);
  return <div className="spark-protect-method">
    <div className="spark-protect-buttons">{METHODS.map(x=><button type="button" key={x.id} className={id===x.id?"active":""} onClick={()=>setId(x.id)}>{x.name}</button>)}</div>
    <article><span>{m.barrier?"BARRIER METHOD":"METAL COATING METHOD"}</span><h4>{m.name}</h4><p>{m.text}</p><strong>Typical use</strong><p>{m.use}</p></article>
  </div>;
}

function GalvaniseView(){
  const [scratch,setScratch]=useState(false);
  return <div className="spark-galvanise">
    <div className="spark-protect-toggle"><button type="button" className={!scratch?"active":""} onClick={()=>setScratch(false)}>Coating intact</button><button type="button" className={scratch?"active":""} onClick={()=>setScratch(true)}>Coating scratched</button></div>
    <div className="spark-galvanised-strip">
      <div className={"spark-zinc-layer top "+(scratch?"scratched":"")}></div>
      <div className="spark-iron-core">iron / steel</div>
      <div className="spark-zinc-layer bottom"></div>
    </div>
    <p>{scratch?"Zinc is more reactive than iron, so exposed zinc corrodes preferentially and can continue protecting nearby iron at a scratch. This is sacrificial protection.":"With the coating intact, zinc also acts as a physical barrier preventing water and oxygen from reaching the iron."}</p>
  </div>;
}

function DryView(){
  const [silica,setSilica]=useState(true);
  return <div className="spark-dry-storage">
    <div className="spark-protect-toggle"><button type="button" className={silica?"active":""} onClick={()=>setSilica(true)}>With silica gel</button><button type="button" className={!silica?"active":""} onClick={()=>setSilica(false)}>Damp storage</button></div>
    <div className={"spark-tool-box "+(silica?"dry":"damp")}><div className="spark-tool">tool</div>{silica&&<div className="spark-silica-pack">silica gel<br/>absorbs moisture</div>}</div>
    <p>{silica?"Silica gel is a desiccant. It removes water vapour from the enclosed air, reducing the moisture needed for rusting.":"Damp storage supplies moisture, so unprotected iron or steel is more likely to rust."}</p>
  </div>;
}

function PlatingView(){
  const [metal,setMetal]=useState("chromium");
  return <div className="spark-electroplate">
    <div className="spark-protect-toggle"><button type="button" className={metal==="chromium"?"active":""} onClick={()=>setMetal("chromium")}>Chromium</button><button type="button" className={metal==="silver"?"active":""} onClick={()=>setMetal("silver")}>Silver</button><button type="button" className={metal==="tin"?"active":""} onClick={()=>setMetal("tin")}>Tin</button></div>
    <div className="spark-plated-object"><div className={"spark-plating-layer "+metal}></div><div className="spark-steel-core">base metal</div></div>
    <p>{metal==="chromium"?"Chromium plating provides a shiny, corrosion-resistant surface on fittings and older-style bumpers.":metal==="silver"?"Silver plating gives an attractive surface and corrosion resistance while using much less silver than a solid object would require.":"Tin-coated steel is used for food cans because the tin surface resists corrosion and separates the steel from the contents while the coating remains intact."}</p>
  </div>;
}

function TarnishView(){
  const [storage,setStorage]=useState("open");
  const protectedStore=storage==="sealed";
  return <div className="spark-tarnish-protect">
    <div className="spark-protect-toggle"><button type="button" className={!protectedStore?"active":""} onClick={()=>setStorage("open")}>Open air</button><button type="button" className={protectedStore?"active":""} onClick={()=>setStorage("sealed")}>Airtight / lacquered</button></div>
    <div className="spark-tarnish-cards">
      <article><span>SILVER</span><h4>{protectedStore?"Reduced sulfur exposure":"Tarnish can form"}</h4><p>{protectedStore?"Airtight storage reduces contact with sulfur-containing substances in air, slowing silver sulfide formation.":"Silver reacts with sulfur-containing compounds in air and develops a dark silver sulfide tarnish."}</p></article>
      <article><span>BRASS</span><h4>{protectedStore?"Clear lacquer barrier":"Surface can tarnish"}</h4><p>{protectedStore?"Clear lacquer reduces contact with air and moisture, helping preserve the polished surface.":"Exposure to air and moisture gradually changes the brass surface."}</p></article>
    </div>
  </div>;
}

function ChooseView(){
  return <div className="spark-protect-choose">
    <article><span>GATE</span><h4>Paint</h4><p>Low-cost barrier coating. Scratches should be repaired because exposed steel can rust.</p></article>
    <article><span>ROOF SHEET</span><h4>Galvanising</h4><p>Zinc gives both barrier and sacrificial protection.</p></article>
    <article><span>BICYCLE CHAIN</span><h4>Oil or grease</h4><p>Protects against water and oxygen while also reducing friction.</p></article>
    <article><span>FOOD CAN</span><h4>Tin-coated steel</h4><p>Tin provides a corrosion-resistant food-contact surface over strong steel.</p></article>
    <article><span>STORED TOOLS</span><h4>Dry storage + silica gel</h4><p>Reducing moisture removes one condition needed for rusting.</p></article>
    <article><span>BRASS HANDLE</span><h4>Clear lacquer</h4><p>A transparent barrier can reduce tarnishing while preserving the appearance.</p></article>
  </div>;
}

export default function CorrosionProtectionExplorer(){
  const [view,setView]=useState("methods");
  const summary=useMemo(()=>({
    methods:"Most protection methods either block water and oxygen, use a more reactive sacrificial metal, or apply a corrosion-resistant surface.",
    galvanise:"Zinc protects iron as a barrier and can continue protecting at scratches through sacrificial action.",
    dry:"Dry storage reduces corrosion by removing water, one of the required conditions for rusting.",
    plating:"Electroplating and metal coatings improve the surface without changing the whole object.",
    tarnish:"Tarnish prevention reduces contact between reactive metal surfaces and substances in air.",
    choose:"The best protection method depends on whether the object moves, touches food, is outdoors or must keep a decorative finish."
  })[view],[view]);

  return <section className="spark-corrosion-protection">
    <header><span>CORROSION PROTECTION</span><h3>Choose methods that prevent rusting and reduce tarnishing</h3><p>Corrosion can be slowed by excluding water and oxygen, reducing moisture, adding a protective coating or using a more reactive metal to protect iron sacrificially.</p></header>
    <div className="spark-protect-tabs">{[["methods","Protection methods"],["galvanise","Galvanising"],["dry","Dry storage"],["plating","Metal plating"],["tarnish","Tarnish prevention"],["choose","Choose a method"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-protect-stage">{view==="methods"&&<MethodView/>}{view==="galvanise"&&<GalvaniseView/>}{view==="dry"&&<DryView/>}{view==="plating"&&<PlatingView/>}{view==="tarnish"&&<TarnishView/>}{view==="choose"&&<ChooseView/>}</div>
    <div className="spark-protect-summary"><strong>{summary}</strong><span>Painting and plastic coating are barrier methods. Galvanising adds zinc, which can also provide sacrificial protection.</span></div>
  </section>;
}

export { METHODS };
