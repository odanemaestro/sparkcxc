// SPARK English A Paper 02 rubric engine.
//
// This is a transparent, deterministic CXC-style practice grader. It does not
// claim to replace a trained human examiner. It scores observable features,
// task fulfilment and stimulus coverage, then shows the evidence behind each
// mark so learners can revise their work intelligently.

const STOPWORDS=new Set(("a an and are as at be been being but by can could did do does for from had has have he her hers him his i if in into is it its may might more most my no not of on one or our ours she should so than that the their theirs them then there these they this those to too us was we were what when where which who why will with would you your yours").split(" "));
const CONNECTORS=["however","therefore","because","although","furthermore","moreover","consequently","for example","for instance","in addition","on the other hand","as a result","first","second","finally"];
const PERSUASIVE=["should","must","need","therefore","clearly","important","benefit","because","evidence","recommend","urge","consider"];
const COUNTER=["however","although","some may argue","some people argue","on the other hand","while it is true","admittedly","despite"];
const SENSORY=["saw","heard","smell","smelled","taste","tasted","felt","bright","dark","cold","warm","rough","soft","silent","loud","whisper","shout","glow"];
const RESOLUTION=["finally","eventually","at last","in the end","realised","realized","understood","decided","returned","resolved"];
const NARRATIVE=["suddenly","later","before","after","when","while","then","that morning","that night","the next day"];
const FORM_MARKERS={
  "Formal email":["subject:","dear","yours sincerely","regards"],
  "Formal letter":["dear","yours faithfully","yours sincerely"],
  "Letter to the editor":["dear editor","editor","yours faithfully","yours sincerely"],
  "Report":["report","introduction","findings","recommendation","recommendations"],
  "Speech":["good morning","good afternoon","members","friends","thank you","audience"],
  "Article":["title","headline","readers","we","you"],
  "Notice and article":["notice","date","time","students","article"],
};

const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const round=n=>Math.round(n*10)/10;
const text=v=>String(v||"").replace(/\s+/g," ").trim();
const words=v=>text(v).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g)||[];
const sentenceList=v=>String(v||"").split(/[.!?]+/).map(s=>s.trim()).filter(s=>s.split(/\s+/).length>=2);
const paragraphs=v=>String(v||"").split(/\n\s*\n|\n/).map(s=>s.trim()).filter(Boolean);
const countMatches=(value,list)=>list.filter(term=>text(value).toLowerCase().includes(term)).length;
const uniqueRatio=v=>{const w=words(v);return w.length?new Set(w).size/w.length:0;};

function keyTermsFromStimulus(stimulus){
  const source=[
    ...(stimulus?.paragraphs||[]),
    ...(stimulus?.situation||[]),
    stimulus?.title||"",
    stimulus?.role||"",
  ].join(" ");
  const freq=new Map();
  words(source).forEach(w=>{
    if(w.length<5||STOPWORDS.has(w)) return;
    freq.set(w,(freq.get(w)||0)+1);
  });
  return [...freq.entries()].sort((a,b)=>b[1]-a[1]||b[0].length-a[0].length).slice(0,20).map(([w])=>w);
}

function situationCoverage(task,response){
  const lines=task?.stimulus?.situation||[];
  if(!lines.length) return null;
  const low=text(response).toLowerCase();
  const rows=lines.map(line=>{
    const terms=words(line).filter(w=>w.length>=5&&!STOPWORDS.has(w));
    const matched=terms.filter(w=>low.includes(w));
    return {line,matched:matched.slice(0,4),covered:matched.length>=Math.min(2,Math.max(1,Math.ceil(terms.length*.2)))};
  });
  return {rows,covered:rows.filter(r=>r.covered).length,total:rows.length};
}

function stimulusCoverage(task,response){
  const terms=keyTermsFromStimulus(task?.stimulus);
  const low=text(response).toLowerCase();
  const matched=terms.filter(w=>low.includes(w));
  return {terms,matched,ratio:terms.length?matched.length/terms.length:0};
}

