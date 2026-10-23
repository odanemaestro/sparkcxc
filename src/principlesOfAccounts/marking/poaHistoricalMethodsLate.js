// SPARK practice policy. These allocations are authored by SPARK, not CXC.
// Every section ceiling is copied from the question, while individual awards are
// intentionally versioned here. A method award and its accuracy award are separate.
import { POA_HISTORICAL_PAPER2_ARCHIVE } from '../data/poaHistoricalPaper2';
const VERSION = 'spark-poa-methods-2026-10-v1';
const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const phrase = (s) => esc(s).replace(/\s+/g, '\\s+');
const numberSource = (n) => esc(String(n)).replace(/\\\./g, '[.]');
const cue = (label) => phrase(label);
const U = (marks,label,fullProof,patterns,kind='concept',alternativeProof) => ({marks,label,kind,match:{all:patterns||[phrase(fullProof)]},fullProof,alternativeProof:alternativeProof||fullProof,incorrectProof:`${label}: this assertion is false.`});
const numericClaim=label=>`(?:^|[\\n;]|[.](?=\\s*[A-Za-z]))\\s*${cue(label)}\\s*(?:is|=|:)\\s*[$]?\\s*[+-]?(?:\\d+(?:[.]\\d+)?|[.]\\d+)`;
const N = (marks,label,value,alternativeValues=[]) => ({marks,label,kind:'number',match:{all:[numericClaim(label)]},numbers:[{value,tolerance:0.005}],fullProof:`${label}: ${value}.`,alternativeProof:`${label} = $${value}.`,incorrectProof:`${label}: ${value+137}.`,...(alternativeValues.length?{alternatives:alternativeValues}: {})});
const C = (marks,label,value,expression) => [
  {marks:marks-1,label:`${label} method`,kind:'calculation',match:{all:[`${cue(label)}.{0,30}${phrase(expression)}`]},expressions:[expression],fullProof:`${label}: ${expression} = ${value}.`,alternativeProof:`${label}: ${expression} = ${value}.`,incorrectProof:`${label}: 13+29 = 137.`},
  N(1,label,value),
];
const E = (label,debit,credit,value) => [
  U(1,`${label} debit`,`Debit ${debit} ${value}.`,[`debit\\s+${phrase(debit)}\\s+[$]?${numberSource(value)}\\b`],'entry'),
  U(1,`${label} credit`,`Credit ${credit} ${value}.`,[`credit\\s+${phrase(credit)}\\s+[$]?${numberSource(value)}\\b`],'entry'),
];
const S=(id,maxMarks,...points)=>({id,maxMarks,points:points.flat(Infinity).map((p,i)=>({...p,id:`${id}-${i+1}`}))});
const Q=(paperId,questionNumber,...sections)=>{const paper=POA_HISTORICAL_PAPER2_ARCHIVE.find(p=>p.id===paperId); return {paperId,questionNumber,policyVersion:VERSION,authority:'spark-authored',sourceSha256:paper.sourceSha256,sections,sourceNotes:[...(paper.questions.find(q=>q.number===questionNumber).sourceNotes||[])]};};
const P=(y,s)=>`poa-2-${y}-${s}`;
const rows = [];
const add=(y,s,n,...sections)=>rows.push(Q(P(y,s),n,...sections));

add(2015,'mj',1,
 S('a',16,E('Capital introduced','Bank','Capital',7800),E('Net credit purchase','Purchases','Yazmin',1620),E('Owner takes goods','Drawings','Purchases',60),E('Equipment purchase','Equipment','Equipo',3500),E('Supplier return','Yazmin','Returns Outwards',144),N(1,'Jon debit',170),N(1,'Sales credit',290),N(1,'Equipment returned',250),N(1,'Yazmin cheque',1402),N(1,'Yazmin discount received',74),N(1,'Equipo cheque',3200)),
 S('b',4,N(1,'Bank debit',3318),N(1,'Purchases debit',1560),N(1,'Discount Received credit',124),N(1,'Trial Balance total',8358)));
add(2015,'mj',2,
 S('a',2,U(1,'Shared ownership','A partnership has two or more owners.',['partnership.{0,35}two or more owners']),U(1,'Profit sharing','Partners agree to share profits or losses.',['partners.{0,35}share profits or losses'])),
 S('b',2,U(1,'Barney credit current','The partnership owes Barney 2500.',['partnership owes Barney.{0,15}2500']),U(1,'Swiper debit current','Swiper owes the partnership 600.',['Swiper owes the partnership.{0,15}600'])),
 S('c',9,C(2,'Barney capital interest',3000,'60000*0.05'),N(1,'Swiper capital interest',1750),N(1,'Barney drawing interest',200),N(1,'Swiper drawing interest',300),C(2,'Residual profit',41750,'82000+200+300-36000-3000-1750'),N(1,'Barney profit share',25050),N(1,'Swiper profit share',16700)),
 S('d',7,N(1,'Barney current credits',66550),N(1,'Barney current charges',4200),C(2,'Barney closing credit',62350,'2500+36000+3000+25050-4000-200'),N(1,'Swiper current credits',18450),N(1,'Swiper current charges',12900),N(1,'Swiper closing credit',5550)));
add(2015,'mj',3,
 S('a',8,C(2,'Cost of goods sold',182300,'206850-24550'),N(1,'Gross profit',180870),C(2,'Insurance expense',2720,'3790-1070'),N(1,'Miscellaneous expense',9100),N(1,'Total expenses',112000),N(1,'Net profit',68870)),
 S('b-i',2,C(2,'Non-current assets',239030,'163450+37000+38580')),
 S('b-ii',2,C(2,'Current assets',33690,'8070+24550+1070')),
 S('b-iii',2,C(2,'Current liabilities',14310,'3910+6180+4220')),
 S('c',4,C(2,'Current ratio',2.35,'33690/14310'),U(1,'Loan decision','Support the loan because current assets cover current liabilities.',['support.{0,30}loan.{0,100}current assets cover current liabilities']),U(1,'Ratio implication','The current assets cover short-term liabilities more than twice.',['current assets.{0,40}(?:short.term liabilities|current liabilities).{0,30}more than twice'])),
 S('d',2,U(1,'Computer advantage','Computer processing produces reports faster.',['computer.{0,40}reports faster']),U(1,'Computer disadvantage','The business incurs software and training costs.',['software and training costs'])));
add(2015,'mj',4,
 S('a',6,N(1,'Opening overdraft',1780),N(1,'Credit transfer receipt',4000),N(1,'Standing order payment',1000),N(1,'Debit transfer payment',825),N(1,'Bank charges',400),N(1,'Closing overdraft',5)),
 S('b',5,N(1,'Updated cash-book overdraft',5),U(1,'Deposit adjustment','Deduct the uncredited deposit 500.',['deduct.{0,30}uncredited deposit.{0,15}500']),U(1,'Cheque adjustment','Add the unpresented cheque 180.',['add.{0,30}unpresented cheque.{0,15}180']),N(1,'Bank statement overdraft',325),U(1,'Timing distinction','Timing differences belong only in the reconciliation.',['timing differences.{0,40}only in the reconciliation'])),
 S('c-i',5,N(1,'Jack credit sale',6000),N(1,'Mary credit sale',2600),N(1,'June credit sale',3800),U(1,'Supplier day book','Credit purchases belong in the Purchases Day Book.',['credit purchases.{0,45}Purchases Day Book']),U(1,'Folio consistency','Reuse each customer folio when recording that customer return.',['reuse.{0,25}customer folio.{0,60}customer return'])),
 S('c-ii',4,N(1,'Sales Day Book total',12400),N(1,'Purchases Day Book total',10550),N(1,'Returns Inwards total',450),U(1,'Returns Outwards total','Returns Outwards has no entries and totals zero.',['Returns Outwards.{0,40}no entries.{0,30}zero'])));
add(2015,'mj',5,
 S('a-i',6,N(1,'Receivables opening debit',5010),N(1,'Credit sales debit',262920),N(1,'Customer receipts credit',257800),N(1,'Discount allowed credit',1040),N(1,'Sales returns credit',1290),N(1,'Receivables closing debit',7800)),
 S('a-ii',5,N(1,'Payables opening credit',3950),N(1,'Credit purchases credit',196700),N(1,'Supplier refund credit',1880),U(1,'Payables debit reductions','Debit payments 194400, discounts 3560 and returns 1740.',['debit payments.{0,15}194400.{0,30}discounts.{0,15}3560.{0,30}returns.{0,15}1740']),N(1,'Payables closing credit',2830)),
 S('b',9,C(2,'Prime cost',186600,'138500+45700+2400'),N(1,'Manufacturing costs',238500),C(2,'Production cost',237300,'186600+51900+3600-4800'),C(2,'Sales revenue',355950,'237300*1.5'),N(1,'Gross profit',118650),U(1,'Trading presentation','The trading account shows sales less cost of sales equals gross profit.',['trading account.{0,35}sales less cost of sales equals gross profit'])));
add(2015,'mj',6,
 S('a-i',5,N(1,'Opening subscriptions outstanding',8000),N(1,'Closing subscriptions outstanding',12000),N(1,'Opening subscriptions in advance',22000),N(1,'Closing subscriptions in advance',19600),N(1,'Annual subscription income',360000)),
 S('a-ii',8,C(3,'Subscriptions cash received',353600,'360000+8000-12000-22000+19600'),N(1,'Subscriptions debit total',387600),U(1,'Opening arrears side','Debit opening arrears 8000.',['debit opening arrears.{0,15}8000']),U(1,'Opening advances side','Credit opening advances 22000.',['credit opening advances.{0,15}22000']),U(1,'Closing arrears side','Bring down arrears 12000 debit.',['bring down arrears.{0,15}12000 debit']),U(1,'Closing advances side','Bring down advances 19600 credit.',['bring down advances.{0,15}19600 credit'])),
 S('b',4,U(1,'Machine classification','The ID-card machine is capital expenditure in the Balance Sheet.',['ID.card machine.{0,40}capital expenditure.{0,30}Balance Sheet']),U(1,'Printing classification','Convention printing is revenue expenditure in Income and Expenditure.',['convention printing.{0,40}revenue expenditure.{0,35}Income and Expenditure']),U(1,'Bus and extension classification','The bus deposit and building extension are capital expenditure in the Balance Sheet.',['bus deposit and building extension.{0,40}capital expenditure.{0,30}Balance Sheet']),U(1,'Advertising classification','Rally advertising is revenue expenditure in Income and Expenditure.',['rally advertising.{0,40}revenue expenditure.{0,35}Income and Expenditure'])),
 S('c',3,N(1,'Cash subscription receipts',353600),N(1,'Cash payments total',210000),N(1,'Closing cash',143600)));
add(2015,'mj',7,
 S('a',11,C(2,'Shares issued',100000,'500000/5'),N(1,'Dividend',50000),N(1,'Total surplus available',190000),C(2,'Education transfer',38000,'190000*0.2'),C(2,'Disaster transfer',57000,'190000*0.3'),N(1,'Patronage refund',17500),N(1,'Undistributed surplus',27500),U(1,'Appropriation presentation','Current surplus and brought-forward surplus fund the appropriations.',['current surplus and brought.forward surplus.{0,40}appropriations'])),
 S('b-i',4,N(1,'Share capital',200000),N(1,'Undistributed surplus',73900),U(1,'Restricted funds','Members Welfare Fund 40000 and Flood Relief Fund 95000 appear in members funds.',['Members Welfare Fund.{0,15}40000.{0,35}Flood Relief Fund.{0,15}95000.{0,35}members funds']),N(1,'Members funds total',408900)),
 S('b-ii-a',3,N(1,'Building carrying amount',215000),N(1,'Investment and long-term member loans',165000),N(1,'Non-current assets',380000)),
 S('b-ii-b',2,C(2,'Current assets',73000,'8000+39000+26000')));

add(2016,'mj',1,
 S('a',2,U(1,'Capital agreement','The agreement specifies each partner capital contribution.',['agreement.{0,35}capital contribution']),U(1,'Management agreement','The agreement specifies partner duties and management responsibilities.',['agreement.{0,35}duties and management responsibilities'])),
 S('b',1,U(1,'Equal sharing','With no agreed ratio, profits and losses are shared equally.',['no agreed ratio.{0,40}profits and losses.{0,30}shared equally'])),
 S('c',9,N(1,'Metevier capital',70000),N(1,'Moreno capital',50000),C(2,'Profit after loan interest',74944,'77404-41000*0.06'),N(1,'Capital interest total',12000),N(1,'Drawing interest total',276),N(1,'Residual profit',63220),N(1,'Metevier residual share',31610),N(1,'Moreno residual share',31610)),
 S('d',8,C(2,'Metevier closing funds',104830,'70000+38430-3600'),C(2,'Moreno closing funds',84594,'50000+36514-1920'),N(1,'Literal working capital',-30576),N(1,'Literal net assets',148424),U(1,'Source liability conflict','The separately listed loan creates a 41000 source mismatch.',['separately listed loan.{0,35}41000 source mismatch']),U(1,'Conditional presentation','Only if 48576 includes the long-term loan, working capital becomes 10424.',['only if.{0,25}48576 includes the long.term loan.{0,40}working capital.{0,25}10424'])));
add(2016,'mj',2,
 S('a',4,C(2,'Revised closing inventory',7585,'8670-900-185'),E('Owner stock withdrawal','Drawings','Purchases',900)),
 S('b',3,C(2,'Revised overdraft',8040,'6340+1900-200'),N(1,'Lawrence bad debt',230)),
 S('c',5,C(2,'Annual depreciation',14975,'(58000+1900)*0.25'),N(1,'Gross profit unchanged',46690),N(1,'Net profit',31165),U(1,'Personal donation','The personal donation is drawings rather than a business expense.',['personal donation.{0,35}drawings rather than a business expense'])),
 S('d',8,N(1,'Non-current assets',91025),N(1,'Receivables',6480),N(1,'Cash',2820),N(1,'Current assets',16885),N(1,'Liabilities',12845),N(1,'Net assets',95065),N(1,'Owner funds',96465),U(1,'Source disagreement','The source leaves an unexplained difference of 1400.',['source.{0,40}unexplained difference of.{0,15}1400'])));
add(2016,'mj',3,
 S('a-i',9,N(1,'Opening overdraft',3400),N(1,'Blue cheque correction receipt',90),N(1,'Dividend received',2100),N(1,'Bank charges payment',100),N(1,'Insurance standing order',900),N(1,'Dishonoured cheque payment',300),C(2,'Revised overdraft',2510,'3400-90-2100+100+900+300'),U(1,'Overdraft brought down','Bring down the bank balance as a credit overdraft.',['bring down.{0,35}credit overdraft'])),
 S('a-ii',4,N(1,'Updated cash-book overdraft',2510),U(1,'Deposit reconciliation','Deduct uncredited deposits 8000.',['deduct uncredited deposits.{0,15}8000']),U(1,'Cheque reconciliation','Add unpresented cheques 5200.',['add unpresented cheques.{0,15}5200']),N(1,'Statement overdraft',5310)),
 S('b',2,U(1,'Bank fee profit effect','Bank charges reduce profit.',['bank charges reduce profit']),U(1,'Insurance profit effect','Insurance for this period reduces profit.',['insurance for this period reduces profit'])),
 S('c',2,U(1,'Internal user','The owner is an internal user.',['owner is an internal user']),U(1,'External user','The lender is an external user.',['lender is an external user'])),
 S('d',3,U(1,'Private wages concept','Private housekeeper wages violate business entity.',['private housekeeper wages.{0,30}business entity']),U(1,'Future gain concept','Recognizing a future disposal profit violates realization.',['future disposal profit.{0,35}realization']),U(1,'Depreciation concept','Unjustified annual depreciation method changes violate consistency.',['depreciation method changes.{0,35}consistency'])));
add(2016,'mj',4,
 S('a',11,C(2,'Raw materials consumed',27000,'5000+112000-90000'),N(1,'Direct labour',48000),C(2,'Licence fees',25800,'2*12900'),N(1,'Prime cost',100800),N(1,'Plant depreciation',7360),N(1,'Factory repairs',1600),N(1,'Factory fixture depreciation',2200),N(1,'Factory overheads',11160),N(1,'Production cost',111960)),
 S('b',7,N(1,'Sales',278800),C(2,'Cost of sales',165260,'66000+111960-12700'),N(1,'Gross income',113540),N(1,'Office fixture costs',5700),N(1,'Administration expenses',40700),N(1,'Net income',72840)),
 S('c',2,C(2,'Unit production cost',8.68,'111960/12900')));
add(2016,'mj',5,
 S('a',7,N(1,'Premises carrying amount',120000),N(1,'Equipment carrying amount',48000),N(1,'Other assets',22700),N(1,'Total assets',190700),N(1,'Total liabilities',5600),N(1,'Accumulated fund',185100),U(1,'Fund classification','The residual is an accumulated fund belonging to the club.',['residual.{0,25}accumulated fund.{0,35}club'])),
 S('b',7,C(2,'Subscription income',32000,'320*100'),C(2,'Cash subscriptions',33500,'32000+2500-1400-1700+2100'),N(1,'Subscriptions account total',36600),U(1,'Closing arrears','Bring down subscriptions arrears 1400 debit.',['bring down subscriptions arrears.{0,15}1400 debit']),U(1,'Closing advances','Bring down subscriptions advances 2100 credit.',['bring down subscriptions advances.{0,15}2100 credit'])),
 S('c',6,C(2,'Average bar inventory',1550,'(1300+1800)/2'),N(1,'Bar purchases',5425),N(1,'Bar cost of sales',4925),N(1,'Bar gross profit',7525),N(1,'Bar net profit',5625)));
