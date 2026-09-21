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
    <g className="spark-diagram-cell spark-diagram-plant-cell" aria-hidden="true">
      <rect className="cell-wall" x="245" y="82" width="510" height="438" rx="44" />
      <rect className="cell-membrane" x="268" y="105" width="464" height="392" rx="34" />
      <rect className="cytoplasm plant-cytoplasm" x="286" y="123" width="428" height="356" rx="26" />
      <ellipse className="vacuole" cx="535" cy="305" rx="150" ry="128" />
      <circle className="nucleus nuclear-envelope" cx="405" cy="285" r="58" />
      <circle className="nucleolus" cx="389" cy="268" r="17" />

      <g className="chloroplasts">
        {[
          [338,180,-18],[650,188,16],[338,408,18],[665,405,-14],[620,145,-8],
        ].map(([x,y,angle],index) => (
          <g key={index} transform={`translate(${x} ${y}) rotate(${angle})`}>
            <ellipse cx="0" cy="0" rx="34" ry="17" />
            <path className="chloroplast-grana" d="M-18-7h12m-12 7h12m-12 7h12M5-7h13M5 0h13M5 7h13" />
          </g>
        ))}
      </g>

      <g className="mitochondria">
        <g transform="translate(655 335) rotate(-24)">
          <ellipse cx="0" cy="0" rx="36" ry="20" />
          <path className="cristae" d="M-23 0q8-12 16 0t16 0t16 0" />
        </g>
        <g transform="translate(358 352) rotate(25)">
          <ellipse cx="0" cy="0" rx="33" ry="18" />
          <path className="cristae" d="M-21 0q7-10 14 0t14 0t14 0" />
        </g>
      </g>

      <g className="ribosomes">
        {[
          [455,155],[487,165],[520,150],[555,166],
          [455,438],[492,447],[530,430],[568,445],[605,432],
        ].map(([x,y],index) => <circle key={index} cx={x} cy={y} r="5" />)}
      </g>
    </g>
  );
}

function AnimalCellTemplate() {
  return (
    <g className="spark-diagram-cell spark-diagram-animal-cell" aria-hidden="true">
      <path className="cell-membrane animal-outline" d="M285 304C282 190 360 100 468 86c104-14 212 38 246 137 37 107-17 222-112 278-96 56-229 31-292-58-31-43-27-92-25-139Z" />
      <path className="cytoplasm animal-cytoplasm" d="M307 303c0-99 67-176 165-190 90-13 185 32 216 116 33 91-15 192-99 241-83 48-198 25-252-50-26-36-31-76-30-117Z" />
      <circle className="nucleus nuclear-envelope" cx="460" cy="300" r="72" />
      <circle className="nucleolus" cx="442" cy="281" r="19" />
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
        ].map(([x,y],index) => <circle key={index} cx={x} cy={y} r="5" />)}
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
    <g className="spark-diagram-flower" aria-hidden="true">
      <path className="flower-petal left" d="M500 310 C390 305 300 230 305 125 C390 135 465 195 500 285Z" />
      <path className="flower-petal right" d="M500 310 C610 305 700 230 695 125 C610 135 535 195 500 285Z" />
      <path className="flower-petal far-left" d="M485 305 C410 270 365 165 410 80 C475 130 505 205 500 285Z" />
      <path className="flower-petal far-right" d="M515 305 C590 270 635 165 590 80 C525 130 495 205 500 285Z" />

      <path className="flower-sepal left" d="M455 335 C385 350 340 330 315 290 C375 285 425 300 465 320Z" />
      <path className="flower-sepal right" d="M545 335 C615 350 660 330 685 290 C625 285 575 300 535 320Z" />

      <ellipse className="flower-ovary" cx="500" cy="360" rx="92" ry="72" />
      <ellipse className="flower-ovule" cx="465" cy="350" rx="18" ry="26" />
      <ellipse className="flower-ovule" cx="535" cy="350" rx="18" ry="26" />
      <ellipse className="flower-ovule" cx="500" cy="388" rx="18" ry="24" />

      <path className="flower-style" d="M490 300 L490 145 Q500 120 510 145 L510 300Z" />
      <path className="flower-stigma" d="M462 125 Q500 90 538 125 Q520 150 500 145 Q480 150 462 125Z" />

      <g className="flower-stamens">
        <path d="M430 310 Q405 245 400 185" />
        <path d="M465 305 Q455 230 460 165" />
        <path d="M535 305 Q545 230 540 165" />
        <path d="M570 310 Q595 245 600 185" />
        <ellipse cx="398" cy="175" rx="28" ry="13" transform="rotate(-18 398 175)" />
        <ellipse cx="460" cy="155" rx="28" ry="13" transform="rotate(-8 460 155)" />
        <ellipse cx="540" cy="155" rx="28" ry="13" transform="rotate(8 540 155)" />
        <ellipse cx="602" cy="175" rx="28" ry="13" transform="rotate(18 602 175)" />
      </g>

      <path className="flower-receptacle" d="M420 415 Q500 450 580 415 L555 445 Q500 470 445 445Z" />
      <path className="flower-stalk" d="M485 445 L480 535 L520 535 L515 445Z" />
    </g>
  );
}

