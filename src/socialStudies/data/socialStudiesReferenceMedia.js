/**
 * Social Studies syllabus-aligned visual references.
 * Sources were checked against Wikimedia Commons file pages.
 * Media is illustrative only; historical maps and statistics are date-labelled.
 * Do not treat source photos or maps as current legal/political facts.
 */
const CC0 = ["CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"];
const PD = ["Public domain","https://creativecommons.org/publicdomain/mark/1.0/"];
const BY20 = ["CC BY 2.0","https://creativecommons.org/licenses/by/2.0/"];
const BY30 = ["CC BY 3.0","https://creativecommons.org/licenses/by/3.0/"];
const BY40 = ["CC BY 4.0","https://creativecommons.org/licenses/by/4.0/"];
const BYSA30 = ["CC BY-SA 3.0","https://creativecommons.org/licenses/by-sa/3.0/"];
const BYSA40 = ["CC BY-SA 4.0","https://creativecommons.org/licenses/by-sa/4.0/"];
const fileSlug = file => encodeURIComponent(file.replace(/ /g,"_"));
function reference(file,title,alt,question,author,license,kind="image",note=""){
  return Object.freeze({
    file,title,alt,question,author,license:license[0],licenseUrl:license[1],kind,note,
    sourceUrl:"https://commons.wikimedia.org/wiki/File:"+fileSlug(file),
    mediaUrl:"https://commons.wikimedia.org/wiki/Special:FilePath/"+fileSlug(file),
  });
}
export const SOCIAL_STUDIES_MEDIA = Object.freeze({
  "a1-family-types-unions": [
    reference("Family Tree.svg","Reading a family tree",
      "A visual family tree with connected relatives organised by generation.",
      "Follow the connections between the generations. Who is related to whom, and what information would you need before identifying a particular family structure?",
      "Wilfredor",CC0,"image",
      "One example of a family tree. It does not represent every Caribbean family type or union."),
  ],
  "a1-cultural-transmission": [
    reference("EmancipationPark.JPG","Cultural memory in a public place",
      "View of Emancipation Park in Kingston, Jamaica.",
      "How can monuments, public spaces and shared traditions help a society remember its history and transmit values to younger people?",
      "WhisperToMe",PD),
  ],
  "a1-caribbean-culture-world": [
    reference("Reggae singer Ernie Smith.jpg","Jamaican reggae as cultural expression",
      "A photographed Jamaican reggae musician, Ernie Smith, illustrating one strand of Caribbean musical culture.",
      "Explain how reggae and other Caribbean art forms communicate history and identity, and how music from the region circulates internationally.",
      "Igbochild",BY30,"image",
      "Reggae is one example among many Caribbean creative traditions."),
  ],
  "a2-government-structure": [
    reference("Separation of powers (EN).png","Legislature, executive and judiciary",
      "English diagram showing the three arms of government: legislature, executive and judiciary.",
      "Identify which arm makes laws, which implements public policy and which interprets laws. Their powers can overlap differently in parliamentary systems.",
      "Judkessler",CC0,"image",
      "General civics model. In Jamaica, Cabinet ministers usually sit in Parliament; the three arms are not entirely separate personnel."),
  ],
  "a2-electoral-systems": [
    reference("Jamaica parliamentary election map 2025.svg","Jamaica's 2025 constituency results",
      "Historical map of Jamaica colour-coded by constituency election results in 2025.",
      "Each area represents a constituency. How does a constituency map help you interpret first-past-the-post results, and what does it not tell you about turnout?",
      "DrRandomFactor; updated by Furfur",BYSA40,"image",
      "Historical 2025 election map. Not a live election result or current seat forecast."),
  ],
  "a2-election-outcomes-data": [
    reference("Jamaica parliamentary election map 2025.svg","Read a Jamaican election map",
      "Map of Jamaican constituency results from the 2025 parliamentary election.",
      "Describe the distribution of constituencies and explain why the number of seats and the national share of votes are different measures.",
      "DrRandomFactor; updated by Furfur",BYSA40,"image",
      "Data refer to the September 2025 parliamentary election, not future elections."),
  ],
  "b1-population-foundations": [
    reference("Population pyramid of Jamaica 2013.png","Jamaica's age and sex structure",
      "Jamaican population pyramid labelled by age bands, with males on one side and females on the other.",
      "Read the age bands from bottom to top. What can the broad shape suggest about the needs of children, working-age people and older persons?",
      "Central Intelligence Agency, World Factbook",PD,"image",
      "Historical population chart labelled 2013, not Jamaica's 2026 population."),
  ],
  "b1-population-change-rates": [
    reference("The Demographic Transition, OWID.svg","Demographic transition model",
      "Graph showing how birth and death rates can change during demographic transition.",
      "Compare the birth-rate and death-rate lines. How might living conditions, healthcare, education and fertility patterns affect natural increase?",
      "Our World in Data",BY30,"image",
      "This is a general model, not a measured curve for Jamaica or every Caribbean society."),
  ],
  "b1-population-data": [
    reference("Population pyramid of Jamaica 2013.png","Practise reading a population pyramid",
      "Population graph for Jamaica with horizontal five-year age-group bars and separate male and female sides.",
      "Choose an age band, compare the two sides and explain what additional data you would need before making a claim about population change.",
      "Central Intelligence Agency, World Factbook",PD,"image",
      "Historical 2013 reference. SPARK's interactive population-pyramid builder remains the practice activity."),
  ],
  "b1-migration": [
    reference("Windrush Generation Arrived from 1948 - City of Westminster Green Plaque at Paddington Station.jpg",
      "The Windrush generation and Caribbean migration",
      "A commemorative plaque at London's Paddington Station marking the arrival of Caribbean people from 1948.",
      "How did opportunities, recruitment and family ties encourage migration? Discuss both the contributions of Caribbean migrants and the challenges they faced.",
      "Spudgun67",BYSA40,"image",
      "The plaque was photographed in 2023. It commemorates migration from 1948 and does not tell the entire history."),
  ],
  "b1-natural-resources": [
    reference("Coral Reef.jpg","What a coral reef resource looks like",
      "Underwater photograph showing coral reef habitat and marine life.",
      "Identify ways reefs can support tourism, fishing and coastal protection. Discuss what happens when reef ecosystems are damaged.",
      "Jerry Reid, US Fish and Wildlife Service",PD,"image",
      "General reef example; not identified as a reef in Jamaica."),
  ],
  "b1-environmental-practices": [
    reference("Coral reef diagram.jpg","Marine ecosystem relationships",
      "Educational scientific illustration of a coral reef and surrounding marine habitat.",
      "Look for connections between organisms and their habitat. How can pollution and poorly managed coastal development affect these relationships?",
      "US Government source",PD,"image",
      "Use this diagram to discuss reef protection, not to identify every Caribbean species."),
  ],
  "b1-climate-change": [
    reference("Maria 2017-09-19 2107Z.png","Hurricane Maria over the Caribbean, 2017",
      "NOAA satellite image of Hurricane Maria moving across the northeastern Caribbean in September 2017.",
      "Identify the storm and nearby islands. Describe possible social and economic effects of extreme weather on small island states.",
      "NOAA NESDIS",PD,"image",
      "A single hurricane does not by itself prove climate change. The image is historical."),
    reference("Hurricane Maria Makes Landfall as a Category 5 Storm (CIRA 2017-09-19 - labels).webm",
      "Watch: Hurricane Maria approaching Dominica",
      "Eleven-second NOAA satellite animation showing the storm's movement near Dominica in September 2017.",
      "Track the movement and discuss how forecasting, warnings and evacuation planning help manage disaster risk.",
      "CSU/CIRA and NOAA satellite imagery",PD,"video",
      "Historic satellite animation (2017). No autoplay. A hurricane cannot alone establish a long-term climate trend."),
  ],
  "b2-caribbean-location": [
    reference("Antilles Map.svg","The Greater and Lesser Antilles",
      "Map of the Antillean islands showing the Caribbean region and its larger and smaller island chains.",
      "Locate Cuba, Hispaniola, Jamaica and Puerto Rico in the Greater Antilles, and compare the eastern chain of the Lesser Antilles.",
      "Kikos",BYSA30),
    reference("Lesser Antilles named.svg","Named islands in the Lesser Antilles",
      "Map of Lesser Antilles islands with printed island names.",
      "Move along the island chain and locate countries or territories you recognise. Note that political symbols and statuses may be historical.",
      "Mimich",BYSA30,"image",
      "Political statuses on older maps may have changed; use this primarily to practise geography."),
  ],
  "b2-measuring-development": [
    reference("Human-development-index,World,2023.svg","Human Development Index, world comparison",
      "World map shading countries by Human Development Index values for 2023.",
      "Compare HDI with income-only measures and explain why health and education matter. Use the map legend before comparing countries.",
      "UNDP; processed by Our World in Data",BY40,"image",
      "Uses 2023 data from a published historical series. It is not a live 2026 ranking."),
  ],
  "b2-integration-roots": [
    reference("Location Caricom.svg","Map of CARICOM relationships",
      "Historical world-region map colouring CARICOM full, associate and observer membership categories.",
      "Explain why island and mainland countries may cooperate despite different sizes and distances.",
      "Carport",PD,"image",
      "Historical map made in 2010. Membership and observer status should be verified against today's CARICOM Secretariat list."),
  ],
  "b2-regional-organisations": [
    reference("Flag of CARICOM.svg","Symbol of the Caribbean Community",
      "Blue and green flag representing the Caribbean Community, or CARICOM.",
      "Explain what CARICOM tries to achieve in regional cooperation. Distinguish CARICOM, the CSME, the OECS and the CCJ.",
      "CARICOM",PD,"image",
      "An official regional symbol; educational display does not imply endorsement."),
  ],
  "b2-tourism-integration": [
    reference("Dunns River Falls (30629696756).jpg","Tourism at Dunn's River Falls, Jamaica",
      "Photograph showing the famous Dunn's River Falls attraction in St Ann, Jamaica.",
      "Identify potential tourism jobs and foreign-exchange benefits. Then consider environmental impacts and how neighbouring Caribbean destinations can cooperate.",
      "Jason Boldero",BY20),
  ],
});
export const SOCIAL_STUDIES_MEDIA_TOPIC_IDS = Object.freeze(Object.keys(SOCIAL_STUDIES_MEDIA));
export function socialStudiesMediaForTopic(topicId){
  return SOCIAL_STUDIES_MEDIA[String(topicId||"")]||[];
}
