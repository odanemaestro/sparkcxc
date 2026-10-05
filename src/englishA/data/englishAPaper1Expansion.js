// ============================================================================
// SPARK English A Paper 01 original expansion V2
//
// This file expands the original SPARK-authored Paper 01 bank with 1,440
// additional questions: 480 per discourse module. Together with the original
// 60-question V1 bank, SPARK has 1,500 original Paper 01 questions before the
// historical-paper ingestion layer is added.
//
// Every generated question has a stable ID, four options, one correct answer,
// an explanation, objective metadata, and stimulus linkage where applicable.
// ============================================================================

const LETTERS = ["A","B","C","D"];

function choices(correct,distractors,salt=0){
  const unique=[correct,...distractors.filter(item=>item!==correct)].slice(0,4);
  while(unique.length<4) unique.push("None of these");
  const shift=((Number(salt)||0)%4+4)%4;
  const rotated=[...unique.slice(shift),...unique.slice(0,shift)];
  const options={};
  rotated.forEach((value,index)=>{options[LETTERS[index]]=value;});
  const answer=LETTERS[rotated.indexOf(correct)];
  return {options,answer};
}

function q(id,module,kind,objective,stem,correct,distractors,explanation,stimulusId=null,salt=0){
  const built=choices(correct,distractors,salt);
  return {id,module,kind,objective,stem,options:built.options,answer:built.answer,explanation,stimulusId};
}

const informativeSeeds = [
  ["Harbour Reading Club","Port Maria",18,46,"weekly reading sessions","families began borrowing books together","keep the sessions and add a Saturday group"],
  ["School Garden Project","May Pen",24,63,"student gardening teams","teachers linked the garden to science lessons","expand the herb beds next term"],
  ["Rainwater Collection Trial","Spanish Town",320,710,"new storage tanks","less treated water was used for cleaning","install gutter screens before expansion"],
  ["Community Coding Class","Mandeville",15,52,"free evening workshops","participants practised with shared laptops","offer a second beginner class"],
  ["Beach Clean-up Survey","Negril",41,17,"monthly clean-up teams","bins were placed near the busiest entrances","keep monitoring the same beach sections"],
  ["Market Recycling Pilot","Kingston",28,74,"labelled recycling stations","vendors received short sorting demonstrations","add signs in Jamaican Creole and English"],
  ["Youth Football Attendance","Savanna-la-Mar",36,81,"later training sessions","parents organised shared transport","continue the revised training time"],
  ["Library Computer Use","Ocho Rios",44,92,"longer computer-room hours","students could book short study slots","add two more devices during exam season"],
  ["Mangrove Seedling Count","Black River",57,133,"protected restoration zones","volunteers reduced trampling around young plants","continue monthly measurements"],
  ["Health Fair Screening","Linstead",62,148,"mobile screening booths","community groups promoted the event early","repeat the fair in nearby districts"],
  ["Bus Route Feedback","Half-Way Tree",33,79,"a digital feedback form","commuters could report delays quickly","publish a monthly response summary"],
  ["Farmers' Market Visits","Santa Cruz",51,96,"Friday evening opening","workers could shop after normal hours","test the later opening for three more months"],
  ["Homework Centre Use","Morant Bay",26,71,"peer tutoring sessions","older students volunteered twice each week","recruit more mathematics tutors"],
  ["Water-Saving Campaign","Port Antonio",88,49,"household conservation reminders","residents reported leaking pipes sooner","continue reminders during the dry season"],
  ["Museum Student Visits","Falmouth",29,68,"school partnership days","teachers received lesson guides before visits","add a local-history activity sheet"],
  ["Tree-Planting Survival","Mona",45,84,"mulching and watering teams","seedlings were checked after dry weeks","use the same care plan at the next site"],
  ["Parish Debate Club","Old Harbour",21,58,"inter-school practice rounds","students received feedback after each speech","schedule one extra practice before finals"],
  ["Clinic Appointment Trial","Montego Bay",73,119,"text-message reminders","patients could confirm or change appointments","add a simple rescheduling link"],
  ["Road Safety Workshop","Bog Walk",34,76,"student demonstrations","teachers used real crossing scenarios","repeat the workshop with parents"],
  ["Small Business Training","Cross Roads",19,64,"weekend bookkeeping sessions","owners practised with sample records","offer an advanced follow-up workshop"],
  ["School Breakfast Uptake","Greater Portmore",67,112,"earlier serving time","students could eat before assembly","keep the earlier schedule"],
  ["Coral Reef Monitoring","Discovery Bay",39,87,"student reef surveys","teams used the same marked observation points","continue using fixed locations for comparison"],
  ["Reading App Trial","Papine",48,103,"offline reading downloads","students could read without mobile data","add more Caribbean short stories"],
  ["Community Exercise Group","Spanish Town",31,69,"free morning sessions","local coaches rotated leading the activities","add a sheltered venue for rainy days"],
];

