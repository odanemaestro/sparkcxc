import archiveFigures from "./geographyArchiveFigures.json";
import { archivedWritten, figures } from "./geographyArchiveModels";
import paper032May2015 from "./geographyArchive2015";
import paper032May2014 from "./geographyArchive2014";
import paper2May2021 from "./geographyArchive2021";
import paper2May2019 from "./geographyArchive2019";
import paper2May2017 from "./geographyArchive2017";
import paper2May2016 from "./geographyArchive2016";
import paper2May2015 from "./geographyArchive2015Paper2";
import paper2May2014 from "./geographyArchive2014Paper2";
import paper2May2013 from "./geographyArchive2013Paper2";
import paper2May2012 from "./geographyArchive2012Paper2";
import paper2May2011 from "./geographyArchive2011Paper2";
import paper2May2010 from "./geographyArchive2010Paper2";
import paper2May2009 from "./geographyArchive2009Paper2";
import paper2May2008 from "./geographyArchive2008Paper2";
import paper2May2007 from "./geographyArchive2007Paper2";
import paper2May2006 from "./geographyArchive2006Paper2";
import paper2May2005 from "./geographyArchive2005Paper2";
import paper2May2022 from "./geographyArchive2022";
import paper2May2024 from "./geographyArchive2024Paper2";
import paper1May2024 from "./geographyArchive2024";
import paper1May2023 from "./geographyArchive2023";
import paper1May2020 from "./geographyArchive2020";
import paper1May2021 from "./geographyArchive2021Paper1";
import paper1May2019 from "./geographyArchive2019Paper1";
import paper1May2018 from "./geographyArchive2018Paper1";
import paper1May2017 from "./geographyArchive2017Paper1";
import paper1May2016 from "./geographyArchive2016Paper1";
import paper1May2015 from "./geographyArchive2015Paper1";
import paper1May2014 from "./geographyArchive2014Paper1";
import paper1May2013 from "./geographyArchive2013Paper1";
import paper1May2012 from "./geographyArchive2012Paper1";
import paper1May2011 from "./geographyArchive2011Paper1";
import paper1May2010 from "./geographyArchive2010Paper1";
import paper1May2009 from "./geographyArchive2009Paper1";
import paper1May2007 from "./geographyArchive2007Paper1";
import paper1May2005 from "./geographyArchive2005Paper1";
import paper1May2003 from "./geographyArchive2003Paper1";
import paper1May2002 from "./geographyArchive2002Paper1";
import paper1May2001 from "./geographyArchive2001Paper1";
import paper032May2012 from "./geographyArchive2012";
import paper032May2013 from "./geographyArchive2013";
import paper032May2011 from "./geographyArchive2011";
import paper032May2009 from "./geographyArchive2009";
import paper032May2008 from "./geographyArchive2008";
import paper032May2007 from "./geographyArchive2007";
import paper032May2006 from "./geographyArchive2006";
import paper032May2005 from "./geographyArchive2005";

const id1 = "2025-mj-p1";
const id2 = "2023-mj-p2";
const id3 = "2010-mj-p3";
const id4 = "2018-mj-p2";

const monthlyWeather = {
  caption:"Average monthly rainfall and temperature at a location in the Caribbean",
  rowHeading:"Month", columns:["J","F","M","A","M","J","J","A","S","O","N","D"],
  rows:[
    ["Temperature (°C)",24,24,26,26,26,27,28,28,27,26,26,26],
    ["Rainfall (mm)",103,93,88,128,201,167,117,245,200,260,169,87],
  ],
};
const density = {
  caption:"Population data for four Caribbean countries, 2000",
  rowHeading:"Country", columns:["Population density (per km²)","Area (km²)","Population"],
  rows:[
    ["Barbados","","432","268 792"],["Guyana","34.9","21 500","751 223"],
    ["Jamaica","237.3","10 990","2 607 632"],["Trinidad and Tobago","246.2","5 128","1 262 366"],
  ],
};
const paper1Sources = {
  1:"eastern-caribbean",2:"eastern-caribbean",3:"eastern-caribbean",4:"eastern-caribbean",
  8:"island-contours",9:"island-contours",10:"island-contours",
  12:"slope",13:"slope",15:"landforms",16:"landscape",19:"farm-land",
  20:"weather-system",21:"weather-system",23:"earthquake",24:"plate-margins",25:"plate-margins",
  29:"highland",30:"coastline",31:"oxbow",33:"river-profile",34:"hurricane",35:"rainforest",
  41:"drainage",44:"watershed",48:"settlement",49:"settlement",51:"employment",57:"deforestation",58:"deforestation",
};