function BeanSeedTemplate() {
  return (
    <g className="spark-diagram-seed" aria-hidden="true">
      <path className="seed-testa" d="M280 310 C285 170 405 95 560 115 C690 132 755 235 720 355 C685 475 545 525 410 485 C320 458 278 395 280 310Z" />
      <path className="seed-cotyledon left" d="M310 315 C315 205 400 140 500 145 C485 235 470 365 495 455 C390 470 310 415 310 315Z" />
      <path className="seed-cotyledon right" d="M505 145 C620 145 700 220 690 325 C680 420 600 470 510 455 C535 350 530 235 505 145Z" />
      <path className="seed-embryo-axis" d="M485 190 Q515 215 510 260 L505 380 Q500 420 470 445" />
      <path className="seed-plumule" d="M485 195 Q455 160 440 195 Q465 205 485 220 Q515 180 535 205 Q510 220 495 232" />
      <path className="seed-radicle" d="M505 372 Q515 415 470 448 Q470 420 490 385Z" />
      <circle className="seed-hilum" cx="300" cy="360" r="15" />
    </g>
  );
}

function FemaleReproductiveTemplate() {
  return (
    <g className="spark-diagram-reproductive spark-diagram-female-reproductive" aria-hidden="true">
      <path className="female-uterus" d="M430 235 Q500 185 570 235 Q585 300 555 375 Q530 420 500 438 Q470 420 445 375 Q415 300 430 235Z" />
      <path className="female-endometrium" d="M458 250 Q500 222 542 250 Q550 305 530 355 Q515 382 500 392 Q485 382 470 355 Q450 305 458 250Z" />
      <path className="female-oviduct" d="M445 245 Q395 185 330 185 Q292 185 270 215" />
      <path className="female-oviduct" d="M555 245 Q605 185 670 185 Q708 185 730 215" />
      <path className="female-fimbriae" d="M270 215l-24-18m24 18l-28 2m28-2l-20 21M730 215l24-18m-24 18l28 2m-28-2l20 21" />
      <ellipse className="female-ovary" cx="235" cy="225" rx="42" ry="30" transform="rotate(-15 235 225)" />
      <ellipse className="female-ovary" cx="765" cy="225" rx="42" ry="30" transform="rotate(15 765 225)" />
      <path className="female-cervix" d="M475 405 Q500 420 525 405 L525 465 Q500 480 475 465Z" />
      <path className="female-vagina" d="M478 465 L455 555 Q500 580 545 555 L522 465Z" />
      <text className="repro-orientation" x="500" y="610" textAnchor="middle">front view</text>
    </g>
  );
}

