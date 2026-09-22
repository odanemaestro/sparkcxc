import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  correctDiagramPlacements,
  nextDiagramHintTarget,
  normalizeInteractiveLabelActivity,
  scoreDiagramPlacements,
} from "./interactiveLabelDiagramModel";
import "./interactiveLabelDiagram.css";

function PlantCellTemplate() {
  return (
    <g className="spark-diagram-cell spark-diagram-plant-cell spark-reference-refined" aria-hidden="true">
      <path className="cell-wall" d="M264 82Q245 82 245 105V495Q245 520 270 520H729Q755 520 755 494V108Q755 82 728 82Z" />
      <path className="cell-membrane" d="M282 108Q268 108 268 126V475Q268 496 290 496H708Q731 496 731 473V131Q731 108 708 108Z" />
      <path className="cytoplasm plant-cytoplasm" d="M289 126H710V477H289Z" />

      <path className="vacuole plant-central-vacuole" d="M454 214Q540 178 623 218Q680 254 674 336Q667 421 588 455Q507 487 430 443Q377 412 375 343Q373 276 413 238Q431 221 454 214Z" />
      <path className="vacuole-highlight" d="M444 236Q508 205 571 219" />

      <circle className="nucleus nuclear-envelope" cx="405" cy="250" r="57" />
      <circle className="nucleolus" cx="388" cy="234" r="17" />
      <path className="nuclear-chromatin" d="M371 266Q405 243 437 267M378 222Q405 207 431 222" />

      <g className="rough-er plant-er">
        <path d="M348 203Q315 197 305 216Q298 232 322 239Q343 245 319 260Q301 272 321 287Q338 299 318 312" />
        <path d="M357 312Q324 322 329 341Q333 359 358 361" />
        <path d="M456 210Q486 196 510 208Q531 218 512 234Q497 247 522 255" />
      </g>

      <g className="golgi plant-golgi">
        <path d="M330 395Q369 373 410 387" />
        <path d="M323 411Q370 388 418 405" />
        <path d="M329 428Q372 408 413 422" />
        <circle className="golgi-vesicle" cx="421" cy="390" r="6" />
        <circle className="golgi-vesicle" cx="431" cy="414" r="5" />
      </g>

      <g className="smooth-er plant-smooth-er">
        <path d="M452 176Q486 164 510 178Q531 191 514 205Q498 217 523 226" />
        <path d="M326 330Q304 347 320 362Q338 379 360 364" />
      </g>

      <g className="plant-peroxisomes">
        <circle cx="590" cy="395" r="11" />
        <circle cx="314" cy="370" r="9" />
      </g>

      <g className="plasmodesmata">
        {[188,262,338,414].map(y=>(
          <g key={y}>
            <line x1="247" y1={y} x2="269" y2={y} />
            <circle cx="258" cy={y} r="3.5" />
          </g>
        ))}
      </g>

      <g className="chloroplasts">
        {[
          [338,170,-18],[650,188,16],[350,455,12],[660,408,-14],[612,148,-8],
        ].map(([x,y,angle],index) => (
          <g key={index} transform={`translate(${x} ${y}) rotate(${angle})`}>
            <ellipse cx="0" cy="0" rx="34" ry="18" />
            <path className="chloroplast-grana" d="M-18-7h12m-12 7h12m-12 7h12M5-7h13M5 0h13M5 7h13" />
          </g>
        ))}
      </g>

      <g className="mitochondria">
        <g transform="translate(655 335) rotate(-24)">
          <ellipse cx="0" cy="0" rx="36" ry="20" />
          <path className="cristae" d="M-23 0q8-12 16 0t16 0t16 0" />
        </g>
        <g transform="translate(360 350) rotate(25)">
          <ellipse cx="0" cy="0" rx="33" ry="18" />
          <path className="cristae" d="M-21 0q7-10 14 0t14 0t14 0" />
        </g>
      </g>

      <g className="ribosomes">
        {[
          [348,190],[365,202],[456,158],[486,171],[520,150],[551,168],
          [452,464],[488,451],[533,462],[568,445],[605,450],
        ].map(([x,y],index) => <circle key={index} cx={x} cy={y} r="4.5" />)}
      </g>
    </g>
  );
}

function AnimalCellTemplate() {
  return (
    <g className="spark-diagram-cell spark-diagram-animal-cell spark-reference-refined" aria-hidden="true">
      <path className="cell-membrane animal-outline" d="M285 305C280 205 340 118 434 91C537 60 652 101 704 192C760 291 723 410 628 474C539 535 402 521 330 437C293 394 281 349 285 305Z" />
      <path className="cytoplasm animal-cytoplasm" d="M307 305C303 218 354 143 440 118C528 92 625 127 673 205C722 285 690 383 608 439C530 492 417 480 354 410C320 372 304 339 307 305Z" />

      <circle className="nucleus nuclear-envelope" cx="460" cy="300" r="72" />
      <circle className="nucleolus" cx="441" cy="281" r="19" />
      <path className="nuclear-chromatin" d="M425 325Q460 292 495 322M427 267Q462 244 492 269" />

      <g className="rough-er">
        <path d="M495 228Q545 204 578 229Q596 244 576 263Q555 281 588 292" />
        <path d="M498 348Q548 371 583 351Q601 337 583 319" />
      </g>

      <g className="golgi">
        <path d="M525 405Q565 384 607 397" />
        <path d="M518 421Q565 398 613 414" />
        <path d="M523 437Q568 417 607 432" />
        <circle className="golgi-vesicle" cx="618" cy="403" r="7" />
        <circle className="golgi-vesicle" cx="626" cy="425" r="5.5" />
      </g>

      <g className="smooth-er">
        <path d="M382 218Q349 205 334 226Q322 246 345 258Q368 269 348 286Q332 301 350 319" />
        <path d="M376 332Q342 347 357 365Q374 384 398 368" />
      </g>

      <g className="centrosome" transform="translate(385 318)">
        <rect x="-10" y="-32" width="18" height="64" rx="8" transform="rotate(16)" />
        <rect x="-10" y="-32" width="18" height="64" rx="8" transform="rotate(96)" />
        <g className="centrosome-rays">
          <path d="M0-44V-72M0 44V72M-44 0H-72M44 0H72M-31-31L-51-51M31 31L51 51M31-31L51-51M-31 31L-51 51" />
        </g>
      </g>

      <g className="lysosomes">
        <circle cx="648" cy="276" r="13" />
        <circle cx="565" cy="180" r="11" />
        <circle cx="338" cy="330" r="10" />
      </g>

      <g className="cytoskeleton">
        <path d="M326 214Q392 151 470 164Q557 176 643 246" />
        <path d="M330 390Q410 453 510 458Q594 461 662 393" />
        <path d="M350 175Q412 240 422 377" />
      </g>

      <ellipse className="vacuole small-vacuole" cx="592" cy="246" rx="45" ry="28" />
      <ellipse className="vacuole small-vacuole secondary" cx="355" cy="258" rx="31" ry="20" />

      <g className="mitochondria">
        {[
          [612,351,-22,38,20],[375,412,26,34,18],[625,205,18,31,17],
        ].map(([x,y,angle,rx,ry],index) => (
          <g key={index} transform={`translate(${x} ${y}) rotate(${angle})`}>
            <ellipse cx="0" cy="0" rx={rx} ry={ry} />
            <path className="cristae" d="M-22 0q8-11 15 0t15 0t15 0" />
          </g>
        ))}
      </g>

      <g className="ribosomes">
        {[
          [345,190],[405,175],[530,185],[585,195],[350,345],
          [405,390],[525,400],[575,315],[655,300],[525,245],
        ].map(([x,y],index) => <circle key={index} cx={x} cy={y} r="4.5" />)}
      </g>
    </g>
  );
}

