const fs=require('fs'),path=require('path'),source=(...p)=>fs.readFileSync(path.join(__dirname,...p),'utf8');
describe('Physics Thermal Batch 2 integration',()=>{
 const registry=source('simulationRegistry.jsx'),section=source('..','thermal','components','PhysicsThermalSection.jsx');
 test('all four Batch 2 Thermal simulations are lazy registered',()=>{for(const id of['b3-specific-heat','b3-latent-heat','b4-radiation-surfaces','b4-convection'])expect(registry).toContain(`'${id}'`);});
 test('all nine Thermal interactives now have upgraded simulations',()=>{for(const id of['b1-joule-work-heat','b2-gas-laws','b2-kelvin-extrapolation','b2-expansion','b3-heating-curve','b3-specific-heat','b3-latent-heat','b4-radiation-surfaces','b4-convection'])expect(registry).toContain(`'${id}'`);});
 test('Section B retains automatic task-gated progress',()=>{expect(section).toContain("payload?.source==='physics_virtual_simulation'");expect(section).toContain("payload?.result==='completed'");expect(section).toContain('setPhysicsThermalCompletion');});
});
