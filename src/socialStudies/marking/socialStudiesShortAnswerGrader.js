import {
  matchedSocialStudiesConcepts,
  mentionsSocialStudiesConcept,
  mentionsSocialStudiesPhrase,
  normalizeSocialStudiesText,
} from "./socialStudiesAnswerLexicon";

const CAUSAL_WORDS=[
  "because","therefore","so that","so","which means","this means","as a result",
  "resulting in","leading to","leads to","helps","allows","enables","encourages",
  "reduces","increases","improves","prevents","protects","ensures","makes it easier"
];

function nonBlank(value){
  return normalizeSocialStudiesText(value).length>0;
}

function evidenceLabel(point){
  return point.label || point.id || "Valid point";
}

function hasDevelopmentLanguage(value){
  const text=normalizeSocialStudiesText(value);
  return CAUSAL_WORDS.some(word=>text.includes(word));
}

function pointMatches(value,point){
  const conceptMatch=(point.concepts || []).some(id=>mentionsSocialStudiesConcept(value,id));
  const phraseMatch=(point.phrases || []).some(phrase=>mentionsSocialStudiesPhrase(value,phrase));
  return conceptMatch || phraseMatch;
}

function developmentMatches(value,point){
  const conceptMatch=(point.developmentConcepts || []).some(id=>mentionsSocialStudiesConcept(value,id));
  const phraseMatch=(point.developmentPhrases || []).some(phrase=>mentionsSocialStudiesPhrase(value,phrase));
  if(conceptMatch || phraseMatch) return true;
  if(point.allowGeneralDevelopment && pointMatches(value,point) && hasDevelopmentLanguage(value)) return true;
  return false;
}

function splitResponse(value){
  return String(value ?? "")
    .split(/(?:\n+|[.;]+|\bfirst(?:ly)?\b|\bsecond(?:ly)?\b|\bthird(?:ly)?\b|\bnext\b)/i)
    .map(item=>item.trim())
    .filter(Boolean);
}

function candidateWindows(value){
  const segments=splitResponse(value);
  if(!segments.length) return [String(value ?? "")];
  const windows=[...segments];
  for(let i=0;i<segments.length-1;i+=1){
    windows.push(segments[i]+" "+segments[i+1]);
  }
  windows.push(String(value ?? ""));
  return windows;
}

function gradeList(value,scheme){
  const maxPoints=Number(scheme.maxPoints || 1);
  const marksPerPoint=Number(scheme.marksPerPoint || 1);
  const maxMarks=Number(scheme.maxMarks || maxPoints*marksPerPoint);
  const matches=[];

  for(const point of scheme.points || []){
    if(matches.length>=maxPoints) break;
    if(pointMatches(value,point)){
      matches.push({
        id:point.id,
        code:point.code || ("B"+(matches.length+1)),
        label:evidenceLabel(point),
        earned:true,
        marks:marksPerPoint,
        maxMarks:marksPerPoint,
        profile:point.profile || scheme.profile || "KC",
      });
    }
  }

  const marks=Math.min(maxMarks,matches.reduce((sum,item)=>sum+item.marks,0));
  return {
    marks,
    maxMarks,
    criteria:matches,
    feedback:marks===maxMarks ? "Full marks." : "Add another distinct valid point.",
  };
}

function gradeDefinition(value,scheme){
  const groups=scheme.groups || [];
  const criteria=groups.map((group,index)=>{
    const conceptOk=(group.concepts || []).some(id=>mentionsSocialStudiesConcept(value,id));
    const phraseOk=(group.phrases || []).some(phrase=>mentionsSocialStudiesPhrase(value,phrase));
    const earned=conceptOk || phraseOk;
    return {
      id:group.id || ("definition-"+index),
      code:group.code || ("B"+(index+1)),
      label:group.label || "Required part of the definition",
      earned,
      marks:earned ? Number(group.marks || 1) : 0,
      maxMarks:Number(group.marks || 1),
      profile:group.profile || scheme.profile || "KC",
    };
  });
  const maxMarks=Number(scheme.maxMarks || criteria.reduce((sum,item)=>sum+item.maxMarks,0));
  const marks=Math.min(maxMarks,criteria.reduce((sum,item)=>sum+item.marks,0));
  return {
    marks,
    maxMarks,
    criteria,
    feedback:marks===maxMarks ? "Full marks." : "The definition is partly correct but is missing an essential idea.",
  };
}

