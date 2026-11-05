"""Refine prepared historical P2 transcription; supplied pages remain authoritative."""
import importlib.util,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('oa_extract',ROOT/'tools/prepare-oa-paper2-text.py')
extract=importlib.util.module_from_spec(spec);spec.loader.exec_module(extract)
OUT=ROOT/'src/officeAdministration/data/oaHistoricalPaper2Text.json'
def normal(text):
 text=text.replace('\ufffd', "'").replace('\u00ad','')
 text=re.sub(r'\(\s*(\d+)\s*(?:m\s*arks?|rnarks?|mnrks?)\s*[)}]',r'(\1 marks)',text,flags=re.I)
 text=re.sub(r'\{\s*(\d+)\s*marks?\s*\)',r'(\1 marks)',text,flags=re.I)
 text=re.sub(r'(?m)^\s*(?:\d+[.)]?\s*)?[._ ]{4,}\s*$','',text)
 text=re.sub(r'(?m)^\s*0\s*1237020.*$','',text)
 return text.strip()
def clean_pages(pages):return ['\n'.join(filter(None,(extract.clean_line(l) for l in p.splitlines()))) for p in pages]
def replace_first(page,old,new):
 if old not in page:raise ValueError('Missing repair text: '+old)
 return page.replace(old,new,1)
def repair_pages(stem,pages):
 if stem=='2010_MJ':
  pages[4]=replace_first(pages[4],'s. (D\n(a)','5. (a) (i)')
  pages[4]=pages[4].replace(') reams A.4 copy paper','2 reams A4 copy paper').replace('$ black deskjet cartridges','6 black deskjet cartridges')
 if stem=='2016_JAN':
  pages[3]=replace_first(pages[3],'Suggest TWO cultures that observed in EACH of the following:\n2. (a) are','2. (a) Suggest TWO cultures that are observed in EACH of the following:')
  pages[4]='' # Supplied scan duplicates printed page 6 (PDF pages 4 and 5).
  pages[7]='3. '+pages[7]
 if stem=='2024_MJ':
  for index,number in [(2,1),(4,2),(14,6)]:pages[index]=re.sub(r'(?m)^\(a\)',f'{number}. (a)',pages[index],count=1)
  pages[5]=re.sub(r'^\(e\)','(c)',pages[5])
 if stem=='2025_MJ':
  pages[1]=pages[1].replace('State TWO benefits of horizontal communication flow.','(ii) State TWO benefits of horizontal communication flow.')
  pages[1]=pages[1].replace('Outline TWO advantages of using video conferencing rather than the traditional in-person\n(b)\nmeetings method of hosting intemational business meetings.\nas a','(b) Outline TWO advantages of using video conferencing rather than the traditional in-person meetings as a method of hosting international business meetings.')
  pages[2]='(c) '+pages[2]
  pages[4]=re.sub(r'^.*?(?=\(3 marks\))',"2. (a) State THREE reasons why possessing effective communication skills is important to an individual seeking employment in today's competitive job market.\n",pages[4],count=1,flags=re.S)
  pages[5]='(c) '+pages[5]
  pages[7]=pages[7].replace('3. (a)','3. (a) (i)',1)
  pages[9]=pages[9].replace('(e)','(c)',1)
  pages[11]='(b) '+pages[11]
  pages[13]=pages[13].replace('(e)','(c)',1)
  pages[14]='5. All business organizations must have an internal accounting department or outsource the accounting service.\n(a) Identify TWO duties of a clerk in the accounts office.\n(2 marks)\n(b) Outline the procedure for making payments through the bank using EACH of the following methods.\n(i) Standing order\n(2 marks)\n(ii) Credit transfer\n(2 marks)'
  pages[15]=pages[15].replace('Joseph Sawyers 8','Joseph Sawyers 8 0')
  pages[16]='6. (a) You were recently employed as a clerk in the purchasing department at ABC Company. Other than preparing or processing purchase requisitions, state TWO duties that you are required to perform.\n(2 marks)\n(b) Outline TWO functions of the marketing office.\n(4 marks)'
 return pages
