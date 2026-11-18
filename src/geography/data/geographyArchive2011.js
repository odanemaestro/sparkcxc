import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2011-mj-p3";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });

const nuisance = {
  caption: "Table 1. Results of nuisance survey of 100 residents within radius of 300 metres of Stadium X",
  rowHeading: "Item",
  columns: ["No Nuisance", "Mild Nuisance", "Great Nuisance"],
  rows: [
    ["Overall view", 50, 30, 20],
    ["Traffic", 0, 40, 60],
    ["Parking", 15, 35, 50],
    ["Litter", 30, 30, 40],
    ["Noise", 50, 40, 10],
    ["Vandalism", 60, 30, 10],
  ],
};
const waste = {
  caption: "Table 2. Number of medium-sized bags of waste collected by type of waste",
  rowHeading: "Type of Waste",
  columns: ["Day 1 · Normal Monday", "Day 2 · One Day After Public Holiday"],
  rows: [["Plastics", 20, 40], ["Glass", 2, 5], ["Paper", 3, 10], ["Other Garbage", 5, 15]],
};

export default archivedWritten(id, 3, 2011, 105, 40, [
  {
    prompt: "A map extract of Mango Creek, Belize, at a scale of 1:50 000 is provided for use in Questions 1 and 2. Use the grid provided in Figure 1 to draw a sketch map showing the site of Placentia Village. The grid is at the same scale as the map and is bordered by Eastings 52 and 56 and Northings 25 and 33. Part of the coastline has been inserted.",
    figures: figures(id, "mango-creek"),
    parts: [["", "On the grid,\n(i) complete the coastline\n(ii) label Placentia Lagoon\n(iii) insert Placentia Village and Seine Bright Village\n(iv) insert the areas of swamp and broken or light forest.", 4, drawing("placentia-grid")]],
  },
  {
    prompt: "You are doing research on the awareness of climate change and the impact of rising sea level on coastal villages in the area shown on the map provided.",
    figures: figures(id, "mango-creek"),
    parts: [["", "Frame a research question or statement which will guide the collection of data in the field.", 2]],
  },
  {
    parts: [
      ["(a)", "List SIX types of data which you would record in the field.", 6],
      ["(b)", "Describe how and when you would conduct the research and record the data.", 5],
      ["(c)(i)", "Identify a problem (other than the weather, illness and injury) that you may encounter in conducting the research in 3 (b) above.", 1],
      ["(c)(ii)", "State how you would overcome the problem that you identified in 3 (c) (i) above.", 2],
    ],
  },
  {
    prompt: "Table 1 shows the results of six questions in a survey of 100 people who live within a radius of 300 metres from a cricket stadium. The survey was done to determine whether the stadium is causing a nuisance to residents in the area when important cricket matches are played.",
    table: nuisance,
    parts: [
      ["(a)", "Using the graph paper provided in Figure 2, construct parallel bar graphs to show the results for “Parking”. The axes are already labelled.", 3, drawing("parking-grid")],
      ["(b)", "Using the data in Table 1, prepare a report on the results of the survey.", 6],
    ],
  },
  {
    prompt: "Table 2 shows the number of bags of waste collected from a beach on two days.",
    table: waste,
    parts: [
      ["(a)", "Draw a pie chart to illustrate the data for Day 1.", 3, { drawing: true }],
      ["(b)", "Name ONE method other than ‘pie chart’ you could have used to illustrate the data.", 1],
      ["(c)", "Write a BRIEF summary of the data presented in Table 2 and comment on the nature of the waste.", 6],
    ],
  },
  {
    prompt: "You have used a text by Jeanette Ottley and Marolyn Gentles in your research. The book was published by Pearson Education Limited of Harlow, England in 2006 and is called Longman Geography for CSEC.",
    parts: [["", "Present this information in an acceptable format as part of the bibliography for your report.", 1]],
  },
]);
