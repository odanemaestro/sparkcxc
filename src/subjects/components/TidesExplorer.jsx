import React,{useMemo,useState} from "react";
import "./tidesExplorer.css";

function BulgeView(){
  return <div className="spark-tide-bulges">
    <svg viewBox="0 0 920 500" role="img" aria-label="Earth with near-side and far-side tidal bulges aligned with the Moon and low-tide regions at right angles">
      <defs>
        <linearGradient id="td-ocean-gradient" x1="0" x2="1">
          <stop offset="0%" stopColor="#b9ddea"/>
          <stop offset="50%" stopColor="#8dc5dc"/>
          <stop offset="100%" stopColor="#b9ddea"/>
        </linearGradient>
      </defs>

      <ellipse className="td-water" cx="405" cy="250" rx="205" ry="116"/>
      <circle className="td-earth" cx="405" cy="250" r="94"/>
      <circle className="td-moon" cx="790" cy="250" r="42"/>

      <g className="td-gravity-gradient">
        <path className="td-pull strongest" d="M505 215H685"/>
        <path className="td-pull middle" d="M430 250H685"/>
        <path className="td-pull weakest" d="M305 285H685"/>
      </g>

      <g className="td-bulge-guides">
        <path d="M610 250H705"/>
        <path d="M200 250H115"/>
        <path d="M405 134V82"/>
        <path d="M405 366V418"/>
      </g>

      <text className="td-label earth" x="405" y="256" textAnchor="middle">Earth</text>
      <text className="td-label" x="790" y="316" textAnchor="middle">Moon</text>

      <text className="td-label high near" x="650" y="230">high tide</text>
      <text className="td-small" x="650" y="251">near-side bulge</text>

      <text className="td-label high far" x="60" y="230">high tide</text>
      <text className="td-small" x="60" y="251">far-side bulge</text>

      <text className="td-label low" x="405" y="66" textAnchor="middle">low tide</text>
      <text className="td-label low" x="405" y="452" textAnchor="middle">low tide</text>

      <path className="td-rotation" d="M334 150Q405 105 476 150"/>
      <text className="td-small" x="405" y="110" textAnchor="middle">Earth rotates through both bulges</text>

      <g className="td-gradient-key" transform="translate(570 35)">
        <rect x="0" y="0" width="310" height="108" rx="14"/>
        <text className="td-small heading" x="16" y="28">Moon's pull differs across Earth</text>
        <line className="td-pull strongest" x1="18" y1="50" x2="96" y2="50"/>
        <text className="td-small" x="112" y="55">stronger on near side</text>
        <line className="td-pull weakest" x1="18" y1="79" x2="70" y2="79"/>
        <text className="td-small" x="112" y="84">weaker on far side</text>
      </g>

      <text className="td-caption" x="405" y="486" textAnchor="middle">The difference in lunar gravitational pull across Earth produces two broad tidal bulges.</text>
    </svg>
    <div className="spark-tide-bulge-notes">
      <article><b>Two high tides</b><span>Water forms broad bulges on the side facing the Moon and on the opposite side.</span></article>
      <article><b>Two low tides</b><span>Areas roughly 90° from the Earth-Moon line lie between the bulges and experience lower sea level.</span></article>
      <article><b>Why the times shift</b><span>The Moon also moves in its orbit, so Earth must rotate a little more than 24 hours to face the Moon again. A lunar day is about 24 h 50 min.</span></article>
    </div>
    <p>The Moon's gravity is the main cause of ocean tides. Because the Moon's gravitational pull is stronger on the side of Earth nearer the Moon and weaker on the far side, two broad tidal bulges form. As Earth rotates through them, many coastal locations experience about two high tides and two low tides during a lunar day.</p>
  </div>;
}

function SpringNeapView(){
  const [type,setType]=useState("spring");
  const spring=type==="spring";
  return <div className="spark-spring-neap">
    <div className="spark-tide-toggle"><button type="button" className={spring?"active":""} onClick={()=>setType("spring")}>Spring tide</button><button type="button" className={!spring?"active":""} onClick={()=>setType("neap")}>Neap tide</button></div>
    <svg viewBox="0 0 860 430" role="img" aria-label={spring?"Sun Earth and Moon aligned with a large tidal range for spring tide":"Sun and Moon at right angles with a smaller tidal range for neap tide"}>
      <circle className="sn-sun" cx="110" cy="215" r="58"/>

      {spring
        ? <ellipse className="sn-water spring-range" cx="430" cy="215" rx="118" ry="79"/>
        : <ellipse className="sn-water neap-range" cx="430" cy="215" rx="82" ry="94"/>}
      <circle className="sn-earth" cx="430" cy="215" r="70"/>

      {spring?<circle className="sn-moon" cx="715" cy="215" r="30"/>:<circle className="sn-moon" cx="430" cy="60" r="30"/>}

      <path className="sn-force sun" d="M180 215H350"/>
      <path className="sn-force moon" d={spring?"M680 215H510":"M430 95V145"}/>

      {spring ? <>
        <path className="sn-range-guide" d="M312 315V350M548 315V350M312 342H548"/>
        <text className="sn-range-label" x="430" y="374" textAnchor="middle">largest tidal range</text>
        <text className="sn-bulge-label" x="575" y="184">larger high-tide bulge</text>
      </> : <>
        <path className="sn-range-guide" d="M348 315V350M512 315V350M348 342H512"/>
        <text className="sn-range-label" x="430" y="374" textAnchor="middle">smallest tidal range</text>
        <text className="sn-bulge-label" x="535" y="145">smaller bulges</text>
      </>}

      <text className="sn-label" x="110" y="300" textAnchor="middle">Sun</text>
      <text className="sn-label" x="430" y="222" textAnchor="middle">Earth</text>
      <text className="sn-label" x={spring?715:485} y={spring?285:62}>Moon</text>
    </svg>
    <p>{spring?"At new moon and full moon, the Sun, Earth and Moon are approximately aligned. Their tidal effects reinforce each other, producing the greatest tidal range.":"At first and last quarter, the Sun and Moon pull at roughly right angles. Their tidal effects partly oppose each other, producing the smallest tidal range."}</p>
  </div>;
}