const may2025 = [
  ["In which direction should an airplane fly on leaving Marie-Galante to go to Saba?", "Northeast", "Southeast", "Southwest", "Northwest"],
  ["The grid bearing of Sint Eustatius from Marie-Galante is approximately", "045°", "135°", "225°", "315°"],
  ["St Martin is located on the line of latitude that is approximately", "18° N", "18° S", "63° E", "63° W"],
  ["The island labelled X is closest to which of the following regions?", "North America", "South America", "Central America", "Western America"],
  ["What is the average annual temperature at this location?", "25.2 °C", "26.2 °C", "27.2 °C", "28.2 °C"],
  ["The rainfall pattern on the table indicates that", "rainfall occurs throughout the year", "most of the rainfall occurs at the beginning of the year", "there are small amounts of rainfall throughout the year", "there is little variation in the rainfall from month to month"],
  ["The annual temperature range for this location is", "26 °C", "24 °C", "4 °C", "2 °C"],
  ["What is the contour interval used on the map?", "50 ft", "100 ft", "200 ft", "300 ft"],
  ["Which of the following settlement patterns is shown in the grid square labelled A?", "Linear", "Nuclear", "Isolated", "Dispersed"],
  ["What is the grid reference of the Trig. station in the grid square labelled A?", "567047", "516047", "049518", "047516"],
  ["Which of the following phrases refers to ‘northings’?", "Horizontal lines that decrease in value northwards", "Horizontal lines that increase in value northwards", "Vertical lines that decrease in value northwards", "Vertical lines that increase in value northwards"],
  ["What type of slope is present at X Y?", "Dip", "Scarp", "Convex", "Concave"],
  ["The approximate gradient of the line AB is", "1 in 10", "1 in 20", "1 in 40", "1 in 50"],
  ["Which of the following is an example of an isopleth map?", "Dot map", "Contour map", "Political map", "Vegetation map"],
  ["The landforms shown at X and Y, respectively, are a", "coastal plain and round-topped hill", "ridge and round-topped hill", "coastal plain and plateau", "plateau and ridge"],
  ["The landform shown is MOST likely a", "cave", "doline", "cockpit", "pothole"],
  ["Based on the data in the table, how many persons per square kilometre could be found in Barbados in the year 2000?", "500.0", "622.2", "1105.7", "1607.0"],
  ["Based on the data in the table, the country with the LOWEST population density has the", "largest area", "smallest area", "largest population", "smallest population"],
  ["Which statement BEST describes the farm depicted above?", "It practises monoculture.", "Cauliflower is the main crop grown.", "More than half of the farm is used for crops.", "More than half of the farm is used to rear animals."],
  ["What type of weather system does the map suggest that the southern part of Cuba is experiencing?", "Hurricane", "Cold front", "Warm front", "Anticyclone"],
  ["What type of weather is being experienced at the country labelled X?", "Clear sky with light winds", "Clear sky with strong winds", "Overcast sky with light winds", "Overcast sky with strong winds"],
  ["Which of the following is a suitable condition for the formation of acidic volcanic cones?", "Lava that is low in silica", "Viscous lava that solidifies quickly", "Gentle and continuous lava eruptions", "Lava that flows in thin sheets over long distances"],
  ["Which of the points in the diagram represents the focus?", "W", "X", "Y", "Z"],
  ["Which of the following plate margins is shown?", "Divergent", "Transform", "Convergent", "Conservative"],
  ["Which of the following features are shown at R?", "Volcanoes", "Lava plateaux", "Fold mountains", "Block mountains"],
  ["Which of the following acids increases the rate of chemical weathering in karst landscapes?", "Nitric", "Sulfuric", "Carbonic", "Hydrochloric"],
  ["Fringing reefs are said to be", "horse shoe in shape", "built around sunken volcanoes", "built on a submerged platform", "separated from the land by a narrow lagoon"],
  ["The process of ‘exfoliation’ may be defined as the", "peeling off of the outer layers of rocks", "splitting of rocks into rectangular blocks", "movement of rocks due to the action of rivers", "disintegration of rocks by root penetration into crevices"],
  ["At what height, in metres, above sea level does condensation begin?", "200", "400", "600", "1200"],
  ["The feature labelled X in the diagram above is MOST likely the result of the", "longshore drift", "changes in sea level", "frequency of the waves", "changes in wind direction"],
  ["Which of the following sequences is correct for the formation of an ox-bow lake?", "I, II, III, IV", "II, I, IV, III", "IV, III, II, I", "III, I, IV, II"],
  ["Which of the following statements explains how vegetation contributes to the development of soils?", "Decaying vegetation produces a habitat for earthworms.", "Vegetation decomposes to produce the organic matter in soil.", "Roots, twigs and leaves are washed downwards to increase the depth of soil.", "Vegetation provides the parent material which helps in the formation of soil structure."],
  ["Which of the following processes is dominant in the first stage of the river?", "Erosion", "Deflation", "Deposition", "Transportation"],
  ["Which of the following weather and sea conditions are experienced during the passage of the centre of the hurricane as it moves from R to S?", "Light winds and calm seas", "Light winds and rough seas", "Strong winds and calm seas", "Strong winds and rough seas"],
  ["The sparse vegetation on the forest floor is MOST likely due to a lack of", "humus", "rainfall", "sunlight", "soil nutrients"],
  ["Which of the following is NOT an adaptation of the plants in a tropical rainforest?", "Thin smooth barks", "Large shallow roots", "Waxy pointed leaves", "Water-storing trunks"],
  ["The upper level of the zone of saturation in permeable rocks is referred to as", "a spring", "an aquifer", "the watershed", "the water table"],
  ["As one climbs a mountain, the surrounding temperature", "decreases", "increases", "fluctuates", "remains constant"],
  ["Which of the following actions can be used to reduce the emission of greenhouse gases?", "Reduced use of energy efficient technology", "Increased use of chlorofluorocarbons (CFCs)", "Increased large-scale cattle farming", "Increased use of solar power"],
  ["Which of the following actions is NOT a regional response to a natural disaster?", "Mobilizing emergency relief", "Spreading financial aid fairly", "Predicting the occurrence of other hazards", "Challenging the reconstruction of affected areas"],
  ["Which of the following drainage patterns is illustrated in the diagram?", "Trellis", "Radial", "Braided", "Dendritic"],
  ["Which of the following is a benefit of mangrove wetlands to Caribbean countries?", "They contribute to beach formation.", "They bring stability to coastal areas.", "Their root system loosens the sediments from rivers.", "They grow rapidly and cause congestion in waterways."],
  ["The type of soil related to the equatorial climate is called", "latosol", "alluvium", "terra rossa", "chernozem"],
  ["What do the dotted lines in the diagram represent?", "A plateau", "The hilltop", "The watershed", "The drainage basin"],
  ["Which of the following climate types is affected by the trade winds all year round, experiences a wet and dry season, and has an annual rainfall between 1200 and 2000 mm?", "Equatorial", "Dry equatorial", "Tropical marine", "Tropical continental"],
  ["Which of the following features is typical of large-scale commercial farming?", "Low acreage", "Multi-crop system", "Subsistence practices", "Intensive mechanization"],
  ["The MOST serious threat to the rivers of the Caribbean comes from", "silting", "logging", "quarrying", "overfishing"],
  ["Which of the following is the MOST likely reason for the establishment of the urban centre in that location on the sketch map?", "The nearness of the sea", "The presence of the swamp", "The nearness of the mountains", "The presence of the main road"],
  ["In which direction is the town MOST likely to expand?", "South", "North", "West", "East"],
  ["Which of the following types of farming is capital intensive and uses high-yielding varieties of seeds to cultivate crops?", "Mixed farming", "Market gardening", "Subsistence farming", "Commercial arable farming"],
  ["Which of the following factors is MOST likely the cause of the rapid increase in the tertiary sector as shown on the diagram?", "A large, unskilled labour force is available.", "Increased demand for services due to improved standard of living.", "Increased profitability of primary industries resulting from a tax break.", "Government policies which encouraged the development of industrial estates."],
  ["Which of the following benefits would MOST likely be gained by Caribbean countries which diversify their economies through industrialization?", "Protection from economic losses", "Greater purchasing power of the population", "Less dependence on a single economic activity", "Increased trade with North and Latin American countries"],
  ["What is the MAIN difference between renewable and non-renewable resources?", "Uses in everyday life", "Where they are found", "Length of time to regenerate", "Length of time for which they could be stored"],
  ["Which of the following is a benefit of urban growth to Caribbean cities?", "Increased economic activity", "Expansion of cities outwards", "Growth of squatter settlements", "Greater demand for transportation"],
  ["Which of the following factors has contributed the LEAST to the development of the food processing industry in the Caribbean?", "High food import bill", "Availability of raw materials", "Level of government intervention", "Competition on the global market"],
  ["Changes in global trade policies impact traditional export crops from the Caribbean because they", "stimulate policies", "encourage competition", "encourage climate change", "increase preferential markets"],
  ["Which of the following consequences BEST represent(s) X?", "Flooding", "Landslides", "Reduced rainfall", "Decreased canopy"],
  ["What other consequence can result from tropical deforestation?", "Lumbering", "Loss of flora", "Increase in fauna", "Increase in underground water"],
  ["Which of the following factors has positively influenced the development of agriculture in the Caribbean over the last ten years?", "The abundance of flat arable land", "The need to reduce the importation of food", "The availability of a highly skilled labour force", "The existence of favourable trade agreements"],
  ["Which of the following measures is used in the sustainable management of fisheries in the Caribbean?", "The removal of fishing quotas", "The relaxation of maritime laws", "The establishment of fish sanctuaries", "The reduction of closed fishing seasons"],
];

