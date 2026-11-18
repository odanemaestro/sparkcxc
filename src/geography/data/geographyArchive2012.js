import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2012-mj-p3";
const drawing = name => ({drawing:true,background:figures(id,name)[0]});
const ageGroups = {
  caption:"Table 1. Population classified into three age groups",
  rowHeading:"Age group", columns:["Male (%)","Female (%)"],
  rows:[["0–14",19,17],["15–59",20,28],["Over 60","08","08"]],
};
const fiveYearGroups = {
  caption:"Table 2. Population structure by 5-year age groups",
  rowHeading:"Age group", columns:["Male (%)","Female (%)"],
  rows:[
    ["0–4","06","06"],["5–9","07","06"],["10–14","06","05"],["15–19","03","05"],["20–24","02","04"],
    ["25–29","02","03"],["30–34","02","02"],["35–39","02","03"],["40–44","03","03"],["45–49","02","03"],
    ["50–54","02","03"],["55–59","02","02"],["60–64","03","03"],["65–69","04","03"],["70–74","01","02"],
  ],
};
const employment = {
  caption:"Table 3. Per cent employment in the three sectors of the economy in a village",
  rowHeading:"Sector", columns:["Employment (%)"],
  rows:[["Agriculture",35],["Industry",10],["Services",55],["Total",100]],
};

export default archivedWritten(id,3,2012,105,40,[
  {
    prompt:"Use the map extract of Dominica at a scale of 1:25 000. You are advised to spend no more than 15 minutes on Question 1.",
    figures:figures(id,"wesley-map"),
    parts:[["", "Use the grid in Figure 1 to draw a sketch map showing the location of Wesley (La Soie). The grid is at half the scale of the map and is bordered by Eastings 80 and 84 and Northings 20 and 22. On the grid insert (a) the coastline, (b) Wesley, (c) the Tweed River and (d) the surfaced road.",4,drawing("wesley-grid")]],
  },
  {
    prompt:"You want to study the ages and occupations of the residents of Wesley in order to compare them with the national pattern.",
    parts:[["", "State a question or hypothesis which will guide the collecting of data in the field.",2]],
  },
  {
    parts:[
      ["(a)(i)", "For the study in Question 2, list FOUR types of data which you would record in the field.",4],
      ["(a)(ii)", "State TWO possible secondary sources of relevant information you could use.",2],
      ["(b)", "Explain how and when you would conduct the research.",5],
      ["(c)(i)", "Identify a problem (excluding the weather, illness and injury) that you might encounter in conducting the research in 3 (b).",1],
      ["(c)(ii)", "State how you would overcome the problem that you identified in (i).",2],
    ],
  },
  {
    prompt:"Table 1 shows the age structure of a village of 100 persons classified into three age groups.",
    table:ageGroups,
    parts:[
      ["(a)", "Using the graph paper provided in Figure 2, complete the population pyramid to show the data in Table 1.",3,drawing("pyramid-grid")],
      ["(b)", "Table 2 shows the population for the same village by 5-year age groups. Using the data in Table 1 and Table 2, write a report explaining the significance of THREE characteristics of the population.",6,{table:fiveYearGroups}],
    ],
  },
  {
    prompt:"Table 3 shows employment in the three sectors of the economy in a village.",
    table:employment,
    parts:[
      ["(a)", "Construct a pie chart (diameter 5 cm) to show the data in Table 3.",3,{drawing:true}],
      ["(b)", "Name ONE other method you could have used to illustrate the data in Table 3.",1],
      ["(c)", "Comment on the nature of the distribution in the three sectors.",6],
    ],
  },
  {
    prompt:"The five elements of a book which are used in a bibliography are:\nCity of publication\nName(s) of author(s)\nName of publisher\nTitle of publication\nYear of publication",
    parts:[["", "List these elements in the sequence in which they should be given in the bibliography.",1]],
  },
]);