def split_parts(q):
 full=normal(q['fullText']);starts=list(re.finditer(r'(?m)^\(([a-h])\)\s*',full));segments=[]
 for i,m in enumerate(starts):
  label=m[1];prompt=full[m.end():starts[i+1].start() if i+1<len(starts) else len(full)].strip()
  if segments and segments[-1]['label']==label:segments[-1]['prompt']+='\n'+prompt
  else:segments.append({'label':label,'prompt':prompt})
 for p in segments:p.update(id=f'q{q["number"]}-{p["label"]}',marks=sum(int(m) for m in re.findall(r'\(\s*(\d+)\s*marks?\s*\)',p['prompt'],re.I)),answerType='written',sourcePage=q['sourcePage'],sourcePages=q['sourcePages'])
 if q.get('partMarkOverrides'):
  for p,marks in zip(segments,q['partMarkOverrides']):p['marks']=marks
 if not segments or sum(p['marks'] for p in segments)!=15 or any(not p['marks'] for p in segments):raise ValueError(f'Unreconciled part marks {q["number"]}: '+str([(p['label'],p['marks']) for p in segments]))
 q.update(fullText=full,stem=full[:starts[0].start()].strip(),parts=segments,partAllocationVerified=True)
 return q
# Separate answer sheets printed after END OF TEST belong to the named question,
# not to the final question on the examination. These are source field labels.
SOURCE_FORMS={
 'OA-P2-2005-MJ':[(5,'b',9,'Purchase requisition','Name; Requisition number 10; Date; Department; To; Quantity; Code; Description; Supplier; Authorized by; Job title; Approved by; Received by purchasing.'),(8,'c',10,'Terrace Mills cheque','Terrace Mills, Lot 20 Happy Vale Estate, St Michael. Date; Pay to the order of; Amount in figures; Amount in words; Manager. Island Bank, Happy Vale, St Michael, Barbados.')],
 'OA-P2-2006-MJ':[(2,'c',8,'Time-zone table','Time in Kingston, Jamaica; Name of city called; Local time in city called (24-hour clock); Implications for contacting office staff.'),(5,'b',9,'Petty cash book','Cash received; Date; Details; Voucher number; Totals; Postage; Travel; Stationery; Miscellaneous. Opening entry: cash received $250 on May 2.'),(8,'c',10,'Cost analysis card','Mi Belle Robe Inc, St Lucia. Product; Materials; Machines; Tools; Equipment; Labour; Overheads; Total cost. Products A and B have overheads $500 and $1,000 respectively.')],
 'OA-P2-2007-MJ':[(6,'c',9,'FIFO stock record','Marine Supplies Company, Purchasing Department. Record of Transactions FIFO Method for May-August 2007, AC-DC motors. Date; Receipts; Issues; Balance; Value.'),(7,'c',10,'Accident report','Bronson Ltd, Office Furniture Manufacturers, 62 Harper Valley. Accident number; Employee name; Date; Time; Accident description; Action taken; Production manager.')],
 'OA-P2-2008-MJ':[(5,'c',9,'Cash analysis and withdrawal slip','Cash analysis: number and amount of $100, $20, $10 and $1 notes; coins; total. Withdrawal slip: account number; date 30 April 2008; Belmopan branch; Saithy’s Hardware; amount in words and figures; Troy Campbell signature; Algerian Bank total debit.')],
 'OA-P2-2009-MJ':[(8,'c',8,'Advice note','Seller; Telephone; Order number; Buyer; Please receive the following on; Quantity; Item description; Received by.'),(7,'c',9,'Job card','Job number; Card number; Date; Job description; Material quantity and description; Worker number, type and pay rate; Time taken; Approved by and date; Inspected by and date; Prepared by and date.'),(6,'b',10,'FIFO stock record','Battery Supplies Company, Purchasing Department. Record of Transactions FIFO Method for September-December 2008, AA batteries. Date; Receipts; Issues; Balance; Value.')],
 'OA-P2-2010-MJ':[(5,'c',9,'Stock requisition and order form','Departmental stock requisition: To; Number; Date; Quantity; Description; Requested by; Department; Authorized by; Date; Received by; Date. Order form: To; Date; Quotation number 10; Quantity; Particulars; Unit price; Total; C.O.D.'),(6,'b',10,'Petty cash book','Use the printed petty cash book on PDF page 10; it is rotated in the supplied scan.'),(7,'b',11,'Sales invoice','Invoice number TBSS220; To; Terms; Date; Quantity; Description; Unit price; Total; E&OE.')]
}
QUESTION_END_PAGES={'OA-P2-2005-MJ':8,'OA-P2-2006-MJ':7,'OA-P2-2007-MJ':8,'OA-P2-2008-MJ':8,'OA-P2-2009-MJ':7,'OA-P2-2010-MJ':8}