const literarySeeds = [
  ["The Red Umbrella","Nia","her aunt","a red umbrella","a crowded bus stop","missing her first day at a new school","shares the umbrella with a younger child","kindness can steady you when you feel uncertain","warm"],
  ["The Last Mango","Joel","his grandfather","the last ripe mango","a quiet backyard","disappointing his grandfather","leaves the mango for his younger sister","generosity matters more than being first","contented"],
  ["The Blue Notebook","Amara","her teacher","a blue notebook","an empty classroom","reading her poem aloud","writes one final line and volunteers to read","courage often begins with one small action","hopeful"],
  ["The Broken Kite","Dario","his cousin","a torn kite","a windy playing field","admitting he caused the tear","asks for tape and repairs it with his cousin","honesty can rebuild trust","relieved"],
  ["The Evening Train","Leah","her mother","a paper ticket","a small station","leaving home for college","boards after reading a note from her mother","fear and courage can exist together","determined"],
  ["The Wooden Box","Kemar","his father","a wooden box","a storeroom","asking about family history","opens the box and finds old photographs","family stories connect generations","reflective"],
  ["The Yellow Cup","Talia","her neighbour","a yellow cup","a community kitchen","speaking to someone she had argued with","offers the neighbour tea in the old cup","reconciliation begins with simple gestures","gentle"],
  ["The First Bell","Andre","his coach","a whistle","a school field","returning after an injury","steps onto the field when the first bell rings","confidence returns through action","encouraged"],
  ["The Small Radio","Maya","her grandmother","a small radio","a verandah at dusk","understanding why her grandmother keeps old things","listens to a song tied to a family memory","objects can carry personal history","nostalgic"],
  ["The Green Door","Omar","his uncle","a brass key","an old workshop","entering a place that has been closed for years","turns the key and begins cleaning the room","new beginnings can grow from the past","hopeful"],
  ["The River Stone","Sade","her brother","a smooth river stone","a riverside path","apologising after a quarrel","places the stone in her brother's hand","forgiveness requires humility","peaceful"],
  ["The Empty Chair","Micah","his mother","an empty chair","a school concert","performing while his father is abroad","plays after seeing his mother's encouraging smile","support can be felt even across distance","proud"],
  ["The Silver Pin","Renee","her aunt","a silver pin","a dressing room","wearing something that belonged to her late grandmother","fastens the pin before going on stage","memory can provide strength","tender"],
  ["The Rainy Match","Jaden","his teammate","a muddy football","a rain-soaked field","continuing after falling behind","passes instead of taking the final shot himself","teamwork matters more than personal glory","excited"],
  ["The Folded Map","Kiara","her father","a folded map","a bus terminal","travelling alone for the first time","checks the route and asks for directions","independence grows through preparation","confident"],
  ["The Old Recipe","Malik","his grandmother","a stained recipe card","a kitchen","cooking for the family gathering","follows the card but adds one new spice","tradition can make room for change","joyful"],
  ["The White Shell","Asha","her sister","a white shell","a beach at sunrise","saying goodbye before her sister moves away","gives her sister the shell as a keepsake","love can survive distance","bittersweet"],
  ["The Quiet Drum","Devon","his music teacher","a hand drum","a rehearsal room","performing a difficult rhythm","slows down and finds the beat","patience improves skill","satisfied"],
  ["The Lantern","Zuri","her grandfather","a lantern","a dark yard after a power cut","being afraid of the darkness","helps light the yard for younger children","responsibility can reduce fear","reassuring"],
  ["The Missing Button","Caleb","his mother","a loose button","a tailor shop","asking for help with a simple task","learns to sew the button himself","small skills can build independence","pleased"],
  ["The Purple Scarf","Imani","her friend","a purple scarf","a school corridor","approaching a friend after a misunderstanding","returns the scarf with a written apology","honest communication repairs friendship","relieved"],
  ["The Early Boat","Nathan","his uncle","a fishing rope","a quiet jetty","waking early enough to join the trip","arrives before sunrise and helps prepare the boat","commitment is shown through preparation","eager"],
  ["The Clay Bird","Alana","her art teacher","a clay bird","an art room","showing an imperfect sculpture","places it in the exhibition anyway","creative confidence grows by accepting imperfection","proud"],
  ["The Orange Envelope","Theo","his sister","an orange envelope","a front step","opening exam results alone","waits for his sister and opens it with her","important moments are easier when shared","grateful"],
];

