import { archivedSectionedPaper, figures } from "./geographyArchiveModels";

const id = "2011-mj-p2";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const goods = {
  caption: "Table 1. Contribution of various sectors to gross domestic product",
  rowHeading: "Country",
  columns: ["Primary (%)", "Secondary (%)", "Tertiary (%)"],
  rows: [["A", 3, 7, 90], ["B", 10, 15, 75], ["C", 5, 33, 62], ["D", 10, 26, 64], ["E", 1, 57, 42]],
};
const disasters = {
  caption: "Table 2. Natural disasters for 1947–80",
  rowHeading: "Continental Area",
  columns: ["Number of Lives Lost", "Number of Disaster Events", "Average Loss of Lives per Event"],
  rows: [
    ["North America", "11 531", 358, 32], ["Central America & the Caribbean", "50 676", 80, 633],
    ["South America", "49 265", 75, 657], ["Europe", "26 694", 119, 224], ["Africa", "25 540", 34, 751],
    ["Asia", "1 054 090", 437, 2421], ["Australasia", "4 502", 16, 282],
  ],
};
const forest = {
  caption: "Table 3. Area of deforestation in the Amazon, Brazil, 2004–2007",
  rowHeading: "Year",
  columns: ["Area Deforested (km²)"],
  rows: [[2004, "27 423"], [2005, "18 846"], [2006, "14 109"], [2007, "11 532"]],
};