const birthRate = {
  caption:"Table 1. Country Z — Birth rate per 1000 of the population, 1990–2015",
  rowHeading:"Year", columns:["Birth rate per 1000"],
  rows:[[1990,"19.6"],[1995,"15.3"],[2000,"14.3"],[2005,"13.3"],[2010,"14.5"],[2015,"14.0"]],
};
const populationTrends = {
  caption:"Table 2. Population trends of Barbados and Nigeria, 2019–2021",
  rowHeading:"Country", columnGroup:"Birth rates per 100 people", columns:["2019","2020","2021"],
  rows:[["Barbados","10.7","10.6","10.6"],["Nigeria","37.7","37.3","36.9"]],
};
const farmLand = {
  caption:"Table 3. Distribution of agricultural land",
  rowHeading:"County", columns:["Area (hectares)"],
  rows:[["St George","10 500"],["Victoria","10 100"],["St Patrick","8 700"],["St Andrew/St Davis","9 600"]],
};
const may2023 = [
  {
    title:"Map reading", prompt:"Study the map extract of a section of Montego Bay, Jamaica, drawn to a scale of 1:50 000, and answer the following questions.", figures:figures(id2,"montego-bay"),
    parts:[
      ["(a)", "Identify the crop which is produced in grid square 4400.",1],
      ["(b)", "State the six-figure grid reference of the trigonometrical station at Cacoon Castle.",2],
      ["(c)", "What is the direction of the hospital at Fairfield Estate (5300) from the hospital in Montego Bay (5302)?",1],
      ["(d)", "Measure the grid bearing of the post office at Montpelier (5191) from the church at Copse (4792).",2],
      ["(e)", "Measure the distance along the railway line from the point where the railway crosses the road at Gordons Crossing (529988) to the point where it ends in Montego Bay, to the nearest 100 metres.",2],
      ["(f)", "If the height of the post office in grid square 4397 is 100 metres, calculate the gradient of the slope from the trigonometrical station at Cacoon Castle in grid square 4296.",4],
      ["(g)", "State FOUR features of the drainage of the area shown in the map extract.",4],
      ["(h)", "State THREE characteristics of the road network shown in the map extract.",3],
      ["(i)", "Suggest THREE reasons, supported by evidence from the map, for the distribution of settlements in the area.",6],
    ],
  },
  {
    title:"Natural systems", parts:[
      ["(a)", "Figure 1 shows a map of the Caribbean and the North Atlantic Ocean. On the map, (i) insert TWO labelled isobars around H to indicate that it is a high pressure system, (ii) draw the weather symbol for a cold front over the northern region of the Caribbean, (iii) using an arrow, draw the typical path of a hurricane in the Caribbean region as it moves across the Atlantic Ocean, and (iv) shade the region where tropical waves usually form.",5,{drawing:true,background:archiveFigures[id2]["north-atlantic"]}],
      ["(b)(i)", "A hurricane warning is issued to the public by the meteorological office. State TWO reasons why a hurricane warning is normally issued.",2],
      ["(b)(ii)", "Briefly describe TWO weather conditions associated with the passage of a hurricane at EACH of the following stages: before, during and after.",6],
      ["(c)", "Figure 2 shows a drawing of a tropical island. Explain how TWO of the following factors might directly influence the weather and climate on the tropical island: altitude (height above sea level), latitude (distance from the equator), and distance from the sea.",4,{figures:figures(id2,"tropical-island")}],
      ["(d)", "Disasters resulting from Category 5 hurricanes in the Caribbean affect several areas of development. Explain ONE possible long-term effect of such disasters on EACH of the following areas of development in the Caribbean: infrastructure, economy, environment and social.",8],
    ],
  },
  {
    title:"Human systems", table:birthRate, parts:[
      ["(a)(i)", "Using the data in Table 1, draw a line graph on the grid provided to illustrate the birth rate of Country Z. Label the vertical axis.",4,{drawing:true,background:archiveFigures[id2]["birth-rate-grid"]}],
      ["(a)(ii)", "Write ONE statement about the population of Country Z for the period.",1],
      ["(b)(i)", "Outline how TWO of the following factors influence the distribution and density of the population in the Caribbean: physical, historical and socioeconomic.",4],
      ["(b)(ii)", "Table 2 shows the birth rates of Barbados and Nigeria for the period 2019–2021. Outline TWO possible reasons for the differences in birth rates between Barbados and Nigeria.",4,{table:populationTrends}],
      ["(c)", "Explain the TWO causes of population growth in urban areas of the Caribbean.",6],
      ["(d)", "Explain TWO measures that have been used in the Caribbean to control the rate of urbanization.",6],
    ],
  },
  {
    title:"Natural and human systems", table:farmLand, parts:[
      ["(a)", "Using the data in Table 3, complete the bar chart to show the area of agricultural land for each county. Label the vertical axis.",5,{drawing:true,background:archiveFigures[id2]["agriculture-grid"]}],
      ["(b)(i)", "Figure 3 shows a picture of a type of farming found in the Caribbean. State the type of farming shown in Figure 3.",1,{figures:figures(id2,"farming-photo")}],
      ["(b)(ii)", "List THREE features of the type of farming shown in Figure 3.",3,{figures:figures(id2,"farming-photo")}],
      ["(c)(i)", "With reference to farming, define the term agribusiness.",2],
      ["(c)(ii)", "With reference to farming, define the term sustainable management.",2],
      ["(d)", "Explain the benefits of TWO sustainable farming practices implemented by farmers in the Caribbean.",6],
      ["(e)", "Discuss TWO negative impacts that human activities have on the tropical rainforests in a named CARICOM country.",6],
    ],
  },
];

