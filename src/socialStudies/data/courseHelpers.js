export const CXC_SOCIAL_STUDIES_SOURCE = Object.freeze({
  label:"CXC Social Studies Syllabus CXC 14/G/SYLL 22",
  url:"https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Social-Studies-Syllabus-July-2023.pdf",
});

export const COMMON_SOURCES = Object.freeze({
  cxc:CXC_SOCIAL_STUDIES_SOURCE,
  caricom:{ label:"CARICOM", url:"https://caricom.org/" },
  oecs:{ label:"Organisation of Eastern Caribbean States", url:"https://www.oecs.int/" },
  ccj:{ label:"Caribbean Court of Justice", url:"https://ccj.org/" },
  cdema:{ label:"Caribbean Disaster Emergency Management Agency", url:"https://www.cdema.org/" },
  undp:{ label:"United Nations Development Programme", url:"https://www.undp.org/" },
  worldBank:{ label:"World Bank", url:"https://www.worldbank.org/" },
});

export const VISUAL_SOURCES = Object.freeze({
  caribbeanBlankMap:{
    id:"caribbean-blank-map",
    title:"Caribbean map",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/7/71/BlankMap-Caribbean.svg",
    sourceUrl:"https://commons.wikimedia.org/wiki/File:BlankMap-Caribbean.svg",
    attribution:"BlankMap-Caribbean.svg by NuclearVacuum, Wikimedia Commons. Released into the public domain.",
    license:"Public domain",
  },
  familyTree:{
    id:"family-tree",
    title:"Family tree example",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/8/8e/Family_tree.svg",
    sourceUrl:"https://commons.wikimedia.org/wiki/File:Family_tree.svg",
    attribution:"Family tree.svg by Josef Sábl and Mysid, Wikimedia Commons.",
    license:"CC BY-SA 3.0 / GFDL",
  },
});

const clean = value => String(value ?? "").trim();

export function term(term, definition, example = "") {
  return { term:clean(term), definition:clean(definition), example:clean(example) };
}

export function question(prompt, choices, answer, explanation) {
  return {
    prompt:clean(prompt),
    choices:(choices || []).map(clean),
    answer:Number(answer),
    explanation:clean(explanation),
  };
}

function trimCardPrompt(value,max=108){
  const text=clean(value).replace(/\s+/g," ");
  if(text.length<=max) return text;
  const clipped=text.slice(0,max-1).replace(/\s+\S*$/,"").trim();
  return `${clipped}…`;
}

function subjectFromClause(value){
  return clean(value)
    .replace(/^(a|an|the)\s+/i,"")
    .replace(/\s+/g," ");
}

function sentenceSubject(value){
  const subject=subjectFromClause(value);
  if(!subject) return subject;
  if(/^[A-Z0-9]{2,}$/.test(subject)) return subject;
  return subject.charAt(0).toLowerCase()+subject.slice(1);
}

function subjectAux(value){
  const subject=subjectFromClause(value);
  const last=subject.split(/\s+/).pop()?.toLowerCase() || "";
  const singularSWords=new Set(["analysis","progress","status","business","process","news"]);
  return (subject.includes(" and ") || subject.includes("/") || (last.endsWith("s") && !singularSWords.has(last))) ? "do" : "does";
}

