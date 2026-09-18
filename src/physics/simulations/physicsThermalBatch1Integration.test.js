const fs=require('fs');const path=require('path');const source=(...p)=>fs.readFileSync(path.join(__dirname,...p),'utf8');
describe('Physics Thermal Batch 1 integration',()=>{
  const registry=source('simulationRegistry.jsx'),wrapper=source('..','thermal','components','ThermalInteractiveLab.jsx'),section=source('..','thermal','components','PhysicsThermalSection.jsx');
  test('all five Batch 1 Thermal simulations are lazy registered',()=>{for(const id of ['b1-joule-work-heat','b2-gas-laws','b2-kelvin-extrapolation','b2-expansion','b3-heating-curve'])expect(registry).toContain(`'${id}'`);});
  test('upgraded Thermal labs replace legacy interactives',()=>{expect(wrapper).toContain('hasSimulation(interactiveId)');expect(wrapper).toContain('PhysicsSimulationSlot');});
  test('upgraded Thermal labs auto-complete through Section B progress',()=>{expect(section).toContain('setPhysicsThermalCompletion');expect(section).toContain("type:'physics_lab_completion'");expect(section).toContain("payload?.source==='physics_virtual_simulation'");expect(section).toContain("payload?.result==='completed'");});
  test('remaining Thermal labs stay manual until Batch 2',()=>{for(const id of ['b3-specific-heat','b3-latent-heat','b4-radiation-surfaces','b4-convection'])expect(registry).not.toContain(`'${id}': wrap`);expect(section).toContain('Mark lab explored');});
});