function LightMicroscopeTemplate() {
  return (
    <g className="spark-diagram-microscope" aria-hidden="true">
      <path className="microscope-base" d="M315 487Q500 452 690 487L715 515Q520 548 300 520Z" />
      <path className="microscope-arm" d="M570 150Q660 215 635 335Q620 415 570 472H495Q555 395 556 326Q558 235 490 195Z" />

      <g transform="rotate(-18 455 170)">
        <rect className="microscope-body" x="407" y="112" width="96" height="118" rx="18" />
        <rect className="microscope-eyepiece" x="395" y="62" width="92" height="50" rx="10" />
        <rect className="microscope-eyepiece-rim" x="405" y="50" width="75" height="22" rx="8" />
      </g>

      <circle className="microscope-nosepiece" cx="490" cy="238" r="34" />
      <path className="microscope-nosepiece-ring" d="M458 240Q490 215 522 240" />

      <g className="microscope-objectives">
        <rect className="microscope-objective" x="452" y="250" width="24" height="92" rx="8" transform="rotate(-9 464 296)" />
        <rect className="microscope-objective" x="489" y="250" width="24" height="82" rx="8" transform="rotate(5 501 291)" />
        <rect className="microscope-objective short" x="523" y="249" width="22" height="66" rx="8" transform="rotate(14 534 282)" />
      </g>

      <rect className="microscope-stage" x="315" y="344" width="310" height="34" rx="7" />
      <circle className="microscope-stage-aperture" cx="470" cy="361" r="19" />
      <line className="microscope-stage-clip" x1="350" y1="334" x2="435" y2="334" />
      <line className="microscope-stage-clip" x1="505" y1="334" x2="590" y2="334" />

      <path className="microscope-condenser" d="M430 392Q470 370 510 392L498 420H442Z" />
      <circle className="microscope-light" cx="470" cy="440" r="38" />
      <path className="microscope-light-beam" d="M450 417L462 382M470 414V382M490 417L478 382" />

      <circle className="microscope-focus" cx="592" cy="266" r="31" />
      <circle className="microscope-focus fine" cx="632" cy="294" r="19" />
      <circle className="microscope-focus-centre" cx="592" cy="266" r="10" />
    </g>
  );
}

function FlowerLongitudinalTemplate() {
  return (
    <g className="spark-diagram-flower spark-csec-reference" aria-hidden="true">
      <g transform="translate(130 5) scale(1.85 1.6)">
        <path className="flower-stalk" d="M192 300V265M208 300V265" />
        <path className="flower-receptacle" d="M192 265Q160 255 155 215H245Q240 255 208 265Z" />

        <path className="flower-ovary" d="M172 215Q166 175 192 160H208Q234 175 228 215Z" />
        <g className="flower-ovules">
          <ellipse className="flower-ovule" cx="190" cy="178" rx="5" ry="4" />
          <ellipse className="flower-ovule" cx="210" cy="178" rx="5" ry="4" />
          <ellipse className="flower-ovule" cx="190" cy="195" rx="5" ry="4" />
          <ellipse className="flower-ovule" cx="210" cy="195" rx="5" ry="4" />
        </g>

        <path className="flower-style" d="M196 160V85H204V160Z" />
        <path className="flower-stigma" d="M196 85Q186 77 188 69Q194 73 200 73Q206 73 212 69Q214 77 204 85Z" />

        <path className="flower-sepal left" d="M155 215Q115 190 100 220Q130 220 160 225Z" />
        <path className="flower-sepal right" d="M245 215Q285 215 300 245Q270 235 240 225Z" />

        <path className="flower-petal left" d="M158 212Q80 180 65 90Q120 120 164 205Z" />
        <path className="flower-petal right" d="M242 212Q320 180 335 90Q280 120 236 205Z" />

        <g className="flower-stamens">
          <path d="M166 212Q145 160 138 110" />
          <ellipse cx="136" cy="100" rx="7" ry="13" transform="rotate(-15 136 100)" />
          <path d="M234 212Q255 160 262 110" />
          <ellipse cx="264" cy="100" rx="7" ry="13" transform="rotate(15 264 100)" />
        </g>
      </g>
    </g>
  );
}

function BeanSeedTemplate() {
  return (
    <g className="spark-diagram-seed spark-csec-reference" aria-hidden="true">
      <g transform="translate(150 20) scale(1.8 2)">
        <path className="seed-testa" d="M60 120Q60 40 170 40Q280 40 290 110Q295 190 180 200Q70 205 60 120Z" />
        <path className="seed-cotyledon" d="M72 120Q72 54 170 54Q268 54 276 112Q280 182 180 188Q84 192 72 120Z" />

        <path className="seed-plumule" d="M164 118Q168 96 178 92Q184 98 180 106Q192 101 202 110Q187 114 176 122Z" />
        <path className="seed-embryo-axis" d="M176 118Q182 140 184 165Q186 185 189 196" />
        <path className="seed-radicle" d="M184 186Q180 198 189 205Q198 198 194 187Z" />
      </g>
    </g>
  );
}

function FemaleReproductiveTemplate() {
  return (
    <g className="spark-diagram-reproductive spark-diagram-female-reproductive spark-reference-refined" aria-hidden="true">
      <path className="female-uterus" d="M420 220Q500 170 580 220Q598 278 576 350Q557 404 526 425Q500 442 474 425Q443 404 424 350Q402 278 420 220Z" />
      <path className="female-myometrium" d="M438 232Q500 197 562 232Q575 285 557 341Q542 382 520 399Q500 413 480 399Q458 382 443 341Q425 285 438 232Z" />
      <path className="female-endometrium" d="M462 244Q500 223 538 244Q545 292 532 332Q520 364 500 378Q480 364 468 332Q455 292 462 244Z" />

      <path className="female-oviduct" d="M438 240Q390 182 330 178Q285 175 255 205" />
      <path className="female-oviduct" d="M562 240Q610 182 670 178Q715 175 745 205" />

      <g className="female-fimbriae">
        <path d="M258 205l-26-18m26 18l-31 2m31-2l-22 23m22-23l-8 30" />
        <path d="M742 205l26-18m-26 18l31 2m-31-2l22 23m-22-23l8 30" />
      </g>

      <g className="female-ovaries">
        <ellipse className="female-ovary" cx="235" cy="225" rx="42" ry="30" transform="rotate(-15 235 225)" />
        <ellipse className="female-ovary" cx="765" cy="225" rx="42" ry="30" transform="rotate(15 765 225)" />
        {[[-12,-5,7],[7,-10,6],[14,7,5]].map(([dx,dy,r],i)=><circle key={"l"+i} className="female-follicle" cx={235+dx} cy={225+dy} r={r} />)}
        {[[-12,-5,7],[7,-10,6],[14,7,5]].map(([dx,dy,r],i)=><circle key={"r"+i} className="female-follicle" cx={765+dx} cy={225+dy} r={r} />)}
      </g>

      <path className="female-cervix" d="M474 404Q500 420 526 404L524 463Q500 480 476 463Z" />
      <path className="female-cervical-canal" d="M500 420V466" />
      <path className="female-vagina" d="M477 463L456 555Q500 579 544 555L523 463Z" />
      <g className="female-vaginal-rugae">
        <path d="M475 490Q500 505 525 490M470 515Q500 531 530 515M466 540Q500 555 534 540" />
      </g>
      <text className="repro-orientation" x="500" y="610" textAnchor="middle">front view</text>
    </g>
  );
}

function MaleReproductiveTemplate() {
  return (
    <g className="spark-diagram-reproductive spark-diagram-male-reproductive spark-reference-refined" aria-hidden="true">
      <ellipse className="male-bladder" cx="495" cy="155" rx="78" ry="66" />
      <path className="male-bladder-neck" d="M480 208Q495 223 510 208" />

      <path className="male-sperm-duct" d="M405 425Q352 352 360 275Q365 215 401 179Q430 151 463 164" />
      <path className="male-sperm-duct secondary" d="M600 425Q650 350 640 275Q634 220 603 183Q575 151 538 164" />

      <path className="male-seminal-vesicle" d="M560 170Q596 145 628 163Q646 181 630 207Q612 229 579 220Q555 209 560 170Z" />
      <path className="male-seminal-vesicle secondary" d="M430 170Q394 145 362 163Q344 181 360 207Q378 229 411 220Q435 209 430 170Z" />

      <path className="male-prostate" d="M454 234Q500 214 546 234Q560 265 538 286Q500 302 462 286Q440 265 454 234Z" />
      <circle className="male-cowper" cx="530" cy="302" r="14" />
      <circle className="male-cowper secondary" cx="475" cy="302" r="14" />

      <path className="male-urethra" d="M500 205Q500 250 505 292Q515 335 610 345Q700 350 790 370" />
      <path className="male-penis" d="M565 322Q655 305 790 333Q835 343 842 375Q830 410 775 405Q670 395 585 370Q552 355 565 322Z" />
      <path className="male-erectile-tissue" d="M590 338Q680 329 790 350Q805 355 812 370Q800 386 777 383Q682 372 595 356Z" />

      <ellipse className="male-scrotum" cx="405" cy="462" rx="80" ry="72" />
      <ellipse className="male-testis" cx="405" cy="458" rx="46" ry="57" />
      <ellipse className="male-testis secondary" cx="605" cy="458" rx="46" ry="57" />
      <path className="male-epididymis" d="M365 415Q335 460 365 505" />
      <path className="male-epididymis secondary" d="M645 415Q675 460 645 505" />
      <path className="male-cowper-duct" d="M540 312Q565 330 585 340" />

      <text className="repro-orientation" x="500" y="590" textAnchor="middle">simplified anterior-oblique view</text>
    </g>
  );
}

