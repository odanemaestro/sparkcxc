import { archivedWritten, figures } from "./geographyArchiveModels";

const id = "2005-mj-p3";
const drawing = name => ({ drawing: true, background: figures(id, name)[0] });
const treeCrops = {
  caption: "Table 1. Percentage area of estate used for crops",
  rowHeading: "Crop",
  columns: ["Area of Estate (%)"],
  rows: [["Banana", 5], ["Citrus", 25], ["Cocoa", 40], ["Coffee", 30]],
};
const broilerFarms = {
  caption: "Table 2. Number of broiler farms in Trinidad by group size",
  rowHeading: "Group Size",
  columns: ["July 2001", "July 2002"],
  rows: [["Small", 75, 183], ["Medium", 154, 218], ["Large", 35, 48], ["Total", 264, 449]],
};

export default archivedWritten(id, 3, 2005, 105, 40, [
  {
    figures: figures(id, "kingston"),
    parts: [
      ["(a)", "(i) Use the map extract provided (Kingston, Jamaica – Scale 1:50 000) to draw a small sketch map of Jamaica in the space allocated for Figure 1.\n(ii) On the sketch map that you have drawn in Figure 1, show the position of\na) the city of Kingston\nb) the Mineral Bath at grid reference 780 460.", 3, drawing("jamaica-frame")],
      ["(b)", "In the grid provided in Figure 2, draw a sketch map of the coast using a scale of 1:50 000 to show the location of the Mineral Bath in relation to the main roads, a quarry, the built-up areas (Kingston and Harbour View) and Long Mountain. The grid is bounded by Eastings 75 and 82, and Northings 43 and 48.", 4, drawing("mineral-bath-grid")],
    ],
  },
  {
    prompt: "Suppose you were told that most of the patrons using the Mineral Bath in August are men over 30 years old from the United States of America.",
    parts: [["", "Frame a research question for a study you can conduct to test the accuracy of that statement.", 2]],
  },
  {
    parts: [
      ["(a)", "Compose THREE questions to be used in a questionnaire for the study in Question 2. The THREE questions should cover the important points of the study.", 6],
      ["(b)", "Describe in detail how and when you would conduct the study outlined in Question 2 in order to obtain adequate and accurate information.", 4],
      ["(c)", "Identify ONE problem or constraint, EXCEPT the weather, which you may have to overcome in conducting the study.", 1],
    ],
  },
  {
    parts: [
      ["(a)", "Table 1 shows the percentages of the area of an estate used for various tree crops. In the space allocated for Figure 3, draw an appropriate diagram to illustrate the data presented in Table 1.", 3, { ...drawing("tree-crops-frame"), table: treeCrops }],
      ["(b)", "Table 2 presents data for some broiler farms in Trinidad. Use the data in Table 2 to sketch a diagram in the space allocated to Figure 4 to compare, by group size, the number of broiler farms in Trinidad for July 2001 and July 2002.\nSource: www.cso.gov.tt.", 3, { ...drawing("broiler-farms-frame"), table: broilerFarms }],
    ],
  },
  {
    table: broilerFarms,
    parts: [["", "Using the data in Table 2, write a summary describing and comparing the changes in the number of broiler farms, by group size, in Trinidad.", 12]],
  },
  {
    prompt: "The article entitled ‘Influence of the Tropical Atlantic versus the Tropical Pacific on Caribbean rainfall’ was published on pages 3127 to 3140 in 2002 in the Journal of Geographical Research, Volume 107 C-G by three joint authors. The authors were Michael Taylor, David Enfield and Anthony Chen.",
    parts: [["", "Prepare an entry for the bibliography of a report citing the article.", 2]],
  },
]);
