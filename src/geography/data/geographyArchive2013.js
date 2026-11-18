import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2013-mj-p3";
const drawing = name => ({drawing:true,background:figures(id,name)[0]});
const temperatures = {
  caption:"Table 1. Average high and low temperatures in Charlestown",
  rowHeading:"°C", columns:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
  rows:[
    ["High",28,27.5,29,29.5,30,30,30,30.5,30.5,30,29,28],
    ["Low",23,22,23,24,25.5,25.5,25.5,25.5,25,24.5,23,23],
  ],
};
const rainfall = {
  caption:"Table 2. Millimetres of rainfall in February in the study area",
  rowHeading:"Day", columns:["Rainfall","Day","Rainfall","Day","Rainfall","Day","Rainfall"],
  rows:[
    ["1st","3 mm","8th","4 mm","15th","5 mm","22nd","3 mm"],
    ["2nd","0 mm","9th","3 mm","16th","0 mm","23rd","0 mm"],
    ["3rd","0 mm","10th","0 mm","17th","6 mm","24th","4.5 mm"],
    ["4th","3 mm","11th","3 mm","18th","0 mm","25th","0 mm"],
    ["5th","0 mm","12th","0 mm","19th","4 mm","26th","0 mm"],
    ["6th","8 mm","13th","4 mm","20th","4 mm","27th","0 mm"],
    ["7th","4 mm","14th","0 mm","21st","6 mm","28th","6 mm"],
  ],
};

export default archivedWritten(id,3,2013,105,40,[
  {
    prompt:"Use the map of Nevis at a scale of 1:25 000. Imagine you are preparing to study areas of cultivation and forest on the west slopes of Nevis Peak. With reference to the map, complete the TWO sketch maps.",
    figures:figures(id,"nevis-map"),
    parts:[
      ["(a)", "Figure 1 shows an outline of Nevis, the parish boundaries and an area of forest. On this map, show the position of Nevis Peak.",1,drawing("nevis-outline")],
      ["(b)", "Figure 2 shows part of the map between Eastings 35 and 37 and Northings 95 and 97. The 500, 1500 and 2000 foot contour lines are shown. Add (i) the 1000 foot contour line, (ii) the parish boundary between St Thomas Lowland and St Paul–Charlestown, and (iii) the area of cultivation in squares 3595 and 3695.",3,drawing("nevis-contour-grid")],
    ],
  },
  {
    prompt:"It has been suggested that, at present, most of the tourists coming to Nevis are persons from the Caribbean interested in the rainforest, reefs and ruins and that the beaches are a minor attraction. You are to conduct research to find out if this suggestion is correct.",
    parts:[["", "Form a question or state a hypothesis to guide the collection of data in the field. This will be the purpose or aim of your research.",2]],
  },
  {
    parts:[
      ["(a)", "For the research in Question 2, list SIX variables on which you would collect information from the tourists.",6],
      ["(b) How", "Describe how you would conduct the research.",3],
      ["(b) When", "Describe when you would conduct the research.",2],
      ["(c)(i)", "Identify ONE problem (other than the weather, illness and injury) that you may encounter in conducting the research in 3 (b).",1],
      ["(c)(ii)", "State how you would overcome the problem that you identified in (c)(i).",2],
    ],
  },
  {
    prompt:"The climate of Nevis influences its agriculture. Table 1 shows the average high and low temperatures in Charlestown.",
    table:temperatures,
    parts:[
      ["(a)", "Using the data in Table 1, plot a line graph to show the low temperatures on the graph provided in Figure 3.",3,drawing("temperature-grid")],
      ["(b)", "Study Table 1 and show how TWO features of the temperature may make the climate suitable for agriculture.",6],
    ],
  },
  {
    prompt:"Imagine you are studying the micro-climate in an area in eastern Nevis and have recorded the rainfall during February in one year as shown in Table 2.",
    table:rainfall,
    parts:[
      ["(a)", "Name the instrument used to collect rainfall data shown in Table 2.",1],
      ["(b)", "Using the grid, construct a bar graph to show rainfall for the last week of February.",3,drawing("rainfall-grid")],
      ["(c)", "The data provided in Table 2 are above the average rainfall of 47 mm for February in all of Nevis. Suggest SIX reasons for this.",6],
    ],
  },
  {
    prompt:"Four of the five elements of a book which are given in a bibliography are listed below:\nThe name of the author\nName of publisher\nTitle of the book\nYear of publication",
    parts:[["", "What is the fifth element that should be stated in a bibliography?",1]],
  },
]);
