const fs=require('fs'),path=require('path');
const source=(...p)=>fs.readFileSync(path.join(__dirname,...p),'utf8');

describe('Physics Atomic Batch 1 integration',()=>{
  const registry=source('simulationRegistry.jsx');
  const wrapper=source('..','atomic','components','AtomicInteractiveLab.jsx');
  const section=source('..','atomic','components','PhysicsAtomicSection.jsx');

  test('all five Batch 1 Atomic simulations are lazy registered',()=>{
    for(const id of['e1-scattering','e2-atom-builder','e2-isotope-builder','e3-radiation-properties','e3-field-deflection']){
      expect(registry).toContain(`'${id}'`);
    }
  });

  test('upgraded Atomic labs replace legacy interactives',()=>{
    expect(wrapper).toContain('hasSimulation(interactiveId)');
    expect(wrapper).toContain('PhysicsSimulationSlot');
  });

  test('upgraded Atomic labs auto-complete through Section E progress',()=>{
    expect(section).toContain('setPhysicsAtomicCompletion');
    expect(section).toContain("type:'physics_lab_completion'");
    expect(section).toContain("payload?.source === 'physics_virtual_simulation'");
    expect(section).toContain("payload?.result === 'completed'");
  });
  test('Atomic Batch 2 upgrades the remaining Atomic labs',()=>{
    for(const id of ['e3-nuclear-equations','e3-random-decay','e3-half-life','e3-mass-energy','e3-nuclear-energy-balance']){
      expect(registry).toContain(`'${id}': wrap`);
    }
  });
});