function TimingView(){
  const [first,setFirst]=useState("06:00");
  return <div className="spark-tide-timing">
    <article><span>TYPICAL INTERVAL</span><h4>About 12 hours 25 minutes between successive high tides</h4><p>The exact time varies by location and coastal shape, but this is the standard CSEC value.</p></article>
    <article><span>ABOUT TWO HIGH TIDES DAILY</span><h4>Earth rotates through both tidal bulges</h4><p>Many places therefore experience two high tides and two low tides during a lunar day of about 24 hours 50 minutes.</p></article>
    <label>Example first high tide<input type="time" value={first} onChange={e=>setFirst(e.target.value)}/></label>
  </div>;
}

function CoastView(){
  return <div className="spark-tide-coast">
    <article><span>LOW TIDE</span><h4>More shore exposed</h4><p>Rock pools, reefs and shellfish areas become more accessible when the sea level falls.</p></article>
    <article><span>COASTAL EROSION</span><h4>Waves and tides move sediment</h4><p>Repeated wave action and tidal currents can remove sand and weaken coastlines.</p></article>
    <article><span>MANGROVES</span><h4>Natural energy absorber</h4><p>Mangrove roots slow water, trap sediment and help reduce erosion and wave energy.</p></article>
    <article><span>SEA WALLS</span><h4>Engineered protection</h4><p>Sea walls can protect specific coastlines but must be designed carefully because reflected wave energy can shift erosion elsewhere.</p></article>
  </div>;
}

function TsunamiView(){
  return <div className="spark-tsunami-view">
    <div className="spark-tsunami-sequence">
      <article><span>1</span><b>Water displaced</b><p>An undersea earthquake, landslide or volcanic eruption suddenly displaces a large volume of water.</p></article>
      <div>→</div>
      <article><span>2</span><b>Wave train travels</b><p>A series of long waves moves across the ocean.</p></article>
      <div>→</div>
      <article><span>3</span><b>Coast impact</b><p>As the waves enter shallow water they can grow in height and flood coastal areas.</p></article>
    </div>
    <aside><strong>Tsunami is not a tide</strong><p>A tsunami is a series of waves caused by sudden water displacement. It is not produced by the regular gravitational tide cycle.</p></aside>
    <aside><strong>Natural warning sign</strong><p>If the sea suddenly draws back unusually far after a strong or long earthquake, move immediately to higher ground and follow official tsunami warnings.</p></aside>
  </div>;
}

export default function TidesExplorer(){
  const [view,setView]=useState("bulges");
  const summary=useMemo(()=>({
    bulges:"The Moon's gravity is the main driver of Earth's ocean tides.",
    spring:"Spring tides have the largest range. Neap tides have the smallest range.",
    timing:"Many coasts experience about two high tides each lunar day, roughly 12 h 25 min apart.",
    coast:"Tides affect shore access, fishing and coastal erosion.",
    tsunami:"Tsunamis are caused by sudden displacement of water and must not be confused with regular tides."
  })[view],[view]);
  return <section className="spark-tides-explorer">
    <header><span>TIDES</span><h3>Connect lunar gravity, spring and neap tides, coastal effects and tsunami safety</h3><p>Tides are regular changes in sea level caused mainly by the Moon's gravitational effect on Earth's oceans, with the Sun also contributing.</p></header>
    <div className="spark-tide-tabs">{[["bulges","Why tides occur"],["spring","Spring and neap"],["timing","Tide timing"],["coast","Coastal effects"],["tsunami","Tsunamis"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-tide-stage">{view==="bulges"&&<BulgeView/>}{view==="spring"&&<SpringNeapView/>}{view==="timing"&&<TimingView/>}{view==="coast"&&<CoastView/>}{view==="tsunami"&&<TsunamiView/>}</div>
    <div className="spark-tide-summary"><strong>{summary}</strong><span>Spring tides occur around new and full moon. Neap tides occur around the quarter moons.</span></div>
  </section>;
}
