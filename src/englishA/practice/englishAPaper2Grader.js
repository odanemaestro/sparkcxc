// SPARK English A Paper 02 rubric engine.
//
// The scoring structure follows the revised CXC 01/G/SYLL 25 specimen:
// - 10-mark summary questions: 3 Analysing + 3 Understanding + 4 Evaluating/Creating
// - 30-mark extended responses: 7 Understanding + 7 Analysing + 16 Evaluating/Creating
//
// This is a transparent practice estimate. It exposes the evidence behind each
// mark and should not be represented as a replacement for a trained examiner.

const STOPWORDS=new Set(("a an and are as at be been being but by can could did do does for from had has have he her hers him his i if in into is it its may might more most my no not of on one or our ours she should so than that the their theirs them then there these they this those to too us was we were what when where which who why will with would you your yours").split(" "));
const CONNECTORS=["however","therefore","because","although","furthermore","moreover","consequently","for example","for instance","in addition","on the other hand","as a result","first","second","finally"];
const PERSUASIVE=["should","must","need","therefore","clearly","important","benefit","because","recommend","urge","consider","convince","persuade"];
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
const clean=v=>String(v||"").replace(/\s+/g," ").trim();
const tokenise=v=>clean(v).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g)||[];
const sentenceList=v=>String(v||"").split(/[.!?]+/).map(s=>s.trim()).filter(s=>s.split(/\s+/).length>=2);
const paragraphList=v=>String(v||"").split(/\n\s*\n|\n/).map(s=>s.trim()).filter(Boolean);
const countMatches=(value,list)=>list.filter(term=>clean(value).toLowerCase().includes(term)).length;
const uniqueRatio=v=>{const w=tokenise(v);return w.length?new Set(w).size/w.length:0;};

function stem(value){
  let w=String(value||"").toLowerCase();
  if(w.endsWith("ies")&&w.length>5) w=w.slice(0,-3)+"y";
  else if(w.endsWith("ing")&&w.length>6) w=w.slice(0,-3);
  else if(w.endsWith("ed")&&w.length>5) w=w.slice(0,-2);
  else if(w.endsWith("es")&&w.length>5) w=w.slice(0,-2);
  else if(w.endsWith("s")&&w.length>4) w=w.slice(0,-1);
  return w;
}

function sourceText(stimulus){
  return [
    ...(stimulus?.paragraphs||[]),
    ...(stimulus?.situation||[]),
    stimulus?.title||"",
    stimulus?.role||"",
  ].join(" ");
}

function keyTermsFromStimulus(stimulus){
  const freq=new Map();
  tokenise(sourceText(stimulus)).forEach(raw=>{
    const w=stem(raw);
    if(w.length<4||STOPWORDS.has(w)) return;
    freq.set(w,(freq.get(w)||0)+1);
  });
  return [...freq.entries()]
    .sort((a,b)=>b[1]-a[1]||b[0].length-a[0].length)
    .slice(0,20)
    .map(([w])=>w);
}

function sourceCoverage(stimulus,response){
  const terms=keyTermsFromStimulus(stimulus);
  const candidate=new Set(tokenise(response).map(stem));
  const matched=terms.filter(term=>candidate.has(term));
  return {terms,matched,ratio:terms.length?matched.length/terms.length:0};
}

function ngrams(value,n=5){
  const w=tokenise(value).map(stem);
  const set=new Set();
  for(let i=0;i<=w.length-n;i++) set.add(w.slice(i,i+n).join(" "));
  return set;
}

function copiedPhraseRatio(stimulus,response){
  const source=ngrams(sourceText(stimulus),5);
  const candidate=ngrams(response,5);
  if(!candidate.size||!source.size) return 0;
  let copied=0;
  candidate.forEach(item=>{if(source.has(item)) copied+=1;});
  return copied/candidate.size;
}