function languageDiagnostics(response){
  const w=words(response),sentences=sentenceList(response),paras=paragraphs(response);
  const avgSentence=sentences.length?w.length/sentences.length:0;
  const longSentences=sentences.filter(s=>words(s).length>35).length;
  const veryShort=sentences.filter(s=>words(s).length<4).length;
  const lowercaseStarts=sentences.filter(s=>/^[a-z]/.test(s)).length;
  const repeatedPunct=(String(response).match(/[!?]{2,}|\.{4,}/g)||[]).length;
  const apostropheSpacing=(String(response).match(/\s['’]|['’]\s/g)||[]).length;
  const diversity=uniqueRatio(response);
  return {wordCount:w.length,sentenceCount:sentences.length,paragraphCount:paras.length,avgSentence,longSentences,veryShort,lowercaseStarts,repeatedPunct,apostropheSpacing,diversity};
}

function languageScore(response,max=4){
  const d=languageDiagnostics(response);
  if(d.wordCount<20) return {score:0,diagnostics:d,notes:["Response is too short to demonstrate sustained control of language."]};
  let score=max;
  const notes=[];
  if(d.diversity<.32){score-=.7;notes.push("Vocabulary is quite repetitive.");}
  if(d.avgSentence<7||d.avgSentence>28){score-=.6;notes.push("Sentence lengths need more control and variety.");}
  if(d.longSentences>=2){score-=.5;notes.push("Several sentences are very long and may need clearer punctuation.");}
  if(d.veryShort>=Math.max(3,Math.ceil(d.sentenceCount*.3))){score-=.5;notes.push("Many very short sentences make the writing feel choppy.");}
  if(d.lowercaseStarts>0){score-=.3;notes.push("Check sentence capitalisation.");}
  if(d.repeatedPunct>0||d.apostropheSpacing>0){score-=.3;notes.push("Proofread punctuation and spacing.");}
  if(!notes.length) notes.push("Sentence control, vocabulary and mechanics are generally strong.");
  return {score:round(clamp(score,0,max)),diagnostics:d,notes};
}

function lengthScore(task,response,max){
  const wc=words(response).length;
  if(task.wordLimit){
    if(wc<=task.wordLimit && wc>=Math.max(50,task.wordLimit*.55)) return max;
    if(wc>task.wordLimit) return clamp(max-(wc-task.wordLimit)/(task.wordLimit*.25)*max,0,max);
    return clamp(wc/(task.wordLimit*.55)*max,0,max);
  }
  if(task.wordRange){
    const [min,maxWords]=task.wordRange;
    if(wc>=min&&wc<=maxWords) return max;
    const distance=wc<min?min-wc:wc-maxWords;
    return clamp(max-distance/(Math.max(60,min*.3))*max,0,max);
  }
  return max;
}

function gradeSummary(task,response){
  const coverage=stimulusCoverage(task,response);
  const lang=languageScore(response,2);
  const wc=words(response).length;
  const paragraphCount=paragraphs(response).length;
  const content=round(clamp(coverage.ratio*6.8,0,6));
  const concision=round(lengthScore(task,response,1));
  const organisation=paragraphCount===1?1:paragraphCount<=2?.6:.3;
  const score=round(clamp(content+concision+organisation+lang.score,0,10));
  const feedback=[];
  feedback.push(`Covered ${coverage.matched.length} of ${coverage.terms.length} high-value ideas detected in the source.`);
  if(task.wordLimit&&wc>task.wordLimit) feedback.push(`The response is ${wc-task.wordLimit} words over the ${task.wordLimit}-word limit.`);
  else if(task.wordLimit) feedback.push(`Word count: ${wc}/${task.wordLimit}.`);
  if(paragraphCount!==1) feedback.push("The task asks for one continuous paragraph.");
  return {score,maxMarks:10,confidence:coverage.terms.length>=10?"medium-high":"medium",dimensions:[
    {id:"content",label:"Selection of essential ideas",score:content,max:6,evidence:coverage.matched},
    {id:"concision",label:"Concision and word limit",score:concision,max:1},
    {id:"organisation",label:"Continuous prose and organisation",score:organisation,max:1},
    {id:"language",label:"Language and mechanics",score:lang.score,max:2,evidence:lang.notes},
  ],feedback,diagnostics:lang.diagnostics};
}

