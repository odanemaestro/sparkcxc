// Physics simulation regression tests.
//
// Written for SPARK's existing react-scripts / Jest setup: no test-runner
// imports, Jest globals only, so these run with
//   npm test -- --watchAll=false
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { momentsBalanced, angleWithin, distinctValueCount, observedInAll, changedEnough } from './core/taskGate.js';
import { PHYSICS_SIMULATIONS, hasSimulation } from './simulationRegistry.jsx';
import { MECHANICS_INTERACTIVES } from '../mechanics/interactives/mechanicsInteractiveRegistry.mjs';
import { ELECTRICITY_INTERACTIVES } from '../electricity/interactives/dElectricityInteractiveRegistry.mjs';
import { buildVectorResultantModel } from '../mechanics/interactives/a2InteractiveModels.mjs';
import { buildUniformAccelerationModel } from '../mechanics/interactives/a4InteractiveModels.mjs';
import { buildRampRunModel } from '../mechanics/interactives/a5InteractiveModels.mjs';
import { buildHydraulicPressModel } from '../mechanics/interactives/a6InteractiveModels.mjs';
import { buildOhmModel, buildNetworkModel, buildTwoLampCircuitModel } from '../electricity/interactives/dElectricityInteractiveModels.mjs';
import VectorSim from './mechanics/VectorSim.jsx';
import MomentBeamSim from './mechanics/MomentBeamSim.jsx';
import OhmsLawSim from './electricity/OhmsLawSim.jsx';
import CircuitBuilderSim from './electricity/CircuitBuilderSim.jsx';
import ElectromagnetismSim from './electricity/ElectromagnetismSim.jsx';
import MechanicsInteractiveLab from '../mechanics/components/MechanicsInteractiveLab.jsx';
import { WAVES_INTERACTIVES } from '../waves/interactives/cWavesInteractiveRegistry.mjs';
import { THERMAL_INTERACTIVES } from '../thermal/interactives/bThermalInteractiveRegistry.mjs';
import { ATOMIC_INTERACTIVES } from '../atomic/interactives/eAtomicInteractiveRegistry.mjs';

describe('task-gate helpers contain task logic only', () => {
  it('judges balanced moments within tolerance', () => {
    expect(momentsBalanced({ clockwise: 6, anticlockwise: 6 })).toBe(true);
    expect(momentsBalanced({ clockwise: 6, anticlockwise: 5 })).toBe(false);
  });
  it('counts only genuinely different readings', () => {
    expect(distinctValueCount([2, 2, 2, 2, 2], 1)).toBe(1);
    expect(distinctValueCount([2, 4, 6, 8, 10], 1)).toBe(5);
  });
  it('requires an observation in every configuration', () => {
    expect(observedInAll(['series'], ['series', 'parallel'])).toBe(false);
    expect(observedInAll(new Set(['series', 'parallel']), ['series', 'parallel'])).toBe(true);
  });
  it('checks angle tolerance and minimum change', () => {
    expect(angleWithin(61, 60, 2)).toBe(true);
    expect(angleWithin(63, 60, 2)).toBe(false);
    expect(changedEnough(5, 6, 1)).toBe(true);
    expect(changedEnough(5, 5.5, 1)).toBe(false);
  });
});

