// Additional original SPARK English A Paper 02 practice sets.

const summaryRubric={marks:10,criteria:["Select the essential ideas accurately.","Use concise continuous prose in your own words.","Organise the information logically.","Use clear Standard English with accurate grammar, spelling and punctuation."]};
const expositionRubric={marks:30,criteria:["Use the required format and address the stated audience and purpose.","Select all relevant information from the stimulus.","Develop and organise ideas clearly and concisely.","Use an appropriate tone, register and vocabulary.","Use accurate Standard English, paragraphs, spelling and punctuation."]};
const literaryRubric={marks:30,criteria:["Use the stimulus or opening condition meaningfully.","Develop a coherent plot, setting, character and conflict.","Control point of view, pace and paragraphing.","Use effective descriptive and narrative language.","Use accurate Standard English; dialect may be used naturally in dialogue."]};
const persuasiveRubric={marks:30,criteria:["Take a clear position suited to the task and audience.","Develop relevant reasons with examples or evidence.","Organise the argument logically and address an opposing view where useful.","Use persuasive language and an appropriate register.","Use accurate Standard English, paragraphs, spelling and punctuation."]};

const task=(id,module,kind,title,instructions,stimulus,extra={})=>Object.freeze({id,module,kind,title,instructions,stimulus,...extra});