function formatScore(task,response,max=4){
  const format=task.format;
  if(!format) return {score:max,matched:[]};
  const markers=FORM_MARKERS[format]||[];
  if(!markers.length) return {score:max*.75,matched:[]};
  const low=text(response).toLowerCase();
  const matched=markers.filter(m=>low.includes(m));
  return {score:round(clamp((matched.length/Math.min(2,markers.length))*max,0,max)),matched};
}

function gradeExposition(task,response){
  const cov=situationCoverage(task,response);
  const lang=languageScore(response,4);
  const fmt=formatScore(task,response,4);
  const paras=paragraphs(response).length;
  const connectorHits=countMatches(response,CONNECTORS);
  const content=cov?round(clamp((cov.covered/cov.total)*10,0,10)):5;
  const organisation=round(clamp((paras>=3?3:paras===2?2:1)+(connectorHits>=3?2:connectorHits>=1?1:0),0,5));
  const development=round(clamp((words(response).length/Math.max(1,task.wordRange?.[0]||250))*5,0,5));
  const language=lang.score;
  const form=fmt.score;
  const mechanics=round(lengthScore(task,response,2));
  const score=round(clamp(content+organisation+development+form+language+mechanics,0,30));
  return {score,maxMarks:30,confidence:cov?"medium-high":"medium",dimensions:[
    {id:"content",label:"Relevant stimulus information",score:content,max:10,evidence:cov?.rows||[]},
    {id:"organisation",label:"Organisation and cohesion",score:organisation,max:5,evidence:[`${paras} paragraph(s)`,`${connectorHits} clear linking signal(s)`]},
    {id:"development",label:"Development and clarity",score:development,max:5},
    {id:"format",label:"Format, audience and register",score:form,max:4,evidence:fmt.matched},
    {id:"language",label:"Language control",score:language,max:4,evidence:lang.notes},
    {id:"mechanics",label:"Length and task discipline",score:mechanics,max:2},
  ],feedback:[`Word count: ${words(response).length}.`,cov?`${cov.covered}/${cov.total} stimulus points are clearly represented.`:"Check that all stimulus points are covered."],diagnostics:lang.diagnostics};
}

function gradePersuasive(task,response){
  const lang=languageScore(response,4);
  const low=text(response).toLowerCase();
  const paraCount=paragraphs(response).length;
  const connectorHits=countMatches(response,CONNECTORS);
  const persuasiveHits=countMatches(response,PERSUASIVE);
  const counterHits=countMatches(response,COUNTER);
  const examples=(low.match(/for example|for instance|such as|according to|survey|data|evidence/g)||[]).length;
  const stance=/\b(i believe|i think|i support|i oppose|should|should not|must|must not|in my view|my position)\b/.test(low);
  const content=round(clamp((stance?3:0)+Math.min(3,persuasiveHits*.6)+Math.min(4,examples*1.3),0,10));
  const reasoning=round(clamp(Math.min(3,connectorHits*.7)+Math.min(2,counterHits),0,5));
  const organisation=round(clamp((paraCount>=4?3:paraCount>=2?2:1)+Math.min(2,connectorHits*.5),0,5));
  const format=formatScore(task,response,4);
  const mechanics=round(lengthScore(task,response,2));
  const score=round(clamp(content+reasoning+organisation+format.score+lang.score+mechanics,0,30));
  const feedback=[
    stance?"A clear position is detectable.":"State a clear position early and maintain it.",
    counterHits?"The response acknowledges another viewpoint.":"Consider a genuine counterargument and rebuttal.",
    examples?`Detected ${examples} evidence/example signal(s).`:"Use concrete examples, facts or evidence to develop reasons.",
    `Word count: ${words(response).length}.`,
  ];
  return {score,maxMarks:30,confidence:"medium",dimensions:[
    {id:"position",label:"Position, reasons and evidence",score:content,max:10},
    {id:"reasoning",label:"Logic, counterargument and rebuttal",score:reasoning,max:5},
    {id:"organisation",label:"Organisation and cohesion",score:organisation,max:5},
    {id:"format",label:"Audience, form and register",score:format.score,max:4,evidence:format.matched},
    {id:"language",label:"Language control and persuasive expression",score:lang.score,max:4,evidence:lang.notes},
    {id:"mechanics",label:"Length and task discipline",score:mechanics,max:2},
  ],feedback,diagnostics:lang.diagnostics};
}

