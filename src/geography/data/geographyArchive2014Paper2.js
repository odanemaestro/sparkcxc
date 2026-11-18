import { archivedSectionedPaper, figures } from "./geographyArchiveModels";

const id = "2014-mj-p2";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const primacy = {
  caption: "Table 1. Measures of urban primacy in the Caribbean, 1990",
  rowHeading: "Country",
  columns: ["Percentage of total population living in primate city", "Percentage of urban population living in primate city"],
  rows: [
    ["Cuba", 20, 28], ["St Kitts and Nevis", 45, 100], ["Saint Lucia", 31, 66],
    ["St Vincent and the Grenadines", 21, 100], ["Jamaica", 38, 77], ["Trinidad and Tobago", 24, 38],
  ],
};
const sugar = {
  caption: "Table 2. The main Caribbean sugar producers, 1991 and 2001 (’000 tonnes)",
  rowHeading: "Country",
  columns: ["Production 1991", "Production 2001"],
  rows: [
    ["Barbados", "65 763", "45 000"], ["Belize", "113 188", "102 744"], ["Cuba", "7 623 000", "4 100 000"],
    ["Guyana", "159 985", "305 000"], ["Jamaica", "228 000", "203 000"], ["Trinidad and Tobago", "104 976", "114 311"],
  ],
};

