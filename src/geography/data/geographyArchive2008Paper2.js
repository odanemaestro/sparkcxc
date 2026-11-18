import { archivedSectionedPaper, figures } from "./geographyArchiveModels";

const id = "2008-mj-p2";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const landslides = {
  caption: "Table 1. Slope failures recorded for different rock types",
  rowHeading: "Rock Type",
  columns: ["Area (km²)", "Number of Landslides", "Number of Landslides per km²"],
  rows: [
    ["Volcanics", 1.1, 67, 59], ["Landslide deposits", 0.3, 20, 67],
    ["Limestones", 2.6, 8, ""], ["Intrusive igneous rocks", 3.2, 209, 66],
    ["Alluvial deposits", 1.5, 5, 4], ["Total", 8.7, "", ""],
  ],
};
const humidity = {
  caption: "Table 2. Changes in temperature and humidity",
  rowHeading: "Time (hr)",
  columns: ["0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800"],
  rows: [
    ["Temp. (°C)", 24, 24.5, 25, 25.7, 26, 26.6, 27.3, 28.1, 29, 30, 29, 28, 26.3],
    ["RH (%)", 80, 78, 75, 60, 55, 49, 47, 39, 36, 30, 37, 44, 47],
  ],
};
const treeAdaptations = {
  caption: "Table 3. Adaptations of trees",
  rowHeading: "Part of Tree",
  columns: ["Equatorial Adaptation", "Equatorial Reason", "Tropical Continental Adaptation", "Tropical Continental Reason"],
  rows: [["Leaves", "", "", "", ""], ["Trunk", "", "", "", ""], ["Root", "", "", "", ""]],
};
const gdp = {
  caption: "Table 4. Value of gross domestic products (GDP) of Country X",
  rowHeading: "Sector",
  columns: ["GDP ($ Thousand)"],
  rows: [["Agriculture", "13 500"], ["Manufacturing", "32 500"], ["Services", "170 700"]],
};
const exports = {
  caption: "Table 5. Value of agricultural exports from Country X ($ ’000)",
  rowHeading: "Year",
  columns: ["2001", "2002", "2003", "2004"],
  rows: [["Value ($ ’000)", "151 700", "138 000", "150 500", "147 000"]],
};
const disasters = {
  caption: "Table 6. Number of persons made homeless by natural disasters, 1972 to 1976",
  rowHeading: "Disaster",
  columns: ["Annual Average"],
  rows: [["Earthquake", "248 200"], ["Flood", "3 356 500"], ["High wind", "1 069 000"], ["Volcano", "15 000"], ["Total", "4 688 700"]],
};
const emissions = {
  caption: "Table 7. Carbon dioxide emissions per person (tonnes) and GNP per capita",
  rowHeading: "Countries",
  columns: ["1980", "2001", "GNP (1998)"],
  rows: [
    ["USA", 20.4, 19.8, "29 340"], ["Canada", 17.1, 14.2, "20 020"], ["Antigua", 2.3, 5.2, "–"],
    ["Jamaica", "4.0", 4.2, "1 680"], ["Guyana", 2.3, 2.1, 700], ["Grenada", 0.5, 2.1, "–"],
  ],
};

