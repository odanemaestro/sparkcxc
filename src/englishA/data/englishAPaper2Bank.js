// ============================================================================
// SPARK CSEC English A Paper 02 bank V1
//
// Original SPARK questions built to CXC 01/G/SYLL 25 (effective May-June 2027)
// after reviewing the user-supplied historical Paper 02 archive for task
// language, stimulus types, pacing and candidate instructions.
// ============================================================================

export const ENGLISH_A_PAPER2_DURATION_SECONDS = 165 * 60;

export const ENGLISH_A_PAPER2_MODULES = Object.freeze({
  1:"Informative Discourse",
  2:"Literary Discourse",
  3:"Persuasive Discourse",
});

const rubrics = Object.freeze({
  summary:{
    marks:10,
    criteria:[
      "Select the essential ideas accurately.",
      "Use concise continuous prose in your own words.",
      "Organise the information logically.",
      "Use clear Standard English with accurate grammar, spelling and punctuation.",
    ],
  },
  exposition:{
    marks:30,
    criteria:[
      "Use the required format and address the stated audience and purpose.",
      "Select all relevant information from the stimulus.",
      "Develop and organise ideas clearly and concisely.",
      "Use an appropriate tone, register and vocabulary.",
      "Use accurate Standard English, paragraphs, spelling and punctuation.",
    ],
  },
  literary:{
    marks:30,
    criteria:[
      "Use the stimulus or opening condition meaningfully.",
      "Develop a coherent plot, setting, character and conflict.",
      "Control point of view, pace and paragraphing.",
      "Use effective descriptive and narrative language.",
      "Use accurate Standard English; dialect may be used naturally in dialogue.",
    ],
  },
  persuasive:{
    marks:30,
    criteria:[
      "Take a clear position suited to the task and audience.",
      "Develop relevant reasons with examples or evidence.",
      "Organise the argument logically and address an opposing view where useful.",
      "Use persuasive language and an appropriate register.",
      "Use accurate Standard English, paragraphs, spelling and punctuation.",
    ],
  },
});

function task(id,module,kind,title,instructions,stimulus,extra={}) {
  return Object.freeze({id,module,kind,title,instructions,stimulus,...extra});
}

