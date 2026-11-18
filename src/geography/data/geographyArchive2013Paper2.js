import { archivedSectionedPaper, figures } from "./geographyArchiveModels";

const id = "2013-mj-p2";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const gdp = {
  caption: "Table 1. Gross domestic product of a Caribbean country",
  rowHeading: "Sector",
  columns: ["% contribution"],
  rows: [["Primary", "9%"], ["Secondary", "27%"], ["Tertiary", "64%"]],
};
const disasters = {
  caption: "Table 2. Major 20th century disasters affecting a tropical island",
  rowHeading: "Year",
  columns: ["Disaster", "Number of persons killed"],
  rows: [
    [1907, "3 Earthquakes", 1200], [1909, "1 Hurricane", 1], [1915, "2 Hurricanes", 19],
    [1917, "1 Hurricane", 57], [1933, "2 Hurricanes", 40], [1933, "2 Floods", 53],
    [1937, "1 Flood", 70], [1951, "1 Hurricane", 154],
  ],
};
const temperatures = {
  caption: "Table 3. Estimated global average temperature change, 1880–2000",
  rowHeading: "Time period (years)",
  columns: ["Temperature change (°C)"],
  rows: [["1880–1900", "−0.2"], ["1901–1920", "−0.1"], ["1921–1940", "0.0"], ["1941–1960", "0.1"], ["1961–1980", "0.2"], ["1981–2000", "0.4"]],
};
const jobs = {
  caption: "Table 4. Singapore – employment structure by selected industries in 2003",
  rowHeading: "Industry",
  columns: ["Employment (thousands)"],
  rows: [["Manufacturing", "364.8"], ["Construction", "114.5"], ["Wholesale and retail", "296.4"], ["Transport, storage and communication", "216.0"]],
};