export default archivedSectionedPaper(id, 2008, 100, [
  {
    prompt: "A map extract of Port Antonio (Jamaica) on a scale of 1:50 000 is provided. Study the extract and then answer the following questions.",
    figures: figures("2008-mj-p3", "port-antonio"),
    parts: [
      ["(a)(i)", "What is the six-figure grid reference of the junction of the Class B and Class C roads near the coast in Port Antonio?", 2],
      ["(a)(ii)", "Using the line scale, determine the length of the road (along the coast of East Harbour) from the junction of the Class B and Class C roads used in (i) to the junction of the road to Folly Point. Give your answer in kilometres and metres to the NEAREST 100 metres.", 2],
      ["(a)(iii)", "Measure the bearing from the lighthouse at Folly Point to the rock on the north coast called Ship Rock (near Easting 04).", 2],
      ["(a)(iv)", "Determine the approximate compass direction of the hotel at Daniels Harbour (near Easting 11) from the Folly Point Lighthouse.", 1],
      ["(b)", "Figure 1 is a grid for a cross-section across the valley of the Rio Grande along Northing 67, between Eastings 03 and 06 at the same horizontal scale as the map. Using the map as a guide, sketch the cross-section on the grid and insert and label the position of the river.", 3, drawing("rio-grande-profile")],
      ["(c)(i)", "Study the area on the map enclosed by Eastings 19 and 21, and Northings 64 and 67. Identify the landform along the coast.", 1, { figures: figures(id, "port-antonio-area") }],
      ["(c)(ii)", "List the THREE types of agricultural land use shown in the area.", 3],
      ["(d)", "Describe the distribution of banana plantations in the area covered by the map extract.", 4],
      ["(e)", "Select TWO of the following settlement patterns and describe their distribution south of Northing 65.\nLinear\nDispersed\nIsolated\nNucleated", 4],
      ["(f)", "Compare THREE features of the drainage west of the Rio Grande with the area to the east of it. Refer to the entire area of the map extract.", 6],
    ],
  },
  {
    prompt: "Study Table 1 which shows slope failures recorded for different rock types and then answer the questions that follow.",
    table: landslides,
    parts: [
      ["(a)(i)", "How many landslides were recorded?", 1],
      ["(a)(ii)", "Which rock type had the HIGHEST number of landslides?", 1],
      ["(a)(iii)", "Calculate the number of landslides per square kilometre on limestones.", 1],
      ["(a)(iv)", "State the number of landslides that occurred on the rock type with the SMALLEST area.", 1],
      ["(b)(i)", "Identify TWO landforms that are formed at plate boundaries.", 2],
      ["(b)(ii)", "Describe what happens at divergent and convergent plate boundaries.", 6],
      ["(c)", "Explain how and why the shape of the cross-section of a river valley differs in its upper and lower courses.", 4],
      ["(d)", "With the aid of FULLY annotated diagrams explain how spits and tombolos are formed.", 8, { drawing: true }],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a well-labelled diagram to show THREE main features of a meander.", 4, { drawing: true }],
      ["(b)(i)", "State FOUR conditions that are required for the successful growth of coral reefs.", 4],
      ["(b)(ii)", "Describe fringing reefs and barrier reefs.", 4],
      ["(c)(i)", "Account for the formation of waterfalls.", 6],
      ["(c)(ii)", "Account for the formation of deltas.", 6],
    ],
  },
  {
    prompt: "Study Table 2 which shows the temperature (°C) and relative humidity (RH%) for a Caribbean island between 6 a.m. and 6 p.m. and answer the questions below.",
    table: humidity,
    parts: [
      ["(a)(i)", "Between which TWO hours did the temperature start to decrease?", 1],
      ["(a)(ii)", "At what time was the HIGHEST relative humidity observed?", 1],
      ["(a)(iii)", "State the relationship between temperature and relative humidity.", 2],
      ["(b)(i)", "What are ‘tropical waves’?", 2],
      ["(b)(ii)", "Describe the characteristics of THREE elements of the weather associated with the passage of a tropical wave.", 6],
      ["(c)", "Complete Table 3 to compare the adaptations of trees to the climate in equatorial and tropical continental regions. Give ONE adaptation in EACH case and its reason.", 12, { table: treeAdaptations }],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a sketch map of a Caribbean country that you have studied and on it indicate ONE area of dense settlement and ONE area of sparse settlement.", 4, { drawing: true }],
      ["(b)(i)", "Define the term ‘urbanization’.", 2],
      ["(b)(ii)", "Explain how urbanization occurs in the Caribbean. Include THREE causes in your response.", 9],
      ["(b)(iii)", "Discuss ONE negative effect of urbanization in ONE named capital city in the Caribbean.", 3],
      ["(b)(iv)", "Outline THREE measures aimed at controlling urbanization in the Caribbean.", 6],
    ],
  },
  {
    prompt: "The value (in thousand dollars) of the gross domestic products for selected sectors in Country X is presented in Table 4.",
    table: gdp,
    parts: [
      ["(a)", "Draw a pie chart (diameter 4 cm) to illustrate the data presented in Table 4.", 4, { drawing: true }],
      ["(b)(i)", "Define the term ‘economic activity’.", 2],
      ["(b)(ii)", "For ONE type of economic activity you have studied, describe THREE changes that have taken place.", 6],
      ["(c)", "Explain THREE challenges faced by any TWO types of economic activity in the Caribbean.", 12],
    ],
  },
  {
    prompt: "Table 5 presents data on the value of agricultural exports from Country X.",
    table: exports,
    parts: [
      ["(a)", "Using the axes provided in Figure 2, draw a bar graph to illustrate the data. Label your graph appropriately.", 4, drawing("agriculture-exports-grid")],
      ["(b)(i)", "Define the term ‘agriculture’.", 2],
      ["(b)(ii)", "Describe THREE ways in which agriculture is important to the Caribbean.", 6],
      ["(c)", "Compare ‘peasant farming’ and ‘commercial arable farming’ in a named Caribbean country using the following headings.\n(i) Crops and farm size\n(ii) Farming methods\n(iii) Labour and market", 12],
    ],
  },
  {
    prompt: "Study Table 6 which provides data on the annual average number of people made homeless by natural disasters from 1972 to 1976 and answer the questions that follow.",
    table: disasters,
    parts: [
      ["(a)(i)", "For the period 1972 to 1976, how many persons were made homeless by volcanoes annually?", 1],
      ["(a)(ii)", "What is the average number of persons who were affected by climatic disasters annually in this period?", 2],
      ["(a)(iii)", "What was the annual percentage of persons homeless from natural disasters as a result of high winds?", 1],
      ["(b)", "For a country you have studied describe FOUR ways in which EITHER an earthquake, OR a volcanic eruption, OR a hurricane affected life or property.", 8],
      ["(c)", "For EITHER a hurricane, OR an earthquake, OR a volcano explain how EACH of THREE precautions can be used to reduce its impact.", 12],
    ],
  },
  {
    prompt: "Study Table 7 which shows carbon dioxide emissions per person and GNP per capita for selected countries and answer the questions below.\nSources: Wilson (2004) and Collins–Longman Atlas (2002).",
    table: emissions,
    parts: [
      ["(a)(i)", "Which country had the SMALLEST increase in carbon dioxide emissions per person between 1980 and 2001?", 1],
      ["(a)(ii)", "Calculate the change in carbon dioxide emissions per person for Canada.", 2],
      ["(a)(iii)", "State the relationship between carbon dioxide emissions and the GNP per capita of the countries.", 1],
      ["(b)(i)", "Define the term ‘air pollution’.", 2],
      ["(b)(ii)", "Describe THREE causes of river pollution in a named Caribbean country.", 6],
      ["(c)(i)", "Explain how TWO measures that have been implemented by Caribbean countries can reduce the emission of greenhouse gases.", 6],
      ["(c)(ii)", "Explain how TWO measures that have been implemented by Caribbean countries can reduce land pollution.", 6],
    ],
  },
  {
    prompt: "Study Figure 3 which shows the differences in the average annual temperature from 1900 to 2000 and answer the questions that follow.\nSource: BBC Scotland, Bitesize Geography.",
    figures: figures(id, "annual-temperature"),
    parts: [
      ["(a)(i)", "Determine the difference in average annual temperature from the 1900 average in\na) 2000\nb) 1910.", 2],
      ["(a)(ii)", "During which quarter (1900–1925, 1925–1950, 1950–1975 or 1975–2000) was the change in average annual temperature\na) fastest?\nb) smallest?", 2],
      ["(b)", "Describe the process which produces the greenhouse effect.", 4],
      ["(c)", "For any TWO greenhouse gases describe how the concentration of EACH increases in the atmosphere.", 4],
      ["(d)", "Using examples from a developed country, explain how TWO measures can reduce the production of greenhouse gases.", 6],
      ["(e)", "Compare THREE possible consequences of global warming in the Maldives or Mauritius with those in a named Caribbean country.", 6],
    ],
  },
]);