add(2016,'mj',6,
 S('a',3,U(1,'Open membership','Membership is voluntary and open.',['membership is voluntary and open']),U(1,'Democratic control','Members exercise democratic control with one member one vote.',['democratic control.{0,35}one member one vote']),U(1,'Economic participation','Members participate economically in their cooperative.',['members participate economically'])),
 S('b',8,C(2,'Share capital',165000,'1650*10*10'),N(1,'Statutory reserve transfer',4200),N(1,'Education transfer',2100),N(1,'Dividend',8250),N(1,'Undistributed surplus',13900),N(1,'Closing statutory reserve',34200),N(1,'Closing education fund',20300)),
 S('c',9,N(1,'Non-current assets',223430),N(1,'Current assets',20374),N(1,'Current liabilities',10404),C(2,'Working capital',9970,'20374-10404'),N(1,'Net assets',233400),N(1,'Share capital',165000),N(1,'Reserves and undistributed surplus',68400),U(1,'Vertical presentation','Non-current assets plus working capital are reconciled to members funds.',['non.current assets plus working capital.{0,35}members funds'])));
add(2016,'mj',7,
 S('a',7,U(1,'Tax method','Use progressive marginal tax bands after the 2500 allowance.',['progressive marginal tax bands.{0,35}2500 allowance']),N(1,'Jacob tax',0),N(1,'Darbeau taxable pay',2300),N(1,'Darbeau tax',345),C(2,'Sharpe tax',1275,'2500*0.15+3000*0.30'),N(1,'Sharpe after-tax pay',6725)),
 S('b',8,N(1,'Darbeau National Insurance',240),N(1,'Darbeau health insurance',92),N(1,'Darbeau pension',48),N(1,'Darbeau net pay',4075),N(1,'Jacob deductions',144),N(1,'Jacob net pay',2256),N(1,'Sharpe deductions',700),N(1,'Sharpe net pay',6025)),
 S('c-i',2,U(1,'Statutory definition','Statutory deductions are compulsory under law.',['statutory deductions are compulsory under law']),U(1,'Voluntary definition','Non-statutory deductions are authorized by the employee.',['non.statutory deductions are authorized by the employee'])),
 S('c-ii',3,U(1,'Time card source','Time cards establish hours worked.',['time cards establish hours worked']),U(1,'Attendance source','Attendance records establish days worked.',['attendance records establish days worked']),U(1,'Pay-rate source','Employment records establish authorized pay rates.',['employment records establish authorized pay rates'])));

add(2017,'jan',1,
 S('a',7,U(1,'Formation date','The formation journal is dated 1 March 2015.',['formation journal.{0,25}1 March 2015'],'presentation'),U(1,'Cash introduced','Debit Cash 125000.',['debit cash.{0,15}125000'],'entry'),U(1,'Van introduced','Debit Motor Vehicles 20000.',['debit motor vehicles.{0,15}20000'],'entry'),U(1,'Equipment introduced','Debit Equipment 25000.',['debit equipment.{0,15}25000'],'entry'),U(1,'Chris capital','Credit Chris Capital 100000.',['credit Chris Capital.{0,15}100000'],'entry'),U(1,'Vern capital','Credit Vern Capital 70000.',['credit Vern Capital.{0,15}70000'],'entry'),U(1,'Formation narrative','The partners introduced assets to form the partnership.',['partners introduced assets to form the partnership'],'presentation')),
 S('b',9,N(1,'Chris drawing interest',1200),N(1,'Available profit',41300),N(1,'Chris salary',12000),N(1,'Vern salary',12000),N(1,'Chris capital interest',10000),N(1,'Vern capital interest',7000),N(1,'Residual profit',300),N(1,'Chris profit share',200),N(1,'Vern profit share',100)),
 S('c',4,C(2,'Chris closing debit',3000,'24000+1200-12000-10000-200'),C(2,'Vern closing credit',19100,'12000+7000+100')));
add(2017,'jan',2,
 S('a',1,U(1,'FIFO versus LIFO','FIFO issues earliest costs first while LIFO issues latest costs first.',['FIFO issues earliest costs first.{0,20}LIFO issues latest costs first'])),
 S('b',11,N(1,'Opening inventory cost',2000),N(1,'January receipt cost',4400),C(2,'January issue cost',5080,'100*20+140*22'),N(1,'January inventory balance',1320),N(1,'February receipt cost',10000),C(2,'March first issue cost',6320,'60*22+200*25'),N(1,'March receipt cost',3380),N(1,'March final issue cost',6300),N(1,'Closing inventory',2080)),
 S('c',7,C(2,'Total sales',31770,'240*40+260*42+250*45'),N(1,'Total purchases',17780),C(2,'Cost of sales',17700,'2000+17780-2080'),C(2,'Gross profit',14070,'31770-17700')),
 S('d',1,U(1,'Lower closing inventory effect','Lower closing inventory increases cost of sales and reduces gross profit.',['lower closing inventory increases cost of sales and reduces gross profit'])));
add(2017,'jan',3,
 S('a',9,C(2,'Retainer revenue',430000,'4300*100'),C(2,'Rescue revenue',336910,'(1923+2680+3175+1848)*35'),N(1,'Service income',766910),C(2,'Depreciation',63000,'210000*0.3'),N(1,'Total expenses',449530),N(1,'Net profit',317380)),
 S('b',11,N(1,'Opening cash debit',1140),N(1,'Opening bank debit',3570),U(1,'April deposits contra','Debit Bank and credit Cash for deposits 25000 and 30000.',['debit bank and credit cash.{0,35}25000 and 30000'],'entry'),N(1,'Card receipts bank debit',19200),N(1,'Fees banked immediately',6840),N(1,'Discount received',1100),N(1,'Bank payments',50370),C(2,'Closing cash debit',2240,'1140+25690+31110-25000-130-30000-200-370'),C(2,'Closing bank debit',34240,'3570+25000+30000+19200+6840-50370')));
add(2017,'jan',4,
 S('a-i',2,U(1,'Income statement affected','The Income Statement is affected.',['income statement is affected']),U(1,'Position statement affected','The Statement of Financial Position is affected.',['statement of financial position is affected'])),
 S('a-ii',1,U(1,'Consistency principle','Unjustified changes of depreciation method violate consistency.',['changes of depreciation method violate consistency'])),
 S('b-i',5,C(2,'Recorded first-year depreciation',20000,'160000/8'),C(2,'Recorded second-year depreciation',42000,'(160000-20000)*0.3'),N(1,'Incorrect provision brought down',62000)),
 S('b-ii',7,C(2,'Correct first-year depreciation',48000,'160000*0.3'),C(2,'Correct second-year depreciation',33600,'112000*0.3'),C(2,'Correct third-year depreciation',23520,'78400*0.3'),N(1,'Correct accumulated depreciation',105120)),
 S('b-iii',5,C(2,'Prior-period understatement',19600,'48000+33600-62000'),E('Prior-period adjustment','Owner Capital','Provision for Depreciation',19600),U(1,'Correction date and narrative','On 1 September 2015 correct depreciation understated in the prior two years.',['1 September 2015.{0,50}depreciation understated.{0,35}prior two years'],'presentation')));
add(2017,'jan',5,
 S('a-i',7,C(3,'Leather consumed',469400,'14600+471300-16500'),C(3,'Fibre consumed',57500,'22300+47100-11900'),N(1,'Raw materials consumed',526900)),
 S('a-ii',3,C(2,'Bags consumed',8200,'2500+8000-2300'),U(1,'Unspecified bag quantity','With N bags purchased, direct bag expenses are 8200+5*N; the dollar column does not establish N.',['N bags purchased.{0,50}8200\\+5\\*N.{0,60}dollar column does not establish N'])),
 S('b',10,C(2,'Direct stitching labour',122500,'111000+11500'),N(1,'Factory insurance',2100),N(1,'Equipment depreciation',6800),N(1,'Building depreciation',32000),N(1,'Factory overheads',40900),U(2,'Algebraic prime cost','Prime cost = 657600+5*N because designer wages depend on the unspecified number of bags.',['prime cost\\s*=\\s*657600\\+5\\*N.{0,90}unspecified number of bags']),U(2,'Algebraic production cost','Production cost = 698500+5*N under the printed dollar heading.',['production cost\\s*=\\s*698500\\+5\\*N.{0,50}printed dollar heading'])));
add(2017,'jan',6,
 S('a',5,N(1,'Non-current assets',168555),N(1,'Current assets',52120),N(1,'Total assets',220675),N(1,'Total liabilities',28605),N(1,'Accumulated fund',192070)),
 S('b',6,N(1,'Current subscriptions received',222750),N(1,'Arrears received',8100),N(1,'Government grants received',83595),N(1,'Total payments',251665),C(2,'Closing bank debit',49380,'-13400+314445-251665')),
 S('c',9,U(1,'Food inventory assumption','Assume the 30 June food inventory is also the 31 August closing inventory.',['assume.{0,30}30 June food inventory.{0,45}31 August closing inventory']),C(2,'Food consumed',92945,'16375+93680-17110'),C(2,'Building and furniture depreciation',55800,'(120000+98000+48555+12445)*0.2'),C(2,'Annual subscription',810,'222750/275'),N(1,'Current subscriptions outstanding',20250),N(1,'Total subscriptions outstanding',24300)));
add(2017,'jan',7,
 S('a-i',2,U(1,'Limited liability benefit','Shareholders risk only their investment under limited liability.',['shareholders risk only their investment']),U(1,'Continuity benefit','A separate legal identity allows continuing succession.',['separate legal identity allows continuing succession'])),
 S('a-ii',2,U(1,'Formation cost','Company formation and compliance incur additional costs.',['company formation and compliance incur additional costs']),U(1,'Administration cost','A company requires more formal reporting and administration.',['company requires more formal reporting and administration'])),
 S('b-i',5,N(1,'Ordinary share receipt',100000),N(1,'Preference share receipt',150000),N(1,'Debenture receipt',50000),N(1,'Registration payment',20000),N(1,'Closing bank debit',280000)),
 S('b-ii',9,C(2,'Debenture interest',10000,'50000*0.2'),N(1,'Profit available',181000),N(1,'Asset replacement reserve',100000),C(2,'Preference dividend',18000,'150000*0.12'),N(1,'Ordinary dividend',30000),C(2,'Retained profit',33000,'181000-100000-18000-30000')),
 S('b-iii',2,U(1,'Equity capital items','Ordinary share capital and preference share capital are equity.',['ordinary share capital and preference share capital are equity']),U(1,'Equity reserve items','Asset replacement reserve and retained profit are equity.',['asset replacement reserve and retained profit are equity'])));

add(2017,'mj',1,
 S('a-i',2,U(1,'Purchases source','The Purchases Journal supplies credit purchases.',['purchases journal supplies credit purchases']),U(1,'Sales source','The Sales Journal supplies credit sales.',['sales journal supplies credit sales'])),
 S('a-ii',7,N(1,'Opening payables credit',2390),N(1,'Credit purchases',24560),N(1,'Returns outwards debit',230),C(2,'Discount received',470,'8770-8300'),N(1,'Payments to suppliers',21350),N(1,'Closing payables credit',4900)),
 S('a-iii',4,C(2,'Opening receivables debit',4100,'6170+53140+250-55460'),N(1,'Receivables total',59560),N(1,'Closing receivables debit',6170)),
 S('b',7,E('Bad debt transfer','Income Statement','Bad Debts',1500),E('Provision creation','Income Statement','Provision for Bad Debts',872),N(1,'Rent expense',12000),N(1,'Prepaid rent',6000),U(1,'Rent date assumption','Assume twelve of the eighteen covered months belong to this accounting year.',['assume twelve of the eighteen covered months.{0,35}this accounting year'])));
add(2017,'mj',2,
 S('a-i',5,U(1,'Nominal account','Wages is a nominal account.',['wages is a nominal account']),U(1,'Personal account','Emily Hair Products is a personal account.',['Emily Hair Products is a personal account']),U(1,'Current liability','Emily Hair Products is a current liability.',['Emily Hair Products is a current liability']),U(1,'Non-current asset','Motor Vehicles is a non-current asset.',['motor vehicles is a non.current asset']),U(1,'Long-term liability','The five-year bank loan is a long-term liability.',['five.year bank loan is a long.term liability'])),
 S('a-ii',5,U(1,'May opening vehicle','On 1 May motor vehicles 15000 is the opening balance.',['1 May.{0,30}motor vehicles.{0,15}15000.{0,30}opening balance']),U(2,'May trade-in','On 3 May an old vehicle 15000 was traded for a vehicle 40000 with bank payment 25000.',['3 May.{0,35}old vehicle.{0,15}15000.{0,40}vehicle.{0,15}40000.{0,40}bank payment.{0,15}25000']),U(1,'May drawings','On 6 May the owner took goods 250 for personal use.',['6 May.{0,30}owner took goods.{0,15}250.{0,25}personal use']),U(1,'May wages introduced','On 7 May the owner paid wages 1550 personally, increasing capital.',['7 May.{0,30}owner paid wages.{0,15}1550.{0,35}increasing capital'])),
 S('b-i',1,U(1,'Contra transfer','The 3 July cash-to-bank transfer is a contra entry.',['3 July.{0,35}cash.to.bank transfer is a contra entry'])),
 S('b-ii',9,N(1,'Opening cash debit',2350),N(1,'Opening bank credit',11890),U(1,'Cash deposit','Debit Bank and credit Cash 25000.',['debit bank and credit cash.{0,15}25000'],'entry'),U(1,'Bank withdrawal contra','Debit Cash and credit Bank 1170.',['debit cash and credit bank.{0,15}1170'],'entry'),N(1,'Francis bank receipt',2000),N(1,'Francis cash receipt',50),N(1,'Closing cash debit',6600),N(1,'Closing bank debit',4680),U(1,'Card settlement assumption','Treat the 12000 bank-card purchase as an immediate bank payment.',['treat.{0,15}12000 bank.card purchase.{0,35}immediate bank payment'])));
add(2017,'mj',3,
 S('a',3,C(3,'Selling price per punch',11,'275000/25000')),
 S('b',4,C(2,'Cost per punch',2.5,'1.50+0.68+0.20+0.12'),C(2,'Gross profit per punch',8.5,'11-2.5')),
 S('c',10,N(1,'Sales',275000),C(2,'Cost of punches',62500,'25000*2.5'),N(1,'Gross profit',212500),C(2,'Blender depreciation',900,'2700/3'),N(1,'Rent',36000),N(1,'Wages',54240),N(1,'Total expenses',115850),N(1,'Net profit',96650)),
 S('d',3,C(3,'Labour percentage of sales',19.72,'54240/275000*100')));
add(2017,'mj',4,
 S('a',12,N(1,'Ships',180000),N(1,'Loading equipment',93000),N(1,'Non-current assets',273000),N(1,'Prepaid insurance',15000),N(1,'Six-month investment',12000),N(1,'Current assets',87000),N(1,'Current liabilities',69000),C(2,'Working capital',18000,'87000-69000'),N(1,'Net assets',201000),N(1,'House capital',134000),N(1,'Home capital',67000)),
 S('b',8,N(1,'House residual share',16000),N(1,'Home residual share',8000),N(1,'House drawing interest',1600),N(1,'Home drawing interest',800),C(2,'House closing current credit',38400,'34000+10000+16000-20000-1600'),C(2,'Home closing current credit',85200,'60000+10000+18000+8000-10000-800')));
add(2017,'mj',5,
 S('a-i',4,N(1,'Total income',46910),N(1,'Total expenditure',9400),N(1,'Current-year surplus',37510),U(1,'Retained profit classification','Prior retained profit is brought-forward equity.',['prior retained profit is brought.forward equity'])),
 S('a-ii',5,C(2,'Reserve transfer',9377.5,'37510*0.25'),N(1,'Current retained profit',5626.5),N(1,'Dividends',22506),N(1,'Retained profit carried forward',18126.5)),
 S('b-i',2,U(1,'Salary method','Fixed monthly pay is a salary.',['fixed monthly pay is a salary']),U(1,'Piece-rate method','Payment per guest room is piece rate.',['payment per guest room is piece rate'])),
 S('b-ii',9,N(1,'Vestiga gross pay',3900),N(1,'Vestiga tax',359),N(1,'Vestiga net pay',3029),N(1,'Pattigow gross pay',4000),N(1,'Pattigow net pay',3012),C(2,'Adams gross pay',2760,'160*15+12*30'),N(1,'Adams tax',254),N(1,'Adams net pay',2285)));

add(2018,'jan',1,
 S('a',10,N(1,'Cash',8000),N(1,'Bank',17000),N(1,'Receivables',22000),N(1,'Current assets',76000),N(1,'Non-current assets',459000),N(1,'Total assets',535000),N(1,'Current liabilities',92000),N(1,'Non-current liabilities',275000),N(1,'Capital',168000),U(1,'Liquidity presentation','Current assets are ordered cash, bank, receivables, inventory and prepayments.',['current assets are ordered cash, bank, receivables, inventory and prepayments'],'presentation')),
 S('b',4,U(1,'Private savings liability effect','Paying the creditor personally reduces liabilities by 500.',['paying the creditor personally reduces liabilities by.{0,10}500']),U(1,'Private savings capital effect','Paying the creditor personally increases capital by 500.',['paying the creditor personally increases capital by.{0,10}500']),U(1,'Goods drawing equation','Goods drawings reduce assets and capital by 400.',['goods drawings reduce assets and capital by.{0,10}400']),U(1,'Unused stationery equation','Unused stationery on credit increases assets and liabilities by 1200.',['unused stationery on credit increases assets and liabilities by.{0,10}1200'])),
 S('c',6,N(1,'Bank withdrawal cash debit',6000),N(1,'Cash sales debit',4800),N(1,'Receivables receipt debit',3000),N(1,'Cash payment total',8400),N(1,'Closing cash debit',5400),U(1,'Cash account balance','Carry cash balance down credit and bring it down debit on 1 June.',['carry cash balance down credit.{0,30}bring it down debit on 1 June'],'presentation')));