const persuasiveSeeds = [
  ["Keep Our Beaches Clean","beach users","plastic waste near the shoreline","three volunteer groups collected 420 bags in one term","use clearly labelled bins and reduce single-use plastics","some businesses say alternatives cost more","bulk purchasing can reduce the cost","cleaner beaches and healthier marine life","Choose less waste today"],
  ["Read for Twenty Minutes","students and families","low daily reading time","a school survey found that regular readers completed more books each term","set aside twenty minutes for reading each evening","some students say homework leaves little time","a short fixed period is easier to maintain than a long session","stronger vocabulary and reading stamina","Twenty minutes can change a habit"],
  ["Walk Safely to School","students and drivers","unsafe road crossing near schools","observers recorded 96 risky crossings in one week","use marked crossings and slow down near school gates","drivers say traffic is already slow","safer crossings reduce sudden stops and confusion","fewer preventable injuries","Slow down where children cross"],
  ["Save Water at Home","households","wasted treated water","one leaking tap can waste many litres over time","repair leaks and shorten unnecessary water use","some repairs require a plumber","reporting leaks early prevents larger losses","lower waste during dry periods","Every drop has a job"],
  ["Support Local Farmers","shoppers","declining sales for small growers","market records showed a 28 percent rise when local produce was promoted","buy at least one locally grown item each week","some imported goods may be cheaper","seasonal local produce can be competitive and fresher","stronger local food systems","Put one local item in your basket"],
  ["Bring a Reusable Bottle","students","single-use bottle waste","the school collected 610 discarded bottles in five days","carry a refillable bottle","students may forget bottles at home","refill stations and reminder signs make the habit easier","less plastic waste","Refill, reuse, repeat"],
  ["Protect the Mangroves","coastal residents","damage to young mangrove areas","monitoring teams counted twice as many surviving seedlings in protected zones","keep vehicles and dumping away from restoration sites","some residents want easier shoreline access","marked paths can preserve access without crushing seedlings","stronger coastlines and fish habitats","Give young mangroves room to grow"],
  ["Join the Homework Club","students","unfinished assignments and weak study routines","participants submitted 35 percent more assignments on time","attend one supported study session each week","some students prefer to work alone","students can still work independently while tutors are available","better organisation and support","One hour of support can save hours of stress"],
  ["Use the School Bus","families","traffic congestion at the school gate","vehicle counts dropped by 22 percent on trial bus days","use the school bus where practical","families value flexible drop-off times","published routes and reliable pickup times improve convenience","less congestion and safer entrances","Share the ride, clear the gate"],
  ["Plant More Shade Trees","community members","hot public spaces","temperature readings were lower beneath mature tree cover","plant and care for native shade trees","young trees take time to grow","starting now creates benefits for future users","cooler spaces and better habitats","Plant shade for tomorrow"],
  ["Choose Healthy Snacks","students","high-sugar snack choices","canteen sales showed fruit purchases doubled after prices were reduced","offer affordable fruit and water options","students say healthier choices cost more","school pricing can make better choices competitive","improved daily nutrition","Make the easy choice a healthy one"],
  ["Volunteer One Saturday","community members","limited support for local clean-up projects","one four-hour event restored two play areas","give one Saturday each term to a community project","weekends are valuable personal time","short scheduled events allow people to plan ahead","cleaner shared spaces and stronger community ties","One Saturday, shared results"],
  ["Use Less Electricity","households","unnecessary electricity use","a school energy audit cut evening use by 18 percent after simple changes","switch off unused lights and devices","some equipment must remain powered","focus on items that are safe to switch off","lower bills and reduced waste","Switch off what you do not need"],
  ["Protect Study Time","students","constant phone interruptions","students in a trial completed tasks faster during notification-free periods","silence nonessential notifications while studying","families may need to contact students","priority contacts can remain available","better concentration","Give your attention one job at a time"],
  ["Keep Drains Clear","residents","blocked drains before heavy rain","teams removed 75 bags of waste from drains in one weekend","dispose of waste properly and report blocked drains","some illegal dumping happens at night","community reporting can help authorities respond sooner","reduced flooding risk","Clear drains start with clear choices"],
  ["Support School Libraries","parents and community members","limited access to current books","book loans rose by 40 percent after a small collection update","donate suitable books or support library fundraising","families may not have spare books","small donations and shared fundraising spread the cost","better access to reading material","Build the shelf, build the reader"],
  ["Wear a Helmet","young cyclists","head injuries from cycling falls","clinic staff reported that helmets greatly reduce serious head injury risk","wear a properly fitted helmet on every ride","helmets can feel hot","lightweight certified helmets improve comfort","safer cycling","Protect your head every ride"],
  ["Reduce Food Waste","families","good food being thrown away","a household trial cut waste by one third through meal planning","plan meals and store leftovers safely","planning takes extra time","a short weekly plan can save shopping time later","lower costs and less waste","Plan it, use it, save it"],
  ["Respect Quiet Zones","library users","noise in shared study areas","complaints fell sharply during a two-week quiet-zone trial","keep calls outside and use headphones responsibly","some group work requires discussion","group rooms provide space for conversation","better concentration for everyone","Quiet space, stronger focus"],
  ["Attend Parent Meetings","parents and guardians","low family participation in school planning","attendance doubled when meetings offered online access","join at least one school meeting each term","work schedules can make attendance difficult","hybrid meetings give families more options","stronger home-school communication","Your voice belongs in the room"],
  ["Use Public Refill Stations","town residents","plastic bottle litter","refill stations dispensed 9,000 litres in their first three months","carry a reusable container and use refill points","some people question station cleanliness","regular published maintenance checks can build trust","less plastic waste and easier water access","Refill the bottle, not the bin"],
  ["Share the Road","drivers and cyclists","conflict between road users","a safety campaign reduced close-passing reports during its trial month","leave safe passing distance and signal clearly","drivers worry about slower travel","safe passing usually adds only a few seconds","fewer collisions and less conflict","A few seconds can save a life"],
  ["Preserve Historic Buildings","community members","loss of local heritage sites","visitor numbers rose after one restored building reopened","support careful restoration and reuse","restoration can be expensive","phased work and grants can spread costs","heritage protection and tourism value","Keep history standing"],
  ["Prepare for Hurricanes","households","last-minute storm preparation","families with checklists completed preparations earlier in a community drill","prepare supplies and plans before a warning is issued","storage space can be limited","compact kits can focus on essential items","safer and calmer emergency response","Prepare before the clouds gather"],
];

function informativeStimulus(seed,index){
  const [title,place,before,after,action,cause,recommendation]=seed;
  const id=`ea-o-m1-s${String(index+1).padStart(2,"0")}`;
  return {
    id,module:1,kind:"informative",title,label:"Informative report",
    text:[
      `A community team in ${place} reviewed the ${title.toLowerCase()} programme after six months. At the first count, the team recorded ${before} participants or units. By the latest count, the figure had changed to ${after}.`,
      `The organisers linked the change mainly to ${action}. They also noted that ${cause}. The team used the same counting method at each review so that the figures could be compared fairly.`,
      `The report recommends that organisers ${recommendation}. It also advises them to keep collecting data before making larger changes to the programme.`,
    ],
    source:"Original SPARK passage",
    facts:{place,before,after,action,cause,recommendation},
  };
}

