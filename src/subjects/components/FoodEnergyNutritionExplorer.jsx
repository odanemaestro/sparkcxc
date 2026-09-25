import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./foodEnergyNutritionExplorer.css";

const NUTRIENTS=[
  {name:"Carbohydrate",role:"Main dietary energy source",examples:"rice, bread, yam, green banana, breadfruit",note:"Starch and sugars are carbohydrates."},
  {name:"Protein",role:"Growth and repair",examples:"red peas, beans, fish, eggs, meat, milk",note:"Provides amino acids for building body tissues."},
  {name:"Fat",role:"Concentrated energy store and insulation",examples:"oils, avocado, nuts, butter",note:"Excess energy intake can be stored as body fat."},
  {name:"Vitamins",role:"Support normal body processes",examples:"fruits, vegetables and varied foods",note:"Examples include vitamins A, C, D and B₁₂."},
  {name:"Minerals",role:"Needed in small amounts for specific functions",examples:"iron, calcium, iodine",note:"Iron supports haemoglobin, calcium supports bones and teeth, iodine supports thyroxine production."},
  {name:"Fibre",role:"Adds bulk and supports movement through the intestine",examples:"vegetables, fruits, whole grains, legumes",note:"Helps reduce constipation."},
  {name:"Water",role:"Solvent, transport medium and temperature control",examples:"water and water-rich foods",note:"Water does not provide energy."},
];

const DEFICIENCIES=[
  ["Vitamin C","Scurvy","Bleeding gums and poor wound healing are associated with severe deficiency."],
  ["Vitamin D","Rickets in children","Vitamin D supports calcium absorption and normal bone mineralisation."],
  ["Iron","Iron-deficiency anaemia","Iron is needed to make haemoglobin."],
  ["Iodine","Goitre","Iodine is needed to make thyroid hormones including thyroxine."],
  ["Vitamin A","Night blindness","Vitamin A supports normal vision, including vision in dim light."],
  ["Vitamin B₁₂","Anaemia","Vitamin B₁₂ is needed for normal red blood cell formation."],
  ["Protein","Kwashiorkor","Severe protein deficiency is associated with protein-energy malnutrition."],
  ["Energy and protein","Marasmus","Severe energy and protein deficiency causes marked wasting."],
];

const TESTS=[
  {id:"starch",name:"Starch",reagent:"Iodine solution",method:"Add iodine to the food sample.",positive:"Blue-black",negative:"Brown or yellow-brown"},
  {id:"sugar",name:"Reducing sugar",reagent:"Benedict's solution",method:"Add Benedict's solution and heat in a hot-water bath.",positive:"Green, yellow, orange or brick-red precipitate depending on amount",negative:"Remains blue"},
  {id:"protein",name:"Protein",reagent:"Biuret reagent",method:"Add Biuret reagent to the food sample.",positive:"Purple or lilac",negative:"Remains blue"},
  {id:"fat",name:"Fat",reagent:"Brown paper grease-spot test",method:"Rub or press the food onto clean brown paper and allow it to dry.",positive:"Persistent translucent grease spot",negative:"No persistent translucent spot"},
];

function NutrientView(){
  return <div className="spark-food-energy-nutrients">{NUTRIENTS.map((item,i)=><article key={item.name}><span>{i+1}</span><div><b>{item.name}</b><strong>{item.role}</strong><p>{item.examples}</p><small>{item.note}</small></div></article>)}</div>;
}

function DeficiencyView(){
  return <div className="spark-food-deficiencies">{DEFICIENCIES.map(([nutrient,condition,note])=><article key={condition}><span>{nutrient}</span><h4>{condition}</h4><p>{note}</p></article>)}</div>;
}

