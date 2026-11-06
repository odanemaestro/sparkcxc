import { HISTORY_THEMES, HISTORY_REVISED_THEMES } from "./historyCourse";

const part = (marks, prompt, guidance) => ({ marks, prompt, guidance });
const essay = (prompt, guidance) => [part(25, prompt, guidance)];

// Paper 2 review guidance is written for the question. It gives evidence to
// consider, without claiming to be an official scheme or a final mark.
const amended = [
  [
    part(4, "Identify TWO ways Taíno communities used the land or sea to obtain food.", "Examples include cultivating cassava and fishing. Name two distinct activities."),
    part(9, "Describe THREE features of Taíno leadership or ceremonial life.", "Describe a cacique’s authority, the use of zemí figures in ceremonies, and the role of specialists or collective gatherings. Give a detail for each feature."),
    part(12, "Explain THREE ways Spanish settlement changed Indigenous life in Hispaniola.", "Connect forced tribute or work to time away from farming, displacement to loss of land and autonomy, and epidemics interacting with hunger and violence to population decline."),
  ],
  [
    part(4, "Identify TWO American crops adopted by Europeans.", "Maize and cassava are distinct examples. Other accurately identified American crops can be relevant."),
    part(9, "Describe THREE factors that influenced Columbus’s first voyage.", "Describe the aim of a western route to Asian markets, Crown support tied to imperial competition, and opportunities for wealth, prestige or conversion. Distinguish motives from later events."),
    part(12, "Explain THREE ways Indigenous knowledge or labour shaped early European settlement.", "Link local crops and food preparation to survival, navigation or geographical knowledge to movement, and demanded labour to mining or agriculture. Explain each effect in context."),
  ],
  [
    part(4, "State TWO reasons why sugar became attractive to investors in Barbados.", "High demand and access to investment or credit are distinct reasons. Tobacco competition can also be explained."),
    part(9, "Describe THREE stages of manufacturing sugar from harvested cane.", "Explain crushing for juice, clarifying and boiling to concentrate it, and crystallising or curing the sugar. Do not confuse rum distillation with sugar manufacture."),
    part(12, "Explain THREE changes that the spread of sugar estates brought to Barbados.", "Link costly mills to land consolidation, labour demand to increased chattel enslavement and demographic change, and wealth to planters’ political influence."),
  ],
  [
    part(4, "Identify TWO occupations on a sugar estate besides cutting cane.", "Boiler, cooper, carpenter, driver or mill worker are examples. Give distinct roles."),
    part(9, "Describe THREE ways law or estate management controlled enslaved workers.", "Describe travel restrictions or passes, supervision and punishment, and law governing status or ownership. Show how each operated."),
    part(12, "Explain THREE ways enslaved people sustained family, community or cultural life under plantation slavery.", "Use specific examples such as trading provision-ground produce, passing on religious or musical practices, and maintaining kin networks despite separation. Explain how each supported survival or autonomy."),
  ],
  [
    part(4, "Identify TWO forms of resistance that did not require an organised uprising.", "Examples include slowing work, breaking tools, short-term flight and preserving practices that authorities tried to suppress."),
    part(9, "Describe THREE ways Jamaican Maroons defended their communities.", "Explain how terrain, intelligence networks or ambushes and the organisation of settlement supported defence. Distinguish tactics from results."),
    part(12, "Explain THREE effects of major revolts on slavery and emancipation in the British Caribbean.", "Discuss repression in the short term, disruption and expense for colonial authorities, and evidence that strengthened abolitionist pressure. Anchor your points in named revolts."),
  ],
  [
    part(4, "Identify TWO groups with competing interests in Saint-Domingue before 1791.", "Examples include wealthy white planters, poorer whites, free people of colour and enslaved people."),
    part(9, "Describe THREE developments in the Haitian Revolution between 1791 and 1804.", "Use a sequence such as the 1791 uprising, France’s abolition in 1794, and resistance to the 1802 expedition ending in independence in 1804. Explain what changed at each stage."),
    part(12, "Explain THREE reasons why French rule could not be re-established in Saint-Domingue.", "Link revolutionary organisation, resistance to renewed slavery, and French losses including disease to the failure of the expedition. Explain how the factors reinforced one another."),
  ],
  essay("Assess how resistance in the Caribbean and abolition campaigns in Britain influenced the passage of the Slavery Abolition Act in 1833.", "Set up a judgement about how the pressures worked together. Compare named revolts, such as the Baptist War, with abolitionist testimony, petitions and parliamentary action. Explain why the 1807 slave-trade ban did not settle the question of slavery, then weigh the importance of the two pressures."),
  essay("Assess the extent to which British apprenticeship changed the lives of formerly enslaved people between 1834 and 1838.", "Distinguish changes in legal status from everyday control. Discuss compulsory hours, access to earnings, stipendiary magistrates, punishment and planter compensation. Use Antigua as a comparison if it helps and make a judgement about the limits of change."),
  essay("Compare the reasons why freed families sought independent land and why planters sought indentured labour after emancipation.", "Compare the aims directly. Explain autonomy, earnings, housing and village institutions for freed families, and the aims of securing labour and limiting wage pressure for estates. Use evidence from named territories such as Jamaica, Barbados, Trinidad or British Guiana."),
  essay("Assess the social and economic effects of indentured migration in two British Caribbean territories.", "Compare two named territories on estate labour, wages or production and on longer-term community formation. Discuss recruitment, contracts and restrictions. Use evidence of religious institutions, businesses or landholding without treating all migrant groups as identical."),
  essay("Explain why some British Caribbean sugar producers struggled to compete in the late nineteenth century and assess their responses.", "Connect price pressure from competing sugar, trade policy, costs and uneven access to capital. Assess measures such as central factories, technological improvements, crop diversification or market arrangements. Explain who benefited and why the outcomes varied."),
  essay("Assess how the growth of extractive industries and tourism changed employment and economic dependence in the twentieth-century Caribbean.", "Use named examples, such as bauxite in Jamaica, petroleum in Trinidad or tourism in Barbados. Compare the kinds of jobs, skills and revenue each created. Weigh new opportunities against dependence on foreign investment, imported supplies and global markets."),
  essay("Assess the relative importance of commerce and strategic security in US involvement in Cuba and Panama between 1898 and 1914.", "Use Puerto Rico only as context if needed. Compare Cuban intervention and the Platt Amendment with Panama’s separation, the Canal Zone and the canal’s opening. Link each decision to trade and military strategy and make a comparative judgement."),
  essay("Compare the aims and consequences of United States occupation in Haiti and the Dominican Republic in the early twentieth century.", "Use accurate occupation dates and discuss stated aims, debt or customs control, military and administrative changes, and resistance. Explain a similarity and a difference using the same criteria for both countries."),
  essay("Explain how the labour protests of the 1930s contributed to political change in two British Caribbean territories.", "Compare named protests in Jamaica and Trinidad or another relevant territory. Link conditions and mobilisation to union growth, investigations and later electoral or party developments. Distinguish the protests’ immediate results from later constitutional change."),
  essay("Assess why the West Indies Federation dissolved in 1962 and how later regional cooperation responded to those problems.", "Consider power, funding, movement and conflicting national priorities, including Jamaica’s referendum. Distinguish the Federation’s political aims from CARIFTA and CARICOM. Explain which challenges persisted under a different form of cooperation."),
  essay("Assess how migration changed family and community life in the twentieth-century Caribbean.", "Explain why people moved within the region, to urban centres or overseas. Consider remittances, caregiving, housing, skills and new communities. Compare examples and explain why the effects could differ across households."),
  essay("Explain how Caribbean religious or cultural organisations shaped social life in two territories between 1900 and 1985.", "Choose specific organisations or traditions, such as the UNIA, Rastafari, Spiritual Baptists, or Hindu associations. Explain origins and activities, then connect them to identity, mutual support, social status or political participation."),
];

