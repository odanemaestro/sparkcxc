import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2014-mj-p3";
const drawing = name => ({drawing:true,background:figures(id,name)[0]});
const citrusExports = {
  caption:"Table 1. Citrus exports from Country X, 1999",
  rowHeading:"Citrus fruit", columns:["Exports"],
  rows:[["Grapefruits","21 000 tons"],["Lemons and limes","1 000 tons"],["Oranges","2 000 tons"]],
};
const citrusProduction = {
  caption:"Table 2. Factors affecting citrus production in Country X",
  rowHeading:"Factors", columnGroup:"Percentage of farms affected", columns:["Large","Small"],
  rows:[["Hurricanes",95,70],["Droughts",35,65],["Pests and diseases",75,45],["Decline in demand",100,85],["Labour shortage",65,0]],
};
const wind = {
  caption:"Table 3. Wind direction in January in the study area",
  rowHeading:"Day", columns:["Wind","Day","Wind","Day","Wind","Day","Wind"],
  rows:[
    ["1st","E","8th","E","15th","NE","22nd","NE"],
    ["2nd","E","9th","SE","16th","E","23rd","E"],
    ["3rd","NE","10th","SE","17th","E","24th","E"],
    ["4th","NE","11th","E","18th","SE","25th","NE"],
    ["5th","NE","12th","NE","19th","E","26th","E"],
    ["6th","E","13th","NE","20th","NE","27th","SE"],
    ["7th","NE","14th","NE","21st","NE","28th","SE"],
    ["","","","","","","29th","NE"],
    ["","","","","","","30th","NE"],
    ["","","","","","","31st","NE"],
  ],
};

export default archivedWritten(id,3,2014,105,40,[
  {
    prompt:"Use the map of Speightstown, Barbados, at a scale of 1:10 000, showing the northwestern section of Barbados Sheet 3. You are advised to spend no more than 15 minutes on Question 1.",
    figures:figures(id,"speightstown"),
    parts:[["", "Figure 1 shows part of the map of Speightstown between Eastings 20 and 22 and Northings 82 and 84 at half the scale. The coastline and two water courses are shown. Complete the sketch map by adding (i) Heywoods Beach, (ii) the 10 metre contour line, (iii) Speightstown and (iv) the scale line for 1 km.",4,drawing("speightstown-grid")]],
  },
  {
    prompt:"It has been suggested that wave action and the beach profile or cross section (including texture) vary during the year, with marked differences between the profile before the hurricane season and the profile during the season. You are to undertake a study to find out if this suggestion is correct.",
    parts:[["", "Formulate a question or state a hypothesis to guide the collection of data in the field. This will be the purpose or aim of your research.",2]],
  },
  {
    parts:[
      ["(a)", "For the study in Question 2, list SIX items on your data sheet about which you would record information.",6],
      ["(b) How", "Describe how you would conduct the research and record the data.",3],
      ["(b) When", "Describe when you would conduct the research and record the data.",2],
      ["(c)(i)", "Identify ONE problem (excluding the weather, illness and injury) that you may encounter in conducting the research in (b) above.",1],
      ["(c)(ii)", "State how you would overcome the problem that you identified in (c) (i) above.",2],
    ],
  },
  {
    prompt:"You are studying changes in the citrus industry in a Caribbean country over the last fifteen years.",
    parts:[
      ["(a)", "Table 1 shows the amount of citrus exported in 1999. Using a pie chart, present the data. Add a title for the diagram.",3,{table:citrusExports,drawing:true}],
      ["(b)", "Table 2 summarizes the data collected from large and small farms in Country X. Write an analysis of the data presented in the table.",6,{table:citrusProduction}],
    ],
  },
  {
    prompt:"Imagine you are studying the wind direction in Barbados as part of your research on the beach profiles. You recorded the wind in January as shown in Table 3.",
    table:wind,
    parts:[
      ["(a)", "State how you would collect the wind data shown in Table 3.",1],
      ["(b)", "Construct a bar graph to show the data in Table 3 using the graph paper. Give the graph a title.",3,drawing("wind-graph-grid")],
      ["(c)", "Outline SIX points which summarize the data in Table 3.",6],
    ],
  },
  {
    prompt:"Four of the five elements of a book which are given in a bibliography are listed below:\nName of author\nName of publisher\nTitle of book\nYear of publication",
    parts:[["", "What is the fifth element?",1]],
  },
]);