function PregnancyUterusTemplate() {
  return (
    <g className="spark-diagram-pregnancy spark-reference-refined" aria-hidden="true">
      <path className="pregnancy-uterus-wall" d="M326 102Q499 55 674 103Q738 176 742 280Q746 392 681 479Q626 548 515 560Q401 555 330 487Q265 423 264 317Q263 194 326 102Z" />
      <path className="pregnancy-myometrium" d="M348 126Q500 87 650 128Q705 194 706 285Q706 376 653 451Q607 510 516 523Q424 519 363 459Q307 403 305 316Q303 213 348 126Z" />
      <path className="pregnancy-amnion" d="M373 150Q500 118 621 157Q676 220 671 304Q665 390 615 447Q568 494 486 491Q402 488 351 430Q314 384 316 308Q317 219 373 150Z" />

      <path className="pregnancy-placenta" d="M329 171Q294 237 312 317Q327 378 374 420Q408 391 421 339Q435 283 417 221Q399 177 329 171Z" />
      <g className="pregnancy-placental-villi">
        <path d="M343 197Q373 214 385 246M334 238Q369 251 388 284M337 282Q372 296 390 331M350 329Q375 344 388 375" />
      </g>

      <path className="pregnancy-umbilical" d="M392 312Q431 273 472 292Q503 306 499 337Q495 365 529 372Q563 379 587 349" />
      <path className="pregnancy-umbilical-inner" d="M398 314Q435 284 469 300Q491 310 488 334Q486 354 513 361Q543 368 579 345" />

      <g className="pregnancy-foetus">
        <ellipse className="foetus-head" cx="574" cy="280" rx="48" ry="57" transform="rotate(18 574 280)" />
        <path className="foetus-face" d="M602 269Q613 277 604 284Q595 290 607 296" />
        <path className="foetus-torso" d="M539 325Q500 347 501 390Q506 438 551 452Q602 466 625 425Q641 393 620 356Q597 325 570 322Z" />
        <path className="foetus-back" d="M550 326Q585 338 606 371Q621 397 610 423" />
        <path className="foetus-arm" d="M542 348Q514 342 492 322M525 357Q508 376 490 385" />
        <path className="foetus-leg" d="M572 438Q548 463 521 468M600 430Q617 454 638 461" />
        <path className="foetus-hand" d="M492 322l-11-8m12 9l-14 2" />
        <path className="foetus-foot" d="M638 461l13 2m-13-2l10 8" />
      </g>

      <g className="pregnancy-fluid">
        <circle className="pregnancy-fluid-marker" cx="476" cy="207" r="8" />
        <circle className="pregnancy-fluid-marker" cx="625" cy="215" r="8" />
        <circle className="pregnancy-fluid-marker" cx="618" cy="414" r="8" />
        <circle className="pregnancy-fluid-marker" cx="445" cy="430" r="8" />
      </g>

      <path className="pregnancy-cervix" d="M455 518Q500 542 545 518L541 575Q500 596 459 575Z" />
      <path className="pregnancy-cervical-canal" d="M500 535V578" />
      <path className="pregnancy-vagina" d="M464 573L448 626H552L536 573Z" />

      <text className="repro-orientation" x="500" y="78" textAnchor="middle">foetus in uterus</text>
    </g>
  );
}

function HumanHeartTemplate() {
  return (
    <g className="spark-diagram-heart spark-reference-refined" aria-hidden="true">
      <path className="heart-outline" d="M329 150Q370 112 430 130Q475 143 501 178Q525 136 584 127Q648 118 691 165Q731 210 713 300Q694 399 628 473Q574 532 500 566Q423 530 365 474Q297 408 282 316Q264 218 329 150Z" />

      <path className="heart-right-atrium" d="M330 175Q385 142 451 185L452 287Q401 319 345 291Q315 250 330 175Z" />
      <path className="heart-right-ventricle" d="M342 315Q399 284 458 313Q472 363 476 448Q435 445 387 409Q350 381 342 315Z" />

      <path className="heart-left-atrium" d="M544 184Q598 147 657 177Q684 214 664 278Q611 307 548 286Z" />
      <path className="heart-left-ventricle" d="M535 314Q595 281 653 316Q668 367 638 425Q600 493 515 532L503 487Q538 445 551 387Q560 345 535 314Z" />
      <path className="heart-left-wall-inner" d="M618 333Q627 385 600 429Q572 474 525 498" />

      <path className="heart-septum" d="M500 203Q489 303 503 492" />

      <path className="heart-vena-cava" d="M365 188V62M364 286Q315 352 318 515" />
      <path className="heart-aorta" d="M596 183V105Q596 54 646 43Q702 31 733 75Q749 98 741 149" />
      <path className="heart-aortic-branch" d="M626 73V31M674 57L688 20M713 72L741 37" />

      <path className="heart-pulmonary-artery" d="M431 315Q445 238 482 206Q508 184 536 159Q567 129 605 128" />
      <path className="heart-pulmonary-artery branch" d="M532 160Q495 138 454 133M544 155Q582 135 631 145" />
      <path className="heart-pulmonary-vein" d="M657 222H790M548 235H233" />

      <path className="heart-tricuspid" d="M385 304Q406 317 420 338Q433 317 451 304" />
      <path className="heart-bicuspid" d="M548 303Q570 318 589 337Q608 318 635 303" />
      <path className="heart-semilunar pulmonary" d="M476 214Q490 198 503 214Q516 198 529 214" />
      <path className="heart-semilunar aortic" d="M583 191Q596 174 609 191Q622 174 636 191" />

      <g className="heart-chordae">
        <path d="M399 327L407 374M438 327L448 376M565 327L573 382M615 327L604 389" />
      </g>

      <path className="heart-flow deoxygenated" d="M365 84V181M389 220V282M408 356Q448 285 487 226" />
      <path className="heart-flow oxygenated" d="M761 222H668M607 233V287M601 360Q608 193 620 111" />

      <text className="heart-side-label deoxygenated" x="365" y="595" textAnchor="middle">right side, deoxygenated blood</text>
      <text className="heart-side-label oxygenated" x="635" y="595" textAnchor="middle">left side, oxygenated blood</text>
    </g>
  );
}

function KidneyLongitudinalTemplate() {
  return (
    <g className="spark-diagram-kidney spark-reference-refined" aria-hidden="true">
      <path className="kidney-outline" d="M505 70Q352 42 276 175Q210 288 250 415Q286 532 403 568Q512 603 590 532Q640 487 614 425Q587 368 608 313Q629 260 680 213Q671 108 505 70Z" />
      <path className="kidney-capsule" d="M505 88Q370 65 304 186Q247 294 283 400Q317 500 414 531Q505 558 565 500Q602 463 582 416Q557 357 578 307Q597 260 642 212Q630 128 505 88Z" />
      <path className="kidney-cortex" d="M490 116Q391 101 340 207Q295 301 326 389Q355 470 431 494Q501 514 541 471Q565 443 549 402Q525 350 544 302Q561 261 599 216Q582 152 490 116Z" />

      <g className="kidney-medulla">
        <path d="M367 171Q411 182 456 219L376 259Q353 218 367 171Z" />
        <path d="M335 257Q392 268 470 307L354 344Q331 305 335 257Z" />
        <path d="M352 359Q405 363 480 357L406 447Q368 414 352 359Z" />
        <path d="M414 131Q458 157 507 225L407 236Q397 178 414 131Z" />
        <path d="M470 115Q519 144 548 210L493 232Q478 169 470 115Z" />
      </g>

      <g className="kidney-columns">
        <path d="M390 158Q381 224 395 273M418 245Q403 311 420 369M457 233Q447 302 455 366" />
      </g>

      <g className="kidney-calyces">
        <path d="M456 219Q503 238 527 264M470 307Q514 306 542 328M480 357Q519 355 548 349M507 225Q531 238 544 259" />
      </g>

      <path className="kidney-pelvis" d="M503 230Q570 250 584 300Q594 344 523 405Q546 345 503 230Z" />
      <path className="kidney-ureter" d="M557 366Q623 410 654 555" />

      <path className="kidney-artery" d="M612 245H756" />
      <path className="kidney-vein" d="M610 282H756" />
      <path className="kidney-vessel branch artery" d="M610 246Q555 250 528 282M606 247Q558 220 525 190M608 248Q560 300 530 347" />
      <path className="kidney-vessel branch vein" d="M610 282Q560 278 535 302M608 282Q563 332 530 365" />
      <circle className="kidney-hilum" cx="602" cy="264" r="8" />

      <text className="kidney-orientation" x="500" y="615" textAnchor="middle">longitudinal section through a kidney</text>
    </g>
  );
}

