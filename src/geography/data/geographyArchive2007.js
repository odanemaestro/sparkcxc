import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2007-mj-p3";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const buildings = {
  caption: "Table 1. Physical conditions of the buildings in a small town",
  rowHeading: "Number of Buildings",
  columns: ["Physical Condition"],
  rows: [[80, "Excellent"], [50, "Satisfactory"], [40, "Need specific repairs"], [20, "Need reinforcement urgently"], [10, "Need to be demolished"], [200, "Total"]],
};
const pebbles = {
  caption: "Table 2. Mean values for characteristics of pebbles",
  rowHeading: "Site Number",
  columns: ["Mean Length of Pebble (cm)", "Scale of Roundness (1 = most angular, 6 = most rounded)"],
  rows: [[1, 12, 1], [2, 12, 1], [3, 10, 2], [4, 8, 3], [5, 5, 3], [6, 3, 4], [7, 1, 6]],
};

export default archivedWritten(id, 3, 2007, 105, 40, [
  {
    prompt: "A map extract of Basseterre, St Christopher (St Kitts) is provided for this question. The extract is on a scale of 1:25 000. It is recommended that you spend no more than 15 minutes on Parts (a) and (b).",
    figures: figures(id, "basseterre-2007"),
    parts: [
      ["(a)", "(i) With the aid of the map in the margin of the extract provided, draw an outline map of the islands of St Christopher and Nevis, at the same scale as the map in the margin, in the frame provided in Figure 1. [1 mark]\n(ii) On the sketch map that you have drawn in Figure 1, shade St. George, Basseterre. [1 mark]", 2, drawing("st-kitts-nevis-frame")],
      ["(b)", "Use the grid provided in Figure 2 to draw a sketch map at the reduced scale of 1:50 000. On the sketch map, show the coastline, the position of Basseterre, the main roads, and the upland areas over 300 feet (outline the latter roughly and label). The grid is bounded by Eastings 21 and 26 and Northings 10 and 15.", 3, drawing("basseterre-sketch-grid")],
    ],
  },
  {
    prompt: "Imagine you are undertaking a survey of the state of the buildings in a small town in the Caribbean to determine their probable resistance to damage from natural hazards.",
    parts: [["", "Frame a research question for this project to guide the collection of data.", 2]],
  },
  {
    parts: [
      ["(a)", "Describe THREE important characteristics of the buildings which you would observe and record in the field when conducting the survey.", 7],
      ["(b)", "Describe how and when you would conduct the fieldwork for the survey outlined in Question 2.", 7],
      ["(c)", "Identify an area of weakness in qualitative surveys of this type.", 1],
    ],
  },
  {
    prompt: "Table 1 shows the summary of the physical conditions of 200 buildings in a small town.",
    table: buildings,
    parts: [["", "Draw a divided circle (pie chart) to present the data in Table 1.", 3, { drawing: true }]],
  },
  {
    prompt: "Table 2 shows the average (mean) values for the characteristics of pebbles on a beach transect between a cliff and the low tide water mark at seven points (at intervals of 30 cm). Site 1 is 30 cm from the base of the cliff.",
    table: pebbles,
    parts: [
      ["(a)", "Draw a bar graph to show the values for the mean pebble length on the grid in Figure 3. Use a vertical scale of 1 mm to represent 1 cm.", 2, drawing("pebble-grid")],
      ["(b)", "Study Table 2 and write a summary comparing the changes in the two characteristics along the transect from the cliff.", 6],
      ["(c)", "Comment on the significance of the changes.", 6],
    ],
  },
  {
    prompt: "For a research project you used a book, Geography for CXC, by Wilma Bailey and Patricia Pemberton which was published in 1983 by Thomas Nelson and Sons Ltd.",
    parts: [["", "Present the information as part of a bibliography for the report.", 1]],
  },
]);