function gradeLiterary(task,response){
  const lang=languageScore(response,8);
  const low=text(response).toLowerCase();
  const paraCount=paragraphs(response).length;
  const dialogue=(String(response).match(/[“"][^”"]+[”"]/g)||[]).length;
  const narrative=countMatches(response,NARRATIVE);
  const sensory=countMatches(response,SENSORY);
  const resolution=countMatches(response,RESOLUTION);
  const promptWords=words(task.instructions).filter(w=>w.length>=5&&!STOPWORDS.has(w)).slice(-12);
  const promptHits=promptWords.filter(w=>low.includes(w)).length;
  const promptUse=round(clamp(2+Math.min(3,promptHits*.8),0,5));
  const plot=round(clamp(Math.min(3,narrative*.55)+Math.min(2,resolution),0,5));
  const craft=round(clamp(Math.min(2.5,sensory*.45)+Math.min(2.5,dialogue*.6),0,5));
  const organisation=round(clamp((paraCount>=5?3:paraCount>=3?2:1)+(narrative>=3?2:1),0,5));
  const mechanics=round(lengthScore(task,response,2));
  const score=round(clamp(promptUse+plot+craft+organisation+lang.score+mechanics,0,30));
  const feedback=[
    promptHits?"The response appears connected to the chosen prompt.":"Make the required prompt or situation unmistakably central to the story.",
    dialogue?`Dialogue is used ${dialogue} time(s).`:"Dialogue is optional, but purposeful dialogue can reveal character and conflict.",
    sensory?`Detected ${sensory} sensory/detail signal(s).`:"Add selective sensory detail to make scenes more vivid.",
    resolution?"A resolution/change signal is present.":"Make sure the ending grows from the conflict rather than stopping suddenly.",
    `Word count: ${words(response).length}.`,
  ];
  return {score,maxMarks:30,confidence:"medium",dimensions:[
    {id:"prompt",label:"Use of prompt and task fulfilment",score:promptUse,max:5},
    {id:"plot",label:"Plot, conflict and resolution",score:plot,max:5},
    {id:"craft",label:"Character, setting and narrative craft",score:craft,max:5},
    {id:"organisation",label:"Structure, pace and paragraphing",score:organisation,max:5},
    {id:"language",label:"Style and language control",score:lang.score,max:8,evidence:lang.notes},
    {id:"mechanics",label:"Length and task discipline",score:mechanics,max:2},
  ],feedback,diagnostics:lang.diagnostics};
}

export function gradeEnglishAPaper2Response(task,response){
  const value=String(response||"");
  if(!value.trim()) return {score:0,maxMarks:task?.rubric?.marks||0,confidence:"high",dimensions:[],feedback:["No response was submitted."],diagnostics:languageDiagnostics(value)};
  if(task.kind==="summary") return gradeSummary(task,value);
  if(task.kind==="exposition") return gradeExposition(task,value);
  if(task.kind==="persuasive") return gradePersuasive(task,value);
  if(task.kind==="literary") return gradeLiterary(task,value);
  return {score:0,maxMarks:task?.rubric?.marks||0,confidence:"low",dimensions:[],feedback:["This task type does not yet have an automated practice rubric."],diagnostics:languageDiagnostics(value)};
}

export function gradeEnglishAPaper2(paper,answers={},choiceId=""){
  const tasks=(paper?.tasks||[]).filter(task=>!task.choiceGroup||task.id===choiceId);
  const rows=tasks.map(task=>({task,...gradeEnglishAPaper2Response(task,answers[task.id]||"")}));
  const score=round(rows.reduce((sum,row)=>sum+row.score,0));
  const maxScore=rows.reduce((sum,row)=>sum+row.maxMarks,0);
  return {
    rows,
    score,
    maxScore,
    percent:maxScore?Math.round(score/maxScore*100):0,
    modules:[1,2,3].map(module=>{
      const moduleRows=rows.filter(row=>row.task.module===module);
      return {module,score:round(moduleRows.reduce((sum,row)=>sum+row.score,0)),max:moduleRows.reduce((sum,row)=>sum+row.maxMarks,0)};
    }),
    note:"SPARK estimate based on task fulfilment, stimulus coverage, organisation, language, form and mechanics. Extended writing should still be reviewed by a teacher or examiner for a final judgement.",
  };
}