function NephronTemplate() {
  return (
    <g className="spark-diagram-nephron" aria-hidden="true">
      <g transform="translate(265 165)">
        <circle className="nephron-bowman" cx="0" cy="0" r="78" />
        <path className="nephron-glomerulus" d="M-45-5q20-45 45-5q24-42 48 3q-20 45-45 10q-28 40-48-8Z" />
        <path className="nephron-afferent" d="M-135-45H-65" />
        <path className="nephron-efferent" d="M55-45H125" />
      </g>
      <path className="nephron-tubule" d="M342 170Q405 120 440 175Q470 225 420 260Q375 290 430 320Q485 350 450 395" />
      <path className="nephron-loop" d="M450 395V515Q450 555 485 555Q520 555 520 515V345" />
      <path className="nephron-distal" d="M520 345Q555 295 600 325Q640 355 610 395Q585 425 635 445" />
      <path className="nephron-collecting" d="M665 150V560" />
      <path className="nephron-join" d="M635 445Q650 450 665 440" />
      <path className="nephron-urine-arrow" d="M665 530V590" />
      <text className="nephron-urine-label" x="665" y="612" textAnchor="middle">urine</text>
    </g>
  );
}

function SkinSectionTemplate() {
  return (
    <g className="spark-diagram-skin" aria-hidden="true">
      <path className="skin-surface" d="M180 105Q260 85 340 105Q420 125 500 105Q580 85 660 105Q740 125 820 105" />
      <rect className="skin-epidermis" x="180" y="105" width="640" height="75" />
      <rect className="skin-dermis" x="180" y="180" width="640" height="250" />
      <rect className="skin-fat-layer" x="180" y="430" width="640" height="120" />
      {[215,270,325,380,435,490,545,600,655,710,765].map((x,index)=><circle key={x} className="skin-fat-cell" cx={x} cy={475+(index%2)*38} r="21" />)}
      <path className="skin-hair" d="M350 360L390 55" />
      <ellipse className="skin-hair-follicle" cx="350" cy="365" rx="38" ry="24" transform="rotate(-8 350 365)" />
      <path className="skin-sweat-gland" d="M620 375q-38-20 0-42q38-20 0-42q-38-20 0-42q38-20 0-42" />
      <path className="skin-sweat-duct" d="M620 205V105" />
      <circle className="skin-sweat-drop" cx="620" cy="72" r="14" />
      <path className="skin-blood-vessel red" d="M230 310Q400 265 560 310T770 300" />
      <path className="skin-blood-vessel blue" d="M230 345Q400 390 560 345T770 355" />
      <path className="skin-nerve" d="M510 415Q500 350 530 290Q555 250 550 205" />
      <text className="skin-orientation" x="500" y="605" textAnchor="middle">section through human skin</text>
    </g>
  );
}

function MammalianEyeTemplate() {
  return (
    <g className="spark-diagram-eye spark-reference-refined" aria-hidden="true">
      <path className="eye-sclera" d="M319 241Q378 127 507 112Q642 97 724 194Q779 258 762 348Q742 454 626 493Q493 537 373 459Q307 417 286 355Q266 296 319 241Z" />
      <path className="eye-vitreous" d="M391 186Q500 147 610 184Q686 210 714 280Q739 344 702 400Q657 464 561 472Q459 482 390 425Q348 391 342 332Q335 258 391 186Z" />

      <path className="eye-cornea" d="M321 239Q248 271 246 309Q245 349 322 383Q294 350 294 310Q294 271 321 239Z" />
      <path className="eye-aqueous" d="M319 247Q287 271 282 310Q287 350 319 375Q309 344 309 310Q309 277 319 247Z" />

      <path className="eye-choroid" d="M350 196Q485 121 627 171Q700 197 733 267Q749 302 741 345Q724 423 642 457" />
      <path className="eye-retina" d="M370 211Q492 145 619 187Q681 208 710 268Q723 298 718 334Q707 397 636 432" />

      <path className="eye-iris" d="M338 247Q365 272 366 309Q365 347 338 374" />
      <ellipse className="eye-pupil" cx="350" cy="310" rx="14" ry="27" />
      <path className="eye-lens" d="M381 310Q399 243 424 239Q452 244 472 310Q452 376 424 381Q399 377 381 310Z" />

      <path className="eye-ciliary" d="M346 211Q380 186 432 197M346 409Q380 434 432 423" />
      <path className="eye-suspensory" d="M367 222L397 258M383 210L407 255M367 398L397 362M383 410L407 365" />

      <path className="eye-optic-nerve" d="M680 306Q760 304 844 339L833 392Q756 354 677 348Z" />
      <path className="eye-optic-disc" d="M669 294Q686 304 689 323Q685 342 669 352" />
      <circle className="eye-fovea" cx="625" cy="310" r="10" />

      <g className="eye-retinal-vessels">
        <path d="M680 323Q644 289 607 271M680 323Q641 329 600 352M680 323Q653 363 624 389" />
      </g>

      <text className="repro-orientation" x="500" y="560" textAnchor="middle">horizontal section through the eye</text>
    </g>
  );
}

function MammalianEarTemplate() {
  return (
    <g className="spark-diagram-ear spark-reference-refined" aria-hidden="true">
      <path className="ear-bone" d="M210 118Q320 78 445 110Q555 136 624 210Q688 276 815 294L862 420Q748 460 640 430Q553 406 476 374Q382 337 270 349Q185 356 120 405L75 350Q128 305 184 292Q143 239 164 184Q180 143 210 118Z" />

      <path className="ear-pinna" d="M118 143Q62 143 50 237Q38 345 126 399Q204 421 226 347Q244 287 191 268Q148 254 136 297Q126 334 158 343Q189 349 195 303" />
      <path className="ear-canal" d="M191 294Q270 280 343 295" />
      <path className="ear-canal-lumen" d="M202 294Q272 289 340 297" />
      <ellipse className="ear-drum" cx="360" cy="295" rx="18" ry="72" transform="rotate(-8 360 295)" />

      <path className="ear-middle-cavity" d="M382 228Q468 208 548 249Q569 277 552 325Q514 361 449 354Q405 347 382 326Z" />

      <g className="ear-ossicles">
        <path className="malleus" d="M377 273Q395 248 418 246L429 271L412 296" />
        <path className="incus" d="M422 247Q451 237 463 258L452 282L476 296" />
        <path className="stapes" d="M474 296L494 273M476 303L498 324M494 273Q512 296 498 324" />
        <circle cx="418" cy="247" r="10" />
        <circle cx="458" cy="261" r="9" />
      </g>

      <g className="ear-semicircular">
        <path d="M553 194Q511 117 564 82Q623 43 662 103Q694 151 653 215" />
        <path d="M589 211Q574 121 651 104Q715 90 731 160Q746 225 679 254" />
        <path d="M550 238Q491 197 516 139Q541 82 604 108Q655 130 648 186" />
      </g>

      <ellipse className="ear-vestibule" cx="598" cy="286" rx="38" ry="48" />
      <ellipse className="ear-oval-window" cx="535" cy="297" rx="11" ry="20" transform="rotate(-8 535 297)" />

      <path className="ear-cochlea" d="M611 334Q658 270 722 295Q784 320 778 380Q772 433 718 448Q666 462 632 425Q607 397 620 364Q631 337 660 334Q691 330 705 352Q719 374 706 394Q694 411 675 407Q659 404 656 389" />
      <path className="ear-auditory-nerve" d="M712 356Q785 333 858 372M617 267Q711 244 812 297" />

      <path className="ear-eustachian" d="M505 326Q540 365 559 435Q575 490 627 523" />

      <text className="repro-orientation" x="500" y="580" textAnchor="middle">section through the mammalian ear</text>
    </g>
  );
}