def main():
 prepared=json.loads(OUT.read_text(encoding='utf8'));records={p['id']:p for p in prepared}
 for stem in ['2010_MJ','2016_JAN','2024_JAN','2024_MJ','2025_MJ']:
  pages=clean_pages(extract.pages_for(ROOT/f'.audit-output/office-admin-source/CSEC_Office_Administration_P2_{stem}.pdf',ROOT/'.audit-output/office-admin-ocr'))
  pages=repair_pages(stem,pages);minimum=4 if stem=='2024_JAN' else 3 if stem=='2024_MJ' else 2;pages[:minimum-1]=['']*(minimum-1)
  year=int(stem[:4]);count=8 if year<=2013 else 7 if year<=2016 else 6
  questions=extract.parse_questions(pages,count);records['OA-P2-'+stem.replace('_','-')]={'id':'OA-P2-'+stem.replace('_','-'),'questions':questions}
 for paper in records.values():
  for q in paper['questions']:
   key=(paper['id'],q['number']);full=normal(q['fullText'])
   if key in [('OA-P2-2006-MJ',3),('OA-P2-2006-MJ',7)]:full=full.replace('\n(h) ','\n(b) ')
   if key==('OA-P2-2006-MJ',4):full=full.replace('\n+ (b) ','\n(b) ')
   if paper['id']=='OA-P2-2010-MJ':q['partMarkOverrides']={1:[5,2,8],2:[6,9],3:[7,8],4:[4,3,8],5:[4,2,9],6:[6,9],7:[6,9],8:[6,9]}[q['number']]
   if key==('OA-P2-2005-MJ',3):full=full.replace('( ... marks)','(4 marks)')
   if key==('OA-P2-2007-MJ',3):full=full.replace('4marks)','(4 marks)')
   if key==('OA-P2-2008-MJ',3):full=full.replace('( 2mnrks)','(2 marks)')
   if key==('OA-P2-2017-MJ',5) and '\neht\n' in full:
    start=full.index('\neht\n');end=full.index('\n(d)')
    full=full[:start]+'''\n(c) The following is an extract of an incomplete petty cash book. You are required to use the Imprest System to complete the analysis/extension columns and balance the account on 30 April 2017.
Petty Cash Book
Columns: Cash Received ($); Date 2017; Details; Voucher No.; Totals ($); Stationery; Postage; Travel.
Opening cash received: $500.00.
1 April: Office paper, voucher 10, total $260.00.
15 April: Taxi fare, voucher 11, total $130.00 (Travel $130.00 already entered).
25 April: Stamps, voucher 12, total $50.00.
Total for the month: [complete].
(6 marks)'''+full[end:]
   if key==('OA-P2-2018-MJ',6) and '\n(c)' not in full:
    full+='\n(c) State THREE ways in which the destination sheet could increase the success of the operations, dispatch and transport services in the organization to more efficiently provide goods and services to its customers.\n(3 marks)'
    if 18 not in q['sourcePages']:q['sourcePages'].append(18)
   if key==('OA-P2-2022-MJ',6) and '\nTEEHS\n' in full:
    start=full.index('\nTEEHS\n');end=full.index('\n(c) (ii)')
    full=full[:start]+'''\nDESTINATION SHEET
Eco Friendly Supplies Ltd, Main Street, Santa Cruz.
Fields: Date (May); Delivery date (May); Class of vehicle; Vehicle registration number; Destination; Distance; Driver's name; Mate's name.
Delivery columns: Customer's Name; Customer's Address; Type of Goods; Quantity and Description; Comments.
Supervisor: [complete].'''+full[end:]
   if paper['id'] in SOURCE_FORMS:
    if q['number']==8:
     full=re.split(r'END\s*OF\s*TEST',full,maxsplit=1,flags=re.I)[0].strip()
     q['sourcePages']=[page for page in q['sourcePages'] if page<=QUESTION_END_PAGES[paper['id']]]
    forms=[{'partLabel':part,'pdfPage':page,'title':title,'fields':fields} for number,part,page,title,fields in SOURCE_FORMS[paper['id']] if number==q['number']]
    if forms:
     q['sourceForms']=forms
     q['sourcePages']=sorted(set(q['sourcePages']+[form['pdfPage'] for form in forms]))
   q['fullText']=full;q['section']='I' if q['number']<=(4 if int(paper['id'][6:10])<=2013 else 3) else 'II'
   try:split_parts(q)
   except Exception as e:raise ValueError(paper['id']+' '+str(e)) from e
   for form in q.get('sourceForms',[]):
    part=next(part for part in q['parts'] if part['label']==form['partLabel'])
    part['prompt']+='\n\nSupplied '+form['title']+' (PDF page '+str(form['pdfPage'])+'): '+form['fields']
 ordered=sorted(records.values(),key=lambda p:p['id']);OUT.write_text(json.dumps(ordered,ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf8')
 for p in ordered:print(p['id'],len(p['questions']),sum(len(q['parts']) for q in p['questions']))
if __name__=='__main__':main()
