const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

describe('Physics V2.5.8 mobile lab and workbook polish', () => {
  test('Workbook guidance no longer renders the plus icon', () => {
    const source = read('src/physics/resources/PhysicsWorkbook.jsx');
    expect(source).toContain('Explore the Workbook');
    expect(source).not.toContain('physics-workbook-guide-icon');
  });

  test('Pendulum bob grows visibly as bob mass increases', () => {
    const source = read('src/physics/mechanics/components/MechanicsInteractiveLab.jsx');
    expect(source).toContain('const bobRadius=16+18*((mass-.05)/.45);');
    expect(source).toContain('r={bobRadius}');
    expect(source).toContain('x={x+bobRadius+8}');

    const radius = mass => 16 + 18 * ((mass - 0.05) / 0.45);
    expect(radius(0.05)).toBeCloseTo(16, 8);
    expect(radius(0.10)).toBeCloseTo(18, 8);
    expect(radius(0.50)).toBeCloseTo(34, 8);
    expect(radius(0.50)).toBeGreaterThan(radius(0.10));
  });

  test('Shared Physics lab CSS prevents grid and interactive overflow on phones', () => {
    const source = read('src/physics/mechanics/components/physicsMechanics.css');
    expect(source).toContain('SPARK PHYSICS V2.5.8 MOBILE LAB FIT START');
    expect(source).toContain('.physics-mechanics .pm-labs-grid > *');
    expect(source).toContain('.physics-mechanics .pm-interactive');
    expect(source).toContain('.physics-mechanics .pm-lab-frame svg[role="img"]');
    expect(source).toContain('grid-template-columns:minmax(0,1fr);');
    expect(source).toContain('min-height:0;');
    expect(source).toContain('max-width:100%;');
  });

  test('Workbook guidance uses a single content column after icon removal', () => {
    const source = read('src/physics/resources/physicsResources.css');
    expect(source).toContain('SPARK PHYSICS V2.5.8 WORKBOOK GUIDE START');
    expect(source).toContain('.physics-workbook-guide{display:block}');
  });
});
