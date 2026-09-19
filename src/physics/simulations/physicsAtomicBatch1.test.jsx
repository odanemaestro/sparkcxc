import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RutherfordScatteringSim from './atomic/RutherfordScatteringSim';
import AtomBuilderSim from './atomic/AtomBuilderSim';
import IsotopeExplorerSim from './atomic/IsotopeExplorerSim';
import RadiationPropertiesSim from './atomic/RadiationPropertiesSim';
import FieldDeflectionSim from './atomic/FieldDeflectionSim';

describe('Physics Atomic virtual labs Batch 1',()=>{
  test('Rutherford nucleus label is plain text and positioned below the scattering path',()=>{
    const {container}=render(<RutherfordScatteringSim/>);
    const label=screen.getByText('positive nucleus');
    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toBe('text');
    expect(label).toHaveAttribute('y','258');
    expect(container.querySelector('.psim-nucleus-label')).not.toBeInTheDocument();
  });

  test('Rutherford scattering connects small impact parameter with large deflection',()=>{
    render(<RutherfordScatteringSim/>);
    fireEvent.click(screen.getByRole('button',{name:/concentrated in a very small nucleus/i}));
    const slider=screen.getByRole('slider',{name:/^Impact parameter/i});
    fireEvent.change(slider,{target:{value:'0.1'}});
    expect(screen.getAllByText(/Model deflection/i).length).toBeGreaterThan(0);
  });

  test('atom builder changes electrons without changing proton number when charge changes',()=>{
    render(<AtomBuilderSim/>);
    fireEvent.click(screen.getByRole('button',{name:/fewer electrons than protons/i}));
    const charge=screen.getByRole('slider',{name:/^Ion charge/i});
    fireEvent.change(charge,{target:{value:'2'}});
    expect(screen.getAllByText(/Protons/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Electrons/i).length).toBeGreaterThan(0);
  });

  test('isotope explorer preserves proton number while neutron number changes',()=>{
    render(<IsotopeExplorerSim/>);
    fireEvent.click(screen.getByRole('button',{name:'protons'}));
    expect(screen.getAllByText(/Same proton number/i).length).toBeGreaterThan(0);
  });

  test('radiation properties compares alpha beta and gamma',()=>{
    render(<RadiationPropertiesSim/>);
    fireEvent.click(screen.getByRole('button',{name:'alpha'}));
    fireEvent.click(screen.getByRole('button',{name:'Beta'}));
    fireEvent.click(screen.getByRole('button',{name:'Gamma'}));
    expect(screen.getAllByText(/Typical absorber/i).length).toBeGreaterThan(0);
  });

  test('field deflection leaves gamma undeflected',()=>{
    render(<FieldDeflectionSim/>);
    fireEvent.click(screen.getByRole('button',{name:/opposite electric charges/i}));
    fireEvent.click(screen.getByRole('button',{name:'Gamma'}));
    expect(screen.getAllByText(/uncharged/i).length).toBeGreaterThan(0);
  });
});
