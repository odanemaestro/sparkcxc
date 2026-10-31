import React from 'react';
import {render,screen,fireEvent,within} from '@testing-library/react';
import OfficeVisualGuide,{OfficeSbaGuide} from './OfficeVisualGuide';

test('the contextual study workflow explains the actual section and opens references only on request',()=>{
 render(<OfficeVisualGuide section={9}/>);
 expect(screen.getByText('The purchasing document trail')).toBeInTheDocument();
 const steps=screen.getByRole('list',{name:'Workflow steps'});
 expect(within(steps).getAllByRole('listitem')).toHaveLength(4);
 expect(within(steps).getByText('Match and pay',{exact:false})).toBeInTheDocument();
 expect(screen.getByText(/External guides open only when selected/)).toBeInTheDocument();
 expect(document.querySelectorAll('iframe,video')).toHaveLength(0);
 expect(screen.getByRole('link',{name:/Incoterms/})).toHaveAttribute('href','https://library.iccwbo.org/clp/clp-incoterms.htm');
});
test('changing the SBA sitting changes the official theme and the appropriate example',()=>{
 render(<OfficeSbaGuide initialYear={2026}/>);
 expect(screen.getByText(/Reception and Hospitality and Accounts and Financial Services/)).toBeInTheDocument();
 fireEvent.change(screen.getByLabelText('Examination year'),{target:{value:'2027'}});
 expect(screen.getByText(/Office Orientation, Communication and Procurement and Inventory Management/)).toBeInTheDocument();
 expect(screen.getByText('How a small office communicates and records requests for stationery')).toBeInTheDocument();
 expect(screen.queryByText('How appointment information passes from reception to the accounts office in a small service business')).not.toBeInTheDocument();
 expect(screen.getAllByText(/at least 12 relevant activities/).length).toBeGreaterThan(0);
});
test('an unsupported study section does not display an unrelated workflow',()=>{
 const {container}=render(<OfficeVisualGuide section={99}/>);expect(container).toBeEmptyDOMElement();
});
