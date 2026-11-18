import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2019-mj-p2";

export default archivedWritten(id, 2, 2019, 150, 100, [
  {
    prompt: "Study the map extract of Penal, drawn to a scale of 1:25 000, and answer the following questions.",
    figures: figures(id, "penal"),
    parts: [
      ["(a)(i)", "State the six figure grid reference of the minor trigonometrical station near Northing 23.", 2],
      ["(a)(ii)", "What is the compass direction of the oilfield from the minor trigonometrical station?", 1],
      ["(b)", "Name TWO types of natural vegetation that are present along Easting 63.", 2],
      ["(c)", "What is the bearing of the hospital slightly north of Pluck from the dam at Grande Terre?", 2],
      ["(d)", "What is the distance, in kilometres, along the first class road between Northing 26 and Northing 28?", 2],
      ["(e)", "Give ONE word to describe the gradient of the slope present at EACH of the following locations along Northing 23 moving from east to west.\n(i) 25 feet contour line near the disused railway to the first 50 feet contour line (3367)\n(ii) 50 feet contour line to the 125 feet contour line in grid 2366\n(iii) 100 feet contour line to the 175 feet contour line in grid 2364", 3],
      ["(f)", "Identify the main type of settlement found in each of the following grid squares.\n(i) 6026\n(ii) 6926\n(iii) 6824", 3],
      ["(g)", "State FOUR characteristics of the drainage north of Northing 25 shown on the map extract.", 4],
      ["(h)", "Outline THREE factors that may have influenced the distribution of rice cultivation in the area depicted on the map extract.", 6],
    ],
  },
  {
    prompt: "Study the diagram below which shows plate boundaries and then answer the questions which follow.",
    figures: figures(id, "plate-boundaries"),
    parts: [
      ["(a)(i)", "Name the plate boundaries shown at A and C.", 2],
      ["(a)(ii)", "What type of mountain is formed at B?", 1],
      ["(a)(iii)", "State ONE landform associated with the plate boundary shown at A.", 1],
      ["(a)(iv)", "State the name of ONE active volcano located in the Caribbean.", 1],
      ["(b)(i)", "Describe how EACH of the following features is formed.\nSills\nDykes", 4],
      ["(b)(ii)", "Describe what happens when a continental plate meets an oceanic plate.", 4],
      ["(c)", "Explain why the shape of a basic lava cone is different from the shape of an acid lava cone.", 6],
      ["(d)", "Explain the cause of earthquakes at convergent and transform boundaries.\nConvergent boundaries\nTransform boundaries", 6],
    ],
  },
  {
    prompt: "Study the graph below which shows a population pyramid of Trinidad and Tobago for 2014, and then answer the questions that follow.",
    figures: figures(id, "trinidad-population"),
    parts: [
      ["(a)(i)", "What is the range for EACH age group represented in the population pyramid?", 1],
      ["(a)(ii)", "Which age range has the GREATEST number of males?", 1],
      ["(a)(iii)", "State ONE age range that has a population of over 48 000 female members.", 1],
      ["(a)(iv)", "Which age range has the LEAST number of persons below 25 years?", 1],
      ["(a)(v)", "Which age range has the largest number of persons over 45 years?", 1],
      ["(b)(i)", "Define the term ‘primary economic activities’.", 2],
      ["(b)(ii)", "Describe how EACH of the following factors has influenced out-migration in the Caribbean since the 1990s.\nEconomic\nSocial\nPolitical", 6],
      ["(c)", "Compare the characteristics of large scale and small-scale farming in the Caribbean using the following headings\nSize of farms\nFarming practices\nLabour supply\nTechnology", 12],
    ],
  },
  {
    prompt: "Study the pie chart below which shows sources of emission of air pollutants and then answer the questions which follow.",
    figures: figures(id, "air-pollutants"),
    parts: [
      ["(a)(i)", "What percentage of air pollutants results from the transportation sector?", 1],
      ["(a)(ii)", "What percentage of air pollutants results from industry?", 1],
      ["(a)(iii)", "What sector contributes the LOWEST percentage of pollutants to the air?", 1],
      ["(a)(iv)", "Suggest ONE conclusion that can be drawn from the information given in the chart.", 2],
      ["(b)(i)", "Describe TWO conditions that are necessary for the formation of coral reefs.", 4],
      ["(b)(ii)", "Outline TWO ways in which coral reefs protect the coastal region in the Caribbean.", 4],
      ["(c)", "Explain TWO ways in which agriculture contributes to degradation of the coral reefs in the Caribbean.", 6],
      ["(d)", "Discuss TWO measures that have been implemented at the national level of MOST countries to ensure the sustainability of coral reefs. Use examples to support your answer.", 6],
    ],
  },
]);
