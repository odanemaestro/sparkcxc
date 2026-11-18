import { archivedSectionedPaper, figures } from "./geographyArchiveModels";

const id = "2009-mj-p2";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const visitors = {
  caption: "Table 1. Tourist arrivals for selected Caribbean countries in 2006",
  rowHeading: "Country",
  columns: ["Number of Tourists (nearest hundred)", "Percentage of Arrivals", "Angle of Sector (nearest degree)"],
  rows: [
    ["Barbados (B)", "562 600", 43.3, 156], ["Dominica (D)", "85 900", 6.6, 23],
    ["Grenada (G)", "118 500", 9.1, 33], ["St Lucia (L)", "302 500", 23.3, ""],
    ["Trinidad and Tobago (T)", "230 800", 17.7, ""], ["Total", "1 300 300", "", ""],
  ],
};
const agriculture = {
  caption: "Table 2. Contribution of agriculture to Gross Domestic Product (GDP) of Barbados in Bds $ million",
  rowHeading: "Year",
  columns: ["2002", "2003", "2004", "2005"],
  rows: [
    ["Sugar", "24.0", 38.9, 47.3, 58.8], ["Food crops", 76.1, 101.4, "61.0", 64.4],
    ["Livestock", 33.7, "34.0", 39.2, 43.8], ["Other cultivation", 0.2, 0.3, 0.2, 0.2],
    ["Fisheries", "19.0", 18.8, 16.6, 17.4], ["Total", "153.0", 193.4, 164.3, ""],
  ],
};