describe('the Physics model layer stays the source of truth', () => {
  it('uniform acceleration follows v = u + at and s = ut + ½at²', () => {
    const m = buildUniformAccelerationModel({ initialVelocityMPerS: 2, accelerationMPerS2: -1, timeS: 4 });
    expect(m.velocityMPerS).toBeCloseTo(-2);
    expect(m.displacementM).toBeCloseTo(0);
  });
  it('gives a real travel time down a ramp, not a 0–1 progress value', () => {
    // 5 m drop on a 10 m slope: a = g sinθ = 5 m s⁻², so t = √(2 × 10/5) = 2 s.
    const r = buildRampRunModel({ massKg: 2, dropM: 5, rampLengthM: 10, frictionFraction: 0, timeS: 2 });
    expect(r.travelTimeS).toBeCloseTo(2);
    expect(r.finalSpeedMPerS).toBeCloseTo(10);
    expect(r.fractionOfRamp).toBeCloseTo(1);
    // Friction lowers the acceleration, so the same ramp takes longer.
    expect(buildRampRunModel({ dropM: 5, rampLengthM: 10, frictionFraction: 0.5 }).travelTimeS).toBeGreaterThan(2);
  });
  it('multiplies force in the hydraulic press and divides the distance', () => {
    const h = buildHydraulicPressModel({ forceN: 50, effortAreaM2: 0.002, loadAreaM2: 0.02, effortStrokeM: 0.1 });
    expect(h.loadForceN).toBeCloseTo(500);
    expect(h.forceMultiplier).toBeCloseTo(10);
    expect(h.loadStrokeM).toBeCloseTo(0.01);
  });
  it('applies the series and parallel rules to the two-lamp circuit', () => {
    const s = buildTwoLampCircuitModel({ emfV: 6, r1: 6, r2: 3, mode: 'series' });
    expect(s.totalCurrentA).toBeCloseTo(6 / 9);
    expect(s.lamp1.voltageV + s.lamp2.voltageV).toBeCloseTo(6);
    const p = buildTwoLampCircuitModel({ emfV: 6, r1: 6, r2: 3, mode: 'parallel' });
    expect(p.totalCurrentA).toBeCloseTo(3);
    expect(p.totalResistanceOhm).toBeCloseTo(buildNetworkModel({ r1: 6, r2: 3, mode: 'parallel' }).equivalentOhm);
    expect(buildTwoLampCircuitModel({ emfV: 6, r1: 6, r2: 3, mode: 'series', switchClosed: false }).totalCurrentA).toBe(0);
    // Removing a lamp: series breaks the only path, parallel keeps lamp 1 lit.
    expect(buildTwoLampCircuitModel({ emfV: 6, r1: 6, r2: 3, mode: 'series', removedLamp: true }).openCircuit).toBe(true);
    expect(buildTwoLampCircuitModel({ emfV: 6, r1: 6, r2: 3, mode: 'parallel', removedLamp: true }).lamp1.currentA).toBeCloseTo(1);
  });
});

describe('simulation registry integrity', () => {
  it('every simulation id exists in the SPARK Physics registries', () => {
    const known = new Set([
      ...MECHANICS_INTERACTIVES,
      ...ELECTRICITY_INTERACTIVES,
      ...WAVES_INTERACTIVES,
      ...THERMAL_INTERACTIVES,
      ...ATOMIC_INTERACTIVES,
    ].map(i => i.id));
    for (const id of Object.keys(PHYSICS_SIMULATIONS)) expect(known.has(id)).toBe(true);
    expect(Object.keys(PHYSICS_SIMULATIONS)).toHaveLength(41);
    expect(hasSimulation('a2-resultant')).toBe(true);
    expect(hasSimulation('a1-pendulum')).toBe(false);
  });
});

describe('VectorSim', () => {
  it('locks the experiment until a prediction is made, then reports the resultant from the existing model', () => {
    render(<VectorSim mode="resultant" />);
    expect(screen.getAllByText(/Predict/i).length).toBeGreaterThan(0);
    expect(document.querySelector('.psim-experiment-body')).toHaveAttribute('inert');
    fireEvent.click(screen.getByRole('button', { name: 'A + B' }));
    expect(document.querySelector('.psim-experiment-body')).not.toHaveAttribute('inert');
    const expected = buildVectorResultantModel({ firstMagnitude: 30, firstAngle: 0, secondMagnitude: 20, secondAngle: 55, method: 'triangle' }).resultant.magnitude;
    expect(screen.getAllByText(new RegExp(`${expected.toFixed(1)} N`)).length).toBeGreaterThan(0);
  });
  it('supports keyboard control of the vector handle', () => {
    render(<VectorSim mode="components" />);
    fireEvent.click(screen.getByRole('button', { name: 'It decreases' }));
    const handle = screen.getByRole('slider', { name: 'Vector tip' });
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(handle.getAttribute('aria-valuetext')).toMatch(/1 degrees/);
  });
});

