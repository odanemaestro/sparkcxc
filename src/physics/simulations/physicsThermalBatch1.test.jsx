import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import JouleHeatSim from './thermal/JouleHeatSim';
import GasLawsSim from './thermal/GasLawsSim';
import KelvinExtrapolationSim from './thermal/KelvinExtrapolationSim';
import ThermalExpansionSim from './thermal/ThermalExpansionSim';
import HeatingCurveSim from './thermal/HeatingCurveSim';

describe('Physics Thermal virtual labs Batch 1',()=>{
  test('Joule lab connects mechanical work with thermal energy',()=>{render(<JouleHeatSim/>);fireEvent.click(screen.getByRole('button',{name:'increases'}));expect(screen.getAllByText(/Mechanical work/i).length).toBeGreaterThan(0);expect(screen.getByText(/W = mgh/i)).toBeInTheDocument();});
  test('Gas-law explorer exposes all three canonical laws and kelvin temperatures',()=>{render(<GasLawsSim/>);fireEvent.click(screen.getByRole('button',{name:'kelvin'}));fireEvent.click(screen.getByRole('button',{name:'Charles'}));expect(screen.getByRole('slider',{name:/^Initial temperature/i})).toBeInTheDocument();fireEvent.click(screen.getByRole('button',{name:'Pressure law'}));expect(screen.getAllByText(/Final pressure/i).length).toBeGreaterThan(0);});
  test('Kelvin graph keeps the minus 273 intercept distinct from axis labels',()=>{const{container}=render(<KelvinExtrapolationSim/>);fireEvent.click(screen.getByRole('button',{name:'−273 °C'}));expect(container.querySelector('.psim-kelvin-intercept-label')).toHaveTextContent('−273');expect(screen.getAllByText(/Absolute zero/i).length).toBeGreaterThan(0);});
  test('Thermal expansion uses one specimen with a fixed and free end',()=>{const{container}=render(<ThermalExpansionSim/>);fireEvent.click(screen.getByRole('button',{name:'a greater amount'}));expect(container.querySelectorAll('.psim-expansion-bar')).toHaveLength(1);expect(screen.getByText(/There is no second moving bar/i)).toBeInTheDocument();});
  test('Heating curve exposes phase-change stages',()=>{render(<HeatingCurveSim/>);fireEvent.click(screen.getByRole('button',{name:'stays constant'}));const energy=screen.getByRole('slider',{name:/^Energy added/i});fireEvent.change(energy,{target:{value:'30'}});expect(screen.getAllByText(/melting/i).length).toBeGreaterThan(0);});
});