function gradePairs(value,scheme){
  const text=String(value ?? "");
  const criteria=(scheme.pairs || []).map((pair,index)=>{
    const keyOk=(pair.keys || []).some(key=>mentionsSocialStudiesPhrase(text,key));
    const valueOk=(pair.concepts || []).some(id=>mentionsSocialStudiesConcept(text,id))
      || (pair.values || []).some(item=>mentionsSocialStudiesPhrase(text,item));
    let together=false;
    for(const window of candidateWindows(text)){
      const windowKey=(pair.keys || []).some(key=>mentionsSocialStudiesPhrase(window,key));
      const windowValue=(pair.concepts || []).some(id=>mentionsSocialStudiesConcept(window,id))
        || (pair.values || []).some(item=>mentionsSocialStudiesPhrase(window,item));
      if(windowKey && windowValue){ together=true; break; }
    }
    const earned=together || (keyOk && valueOk && (scheme.allowLoosePairing || false));
    return {
      id:pair.id || ("pair-"+index),
      code:pair.code || ("B"+(index+1)),
      label:pair.label || "Correct data pairing",
      earned,
      marks:earned ? Number(pair.marks || 1) : 0,
      maxMarks:Number(pair.marks || 1),
      profile:pair.profile || scheme.profile || "KC",
    };
  });
  const maxMarks=Number(scheme.maxMarks || criteria.reduce((sum,item)=>sum+item.maxMarks,0));
  const marks=Math.min(maxMarks,criteria.reduce((sum,item)=>sum+item.marks,0));
  return {
    marks,
    maxMarks,
    criteria,
    feedback:marks===maxMarks ? "Full marks." : "Check each item against the information provided.",
  };
}

function gradeCriteria(value,scheme){
  const criteria=(scheme.criteria || []).map((criterion,index)=>{
    const anyConceptOk=!(criterion.anyConcepts || []).length
      || (criterion.anyConcepts || []).some(id=>mentionsSocialStudiesConcept(value,id));
    const allConceptOk=!(criterion.allConcepts || []).length
      || (criterion.allConcepts || []).every(id=>mentionsSocialStudiesConcept(value,id));
    const anyPhraseOk=!(criterion.anyPhrases || []).length
      || (criterion.anyPhrases || []).some(item=>mentionsSocialStudiesPhrase(value,item));
    const allPhraseOk=!(criterion.allPhrases || []).length
      || (criterion.allPhrases || []).every(item=>mentionsSocialStudiesPhrase(value,item));

    const hasPositiveCondition=(criterion.anyConcepts || []).length
      || (criterion.allConcepts || []).length
      || (criterion.anyPhrases || []).length
      || (criterion.allPhrases || []).length;
    const positive=hasPositiveCondition && anyConceptOk && allConceptOk && anyPhraseOk && allPhraseOk;
    const blocked=(criterion.noneConcepts || []).some(id=>mentionsSocialStudiesConcept(value,id))
      || (criterion.nonePhrases || []).some(item=>mentionsSocialStudiesPhrase(value,item));
    const earned=positive && !blocked;

    return {
      id:criterion.id || ("criterion-"+index),
      code:criterion.code || ("B"+(index+1)),
      label:criterion.label || "Required idea",
      earned,
      marks:earned ? Number(criterion.marks || 1) : 0,
      maxMarks:Number(criterion.marks || 1),
      profile:criterion.profile || scheme.profile || "KC",
    };
  });

  const maxMarks=Number(scheme.maxMarks || criteria.reduce((sum,item)=>sum+item.maxMarks,0));
  const marks=Math.min(maxMarks,criteria.reduce((sum,item)=>sum+item.marks,0));
  return {
    marks,
    maxMarks,
    criteria,
    feedback:marks===maxMarks ? "Full marks." : "One or more required ideas are missing.",
  };
}