function HumanBrainTemplate() {
  return (
    <g className="spark-diagram-brain spark-reference-refined" aria-hidden="true">
      <path className="brain-cerebrum" d="M285 137Q322 82 392 73Q454 48 522 68Q599 55 670 99Q741 143 757 221Q773 301 727 359Q688 406 622 414Q582 431 539 419Q490 449 426 433Q345 415 298 359Q257 309 259 239Q260 184 285 137Z" />

      <path className="brain-lobe frontal" d="M310 143Q357 94 426 91Q459 111 464 154Q450 207 391 227Q332 223 302 189Z" />
      <path className="brain-lobe parietal" d="M455 93Q530 68 596 91Q642 117 648 163Q622 213 556 225Q486 213 464 154Z" />
      <path className="brain-lobe temporal" d="M365 235Q430 210 493 230Q525 267 504 318Q463 355 398 341Q358 307 365 235Z" />
      <path className="brain-lobe occipital" d="M604 166Q680 166 724 217Q741 277 706 325Q667 355 620 326Q594 271 604 166Z" />

      <path className="brain-cerebrum-fold" d="M326 149Q371 119 415 146M430 105Q482 132 525 103M544 130Q602 104 645 143M312 218Q372 188 425 218M471 189Q532 227 599 195M327 292Q387 263 444 298M500 279Q565 309 628 272" />

      <path className="brain-corpus-callosum" d="M395 227Q475 177 554 220Q575 235 559 254Q500 222 427 255Q402 265 387 249Z" />
      <path className="brain-thalamus" d="M456 270Q493 246 532 269Q542 296 512 312Q477 316 456 290Z" />
      <path className="brain-hypothalamus" d="M466 316Q500 292 533 321Q522 348 496 359Q471 348 466 316Z" />
      <circle className="brain-pituitary" cx="500" cy="382" r="19" />
      <path className="brain-pituitary-stalk" d="M500 355V365" />

      <path className="brain-cerebellum" d="M566 347Q638 319 706 353Q744 386 726 431Q692 478 617 468Q566 457 549 416Q546 379 566 347Z" />
      <path className="brain-cerebellum-fold" d="M578 375Q629 350 682 373M568 402Q628 378 696 403M579 430Q633 409 683 430" />

      <path className="brain-pons" d="M513 351Q551 338 578 361Q585 386 564 402Q536 407 514 388Z" />
      <path className="brain-brainstem" d="M507 344Q546 340 576 370Q572 423 594 470L550 510Q508 470 492 406Z" />
      <path className="brain-medulla" d="M520 394Q553 390 570 416L581 470L550 500Q518 464 510 427Z" />
      <path className="brain-spinal-cord" d="M550 492Q570 527 568 610" />

      <text className="repro-orientation" x="500" y="635" textAnchor="middle">simplified sagittal view of the human brain</text>
    </g>
  );
}

function EndocrineSystemTemplate() {
  return (
    <g className="spark-diagram-endocrine spark-reference-refined" aria-hidden="true">
      <circle className="endo-head" cx="500" cy="100" r="62" />
      <path className="endo-body" d="M425 175Q500 145 575 175Q625 250 605 365Q590 455 555 560H445Q410 455 395 365Q375 250 425 175Z" />
      <path className="endo-arm" d="M420 220Q330 285 305 400M580 220Q670 285 695 400" />
      <path className="endo-leg" d="M460 555Q430 605 415 635M540 555Q570 605 585 635" />

      <circle className="endo-pituitary" cx="500" cy="112" r="12" />
      <path className="endo-thyroid" d="M468 188Q481 169 497 187L500 207L503 187Q519 169 532 188Q534 217 506 228Q500 230 494 228Q466 217 468 188Z" />
      <path className="endo-trachea" d="M500 160V244" />

      <path className="endo-kidney left" d="M430 330Q400 315 392 350Q390 395 425 405Q447 390 442 355Q440 340 430 330Z" />
      <path className="endo-kidney right" d="M570 330Q600 315 608 350Q610 395 575 405Q553 390 558 355Q560 340 570 330Z" />
      <path className="endo-adrenal left" d="M397 324Q417 293 440 319Q429 333 397 324Z" />
      <path className="endo-adrenal right" d="M560 319Q583 293 603 324Q571 333 560 319Z" />

      <path className="endo-pancreas" d="M425 425Q463 402 516 407Q552 410 580 428Q550 454 498 455Q449 455 425 425Z" />
      <path className="endo-pancreatic-duct" d="M447 431Q500 425 555 434" />

      <g className="endo-ovaries">
        <ellipse cx="455" cy="505" rx="18" ry="13" />
        <ellipse cx="545" cy="505" rx="18" ry="13" />
        <path d="M473 505Q500 485 527 505" />
      </g>

      <g className="endo-testes-inset" transform="translate(745 455)">
        <rect className="endo-inset-box" x="-55" y="-45" width="120" height="130" rx="16" />
        <ellipse cx="-10" cy="25" rx="20" ry="28" />
        <ellipse cx="25" cy="25" rx="20" ry="28" />
        <path className="endo-epididymis" d="M-31 7Q-42 25-31 45M46 7Q57 25 46 45" />
        <text className="endo-inset-label" x="5" y="70" textAnchor="middle">testes</text>
      </g>

      <text className="repro-orientation" x="500" y="660" textAnchor="middle">major endocrine glands</text>
    </g>
  );
}

function HumanDigestiveTemplate() {
  return (
    <g className="spark-diagram-digestive spark-reference-refined" aria-hidden="true">
      <circle className="digestive-head" cx="500" cy="78" r="48" />
      <path className="digestive-body" d="M420 135Q500 105 580 135Q630 220 610 350Q595 470 555 565H445Q405 470 390 350Q370 220 420 135Z" />

      <path className="digestive-mouth" d="M474 77Q500 91 526 77" />
      <path className="digestive-pharynx" d="M500 105Q495 130 500 150" />
      <path className="digestive-oesophagus" d="M500 122V250" />

      <path className="digestive-liver" d="M397 225Q447 184 520 206Q549 217 556 245Q530 280 477 292Q425 298 397 270Z" />
      <path className="digestive-gall" d="M458 273Q472 268 480 282Q478 307 459 316Q447 302 458 273Z" />

      <path className="digestive-stomach" d="M520 238Q561 229 580 262Q598 296 580 329Q562 359 526 354Q488 350 480 321Q472 290 493 265Q502 252 520 238Z" />
      <path className="digestive-duodenum" d="M548 348Q585 360 584 391Q582 420 548 427" />
      <path className="digestive-pancreas" d="M478 352Q527 331 582 348Q561 376 514 383Q490 380 478 352Z" />

      <path className="digestive-large" d="M420 365Q400 390 405 455Q410 520 455 535M580 365Q600 390 595 455Q590 520 545 535M420 365Q500 340 580 365M455 535Q500 555 545 535" />
      <path className="digestive-appendix" d="M416 455Q390 474 399 500" />

      <path className="digestive-small" d="M455 384Q500 354 545 382Q570 403 545 425Q521 443 548 462Q565 481 536 500Q504 520 470 500Q445 482 471 461Q495 443 466 426Q438 410 455 384Z" />
      <path className="digestive-small inner" d="M474 392Q507 377 529 393Q543 406 525 419Q505 432 529 447Q542 459 525 474Q503 492 482 476Q466 464 483 449Q499 435 480 423Q462 411 474 392Z" />

      <path className="digestive-rectum" d="M500 535V590" />
      <path className="digestive-anus" d="M486 590Q500 602 514 590" />

      <text className="repro-orientation" x="500" y="615" textAnchor="middle">human digestive system</text>
    </g>
  );
}

