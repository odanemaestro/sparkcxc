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
      <rect className="cell-wall" x="250" y="85" width="500" height="430" rx="48" />
      <rect className="cell-membrane" x="270" y="105" width="460" height="390" rx="42" />
      <path className="cytoplasm" d="M300 155c55-35 120-28 180-3 78 32 135-18 207 12 29 13 42 61 20 102-25 45-14 90-18 133-5 54-47 79-99 63-67-21-119 19-182 2-60-16-95-67-77-122 16-49-28-87-20-133 4-22 2-38-11-54z" />
      <ellipse className="vacuole" cx="525" cy="305" rx="150" ry="125" />
      <circle className="nucleus" cx="405" cy="285" r="55" />
      <circle className="nucleolus" cx="392" cy="270" r="17" />
      <g className="chloroplasts">
        <ellipse cx="340" cy="180" rx="32" ry="14" transform="rotate(-20 340 180)" />
        <ellipse cx="650" cy="190" rx="32" ry="14" transform="rotate(18 650 190)" />
        <ellipse cx="335" cy="410" rx="32" ry="14" transform="rotate(20 335 410)" />
        <ellipse cx="665" cy="410" rx="32" ry="14" transform="rotate(-14 665 410)" />
      </g>
      <g className="mitochondria">
        <ellipse cx="655" cy="335" rx="34" ry="18" transform="rotate(-25 655 335)" />
        <path d="M630 337c12-12 23 11 36-2 8-8 15-8 23-2" />
        <ellipse cx="360" cy="350" rx="30" ry="16" transform="rotate(28 360 350)" />
        <path d="M339 349c10-10 20 10 31-1 7-7 13-7 20-2" />
      </g>
      <g className="ribosomes">
        {[0,1,2,3,4,5,6,7].map(i => (
          <circle key={i} cx={455 + (i%4)*28} cy={155 + Math.floor(i/4)*250} r="5" />
        ))}
      </g>
    </g>
  );
}

function AnimalCellTemplate() {
  return (
    <g className="spark-diagram-cell spark-diagram-animal-cell" aria-hidden="true">
      <path className="cell-membrane animal-outline" d="M285 305c-2-116 73-205 183-219 100-13 209 38 244 136 38 107-16 223-111 278-95 56-229 29-291-59-29-41-26-88-25-136z" />
      <path className="cytoplasm animal-cytoplasm" d="M305 304c0-102 67-180 167-194 88-12 186 33 217 119 33 94-15 197-101 246-84 49-202 25-256-52-25-36-28-77-27-119z" />
      <circle className="nucleus" cx="460" cy="300" r="70" />
      <circle className="nucleolus" cx="443" cy="281" r="19" />
      <ellipse className="vacuole small-vacuole" cx="590" cy="245" rx="47" ry="30" />
      <g className="mitochondria">
        <ellipse cx="610" cy="350" rx="38" ry="20" transform="rotate(-24 610 350)" />
        <path d="M581 351c13-12 25 11 39-2 9-8 17-8 26-2" />
        <ellipse cx="375" cy="410" rx="34" ry="18" transform="rotate(27 375 410)" />
        <path d="M350 409c12-10 23 10 35-1 8-7 15-7 23-2" />
      </g>
      <g className="ribosomes">
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <circle key={i} cx={345 + (i%3)*116} cy={190 + Math.floor(i/3)*95} r="5" />
        ))}
      </g>
    </g>
  );
}

function LightMicroscopeTemplate() {
  return (
    <g className="spark-diagram-microscope" aria-hidden="true">
      <rect className="microscope-base" x="330" y="485" width="360" height="44" rx="20" />
      <path className="microscope-arm" d="M550 155c95 85 92 222 25 310h-85c65-83 64-191-18-258z" />
      <rect className="microscope-body" x="405" y="115" width="100" height="105" rx="18" transform="rotate(-18 455 168)" />
      <rect className="microscope-eyepiece" x="395" y="62" width="92" height="48" rx="10" transform="rotate(-18 441 86)" />
      <circle className="microscope-nosepiece" cx="492" cy="232" r="32" />
      <rect className="microscope-objective" x="456" y="245" width="24" height="90" rx="8" transform="rotate(-8 468 290)" />
      <rect className="microscope-objective" x="493" y="245" width="24" height="78" rx="8" transform="rotate(8 505 284)" />
      <rect className="microscope-stage" x="315" y="340" width="310" height="34" rx="8" />
      <line className="microscope-stage-clip" x1="350" y1="332" x2="435" y2="332" />
      <line className="microscope-stage-clip" x1="505" y1="332" x2="590" y2="332" />
      <circle className="microscope-light" cx="470" cy="430" r="40" />
      <circle className="microscope-focus" cx="590" cy="260" r="28" />
      <circle className="microscope-focus fine" cx="630" cy="285" r="18" />
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

function DiagramTemplate({ template }) {
  if (template === "plant-cell") return <PlantCellTemplate />;
  if (template === "animal-cell") return <AnimalCellTemplate />;
  if (template === "light-microscope") return <LightMicroscopeTemplate />;
  if (template === "flower-longitudinal") return <FlowerLongitudinalTemplate />;
  if (template === "bean-seed") return <BeanSeedTemplate />;
  if (template === "female-reproductive-system") return <FemaleReproductiveTemplate />;
  if (template === "male-reproductive-system") return <MaleReproductiveTemplate />;
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