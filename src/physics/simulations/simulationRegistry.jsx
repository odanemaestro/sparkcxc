import React, { Suspense, lazy } from 'react';
import './core/physicsSimulations.css';

// Maps existing SPARK interactive IDs to animated virtual-lab simulations.
// Each simulation is lazy-loaded so that sections keep their code splitting,
// and every simulation reuses the existing build…Model physics functions.
const wrap = (loader, props = {}) => {
  const Lazy = lazy(loader);
  return p => <Lazy {...props} {...p} />;
};

export const PHYSICS_SIMULATIONS = {
  // A Mechanics
  'a2-resultant': wrap(() => import('./mechanics/VectorSim.jsx'), { mode: 'resultant' }),
  'a2-components': wrap(() => import('./mechanics/VectorSim.jsx'), { mode: 'components' }),
  'a3-moment': wrap(() => import('./mechanics/MomentBeamSim.jsx')),
  'a4-motion': wrap(() => import('./mechanics/MotionTrackSim.jsx')),
  'a4-newton': wrap(() => import('./mechanics/ForceBodySim.jsx')),
  'a5-energy': wrap(() => import('./mechanics/EnergyRampSim.jsx')),
  'a6-pressure': wrap(() => import('./mechanics/PressureSim.jsx'), { mode: 'hydraulic' }),
  'a6-depth': wrap(() => import('./mechanics/PressureSim.jsx'), { mode: 'depth' }),
  // D Electricity
  'd4-ohms-law': wrap(() => import('./electricity/OhmsLawSim.jsx')),
  'd4-series-parallel': wrap(() => import('./electricity/CircuitBuilderSim.jsx')),
  'd7-current-field': wrap(() => import('./electricity/ElectromagnetismSim.jsx')),
  // C Waves and Optics · Batch 1
  'c1-wave-builder': wrap(() => import('./waves/WaveBuilderSim.jsx')),
  'c1-wave-graphs': wrap(() => import('./waves/WaveGraphSim.jsx')),
  'c2-echo-ranging': wrap(() => import('./waves/EchoRangingSim.jsx')),
  'c2-pitch-loudness': wrap(() => import('./waves/PitchLoudnessSim.jsx')),
  // C Waves and Optics · Batch 2
  'c3-em-spectrum': wrap(() => import('./waves/EMSpectrumSim.jsx')),
  'c4-reflection': wrap(() => import('./waves/ReflectionSim.jsx')),
  'c4-refraction': wrap(() => import('./waves/RefractionSim.jsx')),
  'c4-total-internal-reflection': wrap(() => import('./waves/TIRSim.jsx')),
  'c4-double-slit': wrap(() => import('./waves/DoubleSlitSim.jsx')),
  // C Waves and Optics · Batch 3
  'c5-lens-rays': wrap(() => import('./waves/LensRaySim.jsx')),
  'c5-focal-length': wrap(() => import('./waves/FocalLengthSim.jsx')),
  // B Thermal Physics · Batch 1
  'b1-joule-work-heat': wrap(() => import('./thermal/JouleHeatSim.jsx')),
  'b2-gas-laws': wrap(() => import('./thermal/GasLawsSim.jsx')),
  'b2-kelvin-extrapolation': wrap(() => import('./thermal/KelvinExtrapolationSim.jsx')),
  'b2-expansion': wrap(() => import('./thermal/ThermalExpansionSim.jsx')),
  'b3-heating-curve': wrap(() => import('./thermal/HeatingCurveSim.jsx')),
  // B Thermal Physics · Batch 2
  'b3-specific-heat': wrap(() => import('./thermal/SpecificHeatSim.jsx')),
  'b3-latent-heat': wrap(() => import('./thermal/LatentHeatSim.jsx')),
  'b4-radiation-surfaces': wrap(() => import('./thermal/RadiationSurfacesSim.jsx')),
  'b4-convection': wrap(() => import('./thermal/ConvectionSim.jsx')),
  // E The Physics of the Atom · Batch 1
  'e1-scattering': wrap(() => import('./atomic/RutherfordScatteringSim.jsx')),
  'e2-atom-builder': wrap(() => import('./atomic/AtomBuilderSim.jsx')),
  'e2-isotope-builder': wrap(() => import('./atomic/IsotopeExplorerSim.jsx')),
  'e3-radiation-properties': wrap(() => import('./atomic/RadiationPropertiesSim.jsx')),
  'e3-field-deflection': wrap(() => import('./atomic/FieldDeflectionSim.jsx')),

  // E The Physics of the Atom · Batch 2
  'e3-nuclear-equations': wrap(() => import('./atomic/NuclearEquationSim.jsx')),
  'e3-random-decay': wrap(() => import('./atomic/RandomDecaySim.jsx')),
  'e3-half-life': wrap(() => import('./atomic/HalfLifeSim.jsx')),
  'e3-mass-energy': wrap(() => import('./atomic/MassEnergySim.jsx')),
  'e3-nuclear-energy-balance': wrap(() => import('./atomic/NuclearEnergyBalanceSim.jsx')),

};

export const hasSimulation = id => Object.prototype.hasOwnProperty.call(PHYSICS_SIMULATIONS, id);

export function PhysicsSimulationSlot({ interactiveId, onEvidence }) {
  const Sim = PHYSICS_SIMULATIONS[interactiveId];
  if (!Sim) return null;
  const simulationEvidence = payload => onEvidence?.({
    ...payload,
    source: 'physics_virtual_simulation',
  });
  return (
    <Suspense fallback={<div className="psim" role="status">Loading virtual lab…</div>}>
      <Sim onEvidence={simulationEvidence} />
    </Suspense>
  );
}