const channel = {
  caption:"Table 1. Channel cross-section measurements from the left bank",
  rowHeading:"Point", columns:["Station A depth (cm)","Station B depth (cm)"],
  rows:[[1,10,15],[2,20,20],[3,30,30],[4,20,35],[5,20,45],[6,30,33],[7,35,20],[8,15,12],["Nature of bed","Coarse sand","Sand and pebbles"]],
};
const velocity = {
  caption:"Table 2. Stream velocity at selected fractions of its depth",
  rowHeading:"Fraction of depth measured from top", columns:["Velocity (m/sec)"],
  rows:[["0.1","0.75"],["0.2","0.72"],["0.3","0.67"],["0.4","0.63"],["0.5","0.57"],["0.6","0.52"],["0.7","0.43"],["0.8","0.30"],["0.9","0.09"]],
};
const drawOn = name => ({drawing:true,background:archiveFigures[id3][name]});
const may2010 = [
  {
    prompt:"Use the map extract of Pointe Michel, Dominica, at a scale of 1:25 000. You are advised to spend no more than 15 minutes on Question 1.",
    figures:figures(id3,"pointe-michel"),
    parts:[
      ["(a)", "Figure 1 is a sketch outline map of the extract at a scale of 1:100 000. Show the position of Pointe Michel, Berekua and Geneva Estate on Figure 1.",1,drawOn("location-outline")],
      ["(b)", "Figure 2 is an incomplete sketch map between Eastings 71 and 74 and Northings 84 and 87 at the same scale as the extract. Complete the sketch map by adding the road going towards the point 710870, the villages of Berekua and Geneva, Geneva Estate, the Micham River and the forested area.",3,drawOn("geneva-sketch")],
    ],
  },
  {
    prompt:"You are conducting research to find out if farming practices at a banana estate have been influenced by changes in the international marketing of bananas over the last five years.",
    parts:[["", "Frame a question or state a hypothesis (your belief) which will guide the collecting of data in the field. This will be the purpose or aim of your research.",2]],
  },
  {
    parts:[
      ["(a)", "For your research in Question 2, list SIX items (EXCLUDING the size and position of the estate) on which you would collect information about farming practices in the field.",6],
      ["(b) How", "Describe how you would conduct the research and record the data.",3],
      ["(b) When", "Describe when you would conduct the research and record the data.",2],
      ["(c)(i)", "Identify ONE problem (EXCLUDING the weather, illness and injury) that you may encounter in conducting the research in 3 (b).",1],
      ["(c)(ii)", "State how you would overcome the problem that you identified in 3 (c) (i).",2],
    ],
  },
  {
    prompt:"Study Table 1, which presents the results of a survey of the channel of a stream at two stations on the same day. The stations are about 1 km apart. Measurements were taken at intervals of 50 cm across the stream, starting and ending 25 cm from the edge of the water in both cases.",
    table:channel,
    parts:[
      ["(a)", "Using the data in Table 1, prepare a diagram of the cross-section of the channel at Station A on the graph axes provided in Figure 3, where 1 cm represents 25 cm on both axes. Assume the sides of the channel are straight.",3,drawOn("channel-profile-grid")],
      ["(b)", "Study the data in Table 1. Suggest THREE reasons for the differences in the shape of the channel shown by the measurements.",6],
    ],
  },
  {
    prompt:"Table 2 presents data for the velocity of a stream at different fractions of its depth at a sample station.",
    table:velocity,
    parts:[
      ["(a)(i)", "Using the data in Table 2, calculate the average velocity and state the depth fraction it matches in Table 2.",2],
      ["(a)(ii)", "Give TWO reasons for the differences in velocity with depth.",5],
      ["(b)", "On the axes provided in Figure 4, draw a line graph to illustrate the data presented in Table 2.",3,drawOn("velocity-grid")],
    ],
  },
  {
    prompt:"The five elements of a book which are used in a bibliography are:\nCity of publication\nName(s) of author(s)\nName of publisher\nTitle of publication\nYear of publication",
    parts:[["", "List the FIVE elements in the sequence in which they should be given in the bibliography.",1]],
  },
];

