// Test-environment shims needed by the Physics simulations under jsdom.
// In SPARK, import this once from src/setupTests.js:
//   import './physics/simulations/setupPhysicsSims';
import '@testing-library/jest-dom';

if (!window.matchMedia) {
  window.matchMedia = query => ({
    matches: false, media: query, onchange: null,
    addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent() { return false; },
  });
}
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = cb => window.setTimeout(() => cb(Date.now()), 16);
  window.cancelAnimationFrame = id => window.clearTimeout(id);
}
SVGElement.prototype.getScreenCTM = SVGElement.prototype.getScreenCTM || (() => null);
SVGElement.prototype.createSVGPoint = SVGElement.prototype.createSVGPoint || (() => ({ x: 0, y: 0, matrixTransform: () => ({ x: 0, y: 0 }) }));