function situationCoverage(task,response){
  const rows=(task?.stimulus?.situation||[]).map(line=>{
    const terms=tokenise(line).map(stem).filter(w=>w.length>=4&&!STOPWORDS.has(w));
    const candidate=new Set(tokenise(response).map(stem));
    const matched=terms.filter(w=>candidate.has(w));
    const needed=Math.min(2,Math.max(1,Math.ceil(terms.length*.2)));
    return {line,matched:matched.slice(0,4),covered:matched.length>=needed};
  });
  return {rows,covered:rows.filter(r=>r.covered).length,total:rows.length};
}

function diagnostics(response){
  const w=tokenise(response);
  const sentences=sentenceList(response);
  const paras=paragraphList(response);
  const avgSentence=sentences.length?w.length/sentences.length:0;
  return {
    wordCount:w.length,
    sentenceCount:sentences.length,
    paragraphCount:paras.length,
    avgSentence,
    longSentences:sentences.filter(s=>tokenise(s).length>35).length,
    veryShort:sentences.filter(s=>tokenise(s).length<4).length,
    lowercaseStarts:sentences.filter(s=>/^[a-z]/.test(s)).length,
    repeatedPunct:(String(response).match(/[!?]{2,}|\.{4,}/g)||[]).length,
    diversity:uniqueRatio(response),
  };
}

function languageBand(response,max=7){
  const d=diagnostics(response);
  if(d.wordCount<20) return {score:0,notes:["The response is too short to demonstrate sustained language control."],diagnostics:d};
  let score=max;
  const notes=[];
  if(d.diversity<.30){score-=1;notes.push("Vocabulary is repetitive. Vary word choice where it improves precision.");}
  if(d.avgSentence<7||d.avgSentence>30){score-=1;notes.push("Sentence length needs more control and variety.");}
  if(d.longSentences>=2){score-=1;notes.push("Several sentences are very long and may need clearer punctuation or division.");}
  if(d.veryShort>=Math.max(3,Math.ceil(d.sentenceCount*.3))){score-=.7;notes.push("Frequent very short sentences make the writing choppy.");}
  if(d.lowercaseStarts>0){score-=.5;notes.push("Check sentence capitalisation.");}
  if(d.repeatedPunct>0){score-=.3;notes.push("Proofread repeated punctuation.");}
  if(!notes.length) notes.push("Language is generally controlled, varied and readable.");
  return {score:round(clamp(score,0,max)),notes,diagnostics:d};
}

function formatEvidence(task,response){
  const markers=FORM_MARKERS[task?.format]||[];
  const low=clean(response).toLowerCase();
  const matched=markers.filter(m=>low.includes(m));
  return {markers,matched};
}

function wordRangePenalty(task,response){
  const wc=tokenise(response).length;
  if(task?.wordLimit){
    if(wc<=task.wordLimit) return {factor:1,wordCount:wc};
    const over=(wc-task.wordLimit)/task.wordLimit;
    return {factor:clamp(1-over*1.6,.35,1),wordCount:wc};
  }
  if(task?.wordRange){
    const [min,max]=task.wordRange;
    if(wc>=min&&wc<=max) return {factor:1,wordCount:wc};
    if(wc<min) return {factor:clamp(wc/min,.35,1),wordCount:wc};
    return {factor:clamp(1-(wc-max)/Math.max(100,max),.6,1),wordCount:wc};
  }
  return {factor:1,wordCount:wc};
}

function gradeAnalysisPart(task,response){
  const low=clean(response).toLowerCase();
  const coverage=sourceCoverage(task?.stimulus,response);
  if(!low) return {score:0,evidence:[],feedback:"Part (a) was not answered."};

  let typeSignal=0;
  if(Number(task.module)===2){
    const settingSignals=["in ","at ","during","morning","afternoon","evening","night","day","school","home","town","village","road","room","centre","center"];
    typeSignal=Math.min(1.5,countMatches(" "+low,settingSignals)*.75);
  }else if(Number(task.module)===3){
    typeSignal=/\b(persuade|convince|argue|urge|encourage|warn|discourage)\b/.test(low)?1.5:.5;
  }else{
    typeSignal=/\b(inform|explain|describe|show|outline|educate|identify)\b/.test(low)?1.5:.5;
  }
  const relevance=Math.min(1.5,coverage.matched.length*.5);
  return {
    score:round(clamp(typeSignal+relevance,0,3)),
    evidence:coverage.matched.slice(0,5),
    feedback:Number(task.module)===2
      ?"A strong answer identifies where/when the extract occurs and any important surrounding conditions."
      :"A strong answer states what the writer is trying to achieve and identifies the subject of that purpose.",
  };
}

