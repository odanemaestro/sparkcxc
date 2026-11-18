import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2024-mj-p2";
const riverFeatures = {
  caption: "Features of the Rio Minho south of Northing 45",
  rowHeading: "Features",
  columns: ["Description"],
  rows: [["Flow", ""], ["Physical characteristics", ""], ["Stage of development", ""]],
};

export default archivedWritten(id, 2, 2024, 150, 100, [
  {
    title: "Map reading",
    prompt: "Study the map extract of a section of May Pen, Jamaica, drawn to a scale of 1:50 000, and answer the following questions.",
    figures: figures(id, "spanish-town-may-pen"),
    parts: [
      ["(a)", "State the height of the trigonometrical station which is located in the Brazilletto Mountains found in the southern section of the map extract.", 1],
      ["(b)", "Identify ONE type of natural vegetation found on the map extract.", 1],
      ["(c)", "State the six-figure grid reference of the trigonometrical station which is located in the Brazilletto Mountains.", 2],
      ["(d)", "State the direction of the factory at Sevens (2749) from the school at Planters Hall (3447).", 1],
      ["(e)", "State the bearing of Colbeck Castle (3544) from the school at Planters Hall (3447).", 2],
      ["(f)", "Measure and state the distance along the main road from the point where it crosses the railway line (3541) to the road junction in Old Harbour, to the nearest 100 metres.", 2],
      ["(g)", "Figure 1 is a cross-section of the landscape along Northing 32 between Easting 26 and Easting 33. Using the map extract and the list below, identify EACH of the features labelled A–C on the cross-section in Figure 1.\n\nCoral, Swamp, Water course, Brazilletto", 3, { figures: figures(id, "landscape-section") }],
      ["(h)", "Using evidence from the map extract, complete the table below by providing ONE description of EACH of the following features of the Rio Minho river south of Northing 45.", 3, { table: riverFeatures }],
      ["(i)", "Describe TWO characteristics of the site of May Pen which may have contributed to its development as a major town.", 4],
      ["(j)", "Using evidence from the map extract, describe ONE factor that may have influenced EACH of the following types of land use south of Northing 40 and west of Easting 32.\n\nLinear settlements\nTransport network\nPlantation agriculture", 6],
    ],
  },
  {
    title: "Water, rivers and coasts",
    prompt: "Figure 2 shows the movement of water above, on, and under the earth’s surface. Study the figure and answer the questions that follow.",
    figures: figures(id, "movement-of-water"),
    parts: [
      ["(a)", "Name EACH of the following features labelled A–E in Figure 2.", 5],
      ["(b)(i)", "Define EACH of the following terms.\n\nCondensation\nTranspiration", 4],
      ["(b)(ii)", "State TWO characteristics of EACH of the following drainage patterns.\n\nRadial\nDendritic", 4],
      ["(c)", "Explain how a waterfall could develop in the upper course of a river.", 6, { drawing: true }],
      ["(d)", "Explain how caves, arches and stacks could develop from a headland along a coastal region in the Caribbean.", 6, { drawing: true }],
    ],
  },
  {
    title: "Migration, urbanization and tourism",
    prompt: "Figure 3 shows the total population of immigrants and emigrants in selected UN member countries in the Caribbean (2020). Study Figure 3 and answer the questions that follow.",
    figures: figures(id, "caribbean-migration"),
    parts: [
      ["(a)(i)", "State the TOTAL number of immigrants in the selected Caribbean countries.", 1],
      ["(a)(ii)", "Name the country with the HIGHEST number of emigrants.", 1],
      ["(a)(iii)", "State the country with the LEAST number of immigrants.", 1],
      ["(a)(iv)", "State the number of persons that emigrated from Jamaica.", 1],
      ["(a)(v)", "Identify the name of the country which had approximately 100 000 emigrants.", 1],
      ["(b)", "Define EACH of the following terms.\n\nUrbanization\nUrban sprawl", 4],
      ["(c)", "Describe ONE possible negative impact of in-migration on EACH of the following systems in a Caribbean country.\n\nEconomic\nSocial", 4],
      ["(d)", "Discuss any TWO benefits which may result from an increase in population growth in the urban areas of Caribbean countries.", 6],
      ["(e)", "Explain how any TWO factors have contributed to the development and growth of the tourism industry in the Caribbean region.", 6],
    ],
  },
  {
    title: "Latitude and climate change",
    parts: [
      ["(a)", "Figure 4 shows the lines of latitude of the earth. Study the diagram and answer the questions that follow.\n\n(i) Name the lines of latitude labelled A–C.\n(ii) State the latitude of the following lines labelled X and Y.", 5, { figures: figures(id, "lines-of-latitude") }],
      ["(b)(i)", "Figure 5 shows the atmosphere as energy moves from the sun. Study the diagram and answer the question that follows.\n\nUsing the diagram above, describe the ‘greenhouse effect’.", 4, { figures: figures(id, "greenhouse-effect") }],
      ["(b)(ii)", "Describe TWO ways in which deforestation contributes to global warming in the Caribbean.", 4],
      ["(c)(i)", "Explain TWO possible impacts of climate change in the Caribbean on ONE of the following environmental conditions.\n\n• Changes in sea level\n• Changes in weather pattern", 6],
      ["(c)(ii)", "Explain TWO measures which have been implemented by Caribbean governments to reduce the effects of climate change.", 6],
    ],
  },
]);
