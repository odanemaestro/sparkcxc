import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LensRaySim from './waves/LensRaySim';
import FocalLengthSim from './waves/FocalLengthSim';
import { buildLensRayModel, buildFocalBenchModel } from '../waves/interactives/cWavesInteractiveModels.mjs';

describe('Physics Waves virtual labs Batch 3', () => {
  test('canonical lens model handles real and virtual converging-lens images', () => {
    const real = buildLensRayModel({ focalLengthCm:10, objectDistanceCm:30 });
    expect(real.imageType).toBe('real');
    expect(real.orientation).toBe('inverted');
    expect(real.imageDistanceCm).toBeCloseTo(15, 6);

    const virtual = buildLensRayModel({ focalLengthCm:10, objectDistanceCm:6 });
    expect(virtual.imageType).toBe('virtual');
    expect(virtual.orientation).toBe('upright');
    expect(virtual.magnification).toBeGreaterThan(1);
  });

  test('lens ray lab exposes the three key object regions', () => {
    render(<LensRaySim/>);
    fireEvent.click(screen.getByRole('button', { name:/virtual, upright and magnified/i }));

    fireEvent.click(screen.getByRole('button', { name:'Between F and 2F' }));
    expect(screen.getAllByText(/real/i).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name:'Inside F' }));
    expect(screen.getAllByText(/virtual/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/upright/i).length).toBeGreaterThan(0);
  });

  test('focal bench model identifies a sharp image and calculates focal length', () => {
    const model = buildFocalBenchModel({ trueFocalLengthCm:15, objectDistanceCm:30, screenDistanceCm:30 });
    expect(model.sharpness).toBe('sharp');
    expect(model.calculatedFocalLengthCm).toBeCloseTo(15, 6);
  });

  test('focal-length practical only records a sharp image', () => {
    render(<FocalLengthSim/>);
    fireEvent.click(screen.getByRole('button', { name:'sharply focused' }));

    const record = screen.getByRole('button', { name:'Record sharp reading' });
    expect(record).toBeEnabled();

    fireEvent.click(record);
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);

    const screenSlider = screen.getByRole('slider', { name:/^Screen distance v/i });
    fireEvent.change(screenSlider, { target:{ value:'50' } });
    expect(record).toBeDisabled();
  });
});