function MaleReproductiveTemplate() {
  return (
    <g className="spark-diagram-reproductive spark-diagram-male-reproductive" aria-hidden="true">
      <ellipse className="male-bladder" cx="495" cy="155" rx="78" ry="68" />
      <path className="male-sperm-duct" d="M405 425 Q345 330 365 230 Q380 165 430 155 Q450 150 465 170" />
      <path className="male-seminal-vesicle" d="M568 175 Q625 145 640 190 Q620 235 572 222 Q550 205 568 175Z" />
      <ellipse className="male-prostate" cx="505" cy="250" rx="58" ry="38" />
      <circle className="male-cowper" cx="530" cy="302" r="15" />
      <path className="male-urethra" d="M500 205 Q500 250 505 292 Q515 335 610 345 Q700 350 790 370" />
      <path className="male-penis" d="M565 322 Q655 305 790 333 Q835 343 842 375 Q830 410 775 405 Q670 395 585 370 Q552 355 565 322Z" />
      <ellipse className="male-scrotum" cx="405" cy="462" rx="80" ry="72" />
      <ellipse className="male-testis" cx="405" cy="458" rx="46" ry="57" />
      <path className="male-epididymis" d="M365 415 Q335 460 365 505" />
      <path className="male-cowper-duct" d="M540 312 Q565 330 585 340" />
      <text className="repro-orientation" x="500" y="590" textAnchor="middle">simplified side view</text>
    </g>
  );
}

function PregnancyUterusTemplate() {
  return (
    <g className="spark-diagram-pregnancy" aria-hidden="true">
      <path className="pregnancy-uterus-wall" d="M325 105 Q500 55 675 105 Q755 225 710 405 Q675 515 500 555 Q325 515 290 405 Q245 225 325 105Z" />
      <path className="pregnancy-amnion" d="M355 145 Q500 105 625 170 Q690 255 640 390 Q585 485 465 485 Q350 470 315 365 Q285 245 355 145Z" />
      <path className="pregnancy-placenta" d="M330 160 Q295 235 320 325 Q345 385 385 405 Q430 345 420 250 Q410 185 330 160Z" />
      <path className="pregnancy-umbilical" d="M395 300 Q455 255 505 310 Q545 355 585 320" />
      <g className="pregnancy-foetus">
        <circle cx="570" cy="270" r="54" />
        <path d="M525 310 Q490 350 520 405 Q560 450 610 420 Q640 385 610 350 Q585 330 560 325Z" />
        <path d="M535 370 Q490 395 470 435M590 405 Q620 445 655 452" />
      </g>
      <path className="pregnancy-cervix" d="M455 520 Q500 542 545 520 L540 570 Q500 592 460 570Z" />
      <path className="pregnancy-vagina" d="M465 570 L450 615 H550 L535 570Z" />
      <circle className="pregnancy-fluid-marker" cx="485" cy="225" r="8" />
      <circle className="pregnancy-fluid-marker" cx="615" cy="350" r="8" />
      <text className="repro-orientation" x="500" y="80" textAnchor="middle">foetus in uterus</text>
    </g>
  );
}