const settlementTypes = {
  caption:"Table 1. Types of settlement", rowHeading:"Type of settlement", columns:["Example of places from map extract"],
  rows:[["","Picodeau, Pichelin or Dubuc"],["Dispersed",""],["","Berekua, Soufrière, Pointe Michel, Scotts Head Village"]],
};
const immigration = {
  caption:"Table 2. Number of Caribbean immigrants in selected Caribbean countries in 2016",
  rowHeading:"Country", columns:["Number of immigrants"],
  rows:[["Antigua and Barbuda","13 000"],["The Bahamas","22 000"],["Jamaica","6 000"],["Trinidad and Tobago","28 000"]],
};
const soufriereProfile = {figures:figures(id4,"soufriere-profile")};
const portOfSpain = {figures:figures(id4,"port-of-spain-climograph")};
const latitudes = {figures:figures(id4,"major-latitudes")};
const may2018 = [
  {
    title:"Map reading", prompt:"Study the map extract of Pointe Michel, drawn to a scale of 1:25 000, and then answer the questions that follow.",
    figures:figures(id3,"pointe-michel"),
    parts:[
      ["(a)", "State the six-figure grid reference of the church at Berekua (eastern section of the map extract).",2],
      ["(b)", "What is the main land use in grid square 7287?",1],
      ["(c)", "State the compass direction of the Banana Shed at Geneva Estate (7285) from the church at Berekua.",1],
      ["(d)", "Determine the bearing of the trigonometrical station on Morne Plat Pays (6985) from the Banana Shed at Geneva Estate (7285).",2],
      ["(e)", "Measure the distance, in km, along the road from the police station at Soufrière (6783) to the road junction at Scotts Head Village (6781) (southwest coast).",2],
      ["(f)(i)", "Study Figure 1, which shows the long profile of the Soufrière River. At what height is the source of the river?",1,soufriereProfile],
      ["(f)(ii)", "Describe the slope between the source and the school.",2,soufriereProfile],
      ["(f)(iii)", "In what developmental stage is the river between the school and the sea?",1,soufriereProfile],
      ["(g)", "State FOUR features of the site where the town of Berekua is located.",4],
      ["(h)", "Complete Table 1 by inserting from the map the type of settlement for the example of places given and ONE example for the type of settlement given.",3,{table:settlementTypes}],
      ["(i)", "State THREE ways in which the relief has influenced the drainage of the area indicated on the map.",3],
      ["(j)", "State THREE ways in which the relief has influenced the settlements indicated on the map.",3],
    ],
  },
  {
    title:"Natural systems",
    parts:[
      ["(a)(i)", "Study Figure 2, which shows the average rainfall and temperature for Port of Spain in Trinidad for 2016. Which month has the HIGHEST rainfall?",1,portOfSpain],
      ["(a)(ii)", "Determine the annual temperature range.",1,portOfSpain],
      ["(a)(iii)", "Calculate the total rainfall for the TWO wettest months.",1,portOfSpain],
      ["(a)(iv)", "Which month has the LEAST rainfall?",1,portOfSpain],
      ["(a)(v)", "State ONE observation about the temperature in Port of Spain during the year.",1,portOfSpain],
      ["(b)(i)", "List TWO elements of weather.",2],
      ["(b)(ii)", "Define the term ‘climate’.",2],
      ["(b)(iii)", "Describe TWO characteristics EACH of rainfall and temperature in a tropical marine climate.",4],
      ["(c)", "Explain TWO ways in which water contributes to the weathering of rocks.",6],
      ["(d)", "Explain the role of climate in the production of latosols.",6],
    ],
  },
  {
    title:"Human systems", table:immigration,
    parts:[
      ["(a)", "Using the data provided in Table 2, construct a bar graph on the grid in Figure 3 to show the number of Caribbean immigrants in selected Caribbean countries in 2016. Give the graph a title and draw and label each bar accurately.",5,{drawing:true,background:archiveFigures[id4]["immigration-graph-grid"]}],
      ["(b)", "Outline TWO physical features which influence the distribution of population in the Caribbean.",4],
      ["(c)(i)", "Describe ONE push factor and ONE pull factor that has caused out-migration in the Caribbean since the 1990s.",4],
      ["(c)(ii)", "Using examples, explain THREE consequences of out-migration in the Caribbean since the 1990s.",6],
      ["(d)", "Explain how ONE physical factor and ONE economic factor influence the development of agriculture in the Caribbean.",6],
    ],
  },
  {
    title:"Natural and human systems",
    parts:[
      ["(a)(i)", "Figure 4 shows the world’s major lines of latitude labelled A, B, C, M and N. Identify the lines of latitude A, B and C.",3,latitudes],
      ["(a)(ii)", "State the latitude of M and N on Figure 4.",2,latitudes],
      ["(b)(i)", "Identify TWO features of an atoll.",2],
      ["(b)(ii)", "Identify TWO features of a fringing reef.",2],
      ["(b)(iii)", "Outline TWO reasons why corals grow best in clear water.",4],
      ["(c)", "Explain TWO ways in which coral reefs are beneficial to the Caribbean.",6],
      ["(d)", "Describe TWO measures that can reduce the over-exploitation of fish stock in the Caribbean.",6],
    ],
  },
];

