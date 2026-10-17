// Exact source-prompt transcription of the user-supplied May/June 2009 CSEC
// Principles of Business Paper 2, pages 2-4. Preserves case-study contexts,
// 7 offered questions, and compulsory Q1-3 + optional Q4/5 and Q6/7.
// This file is SOURCE wording, not a published answer key.
export const POB_2009_MJ_P2_SOURCE=Object.freeze({
 id:"POB-P2-2009-MJ",
 sourceSha256:"4bc6ceb120bb5e9d9080b079724afaa3e788bc555370efc81b37856ec8531038",
 contexts:Object.freeze({
 2:"Mrs Greenwood is the owner of Refreshing Water, a bottled water business. In the last month, she has been having mechanical problems at the factory and as a result has not been able to meet time or quantity demands.",
 5:"Mary-Jo has recently lost her job as a supervisor of a department store. She has been awarded a reasonable redundancy package and needs to live on a carefully monitored budget."
 }),
 prompts:Object.freeze({
 "1:a":"State TWO reasons why an individual may want to establish a business.",
 "1:b":"Outline THREE ways in which residents may benefit from having a business located in their community.",
 "1:c":"State THREE ways in which a planned economy is different from a free market economy.",
 "1:d":"Identify TWO benefits that a business will enjoy by converting from a partnership to a private limited company.",
 "2:a":"Define the term 'entrepreneurship'.",
 "2:b":"Explain ONE way in which Mrs Greenwood could use her entrepreneurial skills to solve the problem at Refreshing Water.",
 "2:c":"Outline THREE reasons why Mrs Greenwood may have decided to open her own business.",
 "2:d":"Identify THREE unethical practices in which Mrs Greenwood could engage to ensure that she does not lose business.",
 "2:e":"Outline THREE consequences of unethical practices in business.",
 "3:a.i":"Explain what is meant by the term 'market research'.",
 "3:a.ii":"Outline THREE reasons why businesses should conduct market research.",
 "3:b":"State TWO ways by which hotels may promote sales during the off-season.",
 "3:c":"Outline FOUR factors that may influence consumer behaviour in purchasing a cellphone.",
 "4:a.i":"Define the term 'migration'.",
 "4:a.ii":"Define the term 'labour supply'.",
 "4:b":"Identify FOUR factors that affect the labour supply of a country.",
 "4:c.i":"Outline TWO ways in which migration may affect the labour supply of the country from which workers migrate.",
 "4:c.ii":"Outline TWO ways in which migration may affect the labour supply of the country to which workers migrate.",
 "4:d":"Differentiate between production and productivity.",
 "5:a":"Define the term 'personal budgeting'.",
 "5:b":"Outline TWO ways in which Mary-Jo could benefit from budgeting.",
 "5:c.i":"State ONE advantage and ONE disadvantage of credit unions as a saving option to Mary-Jo.",
 "5:c.ii":"State ONE advantage and ONE disadvantage of commercial banks as a saving option to Mary-Jo.",
 "5:d.i":"Describe the role of the stock market.",
 "5:d.ii":"Outline ONE advantage and ONE disadvantage of EITHER investing in the stock market OR purchasing a house.",
 "6:a":"Define the term 'human resource development'.",
 "6:b":"Outline THREE ways in which human resource development can affect the economic growth and development of Caribbean countries.",
 "6:c.i":"Discuss the effect of migration on Caribbean countries.",
 "6:c.ii":"Discuss the effect of economic dualism on Caribbean countries.",
 "6:d":"Outline THREE ways in which the Caribbean Development Bank can assist in reducing the economic problems of Caribbean countries.",
 "7:a.i":"State ONE function of the World Trade Organization (WTO).",
 "7:a.ii":"State ONE function of the European Union.",
 "7:b":"State THREE benefits that Caribbean countries may enjoy from being members of CARICOM.",
 "7:c":"Outline TWO ways by which the development of the manufacturing sector can assist in reducing the economic problems of Caribbean countries.",
 "7:d.i":"Define the term 'foreign direct investment' (FDI).",
 "7:d.ii":"Outline TWO ways in which foreign direct investment can contribute to the economic growth of a country."
 })
});
export function verifyPob2009SourcePrompts(paper){
 const ids=paper?.questions?.flatMap(q=>(q.parts||[]).map(p=>q.number+":"+p.id))||[];
 const supplied=Object.keys(POB_2009_MJ_P2_SOURCE.prompts);
 return {valid:paper?.id==="POB-P2-2009-MJ" &&
   paper?.sourceSha256===POB_2009_MJ_P2_SOURCE.sourceSha256 &&
   paper.questions.length===7&&ids.length===36&&
   ids.length===supplied.length&&ids.every(id=>supplied.includes(id)&&POB_2009_MJ_P2_SOURCE.prompts[id].length>=20),
   parts:ids.length};
}