function HumanToothTemplate() {
  const outerToothPath="M390 115Q500 55 610 115Q650 175 625 245Q600 300 565 335L555 505Q550 560 505 575Q460 560 455 505L445 335Q400 300 375 245Q350 175 390 115Z";
  return (
    <g className="spark-diagram-tooth spark-reference-refined" aria-hidden="true">
      <defs>
        <clipPath id="tooth-template-crown-clip"><rect x="340" y="45" width="320" height="292"/></clipPath>
        <clipPath id="tooth-template-root-clip"><rect x="340" y="333" width="320" height="260"/></clipPath>
      </defs>

      <path className="tooth-jaw" d="M245 355Q375 320 445 350Q500 373 555 350Q625 320 755 355V520Q625 500 560 516Q500 535 440 516Q375 500 245 520Z" />
      <path className="tooth-gum" d="M250 315Q375 285 445 320Q500 350 555 320Q625 285 750 315V390Q625 365 555 385Q500 405 445 385Q375 365 250 390Z" />

      <path className="tooth-cementum" d={outerToothPath} clipPath="url(#tooth-template-root-clip)" />
      <path className="tooth-enamel" d={outerToothPath} clipPath="url(#tooth-template-crown-clip)" />
      <path className="tooth-dentine" d="M415 135Q500 92 585 135Q615 180 595 235Q575 275 535 310L528 495Q525 525 500 538Q475 525 472 495L465 310Q425 275 405 235Q385 180 415 135Z" />

      <path className="tooth-pulp" d="M465 165Q500 145 535 165Q555 205 530 250Q510 285 510 350V485Q500 505 490 485V350Q490 285 470 250Q445 205 465 165Z" />
      <path className="tooth-root-canal" d="M500 340V548" />
      <path className="tooth-root-vessels red" d="M500 470Q487 520 480 570" />
      <path className="tooth-root-vessels blue" d="M505 470Q520 520 528 570" />
      <path className="tooth-nerve" d="M497 470V570" />

      <path className="tooth-periodontal" d="M452 350Q432 421 444 510M548 350Q568 421 556 510" />
      <line className="tooth-neck-line" x1="355" y1="330" x2="645" y2="330" />

      <text className="tooth-region-label" x="500" y="80" textAnchor="middle">crown, enamel-covered</text>
      <text className="tooth-region-label" x="500" y="610" textAnchor="middle">root, cementum-covered, in jaw socket</text>
    </g>
  );
}

function HumanRespiratoryTemplate() {
  return (
    <g className="spark-diagram-respiratory spark-reference-refined" aria-hidden="true">
      <circle className="resp-head" cx="500" cy="78" r="46" />
      <path className="resp-neck" d="M470 118L460 175H540L530 118Z" />
      <path className="resp-ribcage" d="M350 175Q500 125 650 175Q705 285 660 445Q595 515 500 530Q405 515 340 445Q295 285 350 175Z" />

      <path className="resp-nasal" d="M475 68Q500 52 525 68Q511 79 500 86Q488 79 475 68Z" />
      <path className="resp-pharynx" d="M500 92V120" />
      <path className="resp-trachea" d="M500 112V258" />
      {[140,160,180,200,220,240].map(y=><line key={y} className="resp-tracheal-ring" x1="486" y1={y} x2="514" y2={y} />)}

      <path className="resp-lung left" d="M407 211Q353 245 344 334Q338 418 405 463Q441 479 466 452Q480 409 474 331Q468 256 407 211Z" />
      <path className="resp-lung right" d="M593 211Q649 244 656 337Q660 418 595 463Q560 479 536 452Q521 410 527 331Q533 257 593 211Z" />
      <path className="resp-cardiac-notch" d="M535 350Q559 340 570 365Q560 394 535 405" />

      <path className="resp-bronchus left" d="M500 258Q458 272 420 310" />
      <path className="resp-bronchus right" d="M500 258Q542 272 580 310" />

      <g className="resp-bronchioles left">
        <path d="M420 310Q390 331 378 365M420 310Q446 339 449 389M392 338Q370 388 389 429" />
        <path d="M399 356Q418 371 425 397M383 388Q405 402 410 427" />
      </g>
      <g className="resp-bronchioles right">
        <path d="M580 310Q610 331 622 365M580 310Q554 339 551 389M608 338Q630 388 611 429" />
        <path d="M601 356Q582 371 575 397M617 388Q595 402 590 427" />
      </g>

      <g className="resp-alveoli">
        <circle cx="383" cy="426" r="10" /><circle cx="401" cy="432" r="10" /><circle cx="393" cy="413" r="10" />
        <circle cx="617" cy="426" r="10" /><circle cx="599" cy="432" r="10" /><circle cx="607" cy="413" r="10" />
      </g>

      <path className="resp-diaphragm" d="M335 470Q500 405 665 470" />
      <path className="resp-ribs" d="M335 205Q500 155 665 205M325 245Q500 195 675 245M320 290Q500 240 680 290M320 335Q500 285 680 335M325 380Q500 330 675 380M335 425Q500 375 665 425" />

      <text className="repro-orientation" x="500" y="585" textAnchor="middle">human respiratory system</text>
    </g>
  );
}

function ThreePinPlugTemplate() {
  return (
    <g className="spark-diagram-plug" aria-hidden="true">
      <path className="plug-body" d="M300 120Q500 65 700 120V500Q500 555 300 500Z" />
      <rect className="plug-earth-pin" x="465" y="35" width="70" height="115" rx="12" />
      <rect className="plug-neutral-pin" x="255" y="470" width="105" height="60" rx="10" />
      <rect className="plug-live-pin" x="640" y="470" width="105" height="60" rx="10" />
      <path className="plug-earth-wire" d="M500 155Q500 245 430 300" />
      <path className="plug-neutral-wire" d="M430 300Q350 330 330 455" />
      <path className="plug-live-wire" d="M570 300Q655 325 690 455" />
      <rect className="plug-fuse" x="610" y="290" width="105" height="42" rx="8" />
      <rect className="plug-cable-grip" x="415" y="410" width="170" height="38" rx="10" />
      <path className="plug-flex" d="M500 445V600" />
      <text className="plug-wire-text earth" x="405" y="280">green/yellow</text>
      <text className="plug-wire-text neutral" x="315" y="375">blue</text>
      <text className="plug-wire-text live" x="670" y="375">brown</text>
      <text className="plug-fuse-text" x="662" y="317" textAnchor="middle">fuse</text>
      <text className="repro-orientation" x="500" y="630" textAnchor="middle">simplified three-pin plug</text>
    </g>
  );
}

const REFERENCE_TEMPLATE_MEDIA = {
  "mammalian-eye":{
    href:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Diagram_of_human_eye_without_labels.svg",
    x:285,y:45,width:430,height:500,
    credit:"Jmarchn",
    license:"CC BY-SA 3.0",
    source:"https://commons.wikimedia.org/wiki/File:Diagram_of_human_eye_without_labels.svg",
  },
  "mammalian-ear":{
    href:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Anatomy_of_the_Human_Ear_blank.svg",
    x:165,y:55,width:670,height:525,
    credit:"Chittka L, Brockmann; blank derivative by M. Komorniczak",
    license:"CC BY 2.5",
    source:"https://commons.wikimedia.org/wiki/File:Anatomy_of_the_Human_Ear_blank.svg",
  },
  "human-digestive-system":{
    href:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Digestive_system_without_labels.svg",
    x:350,y:18,width:300,height:580,
    credit:"Mariana Ruiz / Jmarchn",
    license:"Public domain",
    source:"https://commons.wikimedia.org/wiki/File:Digestive_system_without_labels.svg",
  },
  "human-tooth":{
    href:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Basic_tooth.svg",
    x:355,y:15,width:290,height:585,
    credit:"K. D. Schroeder",
    license:"CC BY-SA 4.0",
    source:"https://commons.wikimedia.org/wiki/File:Basic_tooth.svg",
  },
  "human-heart":{
    href:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Diagram_of_the_human_heart_%28no_labels%29.svg",
    x:330,y:22,width:340,height:565,
    credit:"Stenemo / Jmarchn",
    license:"CC BY-SA 4.0",
    source:"https://commons.wikimedia.org/wiki/File:Diagram_of_the_human_heart_(no_labels).svg",
  },
  "plant-cell":{
    href:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Plant_cell_structure_no_text.png",
    x:250,y:35,width:500,height:550,
    credit:"LadyofHats",
    license:"Public domain",
    source:"https://commons.wikimedia.org/wiki/File:Plant_cell_structure_no_text.png",
  },
  "animal-cell":{
    href:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Animal_cell_structure_no_text.svg",
    x:255,y:35,width:490,height:550,
    credit:"LadyofHats / MesserWoland",
    license:"Public domain",
    source:"https://commons.wikimedia.org/wiki/File:Animal_cell_structure_no_text.svg",
  },
  "light-microscope":{
    href:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Compound_Microscope.JPG",
    x:320,y:28,width:360,height:550,
    credit:"Acagastya",
    license:"CC0 1.0",
    source:"https://commons.wikimedia.org/wiki/File:Compound_Microscope.JPG",
  },
  "female-reproductive-system":{
    href:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Female_reproductive_organs%2C_frontal_view%2C_unlabeled.svg",
    x:225,y:155,width:550,height:299,
    credit:"RWhitwam, adapted from Illu cervix.svg",
    license:"CC BY-SA 4.0",
    source:"https://commons.wikimedia.org/wiki/File:Female_reproductive_organs,_frontal_view,_unlabeled.svg",
  },
  "male-reproductive-system":{
    href:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Male_reproductive_frontal_without_labels.svg",
    x:300,y:30,width:400,height:530,
    credit:"T. Kebert",
    license:"CC BY-SA 4.0",
    source:"https://commons.wikimedia.org/wiki/File:Male_reproductive_frontal_without_labels.svg",
  },
  "pregnancy-uterus":{
    href:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Gray38.png",
    x:315,y:30,width:370,height:480,
    credit:"Henry Vandyke Carter / Gray's Anatomy",
    license:"Public domain",
    source:"https://commons.wikimedia.org/wiki/File:Gray38.png",
  },
};

