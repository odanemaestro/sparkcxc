import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2008-mj-p3";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });

const traffic = {
  caption: "Table 1. Flow of vehicles during 15 minutes at selected hours",
  rowHeading: "Time",
  columns: ["Number of Vehicles Leaving", "Number of Vehicles Entering"],
  rows: [["6 a.m.", 50, 25], ["9 a.m.", 95, 175], ["Noon", 130, 125], ["3 p.m.", 40, 100], ["6 p.m.", 150, 60]],
};
const landslides = {
  caption: "Table 2. Main causes of landslides in a Caribbean island in 2000 and 2005",
  rowHeading: "Main Causes",
  columns: ["2000", "2005"],
  rows: [["Earthquakes", 5, 7], ["Heavy rainfall", 19, 10], ["Deforestation", 11, 17], ["Building on steep slopes", 25, 18]],
};

export default archivedWritten(id, 3, 2008, 105, 40, [
  {
    prompt: "A map extract of Port Antonio, Jamaica, at a scale of 1:50 000 is provided for Questions 1 and 2. Use the grid provided in Figure 1 to draw a sketch map showing Port Antonio at the same scale. The area is bordered by Eastings 06 and 11 and Northings 66 and 71.",
    figures: figures(id, "port-antonio"),
    parts: [["", "On the sketch map, insert\n(i) the coastline\n(ii) the Class B road\n(iii) the East Town River\n(iv) the West Town River and\n(v) shade the built-up area of Port Antonio.", 4, drawing("port-antonio-grid")]],
  },
  {
    prompt: "Imagine you are undertaking a field survey of the traffic flow at the road junction south of Port Antonio at 085678.",
    figures: figures(id, "port-antonio"),
    parts: [["", "Frame a research question or hypothesis for this project to guide the collection of data.", 2]],
  },
  {
    parts: [
      ["(a)", "Describe THREE important characteristics of the traffic flow which you would record when conducting the survey indicated in Question 2.", 6],
      ["(b)", "Describe how you would conduct the survey indicated in Question 2. Be sure to state carefully the time(s) of the day for conducting the survey.", 5],
      ["(c)(i)", "Identify a problem (not including the weather and illness) that you may encounter in conducting the survey in 3 (b) above.", 1],
      ["(c)(ii)", "State how you would overcome the problem that you identified in 3 (c) (i) above.", 2],
    ],
  },
  {
    prompt: "Table 1 shows the flow of vehicles leaving and entering a small town at a certain time.",
    table: traffic,
    parts: [
      ["(a)", "Draw a line graph to present this data using the axes provided in Figure 2.", 3, drawing("traffic-grid")],
      ["(b)", "Suggest THREE reasons for the pattern of the traffic entering and leaving the town.", 6],
    ],
  },
  {
    prompt: "Study Table 2 which shows the reported causes of landslides for a Caribbean island in 2000 and 2005 and answer the questions that follow.",
    table: landslides,
    parts: [
      ["(a)(i)", "Draw a pie chart to present the data for 2000.", 3, { drawing: true }],
      ["(a)(ii)", "Name ONE other method that you could use to illustrate the data for 2000.", 1],
      ["(b)", "Compare the causes of landslides occurring in 2000 and 2005.", 6],
    ],
  },
  {
    prompt: "In preparing a report you have used a text, Hazards, by Garrett Nagle which was published in 1998 by Thomas Nelson and Sons Ltd. in London.",
    parts: [["", "Present the information as part of a bibliography for the report.", 1]],
  },
]);
