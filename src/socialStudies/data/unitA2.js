import { makeLesson, term, question } from "./courseHelpers";

export const UNIT_A2_LESSONS = Object.freeze([
  makeLesson({
    id:"a2-social-groups",
    sectionId:"A2",
    title:"Social groups and belonging",
    objectiveCodes:["14"],
    objectives:[
      "Explain the main types and characteristics of social groups.",
      "Classify Caribbean examples as primary, secondary, formal or informal groups."
    ],
    introduction:"Human beings live and work in groups. Some groups are close and personal, while others exist mainly to achieve a task. Understanding groups helps us explain how people develop identity, learn rules, cooperate and sometimes come into conflict.",
    noteSections:[
      {
        title:"What makes a collection of people a group?",
        paragraphs:[
          "A social group is more than people who happen to be in the same place. Members usually share some identity, purpose, pattern of interaction or set of expectations. A bus queue is a collection of people, but a school debating club has membership, goals, rules and regular interaction.",
          "Groups often have marks of identity, such as names, uniforms, colours, rituals or shared language. They may also use sanctions, which are rewards or penalties used to encourage acceptable behaviour."
        ]
      },
      {
        title:"Primary and secondary groups",
        paragraphs:[
          "Primary groups are usually small, personal and emotionally close. Families and close friendship groups are common examples. Secondary groups are usually more task-focused and less intimate, such as a school, company, professional association or sports organisation.",
          "A group can have features of more than one category. A church youth group may be formally organised but also develop close personal relationships."
        ]
      },
      {
        title:"Formal and informal groups",
        paragraphs:[
          "Formal groups have recognised structures, rules, positions and procedures. A student council has elected officers and written responsibilities. Informal groups develop more naturally through friendship or shared interests and may have unwritten rules.",
          "Membership may be voluntary, such as joining an environmental club, or involuntary, such as belonging to an age group or being assigned to a class."
        ]
      }
    ],
    examples:[
      "A close group of friends who meet after school is usually a primary and informal group.",
      "A football club registered with an association is formal because it has recognised rules and roles.",
      "A school is a secondary and formal group because it has a large membership, hierarchy, rules and specific functions."
    ],
    vocabulary:[
      term("social group","People who interact and share some identity, purpose or expectations."),
      term("primary group","A small group marked by close, personal and lasting relationships."),
      term("secondary group","A larger or task-focused group with less personal interaction."),
      term("formal group","A group with recognised rules, roles and structure."),
      term("informal group","A group that develops mainly through personal relationships rather than official rules."),
      term("sanction","A reward or penalty used to encourage conformity to group expectations.")
    ],
    keyPoints:[
      "Social groups have interaction, shared identity or common purpose.",
      "Primary/secondary and formal/informal describe different features of groups.",
      "Groups use rules, norms and sanctions to shape behaviour."
    ],
    interactive:{
      type:"sorter",
      title:"Classify the group",
      prompt:"Sort each Caribbean example by its strongest classification.",
      categories:["Primary","Secondary","Formal","Informal"],
      items:[
        {label:"A close friendship circle",category:"Primary"},
        {label:"A government ministry",category:"Formal"},
        {label:"A national teachers' association",category:"Secondary"},
        {label:"Friends who meet casually to play dominoes",category:"Informal"}
      ]
    },
    practice:[
      question("Which feature most clearly identifies a formal group?",["Recognised rules and positions","Members always live together","No common goals","Membership is always involuntary"],0,"Formal groups normally have established rules, roles and procedures."),
      question("Which is most likely a primary group?",["A close family","A large company","A government department","A national trade association"],0,"Primary groups are usually close, personal and emotionally significant.")
    ],
    exam:{
      marks:8,
      prompt:"Distinguish between a primary group and a secondary group, then give ONE Caribbean example of each and explain why it fits the category.",
      guide:[
        "State the difference in the nature of relationships or purpose.",
        "Give one clear example for each type.",
        "Explain the classification rather than only naming the group."
      ]
    }
  }),

  makeLesson({
    id:"a2-cohesion-control-interaction",
    sectionId:"A2",
    title:"Group cohesion, social control and interaction",
    objectiveCodes:["15","16","17a","17b","17c"],
    objectives:[
      "Explain what keeps groups together and how groups maintain order.",
      "Compare cooperation, competition, conflict and compromise.",
      "Design a simple observation checklist and demonstrate respectful interaction."
    ],
    introduction:"Groups survive when members can work together, accept legitimate rules and manage disagreements. Social control is not only about punishment. It includes the many ways groups encourage members to follow shared expectations.",
    noteSections:[
      {
        title:"What creates group cohesion?",
        paragraphs:[
          "Cohesion is the sense of unity that helps members remain committed to a group. Clear goals, fair leadership, communication, loyalty, cooperation and a sense of belonging can strengthen cohesion.",
          "Cohesion becomes weaker when members feel ignored, rules are applied unfairly or leadership is inconsistent. Strong cohesion does not mean members must agree on everything. Healthy groups allow respectful disagreement."
        ],
        bullets:[
          "Leadership gives direction and coordinates action.",
          "Authority gives recognised power to make decisions.",
          "Commitment encourages members to persist when tasks are difficult.",
          "Cooperation allows members to combine skills and resources."
        ]
      },
      {
        title:"Social control",
        paragraphs:[
          "Social control refers to the methods society and groups use to encourage acceptable behaviour. Informal control includes praise, disapproval, customs and peer expectations. Formal control includes written school rules, workplace policies and laws.",
          "Sanctions can be positive, such as an award, or negative, such as detention or a fine. Effective control should be fair, proportionate and consistent."
        ]
      },
      {
        title:"Interaction and conflict",
        paragraphs:[
          "Cooperation occurs when people work together toward a shared goal. Competition occurs when people or groups seek the same limited reward. Conflict involves serious disagreement or opposition. Compromise occurs when each side gives up something to reach an acceptable agreement.",
          "Respectful interaction means listening, avoiding personal attacks, recognising different viewpoints and using evidence. These habits matter in families, schools, workplaces and public life."
        ]
      },
      {
        title:"Observation as a research tool",
        paragraphs:[
          "An observation checklist lists specific behaviours that a researcher will watch for. Instead of writing 'the group worked well', a student can record observable actions such as 'members took turns speaking', 'members interrupted', or 'members completed assigned tasks'.",
          "A checklist improves consistency because the observer decides what to look for before the activity begins."
        ]
      }
    ],
    examples:[
      "A school club gives members different roles for a fundraising event and agrees on deadlines. Clear roles and cooperation support cohesion.",
      "Two sporting teams compete for a trophy, but the competition is controlled by agreed rules.",
      "Students disagree over a class project and divide the available presentation time between two ideas. This is compromise."
    ],
    vocabulary:[
      term("cohesion","The unity and commitment that help a group remain together."),
      term("social control","Methods used to encourage behaviour that follows social or group expectations."),
      term("authority","Recognised power to make decisions or give directions."),
      term("cooperation","Working together toward a shared goal."),
      term("competition","Seeking the same reward or advantage as others."),
      term("conflict","A serious disagreement or opposition between people or groups."),
      term("compromise","An agreement in which each side gives up part of what it wanted."),
      term("observation checklist","A prepared list of behaviours or events a researcher records while observing.")
    ],
    keyPoints:[
      "Cohesion grows from fair leadership, commitment, communication and cooperation.",
      "Social control can be formal or informal and can use positive or negative sanctions.",
      "Observation should focus on clear behaviours rather than vague impressions."
    ],
    interactive:{
      type:"observation-builder",
      title:"Make the observation measurable",
      prompt:"Which item belongs on an observation checklist for teamwork?",
      items:[
        {label:"Number of times members interrupt one another",good:true,reason:"This is a specific behaviour that can be observed and counted."},
        {label:"The group is terrible",good:false,reason:"This is a judgement, not an observable behaviour."},
        {label:"I dislike the leader",good:false,reason:"This records the observer's opinion rather than group behaviour."}
      ]
    },
    practice:[
      question("Which action is an example of informal social control?",["Friends showing disapproval when someone breaks a group norm","A court imposing a legal fine","Parliament passing a law","A school issuing a written suspension"],0,"Peer approval and disapproval are forms of informal social control."),
      question("Two groups settle a dispute after each changes part of its demand. This is...",["Compromise","Competition","Isolation","Socialisation"],0,"Compromise involves concessions by the parties to reach agreement.")
    ],
    exam:{
      marks:10,
      prompt:"Explain THREE factors that can strengthen group cohesion and describe ONE way a group can manage conflict without destroying cooperation.",
      guide:[
        "Choose three distinct factors and explain how each supports unity.",
        "For conflict management, use a process such as negotiation, mediation or compromise.",
        "Link the response to group goals and relationships."
      ]
    }
  }),

  makeLesson({
    id:"a2-social-institutions",
    sectionId:"A2",
    title:"Social institutions and the needs they meet",
    objectiveCodes:["18","19"],
    objectives:[
      "Identify major social institutions and describe their characteristics.",
      "Evaluate the functions that institutions perform in society."
    ],
    introduction:"Societies create lasting institutions to meet recurring needs. Family, education, religion, the economy, government and recreation all organise behaviour in different ways. An institution can refer to a set of accepted norms and practices, or to organisations that carry out those functions.",
    noteSections:[
      {
        title:"Characteristics of institutions",
        paragraphs:[
          "Institutions endure over time, influence behaviour and are built around norms and values. Organisations within institutions usually have a structure, specific functions, rules, symbols and recognised procedures.",
          "For example, education is a social institution. A particular secondary school is an organisation within that institution. Education includes wider beliefs about learning, qualifications, discipline and preparation for adult life."
        ]
      },
      {
        title:"Functions in society",
        paragraphs:[
          "Economic institutions organise production, employment, exchange and finance. Educational institutions transmit knowledge and skills. Religious institutions support worship, values and community life. Political institutions organise public decision-making. Recreational institutions support leisure, sport and social interaction.",
          "Institutions are interdependent. A school depends on families, public funding, transport, technology and the labour market. Changes in one institution can therefore affect others. In a Caribbean community, a school closure after a hurricane may also affect parents’ work schedules, transport services and youth recreation."
        ]
      }
    ],
    examples:[
      "A secondary school has a hierarchy, written rules, uniforms, ceremonies and a specific educational function.",
      "A commercial bank belongs to the economic institution and helps people save, borrow and make payments.",
      "A national sports association is a formal organisation that contributes to recreation, identity and youth development."
    ],
    vocabulary:[
      term("institution","A lasting pattern of norms, roles and organisations created to meet important social needs."),
      term("organisation","A structured group created to carry out particular functions."),
      term("norm","A shared expectation about acceptable behaviour."),
      term("hierarchy","An arrangement of positions from higher to lower levels of authority."),
      term("interdependence","A condition in which people or institutions depend on one another.")
    ],
    keyPoints:[
      "Institutions organise recurring social needs and influence behaviour.",
      "An institution is broader than one organisation.",
      "Institutions are connected, so change in one area can affect others."
    ],
    interactive:{
      type:"sorter",
      title:"Which institution?",
      prompt:"Place each activity under the institution that mainly performs it.",
      categories:["Family","Education","Economic","Political","Recreational"],
      items:[
        {label:"Teaching literacy and subject knowledge",category:"Education"},
        {label:"Organising national law-making",category:"Political"},
        {label:"Producing and exchanging goods and services",category:"Economic"},
        {label:"Providing early socialisation and care",category:"Family"},
        {label:"Organising competitive sport",category:"Recreational"}
      ]
    },
    practice:[
      question("Which feature is typical of an organisation?",["Recognised structure and rules","No purpose","No members","No pattern of behaviour"],0,"Organisations usually have structures, roles, rules and specific functions."),
      question("Why are institutions described as interdependent?",["They rely on and affect one another","They never interact","They perform identical functions","They exist only in government"],0,"Institutions are connected through people, resources and shared social needs.")
    ],
    exam:{
      marks:8,
      prompt:"Describe TWO characteristics of a social institution and explain TWO functions performed by ONE named institution in Caribbean society.",
      guide:[
        "Separate characteristics from functions.",
        "Use one institution such as education, family, religion, economy or government.",
        "Explain how each function affects society."
      ]
    }
  }),

  makeLesson({
    id:"a2-government-systems",
    sectionId:"A2",
    title:"Government systems in the Commonwealth Caribbean",
    objectiveCodes:["20a","20b"],
    objectives:[
      "Distinguish among common forms and systems of government discussed in the syllabus.",
      "Explain how constitutional arrangements affect the head of state and political authority."
    ],
    introduction:"Caribbean countries share historical links, but their constitutional arrangements are not identical. Social Studies students need to describe these systems accurately without treating one system as automatically better than another.",
    noteSections:[
      {
        title:"Constitutional monarchy and republic",
        paragraphs:[
          "In a constitutional monarchy, the monarch is head of state under a constitution, while elected political leaders exercise day-to-day governmental authority. In a republic, the head of state is not a hereditary monarch. The exact powers of a president vary according to the constitution.",
          "The important exam skill is to compare constitutional features, not to assume that the title of the head of state tells you everything about how government operates."
        ]
      },
      {
        title:"Parliamentary and other arrangements",
        paragraphs:[
          "Many Commonwealth Caribbean states use parliamentary traditions in which the executive is drawn from, and accountable to, the legislature. Constitutions define how the head of government is selected, how laws are made and how institutions relate to one another.",
          "Historical systems such as Crown Colony government help explain how colonial rule differed from modern independent constitutional government. Students should focus on the distribution of authority and representation."
        ]
      }
    ],
    examples:[
      "Two Caribbean states may both hold competitive elections while using different arrangements for the office of head of state.",
      "A written constitution can set rules for the legislature, executive, judiciary and protection of rights.",
      "Historical colonial government concentrated authority differently from modern representative systems."
    ],
    vocabulary:[
      term("government","The institutions and people authorised to make and carry out public decisions."),
      term("constitution","The fundamental rules and principles that organise government and define powers and rights."),
      term("constitutional monarchy","A system with a monarch as head of state whose role is governed by constitutional rules."),
      term("republic","A state in which the head of state is not a hereditary monarch."),
      term("head of government","The political leader who directs the work of government, often a prime minister or president depending on the system."),
      term("head of state","The person who formally represents the state under its constitutional arrangement.")
    ],
    keyPoints:[
      "Government systems should be compared by constitutional features, not slogans.",
      "Head of state and head of government are different roles in many systems.",
      "Caribbean constitutional arrangements reflect both historical inheritance and later change."
    ],
    interactive:{
      type:"compare",
      title:"Compare the constitutional features",
      prompt:"Identify the statement that accurately distinguishes a republic from a constitutional monarchy.",
      items:[
        {label:"A republic does not have a hereditary monarch as head of state",good:true,reason:"That is a core constitutional distinction."},
        {label:"A republic cannot hold elections",good:false,reason:"Republics can and commonly do hold elections."},
        {label:"A constitutional monarchy has no constitution",good:false,reason:"The term specifically describes a monarchy limited or defined by constitutional rules."}
      ]
    },
    practice:[
      question("What is the main purpose of a constitution?",["To establish fundamental rules for government and rights","To publish election advertisements","To manage one private company","To set daily weather forecasts"],0,"A constitution establishes the framework of government and often protects rights."),
      question("Which statement is accurate?",["A constitutional monarchy can have an elected parliament","Every republic has identical presidential powers","A monarchy cannot have a constitution","Government systems never change"],0,"Constitutional monarchies can operate with elected representative institutions.")
    ],
    exam:{
      marks:8,
      prompt:"Distinguish between a constitutional monarchy and a republic, then explain why the constitution is important in either system.",
      guide:[
        "State the head-of-state distinction clearly.",
        "Explain that constitutions define powers, procedures and rights.",
        "Keep the comparison descriptive rather than arguing that one system is inherently superior."
      ]
    }
  }),

  makeLesson({
    id:"a2-government-structure",
    sectionId:"A2",
    title:"The legislature, executive and judiciary",
    objectiveCodes:["21"],
    objectives:[
      "Describe the structure and functions of the three main arms of government.",
      "Explain separation of powers and why checks on authority matter."
    ],
    introduction:"Government carries out different kinds of work. The legislature makes laws, the executive develops and implements policy, and the judiciary interprets and applies the law. These functions are separated to reduce the risk of uncontrolled power.",
    noteSections:[
      {
        title:"The legislature",
        paragraphs:[
          "The legislature debates and passes laws, approves public spending and provides a forum for representation and scrutiny. In parliamentary systems, members of the government and opposition take part in legislative debate.",
          "A bill normally passes through several stages before becoming law. The exact names of stages and chambers differ among Caribbean countries."
        ]
      },
      {
        title:"The executive",
        paragraphs:[
          "The executive directs government policy and administration. It commonly includes the head of government, Cabinet and public administration. Civil servants help implement laws, deliver public services and provide administrative continuity.",
          "The executive may propose legislation, but it is still subject to constitutional limits, legislative scrutiny and judicial review where applicable."
        ]
      },
      {
        title:"The judiciary",
        paragraphs:[
          "The judiciary interprets laws, settles disputes and protects the rule of law. Courts operate at different levels. Some Caribbean states use the Caribbean Court of Justice as their final appellate court, while others retain the Judicial Committee of the Privy Council.",
          "Judicial independence means judges should decide cases according to law and evidence rather than improper political pressure."
        ]
      }
    ],
    examples:[
      "A parliament debates a proposed education law before voting on it.",
      "A ministry develops procedures and budgets to put an approved policy into operation.",
      "A court reviews a dispute about whether a public authority acted lawfully."
    ],
    vocabulary:[
      term("legislature","The arm of government responsible mainly for making laws and scrutinising public policy."),
      term("executive","The arm of government responsible mainly for directing policy and administration."),
      term("judiciary","The system of courts responsible for interpreting and applying the law."),
      term("separation of powers","The principle that major governmental powers should not be concentrated in one body."),
      term("judicial independence","The principle that judges should decide cases without improper interference."),
      term("opposition","Political representatives who are not part of the government and who scrutinise its actions.")
    ],
    keyPoints:[
      "The three arms perform different but connected constitutional functions.",
      "Separation of powers helps limit the concentration of authority.",
      "An independent judiciary supports the rule of law and fair dispute resolution."
    ],
    interactive:{
      type:"sorter",
      title:"Which arm does the job?",
      prompt:"Match each function to the arm of government mainly responsible for it.",
      categories:["Legislature","Executive","Judiciary"],
      items:[
        {label:"Debates and passes laws",category:"Legislature"},
        {label:"Implements public policy",category:"Executive"},
        {label:"Interprets laws in legal disputes",category:"Judiciary"},
        {label:"Scrutinises proposed public spending",category:"Legislature"}
      ]
    },
    practice:[
      question("Which arm of government mainly interprets laws?",["Judiciary","Executive","Legislature","Media"],0,"Courts interpret and apply laws in cases and disputes."),
      question("Why is separation of powers important?",["It reduces the concentration of government power","It allows one person to control every institution","It removes the need for courts","It prevents laws from being made"],0,"Dividing functions creates institutional checks and reduces concentrated authority.")
    ],
    exam:{
      marks:12,
      prompt:"Describe ONE function of each arm of government and explain TWO reasons why an independent judiciary is important.",
      guide:[
        "Identify legislature, executive and judiciary separately.",
        "Explain judicial independence in terms of fairness, law and protection from improper pressure.",
        "Avoid vague statements such as 'the courts are important' without explaining why."
      ]
    }
  }),

  makeLesson({
    id:"a2-government-functions-rights",
    sectionId:"A2",
    title:"Government functions, citizens' rights and public responsibility",
    objectiveCodes:["22","23"],
    objectives:[
      "Explain major functions of government.",
      "Describe the relationship between citizens and government, including rights, freedoms and responsibilities."
    ],
    introduction:"Governments raise revenue, provide services, maintain order, manage public finances and represent states internationally. Citizens, in turn, have rights and responsibilities defined by law and constitutional principles.",
    noteSections:[
      {
        title:"What governments do",
        paragraphs:[
          "Governments collect revenue through taxes and other sources, then make choices about public spending. Services may include education, health, roads, water, social protection and public safety. Governments also manage national finances, regulate aspects of economic activity, maintain international relations and defend the state.",
          "Public resources are limited. A budget therefore reflects choices among competing priorities. Social Studies students should be able to discuss trade-offs without assuming that every desirable service can be expanded at the same time."
        ]
      },
      {
        title:"Rights, freedoms and responsibilities",
        paragraphs:[
          "Rights and freedoms protect individuals from unjust treatment and support participation in society. Examples include equality before the law, freedom of expression and access to due process, subject to constitutional and legal limits.",
          "Citizens also have responsibilities, such as obeying lawful rules, respecting the rights of others, paying required taxes and participating constructively in community life."
        ]
      },
      {
        title:"Seeking redress",
        paragraphs:[
          "People may challenge public decisions through courts, complaint bodies, administrative procedures or an Ombudsman where one exists. An Ombudsman typically investigates complaints about maladministration by public authorities.",
          "Responsible participation means using evidence, lawful processes and respectful advocacy when seeking change."
        ]
      }
    ],
    examples:[
      "A government uses tax revenue to fund public clinics and schools.",
      "A resident challenges an administrative decision through an official complaint process rather than threatening a public officer.",
      "A citizen criticises a policy while also respecting another citizen's right to disagree."
    ],
    vocabulary:[
      term("taxation","Compulsory payments collected by government to finance public functions."),
      term("public service","A service provided or supported by government for the public."),
      term("human rights","Basic rights and freedoms to which people are entitled."),
      term("responsibility","A duty attached to one's role as a member of society."),
      term("redress","A remedy or correction sought after a wrong or unfair decision."),
      term("Ombudsman","An independent office that may investigate complaints about public administration.")
    ],
    keyPoints:[
      "Governments make choices about revenue, spending, services, security and international relations.",
      "Citizenship involves both rights and responsibilities.",
      "Lawful complaint and redress mechanisms help citizens hold public institutions accountable."
    ],
    interactive:{
      type:"budget-choice",
      title:"Public money has trade-offs",
      prompt:"A small council has limited funds after a storm. Which response best shows responsible public decision-making?",
      items:[
        {label:"Assess urgent needs, publish priorities and explain how funds will be allocated",good:true,reason:"It combines evidence, transparency and prioritisation."},
        {label:"Spend everything without records",good:false,reason:"Public funds require accountable decision-making."},
        {label:"Refuse to consider any competing needs",good:false,reason:"Budgets require choices among priorities."}
      ]
    },
    practice:[
      question("Which is a function of government?",["Providing public services","Choosing every citizen's career","Controlling every family decision","Eliminating all disagreement"],0,"Governments provide services and carry out public functions, but they do not control every personal decision."),
      question("What is redress?",["A remedy sought for a wrong or unfair decision","A campaign slogan","A tax rate","A census category"],0,"Redress means seeking correction or remedy through recognised processes.")
    ],
    exam:{
      marks:10,
      prompt:"Explain THREE functions of government and describe TWO responsibilities that citizens have in a democratic society.",
      guide:[
        "Explain the purpose of each government function.",
        "Use distinct citizen responsibilities.",
        "Show that rights and responsibilities operate together."
      ]
    }
  }),

  makeLesson({
    id:"a2-electoral-systems",
    sectionId:"A2",
    title:"Elections and electoral systems",
    objectiveCodes:["24"],
    objectives:[
      "Describe the main stages in an electoral process.",
      "Compare first-past-the-post and proportional representation without political advocacy."
    ],
    introduction:"Elections are formal processes through which eligible voters choose representatives or decide public questions. Electoral systems convert votes into representation in different ways. The task in Social Studies is to understand how the systems work and what trade-offs are commonly discussed.",
    noteSections:[
      {
        title:"A basic electoral process",
        paragraphs:[
          "An electoral process normally includes registration of eligible voters, nomination of candidates, campaigning, voting, counting ballots and declaration of results. Independent electoral bodies and observers can support public confidence by applying established rules.",
          "Terms such as constituency, electorate, franchise, ballot, manifesto and candidate describe different parts of the process."
        ]
      },
      {
        title:"First-past-the-post",
        paragraphs:[
          "Under first-past-the-post, a territory is divided into constituencies and the candidate with the most votes in each constituency wins the seat. A candidate does not normally need more than half of all votes if there are several candidates.",
          "Supporters of the system often point to clear constituency representation. Critics note that a party's share of seats may differ substantially from its share of votes."
        ]
      },
      {
        title:"Proportional representation",
        paragraphs:[
          "Proportional representation systems aim to make a party's or group's share of seats more closely reflect its share of votes. There are several forms of PR, so students should not assume every PR system operates in exactly the same way.",
          "Common arguments in favour include proportionality and broader representation. Common concerns include the possibility of fragmented legislatures or coalition negotiations. These are system characteristics to analyse, not instructions about which political arrangement to support."
        ]
      }
    ],
    examples:[
      "In a constituency election with three candidates, one candidate can win with the largest vote total even if that total is below 50 percent.",
      "In a PR system, seat allocation is designed to reflect vote shares more closely, though the exact formula depends on the system.",
      "An electoral commission publishes voting procedures and deadlines so that candidates and voters know the rules."
    ],
    vocabulary:[
      term("constituency","A geographical area represented by an elected member."),
      term("electorate","The people entitled to vote in an election."),
      term("franchise","The right to vote."),
      term("ballot","The method or paper used to record a vote."),
      term("manifesto","A published statement of a political party's policies and proposals."),
      term("first-past-the-post","A system in which the candidate with the most votes in a constituency wins the seat."),
      term("proportional representation","A family of electoral systems designed to allocate seats in closer relation to vote shares.")
    ],
    keyPoints:[
      "Elections follow established stages and depend on clear rules and administration.",
      "FPTP awards constituency seats to the candidate with the most votes.",
      "PR seeks closer correspondence between votes and seats, but different PR models use different rules."
    ],
    interactive:{
      type:"election-math",
      title:"Read an election result",
      prompt:"In one constituency Candidate A receives 4,800 votes, B receives 4,200 and C receives 1,000. Under first-past-the-post, who wins?",
      items:[
        {label:"Candidate A",good:true,reason:"A has the largest number of votes, so A wins the constituency under FPTP."},
        {label:"Candidate B",good:false,reason:"B has fewer votes than A."},
        {label:"No one, because nobody has 50 percent",good:false,reason:"FPTP normally requires the largest vote total, not an absolute majority."}
      ]
    },
    practice:[
      question("What is a constituency?",["An area represented by an elected member","A political advertisement","A court sentence","A tax receipt"],0,"A constituency is an electoral area represented by an elected member."),
      question("What is the main design goal of proportional representation?",["Closer correspondence between vote share and seat share","Making every constituency identical","Removing political parties","Preventing all coalitions"],0,"PR systems are designed to make representation more proportional to votes.")
    ],
    exam:{
      marks:12,
      prompt:"Compare first-past-the-post and proportional representation. Explain TWO features of each system and ONE commonly discussed advantage or disadvantage of each.",
      guide:[
        "Describe how votes are translated into seats.",
        "Present trade-offs neutrally.",
        "Do not state that one system is universally best."
      ]
    }
  }),

  makeLesson({
    id:"a2-parties-information-decisions",
    sectionId:"A2",
    title:"Political parties, information and responsible decision-making",
    objectiveCodes:["25a","25b","25c","25d","25e"],
    objectives:[
      "Describe how political parties prepare for elections.",
      "Distinguish fact, opinion and propaganda.",
      "Design tools for collecting public opinion and apply a fair decision-making process."
    ],
    introduction:"Election periods produce a flood of claims, advertisements, speeches, statistics and social-media posts. A Social Studies student should not simply absorb them. The skill is to separate evidence from opinion, identify persuasive techniques and make decisions using reliable information.",
    noteSections:[
      {
        title:"How parties prepare",
        paragraphs:[
          "Political parties may select candidates, raise funds, develop policies, prepare manifestos, organise campaigns, identify issues, communicate with voters and monitor electoral procedures. Parties also use opinion research to understand public concerns.",
          "These activities should be studied as features of political organisation, not as reasons to support a particular party."
        ]
      },
      {
        title:"Fact, opinion and propaganda",
        paragraphs:[
          "A fact is a claim that can be checked against evidence. An opinion expresses a belief, preference or judgement. Propaganda is communication designed to shape attitudes or behaviour, often using selective information, emotional language, repetition or symbols.",
          "Propaganda can contain factual statements, which is why students should evaluate the complete message rather than deciding that a message is reliable simply because one detail is true."
        ]
      },
      {
        title:"Collecting and using public opinion",
        paragraphs:[
          "A fair questionnaire should not tell respondents what to think. Questions should be neutral and the sample should be chosen carefully. A survey of only one friendship group cannot represent an entire country.",
          "Responsible decision-making involves identifying the issue, gathering relevant evidence, comparing alternatives, considering consequences, making a choice and reviewing the result."
        ]
      }
    ],
    examples:[
      "A statement such as 'the unemployment rate was X according to the national statistical agency' can be checked. 'This is a terrible result' is an opinion about the fact.",
      "A campaign image uses dramatic music and repeated slogans but gives no evidence. The emotional technique should be recognised before judging the claim.",
      "A school survey asking students which issue matters most should sample students across year groups rather than only one class."
    ],
    vocabulary:[
      term("political party","An organised group that seeks political influence and may contest elections."),
      term("candidate","A person seeking election to public office."),
      term("fact","A claim that can be checked against evidence."),
      term("opinion","A belief, preference or judgement that is not established as fact simply because it is stated."),
      term("propaganda","Persuasive communication designed to shape attitudes or behaviour, often through selective or emotional presentation."),
      term("public opinion poll","A survey designed to measure views within a population or sample.")
    ],
    keyPoints:[
      "Political parties prepare through candidate selection, policy development, organisation and communication.",
      "Facts are verifiable; opinions express judgement; propaganda is designed to persuade.",
      "Good decisions use reliable evidence and consider alternatives and consequences."
    ],
    interactive:{
      type:"fact-opinion",
      title:"Fact, opinion or persuasion?",
      prompt:"Classify each statement by its strongest feature.",
      categories:["Fact","Opinion","Propaganda"],
      items:[
        {label:"The electoral office reports that registration closes on 30 September.",category:"Fact"},
        {label:"I believe youth issues deserve more attention.",category:"Opinion"},
        {label:"Only a fool could disagree with us!",category:"Propaganda"}
      ]
    },
    practice:[
      question("Which statement is an opinion?",["The policy is the fairest choice","The report was published on Monday","The form contains four pages","Voting begins at 7 a.m."],0,"Words such as 'fairest' express a judgement unless tied to a clearly defined measure."),
      question("Why is a representative sample important in a public opinion poll?",["It reduces the risk that results reflect only one narrow group","It guarantees everyone agrees","It removes the need for questions","It turns opinions into facts"],0,"A representative sample better reflects the population being studied.")
    ],
    exam:{
      marks:12,
      prompt:"Explain how a voter can evaluate information during an election campaign. Your answer should refer to facts, opinions, propaganda and reliability of sources.",
      guide:[
        "Define or distinguish the three information types.",
        "Explain at least two source-checking methods.",
        "Focus on evaluating information, not recommending a party or candidate."
      ]
    }
  }),

  makeLesson({
    id:"a2-election-outcomes-data",
    sectionId:"A2",
    title:"Election outcomes, voter participation and data",
    objectiveCodes:["26","27","28"],
    objectives:[
      "Explain factors that can influence election outcomes and voter turnout.",
      "Interpret election tables, graphs and simple statistical evidence."
    ],
    introduction:"Election outcomes are shaped by many factors, including issues, candidates, campaign strategy, turnout, media coverage and voter attitudes. Social Studies does not require you to predict who will win an election. It requires you to interpret evidence and explain how factors may influence participation and results.",
    noteSections:[
      {
        title:"Factors affecting outcomes",
        paragraphs:[
          "Campaign issues, candidate reputation, party loyalty, economic conditions, campaign organisation, media coverage and turnout can all matter. Their importance changes from election to election and from one group of voters to another.",
          "Public opinion polls measure views at a particular time among a sample. They are not the same as election results and should be read with attention to sample, date, question wording and uncertainty."
        ]
      },
      {
        title:"Why people vote or stay home",
        paragraphs:[
          "Participation can be affected by interest in campaign issues, confidence in political institutions, party loyalty, age, education, income, accessibility, registration and whether voters believe their participation matters.",
          "Voter apathy refers to low interest or motivation to participate. It should be explained rather than simply criticised."
        ]
      },
      {
        title:"Reading election data",
        paragraphs:[
          "Always identify what the table or graph measures. Check totals, percentages, dates and whether figures refer to registered voters, ballots cast, valid votes or the whole population. These are not interchangeable.",
          "A safe seat is a descriptive term for a constituency where a party has historically won by a substantial margin. A marginal seat is one where the result has been relatively close. These labels describe past patterns and should not be treated as guarantees about future outcomes."
        ]
      }
    ],
    examples:[
      "If 60,000 people are registered and 42,000 cast ballots, turnout is based on 42,000 divided by 60,000, not on the total national population.",
      "A poll conducted months before an election describes opinions at the time of the survey; it does not establish the final result.",
      "Two constituencies can have the same winning party but very different margins of victory."
    ],
    vocabulary:[
      term("voter turnout","The proportion of eligible or registered voters who cast ballots, depending on the stated measure."),
      term("voter apathy","Low interest, concern or motivation to participate in voting."),
      term("safe seat","A descriptive label for a constituency with a history of relatively comfortable victories for one party."),
      term("marginal seat","A constituency where previous electoral results have been relatively close."),
      term("poll","A survey used to measure views among a sample at a particular time."),
      term("margin","The difference between competing vote totals or percentages.")
    ],
    keyPoints:[
      "Election outcomes reflect several interacting factors, not one simple cause.",
      "Turnout must be calculated using the correct denominator.",
      "Polls and past results are measurements, not guarantees of future outcomes."
    ],
    interactive:{
      type:"data-read",
      title:"Read the turnout table",
      prompt:"A constituency has 20,000 registered voters and 12,500 ballots cast. What is the turnout?",
      data:{headers:["Registered voters","Ballots cast"],rows:[["20,000","12,500"]]},
      items:[
        {label:"62.5%",good:true,reason:"12,500 ÷ 20,000 × 100 = 62.5%."},
        {label:"37.5%",good:false,reason:"That is the percentage who did not cast a ballot."},
        {label:"160%",good:false,reason:"A turnout percentage cannot be calculated by dividing registered voters by ballots cast."}
      ]
    },
    practice:[
      question("Which statement about an opinion poll is accurate?",["It measures views among a sample at a particular time","It is the final election result","It guarantees who will win","It includes every citizen automatically"],0,"A poll is a sampled measurement, not a certified election result."),
      question("If 8,000 of 10,000 registered voters cast ballots, turnout is...",["80%","20%","8%","125%"],0,"8,000 divided by 10,000, multiplied by 100, equals 80 percent.")
    ],
    exam:{
      marks:10,
      prompt:"Explain THREE factors that may affect voter turnout and state TWO precautions a student should take when interpreting election or polling data.",
      guide:[
        "Explain how each factor could raise or lower participation.",
        "Mention issues such as sample, date, denominator, source or question wording.",
        "Do not predict an election winner."
      ]
    }
  }),

  makeLesson({
    id:"a2-governance-citizenship",
    sectionId:"A2",
    title:"Good governance and good citizenship",
    objectiveCodes:["29","30"],
    objectives:[
      "Explain the main characteristics of good governance.",
      "Describe behaviours associated with responsible citizenship and social participation."
    ],
    introduction:"Good governance is about how public authority is exercised. It is not simply whether people agree with every government decision. It includes transparency, accountability, participation, responsiveness, respect for law and responsible use of public resources.",
    noteSections:[
      {
        title:"Characteristics of good governance",
        paragraphs:[
          "Transparency means people can access relevant information about public decisions. Accountability means officials and institutions can be required to explain their actions and face consequences for misconduct. Participation means citizens have meaningful opportunities to contribute to public life.",
          "Other important features include an independent judiciary, efficient public administration, responsiveness, consultation, prudent use of resources and respect for lawful freedom of expression."
        ]
      },
      {
        title:"Good citizenship",
        paragraphs:[
          "Responsible citizenship includes obeying laws, respecting other people's rights, protecting public property, contributing to community life and using reliable information when making civic decisions.",
          "Citizenship also includes constructive participation. People may volunteer, attend community meetings, contact public institutions, vote when eligible, join lawful organisations or advocate for change. Responsible participation does not require agreement with government; it requires lawful, informed and respectful action."
        ]
      },
      {
        title:"Accountability needs evidence",
        paragraphs:[
          "Claims about public institutions should be evaluated using evidence. Budgets, audits, court decisions, official reports, reputable journalism and properly designed research can all contribute to informed discussion.",
          "Accusations should not be treated as proven simply because they are repeated. This is especially important when discussing corruption, elections or public officials."
        ]
      }
    ],
    examples:[
      "A ministry publishes procurement information and explains how a contract was awarded. This supports transparency.",
      "A community group uses meeting minutes, photographs and a written proposal when asking a council to repair a public space.",
      "A citizen checks an official report before sharing a claim about public spending online."
    ],
    vocabulary:[
      term("good governance","The responsible exercise of public authority using principles such as accountability, transparency and participation."),
      term("transparency","Openness that allows people to access relevant information about decisions and actions."),
      term("accountability","The requirement to explain actions and accept responsibility for them."),
      term("participation","Taking part in public or community decision-making and social action."),
      term("responsiveness","The ability of institutions to recognise and address legitimate public needs."),
      term("citizenship","Membership of a state together with associated rights, duties and opportunities for participation.")
    ],
    keyPoints:[
      "Good governance concerns processes and standards, not whether everyone likes every decision.",
      "Transparency, accountability, participation and rule of law reinforce one another.",
      "Responsible citizenship combines rights with informed and respectful participation."
    ],
    interactive:{
      type:"case-choice",
      title:"Which response shows good governance?",
      prompt:"A public agency changes how it awards community grants. Which action best supports accountability?",
      items:[
        {label:"Publish the criteria, record decisions and provide a process for questions or review",good:true,reason:"Clear criteria and records make decisions easier to scrutinise."},
        {label:"Keep the criteria secret",good:false,reason:"Secrecy reduces transparency and makes scrutiny difficult."},
        {label:"Choose recipients only through personal connections",good:false,reason:"That conflicts with fairness and accountable use of public resources."}
      ]
    },
    practice:[
      question("What does transparency mean in governance?",["Relevant public information is open and accessible","Every government meeting is private","Officials never explain decisions","Citizens have no access to records"],0,"Transparency supports informed scrutiny by making relevant information accessible."),
      question("Which is an example of responsible citizenship?",["Using evidence and lawful channels to advocate for a community need","Damaging public property during a disagreement","Spreading an unverified accusation","Preventing others from expressing lawful views"],0,"Responsible citizenship combines participation with respect, evidence and lawful action.")
    ],
    exam:{
      marks:12,
      prompt:"Explain FOUR characteristics of good governance and show how TWO of them can strengthen the relationship between citizens and public institutions.",
      guide:[
        "Define each characteristic clearly.",
        "Explain practical effects such as trust, scrutiny, fairness or service delivery.",
        "Keep examples institutional and evidence-based rather than partisan."
      ]
    }
  })
]);