function gradeSummary(task,response,analysisResponse){
  const analysis=gradeAnalysisPart(task,analysisResponse);
  const coverage=sourceCoverage(task?.stimulus,response);
  const lang=languageBand(response,4);
  const copyRatio=copiedPhraseRatio(task?.stimulus,response);
  const length=wordRangePenalty(task,response);

  let understanding=round(clamp(coverage.ratio*4.5,0,3));
  if(tokenise(response).length<15) understanding=Math.min(understanding,1.5);

  let evaluating=lang.score;
  if(copyRatio>.35) evaluating=Math.min(evaluating,2);
  else if(copyRatio>.20) evaluating=Math.min(evaluating,3);
  if(length.factor<1) evaluating=round(evaluating*length.factor);

  const score=round(clamp(analysis.score+understanding+evaluating,0,10));
  const feedback=[
    analysis.feedback,
    `Part (b) covers ${coverage.matched.length} of ${coverage.terms.length} high-value source ideas detected by SPARK.`,
    `Summary word count: ${length.wordCount}/${task.wordLimit||50}.`,
  ];
  if(copyRatio>.20) feedback.push("Several phrases closely match the source. Paraphrase more of the summary in your own words.");
  feedback.push(...lang.notes);

  return {
    score,maxMarks:10,confidence:"medium-high",
    dimensions:[
      {id:"analysing",label:"P2 Analysing: Part (a)",score:analysis.score,max:3,evidence:analysis.evidence},
      {id:"understanding",label:"P1 Understanding: THREE summary points",score:understanding,max:3,evidence:coverage.matched.slice(0,6)},
      {id:"evaluating",label:"P3 Evaluating & Creating: language and mechanics",score:evaluating,max:4,evidence:lang.notes},
    ],
    feedback,
    diagnostics:{...lang.diagnostics,copyRatio:round(copyRatio)},
  };
}

function gradeExposition(task,response){
  const cov=situationCoverage(task,response);
  const lang=languageBand(response,8);
  const fmt=formatEvidence(task,response);
  const d=lang.diagnostics;
  const connectors=countMatches(response,CONNECTORS);
  const length=wordRangePenalty(task,response);

  const relevance=cov?.total?Math.min(3,(cov.covered/cov.total)*3):1.5;
  const completeness=cov?.total?Math.min(4,(cov.covered/cov.total)*4):2;
  const understanding=round(relevance+completeness);

  const formatMarks=fmt.markers.length?Math.min(3,(fmt.matched.length/Math.min(2,fmt.markers.length))*3):2;
  const audience=/\b(you|your|we|our|principal|manager|students|council|community|readers)\b/i.test(response)?2:1;
  const sequencing=d.paragraphCount>=3&&connectors>=2?2:d.paragraphCount>=2?1:0;
  const analysing=round(clamp(formatMarks+audience+sequencing,0,7));

  const concision=round(clamp(3*length.factor,0,3));
  const coherence=connectors>=3&&d.paragraphCount>=3?2:connectors>=1?1:0;
  const mechanics=round(clamp(3-(d.lowercaseStarts*.4+d.repeatedPunct*.4+d.longSentences*.2),0,3));
  const language=round(clamp(lang.score*length.factor,0,8));
  const evaluating=round(clamp(concision+coherence+language+mechanics,0,16));

  return {
    score:round(understanding+analysing+evaluating),
    maxMarks:30,
    confidence:cov?.total?"medium-high":"medium",
    dimensions:[
      {id:"understanding",label:"P1 Understanding: relevance, clarity, accuracy and completeness",score:understanding,max:7,evidence:cov?.rows||[]},
      {id:"analysing",label:"P2 Analysing: format, audience and sequencing",score:analysing,max:7,evidence:fmt.matched},
      {id:"evaluating",label:"P3 Evaluating & Creating: concision, coherence, language and mechanics",score:evaluating,max:16,evidence:lang.notes},
    ],
    feedback:[
      cov?.total?`${cov.covered}/${cov.total} stimulus points are clearly represented.`:"Check that every required stimulus point is used.",
      `Format markers detected: ${fmt.matched.length?fmt.matched.join(", "):"none"}.`,
      `Word count: ${d.wordCount}.`,
      ...lang.notes,
    ],
    diagnostics:d,
  };
}

