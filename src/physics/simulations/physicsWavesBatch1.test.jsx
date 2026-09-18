import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import WaveBuilderSim from './waves/WaveBuilderSim';
import WaveGraphSim from './waves/WaveGraphSim';
import EchoRangingSim from './waves/EchoRangingSim';
import PitchLoudnessSim from './waves/PitchLoudnessSim';

describe('Physics Waves virtual labs Batch 1', () => {
  test('Wave builder compares transverse and longitudinal particle motion', () => {
    render(<WaveBuilderSim/>);
    expect(screen.getByText('Wave builder')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name:'perpendicular to the direction of travel' }));
    expect(screen.getByRole('button', { name:'Transverse' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name:'Longitudinal' }));
    expect(screen.getByRole('button', { name:'Longitudinal' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(/parallel to travel/i)).toBeInTheDocument();
  });

  test('Wave graph explorer switches between wavelength and period views', () => {
    render(<WaveGraphSim/>);
    fireEvent.click(screen.getByRole('button', { name:'It stays the same' }));
    expect(screen.getAllByText('Wavelength').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name:'Displacement-time' }));
    expect(screen.getAllByText('Period').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/displacement-time graph/i).length).toBeGreaterThan(0);
  });

  test('Echo ranging uses the one-way vt/2 relationship', () => {
    render(<EchoRangingSim/>);
    fireEvent.click(screen.getByRole('button', { name:'d = vt/2' }));
    expect(screen.getByText(/d = vt\/2 =/i)).toBeInTheDocument();
    expect(screen.getAllByText(/85 m/i).length).toBeGreaterThan(0);
  });

  test('Pitch and loudness keeps frequency and amplitude independent', () => {
    render(<PitchLoudnessSim/>);
    fireEvent.click(screen.getByRole('button', { name:'higher in pitch' }));
    const frequency = screen.getByRole('slider', { name:/^Frequency/i });
    const amplitude = screen.getByRole('slider', { name:/^Amplitude/i });
    fireEvent.change(frequency, { target:{ value:'1000' } });
    expect(screen.getByText('high')).toBeInTheDocument();
    fireEvent.change(amplitude, { target:{ value:'0.9' } });
    expect(screen.getByText('loud')).toBeInTheDocument();
  });
});
