const fs = require('fs');
const path = require('path');

describe('Physics lab completion button polish V11.7', () => {
  const css = fs.readFileSync(
    path.join(__dirname, 'physics/mechanics/components/physicsMechanics.css'),
    'utf8'
  );

  test('lab exploration uses the same primary progress-action treatment as lesson completion', () => {
    expect(css).toContain('.pm-labs-grid .pm-completion > button');
    expect(css).toContain('background:var(--pm-primary);');
    expect(css).toContain('color:#fff;');
    expect(css).toContain('.pm-labs-grid .pm-completion > button.done');
    expect(css).toContain('background:var(--pm-good);');
  });
});
