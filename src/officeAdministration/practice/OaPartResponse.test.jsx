import React,{useState} from 'react';
import {render,screen,fireEvent} from '@testing-library/react';
import OaPartResponse,{oaPartResponseFields} from './OaPartResponse';
import {OA_HISTORICAL_PAPER2_PART_LAYOUTS} from '../data/oaHistoricalPaper2Layouts';
import {oaFormValues} from './oaResponses';
test('historical payroll preserves printed amounts and saves only student completion cells',()=>{
 const part=OA_HISTORICAL_PAPER2_PART_LAYOUTS['OA-P2-2025-MJ::5::q5-c'];let latest='';
 function Form(){const [value,setValue]=useState('');return <><span id="prompt">Complete the payroll</span><OaPartResponse part={part} labelId="prompt" value={value} onChange={v=>{latest=v;setValue(v);}}/></>;}
 const {rerender}=render(<Form/>);
 expect(screen.getByText('300',{exact:true})).toBeInTheDocument();expect(screen.getByText('200',{exact:true})).toBeInTheDocument();expect(screen.getAllByText('12',{exact:true})).toHaveLength(2);
 const overtime=screen.getByRole('textbox',{name:'PAYROLL · Joseph Sawyers · Overtime Pay ($)'});fireEvent.change(overtime,{target:{value:'80.00'}});
 const net=screen.getByRole('textbox',{name:'PAYROLL · Total Net Pay · Net Pay ($)'});fireEvent.change(net,{target:{value:'999.00'}});
 const values=oaFormValues(latest,oaPartResponseFields(part));expect(values['PAYROLL · Joseph Sawyers · Overtime Pay ($)']).toBe('80.00');expect(values['PAYROLL · Total Net Pay · Net Pay ($)']).toBe('999.00');
 expect(latest).not.toMatch(/Basic Pay|Union Fees/);
 rerender(<><span id="prompt">Complete the payroll</span><OaPartResponse part={part} labelId="prompt" value={latest} review onChange={()=>{}}/></>);
 expect(screen.getByRole('textbox',{name:'PAYROLL · Joseph Sawyers · Overtime Pay ($)'})).toHaveValue('80.00');expect(screen.getByRole('textbox',{name:'PAYROLL · Total Net Pay · Net Pay ($)'})).toHaveAttribute('readonly');
});
test('the historical index card has sixteen independent native answer cells',()=>{
 const part=OA_HISTORICAL_PAPER2_PART_LAYOUTS['OA-P2-2025-MJ::2::q2-c'];render(<><span id="prompt">Index the records</span><OaPartResponse part={part} labelId="prompt" value="" onChange={()=>{}}/></>);
 expect(screen.getAllByRole('textbox')).toHaveLength(16);expect(screen.getAllByRole('columnheader').map(n=>n.textContent)).toEqual(['Unit 1','Unit 2','Unit 3','Unit 4']);
});