export default archivedSectionedPaper(id, 2011, 100, [
  {
    prompt: "Study the map extract of Mango Creek, Belize (scale 1:50 000), and answer the following questions.",
    figures: figures("2011-mj-p3", "mango-creek"),
    parts: [
      ["(a)", "What is the six-figure grid reference of the MAJOR trigonometrical (trig) station, DOS 145, at the junction of the Southern Highway and the secondary road?", 2],
      ["(b)", "What is the distance (to the NEAREST 100 metres) along the secondary road from the trig station DOS 145 to the end of the road in the village of Mango Creek?", 2],
      ["(c)", "What is the compass bearing from the trig station DOS 145 to the crossroad junction of the secondary roads near to August Creek?", 2],
      ["(d)(i)", "Study the area on the map extract enclosed by Eastings 40 and 51 and Northings 25 and 27, as shown in the grid, and list THREE types of vegetation found in the area.", 3, { figures: figures(id, "vegetation-grid") }],
      ["(d)(ii)", "List TWO services available in the village of Independence.", 2],
      ["(e)", "Figure 1 is a profile (cross-section) along Northing 29, from Easting 47 to Easting 52. Using the map extract as a guide, label the features marked 1, 2 and 3 on the profile.", 3, drawing("mango-creek-profile")],
      ["(f)", "Identify FOUR drainage features of the area shown on the map.", 4],
      ["(g)", "Figure 2 shows a part of the map enclosed by Eastings 40 and 45, and Northings 31 and 34. On the figure, using the map as a guide,\n(i) shade ALL land over 20 metres above sea level\n(ii) label TWO different types of landforms (plateau, plain, valley, spur, ridge, mountain, canyon).", 4, drawing("belize-contours")],
      ["(h)(i)", "Study the areas of permanent cultivation and give a reason for the relationship between their position and settlement.", 2],
      ["(h)(ii)", "Give a reason for the relationship between the position of areas of permanent cultivation and drainage.", 2],
      ["(h)(iii)", "Give a reason for the relationship between the position of areas of permanent cultivation and relief.", 2],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a diagram of a composite volcanic cone and label FOUR features.", 4, { drawing: true }],
      ["(b)(i)", "Define EACH of the following terms.\na) Extrusive volcanic features [2 marks]\nb) Intrusive volcanic features [2 marks]", 4],
      ["(b)(ii)", "State FOUR changes which extrusive volcanic features may undergo over time.", 4],
      ["(c)(i)", "Explain how earthquakes occur at transform plate boundaries.", 4],
      ["(c)(ii)", "Account for the nature of the eruptions and the shape of volcanoes at the following plate boundaries.\na) Convergent\nb) Divergent", 8],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a diagram of the water cycle and label the FOUR MAIN processes.", 4, { drawing: true }],
      ["(b)(i)", "Identify TWO important features of a dendritic drainage pattern.", 2],
      ["(b)(ii)", "Identify TWO important features of a radial drainage pattern.", 2],
      ["(c)(i)", "Define EACH of the following.\na) Stalactites [2 marks]\nb) Swallow holes [2 marks]", 4],
      ["(c)(ii)", "Account for the formation of cockpits in the Caribbean.", 6],
      ["(d)", "Explain how wave-cut platforms are formed.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "(i) On the world map, shade an area where EACH of the following types of climate is experienced. [3 marks]\na) Equatorial\nb) Tropical continental\nc) Tropical marine\n(ii) For ONE of the climate types in (a) (i), insert the name of the area on the map. [1 mark]", 4, drawing("world-map")],
      ["(b)", "Choose TWO of the climate types in (a) (i) and for EACH, describe TWO characteristics of EACH of the following.\n(i) Temperature\n(ii) Rainfall", 8],
      ["(c)(i)", "State TWO reasons why a common period of 30 years of weather data is needed to determine the climate of places.", 4],
      ["(c)(ii)", "Explain why mountainous regions usually have lower temperatures and higher rainfall than the surrounding lowlands.", 8],
    ],
  },
  {
    prompt: "Study Figure 4 and answer the questions which follow.",
    figures: figures(id, "countries-p-q"),
    parts: [
      ["(a)(i)", "Using evidence from the map, list TWO features which may be associated with low population densities in Country P.", 2],
      ["(a)(ii) a)", "Name the country labelled P.", 1],
      ["(a)(ii) b)", "Name the country labelled Q.", 1],
      ["(b)", "With reference to population, define the terms\n(i) natural increase\n(ii) migration.", 4],
      ["(c)", "Describe the pattern of international migration for a named Caribbean country over the last twenty years.", 4],
      ["(d)", "Explain how TWO factors influenced rural-to-urban migration.", 4],
      ["(e)", "Explain how FOUR factors have influenced high population densities in a named Caribbean country.", 8],
    ],
  },
  {
    prompt: "Study Table 1 and answer the questions below.",
    table: goods,
    parts: [
      ["(a)(i)", "For which country did primary activities make the SMALLEST contribution to GDP?", 1],
      ["(a)(ii)", "For which country did secondary activities account for approximately a third of GDP?", 1],
      ["(a)(iii)", "For which countries did secondary and tertiary activities account for 90% of GDP?", 1],
      ["(a)(iv)", "How are the contributions of primary, secondary and tertiary activities similar for all of the countries shown EXCEPT Country E?", 1],
      ["(b)(i)", "Define the term ‘secondary industry’ and give ONE example of a secondary industry that you have studied.", 3],
      ["(b)(ii)", "State THREE ways by which countries can benefit from the development of secondary industries.", 3],
      ["(b)(iii)", "State TWO economic factors which may influence the location of a secondary economic activity.", 2],
      ["(c)", "Explain THREE policies that government may use to promote sustainable development in primary economic activities.", 6],
      ["(d)", "Explain THREE challenges faced by ONE of the following activities in a Caribbean country.\nFishing\nForestry\nMining", 6],
    ],
  },
  {
    prompt: "The statements below highlight the attempts by the World Trade Organization (WTO) to regularize trade between nations. The world trade in bananas brought into focus the varying views held on trade by four groups: South and Central American banana producers, the European Union, the WTO and the Caribbean banana producers.",
    source: "A. All countries should comply with international trade regulations regardless of historical ties.\n\nB. We can only produce on a small scale because of our size. Our economies will be devastated if we are forced to compete with the large producers.\n\nC. Our cheaper bananas should be given a chance. It is discriminatory to exclude us by imposing high tariffs.\n\nD. We will comply with international regulations and increase the tariffs on bananas from our former colonies.",
    parts: [
      ["(a)", "State which interested party would be MOST LIKELY to make EACH of the statements A, B, C and D above.", 4],
      ["(b)(i)", "Describe FIVE characteristics of commercial arable farming in a Caribbean country you have studied.", 5],
      ["(b)(ii)", "For the country you named in (b) (i), state THREE problems, other than marketing, which affect commercial arable farming.", 3],
      ["(c)", "Explain BRIEFLY one reason why the average age of farm workers has increased over the years.", 2],
      ["(d)", "Outline THREE reasons why peasant (small) farmers tend to grow a variety of crops.", 6],
      ["(e)", "Explain TWO ways in which climate influences wheat production on the prairies of Canada.", 4],
    ],
  },
  {
    prompt: "Study Table 2 which shows natural disasters for the period 1947–80, and answer the questions which follow.\nSource: Hewitt, K., Regions of Risk (1997), in Nagle, G., 1998, p. 7.",
    table: disasters,
    parts: [
      ["(a)(i)", "Which area had FEWEST deaths from disasters?", 1],
      ["(a)(ii)", "What was the combined TOTAL loss of lives for Africa and Asia during the period?", 1],
      ["(a)(iii)", "What is the difference in the relationship between number of disasters and number of lives lost in Europe and Africa?", 2],
      ["(b)(i)", "Define the term ‘natural hazard’.", 2],
      ["(b)(ii)", "Describe THREE impacts of any ONE of the following hazards.\nEarthquakes\nVolcanoes\nHurricanes", 6],
      ["(c)(i)", "Explain how TWO activities of a named natural disaster organization in a Caribbean country have contributed to improved response to hazards.", 6],
      ["(c)(ii)", "Explain how THREE activities of the Caribbean Disaster Emergency Management Agency (CDEMA) (formerly known as CDERA) can reduce the impact of natural hazards in the Caribbean.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Study Figure 5 which shows some sites of earthquake activity and volcanic activity in the Caribbean. Name FOUR of the countries lettered A, B, C, D, E and F.", 4, { figures: figures(id, "caribbean-hazards") }],
      ["(b)(i)", "Define EACH of the following terms.\na) Water pollution [2 marks]\nb) Deforestation [2 marks]", 4],
      ["(b)(ii) a)", "Identify TWO ways by which the atmosphere can be polluted.", 2],
      ["(b)(ii) b)", "Identify ONE source for EACH of the ways identified in (ii) a) above.", 2],
      ["(c)(i)", "Explain THREE causes of global warming.", 6],
      ["(c)(ii)", "Discuss TWO likely consequences of global warming on the marine environment of the Caribbean.", 6],
    ],
  },
  {
    prompt: "Table 3 shows the area deforested in the Amazon for the years 2004–2007.\nSource: Mongabay, 23 October 2008.",
    table: forest,
    parts: [
      ["(a)", "On the grid provided, construct a bar graph to illustrate the above data. Include a title.", 4, drawing("deforestation-grid")],
      ["(b)", "Describe TWO forms of pollution produced through agriculture OR agro-industries.", 4],
      ["(c)", "State FOUR specific measures used by individuals in the Caribbean to reduce land pollution.", 4],
      ["(d)", "Explain how FOUR measures reduce the impact of deforestation, giving specific examples from Caribbean countries.", 12],
    ],
  },
]);