function literaryStimulus(seed,index){
  const [title,character,relation,object,setting,worry,action,message,mood]=seed;
  const id=`ea-o-m2-s${String(index+1).padStart(2,"0")}`;
  return {
    id,module:2,kind:"literary",title,label:"Literary extract",
    text:[
      `${character} stood in ${setting}, turning ${object} over slowly. The thought of ${worry} had followed ${character} all morning, making every small sound seem louder than usual.`,
      `${relation[0].toUpperCase()+relation.slice(1)} noticed the silence but did not rush to fill it. Instead, there was a short reminder that difficult moments often become clearer once a person chooses one useful thing to do.`,
      `After another moment, ${character} ${action}. The worry did not disappear completely, but it no longer seemed large enough to control the day.`,
      `Later, ${character} understood the lesson more clearly: ${message}. The memory of ${object} would always bring that moment back.`,
    ],
    source:"Original SPARK literary extract",
    facts:{character,relation,object,setting,worry,action,message,mood},
  };
}

function persuasiveStimulus(seed,index){
  const [title,audience,problem,statistic,action,objection,response,benefit,slogan]=seed;
  const id=`ea-o-m3-s${String(index+1).padStart(2,"0")}`;
  return {
    id,module:3,kind:"persuasive",title,label:"Persuasive appeal",
    headline:title.toUpperCase(),
    text:[
      `This message is directed to ${audience}. It argues that ${problem} deserves practical action now.`,
      `Supporters point to this evidence: ${statistic}. They are asking people to ${action}.`,
      `A common objection is that ${objection}. The campaign answers that concern by explaining that ${response}.`,
      `The expected result is ${benefit}. The campaign closes with the line, “${slogan}.”`,
    ],
    source:"Original SPARK persuasive passage",
    facts:{audience,problem,statistic,action,objection,response,benefit,slogan},
  };
}

export const englishAPaper1ExpansionStimuli = Object.freeze(Object.fromEntries([
  ...informativeSeeds.map(informativeStimulus),
  ...literarySeeds.map(literaryStimulus),
  ...persuasiveSeeds.map(persuasiveStimulus),
].map(item=>[item.id,item])));

function informativeQuestions(stimulus,index){
  const f=stimulus.facts;
  const change=f.after-f.before;
  const direction=change>=0?"increase":"decrease";
  return [
    q(`${stimulus.id}-q01`,1,"comprehension","M1-U4","What is the MAIN focus of the report?",stimulus.title,["A fictional adventure","A personal argument","A set of cooking instructions"],"The report explains the named programme and its results.",stimulus.id,index),
    q(`${stimulus.id}-q02`,1,"comprehension","M1-U6","Where was the programme reviewed?",f.place,["Bridgetown","Georgetown","Castries"],"The location is stated in the opening sentence.",stimulus.id,index+1),
    q(`${stimulus.id}-q03`,1,"comprehension","M1-U6","What figure was recorded at the FIRST count?",String(f.before),[String(f.after),String(Math.abs(change)),String(f.before+f.after)],"The first paragraph gives the starting figure.",stimulus.id,index+2),
    q(`${stimulus.id}-q04`,1,"comprehension","M1-U6","What figure was recorded at the LATEST count?",String(f.after),[String(f.before),String(Math.abs(change)),String(f.before+f.after)],"The first paragraph gives the latest figure.",stimulus.id,index+3),
    q(`${stimulus.id}-q05`,1,"comprehension","M1-A6",`What was the numerical ${direction} between the two counts?`,String(Math.abs(change)),[String(f.before),String(f.after),String(f.before+f.after)],`The difference is ${Math.abs(change)}.`,stimulus.id,index),
    q(`${stimulus.id}-q06`,1,"comprehension","M1-U5","Which action did organisers link MAINLY to the change?",f.action,["changing the programme name","ending all data collection","moving the project overseas"],"The second paragraph directly links the change to this action.",stimulus.id,index+1),
    q(`${stimulus.id}-q07`,1,"comprehension","M1-A3","Which detail gives an additional explanation for the result?",f.cause,["the title of the report","the colour of the forms","the day the report was printed"],"The report identifies this as another factor.",stimulus.id,index+2),
    q(`${stimulus.id}-q08`,1,"comprehension","M1-U8","Why did the team use the SAME counting method each time?","To make the figures easier to compare fairly",["To guarantee that the result would increase","To avoid recording any numbers","To make the report longer"],"A consistent method makes comparisons more reliable.",stimulus.id,index+3),
    q(`${stimulus.id}-q09`,1,"comprehension","M1-A4","What does the recommendation suggest organisers should do next?",f.recommendation,["stop the programme immediately","ignore future results","replace all participants"],"The final paragraph states this recommendation.",stimulus.id,index),
    q(`${stimulus.id}-q10`,1,"comprehension","M1-A3","Why does the report advise continued data collection?","To provide evidence before larger changes are made",["To make every future figure identical","To prevent anyone from joining","To turn the report into a story"],"Ongoing data helps organisers judge future decisions.",stimulus.id,index+1),
    q(`${stimulus.id}-q11`,1,"comprehension","M1-U9","The writer's MAIN purpose is to","inform readers about results and recommended next steps",["entertain readers with a mystery","advertise a luxury product","describe an imaginary island"],"The passage reports findings and recommendations.",stimulus.id,index+2),
    q(`${stimulus.id}-q12`,1,"comprehension","M1-A5","In the passage, 'recorded' MOST nearly means","measured and written down",["sang professionally","removed completely","guessed without checking"],"The team recorded figures as part of data collection.",stimulus.id,index+3),
    q(`${stimulus.id}-q13`,1,"comprehension","M1-A6","Which feature makes the report MORE reliable?","It compares figures collected with the same method",["It avoids all numerical evidence","It gives only one person's opinion","It changes the method at every review"],"Using the same method supports a fair comparison.",stimulus.id,index),
    q(`${stimulus.id}-q14`,1,"comprehension","M1-U8","The passage is organised mainly as","results, explanation and recommendation",["a dialogue followed by a poem","instructions followed by a recipe","a joke followed by a riddle"],"The three paragraphs move from results to reasons and then recommendations.",stimulus.id,index+1),
    q(`${stimulus.id}-q15`,1,"comprehension","M1-EC4","Which conclusion is BEST supported by the report?","The programme should be judged using evidence collected over time",["One count is enough for every future decision","The organisers should ignore the reported change","Numbers are never useful when reviewing a programme"],"The report repeatedly relies on comparable data and continued monitoring.",stimulus.id,index+2),
  ];
}