function keyPointQuestion(point,title){
  const statement=clean(point).replace(/[.!?]+$/,"");
  if(!statement) return trimCardPrompt(`Complete the idea from ${title}.`);

  const paired=statement.match(/^(.+?)\s+(?:is|are)\s+.+?;\s*(.+?)\s+(?:is|are)\s+.+$/i);
  if(paired){
    const first=sentenceSubject(paired[1]);
    const second=sentenceSubject(paired[2]);
    return trimCardPrompt(`How do ${first} and ${second} differ?`);
  }

  const patterns=[
    [/^(.+?)\s+perform(?:s)?\s+(.+)$/i,subject=>`What functions ${subjectAux(subject)} ${sentenceSubject(subject)} perform?`],
    [/^(.+?)\s+include(?:s)?\s+(.+)$/i,subject=>`What ${subjectAux(subject)} ${sentenceSubject(subject)} include?`],
    [/^(.+?)\s+involve(?:s)?\s+(.+)$/i,subject=>`What ${subjectAux(subject)} ${sentenceSubject(subject)} involve?`],
    [/^(.+?)\s+combine(?:s)?\s+(.+)$/i,subject=>`What ${subjectAux(subject)} ${sentenceSubject(subject)} combine?`],
    [/^(.+?)\s+describe(?:s)?\s+(.+)$/i,subject=>`What ${subjectAux(subject)} ${sentenceSubject(subject)} describe?`],
    [/^(.+?)\s+depend(?:s)?\s+on\s+(.+)$/i,subject=>`What ${subjectAux(subject)} ${sentenceSubject(subject)} depend on?`],
    [/^(.+?)\s+grow(?:s)?\s+from\s+(.+)$/i,subject=>`What strengthens ${sentenceSubject(subject)}?`],
    [/^(.+?)\s+come(?:s)?\s+from\s+(.+)$/i,subject=>`What should ${sentenceSubject(subject)} be based on?`],
    [/^(.+?)\s+reflect(?:s)?\s+(.+)$/i,subject=>`What ${subjectAux(subject)} ${sentenceSubject(subject)} reflect?`],
    [/^(.+?)\s+use(?:s)?\s+(.+)$/i,subject=>`What ${subjectAux(subject)} ${sentenceSubject(subject)} use?`],
    [/^(.+?)\s+help(?:s)?\s+(.+)$/i,subject=>`How ${subjectAux(subject)} ${sentenceSubject(subject)} help?`],
    [/^(.+?)\s+support(?:s)?\s+(.+)$/i,subject=>`What ${subjectAux(subject)} ${sentenceSubject(subject)} support?`],
    [/^(.+?)\s+require(?:s)?\s+(.+)$/i,subject=>`What ${subjectAux(subject)} ${sentenceSubject(subject)} require?`],
    [/^(.+?)\s+guide(?:s)?\s+(.+)$/i,subject=>`What ${subjectAux(subject)} ${sentenceSubject(subject)} guide?`],
    [/^(.+?)\s+create(?:s)?\s+(.+)$/i,subject=>`What can ${sentenceSubject(subject)} create?`],
    [/^(.+?)\s+build(?:s)?\s+(.+)$/i,subject=>`What ${subjectAux(subject)} ${sentenceSubject(subject)} build?`],
    [/^(.+?)\s+address(?:es)?\s+(.+)$/i,subject=>`What ${subjectAux(subject)} ${sentenceSubject(subject)} address?`],
    [/^(.+?)\s+can\s+(.+)$/i,subject=>`What can ${sentenceSubject(subject)} do?`],
    [/^(.+?)\s+may\s+(.+)$/i,subject=>`How may ${sentenceSubject(subject)} affect society?`],
    [/^(.+?)\s+should\s+be\s+(.+)$/i,subject=>`What should ${sentenceSubject(subject)} be like?`],
    [/^(.+?)\s+should\s+(.+)$/i,subject=>`What should ${sentenceSubject(subject)} do?`],
    [/^(.+?)\s+(?:is|are)\s+(.+)$/i,subject=>`What is important about ${sentenceSubject(subject)}?`],
  ];

  for(const [pattern,build] of patterns){
    const match=statement.match(pattern);
    if(match){
      const subject=subjectFromClause(match[1]);
      if(subject.split(/\s+/).length<=10){
        return trimCardPrompt(build(subject));
      }
    }
  }

  const words=statement.split(/\s+/).filter(Boolean);
  const visibleCount=Math.max(4,Math.min(9,Math.ceil(words.length*0.55)));
  const visible=words.slice(0,visibleCount).join(" ");
  return trimCardPrompt(`Complete the idea: ${visible} …`);
}

export function makeLesson(config = {}) {
  const vocabulary = Array.isArray(config.vocabulary) ? config.vocabulary : [];
  const keyPoints = Array.isArray(config.keyPoints) ? config.keyPoints : [];
  const explicitCards = Array.isArray(config.flashcards) ? config.flashcards : [];
  const generatedTermCards = vocabulary.map(item => ({
    front:trimCardPrompt(`What does “${item.term}” mean?`),
    back:item.definition,
  }));
  const generatedPointCards = keyPoints.slice(0,3).map(point => ({
    front:keyPointQuestion(point,config.title),
    back:point,
  }));

  return Object.freeze({
    ...config,
    objectiveCodes:(config.objectiveCodes || []).map(String),
    objectives:(config.objectives || []).map(clean),
    noteSections:(config.noteSections || []).filter(Boolean),
    examples:(config.examples || []).map(clean),
    vocabulary,
    keyPoints:keyPoints.map(clean),
    practice:(config.practice || []).filter(Boolean),
    sources:[CXC_SOCIAL_STUDIES_SOURCE, ...(config.sources || [])],
    flashcards:[...explicitCards, ...generatedTermCards, ...generatedPointCards]
      .filter(card => clean(card?.front) && clean(card?.back)),
  });
}

export function sectionMeta(id,title,subtitle,description){
  return Object.freeze({id,title,subtitle,description});
}
