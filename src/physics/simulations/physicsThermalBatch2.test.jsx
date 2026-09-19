import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SpecificHeatSim from './thermal/SpecificHeatSim';
import LatentHeatSim from './thermal/LatentHeatSim';
import RadiationSurfacesSim from './thermal/RadiationSurfacesSim';
import ConvectionSim from './thermal/ConvectionSim';

describe('Physics Thermal virtual labs Batch 2',()=>{
  test('specific heat uses electrical energy and mcΔT',()=>{render(<SpecificHeatSim/>);fireEvent.click(screen.getByRole('button',{name:'smaller'}));expect(screen.getByText(/c = Pt\/\(mΔT\)/i)).toBeInTheDocument();expect(screen.getAllByText(/Specific heat capacity/i).length).toBeGreaterThan(0);});
  test('latent heat supports background melting correction',()=>{render(<LatentHeatSim/>);fireEvent.click(screen.getByRole('button',{name:'stays constant'}));const bg=screen.getByRole('slider',{name:/^Background melted mass/i});fireEvent.change(bg,{target:{value:'5'}});expect(screen.getAllByText(/Corrected mass/i).length).toBeGreaterThan(0);expect(screen.getByText(/L = VIt\/m/i)).toBeInTheDocument();});
  test('dull black is strongest relative emitter',()=>{render(<RadiationSurfacesSim/>);fireEvent.click(screen.getByRole('button',{name:'dull black'}));expect(screen.getAllByText(/Dull black/i).length).toBeGreaterThan(0);expect(screen.getAllByText(/Strongest emitter/i).length).toBeGreaterThan(0);});
  test('convection responds to reversed and neutral gradients',()=>{render(<ConvectionSim/>);fireEvent.click(screen.getByRole('button',{name:/rises because it becomes less dense/i}));const bottom=screen.getByRole('slider',{name:/^Bottom temperature/i});const top=screen.getByRole('slider',{name:/^Top temperature/i});fireEvent.change(bottom,{target:{value:'30'}});fireEvent.change(top,{target:{value:'80'}});expect(screen.getAllByText(/opposes the usual heating-from-below circulation/i).length).toBeGreaterThan(0);fireEvent.change(bottom,{target:{value:'80'}});expect(screen.getAllByText(/no temperature-driven density contrast/i).length).toBeGreaterThan(0);});
});
