const fs = require('fs');
const path = require('path');

function source(...parts) {
  return fs.readFileSync(path.join(__dirname, ...parts), 'utf8');
}

describe('Physics Waves Batch 3 integration', () => {
  const registry = source('simulationRegistry.jsx');
  const section = source('..', 'waves', 'components', 'PhysicsWavesSection.jsx');
  const models = source('..', 'waves', 'interactives', 'cWavesInteractiveModels.mjs');
  const physics = source('..', 'waves', 'cWavesPhysics.mjs');

  test('both C5 simulations are lazy registered', () => {
    expect(registry).toContain("'c5-lens-rays'");
    expect(registry).toContain("'c5-focal-length'");
  });

  test('all 11 Section C labs now have upgraded virtual simulations', () => {
    const ids = [
      'c1-wave-builder','c1-wave-graphs','c2-echo-ranging','c2-pitch-loudness',
      'c3-em-spectrum','c4-reflection','c4-refraction','c4-total-internal-reflection',
      'c4-double-slit','c5-lens-rays','c5-focal-length'
    ];
    ids.forEach(id => expect(registry).toContain(`'${id}'`));
  });

  test('Section C automatic completion still uses the canonical progress/activity flow', () => {
    expect(section).toContain("setPhysicsWavesCompletion");
    expect(section).toContain("type:'physics_lab_completion'");
    expect(section).toContain("payload?.source === 'physics_virtual_simulation'");
    expect(section).toContain("payload?.result === 'completed'");
  });

  test('signed lens calculations live in the canonical Section C model layer', () => {
    expect(physics).toContain("export function lensSignedImageDistance");
    expect(physics).toContain("export function lensSignedMagnification");
    expect(models).toContain("buildFocalBenchModel");
    expect(models).toContain("lensSignedImageDistance");
  });
});
