import fs from 'fs';
import path from 'path';

describe('Physics tablet navigation V12', () => {
  const read = rel => fs.readFileSync(path.join(__dirname, rel), 'utf8');

  test('Study section cards use SVG navigation arrows instead of emoji glyphs', () => {
    const view = read('physics/course/components/PhysicsSubjectView.jsx');
    const css = read('physics/course/components/physicsSubjectView.css');
    expect(view).toContain('psv-section-arrow-icon');
    expect(view).not.toContain('aria-hidden="true">↗</span>');
    expect(css).toContain('.psv-section-arrow-icon');
    expect(css).toContain('stroke:currentColor');
  });

  test('Physics practice cards share the same SVG arrow treatment', () => {
    const hub = read('physics/course/components/PhysicsPracticeHub.jsx');
    expect(hub).toContain('psv-section-arrow-icon');
    expect(hub).not.toContain('aria-hidden="true">↗</span>');
  });

  test('Physics flashcards Change subject stays on one line and uses an SVG back arrow on tablets', () => {
    const panel = read('physics/mechanics/components/PhysicsMechanicsSupportPanels.jsx');
    const css = read('physics/mechanics/components/physicsMechanics.css');
    expect(panel).toContain('pm-change-subject-icon');
    expect(panel).toContain('<span>Change subject</span>');
    expect(css).toContain('.pm-change-subject-btn');
    expect(css).toContain('white-space:nowrap');
    expect(css).toContain('@media (min-width:561px) and (max-width:1100px)');
  });
});
