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
test('historical chart keeps its given executive and restores eight independent answers',()=>{
 const part=OA_HISTORICAL_PAPER2_PART_LAYOUTS['OA-P2-2024-JAN::1::q1-c'];let latest='';
 function Form(){const[value,setValue]=useState('');return <OaPartResponse part={part} value={value} onChange={v=>{latest=v;setValue(v);}}/>;}
 const{rerender}=render(<Form/>);
 expect(screen.getByText(/Chief Executive/)).toBeInTheDocument();
 const boxes=screen.getAllByRole('textbox',{name:/Organization chart/});expect(boxes).toHaveLength(8);
 fireEvent.change(boxes[0],{target:{value:'Personnel manager'}});fireEvent.change(boxes[7],{target:{value:'Clerk'}});
 expect(latest).not.toMatch(/Chief Executive/);
 rerender(<OaPartResponse part={part} value={latest} review onChange={()=>{}}/>);
 expect(screen.getByRole('textbox',{name:'Organization chart · Box 1 (upper left)'})).toHaveValue('Personnel manager');
 expect(screen.getByRole('textbox',{name:'Organization chart · Box 8 (bottom)'})).toHaveValue('Clerk');
 expect(screen.getAllByRole('textbox',{name:/Organization chart/}).every(n=>n.readOnly)).toBe(true);
});
test('message checkboxes restore selections and become disabled in review',()=>{
 const part=OA_HISTORICAL_PAPER2_PART_LAYOUTS['OA-P2-2024-JAN::2::q2-c'];let latest='';
 function Form(){const[value,setValue]=useState('');return <OaPartResponse part={part} value={value} onChange={v=>{latest=v;setValue(v);}}/>;}
 const{rerender}=render(<Form/>);expect(screen.getAllByRole('checkbox')).toHaveLength(4);
 fireEvent.click(screen.getByRole('checkbox',{name:'Please Call'}));fireEvent.change(screen.getByRole('textbox',{name:'Message'}),{target:{value:'Return the call'}});
 rerender(<OaPartResponse part={part} value={latest} review onChange={()=>{}}/>);
 expect(screen.getByRole('checkbox',{name:'Please Call'})).toBeChecked();expect(screen.getByRole('checkbox',{name:'Called'})).not.toBeChecked();
 expect(screen.getByRole('checkbox',{name:'Please Call'})).toBeDisabled();expect(screen.getByRole('textbox',{name:'Message'})).toHaveValue('Return the call');
});
test('two printed dollar columns retain separate answers and fixed source balances',()=>{
 const part=OA_HISTORICAL_PAPER2_PART_LAYOUTS['OA-P2-2024-JAN::5::q5-c'];let latest='';
 function Form(){const[value,setValue]=useState('');return <OaPartResponse part={part} value={value} onChange={v=>{latest=v;setValue(v);}}/>;}
 const{rerender}=render(<Form/>);expect(screen.getByText('300.00')).toBeInTheDocument();expect(screen.getByText('330.00')).toBeInTheDocument();
 const first=screen.getAllByRole('textbox',{name:/Amount — first column/})[0],second=screen.getAllByRole('textbox',{name:/Amount — second column/})[0];
 fireEvent.change(first,{target:{value:'75'}});fireEvent.change(second,{target:{value:'150'}});
 rerender(<OaPartResponse part={part} value={latest} review onChange={()=>{}}/>);
 expect(screen.getByRole('textbox',{name:first.getAttribute('aria-label')})).toHaveValue('75');expect(screen.getByRole('textbox',{name:second.getAttribute('aria-label')})).toHaveValue('150');
 expect(latest).not.toMatch(/300\.00|330\.00/);
});
test('the 2017 cash book preserves its merged imprest cell and printed travel entry',()=>{
 const part=OA_HISTORICAL_PAPER2_PART_LAYOUTS['OA-P2-2017-MJ::5::q5-c'];render(<OaPartResponse part={part} value="" onChange={()=>{}}/>);
 expect(screen.getByText('500.00').closest('td')).toHaveAttribute('rowspan','9');expect(screen.getAllByText('130.00')).toHaveLength(2);
 const rows=screen.getByRole('table',{name:'Petty Cash Book',exact:true}).querySelectorAll('tbody tr');expect(rows).toHaveLength(9);
 expect(rows[0].querySelectorAll('td')).toHaveLength(8);expect(rows[1].querySelectorAll('td')).toHaveLength(7);
 expect(screen.getByRole('textbox',{name:/Cash Received/})).toHaveValue('');
});
test('reviewed document fields have independent saved labels',()=>{
 for(const part of Object.values(OA_HISTORICAL_PAPER2_PART_LAYOUTS)){
  const labels=oaPartResponseFields(part).map(f=>f.label);expect(new Set(labels).size).toBe(labels.length);
 }
});
