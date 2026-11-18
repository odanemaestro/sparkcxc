import { archivedSectionedPaper, figures } from "./geographyArchiveModels";

const id = "2016-mj-p2";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const economicCosts = {
  caption: "Table 1. Number and cost of floods, droughts and hurricanes worldwide, 1960–1999",
  rowHeading: "Period",
  columns: ["Number (Major Events)", "Cost (US$ billions)"],
  rows: [["1960–69", 27, 73], ["1970–79", 47, 131], ["1980–89", 63, 204], ["1990–99", 89, 629]],
};
const townGrowth = {
  caption: "Table 2. Annual growth for a Caribbean town, 1985–2016",
  rowHeading: "Year",
  columns: ["Population"],
  rows: [[1985, "5 000"], [1997, "73 000"], [2006, "94 000"], [2016, "160 000"]],
};
const labourForce = {
  caption: "Table 3. Percentage of Saint Lucia labour force in sectors of the economy",
  rowHeading: "Economic Activity",
  columns: ["Size of Labour Force (Percentage)", "Size of Sector (Degrees)"],
  rows: [["Primary", 21, 76], ["Secondary", 25, 90], ["Tertiary", 54, 194], ["Total", 100, 360]],
};
const bananaExports = {
  caption: "Table 4. Banana exports from the Caribbean, 1990 and 2003 (US$ millions)",
  rowHeading: "Country",
  columns: ["1990", "2003"],
  rows: [["St Vincent", 45, 11], ["Dominica", 32, 5]],
};
const hurricaneEffects = {
  caption: "Table 5. Effects of Hurricane Allen on selected Caribbean countries, 1980",
  rowHeading: "Country",
  columns: ["Number of Deaths", "Cost of Damage (US$ millions)"],
  rows: [["Barbados", 0, 6], ["Grenada", 0, 5.3], ["Jamaica", 8, 100], ["Saint Lucia", 6, 235], ["St Vincent and the Grenadines", 0, 16.3]],
};