function HumanHeartTemplate() {
  return (
    <g className="spark-diagram-heart spark-csec-reference" aria-hidden="true">
      <g transform="translate(225 12) scale(1.35 1.55)">
        <path className="heart-outline" d="M110 110Q95 110 95 135V200Q100 280 205 330Q310 285 318 200V135Q318 110 300 110Z" />

        <path className="heart-right-atrium" d="M98 113H205V173H95V135Q95 116 110 113Z" />
        <path className="heart-right-ventricle" d="M95 177H205V328Q105 283 98 202Z" />
        <path className="heart-left-atrium" d="M205 113H300Q318 113 318 135V173H205Z" />
        <path className="heart-left-ventricle" d="M205 177H318V200Q310 285 205 330Z" />

        <path className="heart-septum" d="M205 112V330" />

        <path className="heart-vena-cava" d="M122 112V40M122 175Q100 235 106 280" />
        <path className="heart-aorta" d="M226 178V62Q226 30 258 30Q294 30 294 64V80" />
        <path className="heart-pulmonary-artery" d="M171 178V122Q171 102 197 98H215" />
        <path className="heart-pulmonary-vein" d="M318 143H355M205 143H182" />

        <path className="heart-tricuspid" d="M150 175L158 195M170 175L163 195" />
        <path className="heart-bicuspid" d="M245 175L252 195M265 175L258 195" />
        <path className="heart-semilunar" d="M215 160Q226 170 238 160" />

        <path className="heart-inner-wall" d="M318 180Q322 260 225 318M300 185Q302 255 215 305" />

        <path className="heart-flow deoxygenated" d="M122 55V132M130 150V172M150 210Q165 235 188 255" />
        <path className="heart-flow oxygenated" d="M342 143H315M275 215Q260 260 230 300M270 70Q285 52 294 65" />
      </g>

      <text className="heart-side-label deoxygenated" x="385" y="565" textAnchor="middle">right side, deoxygenated blood</text>
      <text className="heart-side-label oxygenated" x="625" y="565" textAnchor="middle">left side, oxygenated blood</text>
    </g>
  );
}

function KidneyLongitudinalTemplate() {
  return (
    <g className="spark-diagram-kidney" aria-hidden="true">
      <path className="kidney-outline" d="M505 72Q350 45 275 180Q210 300 258 420Q300 535 414 565Q520 592 590 520Q635 472 612 420Q585 365 606 315Q628 262 681 214Q674 110 505 72Z" />
      <path className="kidney-capsule" d="M503 91Q366 68 300 190Q245 300 284 406Q322 502 418 529Q508 554 565 492Q600 454 580 415Q553 360 575 305Q596 253 643 210Q631 128 503 91Z" />
      <path className="kidney-cortex" d="M488 118Q380 102 326 210Q282 308 316 394Q350 474 426 494Q496 512 537 466Q560 439 545 401Q520 350 540 300Q558 256 598 213Q580 151 488 118Z" />

      <g className="kidney-medulla">
        <path d="M362 190L472 228L376 268Z" />
        <path d="M338 283L478 309L354 354Z" />
        <path d="M372 390L486 360L408 445Z" />
        <path d="M430 150L505 228L410 238Z" />
      </g>

      <g className="kidney-calyces">
        <path d="M470 228Q515 240 535 267" />
        <path d="M478 309Q522 308 545 326" />
        <path d="M486 360Q525 355 548 350" />
      </g>

      <path className="kidney-pelvis" d="M505 232Q575 252 583 304Q590 348 522 402Q546 342 505 232Z" />
      <path className="kidney-ureter" d="M555 365Q625 410 654 555" />
      <path className="kidney-artery" d="M612 246H752" />
      <path className="kidney-vein" d="M608 280H752" />
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
    <g className="spark-diagram-eye spark-csec-reference" aria-hidden="true">
      <g transform="translate(89 48) scale(1.75)">
        <path className="eye-sclera" d="M144 210.2A105 105 0 1 0 144 89.8Q70 150 144 210.2Z" />
        <circle className="eye-vitreous" cx="235" cy="150" r="91" />

        <path className="eye-choroid" d="M148.9 206.8A99 99 0 1 0 148.9 93.2" />
        <path className="eye-retina" d="M153 203.9A94 94 0 1 0 153 96.1" />
        <path className="eye-cornea" d="M144 210.2Q70 150 144 89.8Q126 116 126 150Q126 184 144 210.2Z" />
        <path className="eye-aqueous" d="M143 203Q112 180 104 150Q112 120 143 97Q132 122 132 150Q132 178 143 203Z" />

        <ellipse className="eye-lens" cx="168" cy="150" rx="14" ry="36" />
        <path className="eye-iris" d="M150 88V130M150 170V212" />
        <ellipse className="eye-pupil" cx="150" cy="150" rx="6" ry="18" />

        <path className="eye-ciliary" d="M160 80L176 78L174 92L162 92ZM160 220L176 222L174 208L162 208Z" />
        <path className="eye-suspensory" d="M168 92V114M172 92L174 116M168 208V186M172 208L174 184" />

        <path className="eye-optic-nerve" d="M333 158L395 162V180H333Z" />
        <path className="eye-optic-disc" d="M324 138Q318 144 324 150" />
        <circle className="eye-fovea" cx="311" cy="150" r="5" />
      </g>

      <text className="repro-orientation" x="500" y="560" textAnchor="middle">horizontal section through the eye</text>
    </g>
  );
}