function FoodTestDiagram({testId}){
  if(testId==="starch") return <ReviewedScienceDiagram site="FoodEnergyNutritionExplorer.jsx:41"><svg className="spark-food-test-svg" viewBox="0 0 760 360" role="img" aria-label="Iodine test for starch showing iodine added to a food sample and a blue-black positive result">
    <rect className="ft-tile" x="90" y="155" width="240" height="120" rx="18"/>
    <ellipse className="ft-sample starch" cx="210" cy="215" rx="62" ry="36"/>
    <path className="ft-dropper" d="M245 55L292 105L274 123L227 73Z"/>
    <circle className="ft-iodine" cx="252" cy="135" r="8"/>
    <path className="ft-arrow" d="M345 215H430"/>
    <rect className="ft-tile" x="445" y="155" width="220" height="120" rx="18"/>
    <ellipse className="ft-sample positive-starch" cx="555" cy="215" rx="62" ry="36"/>
    <text className="ft-title" x="210" y="315" textAnchor="middle">iodine added</text>
    <text className="ft-title positive" x="555" y="315" textAnchor="middle">blue-black, starch present</text>
    <text className="ft-label" x="305" y="62">iodine solution</text>
  </svg></ReviewedScienceDiagram>;

  if(testId==="sugar") return <ReviewedScienceDiagram site="FoodEnergyNutritionExplorer.jsx:54"><svg className="spark-food-test-svg" viewBox="0 0 760 400" role="img" aria-label="Benedict's test for reducing sugar showing a test tube heated in a hot-water bath and a brick-red precipitate">
    <path className="ft-beaker" d="M105 105V315Q105 340 130 340H390Q415 340 415 315V105"/>
    <line className="ft-rim" x1="90" y1="105" x2="430" y2="105"/>
    <path className="ft-water" d="M105 190H415V315Q415 340 390 340H130Q105 340 105 315Z"/>
    <path className="ft-test-tube" d="M220 72V280Q220 312 260 312Q300 312 300 280V72"/>
    <line className="ft-test-rim" x1="208" y1="72" x2="312" y2="72"/>
    <path className="ft-benedict blue" d="M220 180H300V280Q300 312 260 312Q220 312 220 280Z"/>
    <path className="ft-precipitate" d="M222 260Q260 244 298 260V284Q298 305 260 310Q222 305 222 284Z"/>
    <text className="ft-label" x="260" y="165" textAnchor="middle">Benedict's + sample</text>
    <text className="ft-label" x="370" y="224">hot-water bath</text>
    <text className="ft-title positive" x="540" y="165">Positive result</text>
    <rect className="ft-result-chip green" x="520" y="190" width="42" height="34" rx="8"/>
    <rect className="ft-result-chip yellow" x="570" y="190" width="42" height="34" rx="8"/>
    <rect className="ft-result-chip orange" x="620" y="190" width="42" height="34" rx="8"/>
    <rect className="ft-result-chip red" x="670" y="190" width="42" height="34" rx="8"/>
    <text className="ft-small" x="616" y="250" textAnchor="middle">green → yellow → orange → brick-red</text>
    <text className="ft-small" x="616" y="276" textAnchor="middle">more reducing sugar gives a stronger result</text>
    <text className="ft-small" x="260" y="378" textAnchor="middle">heat in hot water, never directly in a flame</text>
  </svg></ReviewedScienceDiagram>;

  if(testId==="protein") return <ReviewedScienceDiagram site="FoodEnergyNutritionExplorer.jsx:74"><svg className="spark-food-test-svg" viewBox="0 0 760 360" role="img" aria-label="Biuret test for protein showing blue reagent becoming purple or lilac when protein is present">
    <path className="ft-test-tube large" d="M125 70V275Q125 315 175 315Q225 315 225 275V70"/>
    <line className="ft-test-rim" x1="110" y1="70" x2="240" y2="70"/>
    <path className="ft-biuret blue" d="M125 180H225V275Q225 315 175 315Q125 315 125 275Z"/>
    <path className="ft-dropper" d="M250 55L298 103L280 122L232 74Z"/>
    <circle className="ft-biuret-drop" cx="256" cy="136" r="8"/>
    <path className="ft-arrow" d="M300 220H405"/>
    <path className="ft-test-tube large" d="M445 70V275Q445 315 495 315Q545 315 545 275V70"/>
    <line className="ft-test-rim" x1="430" y1="70" x2="560" y2="70"/>
    <path className="ft-biuret purple" d="M445 180H545V275Q545 315 495 315Q445 315 445 275Z"/>
    <text className="ft-title" x="175" y="342" textAnchor="middle">Biuret reagent added</text>
    <text className="ft-title positive" x="495" y="342" textAnchor="middle">lilac / purple, protein present</text>
    <text className="ft-label" x="305" y="60">Biuret reagent</text>
  </svg></ReviewedScienceDiagram>;

  return <ReviewedScienceDiagram site="FoodEnergyNutritionExplorer.jsx:89"><svg className="spark-food-test-svg" viewBox="0 0 760 360" role="img" aria-label="Brown paper grease-spot test for fat showing a persistent translucent spot after drying">
    <rect className="ft-paper" x="85" y="80" width="245" height="205" rx="10"/>
    <path className="ft-food-smear" d="M150 150Q205 110 267 153Q255 218 176 226Q126 204 150 150Z"/>
    <text className="ft-label" x="208" y="315" textAnchor="middle">rub food onto brown paper</text>
    <path className="ft-arrow" d="M350 180H430"/>
    <rect className="ft-paper" x="450" y="80" width="225" height="205" rx="10"/>
    <ellipse className="ft-grease-spot" cx="562" cy="184" rx="72" ry="55"/>
    <text className="ft-title positive" x="562" y="315" textAnchor="middle">persistent translucent spot, fat present</text>
    <text className="ft-small" x="390" y="115" textAnchor="middle">allow paper to dry</text>
  </svg></ReviewedScienceDiagram>;
}