function scoreDevelopedPoint(window,point,scheme,index){
  if(!pointMatches(window,point)) return null;
  const baseMarks=Number(point.baseMarks ?? 1);
  const developmentMarks=Number(point.developmentMarks ?? 1);
  const developed=developmentMatches(window,point);
  return {
    id:point.id,
    code:point.code || ("UK"+(index+1)),
    label:evidenceLabel(point),
    earned:true,
    developed,
    marks:baseMarks+(developed?developmentMarks:0),
    maxMarks:baseMarks+developmentMarks,
    profile:point.profile || scheme.profile || "UK",
  };
}

function gradeDevelopedPoints(value,scheme){
  const maxPoints=Number(scheme.maxPoints || 2);
  const windows=candidateWindows(value);
  const candidates=[];

  (scheme.points || []).forEach((point,index)=>{
    let best=null;
    windows.forEach(window=>{
      const result=scoreDevelopedPoint(window,point,scheme,index);
      if(result && (!best || result.marks>best.marks)) best=result;
    });
    if(best) candidates.push(best);
  });

  candidates.sort((a,b)=>b.marks-a.marks || a.id.localeCompare(b.id));
  const selected=candidates.slice(0,maxPoints);
  const maxMarks=Number(scheme.maxMarks || maxPoints*2);
  const marks=Math.min(maxMarks,selected.reduce((sum,item)=>sum+item.marks,0));

  return {
    marks,
    maxMarks,
    criteria:selected,
    feedback:marks===maxMarks
      ? "Full marks."
      : marks>0
        ? "Relevant point found. Develop the point by showing how or why it affects the situation."
        : "No clearly markable point was found from the accepted answer bank.",
  };
}

function gradeLinkedDevelopment(value,scheme,context={}){
  const previous=String(context.previousResponse || "");
  const maxPoints=Number(scheme.maxPoints || 2);
  const segmented=splitResponse(value);
  const windows=segmented.length ? segmented : [String(value || "")];
  const eligible=(scheme.links || []).filter(link=>
    (link.triggerConcepts || []).some(id=>mentionsSocialStudiesConcept(previous,id))
    || (link.triggerPhrases || []).some(phrase=>mentionsSocialStudiesPhrase(previous,phrase))
  );

  const criteria=[];
  const used=new Set();
  const usedEvidence=new Set();

  eligible.forEach((link,index)=>{
    let bestWindow="";
    let resultMatch=false;
    let partialMatch=false;

    windows.forEach(window=>{
      const evidenceKey=normalizeSocialStudiesText(window);
      if(!evidenceKey || usedEvidence.has(evidenceKey)) return;
      const effect=(link.resultConcepts || []).some(id=>mentionsSocialStudiesConcept(window,id))
        || (link.resultPhrases || []).some(phrase=>mentionsSocialStudiesPhrase(window,phrase));
      const strategy=(link.triggerConcepts || []).some(id=>mentionsSocialStudiesConcept(window,id))
        || (link.triggerPhrases || []).some(phrase=>mentionsSocialStudiesPhrase(window,phrase));
      const causal=hasDevelopmentLanguage(window);

      if(effect && (causal || strategy || normalizeSocialStudiesText(window).split(/\s+/).length>=6)){
        resultMatch=true;
        bestWindow=window;
      }else if(effect || (strategy && causal)){
        partialMatch=true;
        if(!bestWindow) bestWindow=window;
      }
    });

    const marks=resultMatch?2:partialMatch?1:0;
    if(marks>0 && !used.has(link.id)){
      used.add(link.id);
      if(bestWindow) usedEvidence.add(normalizeSocialStudiesText(bestWindow));
      criteria.push({
        id:link.id,
        code:link.code || ("UK"+(index+1)),
        label:link.label || "Explains why the earlier strategy is likely to work",
        earned:true,
        developed:marks===2,
        marks,
        maxMarks:2,
        profile:link.profile || scheme.profile || "UK",
        evidence:bestWindow,
      });
    }
  });

  criteria.sort((a,b)=>b.marks-a.marks);
  const selected=criteria.slice(0,maxPoints);
  const maxMarks=Number(scheme.maxMarks || maxPoints*2);
  const marks=Math.min(maxMarks,selected.reduce((sum,item)=>sum+item.marks,0));

  if(!normalizeSocialStudiesText(previous)){
    return {
      marks:0,
      maxMarks,
      criteria:[],
      feedback:"The explanation depends on the strategy or action given in the previous part.",
    };
  }

  return {
    marks,
    maxMarks,
    criteria:selected,
    feedback:marks===maxMarks
      ? "Full marks. The explanations follow through from the earlier strategies."
      : marks>0
        ? "Some follow-through credit earned. Explain how or why each earlier strategy produces the stated result."
        : "The explanation does not yet connect clearly to the strategies given in the previous part.",
  };
}

