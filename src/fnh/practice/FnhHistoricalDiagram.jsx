import React from "react";

/** Reconstructed from the user's 2008 Paper 02, page 5.
 * Diagram represents Ria's Super Flour Mix carton and its front/side labels.
 * Keep the original missing-quantity and missing-directions clues intact.
 */
export default function FnhHistoricalDiagram({type}){
  if(type==="kitchen-tools-2010")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 760 470" width="100%" role="img" aria-label="Four food preparation utensils, numbered 1 kitchen knife, 2 blender, 3 muffin tray and 4 pastry brush">
      <title>2010 Paper 2, Question 5: Four kitchen tools</title>
      <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Kitchen knife, with tapered blade and riveted handle. */}
        <path d="M61 147 C99 117 161 120 236 125 L237 162 C155 162 99 163 61 147 Z"/>
        <path d="M235 125 L364 125 Q386 145 364 163 L235 163 Z"/>
        <path d="M243 131 L350 131 Q365 144 350 157 L243 157 Z"/>
        {[268,302,333].map(x=><circle key={x} cx={x} cy="144" r="4" fill="currentColor"/>)}
        {/* Blender jar, lid, base and buttons. */}
        <path d="M515 44 L591 44 L584 148 L529 148 Z"/>
        <ellipse cx="553" cy="43" rx="38" ry="6"/>
        <path d="M585 74 C618 71 614 125 584 129 M582 83 C600 87 600 112 583 118"/>
        <path d="M531 151 L583 151 L598 205 Q600 218 556 220 Q512 222 511 207 L531 151 Z"/>
        <path d="M537 155 Q553 178 578 155 M523 199 Q553 208 587 197"/>
        {[543,557,572].map(x=><circle key={x} cx={x} cy="200" r="4" />)}
        {/* Muffin tin, two-dimensional perspective and 3 x 4 cavities. */}
        <path d="M88 306 L263 284 L321 330 L139 375 Z"/>
        {Array.from({length:12},(_,i)=>{
          const row=Math.floor(i/4),col=i%4;
          const x=132+col*39+row*12,y=308+row*18+col*1;
          return <ellipse key={i} cx={x} cy={y} rx="16" ry="8"/>;
        })}
        {/* Pastry brush, neck and bristles. */}
        <path d="M491 342 L536 337 L539 369 L494 377 Z"/>
        <path d="M539 344 L666 320 Q691 314 695 322 Q700 329 671 334 L539 357"/>
        <path d="M539 357 L670 335 M510 346 L514 374 M523 342 L527 371"/>
        <circle cx="677" cy="323" r="3"/>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" fontWeight="bold" fontSize="23">
        <text x="24" y="159">1.</text><text x="475" y="165">2.</text>
        <text x="46" y="364">3.</text><text x="455" y="379">4.</text>
      </g>
    </svg>
    <figcaption>2010 Paper 2, Question 5. Four original source items recreated as SVG: knife, blender, muffin tray and pastry brush.</figcaption>
  </figure>;
  if(type==="first-aid-kit-2014")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 720 480" width="100%" role="img" aria-label="Four first aid kit items: instant cold compress packet, liquid antiseptic bottle, tweezers and latex disposable gloves box">
      <title>2014 Paper 2 Question 5: items from a first aid kit</title>
      <g stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinejoin="round">
        <rect x="108" y="22" width="505" height="423"/>
        <path d="M159 128 L256 123 L261 247 L164 255 Z"/>
        <path d="M166 138 L245 135 L250 245 L170 248 Z"/>
        <rect x="181" y="151" width="64" height="82" rx="3"/>
        <rect x="414" y="55" width="45" height="34" rx="12"/>
        <path d="M419 91 L454 91 L463 109 Q482 114 482 143 L482 263 Q482 286 458 286 L408 286 Q387 286 387 262 L387 143 Q387 113 410 107 Z"/>
        <rect x="402" y="159" width="65" height="102" rx="17"/>
        <ellipse cx="434" cy="139" rx="33" ry="20"/>
        <path d="M145 420 L295 315 Q308 300 315 312 Q320 321 304 336 L151 424 Z"/>
        <path d="M154 410 L298 318 M177 399 L298 320"/>
        <path d="M302 334 L348 320 L577 320 L577 396 L526 428 L304 427 Z"/>
        <path d="M303 334 L523 334 L577 320 M523 334 L523 427 M304 374 L523 374"/>
        <path d="M404 377 C413 358 419 356 424 365 L436 349 Q445 340 453 351 Q464 345 471 356 L485 372 Q485 390 472 395 L454 405 L435 392 Z"/>
        <path d="M440 355 L440 375 M455 354 L457 371 M468 360 L470 376"/>
      </g>
      <g fill="currentColor" fontFamily="Georgia,serif" textAnchor="middle">
        <text x="214" y="168" fontSize="13" fontWeight="bold">INSTANT</text>
        <text x="214" y="185" fontSize="13" fontWeight="bold">COLD</text>
        <text x="214" y="202" fontSize="13" fontWeight="bold">COMPRESS</text>
        <text x="433" y="145" fontSize="18" fontWeight="bold">ABC</text>
        <text x="433" y="204" fontSize="15">LIQUID</text>
        <text x="433" y="222" fontSize="15">ANTISEPTIC</text>
        <text x="341" y="365" fontSize="18" fontWeight="bold">Latex</text>
        <text x="412" y="413" fontSize="12">Disposable gloves</text>
      </g>
    </svg>
    <figcaption>2014 Paper 2, Figure 1. First-aid kit items recreated as SVG.</figcaption>
  </figure>;
  if(type==="place-setting-2014")return <figure className="fnh-historical-figure">
    <svg viewBox="0 0 770 390" width="100%" role="img" aria-label="Lunch place setting. Dessert fork A and dessert spoon B horizontally above the dinner plate. Dinner fork D to left. Soup spoon C to right. Two knives beside plate, side plate and drinking glass.">
      <title>2014 Paper 2 Question 7: basic lunch place setting</title>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
        <rect x="32" y="20" width="695" height="339"/>
        <circle cx="394" cy="216" r="96"/><circle cx="394" cy="216" r="85"/><circle cx="394" cy="216" r="67"/>
        {Array.from({length:36},(_,i)=>{const angle=(i/36)*Math.PI*2;return <circle key={i} cx={394+90*Math.cos(angle)} cy={216+90*Math.sin(angle)} r="3.1"/>;})}
        <circle cx="150" cy="234" r="74"/><circle cx="150" cy="234" r="55"/><path d="M144 168 L217 320 L98 235 Z"/>
        <circle cx="629" cy="88" r="40"/><circle cx="629" cy="88" r="33"/>
        <ellipse cx="544" cy="100" rx="25" ry="26"/>
        {/* Dessert spoon B. */}
        <ellipse cx="326" cy="73" rx="29" ry="15"/><path d="M355 68 Q410 61 441 69 Q454 76 441 81 L355 78 Z"/>
        {/* Dessert fork A. */}
        <path d="M294 105 Q309 94 329 103 L371 103 L371 111 L330 111 Q306 122 294 113 Z"/>
        {[0,1,2,3].map(i=><path key={i} d={`M${370+i*6} 102 L${439} ${102+i*5}`}/>)}
        {/* Dinner fork D. */}
        <path d="M280 214 L284 310 Q289 340 274 338 Q260 337 265 312 L265 214"/>
        {[0,1,2,3].map(i=><path key={i} d={`M${265+i*6} 214 L${265+i*6} 172`}/>)}
        {/* Two knives on right. */}
        <path d="M541 150 Q553 134 558 137 L559 238 L565 315 Q571 339 557 340 Q547 342 546 321 L546 241 Z"/>
        <path d="M593 167 Q606 145 612 150 L612 241 L619 314 Q623 337 611 340 Q596 340 599 318 L599 242 Z"/>
        {/* Soup spoon C. */}
        <ellipse cx="658" cy="187" rx="17" ry="33"/><path d="M650 219 L650 319 Q650 343 659 343 Q670 342 668 320 L668 219"/>
      </g>
      <g fill="currentColor" fontSize="21" fontWeight="bold" fontFamily="Georgia,serif">
        <text x="458" y="78">B</text><text x="453" y="113">A</text>
        <text x="289" y="341">D</text><text x="676" y="347">C</text>
      </g>
    </svg>
    <figcaption>2014 Paper 2, Figure 2. Basic lunch place setting, including labels A, B, C and D.</figcaption>
  </figure>;
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