add(2018,'jan',2,
 S('a-i',5,N(1,'Marsh gross pay',1400),N(1,'Stop gross pay',1600),N(1,'Park gross pay',2000),N(1,'Drive gross pay',1900),U(1,'Time-rate basis','Weekday hours earn 40 and weekend hours earn 60 per hour.',['weekday hours earn.{0,10}40.{0,30}weekend hours earn.{0,10}60 per hour'])),
 S('a-ii',6,C(2,'Marsh taxable pay',1288,'1400-1400*0.05-1400*0.03'),N(1,'Marsh net pay',966),N(1,'Stop net pay',1104),N(1,'Park net pay',1380),N(1,'Drive net pay',1311)),
 S('b-i',1,U(1,'Statutory example','National insurance is a statutory deduction.',['national insurance is a statutory deduction'])),
 S('b-ii',2,U(1,'Bonus additional pay','A bonus is additional pay above ordinary earnings.',['bonus is additional pay above ordinary earnings']),U(1,'Bonus basis','A bonus may reward performance or an achieved target.',['bonus may reward performance or an achieved target'])),
 S('c',6,N(1,'Parris drawing interest',1800),N(1,'London drawing interest',110),N(1,'Profit available',31910),N(1,'Capital interest total',5000),N(1,'Residual profit',26910),N(1,'Each residual share',13455)));
add(2018,'jan',3,
 S('a',4,N(1,'Gross profit',60000),N(1,'Cost of sales',140000),N(1,'Goods available',165000),N(1,'Closing inventory',25000)),
 S('b-i',5,N(1,'Opening rent receivable debit',2000),N(1,'Bank rent receipts credit',24000),C(2,'Rent revenue',23000,'24000-2000+1000'),U(1,'Closing rent receivable','Bring down rent receivable 1000 debit.',['bring down rent receivable.{0,10}1000 debit'])),
 S('b-ii',5,N(1,'Bank insurance payment debit',45000),N(1,'Opening insurance accrual credit',1500),C(2,'Insurance expense',44200,'45000-1500+700'),U(1,'Closing insurance accrual','Bring down insurance accrual 700 credit.',['bring down insurance accrual.{0,10}700 credit'])),
 S('c',6,C(2,'2015 provision',2880,'72000*0.04'),N(1,'2016 required provision',3360),N(1,'2016 provision increase',480),N(1,'2017 required provision',3200),U(1,'2017 provision release','Debit Provision and credit Income Statement 160.',['debit provision and credit income statement.{0,10}160'],'entry')));
add(2018,'jan',4,
 S('a',5,U(1,'Share issue bank','Debit Bank 300000 for the share issue.',['debit bank.{0,10}300000.{0,30}share issue'],'entry'),U(1,'Ordinary issue','Credit Ordinary Share Capital 200000.',['credit ordinary share capital.{0,10}200000'],'entry'),U(1,'Premium issue','Credit Share Premium 100000.',['credit share premium.{0,10}100000'],'entry'),E('Debentures issued','Bank','Debentures',100000)),
 S('b',9,C(2,'Six-month interest',1000,'100000*0.02*6/12'),N(1,'Profit available',139000),N(1,'Total surplus available',289000),N(1,'General reserve transfer',20000),N(1,'Replacement reserve transfer',50000),N(1,'Ordinary dividend',15000),N(1,'Preference dividend',1250),N(1,'Retained profit',202750)),
 S('c',6,N(1,'Ordinary issued capital',300000),N(1,'Preference issued capital',50000),N(1,'Share premium',125000),N(1,'General reserve',50000),N(1,'Replacement reserve',50000),N(1,'Total equity',777750)));
add(2018,'jan',5,
 S('a',5,N(1,'Opening current assets',17100),N(1,'Opening equipment',15200),N(1,'Opening total assets',32300),N(1,'Opening liabilities',1650),N(1,'Opening accumulated fund',30650)),
 S('b',6,C(2,'Subscription income',12100,'12000+1500-800+1200-1800'),N(1,'Subscriptions total',14700),N(1,'Bank subscription receipt',12000),U(1,'Arrears brought down','Bring down subscriptions arrears 1200 debit.',['bring down subscriptions arrears.{0,10}1200 debit']),U(1,'Advances brought down','Bring down subscriptions advances 800 credit.',['bring down subscriptions advances.{0,10}800 credit'])),
 S('c',9,N(1,'Competition ticket revenue',1300),N(1,'Direct prize cost',400),N(1,'Refreshments expense',200),C(2,'Secretary allocation',250,'5000*0.05'),C(2,'Competition profit',450,'1300-400-200-250'),U(1,'Prize-cost basis','Use the direct competition prize instruction of 400 rather than ledger-derived consumption of 500.',['direct competition prize instruction of.{0,10}400.{0,60}ledger.derived consumption of.{0,10}500']),U(1,'Visitors basis','Visitors fees are excluded because the source does not tie them to the competition.',['visitors fees are excluded because the source does not tie them to the competition'])));

add(2018,'mj',1,
 S('a',14,N(1,'Opening cash debit',600),N(1,'Opening bank credit',400),N(1,'Equipment sale cash debit',1800),N(1,'Cash drawings credit',200),N(1,'Cash sales debit',3680),U(2,'March contra','Debit Bank and credit Cash 5000 for the contra transfer.',['debit bank and credit cash.{0,10}5000.{0,25}contra transfer'],'entry'),N(1,'Jeff discount received',375),N(1,'Jeff bank payment',7125),N(1,'Layby net debt',1640),N(1,'Layby discount allowed',150),N(1,'Layby bank receipt',1490),N(1,'Closing cash debit',880),N(1,'Closing bank credit',1035)),
 S('b',1,U(1,'Bank overdraft meaning','The business owes the bank 1035 as an overdraft.',['business owes the bank.{0,10}1035.{0,20}overdraft'])),
 S('c',5,C(2,'DD net invoice',5625,'7500*0.75'),N(1,'DD net return',600),N(1,'DD closing credit',5025),U(1,'Supplier identity','The cheque to Jeff Air-Con does not settle DD Ltd.',['cheque to Jeff Air.Con does not settle DD Ltd'])));
add(2018,'mj',2,
 S('a-i-gross',5,U(1,'Gross margin formula','Gross profit margin is gross profit divided by sales times 100.',['gross profit margin is gross profit divided by sales times 100']),N(1,'Gross margin increase in percentage points',4),U(1,'Gross margin trend','Gross margin rose from 20 percent to 24 percent.',['gross margin rose from 20 percent to 24 percent']),U(1,'Gross margin meaning','More of each sales dollar remains after cost of sales.',['more of each sales dollar remains after cost of sales']),U(1,'Gross margin evaluation','The higher gross margin is a strength if other factors are unchanged.',['higher gross margin is a strength.{0,50}other factors are unchanged'])),
 S('a-i-expenses',5,U(1,'Expense ratio formula','Expense ratio is operating expenses divided by sales times 100.',['expense ratio is operating expenses divided by sales times 100']),N(1,'Expense ratio increase in percentage points',2),U(1,'Expense ratio trend','Expense ratio rose from 9 percent to 11 percent.',['expense ratio rose from 9 percent to 11 percent']),U(1,'Expense ratio meaning','A larger share of sales is consumed by operating expenses.',['larger share of sales is consumed by operating expenses']),U(1,'Expense ratio evaluation','The higher expense ratio is a weakness.',['higher expense ratio is a weakness'])),
 S('a-ii',2,U(1,'Cost-control recommendation','Introduce a spending budget and review avoidable operating expenses.',['spending budget.{0,40}avoidable operating expenses']),U(1,'Cost-control link','Reducing avoidable expenses reduces the expense-to-sales ratio.',['reducing avoidable expenses reduces the expense.to.sales ratio'])),
 S('b',3,C(2,'Gross profit',238800,'995000*0.24'),N(1,'Cost of sales',756200)),
 S('c-i',1,U(1,'Turnover formula','Inventory turnover is cost of sales divided by average inventory.',['inventory turnover is cost of sales divided by average inventory'])),
 S('c-ii',4,C(2,'Average inventory',32500,'(25000+40000)/2'),C(2,'Inventory turnover',23.27,'756200/32500')));
add(2018,'mj',3,
 S('a',11,N(1,'Opening receivables debit',42680),N(1,'Credit sales debit',102900),N(1,'Customer refunds debit',300),N(1,'Dishonoured cheques debit',1200),N(1,'Customer interest debit',160),N(1,'Opening customer credits',950),N(1,'Sales returns credit',4120),N(1,'Customer receipts credit',92400),N(1,'Discount allowed credit',2800),N(1,'Bad debts credit',860),U(1,'Separate closing receivables','Bring down customer balances 46700 debit and 590 credit separately.',['bring down customer balances.{0,10}46700 debit and 590 credit separately'])),
 S('b',9,N(1,'Opening payables credit',28360),N(1,'Credit purchases credit',65950),N(1,'Supplier interest credit',240),N(1,'Opening supplier debits',620),N(1,'Purchases returns debit',5390),N(1,'Supplier payments debit',75000),N(1,'Discount received debit',4200),N(1,'Closing supplier debit',700),N(1,'Closing supplier credit',10040)));
add(2018,'mj',4,
 S('a',8,N(1,'Benji drawing interest',300),N(1,'Nicka drawing interest',215),N(1,'Profit available',56715),N(1,'Nicka salary',5000),N(1,'Benji capital interest',16000),N(1,'Nicka capital interest',14000),N(1,'Benji residual profit',13029),N(1,'Nicka residual profit',8686)),
 S('b',7,N(1,'Benji opening debit',1300),N(1,'Nicka opening credit',8200),N(1,'Benji drawings',6000),N(1,'Nicka drawings',4300),N(1,'Benji closing current credit',21429),N(1,'Nicka closing current credit',31371),U(1,'Current-account presentation','Current balances remain separate from fixed capital accounts.',['current balances remain separate from fixed capital accounts'],'presentation')),
 S('c',5,N(1,'Opening partners equity',306900),C(2,'Return on opening equity',18.31,'56200/306900*100'),U(1,'Return numerator','Use net income before appropriation as the return numerator.',['net income before appropriation.{0,35}return numerator']),U(1,'Investment basis','State that investment includes opening fixed capital and current balances.',['investment includes opening fixed capital and current balances'])));
add(2018,'mj',5,
 S('a',17,C(3,'Materials consumed',119700,'37000+118500-18200+12000-29600'),C(2,'Direct wages',30240,'50400*0.6'),N(1,'Prime cost',149940),N(1,'Indirect wages',20160),N(1,'Factory salaries',125000),N(1,'Factory rent and rates',26700),N(1,'Factory electricity',162400),N(1,'Factory insurance',9150),N(1,'Machinery depreciation',60000),C(2,'Factory overheads',403410,'20160+125000+26700+162400+9150+60000'),N(1,'Opening work in progress',31200),N(1,'Closing work in progress',36500),N(1,'Production cost',548050)),
 S('b',3,C(3,'Unit production cost',13.70,'548050/40000')));

add(2019,'mj',1,
 S('main',20,C(3,'Monthly van depreciation',1333,'(140000-12000)/8/12'),N(1,'Van carrying amount',138667),C(2,'Monthly loan interest',1000,'60000*0.2/12'),N(1,'Industrial blender',200000),N(1,'Refrigerators',95000),N(1,'Non-current assets',433667),N(1,'Inventory',50000),N(1,'Supplier advance',9000),N(1,'Receivables',25000),N(1,'Bank',18000),N(1,'Cash',8000),N(1,'Current assets',110000),N(1,'Current liabilities',21000),C(2,'Working capital',89000,'110000-21000'),N(1,'Non-current loan',60000),N(1,'Capital',462667)));
add(2019,'mj',2,
 S('a',7,U(1,'Purchases opening','Purchases opens 2750 debit.',['purchases opens.{0,10}2750 debit']),U(1,'Sales opening','Sales opens 12500 credit.',['sales opens.{0,10}12500 credit']),U(1,'Customer opening','C John opens 500 debit.',['C John opens.{0,10}500 debit']),U(1,'Supplier opening','T Chan opens 300 credit.',['T Chan opens.{0,10}300 credit']),U(1,'Allowed opening','Discount Allowed opens 75 debit.',['discount allowed opens.{0,10}75 debit']),U(1,'Received opening','Discount Received opens 150 credit.',['discount received opens.{0,10}150 credit']),U(1,'Bank opening assumption','Assume the ambiguous bank opening balance 1750 is debit.',['assume.{0,30}bank opening balance.{0,10}1750 is debit'])),
 S('b-i',9,N(1,'John bank receipt',460),N(1,'John discount allowed',40),E('January purchase','Purchases','T Chan',950),N(1,'John new credit sale',600),N(1,'Chan bank payment',1100),N(1,'Chan discount received',150),N(1,'Drawings bank payment',900),U(1,'Vehicle bought on credit','Debit Motor Vehicles and credit VROOM Ltd 30000.',['debit motor vehicles and credit VROOM Ltd.{0,10}30000'],'entry')),
 S('b-ii',2,C(2,'Closing bank debit',210,'1750+460-1100-900')),
 S('c-i',1,N(1,'Current invoice cheque portion',800)),
 S('c-ii',1,N(1,'Current invoice discount percentage',15.79)));
add(2019,'mj',3,
 S('a',8,N(1,'Corrected gross income',332000),C(2,'Depreciation',150000,'(960000-210000)*0.2'),N(1,'Operating expenses',94000),C(2,'Partner loan interest',4000,'40000*0.1'),C(2,'Net income',84000,'332000-150000-94000-4000')),
 S('b',7,N(1,'Ryan drawing interest',4800),N(1,'Iana drawing interest',3400),N(1,'Profit available',92200),N(1,'Iana salary',36000),N(1,'Capital interest total',18600),N(1,'Ryan residual share',22560),N(1,'Iana residual share',15040)),
 S('c',5,N(1,'Iana opening credit',9000),N(1,'Iana credit total',69040),N(1,'Iana drawings',30000),N(1,'Iana drawing interest',3400),N(1,'Iana closing credit',35640)));
add(2019,'mj',4,
 S('a',13,C(2,'Subscription cash receipts',426000,'120*3600-10*600'),C(2,'Social ticket cash receipts',192500,'(800-30)*250'),N(1,'Bar cash takings',54600),N(1,'Opening cash',1750),N(1,'Administration payments',12775),N(1,'Social evening payments',60895),N(1,'Ground maintenance payments',39430),N(1,'Staff payments',46900),N(1,'Bar payments',28300),N(1,'Total payments',188300),N(1,'Closing cash',486550)),
 S('b-i',6,U(1,'Purchase journal source','The 12 February credit purchase comes from the Purchases Journal.',['12 February credit purchase.{0,35}Purchases Journal']),U(1,'Purchase explanation','Goods 200 were bought on credit from S Lake.',['goods.{0,10}200 were bought on credit from S Lake']),U(1,'Drawings journal source','The 17 February goods drawings belong in the General Journal.',['17 February goods drawings.{0,35}General Journal']),U(1,'Drawings explanation','The owner took goods 500 for personal use.',['owner took goods.{0,10}500 for personal use']),U(1,'Capital cash-book source','The 26 February capital receipt belongs in the Cash Book.',['26 February capital receipt.{0,35}Cash Book']),U(1,'Capital explanation','The owner introduced 2000 into the business bank.',['owner introduced.{0,10}2000 into the business bank'])),
 S('b-ii',1,N(1,'Required provision',350)));
add(2019,'mj',5,
 S('a',8,N(1,'Opening equity',469000),N(1,'Current profit after tax',186000),N(1,'Ordinary dividend',30000),N(1,'Preference dividend',8000),N(1,'Reserve transfer',50000),N(1,'Closing retained profit',222000),N(1,'Closing general reserve',145000),N(1,'Closing equity',617000)),
 S('b',8,N(1,'Ordinary issued capital',150000),N(1,'Preference issued capital',100000),N(1,'Ordinary issued shares',150000),N(1,'Preference issued shares',50000),N(1,'General reserve',145000),N(1,'Retained profit',222000),N(1,'Total equity',617000),U(1,'Authorized capital distinction','Authorized but unissued capital is excluded from issued equity.',['authorized but unissued capital is excluded from issued equity'])),
 S('c',4,U(1,'Net margin comparison','Net profit margin 40 percent exceeds the industry 36 percent, retaining more profit per sales dollar.',['net profit margin.{0,10}40 percent exceeds.{0,30}36 percent.{0,70}more profit per sales dollar']),U(1,'Current ratio interpretation','Assuming 3.2 to 1 and 2.1 to 1 were intended, the company has the larger liquidity cushion.',['assuming.{0,20}3[.]2 to 1 and 2[.]1 to 1.{0,65}larger liquidity cushion']),U(1,'ROCE comparison','ROCE 69 percent exceeds the industry 62 percent, giving more return on capital.',['ROCE.{0,10}69 percent exceeds.{0,30}62 percent.{0,60}more return on capital']),U(1,'Working capital recommendation','Investigate slow receivables and excess inventory to release tied-up funds.',['investigate slow receivables and excess inventory.{0,35}tied.up funds'])));

add(2020,'jan',1,
 S('a-i',1,U(1,'Double-entry equality','Each transaction has equal debit and credit totals.',['each transaction has equal debit and credit totals'])),
 S('a-ii',2,U(1,'Omission error','Complete omission leaves both debit and credit absent.',['complete omission leaves both debit and credit absent']),U(1,'Principle error','An error of principle can debit an asset purchase to expense while totals agree.',['error of principle.{0,40}asset purchase to expense.{0,35}totals agree'])),
 S('b-i',4,C(2,'Opening capital',47025,'54050-7025'),C(2,'Closing capital',40550,'44900-4350')),
 S('b-ii',2,N(1,'Net loss',6475),U(1,'Capital-change assumption','Assume no drawings and no additional capital in calculating this loss.',['assume no drawings and no additional capital.{0,35}loss'])),
 S('b-iii',2,C(2,'Year-end non-current assets',33900,'23300+10600')),
 S('b-iv',1,U(1,'Inventory classification','Inventory is a current asset.',['inventory is a current asset'])),
 S('b-v',1,U(1,'Current liability example','Accounts payable is a current liability.',['accounts payable is a current liability'])),
 S('b-vi',3,C(2,'Opening working capital',14925,'3800+1900+1850+9000-1625'),U(1,'Loan maturity assumption','Treat the separately listed loan as non-current because no current instalment is specified.',['loan as non.current because no current instalment is specified'])),
 S('b-vii',1,U(1,'Liquidity order','The specified accounts in liquidity order are Cash, Bank, Inventory.',['liquidity order are Cash, Bank, Inventory'])),
 S('b-viii',1,U(1,'Depreciation term','The reduction is depreciation.',['reduction is depreciation'])),
 S('b-ix',1,N(1,'Receivables owing',1000)),
 S('b-x',1,U(1,'Solvency term','A business able to pay liabilities when due is solvent.',['able to pay liabilities when due is solvent'])));
