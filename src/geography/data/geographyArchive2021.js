import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2021-mj-p2";
const slopes = {
  caption:"Slope in the three grid squares", rowHeading:"Grid square", columns:["Description of slope"],
  rows:[["1915",""],["2013",""],["2112",""]],
};
const hazards = {
  caption:"Caribbean countries impacted", rowHeading:"Hazard", columns:["Countries impacted"],
  rows:[["Earthquake",""],["Hurricane",""]],
};

export default archivedWritten(id,2,2021,150,100,[
  {
    title:"Map reading", prompt:"A map extract of a part of Basseterre, St Christopher, is provided at a scale of 1:25 000. Use the map to answer the following questions.",
    figures:figures(id,"basseterre"),
    parts:[
      ["(a)", "What is the height of the trigonometrical station in grid square 1915?",1],
      ["(b)", "Measure the grid bearing of the roundabout (2611) from the power station at Taylor’s (2414).",2],
      ["(c)", "Measure the distance along the Class A road from the edge of the map at Easting 19 to the point where it crosses the Gillews Gut river. Give your answer to the nearest 100 metres.",2],
      ["(d)", "Study the contours in the grid squares. Describe the slope of the land in each grid square using gentle, moderate or steep.",3,{table:slopes}],
      ["(e)", "Figure 1 is a grid of the section of the map of Basseterre between Eastings 19 and 22 and Northings 11 and 14. The grid is on the same scale as the map. One contour line and the coastline are inserted. On the grid, (i) add an appropriate contour line and shade the area above 1000 ft, (ii) insert an area of cliffs, and (iii) draw in the course of the Frontier Gut river. Complete the key provided.",4,{drawing:true,background:figures(id,"basseterre-grid")[0]}],
      ["(f)", "State THREE features of the site of the town of Basseterre.",3],
      ["(g)", "Describe TWO features of the drainage of the map extract.",4],
      ["(h)", "Using evidence from the map, suggest THREE reasons that could account for the absence of settlements east of Easting 25.",6],
    ],
  },
  {
    title:"Natural systems",
    parts:[
      ["(a)(i)", "Figure 2 represents the formation of three types of rocks. What type of rock is MOST likely to be included at A?",1,{figures:figures(id,"rock-types")}],
      ["(a)(ii)", "State TWO processes that help to transform Type A rocks to Type B rocks.",2],
      ["(a)(iii)", "From the information in Figure 2, outline how metamorphic rocks are formed.",2],
      ["(b)(i)", "Define EACH of the following terms: soil creep and mass wasting.",4],
      ["(b)(ii)", "Explain how the MAIN form of weathering occurs in karst (limestone) landscapes.",4],
      ["(c)", "In October 2010, the district of Soufriere, a mountainous region in the southwest of Saint Lucia, experienced devastating landslides. Explain why a landslide occurred in this situation.",6],
      ["(d)", "Explain how vegetation contributes to the formation of latosols in tropical rainforests.",6],
    ],
  },
  {
    title:"Human systems",
    parts:[
      ["(a)(i)", "Study the map of the Caribbean in Figure 3. State the names of any FIVE of the countries identified by the letters A–G on the map.",5,{figures:figures(id,"caribbean-countries")}],
      ["(a)(ii)", "Name ONE non-renewable natural resource used for commercial purposes that is found in any FOUR of the countries identified in (a)(i). Give the country and natural resource in each case.",4],
      ["(b)", "Differentiate between ‘renewable resources’ and ‘non-renewable resources’.",4],
      ["(c)", "Explain how any TWO factors may NEGATIVELY affect the growth of the food processing industry in the Caribbean.",6],
      ["(d)", "Explain how TWO measures implemented by Caribbean governments have assisted in the development of the food processing industry in the region.",6],
    ],
  },
  {
    title:"Natural and human systems",
    parts:[
      ["(a)(i)", "Figure 4 shows the annual occurrence of natural disaster events in Latin America and the Caribbean. How many disaster events were there in 1999?",1,{figures:figures(id,"disaster-events")}],
      ["(a)(ii)", "Which year had the highest occurrence of natural disasters?",1],
      ["(a)(iii)", "Identify ONE year in which there were approximately ten disaster events.",1],
      ["(a)(iv)", "During the 1980s, which year had the LEAST number of disaster events?",1],
      ["(a)(v)", "What is the trend in disaster events between 1970 and 1999?",1],
      ["(b)(i)", "Distinguish between a ‘natural hazard’ and a ‘natural disaster’.",4],
      ["(b)(ii)", "The table lists two natural hazards. State the names of TWO Caribbean countries where EACH of these hazards became a disaster.",4,{table:hazards}],
      ["(c)", "Explain ONE possible long-term effect of EITHER an earthquake OR a volcanic eruption on EACH of the following areas of a country: infrastructure, economy and social.",6],
      ["(d)", "Explain how TWO measures used by local disaster preparedness agencies in the Caribbean may help to reduce the impact of a natural hazard.",6],
    ],
  },
]);
