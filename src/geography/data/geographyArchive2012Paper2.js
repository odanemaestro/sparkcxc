import { archivedSectionedPaper, figures } from "./geographyArchiveModels";

const id = "2012-mj-p2";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const districts = {
  caption: "Table 1. Population change for selected districts in St Lucia, 1990 and 2001",
  rowHeading: "District",
  columns: ["Population 1990", "Population 2001", "Percentage Change"],
  rows: [
    ["Vieux Fort", "13 140", "14 561", 10.8], ["Laborie", "7 491", "7 329", "−2.2"],
    ["Micoud", "15 088", "15 892", 5.3], ["Choiseul", "6 405", "5 993", "−6.4"],
    ["Soufriere", "7 683", "7 329", "−4.3"], ["Gros Islet", "13 505", "19 409", 43.7],
  ],
};
const agriculture = {
  caption: "Table 2. Contribution of agriculture to GDP and value of banana exports",
  rowHeading: "Measure",
  columns: ["St. Vincent 1990", "St. Vincent 2003", "St. Lucia 1990", "St. Lucia 2003", "Dominica 1990", "Dominica 2003"],
  rows: [["Agriculture as % of GDP", 21, "09", 15, "05", 25, 18], ["Banana exports (US $ million)", 45, 11, 70, 16, 31, "05"]],
};
const disasters = {
  caption: "Table 3. Number of people affected by five disasters in Dominica",
  rowHeading: "Year",
  columns: ["Total Number Affected"],
  rows: [[1995, "5 001"], [1999, 715], [2001, 175], [2004, 100]],
};
const greenhouse = {
  caption: "Table 4. Percentage distribution of global greenhouse gases in 2002",
  rowHeading: "Gases",
  columns: ["Percentage"],
  rows: [["Nitrous Oxide (NO)", 5], ["Methane (CH₂)", 10], ["Chlorofluorocarbons (CFCs)", 13], ["Carbon Dioxide (CO₂)", 72]],
};
const temperatures = {
  caption: "Table 5. Projected average temperature for Country X between 2010 and 2040",
  rowHeading: "Year",
  columns: ["2010", "2020", "2030", "2040"],
  rows: [["Temperature (°C)", 29, 30, 31, 32]],
};

