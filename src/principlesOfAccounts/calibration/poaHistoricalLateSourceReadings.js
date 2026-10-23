import {POA_HISTORICAL_METHODS_LATE} from "../marking/poaHistoricalMethodsLate";

// Independently recomputed alternatives for source wording/precision conflicts.
// Supplied facts and operations are recorded separately from rubric answers.
const readings=[
 [2016,"mj",7,"Use the single-band method on income above the 2500 allowance.",{"Sharpe tax":(8000-2500)*.3,"Sharpe after-tax pay":8000-5500*.3,"Sharpe net pay":8000-5500*.3-700},{"Sharpe tax":"5500*0.30"}],
 [2017,"mj",2,"Treat the bank-card purchase as an unpaid credit-card liability.",{"Closing bank debit":-11890+25000-10470-1170-8000+2000+31110-9900}],
 [2018,"jan",5,"Use inventory-derived prize consumption of 500. Exclude visitors fees.",{"Direct prize cost":500,"Competition profit":1300-500-200-250},{"Competition profit":"1300-500-200-250"}],
 [2018,"jan",5,"Include all 600 visitors fees as competition receipts. Use the direct prize instruction of 400.",{"Competition profit":1300+600-400-200-250},{"Competition profit":"1300+600-400-200-250"}],
 [2018,"jan",5,"Include all 600 visitors fees as competition receipts. Use inventory-derived prize consumption of 500.",{"Direct prize cost":500,"Competition profit":1300+600-500-200-250},{"Competition profit":"1300+600-500-200-250"}],
 [2018,"mj",4,"Use fixed capital alone as the investment base.",{"Opening partners equity":300000,"Return on opening equity":56200/300000*100},{"Return on opening equity":"56200/300000*100"}],
 [2019,"mj",2,"Assume the ambiguous bank opening balance 1750 is credit.",{"Closing bank debit":-1750+460-1100-900},{"Closing bank debit":"-1750+460-1100-900"}],
 [2022,"mj",4,"Apportion the preference dividend for six months.",{"Preference annual dividend":100000*.08*6/12}],
 [2022,"mj",5,"Round assembly OAR to 4.21 before absorption.",{"Assembly absorbed overhead":3.75*4.21,"Total toy cost":274.84,"Toy mark-up":274.84*.5,"Toy selling price":274.84*1.5},{"Total toy cost":"50+93.75+87.5+15.7875+27.8","Toy selling price":"274.84*1.5"}],
 [2024,"jan",1,"Assume Discount Allowed 60 was also omitted from the profit calculation.",{"Corrected profit":17800-76+454-60}],
 [2024,"jan",2,"Use current assets less inventory as the classroom quick-ratio formula.",{"Quick ratio":(101500-25000)/80600},{"Quick ratio":"(101500-25000)/80600"}],
 [2025,"jan",3,"Use the rounded unit selling price 33.42 for all units.",{"Sales revenue":22500*33.42,"Operating expenses":22500*33.42*.2},{"Operating expenses":"22500*33.42*0.2"}],
 [2025,"jan",4,"Carry full precision internally for moving averages.",{"Closing inventory value":3096,"Closing stock value":3096,"Cost of sales":502*200+125*230+175*245+200*260-3096,"Gross income":(257+322+410)*650-(502*200+125*230+175*245+200*260-3096)}],
 [2025,"mj",3,"Do not recognize proposed final dividends as reporting-date liabilities.",{"Final dividend liabilities":0,"Current liabilities":20800+5000+3800+40000,"Working capital":23700-(20800+5000+3800+40000),"Net assets":199000+23700-(20800+5000+3800+40000)}],
];
export const POA_LATE_SOURCE_READING_FIXTURES=readings.map(([year,sitting,questionNumber,declaration,numbers,methods={}],i)=>{
 const paperId=`poa-2-${year}-${sitting}`,policy=POA_HISTORICAL_METHODS_LATE.find(p=>p.paperId===paperId&&p.questionNumber===questionNumber);
 if(!policy)throw Error("Missing source interpretation policy");
 const parts=Object.fromEntries(policy.sections.map(section=>[section.id,section.points.map(point=>{
  const label=point.label.replace(/ method$/i,"");
  if(point.kind==="number"&&Object.hasOwn(numbers,label))return `${label}: ${numbers[label]}.`;
  if(point.kind==="calculation"&&methods[label])return `${label}: ${methods[label]} = ${numbers[label]}.`;
  if(["concept","presentation"].includes(point.kind)&&point.match.all.every(p=>new RegExp(p,"iu").test(declaration)))return declaration;
  return point.fullProof;
 }).join("\n")]));
 return {id:`late-source-reading-${i+1}`,paperId,questionNumber,cls:"source-reading",response:{working:declaration,parts},expect:20,resolved:true,sourceRecomputedValues:numbers};
});