add(2020,'jan',2,
 S('a',19,N(1,'Opening cash debit',1380),N(1,'Opening bank debit',1590),N(1,'Cash sales debit',1030),N(1,'Elwin bank payment',2660),N(1,'Elwin discount received',140),U(2,'Bank deposit contra','Debit Bank and credit Cash 980 marked C.',['debit bank and credit cash.{0,10}980 marked C'],'entry'),N(1,'Telephone cash payment',280),C(2,'Amed discount allowed',39,'1300*0.03'),N(1,'Amed bank receipt',1261),N(1,'Personal electricity drawings',560),N(1,'CM bank payment',3325),N(1,'CM discount received',175),N(1,'Closing cash debit',1150),N(1,'Closing bank credit',2714),N(1,'Discount received total',315),N(1,'Discount allowed total',39),U(1,'Folio presentation','Use consistent ledger folios and C for the cash-bank transfer.',['consistent ledger folios and C for the cash.bank transfer'],'presentation')),
 S('b',1,U(1,'Overdraft meaning','The closing bank credit means the business owes the bank 2714.',['closing bank credit.{0,35}owes the bank.{0,10}2714'])));
add(2020,'jan',3,
 S('a',15,C(2,'Net sales',43000,'43500-500'),N(1,'Net purchases',34380),C(2,'Cost of goods sold',32380,'10000+34380-12000'),N(1,'Gross profit',10620),N(1,'Electricity expense',550),N(1,'Telephone expense',122),N(1,'Salary expense',3500),N(1,'Fittings depreciation',600),N(1,'Van depreciation',800),N(1,'Bad debts',980),N(1,'Provision increase',40),N(1,'Total expenses',6592),N(1,'Net profit',4028)),
 S('b',5,N(1,'Opening capital',18180),N(1,'Profit added',4028),N(1,'Drawings deducted',1800),N(1,'Closing capital',20408),U(1,'Capital statement date','The capital extract is at 31 December 2019.',['capital extract.{0,20}31 December 2019'],'presentation')));
add(2020,'jan',4,
 S('a',7,U(1,'Source stage','Collect and analyse source documents.',['collect and analyse source documents'],'presentation'),U(1,'Journal stage','Record transactions in journals.',['record transactions in journals'],'presentation'),U(1,'Ledger stage','Post journals to ledger accounts.',['post journals to ledger accounts'],'presentation'),U(1,'Trial balance stage','Extract the trial balance from ledger balances.',['extract the trial balance from ledger balances'],'presentation'),U(1,'Adjustment stage','Make year-end adjustments.',['make year.end adjustments'],'presentation'),U(1,'Statements stage','Prepare financial statements.',['prepare financial statements'],'presentation'),U(1,'Cycle links','Source documents -> journals -> ledgers -> trial balance -> adjustments -> statements -> next period.',['source documents\\s*->\\s*journals\\s*->\\s*ledgers\\s*->\\s*trial balance\\s*->\\s*adjustments\\s*->\\s*statements\\s*->\\s*next period'],'presentation')),
 S('b-i',1,U(1,'One-owner business','The one-owner business is a sole proprietorship.',['one.owner business is a sole proprietorship'])),
 S('b-ii',1,U(1,'Restricted-share business','The restricted-share business is a private limited company.',['restricted.share business is a private limited company'])),
 S('b-iii',1,U(1,'Mutual agency business','The mutual-agency business is a partnership.',['mutual.agency business is a partnership'])),
 S('b-iv',1,U(1,'Member-serving business','The member-serving club is a non-profit organization.',['member.serving club is a non.profit organization'])),
 S('c-i',2,U(1,'Internal user','The owner is an internal user.',['owner is an internal user']),U(1,'Internal use','The owner uses profit and cost information to plan spending.',['owner uses profit and cost information to plan spending'])),
 S('c-ii',2,U(1,'External user','A bank lender is an external user.',['bank lender is an external user']),U(1,'External use','The lender assesses cash generation and loan repayment.',['lender assesses cash generation and loan repayment'])),
 S('d-i',1,U(1,'Water bill concept','Recording private water as business expense violates business entity.',['private water.{0,35}business expense violates business entity'])),
 S('d-ii',1,U(1,'Bad debt concept','Ignoring a known likely bad debt violates prudence.',['ignoring a known likely bad debt violates prudence'])),
 S('d-iii',1,U(1,'Method change concept','Changing depreciation to manipulate profit violates consistency.',['changing depreciation to manipulate profit violates consistency'])),
 S('d-iv',1,U(1,'Revenue timing concept','Revenue belongs to the earned period under accruals.',['revenue belongs to the earned period under accruals'])),
 S('e',1,U(1,'Bad debt effect','Omitting bad debt overstates profit by 8000.',['omitting bad debt overstates profit by.{0,10}8000'])));
add(2020,'jan',5,
 S('a-i',8,N(1,'Opening receivables debit',5460),N(1,'Credit sales debit',295380),N(1,'Customer interest debit',640),N(1,'Customer receipts credit',290650),N(1,'Discount allowed credit',1890),N(1,'Sales returns credit',2200),N(1,'Closing receivables debit',6740),N(1,'Receivables account total',301480)),
 S('a-ii',8,N(1,'Opening payables credit',4500),N(1,'Credit purchases credit',162500),N(1,'Supplier refunds credit',1240),N(1,'Supplier payments debit',158700),N(1,'Discount received debit',1940),N(1,'Purchase returns debit',3700),N(1,'Closing payables credit',3900),N(1,'Payables account total',168240)),
 S('b',2,U(1,'Credit sales source','Credit sales come from the Sales Journal.',['credit sales come from the sales journal']),U(1,'Supplier refund source','Supplier refunds come from the receipts side of the Cash Book.',['supplier refunds come from the receipts side of the cash book'])),
 S('c',2,U(1,'Payroll software one','Sage Payroll is accounting payroll software.',['Sage Payroll is accounting payroll software']),U(1,'Payroll software two','QuickBooks Payroll is accounting payroll software.',['QuickBooks Payroll is accounting payroll software'])));

add(2021,'jan',1,
 S('a-i',9,N(1,'Service revenue',31700),N(1,'Rent expense',3200),N(1,'Electricity expense',1200),N(1,'General expenses',1700),N(1,'Supplies expense',1000),N(1,'Wages expense',3000),N(1,'Equipment depreciation',3600),N(1,'Furniture depreciation',500),N(1,'Net profit',17500)),
 S('a-ii',3,N(1,'Furniture carrying amount',8500),N(1,'Equipment carrying amount',14400),N(1,'Total non-current assets',22900)),
 S('a-iii',4,U(1,'Outstanding expense','Outstanding invoices are accrued expenses, code E.',['outstanding invoices are accrued expenses, code E']),U(1,'Asset value loss','Loss in non-current asset value is depreciation, code C.',['loss in non.current asset value is depreciation, code C']),U(1,'Operating expenditure','Daily operating expenditure is revenue expenditure, code A.',['daily operating expenditure is revenue expenditure, code A']),U(1,'Net book value','Cost less accumulated depreciation is net book value, code B.',['cost less accumulated depreciation is net book value, code B'])),
 S('b-i',2,E('Yoshida write-off','Bad Debts','Yoshida',4000)),
 S('b-ii',2,U(1,'Wear cause','Wear and tear through use causes depreciation.',['wear and tear through use causes depreciation']),U(1,'Obsolescence cause','Obsolescence from improved technology causes depreciation.',['obsolescence from improved technology causes depreciation'])));
add(2021,'jan',2,
 S('a-i',3,U(1,'Control comparison','Control accounts compare independent totals with subsidiary ledger balances.',['control accounts compare independent totals with subsidiary ledger balances']),U(1,'Error location','Control accounts help locate posting errors.',['control accounts help locate posting errors']),U(1,'Summary balance','Control accounts supply summarized receivables and payables for financial statements.',['control accounts supply summarized receivables and payables for financial statements'])),
 S('a-ii',6,N(1,'Opening payables credit',8800),N(1,'Credit purchases',68000),N(1,'Supplier payments debit',56000),N(1,'Discount received debit',1400),N(1,'Returns outwards debit',1500),N(1,'Closing payables credit',17900)),
 S('a-iii',8,N(1,'Opening receivables debit',8500),N(1,'Credit sales',8000),N(1,'Customer receipts credit',10100),N(1,'Bad debts credit',500),N(1,'Sales returns credit',200),N(1,'Discount allowed credit',400),N(1,'Closing receivables debit',5300),N(1,'Receivables total',16500)),
 S('b',3,U(1,'Unpresented cheques','Unpresented cheques are in the cash book before the bank pays them.',['unpresented cheques are in the cash book before the bank pays them']),U(1,'Uncredited deposits','Deposits in transit are in the cash book before the bank credits them.',['deposits in transit are in the cash book before the bank credits them']),U(1,'Bank charges difference','Bank charges can appear on the statement before entry in the cash book.',['bank charges.{0,40}statement before entry in the cash book'])));
add(2021,'jan',3,
 S('a',5,U(1,'Accrual code','Incurred expenses and earned revenue correspond to accrual, code B.',['incurred expenses and earned revenue correspond to accrual, code B']),U(1,'Consistency code','Same methods between periods correspond to consistency, code E.',['same methods between periods correspond to consistency, code E']),U(1,'Entity code','Separate private dealings correspond to business entity, code A.',['separate private dealings correspond to business entity, code A']),U(1,'Prudence code','Avoiding overstated assets and understated liabilities is prudence, code C.',['avoiding overstated assets and understated liabilities is prudence, code C']),U(1,'Duality code','Two-sided transaction effects correspond to duality, code D.',['two.sided transaction effects correspond to duality, code D'])),
 S('b-i',3,N(1,'October sales',32000),N(1,'November sales',90000),N(1,'December sales',108000)),
 S('b-ii',8,N(1,'October receipts',44000),N(1,'October payments',39600),N(1,'October closing bank',14400),N(1,'November receipts',105600),N(1,'November payments',121000),N(1,'November closing bank',-1000),N(1,'December net inflow',83000),N(1,'December closing bank',82000)),
 S('c-i',2,C(2,'Selling price',187.5,'150*1.25')),
 S('c-ii',2,C(2,'Gross profit margin',20,'37.5/187.5*100')));
add(2021,'jan',4,
 S('a',11,N(1,'Opening bank credit',3700),N(1,'Merick bank receipt',10950),N(1,'Fray discount received',96),N(1,'Fray bank payment',4704),N(1,'Harry discount allowed',250),N(1,'Harry bank receipt',4750),N(1,'Armstrong bank receipt',4000),N(1,'Utilities bank payment',1200),N(1,'Armstrong dishonour payment',4000),N(1,'Closing bank debit',6096),U(1,'Trade discount excluded','Merick trade discount 270 is excluded from cash discount columns.',['Merick trade discount.{0,10}270 is excluded from cash discount columns'])),
 S('b',3,N(1,'Earlier discount received credit',500),N(1,'December discount received credit',96),U(1,'Discount closure','Debit Discount Received and credit Income Statement 596.',['debit discount received and credit income statement.{0,10}596'],'entry')),
 S('c',3,U(1,'Discount ledger','Discount Received belongs in the General Ledger.',['discount received belongs in the general ledger']),U(1,'Supplier ledger','Fray Ltd belongs in the Purchases Ledger.',['Fray Ltd belongs in the purchases ledger']),U(1,'Customer ledger','Harry belongs in the Sales Ledger.',['Harry belongs in the sales ledger'])),
 S('d',2,N(1,'Utilities expense',6720),N(1,'Utilities prepayment asset',560)),
 S('e',1,U(1,'Balance document','A statement of account summarizes the debtor balance owed.',['statement of account summarizes the debtor balance owed'])));
add(2021,'jan',5,
 S('a',9,N(1,'Fixtures debit',35000),N(1,'Land debit',59000),N(1,'Inventory debit',25000),N(1,'Trade receivables debit',13000),N(1,'Purchases debit',56000),N(1,'Debit total before suspense',212100),N(1,'Credit total',212500),N(1,'Suspense debit',400),N(1,'Balanced trial total',212500)),
 S('b-i',1,U(1,'Wrong customer error','Posting to the wrong customer is an error of commission.',['posting to the wrong customer is an error of commission'])),
 S('b-ii',1,U(1,'Equipment sale error','Treating an equipment disposal as goods sales is an error of principle.',['equipment disposal as goods sales is an error of principle'])),
 S('b-iii',1,U(1,'Reversed wage error','Debiting Bank and crediting Wages for a wage payment is complete reversal.',['debiting bank and crediting wages.{0,35}complete reversal'])),
 S('c',8,E('Wrong customer correction','M Mullins','M Millar',1800),E('Equipment proceeds correction','Sales','Equipment Disposal',2000),C(2,'Reversal correction amount',9000,'4500*2'),E('Reversal correction','Wages','Bank',9000)));

add(2021,'mj',1,
 S('a',8,N(1,'Anil opening debit',5600),N(1,'Anil net invoice debit',2760),N(1,'Anil bank settlement credit',5432),N(1,'Anil discount allowed credit',168),N(1,'Anil returns credit',360),N(1,'Anil refund debit',230),N(1,'Anil closing debit',2630),N(1,'Anil account total',8590)),
 S('b',4,U(1,'Anil ledger','Anil belongs in the Sales Ledger.',['Anil belongs in the sales ledger']),U(1,'Returns ledger','Purchases Returns belongs in the General Ledger.',['purchases returns belongs in the general ledger']),U(1,'Allowed ledger','Discounts Allowed belongs in the General Ledger.',['discounts allowed belongs in the general ledger']),U(1,'Cash ledger','Cash belongs in the General Ledger or cash book serving as its ledger account.',['cash belongs in the general ledger or cash book serving as its ledger account'])),
 S('c',8,N(1,'Corrected purchases debit',234000),N(1,'Discounts allowed debit',5900),N(1,'Discount received credit',2600),N(1,'Trade payables credit',51400),N(1,'Capital credit',145600),N(1,'Non-current assets debit',527200),N(1,'Trial balance debit total',882870),N(1,'Trial balance credit total',882870)));
add(2021,'mj',2,
 S('a',4,E('Marcella payment','Bank','Marcella',1300),E('Marcella write-off','Bad Debts','Marcella',3500)),
 S('b-i',2,C(2,'Provision decrease',189,'1170-32700*0.03')),
 S('b-ii',1,U(1,'Provision decrease entry','Debit Provision for Doubtful Debts 189.',['debit provision for doubtful debts.{0,10}189'],'entry')),
 S('c-i',2,U(1,'Future order effect','The future order has no present effect on the financial statements.',['future order has no present effect on the financial statements']),U(1,'Future order reason','Revenue is recognized when goods are supplied rather than merely ordered.',['revenue is recognized when goods are supplied rather than merely ordered'])),
 S('c-ii',2,U(1,'Private transaction effect','The private vehicle has no business statement effect.',['private vehicle has no business statement effect']),U(1,'Private transaction reason','Business entity separates private purchases from the business.',['business entity separates private purchases from the business'])),
 S('c-iii',2,U(1,'Purchases overcast profit','Purchases overcast understates profit by 1600.',['purchases overcast understates profit by.{0,10}1600']),U(1,'Purchases overcast capital','The same overcast understates closing capital by 1600.',['same overcast understates closing capital by.{0,10}1600'])),
 S('d-i',6,N(1,'Opening supplier credit',29040),N(1,'Credit purchases',124410),N(1,'Supplier interest',630),N(1,'Supplier debit reductions',113640),N(1,'Closing supplier debit',540),N(1,'Closing supplier credit',40980)),
 S('d-ii',1,U(1,'Control use','Compare control totals against subsidiary ledger balances to locate posting errors.',['compare control totals against subsidiary ledger balances to locate posting errors'])));
add(2021,'mj',3,
 S('a-i',3,N(1,'Current assets',84000),N(1,'Current liabilities',64000),N(1,'Current ratio',1.31)),
 S('a-ii',1,U(1,'Liquidity trend','The current ratio fell from 1.70 to 1.31, reducing the short-term cushion.',['current ratio fell from 1[.]70 to 1[.]31.{0,35}short.term cushion'])),
 S('a-iii',1,U(1,'Collection trend','Collection improved from 65 to 59.7 days because customers pay faster.',['collection improved from 65 to 59[.]7 days.{0,35}customers pay faster'])),
 S('b',9,N(1,'Net sales',256600),N(1,'Opening inventory',37000),N(1,'Purchases',98000),N(1,'Carriage inwards',1200),N(1,'Closing inventory',32000),N(1,'Cost of sales',104200),N(1,'Gross profit',152400),N(1,'Operating expenses',45000),N(1,'Net profit',107400)),
 S('c',6,N(1,'Statement overdraft',1118),U(1,'Uncredited deposit sign','Add uncredited deposit 900 to the signed statement balance.',['add uncredited deposit.{0,10}900.{0,30}signed statement balance']),U(1,'Unpresented cheque sign','Deduct unpresented cheque 700 from the signed statement balance.',['deduct unpresented cheque.{0,10}700.{0,30}signed statement balance']),N(1,'Updated cash-book overdraft',918),U(1,'Private insurance adjustment','Debit Drawings and credit Bank 240 for private insurance.',['debit drawings and credit bank.{0,10}240.{0,25}private insurance'],'entry'),U(1,'Timing distinction','The deposit and supplier cheque are timing differences, while insurance updates the cash book.',['deposit and supplier cheque are timing differences.{0,40}insurance updates the cash book'])));
