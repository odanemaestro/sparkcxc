// Derived completion counts for a structured exam. Blank or whitespace-only
// responses are not counted as answered.
export function pobPaper2Completion(questions,answers={}){
 return questions.map((q,index)=>({
  index,
  answered:q.items.filter(part=>String(answers[q.id+":"+part.id]||"").trim().length>0).length,
  total:q.items.length
 }));
}
export function nextIncompletePobQuestion(questions,answers={},currentIndex=0){
 const counts=pobPaper2Completion(questions,answers);
 if(!counts.length)return null;
 for(let step=1;step<=counts.length;step++){
  const item=counts[(currentIndex+step)%counts.length];
  if(item.answered<item.total)return item.index;
 }
 return null;
}