function FoodTestView(){
  const [testId,setTestId]=useState("starch");
  const item=TESTS.find(test=>test.id===testId);
  return <div className="spark-food-tests">
    <div className="spark-food-test-buttons">{TESTS.map(test=><button type="button" key={test.id} className={testId===test.id?"active":""} onClick={()=>setTestId(test.id)}>{test.name}</button>)}</div>
    <article>
      <span>TEST FOR {item.name.toUpperCase()}</span>
      <h4>{item.reagent}</h4>
      <p>{item.method}</p>
      <FoodTestDiagram testId={testId}/>
      <div><b>Positive result</b><strong>{item.positive}</strong></div>
      <div><b>Negative result</b><strong>{item.negative}</strong></div>
    </article>
  </div>;
}

function EnergyNeedView(){
  const [grams,setGrams]=useState(40);
  const per100=1500;
  const value=Math.max(0,Number(grams)||0);
  const energy=Math.round((per100*value/100)*10)/10;
  return <div className="spark-food-energy-needs">
    <article className="spark-food-label">
      <span>FOOD LABEL</span>
      <h4>Energy: 1 500 kJ per 100 g</h4>
      <label>Serving size, g<input type="number" min="0" value={grams} onChange={e=>setGrams(e.target.value)}/></label>
      <strong>{energy.toLocaleString()} kJ</strong>
      <p>Calculation: 1 500 × {value || 0} ÷ 100</p>
    </article>
    <article className="spark-food-needs-card">
      <span>ENERGY NEEDS VARY</span>
      <h4>Activity, growth and life stage matter</h4>
      <p>A person doing heavy manual work generally needs more food energy than a sedentary person of similar size.</p>
      <p>Growing teenagers need protein for new tissue. Pregnancy increases requirements for several nutrients, including iron.</p>
      <p>When energy intake repeatedly exceeds energy use, excess energy is stored, mainly as fat, increasing the risk of overweight and obesity.</p>
    </article>
  </div>;
}

function CaribbeanView(){
  const groups=[
    ["Staples","Rice, bread, yam, green banana, breadfruit","Important sources of starch and food energy."],
    ["Legumes","Red peas, gungo peas, lentils, beans","Good plant sources of protein and fibre."],
    ["Food from animals","Fish, eggs, meat, milk","Sources of protein and several vitamins and minerals."],
    ["Vegetables","Callaloo, cabbage, carrot","Provide vitamins, minerals and fibre."],
    ["Fruits","Mango, orange, guava, banana","Provide vitamins, minerals, fibre and natural sugars."],
    ["Fats and oils","Vegetable oils, avocado, nuts","Concentrated source of energy."],
  ];
  return <div className="spark-caribbean-food-groups">{groups.map(([name,examples,note],i)=><article key={name}><span>{i+1}</span><div><b>{name}</b><p>{examples}</p><small>{note}</small></div></article>)}</div>;
}

export default function FoodEnergyNutritionExplorer(){
  const [view,setView]=useState("nutrients");
  const summary=useMemo(()=>({
    nutrients:"A balanced diet supplies all required nutrients, fibre and water in suitable proportions.",
    groups:"Caribbean food groups help organise local foods by their main nutritional roles.",
    deficiency:"Deficiency diseases link a missing nutrient with a specific body function.",
    tests:"Food tests use characteristic colour or physical changes to identify selected nutrients.",
    energy:"Food labels and serving sizes let you calculate energy intake quantitatively.",
  })[view],[view]);

  return <section className="spark-food-energy-nutrition">
    <header><span>FOOD AS A SOURCE OF ENERGY</span><h3>Connect food energy with nutrients, diet quality and practical food tests</h3><p>Carbohydrates are the main dietary source of energy, while a balanced diet also supplies protein, fats, vitamins, minerals, fibre and water.</p></header>
    <div className="spark-food-energy-tabs">{[["nutrients","Nutrients"],["groups","Caribbean groups"],["deficiency","Deficiencies"],["tests","Food tests"],["energy","Energy needs"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-food-energy-stage">
      {view==="nutrients"&&<NutrientView/>}
      {view==="groups"&&<CaribbeanView/>}
      {view==="deficiency"&&<DeficiencyView/>}
      {view==="tests"&&<FoodTestView/>}
      {view==="energy"&&<EnergyNeedView/>}
    </div>
    <div className="spark-food-energy-summary"><strong>{summary}</strong><span>MSG is used as a flavour enhancer. Artificial sweeteners provide sweetness with little or no food energy compared with sugar.</span></div>
  </section>;
}

export { NUTRIENTS,DEFICIENCIES,TESTS };
