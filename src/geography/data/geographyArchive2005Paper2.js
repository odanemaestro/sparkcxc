import { archivedSectionedPaper, figures } from "./geographyArchiveModels";

const id = "2005-mj-p2";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const industry = {
  caption: "Table 1. Import substitution manufacturing, Jamaica (tonnes)",
  rowHeading: "Product",
  columns: ["1984", "1989"],
  rows: [["Fertilizer","33,000","56,000"],["Detergent","7,400","8,200"],["Toothpaste",900,950],["Tyres and Tubes","2,700","5,000"]],
};
const sealeySource = "Source: Sealey, Caribbean World – A Complete Geography, Cambridge University Press, 1993.";

export default archivedSectionedPaper(id, 2005, 100, [
  {
    prompt: "Use the map extract (Savanna-la-mar, 1:50 000) provided to answer this question.",
    figures: figures(id, "savanna-la-mar"),
    parts: [
      ["(a)", "State the six-figure grid reference of the Negril Lighthouse.", 2],
      ["(b)", "What is the length of the sand beach at Long Bay?", 2],
      ["(c)", "What is the grid bearing of the runway of the Negril Airstrip near to Bloody Bay?", 2],
      ["(d)", "What direction is the town of Grange Hill from the town of Savanna-la-mar?", 1],
      ["(e)", "Identify TWO crops cultivated along or close to the A-Class road between Savanna-la-mar and Grange Hill.", 2],
      ["(f)", "Figure 1 shows a section along Easting 10 across Negril Hill. The horizontal scale is the same as the map’s scale. The vertical scale is 1:10 000 (1 cm represents 100 metres). Consult the map extract and on Figure 1, label FOUR of the five arrows marking items along the profile.", 4, drawing("negril-hill")],
      ["(g)", "Describe, giving suitable examples, the distribution and the types of settlement in the area bordered by Northings 73 and 80, and Eastings 20 and 34.", 4],
      ["(h)", "Study the landscape along the C-Class road between Eastings 12 and 13 from Northing 82 to Northing 87. Identify THREE landforms or landform features along the road.", 3],
      ["(i)", "With reference to examples from the map, suggest FOUR reasons for the distribution of cultivated and natural vegetation in the area of the map.", 8],
    ],
  },
  {
    prompt: "Use Figure 2 which shows some of the earth’s tectonic plates to answer the following.",
    figures: figures(id, "tectonic-plates"),
    parts: [
      ["(a)(i)", "Name the plate marked A.", 1], ["(a)(ii)", "Name the plate marked B.", 1],
      ["(a)(iii)", "What type of plate boundary is formed where the Pacific and Nazca plates meet?", 1],
      ["(b)(i)", "Define the term ‘crustal plate’.", 1],
      ["(b)(ii)", "Draw a diagram to show a normal fault. Label the fault plane and state how this type of fault is formed.", 3, { drawing: true }],
      ["(b)(iii)", "State TWO benefits of volcanic activity to man.", 2],
      ["(b)(iv)", "Name and state the location of ONE active volcano in the Caribbean.", 1],
      ["(c)(i)", "Explain how new crust is formed at constructive plate margins.", 3],
      ["(c)(ii)", "How can the characteristics of lava lead to differences in the shapes of volcanic cones?", 4],
      ["(c)(iii)", "Explain TWO ways in which rift valleys may be created.", 4],
      ["(c)(iv)", "Why is the study of plate tectonics important?", 3],
    ],
  },
  {
    prompt: "Use Figure 3, showing the long profile of a river, to answer part (a).",
    figures: figures(id, "river-long-profile"),
    parts: [
      ["(a)(i)", "Where is friction at its GREATEST?", 1],
      ["(a)(ii)", "Which section of the river has the GREATEST energy?", 1],
      ["(a)(iii)", "Name the feature which may develop at A.", 1],
      ["(b)(i)", "Draw diagrams to show the following drainage patterns and state where EACH may develop.\na) Radial [2 marks]\nb) Dendritic [2 marks]\nc) Trellis [2 marks]", 6, { drawing: true }],
      ["(b)(ii)", "State ONE condition necessary for deltas to form.", 1],
      ["(c)(i)", "Explain why deforestation and urbanization may lead to flooding.", 6],
      ["(c)(ii)", "Explain TWO ways in which farming can lead to the destruction of coral reefs.", 4],
      ["(c)(iii)", "Explain how coral reefs are important to beaches.", 4],
    ],
  },
  {
    prompt: "Use the Caribbean weather map in Figure 4 to answer part (a).\nSource: Macpherson, Introducing Caribbean Weather Maps, Pearson Education Ltd., 2000, p. 21.",
    figures: figures(id, "caribbean-weather"),
    parts: [
      ["(a)(i)", "What is the MOST significant weather feature affecting the Eastern Caribbean?", 1],
      ["(a)(ii)", "What is the atmospheric pressure at X?", 1],
      ["(a)(iii)", "How many named weather systems had developed that year up to and including Butch?", 1],
      ["(b)(i)", "Name the instruments used for measuring the following.\na) Wind speed [1 mark]\nb) Atmospheric pressure [1 mark]\nc) Relative humidity [1 mark]", 3],
      ["(b)(ii)", "What is meant by ‘relative humidity’?", 2],
      ["(b)(iii)", "Where and how should a rain gauge be placed for accurate recording of rainfall?", 2],
      ["(c)(i)", "Using an annotated diagram ONLY, explain how sea breezes develop.", 3, { drawing: true }],
      ["(c)(ii)", "With the use of appropriate examples, explain how relief helps to account for the differences in rainfall experienced in the Caribbean.", 5],
      ["(d)", "Explain why temperatures in the Caribbean are different from those experienced in the Canadian Prairies.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "On the map of the world provided in Figure 5, outline and name ONE area where EACH of the following may be found.\n(i) Tropical rainforest [1 mark]\n(ii) Tropical grassland [1 mark]\n(iii) Temperate coniferous forest [1 mark]", 3, drawing("world-map")],
      ["(b)(i)", "Name the type of soil typically found in areas of equatorial forests and identify any TWO characteristics of this soil.", 3],
      ["(b)(ii)", "For equatorial climatic regions, state TWO characteristics of EACH of the following.\na) Temperature\nb) Rainfall", 4],
      ["(c)(i)", "Explain why there is generally sparse vegetation on the floor of equatorial forests.", 2],
      ["(c)(ii)", "Choose any THREE characteristics of the vegetation of coniferous forests and explain how EACH helps the trees to adapt to their environment.", 6],
      ["(c)(iii)", "Explain the presence of trees in tropical grasslands.", 3],
      ["(c)(iv)", "Explain how deforestation can lead to the rapid loss of soil fertility in equatorial areas.", 3],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a profile to show any THREE characteristics of a rendzina soil.", 3, { drawing: true }],
      ["(b)(i)", "State THREE characteristics of the rainfall of Tropical Marine Climates.", 3],
      ["(b)(ii)", "Describe the amount, types and distribution of precipitation associated with Cool Temperate Interior Climates.", 4],
      ["(c)(i)", "Give TWO reasons why mangrove trees are able to survive in their environment.", 2],
      ["(c)(ii)", "Explain how any TWO farming practices other than clearance of vegetation may lead to soil erosion.", 4],
      ["(c)(iii)", "Give TWO reasons why it is important to conserve mangrove vegetation.", 4],
      ["(c)(iv)", "Explain the role precipitation plays in the development of soils.", 4],
    ],
  },
  {
    prompt: "Study the graph in Figure 6 and answer the questions below.",
    figures: figures(id, "food-trade"),
    parts: [
      ["(a)(i)", "In which year, between 1991 and 1999, did the MAXIMUM expenditure for food imports occur?", 1],
      ["(a)(ii)", "Estimate the maximum expenditure in (a) (i) above.", 1],
      ["(a)(iii)", "In which year was the difference in expenditure for food imports and food exports the LOWEST?", 1],
      ["(b)(i)", "Identify ONE area in the Caribbean where EITHER beef cattle rearing OR dairy farming is important.", 1],
      ["(b)(ii)", "For EITHER beef cattle rearing OR dairy farming, describe THREE problems farmers encounter.", 6],
      ["(c)(i)", "Distinguish between ‘primary industry’ and ‘secondary industry’.", 2],
      ["(c)(ii)", "Give THREE reasons why some Caribbean countries are keen to protect their forest resources.", 6],
      ["(c)(iii)", "Compare fishing in the Caribbean with that in British Columbia (Canada) under the following headings.\na) Fishing methods\nb) Conservation methods\nc) Marketing", 6],
    ],
  },
  {
    prompt: "Table 1 shows the production level (in tonnes) of import-substitution manufacturing in Jamaica.\n" + sealeySource + " p. 166.",
    table: industry,
    parts: [
      ["(a)(i)", "Which product increased by 800 tonnes during the period 1984–1989?", 1],
      ["(a)(ii)", "Which product had the HIGHEST production in 1989?", 1],
      ["(a)(iii)", "What was the production level of tyres and tubes in 1989?", 1],
      ["(b)(i)", "Use the sketch map of the North-Eastern USA provided in Figure 7 and insert the name of EACH of the THREE industrial centres indicated by a dot.\nSource: Mark Wilson, The Caribbean Environment for CXC Geography, Oxford University Press, 1989.", 3, drawing("usa-industrial-centres")],
      ["(b)(ii)", "Draw a sketch map of a named Caribbean territory and on it show a major industrial area and ONE other feature to show its location.", 4, { drawing: true }],
      ["(c)(i)", "Explain the difference between an ‘import-substitution industry’ and an ‘enclave industry’.", 4],
      ["(c)(ii)", "For EITHER an enclave OR an import substitution industry that you have studied in the Caribbean, explain TWO factors that have contributed to its location and development.", 4],
      ["(c)(iii)", "Give THREE reasons why EITHER the North-Eastern USA OR the Lower Ganges Valley has grown into an important industrial area.", 6],
    ],
  },
  {
    prompt: "Study the map in Figure 8 on the origin of visitors to the Caribbean during a particular year.\n" + sealeySource + " p. 180.",
    figures: figures(id, "caribbean-visitors"),
    parts: [
      ["(a)(i)", "How many visitors went to Jamaica from the USA during that year?", 1],
      ["(a)(ii)", "Name ONE of the main destinations of visitors from the USA.", 1],
      ["(a)(iii)", "Name the MAIN source of visitors to the Eastern Caribbean.", 1],
      ["(b)(i)", "List THREE ways in which seasonality affects the tourism industry in the Caribbean.", 3],
      ["(b)(ii)", "Describe TWO ways in which tourism affects the environment.", 4],
      ["(c)(i)", "Explain the difference between ‘secondary industry’ and ‘tertiary industry’.", 4],
      ["(c)(ii)", "Explain how EACH of the following factors influences the growth of tourism in the Caribbean.\na) Accessibility\nb) Government Policy", 8],
      ["(c)(iii)", "Define the term ‘ecotourism’.", 2],
    ],
  },
  {
    prompt: "Study the choropleth map in Figure 9 which shows population distribution in Trinidad and Tobago.\n" + sealeySource + " p. 196.",
    figures: figures(id, "trinidad-population"),
    parts: [
      ["(a)(i)", "What is the population of San Fernando?", 1],
      ["(a)(ii)", "What is the HIGHEST population density?", 1],
      ["(a)(iii)", "How many times is the population of Arima LARGER than the population of Point Fortin?", 1],
      ["(b)(i)", "a) List TWO traditional exports from the Caribbean.\nb) For ONE of the exports identified above, name ONE of the most important trading partners.", 3],
      ["(b)(ii)", "Describe TWO ways in which CARICOM aims at promoting regional trade.", 4],
      ["(c)(i)", "What is meant by the term ‘urbanization’?", 2],
      ["(c)(ii)", "Describe TWO factors that influence the selection of the site of the capital city of a named Caribbean country.", 4],
      ["(d)", "Compare the growth and development of EITHER New York City OR Tokyo with that of a named Caribbean capital under the following headings.\n(i) Location\n(ii) Functions", 8],
    ],
  },
]);
