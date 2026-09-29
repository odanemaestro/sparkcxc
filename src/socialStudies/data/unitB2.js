import { makeLesson, term, question, VISUAL_SOURCES, COMMON_SOURCES } from "./courseHelpers";

export const UNIT_B2_LESSONS = Object.freeze([
  makeLesson({
    id:"b2-caribbean-location",
    sectionId:"B2",
    title:"Locating the Caribbean and its territorial groupings",
    objectiveCodes:["19","20"],
    objectives:[
      "Locate the Caribbean in relation to major surrounding landmasses and bodies of water.",
      "Identify major Caribbean territorial groupings and selected states and territories."
    ],
    introduction:"The Caribbean is both a geographical region and a space shaped by history, language, politics and economic relationships. Being able to read a Caribbean map is therefore a basic Social Studies skill, not just a Geography exercise.",
    noteSections:[
      {
        title:"Where is the Caribbean?",
        paragraphs:[
          "The Caribbean lies mainly between North and South America, around the Caribbean Sea and nearby Atlantic waters. The region includes island states and territories as well as mainland countries with strong Caribbean historical and institutional connections.",
          "Location matters because distance, shipping routes, climate, hazards and access to markets influence development."
        ]
      },
      {
        title:"Common territorial groupings",
        paragraphs:[
          "The Greater Antilles include the larger islands of Cuba, Hispaniola, Jamaica and Puerto Rico. The Lesser Antilles form the long island chain to the east and southeast. The Bahamas and Turks and Caicos are part of the Lucayan Archipelago in the Atlantic.",
          "Political and regional organisations use groupings that do not always match purely physical geography. For example, CARICOM includes mainland states such as Belize, Guyana and Suriname."
        ]
      },
      {
        title:"Use maps carefully",
        paragraphs:[
          "Always use the title and key before interpreting a map. A political map shows boundaries and names, while a physical map may show relief or natural features. A thematic map may show one issue, such as population, rainfall or tourism.",
          "Location questions should use direction, neighbouring territories and surrounding water bodies rather than vague statements such as 'it is near the sea'."
        ]
      }
    ],
    examples:[
      "Jamaica lies south of Cuba and west of Hispaniola.",
      "Trinidad and Tobago lies close to the northeastern coast of South America.",
      "Belize is on the Central American mainland but has strong institutional and cultural links with the Caribbean."
    ],
    vocabulary:[
      term("Greater Antilles","The larger island group including Cuba, Hispaniola, Jamaica and Puerto Rico."),
      term("Lesser Antilles","The chain of smaller islands extending from the Virgin Islands toward Trinidad."),
      term("archipelago","A group or chain of islands."),
      term("territory","An area under the jurisdiction of a state or political authority."),
      term("thematic map","A map designed to show a particular topic or pattern.")
    ],
    keyPoints:[
      "The Caribbean includes island and mainland societies.",
      "Physical-geography groupings and political-institutional groupings are not always identical.",
      "Map interpretation begins with title, key, direction and scale."
    ],
    visual:VISUAL_SOURCES.caribbeanBlankMap,
    interactive:{
      type:"map-spotter",
      title:"Caribbean map challenge",
      prompt:"Use the sourced blank map to practise relative location and regional groupings.",
      items:[
        {label:"Which country lies south of Cuba and west of Hispaniola?",answer:"Jamaica"},
        {label:"Which twin-island state lies close to Venezuela?",answer:"Trinidad and Tobago"},
        {label:"Which CARICOM state lies on the Central American mainland?",answer:"Belize"}
      ]
    },
    practice:[
      question("Which is part of the Greater Antilles?",["Jamaica","Barbados","Grenada","St Lucia"],0,"Jamaica is one of the larger islands of the Greater Antilles."),
      question("Why is Belize included in Caribbean regional studies even though it is on the mainland?",["It has strong historical, cultural and institutional Caribbean links","It is an island","It is east of Barbados","It is part of the Lesser Antilles"],0,"Regional identity is not based only on island geography.")
    ],
    exam:{
      marks:8,
      prompt:"Using a map of the Caribbean, describe the relative location of Jamaica, Trinidad and Tobago and Belize. Then explain ONE reason why regional groupings are not based only on physical geography.",
      guide:[
        "Use directional language and nearby land or water features.",
        "Explain historical, cultural or institutional connections.",
        "Do not confuse the Greater Antilles with the Lesser Antilles."
      ]
    },
    sources:[COMMON_SOURCES.caricom]
  }),

  makeLesson({
    id:"b2-measuring-development",
    sectionId:"B2",
    title:"What development means and how it is measured",
    objectiveCodes:["21"],
    objectives:[
      "Explain development as more than economic growth.",
      "Use economic, social and human-development indicators to compare conditions."
    ],
    introduction:"A country can produce more goods and services without every person's quality of life improving at the same rate. Development therefore needs more than one measure.",
    noteSections:[
      {
        title:"Economic indicators",
        paragraphs:[
          "Gross Domestic Product measures the value of final goods and services produced within a country over a period. Per capita measures divide an aggregate such as GDP by population to provide an average. Cost of living refers to the expense of maintaining a particular standard of living.",
          "Economic indicators are useful, but national averages can hide inequality and differences between communities."
        ]
      },
      {
        title:"Social indicators",
        paragraphs:[
          "Education, literacy, life expectancy, infant mortality and access to services help show whether people are benefiting from development. A country with rising income but poor access to health or education still faces major development challenges.",
          "Indicators should be compared using the same definition and similar time periods."
        ]
      },
      {
        title:"Human Development Index",
        paragraphs:[
          "The Human Development Index combines measures related to health, education and income into one summary indicator. It is useful for broad comparison, but it cannot capture every aspect of well-being, inequality, security or environmental quality.",
          "Strong Social Studies analysis uses several indicators and explains their limitations."
        ]
      }
    ],
    examples:[
      "Two countries may have similar income per person but different life expectancy or education outcomes.",
      "A rise in GDP does not automatically show how income is distributed among households.",
      "A community may experience development through improved water access even if that change is not obvious from national GDP alone."
    ],
    vocabulary:[
      term("development","Improvement in economic and social conditions and people's capabilities and quality of life."),
      term("GDP","The value of final goods and services produced within a country over a specified period."),
      term("per capita","Per person; calculated by dividing a total by the population."),
      term("cost of living","The cost of goods and services needed to maintain a particular standard of living."),
      term("Human Development Index","A composite indicator combining dimensions of health, education and income."),
      term("indicator","A measurable variable used to show a condition or trend.")
    ],
    keyPoints:[
      "Development includes economic and social dimensions.",
      "One national average cannot describe every person's experience.",
      "Using several indicators gives a more complete picture."
    ],
    interactive:{
      type:"data-read",
      title:"Which country is more developed?",
      prompt:"Country A has higher income per person. Country B has longer life expectancy and higher school completion. What is the strongest conclusion?",
      data:{headers:["Indicator","Country A","Country B"],rows:[["Income per person","Higher","Lower"],["Life expectancy","Lower","Higher"],["School completion","Lower","Higher"]]},
      items:[
        {label:"The evidence is mixed, so development should be judged using several indicators",good:true,reason:"Different indicators point in different directions."},
        {label:"Country A must be better in every way",good:false,reason:"Higher income does not automatically mean stronger outcomes on every social measure."},
        {label:"Social indicators never matter",good:false,reason:"Health and education are important dimensions of development."}
      ]
    },
    practice:[
      question("Why is GDP per capita limited as a development measure?",["It is an average and can hide inequality and non-income conditions","It measures every aspect of life perfectly","It shows individual income exactly","It includes no economic information"],0,"Per capita figures are averages and do not show distribution or every aspect of well-being."),
      question("Which is a social development indicator?",["Life expectancy","Exchange-rate symbol","Party colour","Longitude"],0,"Life expectancy reflects health conditions and population well-being.")
    ],
    exam:{
      marks:10,
      prompt:"Explain why development should be measured using both economic and social indicators. Give TWO examples of each type and state ONE limitation of relying on a single indicator.",
      guide:[
        "Separate economic from social measures.",
        "Explain what each type reveals.",
        "Show why one measure cannot describe the whole development picture."
      ]
    },
    sources:[COMMON_SOURCES.undp,COMMON_SOURCES.worldBank]
  }),

  makeLesson({
    id:"b2-industries-ict",
    sectionId:"B2",
    title:"Industries, services and information technology",
    objectiveCodes:["22","23"],
    objectives:[
      "Explain the contribution of major industries to Caribbean development.",
      "Assess how information and communication technology can support development."
    ],
    introduction:"Caribbean economies combine agriculture, mining, manufacturing, tourism, finance, transport, creative industries and a growing range of digital services. Development depends not only on what a country produces, but also on productivity, skills, infrastructure and access to markets.",
    noteSections:[
      {
        title:"How industries contribute",
        paragraphs:[
          "Industries create employment, produce goods and services, earn foreign exchange, generate tax revenue and support other businesses. Agriculture can support food security and exports. Manufacturing adds value to raw materials. Tourism supports accommodation, transport, entertainment and food services.",
          "Dependence on a narrow range of industries can increase vulnerability to external shocks."
        ]
      },
      {
        title:"ICT as an enabling resource",
        paragraphs:[
          "Information and communication technology can reduce distance, improve access to markets, support online learning, make government services more efficient and enable remote work. Businesses can reach customers outside their home territory without opening a physical branch in every country.",
          "Benefits depend on reliable electricity, internet access, digital skills, cybersecurity and affordability."
        ]
      },
      {
        title:"Productivity and value added",
        paragraphs:[
          "Economic development can improve when Caribbean firms move from exporting raw materials to producing higher-value goods or services. Branding, design, technology, processing and specialised knowledge can increase value.",
          "This does not mean every country should produce everything. Regional trade can allow countries to specialise while sharing markets."
        ]
      }
    ],
    examples:[
      "A farmer uses weather data and online market information to reduce waste and plan sales.",
      "A Caribbean animation studio sells digital services to overseas clients without shipping a physical product.",
      "A food processor turns local fruit into packaged products with longer shelf life and higher value."
    ],
    vocabulary:[
      term("industry","Economic activity involved in producing goods or services."),
      term("foreign exchange","Foreign currency earned or used in international transactions."),
      term("value added","The increase in value created by processing, design, branding or other productive activity."),
      term("ICT","Information and communication technology used to create, process, store and exchange information."),
      term("digital divide","Unequal access to digital devices, connectivity or skills."),
      term("productivity","Output produced from a given amount of input.")
    ],
    keyPoints:[
      "Industries contribute through jobs, output, exports, taxes and linkages with other sectors.",
      "ICT can reduce distance and expand access, but infrastructure and skills matter.",
      "Diversification and value added can reduce dependence on a narrow range of activities."
    ],
    interactive:{
      type:"case-choice",
      title:"Add more value",
      prompt:"A cooperative exports raw cocoa beans but wants to earn more from the same crop. Which strategy most directly increases value added?",
      items:[
        {label:"Process part of the cocoa into branded chocolate products",good:true,reason:"Processing and branding add value beyond the raw commodity."},
        {label:"Throw away part of the harvest",good:false,reason:"Waste reduces usable output."},
        {label:"Stop learning about markets",good:false,reason:"Less market knowledge does not create value."}
      ]
    },
    practice:[
      question("How can ICT support Caribbean businesses?",["By allowing digital access to customers and information","By removing the need for skills","By eliminating all competition","By preventing trade"],0,"ICT can improve communication, market access and efficiency."),
      question("What does value added mean?",["Increasing a product's value through processing or other productive activity","Reducing output deliberately","Selling only raw materials","Avoiding innovation"],0,"Value added is created when production, processing, design or services increase the value of an input.")
    ],
    exam:{
      marks:12,
      prompt:"Explain THREE ways industries contribute to Caribbean development and discuss TWO ways ICT can improve the performance of Caribbean businesses.",
      guide:[
        "Connect industries to jobs, foreign exchange, taxes or linkages.",
        "Explain the ICT mechanism, not just name a device.",
        "Mention at least one condition needed for ICT benefits, such as access or skills."
      ]
    }
  }),

  makeLesson({
    id:"b2-development-challenges",
    sectionId:"B2",
    title:"Challenges to Caribbean development",
    objectiveCodes:["24a","24b","24c"],
    objectives:[
      "Analyse major social, economic and environmental development challenges.",
      "Propose and justify realistic responses."
    ],
    introduction:"Caribbean development is shaped by small domestic markets, exposure to natural hazards, debt, inequality, unemployment, crime, migration, energy costs, climate risk and dependence on external markets. These challenges are connected, so solutions often need cooperation across sectors and borders.",
    noteSections:[
      {
        title:"Economic challenges",
        paragraphs:[
          "Small market size can limit economies of scale. High import dependence can expose countries to global price changes. Public debt may reduce the money available for new investment. Heavy dependence on one industry, such as tourism or a single commodity, can make an economy vulnerable to shocks.",
          "Responses may include diversification, regional trade, skills development, renewable energy and stronger support for productive local businesses."
        ]
      },
      {
        title:"Social challenges",
        paragraphs:[
          "Inequality, unemployment, weak access to services, crime and outward migration can reduce opportunity and social stability. These issues also influence one another. For example, long-term unemployment can increase household stress and encourage migration.",
          "Solutions require more than punishment or short-term projects. Education, youth development, public safety, health, employment and community institutions need to work together."
        ]
      },
      {
        title:"Environmental vulnerability",
        paragraphs:[
          "Hurricanes, floods, droughts, earthquakes, volcanic hazards and climate change can destroy years of investment. Small states may face high reconstruction costs relative to the size of their economies.",
          "Resilient infrastructure, disaster planning, insurance, emergency savings, environmental protection and regional cooperation can reduce risk."
        ]
      }
    ],
    examples:[
      "A tourism-dependent island loses visitor income after a major hurricane damages hotels and airports.",
      "High fuel import costs encourage investment in solar energy and energy efficiency.",
      "A regional disaster-response arrangement allows countries to share expertise and emergency resources after a severe event."
    ],
    vocabulary:[
      term("diversification","Expanding the range of economic activities to reduce dependence on a narrow set of industries."),
      term("economies of scale","Cost advantages that can arise when production occurs on a larger scale."),
      term("public debt","Money owed by government to lenders."),
      term("vulnerability","The degree to which people, systems or places are susceptible to harm."),
      term("resilience","Capacity to prepare for, absorb and recover from shocks."),
      term("mitigation","Action taken to reduce the severity or likelihood of harm.")
    ],
    keyPoints:[
      "Caribbean development challenges are often interconnected.",
      "Small size can create both limits and opportunities for specialised cooperation.",
      "A justified solution explains why it fits the cause of the problem."
    ],
    interactive:{
      type:"solution-match",
      title:"Match the response to the challenge",
      prompt:"Choose the response that most directly addresses each development challenge.",
      pairs:[
        {problem:"Heavy dependence on one export industry",solution:"Economic diversification"},
        {problem:"High imported-fuel costs",solution:"Energy efficiency and renewable energy"},
        {problem:"Severe disaster exposure",solution:"Resilient infrastructure and preparedness"},
        {problem:"Skills mismatch",solution:"Training linked to labour-market needs"}
      ]
    },
    practice:[
      question("Why can economic diversification improve resilience?",["A shock in one industry has less power to damage the whole economy","It guarantees every business succeeds","It removes all imports","It prevents natural hazards"],0,"A broader economic base reduces dependence on one source of income."),
      question("Which response best addresses disaster vulnerability?",["Stronger building standards and preparedness","Ignoring hazard maps","Building critical facilities in the highest-risk sites","Reducing emergency planning"],0,"Risk reduction combines safer infrastructure and preparedness.")
    ],
    exam:{
      marks:14,
      prompt:"Analyse TWO major challenges to Caribbean development and propose TWO measures for each challenge. Justify why each measure could help.",
      guide:[
        "Explain the challenge and its development effect.",
        "Match each response to the underlying cause.",
        "Justification should show how the measure changes the problem."
      ]
    }
  }),

  makeLesson({
    id:"b2-integration-roots",
    sectionId:"B2",
    title:"Why Caribbean countries pursue regional integration",
    objectiveCodes:["25","26"],
    objectives:[
      "Explain reasons for regional integration.",
      "Outline major stages and historical attempts at Caribbean cooperation."
    ],
    introduction:"Caribbean countries are separate states, but many face similar problems and share markets, institutions, history and geography. Regional integration is an attempt to gain strength by coordinating or combining selected activities.",
    noteSections:[
      {
        title:"Why integrate?",
        paragraphs:[
          "Small populations and markets can make some services expensive to provide separately. Integration can widen markets, support trade, pool technical skills, strengthen bargaining power and encourage shared solutions in areas such as health, education, disaster response and foreign policy.",
          "Integration also reflects cultural and historical connections. However, countries still have national interests, so cooperation often requires negotiation and compromise."
        ]
      },
      {
        title:"From federation to modern institutions",
        paragraphs:[
          "Caribbean integration has developed through several attempts and organisations. The West Indies Federation was an early political federation that ended in the 1960s. CARIFTA later focused on free trade, and CARICOM expanded cooperation across economic, functional and foreign-policy areas.",
          "The OECS created deeper cooperation among several Eastern Caribbean states. Integration is therefore a process, not one single event."
        ]
      },
      {
        title:"Different depths of integration",
        paragraphs:[
          "Cooperation can range from sharing a service to creating common rules or markets. Countries may integrate more deeply in one area than another.",
          "Students should distinguish the purpose of an organisation from assuming every member has identical policies."
        ]
      }
    ],
    examples:[
      "Countries can share specialist institutions rather than each building a separate one from scratch.",
      "Joint disaster-response arrangements allow expertise and supplies to move across borders after emergencies.",
      "A regional market can give a Caribbean business access to more consumers than its home territory alone."
    ],
    vocabulary:[
      term("regional integration","A process through which countries coordinate or combine selected policies, markets or institutions."),
      term("federation","A political system in which constituent territories share authority with a central government."),
      term("free trade area","An arrangement that reduces or removes trade barriers among participating countries."),
      term("functional cooperation","Countries working together to provide shared services or solve common problems."),
      term("bargaining power","Ability to influence negotiations because of economic, political or collective strength.")
    ],
    keyPoints:[
      "Integration can help small states pool markets, skills and bargaining power.",
      "Caribbean integration developed through several historical stages.",
      "Regional cooperation does not eliminate national interests."
    ],
    interactive:{
      type:"timeline",
      title:"Put integration in sequence",
      prompt:"Arrange these integration developments from earlier to later.",
      items:["West Indies Federation","CARIFTA","CARICOM","CSME development"]
    },
    practice:[
      question("Which is a reason for regional integration?",["Pooling resources and widening markets","Making every island geographically larger","Eliminating all national governments","Ending cultural diversity"],0,"Integration can help countries share resources and access wider markets."),
      question("What was CARIFTA mainly associated with?",["Promoting free trade among Caribbean countries","Running national courts","Managing one country's police service","Replacing all currencies"],0,"CARIFTA was a regional free-trade arrangement that preceded CARICOM.")
    ],
    exam:{
      marks:12,
      prompt:"Explain THREE reasons Caribbean countries pursue regional integration and outline TWO stages or organisations in the historical development of integration.",
      guide:[
        "Explain how integration can address small markets, costs, bargaining power or shared problems.",
        "Place historical examples in a logical sequence.",
        "Do not assume all regional organisations have identical powers."
      ]
    },
    sources:[COMMON_SOURCES.caricom,COMMON_SOURCES.oecs]
  }),

  makeLesson({
    id:"b2-regional-organisations",
    sectionId:"B2",
    title:"CARICOM, CSME, OECS and the CCJ",
    objectiveCodes:["27"],
    objectives:[
      "Explain the main purposes of selected regional organisations and arrangements.",
      "Distinguish economic integration, functional cooperation and judicial cooperation."
    ],
    introduction:"Regional integration becomes real through institutions. CARICOM, the CSME, the OECS and the Caribbean Court of Justice perform different roles, so students should avoid treating them as interchangeable.",
    noteSections:[
      {
        title:"CARICOM and the CSME",
        paragraphs:[
          "CARICOM promotes cooperation among member states in areas that include economic integration, foreign-policy coordination and functional cooperation. The Caribbean Single Market and Economy is an integration project intended to deepen movement and economic activity among participating member states.",
          "The CSME includes arrangements connected to movement of goods, services, capital and eligible categories of people under agreed rules. The exact implementation can vary by area and member state."
        ]
      },
      {
        title:"OECS cooperation",
        paragraphs:[
          "The Organisation of Eastern Caribbean States supports cooperation among its members in areas such as economic integration, foreign policy and shared institutions. Some members participate in especially deep arrangements, including common institutions.",
          "The OECS shows that a smaller group of Caribbean states can pursue a deeper level of integration in selected areas."
        ]
      },
      {
        title:"The Caribbean Court of Justice",
        paragraphs:[
          "The CCJ has an original jurisdiction connected to interpretation and application of the Revised Treaty of Chaguaramas. It also serves as a final appellate court for those member states that have adopted its appellate jurisdiction.",
          "Not every CARICOM state uses the CCJ as its final court of appeal. This distinction is important."
        ]
      }
    ],
    examples:[
      "A regional trade dispute involving the Revised Treaty can fall within the CCJ's original jurisdiction.",
      "A skilled national who qualifies under applicable CSME arrangements may be able to work in another participating state under regional rules.",
      "OECS states cooperate through shared institutions that would be costly for each small state to reproduce independently."
    ],
    vocabulary:[
      term("CARICOM","The Caribbean Community, a regional organisation promoting integration and cooperation among member states."),
      term("CSME","The Caribbean Single Market and Economy, a project to deepen economic integration among participating CARICOM states."),
      term("OECS","The Organisation of Eastern Caribbean States, supporting deep cooperation among its member states."),
      term("CCJ","The Caribbean Court of Justice."),
      term("original jurisdiction","The CCJ role in interpreting and applying the Revised Treaty of Chaguaramas."),
      term("appellate jurisdiction","The CCJ role as a final court of appeal for states that have adopted that jurisdiction.")
    ],
    keyPoints:[
      "CARICOM is broader than the CSME.",
      "The OECS represents deep cooperation among a smaller group of states.",
      "The CCJ has original jurisdiction for treaty matters and appellate jurisdiction only for participating states."
    ],
    interactive:{
      type:"organisation-match",
      title:"Which regional body?",
      prompt:"Match the institution or arrangement to its main role.",
      pairs:[
        {problem:"Regional community for broad cooperation",solution:"CARICOM"},
        {problem:"Deeper regional economic integration project",solution:"CSME"},
        {problem:"Eastern Caribbean integration organisation",solution:"OECS"},
        {problem:"Treaty interpretation and, for some states, final appeals",solution:"CCJ"}
      ]
    },
    practice:[
      question("Which statement about the CCJ is accurate?",["It has treaty-related original jurisdiction and appellate jurisdiction for participating states","Every CARICOM state uses it as final court of appeal","It is a tourism agency","It is the same body as the OECS"],0,"The CCJ has distinct original and appellate jurisdictions."),
      question("What is the CSME?",["A project to deepen economic integration among participating CARICOM states","A hurricane","A national election system","A private bank"],0,"The CSME is a regional economic-integration project.")
    ],
    exam:{
      marks:12,
      prompt:"Distinguish CARICOM, the CSME, the OECS and the CCJ by explaining ONE major role of each.",
      guide:[
        "Treat each body separately.",
        "Do not say every CARICOM state has identical participation in every arrangement.",
        "For the CCJ, distinguish treaty jurisdiction from final appeals."
      ]
    },
    sources:[COMMON_SOURCES.caricom,COMMON_SOURCES.oecs,COMMON_SOURCES.ccj]
  }),

  makeLesson({
    id:"b2-integration-benefits-challenges",
    sectionId:"B2",
    title:"Benefits, successes and challenges of regional integration",
    objectiveCodes:["28","29"],
    objectives:[
      "Analyse economic, social and political benefits of regional integration.",
      "Assess successes and obstacles without treating integration as automatically successful or unsuccessful."
    ],
    introduction:"Regional integration creates opportunities, but it also requires countries to coordinate rules, share costs and sometimes adjust national policies. A good answer weighs evidence on both sides.",
    noteSections:[
      {
        title:"Potential benefits",
        paragraphs:[
          "Larger markets can help firms reach more customers. Shared institutions can reduce duplication. Joint negotiation may strengthen bargaining power. Students and professionals can benefit from regional education and labour opportunities where agreements allow.",
          "Functional cooperation in health, disaster management, examinations, meteorology and other areas can create benefits even when full economic integration is incomplete."
        ]
      },
      {
        title:"Examples of regional success",
        paragraphs:[
          "Regional institutions have supported common examinations, disaster coordination, university education, public health and trade cooperation. Caribbean sporting and cultural organisations also help build regional identity.",
          "Success should be evaluated against an organisation's stated purpose rather than by assuming all integration goals have been fully achieved."
        ]
      },
      {
        title:"Why integration can be difficult",
        paragraphs:[
          "Countries differ in size, resources, income, political priorities and economic structure. Governments may worry that costs and benefits are unevenly distributed. Administrative delays, transport costs, limited public awareness and slow implementation can also weaken integration.",
          "These challenges do not automatically prove that integration has failed; they identify problems institutions must address."
        ]
      }
    ],
    examples:[
      "A common examination system allows students across several territories to work toward recognised regional qualifications.",
      "Joint disaster response can mobilise regional expertise after a major hurricane.",
      "A small business may still face transport costs even after formal trade barriers are reduced."
    ],
    vocabulary:[
      term("regional market","A market created when several countries reduce barriers to economic activity among them."),
      term("functional cooperation","Sharing services or coordinated action in practical areas of common need."),
      term("implementation gap","A difference between an agreed policy and what is actually put into practice."),
      term("regional identity","A sense of shared belonging across Caribbean societies."),
      term("uneven benefits","A situation in which gains from an arrangement are distributed differently among members.")
    ],
    keyPoints:[
      "Integration can widen markets and support shared institutions.",
      "Functional cooperation is an important form of regional success.",
      "Transport, implementation, unequal capacity and national priorities can limit progress."
    ],
    interactive:{
      type:"balance-board",
      title:"Benefit or challenge?",
      prompt:"Sort each statement according to whether it describes a potential benefit or a challenge of integration.",
      categories:["Benefit","Challenge"],
      items:[
        {label:"Businesses can access a larger regional market",category:"Benefit"},
        {label:"Countries may implement agreed rules at different speeds",category:"Challenge"},
        {label:"Specialist services can be shared",category:"Benefit"},
        {label:"Transport between territories can remain expensive",category:"Challenge"}
      ]
    },
    practice:[
      question("Which is a potential benefit of regional integration?",["Pooling specialised services","Increasing duplication of every institution","Reducing all movement between states","Making markets smaller"],0,"Shared services can reduce duplication and build regional capacity."),
      question("Which can hinder integration?",["Slow implementation of agreed rules","Clear regional procedures","Efficient transport","Strong public awareness"],0,"Agreements have limited effect when implementation is delayed.")
    ],
    exam:{
      marks:14,
      prompt:"Discuss THREE benefits and THREE challenges of Caribbean regional integration. Use at least TWO regional examples.",
      guide:[
        "Balance the answer rather than arguing one side only.",
        "Explain how each benefit or challenge operates.",
        "Use institutions or practical cooperation as examples."
      ]
    },
    sources:[COMMON_SOURCES.caricom,COMMON_SOURCES.cdema]
  }),

  makeLesson({
    id:"b2-integration-citizens",
    sectionId:"B2",
    title:"Who makes regional integration work?",
    objectiveCodes:["30"],
    objectives:[
      "Explain the roles of citizens, businesses, governments and media in regional integration.",
      "Propose practical ways to strengthen regional awareness and cooperation."
    ],
    introduction:"Regional agreements are signed by governments, but integration affects and depends on ordinary people, workers, businesses, schools, media and community organisations. An agreement on paper has little value if people do not understand or use it.",
    noteSections:[
      {
        title:"Government responsibilities",
        paragraphs:[
          "Governments negotiate agreements, pass or amend laws, fund institutions and implement regional commitments. They also explain policies to citizens and businesses.",
          "Consistent implementation matters because uncertainty makes it harder for people to use regional rights or opportunities."
        ]
      },
      {
        title:"Business and citizen participation",
        paragraphs:[
          "Businesses can trade regionally, form partnerships and build supply chains across borders. Citizens can study, work, travel, volunteer, participate in cultural exchange and use regional institutions where rules permit.",
          "People also need to respect differences among Caribbean societies. Regional identity should not erase national or local identity."
        ]
      },
      {
        title:"Media and education",
        paragraphs:[
          "Media can explain regional decisions, investigate implementation and help audiences understand events in neighbouring territories. Schools can teach Caribbean geography, history and institutions so that students see the region as connected rather than isolated islands.",
          "Poor information can weaken integration when myths or outdated claims spread faster than official guidance."
        ]
      }
    ],
    examples:[
      "A small manufacturer finds distributors in two neighbouring Caribbean markets.",
      "A school runs a regional project in which students compare climate-resilience plans across islands.",
      "A news organisation explains a new regional rule and links readers to the official source."
    ],
    vocabulary:[
      term("implementation","Putting an agreed policy or rule into practice."),
      term("regional awareness","Knowledge of and interest in the wider Caribbean region."),
      term("regional trade","Exchange of goods and services among countries in the region."),
      term("civic participation","Taking part in community or public life."),
      term("regional cooperation","Countries and people working together on shared goals or problems.")
    ],
    keyPoints:[
      "Governments negotiate and implement integration, but citizens and businesses make use of it.",
      "Media and education shape how well people understand regional opportunities.",
      "Regional identity can coexist with national identity."
    ],
    interactive:{
      type:"case-choice",
      title:"From agreement to action",
      prompt:"A new regional programme exists, but few students know about it. Which response best addresses the problem?",
      items:[
        {label:"Schools and media explain eligibility using official information and practical examples",good:true,reason:"Awareness is necessary before people can use an opportunity."},
        {label:"Keep the rules difficult to find",good:false,reason:"Poor access to information weakens participation."},
        {label:"Assume everyone already understands the programme",good:false,reason:"Integration requires communication and public awareness."}
      ]
    },
    practice:[
      question("Which is a role of businesses in regional integration?",["Trading and forming partnerships across regional markets","Running every national court","Writing all constitutions","Replacing governments"],0,"Businesses can use regional markets and build cross-border economic links."),
      question("Why does public awareness matter for integration?",["People cannot use opportunities they do not understand","It removes all national laws","It guarantees equal income","It prevents all disagreement"],0,"Information helps citizens and businesses understand rights, rules and opportunities.")
    ],
    exam:{
      marks:10,
      prompt:"Explain TWO roles each for governments, businesses and citizens in strengthening Caribbean regional integration.",
      guide:[
        "Give distinct roles for each group.",
        "Use practical examples such as implementation, trade, study, work or cultural exchange.",
        "Explain how each action strengthens cooperation."
      ]
    },
    sources:[COMMON_SOURCES.caricom]
  }),

  makeLesson({
    id:"b2-tourism-integration",
    sectionId:"B2",
    title:"Tourism as a regional development activity",
    objectiveCodes:["31","32"],
    objectives:[
      "Explain how tourism contributes to regional development.",
      "Assess how Caribbean territories can cooperate to strengthen tourism products and reduce negative impacts."
    ],
    introduction:"Tourism connects the Caribbean to international markets and links many local industries, from transport and agriculture to entertainment and craft. It can create jobs and foreign exchange, but it can also increase environmental pressure and economic dependence if poorly managed.",
    noteSections:[
      {
        title:"Tourism's economic linkages",
        paragraphs:[
          "Visitors spend on accommodation, food, transport, entertainment, attractions and shopping. Tourism can therefore support farmers, taxi operators, restaurants, artisans, musicians and other businesses.",
          "The size of the benefit depends on leakage. If a large share of tourism spending leaves the country to pay for imported goods or foreign-owned services, the local multiplier effect is smaller."
        ]
      },
      {
        title:"Regional tourism products",
        paragraphs:[
          "Caribbean countries can cooperate through multi-destination travel, shared marketing, regional events, cruise itineraries and common standards. Different territories can specialise in heritage, nature, festivals, sport, wellness, beaches or food rather than competing only on one product.",
          "Improved air and sea transport can make multi-destination tourism easier, though cost and connectivity remain challenges."
        ]
      },
      {
        title:"Sustainable tourism",
        paragraphs:[
          "Tourism depends on attractive natural and cultural resources. Overcrowding, reef damage, waste, excessive water use or loss of community access can weaken the same product tourism depends on.",
          "Sustainable tourism uses planning, environmental management, community participation and stronger local linkages so that benefits are more widely shared."
        ]
      }
    ],
    examples:[
      "A hotel buys vegetables from local farmers, strengthening the link between tourism and agriculture.",
      "Several territories market a regional sailing route that encourages visitors to spend time in more than one country.",
      "A heritage attraction limits visitor numbers at sensitive sites and trains local guides."
    ],
    vocabulary:[
      term("tourism","Travel outside one's usual environment for leisure, business or other temporary purposes."),
      term("foreign exchange","Foreign currency earned through transactions such as visitor spending."),
      term("economic linkage","A connection through which one industry creates demand for another."),
      term("leakage","Income that leaves the local economy to pay for imports or foreign-owned inputs."),
      term("multi-destination tourism","Travel in which visitors include more than one destination in the same trip."),
      term("sustainable tourism","Tourism managed to protect environmental, cultural and community resources while supporting long-term benefits.")
    ],
    keyPoints:[
      "Tourism can support many connected Caribbean industries.",
      "Regional cooperation can expand tourism products and markets.",
      "Tourism is stronger in the long term when local communities and environmental resources are protected."
    ],
    interactive:{
      type:"case-choice",
      title:"Strengthen the tourism linkage",
      prompt:"A resort imports nearly all of its food even though local farmers can supply several products. Which strategy most directly increases local tourism benefits?",
      items:[
        {label:"Create purchasing agreements and quality standards with local farmers",good:true,reason:"This keeps more visitor spending in the local economy and creates an agricultural linkage."},
        {label:"Import even more products automatically",good:false,reason:"That can increase leakage when suitable local supply exists."},
        {label:"Stop measuring local purchases",good:false,reason:"Without data, it becomes harder to improve local linkages."}
      ]
    },
    practice:[
      question("What is tourism leakage?",["Tourism income leaving the local economy through imports or external payments","Rain entering a hotel","A visitor changing rooms","An increase in local sourcing"],0,"Leakage reduces the share of tourism spending retained locally."),
      question("Which is an example of regional tourism cooperation?",["A multi-destination Caribbean itinerary","Preventing all travel between islands","Marketing only one hotel room","Closing transport links"],0,"Multi-destination products depend on cooperation and connectivity across territories.")
    ],
    exam:{
      marks:12,
      prompt:"Explain THREE ways tourism can contribute to Caribbean development and discuss TWO measures that can make tourism more sustainable and regionally integrated.",
      guide:[
        "Explain direct and indirect economic contributions.",
        "Use measures such as local sourcing, environmental protection, regional transport or multi-destination products.",
        "Recognise both benefits and possible costs."
      ]
    },
    sources:[COMMON_SOURCES.caricom]
  })
]);
