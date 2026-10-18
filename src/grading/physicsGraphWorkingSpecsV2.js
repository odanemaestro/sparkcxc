/**
 * Rubric-gated graph-working support. These identifiers and axes are copied
 * from the real Physics Paper 2 practice bank and regression tested against it.
 * Source metadata, never student-supplied response data, selects the axes.
 */
const specimens=Object.freeze({
 "phy-p2-1-q1":Object.freeze({graphPart:"b",trianglePart:"c",readingPart:"d",
  limits:Object.freeze({xMin:0,xMax:11,yMin:0,yMax:260})}),
 "phy-p2-2-q1":Object.freeze({graphPart:"b",trianglePart:"c",readingPart:null,
  limits:Object.freeze({xMin:0,xMax:1.1,yMin:0,yMax:4.5})}),
 "phy-p2-3-q1":Object.freeze({graphPart:"a",trianglePart:"b",readingPart:null,
  limits:Object.freeze({xMin:0,xMax:0.7,yMin:0,yMax:3.5})}),
 "phy-p2-4-q1":Object.freeze({graphPart:"b",trianglePart:"c",readingPart:null,
  limits:Object.freeze({xMin:0,xMax:110,yMin:0,yMax:1.1})})
});
export function getPhysicsGraphWorkingSpec(questionId){
 return Object.hasOwn(specimens,questionId)?specimens[questionId]:null;
}