function MammalianEarTemplate() {
  return (
    <g className="spark-diagram-ear" aria-hidden="true">
      <path className="ear-pinna" d="M120 145Q58 145 52 252Q48 365 145 400Q222 406 228 330Q232 276 182 269Q142 268 138 309Q136 344 168 340Q195 336 193 295" />
      <path className="ear-canal" d="M190 294Q278 282 342 296" />
      <ellipse className="ear-drum" cx="360" cy="295" rx="18" ry="72" transform="rotate(-8 360 295)" />

      <path className="ear-middle-cavity" d="M385 224Q488 204 572 254Q566 332 505 366Q431 356 386 329Z" />

      <g className="ear-ossicles">
        <path className="malleus" d="M378 274Q398 254 420 248L431 274L414 293" />
        <path className="incus" d="M425 248Q450 238 462 260L451 282L472 294" />
        <path className="stapes" d="M472 294L493 270M475 300L497 324M493 270Q512 296 497 324" />
        <circle cx="418" cy="248" r="10" />
        <circle cx="458" cy="262" r="9" />
      </g>

      <g className="ear-semicircular">
        <path d="M545 188Q501 112 558 82Q620 48 658 108Q686 153 650 210" />
        <path d="M588 210Q570 120 648 104Q715 91 728 163Q740 224 678 252" />
        <path d="M548 238Q484 194 512 132Q538 75 602 104Q655 128 647 184" />
      </g>

      <ellipse className="ear-vestibule" cx="596" cy="286" rx="38" ry="50" />

      <path className="ear-cochlea" d="M607 332Q658 267 722 296Q787 326 774 386Q760 444 698 446Q645 447 624 408Q607 377 627 351Q647 327 676 339Q700 349 699 372Q698 392 681 400Q663 407 650 395" />
      <path className="ear-auditory-nerve" d="M711 356Q785 333 858 372M620 270Q730 240 820 300" />

      <path className="ear-eustachian" d="M507 327Q545 368 563 438Q576 486 627 523" />

      <text className="repro-orientation" x="500" y="580" textAnchor="middle">section through the mammalian ear</text>
    </g>
  );
}

function HumanBrainTemplate() {
  return (
    <g className="spark-diagram-brain" aria-hidden="true">
      <path className="brain-cerebrum" d="M285 135Q350 65 470 72Q590 55 690 120Q770 178 758 280Q748 365 680 405Q610 440 540 420Q470 455 390 425Q300 390 270 320Q235 235 285 135Z" />
      <path className="brain-cerebrum-fold" d="M330 145Q385 110 430 145M430 100Q490 130 535 100M545 135Q610 100 655 145M315 220Q385 185 435 220M480 190Q550 230 620 195M330 295Q390 260 450 300M500 280Q575 315 650 270" />
      <path className="brain-cerebellum" d="M565 350Q650 320 720 365Q755 405 720 450Q665 490 585 455Q545 420 565 350Z" />
      <path className="brain-brainstem" d="M505 345Q545 340 575 372Q570 425 595 472L550 510Q505 470 490 405Z" />
      <path className="brain-medulla" d="M520 390Q555 388 570 415L582 470L548 500Q515 462 508 425Z" />
      <path className="brain-spinal-cord" d="M550 492Q570 525 568 610" />
      <path className="brain-hypothalamus" d="M465 318Q500 292 535 322Q525 350 495 360Q468 350 465 318Z" />
      <circle className="brain-pituitary" cx="500" cy="383" r="20" />
      <path className="brain-pituitary-stalk" d="M500 355V365" />
      <text className="repro-orientation" x="500" y="635" textAnchor="middle">simplified side view of the human brain</text>
    </g>
  );
}

