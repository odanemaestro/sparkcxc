import {newOaAttempt,readOaAttempt,oaAttemptKey,oaSelectedQuestions,oaSelectionValid,oaRemainingSeconds,oaPaper1Result,oaPaper1Score} from './oaAttempts';
import {oaFormValues,oaFormResponse} from './oaResponses';
const questions=Array.from({length:8},(_,i)=>({id:'q'+(i+1),number:i+1,parts:[{id:'q'+(i+1)+'-a'}]}));
const paper={id:'historical',paper:2,questions,requiredQuestionCount:6,selectionRules:{compulsory:[1,2,3,4],optional:[5,6,7,8],choose:2}};
afterEach(()=>localStorage.clear());
test('historical choices require compulsory questions and exactly two different optional questions',()=>{
 expect(oaSelectionValid(paper,['q1','q2','q3','q4','q5','q8'])).toBe(true);
 for(const ids of [['q1','q2','q3','q4'],['q1','q2','q3','q5','q6','q8'],['q1','q2','q3','q4','q5','q5'],['q1','q2','q3','q4','q5','foreign']])expect(oaSelectionValid(paper,ids)).toBe(false);
});
test('refresh restores chosen source question numbers, responses, flag and deadline only for the correct user/paper',()=>{
 const key=oaAttemptKey('student-a',paper.id),deadline=Date.now()+60000;
 const saved={...newOaAttempt(paper.id),phase:'exam',selectedQuestionIds:['q1','q2','q3','q4','q5','q8'],index:5,deadline,answers:{'q8-a':{answer:'Saved document'},foreign:{answer:'Unrelated work'}},flags:{q8:true,foreign:true}};
 localStorage.setItem(key,JSON.stringify(saved));const restored=readOaAttempt(key,paper);
 expect(oaSelectedQuestions(paper,restored).map(q=>q.number)).toEqual([1,2,3,4,5,8]);expect(restored.index).toBe(5);expect(restored.answers).toEqual({'q8-a':{answer:'Saved document'}});expect(restored.flags).toEqual({q8:true});expect(restored.deadline).toBe(deadline);expect(oaRemainingSeconds(deadline,deadline+1)).toBe(0);
 expect(readOaAttempt(oaAttemptKey('student-b',paper.id),paper).phase).toBe('instructions');
 localStorage.setItem(key,JSON.stringify({...saved,selectedQuestionIds:['q1','q2']}));expect(readOaAttempt(key,paper).phase).toBe('instructions');
});
test('partial verified keys produce an honest checked subset and never a full-paper score',()=>{
 const p={questions:[{id:'1',answerIndex:0,scoringReady:true},{id:'2',answerIndex:null,scoringReady:false}],answerKeyVerified:false};
 expect(oaPaper1Result(p,{'1':'A','2':'B'})).toEqual({score:1,maxMarks:1,questionCount:2,complete:false});expect(oaPaper1Score(p,{'1':'A'})).toBeNull();
 expect(oaPaper1Result({...p,questions:p.questions.map(q=>({...q,scoringReady:false}))},{}).maxMarks).toBe(0);
});
test('document responses preserve time and colon-bearing content without inventing fields',()=>{
 const fields=[{label:'Subject'},{label:'Message'}],values={Subject:'Meeting: office team',Message:'Start at 09:30.\nAction: bring the stock record.'};
 expect(oaFormValues(oaFormResponse(values,fields),fields)).toEqual(values);
});
