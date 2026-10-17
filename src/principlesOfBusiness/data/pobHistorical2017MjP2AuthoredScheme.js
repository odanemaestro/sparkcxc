// 2017 May/June historical POB Paper 02, five compulsory 20-mark questions.
// SPARK-authored model responses and criterion marks, not CXC official scheme.
// The original 2017 Q2 text layer obscures a four-mark label recovered visually.
// 2017 Q4(b)(ii) and Q5(b)(ii) transcribed from rendered page images.
import {buildPobFiveQuestionAuthoredRubric,verifyPobFiveQuestionAuthoredRubric} from "./pobHistoricalFiveQuestionRubric";
const POINTS=Object.freeze([
 [1,"a.i","An enterprise is an organised business venture that provides goods or services for customers.",["1:Business venture or undertaking","1:Organisation of goods/services or commercial activity"]],
 [1,"a.ii","Entrepreneurship identifies opportunities, gathers resources and bears business risk to create or operate a venture.",["1:Identifies new business creation or opportunity","1:Organising factors or risk-taking"]],
 [1,"b.i","Economic benefits of a local firm include hiring residents and spending money with nearby suppliers. Social benefits include charitable sponsorship and training community members.",["1:First distinct economic benefit","1:Second economic benefit","1:First genuine social benefit","1:Second different social benefit"]],
 [1,"b.ii","Employees provide labour and skills needed for operations, while customers buy goods or services and give market feedback.",["3:First real stakeholder named with a developed role in business","3:Second DIFFERENT stakeholder named with developed role"]],
 [1,"c","Community firms may face the cost of recycling and safe disposal, which reduces short-term profit, and pressure to keep prices low while paying fair wages, making ethical commitments harder to finance.",["3:First ethical-responsibility challenge and realistic consequence","3:Second distinct challenge explained"]],
 [2,"a.i","Marketing managers research customer demand and organise promotions, while production managers schedule manufacturing and monitor quality or inputs.",["1:First actual marketing function","1:Second distinct marketing function","1:First genuine production activity","1:Second different production function"]],
 [2,"a.ii","Finance plans and controls money, budgets, payments and funding. HR recruits, trains, motivates and manages the workforce.",["2:Accurately describes finance function","2:Accurately distinguishes HR workforce function"]],
 [2,"b.i","Delegation transfers responsibility and appropriate authority for specified tasks to a subordinate while the manager retains ultimate accountability.",["1:Describes assigning tasks or authority","1:Explains subordinate responsibility or manager oversight"]],
 [2,"b.ii","Motivation encourages staff effort by recognising good work, offering fair rewards and meeting employee needs.",["1:Explains stimulating worker effort","1:Describes a realistic motivational method or result"]],
 [2,"b.iii","Coordinating aligns schedules and activities of people and departments so their separate tasks work towards the same goals.",["1:Aligns different resources or activities","1:Connects the effort to shared results"]],
 [2,"c.i","Managers protect customers by checking product safety and responding quickly to complaints, sustaining confidence and appropriate standards.",["1:Names realistic customer obligation","1:Explains management process","1:Explains benefit to buyer or firm"]],
 [2,"c.ii","Managers protect employees through safe working conditions, fair wages and respectful handling of grievances, improving morale and retention.",["1:Names valid employee obligation","1:Explains concrete management action","1:Explains resulting welfare or business benefit"]],
 [3,"a.i","Businesses use computers, point-of-sale systems and barcode scanners in their operations.",["1:First real business technology","1:Second different technology","1:Third different technology"]],
 [3,"a.ii","E-commerce systems allow the business to reach customers outside its locality, while automation increases production or transaction capacity at lower unit cost.",["2:First technology adoption and growth mechanism","2:Second distinct technology growth mechanism"]],
 [3,"b.i","Small businesses produce or distribute local goods, create jobs and supply personalised services to customers.",["1:First distinct small business function","1:Second different function","1:Third different function"]],
 [3,"b.ii","Growth may increase revenue and economies of scale, but may strain cash flow and complicate coordination across larger teams.",["1:First realistic growth challenge","1:Second distinct growth challenge","1:First realistic growth benefit","1:Second different growth benefit"]],
 [3,"c","As a business expands it normally adds departmental specialisation and managers, creating additional reporting levels. It can also delegate more decisions and formalise communication to coordinate operations across locations.",["3:First distinct organisational structure change with causal reason","3:Second distinct structure change and explanation"]],
 [4,"a.i","A brand name is a distinctive word or phrase that identifies a company's goods or services and separates them from competitors.",["1:Identifies the name applied to a producer or product","1:Explains differentiation and recognition"]],
 [4,"a.ii","Packaging can take the form of bottles and cardboard cartons.",["1:First valid packaging form","1:Second distinct packaging form"]],
 [4,"a.iii","Packaging protects goods during handling and communicates product information to buyers.",["1:First distinct purpose","1:Second distinct purpose"]],
 [4,"b.i","Demonstrative selling shows how a product works to make its benefit visible. Consultative selling asks about the buyer's needs and recommends a fitting solution.",["2:First valid selling technique properly described","2:Second DIFFERENT technique described"]],
 [4,"b.ii","Vendors can run a limited-time discount to attract price-sensitive shoppers and provide free samples so customers try goods before purchasing.",["2:First specific sales-promotion method with explanation","2:Second different method and effect"]],
 [4,"c","Copyright gives original creators control over reproduction or distribution, encouraging investment in creative products. Consumers should obtain lawful copies or licences, avoiding unauthorised downloads and supporting creator earnings.",["3:Explains likely effect of copyright on producers, including rights and incentives","3:Explains effect on consumers, including lawful use and consequences"]],
 [5,"a","Standard of living measures material conditions and available goods and services enjoyed by an individual or group.",["1:Recognises material well-being or welfare level","1:Includes access to goods, services or income"]],
 [5,"b.i","Factors indicating quality of life include life expectancy, education or literacy, and safety or freedom from crime.",["1:First valid quality-of-life factor","1:Second distinct factor","1:Third distinct factor"]],
 [5,"b.ii","Factors showing standard of living include real per-capita income, housing quality and access to consumer goods or utilities.",["1:First economic/material factor","1:Second different material factor","1:Third different material factor"]],
 [5,"c","A ministry can invest in technical and vocational education to improve labour skills and productivity, and introduce digital literacy programmes to prepare students for modern employment and entrepreneurship.",["3:First education ministry programme and detailed growth or development mechanism","3:Second distinct programme with educational and economic effect"]],
 [5,"d","The income approach adds wages, interest, rent and profits from production. The expenditure approach totals final domestic spending by households, firms, government and net exports.",["3:First correctly named national income method with workings","3:Second DIFFERENT method properly explained"]],
]);
export const POB_2017_MJ_P2_AUTHORED_SCHEME=buildPobFiveQuestionAuthoredRubric({
 year:2017,sitting:"MJ",sourcePages:16,
 sourceSha256:"b36bbd04dc4fb1a3982763eaf10d0a22fd44cfe6ed36594f69caca6eee47bb9a",
 parts:POINTS
});
export const verifyPob2017MjP2AuthoredScheme=(paper=POB_2017_MJ_P2_AUTHORED_SCHEME)=>
 verifyPobFiveQuestionAuthoredRubric(paper);
