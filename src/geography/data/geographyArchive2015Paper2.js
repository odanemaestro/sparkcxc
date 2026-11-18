import { archivedSectionedPaper, figures } from "./geographyArchiveModels";

const id = "2015-mj-p2";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const population = {
  caption: "Table 1. Number of births and deaths in Jamaica, 1971–1985",
  rowHeading: "Year",
  columns: ["Births", "Deaths", "Natural Increase"],
  rows: [
    [1971, "66 300", "15 900", "50 400"], [1973, "61 900", "16 000", "45 900"],
    [1975, "", "15 800", "45 700"], [1977, "60 400", "16 100", "44 300"],
    [1979, "59 100", "15 100", "44 100"], [1981, "59 400", "", "44 200"],
    [1983, "61 400", "12 600", "48 800"], [1985, "50 200", "13 900", ""],
  ],
};
const grenadaGDP = {
  caption: "Table 2. Contribution of sectors to GDP in Grenada",
  rowHeading: "Country",
  columns: ["Primary", "Secondary", "Services"],
  rows: [["Grenada (%)", 20, 24, 56]],
};
const bananaTrade = {
  caption: "Table 3. Banana production and export in the Caribbean, 2005",
  rowHeading: "Country",
  columns: ["Production (tonnes)", "Export (tonnes)", "Total Exported (%)"],
  rows: [
    ["Belize", "76 000", "64 891", 85], ["Dominica", "16 000", "12 732", 80],
    ["Jamaica", "125 000", "116 713", 93], ["Saint Lucia", "45 000", "30 630", 68],
    ["Saint Vincent and the Grenadines", "50 000", "24 470", ""],
  ],
};
const greenhouseGases = {
  caption: "Table 4. Atmospheric composition of greenhouse gases",
  rowHeading: "Gas",
  columns: ["Rate of Change Per Annum", "Average Percentage of Direct Greenhouse Gases", "Global Warming Potential"],
  rows: [
    ["Water vapour", "", "60.0", ""], ["Carbon dioxide", 0.5, "26.0", 1],
    ["Methane", "0.6–0.75", 4.4, 25], ["Nitrous oxide", "0.2–0.3", 1.5, 298],
    ["Chlorofluorocarbons", 4, 0.1, "10 500"], ["Ozone", "n/a", "8.0", 970],
  ],
};

