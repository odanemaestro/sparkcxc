import React from "react";
import "./physicsFlashcardVisual.css";

export const PHYSICS_FLASHCARD_VISUAL_OBJECTIVES = Object.freeze([
  "A1.3", "A1.4", "A1.5", "A2.2", "A2.4", "A3.11", "A3.12", "A4.2",
  "B2.9", "B2.10", "B3.4", "C1.3", "C4.8", "C4.13", "C5.1",
  "D2.6", "D2.7", "D4.1", "D4.2", "D4.5", "D5.2", "D6.7", "D7.1",
  "D7.2", "D7.5", "D7.6", "E2.1", "E3.5", "E3.9", "E3.10",
]);

const ArrowHead = ({ x, y, rotate = 0 }) => <path className="pfv-arrow-head" transform={`translate(${x} ${y}) rotate(${rotate})`} d="M0 0 l-12 -6 v12 z"/>;

function Electron({ cx, cy }) {
  return <g className="pfv-electron"><circle cx={cx} cy={cy} r="7"/><text x={cx} y={cy + 3} textAnchor="middle">−</text></g>;
}

function PendulumGraphVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Experimental pendulum graph with plotted points, axes and a straight best-fit line">
    <figcaption>Experimental graph: plot the data, then draw one best-fit line</figcaption>
    <svg viewBox="0 0 720 300" role="img" aria-label="Graph of period squared against pendulum length with scattered plotted points and a straight line of best fit">
      <g transform="translate(78 28)">
        <line className="pfv-axis" x1="0" y1="226" x2="560" y2="226"/><line className="pfv-axis" x1="0" y1="226" x2="0" y2="18"/>
        {[70,140,210,280,350,420,490].map(x=><line key={`x${x}`} className="pfv-grid" x1={x} y1="20" x2={x} y2="226"/>)}
        {[52,104,156,208].map(y=><line key={`y${y}`} className="pfv-grid" x1="0" y1={y} x2="560" y2={y}/>)}
        <line className="pfv-best-fit" x1="18" y1="218" x2="520" y2="38"/>
        {[[92,192],[178,161],[267,129],[354,101],[444,67],[506,51]].map(([x,y],i)=><circle className="pfv-data-point" cx={x} cy={y} r="5" key={i}/>)}
        <text x="558" y="249" textAnchor="end">length, l / m</text><text x="5" y="12">T² / s²</text>
        <text className="pfv-note" x="300" y="282" textAnchor="middle">Gradient = change in T² ÷ change in l</text>
      </g>
    </svg>
  </figure>;
}

function VectorScaleVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Scale vector diagram showing two vectors and their resultant">
    <figcaption>Scale diagram: draw vectors head-to-tail and measure the resultant</figcaption>
    <svg viewBox="0 0 720 290" role="img" aria-label="Two vectors drawn head-to-tail with a resultant from the starting point to the final point">
      <g transform="translate(90 220)">
        <line className="pfv-vector-a" x1="0" y1="0" x2="250" y2="0"/><ArrowHead x={250} y={0}/><text x="118" y="28">A</text>
        <line className="pfv-vector-b" x1="250" y1="0" x2="410" y2="-132"/><ArrowHead x={410} y={-132} rotate={-40}/><text x="342" y="-54">B</text>
        <line className="pfv-resultant" x1="0" y1="0" x2="410" y2="-132"/><ArrowHead x={410} y={-132} rotate={-18}/><text x="192" y="-88">resultant R</text>
        <path className="pfv-dim" d="M55 -12 A55 55 0 0 0 45 -34"/><text x="62" y="-35">θ</text>
      </g>
    </svg>
  </figure>;
}