export const englishAPaper2ExpansionSets=Object.freeze([
  Object.freeze({
    id:"EA-P2-D",
    title:"Practice Paper D",
    description:"Youth, public spaces and changing communities",
    tasks:Object.freeze([
      task("EA-P2-D-M1-S",1,"summary","Informative summary","Read the article carefully. Write a summary in NOT MORE THAN 120 words in ONE paragraph. Use your own words as far as possible.",{
        title:"When a Community Centre Stays Open Later",
        paragraphs:[
          "A community centre in a busy town extended its closing time from 6:00 p.m. to 9:00 p.m. after residents complained that teenagers had few safe places to meet after school. The change was introduced as a three-month trial rather than a permanent decision.",
          "Attendance rose quickly, especially on Fridays. Young people used the centre for homework, basketball, music practice and computer access. Parents valued the supervised space, while volunteers noticed that students from different schools began mixing more easily.",
          "Keeping the centre open later also created costs. Electricity use increased, two additional supervisors were needed and nearby residents complained about noise when large groups left at closing time.",
          "The centre responded by moving music activities indoors after 7:30 p.m., adding a sign-out system and asking local businesses to sponsor one evening each month. At the end of the trial, the management committee decided to keep the later hours on three nights each week.",
          "The experience showed that longer opening hours can help a community, but only when supervision, cost and neighbourhood concerns are planned for from the start."
        ]
      },{wordLimit:120,rubric:summaryRubric}),
      task("EA-P2-D-M1-E",1,"exposition","Informative exposition","Write a FORMAL LETTER of approximately 250-300 words to the manager of your local community centre. Explain the need for a youth study space and recommend how it should operate.",{
        situation:["The nearest public library closes at 4:00 p.m.","Many students wait for evening transport after extra lessons.","The centre has one unused meeting room with tables and electrical outlets.","Two retired teachers have offered to supervise twice per week.","Students suggest opening the room from 4:30 p.m. to 7:30 p.m. on Tuesdays and Thursdays."],
        role:"You are the president of a youth club."
      },{wordRange:[250,300],format:"Formal letter",rubric:expositionRubric}),
      task("EA-P2-D-M2-S",2,"summary","Literary summary","Read the extract. In NOT MORE THAN 120 words, summarise the misunderstanding between the two characters and how it is resolved.",{
        title:"The Reserved Seat",
        paragraphs:[
          "Every afternoon, Mr Lewis sat in the same seat by the window. When Alana began using the library after school, she assumed the chair was simply his favourite.",
          "One rainy Tuesday she arrived first, dropped her bag on the chair and opened her laptop. Mr Lewis stopped beside the table. 'That seat is taken,' he said.",
          "Alana looked around. 'By who?'",
          "He pointed to the empty chair and frowned. Embarrassed by his tone, she gathered her things and moved. For the next week she avoided him.",
          "Then one afternoon a woman using a walking stick entered. Mr Lewis stood immediately and guided her to the window seat. 'My sister can see the bus stop from here,' he explained quietly. 'She gets anxious if she cannot watch for her ride.'",
          "Alana looked at the chair, then at him. The next day she placed a small Reserved sign on the table before he arrived."
        ]
      },{wordLimit:120,rubric:summaryRubric}),
      task("EA-P2-D-M2-C1",2,"literary","Creative writing choice 1","Write a short story of approximately 400-450 words that begins: 'By the time the power returned, nobody in the room was the same.'",null,{wordRange:[400,450],choiceGroup:"M2-creative",rubric:literaryRubric}),
      task("EA-P2-D-M2-C2",2,"literary","Creative writing choice 2","Write a short story of approximately 400-450 words in which a character receives help from the person they least expected.",null,{wordRange:[400,450],choiceGroup:"M2-creative",rubric:literaryRubric}),
      task("EA-P2-D-M3-S",3,"summary","Persuasive summary","Read the persuasive extract. In NOT MORE THAN 120 words, summarise the writer's main case and proposed safeguards.",{
        title:"Public Courts Should Stay Open After Dark",
        paragraphs:[
          "Public basketball and netball courts should remain open until 9:00 p.m. in communities where safe lighting and supervision can be provided. Closing every court at sunset removes one of the few free recreation spaces available to young people and working adults.",
          "Later hours could support exercise, organised leagues and positive social activity. They would also allow people who work or attend school during the day to use facilities their taxes already help maintain.",
          "Residents are right to worry about noise and disorder. For that reason, later opening should depend on proper lighting, posted rules, a booking schedule and an adult supervisor during organised sessions. Music should be restricted and closing times enforced.",
          "The choice is not between total freedom and total closure. A well-managed evening programme can protect neighbours while giving the wider community useful access to public space."
        ]
      },{wordLimit:120,rubric:summaryRubric}),
      task("EA-P2-D-M3-E",3,"persuasive","Persuasive article","Write an ARTICLE of approximately 300-350 words for a youth website giving your views on the statement: 'Every secondary school should provide at least one free after-school club for students.'",null,{wordRange:[300,350],format:"Article",rubric:persuasiveRubric})
    ])
  }),
  Object.freeze({
    id:"EA-P2-E",
    title:"Practice Paper E",
    description:"Technology, transport and everyday decision-making",
    tasks:Object.freeze([
      task("EA-P2-E-M1-S",1,"summary","Informative summary","Read the article carefully. Write a summary in NOT MORE THAN 120 words in ONE paragraph.",{
        title:"Why Some Commuters Choose Park-and-Ride",
        paragraphs:[
          "Park-and-ride systems allow drivers to leave their vehicles at designated sites and continue into busy town centres by bus or shuttle. They are usually introduced where traffic congestion and limited parking make central areas difficult to reach.",
          "The system can reduce the number of vehicles entering the busiest streets, lower parking demand and make travel times more predictable. It may also reduce fuel use when commuters avoid long periods of slow-moving traffic.",
          "Success depends on convenience. If the parking site feels unsafe, buses are infrequent or the total journey takes much longer than driving, commuters are unlikely to switch.",
          "Good schemes therefore provide secure parking, clear schedules and frequent service during peak hours. Some also allow one ticket to cover both parking and the shuttle.",
          "Park-and-ride is not a complete solution to congestion, but it can be useful when it fits into a wider transport plan that includes reliable public transport and safe walking routes."
        ]
      },{wordLimit:120,rubric:summaryRubric}),
      task("EA-P2-E-M1-E",1,"exposition","Informative exposition","Write a REPORT of approximately 250-300 words for your student council explaining the results below and recommending action.",{
        situation:["A survey of 420 students found that 46% travel by bus, 28% by private car, 18% walk and 8% use other methods.","Thirty-seven percent of bus users reported arriving late at least once per week.","The school gate is most congested between 7:35 a.m. and 7:50 a.m.","Two nearby bus operators are willing to discuss adjusted arrival times."],
        role:"You are the student council research officer."
      },{wordRange:[250,300],format:"Report",rubric:expositionRubric}),
      task("EA-P2-E-M2-S",2,"summary","Literary summary","Read the extract. In NOT MORE THAN 120 words, summarise why Kareem wants to sell the radio and what changes his mind.",{
        title:"Grandfather's Radio",
        paragraphs:[
          "Kareem considered the old radio useless. It occupied half a shelf, produced a faint hum and needed a careful tap before one speaker worked. When his mother suggested selling it at the community sale, he agreed immediately.",
          "On Saturday morning he carried it outside and attached a price tag. An older man stopped, smiled and asked whether it still received the regional cricket broadcast. Kareem shrugged.",
          "His grandfather, who had been arranging books nearby, answered instead. 'That radio carried the 1984 final into this house,' he said. Soon three neighbours were arguing cheerfully about who had shouted loudest that day.",
          "Kareem plugged the radio into an extension cord. Static filled the yard, then a commentator's voice broke through. His grandfather became silent.",
          "Kareem removed the price tag. 'Maybe we can sell the other things first,' he said."
        ]
      },{wordLimit:120,rubric:summaryRubric}),
      task("EA-P2-E-M2-C1",2,"literary","Creative writing choice 1","Write a short story of approximately 400-450 words ending with: 'The old photograph finally made sense.'",null,{wordRange:[400,450],choiceGroup:"M2-creative",rubric:literaryRubric}),
      task("EA-P2-E-M2-C2",2,"literary","Creative writing choice 2","Write a short story of approximately 400-450 words in which a broken object leads two people to discover something important about each other.",null,{wordRange:[400,450],choiceGroup:"M2-creative",rubric:literaryRubric}),
      task("EA-P2-E-M3-S",3,"summary","Persuasive summary","Read the persuasive extract. In NOT MORE THAN 120 words, summarise the writer's position, reasons and proposed limits.",{
        title:"Keep Cash as an Option",
        paragraphs:[
          "Businesses should be encouraged to accept digital payments, but cash should remain an option for essential goods and services. A completely cashless system may be convenient for some customers while excluding others.",
          "Digital payments can be fast, reduce the need to carry large sums and make record-keeping easier. Yet they depend on electricity, devices, networks and bank access. Service disruptions can leave customers unable to pay even when they have money available.",
          "Older people, visitors and persons without reliable banking access may also be disadvantaged. For essential services such as transport, pharmacies and basic food shops, removing cash entirely creates unnecessary risk.",
          "The sensible approach is choice. Businesses can promote secure digital payment while maintaining a reasonable cash option, especially for essential transactions."
        ]
      },{wordLimit:120,rubric:summaryRubric}),
      task("EA-P2-E-M3-E",3,"persuasive","Persuasive speech","Write a SPEECH of approximately 300-350 words to your class giving your views on the statement: 'Students should be allowed to use artificial intelligence tools for schoolwork if they explain how they used them.'",null,{wordRange:[300,350],format:"Speech",rubric:persuasiveRubric})
    ])
  }),
  Object.freeze({
    id:"EA-P2-F",
    title:"Practice Paper F",
    description:"Health, education and community responsibility",
    tasks:Object.freeze([
      task("EA-P2-F-M1-S",1,"summary","Informative summary","Read the article carefully. Write a summary in NOT MORE THAN 120 words in ONE paragraph.",{
        title:"Making School Water Stations Work",
        paragraphs:[
          "Installing drinking-water stations at school seems simple, but keeping them useful requires planning. Schools often introduce them to reduce plastic bottle waste and make safe drinking water easier to access.",
          "Location matters. A station hidden in one building may be ignored, while one placed near a busy corridor may create long queues. Maintenance is equally important because filters, taps and drains need regular attention.",
          "Students are more likely to use the stations when they trust the water quality and when bottles can be filled quickly. Clear cleaning schedules and visible inspection records can build confidence.",
          "Some schools combine the stations with reusable-bottle campaigns. This can reduce litter, but only if students can afford bottles or receive low-cost alternatives.",
          "A successful programme therefore depends not only on buying equipment but also on sensible placement, maintenance, communication and fair access."
        ]
      },{wordLimit:120,rubric:summaryRubric}),
      task("EA-P2-F-M1-E",1,"exposition","Informative exposition","Write an ARTICLE of approximately 250-300 words for the school website explaining the proposed water-station programme below and how students can help it succeed.",{
        situation:["Three refill stations will be installed next month.","Locations: canteen, science block and sports area.","Filters will be checked monthly.","Students should use reusable bottles where possible.","The Environmental Club will monitor litter and report faults using a QR form."],
        role:"You are the Environmental Club communications officer."
      },{wordRange:[250,300],format:"Article",rubric:expositionRubric}),
      task("EA-P2-F-M2-S",2,"summary","Literary summary","Read the extract. In NOT MORE THAN 120 words, summarise the conflict faced by Priya and how she resolves it.",{
        title:"The Team List",
        paragraphs:[
          "Priya had spent two weeks practising for the relay team. When the final list appeared, her name was missing. Her friend Dani was selected instead.",
          "For the rest of lunch Priya barely spoke. She knew Dani had trained hard, but disappointment turned every congratulation she heard into an irritation.",
          "After school, Coach Bennett asked Priya to help time the runners. She almost refused. Then she noticed Dani rubbing one ankle and trying not to limp.",
          "Priya finished the timing sheet, walked over and showed Dani how she had been stretching before practice. 'It helped me,' she said.",
          "Two days later the coach added Priya as reserve. She smiled at the list, but the better feeling came when Dani crossed the track and thanked her."
        ]
      },{wordLimit:120,rubric:summaryRubric}),
      task("EA-P2-F-M2-C1",2,"literary","Creative writing choice 1","Write a short story of approximately 400-450 words beginning: 'Everyone in the room heard the announcement except me.'",null,{wordRange:[400,450],choiceGroup:"M2-creative",rubric:literaryRubric}),
      task("EA-P2-F-M2-C2",2,"literary","Creative writing choice 2","Write a short story of approximately 400-450 words in which a competition produces an unexpected friendship.",null,{wordRange:[400,450],choiceGroup:"M2-creative",rubric:literaryRubric}),
      task("EA-P2-F-M3-S",3,"summary","Persuasive summary","Read the persuasive extract. In NOT MORE THAN 120 words, summarise the writer's argument and the conditions attached to the proposal.",{
        title:"Teach First Aid to Every Student",
        paragraphs:[
          "Basic first-aid training should be part of secondary education. Students spend much of their day in schools, sports facilities and public spaces where minor injuries and emergencies can occur before a trained adult reaches the scene.",
          "The goal is not to turn teenagers into medical professionals. It is to teach safe, limited actions: how to call for help, respond to choking, control simple bleeding and recognise when not to move an injured person.",
          "Training should be practical and refreshed regularly. Schools could work with health agencies or certified organisations so that students learn current procedures rather than informal advice.",
          "Time is always a concern, but a short annual session could fit into health, physical education or orientation programmes. Knowing what to do in the first few minutes of an emergency is a useful life skill, not an optional extra."
        ]
      },{wordLimit:120,rubric:summaryRubric}),
      task("EA-P2-F-M3-E",3,"persuasive","Letter to the editor","Write a LETTER TO THE EDITOR of approximately 300-350 words giving your views on the statement: 'Basic first-aid training should be compulsory for all secondary-school students.'",null,{wordRange:[300,350],format:"Letter to the editor",rubric:persuasiveRubric})
    ])
  })
]);