const REFERENCE_TARGET_OVERRIDES = {
  "mammalian-eye":{
    "eye-cornea-target":{anchorX:315,anchorY:310},
    "eye-iris-target":{anchorX:365,anchorY:275},
    "eye-lens-target":{anchorX:420,anchorY:310},
    "eye-sclera-target":{anchorX:520,anchorY:105},
    "eye-retina-target":{anchorX:640,anchorY:255},
    "eye-choroid-target":{anchorX:625,anchorY:220},
    "eye-optic-nerve-target":{anchorX:700,anchorY:335},
    "eye-fovea-target":{anchorX:635,anchorY:310},
  },
  "mammalian-ear":{
    "ear-pinna-target":{anchorX:205,anchorY:265},
    "ear-canal-target":{anchorX:340,anchorY:292},
    "ear-drum-target":{anchorX:420,anchorY:295},
    "ear-ossicles-target":{anchorX:490,anchorY:260},
    "ear-cochlea-target":{anchorX:655,anchorY:345},
    "ear-semicircular-target":{anchorX:620,anchorY:170},
    "ear-auditory-nerve-target":{anchorX:745,anchorY:345},
    "ear-eustachian-target":{anchorX:565,anchorY:435},
  },
  "human-digestive-system":{
    "digestive-mouth-target":{anchorX:505,anchorY:75},
    "digestive-oesophagus-target":{anchorX:505,anchorY:180},
    "digestive-liver-target":{anchorX:450,anchorY:250},
    "digestive-gall-target":{anchorX:470,anchorY:295},
    "digestive-stomach-target":{anchorX:545,anchorY:300},
    "digestive-pancreas-target":{anchorX:535,anchorY:355},
    "digestive-small-target":{anchorX:505,anchorY:455},
    "digestive-large-target":{anchorX:455,anchorY:430},
  },
  "human-tooth":{
    "tooth-crown-target":{anchorX:500,anchorY:95},
    "tooth-enamel-target":{anchorX:430,anchorY:165},
    "tooth-dentine-target":{anchorX:465,anchorY:225},
    "tooth-pulp-target":{anchorX:505,anchorY:245},
    "tooth-gum-target":{anchorX:590,anchorY:350},
    "tooth-root-target":{anchorX:515,anchorY:505},
  },
  "human-heart":{
    "heart-ra-target":{anchorX:450,anchorY:245},
    "heart-rv-target":{anchorX:455,anchorY:390},
    "heart-vena-target":{anchorX:420,anchorY:105},
    "heart-pa-target":{anchorX:520,anchorY:175},
    "heart-tricuspid-target":{anchorX:465,anchorY:310},
    "heart-la-target":{anchorX:565,anchorY:245},
    "heart-lv-target":{anchorX:570,anchorY:395},
    "heart-aorta-target":{anchorX:575,anchorY:85},
    "heart-pv-target":{anchorX:625,anchorY:225},
    "heart-bicuspid-target":{anchorX:545,anchorY:310},
  },
  "female-reproductive-system":{
    "female-ovary-target":{anchorX:372,anchorY:283},
    "female-oviduct-target":{anchorX:410,anchorY:266},
    "female-uterus-target":{anchorX:500,anchorY:318},
    "female-endometrium-target":{anchorX:500,anchorY:327},
    "female-cervix-target":{anchorX:503,anchorY:378},
    "female-vagina-target":{anchorX:505,anchorY:414},
  },
  "male-reproductive-system":{
    "male-testis-target":{anchorX:428,anchorY:434},
    "male-scrotum-target":{anchorX:423,anchorY:457},
    "male-epididymis-target":{anchorX:410,anchorY:410},
    "male-sperm-duct-target":{anchorX:390,anchorY:270},
    "male-seminal-vesicle-target":{anchorX:455,anchorY:220},
    "male-prostate-target":{anchorX:500,anchorY:257},
    "male-cowper-target":{anchorX:500,anchorY:301},
    "male-urethra-target":{anchorX:500,anchorY:358},
    "male-penis-target":{anchorX:500,anchorY:442},
  },
  "pregnancy-uterus":{
    "pregnancy-placenta-target":{anchorX:575,anchorY:175},
    "pregnancy-umbilical-target":{anchorX:520,anchorY:270},
    "pregnancy-amnion-target":{anchorX:405,anchorY:182},
    "pregnancy-foetus-target":{anchorX:455,anchorY:280},
    "pregnancy-fluid-target":{anchorX:420,anchorY:335},
    "pregnancy-cervix-target":{anchorX:515,anchorY:455},
  },
};

function displayTarget(template,target) {
  const override = REFERENCE_TARGET_OVERRIDES[template]?.[target.id];
  return override ? {...target,...override} : target;
}

function ReferenceTemplate({ template }) {
  const media = REFERENCE_TEMPLATE_MEDIA[template];
  if (!media) return null;
  return (
    <g className={"spark-reference-template spark-reference-template-"+template} aria-hidden="true">
      <rect className="spark-reference-template-backdrop" x={media.x-12} y={media.y-12} width={media.width+24} height={media.height+24} rx="18" />
      <image
        href={media.href}
        x={media.x}
        y={media.y}
        width={media.width}
        height={media.height}
        preserveAspectRatio="xMidYMid meet"
      />
    </g>
  );
}

function ReferenceCredit({ template }) {
  const media = REFERENCE_TEMPLATE_MEDIA[template];
  if (!media) return null;
  return (
    <small className="spark-reference-credit">
      Reference image: <a href={media.source} target="_blank" rel="noreferrer">{media.credit}</a>
      {" · "}{media.license}
    </small>
  );
}

function DiagramTemplate({ template }) {
  if (REFERENCE_TEMPLATE_MEDIA[template]) return <ReferenceTemplate template={template} />;
  if (template === "flower-longitudinal") return <FlowerLongitudinalTemplate />;
  if (template === "bean-seed") return <BeanSeedTemplate />;
  if (template === "mammalian-eye") return <MammalianEyeTemplate />;
  if (template === "mammalian-ear") return <MammalianEarTemplate />;
  if (template === "human-brain") return <HumanBrainTemplate />;
  if (template === "endocrine-system") return <EndocrineSystemTemplate />;
  if (template === "human-digestive-system") return <HumanDigestiveTemplate />;
  if (template === "human-tooth") return <HumanToothTemplate />;
  if (template === "human-respiratory-system") return <HumanRespiratoryTemplate />;
  if (template === "three-pin-plug") return <ThreePinPlugTemplate />;
  if (template === "human-heart") return <HumanHeartTemplate />;
  if (template === "kidney-longitudinal") return <KidneyLongitudinalTemplate />;
  if (template === "nephron") return <NephronTemplate />;
  if (template === "skin-section") return <SkinSectionTemplate />;
  return (
    <g aria-hidden="true">
      <rect className="unknown-template" x="260" y="120" width="480" height="360" rx="28" />
      <text x="500" y="305" textAnchor="middle">Diagram unavailable</text>
    </g>
  );
}