function EndocrineSystemTemplate() {
  return (
    <g className="spark-diagram-endocrine" aria-hidden="true">
      <circle className="endo-head" cx="500" cy="100" r="62" />
      <path className="endo-body" d="M425 175Q500 145 575 175Q625 250 605 365Q590 455 555 560H445Q410 455 395 365Q375 250 425 175Z" />
      <path className="endo-arm" d="M420 220Q330 285 305 400M580 220Q670 285 695 400" />
      <path className="endo-leg" d="M460 555Q430 605 415 635M540 555Q570 605 585 635" />

      <circle className="endo-pituitary" cx="500" cy="112" r="12" />
      <path className="endo-thyroid" d="M475 190Q490 175 500 192Q510 175 525 190Q525 218 500 225Q475 218 475 190Z" />

      <path className="endo-kidney left" d="M430 330Q400 315 392 350Q390 395 425 405Q447 390 442 355Q440 340 430 330Z" />
      <path className="endo-kidney right" d="M570 330Q600 315 608 350Q610 395 575 405Q553 390 558 355Q560 340 570 330Z" />
      <path className="endo-adrenal left" d="M400 322Q418 295 438 320Z" />
      <path className="endo-adrenal right" d="M562 320Q582 295 600 322Z" />

      <path className="endo-pancreas" d="M430 425Q500 395 570 425Q535 458 465 455Q440 450 430 425Z" />

      <g className="endo-ovaries">
        <ellipse cx="455" cy="505" rx="18" ry="13" />
        <ellipse cx="545" cy="505" rx="18" ry="13" />
        <path d="M473 505Q500 485 527 505" />
      </g>

      <g className="endo-testes-inset" transform="translate(745 455)">
        <rect className="endo-inset-box" x="-55" y="-45" width="120" height="130" rx="16" />
        <ellipse cx="-10" cy="25" rx="20" ry="28" />
        <ellipse cx="25" cy="25" rx="20" ry="28" />
        <text className="endo-inset-label" x="5" y="70" textAnchor="middle">testes</text>
      </g>

      <text className="repro-orientation" x="500" y="660" textAnchor="middle">major endocrine glands</text>
    </g>
  );
}

function HumanDigestiveTemplate() {
  return (
    <g className="spark-diagram-digestive" aria-hidden="true">
      <circle className="digestive-head" cx="500" cy="78" r="48" />
      <path className="digestive-body" d="M420 135Q500 105 580 135Q630 220 610 350Q595 470 555 565H445Q405 470 390 350Q370 220 420 135Z" />
      <path className="digestive-mouth" d="M475 78Q500 92 525 78" />
      <path className="digestive-oesophagus" d="M500 122V245" />
      <path className="digestive-stomach" d="M500 245Q555 230 575 275Q585 325 545 355Q495 365 475 325Q458 285 500 245Z" />
      <path className="digestive-liver" d="M405 235Q465 190 535 220Q525 270 480 292Q430 295 405 265Z" />
      <path className="digestive-gall" d="M455 275Q470 268 478 282Q477 307 458 315Q445 302 455 275Z" />
      <path className="digestive-pancreas" d="M480 350Q540 330 585 350Q550 385 500 380Q485 370 480 350Z" />
      <path className="digestive-small" d="M455 380Q500 350 545 382Q565 405 540 425Q515 440 545 462Q560 480 535 500Q500 520 470 500Q445 482 470 460Q495 442 465 425Q438 410 455 380Z" />
      <path className="digestive-large" d="M420 365Q400 390 405 455Q410 520 455 535M580 365Q600 390 595 455Q590 520 545 535M420 365Q500 340 580 365M455 535Q500 555 545 535" />
      <path className="digestive-rectum" d="M500 535V590" />
      <text className="repro-orientation" x="500" y="612" textAnchor="middle">simplified human digestive system</text>
    </g>
  );
}

