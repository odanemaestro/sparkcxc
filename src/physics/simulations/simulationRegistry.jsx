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
