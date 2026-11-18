import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2006-mj-p3";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const trade = {
  caption: "Table 1. Overseas trade by economic area, 1994",
  rowHeading: "Economic Area",
  columns: ["Exports (%)", "Imports (%)"],
  rows: [
    ["United States of America (USA)", 47, 48],
    ["Caribbean Community (CARICOM)", 14, 5],
    ["European Economic Community (EEC)", 6, 14],
    ["European Free Trade Association (EFTA)", 0, 2],
    ["Latin America Free Trade Area (LAFTA)", 7, 10],
    ["Central America Common Market", 1, 1],
    ["Rest of the World", 25, 20],
  ],
};
const publications = {
  caption: "Table 2. Details of publications",
  rowHeading: "Details of Publication",
  columns: ["Text 1", "Text 2"],
  rows: [
    ["Year", 1969, 1995],
    ["Place", "Essex, England", "London"],
    ["Edition", "1st Edition", "2nd Edition"],
    ["Publisher", "Longman (Caribbean)", "Macmillan Education Ltd."],
    ["Title", "Introducing Caribbean Weather Maps", "Modern Caribbean Geography"],
    ["Author", "John Macpherson", "John Niles"],
  ],
};

export default archivedWritten(id, 3, 2006, 105, 40, [
  {
    prompt: "A map of Nevis on a scale of 1:25 000 is provided for this question. Imagine that you are studying the changes in settlement along the road from Scarborough to Camps in the parish of St James Windward in the north of Nevis. With reference to the map of Nevis provided, draw TWO sketch maps as indicated below.",
    figures: figures(id, "nevis-2006-map"),
    parts: [
      ["(a)", "In the frame of Figure 1 (a),\n(i) make a sketch of Nevis\n(ii) show the position of the study area in relation to the entire island of Nevis.", 2, drawing("nevis-frame")],
      ["(b)", "In the frame of Figure 1 (b), draw a sketch map to show the LOCATION of the study area and the position of the buildings along the secondary road from Scarborough to Camps. Use the same scale as on the map provided. The eastings and northing references have been placed at the corners of the frames.", 4, drawing("nevis-settlement-grid")],
    ],
  },
  {
    prompt: "Two scenarios, A and B, each having the potential for field-based geographical research are presented below.\n\nA. The risk of flooding poses a serious threat to the fishing village of about 500 people because of the destruction of mangrove trees which protected the coast. There is a proposal to relocate the village.\n\nB. There is a small farming village of about 300 people near an airport. There is a plan to expand the airport so there is a proposal to relocate the village.",
    parts: [["", "Imagine that you are a member of the team which is responsible for finding a new site for ONE of these villages. What information would you collect in the field to guide your search for a suitable site? State your response as a question which can be investigated in the field in a week.", 2]],
  },
  {
    parts: [
      ["(a)", "With reference to Question 2, describe how you would conduct the research giving details of\nmethods of enquiry\ndata collection\nequipment/resources.\nIn your answer, include examples (theoretical or hypothetical) of the results that you could obtain from the field.", 7],
      ["(b)", "In relation to your methods of enquiry in 3 (a),\n(i) identify TWO problems you may encounter in conducting your research\n(ii) state how you would overcome EACH problem in (b) (i) above.", 4],
    ],
  },
  {
    prompt: "Study Figure 2 which shows a photograph of part of a coast.",
    figures: figures(id, "coast-photo"),
    parts: [
      ["(a)", "Draw a sketch of the main features and label FIVE of them.", 7, { drawing: true }],
      ["(b)", "Write a BRIEF description of the landscape shown in Figure 2. In your response, include reference to the work of the waves.", 3],
    ],
  },
  {
    prompt: "Selected data regarding the overseas trade, by economic area, of Trinidad and Tobago in 1994 is shown in Table 1.\nSource: Central Statistics Office, Trinidad and Tobago.",
    table: trade,
    parts: [
      ["(a)", "Write a brief summary of the information in the table.", 5],
      ["(b)", "With reference to the data presented in Table 1, comment on the importance of the trade pattern in 1994.", 4],
    ],
  },
  {
    prompt: "In a research project, two texts were used. The details of these publications are presented in Table 2.",
    table: publications,
    parts: [["", "Present the information in Table 2 as part of a bibliography for the report.", 2]],
  },
]);
