import React, { useMemo, useState } from 'react';
import {
  SimFrame,
  SimSlider,
  Readouts,
  LiveText,
  fmt,
  useDerivedTasks,
  useTaskChecklist,
} from '../core/SimKit';
import { buildLensRayModel } from '../../waves/interactives/cWavesInteractiveModels.mjs';

const W = 760;
const H = 370;
const CX = W / 2;
const CY = 188;
const HALF = 315;
const OBJECT_H = 72;

function arrowHeadPath(x, baseY, tipY, direction = 'up') {
  const tip = tipY;
  const shoulder = direction === 'up' ? tip + 12 : tip - 12;
  return `M ${x} ${baseY} L ${x} ${tip} M ${x-8} ${shoulder} L ${x} ${tip} L ${x+8} ${shoulder}`;
}

function rayToRightEdge(x1, y1, throughX, throughY) {
  const dx = throughX - x1;
  const dy = throughY - y1;
  const t = (CX + HALF - x1) / dx;
  return { x:CX + HALF, y:y1 + dy * t };
}

export default function LensRaySim({ onEvidence }) {
  const [focalLength, setFocalLength] = useState(12);
  const [objectDistance, setObjectDistance] = useState(36);
  const [regionsSeen, setRegionsSeen] = useState(() => new Set(['beyond2f']));
  const { done, mark } = useTaskChecklist();

  const model = useMemo(
    () => buildLensRayModel({ focalLengthCm:focalLength, objectDistanceCm:objectDistance }),
    [focalLength, objectDistance]
  );

  const finiteImage = Number.isFinite(model.signedImageDistanceCm);
  const maxDistance = Math.max(
    objectDistance,
    2 * focalLength,
    finiteImage ? Math.abs(model.signedImageDistanceCm) : 4 * focalLength,
    24
  );
  const scale = Math.min(9.2, HALF / (maxDistance * 1.08));
  const xObject = CX - objectDistance * scale;
  const xFLeft = CX - focalLength * scale;
  const xFRight = CX + focalLength * scale;
  const x2FLeft = CX - 2 * focalLength * scale;
  const x2FRight = CX + 2 * focalLength * scale;
  const yObjectTop = CY - OBJECT_H;

  const imageHeight = finiteImage
    ? Math.min(118, Math.max(24, OBJECT_H * Math.abs(model.signedMagnification)))
    : 118;
  const xImage = finiteImage ? CX + model.signedImageDistanceCm * scale : CX + HALF;
  const imageUpright = model.orientation === 'upright';
  const yImageTip = imageUpright ? CY - imageHeight : CY + imageHeight;

  // Principal ray 1: parallel to principal axis, then through far focus.
  const parallelLensPoint = { x:CX, y:yObjectTop };
  const parallelOut = rayToRightEdge(CX, yObjectTop, xFRight, CY);

  // Principal ray 2: through optical centre, undeviated.
  const centreOut = rayToRightEdge(xObject, yObjectTop, CX, CY);

  const region =
    objectDistance > 2 * focalLength + .2 ? 'beyond2f' :
    Math.abs(objectDistance - 2 * focalLength) <= .2 ? 'at2f' :
    objectDistance > focalLength + .2 ? 'between' :
    Math.abs(objectDistance - focalLength) <= .2 ? 'atf' :
    'inside';

  useDerivedTasks(mark, {
    beyond: regionsSeen.has('beyond2f'),
    between: regionsSeen.has('between'),
    inside: regionsSeen.has('inside'),
  });

  const setObject = value => {
    setObjectDistance(value);
    const nextRegion =
      value > 2 * focalLength + .2 ? 'beyond2f' :
      value > focalLength + .2 ? 'between' :
      value < focalLength - .2 ? 'inside' :
      Math.abs(value - 2 * focalLength) <= .2 ? 'at2f' : 'atf';
    setRegionsSeen(previous => new Set(previous).add(nextRegion));
  };

  const preset = kind => {
    const next =
      kind === 'beyond2f' ? Math.min(60, 2.7 * focalLength) :
      kind === 'between' ? 1.5 * focalLength :
      kind === 'inside' ? 0.65 * focalLength :
      2 * focalLength;
    setObject(next);
  };

  const tasks = [
    { id:'beyond', label:'Observe an object beyond 2F.' },
    { id:'between', label:'Observe an object between F and 2F.' },
    { id:'inside', label:'Place the object inside F and identify the virtual image.' },
  ];

  const observation = model.imageType === 'at infinity'
    ? 'With the object at the principal focus, the emerging rays are parallel and the image is effectively at infinity.'
    : `The image is ${model.imageType}, ${model.orientation} and ${model.size}. Image distance = ${fmt(model.imageDistanceCm, 1)} cm; magnification = ${fmt(model.magnification, 2)}.`;

  return (
    <SimFrame
      title="Converging lens ray diagram"
      intro="Move an object relative to F and 2F and watch the principal rays construct the image."
      prediction={{
        question:'An object placed inside the focal length of a converging lens forms an image that is…',
        options:[
          { id:'virtual', label:'virtual, upright and magnified' },
          { id:'real', label:'real, inverted and diminished' },
          { id:'same', label:'real, upright and same size' },
        ],
        answer:'virtual',
      }}
      tasks={tasks}
      done={done}
      observation={observation}
      explanation={<p>A converging lens forms different images depending on object position. Beyond 2F the image is real, inverted and diminished. Between F and 2F it is real, inverted and magnified. Inside F the emerging rays diverge and their backward extensions form a <strong>virtual, upright, magnified</strong> image.</p>}
      onComplete={() => onEvidence?.({ result:'completed', tasks:tasks.map(task => task.id) })}
    >
      <div className="psim-lens-presets" role="group" aria-label="Object position presets">
        <button type="button" className={region === 'beyond2f' ? 'active' : ''} onClick={() => preset('beyond2f')}>Beyond 2F</button>
        <button type="button" className={region === 'at2f' ? 'active' : ''} onClick={() => preset('at2f')}>At 2F</button>
        <button type="button" className={region === 'between' ? 'active' : ''} onClick={() => preset('between')}>Between F and 2F</button>
        <button type="button" className={region === 'inside' ? 'active' : ''} onClick={() => preset('inside')}>Inside F</button>
      </div>

      <div className="psim-controls">
        <SimSlider id="c5-lens-f" label="Focal length" value={focalLength} min={8} max={20} step={1} unit=" cm" dp={0} onChange={value => { setFocalLength(value); setRegionsSeen(new Set()); }}/>
        <SimSlider id="c5-lens-u" label="Object distance" value={objectDistance} min={5} max={60} step={1} unit=" cm" dp={0} onChange={setObject}/>
      </div>

      <svg className="psim-lens-stage" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Converging lens ray diagram. Object distance ${fmt(objectDistance,1)} centimetres. ${observation}`}>
        <line className="psim-principal-axis" x1="28" y1={CY} x2={W-28} y2={CY}/>
        <path className="psim-lens-shape" d={`M ${CX} 46 C ${CX-28} 92 ${CX-28} 284 ${CX} 330 C ${CX+28} 284 ${CX+28} 92 ${CX} 46 Z`}/>
        <line className="psim-lens-centre" x1={CX} y1="48" x2={CX} y2="328"/>

        {[xFLeft,xFRight].map((x,index) => <g key={index}><line className="psim-focus-tick" x1={x} y1={CY-8} x2={x} y2={CY+8}/><text className="psim-lens-label" x={x} y={CY+26} textAnchor="middle">F</text></g>)}
        {[x2FLeft,x2FRight].map((x,index) => <g key={index}><line className="psim-focus-tick" x1={x} y1={CY-8} x2={x} y2={CY+8}/><text className="psim-lens-label" x={x} y={CY+26} textAnchor="middle">2F</text></g>)}

        <path className="psim-object-arrow" d={arrowHeadPath(xObject, CY, yObjectTop, 'up')}/>
        <text className="psim-lens-label" x={xObject} y={yObjectTop-12} textAnchor="middle">object</text>

        <polyline className="psim-principal-ray ray-one" points={`${xObject},${yObjectTop} ${CX},${yObjectTop} ${parallelOut.x},${parallelOut.y}`}/>
        <line className="psim-principal-ray ray-two" x1={xObject} y1={yObjectTop} x2={centreOut.x} y2={centreOut.y}/>

        {finiteImage && model.imageType === 'real' && (
          <>
            <path className="psim-image-arrow real" d={arrowHeadPath(xImage, CY, yImageTip, 'down')}/>
            <text className="psim-lens-label" x={xImage} y={Math.min(H-20, yImageTip+22)} textAnchor="middle">real image</text>
          </>
        )}

        {finiteImage && model.imageType === 'virtual' && (
          <>
            <line className="psim-virtual-extension" x1={CX} y1={yObjectTop} x2={xImage} y2={yImageTip}/>
            <line className="psim-virtual-extension" x1={CX} y1={CY} x2={xImage} y2={yImageTip}/>
            <path className="psim-image-arrow virtual" d={arrowHeadPath(xImage, CY, yImageTip, 'up')}/>
            <text className="psim-lens-label" x={xImage} y={Math.max(22, yImageTip-12)} textAnchor="middle">virtual image</text>
          </>
        )}

        {!finiteImage && <text className="psim-lens-label" x={W-160} y="62">rays emerge parallel → image at infinity</text>}
      </svg>

      <Readouts items={[
        ['Image type', model.imageType, 'good'],
        ['Orientation', model.orientation],
        ['Size', model.size],
        ['Image distance', Number.isFinite(model.imageDistanceCm) ? `${fmt(model.imageDistanceCm, 1)} cm` : '∞'],
        ['Magnification', Number.isFinite(model.magnification) ? fmt(model.magnification, 2) : '∞'],
      ]}/>
      <div className="psim-equation">1/f = 1/u + 1/v</div>
      <LiveText>{observation}</LiveText>
    </SimFrame>
  );
}
