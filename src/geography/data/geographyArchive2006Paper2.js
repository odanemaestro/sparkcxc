import { archivedSectionedPaper, figures } from "./geographyArchiveModels";

const id = "2006-mj-p2";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const temperatures = {
  caption: "Table 1. Temperature readings",
  rowHeading: "Thermometer",
  columns: ["Station A", "Station B", "Station C"],
  rows: [["Dry Bulb","32 °C","32 °C","30 °C"],["Wet Bulb","31 °C","21 °C","21 °C"]],
};
const wheat = {
  caption: "Table 2. Wheat production in selected countries",
  rowHeading: "Country",
  columns: ["Percentage of World Production (%)", "Wheat Yield (kg per ha)", "Percentage of World Exports (%)"],
  rows: [
    ["Canada",4.5,"2 000",15.6],["France",5.9,"6 700",21.4],["Russia","6.0","1 500",0],
    ["India",11.4,"2 400",0],["USA",12.1,"2 500",32.3],["China",19.4,"3 300",0],
  ],
};
const cruiseArrivals = {
  caption: "Table 3. Cruise ship arrivals in a Caribbean island",
  rowHeading: "Year",
  columns: ["Cruise Ship Arrivals (thousands)"],
  rows: [[1984,145],[1988,115],[1992,120],[1996,135],[2000,125]],
};
const foreignBorn = {
  caption: "Table 4. Number of foreign-born residents in Trinidad & Tobago",
  rowHeading: "Country of Birth",
  columns: ["Number Residing in Trinidad & Tobago"],
  rows: [["Barbados","4 000"],["Grenada","20 000"],["Guyana","3 000"],["St Vincent","13 000"]],
};

