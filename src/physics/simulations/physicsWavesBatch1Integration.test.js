const fs = require('fs');
const path = require('path');

function source(...parts) {
  return fs.readFileSync(path.join(__dirname, ...parts), 'utf8');
}

describe('Physics Waves Batch 1 integration', () => {
  const registry = source('simulationRegistry.jsx');
  const wrapper = source('..', 'waves', 'components', 'WavesInteractiveLab.jsx');
  const section = source('..', 'waves', 'components', 'PhysicsWavesSection.jsx');

  test('all four C1/C2 simulations are lazy registered', () => {
    for (const id of ['c1-wave-builder','c1-wave-graphs','c2-echo-ranging','c2-pitch-loudness']) {
      expect(registry).toContain(`'${id}'`);
    }
  });

  test('upgraded Waves labs replace the old interactive', () => {
    expect(wrapper).toContain('hasSimulation(interactiveId)');
    expect(wrapper).toMatch(/hasSimulation\(interactiveId\)[\s\S]*PhysicsSimulationSlot[\s\S]*:\s*<Component/);
  });

  test('upgraded Waves labs auto-complete through the existing Section C progress path', () => {
    expect(section).toContain("setPhysicsWavesCompletion");
    expect(section).toContain("type:'physics_lab_completion'");
    expect(section).toContain("payload?.source === 'physics_virtual_simulation'");
    expect(section).toContain("payload?.result === 'completed'");
    expect(section).toContain("Virtual experiment in progress");
  });

  test('non-upgraded Waves labs retain manual completion', () => {
    expect(section).toContain("Mark lab explored");
    expect(section).toContain("upgraded ? <div className=\"pm-completion\">");
  });
});
