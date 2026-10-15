/*
 * Reviewed, syllabus-matched FNH reference media.
 * Primary sources: individual Wikimedia Commons File pages. Original attributions
 * and reuse terms are shown at the point of display.
 *
 * US dietary guides and Nutrition Facts panels are COMPARATIVE examples only,
 * never substitutes for Caribbean six-food-group guidance or national labelling law.
 */
const CC0 = ["CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"];
const PDM = ["Public domain","https://creativecommons.org/publicdomain/mark/1.0/"];
const BY20 = ["CC BY 2.0","https://creativecommons.org/licenses/by/2.0/"];
const BY30 = ["CC BY 3.0","https://creativecommons.org/licenses/by/3.0/"];
const BYSA30 = ["CC BY-SA 3.0","https://creativecommons.org/licenses/by-sa/3.0/"];
const BYSA40 = ["CC BY-SA 4.0","https://creativecommons.org/licenses/by-sa/4.0/"];
const BY40 = ["CC BY 4.0","https://creativecommons.org/licenses/by/4.0/"];
const encode = name => encodeURIComponent(name.replace(/ /g, "_"));
function media(file, title, alt, focus, author, licence, kind="image", note="") {
  return Object.freeze({
    file, title, alt, focus, author, licence:licence[0], licenceUrl:licence[1],kind,note,
    sourceUrl:"https://commons.wikimedia.org/wiki/File:"+encode(file),
    mediaUrl:"https://commons.wikimedia.org/wiki/Special:FilePath/"+encode(file),
  });
}
export const FNH_STUDY_MEDIA = Object.freeze({
  "diet-basics": [
    media("USDA MyPlate green.svg","A food-group plate for comparison",
      "The US MyPlate icon divides a plate into vegetables, fruits, grains and protein, with dairy shown separately.",
      "Look for different food groups in one meal, then compare this US diagram with the Caribbean six food groups taught in SPARK.",
      "United States Department of Agriculture",PDM,"image",
      "US reference only. The Caribbean food-group system, food choices and recommended portions may differ."),
  ],
  "food-choices-lifecycle": [
    media("USDA my plate.png","Food choices for younger children",
      "A US Department of Agriculture poster showing food-group choices and meal examples for young children.",
      "Notice the variety of foods and discuss how a suitable menu changes with age, budget, appetite and cultural preference.",
      "United States Department of Agriculture",PDM,"image",
      "US preschool example, not an official Caribbean meal plan."),
  ],
  "community-food-security": [
    media("Cost of food groups by region, 2021.svg","Why food costs matter",
      "A Food and Agriculture Organization chart comparing the cost of food groups by world region for 2021.",
      "Read the region and year carefully. Food can be available but still unaffordable to a household.",
      "Food and Agriculture Organization of the United Nations",BY40,"image",
      "This is a historical regional cost comparison, not Jamaican shop prices."),
  ],
  "nutrient-foundations": [
    media("Dinner meal MyPlate 20210810-FNS-UNC-0016.jpg","Nutrients come from a variety of foods",
      "A prepared dinner with brown rice, beans, milk, squash and mango representing several food groups.",
      "Identify likely carbohydrate, protein, fibre, vitamins and minerals. Foods commonly provide more than one nutrient.",
      "United States Department of Agriculture",PDM,"image",
      "Example food combination. Portions and individual nutritional needs vary."),
  ],
  "vitamins-minerals": [
    media("Jamaican callaloo.jpg","Caribbean greens and micronutrients",
      "A Jamaican meal with callaloo, ackee and saltfish, and other food items.",
      "Callaloo is a familiar leafy vegetable. Explain why a varied diet is better than depending on one food for vitamins or minerals.",
      "Karolyn",BY30),
  ],
  "water-digestion-evidence": [
    media("Digestive system diagram en.svg","Follow food through digestion",
      "An English-labelled illustration of the human digestive system, including oesophagus, stomach and intestines.",
      "Trace the path from mouth to stomach to small intestine; most nutrient absorption takes place in the small intestine.",
      "Mariana Ruiz Villarreal (LadyofHats)",PDM),
  ],
  "meal-planning-multimix": [
    media("Dinner meal - MyPlate 20210810-FNS-UNC-0017.jpg","Plan a varied meal",
      "A meal featuring a tortilla, fish, milk, corn and beans, and orange segments.",
      "Name the food groups represented, then adapt the example to familiar Caribbean staples and available ingredients.",
      "United States Department of Agriculture",PDM,"image",
      "US food-group comparison only. Apply the Caribbean multi-mix approach from the lesson."),
  ],
  "menus-groups-vegetarian": [
    media("Rice and Peas.jpg","Plant-based menu starting point",
      "Jamaican rice and peas served as a traditional staple-based dish.",
      "Rice and peas combine grain and legume foods. Add vegetables and other suitable foods to complete a balanced vegetarian meal.",
      "Whispyhistory; JPEG conversion by Hike395",BYSA40),
  ],
  "production-spoilage": [
    media("Bread Mold (NIH BioArt 705 - 788867).svg","Bread mould illustration",
      "An educational scientific illustration representing bread mould.",
      "Mould is a fungus. Food spoilage can involve mould, bacteria, yeasts or chemical changes. This is an illustration, not a photograph of food safety status.",
      "Ryan Kissinger, NIAID BioArt",PDM),
  ],
  "microbes-food-safety": [
    media("SalmonellaNIAID.jpg","A food-borne pathogen under a microscope",
      "Colour-enhanced electron micrograph of Salmonella Typhimurium interacting with cultured human cells.",
      "Salmonella can cause food-borne illness. The microscopy colours are added for clarity, not the natural colour of bacteria.",
      "Rocky Mountain Laboratories, NIAID/NIH",PDM),
    media("Bacterial growth en.svg","Phases of bacterial growth",
      "English-labelled bacterial growth curve with lag, exponential, stationary and decline phases.",
      "Growth depends on conditions. This general culture curve does not give specific safe food storage times.",
      "Michał Komorniczak",BYSA30),
    media("How Does Cross-Contamination Happen.webm","Watch: how cross-contamination happens",
      "A USDA food safety video explaining how germs can spread between raw food, surfaces and prepared meals.",
      "Find points in shopping, storage and preparation where contamination can spread. Suggest one prevention step for each.",
      "USDA Food Safety and Inspection Service",PDM,"video"),
  ],
  "preservation-additives": [
    media("Dehydrator set at 140F for drying tomatoes.jpg","See food dehydration in practice",
      "A food dehydrator holding tomatoes during a drying process.",
      "Removing water helps limit microbial growth. Drying is not sterilisation; storage, handling and food-specific instructions still matter.",
      "Nutrition, Food Safety & Health",CC0),
  ],
  "heat-raising": [
    media("Heat Diagram.PNG","Comparing heat-transfer processes",
      "An illustrated comparison of conduction, convection and induction heating.",
      "Conduction transfers heat through contact, convection through moving fluid and induction heats suitable cookware electromagnetically.",
      "Arman Cagle",BYSA30),
  ],
  "kitchen-layout": [
    media("Work triangle.jpg","Kitchen workflow triangle",
      "Simple kitchen layout diagram connecting the sink, cooking area and refrigerator.",
      "Trace the route between storage, washing and cooking. The work triangle is one planning idea, not a rigid rule for every kitchen.",
      "Peter Oreilly",CC0),
  ],
  "equipment": [
    media("Kitchen utensils.jpg","Identify common kitchen utensils",
      "A photograph showing an assortment of kitchen utensils.",
      "Name the tools, explain what each is for, and discuss safe cleaning and storage.",
      "Darren Lewis",CC0),
    media("Measuring Cups.jpg","Measuring ingredients accurately",
      "A set of kitchen measuring cups or spoons with labelled volume measurements.",
      "Check units, level off appropriate dry ingredients and avoid confusing volume with mass.",
      "Estabiano",CC0),
  ],
  "labels-claims": [
    media("FDA Nutrition Facts Label 2016.png","Reading a nutrition information label",
      "An example US Nutrition Facts panel showing serving size, energy and several nutrients.",
      "Start with the serving size, then compare nutrient amounts and percentages. Do not confuse this US example with Jamaican labelling law.",
      "United States Food and Drug Administration",PDM,"image",
      "US FDA teaching example. Label requirements can differ across the Caribbean."),
  ],
  "hygiene-cooking": [
    media("Principles of HACCP.svg","Food-safety controls",
      "A diagram summarising the seven principles of hazard analysis and critical control points.",
      "Look at how hazards are identified, critical control points are managed and safety records are kept.",
      "Surachit",BYSA40),
    media("Clean hands short.webm","Watch: effective handwashing",
      "A short CDC handwashing demonstration showing how to clean hands.",
      "Use soap and water correctly and wash hands before food preparation and after touching raw foods or contaminated surfaces.",
      "Centers for Disease Control and Prevention",PDM,"video"),
  ],
  "preparation-service": [
    media("Table setting.jpg","Basic and formal place settings",
      "A photograph showing examples of basic and formal table settings.",
      "Compare where plates, glasses, cutlery and napkins are placed. Service depends on the meal and the occasion.",
      "Dharshini Vinayagam",BYSA40),
  ],
  "caribbean-food-culture": [
    media("Ackee and Saltfish.jpg","Jamaican ackee and saltfish",
      "Ackee and saltfish served with salad and sliced tomatoes.",
      "Identify familiar ingredients, preparation methods and possible adaptations for cost, allergies or dietary requirements.",
      "gailf548",BY20),
    media("Jamaican breakfast ackee saltfish callaloo.jpg","A Jamaican breakfast",
      "A plate featuring ackee and saltfish, callaloo and other Jamaican breakfast foods.",
      "Use this real Caribbean example to discuss food groups, culinary heritage, preparation methods and portions.",
      "Karolyn",BY30),
  ],
});
export const FNH_MEDIA_TOPIC_IDS = Object.freeze(Object.keys(FNH_STUDY_MEDIA));
export function fnhMediaForTopic(topicId) {
  const id=String(topicId||"");
  return FNH_STUDY_MEDIA[id] || [];
}
