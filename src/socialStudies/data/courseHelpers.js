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

export function makeLesson(config = {}) {
  const vocabulary = Array.isArray(config.vocabulary) ? config.vocabulary : [];
  const keyPoints = Array.isArray(config.keyPoints) ? config.keyPoints : [];
  const explicitCards = Array.isArray(config.flashcards) ? config.flashcards : [];
  const generatedTermCards = vocabulary.map(item => ({
    front:item.term,
    back:item.definition,
  }));
  const generatedPointCards = keyPoints.slice(0,3).map((point,index) => ({
    front:`${config.title} · key idea ${index + 1}`,
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
