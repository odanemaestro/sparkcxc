import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NuclearEquationSim from './atomic/NuclearEquationSim';
import RandomDecaySim from './atomic/RandomDecaySim';
import HalfLifeSim from './atomic/HalfLifeSim';
import MassEnergySim from './atomic/MassEnergySim';
import NuclearEnergyBalanceSim from './atomic/NuclearEnergyBalanceSim';

describe('Physics Atomic virtual labs Batch 2',()=>{
  test('nuclear equations expose alpha and beta-minus conservation',()=>{
    render(<NuclearEquationSim/>);
    fireEvent.click(screen.getByRole('button',{name:'the same mass number and atomic number increased by 1'}));
    fireEvent.click(screen.getByRole('button',{name:'Beta-minus decay'}));
    expect(screen.getAllByText(/Mass number conserved/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Atomic number conserved/i).length).toBeGreaterThan(0);
  });

  test('random decay separates actual seeded trials from the expected trend',()=>{
    render(<RandomDecaySim/>);
    fireEvent.click(screen.getByRole('button',{name:/Individual nuclei decay randomly/i}));
    expect(screen.getByRole('button',{name:'Repeat random trial'})).toBeInTheDocument();
    expect(screen.getAllByText(/Expected remaining/i).length).toBeGreaterThan(0);
  });

  test('half-life explorer shows repeated halving',()=>{
    render(<HalfLifeSim/>);
    fireEvent.click(screen.getByRole('button',{name:'1/8'}));
    expect(screen.getAllByText(/Half-lives elapsed/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Activity remaining/i).length).toBeGreaterThan(0);
  });

  test('mass-energy conversion uses E = mc²',()=>{
    render(<MassEnergySim/>);
    fireEvent.click(screen.getByRole('button',{name:/square of the speed of light/i}));
    expect(screen.getByText('E = mc²')).toBeInTheDocument();
    expect(screen.getAllByText(/Energy released/i).length).toBeGreaterThan(0);
  });

  test('nuclear energy evaluation requires evidence on both sides',()=>{
    render(<NuclearEnergyBalanceSim/>);
    fireEvent.click(screen.getByRole('button',{name:'consider specific evidence for both benefits and risks'}));
    fireEvent.click(screen.getByRole('button',{name:/Large energy output/i}));
    fireEvent.click(screen.getByRole('button',{name:/Low direct greenhouse/i}));
    fireEvent.click(screen.getByRole('button',{name:/Long-lived radioactive waste/i}));
    fireEvent.click(screen.getByRole('button',{name:/Serious accidents/i}));
    expect(screen.getAllByText('Yes').length).toBeGreaterThan(0);
  });
});
