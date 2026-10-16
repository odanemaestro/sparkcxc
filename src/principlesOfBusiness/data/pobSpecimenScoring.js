// Preserve the exact printed CXC specimen key while separating items whose
// official answer has an unresolved academic concern. The printed comparison
// remains visible for source authenticity; the uncontested learning score
// excludes those items rather than inventing a replacement official answer.
export function scorePobSpecimen(questions=[],answers={}){
 const publishedKeyScore=questions.reduce((n,q)=>n+(answers[q.id]===q.answer?1:0),0);
 const undisputed=questions.filter(q=>q.sourceKeyAcademicReview!==true);
 const uncontestedScore=undisputed.reduce((n,q)=>n+(answers[q.id]===q.answer?1:0),0);
 return {
  publishedKeyScore,
  publishedKeyMax:questions.length,
  uncontestedScore,
  uncontestedMax:undisputed.length,
  disputedQuestionNumbers:questions.filter(q=>q.sourceKeyAcademicReview===true).map(q=>q.number),
  uncontestedPercent:undisputed.length?Math.round(100*uncontestedScore/undisputed.length):null
 };
}