export default archivedSectionedPaper(id, 2013, 100, [
  {
    prompt: "A map extract of Nevis (scale 1:25 000) is provided. Use it to answer the following questions.",
    figures: figures("2013-mj-p3", "nevis-map"),
    parts: [
      ["(a)", "State the six-figure grid reference of the well that is near to Fort Charles on the west coast, south of Charlestown.", 2],
      ["(b)(i)", "Complete this statement: ‘On this map, 1 cm represents ____ metres’.", 1],
      ["(b)(ii)", "What is the length of the main road from the junction near to Hamilton’s Estate in St Paul, Charlestown, to the junction near to Morning Star Estate (to the NEAREST 100 metres)?", 2],
      ["(c)(i)", "What is the grid bearing from the junction near Morning Star Estate to the junction near Hamilton Estate?", 2],
      ["(c)(ii)", "What is the compass direction of Charlestown from Hamilton Estate?", 1],
      ["(d)", "Figure 1 shows part of the map of Nevis. The grid lines are numbered to identify the area. On the grid,\n(i) insert a beach and the airport [2 marks]\n(ii) place the letter S on the area with the steepest slope [1 mark]\n(iii) place the letter P on a peak [1 mark]\n(iv) place the letter F on a large area of gently sloping land below 50 feet above sea level [1 mark]\n(v) state the scale as a representative fraction in the space provided on the page with the grid (Figure 1). [1 mark]", 6, drawing("nevis-north-coast")],
      ["(e)", "Describe FOUR characteristics of the land use pattern.", 8],
      ["(f)", "Using ONLY evidence from the map, give THREE reasons to explain the distribution of the areas of cultivation and plantation.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Draw ONE diagram to illustrate any FOUR of the following features.\nSill\nDyke\nVolcano\nBatholith\nLava plateau", 4, { drawing: true }],
      ["(b)(i)", "Name TWO types of plate boundaries.", 2],
      ["(b)(ii)", "Describe what happens at any ONE of the plate boundaries named in (b) (i). Use examples to illustrate your answer.", 6],
      ["(c)(i)", "Explain how volcanoes are formed.", 6],
      ["(c)(ii)", "Explain how fold mountains are formed.", 6],
    ],
  },
  {
    prompt: "Study Figure 2 and answer the questions that follow.",
    figures: figures(id, "water-cycle"),
    parts: [
      ["(a)(i)", "What cycle is illustrated in the diagram above?", 1],
      ["(a)(ii)", "Name any THREE of the processes labelled A to F.", 3],
      ["(b)", "Name and describe TWO types of drainage pattern.", 8],
      ["(c)(i)", "Explain how ONE surface feature is formed in limestone areas of the Caribbean.", 6],
      ["(c)(ii)", "Explain how ONE underground feature is formed in limestone areas of the Caribbean.", 6],
    ],
  },
  {
    prompt: "Figure 3 is a climate graph which shows precipitation and temperature for a climatic region in the northern hemisphere. Study Figure 3 and answer the questions that follow.",
    figures: figures(id, "climate-graph"),
    parts: [
      ["(a)(i)", "State the month with the lowest temperature.", 1],
      ["(a)(ii)", "State the month with approximately 125 mm (5 inches) of rainfall.", 1],
      ["(a)(iii)", "What is the approximate range of average temperature for the year?", 1],
      ["(a)(iv)", "What is the relationship between rainfall and temperature?", 1],
      ["(b)(i)", "Define EACH of the following terms.\na) Weather [2 marks]\nb) Climate [2 marks]", 4],
      ["(b)(ii)", "Explain what happens when warm, moist air is forced to rise over a mountain.", 4],
      ["(c)(i)", "Describe TWO characteristics of soil.", 4],
      ["(c)(ii)", "Explain how climate and vegetation influence the formation of soils in either equatorial or tropical continental areas.", 8],
    ],
  },
  {
    parts: [
      ["(a)", "(i) Draw a sketch map of a named Caribbean country. [2 marks]\n(ii) On the sketch map drawn in (a) (i), name and locate ONE area of sparse population distribution and ONE area with a dense population distribution. [2 marks]", 4, { drawing: true }],
      ["(b)(i)", "Define EACH of the following terms.\na) Birth rate [2 marks]\nb) Infant mortality rate [2 marks]", 4],
      ["(b)(ii)", "Outline TWO ways by which the population of a country increases.", 4],
      ["(c)(i)", "Using examples from a named Caribbean country, explain how ONE of the following factors may influence population distribution.\nAvailability of services\nRelief", 4],
      ["(c)(ii)", "Compare the population growth of ONE Caribbean country with that of ONE developed country, using the following headings.\nFertility rates\nMigration", 8],
    ],
  },
  {
    prompt: "Figure 4 shows pie charts of the percentage of the workforce employed in the various sectors in Barbados in 1946 and 2003. Study Figure 4 and answer the questions that follow.",
    figures: figures(id, "barbados-workforce"),
    parts: [
      ["(a)(i)", "Name the category of jobs that was NOT represented in 1946 but was included in 2003.", 1],
      ["(a)(ii)", "Which category increased by 11 per cent?", 1],
      ["(a)(iii)", "By how much did the percentage employed in agriculture decrease?", 1],
      ["(a)(iv)", "Which category has the SMALLEST percentage change?", 1],
      ["(b)(i)", "What is meant by ‘secondary economic activity’?", 1],
      ["(b)(ii)", "Give ONE example of a secondary economic activity.", 1],
      ["(b)(iii)", "State the MAIN feature of the following types of tourism and give an example of EACH.\na) Heritage tourism [2 marks]\nb) Ecotourism [2 marks]\nc) Sports tourism [2 marks]", 6],
      ["(c)", "With reference to specific examples, explain THREE economic benefits of primary activities to the Caribbean.", 12],
    ],
  },
  {
    prompt: "Table 1 shows the composition of the gross domestic product of a Caribbean country.",
    table: gdp,
    parts: [
      ["(a)", "Use the information in Table 1 to draw a pie chart.", 4, { drawing: true }],
      ["(b)(i)", "State FOUR benefits of agriculture to the Caribbean economy.", 4],
      ["(b)(ii)", "Outline TWO problems faced by peasant (small) farmers in the Caribbean.", 4],
      ["(c)(i)", "Using examples, give TWO reasons for the declining importance of agriculture to the economy of a named Caribbean country.", 6],
      ["(c)(ii)", "Compare the characteristics of wheat farming in Canada with those of commercial arable farming in a named Caribbean country, using the following headings.\nTechnology\nFarm size", 6],
    ],
  },
  {
    prompt: "Table 2 lists some major disasters affecting a country. Study Table 2 and answer the questions that follow.",
    table: disasters,
    parts: [
      ["(a)(i)", "Over the period, in which year did the MOST natural disasters occur?", 1],
      ["(a)(ii)", "Which disaster caused the MOST deaths over the period?", 1],
      ["(a)(iii)", "Which disaster caused the LEAST deaths over the period?", 1],
      ["(a)(iv)", "What was the TOTAL number of deaths caused by floods?", 1],
      ["(b)", "What is a natural hazard?", 2],
      ["(c)", "Describe THREE ways in which ONE of the following hazards affects life and property.\nHurricane\nEarthquake\nVolcanic eruption", 6],
      ["(d)(i)", "Explain THREE ways in which an individual should prepare for the effects of the hazard you described in (c) above.", 6],
      ["(d)(ii)", "Explain TWO measures used by a national disaster organization in a named Caribbean country in response to hazards.", 6],
    ],
  },
  {
    prompt: "Table 3 shows the change in average global temperature between 1880 and 2000. Study Table 3 and answer the questions that follow.",
    table: temperatures,
    parts: [
      ["(a)(i)", "What is the general trend in global average temperature?", 1],
      ["(a)(ii)", "Which period recorded NO change in average temperature?", 1],
      ["(a)(iii)", "Which period had the HIGHEST temperature change?", 1],
      ["(a)(iv)", "What was the temperature change between 1901 and 1920?", 1],
      ["(b)(i)", "Define the term ‘greenhouse effect’.", 2],
      ["(b)(ii)", "Identify TWO causes of deforestation.", 2],
      ["(b)(iii)", "State TWO causes of coral reef destruction.", 4],
      ["(c)(i)", "Explain TWO ways in which the development of the tourism industry contributes to global warming.", 6],
      ["(c)(ii)", "Explain how the destruction of coral reefs in the Caribbean can adversely affect the tourism industry.", 6],
    ],
  },
  {
    prompt: "Table 4 shows the employment structure in Singapore.\nAdapted: Ottley and Gentles, p. 199.",
    table: jobs,
    parts: [
      ["(a)", "On the grid provided, draw a bar graph to illustrate the data shown in Table 4. Use a scale of 1 cm to represent 50,000 employees.", 4, drawing("singapore-jobs-grid")],
      ["(b)", "Describe TWO types of pollution and, for EACH, describe a measure used to reduce the harmful effects.", 8],
      ["(c)", "Explain THREE measures used to reduce the effects of deforestation in the Caribbean. Give ONE example of EACH measure.", 12],
    ],
  },
]);
