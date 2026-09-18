const fs = require('fs');
const path = require('path');

function source(...parts) {
  return fs.readFileSync(path.join(__dirname, ...parts), 'utf8');
}

describe('Physics Waves Batch 2 integration', () => {
  const registry = source('simulationRegistry.jsx');
  const wrapper = source('..', 'waves', 'components', 'WavesInteractiveLab.jsx');
  const section = source('..', 'waves', 'components', 'PhysicsWavesSection.jsx');

  test('all five C3/C4 simulations are lazy registered', () => {
    for (const id of ['c3-em-spectrum','c4-reflection','c4-refraction','c4-total-internal-reflection','c4-double-slit']) {
      expect(registry).toContain(`'${id}'`);
    }
  });

  test('Batch 2 uses the same replacement architecture as Batch 1', () => {
    expect(wrapper).toContain('hasSimulation(interactiveId)');
    expect(wrapper).toContain('PhysicsSimulationSlot');
  });

  test('Batch 2 automatically completes through the existing Waves progress flow', () => {
    expect(section).toContain("setPhysicsWavesCompletion");
    expect(section).toContain("type:'physics_lab_completion'");
    expect(section).toContain("payload?.source === 'physics_virtual_simulation'");
    expect(section).toContain("payload?.result === 'completed'");
  });

  test('C5 labs remain legacy/manual until Batch 3', () => {
    expect(registry).not.toContain("'c5-lens-rays': wrap");
    expect(registry).not.toContain("'c5-focal-length': wrap");
    expect(section).toContain("Mark lab explored");
  });
});
