// 2005 CSEC POB historic Paper 02 source images pages 2–5, verified.
// Nine offered questions: Q1/Q2 10 each, Q3–Q9 20 each (160 offered).
// Candidates answer Q1,Q2,Q3 plus one of 4/5, 6/7, 8/9 (100 marks).
// All responses are SPARK independent authored model answers; never call
// these an official published CXC marking scheme or activate live scoring.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {validatePob2005to2007P2Selection} from "./pobHistoricalBatch03SourceAudit";
const ORIGINAL=Object.freeze([
 [1,"a","Government may require registration of business names and impose licence, zoning or public-health requirements before trading.",["1:First lawful business-setup regulation","1:Second distinct setup regulation"]],
 [1,"b","Limited identifies a company whose owners' liability is generally capped at unpaid amounts on their shares or their guarantee, not their entire private wealth.",["1:Correct limitation of shareholder or member liability","1:Explains effect on personal assets in ordinary debts"]],
 [1,"c.i","A memorandum of association is a company's constitutive document establishing its identity and its original stated structure or objects, subject to current national companies law.",["1:Identifies founding constitutional document","1:Explains scope of incorporation, identity, powers or aims"]],
 [1,"c.ii","Articles of association set internal company governance rules, including directors, meetings, voting and share procedures.",["1:Defines internal management regulations","1:Provides actual governance application"]],
 [1,"c.iii","A partnership agreement states how partners share contributions, profits, duties, decision-making and dissolution responsibilities.",["1:Identifies agreement governing business partners","1:Gives practical terms governed by agreement"]],
 [2,"a","Productivity is productive output per unit of input, for example garments produced per labour-hour.",["1:Correct output-to-input concept","1:Shows efficiency metric or output per worker hour"]],
 [2,"b","Capital consists of produced resources used in further production, including machinery, equipment and buildings; distinguish fixed capital from day-to-day finance when context requires.",["1:Man-made productive resource or financial capital contextualised","1:Gives a relevant productive example"]],
 [2,"c","Train employees to improve technique and reduce mistakes. Maintain or upgrade machinery to lower downtime and increase output per worker. Motivate workers through fair pay, recognition and safe conditions to reduce absenteeism and improve effort.",["2:First distinct labour efficiency strategy with reason","2:Second different developed strategy","2:Third different developed strategy"]],
 [3,"a","Supply is the amount sellers are willing and able to offer for sale at a given price during a stated period, other things being equal.",["1:Quantity sellers are able and willing to sell","1:Given price and time conditions"]],
 [3,"b","Lower animal feed and transport costs make beef profitable at more quantities. Improved breeding/processing technology raises herd output. Producer subsidies or reduced production taxes lower costs and encourage greater beef supply.",["2:First appropriate non-price factor causing rightward supply shift with explanation","2:Second distinct supply-side factor developed","2:Third distinct factor and mechanism"]],
 [3,"c","Lower income for families who consider ice cream normal can reduce purchases. Cooler weather reduces desire for ice cream. Growing preference for healthier snacks or lower-priced substitutes lowers demand at each existing ice cream price.",["2:First correct non-own-price demand-shift factor and effect","2:Second distinct demand-decreasing factor explained","2:Third different demand-decreasing factor explained"]],
 [3,"d","Producers can reduce cheese output, making supply scarce and increasing price. More consumers buying cheese at each price increases demand and pressure on price. Buyers switching to cheaper substitutes lowers cheese demand, encouraging price reductions.",["2:First valid deliberate producer/consumer shift and cheese price effect","2:Second independent shift and mechanism","2:Third separate influence on cheese pricing"]],
 [4,"a","An MIS collects, organises and presents timely business information to help managers plan, monitor performance, coordinate branches and make decisions.",["1:Identifies collection/processing and presentation of information","1:Links MIS to informed management decisions"]],
 [4,"b.i","Planning sets objectives, budgets and methods to coordinate future actions and achieve business targets.",["1:Defines goal setting and future choices","1:Explains resource or scheduling application"]],
 [4,"b.ii","Controlling compares actual results with planned performance and corrects deviations.",["1:Identifies measuring performance against standards","1:Explains taking corrective action"]],
 [4,"b.iii","Coordinating aligns departmental schedules and resource use so staff work towards common goals without duplication.",["1:Aligns people or departments","1:Explains integrated productive result"]],
 [4,"c","Growing from one shop to eight branches can strain managerial supervision and require much greater investment in stock, staff and systems.",["2:First distinct expansion problem with explanation","2:Second different expansion problem with realistic consequence"]],
 [4,"d","Personnel MIS may store staff attendance and leave balances to plan schedules; it may also track employees' skills and training needs to allocate courses.",["2:First actual MIS workforce use with a sensible process","2:Second distinct personnel MIS use explained"]],
 [4,"e","Branch-level sales and stock dashboards enable prompt informed purchasing decisions and reduce stockouts. Reliable shared records strengthen reporting and coordination between the head office and eight outlets.",["2:First business-wide MIS benefit with mechanism","2:Second separate benefit and management consequence"]],
 [5,"a","A business produces or acquires goods and services, sells/distributes them, and provides employment and income.",["1:First genuine business function","1:Second distinct function","1:Third different function"]],
 [5,"b","A market economy relies mainly on private ownership while a planned economy uses public/state control of the principal productive resources. Market prices are guided by supply/demand, while planned prices/output are administered. Buyers' and firms' choice is normally broader in market systems than state-directed systems.",["2:First valid developed market vs planned economy distinction","2:Second DIFFERENT paired distinction","2:Third DIFFERENT paired distinction"]],
 [5,"c.i","North Korea is an example commonly characterised as a centrally planned economy; descriptions must recognise the role of informal markets and changing policies.",["1:Valid historically plausible predominantly planned economy country"]],
 [5,"c.ii","Jamaica is a mixed economy containing private enterprise and government provision/regulation.",["1:Valid country with both public and private economic decisions"]],
 [5,"d","Internal communication can occur through staff emails, team meetings and posted written memos or circulars.",["1:First internal communication method","1:Second distinct method","1:Third distinct method"]],
 [5,"e.i","A scheduled team meeting encourages immediate questions and clear shared decisions, but can require staff time and is ineffective when poorly chaired.",["1:Meaningful feature/strength of one method listed in d","1:Balanced assessment, limitation or clear effectiveness conclusion"]],
 [5,"e.ii","Good information flow prevents misunderstandings and mistakes, while helping departments coordinate schedules and resolve problems promptly.",["2:First reason for effective organisational communication with explanation","2:Second different reason with developed result"]],
 [6,"a","Diversification is expansion into a wider range of economic activities to reduce dependence on a narrow sector. Migration is the relocation of people from one place or country to another to settle or work.",["2:Correct economic diversification definition","2:Correct migration definition"]],
 [6,"b","Skilled employees may migrate for higher salaries, more secure professional career opportunities and access to education or better living conditions for their families.",["2:First distinct skilled-migration motive with explanation","2:Second different developed reason","2:Third different reason explained"]],
 [6,"c","Government can offer competitive specialist pay and career ladders for professionals. It may invest in attractive working conditions, research equipment and continued specialist training to encourage retention.",["2:First feasible skilled-labour retention action and rationale","2:Second different action developed"]],
 [6,"d","Loss of technical specialists reduces the expertise available to launch new industries and train local workers. Skilled emigration may also constrain management capacity and innovation, leaving diversification projects unfinished or dependent on imported expertise.",["3:First migration-to-diversification pathway and detailed consequence","3:Second distinct pathway, such as skill shortages or weaker innovation, developed"]],
 [7,"a","Market research is planned collection/analysis of customer demand, competitors and market prices to decide whether, how and to whom to sell the new diaper brand.",["1:Identifies information gathering and analysis","1:Explains purpose for new diaper-product launch"]],
 [7,"b","Assess price and income of parents to remain affordable against competing brands. Research diaper absorbency, size, comfort and skin safety to provide genuine quality. Choose suitable retail outlets and reliable supply so families can buy regularly. Plan promotion through appropriate parent-focused channels while complying with truthful product advertising.",["2:First distinct marketing consideration with practical diaper-launch effect","2:Second separate consideration and effect","2:Third distinct factor outlined","2:Fourth different factor explained"]],
 [7,"c","Sales promotion is a short-term inducement, such as samples, coupons, discounts or bundled offers, intended to stimulate near-term purchases.",["1:Correct short-term demand stimulation concept","1:Gives relevant promotional mechanism"]],
 [7,"d","Provide sealed free sample packs so caregivers can check fit/absorbency before changing brands; this reduces the perceived risk of trying an unfamiliar product. Offer retailer and consumer coupons for repeat purchases, lowering effective trial price without permanently harming the brand's quality positioning.",["4:First suitable specific sales-promotion method, implementation and convincing justification","4:Second DISTINCT suitable method with explanation tied to diapers"]],
 [8,"a.i","Real economic growth means increases in inflation-adjusted national output or productive capacity. Economic development also involves broad improvements in health, education, poverty, equality and quality of life.",["1:Correct real-output growth meaning","1:Correct welfare/structural development meaning","1:Explicitly contrasts output with broader living conditions"]],
 [8,"a.ii","High unemployment, persistent balance-of-payments deficits and heavy public debt are economic problems for Caribbean countries.",["1:First plausible Caribbean economic problem","1:Second different problem","1:Third distinct problem"]],
 [8,"b","Investment in productive capital increases firms' output capacity. Skills training raises labour productivity. Access to new export markets expands demand and economies of scale for local firms.",["2:First national-growth factor developed with mechanism","2:Second distinct factor and mechanism","2:Third different factor developed"]],
 [8,"c","Education helps produce skilled workers able to use new technologies and increases entrepreneurial knowledge needed to build productive firms.",["2:First developed educational benefit for national development","2:Second distinct education-to-development mechanism"]],
 [8,"d","FDI can open domestic factories and create jobs and supplier orders. It can also transfer technology, specialist skills and export-market access, helping local productivity and foreign-exchange earning.",["2:First host-country FDI benefit and development mechanism","2:Second distinct host-country benefit developed"]],
 [9,"a.i","Terms of trade compare an export price index with an import price index; balance of trade subtracts imported *goods value* from exported goods value. They are not the same measure.",["1:Defines relative export/import price concept","1:Defines goods exports minus goods imports","1:Explains price-ratio vs value-balance distinction"]],
 [9,"a.ii","Goods exports US$24,000 million minus goods imports US$26,000 million = minus US$2,000 million: a merchandise-trade deficit.",["1:Correct subtraction 24000−26000","1:Correct −2000 US$ million deficit"]],
 [9,"b","Goods balance −2000 plus invisible services/net receipts (20000−15000)=+5000 gives a current-account balance of +3000 US$ million, assuming there are no further income or transfer entries omitted by the source.",["1:Correct goods balance of −2000 (US$M)","1:Correct invisible balance of +5000 (US$M)","1:Combines to +3000 (US$M) current-account surplus"]],
 [9,"c","A current-account surplus can result from selling more exported goods than imported goods or earning a positive net balance on services such as tourism; net factor income/transfer receipts can also contribute.",["2:First mathematically coherent source of current-account surplus explained","2:Second different source explained"]],
 [9,"d.i","The balance of payments records a country's transactions with the rest of the world during a period, including current, capital and financial accounts and reserve financing.",["1:Identifies international transaction account","1:Explains recording cross-border payments, receipts or financial flows"]],
 [9,"d.ii","External deficits may be financed with foreign borrowing or IMF assistance, by drawing down foreign currency reserves, and through new FDI/equity capital inflows. Correct accounting distinguishes funding sources from actions intended to reduce the underlying deficit.",["2:First distinct legitimate external financing mechanism explained","2:Second distinct external financing option developed","2:Third separate appropriate financing mechanism"]],
]);
export const POB_2005_MJ_P2_AUTHORED_SCHEME=Object.freeze({
 id:"POB-P2-2005-MJ",paper:2,year:2005,sitting:"MJ",
 sourceFilename:"CSEC_Principles_of_Business_P2_2005_MJ.pdf",
 sourceSha256:"61d9462cc76071a2456395ef5e5fe347c8e345d3265092af06d40b1108f7e3d2",
 originalPagesVisuallyReviewed:Object.freeze([1,2,3,4,5]),
 examSource:"original-user-PDF",authorshipOrigin:"SPARK-original-marking-model",
 publishedCxcSchemeSupplied:false,verifiedDigitalQuestionBankComplete:false,
 semanticScoringCalibrated:false,liveScoringApproved:false,
 offeredMarks:160,maximumCandidateMarks:100,
 questions:Object.freeze([1,2,3,4,5,6,7,8,9].map(number=>Object.freeze({
  number,marks:number<=2?10:20,
  parts:Object.freeze(ORIGINAL.filter(r=>r[0]===number).map(([,partId,modelAnswer,rules])=>Object.freeze({
    id:partId,modelAnswer,
    marks:rules.reduce((a,s)=>a+Number(s.slice(0,s.indexOf(":"))),0),
    criteria:Object.freeze(rules.map(raw=>{
      const pos=raw.indexOf(":");
      return Object.freeze({marks:Number(raw.slice(0,pos)),rule:raw.slice(pos+1),authoredBySpark:true,sourceSchemeVerified:false});
    }))
  })))
 })))
});
export function verifyPob2005MjP2AuthoredScheme(paper=POB_2005_MJ_P2_AUTHORED_SCHEME){
 const issues=[];let offered=0,parts=0;const seen=new Set();
 const approved=POB_SUPPLIED_ARCHIVE.find(p=>p.id===paper?.id);
 if(!approved||approved.paper!==2||approved.sourceSha256!==paper.sourceSha256||approved.filename!==paper.sourceFilename)
  issues.push("Source identity or digest does not match.");
 if(!Array.isArray(paper?.questions)||paper.questions.length!==9)
  issues.push("Source must offer nine questions.");
 for(const q of paper.questions||[]){
  if(!Number.isInteger(q.number)||q.number<1||q.number>9||seen.has(q.number))issues.push("Question count or order invalid.");
  seen.add(q.number);
  const ids=new Set();let total=0;
  for(const p of q.parts||[]){
   parts++;total+=p.marks;
   if(!p.id||ids.has(p.id))issues.push("Repeated part ID.");
   ids.add(p.id);
   if(!p.modelAnswer||p.modelAnswer.length<35)issues.push("Missing model answer.");
   if(p.criteria?.reduce((sum,x)=>sum+x.marks,0)!==p.marks||p.criteria.some(x=>!x.rule||x.sourceSchemeVerified!==false))
    issues.push("Part marks/criteria mismatch.");
  }
  if(total!==(q.number<=2?10:20))issues.push("Wrong printed marks on Q"+q.number);
  offered+=total;
 }
 if(offered!==160||paper.maximumCandidateMarks!==100||!validatePob2005to2007P2Selection(paper.id,[1,2,3,4,6,8]).valid)
  issues.push("Offered or attempted total/choice pattern mismatch.");
 if(paper.liveScoringApproved!==false||paper.publishedCxcSchemeSupplied!==false)
  issues.push("Unsafe promotion of unverified academic scores.");
 return {valid:issues.length===0,issues,offeredMarks:offered,parts};
}