function literaryQuestions(stimulus,index){
  const f=stimulus.facts;
  return [
    q(`${stimulus.id}-q01`,2,"comprehension","M2-U3","Who is the central character?",f.character,["the narrator's teacher","an unnamed tourist","a shopkeeper"],"The extract follows this character throughout.",stimulus.id,index),
    q(`${stimulus.id}-q02`,2,"comprehension","M2-U3","Where does the opening take place?",f.setting,["an airport runway","a crowded courtroom","a mountain cave"],"The setting is stated in the first sentence.",stimulus.id,index+1),
    q(`${stimulus.id}-q03`,2,"comprehension","M2-U4","Which object is important in the extract?",f.object,["a newspaper advertisement","a broken television","a school timetable"],"The object appears at the beginning and returns in the ending.",stimulus.id,index+2),
    q(`${stimulus.id}-q04`,2,"comprehension","M2-A5","What is troubling the character at the start?",f.worry,["choosing a restaurant","winning a lottery","buying a new phone"],"The opening paragraph directly identifies the character's worry.",stimulus.id,index+3),
    q(`${stimulus.id}-q05`,2,"comprehension","M2-A10","How does the relative or trusted person respond?","By giving space and a short piece of guidance",["By laughing at the character","By leaving without speaking","By ordering the character to forget the problem"],"The second paragraph shows patient, restrained support.",stimulus.id,index),
    q(`${stimulus.id}-q06`,2,"comprehension","M2-A13","What is the turning point in the extract?",f.action,["the character falls asleep","the setting suddenly disappears","a stranger changes the subject"],"The character's decision to act changes the emotional direction of the scene.",stimulus.id,index+1),
    q(`${stimulus.id}-q07`,2,"comprehension","M2-EC2","Which theme is MOST strongly developed?",f.message,["wealth always solves problems","people should avoid all difficult situations","success depends only on luck"],"The ending states this lesson directly through the character's experience.",stimulus.id,index+2),
    q(`${stimulus.id}-q08`,2,"comprehension","M2-A13",`The ${f.object} functions mainly as`,"a symbol connected with the character's important memory",["proof that the setting is imaginary","a sign that nobody has changed","an object with no link to the story"],"The object frames the experience and later recalls the lesson.",stimulus.id,index+3),
    q(`${stimulus.id}-q09`,2,"comprehension","M2-EC3","The mood at the END is BEST described as",f.mood,["furious","terrified","mocking"],"The character has acted and gained a clearer, calmer perspective.",stimulus.id,index),
    q(`${stimulus.id}-q10`,2,"comprehension","M2-U7","The extract is told mainly from","a third-person point of view focused on the central character",["first person plural","second person instructions","a newspaper reporter's voice"],"The narrator refers to the character by name and describes the character's experience.",stimulus.id,index+1),
    q(`${stimulus.id}-q11`,2,"comprehension","M2-A9","Why does the writer make small sounds seem louder at the start?","To show how anxious and alert the character feels",["To prove the setting is a concert","To show that everyone is shouting","To explain a scientific experiment"],"Heightened sound reflects the character's tension.",stimulus.id,index+2),
    q(`${stimulus.id}-q12`,2,"comprehension","M2-A10","What does the trusted person's behaviour reveal?","Patience and understanding",["jealousy and spite","carelessness and confusion","greed and dishonesty"],"The person notices the silence and offers measured support.",stimulus.id,index+3),
    q(`${stimulus.id}-q13`,2,"comprehension","M2-A13","The contrast between the beginning and ending mainly shows","emotional growth after the character chooses to act",["that the setting has moved to another country","that the problem was never important","that the narrator has changed identity"],"The character moves from being controlled by worry to acting despite it.",stimulus.id,index),
    q(`${stimulus.id}-q14`,2,"comprehension","M2-EC4","Which statement BEST describes the conflict?","The character struggles internally with fear or uncertainty",["Two armies fight over land","The character is chased by an animal","A legal case is argued in court"],"The main struggle happens within the character.",stimulus.id,index+1),
    q(`${stimulus.id}-q15`,2,"comprehension","M2-U4","The final reference to the object suggests that","the experience will remain meaningful to the character",["the object will immediately be thrown away","the entire event was a dream","the character has forgotten what happened"],"The object becomes linked to the lesson and memory.",stimulus.id,index+2),
  ];
}

