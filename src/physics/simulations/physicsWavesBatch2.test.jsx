import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import EMSpectrumSim from './waves/EMSpectrumSim';
import ReflectionSim from './waves/ReflectionSim';
import RefractionSim from './waves/RefractionSim';
import TIRSim from './waves/TIRSim';
import DoubleSlitSim from './waves/DoubleSlitSim';

describe('Physics Waves virtual labs Batch 2', () => {
  test('EM spectrum preserves readable units and the inverse frequency-wavelength relationship', () => {
    render(<EMSpectrumSim/>);
    fireEvent.click(screen.getByRole('button', { name:'decreases' }));
    fireEvent.click(screen.getByRole('button', { name:'gamma' }));
    expect(screen.getAllByText(/1 pm/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Equivalent in metres/i)).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/1\.00e-12|3\.00e\+20/i);
  });

  test('reflection keeps angle of reflection equal to incidence', () => {
    render(<ReflectionSim/>);
    fireEvent.click(screen.getByRole('button', { name:/equal to the angle of incidence/i }));
    const slider = screen.getByRole('slider', { name:/^Angle of incidence/i });
    fireEvent.change(slider, { target:{ value:'60' } });
    expect(screen.getAllByText(/60°/).length).toBeGreaterThanOrEqual(2);
  });

  test('refraction bends toward the normal when entering higher refractive index', () => {
    render(<RefractionSim/>);
    fireEvent.click(screen.getByRole('button', { name:/towards the normal/i }));
    const index = screen.getByRole('slider', { name:/^Refractive index/i });
    fireEvent.change(index, { target:{ value:'2' } });
    expect(screen.getAllByText(/Calculated n/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/n = sin i \/ sin r/i)).toBeInTheDocument();
  });

  test('TIR exposes the critical-angle transition', () => {
    render(<TIRSim/>);
    fireEvent.click(screen.getByRole('button', { name:/greater than the critical angle/i }));
    const angle = screen.getByRole('slider', { name:/^Internal incidence/i });
    fireEvent.change(angle, { target:{ value:'70' } });
    expect(screen.getAllByText(/total internal reflection/i).length).toBeGreaterThan(0);
  });

  test('double slit keeps the fringe model and practical screen', () => {
    const { container } = render(<DoubleSlitSim/>);
    fireEvent.click(screen.getByRole('button', { name:/farther apart/i }));
    expect(container.querySelector('.waves-fringe-screen')).toBeInTheDocument();
    expect(screen.getAllByText(/Fringe spacing/i).length).toBeGreaterThan(0);
    const wavelength = screen.getByRole('slider', { name:/^Wavelength/i });
    fireEvent.change(wavelength, { target:{ value:'700' } });
    expect(wavelength).toHaveAttribute('aria-valuetext', '700 nm');
  });
});