export default archivedSectionedPaper(id, 2014, 100, [
  {
    prompt: "A map extract of Speightstown, Barbados (scale 1:10,000) is provided. Use it to answer the following questions.",
    figures: figures("2014-mj-p3", "speightstown"),
    parts: [
      ["(a)", "What is the length of the section of road under construction passing through Speightstown?", 2],
      ["(b)", "What is the compass direction from Haymann’s Factory (223820) to Rock Plantation (235830)?", 1],
      ["(c)", "If you drew a sketch map of this area at half the scale, what would be the scale?", 1],
      ["(d)(i)", "What man-made feature is found at 215823?", 1],
      ["(d)(ii)", "What is the feature at 224810?", 1],
      ["(e)", "What is the gradient along Northing 81 from the 80 metre contour at 223810 to the coast at Mullins Bay? Show your working.", 3],
      ["(f)", "Complete the cross section in Figure 1 to show the relief from the coast to Haymann’s Factory along Northing 82. Label the area with scrub vegetation.", 5, drawing("haymann-profile")],
      ["(g)(i)", "List FOUR features of the drainage in the area south of Northing 82.", 4],
      ["(g)(ii)", "List FOUR features of the relief west of Easting 24.", 4],
      ["(h)", "Explain the distribution of trees and cultivated areas.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a diagram to illustrate the following features at a convergent plate.\nBoundary\nFolds\nVolcano\nSubduction zone", 4, { drawing: true }],
      ["(b)(i)", "Define the following terms.\nWeathering\nMass wasting", 4],
      ["(b)(ii)", "Describe what happens when EITHER a landslide OR soil creep occurs.", 4],
      ["(c)(i)", "Using the theory of plate tectonics, explain how volcanoes occur.", 6],
      ["(c)(ii)", "Using the theory of plate tectonics, explain how earthquakes occur.", 6],
    ],
  },
  {
    prompt: "Study Figure 2 and answer the questions that follow.",
    figures: figures(id, "river-features"),
    parts: [
      ["(a)(i)", "Which section of a river does the diagram represent?", 1],
      ["(a)(ii)", "Name any THREE of the features labelled A, B, C and D.", 3],
      ["(b)(i)", "Name TWO features produced by river erosion.", 2],
      ["(b)(ii)", "Outline TWO processes by which rivers erode their channels.", 6],
      ["(c)(i)", "Select ONE feature from this list of coastal features and explain how it may be formed.\nCave OR wave-cut platform OR arch", 6],
      ["(c)(ii)", "Select ONE feature from this list of coastal features and explain how it may be formed.\nBeach OR spit OR tombolo", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Figure 3 is a world map. Shade and name ONE region of tropical rainforest and ONE region of tropical grassland.", 4, drawing("world-outline")],
      ["(b)", "Describe the weather associated with any TWO Caribbean weather systems.", 8],
      ["(c)", "Explain how FOUR characteristics of the vegetation of EITHER equatorial OR tropical continental regions have been influenced by the climate.", 12],
    ],
  },
  {
    prompt: "Study Table 1 which shows urban primacy for selected Caribbean countries and answer the questions that follow.",
    table: primacy,
    parts: [
      ["(a)(i)", "Name the country which has just over one quarter of its urban population living in the primate city.", 1],
      ["(a)(ii)", "Which country has nearly a quarter of its total population living in the primate city?", 1],
      ["(a)(iii)", "Name ONE country where all the urban population live in one city.", 1],
      ["(a)(iv)", "Which country has the smallest percentage of its total population living in the primate city?", 1],
      ["(b)(i)", "State TWO ways by which the population of cities increase.", 2],
      ["(b)(ii)", "Describe THREE measures that can be used to reduce urbanization in the Caribbean.", 6],
      ["(c)", "Explain FOUR reasons why many rural residents in the Caribbean prefer to live in cities.", 12],
    ],
  },
  {
    prompt: "Study the graph in Figure 4 which shows the contribution of EACH sector to the Gross Domestic Product (GDP) and answer the questions that follow.\nSource: Paul Guiness et al., Geography for CSEC, Nelson Thornes, 2008, Figure 12.3.",
    figures: figures(id, "gdp-sectors"),
    parts: [
      ["(a)(i)", "In which country does Industry contribute 15 per cent to Gross Domestic Product?", 1],
      ["(a)(ii)", "In which country does Industry contribute the largest percentage to Gross Domestic Product?", 1],
      ["(a)(iii)", "What is the combined contribution of Agriculture and Industry in Anguilla?", 1],
      ["(a)(iv)", "What is the contribution of Services in Cuba?", 1],
      ["(b)(i)", "Define the term ‘tertiary activity’.", 2],
      ["(b)(ii)", "Describe THREE benefits of the tourist industry to the Caribbean.", 6],
      ["(c)(i)", "Explain TWO reasons that EITHER mining OR forestry OR fishing is important to the economic development of a named Caribbean country.", 6],
      ["(c)(ii)", "Explain TWO challenges faced by EITHER the garment industry OR the food processing industry in the Caribbean.", 6],
    ],
  },
  {
    prompt: "Table 2 shows the main Caribbean sugar producers for 1991 and 2001. Study Table 2 and answer the questions that follow.\nSource: John Niles, Modern Caribbean Geography, Macmillan Caribbean, 2005, Table 8.1.",
    table: sugar,
    parts: [
      ["(a)(i)", "Which country experienced the biggest decline in sugar production?", 1],
      ["(a)(ii)", "What was the actual decline in sugar production for Jamaica?", 1],
      ["(a)(iii)", "What was the percentage change in production for Guyana?", 2],
      ["(b)(i)", "What is peasant farming?", 2],
      ["(b)(ii)", "List TWO ways by which peasant farmers market their produce.", 2],
      ["(b)(iii)", "Describe TWO characteristics of large-scale arable farming in the Caribbean.", 4],
      ["(c)", "Compare commercial arable farming in the Caribbean with commercial arable farming in the Canadian Prairies. Use the following headings.\nMechanization\nChallenges\nDiversification", 12],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a sketch map of a Caribbean country. On the map, shade and name an area, town OR village which has suffered serious damage by ONE of the following events.\nHurricane OR earthquake OR volcanic eruption", 4, { drawing: true }],
      ["(b)", "Describe FOUR impacts of any ONE of the following events on a named Caribbean country.\nHurricane OR volcanic eruption OR earthquake", 8],
      ["(c)(i)", "Explain how the implementation of any TWO measures can reduce the degradation of coral reefs in the Caribbean.", 6],
      ["(c)(ii)", "Explain how any TWO measures can reduce the emission of greenhouse gases.", 6],
    ],
  },
  {
    prompt: "Study Figure 6 which shows forest cover in the Caribbean and answer the questions that follow.\nSource: Paul Guiness et al., Geography for CSEC, Nelson Thornes, 2008, Figure 14.24.",
    figures: figures(id, "forest-cover"),
    parts: [
      ["(a)(i)", "Name ONE country which has over 70% forest cover.", 1],
      ["(a)(ii)", "Which country has 25% forest cover?", 1],
      ["(a)(iii)", "Name ONE country which has less than 10% forest cover.", 1],
      ["(a)(iv)", "What is the percentage forest cover of St Kitts and Nevis?", 1],
      ["(b)(i)", "Define the following.\nAir pollution\nWater pollution", 4],
      ["(b)(ii)", "Explain TWO ways by which tourism development can contribute to coral destruction in the Caribbean.", 4],
      ["(c)(i)", "Outline TWO consequences of deforestation in the Caribbean.", 6],
      ["(c)(ii)", "Outline TWO possible consequences of global warming for the Caribbean.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a sketch map of a Caribbean territory (including Guyana and Suriname) to show an area where EITHER land OR water OR air pollution is present. State the type of pollution you choose.", 4, { drawing: true }],
      ["(b)(i)", "List TWO sources of greenhouse gases.", 2],
      ["(b)(ii)", "State TWO causes of marine pollution in the Caribbean.", 2],
      ["(b)(iii)", "Describe TWO measures that can be used to reduce water pollution along the coast.", 4],
      ["(c)", "Explain how FOUR of the measures used by a national disaster prevention organization reduce and/or alleviate the effects of hurricanes OR earthquakes OR volcanic eruptions.", 12],
    ],
  },
]);
