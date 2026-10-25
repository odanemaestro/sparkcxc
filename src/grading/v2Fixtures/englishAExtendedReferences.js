/**
 * Authored original-task writing witnesses for English A Paper 2 modules.
 * One source-specific script per task, shared by the C1/C2 rubric variants.
 * These are positive calibration cases, NOT exhaustive marking schemes or
 * authoritative scores for unseen student writing.
 */
import {englishAPaper2Sets} from "../../englishA/data/englishAPaper2Bank";

const exposition=Object.freeze({
 A:{
  title:"Extended Library Hours Trial",
  opening:"Dear Principal,\nSubject: Proposal for a six-week school library extension\n\nAs secretary of the student council, I am writing to request a carefully supervised trial of later library opening hours. Many students remain on the school compound for clubs and sporting activities and need a quiet, reliable place to study before their journey home.",
  action:"The council recommends extending the library service on Tuesdays and Thursdays for six weeks. One additional staff member could support the librarian, oversee borrowing and supervise the room until transport arrangements begin. A simple sign-in sheet would help us identify how many students use the service, what hours are busiest and whether staffing is sufficient.",
  finish:"We would publicise the approved opening times through notices and class representatives, and share weekly attendance figures with the administration. At the end of the trial, we could compare costs, student feedback and library usage before making any lasting changes. Thank you for considering a practical way to support students' learning and safety.\n\nYours sincerely,\nStudent Council Secretary."
 },
 B:{
  title:"Campus Waste Audit and Recycling Recommendations",
  opening:"REPORT ON THE SCHOOL WASTE AUDIT\nTo: School Administration\nFrom: Environmental Club\nDate: This term\nSubject: Litter patterns and recycling action\n\nIntroduction\nThe Environmental Club reviewed the waste audit to identify the main causes of litter and ways to reduce it. The findings show that the problem is manageable if bins are placed where students already buy food and gather.",
  action:"Findings and Recommendations\n1. Place additional clearly marked recycling bins beside the canteen and in the main courtyard, with clear examples of acceptable items.\n2. Arrange weekly collection with the nearby recycling provider during the offered trial. Club members can monitor contamination and record volumes.\n3. Provide brief class demonstrations about separating bottles and other waste, while asking prefects to encourage proper disposal without punishing honest mistakes.",
  finish:"Conclusion\nThe school should review the collected material and visible litter each Friday, then report progress at assembly. Students must see that sorted waste is actually collected, otherwise confidence in the programme will fall. By gathering evidence during a three-month pilot, administrators can decide whether more permanent collection arrangements are worth the cost."
 },
 C:{
  title:"Six-week Late School Bus Trial",
  opening:"NOTICE: NEW LATE BUS TRIAL\nStudents who stay for school activities should register every Monday before noon. Two late buses will operate on selected afternoons. Please read the route details below and speak to the communications prefect if you need help planning your journey.\n\nARTICLE: Getting Home Safely After School\nStudents attending clubs or extra lessons often face transport difficulties. The school is testing a planned alternative that should reduce unnecessary waiting and give families clearer collection arrangements.",
  action:"Registration closes each Monday at noon so the transport team can check expected numbers. Students must use their correct route, report any change in plans and board promptly when called. Notices at the school gate will show the route destinations and an emergency contact, and teachers will supervise boarding when possible.",
  finish:"The communications prefects will remind classes of the schedule, answer questions and collect feedback throughout the six-week programme. It will continue only if both buses attract sufficient average use. We encourage families to help students register accurately, use the service responsibly and report any safety concerns quickly. A well-managed trial could make after-school participation easier for many students."
 },
 D:{
  title:"Proposal for Supervised Youth Study Space",
  opening:"Dear Community Centre Manager,\n\nI write as president of our youth club to request that your unused meeting room be made available as a quiet study space. Young people who finish extra lessons often wait a long time for evening transport. A supervised place to read, complete homework and charge essential devices would be safer than waiting outside.",
  action:"We propose using the room on Tuesdays and Thursdays from late afternoon until the evening departure period. The existing tables and outlets are a useful starting point. The two retired teachers who have offered to assist could supervise sessions, while club volunteers could manage attendance, arrange seating and make sure equipment is respected.",
  finish:"Please consider approving a small trial with written rules about noise, food, device use and closing time. Club members could keep attendance records and ask students and parents whether the service meets their needs. We would share the results with the centre before requesting permanent arrangements. I appreciate your consideration and hope we can meet to discuss a practical first step.\n\nYours faithfully,\nYouth Club President."
 },
 E:{
  title:"Student Travel Survey and Arrival Congestion",
  opening:"REPORT TO THE STUDENT COUNCIL\nFrom: Research Officer\nSubject: How students travel and arrive at school\n\nIntroduction\nThis report explains what our student travel survey reveals about congestion and punctuality. The school needs a measured plan, because students do not all have the same journey or control over the times at which public buses arrive.",
  action:"Findings and Recommendations\nThe busiest arrival period should be observed at the gate while prefects record delays safely. The student council recommends meeting two nearby bus operators to discuss staggered morning arrivals, with no loss of necessary transport links. Families could be sent a clear arrival guide, and the school could provide a supervised waiting space away from traffic.",
  finish:"The council should run a four-week trial and compare the number of late arrivals, bus queues and safety reports with current figures. Students who walk or travel by car should also be included, since any change affects the whole entrance area. If the figures improve, the administration could negotiate a longer arrangement. If they do not, the trial should be adjusted rather than declared successful without evidence."
 },
 F:{
  title:"Fresh Water Stations: A Better Plan for School",
  opening:"ARTICLE FOR OUR SCHOOL WEBSITE\nSafe Drinking Water Without More Plastic Waste\n\nStudents need clean drinking water during lessons and sport. Our school is planning a practical improvement: refill stations that make it easier to fill reusable bottles instead of buying another disposable drink container. Successful installation, however, must be followed by careful maintenance and fair access.",
  action:"Students can help by using clean reusable bottles whenever possible, keeping the areas around each station tidy and reporting leaks or damage promptly. Environmental Club volunteers will monitor the litter near busy collection points and show younger students how to use the online fault form. No student should be embarrassed for not owning a reusable bottle, so low-cost or shared solutions should be considered.",
  finish:"The school should post regular filter inspection records and explain who handles repairs. Students can compare waste counts before and after the launch, using the results to improve placement and access. When staff maintain the equipment and students use it responsibly, the programme can support good health, reduce rubbish and build practical environmental habits across our school."
 }
});
const positions=Object.freeze({
 A:{
  issue:"community service before graduation",
  intro:"Secondary schools should include meaningful community service before graduation, provided that the programme is fair, supervised and flexible. A student who helps at a reading programme or a neighbourhood clean-up learns more than a list of examination facts.",
  why:"Service gives young people experience in teamwork and responsibility. For example, students who organise a safe community garden learn to plan supplies, keep records and listen to residents. Those skills are useful in employment, school leadership and ordinary family life.",
  value:"A second benefit is stronger trust between a school and its surrounding community. When students contribute to approved local projects, they discover problems that adults face and can propose practical responses rather than dismissing the concerns of others.",
  counter:"Some people argue that compulsory service unfairly burdens students who have jobs, disabilities or care duties. That concern is reasonable. Schools should provide different approved activities, accessible transport and flexible hours, and should judge participation rather than how much money a family can spend.",
  end:"A modest, well-organised service requirement could support both learning and neighbourhood development. Let us offer every student a fair choice of tasks and recognise genuine effort without turning service into unpaid exploitation."
 },
 B:{
  issue:"free Wi-Fi in public parks",
  intro:"Good afternoon, fellow youth club members. I support carefully managed free Wi-Fi in public parks because digital access can help people learn, communicate and use public services without paying for another data package.",
  why:"A student waiting after a sporting event may need to contact family or check school information. Families can locate transport routes and community announcements, while small businesses can promote local events. Reliable outdoor access would help visitors who cannot afford constant mobile data.",
  value:"Access should be paired with useful public space, not treated as a replacement for it. Parks still need lighting, safe paths, benches and clean facilities. A community network can share notices about activities and emergencies while preserving the park's main purpose.",
  counter:"Others may argue that a public connection creates privacy risks and encourages excessive screen time. These are valid concerns. The council should install filtering suitable for a shared network, avoid collecting unnecessary personal data, provide clear usage guidance and maintain healthy offline activities.",
  end:"I urge this club to recommend a small supervised trial, with published running costs and a way for park users to report problems. Free access is worthwhile only when security, fairness and upkeep receive as much attention as installation. Thank you."
 },
 C:{
  issue:"paid work-experience placements for secondary students",
  intro:"Dear Editor,\n\nLocal businesses should help secondary students gain real workplace experience. I support offering paid, supervised placements where employers can provide them safely, rather than requiring every small business to accept students without sufficient resources.",
  why:"Students learn important habits through real tasks such as communicating with customers, keeping accurate records and solving problems as part of a team. A modest payment recognises their time and helps cover transport or lunch costs, making access less dependent on family finances.",
  value:"Businesses can benefit too. A clear placement programme allows employers to introduce young people to careers and identify future trainees. Schools should agree on suitable duties, training hours and a contact person so that placements are educational and not simply an excuse for cheap labour.",
  counter:"Some owners will argue that a rigid legal requirement imposes costs on firms with very few workers. That objection matters. Governments and schools could provide wage support for small firms, offer shared placements and introduce safety checks before students begin.",
  end:"We should encourage paid opportunities while protecting both learners and businesses. A realistic standard, public incentives and careful supervision would widen opportunity more fairly than a rule that ignores the capacity of individual employers.\n\nYours faithfully,\nA Concerned Student."
 },
 D:{
  issue:"free after-school clubs at every secondary school",
  intro:"After-school activities should not be a privilege only for students who can pay. Every secondary school ought to offer at least one free, supervised club, with options that reflect the interests and circumstances of its students.",
  why:"Clubs help learners discover talents beyond examination subjects. A debating group builds speaking skills, a sports club strengthens teamwork and an environmental project teaches planning. Students also benefit from structured activities while they wait for family transport.",
  value:"Free entry supports fairness. Students whose families cannot afford private music lessons or sports fees should still have a place to grow in confidence. Schools can use existing rooms, volunteer mentors and suitable partnerships to offer worthwhile activities without expensive equipment.",
  counter:"Critics may argue that teachers already have heavy workloads and schools cannot fund new programmes. This concern should shape the design. Clubs could operate once a week, rotate activities and use trained community partners, without making unpaid overtime compulsory for teachers.",
  end:"A simple free club is a realistic starting point. Schools should measure attendance, student feedback and staffing needs, then improve the programme. A stronger community begins when we give every student somewhere constructive to belong."
 },
 E:{
  issue:"artificial intelligence tools in student schoolwork",
  intro:"Good morning, classmates. I believe students should be allowed to use artificial intelligence tools for schoolwork only when they clearly explain how they used them and can demonstrate their own understanding.",
  why:"Responsible tools can suggest practice questions, clarify unfamiliar terms and help a learner plan a revision timetable. Used in this way, technology supports learning rather than replacing the difficult work of reading, checking sources and thinking independently.",
  value:"Transparency matters because teachers need to know which ideas and words a student produced. A simple note explaining the tool, the prompt and any changes would help teachers ask fair follow-up questions. Students should check claims against textbooks and dependable sources before submitting work.",
  counter:"Some people argue that all use should be banned because the technology can produce convincing wrong answers or copied assignments. That risk is serious. Schools should prohibit submitting generated paragraphs as original work, teach citation habits and provide comparable alternatives for students without devices or internet access.",
  end:"Let us support honest, limited use with clear classroom rules. Learning should remain the student's achievement. If we explain our use, verify the information and defend our decisions, new tools can become helpful assistants rather than hidden substitutes for effort. Thank you."
 },
 F:{
  issue:"compulsory first-aid education for secondary students",
  intro:"Dear Editor,\n\nBasic first-aid education should be part of secondary schooling. Students spend time on sports fields, in classrooms and on public transport, where an emergency may occur before an adult with specialised training arrives.",
  why:"Knowing how to seek assistance, communicate clearly and control simple bleeding can protect someone while professional care is arranged. Students also need to know their limits, including why moving an injured person without guidance can cause further harm.",
  value:"Practical teaching builds confidence through safe rehearsal. Schools could invite certified trainers for brief annual sessions, demonstrate how to contact emergency services and explain when to step back. Refresher lessons would be more useful than memorising instructions once and forgetting them.",
  counter:"Some critics argue that the timetable is already full. Their concern deserves consideration, but short sessions could fit into physical education, health or orientation programmes. Training must use current advice, suitable equipment and clear boundaries instead of expecting children to act as medical professionals.",
  end:"We should equip students to respond calmly and safely, not encourage risky heroics. A modest national training standard, supported by trained providers, would give young people a useful life skill and strengthen the safety of our communities.\n\nYours sincerely,\nA Student."
 }
});
const storyPlots=Object.freeze({
 A:{opening:"The last light at the end of the lane",lead:"Maya",setting:"her grandmother's house beside the fishing beach",problem:"a storm threatened to flood the narrow road, and her younger brother was missing after football practice",effort:"She called neighbours, checked the shelter and followed the sound of his whistle through the rain",discovery:"The lamp marked the steps to the raised community shelter, where her brother was helping an elderly neighbour to safety",ending:"Only then did I understand why the light had been left on."},
 B:{opening:"The message was only four words long, but it changed the whole journey.",lead:"Daniel",setting:"the bus station on a rainy Saturday",problem:"his sister's message said that their mother was at the clinic, and the last express bus was leaving",effort:"He asked the driver to stop at the nearby health centre and helped another passenger find the correct road",discovery:"His mother was not injured; she had volunteered to organise medicine for flood victims, and his sister needed him to collect supplies",ending:"He learned that frightening messages should be checked before fear determines every decision."},
 C:{opening:"Nobody had noticed the second envelope.",lead:"Nia",setting:"the school hall during prize-giving",problem:"a scholarship envelope had been placed with another student's name, leaving her friend distraught",effort:"She examined the printed list, asked the secretary for help and resisted spreading rumours about the error",discovery:"The second envelope contained the corrected notice, and both students had earned different awards for their work",ending:"The applause felt warmer because the confusion had been solved without accusing anyone."},
 D:{opening:"By the time the power returned, nobody in the room was the same.",lead:"Andre",setting:"the parish library on examination-preparation evening",problem:"a power cut trapped a frightened younger student in the stairwell while the building's alarm sounded",effort:"Andre used his phone torch, asked the librarian for safe directions and kept talking calmly to the child",discovery:"The lights returned as the child reached the open lobby, and strangers who had rushed past each other were now cooperating",ending:"Andre went home understanding that courage can be quiet, deliberate and shared."},
 E:{opening:"The old photograph lay beneath the clock.",lead:"Kareem",setting:"his grandfather's workshop",problem:"his family planned to sell a worn wooden boat without knowing why his grandfather refused to discuss it",effort:"He repaired an old drawer, found a photograph with a handwritten date and asked his grandmother about the people beside the shore",discovery:"The boat had carried rescued neighbours to safety in a historic flood, and his grandfather had been too modest to tell the story",ending:"The old photograph finally made sense."},
 F:{opening:"Everyone in the room heard the announcement except me.",lead:"Priya",setting:"the crowded school auditorium",problem:"she was absorbed in her notes and missed an unexpected change to the debate competition's order",effort:"She watched her teammates, requested the revised schedule and prepared a different opening argument without blaming the organisers",discovery:"When her name was called, she faced the audience with a calmer speech and helped a nervous teammate complete the next round",ending:"For the first time, Priya valued listening as much as speaking."}
});
const paragraphs=s=>String(s||"").trim().split(/\n\s*\n/).filter(Boolean);
function expositionAnswer(letter,task){
 const plan=exposition[letter];
 const data=(task.stimulus?.situation||[]).map((statement,i)=>"The "+(i===0?"initial finding":"source information")+" is clear: "+statement).join(" ");
 return [plan.opening,
  "The student council has checked the circumstances carefully. "+data+
  " These details are important because a successful plan must respond to what students actually experience, not only to what sounds convenient in a meeting.",
  plan.action,plan.finish].join("\n\n");
}
function persuasiveAnswer(letter){
 const p=positions[letter];
 return [p.intro,p.why,p.value,p.counter,p.end].join("\n\n");
}
function literaryAnswer(letter){
 const p=storyPlots[letter],lead=p.lead,theme=p.problem;
 const initial=p.opening.endsWith(".")?p.opening:p.opening+".";
 const opening=letter==="A"?"I saw "+p.opening.toLowerCase()+" as I hurried towards "+p.setting+".":initial;
 const sections=[
 opening+" "+lead+" had expected an ordinary afternoon at "+p.setting+", but a small detail refused to leave her thoughts. The sky had changed colour and the air was heavy with the smell of wet pavement. She was already worrying about "+theme+". It was the kind of problem that made every passing minute seem longer than it really was.",
 "At first, "+lead+" tried to pretend that everything would solve itself. She watched people cross the road, listened to voices drifting from nearby houses and checked the time again. 'There must be a sensible way to handle this,' she whispered. Instead of running without a plan, she decided to gather information and ask someone trustworthy for help. The decision felt small, but it gave her a place to begin.",
 "Then the situation became more urgent. "+p.effort+". She could hear quick footsteps behind her and the distant sound of traffic as people tried to avoid the gathering weather. One adult was impatient, another offered calm directions, and nobody seemed to have quite the same version of events. 'Please tell me what you actually saw,' "+lead+" asked. The answers were imperfect, yet they helped her work out what needed attention first.",
 "She made a careful choice: stay close to the people who could help, listen before reacting and avoid making promises she could not keep. A mistake would have been easy at that moment. It was tempting to believe the loudest rumour, but she remembered how misunderstandings could hurt the people they were meant to protect. She kept moving, stopping only to check that everyone nearby knew where to go.",
 "The truth finally emerged: "+p.discovery+". For several seconds "+lead+" said nothing. Her hands were shaking from the effort of the afternoon, yet she began to understand that what had looked like confusion was also an opportunity for people to act together. The people around her exchanged relieved smiles. Even the sound of the rain seemed less threatening once the immediate danger had passed.",
 "Later she thought about the choices that had brought her there. She had been frightened, but asking questions and staying with others had made a real difference. She could not change everything that happened, and she had no perfect words for what she felt. What mattered was that she had learned to notice the people standing quietly beside her. "+p.ending
 ];
 return sections.join("\n\n");
}
export const ENGLISH_A_EXTENDED_REFERENCES=Object.freeze(Object.fromEntries(
 englishAPaper2Sets.flatMap(set=>{
  const letter=set.id.replace("EA-P2-","");
  return set.tasks.filter(t=>t.id===set.id+"-M1-E"||
   t.id===set.id+"-M2-C1"||t.id===set.id+"-M3-E")
   .map(t=>[t.id,Object.freeze({
    response:t.kind==="exposition"?expositionAnswer(letter,t):
     t.kind==="literary"?literaryAnswer(letter):persuasiveAnswer(letter),
    kind:t.kind,taskId:t.id
   })]);
 })
));