function persuasiveQuestions(stimulus,index){
  const f=stimulus.facts;
  return [
    q(`${stimulus.id}-q01`,3,"comprehension","M3-U6","Who is the MAIN audience?",f.audience,["professional athletes only","foreign diplomats only","fictional characters"],"The opening sentence identifies the intended audience.",stimulus.id,index),
    q(`${stimulus.id}-q02`,3,"comprehension","M3-U4","What problem does the campaign identify?",f.problem,["a shortage of fictional stories","the colour of school uniforms","the price of concert tickets"],"The first paragraph states the concern the campaign wants addressed.",stimulus.id,index+1),
    q(`${stimulus.id}-q03`,3,"comprehension","M3-U8","Which detail is used as evidence?",f.statistic,["an unsupported rumour","a made-up character's dream","a joke unrelated to the issue"],"The statistic gives concrete support for the argument.",stimulus.id,index+2),
    q(`${stimulus.id}-q04`,3,"comprehension","M3-U6","What action does the campaign ask people to take?",f.action,["ignore the issue","wait for someone else to act","stop collecting all evidence"],"The requested action is stated directly.",stimulus.id,index+3),
    q(`${stimulus.id}-q05`,3,"comprehension","M3-EC2","Why does the campaign mention an objection?","To acknowledge a concern before responding to it",["To abandon its argument","To confuse the audience deliberately","To prove that evidence is unnecessary"],"Addressing a counterargument can make persuasion more balanced.",stimulus.id,index),
    q(`${stimulus.id}-q06`,3,"comprehension","M3-A7","How does the campaign answer the objection?",f.response,["by insulting the audience","by changing to an unrelated topic","by refusing to discuss the concern"],"The response is given directly after the objection.",stimulus.id,index+1),
    q(`${stimulus.id}-q07`,3,"comprehension","M3-A4","What benefit does the campaign expect?",f.benefit,["less information for the public","more confusion about the issue","no change at all"],"The final paragraph identifies the expected positive result.",stimulus.id,index+2),
    q(`${stimulus.id}-q08`,3,"comprehension","M3-U8","The statistic is persuasive mainly because it","provides specific evidence rather than a vague claim",["guarantees every reader will agree","replaces the need for reasoning","uses rhyme"],"Specific evidence can strengthen a persuasive claim.",stimulus.id,index+3),
    q(`${stimulus.id}-q09`,3,"comprehension","M3-A7",`The closing line “${f.slogan}” functions mainly as`,"a memorable call to action",["a technical definition","an apology for the campaign","a neutral weather report"],"The short closing line reinforces the campaign's requested action.",stimulus.id,index),
    q(`${stimulus.id}-q10`,3,"comprehension","M3-A4","The argument is organised mainly as","problem, evidence, action, objection, response and benefit",["recipe, ingredients and cooking time","setting, climax and resolution only","alphabetical definitions"],"That sequence matches the structure of the passage.",stimulus.id,index+1),
    q(`${stimulus.id}-q11`,3,"comprehension","M3-EC4","Which feature MOST improves the argument's fairness?","It recognises a reasonable objection",["It hides all opposing views","It uses only emotional insults","It avoids evidence"],"Acknowledging a concern shows awareness of another perspective.",stimulus.id,index+2),
    q(`${stimulus.id}-q12`,3,"comprehension","M3-U7","The tone of the campaign is BEST described as","practical and encouraging",["hopeless and defeated","mocking and cruel","completely indifferent"],"The message proposes action and answers concerns constructively.",stimulus.id,index+3),
    q(`${stimulus.id}-q13`,3,"comprehension","M3-A5","Which statement from the passage is MOST clearly a recommendation?",f.action,["the campaign has a title","the passage contains four paragraphs","an objection is mentioned"],"A recommendation tells the audience what it should do.",stimulus.id,index),
    q(`${stimulus.id}-q14`,3,"comprehension","M3-EC8","Which combination makes the appeal strongest?","specific evidence, a realistic action and a response to concerns",["a slogan with no details","several insults and no evidence","an unrelated story and no conclusion"],"Strong persuasion combines support, feasibility and attention to objections.",stimulus.id,index+1),
    q(`${stimulus.id}-q15`,3,"comprehension","M3-U9","The writer's MAIN purpose is to","persuade the audience to support a practical change",["entertain with a fantasy adventure","describe a landscape without making a claim","give directions to a tourist attraction"],"The passage argues for a specific action.",stimulus.id,index+2),
  ];
}

const module1Words = [
  ["essential","necessary","optional","The safety check is essential before departure."],
  ["brief","short","lengthy","The chairperson gave a brief update."],
  ["accurate","correct","incorrect","The report must contain accurate figures."],
  ["decline","decrease","increase","Attendance began to decline after the holiday."],
  ["expand","increase","reduce","The library plans to expand its services."],
  ["visible","easy to see","hidden","The warning sign should remain visible."],
  ["reliable","dependable","untrustworthy","Use a reliable source for the assignment."],
  ["frequent","common","rare","Frequent practice can improve fluency."],
  ["maintain","keep","abandon","The team must maintain the equipment."],
  ["efficient","effective with little waste","wasteful","The new system is more efficient."],
  ["temporary","short-term","permanent","The road closure is temporary."],
  ["significant","important","minor","The survey showed a significant change."],
];

