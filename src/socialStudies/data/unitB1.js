import { makeLesson, term, question } from "./courseHelpers";

export const UNIT_B1_LESSONS = Object.freeze([
  makeLesson({
    id:"b1-population-foundations",
    sectionId:"B1",
    title:"Understanding population",
    objectiveCodes:["1","2a","2b"],
    objectives:[
      "Use key population terms correctly.",
      "Describe a population by age, sex, occupation and other characteristics.",
      "Identify reliable population data sources and explain why population statistics matter."
    ],
    introduction:"Population is not simply the number of people in a country. Governments, businesses and communities need to know where people live, how old they are, how quickly the population is changing and what services different groups need.",
    noteSections:[
      {
        title:"Core population measures",
        paragraphs:[
          "Population size is the total number of people in an area. Population density compares population with land area. Population distribution describes how people are spread across space. Population structure looks at characteristics such as age and sex.",
          "Birth rate, death rate, fertility, infant mortality and life expectancy describe different aspects of population change and well-being. These terms are related but should not be used as if they mean the same thing."
        ]
      },
      {
        title:"Where population data comes from",
        paragraphs:[
          "A census attempts to collect information about an entire population at a particular time. Sample surveys collect data from part of the population. Civil registration systems record events such as births and deaths. Government statistical offices also combine administrative records and surveys.",
          "Good population data supports decisions about schools, hospitals, housing, roads, pensions, disaster planning and employment programmes."
        ]
      },
      {
        title:"Ask what the statistic actually measures",
        paragraphs:[
          "A percentage has meaning only when you know the population it refers to. For example, '20 percent unemployed' is incomplete unless you know whether the figure refers to the labour force, working-age population or another group.",
          "Always check date, place, source, definition and unit before comparing population statistics."
        ]
      }
    ],
    examples:[
      "A parish with many school-age children may need more classroom space than one with an older population.",
      "A coastal community preparing for hurricanes needs accurate data on how many people may require evacuation support.",
      "A business deciding where to open a supermarket can use population size and distribution data."
    ],
    vocabulary:[
      term("population","The people living in a defined area at a particular time."),
      term("census","A systematic count and collection of information about a population."),
      term("population density","The number of people per unit of land area."),
      term("population distribution","The spatial pattern of where people live."),
      term("life expectancy","The average number of years a person is expected to live under current mortality conditions."),
      term("infant mortality rate","A measure of deaths of infants under age one relative to live births.")
    ],
    keyPoints:[
      "Population statistics describe size, structure, distribution and change.",
      "Censuses, surveys and registration systems provide different kinds of evidence.",
      "Population data guides planning only when definitions, dates and units are understood."
    ],
    interactive:{
      type:"source-check",
      title:"Choose the right population source",
      prompt:"A ministry needs to estimate how many primary-school places may be needed in each parish. Which information is most useful?",
      items:[
        {label:"Recent census and birth-registration data by area",good:true,reason:"These sources show where children live and the size of upcoming age groups."},
        {label:"One social-media poll",good:false,reason:"A voluntary online poll is unlikely to represent the full population."},
        {label:"A ten-year-old tourism brochure",good:false,reason:"It is neither current nor designed to measure school-age population."}
      ]
    },
    practice:[
      question("What does population density measure?",["People per unit of land area","Births minus deaths only","Average household income","Number of tourists"],0,"Density relates population size to land area."),
      question("Which is a major purpose of a census?",["To provide systematic population information for planning","To choose election candidates","To forecast daily rainfall","To set every household budget"],0,"Censuses provide broad demographic and social data for planning and analysis.")
    ],
    exam:{
      marks:8,
      prompt:"Explain TWO uses of population data in national planning and identify TWO reliable sources from which such data may be obtained.",
      guide:[
        "Link each use to a real planning decision.",
        "Name suitable sources such as a census, civil registration or official survey.",
        "Explain why current and accurate data matters."
      ]
    }
  }),

  makeLesson({
    id:"b1-density-distribution",
    sectionId:"B1",
    title:"Population density and distribution",
    objectiveCodes:["3a","3b"],
    objectives:[
      "Calculate population density.",
      "Explain physical and human factors that affect where people live.",
      "Interpret maps showing population distribution."
    ],
    introduction:"People are not spread evenly across the Caribbean. Mountainous interiors, dry areas, fertile plains, capital regions, transport corridors and coastlines can have very different settlement patterns.",
    noteSections:[
      {
        title:"Calculate density carefully",
        paragraphs:[
          "Population density is calculated by dividing population by land area. If an island has 300,000 people and an area of 1,500 square kilometres, its average density is 200 people per square kilometre.",
          "Average density does not mean every part of the island has 200 people in each square kilometre. Dense towns and sparsely settled mountains may exist in the same country."
        ]
      },
      {
        title:"Why people cluster in some places",
        paragraphs:[
          "Physical factors include relief, water supply, soil, climate and natural hazards. Human factors include jobs, ports, roads, schools, hospitals, housing and historical settlement patterns.",
          "Large urban areas often grow where employment and services are concentrated. Rural areas may lose population when young adults migrate toward cities or overseas."
        ]
      },
      {
        title:"Reading a distribution map",
        paragraphs:[
          "Use the map key before drawing conclusions. A shaded map may show density classes, while dots may represent a set number of people. Do not assume that a larger shaded area contains more people unless the map actually measures population totals.",
          "Look for patterns, then propose reasons supported by geographical evidence."
        ]
      }
    ],
    examples:[
      "Coastal plains may attract settlement because they offer flatter land, roads and access to ports.",
      "Mountainous terrain can make construction and transport more difficult, reducing settlement density.",
      "A capital region may be densely populated because government, education, transport and employment are concentrated there."
    ],
    vocabulary:[
      term("population density","Population divided by land area."),
      term("distribution","The pattern showing where people are located."),
      term("urban area","A built-up settlement with a relatively high concentration of people and services."),
      term("rural area","An area with lower settlement density and greater use of land for agriculture or natural landscapes."),
      term("relief","The shape and elevation of the land surface.")
    ],
    keyPoints:[
      "Density is an average, not a description of every location.",
      "Settlement patterns reflect both physical geography and human opportunity.",
      "Maps must be interpreted using their legend, scale and measurement method."
    ],
    interactive:{
      type:"rate-calculator",
      title:"Population density calculator",
      mode:"density",
      prompt:"Enter a population and land area. SPARK will calculate people per square kilometre."
    },
    practice:[
      question("A territory has 500,000 people and 2,500 km² of land. Its density is...",["200 people per km²","1,250 people per km²","5 people per km²","2,000 people per km²"],0,"500,000 ÷ 2,500 = 200."),
      question("Which human factor can increase settlement density?",["Concentration of jobs and services","Steep relief only","Lack of roads","Absence of water"],0,"Employment and services attract people and can increase local density.")
    ],
    exam:{
      marks:10,
      prompt:"Calculate the population density of an area with 720,000 people and 3,600 km² of land. Then explain THREE factors that may cause uneven population distribution.",
      guide:[
        "Show the density calculation and unit.",
        "Use both physical and human factors if possible.",
        "Explain how each factor affects settlement."
      ]
    }
  }),

  makeLesson({
    id:"b1-population-change-rates",
    sectionId:"B1",
    title:"Population change and demographic rates",
    objectiveCodes:["4a","4b"],
    objectives:[
      "Explain how births, deaths and migration change population size.",
      "Calculate natural increase and net migration using supplied data."
    ],
    introduction:"A population changes through three basic processes: births, deaths and migration. Once you understand those flows, many demographic questions become simple accounting.",
    noteSections:[
      {
        title:"Natural increase",
        paragraphs:[
          "Natural increase is the difference between births and deaths when migration is excluded. If births exceed deaths, there is natural increase. If deaths exceed births, there is natural decrease.",
          "Rates allow fairer comparisons between populations of different sizes. The syllabus may present birth and death rates per thousand people, so always read the unit."
        ]
      },
      {
        title:"Migration balance",
        paragraphs:[
          "Immigration adds people to a country, while emigration removes people. Net migration is immigration minus emigration. A negative result means more people left than entered during the period.",
          "Total population change combines natural change with net migration."
        ]
      },
      {
        title:"Why rates change",
        paragraphs:[
          "Birth rates can change with education, access to health services, age at parenthood, economic conditions and cultural expectations. Death rates and life expectancy are affected by health care, nutrition, sanitation, disease, safety and age structure.",
          "Do not explain a demographic change with one cause unless the evidence supports it."
        ]
      }
    ],
    examples:[
      "If a country records 18,000 births and 11,000 deaths, natural increase is 7,000 people before migration is considered.",
      "If 9,000 people immigrate and 14,000 emigrate, net migration is -5,000.",
      "A population can still grow even with net emigration if natural increase is large enough."
    ],
    vocabulary:[
      term("birth rate","A measure of live births relative to population, commonly expressed per thousand people."),
      term("death rate","A measure of deaths relative to population, commonly expressed per thousand people."),
      term("natural increase","The excess of births over deaths, excluding migration."),
      term("immigration","Movement into a country to live."),
      term("emigration","Movement out of a country to live elsewhere."),
      term("net migration","Immigration minus emigration.")
    ],
    keyPoints:[
      "Births add to population, deaths reduce it, and migration can do either.",
      "Natural increase excludes migration.",
      "Always check whether figures are counts, percentages or rates per thousand."
    ],
    interactive:{
      type:"rate-calculator",
      title:"Demographic change calculator",
      mode:"population-change",
      prompt:"Enter births, deaths, immigrants and emigrants to calculate natural increase, net migration and total change."
    },
    practice:[
      question("If births are 12,000 and deaths are 8,500, natural increase is...",["3,500","20,500","-3,500","1,412"],0,"12,000 - 8,500 = 3,500."),
      question("If immigration is 6,000 and emigration is 9,500, net migration is...",["-3,500","15,500","3,500","-15,500"],0,"6,000 - 9,500 = -3,500.")
    ],
    exam:{
      marks:10,
      prompt:"Using a hypothetical Caribbean country with 20,000 births, 12,000 deaths, 5,000 immigrants and 9,000 emigrants, calculate natural increase, net migration and total population change. Explain ONE factor that could influence each of the birth rate and emigration level.",
      guide:[
        "Show all three calculations.",
        "Use the correct sign for net migration.",
        "Explain one plausible demographic factor for births and one for emigration."
      ]
    }
  }),

  makeLesson({
    id:"b1-population-data",
    sectionId:"B1",
    title:"Population pyramids, tables and graphs",
    objectiveCodes:["4c","4d","4e","5"],
    objectives:[
      "Present population data in suitable tables and graphs.",
      "Interpret population pyramids and other demographic displays.",
      "Compare data from more than one source and draw evidence-based conclusions."
    ],
    introduction:"A good Social Studies student can turn numbers into a clear visual and then explain what that visual means. The goal is not decoration. A graph should make a pattern easier to see.",
    noteSections:[
      {
        title:"Choose the display that fits the data",
        paragraphs:[
          "Bar graphs are useful for comparing categories. Line graphs are strong for change over time. Pie charts show parts of a whole when there are not too many categories. Population pyramids compare age and sex structure.",
          "Every graph needs a clear title, labelled axes where relevant, sensible scale and accurate plotting."
        ]
      },
      {
        title:"Reading a population pyramid",
        paragraphs:[
          "A broad base usually indicates a relatively large proportion of children, while a narrower base may suggest lower recent birth levels. A wider upper section can indicate a larger older population. Bulges or gaps may reflect migration, past birth patterns or unusual events.",
          "Do not describe shape alone. Link the pattern to possible service needs such as schools, jobs, health care or pensions."
        ]
      },
      {
        title:"Compare sources before concluding",
        paragraphs:[
          "Two data sources may use different years, definitions or methods. A census and a labour-force survey can both be reliable while measuring different things.",
          "A conclusion should follow the evidence. If a graph shows the working-age population growing, you may discuss possible pressure for jobs, but you should not claim unemployment definitely rose unless employment data supports that statement."
        ]
      }
    ],
    examples:[
      "A line graph can show a country's urban population percentage across several census years.",
      "A population pyramid with a large youth population can lead planners to examine future demand for secondary schools and jobs.",
      "A student notices two websites give different population totals, then checks the year and discovers one figure is five years older."
    ],
    vocabulary:[
      term("population pyramid","A graph showing the age and sex structure of a population."),
      term("scale","The interval system used to measure values on a graph or map."),
      term("trend","The general direction of change in data over time."),
      term("comparison","Examining similarities and differences between data sets."),
      term("conclusion","A judgement supported by evidence from the data analysed.")
    ],
    keyPoints:[
      "The best graph depends on the type of data and the question being asked.",
      "Population pyramids connect age structure to future social and economic needs.",
      "Conclusions must match the evidence actually shown."
    ],
    interactive:{
      type:"population-pyramid",
      title:"Build and read a population pyramid",
      prompt:"Adjust three age groups and observe how the shape changes. Then choose the planning need most strongly suggested by the structure."
    },
    practice:[
      question("Which graph is usually best for showing change in population over several years?",["Line graph","Pie chart","Family tree","Flowchart"],0,"Line graphs clearly show trends across time."),
      question("A population pyramid with a very broad base most directly suggests...",["A large proportion of young people","No children","Only elderly residents","No population change"],0,"A broad base represents relatively large younger age groups.")
    ],
    exam:{
      marks:12,
      prompt:"A population pyramid shows a broad base, a narrower working-age middle and a very small elderly population. Describe THREE features of the population and explain TWO planning implications.",
      guide:[
        "Describe what the shape shows before explaining implications.",
        "Link younger age structure to services such as schooling, health care and future employment.",
        "Do not invent statistics that are not shown."
      ]
    }
  }),

  makeLesson({
    id:"b1-migration",
    sectionId:"B1",
    title:"Migration in the Caribbean",
    objectiveCodes:["6a","6b","7"],
    objectives:[
      "Distinguish immigration, emigration, internal migration and net migration.",
      "Explain push and pull factors.",
      "Assess consequences of migration for individuals, families and Caribbean development."
    ],
    introduction:"Migration is a normal part of Caribbean history. People move between rural and urban areas, between Caribbean territories and to countries outside the region. The effects are rarely entirely positive or entirely negative.",
    noteSections:[
      {
        title:"Push and pull factors",
        paragraphs:[
          "Push factors encourage people to leave a place. They may include unemployment, low wages, limited educational opportunities, insecurity or environmental hazards. Pull factors attract people to another place, such as jobs, higher wages, family reunification, education or perceived safety.",
          "A migrant may respond to several factors at the same time. Avoid reducing migration to one simple reason."
        ]
      },
      {
        title:"Brain drain and remittances",
        paragraphs:[
          "When skilled workers leave in large numbers, the source country may experience a brain drain, especially in sectors such as health care or specialised technical work. On the other hand, migrants may send remittances, build businesses, share knowledge or return with new skills.",
          "The net effect depends on who migrates, for how long and how migrants remain connected to the region."
        ]
      },
      {
        title:"Family and community effects",
        paragraphs:[
          "Migration can raise household income and expand opportunity, but separation can also shift childcare and emotional responsibilities to relatives who remain. Communities receiving migrants may gain labour, skills and cultural diversity while also needing housing and services.",
          "A balanced Social Studies answer recognises these trade-offs."
        ]
      }
    ],
    examples:[
      "A nurse leaves a Caribbean country for higher wages abroad, creating a loss of skilled labour but sending money home to relatives.",
      "A family moves from a rural district to the capital because jobs and tertiary education are concentrated there.",
      "A Caribbean professional returns after several years abroad and starts a business using skills and networks gained overseas."
    ],
    vocabulary:[
      term("migration","Movement from one place of residence to another."),
      term("immigration","Movement into a country."),
      term("emigration","Movement out of a country."),
      term("push factor","A condition that encourages someone to leave a place."),
      term("pull factor","A condition that attracts someone to another place."),
      term("brain drain","Loss of skilled workers through migration."),
      term("remittance","Money sent by a migrant to people in the place of origin."),
      term("diaspora","People living outside their country or region of origin who retain connections with it.")
    ],
    keyPoints:[
      "Migration usually reflects a combination of push and pull factors.",
      "Migration can create both losses and benefits for Caribbean societies.",
      "Family separation, remittances, skills and labour supply are all part of the migration story."
    ],
    interactive:{
      type:"sorter",
      title:"Push or pull?",
      prompt:"Classify each factor by the role it is most likely to play.",
      categories:["Push","Pull"],
      items:[
        {label:"Persistent unemployment in the place of origin",category:"Push"},
        {label:"A university scholarship abroad",category:"Pull"},
        {label:"Repeated damage from a natural hazard",category:"Push"},
        {label:"Family reunification opportunity",category:"Pull"}
      ]
    },
    practice:[
      question("What is brain drain?",["Loss of skilled workers through migration","Movement from city to suburb only","A decline in rainfall","Growth in tourist arrivals"],0,"Brain drain refers to skilled people leaving a country or region."),
      question("Which is a pull factor?",["Better employment opportunities at the destination","Loss of a local job","A severe drought at home","Political insecurity at home"],0,"A pull factor attracts a migrant toward the destination.")
    ],
    exam:{
      marks:12,
      prompt:"Explain TWO push factors and TWO pull factors that influence Caribbean migration. Discuss ONE benefit and ONE challenge migration can create for the country of origin.",
      guide:[
        "Separate push from pull factors clearly.",
        "Explain rather than list.",
        "Keep the impact balanced by discussing both benefit and challenge."
      ]
    }
  }),

  makeLesson({
    id:"b1-human-resource-development",
    sectionId:"B1",
    title:"Developing human resources",
    objectiveCodes:["8","9"],
    objectives:[
      "Explain the meaning and importance of human-resource development.",
      "Assess how education, training, health and technology improve productive capacity."
    ],
    introduction:"Natural resources matter, but a country's people are also a major resource. Human-resource development improves the knowledge, health, skills and adaptability that people use to participate in society and the economy.",
    noteSections:[
      {
        title:"What human-resource development means",
        paragraphs:[
          "Human-resource development includes education, vocational training, health care, professional development and opportunities to build new skills. It is an investment because benefits may appear over many years.",
          "A skilled workforce can improve productivity, innovation, service quality and entrepreneurship. Healthy workers and students are also better able to participate consistently."
        ]
      },
      {
        title:"Match training to changing needs",
        paragraphs:[
          "Labour markets change with technology, trade, climate adaptation and new industries. Training systems need to respond. Digital skills, renewable-energy maintenance, health services, logistics and creative industries are examples of areas where new skills may become important.",
          "Human-resource planning should not treat every student as if they need the same career path. Academic, technical and vocational routes all contribute to development."
        ]
      },
      {
        title:"Retention matters too",
        paragraphs:[
          "Training workers is not enough if skilled people cannot find suitable work or conditions. Countries may also use return programmes, professional networks and diaspora partnerships to reduce the costs of brain drain.",
          "Human-resource development therefore connects education policy, health, employment and migration."
        ]
      }
    ],
    examples:[
      "A technical college expands training in solar installation because businesses need workers who can maintain renewable-energy systems.",
      "A hospital provides continuing education so nurses can update specialised skills.",
      "A Caribbean technology firm partners with secondary schools to expose students to coding, cybersecurity and digital design."
    ],
    vocabulary:[
      term("human resource","The knowledge, skills, health and abilities of people that can contribute to society and production."),
      term("human-resource development","Investment in education, training, health and skills to improve people's capabilities."),
      term("productivity","The amount of useful output produced from a given amount of input."),
      term("vocational education","Education and training focused on practical occupational skills."),
      term("upskilling","Learning additional skills to perform current or more advanced work.")
    ],
    keyPoints:[
      "Human-resource development builds skills, health and productive capacity.",
      "Training should respond to changing social and economic needs.",
      "Education, employment and migration policies are connected."
    ],
    interactive:{
      type:"case-choice",
      title:"Build the workforce",
      prompt:"A country is expanding renewable energy but lacks technicians. Which response most directly develops human resources?",
      items:[
        {label:"Create accredited technical training linked to employers",good:true,reason:"It builds the specific skills needed and connects training to real work."},
        {label:"Ignore the skills shortage",good:false,reason:"The shortage will continue if people are not trained."},
        {label:"Buy equipment without training anyone to maintain it",good:false,reason:"Technology is less useful without people who can operate and maintain it."}
      ]
    },
    practice:[
      question("Which is an investment in human resources?",["Technical and vocational training","Wasting training funds","Closing all schools","Preventing workers from learning new skills"],0,"Training develops knowledge and productive skills."),
      question("Why can good health support economic development?",["Healthy people can participate more consistently in education and work","It automatically creates natural resources","It removes all unemployment","It eliminates migration"],0,"Health affects attendance, productivity and ability to learn and work.")
    ],
    exam:{
      marks:10,
      prompt:"Explain THREE ways investment in human resources can contribute to Caribbean development and identify ONE challenge that can reduce the benefits of this investment.",
      guide:[
        "Connect education, skills or health to productivity and opportunity.",
        "Use a challenge such as mismatch of skills, limited jobs or migration.",
        "Explain how the challenge reduces the return on investment."
      ]
    }
  }),

  makeLesson({
    id:"b1-employment",
    sectionId:"B1",
    title:"Employment, unemployment and the changing world of work",
    objectiveCodes:["10","11"],
    objectives:[
      "Distinguish employment, unemployment, underemployment and labour force.",
      "Explain causes and effects of unemployment.",
      "Relate education and career planning to labour-market change."
    ],
    introduction:"Having a working-age population does not mean everyone has suitable work. Social Studies looks at how labour markets use human resources and what happens when people cannot find enough productive employment.",
    noteSections:[
      {
        title:"Employment terms",
        paragraphs:[
          "Employment means engaging in work for pay or profit. Unemployment usually refers to people in the labour force who do not have work and are available for and seeking work, according to the definition used by the statistical agency. Underemployment can occur when a person works fewer hours than desired or works in a role that does not fully use available skills.",
          "The labour force normally includes people who are employed plus people classified as unemployed. It does not automatically include every person of working age."
        ]
      },
      {
        title:"Why unemployment happens",
        paragraphs:[
          "Cyclical unemployment can rise when economic activity weakens. Structural unemployment occurs when workers' skills or locations do not match available jobs. Seasonal work creates predictable periods of lower employment in some industries. Technology can remove some tasks while creating demand for new ones.",
          "Effects include loss of household income, reduced tax revenue, pressure on social services and possible migration. Long periods without work can also affect confidence and skills."
        ]
      },
      {
        title:"Career planning in a changing economy",
        paragraphs:[
          "Students should connect interests and strengths with labour-market information, training requirements and future adaptability. A career plan is not a guarantee; it is a flexible path that can be adjusted.",
          "Transferable skills such as communication, problem solving, numeracy, digital literacy and teamwork remain useful across many occupations."
        ]
      }
    ],
    examples:[
      "A hotel worker employed mainly during peak visitor months may experience seasonal employment patterns.",
      "A trained worker may be unemployed if available jobs now require digital skills that the worker has not yet learned.",
      "A student interested in construction can compare university, apprenticeship and technical-college routes rather than assuming there is only one path."
    ],
    vocabulary:[
      term("employment","Work performed for pay or profit."),
      term("unemployment","A condition in which a person classified in the labour force has no work but is available for and seeking work under the stated definition."),
      term("underemployment","Employment that provides insufficient hours or does not fully use a worker's available skills."),
      term("labour force","People who are employed plus those classified as unemployed."),
      term("structural unemployment","Unemployment caused by a mismatch between workers and available jobs."),
      term("seasonal unemployment","Periods without work linked to regular seasonal changes in an industry.")
    ],
    keyPoints:[
      "Employment statistics depend on precise labour-force definitions.",
      "Unemployment can have cyclical, structural, seasonal and other causes.",
      "Career planning should combine personal strengths with evidence about training and labour demand."
    ],
    interactive:{
      type:"sorter",
      title:"What kind of work problem?",
      prompt:"Match each situation to the best labour-market concept.",
      categories:["Unemployment","Underemployment","Seasonal","Structural"],
      items:[
        {label:"A worker wants full-time hours but can find only 10 hours per week",category:"Underemployment"},
        {label:"A tourism worker has no work during the regular off-season",category:"Seasonal"},
        {label:"A factory closes and workers need new digital skills for available jobs",category:"Structural"},
        {label:"A job seeker has no work and is actively applying for jobs",category:"Unemployment"}
      ]
    },
    practice:[
      question("Who is normally included in the labour force?",["Employed people plus people classified as unemployed","Every child","Only government workers","Only university graduates"],0,"The labour force combines employed persons and those meeting the unemployment definition."),
      question("Which is the best example of underemployment?",["A qualified worker wants full-time work but can get only a few hours","A retired person chooses not to work","A student attends school full time","A worker takes annual leave"],0,"Underemployment can involve too few working hours relative to a person's availability and desire for work.")
    ],
    exam:{
      marks:12,
      prompt:"Distinguish unemployment from underemployment. Explain THREE causes of unemployment and TWO ways education or training can help reduce a skills mismatch.",
      guide:[
        "Use precise definitions.",
        "Explain different causes rather than repeating the same idea.",
        "Link training responses specifically to the skills demanded by employers."
      ]
    }
  }),

  makeLesson({
    id:"b1-natural-resources",
    sectionId:"B1",
    title:"Caribbean natural resources",
    objectiveCodes:["12a","12b"],
    objectives:[
      "Classify renewable and non-renewable resources.",
      "Locate and describe uses of important Caribbean resources.",
      "Explain why responsible resource management matters."
    ],
    introduction:"The Caribbean's resource base includes land, forests, water, fisheries, minerals, energy resources, fertile soils, beaches and marine ecosystems. A resource becomes economically and socially useful when people have the knowledge, technology and institutions to use it responsibly.",
    noteSections:[
      {
        title:"Renewable and non-renewable",
        paragraphs:[
          "Renewable resources can be replenished naturally within a useful human time scale when managed properly. Solar energy and wind are renewable. Forests and fisheries are renewable only if harvesting does not exceed their ability to recover.",
          "Non-renewable resources such as petroleum, natural gas and mineral deposits form over very long periods and are depleted when extracted."
        ]
      },
      {
        title:"Resources differ across the region",
        paragraphs:[
          "Caribbean territories do not have the same resource endowment. Some have major mineral or energy resources, while others depend more heavily on fertile land, marine resources, forests or tourism-related natural assets.",
          "This uneven distribution encourages trade and regional interdependence."
        ]
      },
      {
        title:"Use creates choices",
        paragraphs:[
          "Resource development can create jobs, exports and government revenue. It can also create pollution, habitat loss or conflict over land and water if poorly managed.",
          "Sustainable management tries to gain present benefits without destroying the resource base needed by future generations."
        ]
      }
    ],
    examples:[
      "Guyana and Suriname have extensive forest resources, while several Caribbean states rely heavily on marine and coastal resources.",
      "Trinidad and Tobago has long used petroleum and natural gas as major energy and industrial resources.",
      "Sun and wind can support renewable-energy generation across many Caribbean territories."
    ],
    vocabulary:[
      term("natural resource","A material or environmental feature from nature that people can use."),
      term("renewable resource","A resource that can replenish naturally within a useful time scale if managed properly."),
      term("non-renewable resource","A finite resource that forms too slowly to be replaced at the rate humans use it."),
      term("conservation","Careful protection and management of resources."),
      term("resource endowment","The quantity and type of resources available to a country or area."),
      term("sustainable development","Development that meets present needs while protecting the ability of future generations to meet theirs.")
    ],
    keyPoints:[
      "Renewable does not mean unlimited.",
      "Caribbean territories have different resource strengths.",
      "Resource use creates economic opportunities and environmental responsibilities."
    ],
    interactive:{
      type:"sorter",
      title:"Renewable or non-renewable?",
      prompt:"Classify the resource based on whether it can replenish naturally within a useful human time scale.",
      categories:["Renewable","Non-renewable"],
      items:[
        {label:"Solar energy",category:"Renewable"},
        {label:"Crude petroleum",category:"Non-renewable"},
        {label:"Wind energy",category:"Renewable"},
        {label:"Bauxite ore",category:"Non-renewable"}
      ]
    },
    practice:[
      question("Which statement about renewable resources is correct?",["They still require careful management","They can never be depleted","They include every mineral","They are always free"],0,"Renewable resources such as forests and fisheries can be damaged by overuse."),
      question("Why can uneven resource distribution encourage regional trade?",["Countries exchange resources and products they possess in different quantities","Every territory has identical resources","Trade requires no resources","Resources cannot cross borders"],0,"Different resource endowments create opportunities for exchange and interdependence.")
    ],
    exam:{
      marks:10,
      prompt:"Distinguish renewable from non-renewable resources and explain TWO economic benefits and TWO environmental risks connected to natural-resource development.",
      guide:[
        "Use correct definitions and examples.",
        "Benefits may include jobs, exports or revenue.",
        "Risks should be specific, such as habitat loss, pollution or over-extraction."
      ]
    }
  }),

  makeLesson({
    id:"b1-environmental-practices",
    sectionId:"B1",
    title:"Using the environment responsibly",
    objectiveCodes:["13"],
    objectives:[
      "Distinguish proper and improper environmental practices.",
      "Explain how human behaviour affects land, water, coasts and ecosystems."
    ],
    introduction:"Environmental problems often begin with everyday decisions multiplied across many people and businesses. Waste disposal, farming, construction, fishing, mining and energy use can either protect or damage the resources communities depend on.",
    noteSections:[
      {
        title:"Proper resource use",
        paragraphs:[
          "Responsible practices include recycling, soil conservation, reforestation, protected areas, sustainable fishing, proper sewage treatment, energy efficiency and environmental impact assessment before major developments.",
          "Conservation does not always mean 'do not use'. It often means using resources at a rate and in a way that allows recovery."
        ]
      },
      {
        title:"Improper practices",
        paragraphs:[
          "Deforestation on steep slopes can increase soil erosion and flooding. Dumping waste into gullies or rivers can block drainage and pollute water. Overfishing can reduce fish stocks. Poorly planned coastal construction can damage mangroves and reefs that protect shorelines.",
          "Environmental harm often creates social and economic costs later through damaged infrastructure, health problems or loss of tourism and fisheries."
        ]
      },
      {
        title:"Environmental impact assessment",
        paragraphs:[
          "An environmental impact assessment studies likely effects of a proposed project before major decisions are finalised. It can identify risks, compare alternatives and recommend measures to reduce harm.",
          "An assessment is useful only when evidence is taken seriously and mitigation measures are monitored."
        ]
      }
    ],
    examples:[
      "Replanting mangroves can improve habitat and help reduce coastal wave energy.",
      "A quarry may create jobs, but dust, noise, water impacts and land restoration still need to be managed.",
      "Community recycling works better when collection systems and public education support household effort."
    ],
    vocabulary:[
      term("pollution","Introduction of harmful substances or energy into the environment."),
      term("soil erosion","Removal of topsoil by water, wind or human activity."),
      term("reforestation","Replanting trees in an area where forest cover has been lost."),
      term("environmental impact assessment","A study of likely environmental effects before a proposed project is approved or developed."),
      term("mitigation","Action taken to reduce the severity of a harmful effect.")
    ],
    keyPoints:[
      "Environmental management connects human behaviour to long-term social and economic well-being.",
      "Improper practices can create costs far beyond the original activity.",
      "Environmental impact assessment helps identify and reduce risks before development proceeds."
    ],
    interactive:{
      type:"sorter",
      title:"Protect or damage?",
      prompt:"Sort the practices according to their likely environmental effect.",
      categories:["Responsible practice","Harmful practice"],
      items:[
        {label:"Replanting vegetation on a bare slope",category:"Responsible practice"},
        {label:"Dumping solid waste into a river",category:"Harmful practice"},
        {label:"Treating sewage before discharge",category:"Responsible practice"},
        {label:"Removing all mangroves for unplanned coastal construction",category:"Harmful practice"}
      ]
    },
    practice:[
      question("What is the purpose of an environmental impact assessment?",["To identify likely environmental effects before a project proceeds","To guarantee every project is rejected","To count election votes","To replace all engineering plans"],0,"An EIA identifies impacts and possible mitigation before major decisions are finalised."),
      question("Which practice can increase flooding risk?",["Blocking drainage with improperly disposed waste","Maintaining drains","Reforesting slopes","Protecting wetlands"],0,"Blocked drains reduce water flow and can worsen flooding.")
    ],
    exam:{
      marks:10,
      prompt:"Explain THREE ways improper environmental practices can affect Caribbean communities and propose ONE suitable response for each effect.",
      guide:[
        "Connect the practice to the environmental and human consequence.",
        "Make each response realistic.",
        "Use Caribbean settings such as coasts, rivers, hillsides or urban drainage."
      ]
    }
  }),

  makeLesson({
    id:"b1-climate-change",
    sectionId:"B1",
    title:"Climate change and the Caribbean",
    objectiveCodes:["14","15"],
    objectives:[
      "Explain the greenhouse effect and major human causes of climate change.",
      "Assess likely Caribbean impacts and distinguish mitigation from adaptation."
    ],
    introduction:"Caribbean states contribute a small share of global greenhouse-gas emissions compared with major emitters, yet the region is highly exposed to climate risks. Social Studies focuses on how climate change affects people, livelihoods, infrastructure and development choices.",
    noteSections:[
      {
        title:"Greenhouse effect and warming",
        paragraphs:[
          "The natural greenhouse effect keeps Earth warm enough for life. Human activities increase concentrations of greenhouse gases such as carbon dioxide and methane, strengthening heat retention and changing the climate system.",
          "Major drivers include burning fossil fuels, deforestation and some industrial and agricultural activities."
        ]
      },
      {
        title:"Caribbean impacts",
        paragraphs:[
          "Risks include sea-level rise, coastal erosion, heat stress, changes in rainfall, pressure on water supplies, coral-reef damage and stronger impacts from extreme weather. The exact effect varies by location.",
          "Tourism, agriculture, fisheries, housing, health and public infrastructure can all be affected. Poorer households may have fewer resources to recover after disasters."
        ]
      },
      {
        title:"Mitigation and adaptation",
        paragraphs:[
          "Mitigation reduces the causes of climate change, for example through renewable energy, energy efficiency and protection of carbon-storing ecosystems. Adaptation reduces vulnerability to impacts, for example by improving drainage, strengthening buildings, protecting water supplies and avoiding high-risk construction.",
          "Caribbean countries often need both. Adaptation cannot replace global emission reductions, and mitigation does not remove the need to prepare for impacts already occurring."
        ]
      }
    ],
    examples:[
      "A coastal town updates building rules and protects mangroves to reduce storm-surge risk. This is adaptation.",
      "A utility replaces fossil-fuel generation with solar and battery storage. This contributes to mitigation.",
      "A farmer changes planting dates and improves water storage in response to changing rainfall patterns."
    ],
    vocabulary:[
      term("greenhouse effect","Warming caused when atmospheric gases absorb and re-radiate heat."),
      term("climate change","Long-term changes in climate patterns, now strongly influenced by human greenhouse-gas emissions."),
      term("mitigation","Actions that reduce greenhouse-gas emissions or increase removal of greenhouse gases."),
      term("adaptation","Adjustments that reduce harm from actual or expected climate impacts."),
      term("sea-level rise","Long-term increase in average sea level caused mainly by ocean warming and melting land ice."),
      term("resilience","Ability to prepare for, withstand and recover from shocks.")
    ],
    keyPoints:[
      "The natural greenhouse effect is necessary; human emissions strengthen it and drive current warming.",
      "Caribbean development is exposed through coasts, water, agriculture, health and infrastructure.",
      "Mitigation addresses causes; adaptation addresses vulnerability and impacts."
    ],
    interactive:{
      type:"sorter",
      title:"Mitigation or adaptation?",
      prompt:"Classify each climate response.",
      categories:["Mitigation","Adaptation"],
      items:[
        {label:"Installing solar electricity",category:"Mitigation"},
        {label:"Raising critical buildings above flood level",category:"Adaptation"},
        {label:"Improving energy efficiency",category:"Mitigation"},
        {label:"Expanding drought-resistant water storage",category:"Adaptation"}
      ]
    },
    practice:[
      question("Which is an adaptation measure?",["Improving flood drainage","Reducing fossil-fuel use","Increasing energy efficiency","Protecting forests mainly to store carbon"],0,"Drainage reduces vulnerability to flooding, so it is adaptation."),
      question("Why is climate change a development issue for the Caribbean?",["It can affect infrastructure, health, tourism, agriculture and public finances","It affects only polar regions","It has no economic effects","It concerns weather only"],0,"Climate impacts can affect many sectors and create large social and economic costs.")
    ],
    exam:{
      marks:12,
      prompt:"Explain THREE ways climate change can affect Caribbean development and propose ONE adaptation measure and ONE mitigation measure.",
      guide:[
        "Explain impacts through sectors such as coasts, water, agriculture, health or tourism.",
        "Label adaptation and mitigation correctly.",
        "Show how each proposed measure works."
      ]
    }
  }),

  makeLesson({
    id:"b1-environment-data-action",
    sectionId:"B1",
    title:"Environmental data and social action",
    objectiveCodes:["16","17","18"],
    objectives:[
      "Interpret environmental data from tables, graphs and maps.",
      "Use evidence to propose and justify solutions.",
      "Demonstrate practical care and concern for the natural environment."
    ],
    introduction:"Environmental action is strongest when it begins with evidence. Before launching a cleanup, water-conservation drive or recycling campaign, students should identify the problem, collect data, set a target and later check whether the action worked.",
    noteSections:[
      {
        title:"From observation to evidence",
        paragraphs:[
          "Environmental data can include waste counts, water quality, rainfall, temperature, shoreline change, forest cover or energy use. The best measure depends on the problem.",
          "If a school says litter is increasing, students could record the number and type of items found in fixed locations at the same time each week. This produces evidence that can be compared."
        ]
      },
      {
        title:"Design a practical intervention",
        paragraphs:[
          "A useful action plan states the problem, target group, objective, activities, resources, timeline and method for measuring success. 'Save the environment' is too broad. 'Reduce single-use plastic bottles collected in the school yard by 30 percent over six weeks' is measurable.",
          "Solutions should be judged by cost, feasibility, likely effect and fairness."
        ]
      },
      {
        title:"Care is shown through action",
        paragraphs:[
          "Environmental responsibility includes conservation, recycling, advocacy, volunteerism and individual or collective effort. It also includes asking whether an activity actually reduces harm.",
          "A cleanup can remove litter, but preventing litter through bins, education, rules and reduced packaging may address the source of the problem more effectively."
        ]
      }
    ],
    examples:[
      "Students conduct a weekly waste audit, identify plastic bottles as the largest category and introduce refill stations.",
      "A community compares rainfall and water-use data before designing a conservation campaign.",
      "A youth group maps blocked drains before the rainy season and shares the evidence with local authorities."
    ],
    vocabulary:[
      term("environmental data","Measurements or observations used to describe environmental conditions or change."),
      term("indicator","A measurable sign used to track a condition or result."),
      term("action plan","A structured plan stating objectives, activities, resources, responsibilities and measures of success."),
      term("advocacy","Organised action intended to influence awareness, behaviour or policy."),
      term("evaluation","Assessment of whether an activity achieved its intended result.")
    ],
    keyPoints:[
      "Environmental claims are stronger when supported by measured evidence.",
      "Good action plans use specific and measurable objectives.",
      "Evaluation tells you whether an intervention actually worked."
    ],
    interactive:{
      type:"action-plan",
      title:"Make the objective measurable",
      prompt:"Which objective is best for a six-week school waste project?",
      items:[
        {label:"Reduce plastic bottles found in the school yard by 30 percent from the baseline count",good:true,reason:"It states what will change, by how much and relative to a measured baseline."},
        {label:"Make everyone care about nature",good:false,reason:"It is too broad and difficult to measure."},
        {label:"Fix pollution everywhere",good:false,reason:"The scope is far too large for a school project."}
      ]
    },
    practice:[
      question("Why is a baseline useful in an environmental project?",["It provides a starting measurement for comparison","It guarantees success","It replaces the action plan","It removes the need for data"],0,"A baseline lets students measure whether conditions changed after the intervention."),
      question("Which is the strongest evidence that a litter campaign worked?",["Comparable waste counts before and after the campaign","A student says it felt cleaner","One photograph with no date","A slogan"],0,"Comparable measurements provide stronger evidence of change.")
    ],
    exam:{
      marks:12,
      prompt:"Design a small environmental action project for a school or community. State the problem, ONE measurable objective, TWO activities and TWO types of data you would collect to evaluate success.",
      guide:[
        "Keep the project realistic and local.",
        "Make the objective measurable.",
        "Choose data that directly indicates whether the objective was achieved."
      ]
    }
  })
]);