export default archivedSectionedPaper(id, 2006, 100, [
  {
    prompt: "Study the map of Nevis (scale 1:25 000), then answer the questions below.",
    figures: figures("2006-mj-p3", "nevis-2006-map"),
    parts: [
      ["(a)", "From the information given in the margin of the map, what is the direction of Nevis from St Kitts?", 1],
      ["(b)", "What is the height of Nevis Peak at 380959?", 1],
      ["(c)", "What is the grid bearing of Nevis Peak from the trigonometric station on the coast at Fort Charles near Charlestown?", 2],
      ["(d)", "Figure 1 is an incomplete cross section from the coast at 330960 along northing 96 to 360960. On Figure 1, complete the cross section by\n(i) plotting and drawing the slope between the coast and 300 feet [2 marks]\n(ii) adding\na) the point where the section crosses the main road [1 mark]\nb) ONE point where a stream is crossed or touched by the section [1 mark]\nc) the point where the section crosses a pond. [1 mark]", 5, drawing("nevis-cross-section")],
      ["(e)", "Identify the type of slope from the coast at the point with grid reference 330960 to the point with grid reference 360960.", 1],
      ["(f)", "Identify the landform between the trigonometric station N38, at Nevis Peak and the one labelled N37.", 1],
      ["(g)", "Find the distance, in metres or yards, from the trigonometric station N54, near to Montraver’s House (347961) to the point where a footpath meets the coast at 330962.", 1],
      ["(h)", "Calculate the gradient between the trigonometric station N54 and the point on the coast at 330962. Show your calculations.", 2],
      ["(i)", "Identify TWO public services available to the village of Cotton Ground (squares 3398 and 3498).", 2],
      ["(j)", "Describe the natural drainage system of the island. Include evidence from the map in your answer.", 4],
      ["(k)", "Compare the steepness of the slope between sea level (330962) and the 50 ft contour with that between the 50 ft contour and the trigonometric station N54 along a line from 330962 to the trigonometric station.", 2],
      ["(l)", "Study the entire area south of northing 94 and explain how the route of the main road and the landforms (relief) of the area are related.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a diagram of an anticline and label the limbs and bedding planes.", 3, { drawing: true }],
      ["(b)(i)", "Define crustal plate.", 2], ["(b)(ii)", "Define fault.", 2],
      ["(c)(i)", "What is the epicentre of an earthquake?", 2], ["(c)(ii)", "What is the Richter scale?", 1],
      ["(d)", "Explain why earthquakes and volcanoes occur in the Caribbean region.", 5],
      ["(e)", "With reference to the theory of plate tectonics, explain how fold mountains are formed.", 3],
      ["(f)", "With the aid of a well-labelled diagram, explain how artesian basins are formed.", 6, { drawing: true }],
    ],
  },
  {
    prompt: "Study the diagram of the river system shown in Figure 2 and then answer the questions below.",
    figures: figures(id, "river-system"),
    parts: [
      ["(a)(i)", "Name the dashed line labelled A.", 1],
      ["(a)(ii)", "Name the point labelled B.", 1],
      ["(a)(iii)", "What is the area enclosed by the dashed line called?", 1],
      ["(b)(i)", "Define corrasion.", 2], ["(b)(ii)", "Define distributary.", 2],
      ["(c)", "State THREE ways in which a river’s energy is used up.", 3],
      ["(d)(i)", "How do trees cause mechanical or physical weathering?", 2],
      ["(d)(ii) a)", "Explain how frost shattering or freeze-thaw is caused.", 3],
      ["(d)(ii) b)", "Explain how carbonation is caused.", 3],
      ["(e)(i)", "How does the presence of a wide beach help to protect a coast from wave erosion?", 2],
      ["(e)(ii)", "Explain how bays and headlands develop along a coast.", 4],
    ],
  },
  {
    parts: [
      ["(a)", "Draw FOUR isobars to show a hurricane. Indicate the pressure on the isobars and insert the symbol used to represent the eye of a hurricane.", 3, { drawing: true }],
      ["(b)(i)", "State TWO conditions which favour the development of a hurricane.", 2],
      ["(b)(ii)", "In what general direction do tropical (easterly) waves move as they cross the Caribbean?", 1],
      ["(b)(iii)", "Describe the weather associated with a tropical (easterly) wave as it moves across the Caribbean.", 4],
      ["(c)", "Explain how the amount of rainfall received in Caribbean countries is influenced by the presence of highland areas.", 4],
      ["(d)", "Why does the Caribbean region experience higher average temperatures than places such as the Prairie Provinces of Canada?", 3],
      ["(e)", "Why do interior regions, such as the Canadian Prairies and Great Plains of USA, experience extremes of temperature?", 3],
      ["(f)(i)", "Temperature readings at three stations, A, B and C, are presented in Table 1. Determine which station is MOST likely to experience rainfall.", 1, { table: temperatures }],
      ["(f)(ii)", "Explain your answer in (f) (i) above.", 3],
    ],
  },
  {
    prompt: "Study the map in Figure 3 which shows the distribution of coniferous forests and then answer the questions below.",
    figures: figures(id, "coniferous-forests"),
    parts: [
      ["(a)(i)", "Name the TWO regions where coniferous forests are found.", 2],
      ["(a)(ii)", "What factor limits the northern extent of the coniferous forest?", 1],
      ["(b)(i)", "Describe the appearance of coniferous forests under the following headings.\nVariety of species (with an example)\nLeaves\nShape of trees", 5],
      ["(b)(ii)", "Name TWO types of plants other than trees that are found in a tropical rain forest.", 2],
      ["(c)", "Explain how the canopy layer in an equatorial forest impacts on the layers of vegetation below.", 3],
      ["(d)(i)", "Compare the climate of tropical grasslands with temperate grasslands.", 4],
      ["(d)(ii)", "Compare the vegetation characteristics of tropical grasslands with temperate grasslands.", 4],
      ["(e)", "Explain how parent material influences soil development.", 3],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a diagram to show THREE distinguishing features of a chernozem.", 3, { drawing: true }],
      ["(b)(i) a)", "Define leaching.", 2], ["(b)(i) b)", "Define illuviation.", 2],
      ["(b)(ii)", "State THREE components of soil.", 3],
      ["(c)", "Why is the ‘A’ horizon of a podzol bleached or ash grey in colour?", 2],
      ["(d)", "Explain how climate can influence the development of soil. Include THREE ways in your response.", 6],
      ["(e)", "How can overgrazing lead to the development of soil erosion?", 2],
      ["(f)", "How can any TWO of the following conservation methods prevent soil erosion?\nContour ploughing\nTerracing\nUse of wind breaks", 4],
    ],
  },
  {
    prompt: "Study Table 2 which shows wheat production for a particular year in various countries.",
    table: wheat,
    parts: [
      ["(a)(i)", "Name the country with the HIGHEST percentage of world wheat production.", 1],
      ["(a)(ii)", "Which country recorded the HIGHEST wheat yield?", 1],
      ["(a)(iii)", "Which country exported 21.4% of the wheat that it produced?", 1],
      ["(b)(i)", "Name THREE types of farming systems in the Caribbean based on the product associated with them.", 3],
      ["(b)(ii)", "Describe TWO characteristics of ONE of the farming systems identified in (b) (i) above.", 4],
      ["(c)(i)", "Compare beef cattle farming in a named Caribbean country with that of the Mid West region of the USA under the following headings.\na) Farm size [2 marks]\nb) Feeding practice [2 marks]\nc) Marketing arrangements [2 marks]", 6],
      ["(c)(ii)", "For any named Caribbean country, explain how FOUR factors have contributed to changes in large-scale commercial agriculture.", 8],
    ],
  },
  {
    prompt: "Table 3 presents information on cruise ship arrivals in a Caribbean island. Figure 4 is an incomplete graph to illustrate the information presented in Table 3.",
    table: cruiseArrivals,
    parts: [
      ["(a)", "On the axes provided in Figure 4, construct a line graph to illustrate the information presented in Table 3.", 3, drawing("cruise-arrivals-grid")],
      ["(b)(i)", "Name ONE area in the Caribbean where fishing is important.", 1],
      ["(b)(ii)", "Describe THREE major causes of pollution in the Caribbean.", 6],
      ["(c)(i)", "Explain how EACH of the following factors has contributed to the development of tourism in the Caribbean.\na) Accessibility [2 marks]\nb) Climate [2 marks]\nc) Government support [2 marks]", 6],
      ["(c)(ii)", "Explain TWO factors that account for the development of the garment industry in the Caribbean.", 4],
      ["(c)(iii)", "Explain TWO factors that have contributed to the growth of the fishing industry in the Caribbean.", 4],
    ],
  },
  {
    prompt: "Figure 5 presents a divided circle showing the sources of energy used in Trinidad and Tobago.",
    figures: figures(id, "energy-sources"),
    parts: [
      ["(a)(i)", "In Trinidad and Tobago, what percentage of energy used is derived from natural gas?", 1],
      ["(a)(ii)", "Which energy source provides 7% of the energy used?", 1],
      ["(a)(iii)", "What is the major source of energy?", 1],
      ["(b)(i)", "Distinguish between the terms ‘non-renewable resources’ and ‘renewable resources’.", 2],
      ["(b)(ii)", "Describe TWO problems affecting the fishing industry in the Caribbean.", 5],
      ["(c)(i)", "Explain how EACH of the factors below has influenced the location and development of EITHER the petrochemical industry OR the bauxite industry OR the oil-refining industry in the Caribbean.\na) Transport facilities [3 marks]\nb) Raw materials [3 marks]", 6],
      ["(c)(ii)", "Give TWO reasons why the conservation of natural resources is important to Caribbean countries.", 4],
      ["(c)(iii)", "Explain how policies by Caribbean governments have assisted in the development of the food processing industry.", 4],
    ],
  },
  {
    prompt: "Table 4 shows the country of birth for 40 000 foreign-born residents of Trinidad and Tobago.",
    table: foreignBorn,
    parts: [
      ["(a)", "Construct a divided circle to represent the data presented in Table 4.", 3, { drawing: true }],
      ["(b)(i)", "Define the term ‘urbanization’.", 2],
      ["(b)(ii)", "Describe TWO ways in which trading policies of the European Union (EU) influence the trading patterns of Caribbean countries.", 5],
      ["(c)(i)", "With the aid of a sketch map, give TWO reasons for the location of a named capital city in the Caribbean.", 4, { drawing: true }],
      ["(c)(ii)", "For the capital city named in (c) (i) above, explain THREE factors that have been responsible for its growth and development.", 6],
      ["(c)(iii)", "Give TWO reasons why some Caribbean countries have sought to diversify their trading patterns.", 4],
    ],
  },
]);