function module1Discrete(seed,index){
  const [word,synonym,antonym,sentence]=seed;
  const base=`EA-O-M1-D${String(index*10+1).padStart(3,"0")}`;
  const num=n=>`EA-O-M1-D${String(index*10+n).padStart(3,"0")}`;
  return [
    q(base,1,"discrete","M1-U1",`Which option is closest in meaning to “${word}”?`,synonym,[antonym,"uncertain","decorative"],`${word} is closest in meaning to ${synonym}.`,null,index),
    q(num(2),1,"discrete","M1-U1",`Which option is OPPOSITE in meaning to “${word}”?`,antonym,[synonym,word,"similar"],`The opposite of ${word} in this context is ${antonym}.`,null,index+1),
    q(num(3),1,"discrete","M1-A5",`Read the sentence: “${sentence}” What does “${word}” mean in this context?`,synonym,[antonym,"colourful","unrelated"],"The surrounding sentence supports the stated meaning.",null,index+2),
    q(num(4),1,"discrete","M1-A1","Which sentence is grammatically correct?","The list of activities is on the noticeboard.",["The list of activities are on the noticeboard.","Each of the players have a number.","There is many reasons to practise."],"The singular subject 'list' takes the singular verb 'is'.",null,index+3),
    q(num(5),1,"discrete","M1-A2","Which sentence is punctuated correctly?","After the meeting, Ria packed her notes and left.",["After the meeting Ria, packed her notes and left.","After the meeting; Ria packed her notes, and left.","After, the meeting Ria packed her notes and left."],"An introductory phrase is correctly followed by a comma.",null,index),
    q(num(6),1,"discrete","M1-U8","A paragraph presents a difficulty, explains its causes and offers ways to address it. Which structure is being used?","problem and solution",["chronological order","definition only","alphabetical order"],"The paragraph identifies a problem and then proposes solutions.",null,index+1),
    q(num(7),1,"discrete","M1-A5","Which statement is a FACT?","The workshop began at 9:00 a.m.",["The workshop was the best event of the year.","The speaker was extremely inspiring.","The room looked more beautiful than ever."],"The starting time can be checked objectively.",null,index+2),
    q(num(8),1,"discrete","M1-A7","Which transition BEST shows contrast?","however",["therefore","for example","similarly"],"'However' signals a contrast with the previous idea.",null,index+3),
    q(num(9),1,"discrete","M1-U7","Which sentence is MOST concise?","The committee postponed the meeting because two members were absent.",["Due to the fact that two members were absent, the committee made the decision to postpone the meeting.","The committee, owing to the fact of two absent members, decided on a postponement of the meeting.","A postponement decision was made by the committee in view of the fact that there were two members who were absent."],"The sentence expresses the same idea directly with fewer unnecessary words.",null,index),
    q(num(10),1,"discrete","M1-A4","Which sentence states the MAIN idea most clearly?","Regular reading strengthens vocabulary and comprehension.",["Books come in many colours.","Some libraries close at different times.","A reader may prefer a blue chair."],"The sentence expresses a broad controlling idea rather than a minor detail.",null,index+1),
  ];
}

const module2Devices = [
  ["metaphor","The moon was a silver coin above the harbour.","comparison without 'like' or 'as'"],
  ["simile","The road curled like a ribbon through the hills.","comparison using 'like'"],
  ["personification","The old gate groaned in protest.","a non-human object is given a human action"],
  ["alliteration","Busy bees bumped beside the blossoms.","repeated initial consonant sounds"],
  ["onomatopoeia","The pan sizzled on the stove.","a word imitates a sound"],
  ["hyperbole","I waited a thousand years for the bus.","deliberate exaggeration"],
  ["irony","The fire station's sprinkler system failed during a fire drill.","a result contrasts sharply with expectation"],
  ["imagery","Warm bread scented the cool morning air.","language appeals strongly to the senses"],
  ["symbolism","The unlocked gate represented a new beginning.","an object stands for a larger idea"],
  ["foreshadowing","Dark clouds gathered as the hikers ignored the warning.","a detail hints at trouble to come"],
  ["contrast","The noisy market fell silent when the announcement began.","opposing conditions are placed together"],
  ["repetition","Run, run, run, the crowd shouted.","a word is deliberately repeated for effect"],
];

function module2Discrete(seed,index){
  const [device,example,reason]=seed;
  const num=n=>`EA-O-M2-D${String(index*10+n).padStart(3,"0")}`;
  return [
    q(num(1),2,"discrete","M2-U8",`Which literary device is used in “${example}”?`,device,["rhetorical question","euphemism","formal definition"],`The sentence uses ${device} because ${reason}.`,null,index),
    q(num(2),2,"discrete","M2-A6",`Why is the device in “${example}” effective?`,reason,["it removes all descriptive meaning","it gives a dictionary definition","it changes the sentence into an instruction"],"The effect follows from how the device works in the sentence.",null,index+1),
    q(num(3),2,"discrete","M2-EC3","A character says, “Wonderful,” after missing the last bus. The tone is MOST likely","sarcastic",["solemn","admiring","formal"],"The positive word is used to express frustration rather than genuine pleasure.",null,index+2),
    q(num(4),2,"discrete","M2-U7","Which sentence uses FIRST-PERSON narration?","I folded the letter and put it in my pocket.",["She folded the letter and put it in her pocket.","They watched him fold the letter.","You should fold the letter carefully."],"First-person narration uses 'I' or 'we'.",null,index+3),
    q(num(5),2,"discrete","M2-A2","Which sentence punctuates dialogue correctly?","“Come inside,” Mara said.",["“Come inside”, Mara said.","“Come inside” Mara, said.","“Come inside,” Mara, said."],"The comma belongs inside the closing quotation mark before the reporting clause.",null,index),
    q(num(6),2,"discrete","M2-EC2","A story follows a student who fails once, practises steadily and later succeeds. Which theme fits BEST?","persistence can lead to improvement",["wealth guarantees happiness","rules should always be ignored","friendship is impossible"],"The events show improvement through continued effort.",null,index+1),
    q(num(7),2,"discrete","M2-A10","Which detail BEST reveals a character's nervousness?","She checked the clock three times in one minute.",["She owned a blue bag.","The wall was painted cream.","Lunch was served at noon."],"Repeated clock-checking suggests anxiety or impatience.",null,index+2),
    q(num(8),2,"discrete","M2-A13","Which opening BEST creates suspense?","The key turned, but the door opened before Lena touched it.",["Lena ate breakfast at seven.","The classroom had twenty desks.","It was Tuesday morning."],"The unexplained movement of the door creates uncertainty and tension.",null,index+3),
    q(num(9),2,"discrete","M2-U4","Which statement BEST describes a symbol in literature?","An object or image that represents a larger idea",["A list of every character's age","A spelling rule used in dialogue","A factual heading above a table"],"A symbol carries meaning beyond its literal form.",null,index),
    q(num(10),2,"discrete","M2-A9","Which setting detail MOST strongly creates a peaceful mood?","Soft rain tapped the leaves while the empty lane cooled.",["Sirens screamed beside the crowded junction.","Doors slammed as people shouted.","A warning bell rang repeatedly."],"The gentle sound and quiet lane create calmness.",null,index+1),
  ];
}