function HumanToothTemplate() {
  return (
    <g className="spark-diagram-tooth" aria-hidden="true">
      <path className="tooth-enamel" d="M390 115Q500 55 610 115Q650 175 625 245Q600 300 565 335L555 505Q550 560 505 575Q460 560 455 505L445 335Q400 300 375 245Q350 175 390 115Z" />
      <path className="tooth-dentine" d="M415 135Q500 92 585 135Q615 180 595 235Q575 275 535 310L528 495Q525 525 500 538Q475 525 472 495L465 310Q425 275 405 235Q385 180 415 135Z" />
      <path className="tooth-pulp" d="M465 165Q500 145 535 165Q555 205 530 250Q510 285 510 350V485Q500 505 490 485V350Q490 285 470 250Q445 205 465 165Z" />
      <path className="tooth-gum" d="M250 315Q375 285 445 320Q500 350 555 320Q625 285 750 315V390Q625 365 555 385Q500 405 445 385Q375 365 250 390Z" />
      <line className="tooth-neck-line" x1="355" y1="330" x2="645" y2="330" />
      <path className="tooth-root-vessels" d="M500 485V570M490 500Q470 535 465 570M510 500Q530 535 535 570" />
      <text className="tooth-region-label" x="500" y="80" textAnchor="middle">crown</text>
      <text className="tooth-region-label" x="500" y="610" textAnchor="middle">root in jaw socket</text>
    </g>
  );
}

function HumanRespiratoryTemplate() {
  return (
    <g className="spark-diagram-respiratory" aria-hidden="true">
      <circle className="resp-head" cx="500" cy="78" r="46" />
      <path className="resp-neck" d="M470 118L460 175H540L530 118Z" />
      <path className="resp-ribcage" d="M350 175Q500 125 650 175Q705 285 660 445Q595 515 500 530Q405 515 340 445Q295 285 350 175Z" />
      <path className="resp-trachea" d="M500 112V260" />
      <path className="resp-bronchus left" d="M500 260Q455 275 420 315" />
      <path className="resp-bronchus right" d="M500 260Q545 275 580 315" />
      <path className="resp-lung left" d="M405 215Q340 260 350 380Q365 455 445 465Q475 420 470 330Q465 250 405 215Z" />
      <path className="resp-lung right" d="M595 215Q660 260 650 380Q635 455 555 465Q525 420 530 330Q535 250 595 215Z" />
      <path className="resp-bronchioles left" d="M420 315Q395 335 385 365M425 315Q445 345 448 390M405 335Q380 400 400 430" />
      <path className="resp-bronchioles right" d="M580 315Q605 335 615 365M575 315Q555 345 552 390M595 335Q620 400 600 430" />
      <path className="resp-diaphragm" d="M335 470Q500 405 665 470" />
      <path className="resp-ribs" d="M335 205Q500 155 665 205M325 245Q500 195 675 245M320 290Q500 240 680 290M320 335Q500 285 680 335M325 380Q500 330 675 380M335 425Q500 375 665 425" />
      <text className="repro-orientation" x="500" y="585" textAnchor="middle">simplified human respiratory system</text>
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

function DiagramTemplate({ template }) {
  if (template === "plant-cell") return <PlantCellTemplate />;
  if (template === "animal-cell") return <AnimalCellTemplate />;
  if (template === "light-microscope") return <LightMicroscopeTemplate />;
  if (template === "flower-longitudinal") return <FlowerLongitudinalTemplate />;
  if (template === "bean-seed") return <BeanSeedTemplate />;
  if (template === "female-reproductive-system") return <FemaleReproductiveTemplate />;
  if (template === "male-reproductive-system") return <MaleReproductiveTemplate />;
  if (template === "pregnancy-uterus") return <PregnancyUterusTemplate />;
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
  const targetById = useMemo(
    () => new Map(normalized.targets.map(target => [target.id,target])),
    [normalized.targets]
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

            {normalized.targets.map((target,index) => {
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