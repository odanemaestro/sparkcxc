import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import MechanicsInteractiveLab from './physics/mechanics/components/MechanicsInteractiveLab';
import ThermalInteractiveLab from './physics/thermal/components/ThermalInteractiveLab';
import WavesInteractiveLab from './physics/waves/components/WavesInteractiveLab';
import ElectricityInteractiveLab from './physics/electricity/components/ElectricityInteractiveLab';
import AtomicInteractiveLab from './physics/atomic/components/AtomicInteractiveLab';
import PhysicsPracticalNotebook from './physics/labs/PhysicsPracticalNotebook';
import { MECHANICS_INTERACTIVES } from './physics/mechanics/interactives/mechanicsInteractiveRegistry.mjs';
import { THERMAL_INTERACTIVES } from './physics/thermal/interactives/bThermalInteractiveRegistry.mjs';
import { WAVES_INTERACTIVES } from './physics/waves/interactives/cWavesInteractiveRegistry.mjs';
import { ELECTRICITY_INTERACTIVES } from './physics/electricity/interactives/dElectricityInteractiveRegistry.mjs';
import { ATOMIC_INTERACTIVES } from './physics/atomic/interactives/eAtomicInteractiveRegistry.mjs';
import paper10 from './physics/paper1/data/spark-phy-p01-practice-10.json';
import paper11 from './physics/paper1/data/spark-phy-p01-practice-11.json';



const groups = [
  [MechanicsInteractiveLab, MECHANICS_INTERACTIVES],
  [ThermalInteractiveLab, THERMAL_INTERACTIVES],
  [WavesInteractiveLab, WAVES_INTERACTIVES],
  [ElectricityInteractiveLab, ELECTRICITY_INTERACTIVES],
  [AtomicInteractiveLab, ATOMIC_INTERACTIVES],
];

describe('Physics comprehensive lab and Paper 1 audit V2.4.4', () => {
  afterEach(() => cleanup());

  test('all 73 registered Physics interactives render a real implementation', () => {
    let count = 0;
    for (const [Component, registry] of groups) {
      for (const item of registry) {
        const { unmount, container } = render(<Component interactiveId={item.id}/>);
        expect(container.textContent).not.toMatch(/Interactive implementation unavailable/i);
        expect(container.textContent).not.toMatch(/Interactive unavailable/i);
        expect(container.textContent).toContain(item.title);
        count += 1;
        unmount();
      }
    }
    expect(count).toBe(73);
  });

  test('wave graph curve and labelled axes respond to the controls that define each graph', () => {
    const { container } = render(<WavesInteractiveLab interactiveId="c1-wave-graphs"/>);
    expect(screen.getByText('position / m')).toBeInTheDocument();
    expect(screen.getByText('displacement / m')).toBeInTheDocument();
    expect(screen.getByText(/wavelength changes the crest spacing/i)).toBeInTheDocument();

    const before = container.querySelector('[data-testid="wave-curve"]').getAttribute('d');
    const wavelengthControl = screen.getByRole('slider', { name: /Wavelength/i });
    expect(wavelengthControl.tagName).toBe('INPUT');
    fireEvent.change(wavelengthControl, { target: { value: '0.7' } });
    expect(wavelengthControl.value).toBe('0.7');
    const afterWavelength = container.querySelector('[data-testid="wave-curve"]').getAttribute('d');
    expect(afterWavelength).not.toBe(before);

    const amplitudeControl = screen.getByRole('slider', { name: /Amplitude/i });
    expect(amplitudeControl.tagName).toBe('INPUT');
    fireEvent.change(amplitudeControl, { target: { value: '0.12' } });
    expect(amplitudeControl.value).toBe('0.12');
    const afterAmplitude = container.querySelector('[data-testid="wave-curve"]').getAttribute('d');
    expect(afterAmplitude).not.toBe(afterWavelength);

    fireEvent.click(screen.getByRole('button', { name:'Displacement-time' }));
    expect(screen.getByText('time / s')).toBeInTheDocument();
    expect(screen.getByText(/frequency changes the number of cycles each second/i)).toBeInTheDocument();
    const timeBefore = container.querySelector('[data-testid="wave-curve"]').getAttribute('d');
    const frequencyControl = screen.getByRole('slider', { name: /Frequency/i });
    expect(frequencyControl.tagName).toBe('INPUT');
    fireEvent.change(frequencyControl, { target: { value: '8' } });
    expect(frequencyControl.value).toBe('8');
    const timeAfter = container.querySelector('[data-testid="wave-curve"]').getAttribute('d');
    expect(timeAfter).not.toBe(timeBefore);
  });

  test('electromagnetic spectrum uses learner-friendly units rather than raw e notation', () => {
    const { container } = render(<WavesInteractiveLab interactiveId="c3-em-spectrum"/>);
    fireEvent.click(screen.getByRole('button', { name:'gamma' }));
    expect(container.textContent).toContain('1 pm');
    expect(container.textContent).toContain('Equivalent in metres');
    expect(container.innerHTML).not.toMatch(/1\.00e-12|3\.00e\+20/i);
    expect(container.textContent).not.toMatch(/1\.00e-12|3\.00e\+20/i);
  });

  test("Young's double-slit has both a responsive model and a full practical notebook", () => {
    const { unmount, container } = render(<WavesInteractiveLab interactiveId="c4-double-slit"/>);
    expect(container.querySelector('.waves-fringe-screen')).toBeInTheDocument();
    expect(screen.getAllByText(/Fringe spacing/i).length).toBeGreaterThan(0);
    unmount();
    render(<PhysicsPracticalNotebook interactiveId="c4-double-slit" userId="v24-test"/>);
    expect(screen.getByText("Young's double-slit interference")).toBeInTheDocument();
    expect(screen.getByText('Sources of error')).toBeInTheDocument();
    expect(screen.getByText('Precautions')).toBeInTheDocument();
    expect(screen.getByText('Safety')).toBeInTheDocument();
  });

  test('Papers J and K meet the diagram floor used by the full Paper 1 library', () => {
    for (const paper of [paper10,paper11]) {
      const figures = paper.items.filter(item => item.stimulus?.svg);
      expect(figures.length).toBeGreaterThanOrEqual(8);
      for (const item of figures) {
        expect(item.stimulus.svg).toContain('currentColor');
        expect(item.stimulus.alt).toBeTruthy();
      }
    }
  });
});
