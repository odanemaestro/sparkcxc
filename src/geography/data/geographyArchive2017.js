import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2017-mj-p2";
const sediment = {
  caption: "Table 1. Sediment deposited into River X during 2005–2010",
  rowHeading: "Year",
  columns: ["Amount of Sediment (metric tonnes per year)"],
  rows: [[2005, 300], [2006, 450], [2007, 225], [2008, 700], [2009, 900], [2010, 575]],
};
const drainage = {
  caption: "Table 2. Drainage pattern",
  rowHeading: "Drainage Pattern",
  columns: ["Shape", "Rock Structure"],
  rows: [["Radial", "Circular, dome-shaped", "Volcanic cone"], ["Trellis", "", ""], ["Dendritic", "", ""]],
};
const greenhouse = {
  caption: "Table 3. Human activity and greenhouse gases",
  rowHeading: "Human Activity",
  columns: ["Greenhouse Gas"],
  rows: [["Burning of fossil fuels, deforestation", ""], ["", "Nitrogen oxide"], ["Livestock and rice production", ""], ["", "Chlorofluorocarbons (CFCs)"]],
};

export default archivedWritten(id, 2, 2017, 150, 100, [
  {
    prompt: "Study the map extract of Port Antonio, on a scale of 1:50 000, and answer the following questions.",
    figures: figures(id, "port-antonio-2017"),
    parts: [
      ["(a)", "State the six figure grid reference of the school at Spring Bank (near Port Antonio).", 2],
      ["(b)", "Identify a river landform in grid square 0369.", 1],
      ["(c)", "What is the compass direction of the church at Spring Bank from the transmitter at Boundbrook?", 1],
      ["(d)", "Determine the bearing of the church at Spring Bank from the post office near St Margaret’s Bay.", 2],
      ["(e)", "Measure the straight line distance from the church at Spring Bank to the point where the Back Rio Grande joins the Rio Grande.", 2],
      ["(f)", "Calculate the gradient from the 560 m circular contour line at Samba Hill near Northing 64, to the 40 m contour line at the point where the Back Rio Grande joins the Rio Grande. Show your calculation.", 4],
      ["(g)", "State FOUR features of the drainage south of Northing 62.", 4],
      ["(h)", "Describe the distribution of settlements in the area between Eastings 01 and 09, and Northings 67 and 73.", 3],
      ["(i)", "Outline THREE reasons for the distribution of banana plantations and mixed or scattered cultivation. Use evidence from the map to support your answer.", 6],
    ],
  },
  {
    prompt: "Study Table 1 which shows the average annual amount of sediment deposited into River X during the period 2005–2010, and answer the questions that follow.",
    table: sediment,
    parts: [
      ["(a)", "On the grid provided in Figure 1,\n(i) draw a bar graph to illustrate the data presented in Table 1\n(ii) provide a title for the graph\n(iii) label each axis correctly.", 5, { drawing: true, background: figures(id, "sediment-grid")[0] }],
      ["(b)", "Describe TWO ways by which a river transports its load.", 4],
      ["(c)", "Complete Table 2 by describing the shape and rock structure of the drainage patterns indicated.", 4, { table: drainage }],
      ["(d)", "Explain how a flood plain is formed. Your answer may be a set of well-labelled diagrams.", 6, { drawing: true }],
      ["(e)", "For a named Caribbean country, assess the value of any TWO measures that have been used by national agencies to reduce the impact of flooding.", 6],
    ],
  },
  {
    prompt: "Figure 2 shows a population pyramid of Barbados for 2014. Study the pyramid, and answer the questions that follow.",
    figures: figures(id, "barbados-population"),
    parts: [
      ["(a)(i)", "What is the age range for each group represented on the population pyramid?", 1],
      ["(a)(ii)", "Which age group had the LARGEST number of persons?", 1],
      ["(a)(iii)", "How many females were between the age group 5–9?", 1],
      ["(a)(iv)", "How many males were between the age group 10–19?", 1],
      ["(a)(v)", "Identify ONE particular age group which had twice as many females as males.", 1],
      ["(b)(i)", "Define EACH of the following terms.\nUrbanization\nUrban sprawl", 2],
      ["(b)(ii)", "Describe THREE problems caused by population growth in urban areas of the Caribbean.", 6],
      ["(c)(i)", "Explain how any THREE of the following factors have influenced the development of the tourism industry in the Caribbean.\nLocation\nClimate\nPhysical features\nCulture", 6],
      ["(c)(ii)", "Explain TWO measures that have been implemented to reduce the impact of tourism development on the coastal environment in the Caribbean.", 6],
    ],
  },
  {
    parts: [
      ["(a)", "(i) Draw a sketch map of a named Caribbean country. [3 marks]\n(ii) On the sketch map drawn in (a) (i), indicate the location of a named industrial area. [2 marks]", 5, { drawing: true }],
      ["(b)(i)", "Define the following terms.\nGlobal warming\nGreenhouse effect", 4],
      ["(b)(ii)", "Complete Table 3 by stating the human activity that results in the production of the greenhouse gas or the greenhouse gas produced by the activity indicated.", 4, { table: greenhouse }],
      ["(c)(i)", "Identify ONE mitigation measure that has been used in both the Caribbean and the United Kingdom OR the USA to reduce climate change.", 1],
      ["(c)(ii)", "For the measure identified in (c) (i), compare its effectiveness, in the Caribbean, with EITHER that in the United Kingdom OR the USA.", 4],
      ["(c)(iii)", "For a named Caribbean territory, explain TWO ways in which the manufacturing industry contributes to environmental degradation.", 7],
    ],
  },
]);