add(2021,'mj',4,
 S('a-i',2,C(2,'Regular hours',160,'40*4')),
 S('a-ii',2,C(2,'Overtime hours',25,'185-160')),
 S('a-iii',4,N(1,'Regular pay',3200),N(1,'Overtime pay',750),N(1,'Deductions',510),N(1,'Net pay',3440)),
 S('b-i',1,U(1,'Statutory example','Income tax is a statutory deduction.',['income tax is a statutory deduction'])),
 S('b-ii',1,U(1,'Voluntary example','Credit union saving is a voluntary deduction.',['credit union saving is a voluntary deduction'])),
 S('c',10,U(1,'Budget heading','Foot Soles Cash Budget for the six months ending 31 October 2021.',['Foot Soles Cash Budget for the six months ending 31 October 2021'],'presentation'),U(1,'Opening date assumption','Assume the printed 2020 opening date means 1 May 2021.',['assume the printed 2020 opening date means 1 May 2021']),N(1,'May receipts',45000),N(1,'July payments',61000),N(1,'May closing cash',22000),N(1,'June closing cash',30000),N(1,'July closing cash',8000),N(1,'August closing cash',16000),N(1,'September closing cash',23000),N(1,'October closing cash',34000)));
add(2021,'mj',5,
 S('a',2,U(1,'Capital benefit','Partners combine resources to provide more capital.',['partners combine resources to provide more capital']),U(1,'Skills benefit','Partners share complementary skills and the workload.',['partners share complementary skills and the workload'])),
 S('b-i',7,N(1,'Avril drawing interest',1700),N(1,'Bernice drawing interest',4600),N(1,'Profit available',158300),N(1,'Bernice salary',78000),N(1,'Capital interest total',20400),N(1,'Avril residual profit',35940),N(1,'Bernice residual profit',23960)),
 S('b-ii',1,U(1,'Avril debit balance','Avril owes the partnership 15000 because current-account charges exceed credits.',['Avril owes the partnership.{0,10}15000.{0,50}charges exceed credits'])),
 S('c-i',2,U(1,'Convenience reason','Petty cash handles frequent small payments conveniently.',['petty cash handles frequent small payments conveniently']),U(1,'Main book reason','Petty cash reduces minor entries in the main cash book.',['petty cash reduces minor entries in the main cash book'])),
 S('c-ii',8,N(1,'Opening petty cash float',200),N(1,'Travel',50),N(1,'Stationery',35),N(1,'Cleaning',20),N(1,'Refreshments',40),N(1,'Petty payments total',145),N(1,'Petty cash remaining',55),N(1,'Reimbursement',145)));

add(2022,'mj',1,
 S('a',9,N(1,'Opening float',1500),N(1,'Cleaning supplies total',441),N(1,'Stationery total',543),N(1,'Cleaner wages total',500),N(1,'Total petty payments',1484),N(1,'Cash remaining',16),N(1,'Reimbursement',1484),U(1,'Payment analysis','Each petty payment appears in both Total and its matching analysis column.',['each petty payment appears in both total and its matching analysis column'],'presentation'),U(1,'May brought down','Bring down cash 16 on the receipts side on 1 May 2022.',['bring down cash.{0,10}16.{0,30}receipts side on 1 May 2022'],'presentation')),
 S('b',8,E('Stationery posting','Stationery','Petty Cash',543),E('Cleaning posting','Cleaning Supplies','Petty Cash',441),E('Wages posting','Cleaner Wages','Petty Cash',500),U(1,'Posting date','The expense postings are dated 30 April 2022.',['expense postings are dated 30 April 2022'],'presentation'),U(1,'Cross reference','Use PC1 and matching distinct ledger account references in both records.',['PC1 and matching distinct ledger account references in both records'],'presentation')),
 S('c',3,U(1,'Cheque date payee','The cheque is dated 1 May 2022 payable to Turi Francis.',['cheque is dated 1 May 2022 payable to Turi Francis'],'presentation'),N(1,'Cheque amount',1484),U(1,'Cheque words and authorization','One thousand four hundred and eighty-four dollars and zero cents; authorized signature.',['one thousand four hundred and eighty.four dollars and zero cents.{0,30}authorized signature'],'presentation')));
add(2022,'mj',2,
 S('a',8,N(1,'Subscriptions cash',5460),N(1,'Rental cash',2420),N(1,'Social ticket cash',17880),N(1,'Total receipts',25760),N(1,'Total payments',20020),N(1,'Opening overdraft',2045),N(1,'Closing bank debit',3695),U(1,'Opening overdraft side','The opening overdraft belongs on the payments side.',['opening overdraft belongs on the payments side'])),
 S('b-i',2,U(1,'Standing order identification','Standing order is item C, insurance paid under instructions.',['standing order is item C.{0,30}insurance']),U(1,'Direct deposit identification','Direct deposit is item A, subscriptions paid into the bank.',['direct deposit is item A.{0,30}subscriptions'])),
 S('b-ii',7,N(1,'Original cash-book balance',3695),N(1,'Direct subscription receipt',200),N(1,'Insurance payment',590),N(1,'Dishonoured receipt deduction',430),N(1,'Bank charges',80),N(1,'Additional catering payment',270),N(1,'Updated cash bank debit',2525)),
 S('b-iii',3,N(1,'Updated cash-book debit',2525),U(1,'Duplicate cheque bank error','Deduct the bank duplicate cheque 400 to reach the statement balance.',['deduct the bank duplicate cheque.{0,10}400.{0,35}statement balance']),N(1,'Statement favourable balance',2125)));
add(2022,'mj',3,
 S('a-i',3,N(1,'Material per part',77),N(1,'Labour per part',75),N(1,'Direct cost per part',152)),
 S('a-ii',3,C(3,'Direct cost of 800 parts',121600,'800*152')),
 S('b-i',4,N(1,'Opening materials',42000),N(1,'Net purchases',239820),N(1,'Closing materials',28000),N(1,'Materials used',253820)),
 S('b-ii',8,N(1,'Materials consumed',253820),N(1,'Factory wages',106700),N(1,'Prime cost',360520),N(1,'Factory overheads',86000),N(1,'Factory cost before WIP',446520),N(1,'Opening WIP added',12480),N(1,'Closing WIP deducted',34000),N(1,'Production cost',425000)),
 S('c',2,C(2,'Unit production cost',8.5,'425000/50000')));
add(2022,'mj',4,
 S('a',3,U(1,'Plan executive summary','The business plan includes an executive summary.',['business plan includes an executive summary']),U(1,'Plan marketing','The business plan includes market analysis and marketing strategy.',['business plan includes market analysis and marketing strategy']),U(1,'Plan financials','The business plan includes financial forecasts.',['business plan includes financial forecasts'])),
 S('b',6,U(1,'Ordinary issue debit','Debit Bank 180000 for the ordinary share issue.',['debit bank.{0,10}180000.{0,35}ordinary share issue'],'entry'),U(1,'Ordinary issue credits','Credit Ordinary Share Capital 100000 and Share Premium 80000.',['credit ordinary share capital.{0,10}100000 and share premium.{0,10}80000'],'entry'),U(1,'Preference issue debit','Debit Bank 200000 for the preference share issue.',['debit bank.{0,10}200000.{0,35}preference share issue'],'entry'),U(1,'Preference issue credits','Credit Preference Share Capital 100000 and Share Premium 100000.',['credit preference share capital.{0,10}100000 and share premium.{0,10}100000'],'entry'),E('Debenture issue','Bank','Debentures',80000)),
 S('c',6,N(1,'Ordinary share capital',100000),N(1,'Preference share capital',100000),N(1,'Share premium',180000),N(1,'Shareholders equity',380000),U(1,'Debenture classification','Debentures are liabilities outside shareholders equity.',['debentures are liabilities outside shareholders equity']),U(1,'Unissued capital classification','Unissued authorized shares are excluded from paid-up capital.',['unissued authorized shares are excluded from paid.up capital'])),
 S('d',3,N(1,'Ordinary dividend',5000),N(1,'Preference annual dividend',8000),U(1,'Dividend time basis','Use the annual preference entitlement; six-month apportionment would give 4000.',['annual preference entitlement.{0,50}six.month apportionment would give.{0,10}4000'])),
 S('e-i',1,N(1,'Additional preference shares',300000)),
 S('e-ii',1,N(1,'Additional preference nominal value',150000)));
add(2022,'mj',5,
 S('a',2,N(1,'Assembly indirect costs',14750),N(1,'Finishing indirect costs',20850)),
 S('b-i',1,U(1,'OAR formula','Overhead absorption rate is indirect cost divided by relevant activity hours.',['overhead absorption rate is indirect cost divided by relevant activity hours'])),
 S('b-ii',6,C(2,'Assembly OAR',4.214285714,'14750/3500'),U(1,'Assembly base','Assembly uses labour hours as its dominant activity.',['assembly uses labour hours as its dominant activity']),C(2,'Finishing OAR',13.9,'20850/1500'),U(1,'Finishing base','Finishing uses machine hours as its dominant activity.',['finishing uses machine hours as its dominant activity'])),
 S('c',7,N(1,'Direct materials',50),N(1,'Assembly direct labour',93.75),N(1,'Finishing direct labour',87.5),N(1,'Assembly absorbed overhead',15.803571429),N(1,'Finishing absorbed overhead',27.8),C(2,'Total toy cost',274.853571429,'50+93.75+87.5+15.803571429+27.8')),
 S('d-i',1,U(1,'Mark-up definition','Mark-up pricing adds a percentage of cost to cost to set selling price.',['mark.up pricing adds a percentage of cost to cost to set selling price'])),
 S('d-ii',1,N(1,'Toy mark-up',137.43)),
 S('d-iii',2,C(2,'Toy selling price',412.28,'274.853571429*1.5')));

add(2023,'jan',1,
 S('a-i',12,C(2,'Van depreciation',22400,'(140000-28000)*0.2'),N(1,'Closing accumulated depreciation',50400),N(1,'Van carrying amount',89600),N(1,'Insurance accrual',700),N(1,'Insurance expense',15700),N(1,'Rent accrual',1200),N(1,'Rent income',14400),N(1,'Drawings closure',5000),N(1,'Capital before charges',60800),N(1,'Net loss debited',14000),N(1,'Closing capital credit',41800)),
 S('a-ii',2,U(1,'Division work advantage','Separate ledgers allow staff to work on different account groups simultaneously.',['separate ledgers allow staff to work on different account groups simultaneously']),U(1,'Division checking advantage','Separate personal ledgers make accounts easier to locate and check against controls.',['separate personal ledgers make accounts easier to locate and check against controls'])),
 S('a-iii',1,U(1,'Capital ledger','Capital belongs in the General Ledger.',['capital belongs in the general ledger'])),
 S('b-i',1,U(1,'Prudence explanation','Depreciation prevents overstating the van and profit.',['depreciation prevents overstating the van and profit'])),
 S('b-ii',1,U(1,'Matching explanation','Depreciation allocates asset cost to periods benefiting from its use.',['depreciation allocates asset cost to periods benefiting from its use'])),
 S('c-i',2,N(1,'Credit note trade discount',24),N(1,'Credit note discount percent',10)),
 S('c-ii',1,U(1,'Credit note reason','The customer returned damaged chicken so its debt is reduced.',['customer returned damaged chicken.{0,30}debt is reduced'])));
add(2023,'jan',2,
 S('a-i',4,U(1,'Decorator cost','Traceable cake decorator salary is direct labour.',['traceable cake decorator salary is direct labour']),U(1,'Factory rent cost','Factory rent is indirect cost.',['factory rent is indirect cost']),U(1,'Machine depreciation cost','Machine depreciation is indirect cost.',['machine depreciation is indirect cost']),U(1,'Cake material cost','Cake raw materials are direct cost.',['cake raw materials are direct cost'])),
 S('a-ii',2,C(2,'Decorations overheads',20000,'17000+3000')),
 S('b-i',1,U(1,'Dominant activity','Machine hours are dominant because 400 exceeds 100 labour hours.',['machine hours are dominant because 400 exceeds 100 labour hours'])),
 S('b-ii',3,C(2,'Decorations OAR',50,'20000/400'),U(1,'OAR unit','The absorption rate is 50 per machine hour.',['absorption rate is 50 per machine hour'])),
 S('c-i',2,C(2,'Order overhead',1000,'20*50')),
 S('c-ii',4,N(1,'Order materials',450),N(1,'Order labour',1250),C(2,'Order production cost',2700,'450+1250+1000')),
 S('d',3,N(1,'Order mark-up',1350),C(2,'Order selling price',4050,'2700*1.5')),
 S('e',1,U(1,'Piece rate advantage','Piece rate encourages worker output because earnings rise with completed units.',['piece rate encourages worker output because earnings rise with completed units'])));
add(2023,'jan',3,
 S('a-i',10,N(1,'Purchases debit',178420),N(1,'Cash debit',20081),N(1,'Receivables debit',25750),N(1,'Utilities debit',10530),N(1,'Revenue credit',379900),N(1,'Payables credit',25331),N(1,'Capital credit',150700),N(1,'Discount received credit',1300),N(1,'Trial debit total',557641),N(1,'Trial credit total',557641)),
 S('a-ii',1,U(1,'Trial balance purpose','A trial balance checks equality of total ledger debits and credits.',['trial balance checks equality of total ledger debits and credits'])),
 S('b',6,U(1,'Principle error type','An error of principle can leave trial balance totals equal.',['error of principle can leave trial balance totals equal']),U(1,'Principle example','Debiting repairs for a new machine confuses capital with revenue expenditure.',['debiting repairs for a new machine confuses capital with revenue expenditure']),U(1,'Commission error type','An error of commission can leave trial balance totals equal.',['error of commission can leave trial balance totals equal']),U(1,'Commission example','Posting a receipt to the wrong customer leaves equal debit and credit totals.',['posting a receipt to the wrong customer leaves equal debit and credit totals']),U(1,'Reversal error type','Complete reversal can leave trial balance totals equal.',['complete reversal can leave trial balance totals equal']),U(1,'Reversal example','Debiting Sales and crediting the customer for a credit sale reverses both entries.',['debiting sales and crediting the customer for a credit sale reverses both entries'])),
 S('c-i',1,U(1,'Opening allowance meaning','The opening credit 1300 is an estimate for receivables that may be uncollectable.',['opening credit.{0,10}1300.{0,40}receivables that may be uncollectable'])),
 S('c-ii',1,U(1,'Allowance release effect','The allowance debit 200 releases expense and increases profit by 200.',['allowance debit.{0,10}200 releases expense and increases profit by.{0,10}200'])),
 S('c-iii',1,U(1,'Closing allowance meaning','The required allowance 1100 is brought down credit and deducted from receivables.',['required allowance.{0,10}1100 is brought down credit and deducted from receivables'])));
add(2023,'jan',4,
 S('a-i',10,N(1,'Timmy drawing interest',75),N(1,'Gerty drawing interest',168),N(1,'Profit available',157000),N(1,'Timmy capital interest',5400),N(1,'Gerty capital interest',3600),N(1,'Gerty salary',75000),C(2,'Residual profit',73000,'157000-5400-3600-75000'),N(1,'Timmy residual profit',43800),N(1,'Gerty residual profit',29200)),
 S('a-ii',7,N(1,'Gerty opening debit',5000),N(1,'Gerty capital interest credit',3600),N(1,'Gerty salary credit',75000),N(1,'Gerty profit share credit',29200),N(1,'Gerty drawings debit',5600),N(1,'Gerty drawing interest debit',168),N(1,'Gerty closing credit',97032)),
 S('b-i',2,U(1,'Salary agreement','The agreement can specify partner salaries.',['agreement can specify partner salaries']),U(1,'Interest agreement','The agreement can specify interest on capital.',['agreement can specify interest on capital'])),
 S('b-ii',1,U(1,'Partnership benefit','Combining partners capital provides more business finance.',['combining partners capital provides more business finance'])));
add(2023,'jan',5,
 S('a-i',2,C(2,'Dividends',8000,'400000*0.02')),
 S('a-ii',7,N(1,'Available surplus',120000),C(2,'Reserve appropriation',4500,'90000*0.05'),N(1,'Donation appropriation',20000),N(1,'Honorarium appropriation',10000),N(1,'Total appropriations',42500),N(1,'Closing undistributed surplus',77500)),
 S('b-i',5,N(1,'Equipment carrying amount',160000),N(1,'Long-term investments',90000),N(1,'Long-term member loans',50000),N(1,'Total non-current assets',300000),U(1,'Mortgage classification','Mortgage borrowing is a liability rather than an asset.',['mortgage borrowing is a liability rather than an asset'])),
 S('b-ii',3,N(1,'Payables and repayable deposits',160000),N(1,'Accrued telephone and interest',5000),N(1,'Current liabilities',165000)),
 S('c',3,N(1,'Share capital',400000),N(1,'Closing statutory reserve',44500),N(1,'Undistributed surplus',77500)));

add(2023,'mj',1,
 S('a-i',1,U(1,'Accounting software','QuickBooks is an accounting software program.',['QuickBooks is an accounting software program'])),
 S('a-ii',1,U(1,'Bookkeeper skill','A bookkeeper needs accuracy in recording transactions.',['bookkeeper needs accuracy in recording transactions'])),
 S('b-i',5,U(1,'April purchase entry','Debit Purchases and credit R True 400.',['debit purchases and credit R True.{0,10}400'],'entry'),U(1,'April sale entry','Debit U Moon and credit Sales 600.',['debit U Moon and credit Sales.{0,10}600'],'entry'),U(1,'April sales return entry','Debit Sales Returns and credit U Moon 50.',['debit sales returns and credit U Moon.{0,10}50'],'entry'),U(1,'Vic purchase entry','Debit Purchases and credit B Vic 2666.67.',['debit purchases and credit B Vic.{0,10}2666[.]67'],'entry'),U(1,'Son return entry','Debit L Son and credit Purchases Returns 96.',['debit L Son and credit purchases returns.{0,10}96'],'entry')),
 S('b-ii',1,U(1,'Supplier return document','The supplier issues a credit note for the return.',['supplier issues a credit note for the return'])),
 S('c-i',3,N(1,'Leila annual increase',1680),C(2,'Leila monthly gross',7140,'(84000+1680)/12')),
 S('c-ii',4,N(1,'Samson basic pay',1050),N(1,'Samson overtime hours',14),N(1,'Samson overtime pay',525),N(1,'Samson gross pay',1575)),
 S('c-iii',3,N(1,'Dolly commissionable sales',18000),N(1,'Dolly commission',360),N(1,'Dolly gross pay',3760)),
 S('c-iv',2,U(1,'Tax deduction','Income tax is a compulsory deduction.',['income tax is a compulsory deduction']),U(1,'NI deduction','National insurance is a compulsory deduction.',['national insurance is a compulsory deduction'])));