export default archivedSectionedPaper(id, 2012, 100, [
  {
    prompt: "A map extract of part of Dominica (scale 1:25 000) is provided. Use it to answer the following questions.",
    figures: figures("2012-mj-p3", "wesley-map"),
    parts: [
      ["(a)(i)", "Study the area enclosed by the grid. What is the direction of the radio mast, close to the end of the Melville Hall Airfield, from the telephone exchange near Marigot Bay?", 1, { figures: figures(id, "marigot-grid") }],
      ["(a)(ii)", "What is the bearing of the straight section of the road from Lyons Estate along the Melville Hall Airfield towards the sea?", 2],
      ["(a)(iii)", "List FOUR different types of named buildings found in the village of Marigot.", 4],
      ["(a)(iv)", "What is the distance (to the nearest kilometre) ALONG the road from the bridge at the boxing plant in Cacoa Estate to the junction near the radio mast on the coast?", 2],
      ["(a)(v)", "Assume the bridge in (iv) is 65 metres above sea level. Calculate the gradient of the road from the bridge to the junction near the radio mast. Assume the height of the junction is 5 metres above sea level.", 2],
      ["(b)(i)", "Study the area enclosed by this grid. What is the six-figure grid reference of the minor trigonometrical (trig) station, T127?", 2, { figures: figures(id, "trig-station-grid") }],
      ["(b)(ii)", "What does the zigzag line passing through the trig station represent?", 1],
      ["(c)", "Study the whole map extract for parts (c), (d) and (e). Describe TWO features of the drainage of the area shown in the extract.", 4],
      ["(d)", "Describe TWO characteristics of the distribution of settlement.", 4],
      ["(e)", "Suggest THREE reasons, supported by evidence from the map, for the distribution of roads and tracks in the area.", 6],
    ],
  },
  {
    parts: [
      ["(a)(i)", "Study Figure 1, which shows features associated with volcanic activities. From the features lettered A to E, identify and name TWO intrusive volcanic features.", 2, { figures: figures(id, "volcanic-features") }],
      ["(a)(ii)", "From the features lettered A to E, identify and name TWO extrusive volcanic features.", 2],
      ["(b)(i)", "For either divergent or convergent plate boundaries, name TWO features which usually develop there.", 2],
      ["(b)(ii)", "Describe what happens at the boundary.", 6],
      ["(c)", "Explain the formation of any THREE volcanic features and how these may change over time.", 12],
    ],
  },
  {
    parts: [
      ["(a)(i)", "Study Figure 2, which shows movement of water in the hydrological cycle. Name any THREE of the processes indicated by the letters A, B, C and D.", 3, { figures: figures(id, "water-movement") }],
      ["(a)(ii)", "State the name of the level X.", 1],
      ["(b)(i)", "Describe TWO processes which occur in a river channel.", 4],
      ["(b)(ii)", "Select ONE of the following features found in a river valley and explain how it develops.\nWaterfall OR flood plain", 6],
      ["(c)(i)", "Describe TWO characteristics of limestone.", 4],
      ["(c)(ii)", "Explain how either swallow holes or stalactites are formed in limestone areas of the Caribbean.", 6],
    ],
  },
  {
    prompt: "Figure 3 is a climate graph which shows average monthly precipitation and temperature for a climatic region. Study Figure 3 and answer the questions that follow.\nSource: R. B. Burnett, General Geography in Diagrams, Longman, 1976, p. 150.",
    figures: figures(id, "climate-graph"),
    parts: [
      ["(a)(i)", "Name the climatic region represented by the data.", 1],
      ["(a)(ii)", "State the month with the LOWEST temperature.", 1],
      ["(a)(iii)", "What is the approximate range of average monthly temperature for the year?", 1],
      ["(a)(iv)", "What is the combined TOTAL rainfall for the months of September and October?", 1],
      ["(b)", "Describe the main characteristics of TWO of the following weather systems experienced in the Caribbean.\nHurricanes\nTropical Waves\nCold Fronts\nInter Tropical Convergence Zone", 8],
      ["(c)", "Explain SIX ways in which the vegetation of either tropical rain forests or tropical grasslands is influenced by climate.", 12],
    ],
  },
  {
    prompt: "Study Table 1, which shows population change in several districts in St Lucia between 1990 and 2001, and answer the questions that follow.\nSource: Government of St Lucia, Statistical Department.",
    table: districts,
    parts: [
      ["(a)(i)", "Which district had the HIGHEST population increase?", 1],
      ["(a)(ii)", "What was the percentage change in population in Choiseul?", 1],
      ["(a)(iii)", "What was the actual population change for Vieux Fort?", 1],
      ["(a)(iv)", "Which district had the SMALLEST population change?", 1],
      ["(b)(i)", "Describe TWO economic benefits of international migration to the Caribbean.", 4],
      ["(b)(ii)", "Outline TWO strategies that have been implemented to reduce urbanization in a named Caribbean country.", 4],
      ["(c)", "With reference to specific examples in the Caribbean, explain how THREE of the following factors influence population distribution.\nRelief\nNatural vegetation\nSoils\nEmployment opportunities", 12],
    ],
  },
  {
    prompt: "Study Table 2, which shows the contribution of agriculture to GDP and the value of banana exports for three countries for 1990 and 2003, and answer the questions that follow.\nSource: Wilson, The Caribbean Environment for CXC Geography (2005), p. 147.",
    table: agriculture,
    parts: [
      ["(a)(i)", "What was the combined value of banana exports in 2003?", 1],
      ["(a)(ii)", "Which country had the BIGGEST difference in the value of its banana exports between 1990 and 2003?", 1],
      ["(a)(iii)", "What is the trend in banana exports over the period?", 1],
      ["(a)(iv)", "Which country had the HIGHEST reliance on agriculture?", 1],
      ["(b)", "Describe FOUR ways in which the food processing or garment industry is important in the Caribbean.", 8],
      ["(c)(i)", "With reference to a named Caribbean country, explain how the tourism industry has been affected by the recent global economic recession. Include THREE points in your answer.", 6],
      ["(c)(ii)", "Explain THREE challenges faced by either mining or fishing or forestry in a named Caribbean country.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a map of a named Caribbean country. On the map show clearly and name ONE area where commercial arable farming is important.", 4, { drawing: true }],
      ["(b)(i)", "List FOUR important roles of agriculture in the Caribbean.", 4],
      ["(b)(ii)", "Describe TWO problems facing peasant farmers in the Caribbean.", 4],
      ["(c)(i)", "Account for the declining contribution of agriculture to the economy of the Caribbean. Use the following headings.\nCost of production\nPrices\nEmployment\nAcreage", 8],
      ["(c)(ii)", "Compare diversification in commercial arable farming in a named Caribbean country with diversification in the Prairies of Canada. Your response must include TWO points of comparison.", 4],
    ],
  },
  {
    parts: [
      ["(a)", "Table 3 shows the number of people affected by five disasters in Dominica. Using a scale of 1 cm to represent 500 people, construct a bar graph to illustrate this data using the grid provided. Do not shade the bars.\nSource: EM-DAT, The OFDA/CRED International Disaster Database, 30 October 2009.", 4, { ...drawing("disasters-grid"), table: disasters }],
      ["(b)(i)", "Identify TWO types of natural hazards in the Caribbean and state what makes them hazards.", 4],
      ["(b)(ii)", "Describe TWO ways in which a natural hazard has affected a Caribbean country.", 4],
      ["(c)(i)", "Choose a natural hazard in a named Caribbean country and explain how its impact can be reduced by using TWO individual precautions.", 6],
      ["(c)(ii)", "Explain how the impact of the chosen hazard can be reduced by using TWO national precautions.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Table 4 presents information on the percentage distribution of global greenhouse gases in 2002. Construct a pie chart, with diameter 6 cm, to illustrate the information presented in the table.", 4, { drawing: true, table: greenhouse }],
      ["(b)(i)", "Define the term ‘pollution’.", 2],
      ["(b)(ii)", "Name ONE type of pollution and state ONE possible cause of the pollution named.", 2],
      ["(b)(iii)", "Describe TWO ways in which the type of pollution named in (b) (ii) can be reduced.", 4],
      ["(c)(i)", "Explain how any THREE actions by humans may cause coral reef destruction.", 6],
      ["(c)(ii)", "Describe THREE measures that can be used to reduce coral reef degradation.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "On the grid provided, use the data in Table 5 to draw a line graph of the estimated projected average temperatures for Country X between 2010 and 2040.", 4, { ...drawing("temperature-grid"), table: temperatures }],
      ["(b)(i)", "Define the terms\na) global warming [2 marks]\nb) greenhouse effect. [2 marks]", 4],
      ["(b)(ii)", "Describe TWO causes of global warming.", 4],
      ["(c)(i)", "Explain TWO likely effects of global warming on the Caribbean.", 4],
      ["(c)(ii)", "Explain TWO causes of deforestation in the Caribbean.", 4],
      ["(c)(iii)", "Using examples from the Caribbean, explain TWO consequences of deforestation.", 4],
    ],
  },
]);
