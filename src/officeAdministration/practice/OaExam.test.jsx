import React from 'react';
import {render,screen,fireEvent,act,within} from '@testing-library/react';
import OaExam from './OaExam';
import {recordSubjectActivity} from '../../subjects/subjectProgress';
import {oaAttemptKey} from './oaAttempts';
jest.mock('../../subjects/subjectProgress',()=>({recordSubjectActivity:jest.fn()}));
jest.mock('../../grading/serverExamAttempt',()=>({startServerExamAttempt:jest.fn(),submitServerExamAttempt:jest.fn(),readServerExamClock:jest.fn(),readServerExamV2Result:jest.fn(),localExamDeadline:()=>null}));
const p1={id:'test-p1',paper:1,title:'Paper 1 test',durationMinutes:75,totalMarks:2,questions:[{id:'one',number:1,stem:'Which document?',options:['Invoice','Memo','Agenda','Minutes'],answerIndex:0},{id:'two',number:2,stem:'Which department?',options:['HR','Sales','Accounts','Stores'],answerIndex:2}]};
beforeEach(()=>{localStorage.clear();window.history.replaceState({},'', '/#/practice/office-administration?view=exam');window.scrollTo=jest.fn();recordSubjectActivity.mockResolvedValue({});});
afterEach(()=>jest.useRealTimers());
test('refresh keeps the current MCQ, chosen answer, flag and running timer; exit requires a choice',async()=>{
 const back=jest.fn();let view=render(<OaExam paper={p1} userId="qa" onBack={back}/>);
 fireEvent.click(screen.getByRole('button',{name:'Start examination'}));
 fireEvent.click(screen.getByRole('radio',{name:/A\. Invoice/}));fireEvent.click(screen.getByRole('button',{name:'Flag for review'}));fireEvent.click(screen.getByRole('button',{name:/Next question/}));
 const saved=JSON.parse(localStorage.getItem(oaAttemptKey('qa',p1.id)));view.unmount();
 view=render(<OaExam paper={p1} userId="qa" onBack={back}/>);expect(screen.getByRole('heading',{name:'Question 2'})).toBeInTheDocument();
 fireEvent.click(screen.getByRole('button',{name:/Previous question/}));expect(screen.getByRole('radio',{name:/A\. Invoice/})).toBeChecked();expect(screen.getByRole('button',{name:'Flagged for review'})).toHaveAttribute('aria-pressed','true');
 expect(JSON.parse(localStorage.getItem(oaAttemptKey('qa',p1.id))).deadline).toBe(saved.deadline);expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
 fireEvent.click(screen.getByRole('button',{name:'Exit examination'}));expect(back).not.toHaveBeenCalled();const dialog=screen.getByRole('dialog');fireEvent.click(within(dialog).getByRole('button',{name:'Exit examination'}));expect(back).toHaveBeenCalledTimes(1);
});
test('an expired saved attempt submits once and does not reset the timer',async()=>{
 jest.useFakeTimers();const key=oaAttemptKey('qa',p1.id);localStorage.setItem(key,JSON.stringify({paperId:p1.id,id:'expired',phase:'exam',index:0,answers:{one:'A'},flags:{},selectedQuestionIds:['one','two'],deadline:Date.now()-10,serverId:null}));
 await act(async()=>{render(<OaExam paper={p1} userId="qa"/>);});expect(screen.getByRole('heading',{name:'Your score: 1 / 2'})).toBeInTheDocument();await act(async()=>{jest.advanceTimersByTime(4000);});expect(recordSubjectActivity).toHaveBeenCalledTimes(1);
});
test('old Paper 2 requires six chosen questions and keeps original question numbers',()=>{
 const questions=Array.from({length:8},(_,i)=>({id:'q'+(i+1),number:i+1,stem:'Office task '+(i+1),marks:15,parts:[{id:'q'+(i+1)+'-a',label:'(a)',prompt:'Explain the procedure.',marks:15,guidance:'Check the office procedure.'}]}));
 render(<OaExam paper={{id:'OA-P2-old',paper:2,title:'Historical Paper 2',questions,requiredQuestionCount:6,selectionRules:{compulsory:[1,2,3,4],optional:[5,6,7,8],choose:2},totalMarks:90,durationMinutes:120}} userId="qa"/>);
 expect(screen.getByRole('button',{name:'Start examination'})).toBeDisabled();fireEvent.click(screen.getByRole('checkbox',{name:'Question 5'}));fireEvent.click(screen.getByRole('checkbox',{name:'Question 8'}));fireEvent.click(screen.getByRole('button',{name:'Start examination'}));fireEvent.click(screen.getByRole('button',{name:'Question 8, unanswered'}));expect(screen.getByRole('heading',{name:/Question 8/})).toBeInTheDocument();expect(screen.queryByRole('button',{name:/accounting tools|Export/i})).not.toBeInTheDocument();
});

test('source charts keep their printed position and can be reached by keyboard on narrow screens',()=>{
 const chartPaper={...p1,questions:[{...p1.questions[0],contextText:'Item 1 refers to the diagram below.',figure:'office-administration/figures/chart.png',figureAlt:'Original sales chart',figureWidth:960,figureBeforeStem:true}]};
 render(<OaExam paper={chartPaper} userId="qa"/>);fireEvent.click(screen.getByRole('button',{name:'Start examination'}));
 const chart=screen.getByRole('img',{name:'Original sales chart'});const stem=screen.getByText('Which document?');
 expect(chart.compareDocumentPosition(stem)&Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
 expect(screen.getByRole('region',{name:'Original sales chart'})).toHaveAttribute('tabindex','0');
 expect(screen.getByText('Item 1 refers to the diagram below.')).toBeInTheDocument();
 expect(screen.getAllByRole('radio')).toHaveLength(4);expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});
