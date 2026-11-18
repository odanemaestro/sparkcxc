import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2015-mj-p3";
const drawing = name => ({drawing:true,background:figures(id,name)[0]});
const landUse = {
  caption:"Table 1. Types of land use in the Moneague area",
  rowHeading:"Economic activity", columns:["Number of businesses","Types"],
  rows:[
    ["Farming",24,"Large cattle farms (2), small vegetable plots (8), medium sized flower farms (3), small mixed farms (11)"],
    ["Commerce",12,"Supermarket (1), pharmacy (1), street vendors (5), small shops (4), gas station (1)"],
    ["Services",6,"College (1), school (2), post office (1), hair dressing (1), dressmaking (1)"],
    ["Other",6,"Bank (1), block making (2), guest houses (3)"],
  ],
};
const reasons = {
  caption:"Table 2. Reasons for selecting Moneague Housing Scheme",
  rowHeading:"Reasons for living in the scheme", columns:["Number of residents"],
  rows:[["Proximity to job opportunities",66],["Affordable housing",123],["Returning resident",25],["The quietness of the community",15],["Other reasons",71]],
};
const occupations = {
  caption:"Table 3. Occupation of residents of Moneague Housing Scheme",
  rowHeading:"Occupation of residents", columns:["Percentage of residents","Average age of residents"],
  rows:[["Professionals",27,32],["Casual labourers",5,31],["Retired",13,67],["Farmers",21,55],["Students",29,13],["Unemployed",5,19]],
};

export default archivedWritten(id,3,2015,105,40,[
  {
    prompt:"Use the map of Moneague, Jamaica (scale 1:50 000). You are advised to spend no more than 10 minutes on Question 1.",
    figures:figures(id,"moneague"),
    parts:[["", "Figure 1 presents a grid of the Moneague area bordered by Eastings 36 and 40 and Northings 78 and 82. The main Class A road has been inserted. Using the key on the map, complete Figure 1 by (a) adding the Class B road to Grierfield, (b) inserting ONE built-up area, (c) drawing the area of swamp and (d) inserting ONE point of interest.",4,drawing("moneague-grid")]],
  },
  {
    prompt:"Imagine you are doing research on the factors influencing the main types of land use in the Moneague area.",
    parts:[["", "Write a research question or statement that would guide the collection of data in the field.",2]],
  },
  {
    parts:[
      ["(a)", "List TWO examples of EACH of the following items that will assist you in carrying out the research. Source, resource tool and equipment.",6],
      ["(b)", "You are investigating the factors influencing land use in the Moneague area. Write THREE questions you would ask residents.",3],
      ["(c)(i) How", "Describe how you would conduct the research and collect the data.",2],
      ["(c)(i) When", "Describe when you would conduct the research and collect the data.",1],
      ["(c)(ii)", "Describe TWO methods you would use to record the data.",2],
    ],
  },
  {
    prompt:"During your investigation, you collected the information in Table 1. Use this information to answer the questions that follow.",
    table:landUse,
    parts:[
      ["(a)", "Draw a pie chart to illustrate the number of businesses by economic activity.",3,{drawing:true}],
      ["(b)", "Using the information in the table, prepare a report on the results of the survey.",6],
    ],
  },
  {
    prompt:"Your research also provided information about the movement of people into a new housing scheme. This is summarized in Tables 2 and 3.",
    tables:[reasons,occupations],
    parts:[
      ["(a)", "Using the grid provided, construct a bar graph to illustrate the data on professionals, casual labourers and farmers given in Table 3.",3,drawing("occupation-grid")],
      ["(b)", "Provide a title for the diagram.",1],
      ["(c)", "Summarize and comment on the data presented in both tables.",6],
    ],
  },
  {
    prompt:"You used a book written by Paul Guinness, Judy Rocke, Garrett Nagle, Simon Ross, Knola Oliphant, John Rutter, Alison Rae and Adrian Wylie, published by Nelson Thorne of Cheltenham, United Kingdom in 2008. The title is Geography for CSEC.",
    parts:[["", "Present the authors as you would in the bibliography for the report.",1]],
  },
]);
