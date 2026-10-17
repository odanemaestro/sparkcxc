// January 2023 Principles of Business Paper 02, SPARK-authored mark guidance.
// Five compulsory questions, total 100 marks. NOT CXC official published key.
// Questions assessed against the supplied 24-page booklet, with the
// four low-text pages 2 and 23 confirmed non-question sheets. Q3(b)(ii)
// townhouse construction restored from rendered PDF page 10.
import {buildPobFiveQuestionAuthoredRubric,verifyPobFiveQuestionAuthoredRubric} from "./pobHistoricalFiveQuestionRubric";
const PARTS=Object.freeze([
 [1,"a.i","Managers must offer safe, accurately described goods and handle customer complaints fairly.",["1:First legitimate customer-related responsibility","1:Second distinct customer responsibility"]],
 [1,"a.ii","Managers must provide safe working conditions and pay wages or agreed benefits in accordance with labour law.",["1:First valid employee responsibility","1:Second distinct obligation"]],
 [1,"b","Stakeholders besides customers and employees include suppliers and business owners or shareholders.",["1:First business stakeholder other than employees and customers","1:Second different suitable stakeholder"]],
 [1,"c","Managers could recognise strong performance, pay suitable performance rewards, provide staff development and offer fair promotion opportunities.",["1:First genuine motivation strategy","1:Second different strategy","1:Third distinct strategy","1:Fourth distinct strategy"]],
 [1,"d","Teamwork combines different employees' skills to solve problems efficiently and coordinates tasks so fewer mistakes occur.",["2:First benefit of teamwork and how this improves results","2:Second different benefit and mechanism"]],
 [1,"e","Management at New Harbour Garment Factory can organise regular two-way meetings where employees ask questions and managers explain changes, reducing misunderstandings. A confidential feedback or grievance channel with timely follow-up ensures workers' concerns are heard and addressed.",["3:First distinct communication intervention, practical details and outcome","3:Second different developed intervention"]],
 [2,"a.i","An invitation to treat is a request for others to make offers, such as goods displayed on a shelf, rather than a binding offer by the seller.",["1:Identifies invitation for customers to make offers","1:Explains not itself a legally binding offer"]],
 [2,"a.ii","A simple contract ordinarily requires an offer and acceptance and valid consideration; it is not necessarily a deed or under seal.",["1:First genuine simple-contract characteristic","1:Second distinct characteristic"]],
 [2,"a.iii","Contracts can end after full performance and by mutual agreement between the parties.",["1:First valid discharge method","1:Second different valid method"]],
 [2,"b","A hire purchase agreement is commonly documented formally in writing with prescribed terms, and the seller/finance provider normally retains title until agreed instalments are completed. Whether it legally qualifies as a specialty contract depends on jurisdiction and formal execution requirements.",["2:First valid distinct formal or legal feature, with accurate description","2:Second different feature described without falsely asserting all HP agreements are deeds"]],
 [2,"c","Utmost good faith calls for honest disclosure of material facts by insurer and policyholder. Indemnity pays for the insured loss with the aim of restoring the former financial position, not making an insured profit.",["2:Correct utmost-good-faith explanation","2:Correctly contrasts indemnity principle"]],
 [2,"d","A business may falsify tax declarations to evade lawfully due payments, violating duties to government. It may breach employment or environmental obligations by withholding wages or illegally polluting, harming workers and society.",["3:First distinct unethical breach of government/societal obligation, identified and explained","3:Second different contractual/legal/ethical violation developed"]],
 [3,"a.i","Production means using resources to produce tangible goods or provide services.",["1:Identifies creating goods or services","1:Connects to inputs, activity or output"]],
 [3,"a.ii","Productivity measures the efficiency of production as output divided by a corresponding input, such as goods per worker-hour.",["1:Output relative to production input","1:Recognises efficiency measure or concrete ratio"]],
 [3,"b.i","Sugar cane harvesting is primary production because crops are collected from agriculture.",["1:Correct classification: primary production"]],
 [3,"b.ii","Building townhouses is secondary production, the construction of physical buildings.",["1:Correct classification: secondary/construction"]],
 [3,"b.iii","Creating a new line of furniture is secondary manufacturing production.",["1:Correct classification: secondary manufacturing"]],
 [3,"b.iv","Providing online banking is tertiary production because financial services are supplied to consumers.",["1:Correct classification: tertiary services"]],
 [3,"c","Workers' skill and training, motivation and remuneration, and availability of reliable equipment influence output per labour hour.",["2:First factor with a causal explanation of labour productivity","2:Second different factor outlined","2:Third different factor explained"]],
 [3,"d","Managers can train staff in efficient production methods, reducing errors and improving output per worker. They can improve workflows and maintain machinery so time is not lost to bottlenecks or breakdowns.",["3:First genuine management strategy with mechanism and productivity result","3:Second different developed strategy"]],
 [4,"a.i","A market is an arrangement where buyers and sellers interact to exchange goods and services, whether in person or online.",["1:Identifies buyers and sellers","1:Explains exchange or transaction mechanism"]],
 [4,"a.ii","Traditional marketing-mix elements include product and price, alongside place and promotion.",["1:First legitimate marketing-mix element","1:Second distinct element"]],
 [4,"b","Businesses research markets to estimate demand, identify customer preferences, assess competition and choose appropriate prices.",["1:First genuine market research motive","1:Second distinct motive","1:Third different motive","1:Fourth different motive"]],
 [4,"c","Customer choices depend on disposable income, personal and cultural preferences, and the price or quality of competing products.",["2:First consumer-behaviour influence and explanation","2:Second different factor developed","2:Third different factor developed"]],
 [4,"d","A firm can demonstrate products in social-media videos and link viewers to purchase pages, increasing reach. It can also run targeted advertisements and reply to customer questions directly, attracting likely buyers and improving conversion.",["3:First specific social-media sales strategy with business result","3:Second distinct strategy explained"]],
 [5,"a","People manage income through preparing personal budgets and monitoring or controlling discretionary expenditure, aside from saving and investing.",["1:First method other than saving/investing","1:Second different personal income management method"]],
 [5,"b.i","Saving is setting aside money not spent, often in a bank or credit union. Investing acquires assets expected to produce income or grow in value while accepting some risk.",["1:Correct saving definition","1:Contrasting investment definition"]],
 [5,"b.ii","A commercial-bank savings account is a savings form, while purchasing shares is a form of investment.",["1:First correct saving example","1:Different valid investment example"]],
 [5,"c.i","Personal start-up funds can come from accumulated savings and money raised by selling an owned personal asset.",["1:First actual personal capital source","1:Second different personal source"]],
 [5,"c.ii","Short-term financing is repayable within a relatively brief period, typically within one year, for example an overdraft. Long-term finance is repayable over several years, for example a mortgage or long-term term loan.",["3:Correctly describes short-term timing and identifies one suitable source","3:Correctly describes long-term timing and provides a suitable distinct source"]],
 [5,"d","Buying shares can earn dividends and capital gains if firms succeed, increasing investor wealth. A major risk is losing money when stock prices fall or an issuer fails, since returns are not guaranteed.",["3:Stock-market investment benefit correctly identified and mechanism explained","3:Distinct genuine investment risk explained"]],
]);
export const POB_2023_JAN_P2_AUTHORED_SCHEME=buildPobFiveQuestionAuthoredRubric({
 year:2023,sitting:"JAN",sourcePages:24,
 sourceSha256:"c9803bd124e97f4208f5317de9494f04412727c6dfdb6c0bf4447a42deaa4ace",
 parts:PARTS
});
export const verifyPob2023JanP2AuthoredScheme=(paper=POB_2023_JAN_P2_AUTHORED_SCHEME)=>
 verifyPobFiveQuestionAuthoredRubric(paper);
