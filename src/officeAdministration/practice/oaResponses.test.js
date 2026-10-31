import {oaFormValues,oaFormResponse} from './oaResponses';
test('restores appointment labels containing clock times and multiline answers containing colons',()=>{
 const fields=[{label:'Appointments · 9:00 · First Name'},{label:'Appointments · 9:30 · First Name'},{label:'Message'}];
 const values={'Appointments · 9:00 · First Name':'Ian','Appointments · 9:30 · First Name':'Sonia',Message:'Call at 10:40\nReference: 50'};
 expect(oaFormValues(oaFormResponse(values,fields),fields)).toEqual(values);
});
test('reads existing plain response records and prefers the complete known field label',()=>{
 const fields=[{label:'Date'},{label:'Date: delivery'},{label:'Notes'}];
 expect(oaFormValues('Date: 4 January\nDate: delivery: 11 January\nNotes: Keep source dates\nSecond line',fields)).toEqual({Date:'4 January','Date: delivery':'11 January',Notes:'Keep source dates\nSecond line'});
});