export default [
  {
    id:`geo-${id1}`, paper:1, year:2025, duration:75, totalMarks:60, title:"May/June 2025 · Paper 1",
    questions:may2025.map(([prompt,...options], index) => {
      const number = index+1;
      const source = paper1Sources[number];
      return {id:`geo-${id1}-q${number}`,number,prompt,options,
        ...(source ? {figures:figures(id1,source)} : {}),
        ...(number >= 5 && number <= 7 ? {table:monthlyWeather} : {}),
        ...(number === 17 || number === 18 ? {table:density} : {}),
      };
    }),
  },
  paper1May2024,
  paper1May2023,
  paper1May2021,
  paper1May2019,
  paper1May2018,
  paper1May2017,
  paper1May2016,
  paper1May2015,
  paper1May2014,
  paper1May2013,
  paper1May2012,
  paper1May2011,
  paper1May2010,
  paper1May2009,
  paper1May2007,
  paper1May2005,
  paper1May2003,
  paper1May2002,
  paper1May2001,
  paper1May2020,
  archivedWritten(id2,2,2023,150,100,may2023),
  paper2May2022,
  paper2May2024,
  paper2May2021,
  paper2May2019,
  archivedWritten(id4,2,2018,150,100,may2018),
  paper2May2017,
  paper2May2016,
  paper2May2015,
  paper2May2014,
  paper2May2013,
  paper2May2012,
  paper2May2011,
  paper2May2010,
  paper2May2009,
  paper2May2008,
  paper2May2007,
  paper2May2006,
  paper2May2005,
  paper032May2015,
  paper032May2014,
  paper032May2013,
  paper032May2012,
  paper032May2011,
  archivedWritten(id3,3,2010,105,40,may2010),
  paper032May2009,
  paper032May2008,
  paper032May2007,
  paper032May2006,
  paper032May2005,
];
