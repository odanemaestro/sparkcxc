const fs=require('fs'),path=require('path'),source=(...p)=>fs.readFileSync(path.join(__dirname,...p),'utf8');

describe('Physics Atomic Batch 2 integration',()=>{
  const registry=source('simulationRegistry.jsx');
  const section=source('..','atomic','components','PhysicsAtomicSection.jsx');
  const wrapper=source('..','atomic','components','AtomicInteractiveLab.jsx');

  test('all five Atomic Batch 2 simulations are lazy registered',()=>{
    for(const id of['e3-nuclear-equations','e3-random-decay','e3-half-life','e3-mass-energy','e3-nuclear-energy-balance']){
      expect(registry).toContain(`'${id}'`);
    }
  });

  test('all ten Section E interactives now have upgraded simulations',()=>{
    for(const id of['e1-scattering','e2-atom-builder','e2-isotope-builder','e3-radiation-properties','e3-field-deflection','e3-nuclear-equations','e3-random-decay','e3-half-life','e3-mass-energy','e3-nuclear-energy-balance']){
      expect(registry).toContain(`'${id}'`);
    }
  });

  test('Atomic wrapper replaces legacy interactives when a simulation exists',()=>{
    expect(wrapper).toContain('hasSimulation(interactiveId)');
    expect(wrapper).toContain('PhysicsSimulationSlot');
  });

  test('Section E retains automatic task-gated progress',()=>{
    expect(section).toContain("payload?.source === 'physics_virtual_simulation'");
    expect(section).toContain("payload?.result === 'completed'");
    expect(section).toContain('setPhysicsAtomicCompletion');
  });
});
