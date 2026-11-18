import { archivedSectionedPaper, figures } from "./geographyArchiveModels";

const id = "2010-mj-p2";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const parishes = {
  caption: "Table 1. Jamaica’s population and growth rate by parish (1992 and 2001)",
  rowHeading: "Parish",
  columns: ["1992", "2001", "Growth Rate (%)"],
  rows: [
    ["St. Andrew", "549 900", "554 200", 0.8], ["Clarendon", "213 000", "236 200", 10.9],
    ["Manchester", "163 000", "185 300", 13.7], ["St. Elizabeth", "143 000", "145 900", "2.0"],
    ["Westmoreland", "128 000", "138 500", 8.2], ["Hanover", "66 000", "66 800", 1.2],
    ["St. James", "155 000", "174 600", 12.6], ["Portland", "75 800", "80 000", ""],
  ],
};
const crops = {
  caption: "Table 2. Production of selected crops (’000 tonnes)",
  rowHeading: "Crops",
  columns: ["2002", "2003", "2004"],
  rows: [
    ["Bananas", 39.99, 39.94, 27.66], ["Citrus", 136.74, 140.12, 131.36],
    ["Coffee", "16.20", 14.14, 16.46], ["Coconut", 15.5, 17.37, 16.64],
    ["Sugar Cane", "1 965.5", "1 775.7", "1 193.1"],
  ],
};
const waste = {
  caption: "Table 3. Solid waste production in selected cities",
  rowHeading: "Cities",
  columns: ["Solid Waste per Capita (kg/year)", "Waste Water Treated (%)", "Household with Garbage Collection (%)"],
  rows: [
    ["Brasilia", 182, 54, 95], ["Havana", 584, 100, 100], ["La Paz", 182, 0, 92],
    ["San Salvador", 328, 2, 46], ["Santiago", 182, 5, 57], ["Toronto", 511, 100, 100],
  ],
};

