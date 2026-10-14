import React from "react";

/** Reconstructed from the user's 2008 Paper 02, page 5.
 * Diagram represents Ria's Super Flour Mix carton and its front/side labels.
 * Keep the original missing-quantity and missing-directions clues intact.
 */
export default function FnhHistoricalDiagram({type}){
  if(type!=="flour-mix-2008")return null;
  return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 760 485" width="100%" role="img"
      aria-label="Ria's Super Flour Mix carton. The front label reads Ria's Super Flour Mix for Johnny Cakes, Bakes, Fried Dumplings, with ingredients and manufacturer. The side panel shows nutrition facts and a blank Directions for Use area. The net weight is missing.">
      <title>Ria's Super Flour Mix, 2008 Paper 02, Question 6</title>
      <desc>Front and side labels of a three-dimensional flour-mix packet. Candidates identify missing net weight and provide directions for use.</desc>
      <g fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round">
        <path d="M192 105 L455 105 L455 411 L192 411 Z"/>
        <path d="M455 105 L579 62 L579 358 L455 411 Z"/>
        <path d="M192 105 L316 62 L579 62 L455 105 Z"/>
        <path d="M192 296 Q319 265 455 296" opacity=".4"/>
        <ellipse cx="324" cy="257" rx="99" ry="29"/>
        <ellipse cx="324" cy="257" rx="85" ry="22"/>
        {[[275,248],[307,244],[346,244],[383,250],[267,266],[305,262],[345,266],[379,268]].map(([x,y],i)=>
          <ellipse key={i} cx={x} cy={y} rx="12" ry="5" />)}
        <path d="M100 265 H197 M576 271 H664"/>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" textAnchor="middle" fontWeight="600">
        <text x="324" y="137" fontSize="21">Ria's Super Flour Mix</text>
        <text x="324" y="159" fontSize="13">for</text>
        <text x="324" y="187" fontSize="16">Johnny Cakes, Bakes,</text>
        <text x="324" y="206" fontSize="16">Fried Dumplings</text>
        <text x="324" y="335" fontSize="12">Ingredients: Flour, fat, sugar,</text>
        <text x="324" y="351" fontSize="12">baking powder, salt</text>
        <text x="324" y="380" fontSize="11">Ria Ali, 110 Joy Street, Arima,</text>
        <text x="324" y="394" fontSize="11">Trinidad and Tobago</text>
        <text x="78" y="253" fontSize="14">Front</text>
        <text x="78" y="273" fontSize="14">label</text>
        <text x="683" y="259" fontSize="14">Side</text>
        <text x="683" y="279" fontSize="14">label</text>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" textAnchor="middle" fontSize="12.5" fontWeight="600"
        transform="translate(514 113) rotate(-21)">
        <text y="0">Nutrition Facts</text>
        <text y="32">Carbohydrates 80%</text>
        <text y="49">Fat 6%</text>
        <text y="66">Dietary Fibre 8%</text>
        <text y="83">Calcium 3%</text>
        <text y="100">Iron 2%</text>
        <text y="117">Thiamine 3%</text>
        <text y="151">Directions for use:</text>
      </g>
    </svg>
    <figcaption>2008 Paper 2, Question 6. Recreated as an SVG from the supplied carton illustration.</figcaption>
  </figure>;
}
