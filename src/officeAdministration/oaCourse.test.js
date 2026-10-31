import {OA_OBJECTIVES,OA_TOPICS,OA_SECTIONS,OA_COVERAGE,OA_COURSE_STATS,OA_EXAM,oaLocalStructure} from './data/oaCourse';
import {OA_PAPER1S} from './data/oaPaper1';
import {OA_PAPER2S,validateOaPaper2} from './data/oaPaper2';
import {payroll,stockBalance,appointmentProblem,messageFeedback,FILING_ORDER} from './officeEngine';
import {getSparkSubjectRegistry} from '../subjects/subjectRegistry';
import {loadGenericSubjectStructure} from '../subjects/genericSubjectCatalog';

test('the revised syllabus has complete instructional and revision coverage',()=>{
 expect(OA_OBJECTIVES).toHaveLength(80);expect(OA_SECTIONS).toHaveLength(11);expect(OA_TOPICS).toHaveLength(39);
 expect(new Set(OA_OBJECTIVES.map(o=>o.code)).size).toBe(80);
 for(const objective of OA_COVERAGE){expect(objective.lessonIds.length).toBeGreaterThan(0);expect(objective.sourcePage).toBeGreaterThan(0);}
 for(const topic of OA_TOPICS){const l=topic.metadata.lesson;expect(l.sections.flatMap(s=>s.paragraphs).join(' ').split(/\s+/).length).toBeGreaterThan(130);expect(l.check.question).toBeTruthy();expect(l.check.answer.length).toBeGreaterThan(30);expect(l.flashcards.every(c=>c.front&&c.back)).toBe(true);}
 expect(OA_COURSE_STATS.flashcards).toBe(119);expect(OA_TOPICS.flatMap(t=>t.metadata.lesson.sections).some(s=>s.title.includes('transport documents'))).toBe(true);
 expect(oaLocalStructure().topics).toHaveLength(39);
});
test('new papers use the 2026 format, with unique complete questions',()=>{
 expect(OA_EXAM.paper1.durationMinutes).toBe(75);expect(OA_EXAM.paper2).toMatchObject({questions:6,marks:90,durationMinutes:120,compulsory:true});
 const all=[];for(const p of OA_PAPER1S){expect(p.questions).toHaveLength(60);expect(p.durationMinutes).toBe(75);expect(new Set(p.questions.map(q=>q.id)).size).toBe(60);for(const q of p.questions){expect(q.options).toHaveLength(4);expect(new Set(q.options).size).toBe(4);expect(q.answerIndex).toBeGreaterThanOrEqual(0);expect(q.answerIndex).toBeLessThan(4);expect(q.explanation.length).toBeGreaterThan(20);expect(OA_OBJECTIVES.some(o=>o.code===q.objectiveCode)).toBe(true);all.push(q.stem);}}
 expect(new Set(all).size).toBe(120);
 expect(OA_PAPER2S).toHaveLength(3);for(const p of OA_PAPER2S)expect(validateOaPaper2(p)).toMatchObject({valid:true,totalMarks:90,knowledgeMarks:40,applicationMarks:50});
});
test('Office Administration loads through the native catalogue and stays draft until publication',async()=>{
 const subject=getSparkSubjectRegistry().find(s=>s.id==='office-administration');expect(subject).toMatchObject({enabled:false,status:'draft',implementation:'generic',routes:{study:'/study/office-administration',practice:'/practice/office-administration'}});
 const result=await loadGenericSubjectStructure({subjectId:subject.id});expect(result.data.topics).toHaveLength(39);expect(result.source).toBe('local-oa');
});
test('payroll uses stated rates and rejects invalid or impossible inputs',()=>{
 expect(payroll({hours:40,rate:750,overtimeHours:4,multiplier:1.5,deductions:3500})).toMatchObject({basic:30000,overtime:4500,gross:34500,net:31000});
 expect(payroll({hours:'',rate:750}).error).toBeTruthy();expect(payroll({hours:1,rate:100,deductions:101}).error).toBeTruthy();expect(payroll({hours:1,rate:-5}).error).toBeTruthy();
});
test('the stock record prevents negative or fractional quantities',()=>{
 expect(stockBalance(40,[{type:'receipt',quantity:25},{type:'issue',quantity:18}])).toMatchObject({balance:47,rows:[{balance:65},{balance:47}]});
 expect(stockBalance(5,[{type:'issue',quantity:6}]).error).toBeTruthy();expect(stockBalance(5,[{type:'receipt',quantity:1.5}]).error).toBeTruthy();expect(stockBalance(-1,[]).error).toBeTruthy();
});
test('appointment clashes include containment but allow adjacent bookings',()=>{
 const saved=[{date:'2027-05-12',start:'09:00',end:'10:00',name:'Visitor'}];
 expect(appointmentProblem({date:'2027-05-12',start:'09:30',end:'09:45',name:'Next'},saved)).toMatch(/overlaps/);
 expect(appointmentProblem({date:'2027-05-12',start:'08:30',end:'10:30',name:'Next'},saved)).toMatch(/overlaps/);
 expect(appointmentProblem({date:'2027-05-12',start:'10:00',end:'10:30',name:'Next'},saved)).toBeNull();
 expect(appointmentProblem({date:'2027-05-12',start:'11:00',end:'10:00',name:'Next'},saved)).toMatch(/after/);
});
test('a message is not marked complete with the wrong caller, callback or deadline',()=>{
 const m={caller:'Denise Davis, Caribbean Stationery',recipient:'Mr Brown',number:'876-555-0147',message:'Please call about purchase order 417 before 3 p.m.'};
 expect(messageFeedback(m).complete).toBe(true);expect(messageFeedback({...m,number:'876-555-9999'}).complete).toBe(false);expect(messageFeedback({...m,message:'Call about 417 after 3 p.m.'}).complete).toBe(false);expect(messageFeedback({...m,caller:'Unknown'}).complete).toBe(false);
 expect(FILING_ORDER).toEqual(['Brown, Marcia','Brown, Mark','Brown, Michael','Browne, Martin','Campbell, Alan','Clarke, Denise']);
});