function VectorComponentsVisual() {
  return <figure className="pm-flashcard-visual" aria-label="A sloping vector resolved into horizontal and vertical components">
    <figcaption>One vector is equivalent to perpendicular components</figcaption>
    <svg viewBox="0 0 720 280" role="img" aria-label="Vector F resolved into horizontal Fx and vertical Fy components">
      <g transform="translate(125 220)">
        <line className="pfv-resultant" x1="0" y1="0" x2="380" y2="-150"/><ArrowHead x={380} y={-150} rotate={-22}/><text x="210" y="-102">F</text>
        <line className="pfv-vector-a" x1="0" y1="0" x2="380" y2="0"/><ArrowHead x={380} y={0}/><text x="170" y="30">Fₓ</text>
        <line className="pfv-vector-b" x1="380" y1="0" x2="380" y2="-150"/><ArrowHead x={380} y={-150} rotate={-90}/><text x="397" y="-72">Fᵧ</text>
        <path className="pfv-right-angle" d="M350 0 v-30 h30"/>
      </g>
    </svg>
  </figure>;
}

function CentreGravityVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Irregular lamina suspended from two points with plumb lines crossing at the centre of gravity">
    <figcaption>Finding the centre of gravity of an irregular lamina</figcaption>
    <svg viewBox="0 0 720 320" role="img" aria-label="An irregular lamina has two suspension points and two plumb lines whose intersection locates the centre of gravity">
      <path className="pfv-lamina" d="M245 58 C330 30 438 66 480 132 C514 188 465 254 384 270 C303 286 216 250 192 184 C170 123 196 78 245 58 Z"/>
      <circle className="pfv-node" cx="258" cy="70" r="5"/><circle className="pfv-node" cx="438" cy="92" r="5"/>
      <line className="pfv-plumb" x1="258" y1="70" x2="362" y2="292"/><line className="pfv-plumb" x1="438" y1="92" x2="342" y2="292"/>
      <circle className="pfv-cg" cx="354" cy="275" r="7"/><text x="370" y="278">centre of gravity</text>
      <text x="196" y="45">suspend here</text><text x="446" y="72">then here</text>
    </svg>
  </figure>;
}

function StabilityVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Stable and unstable objects showing the line of action of weight relative to the base">
    <figcaption>Stability depends on whether the weight acts inside the base</figcaption>
    <svg viewBox="0 0 720 290" role="img" aria-label="Two blocks, one stable with its weight line inside the base and one tipping with its weight line outside the base">
      <g transform="translate(90 50)"><rect className="pfv-object" x="50" y="50" width="150" height="135"/><circle className="pfv-cg" cx="125" cy="105" r="6"/><line className="pfv-force" x1="125" y1="105" x2="125" y2="214"/><ArrowHead x={125} y={214} rotate={90}/><line className="pfv-ground" x1="20" y1="190" x2="230" y2="190"/><text x="125" y="236" textAnchor="middle">stable</text></g>
      <g transform="translate(410 50)"><g transform="rotate(22 125 185)"><rect className="pfv-object" x="50" y="50" width="150" height="135"/><circle className="pfv-cg" cx="125" cy="105" r="6"/></g><line className="pfv-force" x1="167" y1="88" x2="167" y2="214"/><ArrowHead x={167} y={214} rotate={90}/><line className="pfv-ground" x1="20" y1="190" x2="230" y2="190"/><text x="125" y="236" textAnchor="middle">tips when line falls outside base</text></g>
    </svg>
  </figure>;
}

function MotionGraphsVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Displacement-time and velocity-time graphs showing gradients and area">
    <figcaption>Read what the graph represents before using gradient or area</figcaption>
    <svg viewBox="0 0 720 300" role="img" aria-label="Displacement-time graph with gradient equal to velocity and velocity-time graph with area equal to displacement">
      <g transform="translate(48 35)"><text className="pfv-title" x="140" y="0" textAnchor="middle">displacement-time</text><line className="pfv-axis" x1="0" y1="205" x2="285" y2="205"/><line className="pfv-axis" x1="22" y1="220" x2="22" y2="25"/><path className="pfv-plot" d="M22 190 L245 55"/><path className="pfv-dim" d="M125 130 H205 V82"/><text x="164" y="151">Δt</text><text x="213" y="108">Δs</text><text x="115" y="48">gradient = velocity</text></g>
      <g transform="translate(397 35)"><text className="pfv-title" x="140" y="0" textAnchor="middle">velocity-time</text><line className="pfv-axis" x1="0" y1="205" x2="285" y2="205"/><line className="pfv-axis" x1="22" y1="220" x2="22" y2="25"/><path className="pfv-area" d="M22 205 L22 160 L230 70 L230 205 Z"/><path className="pfv-plot" d="M22 160 L230 70"/><text x="145" y="155" textAnchor="middle">area = displacement</text><text x="115" y="48">gradient = acceleration</text></g>
    </svg>
  </figure>;
}

function KelvinGraphVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Gas property against Celsius temperature extrapolated to minus 273 degrees Celsius">
    <figcaption>Kelvin scale from extrapolating a gas-property graph</figcaption>
    <svg viewBox="0 0 720 290" role="img" aria-label="A straight pressure or volume trend extrapolates to zero near minus 273 degrees Celsius, corresponding to zero kelvin">
      <g transform="translate(82 35)"><line className="pfv-axis" x1="0" y1="205" x2="550" y2="205"/><line className="pfv-axis" x1="120" y1="220" x2="120" y2="20"/><line className="pfv-best-fit" x1="32" y1="205" x2="510" y2="45"/>{[[182,154],[260,129],[338,101],[420,73]].map(([x,y],i)=><circle className="pfv-data-point" cx={x} cy={y} r="5" key={i}/>)}<line className="pfv-guide-line" x1="32" y1="205" x2="32" y2="222"/><text x="32" y="244" textAnchor="middle">−273 °C</text><text x="120" y="244" textAnchor="middle">0 °C</text><text x="548" y="224" textAnchor="end">temperature / °C</text><text x="128" y="18">pressure or volume</text><text x="48" y="184">0 K</text></g>
    </svg>
  </figure>;
}

function PhaseChangeVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Heating curve with flat sections during melting and boiling">
    <figcaption>Temperature stays constant while a pure substance changes state</figcaption>
    <svg viewBox="0 0 720 290" role="img" aria-label="Heating curve with rising temperature sections and horizontal plateaus during melting and boiling">
      <g transform="translate(88 32)"><line className="pfv-axis" x1="0" y1="220" x2="545" y2="220"/><line className="pfv-axis" x1="0" y1="220" x2="0" y2="20"/><polyline className="pfv-plot" points="20,205 120,155 235,155 335,90 450,90 525,44"/><text x="176" y="145" textAnchor="middle">melting</text><text x="394" y="80" textAnchor="middle">boiling</text><text x="540" y="244" textAnchor="end">time or energy supplied</text><text x="8" y="17">temperature</text></g>
    </svg>
  </figure>;
}

function WaveGraphsVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Comparison of displacement-position and displacement-time wave graphs">
    <figcaption>Read the horizontal axis before interpreting the wave</figcaption>
    <svg viewBox="0 0 720 300" role="img" aria-label="Two sinusoidal wave graphs. The displacement-position graph shows wavelength lambda, and the displacement-time graph shows period T">
      <g transform="translate(34 30)"><text className="pfv-title" x="145" y="0" textAnchor="middle">Displacement-position</text><line className="pfv-axis" x1="0" y1="105" x2="292" y2="105"/><line className="pfv-axis" x1="18" y1="22" x2="18" y2="188"/><path className="pfv-wave" d="M18 105 C52 30 88 30 122 105 S192 180 226 105 S276 30 292 70"/><line className="pfv-dim" x1="70" y1="38" x2="214" y2="38"/><path className="pfv-dim" d="M70 38 l10 -5 v10 z M214 38 l-10 -5 v10 z"/><text x="142" y="29" textAnchor="middle">λ</text><text x="285" y="126" textAnchor="end">position</text><text x="8" y="16">displacement</text></g>
      <g transform="translate(394 30)"><text className="pfv-title" x="145" y="0" textAnchor="middle">Displacement-time</text><line className="pfv-axis" x1="0" y1="105" x2="292" y2="105"/><line className="pfv-axis" x1="18" y1="22" x2="18" y2="188"/><path className="pfv-wave" d="M18 105 C52 30 88 30 122 105 S192 180 226 105 S276 30 292 70"/><line className="pfv-dim" x1="70" y1="38" x2="214" y2="38"/><path className="pfv-dim" d="M70 38 l10 -5 v10 z M214 38 l-10 -5 v10 z"/><text x="142" y="29" textAnchor="middle">T</text><text x="285" y="126" textAnchor="end">time</text><text x="8" y="16">displacement</text></g>
    </svg>
  </figure>;
}

function RefractionVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Ray of light refracting toward the normal on entering glass">
    <figcaption>Refraction at an air-glass boundary</figcaption>
    <svg viewBox="0 0 720 290" role="img" aria-label="Incident ray in air enters glass and bends toward the normal">
      <rect className="pfv-soft-fill" x="50" y="145" width="620" height="110"/><line className="pfv-boundary" x1="50" y1="145" x2="670" y2="145"/><line className="pfv-normal" x1="360" y1="30" x2="360" y2="260"/><line className="pfv-ray" x1="180" y1="55" x2="360" y2="145"/><ArrowHead x={360} y={145} rotate={27}/><line className="pfv-ray" x1="360" y1="145" x2="430" y2="248"/><ArrowHead x={430} y={248} rotate={56}/><text x="122" y="60">air</text><text x="90" y="180">glass</text><text x="368" y="45">normal</text><text x="260" y="100">i</text><text x="388" y="190">r</text>
    </svg>
  </figure>;
}

function TirVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Optical fibre diagram showing repeated total internal reflection">
    <figcaption>Total internal reflection in an optical fibre</figcaption>
    <svg viewBox="0 0 720 280" role="img" aria-label="Light ray reflecting repeatedly inside the glass core of an optical fibre"><rect className="pfv-soft-fill" x="72" y="74" width="576" height="132" rx="28"/><rect className="pfv-core" x="92" y="96" width="536" height="88" rx="20"/><polyline className="pfv-ray" points="104,140 190,102 278,178 366,102 454,178 542,102 616,140"/><g className="pfv-labels"><text x="360" y="62" textAnchor="middle">glass core</text><text x="360" y="232" textAnchor="middle">cladding</text><text x="525" y="90">ray stays inside by TIR</text></g></svg>
  </figure>;
}

function LensVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Parallel light rays through converging and diverging lenses">
    <figcaption>Effect of converging and diverging lenses on parallel rays</figcaption>
    <svg viewBox="0 0 720 300" role="img" aria-label="Parallel rays converge after a convex lens and diverge after a concave lens">
      <g transform="translate(22 30)"><text className="pfv-title" x="165" y="0" textAnchor="middle">converging lens</text><path className="pfv-lens" d="M170 32 Q210 105 170 178 Q130 105 170 32"/>{[70,105,140].map((y,i)=><line key={i} className="pfv-ray-thin" x1="25" y1={y} x2="170" y2={y}/>)}<line className="pfv-ray-thin" x1="170" y1="70" x2="300" y2="105"/><line className="pfv-ray-thin" x1="170" y1="105" x2="300" y2="105"/><line className="pfv-ray-thin" x1="170" y1="140" x2="300" y2="105"/><circle className="pfv-node" cx="300" cy="105" r="4"/><text x="300" y="128" textAnchor="middle">focus</text></g>
      <g transform="translate(382 30)"><text className="pfv-title" x="165" y="0" textAnchor="middle">diverging lens</text><path className="pfv-lens" d="M135 32 Q170 105 135 178 H205 Q170 105 205 32 Z"/>{[70,105,140].map((y,i)=><line key={i} className="pfv-ray-thin" x1="25" y1={y} x2="170" y2={y}/>)}<line className="pfv-ray-thin" x1="170" y1="70" x2="300" y2="38"/><line className="pfv-ray-thin" x1="170" y1="105" x2="300" y2="105"/><line className="pfv-ray-thin" x1="170" y1="140" x2="300" y2="172"/></g>
    </svg>
  </figure>;
}

function CurrentGraphsVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Direct current and alternating current against time">
    <figcaption>Direct current compared with alternating current</figcaption>
    <svg viewBox="0 0 720 290" role="img" aria-label="A direct current graph stays on one side of zero while an alternating current graph reverses direction periodically">
      <g transform="translate(36 30)"><text className="pfv-title" x="145" y="0" textAnchor="middle">direct current</text><line className="pfv-axis" x1="10" y1="115" x2="292" y2="115"/><line className="pfv-axis" x1="24" y1="190" x2="24" y2="30"/><line className="pfv-plot" x1="24" y1="70" x2="275" y2="70"/><text x="270" y="137">time</text><text x="29" y="26">current</text></g>
      <g transform="translate(394 30)"><text className="pfv-title" x="145" y="0" textAnchor="middle">alternating current</text><line className="pfv-axis" x1="10" y1="115" x2="292" y2="115"/><line className="pfv-axis" x1="24" y1="190" x2="24" y2="30"/><path className="pfv-wave" d="M24 115 C55 45 88 45 120 115 S185 185 217 115 S258 45 292 110"/><text x="270" y="137">time</text><text x="29" y="26">current</text></g>
    </svg>
  </figure>;
}

function CircuitSymbolsVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Example circuit diagram using standard symbols"><figcaption>Example circuit using standard symbols</figcaption><svg viewBox="0 0 720 280" role="img" aria-label="Series circuit containing a cell, switch, resistor and ammeter"><path className="pfv-wire" d="M100 82 H250 M310 82 H420 M500 82 H620 V210 H100 V82"/><line className="pfv-wire" x1="250" y1="82" x2="278" y2="58"/><circle className="pfv-node" cx="250" cy="82" r="4"/><circle className="pfv-node" cx="310" cy="82" r="4"/><rect className="pfv-component" x="420" y="64" width="80" height="36"/><circle className="pfv-component" cx="360" cy="210" r="28"/><text x="360" y="218" textAnchor="middle" className="pfv-symbol-text">A</text><line className="pfv-wire" x1="142" y1="185" x2="142" y2="235"/><line className="pfv-wire pfv-cell-short" x1="164" y1="193" x2="164" y2="227"/><text x="280" y="45" textAnchor="middle">switch</text><text x="460" y="45" textAnchor="middle">resistor</text><text x="360" y="256" textAnchor="middle">ammeter</text><text x="154" y="256" textAnchor="middle">cell</text></svg></figure>;
}

function SeriesParallelVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Series and parallel circuit comparison"><figcaption>Series and parallel connections</figcaption><svg viewBox="0 0 720 300" role="img" aria-label="A series circuit has one path and a parallel circuit has two branches"><g transform="translate(30 30)"><text className="pfv-title" x="150" y="0" textAnchor="middle">series: one path</text><path className="pfv-wire" d="M40 60 H105 M165 60 H230 M290 60 H320 V200 H40 V60"/><rect className="pfv-component" x="105" y="42" width="60" height="36"/><rect className="pfv-component" x="230" y="42" width="60" height="36"/></g><g transform="translate(380 30)"><text className="pfv-title" x="150" y="0" textAnchor="middle">parallel: branches</text><path className="pfv-wire" d="M40 60 H320 V200 H40 V60 M100 60 V200 M260 60 V200"/><rect className="pfv-component" x="82" y="102" width="36" height="60"/><rect className="pfv-component" x="242" y="102" width="36" height="60"/></g></svg></figure>;
}

function RechargeVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Circuit for recharging a secondary cell with correct polarity"><figcaption>Recharging a secondary cell</figcaption><svg viewBox="0 0 720 300" role="img" aria-label="Direct current supply connected positive to positive through an ammeter and variable resistor to a secondary cell"><path className="pfv-wire" d="M90 78 H180 M244 78 H330 M390 78 H520 M610 78 V226 H90 V78"/><circle className="pfv-component" cx="212" cy="78" r="32"/><text x="212" y="86" textAnchor="middle" className="pfv-symbol-text">A</text><rect className="pfv-component" x="330" y="59" width="60" height="38"/><path className="pfv-wire" d="M342 110 L382 46 M374 48 l10 -2 -4 10"/><line className="pfv-wire" x1="520" y1="52" x2="520" y2="104"/><line className="pfv-wire pfv-cell-short" x1="546" y1="60" x2="546" y2="96"/><line className="pfv-wire" x1="118" y1="196" x2="118" y2="246"/><line className="pfv-wire pfv-cell-short" x1="144" y1="204" x2="144" y2="238"/><text x="132" y="276" textAnchor="middle">DC supply, higher voltage</text><text x="533" y="132" textAnchor="middle">secondary cell</text><text x="510" y="44">+</text><text x="548" y="44">−</text><text x="106" y="190">+</text><text x="146" y="190">−</text><text className="pfv-note" x="360" y="286" textAnchor="middle">Connect positive to positive and negative to negative</text></svg></figure>;
}

function RectifiedVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Battery direct voltage and rectified alternating voltage against time"><figcaption>Battery DC compared with rectified AC</figcaption><svg viewBox="0 0 720 290" role="img" aria-label="Battery voltage is a steady positive line while rectified AC is a sequence of positive pulses"><g transform="translate(36 30)"><text className="pfv-title" x="145" y="0" textAnchor="middle">battery DC</text><line className="pfv-axis" x1="12" y1="176" x2="292" y2="176"/><line className="pfv-axis" x1="24" y1="196" x2="24" y2="30"/><line className="pfv-plot" x1="24" y1="84" x2="278" y2="84"/></g><g transform="translate(394 30)"><text className="pfv-title" x="145" y="0" textAnchor="middle">rectified AC</text><line className="pfv-axis" x1="12" y1="176" x2="292" y2="176"/><line className="pfv-axis" x1="24" y1="196" x2="24" y2="30"/><path className="pfv-wave" d="M24 176 C48 70 76 70 100 176 C124 70 152 70 176 176 C200 70 228 70 252 176 C268 105 282 90 292 140"/></g></svg></figure>;
}

function MagneticFieldVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Magnetic field mapping using a compass around a bar magnet"><figcaption>Mapping a magnetic field</figcaption><svg viewBox="0 0 720 300" role="img" aria-label="Field lines emerge from the north pole and enter the south pole of a bar magnet, with compass positions following the field"><rect className="pfv-magnet-n" x="270" y="120" width="90" height="60"/><rect className="pfv-magnet-s" x="360" y="120" width="90" height="60"/><text x="315" y="157" textAnchor="middle" className="pfv-symbol-text">N</text><text x="405" y="157" textAnchor="middle" className="pfv-symbol-text">S</text>{[0,1,2].map(i=><path key={i} className="pfv-field-loop" d={`M270 ${132+i*18} C${170-i*25} ${55+i*15}, ${550+i*25} ${55+i*15}, 450 ${132+i*18}`}/>)}<text x="360" y="252" textAnchor="middle">small compass points tangent to each field line</text></svg></figure>;
}

function CurrentWireFieldVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Circular magnetic field around a straight current carrying wire"><figcaption>Field around a straight current-carrying conductor</figcaption><svg viewBox="0 0 720 290" role="img" aria-label="A current out of the page produces concentric anticlockwise magnetic field circles according to the right hand grip rule"><circle className="pfv-field-loop" cx="360" cy="140" r="45"/><circle className="pfv-field-loop" cx="360" cy="140" r="85"/><circle className="pfv-field-loop" cx="360" cy="140" r="120"/><circle className="pfv-wire-dot" cx="360" cy="140" r="20"/><circle className="pfv-wire-dot-inner" cx="360" cy="140" r="5"/><path className="pfv-field-loop" d="M360 55 l-8 13 16 0 z"/><text x="388" y="146">current out of page</text><text x="360" y="280" textAnchor="middle">right-hand grip rule gives field direction</text></svg></figure>;
}

function MagneticResultantVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Resultant magnetic field around a current carrying wire in a uniform magnetic field"><figcaption>Resultant magnetic field, current out of the page</figcaption><svg viewBox="0 0 720 310" role="img" aria-label="Uniform field points to the right, circular field around a wire points counterclockwise, field lines are crowded below the wire and the force is upward">{[74,104,134,194,224,254].map(y=><g key={y}><line className="pfv-field" x1="72" y1={y} x2="648" y2={y}/><path className="pfv-field" d={`M648 ${y} l-12 -6 v12 z`}/></g>)}<circle className="pfv-wire-dot" cx="360" cy="164" r="18"/><circle className="pfv-wire-dot-inner" cx="360" cy="164" r="5"/><path className="pfv-field-loop" d="M314 164 A46 46 0 1 1 359 210"/><path className="pfv-field-loop" d="M315 160 l-6 -12 12 2 z"/><path className="pfv-force" d="M360 140 V60 M360 60 l-9 14 M360 60 l9 14"/><text x="378" y="72">force</text><text x="360" y="286" textAnchor="middle">crowded field below, weaker field above</text><text x="360" y="170" textAnchor="middle" className="pfv-symbol-text">•</text></svg></figure>;
}

function FlemingVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Fleming left hand rule showing field, current and force directions"><figcaption>Fleming's left-hand rule</figcaption><svg viewBox="0 0 720 300" role="img" aria-label="Thumb shows force, first finger shows magnetic field, second finger shows conventional current"><g transform="translate(345 150)"><line className="pfv-hand" x1="0" y1="0" x2="0" y2="-105"/><ArrowHead x={0} y={-105} rotate={-90}/><text x="16" y="-96">thumb: force</text><line className="pfv-hand" x1="0" y1="0" x2="125" y2="0"/><ArrowHead x={125} y={0}/><text x="68" y="-14">first finger: field</text><line className="pfv-hand" x1="0" y1="0" x2="-78" y2="78"/><ArrowHead x={-78} y={78} rotate={135}/><text x="-205" y="103">second finger: current</text></g></svg></figure>;
}

function AtomVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Example sketch of a carbon atom showing a nucleus with six protons and six neutrons and six electrons arranged in two shells"><figcaption>Example sketch: carbon atom</figcaption><svg viewBox="0 0 640 320" role="img" aria-label="Carbon atom with six protons and six neutrons in the nucleus, two electrons in the first shell and four electrons in the second shell"><g className="pfv-guide"><circle cx="320" cy="154" r="82"/><circle cx="320" cy="154" r="128"/></g><g className="pfv-nucleus"><circle cx="320" cy="154" r="50"/><text x="320" y="145" textAnchor="middle" className="pfv-symbol-text">6 p+</text><text x="320" y="170" textAnchor="middle" className="pfv-symbol-text">6 n</text></g><Electron cx="402" cy="154"/><Electron cx="238" cy="154"/><Electron cx="410.5" cy="63.5"/><Electron cx="229.5" cy="63.5"/><Electron cx="229.5" cy="244.5"/><Electron cx="410.5" cy="244.5"/><g className="pfv-labels"><path d="M 416 70 L 470 70"/><text x="478" y="75">electron</text><path d="M 355 176 L 474 208"/><text x="482" y="212">nucleus</text><path d="M 208 154 L 106 154"/><text x="98" y="159" textAnchor="end">electron shell</text></g><text className="pfv-note" x="320" y="304" textAnchor="middle">Carbon: nucleus = 6 p+ and 6 n, electron arrangement = 2, 4</text></svg></figure>;
}

function RadiationDeflectionVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Alpha beta and gamma radiation deflected in an electric field"><figcaption>Deflection of α, β and γ in an electric field</figcaption><svg viewBox="0 0 720 300" role="img" aria-label="Alpha bends toward the negative plate, beta bends more strongly toward the positive plate, and gamma is undeflected"><rect className="pfv-plate" x="255" y="45" width="280" height="18"/><rect className="pfv-plate" x="255" y="237" width="280" height="18"/><text x="555" y="60">+</text><text x="555" y="252">−</text><line className="pfv-ray-thin" x1="95" y1="150" x2="255" y2="150"/><path className="pfv-alpha" d="M255 150 Q390 178 520 220"/><path className="pfv-beta" d="M255 150 Q365 90 520 70"/><line className="pfv-gamma" x1="255" y1="150" x2="535" y2="150"/><text x="525" y="220">α</text><text x="525" y="78">β</text><text x="542" y="154">γ</text></svg></figure>;
}

function HalfLifeVisual() {
  return <figure className="pm-flashcard-visual" aria-label="Radioactive decay curve marked at successive half lives"><figcaption>Constant half-life on a radioactive decay curve</figcaption><svg viewBox="0 0 720 300" role="img" aria-label="A smooth exponential decay curve falls from N0 to one half and one quarter at equal time intervals"><g transform="translate(90 25)"><line className="pfv-axis" x1="0" y1="235" x2="545" y2="235"/><line className="pfv-axis" x1="0" y1="235" x2="0" y2="20"/><path className="pfv-decay" d="M0 35 C95 70 165 112 230 154 C310 197 390 219 520 230"/><line className="pfv-guide-line" x1="0" y1="135" x2="190" y2="135"/><line className="pfv-guide-line" x1="190" y1="135" x2="190" y2="235"/><line className="pfv-guide-line" x1="0" y1="185" x2="380" y2="185"/><line className="pfv-guide-line" x1="380" y1="185" x2="380" y2="235"/><text x="-8" y="40" textAnchor="end">N₀</text><text x="-8" y="140" textAnchor="end">N₀/2</text><text x="-8" y="190" textAnchor="end">N₀/4</text><text x="190" y="257" textAnchor="middle">1 half-life</text><text x="380" y="257" textAnchor="middle">2 half-lives</text></g></svg></figure>;
}

export default function PhysicsFlashcardVisual({ objective }) {
  switch (String(objective || "").toUpperCase()) {
    case "A1.3": case "A1.4": case "A1.5": return <PendulumGraphVisual/>;
    case "A2.2": return <VectorScaleVisual/>;
    case "A2.4": return <VectorComponentsVisual/>;
    case "A3.11": return <CentreGravityVisual/>;
    case "A3.12": return <StabilityVisual/>;
    case "A4.2": return <MotionGraphsVisual/>;
    case "B2.9": case "B2.10": return <KelvinGraphVisual/>;
    case "B3.4": return <PhaseChangeVisual/>;
    case "C1.3": return <WaveGraphsVisual/>;
    case "C4.8": return <RefractionVisual/>;
    case "C4.13": return <TirVisual/>;
    case "C5.1": return <LensVisual/>;
    case "D2.6": case "D2.7": return <CurrentGraphsVisual/>;
    case "D4.1": return <CircuitSymbolsVisual/>;
    case "D4.2": return <SeriesParallelVisual/>;
    case "D4.5": return <RechargeVisual/>;
    case "D5.2": return <RectifiedVisual/>;
    case "D6.7": return <MagneticFieldVisual/>;
    case "D7.1": case "D7.2": return <CurrentWireFieldVisual/>;
    case "D7.5": return <MagneticResultantVisual/>;
    case "D7.6": return <FlemingVisual/>;
    case "E2.1": return <AtomVisual/>;
    case "E3.5": return <RadiationDeflectionVisual/>;
    case "E3.9": case "E3.10": return <HalfLifeVisual/>;
    default: return null;
  }
}
