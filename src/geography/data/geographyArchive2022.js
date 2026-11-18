import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2022-mj-p2";
const reefs = {
  caption:"Table 1. Coral reefs in the Caribbean",
  rowHeading:"Country", columns:["Reef area (km²)","Reef at high risk of destruction or degradation (%)"],
  rows:[["Antigua and Barbuda",180,51],["The Bahamas","3 580",2],["Barbados",90,86],["Belize","1 420",32],["Cuba","3 290",33]],
};

export default archivedWritten(id,2,2022,150,100,[
  {
    title:"Map reading",
    prompt:"Study the map extract of Pointe-a-Pierre, Trinidad, drawn on a scale of 1:25 000, and answer the following questions.",
    figures:figures(id,"pointe-a-pierre"),
    parts:[
      ["(a)", "State the six-figure grid reference of the police station near Union Estate.",2],
      ["(b)", "What is the compass direction of the school near Union Estate (grid square 6843) from Trig Station 1047 (grid square 7043)?",1],
      ["(c)", "State TWO types of vegetation found along the coastline near Marabella.",2],
      ["(d)", "Measure the bearing of Trig Station 1045 (grid square 7344) from Trig Station 1047 (grid square 7043).",2],
      ["(e)", "Measure the distance along the Solomon Hochoy Highway from its junction with Guaracara-Tabaquite Road (grid square 7139) to the point where the highway ends at the southern edge of the map.",2],
      ["(f)", "Which term best describes the pattern of settlement at EACH of St Margaret, Marabella and La Carriere? Choose from nucleated, linear and dispersed.",3],
      ["(g)", "List THREE physical features of the site of the oil refinery shown on the map. Examine the area between Eastings 66 and 71 and Northings 39 and 42.",3],
      ["(h)", "Describe TWO features of the drainage east of the Solomon Hochoy Highway on the map extract.",4],
      ["(i)", "Outline THREE ways in which the relief of the land has influenced the land use seen on the map.",6],
    ],
  },
  {
    title:"Natural systems", figures:figures(id,"coastal-features"),
    parts:[
      ["(a)(i)", "Study Figure 1. State the type of landform found at A, B, C and D.",4],
      ["(a)(ii)", "State the MAIN landform that separates the bays.",1],
      ["(b)(i)", "Outline the difference between ‘weathering’ and ‘erosion’.",4],
      ["(b)(ii)", "Describe TWO processes by which wave action erodes a coastline.",4],
      ["(c)(i)", "Explain how frost action or freeze–thaw takes place.",3],
      ["(c)(ii)", "Explain how hydrolysis takes place.",3],
      ["(d)", "Explain how rock hardness and wave refraction result in the formation of bays and headlands.",6],
    ],
  },
  {
    title:"Human systems", figures:figures(id,"energy-sources"),
    parts:[
      ["(a)(i)", "Study Figure 2. What percentage of global energy comes from hydro?",1],
      ["(a)(ii)", "State the source that is the GREATEST contributor to world energy.",1],
      ["(a)(iii)", "Name the energy source that accounts for six per cent of global energy.",1],
      ["(a)(iv)", "Calculate the percentage of world energy that comes from coal. Show your working.",2],
      ["(b)(i)", "Differentiate between ‘primary’ and ‘tertiary’ economic activities.",4],
      ["(b)(ii)", "Name any TWO extractive industries found in the Caribbean.",2],
      ["(b)(iii)", "For each extractive industry named in (b)(ii), state ONE country in the region where the industry currently exists on a large scale.",2],
      ["(c)", "Explain TWO benefits that are derived from the development of the manufacturing sector in Caribbean countries.",6],
      ["(d)", "Explain how any TWO challenges have prevented the setting up of EITHER aluminium smelters OR oil drilling in the Caribbean region.",6],
    ],
  },
  {
    title:"Natural and human systems", table:reefs,
    parts:[
      ["(a)(i)", "Which country has the largest area of coral reefs?",1],
      ["(a)(ii)", "State the area of the coral reefs in Belize.",1],
      ["(a)(iii)", "Which country has the highest percentage of its reefs at high risk of destruction or degradation?",1],
      ["(a)(iv)", "Which country has approximately half of its reefs at high risk of destruction or degradation?",1],
      ["(a)(v)", "State the country that has been most successful in limiting the effects of human activity on its coral reefs.",1],
      ["(b)(i)", "Describe TWO conditions that are necessary for the successful formation of coral reefs in the Caribbean.",4],
      ["(b)(ii)", "Outline TWO ways in which mangrove wetlands are important to coastal communities in the Caribbean.",4],
      ["(c)", "“The cruise ship industry is one of the most important growth sectors for tourism in the Caribbean.” Discuss TWO possible negative effects the cruise ship industry can have on the natural environment.",6],
      ["(d)", "Discuss TWO measures that have been implemented by governments in the Caribbean to ensure the sustainable management of fisheries resources.",6],
    ],
  },
]);