add(2023,'mj',2,
 S('a-i',1,U(1,'Opening cash meaning','Cash 450 debit is money in hand.',['cash.{0,10}450 debit is money in hand'])),
 S('a-ii',1,U(1,'Opening bank meaning','Bank 5600 credit means an overdraft owed to the bank.',['bank.{0,10}5600 credit means an overdraft owed to the bank'])),
 S('b-i',1,U(1,'Discount direction','The 1500 is discount received from O Maoris.',['1500 is discount received from O Maoris'])),
 S('b-ii',2,U(1,'Dishonour funds','The cheque may be dishonoured for insufficient funds.',['cheque may be dishonoured for insufficient funds']),U(1,'Dishonour signature','The cheque may be dishonoured for an invalid signature.',['cheque may be dishonoured for an invalid signature'])),
 S('b-iii',1,U(1,'Contra reason','Cash 14500 was deposited into bank, reducing cash and increasing bank.',['cash.{0,10}14500 was deposited into bank, reducing cash and increasing bank'])),
 S('c-i',2,C(2,'Booker discount percentage',2,'5000/(245000+5000)*100')),
 S('c-ii',1,U(1,'Refund explanation','The customer may have overpaid and is receiving a refund.',['customer may have overpaid and is receiving a refund'])),
 S('c-iii',2,C(2,'Yearly loan interest',7200,'60000*0.12')),
 S('c-iv',4,C(2,'Closing cash debit',1950,'450+16000-14500'),C(2,'Closing bank debit',287850,'339500-51650')),
 S('d-i',3,N(1,'Lima debit total',57600),N(1,'Lima credit receipts and discount',20250),N(1,'Lima closing debit',37350)),
 S('d-ii',2,N(1,'Discount allowed debit total',5250),U(1,'Discount allowed closure','Credit Discount Allowed and debit Income Statement 5250.',['credit discount allowed and debit income statement.{0,10}5250'],'entry')));
add(2023,'mj',3,
 S('a-i',2,U(1,'Direct material','Raw materials consumed is a direct production cost.',['raw materials consumed is a direct production cost']),U(1,'Direct wages','Direct factory wages is a direct production cost.',['direct factory wages is a direct production cost'])),
 S('a-ii',3,U(1,'Indirect wages','Indirect factory wages is an indirect production cost.',['indirect factory wages is an indirect production cost']),U(1,'Factory rates','Factory rates and insurance is an indirect production cost.',['factory rates and insurance is an indirect production cost']),U(1,'Factory general','Factory general expense is an indirect production cost.',['factory general expense is an indirect production cost'])),
 S('b-i',12,C(2,'Raw materials consumed',298000,'23000+306000+2000-33000'),N(1,'Direct wages',73800),N(1,'Royalties',17000),N(1,'Prime cost',388800),N(1,'Indirect wages',49200),N(1,'Factory rates and insurance',36000),N(1,'Factory general expense',10500),N(1,'Factory overheads',95700),N(1,'Factory cost before WIP',484500),C(2,'Completed production cost',469500,'484500+14000-29000')),
 S('b-ii',1,N(1,'Net sales',656900)),
 S('c-i',1,U(1,'Household premium concept','Separating household insurance applies business entity.',['separating household insurance applies business entity'])),
 S('c-ii',1,U(1,'Future order concept','Waiting until supply to recognize revenue applies realization.',['waiting until supply to recognize revenue applies realization'])));
add(2023,'mj',4,
 S('a-i',6,N(1,'Quarter one closing inventory',2000),C(2,'Quarter one production',6500,'6000+2000-1500'),N(1,'Quarter two closing inventory',3000),C(2,'Quarter two production',9000,'8000+3000-2000')),
 S('a-ii',2,C(2,'Component mark-up',30,'(65-50)/50*100')),
 S('b-i',4,U(1,'Error B asset effect','Error B understates non-current assets.',['error B understates non.current assets']),U(1,'Error B profit effect','Error B understates profit.',['error B understates profit']),U(1,'Error C asset effect','Error C overstates non-current assets.',['error C overstates non.current assets']),U(1,'Error C profit effect','Error C has no immediate profit effect before any depreciation adjustment.',['error C has no immediate profit effect before any depreciation adjustment'])),
 S('b-ii',2,U(1,'Cheque payment','The supplier may be paid by cheque.',['supplier may be paid by cheque']),U(1,'Transfer payment','The supplier may be paid by electronic bank transfer.',['supplier may be paid by electronic bank transfer'])),
 S('c-i',2,U(1,'Control check use','Control accounts check subsidiary ledger totals.',['control accounts check subsidiary ledger totals']),U(1,'Control error use','Control accounts help locate posting errors.',['control accounts help locate posting errors'])),
 S('c-ii',4,U(1,'Refund control debit','Debit Receivables Control for refunds 1400.',['debit receivables control for refunds.{0,10}1400'],'entry'),U(1,'Interest control debit','Debit Receivables Control for interest charged 2600.',['debit receivables control for interest charged.{0,10}2600'],'entry'),U(1,'Contra control credit','Credit Receivables Control for contra 550.',['credit receivables control for contra.{0,10}550'],'entry'),U(1,'Bad debt control credit','Credit Receivables Control for bad debts 700.',['credit receivables control for bad debts.{0,10}700'],'entry')));
add(2023,'mj',5,
 S('a',4,C(2,'Vehicle depreciation',30000,'(140000-20000)*0.25'),N(1,'Insurance prepayment profit increase',500),N(1,'Corrected surplus',46400)),
 S('b',3,N(1,'Surplus available',79800),N(1,'Reserve transfer',12000),N(1,'Closing undistributed surplus',67800)),
 S('c',13,N(1,'Building',220000),N(1,'Vehicle carrying amount',90000),N(1,'Investments',83400),N(1,'Non-current assets',393400),N(1,'Short-term member loans',301900),N(1,'Membership fees due',15000),N(1,'Insurance prepayment',500),N(1,'Bank',40400),N(1,'Current assets',357800),N(1,'Current liabilities',24400),N(1,'Working capital',333400),N(1,'Closing education reserve',102000),N(1,'Net assets and members funds',726800)));

add(2024,'jan',1,
 S('a-i',10,E('Utilities correction','Utilities Expense','Suspense',76),E('Purchases overcast correction','Suspense','Purchases',454),E('Customer reversal correction','Suspense','Maverlyn Adam',400),E('Drawings omission correction','Drawings','Suspense',1200),U(2,'Trial-balance omission distinction','Discount Allowed 60 is restored to the trial balance without duplicating the existing ledger expense.',['discount allowed.{0,10}60 is restored to the trial balance without duplicating the existing ledger expense'])),
 S('a-ii',5,U(1,'Utilities profit effect','Correcting Utilities reduces profit by 76.',['correcting utilities reduces profit by.{0,10}76']),U(1,'Purchases profit effect','Correcting Purchases increases profit by 454.',['correcting purchases increases profit by.{0,10}454']),U(1,'Omitted balance profit effect','The existing Discount Allowed ledger balance has no further profit effect.',['existing discount allowed ledger balance has no further profit effect']),U(1,'Customer and drawings profit effect','Customer correction and drawings correction have no profit effect.',['customer correction and drawings correction have no profit effect']),N(1,'Corrected profit',18178)),
 S('b-i',4,U(1,'Allowed source','Cash discount allowed comes from the Cash Book.',['cash discount allowed comes from the cash book']),U(1,'Allowed control side','Cash discount allowed credits Receivables Control.',['cash discount allowed credits receivables control']),U(1,'Contra source','Contra comes from the General Journal.',['contra comes from the general journal']),U(1,'Contra control side','Contra credits Receivables Control.',['contra credits receivables control'])),
 S('b-ii',1,U(1,'Receivable credit cause','A customer overpayment can produce a receivable credit balance.',['customer overpayment can produce a receivable credit balance'])));
add(2024,'jan',2,
 S('a',5,N(1,'Asset cost',514000),N(1,'Receivables',67000),N(1,'Net loss',29000),N(1,'Drawings',17000),N(1,'Current liabilities',80600)),
 S('b-i',2,C(2,'Working capital',20900,'101500-80600')),
 S('b-ii',2,C(2,'Current ratio',1.26,'101500/80600')),
 S('b-iii',3,U(1,'Quick assets basis','Exclude both inventory and supplies from readily convertible quick assets.',['exclude both inventory and supplies from readily convertible quick assets']),C(2,'Quick ratio',0.83,'67000/80600')),
 S('c-i',2,U(1,'Margin expense strategy','Reduce avoidable operating expenses to raise net profit margin.',['reduce avoidable operating expenses to raise net profit margin']),U(1,'Margin cost strategy','Negotiate lower purchase costs to raise net profit margin.',['negotiate lower purchase costs to raise net profit margin'])),
 S('c-ii',2,U(1,'Long-term finance strategy','Introduce long-term capital and repay current borrowing to improve the current ratio.',['introduce long.term capital and repay current borrowing to improve the current ratio']),U(1,'Current asset strategy','Use long-term finance to increase current assets and improve the current ratio.',['use long.term finance to increase current assets and improve the current ratio'])),
 S('d-i',2,U(1,'Venture recommendation','Recommend a nail service in the mall.',['recommend a nail service in the mall']),U(1,'Venture reason','The nail service complements beauty products for the same customers.',['nail service complements beauty products for the same customers'])),
 S('d-ii',2,U(1,'Marketing plan','Include a marketing plan.',['include a marketing plan']),U(1,'Financial forecast','Include financial forecasts.',['include financial forecasts'])));
add(2024,'jan',3,
 S('a',8,N(1,'Donations received',5500),N(1,'Equipment sale receipt',6700),N(1,'Snack bar receipt',7430),N(1,'Subscriptions received',6800),N(1,'Total receipts',26430),N(1,'Opening overdraft and payments',25280),N(1,'Closing bank debit',1150),U(1,'Receipts balance carried down','Bring down 1150 debit on 1 January 2024.',['bring down.{0,10}1150 debit on 1 January 2024'],'presentation')),
 S('b-i',8,C(2,'Original cash-book debit',11770,'8950+1500+5400+3670-200-900-2250-4400'),N(1,'Opening balance correction credit',100),N(1,'Dishonoured cheque credit',1500),N(1,'Bank charges credit',120),N(1,'Water standing order credit',370),N(1,'Donation bank debit',1000),N(1,'Updated cash-book debit',10680)),
 S('b-ii',4,U(1,'Electricity bank error','Add the bank electricity error 540 to the statement balance.',['add the bank electricity error.{0,10}540.{0,30}statement balance']),U(1,'Plumes deposit','Add Ajani Plumes deposit 5400 to the statement balance.',['add Ajani Plumes deposit.{0,10}5400.{0,30}statement balance']),U(1,'Sales deposit','Add sales deposit 3670 to the statement balance.',['add sales deposit.{0,10}3670.{0,30}statement balance']),U(1,'Wholesale cheque','Deduct unpresented AP Wholesale cheque 4400 from the statement balance.',['deduct unpresented AP Wholesale cheque.{0,10}4400.{0,30}statement balance'])));
add(2024,'jan',4,
 S('a-i',3,U(1,'Limited shareholder risk','Shareholders have limited liability.',['shareholders have limited liability']),U(1,'Separate company identity','The company has separate legal identity.',['company has separate legal identity']),U(1,'Private share ownership','Shares are privately held and cannot be offered to the public.',['shares are privately held and cannot be offered to the public'])),
 S('a-ii',4,N(1,'Acquisition legal fees',10500),N(1,'Pipeline improvement',5600),N(1,'Extension labour',16000),N(1,'Capitalized premises',151300)),
 S('a-iii',4,N(1,'Debt recovery expense',300),N(1,'Completed routine redecoration',5500),N(1,'December insurance',1075),N(1,'Total December expense',6875)),
 S('b-i',1,N(1,'2022 depreciation',74400)),
 S('b-ii',2,C(2,'2023 depreciation',44640,'(186000-74400)*0.4')),
 S('c-i',4,N(1,'Machinery cost',186000),N(1,'Accumulated depreciation',119040),N(1,'Machinery carrying amount',66960),U(1,'Asset extract headings','Present cost, accumulated depreciation and net book value in separate columns.',['cost, accumulated depreciation and net book value in separate columns'],'presentation')),
 S('c-ii',2,U(1,'Wear cause','Use causes wear and tear.',['use causes wear and tear']),U(1,'Obsolescence cause','Improved technology causes obsolescence.',['improved technology causes obsolescence'])));
add(2024,'jan',5,
 S('a-i',7,C(2,'Shine net credit sale',2000,'2500*0.8'),N(1,'Shine bank receipt credit',1700),N(1,'Shine bad debt credit',300),N(1,'Shine account total',2000),U(1,'Shine settled balance','Shine account closes with no balance outstanding.',['Shine account closes with no balance outstanding']),U(1,'Shine posting dates','Date Sales 12 March, Bank 26 August and Bad Debts 31 December.',['date sales 12 March, bank 26 August and bad debts 31 December'],'presentation')),
 S('a-ii',2,U(1,'Bad debt expense posting','Debit Bad Debts with Shine Roberts 300.',['debit bad debts with Shine Roberts.{0,10}300'],'entry'),U(1,'Bad debt transfer','Credit Bad Debts with Income Statement 300.',['credit bad debts with income statement.{0,10}300'],'entry')),
 S('a-iii',5,N(1,'Closing receivables',64000),N(1,'Required allowance',1280),N(1,'Allowance decrease',1020),U(1,'Allowance release entry','Debit Allowance and credit Income Statement 1020.',['debit allowance and credit income statement.{0,10}1020'],'entry'),U(1,'Allowance brought down','Bring down Allowance 1280 credit.',['bring down allowance.{0,10}1280 credit'],'presentation')),
 S('b',3,U(1,'Accuracy quality','A bookkeeper should record transactions accurately.',['bookkeeper should record transactions accurately']),U(1,'Integrity quality','A bookkeeper should be honest and act with integrity.',['bookkeeper should be honest and act with integrity']),U(1,'Confidentiality quality','A bookkeeper should protect confidential financial information.',['bookkeeper should protect confidential financial information'])),
 S('c',3,U(1,'Entity code','Business Entity corresponds to C.',['business entity corresponds to C']),U(1,'Cost code','Historical Cost corresponds to B.',['historical cost corresponds to B']),U(1,'Prudence code','Prudence corresponds to A.',['prudence corresponds to A'])));

add(2024,'mj',1,
 S('a',15,N(1,'Opening cash debit',1475),N(1,'Opening bank credit',1125),N(1,'First bank sales receipt',2635),N(1,'Second bank sales receipt',1125),N(1,'Owner loan receipt',3000),N(1,'Smith bank payment',798),N(1,'Peters bank payment',874),N(1,'Discount received total',88),N(1,'French cash receipt',1900),N(1,'French discount allowed',100),U(1,'Deposit contra','Debit Bank and credit Cash 800.',['debit bank and credit cash.{0,10}800'],'entry'),N(1,'Rent cash payment',1540),N(1,'Closing cash debit',1035),N(1,'Closing bank debit',4763),U(1,'Loan classification','The repayable owner advance is a loan rather than sales or permanent capital.',['repayable owner advance is a loan rather than sales or permanent capital'])),
 S('b',5,N(1,'December statement favourable balance',9275),U(1,'December deposit sign','Add the uncredited deposit 2270.',['add the uncredited deposit.{0,10}2270']),N(1,'Unpresented cheques total',2053),U(1,'December cheque sign','Deduct the unpresented cheques from the favourable statement balance.',['deduct the unpresented cheques from the favourable statement balance']),N(1,'December cash-book debit',9492)));
add(2024,'mj',2,
 S('a-i',1,U(1,'Limited liability advantage','Shareholders normally risk only their investment.',['shareholders normally risk only their investment'])),
 S('a-ii',1,U(1,'Compliance disadvantage','Incorporation and financial reporting impose legal costs.',['incorporation and financial reporting impose legal costs'])),
 S('b',8,E('Ordinary share issue','Bank','Ordinary Share Capital',180000),E('Preference share issue','Bank','Preference Share Capital',400000),E('Debenture issue','Bank','Debentures',150000),U(1,'Share issue narratives','Narrations identify 180000 ordinary shares at 1 and 100000 preference shares at 4 issued at par.',['narrations identify 180000 ordinary shares at 1 and 100000 preference shares at 4 issued at par'],'presentation'),U(1,'Debenture narrative','Narration identifies 5 percent debentures repayable in 2025.',['narration identifies 5 percent debentures repayable in 2025'],'presentation')),
 S('c',1,U(1,'Liquidity ratio','The current ratio measures liquidity.',['current ratio measures liquidity'])),
 S('d',2,C(2,'Annual preference dividend',32000,'100000*4*0.08')),
 S('e',2,C(2,'Annual debenture interest',7500,'150000*0.05')),
 S('f-i',3,N(1,'Profit after interest',41000),C(2,'Ordinary profit available',9000,'48500-7500-32000')),
 S('f-ii',2,C(2,'Ordinary return percentage',5,'9000/180000*100')));
add(2024,'mj',3,
 S('a',9,N(1,'Corrected gross profit',287500),C(2,'Depreciation',96000,'(695000-215000)*0.2'),C(2,'Partner loan interest',2000,'25000*0.08'),N(1,'Operating expenses',107000),C(2,'Net profit',82500,'287500-96000-2000-107000'),U(1,'Loan interest classification','Partner loan interest is a business expense before appropriation.',['partner loan interest is a business expense before appropriation'])),
 S('b',6,N(1,'Drawing interest total',5900),N(1,'Profit available',88400),N(1,'Capital interest total',16200),N(1,'Jay salary',36000),N(1,'Ban residual profit',21720),N(1,'Jay residual profit',14480)),
 S('c',5,N(1,'Jay opening credit',7300),N(1,'Jay credit total',65580),N(1,'Jay drawings',26000),N(1,'Jay drawing interest',2700),N(1,'Jay closing current credit',36880)));
