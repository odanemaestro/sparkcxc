import { archivedSectionedPaper, figures } from "./geographyArchiveModels";

const id = "2007-mj-p2";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const economies = {
  caption: "Table 1. Structure of world economies",
  columnGroup: "Percentage Gross Domestic Product (% GDP)",
  rowHeading: "Activity",
  columns: ["Low Income Countries", "Middle Income Countries", "High Income Countries"],
  rows: [["Agriculture (A)", 27, 10, 2], ["Industry (I)", 30, 36, 30], ["Services (S)", 43, 55, 64]],
};
const employment = {
  caption: "Table 2. Employment (thousand persons)",
  rowHeading: "Year",
  columns: ["1998", "1999", "2000", "2001", "2004"],
  rows: [["Agriculture (’000)",5.2,5.2,4.8,5.4,4.4],["Tourism (’000)",13.8,12.3,14.1,13.7,12.2]],
};
const waste = {
  caption: "Table 3. Waste produced in the BVI",
  rowHeading: "Components",
  columns: ["Mass (Tons per day)"],
  rows: [["Paper (Pp)",13.4],["Glass (Gl)",7.2],["Metals (Mt)",3.4],["Plastic (Pl)",2.5],["Lumber and organic waste (L&O)",3.4],["Textiles and yard waste (T&Y)",2.7]],
};
const carbon = {
  caption: "Table 4. Percentage carbon monoxide emission",
  rowHeading: "Source",
  columns: ["Emission (%)"],
  rows: [["Fuel consumption",4.3],["Industrial processes",8.1],["Transportation",80.6],["Other","7.0"]],
};

