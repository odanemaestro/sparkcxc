// English A lesson examples and quick interactive checks.
// Original SPARK teaching content aligned to CXC 01/G/SYLL 25.

const e=(title,example,why)=>({title,example,why});
const q=(prompt,options,answer,feedback)=>({prompt,options,answer,feedback});

export const ENGLISH_A_LESSON_EXAMPLES = Object.freeze({
  "1.1-word-choice-grammar-meaning":{
    examples:[
      e("Word choice changes tone","The committee rejected the plan. → The committee dismissed the plan.","Dismissed sounds more forceful and may suggest the plan was not taken seriously."),
      e("Grammar changes meaning","Only Marsha submitted the form. / Marsha only submitted the form.","The position of only changes what is being limited: the person in the first sentence, the action in the second.")
    ],
    check:q("Which sentence is the clearest and most precise?",["The road was bad.","The road was rough and filled with potholes.","The road was kind of not good.","The road had some things wrong with it."],1,"Precise nouns and adjectives make the meaning clearer.")
  },
  "1.2-punctuation-paragraphing":{
    examples:[
      e("Comma for clarity","After the meeting, the prefects stayed behind.","The comma separates the introductory phrase from the main clause."),
      e("Paragraphing for focus","A report moves from the problem, to evidence, to recommendations in separate paragraphs.","Each paragraph has one clear job, making the report easier to follow.")
    ],
    check:q("Which punctuation best completes: The club needs three things ___ volunteers, tools and transport.",[",",";",":","?"],2,"A colon can introduce a list after a complete statement.")
  },
  "1.3-facts-opinions-implications":{
    examples:[
      e("Fact","The library recorded 214 visits in September.","The statement can be checked against records."),
      e("Opinion","The library is the most welcoming place on campus.","This is a judgement and depends on a person's view."),
      e("Implication","Keon checked the clock for the fourth time and moved closer to the gate.","The details imply that he is waiting impatiently or is worried about time.")
    ],
    check:q("Which statement is an opinion?",["The bus left at 7:15 a.m.","The route is 12 km long.","This is the most convenient bus route.","The ticket costs $150."],2,"Most convenient is a judgement rather than a directly verifiable measurement.")
  },
  "1.4-sequence-specific-information":{
    examples:[
      e("Sequence signal","First rinse the bottle. Next remove the label. Finally place it in the recycling bin.","Sequence words show the exact order of actions."),
      e("Specific detail","A notice says registration closes Friday at noon.","The reader should extract Friday at noon rather than vaguely saying registration closes soon.")
    ],
    check:q("Which word MOST clearly signals the final step?",["Meanwhile","However","Finally","Because"],2,"Finally marks the last stage in a sequence.")
  },
  "1.5-cause-effect-text-structures":{
    examples:[
      e("Cause and effect","Heavy rain blocked the drains, so several streets flooded.","Blocked drains are presented as a cause of flooding."),
      e("Problem and solution","The school has long lunch lines. It will test two serving stations next term.","The first sentence states the problem; the second proposes a solution.")
    ],
    check:q("A paragraph describes rising electricity costs and then gives four ways households can reduce usage. What is the main structure?",["Chronological order","Problem and solution","Comparison only","Definition"],1,"The paragraph presents a problem and possible solutions.")
  },
  "1.6-purpose-audience-informative":{
    examples:[
      e("Audience changes register","To a principal: 'I am writing to request...' / To a friend: 'Could you help me with...?'","The purpose may be similar, but the level of formality changes."),
      e("Purpose shapes selection","A safety notice gives actions and warnings, not a long history of the building.","Useful informative writing selects details that serve the reader's immediate need.")
    ],
    check:q("Which opening best suits a formal report to a school board?",["Hey everyone, here's what happened.","This report presents the findings of the library survey.","You won't believe these results!","So, basically, we asked some people."],1,"The second option clearly states purpose in an appropriate register.")
  },
  "1.7-diction-grammar-editing":{
    examples:[
      e("Remove vagueness","A lot of students had issues. → Thirty-two students reported difficulty logging in.","The revision replaces vague wording with specific information."),
      e("Concord","The list of activities is attached.","The subject is list, so the singular verb is is.")
    ],
    check:q("Which sentence is grammatically correct?",["Each of the players have a locker.","Neither the teacher nor the students was ready.","The set of keys is on the desk.","There is several reasons to wait."],2,"Set is singular, so is is correct.")
  },
  "1.8-conclusions-main-ideas-connotation":{
    examples:[
      e("Main idea","If every sentence explains how mangroves protect coastlines, protection is the main idea, not one example about fish.","A main idea covers the important supporting details."),
      e("Connotation","Confident and arrogant can describe similar behaviour but create different attitudes.","Connotation is the feeling or association carried by a word.")
    ],
    check:q("Which word has the most negative connotation?",["confident","determined","stubborn","steady"],2,"Stubborn often suggests unreasonable refusal to change.")
  },
  "1.9-visual-information-informative-writing":{
    examples:[
      e("Reading a table","If attendance rises from 40 to 65, say it increased by 25, not increased to 25.","Accurate comparison depends on distinguishing change from final value."),
      e("Summarising a graph","Instead of listing every value, identify the strongest trend and one supporting figure.","A good summary selects, compares and explains.")
    ],
    check:q("A chart rises from 20% to 35%. What is the safest statement?",["It rose by 15 percentage points.","It rose by 15%.","It doubled.","It rose by 35 percentage points."],0,"The difference between 20% and 35% is 15 percentage points.")
  },
  "2.1-language-literary-meaning":{
    examples:[
      e("Verb choice","She walked into the room. → She crept into the room.","Crept suggests caution, secrecy or fear."),
      e("Sentence length","He opened the door. Silence. Then footsteps.","Short fragments can slow attention and create tension.")
    ],
    check:q("Which verb creates the strongest sense of anger?",["said","murmured","snapped","asked"],2,"Snapped suggests a sudden, sharp response.")
  },
  "2.2-explicit-implied-literature":{
    examples:[
      e("Explicit","The narrator says, 'I was afraid to enter.'","The fear is directly stated."),
      e("Implied","The narrator stops at the door, wipes sweaty palms and listens before entering.","The details imply nervousness without naming it.")
    ],
    check:q("A character hides a report card before a parent enters. What is most reasonably implied?",["The character is proud of the grades.","The character expects a difficult reaction.","The character cannot read.","The parent already saw the report."],1,"Hiding the report suggests concern about the parent's response.")
  },
  "2.3-point-of-view-sequence":{
    examples:[
      e("First person","I watched the bus disappear around the corner.","The narrator participates directly and can reveal personal thoughts."),
      e("Third-person limited","Maya watched the bus leave and wondered whether she had made a mistake.","The narrator stays outside but follows Maya's thoughts.")
    ],
    check:q("Which line is first-person narration?",["He shut the gate.","I kept the note in my pocket.","They crossed the road.","Maya wondered why."],1,"I identifies a first-person narrator.")
  },
  "2.4-literary-devices-elements":{
    examples:[
      e("Metaphor","The city was a furnace by noon.","The city is directly compared with a furnace to stress heat."),
      e("Personification","The old gate groaned in protest.","A non-human object is given a human-like action or attitude."),
      e("Foreshadowing","Before the journey, the narrator notices that the bridge warning sign is hanging loose.","The detail may prepare the reader for later danger.")
    ],
    check:q("Which line contains personification?",["The sea was blue.","The wind slapped the shutters.","The road was long.","The child ran quickly."],1,"The wind is given the human action of slapping.")
  },
  "2.5-attitudes-values-motivation":{
    examples:[
      e("Motivation from action","A character returns a wallet even though she needs money.","The action may reveal honesty as a value stronger than immediate need."),
      e("Attitude from dialogue","'Why should I help them after what they did?'","The question suggests resentment or reluctance.")
    ],
    check:q("A character repeatedly shares food with a new student. Which trait is best supported?",["generous","careless","secretive","impatient"],0,"Repeated sharing supports generosity.")
  },
  "2.6-diction-grammar-literary-response":{
    examples:[
      e("Analytical diction","Weak: 'The writer makes it nice.' Stronger: 'The imagery creates a calm, reflective mood.'","Precise literary vocabulary makes analysis clearer."),
      e("Evidence integration","The description 'empty benches' suggests isolation.","A brief quotation is blended into the explanation rather than dropped in alone.")
    ],
    check:q("Which sentence is the strongest literary analysis?",["The writer uses words.","This part is good.","The repeated rain imagery reflects the narrator's growing sadness.","There are many techniques."],2,"It identifies a technique and explains its effect.")
  },
  "2.7-connotation-form-purpose":{
    examples:[
      e("Connotation","Calling a house 'weathered' suggests age and exposure; 'ruined' is much harsher.","Word choice shapes the reader's attitude."),
      e("Form and purpose","A diary entry can reveal private uncertainty that a public speech would hide.","Form affects what can be said and how directly.")
    ],
    check:q("Which word makes the description most sympathetic?",["skinny","frail","thin","narrow"],1,"Frail can suggest weakness and vulnerability, inviting sympathy.")
  },
  "2.8-theme-tone-mood-register-style":{
    examples:[
      e("Theme vs topic","Topic: friendship. Theme: genuine friendship often requires sacrifice.","A theme is an idea developed about a topic."),
      e("Tone vs mood","A narrator may speak sarcastically while the scene creates an uncomfortable mood.","Tone belongs to the voice; mood is the atmosphere or reader experience.")
    ],
    check:q("A narrator describes repeated setbacks with playful jokes. The tone is most likely",[ "bitter","humorous","formal","threatening"],1,"The playful jokes create a humorous attitude.")
  },
  "2.9-writers-craft-context":{
    examples:[
      e("Craft evaluation","A writer delays revealing the letter's contents until the final paragraph.","The delayed revelation can build suspense and make the ending more powerful."),
      e("Context","A migration story set during economic hardship may shape why a character leaves home.","Relevant social and historical conditions can deepen understanding of motivation.")
    ],
    check:q("Which response is evaluative rather than descriptive?",["The story uses dialogue.","The writer's brief dialogue is effective because it reveals tension without explaining it directly.","There are three characters.","The setting is a village."],1,"Evaluation makes a supported judgement about effectiveness.")
  },
  "2.10-literary-response-creative-writing":{
    examples:[
      e("Show rather than tell","Telling: 'Nia was nervous.' Showing: 'Nia folded the ticket until its edges softened in her hand.'","Specific action lets the reader infer emotion."),
      e("Controlled opening","The first paragraph establishes a problem instead of spending half the story describing the weather.","A focused opening gives the story direction quickly.")
    ],
    check:q("Which opening creates the strongest immediate story problem?",["It was a sunny day.","Jamal liked school.","The envelope on Jamal's desk was addressed in his own handwriting.","There were many trees outside."],2,"The unusual envelope creates immediate curiosity and conflict.")
  },
  "3.1-language-persuasive-meaning":{
    examples:[
      e("Loaded language","A 'bold reform' and a 'reckless experiment' may describe the same proposal.","The labels guide the audience toward different judgements."),
      e("Imperative","Protect our coast now.","The command creates urgency and directly addresses action.")
    ],
    check:q("Which phrase is most clearly loaded?",["the proposal","the reckless proposal","the written proposal","the second proposal"],1,"Reckless adds a strong negative judgement.")
  },
  "3.2-fact-opinion-implication-sequence":{
    examples:[
      e("Evidence and opinion","Fact: 72% of respondents supported the change. Opinion: the change is obviously the best choice.","Evidence can support a judgement without turning the judgement into a fact."),
      e("Argument sequence","Problem → evidence → proposed solution → response to objection.","Recognising the sequence helps you evaluate how the case is built.")
    ],
    check:q("Which is a verifiable factual claim?",["The new park is beautiful.","The park opened on 3 May.","Everyone loves the park.","The park is badly designed."],1,"The opening date can be checked against records.")
  },
  "3.3-connotation-bias-perspective":{
    examples:[
      e("Biased framing","Residents 'demanded' action versus residents 'requested' action.","Both verbs may fit the event, but demanded sounds more confrontational."),
      e("Omission","A report praises a programme's successes but never mentions its cost.","Leaving out relevant contrary information can create a one-sided impression.")
    ],
    check:q("Which headline is the most neutral?",["Lazy commuters refuse to walk","Citizens fight sensible transport plan","Residents debate proposed transport changes","Drivers attack the future"],2,"It reports the disagreement without loaded labels.")
  },
  "3.4-persuasive-devices":{
    examples:[
      e("Rhetorical question","How many more accidents must occur before the crossing is repaired?","The question pushes the audience toward urgency rather than seeking an answer."),
      e("Statistics","Seven out of ten students surveyed support later library hours.","A number can create an impression of measurable evidence, but the sample still matters."),
      e("Repetition","Safer roads for children. Safer roads for workers. Safer roads for everyone.","Repetition reinforces the central message.")
    ],
    check:q("Which technique is used in 'Act today. Act together. Act for tomorrow.'?",["repetition","understatement","pun","definition"],0,"Repeating Act creates emphasis and rhythm.")
  },
  "3.5-persuasive-essay-evidence":{
    examples:[
      e("Claim + evidence + explanation","Claim: late buses would help students. Evidence: 68% stay after 3 p.m. Explanation: transport would let them join activities without unsafe travel arrangements.","Evidence becomes persuasive when its relevance is explained."),
      e("Counterargument","Some say the plan costs too much; however, a six-week trial would show whether demand justifies the expense.","Acknowledging and answering a serious objection can strengthen credibility.")
    ],
    check:q("Which sentence is evidence rather than a claim?",["The programme should continue.","The programme is excellent.","Attendance rose from 43 to 71 students in one term.","The programme deserves support."],2,"The numerical change is verifiable evidence.")
  },
  "3.6-diction-grammar-clear-argument":{
    examples:[
      e("Logical connector","Although the change has a cost, it would reduce long-term repairs.","Although clearly signals concession."),
      e("Precise wording","Weak: 'This will help a lot.' Stronger: 'This would reduce waiting time during the morning rush.'","Specific consequences make the argument easier to evaluate.")
    ],
    check:q("Which connector best introduces a conclusion?",["However","Therefore","For example","Meanwhile"],1,"Therefore signals a conclusion or result.")
  },
  "3.7-reasoning-conclusions-main-ideas":{
    examples:[
      e("Overgeneralisation","Three students disliked the new timetable, so every student hates it.","The sample is too small to support the broad conclusion."),
      e("Cause vs sequence","Scores rose after tablets were introduced, but that alone does not prove tablets caused the increase.","Other changes may have contributed.")
    ],
    check:q("Which argument contains faulty reasoning?",["The survey included 600 students from all grades.","Two students complained, so the entire programme is a failure.","The report compares results across two terms.","The writer gives evidence for both costs and benefits."],1,"Two complaints cannot justify a conclusion about the entire programme.")
  },
  "3.8-visual-persuasion-media":{
    examples:[
      e("Visual hierarchy","A poster places 'REGISTER TODAY' in the largest type at the centre.","Size and position direct attention to the call to action."),
      e("Misleading graph","A bar chart starts its vertical axis at 95 instead of 0, making a small increase look dramatic.","Scale can visually exaggerate a difference.")
    ],
    check:q("What should you check FIRST when a persuasive graph looks dramatic?",["The writer's favourite colour","Axes, scale and units","The paper size","Whether the title rhymes"],1,"Axes and scale reveal whether the visual proportion fairly represents the data.")
  },
  "3.9-evaluative-comments-logical-argument":{
    examples:[
      e("Evaluation with criterion","The proposal is weak because it gives no cost estimate, making feasibility impossible to judge.","A useful evaluation names a criterion and explains the problem."),
      e("Ethical emotional appeal","A road-safety campaign may show the human consequences of speeding while still giving accurate crash data.","Emotion can support evidence without replacing it.")
    ],
    check:q("Which response is the strongest evaluation?",["I don't like the plan.","The plan is bad.","The plan is impractical because it requires six buses but funds only two.","Everyone knows the plan will fail."],2,"It gives a specific criterion and evidence-based reason.")
  },
  "3.10-informed-opinion-evaluating-persuasion":{
    examples:[
      e("Compare sources","Source A is recent and cites transport data; Source B is older but gives detailed resident interviews.","Credibility depends on relevance and evidence, not simply choosing one source."),
      e("Informed position","After comparing costs, safety data and community views, a writer supports a three-month trial rather than permanent adoption.","An informed opinion responds to evidence and competing perspectives.")
    ],
    check:q("Which action best supports an informed opinion?",["Read only sources that agree with you.","Compare credible sources with different perspectives.","Choose the most emotional post.","Ignore publication dates."],1,"An informed position should consider credible evidence from more than one perspective.")
  }
});

export function englishALessonExamples(topicId){
  return ENGLISH_A_LESSON_EXAMPLES[String(topicId||"")] || null;
}
