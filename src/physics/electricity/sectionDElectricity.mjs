import { SECTION_D_ELECTRICITY_MAGNETISM_LESSONS } from '../course/sectionDElectricityMagnetismLessons.mjs';

export const SECTION_D_OBJECTIVES=Object.freeze(Object.fromEntries(SECTION_D_ELECTRICITY_MAGNETISM_LESSONS.flatMap(t=>t.objectives)));
const firstSentence=s=>String(s||'').trim().split(/(?<=[.!?])\s+/)[0]||String(s||'').trim();
const clip=(s,n=210)=>{const x=String(s||'').replace(/\s+/g,' ').trim();return x.length>n?x.slice(0,n-1).trim()+'…':x};
function topicForObjective(id){return SECTION_D_ELECTRICITY_MAGNETISM_LESSONS.find(t=>t.objectives.some(([x])=>x===id));}
const CUSTOM={
'D2.5':[
{profile:'UK',stem:'A current of 2.5 A flows for 40 s. How much charge passes a point in the circuit?',correct:'100 C',distractors:['16 C','42.5 C','0.0625 C'],explanation:'Q = It = 2.5 × 40 = 100 C.'},
{profile:'UK',stem:'A charge of 360 C passes through a lamp in 3.0 minutes. The current is',correct:'2.0 A',distractors:['120 A','1.0 A','0.020 A'],explanation:'Convert 3.0 min to 180 s, then I = Q/t = 360/180 = 2.0 A.'},
{profile:'KC',stem:'Which relationship links charge Q, current I and time t?',correct:'Q = It',distractors:['Q = I/t','Q = t/I','I = Qt'],explanation:'Current is charge per unit time, so Q = It.'},
{profile:'UK',stem:'A 0.40 A current transfers 24 C. How long does the transfer take?',correct:'60 s',distractors:['9.6 s','0.0167 s','24.4 s'],explanation:'t = Q/I = 24/0.40 = 60 s.'}],
'D2.7':[
{profile:'UK',stem:'An a.c. voltage has a period of 0.020 s. Its frequency is',correct:'50 Hz',distractors:['0.020 Hz','20 Hz','500 Hz'],explanation:'f = 1/T = 1/0.020 = 50 Hz.'},
{profile:'KC',stem:'The peak value on a voltage-time graph is measured',correct:'from the zero line to the maximum value.',distractors:['from trough to crest.','over two complete cycles.','only from the negative half-cycle.'],explanation:'Peak is the maximum magnitude from zero, not the peak-to-peak value.'},
{profile:'KC',stem:'Which graph most clearly represents a steady d.c. supply?',correct:'A horizontal line at a constant non-zero voltage.',distractors:['A sine curve crossing zero repeatedly.','A curve alternating above and below zero.','A waveform with equal positive and negative halves.'],explanation:'Direct current has one direction and a steady ideal d.c. voltage is constant.'},
{profile:'UK',stem:'A complete a.c. cycle takes 10 ms. The frequency is',correct:'100 Hz',distractors:['10 Hz','0.10 Hz','1000 Hz'],explanation:'10 ms = 0.010 s, so f = 1/0.010 = 100 Hz.'}],
'D3.2':[
{profile:'UK',stem:'12 J of energy is transferred when 3 C of charge moves between two points. The potential difference is',correct:'4 V',distractors:['36 V','0.25 V','15 V'],explanation:'V = E/Q = 12/3 = 4 V.'},
{profile:'KC',stem:'One volt is equivalent to',correct:'one joule per coulomb.',distractors:['one coulomb per joule.','one watt per ampere-second only.','one ampere per ohm.'],explanation:'Potential difference is energy transferred per unit charge.'},
{profile:'UK',stem:'A 9 V battery transfers 45 J. The charge moved is',correct:'5 C',distractors:['405 C','0.2 C','54 C'],explanation:'Q = E/V = 45/9 = 5 C.'},
{profile:'UK',stem:'A charge of 0.50 C gains 6.0 J of electrical energy. The p.d. is',correct:'12 V',distractors:['3 V','6.5 V','0.083 V'],explanation:'V = E/Q = 6.0/0.50 = 12 V.'}],
'D3.3':[
{profile:'UK',stem:'A lamp operates at 12 V and draws 2.0 A. Its power is',correct:'24 W',distractors:['6 W','14 W','0.167 W'],explanation:'P = IV = 2.0 × 12 = 24 W.'},
{profile:'UK',stem:'A 60 W appliance connected to 120 V draws a current of',correct:'0.50 A',distractors:['2.0 A','60 A','7200 A'],explanation:'I = P/V = 60/120 = 0.50 A.'},
{profile:'KC',stem:'Which equation gives electrical power from current and potential difference?',correct:'P = IV',distractors:['P = I/V','P = V/I','P = I + V'],explanation:'Electrical power equals current multiplied by potential difference.'},
{profile:'UK',stem:'A device uses 1800 J in 30 s. Its average power is',correct:'60 W',distractors:['54 000 W','30 W','0.0167 W'],explanation:'P = E/t = 1800/30 = 60 W.'}],
'D4.8':[
{profile:'UK',stem:'A resistor has 6.0 V across it and carries 0.50 A. Its resistance is',correct:'12 Ω',distractors:['3 Ω','6.5 Ω','0.083 Ω'],explanation:'R = V/I = 6.0/0.50 = 12 Ω.'},
{profile:'UK',stem:'A 20 Ω resistor carries 0.30 A. The potential difference is',correct:'6.0 V',distractors:['66.7 V','20.3 V','0.015 V'],explanation:'V = IR = 0.30 × 20 = 6.0 V.'},
{profile:'KC',stem:'Resistance is defined by',correct:'R = V/I.',distractors:['R = I/V.','R = VI.','R = V + I.'],explanation:'Resistance is potential difference divided by current.'},
{profile:'UK',stem:'A current of 2 A flows through a 5 Ω resistor. The p.d. is',correct:'10 V',distractors:['2.5 V','7 V','0.4 V'],explanation:'V = IR = 2 × 5 = 10 V.'}],
'D4.11':[
{profile:'UK',stem:'Three resistors of 2 Ω, 3 Ω and 5 Ω are connected in series. Their total resistance is',correct:'10 Ω',distractors:['1 Ω','5 Ω','30 Ω'],explanation:'Series resistances add directly: 2 + 3 + 5 = 10 Ω.'},
{profile:'UK',stem:'Two 6 Ω resistors are connected in parallel. Their equivalent resistance is',correct:'3 Ω',distractors:['6 Ω','12 Ω','36 Ω'],explanation:'For equal resistors in parallel, the equivalent is half one resistor.'},
{profile:'KC',stem:'The equivalent resistance of resistors in parallel is always',correct:'less than the smallest branch resistance.',distractors:['greater than the largest branch resistance.','equal to the sum of all resistances.','zero for every parallel circuit.'],explanation:'Adding parallel paths increases total conductance, reducing equivalent resistance.'},
{profile:'UK',stem:'A 4 Ω resistor and a 12 Ω resistor are in parallel. The equivalent resistance is',correct:'3 Ω',distractors:['8 Ω','16 Ω','48 Ω'],explanation:'1/R = 1/4 + 1/12 = 1/3, so R = 3 Ω.'}],
'D4.12':[
{profile:'UK',stem:'A 2 Ω resistor is in series with a parallel pair of 6 Ω and 3 Ω. The total resistance is',correct:'4 Ω',distractors:['11 Ω','3 Ω','1 Ω'],explanation:'6 Ω || 3 Ω = 2 Ω, then add the series 2 Ω to get 4 Ω.'},
{profile:'UK',stem:'A 12 V supply is connected across a total resistance of 4 Ω. The supply current is',correct:'3 A',distractors:['48 A','0.33 A','8 A'],explanation:'I = V/R = 12/4 = 3 A.'},
{profile:'KC',stem:'When solving a series-parallel network, a useful first step is to',correct:'reduce one clearly identifiable series or parallel group at a time.',distractors:['add every resistor regardless of connection.','assume every branch carries the same current.','ignore the supply voltage.'],explanation:'Complex networks are simplified by replacing sub-networks with equivalent resistances.'},
{profile:'UK',stem:'Two 8 Ω resistors in parallel are in series with 6 Ω. The total resistance is',correct:'10 Ω',distractors:['22 Ω','14 Ω','2 Ω'],explanation:'8 Ω || 8 Ω = 4 Ω, then 4 + 6 = 10 Ω.'}],
'D4.15':[
{profile:'UK',stem:'A 1200 W appliance operates from 120 V. The normal current is 10 A. Which fuse is most suitable from 5 A, 10 A, 13 A and 30 A?',correct:'13 A',distractors:['5 A','10 A','30 A'],explanation:'Choose the next standard rating above the normal operating current.'},
{profile:'UK',stem:'A 690 W appliance runs at 230 V. Its operating current is',correct:'3.0 A',distractors:['0.33 A','230 A','158 700 A'],explanation:'I = P/V = 690/230 = 3.0 A.'},
{profile:'KC',stem:'A fuse rating should normally be',correct:'slightly above the normal operating current.',distractors:['below the normal operating current.','as large as possible.','exactly zero when switched off.'],explanation:'The rating should allow normal current but disconnect excessive current.'},
{profile:'UK',stem:'A 2.0 kW kettle is used on a 230 V supply. Its current is about 8.7 A. A suitable standard fuse is',correct:'13 A',distractors:['3 A','5 A','50 A'],explanation:'13 A is the next common rating above 8.7 A.'}],
'D5.4':[
{profile:'KC',stem:'For an AND gate with inputs 1 and 1, the output is',correct:'1',distractors:['0','undefined','alternating'],explanation:'AND gives 1 only when both inputs are 1.'},
{profile:'KC',stem:'For an OR gate with inputs 0 and 1, the output is',correct:'1',distractors:['0','undefined','alternating'],explanation:'OR gives 1 when at least one input is 1.'},
{profile:'KC',stem:'A NOT gate receives input 1. Its output is',correct:'0',distractors:['1','2','unchanged a.c.'],explanation:'NOT inverts the single input.'},
{profile:'KC',stem:'A NAND gate with inputs 1 and 1 gives',correct:'0',distractors:['1','2','no output ever'],explanation:'NAND is an AND gate followed by inversion.'}],
'D5.5':[
{profile:'UK',stem:'Inputs A and B feed an AND gate, and its output then passes through NOT. The overall function is',correct:'NAND',distractors:['NOR','OR','AND'],explanation:'An AND gate followed by inversion has the NAND truth table.'},
{profile:'UK',stem:'Inputs A and B feed an OR gate, and its output then passes through NOT. The overall function is',correct:'NOR',distractors:['NAND','AND','OR'],explanation:'An OR gate followed by inversion has the NOR truth table.'},
{profile:'UK',stem:'A circuit computes NOT(A AND B). For A = 1 and B = 0, the output is',correct:'1',distractors:['0','2','undefined'],explanation:'A AND B = 0, then NOT 0 = 1.'},
{profile:'UK',stem:'A circuit computes (A OR B) AND C. For A = 0, B = 1 and C = 1, the output is',correct:'1',distractors:['0','2','undefined'],explanation:'A OR B = 1, and 1 AND C(1) = 1.'}],
'D7.15':[
{profile:'UK',stem:'An ideal transformer has 200 turns on the primary and 50 on the secondary. With 240 V on the primary, the secondary voltage is',correct:'60 V',distractors:['960 V','240 V','15 V'],explanation:'Vs/Vp = Ns/Np, so Vs = 240 × 50/200 = 60 V.'},
{profile:'UK',stem:'An ideal transformer steps 120 V up to 600 V. If the primary current is 5.0 A, the secondary current is',correct:'1.0 A',distractors:['25 A','5 A','0.20 A'],explanation:'For an ideal transformer VpIp = VsIs, so Is = 120×5/600 = 1 A.'},
{profile:'KC',stem:'Which ideal transformer relationship is correct?',correct:'Vs/Vp = Ns/Np',distractors:['Vs/Vp = Np/Ns','VsVp = Ns/Np','Vs/Ns = VpNp'],explanation:'Voltage ratio equals turns ratio for an ideal transformer.'},
{profile:'UK',stem:'A transformer has twice as many turns on the secondary as on the primary. Ideally, the secondary voltage is',correct:'twice the primary voltage.',distractors:['half the primary voltage.','the same as the primary voltage.','zero.'],explanation:'For an ideal transformer, the voltage ratio equals the turns ratio, so the secondary voltage doubles.'}]
};
function genericSpecs(objective){
  const topic=topicForObjective(objective), card=topic.objectiveCards?.[objective]||{}, peers=topic.objectives.map(([id])=>id).filter(id=>id!==objective);
  const peerCards=peers.map(id=>topic.objectiveCards?.[id]||{});
  const correct1=clip(firstSentence(card.inShort||card.detail||SECTION_D_OBJECTIVES[objective]));
  const wrongPool=[...peerCards.map(x=>clip(firstSentence(x.inShort||x.detail))),...peerCards.map(x=>clip(firstSentence(x.watchOut)))].filter(x=>x&&x!==correct1);
  while(wrongPool.length<3)wrongPool.push('This statement does not describe the required electrical or magnetic principle.');
  const wrong=[...new Set(wrongPool)].slice(0,3);while(wrong.length<3)wrong.push(`This option does not satisfy ${objective}. ${wrong.length+1}`);
  const watch=clip(firstSentence(card.watchOut||'Ignore the stated conditions and units.'));
  const truePool=[correct1,...peerCards.map(x=>clip(firstSentence(x.inShort))).filter(Boolean)];
  const trueDistr=[...new Set(truePool.filter(x=>x!==watch))].slice(0,3);while(trueDistr.length<3)trueDistr.push(`A correct statement from ${topic.id} that does not contain the named misconception ${trueDistr.length+1}.`);
  const exam=clip(firstSentence(card.howAsked||card.inShort||SECTION_D_OBJECTIVES[objective]));
  const examDistr=[...new Set(peerCards.map(x=>clip(firstSentence(x.howAsked||x.inShort))).filter(x=>x&&x!==exam))].slice(0,3);while(examDistr.length<3)examDistr.push(`A response focused on a different ${topic.id} objective ${examDistr.length+1}.`);
  const detail=clip(firstSentence(card.detail||card.inShort||SECTION_D_OBJECTIVES[objective]));
  const detailDistr=[...new Set(peerCards.map(x=>clip(firstSentence(x.detail||x.inShort))).filter(x=>x&&x!==detail))].slice(0,3);while(detailDistr.length<3)detailDistr.push(`An unrelated claim about ${topic.title} ${detailDistr.length+1}.`);
  return [
    {profile:'KC',stem:`Which statement best addresses ${objective}: ${SECTION_D_OBJECTIVES[objective]}?`,correct:correct1,distractors:wrong,explanation:clip(card.inShort||card.detail||correct1,320)},
    {profile:'KC',stem:`Which statement is a misconception to avoid when working with ${objective}?`,correct:watch,distractors:trueDistr,explanation:clip(card.watchOut||'The selected statement conflicts with the syllabus treatment.',320)},
    {profile:'UK',stem:`Which point is most relevant when a question assesses ${objective}?`,correct:exam,distractors:examDistr,explanation:clip(card.howAsked||card.inShort||exam,320)},
    {profile:'UK',stem:`Which statement is consistent with the Physics behind ${objective}?`,correct:detail,distractors:detailDistr,explanation:clip(card.detail||card.inShort||detail,320)}
  ];
}
const SPECS=[];for(const objective of Object.keys(SECTION_D_OBJECTIVES)){const specs=CUSTOM[objective]||genericSpecs(objective);for(const spec of specs)SPECS.push({objective,...spec,tags:[]});}
function makeQuestion(spec,index){const answer=index%4,options=[...spec.distractors];options.splice(answer,0,spec.correct);return Object.freeze({id:`d-electricity-${String(index+1).padStart(3,'0')}`,objective:spec.objective,topic:spec.objective.split('.')[0],profile:spec.profile,stem:spec.stem,options:Object.freeze(options),answer,explanation:spec.explanation,traps:Object.freeze(options.map((_,i)=>i===answer?'':`This option does not satisfy ${spec.objective}.`)),tags:Object.freeze(spec.tags||[]),assessmentScope:['D4.6','D7.1','D7.4','D7.10'].includes(spec.objective)?'knowledge-support-for-practical':'objective-linked'});}
export const SECTION_D_MCQ_BANK=Object.freeze(SPECS.map(makeQuestion));
function flashcardsForTopic(topic){return topic.objectives.flatMap(([objective,syllabusWording])=>{const card=topic.objectiveCards?.[objective]||{};return [
{id:`fc-${objective.toLowerCase().replace('.','-')}-1`,objective,topic:topic.id,front:syllabusWording,back:card.inShort||card.detail||'',syllabusWording},
{id:`fc-${objective.toLowerCase().replace('.','-')}-2`,objective,topic:topic.id,front:card.formula?`State the key relationship for ${objective}.`:`What should you watch out for in ${objective}?`,back:card.formula||card.watchOut||card.detail||'',syllabusWording},
{id:`fc-${objective.toLowerCase().replace('.','-')}-3`,objective,topic:topic.id,front:`How is ${objective} assessed?`,back:card.howAsked||'Apply the stated principle accurately and include the required conditions, directions and units.',syllabusWording}]})}
export const SECTION_D_FLASHCARDS=Object.freeze(SECTION_D_ELECTRICITY_MAGNETISM_LESSONS.flatMap(flashcardsForTopic));
export const SECTION_D_TOPICS=Object.freeze(SECTION_D_ELECTRICITY_MAGNETISM_LESSONS.map(topic=>Object.freeze({id:topic.id,title:topic.title,lesson:topic,objectives:Object.freeze(Object.fromEntries(topic.objectives)),mcq:Object.freeze(SECTION_D_MCQ_BANK.filter(q=>q.topic===topic.id)),flashcards:Object.freeze(SECTION_D_FLASHCARDS.filter(c=>c.topic===topic.id))})));
function rng(seed){let s=(Number(seed)>>>0)||1;return()=>((s=(1664525*s+1013904223)>>>0)/4294967296)}function shuffle(items,random){const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out;}
export function buildSectionDObjectiveAudit({seed=1}={}){const random=rng(seed),selected=[];for(const objective of Object.keys(SECTION_D_OBJECTIVES)){const pool=SECTION_D_MCQ_BANK.filter(q=>q.objective===objective);selected.push(pool[Math.floor(random()*pool.length)]);}return shuffle(selected,random);}
export const DEFAULT_SECTION_D_CHECKPOINT_QUOTAS=Object.freeze({D1:3,D2:4,D3:2,D4:8,D5:3,D6:3,D7:7});
export function buildSectionDCheckpoint({seed=1,quotas=DEFAULT_SECTION_D_CHECKPOINT_QUOTAS}={}){const random=rng(seed),selected=[];for(const topic of SECTION_D_TOPICS){const count=Number(quotas[topic.id]||0),pool=shuffle(topic.mcq,random);if(count>pool.length)throw new Error(`Quota ${count} exceeds ${topic.id} pool`);selected.push(...pool.slice(0,count));}return shuffle(selected,random);}
export function sectionDStats(){return{section:'D',topics:SECTION_D_TOPICS.length,objectives:Object.keys(SECTION_D_OBJECTIVES).length,mcq:SECTION_D_MCQ_BANK.length,flashcards:SECTION_D_FLASHCARDS.length,byTopic:Object.fromEntries(SECTION_D_TOPICS.map(t=>[t.id,{objectives:Object.keys(t.objectives).length,mcq:t.mcq.length,flashcards:t.flashcards.length}]))};}
export const SECTION_D_PRACTICAL_ONLY_OBJECTIVES=Object.freeze(['D4.6','D7.1','D7.4','D7.10']);