add(2024,'mj',4,
 S('a',7,N(1,'Quarter one opening inventory',255),N(1,'Quarter one closing inventory',315),N(1,'Quarter two closing inventory',338),N(1,'Quarter three closing inventory',444),N(1,'Quarter one production',5160),N(1,'Quarter two production',6323),N(1,'Quarter three production',6866)),
 S('b',3,C(3,'Required sales units',5625,'45000/8')),
 S('c-i',4,N(1,'Basic pay',8000),N(1,'Overtime hours',4),N(1,'Overtime pay',1200),N(1,'Weekly gross pay',9200)),
 S('c-ii',3,N(1,'National insurance',1660),N(1,'Income tax',3320),N(1,'Monthly net pay',27920)),
 S('c-iii',3,U(1,'Cheque date and payee','Cheque dated 30 April 2023 payable to Salina Smith.',['cheque dated 30 April 2023 payable to Salina Smith'],'presentation'),N(1,'Cheque amount',27920),U(1,'Cheque words and signature','Twenty-seven thousand nine hundred and twenty dollars only; authorized drawer signature.',['twenty.seven thousand nine hundred and twenty dollars only.{0,30}authorized drawer signature'],'presentation')));
add(2024,'mj',5,
 S('main',20,E('Opening capital','Bank','Capital',75000),E('Cash withdrawal','Cash','Bank',4000),E('Bank sale','Bank','Sales',55000),E('Vehicle purchase','Delivery Van and Spare Parts','Bank',24800),E('Credit purchase','Purchases','Rob Smith',17000),E('Credit sale','S Peters','Sales',9000),N(1,'Smith discount received',850),N(1,'Smith cheque payment',16150),N(1,'Peters bank receipt',9000),N(1,'Personal insurance drawings',2500),N(1,'Closing bank debit',88550),N(1,'Closing cash debit',3600),N(1,'Vehicle and spare parts carrying amount',23800),N(1,'Disposal profit',200)));

add(2025,'jan',1,
 S('main',20,C(2,'Net credit purchases',4500,'6000*0.75'),N(1,'Returns outwards',1350),C(2,'Net credit sales',3060,'3600*0.85'),N(1,'Returns inwards',391),E('Shop fixtures purchase','Shop Fixtures','Display House',4790),E('Shop fixtures return','Display House','Shop Fixtures',1200),N(1,'Cash sales',13954),N(1,'Advertising cash payment',2600),U(2,'Bank deposit contra','Debit Bank and credit Cash 10000 for the deposit.',['debit bank and credit cash.{0,10}10000 for the deposit'],'entry'),N(1,'Supplier discount received',63),N(1,'Supplier bank payment',3087),N(1,'Customer discount allowed',175),N(1,'Customer bank receipt',2494),N(1,'Closing cash debit',1354),N(1,'Closing bank debit',9407)));
add(2025,'jan',2,
 S('a',5,U(1,'Fixed-rate definition','Fixed-rate pay is an agreed amount for a period.',['fixed.rate pay is an agreed amount for a period']),U(1,'Hourly definition','Hourly pay equals hours worked times hourly rate.',['hourly pay equals hours worked times hourly rate']),U(1,'Piece definition','Piece pay equals completed units times rate per unit.',['piece pay equals completed units times rate per unit']),U(1,'Commission definition','Commission pay is linked to sales, usually as a percentage.',['commission pay is linked to sales.{0,30}percentage']),U(1,'Bonus definition','A bonus is extra pay for performance or an agreed target.',['bonus is extra pay for performance or an agreed target'])),
 S('b',6,U(1,'Sales debit account','Sales journal totals debit customer receivables.',['sales journal totals debit customer receivables'],'entry'),U(1,'Customer ledger','Customer receivables belong in the Sales Ledger.',['customer receivables belong in the sales ledger']),U(1,'Sales credit ledger','Credit Sales in the General Ledger.',['credit sales in the general ledger'],'entry'),U(1,'Returns debit account','Returns outwards totals debit supplier payables.',['returns outwards totals debit supplier payables'],'entry'),U(1,'Supplier ledger','Supplier payables belong in the Purchases Ledger.',['supplier payables belong in the purchases ledger']),U(1,'Returns credit ledger','Credit Returns Outwards in the General Ledger.',['credit returns outwards in the general ledger'],'entry')),
 S('c',4,U(1,'Going concern matching','Useful-life depreciation is Going Concern, code D.',['useful.life depreciation is going concern, code D']),U(1,'Objectivity matching','Verifiable records are Objectivity, code C.',['verifiable records are objectivity, code C']),U(1,'Accrual matching','Cash received in advance is not earned sales under Accruals, code E.',['cash received in advance is not earned sales under accruals, code E']),U(1,'Fair view matching','Accurate reports correspond to True and Fair View, code B.',['accurate reports correspond to true and fair view, code B'])),
 S('d',4,U(1,'Collection credit control','Stronger credit control can reduce collection days.',['stronger credit control can reduce collection days']),U(1,'Collection incentive','Prompt-payment incentives can reduce collection days.',['prompt.payment incentives can reduce collection days']),U(1,'Payment terms','Negotiated longer supplier credit can increase payment days.',['negotiated longer supplier credit can increase payment days']),U(1,'Payment shortage','Cash shortages can delay supplier payment and increase payment days.',['cash shortages can delay supplier payment and increase payment days'])),
 S('e',1,U(1,'Working capital consequence','Insufficient working capital can prevent timely supplier payment and interrupt supplies.',['insufficient working capital can prevent timely supplier payment and interrupt supplies'])));
add(2025,'jan',3,
 S('a',1,U(1,'Depreciation definition','Depreciation allocates an asset depreciable cost over its useful life.',['depreciation allocates an asset depreciable cost over its useful life'])),
 S('b',5,C(2,'Annual straight-line depreciation',8000,'(50000-10000)/5'),N(1,'2023 reducing-balance depreciation',12500),C(2,'2024 reducing-balance depreciation',9375,'(50000-12500)*0.25')),
 S('c',7,N(1,'Materials consumed',130000),N(1,'Direct labour',197500),N(1,'Prime cost',327500),N(1,'Factory overheads',141250),N(1,'Opening WIP',20000),N(1,'Closing WIP',18750),N(1,'Production cost',470000)),
 S('d',2,C(2,'Unit production cost',20.89,'470000/22500')),
 S('e',2,C(2,'Unit selling price',33.42,'470000/22500*1.6')),
 S('f',3,N(1,'Sales revenue',752000),C(2,'Operating expenses',150400,'752000*0.2')));
add(2025,'jan',4,
 S('a-i',1,U(1,'Alternative valuation method','FIFO is an alternative inventory valuation method.',['FIFO is an alternative inventory valuation method'])),
 S('a-ii',1,U(1,'FIFO explanation','FIFO issues the oldest cost layers first.',['FIFO issues the oldest cost layers first'])),
 S('b',8,N(1,'Opening inventory units',502),N(1,'Opening inventory value',100400),N(1,'First weighted average',206),N(1,'Second weighted average',219),N(1,'Third weighted average',238),N(1,'Final inventory units',13),N(1,'Closing inventory value',3094),U(1,'AVCO rounding policy','Use moving weighted averages rounded to whole dollars after each purchase.',['moving weighted averages rounded to whole dollars after each purchase'])),
 S('c',2,C(2,'December purchases',123625,'125*230+175*245+200*260')),
 S('d',2,C(2,'December sales revenue',642850,'(257+322+410)*650')),
 S('e',6,N(1,'Opening stock value',100400),N(1,'Purchase costs',123625),N(1,'Closing stock value',3094),N(1,'Cost of sales',220931),N(1,'Sales revenue',642850),N(1,'Gross income',421919)));
add(2025,'jan',5,
 S('a',6,N(1,'Opening suspense debit',368),U(1,'Purchases suspense credit','Credit Suspense 18 for undercast Purchases.',['credit suspense.{0,10}18 for undercast purchases'],'entry'),U(1,'Petty cash suspense credit','Credit Suspense 200 for the omitted trial-balance petty cash debit.',['credit suspense.{0,10}200 for the omitted trial.balance petty cash debit'],'entry'),U(1,'Stationery suspense credit','Credit Suspense 150 for omitted Stationery.',['credit suspense.{0,10}150 for omitted stationery'],'entry'),N(1,'Suspense credit total',368),U(1,'Suspense closure','Suspense closes with zero balance.',['suspense closes with zero balance'])),
 S('b',8,E('Customer correction','DDE Ltd','DEC Ltd',1500),E('Repair capitalization correction','Repairs','Motor Vehicles',293),E('Reversed fixtures correction','Fixtures','TS Supplies',6000),U(1,'Customer correction narrative','Transfer the receipt from the wrong customer to the correct customer.',['transfer the receipt from the wrong customer to the correct customer'],'presentation'),U(1,'Capital correction narratives','Remove repairs from vehicle cost and reverse then correctly record the fixtures purchase.',['remove repairs from vehicle cost and reverse then correctly record the fixtures purchase'],'presentation')),
 S('c',6,N(1,'Original net profit',13000),N(1,'Additional purchases expense',18),N(1,'Repairs expense',293),N(1,'Stationery expense',150),N(1,'Revised profit',12539),U(1,'Non-profit errors','Wrong customer, trial-balance petty cash omission and reversed asset-creditor entry have no profit effect.',['wrong customer, trial.balance petty cash omission and reversed asset.creditor entry have no profit effect'])));

add(2025,'mj',1,
 S('a',2,U(1,'First statement balances','After invoice the balance is 860 and after credit note it is 836.',['after invoice the balance is.{0,10}860 and after credit note it is.{0,10}836']),U(1,'Final statement balances','After cheque the balance is 173 and after discount it is 156.',['after cheque the balance is.{0,10}173 and after discount it is.{0,10}156'])),
 S('b-i',10,N(1,'Opening bank overdraft',8150),N(1,'Dishonoured cheque payment',462),N(1,'Private fuel drawings',64),N(1,'Mores discount allowed',17),N(1,'Mores bank receipt',663),N(1,'Equipment and repairs payment',4000),N(1,'Cash sales',4224),N(1,'Cash banked contra',3824),N(1,'Closing cash debit',500),N(1,'Closing bank overdraft',8189)),
 S('b-ii',1,U(1,'Closing overdraft meaning','Beharry owes the bank 8189.',['Beharry owes the bank.{0,10}8189'])),
 S('c',2,U(1,'Electronic transfer','Use an online bank transfer.',['use an online bank transfer']),U(1,'Electronic card','Use a debit-card payment.',['use a debit.card payment'])),
 S('d',5,N(1,'Mores opening debit',520),N(1,'Mores sales debit',340),N(1,'Mores sales return credit',24),U(1,'Mores settlement','Credit Bank 663 and Discount Allowed 17 in Mores account.',['credit bank.{0,10}663 and discount allowed.{0,10}17 in Mores account'],'entry'),N(1,'Mores closing debit',156)));
add(2025,'mj',2,
 S('a',11,N(1,'Gross profit',108700),N(1,'Rent income',1500),N(1,'Auditor expense',8600),N(1,'Wages expense',18100),N(1,'Vehicle depreciation',6000),N(1,'Annual debenture interest',4000),N(1,'Operating expense',2900),N(1,'Director remuneration',45000),N(1,'Total expenses',84600),N(1,'Profit',25600),U(1,'Printed units','All statement figures remain in thousands of dollars.',['all statement figures remain in thousands of dollars'],'presentation')),
 S('b',9,N(1,'Opening retained earnings',13500),N(1,'Current profit',25600),N(1,'Profit available',39100),N(1,'Preference annual dividend',800),N(1,'Preference final dividend',300),N(1,'Ordinary total dividend',5000),N(1,'Reserve transfer',7000),N(1,'Closing retained earnings',26300),N(1,'Closing general reserve',22000)));
add(2025,'mj',3,
 S('main',20,N(1,'Premises',175000),N(1,'Vehicle cost',50000),N(1,'Vehicle accumulated depreciation',26000),N(1,'Vehicle carrying amount',24000),N(1,'Non-current assets',199000),N(1,'Receivables',18600),N(1,'Bank',3100),N(1,'Prepaid wages',2000),N(1,'Current assets',23700),N(1,'Payables',20800),N(1,'Accrued audit',5000),N(1,'Accrued interest',3800),U(1,'Debenture current convention','Treat the 2025 debentures as due within twelve months and current at 31 December 2024.',['2025 debentures as due within twelve months and current at 31 December 2024']),N(1,'Current debentures',40000),U(1,'Dividend recognition convention','Recognize proposed final dividends as liabilities for this practice statement.',['recognize proposed final dividends as liabilities for this practice statement']),N(1,'Final dividend liabilities',3300),N(1,'Current liabilities',72900),N(1,'Working capital',-49200),N(1,'Net assets',149800),U(1,'Extract completeness policy','Use only supplied extract balances and retain the printed thousand-dollar units.',['only supplied extract balances.{0,50}printed thousand.dollar units'])));
add(2025,'mj',4,
 S('a',3,N(1,'Five-year rate sum',15),C(2,'Average annual rate',3,'15/5')),
 S('b',4,U(1,'Simple interest basis','Each annual interest amount uses the original 65000 deposit without compounding.',['each annual interest amount uses the original.{0,10}65000 deposit without compounding']),C(3,'Total interest',9750,'65000*(0.025+0.0275+0.03+0.0325+0.035)')),
 S('c',3,C(3,'Maturity payout',74750,'65000+9750')),
 S('d',4,C(3,'Five-year ROI',15,'9750/65000*100'),U(1,'ROI period','The calculated ROI covers all five years.',['calculated ROI covers all five years'])),
 S('e',2,U(1,'ROI interest meaning','Each 100 originally invested earns 15 interest over five years.',['each 100 originally invested earns 15 interest over five years']),U(1,'ROI principal meaning','The original principal is also returned at maturity.',['original principal is also returned at maturity'])),
 S('f',2,U(1,'Comparable annual returns','Average annual return 3 percent exceeds industry annual return 2 percent.',['average annual return 3 percent exceeds industry annual return 2 percent']),U(1,'Investment decision','With other factors equal the higher annual return supports the investment decision.',['other factors equal.{0,35}higher annual return supports the investment decision'])),
 S('g',2,C(2,'Year five total cash inflow',210750,'80000+56000+74750')));
add(2025,'mj',5,
 S('a',3,U(1,'Donation funding','The club may receive donations.',['club may receive donations']),U(1,'Event funding','The club may raise funds from fundraising events.',['club may raise funds from fundraising events']),U(1,'Bar funding','The club may earn refreshment-bar proceeds.',['club may earn refreshment.bar proceeds'])),
 S('b',5,U(1,'Paper expense','Ink and paper are revenue expenditure.',['ink and paper are revenue expenditure']),U(1,'Software cost','New customized software is capital expenditure.',['new customized software is capital expenditure']),U(1,'Software installation','Directly attributable software installation is capital expenditure.',['directly attributable software installation is capital expenditure']),U(1,'Salaries expense','Salaries are revenue expenditure.',['salaries are revenue expenditure']),U(1,'Ground maintenance','Routine grounds maintenance is revenue expenditure.',['routine grounds maintenance is revenue expenditure'])),
 S('c',8,N(1,'Bar receipts',210000),N(1,'Subscription receipts',60200),N(1,'Competition receipts',80000),N(1,'Donations received',20000),N(1,'Total receipts',370200),N(1,'Total payments',381000),N(1,'Closing overdraft',13400),U(1,'Overdraft ruling','Balance carried down is debit and brought down credit on 1 May 2025.',['balance carried down is debit and brought down credit on 1 May 2025'],'presentation')),
 S('d',4,U(1,'Unpresented cheque overdraft','Add unpresented software cheque 2759 to the bank statement overdraft.',['add unpresented software cheque.{0,10}2759 to the bank statement overdraft']),U(1,'Dishonour overdraft','Add dishonoured cheque 4000 to the receipts and payments overdraft.',['add dishonoured cheque.{0,10}4000 to the receipts and payments overdraft']),U(1,'Supplier correction overdraft','Add supplier payment correction 198 to the receipts and payments overdraft.',['add supplier payment correction.{0,10}198 to the receipts and payments overdraft']),U(1,'Direct subscription overdraft','Subtract direct subscriptions 11339 from the receipts and payments overdraft.',['subtract direct subscriptions.{0,10}11339 from the receipts and payments overdraft'])));

add(2026,'jan',1,
 S('a',3,U(1,'Voucher identity','Smart Kitchen Appliances Petty Cash Voucher 21 dated 8 March 2025.',['Smart Kitchen Appliances Petty Cash Voucher 21 dated 8 March 2025'],'presentation'),U(1,'Voucher transaction','Paid Chemical Company Ltd 55 for disinfectant and bleach.',['paid Chemical Company Ltd.{0,10}55 for disinfectant and bleach'],'presentation'),U(1,'Voucher authorization','Provide authorization and recipient signature spaces.',['authorization and recipient signature spaces'],'presentation')),
 S('b-i',2,C(2,'Samosa unit cost',1.5,'54/(3*12)')),
 S('b-ii',1,U(1,'Invoice cash discount','The recorded reduction is cash discount received.',['recorded reduction is cash discount received'])),
 S('b-iii',1,U(1,'Cash discount reason','The discount may reward prompt payment.',['discount may reward prompt payment'])),
 S('c-i',1,U(1,'Snack payment','Record 100 in Total and Snacks on 28 March.',['record.{0,10}100 in total and snacks on 28 March'],'entry')),
 S('c-ii',2,N(1,'Petty cash remaining',10),U(1,'Petty cash brought down','Bring down 10 as a receipt on 1 April 2025.',['bring down.{0,10}10 as a receipt on 1 April 2025'],'presentation')),
 S('c-iii',2,N(1,'Reimbursement',490),U(1,'Imprest restoration','The reimbursement restores the imprest to 500.',['reimbursement restores the imprest to.{0,10}500'])),
 S('d',3,N(1,'Bundle cost',5.5),C(2,'Bundle mark-up percentage',36.36,'(7.5-5.5)/5.5*100')),
 S('e',5,U(1,'Cleaning debit','Debit Cleaning 55.',['debit cleaning.{0,10}55'],'entry'),U(1,'Snacks debit','Debit Snacks 100.',['debit snacks.{0,10}100'],'entry'),U(1,'Stationery debit','Debit Stationery 130.',['debit stationery.{0,10}130'],'entry'),U(1,'Supplies debit','Debit Supplies 205.',['debit supplies.{0,10}205'],'entry'),U(1,'Bank reimbursement credit','Credit Bank 490.',['credit bank.{0,10}490'],'entry')));