function lineStart(target) {
  const width = 190;
  const height = 58;
  if (target.side === "left") return [target.boxX + width,target.boxY + height/2];
  if (target.side === "top") return [target.boxX + width/2,target.boxY + height];
  if (target.side === "bottom") return [target.boxX + width/2,target.boxY];
  return [target.boxX,target.boxY + height/2];
}

export default function InteractiveLabelDiagram({
  activity,
  completed = false,
  onComplete,
}) {
  const normalized = useMemo(
    () => normalizeInteractiveLabelActivity(activity),
    [activity]
  );
  const correctMap = useMemo(
    () => correctDiagramPlacements(normalized),
    [normalized]
  );

  const [placements,setPlacements] = useState(() => completed ? correctMap : {});
  const [selectedLabelId,setSelectedLabelId] = useState(null);
  const [checked,setChecked] = useState(Boolean(completed));
  const [hintTargetId,setHintTargetId] = useState(null);
  const [message,setMessage] = useState(completed ? "Completed" : "");
  const completionSent = useRef(false);

  useEffect(() => {
    if (!completed) return;
    setPlacements(correctMap);
    setChecked(true);
    setMessage("Completed");
  }, [completed,correctMap]);

  const labelById = useMemo(
    () => new Map(normalized.labels.map(label => [label.id,label])),
    [normalized.labels]
  );
  const displayTargets = useMemo(
    () => normalized.targets.map(target => displayTarget(normalized.template,target)),
    [normalized.template,normalized.targets]
  );
  const targetById = useMemo(
    () => new Map(displayTargets.map(target => [target.id,target])),
    [displayTargets]
  );

  const usedLabelIds = new Set(Object.values(placements));
  const score = scoreDiagramPlacements(normalized,placements);

  const place = (targetId,labelId) => {
    if (completed) return;
    const target = targetById.get(targetId);
    if (!target || !labelById.has(labelId)) return;

    setPlacements(current => {
      const next = {...current};
      Object.keys(next).forEach(key => {
        if (next[key] === labelId) delete next[key];
      });
      next[targetId] = labelId;
      return next;
    });
    setSelectedLabelId(null);
    setHintTargetId(null);
    setChecked(false);
    setMessage("");
  };

  const handleTargetClick = targetId => {
    if (selectedLabelId) place(targetId,selectedLabelId);
  };

  const checkAnswers = () => {
    const result = scoreDiagramPlacements(normalized,placements);
    setChecked(true);
    setHintTargetId(null);

    if (result.complete) {
      setMessage(`Excellent. ${result.correct}/${result.total} labels are correct.`);
      if (!completionSent.current) {
        completionSent.current = true;
        onComplete?.({
          activityId:normalized.id,
          title:normalized.title,
          score:result.correct,
          total:result.total,
          percent:result.percent,
        });
      }
      return;
    }

    setMessage(`${result.correct}/${result.total} correct. Fix the highlighted labels and try again.`);
  };

  const showHint = () => {
    const target = nextDiagramHintTarget(normalized,placements);
    if (!target) {
      setMessage("All labels are in the correct places.");
      return;
    }
    setHintTargetId(target.id);
    const label = labelById.get(target.labelId);
    setMessage(label?.hint || `Look closely at the structure linked to the highlighted target.`);
  };

  const reset = () => {
    if (completed) return;
    setPlacements({});
    setSelectedLabelId(null);
    setHintTargetId(null);
    setChecked(false);
    setMessage("");
  };

  return (
    <section className={`spark-label-diagram ${completed ? "is-completed" : ""}`}>
      <div className="spark-label-diagram-heading">
        <div>
          <span>INTERACTIVE DIAGRAM</span>
          <h3>{normalized.title}</h3>
          <p>{normalized.instructions}</p>
        </div>
        {completed && <strong className="spark-label-diagram-complete">Completed</strong>}
      </div>

      <div className="spark-label-diagram-workspace">
        <aside className="spark-label-bank" aria-label="Labels">
          <strong>Labels</strong>
          <div>
            {normalized.labels.map(label => {
              const used = usedLabelIds.has(label.id);
              const selected = selectedLabelId === label.id;
              return (
                <button
                  type="button"
                  key={label.id}
                  draggable={!used && !completed}
                  disabled={used || completed}
                  className={selected ? "selected" : ""}
                  onClick={() => !used && setSelectedLabelId(selected ? null : label.id)}
                  onDragStart={event => {
                    event.dataTransfer.setData("text/plain",label.id);
                    event.dataTransfer.effectAllowed = "move";
                  }}
                >
                  {label.text}
                </button>
              );
            })}
          </div>
          <small>Desktop: drag a label. Phone or tablet: tap a label, then tap its target.</small>
        </aside>

        <div className="spark-label-diagram-stage">
          <svg
            viewBox="0 0 1000 620"
            role="img"
            aria-label={`${normalized.title} interactive diagram`}
          >
            <DiagramTemplate template={normalized.template} />

            {displayTargets.map((target,index) => {
              const [startX,startY] = lineStart(target);
              const placedId = placements[target.id];
              const isCorrect = placedId === target.labelId;
              const stateClass = checked
                ? isCorrect ? "correct" : placedId ? "incorrect" : "empty"
                : placedId ? "placed" : "empty";
              const label = placedId ? labelById.get(placedId) : null;

              return (
                <g key={target.id} className={`spark-label-target-group ${stateClass} ${hintTargetId === target.id ? "hint" : ""}`}>
                  <line x1={startX} y1={startY} x2={target.anchorX} y2={target.anchorY} />
                  <circle cx={target.anchorX} cy={target.anchorY} r="8" />
                  <g className="spark-label-target-index" aria-hidden="true">
                    <circle
                      className="spark-label-target-index-circle"
                      cx={target.anchorX + 28}
                      cy={target.anchorY - 26}
                      r="25"
                    />
                    <text
                      x={target.anchorX + 28}
                      y={target.anchorY - 17}
                      textAnchor="middle"
                    >
                      {index + 1}
                    </text>
                  </g>
                  <foreignObject
                    x={target.boxX}
                    y={target.boxY}
                    width="190"
                    height="58"
                    className="spark-label-target-fo"
                  >
                    <button
                      type="button"
                      className="spark-label-target"
                      aria-label={`Target for ${label?.text || "a diagram label"}`}
                      onClick={() => handleTargetClick(target.id)}
                      onDragOver={event => {
                        if (!completed) event.preventDefault();
                      }}
                      onDrop={event => {
                        event.preventDefault();
                        place(target.id,event.dataTransfer.getData("text/plain"));
                      }}
                    >
                      {label?.text || "Drop label here"}
                    </button>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
          <ReferenceCredit template={normalized.template} />
        </div>

        <div className="spark-label-diagram-mobile-targets" aria-label="Diagram targets">
          <strong className="spark-label-diagram-mobile-key-title">
            {completed ? "Diagram label key" : "Place the labels"}
          </strong>
          {normalized.targets.map((target,index) => {
            const placedId = placements[target.id];
            const label = placedId ? labelById.get(placedId) : null;
            const correct = placedId === target.labelId;
            const className = checked
              ? correct ? "correct" : placedId ? "incorrect" : ""
              : "";
            return (
              <button
                type="button"
                key={target.id}
                className={`${className} ${hintTargetId === target.id ? "hint" : ""}`}
                onClick={() => handleTargetClick(target.id)}
              >
                <span>{index + 1}</span>
                <strong>{label?.text || "Tap to place selected label"}</strong>
              </button>
            );
          })}
        </div>
      </div>

      <div className="spark-label-diagram-actions">
        <button type="button" onClick={checkAnswers} disabled={completed || normalized.targets.length === 0}>
          Check answers
        </button>
        <button type="button" className="secondary" onClick={showHint} disabled={completed}>
          Hint
        </button>
        <button type="button" className="secondary" onClick={reset} disabled={completed}>
          Reset
        </button>
      </div>

      {message && (
        <div className={`spark-label-diagram-feedback ${score.complete || completed ? "success" : ""}`} role="status">
          {message}
        </div>
      )}

      {checked && (
        <div className="spark-label-diagram-explanations">
          {normalized.targets
            .filter(target => placements[target.id] === target.labelId)
            .map(target => {
              const label = labelById.get(target.labelId);
              return label?.explanation ? (
                <p key={target.id}><strong>{label.text}:</strong> {label.explanation}</p>
              ) : null;
            })}
        </div>
      )}
    </section>
  );
}