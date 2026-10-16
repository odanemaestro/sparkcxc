/**
 * Sourced educational media, only where it helps explain a named POB syllabus idea.
 * Use Commons source and licence links beside the visual. The remote images are not
 * copied into SPARK; an external failure must not block the lesson.
 */
const BYSA4=["CC BY-SA 4.0","https://creativecommons.org/licenses/by-sa/4.0/"];
const BYSA3=["CC BY-SA 3.0","https://creativecommons.org/licenses/by-sa/3.0/"];
const CC0=["CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"];
const PD=["Public domain","https://creativecommons.org/publicdomain/mark/1.0/"];
const slug=file=>encodeURIComponent(file.replace(/ /g,"_"));
const ref=(file,title,alt,focus,author,license,note="")=>Object.freeze({
  file,title,alt,focus,author,license:license[0],licenseUrl:license[1],note,
  sourceUrl:"https://commons.wikimedia.org/wiki/File:"+slug(file),
  mediaUrl:"https://commons.wikimedia.org/wiki/Special:FilePath/"+slug(file)
});
export const POB_MEDIA_BY_OBJECTIVE=Object.freeze({
  "S1.7":[ref("CircularFlowEN-SVG.svg","The circular flow of the economy",
    "Five-sector circular flow of income diagram in English with flows of money and goods or services.",
    "Follow the arrows representing money and real goods or services. Look for the household, business, government, financial and external sectors.",
    "Niyumard",CC0,
    "An explanatory five-sector model, not a precise measurement of Jamaica's economy.")],
  "S2.3":[ref("Organization Structure.svg","Understanding an organisation chart",
    "Example organisational structure with connected management levels.",
    "Look at reporting lines and identify the chain of command. Compare the diagram with a company that has fewer or more reporting layers.",
    "MovGP0",PD,"Example structure, not a model of every Caribbean workplace.")],
  "S6.3":[ref("Marketing Mix 4P.svg","The four Ps of marketing",
    "Illustrated four pillars of the marketing mix: product, price, place and promotion.",
    "Name each P and describe one decision the owner of a Jamaican snack company would make in that area.",
    "Jorgetarlea",BYSA4)],
  "S7.1":[ref("Supply chain.svg","From supplier to customer",
    "Flow chart showing upstream suppliers, manufacturer, wholesaler and customer with directional arrows.",
    "Trace the goods, money and information flows. Consider where delays or poor records can prevent customers from receiving products.",
    "Maly LOLek",BYSA3,
    "General supply-chain model. Actual Caribbean channels may include retailers, logistics contractors and direct online sales.")],
});
export const POB_MEDIA_OBJECTIVE_CODES=Object.freeze(Object.keys(POB_MEDIA_BY_OBJECTIVE));
export function pobMediaForTopic(topic){
  const ids=topic?.metadata?.syllabus?.objectiveCodes||[];
  return [...new Map(ids.flatMap(id=>POB_MEDIA_BY_OBJECTIVE[id]||[]).map(x=>[x.file,x])).values()];
}