export default archivedSectionedPaper(id, 2015, 100, [
  {
    prompt: "Study the map extract of Moneague, Jamaica, on the scale of 1:50 000, and answer the following questions.",
    figures: figures("2015-mj-p3", "moneague"),
    parts: [
      ["(a)", "What is the six-figure grid reference of the church in Walkerswood, northeast of the area?", 2],
      ["(b)", "What is the bearing of the crossroads (Class A and Class C roads) at Moneague from the junction at Walkerswood?", 2],
      ["(c)", "What is the average gradient of the road from the junction at Walkerswood (400 metres high) to the crossroads at Moneague (310 metres high)? Show all your working.", 4],
      ["(d)", "Figure 1 is an enlarged grid of part of the Friendship Pen (west of Moneague) area on which the 600 metres contour line has been inserted. On Figure 1,\n(i) insert the HIGHEST point in the area [1 mark]\n(ii) insert, and identify by the letter D, ONE depression east of Easting 32 [1 mark]\n(iii) draw the course of the river at Friendship Pen and indicate the direction of flow [2 marks]\n(iv) shade ALL land over 600 metres. [2 marks]", 6, drawing("friendship-pen-grid")],
      ["(e)", "List TWO types of economic activity that can be found in the Claremont and Golden Grove areas.", 2],
      ["(f)", "State TWO features of the drainage in the area covered by the map extract.", 2],
      ["(g)(i)", "Describe briefly, with reference to the entire map extract, TWO characteristics of the distribution of settlements.", 2],
      ["(g)(ii)", "Describe briefly, with reference to the entire map extract, TWO characteristics of the form or type of settlements.", 2],
      ["(h)(i)", "Using examples, explain ONE relationship between relief of the land in the area covered by the map extract and farming.", 2],
      ["(h)(ii)", "Using examples, explain ONE relationship between relief of the land in the area covered by the map extract and natural vegetation.", 2],
      ["(h)(iii)", "Using examples, explain ONE relationship between relief of the land in the area covered by the map extract and roads.", 2],
    ],
  },
  {
    parts: [
      ["(a)", "Figure 2 shows the boundaries of the tectonic plates (labelled with the letters A, B, C, D and E) in the Caribbean area. Identify, by letter and name, FOUR of the tectonic plates shown in the figure.", 4, { figures: figures(id, "caribbean-plates") }],
      ["(b)(i)", "Define ‘denudation’.", 2],
      ["(b)(ii)", "Define ‘weathering’.", 2],
      ["(b)(iii)", "Define ‘mass wasting’.", 2],
      ["(b)(iv)", "Define ‘erosion’.", 2],
      ["(c)", "Compare the movement and resulting features at transform and convergent plate boundaries. Give an example of EACH of these types of boundaries in the Caribbean.", 6],
      ["(d)", "Explain how temperature change and frost action can destroy rocks.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Study Figure 3 which shows the movement of water when it reaches the surface. The figure has an incomplete key. Complete the key to identify the features represented by FOUR of the symbols shown in the figure.", 4, drawing("water-movement")],
      ["(b)", "Describe the FOUR ways in which a river erodes.", 8],
      ["(c)", "Explain the cross-sectional shape of the channel of a river around a meander.", 6],
      ["(d)", "Explain how the formation of levees and floodplains are related.", 6],
    ],
  },
  {
    prompt: "Figure 4 shows five zones numbered 1 to 5 and the weather systems which influence Caribbean weather.",
    figures: figures(id, "weather-zones"),
    parts: [
      ["(a)", "Identify the number on the map which corresponds to the area where FOUR of the following weather systems are experienced most often.\nAnticyclone\nCold front\nHurricane\nIntertropical Convergence Zone\nTropical Wave", 4],
      ["(b)", "Describe the weather produced in an area as a tropical wave approaches and passes over it.", 4],
      ["(c)", "Describe TWO characteristics of both the rainfall and temperature of an equatorial climate.", 4],
      ["(d)(i)", "Explain the role of climate in the formation of soils in equatorial areas.", 6],
      ["(d)(ii)", "Explain the role of vegetation in the formation of soils in equatorial areas.", 6],
    ],
  },
  {
    prompt: "Study Table 1 which shows population statistics for Jamaica, and answer the questions that follow.",
    table: population,
    parts: [
      ["(a)(i)", "Calculate the number of births that occurred in 1975.", 1],
      ["(a)(ii)", "Determine the natural increase for 1985.", 1],
      ["(a)(iii)", "Calculate the number of deaths that occurred in 1981.", 1],
      ["(a)(iv)", "Describe the pattern of deaths from 1971 to 1985.", 1],
      ["(b)(i)", "Define the term ‘population density’.", 2],
      ["(b)(ii)", "State TWO characteristics of urbanization.", 2],
      ["(b)(iii)", "Outline TWO causes of urbanization in the Caribbean.", 4],
      ["(c)", "Explain FOUR factors that have influenced the distribution of population in the Caribbean. Include an example for EACH factor. (You may use different Caribbean countries.)", 12],
    ],
  },
  {
    parts: [
      ["(a)", "Table 2 shows the estimated contribution of each sector to the GDP of Grenada in 2005. Use the information in the table to construct a pie chart.", 4, { drawing: true, table: grenadaGDP }],
      ["(b)(i)", "Describe FOUR benefits of either the garment industry or the food processing industry.", 8],
      ["(b)(ii)", "Select either garment manufacturing or food processing and compare TWO characteristics of the activity in a named Caribbean country with that of either Hong Kong or Singapore.", 4],
      ["(c)", "Explain TWO challenges facing tourism in the Caribbean.", 8],
    ],
  },
  {
    prompt: "Study Table 3 which shows banana production and export for selected Caribbean countries, and answer the questions that follow.",
    table: bananaTrade,
    parts: [
      ["(a)(i)", "Identify the country which had the SECOND highest production, the second highest export and the second highest percentage exported.", 1],
      ["(a)(ii)", "How many more tonnes of banana were produced by Saint Lucia than Dominica?", 1],
      ["(a)(iii)", "Calculate the percentage of the banana production exported by St Vincent and the Grenadines.", 2],
      ["(b)(i)", "Describe TWO characteristics of small/peasant farming in the Caribbean.", 4],
      ["(b)(ii)", "Outline TWO reasons for the importance of agriculture in the Caribbean.", 4],
      ["(c)(i)", "Explain TWO factors influencing the location of either forestry or fishing or mining in a named Caribbean country.", 6],
      ["(c)(ii)", "Explain TWO challenges faced by the activity selected in (c) (i).", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Study Figure 5 which shows a map of the Eastern Caribbean islands. State the name of FOUR of the countries labelled P, Q, R, S and T.", 4, { figures: figures(id, "eastern-islands") }],
      ["(b)", "Describe FOUR impacts of ONE of the following hazards.\nEarthquakes\nHurricanes\nVolcanoes", 8],
      ["(c)", "Explain how TWO natural phenomena and TWO human activities can cause coral reef destruction.", 12],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a sketch map of a Caribbean territory, and on it shade and identify by name ONE area where marine pollution is a problem.", 4, { drawing: true }],
      ["(b)(i)", "For the area named in (a), outline TWO causes of pollution.", 4],
      ["(b)(ii)", "Define the term ‘air pollution’.", 2],
      ["(b)(iii)", "State TWO natural sources of air pollution.", 2],
      ["(c)", "For a named Caribbean territory, explain FOUR measures that have been implemented to reduce deforestation.", 12],
    ],
  },
  {
    prompt: "Study Table 4 which shows atmospheric composition of greenhouse gases, and answer the questions that follow.",
    table: greenhouseGases,
    parts: [
      ["(a)(i)", "Suggest ONE type of diagram that could be used to show the percentage of greenhouse gases.", 1],
      ["(a)(ii)", "Identify the gas that is the MOST abundant of the greenhouse gases.", 1],
      ["(a)(iii)", "Which gas is MOST effective in increasing global warming?", 1],
      ["(a)(iv)", "Which gas has the SECOND highest rate of increase per annum?", 1],
      ["(b)(i)", "For any ONE Caribbean country, state the name of ONE area where pollution is a problem and identify the type of pollution.", 2],
      ["(b)(ii)", "Describe THREE ways in which either water pollution or land pollution can be controlled.", 6],
      ["(c)", "Explain FOUR measures that can be used to reduce the emission of greenhouse gases.", 12],
    ],
  },
]);