function gradeLiterary(task,response){
  const lang=languageBand(response,7);
  const d=lang.diagnostics;
  const low=clean(response).toLowerCase();
  const dialogue=(String(response).match(/[“"][^”"]+[”"]/g)||[]).length;
  const narrative=countMatches(response,NARRATIVE);
  const sensory=countMatches(response,SENSORY);
  const resolution=countMatches(response,RESOLUTION);
  const promptTerms=tokenise(task.instructions).map(stem).filter(w=>w.length>=5&&!STOPWORDS.has(w)).slice(-12);
  const candidate=new Set(tokenise(response).map(stem));
  const promptHits=promptTerms.filter(w=>candidate.has(w)).length;
  const length=wordRangePenalty(task,response);

  const promptUse=Math.min(4,1+promptHits*.8);
  const storyElements=Math.min(6,(narrative>=3?2:1)+(resolution?1.5:.5)+(dialogue?1.25:.5)+(sensory>=2?1.25:.5));
  const development=Math.min(6,d.wordCount>=300?6:d.wordCount>=200?4:d.wordCount>=120?2:1);
  const evaluating=round(clamp((promptUse+storyElements+development)*length.factor,0,16));

  const analysing=round(clamp((d.paragraphCount>=5?3:d.paragraphCount>=3?2:1)+(narrative>=4?2:narrative>=2?1:0)+(resolution?2:1),0,7));
  const understanding=round(clamp(lang.score,0,7));

  const score=round(clamp(evaluating+analysing+understanding,0,30));
  const feedback=[
    promptHits?"The response is visibly connected to the chosen stimulus.":"Make the required stimulus unmistakably central to the story.",
    dialogue?`Dialogue appears ${dialogue} time(s); make sure it develops character, action or atmosphere.`:"Dialogue is optional, but purposeful dialogue can help characterisation.",
    sensory>=2?"Sensory detail is used to build the scene.":"Use selective sensory detail to establish setting and atmosphere.",
    resolution?"A resolution/change signal is present.":"Make the conflict and ending feel causally connected rather than abrupt.",
    d.wordCount<200?"The specimen mark scheme caps very short stories (under about 200 words) at a low range. Develop the story further.":`Word count: ${d.wordCount}.`,
    ...lang.notes,
  ];

  return {
    score,maxMarks:30,confidence:"medium",
    dimensions:[
      {id:"evaluating",label:"P3 Evaluating & Creating: content and relevance of story",score:evaluating,max:16},
      {id:"analysing",label:"P2 Analysing: organisation and sequencing",score:analysing,max:7},
      {id:"understanding",label:"P1 Understanding: language, grammar, mechanics and narrative control",score:understanding,max:7,evidence:lang.notes},
    ],
    feedback,diagnostics:d,
  };
}

function gradePersuasive(task,response){
  const lang=languageBand(response,7);
  const d=lang.diagnostics;
  const low=clean(response).toLowerCase();
  const connectors=countMatches(response,CONNECTORS);
  const persuasive=countMatches(response,PERSUASIVE);
  const counter=countMatches(response,COUNTER);
  const examples=(low.match(/for example|for instance|such as|according to|survey|data|evidence|because/g)||[]).length;
  const stance=/\b(i believe|i think|i support|i oppose|should|should not|must|must not|in my view|my position)\b/.test(low);
  const length=wordRangePenalty(task,response);

  const position=stance?3:1;
  const support=Math.min(7,persuasive*.7+examples*1.2);
  const audience=/\b(you|your|we|our|readers|friends|members|community|students)\b/.test(low)?2:1;
  const opposition=Math.min(2,counter);
  const devices=Math.min(2,(low.match(/\?|must|should|imagine|consider|surely|clearly/g)||[]).length*.5);
  let evaluating=round(clamp((position+support+audience+opposition+devices)*length.factor,0,16));

  const introConclusion=(d.paragraphCount>=5?2:d.paragraphCount>=3?1:0);
  const sequencing=Math.min(3,connectors*.7);
  const logic=Math.min(2,examples>=2?2:examples?1:0);
  const analysing=round(clamp(introConclusion+sequencing+logic,0,7));

  let understanding=round(clamp(lang.score,0,7));
  if(d.wordCount<150){
    evaluating=Math.min(evaluating,6);
    analysing=Math.min(analysing,2);
    understanding=Math.min(understanding,2);
  }

  const score=round(clamp(evaluating+analysing+understanding,0,30));
  return {
    score,maxMarks:30,confidence:"medium",
    dimensions:[
      {id:"evaluating",label:"P3 Evaluating & Creating: position, support, audience and persuasive technique",score:evaluating,max:16},
      {id:"analysing",label:"P2 Analysing: argument organisation and logical sequence",score:analysing,max:7},
      {id:"understanding",label:"P1 Understanding: language, grammar, mechanics and persuasive control",score:understanding,max:7,evidence:lang.notes},
    ],
    feedback:[
      stance?"A clear position is detectable.":"State a clear position early and maintain it.",
      counter?"The response anticipates another viewpoint.":"A relevant opposing view and rebuttal can strengthen the argument.",
      examples?`Detected ${examples} supporting evidence/example signal(s).`:"Develop reasons with examples, evidence, causes/effects or comparisons.",
      d.paragraphCount>=5?"The response meets the specimen expectation of a developed multi-paragraph argument.":"The specimen mark scheme expects a developed structure with introduction, body paragraphs and conclusion.",
      d.wordCount<150?"The specimen mark scheme states that a response under about 150 words cannot earn above the low range.":`Word count: ${d.wordCount}.`,
      ...lang.notes,
    ],
    diagnostics:d,
  };
}

export function gradeEnglishAPaper2Response(task,response,analysisResponse=""){
  const value=String(response||"");
  if(task?.kind==="summary"){
    if(!value.trim()&&!String(analysisResponse||"").trim()) return {score:0,maxMarks:10,confidence:"high",dimensions:[],feedback:["No response was submitted."],diagnostics:diagnostics(value)};
    return gradeSummary(task,value,analysisResponse);
  }
  if(!value.trim()) return {score:0,maxMarks:task?.rubric?.marks||0,confidence:"high",dimensions:[],feedback:["No response was submitted."],diagnostics:diagnostics(value)};
  if(task.kind==="exposition") return gradeExposition(task,value);
  if(task.kind==="persuasive") return gradePersuasive(task,value);
  if(task.kind==="literary") return gradeLiterary(task,value);
  return {score:0,maxMarks:task?.rubric?.marks||0,confidence:"low",dimensions:[],feedback:["This task type does not yet have a practice rubric."],diagnostics:diagnostics(value)};
}

export function gradeEnglishAPaper2(paper,answers={},choiceId=""){
  const tasks=(paper?.tasks||[]).filter(task=>!task.choiceGroup||task.id===choiceId);
  const rows=tasks.map(task=>({
    task,
    ...gradeEnglishAPaper2Response(task,answers[task.id]||"",answers[`${task.id}:analysis`]||""),
  }));
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
    note:"SPARK practice estimate aligned to the profile structure in the CXC 01/G/SYLL 25 specimen mark scheme. It checks task fulfilment, stimulus use, organisation, language and mechanics and shows the evidence behind each mark. A trained examiner should still make the final judgement on extended writing.",
  };
}