export default archivedSectionedPaper(id, 2007, 100, [
  {
    prompt: "A map extract of Basseterre, St Christopher (also called St Kitts) on a scale of 1:25 000 is provided. Study the extract and then answer the following questions.",
    figures: figures("2007-mj-p3", "basseterre-2007"),
    parts: [
      ["(a)", "What is the six-figure grid reference for the trigonometrical station K48 at the end of East Pier on the coast in Basseterre?", 1],
      ["(b)", "What is the length of the railway from its end on the coast near to Factory Pier (square 2411) to the point where it crosses the main road (square 2313)? Give your answer correct to the NEAREST 100 metres.", 2],
      ["(c)", "Figure 1 is a grid for the northeastern part of the map extract. The grid is on a scale that is half the scale of the map. On the grid provided, insert the following features.\n(i) The coast line [1 mark]\n(ii) Half Moon pond [1 mark]\n(iii) The 100′ contour lines [1 mark]\n(iv) The areas of sugar cane cultivation [2 marks]", 5, drawing("basseterre-northeast")],
      ["(d)", "Name the type of feature found off the coast between Barkers Point and Half Moon Point.", 1],
      ["(e)", "Calculate the average gradient along the College Gut (square 2213) between 250′ and 200′ contours. Show your calculation.\nHint: 100 yds = 300 ft.", 3],
      ["(f)", "Measure the bearing from the trigonometrical station K2 to the K1 station. Both are located at the Golden Rock Airport.", 2],
      ["(g)", "Give a brief description of the distribution of sugar cane and forests over the area shown in the map.", 4],
      ["(h)", "Study the area along the south coast between Eastings 19 and 25. Describe TWO landforms.", 4],
      ["(i)", "Account for the distribution of track and footpath using map evidence only.", 3],
      ["(j)", "From the evidence on the map, what physical features account for the growth of the settlement at Basseterre?", 3],
    ],
  },
  {
    prompt: "Study Figure 2, which shows the Caribbean and adjacent plate boundaries, and answer the questions that follow.",
    figures: figures(id, "plate-boundaries"),
    parts: [
      ["(a)(i)", "What type of mountains are located at A?", 1],
      ["(a)(ii)", "Name the type of plate boundary indicated by the symbol.", 1, { figures: figures(id, "boundary-symbol") }],
      ["(a)(iii)", "Name the plates labelled X and B.", 2],
      ["(b)(i)", "Describe the main features of dendritic and radial drainage patterns and state where EACH type is developed.", 4],
      ["(b)(ii)", "Describe the coastal process of longshore drift.", 4],
      ["(c)(i)", "Explain how the shape of a volcano is influenced by the type of lava ejected.", 4],
      ["(c)(ii)", "Account for the occurrence of earthquakes along transform plate boundaries.", 4],
      ["(c)(iii)", "Explain how explosive volcanoes are formed.", 4],
    ],
  },
  {
    prompt: "Study Figure 3 which shows a type of mass movement and answer the questions below.",
    figures: figures(id, "mass-movement"),
    parts: [
      ["(a)(i)", "Name the type of mass movement shown.", 1],
      ["(a)(ii)", "Give TWO indicators to support your choice in (a) (i) above.", 2],
      ["(a)(iii)", "Identify ONE factor that would influence the type of mass movement shown.", 1],
      ["(b)(i) a)", "Define denudation.", 2],
      ["(b)(i) b)", "Define weathering.", 2],
      ["(b)(ii)", "Describe the physical weathering process of freeze-thaw.", 4],
      ["(c)(i)", "Give ONE reason why limestone is susceptible to chemical weathering.", 2],
      ["(c)(ii)", "Explain how stalactites and stalagmites are formed in limestone areas.", 5],
      ["(c)(iii)", "Explain how cockpit (karst) landscapes developed in the Caribbean.", 5],
    ],
  },
  {
    prompt: "Study Figure 4 which shows the average monthly distribution of rainfall and temperature for a particular area, then answer the questions below.",
    figures: figures(id, "rainfall-and-temperature"),
    parts: [
      ["(a)(i)", "State the LOWEST temperature recorded in that area.", 1],
      ["(a)(ii)", "Calculate the annual temperature range.", 1],
      ["(a)(iii)", "How much rainfall is recorded in the month with the HIGHEST distribution?", 1],
      ["(a)(iv)", "Identify the type of climate represented.", 1],
      ["(b)", "Describe the wind conditions associated with the passage of a hurricane at a site over which the eye passes.", 4],
      ["(c)", "Describe ANY TWO of the following components of an ecosystem.\n(i) Producers\n(ii) Primary consumers\n(iii) Secondary consumers", 4],
      ["(d)(i)", "Explain how the vegetation of tropical continental areas is adapted to the climate. Include THREE ways in your response.", 6],
      ["(d)(ii)", "Explain how climate influences the development of soil in tropical continental areas. Include TWO ways in your response.", 6],
    ],
  },
  {
    prompt: "Study the demographic transition model in Figure 5 and then answer the questions below.",
    figures: figures(id, "demographic-transition"),
    parts: [
      ["(a)(i)", "Name the stages at which there is little natural population increase.", 2],
      ["(a)(ii)", "Describe the change in the death rate in Stage 2.", 1],
      ["(a)(iii)", "From which stage does population start to increase significantly?", 1],
      ["(b)", "Define the term ‘urbanization’.", 2],
      ["(c)", "Describe THREE problems associated with urbanization in the Caribbean.", 6],
      ["(d)(i)", "Explain why people move from rural areas to towns. Include THREE reasons in your response.", 6],
      ["(d)(ii)", "Suggest THREE actions that could be taken to reduce rural to urban migration.", 6],
    ],
  },
  {
    prompt: "Figure 6 is an incomplete graph showing the structure of the world economies for three activities: agriculture, industry and services. Table 1 presents the percentage gross domestic product (% GDP) for these activities in three types of world economies: low, middle and high income.",
    table: economies,
    parts: [
      ["(a)(i)", "Using the information presented in Table 1, complete the graph in Figure 6 to show the % GDP for EACH activity in low income countries.", 3, drawing("world-economies-grid")],
      ["(a)(ii)", "State the relationship between a country’s income and the structure of agriculture.", 1],
      ["(b)(i) a)", "Define primary industry, giving an example.", 2],
      ["(b)(i) b)", "Define tertiary industry, giving an example.", 2],
      ["(b)(ii)", "State TWO benefits which countries can gain from the development of secondary economic activities.", 2],
      ["(b)(iii)", "List TWO ways by which governments in the Caribbean have encouraged industrial development.", 2],
      ["(c)(i)", "Account for the widespread occurrence in the Caribbean of EITHER the garment industry OR food processing. Include THREE reasons in your response.", 6],
      ["(c)(ii)", "Suggest THREE reasons why Caribbean manufacturers might find it difficult to compete in a global market.", 6],
    ],
  },
  {
    prompt: "Study Table 2 which presents employment figures (thousand persons) for two sectors of a Caribbean territory.",
    table: employment,
    parts: [
      ["(a)(i)", "Determine the average yearly employment in agriculture for the period 1998 to 2001.", 1],
      ["(a)(ii)", "Determine the decline in employment in tourism between 1998 and 1999.", 1],
      ["(a)(iii)", "Determine the year in which employment in tourism was at its HIGHEST.", 1],
      ["(a)(iv)", "Determine how many more persons were employed in tourism than in agriculture in 2004.", 1],
      ["(b)(i)", "Describe THREE ways in which Caribbean countries can benefit from the development of ecotourism.", 6],
      ["(b)(ii)", "Outline ONE problem associated with marketing which is faced by Caribbean farmers.", 2],
      ["(c)(i)", "Compare the farm size of commercial arable farming in a named Caribbean territory with wheat farming in the Canadian prairies.", 2],
      ["(c)(ii)", "Compare their climatic hazards.", 2],
      ["(c)(iii)", "Compare their harvesting.", 4],
      ["(c)(iv)", "Compare their labour.", 4],
    ],
  },
  {
    prompt: "Study Figure 7 which shows the number of tropical storms starting in each month for the period 1881–1972.",
    figures: figures(id, "hurricane-months"),
    parts: [
      ["(a)(i)", "How many hurricanes started in September?", 1],
      ["(a)(ii)", "Name one month in which no hurricanes started.", 1],
      ["(a)(iii)", "How many hurricanes started at the beginning of the hurricane season?", 1],
      ["(a)(iv)", "How many hurricanes started during the last month of the hurricane season?", 1],
      ["(b)(i)", "Define ‘natural hazard’.", 2],
      ["(b)(ii)", "Describe THREE different ways by which ONE of the natural hazards listed below can impact on Caribbean territories.\na) Hurricanes\nb) Volcanoes\nc) Earthquakes", 6],
      ["(c)(i)", "For the hazard chosen in (b) (ii) above, suggest TWO precautionary measures that individuals can take to reduce the impact.", 4],
      ["(c)(ii)", "For a named country, explain how TWO measures that have been adopted by the government can reduce the impact of the hazard chosen in (b) (ii).", 4],
      ["(d)", "Explain how TWO land-based activities can contribute to coral reef destruction in the Caribbean.", 4],
    ],
  },
  {
    prompt: "Table 3 presents data on waste produced in the British Virgin Islands (BVI).",
    table: waste,
    parts: [
      ["(a)", "On the axes provided in Figure 8, use the information presented in Table 3 to complete the bar graph.", 4, drawing("waste-graph-grid")],
      ["(b)(i)", "State FOUR causes of river pollution.", 4],
      ["(b)(ii)", "Identify TWO sources of air pollution and give an example of EACH source.", 4],
      ["(c)(i)", "Explain how TWO measures implemented in a named Caribbean territory can protect the forests.", 4],
      ["(c)(ii)", "Explain how TWO measures implemented in a developed country have reduced the emission of greenhouse gases.", 4],
      ["(c)(iii)", "Explain how TWO measures implemented in a named Caribbean territory can reduce the indiscriminate disposal of solid waste.", 4],
    ],
  },
  {
    prompt: "Table 4 presents the percentage of carbon monoxide emission by various sources in a particular area.",
    table: carbon,
    parts: [
      ["(a)", "Draw a pie chart to illustrate the carbon monoxide emission by the sources shown in Table 4.", 4, { drawing: true }],
      ["(b)(i) a)", "Define greenhouse effect.", 2],
      ["(b)(i) b)", "Define global warming.", 2],
      ["(b)(ii)", "State FOUR effects of global warming on the environment.", 4],
      ["(c)(i)", "Suggest THREE ways in which the tourist industry may contribute to coral reef destruction.", 3],
      ["(c)(ii)", "Explain how the destruction of coral reefs can have negative impacts on an area. Include THREE impacts in your response.", 6],
      ["(d)", "Explain how deforestation contributes to global warming.", 3],
    ],
  },
]);