export function gradeSocialStudiesShortAnswer(value,scheme={},context={}){
  const maxMarks=Number(scheme.maxMarks || 0);
  if(!nonBlank(value)){
    return {
      status:"blank",
      marks:0,
      maxMarks,
      criteria:[],
      feedback:"No response.",
      reviewSuggested:false,
    };
  }

  let result;
  if(scheme.type==="list") result=gradeList(value,scheme);
  else if(scheme.type==="definition") result=gradeDefinition(value,scheme);
  else if(scheme.type==="pairs") result=gradePairs(value,scheme);
  else if(scheme.type==="criteria") result=gradeCriteria(value,scheme);
  else if(scheme.type==="developed_points") result=gradeDevelopedPoints(value,scheme);
  else if(scheme.type==="linked_development") result=gradeLinkedDevelopment(value,scheme,context);
  else result={marks:0,maxMarks,criteria:[],feedback:"No automatic marking scheme is available for this part."};

  const words=normalizeSocialStudiesText(value).split(/\s+/).filter(Boolean).length;
  const reviewSuggested=result.marks<result.maxMarks && words>=8;
  return {
    ...result,
    status:result.marks>=result.maxMarks ? "correct" : result.marks>0 ? "partial" : "incorrect",
    reviewSuggested,
  };
}

export function gradeSocialStudiesStructuredPaper(responses={},questions=[]){
  let score=0;
  let maxScore=0;
  const perQuestion={};

  questions
    .filter(question=>question.type==="structured")
    .forEach(question=>{
      let questionScore=0;
      let questionMax=0;
      const parts={};
      (question.parts || []).forEach((part,index)=>{
        const key=question.id+":part:"+index;
        const followFrom=Number(part.marking?.followFromPartIndex);
        const previousKey=Number.isInteger(followFrom) ? question.id+":part:"+followFrom : null;
        const result=gradeSocialStudiesShortAnswer(
          responses[key] || "",
          part.marking || {maxMarks:part.marks},
          {previousResponse:previousKey ? responses[previousKey] || "" : ""}
        );
        parts[key]=result;
        score+=result.marks;
        maxScore+=result.maxMarks;
        questionScore+=result.marks;
        questionMax+=result.maxMarks;
      });
      perQuestion[question.id]={score:questionScore,maxScore:questionMax,parts};
    });

  return {
    score,
    maxScore,
    percent:maxScore?Math.round(score/maxScore*100):0,
    perQuestion,
  };
}

export function acceptedConceptsForScheme(scheme={}){
  if(scheme.type==="list" || scheme.type==="developed_points"){
    return (scheme.points || []).flatMap(point=>point.concepts || []);
  }
  if(scheme.type==="definition"){
    return (scheme.groups || []).flatMap(group=>group.concepts || []);
  }
  if(scheme.type==="criteria"){
    return (scheme.criteria || []).flatMap(item=>[
      ...(item.anyConcepts || []),
      ...(item.allConcepts || []),
    ]);
  }
  if(scheme.type==="pairs"){
    return (scheme.pairs || []).flatMap(pair=>pair.concepts || []);
  }
  if(scheme.type==="linked_development"){
    return (scheme.links || []).flatMap(link=>[
      ...(link.triggerConcepts || []),
      ...(link.resultConcepts || []),
    ]);
  }
  return [];
}

export function conceptCoverage(value,scheme={}){
  const concepts=[...new Set(acceptedConceptsForScheme(scheme))];
  return {
    expectedConcepts:concepts,
    matchedConcepts:matchedSocialStudiesConcepts(value,concepts),
  };
}