describe('MomentBeamSim', () => {
  it('emits evidence through the existing callback once the beam balances', () => {
    const onEvidence = jest.fn();
    render(<MomentBeamSim onEvidence={onEvidence} />);
    fireEvent.click(screen.getByRole('button', { name: /0.3 m from the pivot/i }));
    const slider = label => document.getElementById(label);
    fireEvent.change(slider('mb-rf'), { target: { value: '20' } });
    fireEvent.change(slider('mb-rx'), { target: { value: '0.3' } });
    expect(onEvidence).toHaveBeenCalledWith(expect.objectContaining({ objective: 'A3.7' }));
  });
});

describe('OhmsLawSim', () => {
  it('reads the current from the existing Ohm model and needs five different p.d.s', () => {
    render(<OhmsLawSim />);
    fireEvent.click(screen.getByRole('button', { name: 'double' }));
    expect(screen.getByText(/actual circuit current I = 0 A/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('switch', { name: /Switch open/i }));
    const expected = buildOhmModel({ voltageV: 6, resistanceOhm: 12 }).currentA;
    // Readouts split values across elements, so match on normalised text.
    expect(document.body.textContent.replace(/\s+/g, ' ')).toContain(`${Number(expected.toFixed(2))} A`);
    // Five recordings of the same p.d. must not tick the task off.
    for (let k = 0; k < 5; k++) fireEvent.click(screen.getByRole('button', { name: /Record reading/i }));
    const readingsTask = screen.getByText(/Record at least five/i).closest('li');
    expect(readingsTask.className).not.toMatch(/done/);
    const vSlider = screen.getByRole('slider', { name: /Battery p.d./i });
    for (const v of [8, 10, 12, 14]) {
      fireEvent.change(vSlider, { target: { value: String(v) } });
      fireEvent.click(screen.getByRole('button', { name: /Record reading/i }));
    }
    expect(screen.getByText(/Record at least five/i).closest('li').className).toMatch(/done/);
  });
});

describe('CircuitBuilderSim', () => {
  it('needs lamp removal observed in both series and parallel', () => {
    render(<CircuitBuilderSim />);
    fireEvent.click(screen.getByRole('button', { name: 'brighter' }));
    expect(screen.getByText(/Switch open → I = 0 A/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('switch', { name: /Switch open/i }));
    fireEvent.click(screen.getByRole('switch', { name: /Lamp 2 removed/i }));
    expect(screen.getByText(/open circuit → I = 0 A/i)).toBeInTheDocument();
    const removeTask = () => screen.getByText(/remove lamp 2 in BOTH/i).closest('li');
    expect(removeTask().className).not.toMatch(/done/);
    fireEvent.click(screen.getByRole('button', { name: 'Parallel' }));
    expect(removeTask().className).toMatch(/done/);
  });
});

describe('ElectromagnetismSim', () => {
  it('only counts a reversal made while the current is switched on', () => {
    render(<ElectromagnetismSim />);
    fireEvent.click(screen.getByRole('button', { name: /all reverse direction/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Reversed' }));
    const reverseTask = () => screen.getByText(/Reverse the current direction/i).closest('li');
    expect(reverseTask().className).not.toMatch(/done/);
    fireEvent.click(screen.getByRole('switch', { name: /Current off/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Forward' }));
    expect(reverseTask().className).toMatch(/done/);
  });
});

describe('existing Mechanics lab still renders unchanged', () => {
  it('renders a lab without a simulation exactly as before', () => {
    render(<MechanicsInteractiveLab interactiveId="a1-pendulum" />);
    expect(document.querySelectorAll('.psim').length).toBe(0);
  });
});
