// Explicit, auditable feedback guidance for SPARK's original Paper 02.
// This is NOT an automated grader. A model answer is illustrative, and every
// response needs evidence-based evaluation before awarding partial marks.
export const POB_P2_FEEDBACK_GUIDES=Object.freeze({
 "POB-SPARK-P2-ORIGINAL-01-Q1:e":{
  strengths:["Names a suitable ownership structure.","Connects the recommendation to the sauce venture."],
  pitfalls:["Recommending a structure without explaining liability, finance or control.","Assuming every partnership has limited liability."],
  alternatives:["Partnership with justified shared investment and management.","Incorporated company with justified continuity and legal separation."],
  guidance:"Make your recommendation first, then explain three distinct reasons linked to these owners, their resources and plans for expansion."
 },
 "POB-SPARK-P2-ORIGINAL-01-Q2:d":{
  strengths:["Identifies a definite offer and an acceptance.","Explains exchange of consideration."],
  pitfalls:["Treating a counteroffer as automatic acceptance.","Claiming any quotation alone proves an enforceable contract."],
  alternatives:["A priced service quotation accepted without changes.","A counteroffer accepted by the supplier on agreed terms."],
  guidance:"Identify who offered what, how the final offer was accepted, and what each party promised to exchange. Other legal requirements still matter."
 },
 "POB-SPARK-P2-ORIGINAL-01-Q3:a":{
  strengths:["Defines productivity as output per labour input.","Calculates 300 ÷ 10 and states 30 bottles per labour hour."],
  pitfalls:["Reporting 300 bottles per hour without division.","Confusing total production with labour productivity."],
  alternatives:["30 bottles per labour hour","30 bottles/hour"],
  guidance:"Write the formula, substitute the figures, show the division and include the output-per-hour unit."
 },
 "POB-SPARK-P2-ORIGINAL-01-Q3:c":{
  strengths:["Calculates J$250 − J$130 = J$120 per bottle.","Explains that contribution pays fixed costs before profit."],
  pitfalls:["Treating contribution per unit as net profit.","Subtracting fixed costs from the per-unit contribution without a stated quantity."],
  alternatives:["J$120 contribution per bottle","120 Jamaican dollars per bottle"],
  guidance:"Show selling price minus variable cost. Explain the difference between contribution and final profit."
 },
 "POB-SPARK-P2-ORIGINAL-01-Q4:e":{
  strengths:["Connects digital stock and transport records to fewer delivery errors.","Balances operational benefits against security, cost, training or network problems."],
  pitfalls:["Listing technologies without evaluating their business impact.","Claiming tracking software prevents all shipping delays."],
  alternatives:["Stock alerts and temperature sensors with a backup plan.","Electronic delivery records and route tracking with privacy controls."],
  guidance:"Explain two practical ICT benefits for chilled goods and one significant limitation. Finish with a reasoned judgement."
 },
 "POB-SPARK-P2-ORIGINAL-01-Q5:a":{
  strengths:["Subtracts cost of sales from revenue.","Obtains J$380,000 gross profit."],
  pitfalls:["Subtracting operating expenses when asked for gross profit.","Reporting revenue as profit."],
  alternatives:["J$850,000 − J$470,000 = J$380,000"],
  guidance:"Gross profit is revenue minus cost of sales. Do not deduct operating expenses until calculating the simplified net profit."
 },
 "POB-SPARK-P2-ORIGINAL-01-Q5:b":{
  strengths:["Uses J$380,000 gross profit and deducts J$260,000.","Obtains J$120,000 simplified net profit."],
  pitfalls:["Subtracting operating expenses twice.","Presenting the figure as profit after tax when tax was not provided."],
  alternatives:["J$380,000 − J$260,000 = J$120,000"],
  guidance:"Carry forward gross profit, then subtract the stated operating expenses. Label the simplified result accurately."
 }
});
export const getPobP2FeedbackGuide=partKey=>POB_P2_FEEDBACK_GUIDES[partKey]||null;
