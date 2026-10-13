// Figure 5 source circuit and a separate corrective model answer.
// CSEC_Chemistry_P2_2014_MJ.pdf, PDF page 12 (printed page 12).
// Source figure has cell, switch and two electrode ends but no test-liquid
// container or bulb/ammeter. SVG is provisional pending scan overlay check.
export const CHEMISTRY_2014_Q4_SOURCE_CIRCUIT_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 260" role="img" aria-label="Original source circuit without a current indicator">
<title>Figure 5. Diagram of a circuit</title><rect width="550" height="260" fill="#fff"/>
<g stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="square">
<path d="M128 120 V62 H247 M273 62 H425V210H356"/>
<path d="M128 141 V210 H195"/>
<path d="M128 120L120 141" />
<line x1="247" y1="47" x2="247" y2="77" stroke-width="2.4"/>
<line x1="260" y1="54" x2="260" y2="70" stroke-width="2.4"/>
<path d="M195 204V244" stroke-width="10"/>
<path d="M356 204V244" stroke-width="10"/>
</g>
<text x="275" y="255" text-anchor="middle" font-size="15" fill="#111" font-family="Times New Roman,serif">Figure 5. Diagram of a circuit</text></svg>`;

export const CHEMISTRY_2014_Q4_CORRECTED_CIRCUIT_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 385" role="img" aria-label="Corrected conductivity circuit with battery, switch, lamp and immersed inert electrodes in a beaker">
<title>Model answer: conductivity testing circuit</title><rect width="690" height="385" fill="#fff"/>
<g stroke="#111" stroke-width="2.6" fill="none" stroke-linejoin="round">
<path d="M100 135 V70 H267 M286 70 H365"/>
<line x1="267" y1="51" x2="267" y2="89" stroke-width="2.4"/>
<line x1="283" y1="60" x2="283" y2="80" stroke-width="2.4"/>
<circle cx="410" cy="70" r="32"/>
<path d="M391 51 L429 89 M429 51 L391 89"/>
<path d="M442 70 H574 V253 H525 M100 165 V253 H170"/>
<path d="M100 135 L100 165" />
<path d="M170 230 V326" stroke-width="8"/>
<path d="M525 230 V326" stroke-width="8"/>
<path d="M148 222V336 Q347 375 548 336V222"/>
<path d="M150 258 Q340 251 546 258" stroke="#5195a3" stroke-width="1.2"/>
<path d="M149 258V335 Q348 363 546 335V258" fill="#e8f5f8" stroke="none"/>
</g>
<g font-family="Arial,sans-serif" font-size="17" fill="#111">
<text x="220" y="39">Cell</text>
<text x="445" y="34">Bulb (indicator)</text>
<text x="44" y="195">Closed switch</text>
<text x="230" y="376">Solution to be tested</text>
<text x="505" y="376">Beaker</text>
<text x="44" y="288">Inert electrodes</text>
</g></svg>`;