export default archivedSectionedPaper(id, 2010, 100, [
  {
    prompt: "Study the map extract of Pointe Michel, Dominica (scale 1:25 000), and answer the following questions.",
    figures: figures(id, "pointe-michel-2010"),
    parts: [
      ["(a)", "State the six-figure grid reference of the Police Station in the village of Soufrière.", 2],
      ["(b)", "What is the direction of the NEAREST school from the Police Station in the village of Soufrière?", 1],
      ["(c)", "What is the bearing of the minor trigonometrical station, TR 10 (near Easting 68), at Morne Patates from the NEAREST school?", 2],
      ["(d)", "What is the distance, in a straight line, between the school and the minor trigonometrical station at Morne Patates (to the NEAREST 100 metres)?", 2],
      ["(e)", "What is the gradient from the trigonometrical station at Morne Patates to the coast, given that the distance to the coast is 1 815 feet?", 3],
      ["(f)", "List FOUR services provided to the village of Berekua (near Easting 72).", 4],
      ["(g)", "Describe the drainage in the area between Eastings 66 and 69.", 4],
      ["(h)", "Describe the site of the town of Pointe Michel.", 4],
      ["(i)", "Account for the distribution of agriculture in the area between Eastings 66 and 69.", 6],
    ],
  },
  {
    prompt: "Study Figures 1 and 2, which show the global distribution of tectonic plates and of active volcanoes respectively, and answer the questions that follow.\nSources: London and Senior, Principles of Geography for CXC, Longman, 2001, p. 18. Nagle, Hazards, Nelson, 1998, p. 24.",
    figures: figures(id, "tectonic-plates", "active-volcanoes"),
    parts: [
      ["(a)(i)", "Name the continent with no active volcanoes.", 1],
      ["(a)(ii)", "How many active volcanoes are in South America?", 1],
      ["(a)(iii)", "State ONE difference between the distribution of volcanoes in North America and Africa.", 1],
      ["(a)(iv)", "How is the distribution of volcanoes related to plate boundaries?", 1],
      ["(b)(i)", "With the aid of a diagram, describe the MAIN features of the trellis drainage pattern.", 4, { drawing: true }],
      ["(b)(ii)", "Describe TWO ways in which rivers transport their load.", 4],
      ["(c)(i)", "Explain how volcanoes are formed at convergent plate boundaries.", 6],
      ["(c)(ii)", "Account for the formation of fold mountains at\na) collision zones [3 marks]\nb) subduction zones. [3 marks]\nInclude examples in your answer.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a well-labelled diagram of the water cycle.", 4, { drawing: true }],
      ["(b)", "Describe FOUR processes of coastal erosion.", 8],
      ["(c)(i)", "With the aid of a diagram, explain how bay-head beaches are formed.", 6, { drawing: true }],
      ["(c)(ii)", "Explain how river cliffs and slip-off slopes are formed at meanders.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a cross section of a hurricane to illustrate its structure.", 4, { drawing: true }],
      ["(b)", "Describe FOUR layers of vegetation in tropical rainforests.", 8],
      ["(c)", "With the aid of a diagram, explain how rain shadow areas develop.", 8, { drawing: true }],
      ["(d)", "Explain why the temperature is usually much lower on the summit of a mountain than the surrounding lowlands.", 4],
    ],
  },
  {
    prompt: "Study Table 1, which shows the population and growth rate of parishes in Jamaica, and answer the questions that follow.",
    table: parishes,
    parts: [
      ["(a)(i)", "Name the parish which had the HIGHEST growth rate.", 1],
      ["(a)(ii)", "Name ONE parish that had growth of less than 2%.", 1],
      ["(a)(iii)", "Calculate the growth in Portland as a percentage.", 1],
      ["(a)(iv)", "Which parish had a population increase of less than one thousand persons?", 1],
      ["(b)", "Describe THREE problems of urbanisation in the Caribbean.", 6],
      ["(c)", "State TWO factors which influence population growth.", 2],
      ["(d)", "Give SIX reasons why people often move from rural areas to cities.", 12],
    ],
  },
  {
    prompt: "Study Figure 3, which shows apparel exports from Jamaica to the USA and to all other markets for the period 1995–2005, and answer the questions that follow.\nSource: Economic and Social Survey, Jamaica, 2005, Sec. 12.6.",
    figures: figures(id, "apparel-exports"),
    parts: [
      ["(a)(i)", "What is the trend in apparel exports over the period 1995–2005?", 1],
      ["(a)(ii)", "What was the APPROXIMATE value of exports to the USA in 1996?", 1],
      ["(a)(iii)", "What is the value of exports to OTHER countries (excluding the USA) in 1998?", 1],
      ["(a)(iv)", "For exports to the USA, how many years had a value of 100 million or less?", 1],
      ["(b)(i)", "Name and give an example of TWO types of economic activities in the Caribbean.", 2],
      ["(b)(ii)", "For a named Caribbean country, describe TWO factors which influence the location of a specific type of economic activity.", 6],
      ["(b)(iii)", "For the economic activity identified in (b) (ii), explain TWO challenges it faces.", 4],
      ["(c)", "For EITHER food processing OR garment manufacturing, explain how the development of the industry in BOTH a named Caribbean country and EITHER Singapore OR Hong Kong is influenced by ANY TWO of the following.\n(i) Labour\n(ii) Raw materials\n(iii) Market", 8],
    ],
  },
  {
    prompt: "Study Table 2, which shows the production of selected crops for 2002–2004 in Jamaica, and answer the questions that follow.\nSource: Economic and Social Survey, Jamaica, 2005.",
    table: crops,
    parts: [
      ["(a)(i)", "Which crop shows the HIGHEST production?", 1],
      ["(a)(ii)", "Name the crop for which production INCREASED between 2003 and 2004.", 1],
      ["(a)(iii)", "For which crop did production DECLINE the most between 2002 and 2004?", 1],
      ["(a)(iv)", "Name the crop for which production increased and then fell below the 2002 level.", 1],
      ["(b)", "Describe FOUR characteristics of peasant farming in the Caribbean.", 8],
      ["(c)", "Explain THREE ways in which the role of commercial arable farming in a named Caribbean country has changed.", 6],
      ["(d)", "Carefully explain how farming in the Caribbean differs from that in the Prairies of Canada. Include TWO differences in your answer.", 6],
    ],
  },
  {
    prompt: "Study Figure 4, which shows the effects of a natural hazard, and answer the questions that follow.\nSource: Jamaica Foundation, Disaster Preparedness, Jamaica, 1990, p. 18.",
    figures: figures(id, "natural-hazard-effects"),
    parts: [
      ["(a)(i)", "Name the event that affected the area.", 1],
      ["(a)(ii)", "List THREE effects of the event on the area.", 3],
      ["(b)(i)", "Define the term ‘natural hazard’.", 2],
      ["(b)(ii)", "Describe THREE measures that an individual or community can take to reduce the effects of a named natural hazard.", 6],
      ["(c)(i)", "For a named Caribbean country, explain TWO responses at the national level that have been used to alleviate the damage caused by a specific natural hazard.", 6],
      ["(c)(ii)", "Explain how regional agencies assist Caribbean countries in disaster preparedness and response. Include TWO ways in your answer.", 6],
    ],
  },
  {
    prompt: "Study Table 3, which shows the solid waste production, waste water treatment and garbage collection of selected cities, and answer the questions that follow.\nSource: Habitat 1997 (in Geo 2000).",
    table: waste,
    parts: [
      ["(a)(i)", "Name the cities with the same per capita solid waste production.", 1],
      ["(a)(ii)", "Which city had the LOWEST percentage of household waste collection?", 1],
      ["(a)(iii)", "Complete the bar graph in Figure 5 to show the data for waste water treated.", 2, drawing("waste-treatment-grid")],
      ["(b)(i)", "With reference to examples, give the meaning of ‘air pollution’ and ‘land pollution’.", 4],
      ["(b)(ii)", "Describe TWO measures that have been implemented by Caribbean countries to reduce the emission of aerosols.", 4],
      ["(c)", "Explain how deforestation affects the environment in the Caribbean. Include FOUR effects in your answer.", 12],
    ],
  },
  {
    prompt: "Figure 6 shows TWO imaginary coral islands.",
    parts: [
      ["(a)(i)", "On the figure, shade the areas of BOTH islands which would be flooded if the sea level rose 30 cm.", 2, drawing("coral-islands")],
      ["(a)(ii)", "With reference to Figure 6, list TWO effects of the rise in sea level on the people who live on these islands.", 2],
      ["(b)", "Discuss TWO causes and TWO consequences of global warming.", 8],
      ["(c)", "Explain how coral reefs in the Caribbean are destroyed. Include SIX different ways in your answer.", 12],
    ],
  },
]);