export default archivedSectionedPaper(id, 2016, 100, [
  {
    prompt: "Study the 1984 map of Kingston, Jamaica, on a scale of 1:50 000, and answer the following questions.",
    figures: figures("2005-mj-p3", "kingston"),
    parts: [
      ["(a)", "State the six-figure grid reference of the circle at the road junction at Three Mile (between Easting 67 and Easting 70).", 2],
      ["(b)", "Determine the distance from the junction at Three Mile along the Class B road to the first junction with the Class C road near Half Way Tree, to the nearest 100 metres.", 2],
      ["(c)", "Determine the grid bearing of the junction at Half Way Tree from the junction at Three Mile.", 2],
      ["(d)", "State the compass direction of the junction at Three Mile from the junction at Half Way Tree.", 1],
      ["(e)", "What fraction of the real horizontal distance between any two points shown on a map is the (map) distance between these points?", 1],
      ["(f)", "List THREE government services available in Port Royal (at the end of the Palisadoes).", 3],
      ["(g)", "The road which ascends Long Mountain starts at a point 120 m high and ends at a point 420 m high. Calculate the gradient of the straight slope between these two points. Show your calculation.", 3],
      ["(h)", "Describe FOUR characteristics of the settlements in the area shown on the map.", 8],
      ["(i)", "Giving an example of EACH, outline the association between the relief and THREE types of land use shown on the map.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a diagram to show the formation of a spit.", 4, { drawing: true }],
      ["(b)(i)", "Define the term ‘soil creep’.", 2],
      ["(b)(ii)", "State TWO indicators that soil creep is occurring on a slope.", 2],
      ["(b)(iii)", "List FOUR human activities that contribute to landslides in the Caribbean.", 4],
      ["(c)(i)", "Explain how earthquakes occur at transform plate boundaries.", 4],
      ["(c)(ii)", "Account for the formation of fold mountains and volcanoes at destructive plate boundaries.", 8],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a sketch map of Barbados or Jamaica and on it, shade an extensive area of limestone.", 4, { drawing: true }],
      ["(b)(i)", "Describe the formation of a waterfall in areas where there are alternate layers of hard and soft rocks.", 4],
      ["(b)(ii)", "Describe the process of frost shattering.", 4],
      ["(c)(i)", "Explain how rock structure and chemical composition influence the weathering of limestone.", 6],
      ["(c)(ii)", "With the help of a diagram or diagrams, explain the formation of pillars in limestone areas in the Caribbean.", 6, { drawing: true }],
    ],
  },
  {
    prompt: "Study Table 1 which shows the number and cost of floods, droughts and hurricanes worldwide, and answer the questions that follow.\nSource: Wilson, Caribbean Environment, 2005, p. 181.",
    table: economicCosts,
    parts: [
      ["(a)(i)", "Identify the period which had the HIGHEST cost per event.", 1],
      ["(a)(ii)", "Between which TWO periods was there the HIGHEST increase in the number of events?", 1],
      ["(a)(iii)", "Outline TWO trends in the data presented in the table.", 2],
      ["(b)(i)", "State FOUR characteristics of the weather associated with the passage of a tropical wave.", 4],
      ["(b)(ii)", "For areas with a tropical marine climate, outline TWO characteristics of the rainfall and TWO characteristics of the temperature.", 4],
      ["(c)", "Compare THREE adaptations of vegetation to the climate in the equatorial and tropical continental regions. Include reasons for EACH adaptation.", 12],
    ],
  },
  {
    parts: [
      ["(a)", "Table 2 shows the annual growth of a Caribbean town between the years 1985 and 2016. On the grid provided, complete a line graph to illustrate the data in the table. Include a title and label the vertical axis.", 4, { ...drawing("town-growth-grid"), table: townGrowth }],
      ["(b)(i)", "Define the term ‘urbanization’.", 1],
      ["(b)(ii)", "Outline THREE reasons for rural–urban migration in the Caribbean.", 3],
      ["(b)(iii)", "Describe TWO measures that have been used to control the rate of urbanization in the Caribbean.", 4],
      ["(c)(i)", "With reference to specific Caribbean examples, explain how any TWO of the following factors influenced population distribution.\nNatural vegetation\nPresence of minerals\nSoils", 6],
      ["(c)(ii)", "For a named Caribbean territory, explain TWO ways in which its relief influences population density.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Table 3 presents data showing the distribution of the labour force in Saint Lucia according to economic activity. On the insert provided, complete the pie chart to show the distribution of the labour force in EACH economic activity. Include a title.\nSource: Bleasdell, S. et al., CSEC: New Integrated Geography, p. 425.", 4, { ...drawing("labour-force-circle"), table: labourForce }],
      ["(b)(i)", "Define the term ‘primary economic activity’. Include an example in your definition.", 2],
      ["(b)(ii)", "Outline the role of THREE factors in the development of the tourist industry in the Caribbean.", 6],
      ["(c)(i)", "Explain THREE ways in which tourism benefits Caribbean economies.", 6],
      ["(c)(ii)", "Explain THREE challenges faced by the tourist industry in the Caribbean.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Table 4 presents the value of banana exports in millions of US$ for two Caribbean countries in 1990 and 2003. On the grid provided, construct a bar graph to illustrate the data presented in the table. Include a title and label the vertical axis.\nSource: Wilson, M., Caribbean Environment, 2005, p. 147.", 4, { ...drawing("banana-exports-grid"), table: bananaExports }],
      ["(b)(i)", "State FOUR characteristics of large-scale arable farming in the Caribbean.", 4],
      ["(b)(ii)", "Describe the characteristics of peasant farming in the Caribbean using any TWO of the following headings.\nSize of plots\nLabour supply\nLocation\nFarming practices", 4],
      ["(c)(i)", "Outline TWO reasons for the decline in importance of agriculture in the economy of Caribbean countries.", 4],
      ["(c)(ii)", "Outline TWO similarities and TWO differences between large-scale commercial arable farming in the Caribbean and wheat farming in the prairies of Canada under EACH of the following headings.\nFarming practices\nMarket trends", 8],
    ],
  },
  {
    prompt: "Study Figure 1 which shows the track of a tropical weather system that developed into Hurricane Jeanne during the period 13–26 September 2004, and answer the following questions.\nSource: Guiness, Paul, et al., Geography for CSEC, 2008, pp. 306–307.",
    figures: figures(id, "jeanne-track"),
    parts: [
      ["(a)(i)", "Identify the group of islands that was affected when the weather system was a hurricane.", 1],
      ["(a)(ii)", "State the name of the country that was affected by the storm between 16 and 17 September.", 1],
      ["(a)(iii)", "Outline TWO changes in the weather system between 19 and 24 September.", 2],
      ["(b)(i)", "Describe TWO ways in which the bauxite industry contributes to air pollution in the Caribbean.", 4],
      ["(b)(ii)", "Describe TWO ways in which the bauxite industry contributes to water pollution in the Caribbean.", 4],
      ["(c)(i)", "Explain TWO ways in which the Caribbean Disaster Emergency Management Agency (CDEMA) assists member states to respond to hazards (pre-disasters).", 6],
      ["(c)(ii)", "Explain TWO ways in which CDEMA assists member states to respond to disasters.", 6],
    ],
  },
  {
    prompt: "Study Table 5 which summarizes the effects of Hurricane Allen on selected Caribbean countries, and answer the questions that follow.",
    table: hurricaneEffects,
    parts: [
      ["(a)(i)", "State the total number of persons who died as a result of the hurricane.", 1],
      ["(a)(ii)", "Identify the country that suffered the GREATEST damage.", 1],
      ["(a)(iii)", "Determine the TOTAL cost of damage in the countries listed.", 1],
      ["(a)(iv)", "Determine the TOTAL cost of damage in the Windward Islands listed.", 1],
      ["(b)(i)", "Define the term ‘natural hazard’.", 2],
      ["(b)(ii)", "Describe THREE ways in which any ONE of the following hazards impacts life and property.\nEarthquake\nVolcano\nHurricane", 6],
      ["(c)(i)", "Explain THREE causes of deforestation in the Caribbean.", 6],
      ["(c)(ii)", "Giving specific Caribbean examples, explain TWO consequences of deforestation.", 6],
    ],
  },
  {
    prompt: "Study the graph in Figure 2 which shows, by regions, the health status (Grades A, B, C) of coral reefs in 2003, and answer the questions that follow.\nSource: Status of Coral Reefs of the World: 2004. Executive Summary, p. 34.",
    figures: figures(id, "reef-health"),
    parts: [
      ["(a)(i)", "Identify the region that had the healthiest reefs.", 1],
      ["(a)(ii)", "Determine the score that the Atlantic region earned.", 1],
      ["(a)(iii)", "List the regions that earned an overall Grade B.", 1],
      ["(a)(iv)", "Determine the score that was required to earn a Grade A.", 1],
      ["(b)", "Using an appropriate example, describe ONE measure used to reduce the harmful effects of pollution under EACH of the following headings.\nIndustrial and technological operations\nEnvironmental protection practices\nUse of everyday materials\nEnergy sources", 8],
      ["(c)(i)", "Explain any THREE measures that are used to reduce greenhouse gases.", 6],
      ["(c)(ii)", "Explain any THREE measures that are used to reduce coral reef degradation.", 6],
    ],
  },
]);