export const englishAPaper2Sets = Object.freeze([
  Object.freeze({
    id:"EA-P2-A",
    title:"Practice Paper A",
    description:"Community, culture and responsible technology",
    tasks:Object.freeze([
      task("EA-P2-A-M1-S",1,"summary","Informative summary",
        "Read the article carefully. Write a summary in NOT MORE THAN 120 words in ONE paragraph. Use your own words as far as possible and include the main points.",
        {
          title:"Community Gardens: Small Spaces, Wider Benefits",
          paragraphs:[
            "Across several Caribbean towns, community gardens are appearing on unused lots beside schools, churches and housing schemes. Some began simply as attempts to grow seasoning and vegetables, but many have become wider community projects.",
            "A well-run garden can reduce household spending by providing fresh produce close to home. It can also improve access to foods that may be expensive or difficult to find. Organisers stress, however, that a garden does not become productive merely because seeds are planted. Reliable water, suitable soil, regular maintenance and clear responsibility for shared tools are all necessary.",
            "Schools that participate often use the plots for practical lessons. Students can measure growth, compare soil conditions and observe insects. Older residents sometimes contribute knowledge about planting seasons, composting and traditional crops, so the garden becomes a place where different generations work together.",
            "There are challenges. Land may be temporary, volunteers may lose interest and theft can discourage members. Successful groups usually create a schedule, keep records and agree from the beginning how produce will be shared. Some also sell a small portion of the harvest to pay for seeds and repairs.",
            "The greatest benefit may be social. People who once passed one another without speaking begin to plan, solve problems and celebrate harvests together. The garden therefore produces more than food: it can also strengthen a sense of responsibility for the neighbourhood."
          ],
        },
        {wordLimit:120,rubric:rubrics.summary}
      ),
      task("EA-P2-A-M1-E",1,"exposition","Informative exposition",
        "Study the situation, then write a FORMAL EMAIL of approximately 250-300 words to the school principal. Explain the problem, present the relevant information and recommend practical action.",
        {
          situation:[
            "Students have complained that the school library closes at 3:00 p.m., although many students remain on campus until 4:30 p.m. for clubs and sports.",
            "A student survey found that 68% of respondents would use the library after 3:00 p.m. at least twice per week.",
            "The librarian is willing to remain until 4:30 p.m. on Tuesdays and Thursdays if one additional staff member is assigned.",
            "The student council proposes a six-week trial and will help publicise the service and collect usage data."
          ],
          role:"You are the secretary of the student council.",
        },
        {wordRange:[250,300],format:"Formal email",rubric:rubrics.exposition}
      ),
      task("EA-P2-A-M2-S",2,"summary","Literary summary",
        "Read the literary extract. In NOT MORE THAN 120 words, summarise the change in Joel's attitude and the events that cause it.",
        {
          title:"The Last Bus",
          paragraphs:[
            "Joel had complained from the moment the bus left the terminal. The seat was too narrow, the rain too loud and the journey too slow. He had wanted his mother to send money for a taxi, but she had replied with one sentence: 'Take the bus and pay attention.'",
            "At the third stop, an elderly man climbed aboard carrying two bags and a folded umbrella. No seat remained. Joel looked quickly through the wet window, pretending not to notice. Before he could settle back, a small girl across the aisle stood and offered her place.",
            "The man thanked her and sat. Ten minutes later the bus stopped suddenly. One of the girl's schoolbooks slid beneath Joel's seat. He picked it up. On the cover was the name of the same primary school his mother had attended. Inside, the girl had written a list titled 'Things Grandma says I must never forget'. The first item read: Make room for people before you make excuses for yourself.",
            "Joel stared at the sentence until the bus reached the next stop. Then he stood, lifted the man's bags and carried them to the door. When he returned to his seat, he sent his mother a message: 'I paid attention.'"
          ],
        },
        {wordLimit:120,rubric:rubrics.summary}
      ),
      task("EA-P2-A-M2-C1",2,"literary","Creative writing choice 1",
        "Write a short story of approximately 400-450 words that ends with the sentence: 'Only then did I understand why the light had been left on.'",
        null,{wordRange:[400,450],choiceGroup:"M2-creative",rubric:rubrics.literary}
      ),
      task("EA-P2-A-M2-C2",2,"literary","Creative writing choice 2",
        "Write a short story of approximately 400-450 words based on this situation: A student finds an old voice recording on a borrowed phone and must decide whether to listen to the rest of it.",
        null,{wordRange:[400,450],choiceGroup:"M2-creative",rubric:rubrics.literary}
      ),
      task("EA-P2-A-M3-S",3,"summary","Persuasive summary",
        "Read the persuasive extract. In NOT MORE THAN 120 words, summarise the writer's main arguments and proposed solution.",
        {
          title:"Give the Town Centre One Car-Free Evening",
          paragraphs:[
            "Our town centre should close its two busiest streets to private cars from 5:00 p.m. to 9:00 p.m. on the first Friday of each month. The proposal is not an attack on drivers. It is a trial that would give residents and businesses a chance to experience the centre differently.",
            "At present, people often drive through the area without stopping. A car-free evening would allow restaurants to place tables outside, musicians to perform safely and families to move between shops without competing with traffic. Similar events elsewhere have increased foot traffic for small businesses.",
            "Of course, transport must still work. Taxis, emergency vehicles and vehicles carrying persons with mobility needs should continue to have controlled access. Park-and-ride spaces could operate from the market grounds, with a shuttle every fifteen minutes.",
            "Some shop owners fear lost sales. That concern deserves evidence, not guesswork. The council should therefore run the plan for three months, collect sales and traffic data, and then decide whether it should continue. A short, measured trial is more sensible than rejecting the idea without testing it."
          ],
        },
        {wordLimit:120,rubric:rubrics.summary}
      ),
      task("EA-P2-A-M3-E",3,"persuasive","Persuasive essay",
        "Write an essay of approximately 300-350 words giving your views on the statement: 'Secondary schools should require every student to complete community service before graduation.'",
        null,{wordRange:[300,350],format:"Argumentative essay",rubric:rubrics.persuasive}
      ),
    ]),
  }),

  Object.freeze({
    id:"EA-P2-B",
    title:"Practice Paper B",
    description:"Education, environment and community choices",
    tasks:Object.freeze([
      task("EA-P2-B-M1-S",1,"summary","Informative summary",
        "Read the article carefully. Write a summary in NOT MORE THAN 120 words in ONE paragraph, using your own words as far as possible.",
        {
          title:"Why Some Schools Are Rethinking Homework",
          paragraphs:[
            "Homework has long been used to give students extra practice, but schools are increasingly examining how much work is useful and what kind of work produces real learning. A large quantity of repetitive exercises may take time without improving understanding.",
            "Teachers who redesign homework often focus on short tasks with a clear purpose. A mathematics teacher may assign three carefully chosen problems instead of twenty similar ones. An English teacher may ask students to annotate one paragraph closely rather than answer a long list of recall questions.",
            "The home environment also matters. Students do not all have the same access to devices, quiet spaces, adult help or reliable internet. When homework depends heavily on these resources, marks may reflect circumstances rather than effort or ability.",
            "This does not mean homework has no value. Reading, revision and unfinished classwork can strengthen independence. The strongest programmes explain why an assignment is being given, estimate how long it should take and allow teachers to adjust when many students struggle.",
            "Schools that review homework policies therefore ask a simple question: does the task help learning enough to justify the time it requires?"
          ],
        },
        {wordLimit:120,rubric:rubrics.summary}
      ),
      task("EA-P2-B-M1-E",1,"exposition","Informative exposition",
        "Write a REPORT of approximately 250-300 words for your school's administration based on the information below. Include findings and practical recommendations.",
        {
          situation:[
            "The school conducted a one-week waste audit.",
            "Plastic drink bottles made up 41% of visible litter.",
            "Only two recycling bins serve a campus of 900 students.",
            "Most students interviewed said they would use clearly labelled recycling bins if these were near the canteen and main courtyard.",
            "A local recycling company has offered weekly collection at no charge for a three-month trial."
          ],
          role:"You are a member of the Environmental Club.",
        },
        {wordRange:[250,300],format:"Report",rubric:rubrics.exposition}
      ),
      task("EA-P2-B-M2-S",2,"summary","Literary summary",
        "Read the extract. In NOT MORE THAN 120 words, summarise Marcia's problem, her response to it and what she finally learns.",
        {
          title:"The Recipe Book",
          paragraphs:[
            "Marcia had promised to prepare her aunt's coconut drops for Culture Day, but the old recipe book listed no oven temperature and no exact amount of milk. 'Your aunt cooked by looking,' her father said. That answer only irritated her.",
            "Her first tray spread into one giant sheet. The second became hard enough to knock against the counter. With one hour left, Marcia wanted to buy pastries and tell everyone she had changed her mind.",
            "Then her father placed a small bowl beside her. 'Taste the mixture before you bake it. Look at how it falls from the spoon. Your aunt showed me that much.'",
            "Marcia slowed down. She added milk a little at a time, compared the texture with the memory of her aunt's baking and watched the first few drops carefully in the oven.",
            "The final batch was uneven, but when her father tasted one he smiled. 'Not hers,' he said, 'but yours.' Marcia wrote the oven temperature and measurements in the margin of the old book."
          ],
        },
        {wordLimit:120,rubric:rubrics.summary}
      ),
      task("EA-P2-B-M2-C1",2,"literary","Creative writing choice 1",
        "Write a short story of approximately 400-450 words beginning with: 'The message was only four words long, but it changed the whole journey.'",
        null,{wordRange:[400,450],choiceGroup:"M2-creative",rubric:rubrics.literary}
      ),
      task("EA-P2-B-M2-C2",2,"literary","Creative writing choice 2",
        "Write a short story of approximately 400-450 words based on a picture you imagine showing an empty chair beneath a brightly lit stage.",
        null,{wordRange:[400,450],choiceGroup:"M2-creative",rubric:rubrics.literary}
      ),
      task("EA-P2-B-M3-S",3,"summary","Persuasive summary",
        "Read the persuasive extract. In NOT MORE THAN 120 words, summarise the writer's case and the safeguards proposed.",
        {
          title:"Phones Should Have a Place in Class - Not Run the Class",
          paragraphs:[
            "Schools should not treat every phone as either a perfect learning tool or an enemy. A sensible policy should allow teachers to use phones when they genuinely improve a lesson and require them to be put away at other times.",
            "Phones can provide dictionaries, cameras, calculators, recording tools and quick access to reference material. They can also interrupt concentration, encourage secret messaging and make dishonest work easier.",
            "A complete ban ignores useful technology, while unrestricted use places too much pressure on individual teachers. Schools should therefore set one clear rule: phones remain silent and stored unless a teacher explicitly authorises them for a stated activity.",
            "Students who do not own suitable devices must never be disadvantaged. Any phone-based task should have a school-provided alternative. The aim is not to put more screens in front of students; it is to use a common tool deliberately rather than carelessly."
          ],
        },
        {wordLimit:120,rubric:rubrics.summary}
      ),
      task("EA-P2-B-M3-E",3,"persuasive","Persuasive speech",
        "Your youth club is debating whether public parks should have free Wi-Fi. Write a SPEECH of approximately 300-350 words presenting your position to the club.",
        null,{wordRange:[300,350],format:"Speech",rubric:rubrics.persuasive}
      ),
    ]),
  }),

  Object.freeze({
    id:"EA-P2-C",
    title:"Practice Paper C",
    description:"Work, transport and responsible public choices",
    tasks:Object.freeze([
      task("EA-P2-C-M1-S",1,"summary","Informative summary",
        "Read the article carefully. Write a summary in NOT MORE THAN 120 words in ONE paragraph.",
        {
          title:"Learning from a School Internship",
          paragraphs:[
            "Short internships can introduce secondary students to workplaces they may otherwise know only by name. A student interested in engineering may discover that the job involves writing reports and meeting clients as well as solving technical problems.",
            "Useful placements are planned rather than improvised. Students need a supervisor, clear tasks and a chance to ask questions. Simply watching employees for a week gives limited insight. Better programmes allow students to complete small, safe tasks and reflect on what they observed.",
            "Internships can also correct unrealistic expectations. Some students discover that a career they admired does not suit them, while others notice occupations they had never considered. Both outcomes are valuable because career decisions become better informed.",
            "Transport, insurance and unequal access can make programmes difficult to organise. Schools may reduce these problems by partnering with nearby employers, rotating placements and including virtual workplace sessions where necessary.",
            "The purpose of an internship is therefore not to turn a teenager into an employee. It is to provide structured exposure that helps the student ask better questions about future study and work."
          ],
        },
        {wordLimit:120,rubric:rubrics.summary}
      ),
      task("EA-P2-C-M1-E",1,"exposition","Informative exposition",
        "Write a NOTICE AND ACCOMPANYING ARTICLE of approximately 250-300 words for students explaining a new school-bus trial. Make the information easy to follow.",
        {
          situation:[
            "The school will test two late buses for six weeks.",
            "They leave at 4:45 p.m. on Tuesdays, Wednesdays and Thursdays.",
            "Bus A serves Northside, Cedar Grove and Market Square.",
            "Bus B serves Harbour Road, Hillview and Green Acres.",
            "Students must register weekly by Monday at noon.",
            "The trial will continue only if average usage reaches at least 20 students per bus."
          ],
          role:"You are the communications prefect.",
        },
        {wordRange:[250,300],format:"Notice and article",rubric:rubrics.exposition}
      ),
      task("EA-P2-C-M2-S",2,"summary","Literary summary",
        "Read the extract. In NOT MORE THAN 120 words, summarise what causes Andre's anxiety and how his sister helps him respond.",
        {
          title:"Before the Interview",
          paragraphs:[
            "Andre had answered the practice questions perfectly the night before. Yet outside the interview room, every sentence seemed to disappear from his mind. He stared at the polished door and imagined forgetting his own name.",
            "His sister Talia sat beside him without offering advice. After a minute she asked, 'What colour is the wall?'",
            "'What?'",
            "'The wall.'",
            "Andre frowned. 'Blue.'",
            "'How many chairs?'",
            "'Six.'",
            "'What can you hear?'",
            "He listened. A printer. Footsteps. Someone laughing two rooms away.",
            "Talia nodded. 'Good. Now you're in this room instead of the disaster you invented in your head.'",
            "When Andre's name was called, he still felt nervous, but the fear had become something smaller and more exact. He stood, straightened his folder and walked through the door."
          ],
        },
        {wordLimit:120,rubric:rubrics.summary}
      ),
      task("EA-P2-C-M2-C1",2,"literary","Creative writing choice 1",
        "Write a short story of approximately 400-450 words that includes the sentence: 'Nobody had noticed the second envelope.'",
        null,{wordRange:[400,450],choiceGroup:"M2-creative",rubric:rubrics.literary}
      ),
      task("EA-P2-C-M2-C2",2,"literary","Creative writing choice 2",
        "Write a short story of approximately 400-450 words in which a character must return something valuable before anyone realises it is missing.",
        null,{wordRange:[400,450],choiceGroup:"M2-creative",rubric:rubrics.literary}
      ),
      task("EA-P2-C-M3-S",3,"summary","Persuasive summary",
        "Read the persuasive extract. In NOT MORE THAN 120 words, summarise the reasons for the proposal and how the writer answers likely objections.",
        {
          title:"Start School Fifteen Minutes Later",
          paragraphs:[
            "Our secondary school should begin at 8:15 a.m. instead of 8:00 a.m. The change is small enough to manage but large enough to reduce the morning rush that affects students travelling from distant communities.",
            "Buses often arrive within the same ten-minute period, creating congestion at the gate and leaving late students to hurry into assembly. A slightly later start would spread traffic and give students more realistic travel time.",
            "Some people argue that the school day would then end later. It does not have to. Lunch could be shortened by five minutes and two transition periods by five minutes each, preserving the current dismissal time without reducing teaching time.",
            "The school should test the change for one term and compare lateness, attendance and transport data with the previous term. If there is no improvement, the old schedule can return. A reversible trial based on evidence is better than continuing a problem simply because the timetable is familiar."
          ],
        },
        {wordLimit:120,rubric:rubrics.summary}
      ),
      task("EA-P2-C-M3-E",3,"persuasive","Letter to the editor",
        "Write a LETTER TO THE EDITOR of approximately 300-350 words giving your views on the statement: 'Local businesses should be required to provide paid work-experience places for secondary students.'",
        null,{wordRange:[300,350],format:"Letter to the editor",rubric:rubrics.persuasive}
      ),
    ]),
  }),
]);

export function englishAPaper2BankSummary() {
  return {
    sets:englishAPaper2Sets.length,
    tasksPerSet:6,
    totalBankTasks:englishAPaper2Sets.reduce((sum,set) => sum + set.tasks.length,0),
    marksPerSet:120,
    minutes:165,
    moduleMarks:{1:40,2:40,3:40},
  };
}

export function buildEnglishAPaper2(setId) {
  const set = englishAPaper2Sets.find(item => item.id === setId) || englishAPaper2Sets[0];
  return {
    ...set,
    requiredTaskIds:[
      set.tasks.find(item => item.id.endsWith("-M1-S"))?.id,
      set.tasks.find(item => item.id.endsWith("-M1-E"))?.id,
      set.tasks.find(item => item.id.endsWith("-M2-S"))?.id,
      "M2-creative-choice",
      set.tasks.find(item => item.id.endsWith("-M3-S"))?.id,
      set.tasks.find(item => item.id.endsWith("-M3-E"))?.id,
    ].filter(Boolean),
  };
}