const module3Techniques = [
  ["rhetorical question","Who wants to waste money on energy we do not use?","encourages the audience to consider an obvious answer"],
  ["appeal to authority","Local nurses recommend regular blood-pressure checks.","uses expert support"],
  ["statistics","Eight out of ten participants completed the programme.","uses numerical evidence"],
  ["emotive language","Do not let another child face this preventable danger.","appeals strongly to feelings"],
  ["inclusive language","Together, we can make our school safer.","creates a sense of shared responsibility"],
  ["repetition","Save water today, save water tomorrow, save water for everyone.","reinforces the central message"],
  ["call to action","Sign up before Friday and bring one friend.","tells the audience exactly what to do"],
  ["counterargument","Some say the change costs more, but bulk buying can reduce the price.","acknowledges an opposing concern and responds"],
  ["loaded language","This reckless dumping is choking our coastline.","uses strongly negative words to shape feelings"],
  ["testimonial","A local shop owner says the new system cut waste in half.","uses a person's reported experience as support"],
  ["comparison","A reusable bottle may cost more today but less than buying bottled water all month.","compares alternatives to make one seem more practical"],
  ["slogan","Refill, reuse, repeat.","uses a short memorable phrase"],
];

function module3Discrete(seed,index){
  const [technique,example,reason]=seed;
  const num=n=>`EA-O-M3-D${String(index*10+n).padStart(3,"0")}`;
  return [
    q(num(1),3,"discrete","M3-U8",`Which persuasive technique is used in “${example}”?`,technique,["understatement","chronological narration","dictionary definition"],`The statement uses ${technique} because it ${reason}.`,null,index),
    q(num(2),3,"discrete","M3-A7",`What is the MAIN effect of “${example}”?`,reason,["removes the writer's purpose","gives stage directions","changes the text into a neutral timetable"],"The effect matches the persuasive technique being used.",null,index+1),
    q(num(3),3,"discrete","M3-A5","Which statement is an OPINION?","The new park is the most attractive place in the parish.",["The park opened in June.","The survey included 240 residents.","The meeting starts at 6:00 p.m."],"The judgement about attractiveness cannot be objectively proven.",null,index+2),
    q(num(4),3,"discrete","M3-EC4","Which evidence BEST supports a call for more pedestrian crossings?","A traffic survey recorded 318 students crossing the road at the same point each morning.",["Many people like roads.","Crossings can be painted different colours.","One student prefers walking."],"The survey provides specific, relevant evidence about demand at the location.",null,index+3),
    q(num(5),3,"discrete","M3-U7","Which word is MOST emotionally loaded?","reckless",["proposal","Tuesday","committee"],"'Reckless' carries a strong negative judgement.",null,index),
    q(num(6),3,"discrete","M3-EC2","Why might a writer include a counterargument?","To show awareness of another view before answering it",["To prove the writer has no position","To remove all evidence","To avoid the topic"],"Responding to a reasonable opposing view can strengthen an argument.",null,index+1),
    q(num(7),3,"discrete","M3-U6","Which sentence is the clearest CALL TO ACTION?","Register today and attend the first session on Saturday.",["The programme began last year.","Several people attended the meeting.","The hall has fifty chairs."],"A call to action directly tells the audience what to do.",null,index+2),
    q(num(8),3,"discrete","M3-A4","Which sentence is MOST suitable for a formal persuasive letter?","I urge the council to review the crossing arrangements before the new term.",["Yo, fix the road now!","That road thing is kinda bad.","Whatever happens, happens."],"The sentence is clear, respectful and appropriately formal.",null,index+3),
    q(num(9),3,"discrete","M3-EC8","Which argument is MOST balanced?","The plan has a cost, but the evidence suggests its long-term benefits are greater.",["Anyone who disagrees is foolish.","There are no disadvantages at all.","The plan is good because I said so."],"A balanced argument recognises a limitation while weighing it against evidence.",null,index),
    q(num(10),3,"discrete","M3-U9","A writer gives evidence, answers an objection and ends with a direct request. The MAIN purpose is to","persuade",["narrate a fictional adventure","describe scenery only","define a technical term"],"The structure is designed to influence the audience toward an action or position.",null,index+1),
  ];
}

const expansionQuestions = [
  ...module1Words.flatMap(module1Discrete),
  ...module2Devices.flatMap(module2Discrete),
  ...module3Techniques.flatMap(module3Discrete),
  ...Object.values(englishAPaper1ExpansionStimuli).flatMap((stimulus,index) => {
    if(stimulus.module===1) return informativeQuestions(stimulus,index);
    if(stimulus.module===2) return literaryQuestions(stimulus,index);
    return persuasiveQuestions(stimulus,index);
  }),
];

export const englishAPaper1ExpansionQuestions = Object.freeze(expansionQuestions);

export function englishAPaper1ExpansionSummary(){
  return [1,2,3].map(module=>{
    const rows=englishAPaper1ExpansionQuestions.filter(item=>item.module===module);
    return {
      module,
      discrete:rows.filter(item=>item.kind==="discrete").length,
      comprehension:rows.filter(item=>item.kind==="comprehension").length,
      total:rows.length,
      stimuli:Object.values(englishAPaper1ExpansionStimuli).filter(item=>item.module===module).length,
    };
  });
}