export default archivedSectionedPaper(id, 2009, 100, [
  {
    prompt: "Study the map extract (Trinidad Sheet 13, 1:25 000) and answer the following questions.",
    figures: figures("2009-mj-p3", "port-of-spain"),
    parts: [
      ["(a)", "Determine the length of the first class road around Queen’s Park Savannah. Write your answer in metric units.", 2],
      ["(b)", "State the six-figure grid reference of the trigonometrical station (trig station) in the Queen’s Park Savannah.", 2],
      ["(c)", "Measure the bearing of the trig station in the Queen’s Park Savannah from St Ann’s Peak in square 6682.", 2],
      ["(d)", "State the compass direction of the trig station at Fort George from the one at Cumberland Hill. Those points are between Northings 81 and 83 and Eastings 59 and 60.", 1],
      ["(e)(i)", "What man-made feature is located where Northing 83 crosses the Maraval River?", 1],
      ["(e)(ii)", "What landform dominates the coast of Saint Cité Bay?", 1],
      ["(f)", "Describe a major relief feature found in square 6484.", 4],
      ["(g)", "Figure 1 is part of a profile (or section) along Northing 82 from Easting 60 to 63. Using the map extract and the information in Figure 1, complete the profile and insert and label the points where the Maraval River and the Ward Boundary cross the profile.", 5, drawing("maraval-profile")],
      ["(h)", "Describe land use (other than settlement and communication) in the area bounded by Eastings 65 and 70, and Northings 80 and 87.", 4, { figures: figures(id, "land-use-area") }],
      ["(i)", "Using evidence from the map, give THREE reasons for the land-use pattern (other than settlement and communication) in the area identified in (h) above.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a diagram to show the main features of a subduction zone.", 4, { drawing: true }],
      ["(b)(i)", "Distinguish between ‘extrusive’ and ‘intrusive’ volcanic features, and give ONE example of EACH.", 4],
      ["(b)(ii)", "Describe TWO ways by which intrusive volcanic landforms may influence the landscape over time.", 4],
      ["(c)(i)", "Explain how earthquakes are formed at transform plate boundaries.", 4],
      ["(c)(ii)", "Using an example, account for the formation of fold mountains where continental plates collide.", 4],
      ["(c)(iii)", "Explain how lava plateaux are formed.", 4],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a labelled diagram to show the main features of a dendritic drainage pattern.", 4, { drawing: true }],
      ["(b)(i)", "Outline the sequence of processes occurring in the water cycle.", 4],
      ["(b)(ii)", "Describe TWO characteristics of limestone which make it susceptible to chemical weathering.", 4],
      ["(c)(i)", "Explain how pillars are formed in limestone. Include the main stages in your response.", 6],
      ["(c)(ii)", "Explain how swallow holes or sink holes are formed in limestone. Include the main stages in your response.", 3],
      ["(c)(iii)", "Explain how caves are formed in limestone. Include the main stages in your response.", 3],
    ],
  },
  {
    prompt: "Study the temperature-height graph in Figure 2 which shows changes in the temperature up a 2000 m high mountain, and answer questions (a) (i)–(a) (iv) below.",
    figures: figures(id, "mountain-temperature"),
    parts: [
      ["(a)(i)", "At which height does condensation begin?", 1],
      ["(a)(ii)", "What is the height of the top of the cloud?", 1],
      ["(a)(iii)", "What is the temperature at condensation level?", 1],
      ["(a)(iv)", "What is the temperature at the top of the mountain?", 1],
      ["(b)(i)", "State TWO characteristics of the temperature and TWO characteristics of the rainfall of equatorial regions.", 4],
      ["(b)(ii)", "List FOUR characteristics of the trees of tropical continental regions.", 4],
      ["(c)(i)", "Account for the development of relief rainfall in the Caribbean.", 6],
      ["(c)(ii)", "Explain why air flows downhill at night in mountainous areas.", 3],
      ["(c)(iii)", "Explain why winds at the same elevation are warmer on the leeward side than on the windward side.", 3],
    ],
  },
  {
    prompt: "Study Figures 3 (a) and 3 (b) which show the age and sex composition of a Caribbean country for the year 2000 and projected for 2025, and answer the questions below.\nSource: U.S. Census Bureau, International Data Base.",
    figures: figures(id, "population-2000", "population-2025"),
    parts: [
      ["(a)(i)", "In 2025, which sex will have the LARGER population in the 65 and over age group?", 1],
      ["(a)(ii)", "Between 2000 and 2025, what change is projected for the TOTAL population of the 15–44 age group?", 1],
      ["(a)(iii)", "Between 2000 and 2025, how will the TOTAL population for the 0–14 age group change?", 1],
      ["(a)(iv)", "Which sex had the LARGER population in the under ten age group in 2000?", 1],
      ["(b)(i)", "Define the following.\na) Population density [1 mark]\nb) Population distribution [1 mark]", 2],
      ["(b)(ii)", "State SIX consequences which migration from the Caribbean may have on the region.", 6],
      ["(c)(i)", "Explain how the relief of an area may lead to low population densities.", 3],
      ["(c)(ii)", "Explain how ANY TWO of the following factors may influence population distribution.\nPresence of minerals\nManufacturing\nSoils", 6],
      ["(d)", "Account for the population growth of any ONE capital city in the Caribbean.", 3],
    ],
  },
  {
    prompt: "Table 1 is incomplete and presents data for tourist arrivals (to the nearest hundred) for selected Caribbean countries in 2006.",
    table: visitors,
    parts: [
      ["(a)(i)", "Complete Table 1 to show the angles, to the nearest degree, for St Lucia and Trinidad and Tobago.", 2],
      ["(a)(ii)", "Complete the pie chart to show tourist arrivals for Barbados, St Lucia, and Trinidad and Tobago.", 2, drawing("tourist-arrivals-circle")],
      ["(b)(i)", "Define and give ONE example of EACH of the following.\na) Primary industry [2 marks]\nb) Tertiary industry [2 marks]", 4],
      ["(b)(ii)", "Outline TWO strategies used to encourage visitor arrivals in the tourist industry (other than marketing sea, sand and sun).", 4],
      ["(c)(i)", "Explain why Caribbean governments are giving increasing attention to the development of tertiary activities. Include TWO reasons in your response.", 4],
      ["(c)(ii)", "Suggest TWO causes for the challenges faced in the Caribbean by EITHER the garment industry OR food processing industry.", 2],
      ["(c)(iii)", "Suggest THREE reasons why the CARICOM Single Market and Economy (CSME) can help the Caribbean countries to address some of the challenges facing development in the region.", 6],
    ],
  },
  {
    prompt: "Study Table 2 which shows the contribution of agriculture to the Gross Domestic Product (GDP) of Barbados, in Bds $ million, and answer the questions below.",
    table: agriculture,
    parts: [
      ["(a)(i)", "In which year was the contribution of sugar LESS than that of livestock?", 1],
      ["(a)(ii)", "Calculate the TOTAL contribution of agriculture to GDP for 2005.", 1],
      ["(a)(iii)", "What is the trend in the contribution of sugar to GDP over the period 2002–2005?", 1],
      ["(a)(iv)", "Suggest ONE type of chart that could be used to illustrate the data for 2005.", 1],
      ["(b)(i)", "State FOUR ways in which agriculture is important to the Caribbean region.", 4],
      ["(b)(ii)", "State FOUR significant characteristics of large scale commercial arable farming in the Caribbean.", 4],
      ["(c)", "Account for the similarities AND differences between large scale commercial arable farming in the Caribbean and wheat farming in the Canadian Prairies using the following headings.\nGrowing season [4 marks]\nMarketing [8 marks]", 12],
    ],
  },
  {
    prompt: "Study Figures 4 (a) and 4 (b) which show Plymouth, Montserrat before and after a volcanic eruption.\nSource: Ottley and Gentles, Geography for CSEC, Pearson Education Limited, 2006, p. 217.",
    figures: figures(id, "plymouth-before", "plymouth-after"),
    parts: [
      ["(a)", "List FOUR changes which have taken place.", 4],
      ["(b)(i)", "Define the term ‘natural hazard’.", 2],
      ["(b)(ii)", "Outline THREE ways by which natural hazards can affect economic development of Caribbean countries.", 6],
      ["(c)", "You have been asked to prepare a household disaster plan for your family. List SIX items in your plan and suggest a reason why EACH is important.", 12],
    ],
  },
  {
    parts: [
      ["(a)", "Draw a sketch map of a named Caribbean country to show an area where marine pollution is a problem and indicate the source of pollution.", 4, { drawing: true }],
      ["(b)(i)", "Define ‘global warming’.", 2],
      ["(b)(ii)", "Define ‘greenhouse gases’.", 2],
      ["(b)(iii)", "Define ‘pollution’.", 2],
      ["(b)(iv)", "Define ‘air pollution’.", 2],
      ["(c)(i)", "Explain how TWO marine-based activities cause coral reef degradation.", 6],
      ["(c)(ii)", "Explain how global warming is likely to impact the coastal environment in the Caribbean. Include TWO ways in your response.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "Use the map of World Time Zones in Figure 5. An international telephone conference on marine pollution is to be hosted by the Law of the Sea Committee based in Jamaica. State the difference in hours (ahead or behind) between Jamaica and those cities shown on the map in Figure 5: New Orleans, London, Panama City, and Auckland.\nSource: Modified from R. B. Burnett, General Geography in Diagrams, 3rd edition, 1990, p. 9.", 4, { figures: figures(id, "world-time-zones") }],
      ["(b)", "Describe TWO sources of marine pollution in the Caribbean.", 4],
      ["(c)", "Describe TWO measures that have been introduced to reduce the effects of marine pollution in the Caribbean.", 4],
      ["(d)", "Explain how any TWO measures can help to reduce deforestation in a named Caribbean territory.", 6],
      ["(e)", "Explain how any TWO measures can help to reduce coral reef destruction in a named Caribbean territory.", 6],
    ],
  },
]);