const revised = [
  amended[3],
  amended[5],
  essay("Use the source and your own knowledge to assess how far apprenticeship represented a break with slavery in the British Caribbean.",
    "Use evidence from the source about continuing labour and magistrates. Explain who created the source and why that limits what it reveals about workers’ lives. Bring in compensation, workers’ available time and the end of apprenticeship in 1838. Reach a supported judgement."),
  essay("Use the source and your own knowledge to assess the significance of land ownership to freed people in the decades after emancipation.",
    "Link pooled savings and collective purchase to a practical change in bargaining power. Compare land availability in named colonies and consider schools, markets and livelihoods. Acknowledge the source’s limits before reaching a judgement."),
  amended[12],
  amended[15],
];

const sources = {
  3: "SPARK teaching summary based on a Barbados governor’s proclamation (1834). Apprentices were expected to perform labour for former owners for a specified part of the week. Stipendiary magistrates were appointed to deal with disputes. Remaining time could be used to earn money independently.",
  4: "SPARK teaching summary of the settlement of Victoria, British Guiana (1839). Formerly enslaved people combined their resources to buy Plantation Northbrook. Owning the land gave the new settlers a place to live and cultivate outside the arrangements of a planter-owned estate.",
};

function paper(id, title, bank, themes, questionsPerSection, themeFor) {
  return {
    id, title, paper: 2, duration: 120,
    questions: bank.map((parts, index) => {
      const number = index + 1;
      return {
        id: `q${number}`, number,
        group: Math.floor(index / questionsPerSection) + 1,
        title: themes[themeFor(index)],
        source: id.endsWith("2028") ? sources[number] : undefined,
        parts: parts.map((item, i) => ({ ...item, id: `q${number}-${String.fromCharCode(97 + i)}` })),
      };
    }),
  };
}

export const HISTORY_PAPER2S = [
  paper("ch-practice-paper-2-2027", "SPARK Paper 2 · Through 2027", amended, HISTORY_THEMES, 6, index => Math.floor(index / 2)),
  paper("ch-practice-paper-2-2028", "SPARK Paper 2 · From 2028", revised, HISTORY_REVISED_THEMES, 2, index => index),
];
