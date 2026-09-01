import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the SPARK nav without crashing', () => {
  render(<App />);
  // The nav logo text "SPARK" renders regardless of auth state (signed in
  // or not, any role), so it's a stable anchor for a basic smoke test -
  // this at least catches the class of "whole app is broken" issue that
  // the old boilerplate test (which checked for "learn react") never could.
  const heading = screen.getAllByText(/SPARK/i);
  expect(heading.length).toBeGreaterThan(0);
});
