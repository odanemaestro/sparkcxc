/**
 * Mark annotations in science Paper 2 schemes (Chemistry, Integrated Science).
 *
 *   "Period 3: three occupied shells (2)"            -> 2 marks
 *   "Density taken as 1.00 g cm-3 (1+1 explanation)" -> 2 marks
 *   "Use a lid (1) and/or better insulation (1)"     -> two 1-mark points
 *   no annotation                                    -> 1 mark
 */
export function sciencePointMarks(point){
  const annotations=[...String(point||"").matchAll(/\(\s*(\d(?:\s*\+\s*\d)*)(?:\s+[a-z ]+)?\s*\)/gi)];
  if(!annotations.length)return 1;
  return annotations.reduce((sum,m)=>sum+m[1].split("+").reduce((n,v)=>n+Number(v),0),0);
}

export function scienceSubPoints(point){
  const text=String(point||"");
  const parts=[...text.matchAll(/((?:[^()]|\((?!\s*\d\s*\))[^()]*\))*?)\(\s*(\d)\s*\)/g)].map(m=>[m[1],Number(m[2])]);
  if(parts.length<2)return [text];
  return parts.map(([body,marks])=>body.replace(/^\s*(?:and\/or|and|or|,|;)\s*/i,"").trim()+` (${marks})`);
}
