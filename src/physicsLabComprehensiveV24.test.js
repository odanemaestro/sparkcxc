import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
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
import { hasSimulation } from './physics/simulations/simulationRegistry.jsx';
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

  test('all 73 registered Physics interactives render a real implementation', async () => {
    let count = 0;
    for (const [Component, registry] of groups) {
      for (const item of registry) {
        const { unmount, container } = render(<Component interactiveId={item.id}/>);
        expect(container.textContent).not.toMatch(/Interactive implementation unavailable/i);
        expect(container.textContent).not.toMatch(/Interactive unavailable/i);

        if (hasSimulation(item.id)) {
          await waitFor(() => {
            expect(container.textContent).not.toMatch(/^Loading virtual lab…$/i);
            const simulation = container.querySelector('section.psim');
            expect(simulation).toBeInTheDocument();
            expect(simulation).toHaveAttribute('aria-label');
            const simulationTitle = container.querySelector('.psim-head h4')?.textContent?.trim() || '';
            expect(simulationTitle.length).toBeGreaterThan(0);
          });
        } else {
          expect(container.textContent).toContain(item.title);
        }

        count += 1;
        unmount();
      }
    }
    expect(count).toBe(73);
  }, 20000);

  test('wave graph explorer exposes labelled axes and responds to the defining controls', () => {
    render(<WavesInteractiveLab interactiveId="c1-wave-graphs"/>);

    // Unlock the new Predict → Experiment workflow first.
    fireEvent.click(screen.getByRole('button', { name:'It stays the same' }));

    expect(screen.getByText('position / m')).toBeInTheDocument();
    expect(screen.getByText('displacement / m')).toBeInTheDocument();
    expect(screen.getAllByText(/displacement-position graph/i).length).toBeGreaterThan(0);

    const wavelengthControl = screen.getByRole('slider', { name:/^Wavelength/i });
    fireEvent.change(wavelengthControl, { target:{ value:'0.7' } });
    expect(wavelengthControl).toHaveAttribute('aria-valuetext', '0.7 m');

    const amplitudeControl = screen.getByRole('slider', { name:/^Amplitude/i });
    fireEvent.change(amplitudeControl, { target:{ value:'0.12' } });
    expect(amplitudeControl).toHaveAttribute('aria-valuetext', '0.12 m');

    fireEvent.click(screen.getByRole('button', { name:'Displacement-time' }));
    expect(screen.getByText('time / s')).toBeInTheDocument();
    expect(screen.getByText(/This is a displacement-time graph/i)).toBeInTheDocument();
    expect(screen.getAllByText('Period').length).toBeGreaterThan(0);

    const frequencyControl = screen.getByRole('slider', { name:/^Frequency/i });
    fireEvent.change(frequencyControl, { target:{ value:'8' } });
    expect(frequencyControl).toHaveAttribute('aria-valuetext', '8 Hz');
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


  test('Thermal Gas Lab exposes Pressure Law with absolute-temperature comparison', () => {
    render(<ThermalInteractiveLab interactiveId="b2-gas-laws"/>);
    const pressure = screen.getByRole('button', { name:'Pressure law' });
    expect(pressure).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(pressure);
    expect(pressure).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Final pressure')).toBeInTheDocument();
    expect(screen.getByText('P₁/T₁')).toBeInTheDocument();
    expect(screen.getByText('P₂/T₂')).toBeInTheDocument();
    expect(screen.getByText('133.33 kPa')).toBeInTheDocument();
  });

  test('Thermal heating curve warms vapour after boiling is complete', () => {
    render(<ThermalInteractiveLab interactiveId="b3-heating-curve"/>);
    const energy = screen.getByRole('slider', { name:'Energy added' });
    fireEvent.change(energy, { target: { value:'800' } });
    expect(screen.getAllByText('vapour warming').length).toBeGreaterThan(0);
    expect(screen.getByText(/further energy raises the temperature again/i)).toBeInTheDocument();
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
