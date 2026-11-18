import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2009-mj-p3";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });

const channel = {
  caption: "Table 1. Depths of stream channel",
  rowHeading: "Point",
  columns: ["Distance to Bed from Level Line at 50 cm intervals across the Channel (in cm)"],
  rows: [["A", 75], ["B", 75], ["C", 65], ["D", 55], ["E", 40], ["F", 25], ["G", 15], ["H", 10], ["I", 0]],
};
const landUse = {
  caption: "Table 2. Percentage of land use by category in 1970 and 2008 in Area X",
  rowHeading: "Category",
  columns: ["1970", "2008"],
  rows: [["Built-up area", 15, 25], ["Citrus", 25, 5], ["Cocoa", 15, 10], ["Other Crops", 10, 20], ["Forest", 30, 30], ["Scrub", 5, 10]],
};
const publication = {
  caption: "Table 3. Details of publication",
  rowHeading: "Item",
  columns: ["Description"],
  rows: [
    ["Year", 1999],
    ["Place", "Walton-on-Thames"],
    ["Publisher", "Thomas Nelson and Sons Ltd."],
    ["Title", "Geography Fieldwork Projects"],
    ["Author", "Jennifer Frew"],
  ],
};

export default archivedWritten(id, 3, 2009, 105, 40, [
  {
    prompt: "A map of Port of Spain on a scale of 1:25 000 is provided for use in this question. Imagine that you are studying the changes in land use west of Cantaro in the Santa Cruz River valley.",
    figures: figures(id, "port-of-spain"),
    parts: [["", "In the frame of Figure 1 and using the map provided, draw a sketch map of the study area to show the following features:\n(a) Cantaro village\n(b) The 500 foot contour line (Label the land over 500 feet.)\n(c) The areas of cultivation\n(d) The unnamed streams\n(e) Saddle Road\n\nThe scale of the frame is 1:50 000. The four-figure grid references have been placed at the corners of the frame.", 4, drawing("cantaro-grid")]],
  },
  {
    prompt: "You want to study the discharge of a small tributary stream at different points along its length.",
    parts: [["", "Frame a research question or hypothesis to guide the field research.", 2]],
  },
  {
    parts: [
      ["(a)", "For the project in Question 2, describe THREE features about which you will collect data to determine the discharge.", 6],
      ["(b)", "Explain how you would collect the data you described in (a).", 5],
      ["(c)(i)", "Identify ONE problem, other than illness or bad weather, which you may encounter in conducting the research.", 1],
      ["(c)(ii)", "Explain how you would overcome that problem.", 2],
    ],
  },
  {
    prompt: "Table 1 shows the measurements across the channel from a level line to the bed of a small stream. The measurements were taken at intervals of 50 cm on a bend in the course. The width of the channel is 4 metres. Point A is on the outer bank and Point H on the inner bank.",
    table: channel,
    parts: [
      ["(a)", "On the grid provided in Figure 2, draw the shape of the channel using the data in Table 1. Use a scale of 1 cm to represent 25 cm on both axes.", 3, drawing("channel-grid")],
      ["(b)", "Study the information in Table 1 and the diagram you have drawn in Figure 2 and write a brief description of the characteristics of the channel on the bend.", 4],
      ["(c)", "Calculate the cross-sectional area of the channel.", 2],
    ],
  },
  {
    prompt: "Table 2 shows a summary of the land use in an area in 1970 and in 2008.",
    table: landUse,
    parts: [
      ["(a)", "Using the grid provided in Figure 3, draw a bar graph to illustrate the data in Table 2. Use a scale of 1 cm to represent 10%.", 3, drawing("land-use-grid")],
      ["(b)", "Identify another method by which you could illustrate the data.", 1],
      ["(c)", "Study the data in Table 2 and summarise and comment on the changes in land use.", 6],
    ],
  },
  {
    prompt: "In planning your research you consulted a text for which the details are given in Table 3.",
    table: publication,
    parts: [["", "Present the information in Table 3 as part of the bibliography for your report.", 1]],
  },
]);