add(2026,'jan',2,
 S('a',10,C(2,'Subscription cash receipts',15075,'98*150+5*75'),N(1,'Opening available cash',3300),N(1,'Social ticket receipts',3000),N(1,'Raffle receipts',2800),N(1,'Bar receipts',19300),N(1,'Total receipts',40175),N(1,'Total payments',18100),N(1,'Closing available cash',25375),U(1,'Cash balance date','Bring down available cash on 1 January 2025.',['bring down available cash on 1 January 2025'],'presentation')),
 S('b',6,N(1,'Original available cash',25375),N(1,'Dishonoured cheque deduction',150),N(1,'Insurance deduction',2500),N(1,'Bank charges deduction',460),N(1,'Direct subscriptions added',300),N(1,'Updated available cash',22565)),
 S('c',4,N(1,'Updated cash-book balance',22565),U(1,'Uncredited deposit deduction','Deduct the uncredited deposit 8000.',['deduct the uncredited deposit.{0,10}8000']),U(1,'Unpresented cheque addition','Add unpresented cheques 450 and 300.',['add unpresented cheques.{0,10}450 and 300']),N(1,'Favourable bank statement',15315)));
add(2026,'jan',3,
 S('a',2,U(1,'Time evidence','A time card documents authorized hours worked.',['time card documents authorized hours worked']),U(1,'Rate evidence','An employee wage-rate record documents authorized pay rates.',['employee wage.rate record documents authorized pay rates'])),
 S('b',1,U(1,'Payroll program','Sage Payroll can prepare payroll.',['Sage Payroll can prepare payroll'])),
 S('c-i',6,C(2,'Basic weekly pay',3200,'40*80'),N(1,'Overtime hours',20),N(1,'Overtime rate',120),N(1,'Overtime pay',2400),N(1,'Gross weekly pay',5600)),
 S('c-ii',5,N(1,'Pension contribution',280),N(1,'Personal tax allowance',1000),N(1,'National insurance',150),N(1,'Taxable weekly pay',4170),N(1,'Income tax',417)),
 S('c-iii',4,N(1,'Actual deductions',847),C(2,'Net weekly pay',4753,'5600-280-150-417'),U(1,'Allowance distinction','The personal allowance reduces taxable pay rather than cash take-home pay.',['personal allowance reduces taxable pay rather than cash take.home pay'])),
 S('d',2,U(1,'Statutory requirement','Statutory deductions are required by law.',['statutory deductions are required by law']),U(1,'Voluntary authorization','Non-statutory deductions are voluntary or separately authorized.',['non.statutory deductions are voluntary or separately authorized'])));
add(2026,'jan',4,
 S('a',1,U(1,'Accountant duty','An accountant prepares and interprets financial statements.',['accountant prepares and interprets financial statements'])),
 S('b-i',1,U(1,'Internal user','A branch manager is an internal user.',['branch manager is an internal user'])),
 S('b-ii',1,U(1,'External user','A bank lender is an external user.',['bank lender is an external user'])),
 S('b-iii',1,U(1,'Lender interest','The bank assesses loan repayment ability.',['bank assesses loan repayment ability'])),
 S('c',4,U(1,'Equipment installation statement','Equipment installation costs appear in financial position as asset cost.',['equipment installation costs appear in financial position as asset cost']),U(1,'Repairs statement','Routine vehicle repairs appear in the income statement as expense.',['routine vehicle repairs appear in the income statement as expense']),U(1,'Property legal statement','Property acquisition legal fees appear in financial position as asset cost.',['property acquisition legal fees appear in financial position as asset cost']),U(1,'Rent statement','Rent expense appears in the income statement.',['rent expense appears in the income statement'])),
 S('d-i',7,N(1,'Non-current assets',140000),N(1,'Current assets',145000),N(1,'Current liabilities',35000),N(1,'Working capital',110000),N(1,'Net assets',250000),N(1,'Jennie capital',150000),N(1,'Lance capital',100000)),
 S('d-ii',5,U(1,'Capital ratio','The invested capital ratio Jennie to Lance is 3 to 2.',['invested capital ratio Jennie to Lance is 3 to 2']),C(2,'Jennie profit share',37200,'62000*3/5'),C(2,'Jennie return percentage',24.8,'37200/150000*100')));
add(2026,'jan',5,
 S('a',5,U(1,'Member-customer control','Row i describes a cooperative owned by its member-customers.',['row i describes a cooperative owned by its member.customers']),U(1,'Share voting and equal voting','Row ii selects company share voting; row iv selects cooperative equal voting.',['row ii selects company share voting.{0,30}row iv selects cooperative equal voting']),U(1,'Limited-liability membership','Row iii selects a limited company and a limited-liability cooperative under this SPARK convention.',['row iii selects a limited company and a limited.liability cooperative under this SPARK convention']),U(1,'Shared aims and reserve','Row v selects nonprofit and cooperative shared aims; row vii selects cooperative statutory reserve.',['row v selects nonprofit and cooperative shared aims.{0,30}row vii selects cooperative statutory reserve']),U(1,'Unlisted ownership and managers','Row vi selects private company, cooperative and nonprofit unlisted ownership; row viii allows company and nonprofit managers who are not owners.',['row vi selects private company, cooperative and nonprofit unlisted ownership.{0,30}row viii allows company and nonprofit managers who are not owners'])),
 S('b-i',10,N(1,'Membership income',600000),N(1,'Interest income',21000),N(1,'Total income',621000),N(1,'Vehicle running cost',100000),N(1,'Office expense',110000),N(1,'Equipment depreciation',30000),N(1,'Vehicle depreciation',42400),N(1,'Other operating expenses',98000),N(1,'Total expenses',380400),N(1,'Annual surplus',240600)),
 S('b-ii',5,N(1,'Total available surplus',360600),N(1,'Current-surplus reserve transfer',48120),N(1,'Dividend appropriation',18000),N(1,'Honorarium appropriation',15000),N(1,'Closing undistributed surplus',279480)));

export const POA_HISTORICAL_METHODS_LATE = rows;
export const POA_HISTORICAL_METHODS_LATE_VERSION = VERSION;
// Explicit source interpretations. A declaration selects every affected figure in
// a branch together. This preserves coherent alternatives without mixing bases.
const findQ=(year,sitting,number)=>rows.find(q=>q.paperId===P(year,sitting)&&q.questionNumber===number);
const pointByLabel=(q,label)=>q.sections.flatMap(s=>s.points).find(p=>p.label===label);
const declare=(q,id,description,when)=>{q.sourceAssumptions=[...(q.sourceAssumptions||[]),{id,description,when}];q.sourceNotes.push(description);};
const alternativeNumber=(q,label,value,when,branch)=>{const p=pointByLabel(q,label);if(!p)throw new Error(`Missing alternative ${q.paperId}:${label}`);p.numberAlternatives=[...(p.numberAlternatives||[]),{value,tolerance:0.005,when,branch}];p.match.all=[numericClaim(label)];};
const alternativeMatch=(q,label,pattern,proof)=>{const p=pointByLabel(q,label);if(!p)throw new Error(`Missing alternative match ${q.paperId}:${label}`);p.match.all=[`(?:${p.match.all.join(')(?:')}|${pattern})`];p.alternativeProof=proof;};
const alternativeMethod=(q,label,expression)=>{const p=pointByLabel(q,`${label} method`);if(!p)return;p.expressions.push(expression);p.match.all=[`${cue(label)}.{0,30}(?:${p.expressions.map(phrase).join('|')})`];};
const bindOwnFigure=(year,sitting,questionNumber,label,fromLabel,expression)=>{const q=findQ(year,sitting,questionNumber),p=pointByLabel(q,`${label} method`);if(!p)throw new Error(`Missing method ${label}`);p.ownFigure={fromLabel,fromPattern:`(?:^|[\\n;]|[.](?=\\s*[A-Za-z]))\\s*${cue(fromLabel)}\\s*(?:is|=|:)\\s*[$]?\\s*(?<value>-?\\d+(?:[.]\\d+)?)`,expression,answerPattern:`(?:^|[\\n;]|[.](?=\\s*[A-Za-z]))\\s*${cue(label)}\\s*(?:is|=|:)\\s*[$]?\\s*(?<value>-?\\d+(?:[.]\\d+)?)`};};
{
 const q=findQ(2016,'mj',7),when=['use the single.band method on income above the 2500 allowance'];
 declare(q,'single-band-tax','A declared single-band interpretation applies Sharpe gross-income band rate to all income above the allowance.',when);
 alternativeNumber(q,'Sharpe tax',1650,when,'single-band-tax');alternativeNumber(q,'Sharpe after-tax pay',6350,when,'single-band-tax');alternativeNumber(q,'Sharpe net pay',5650,when,'single-band-tax');alternativeMethod(q,'Sharpe tax','5500*0.30');
 alternativeMatch(q,'Tax method',when[0],'Use the single-band method on income above the 2500 allowance.');
}
{
 const q=findQ(2017,'mj',2),when=['treat the bank.card purchase as an unpaid credit.card liability'];
 declare(q,'unpaid-credit-card','A genuine unpaid credit-card purchase creates a liability and leaves Bank 12000 higher.',when);
 alternativeNumber(q,'Closing bank debit',16680,when,'unpaid-credit-card');
 alternativeMatch(q,'Card settlement assumption',when[0],'Treat the bank-card purchase as an unpaid credit-card liability.');
}
{
 const q=findQ(2018,'jan',5),inventory=['use inventory.derived prize consumption of 500'],visitor=['include all 600 visitors fees as competition receipts'];
 declare(q,'inventory-prizes','The explicit 400 prize instruction conflicts with ledger-derived consumption of 500; accept the declared inventory-cost basis.',inventory);
 declare(q,'competition-visitors','Visitors fees may be included only with an explicit competition attribution.',visitor);
 alternativeNumber(q,'Direct prize cost',500,inventory,'inventory-prizes');
 alternativeNumber(q,'Competition profit',350,[inventory[0],'exclude visitors fees'],'inventory-prizes');
 alternativeNumber(q,'Competition profit',1050,[visitor[0],'use the direct prize instruction of 400'],'competition-visitors');
 alternativeNumber(q,'Competition profit',950,[visitor[0],inventory[0]],'inventory-prizes-with-visitors');
 alternativeMethod(q,'Competition profit','1300-500-200-250');alternativeMethod(q,'Competition profit','1300+600-400-200-250');alternativeMethod(q,'Competition profit','1300+600-500-200-250');
 alternativeMatch(q,'Prize-cost basis',inventory[0],'Use inventory-derived prize consumption of 500.');
 alternativeMatch(q,'Visitors basis',visitor[0],'Include all 600 visitors fees as competition receipts.');
}
{
 const q=findQ(2018,'mj',4),when=['use fixed capital alone as the investment base'];
 declare(q,'fixed-capital-roi','A declared fixed-capital-only investment base is 300000 instead of total opening equity 306900.',when);
 alternativeNumber(q,'Opening partners equity',300000,when,'fixed-capital-roi');alternativeNumber(q,'Return on opening equity',18.73,when,'fixed-capital-roi');alternativeMethod(q,'Return on opening equity','56200/300000*100');
 alternativeMatch(q,'Investment basis',when[0],'Use fixed capital alone as the investment base.');
}
{
 const q=findQ(2019,'mj',2),when=['assume the ambiguous bank opening balance 1750 is credit'];
 declare(q,'opening-bank-credit','The Bank source row prints Dr/Cr; a stated credit opening yields a 3290 overdraft.',when);
 alternativeNumber(q,'Closing bank debit',-3290,when,'opening-bank-credit');alternativeMethod(q,'Closing bank debit','-1750+460-1100-900');alternativeMatch(q,'Bank opening assumption',when[0],'Assume the ambiguous bank opening balance 1750 is credit.');
}
{
 const q=findQ(2022,'mj',4),when=['apportion the preference dividend for six months'];
 declare(q,'preference-six-months','A declared first-year six-month preference dividend is 4000; the full annual entitlement remains 8000.',when);
 alternativeNumber(q,'Preference annual dividend',4000,when,'preference-six-months');
}
{
 const q=findQ(2022,'mj',5),when=['round assembly OAR to 4[.]21 before absorption'];
 declare(q,'early-oar-rounding','The source lacks a precision rule; a stated early 4.21 absorption-rate rounding is accepted consistently.',when);
 alternativeNumber(q,'Assembly absorbed overhead',15.7875,when,'early-oar-rounding');alternativeNumber(q,'Total toy cost',274.84,when,'early-oar-rounding');alternativeNumber(q,'Toy mark-up',137.42,when,'early-oar-rounding');alternativeNumber(q,'Toy selling price',412.26,when,'early-oar-rounding');alternativeMethod(q,'Total toy cost','50+93.75+87.5+15.7875+27.8');alternativeMethod(q,'Toy selling price','274.84*1.5');
}
{
 const q=findQ(2024,'jan',1),when=['assume discount allowed 60 was also omitted from the profit calculation'];
 declare(q,'discount-profit-omission','The literal trial-balance omission leaves the ledger expense present; if a candidate explicitly assumes the expense was omitted from profit too, corrected profit is 18118.',when);
 alternativeNumber(q,'Corrected profit',18118,when,'discount-profit-omission');alternativeMatch(q,'Trial-balance omission distinction',when[0],'Assume Discount Allowed 60 was also omitted from the profit calculation.');alternativeMatch(q,'Omitted balance profit effect',when[0],'Assume Discount Allowed 60 was also omitted from the profit calculation.');
}
{
 const q=findQ(2024,'jan',2),when=['use current assets less inventory as the classroom quick.ratio formula'];
 declare(q,'classroom-quick-ratio','The classroom shortcut leaves supplies in quick assets and yields 0.95 rather than the stricter 0.83.',when);
 alternativeNumber(q,'Quick ratio',0.95,when,'classroom-quick-ratio');alternativeMethod(q,'Quick ratio','(101500-25000)/80600');alternativeMatch(q,'Quick assets basis',when[0],'Use current assets less inventory as the classroom quick-ratio formula.');
}
{
 const q=findQ(2025,'jan',3),when=['use the rounded unit selling price 33[.]42 for all units'];
 declare(q,'rounded-selling-price','Consistent revenue from a rounded 33.42 unit selling price is 751950 and expense is 150390.',when);
 alternativeNumber(q,'Sales revenue',751950,when,'rounded-selling-price');alternativeNumber(q,'Operating expenses',150390,when,'rounded-selling-price');alternativeMethod(q,'Operating expenses','22500*33.42*0.2');
}
{
 const q=findQ(2025,'jan',4),when=['carry full precision internally for moving averages'];
 declare(q,'full-precision-avco','Carrying full precision internally gives approximately 3096 closing inventory; whole-dollar running unit averages give 3094.',when);
 alternativeNumber(q,'Closing inventory value',3096,when,'full-precision-avco');alternativeNumber(q,'Closing stock value',3096,when,'full-precision-avco');alternativeNumber(q,'Cost of sales',220929,when,'full-precision-avco');alternativeNumber(q,'Gross income',421921,when,'full-precision-avco');alternativeMatch(q,'AVCO rounding policy',when[0],'Carry full precision internally for moving averages.');
}
{
 const q=findQ(2025,'mj',3),when=['do not recognize proposed final dividends as reporting.date liabilities'];
 declare(q,'unrecognized-proposed-dividends','The source does not state the dividend recognition convention; excluding proposed final dividends increases net assets by 3300.',when);
 alternativeNumber(q,'Final dividend liabilities',0,when,'unrecognized-proposed-dividends');alternativeNumber(q,'Current liabilities',69600,when,'unrecognized-proposed-dividends');alternativeNumber(q,'Working capital',-45900,when,'unrecognized-proposed-dividends');alternativeNumber(q,'Net assets',153100,when,'unrecognized-proposed-dividends');alternativeMatch(q,'Dividend recognition convention',when[0],'Do not recognize proposed final dividends as reporting-date liabilities.');
}
// Own-figure awards apply only to the method component, never to the canonical
// accuracy point. The dependency is an actual labelled earlier student result.
bindOwnFigure(2015,'mj',5,'Sales revenue','Production cost','x*1.5');
bindOwnFigure(2016,'mj',4,'Unit production cost','Production cost','x/12900');
bindOwnFigure(2017,'mj',3,'Gross profit per punch','Cost per punch','11-x');
bindOwnFigure(2018,'mj',2,'Inventory turnover','Average inventory','756200/x');
bindOwnFigure(2018,'mj',5,'Unit production cost','Production cost','x/40000');
bindOwnFigure(2021,'jan',3,'Selling price','Cost per product','x*1.25');
bindOwnFigure(2022,'mj',3,'Unit production cost','Production cost','x/50000');
bindOwnFigure(2023,'jan',2,'Order selling price','Order production cost','x*1.5');
bindOwnFigure(2024,'mj',2,'Ordinary return percentage','Ordinary profit available','x/180000*100');
bindOwnFigure(2025,'jan',3,'Unit production cost','Production cost','x/22500');
bindOwnFigure(2025,'jan',3,'Unit selling price','Unit production cost','x*1.6');
bindOwnFigure(2025,'mj',4,'Maturity payout','Total interest','65000+x');
bindOwnFigure(2026,'jan',4,'Jennie return percentage','Jennie profit share','x/150000*100');
