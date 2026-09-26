begin;

-- CSEC Integrated Science objective 3.6.7
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t6-7-soap-detergents',
  'module-3-environment',
  '3.6.7 Soap and Soapless Detergents',
  'Distinguish soap from soapless detergents by manufacture, cleaning action, hard-water behaviour, biodegradability and environmental effects.',
  930,
  true,
  '{
    "syllabus":{"module":3,"topic":"Household Chemicals","objective":"3.6.7","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain how soap is made from fats or oils and an alkali.",
        "Explain the cleaning action of surfactants on grease.",
        "Explain why soap forms scum in hard water.",
        "Explain why soapless detergents work better than soap in hard water.",
        "Compare the feedstocks used for soap and synthetic detergents.",
        "Compare biodegradability and environmental effects carefully.",
        "Explain how phosphate-containing detergents can contribute to eutrophication.",
        "Discuss possible skin irritation from some detergent formulations."
      ],
      "introduction":"Soap and soapless detergents both contain surfactants that help water remove oily dirt. They differ in manufacture, behaviour in hard water and environmental properties.",
      "sections":[
        {"title":"Making soap","paragraphs":[
          "Soap is made by heating animal fats or vegetable oils with an alkali such as sodium hydroxide.",
          "This reaction is called saponification.",
          "A simplified word equation is fats or oils + sodium hydroxide → soap + glycerol."
        ]},
        {"title":"How soaps and detergents clean","paragraphs":[
          "Soap and synthetic detergent molecules act as surfactants.",
          "Each molecule has a part that interacts strongly with water and a part that interacts with oils and grease.",
          "The surfactant molecules surround grease droplets and help disperse them through the wash water so they can be rinsed away."
        ]},
        {"title":"Soap in hard water","paragraphs":[
          "Hard water contains calcium and magnesium ions.",
          "Soap reacts with these ions to form insoluble calcium and magnesium salts called scum.",
          "Scum wastes soap, leaves deposits and reduces lather."
        ]},
        {"title":"Soapless detergents in hard water","paragraphs":[
          "Synthetic soapless detergents are formulated so that their calcium and magnesium salts remain much more soluble.",
          "They therefore lather and clean more effectively than soap in hard water."
        ]},
        {"title":"Sources of soap and detergents","paragraphs":[
          "Soap is commonly made from animal fats or vegetable oils.",
          "Many conventional synthetic detergents use surfactants derived from petrochemical feedstocks.",
          "However, not every modern synthetic detergent is made only from petroleum products; some formulations use partly or fully bio-based surfactants."
        ]},
        {"title":"Biodegradability","paragraphs":[
          "Soap is generally readily biodegradable under suitable environmental conditions.",
          "Older school comparisons sometimes describe soapless detergents as non-biodegradable, but this is too broad for modern products.",
          "Many modern synthetic surfactants are designed to biodegrade, while environmental impact depends on the actual surfactants, builders, additives, concentration and use."
        ]},
        {"title":"Phosphates and eutrophication","paragraphs":[
          "Some detergent formulations have used phosphate builders.",
          "If excessive phosphate enters rivers or lakes, it can act as a nutrient and stimulate excessive algal growth.",
          "When large amounts of algae die, microbial decomposition can consume dissolved oxygen and harm fish and other aquatic organisms.",
          "Not every modern detergent contains phosphate, so the product formulation must be checked rather than assuming all soapless detergents cause this problem."
        ]},
        {"title":"Skin and household use","paragraphs":[
          "Some strong detergent formulations can remove natural skin oils or contain fragrances and additives that irritate sensitive skin.",
          "Soap can also dry or irritate skin when used excessively.",
          "Use products designed for the intended purpose and follow label directions."
        ]},
        {"title":"Comparing soap and soapless detergents","paragraphs":[
          "Soap is often made from fats or oils, is generally readily biodegradable, but forms scum in hard water.",
          "Synthetic detergents usually perform better in hard water and can be formulated for many specialised cleaning tasks.",
          "Their environmental and skin effects vary with formulation, so these properties should not be generalised to every detergent."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t6-7-soap-detergents","type":"soap-detergents","title":"Soap and soapless detergent comparison explorer"}],
      "keyPoints":[
        "Soap is made by saponifying fats or oils with an alkali such as sodium hydroxide.",
        "Soap and soapless detergents are surfactants that help disperse grease.",
        "Soap forms scum with calcium and magnesium ions in hard water.",
        "Soapless detergents generally work better in hard water.",
        "Many conventional synthetic detergents use petrochemical-derived surfactants, but modern feedstocks vary.",
        "Soap is generally readily biodegradable.",
        "Many modern synthetic detergents are also formulated to biodegrade.",
        "Excess phosphate can contribute to eutrophication.",
        "Not every modern detergent contains phosphate."
      ],
      "workedExample":{
        "title":"Washing in hard water",
        "prompt":"A household finds that soap gives little lather and leaves scum. Explain why a soapless detergent may work better.",
        "steps":[
          "The water contains calcium and magnesium ions.",
          "Soap reacts with these ions and forms insoluble scum.",
          "This removes soap molecules from the cleaning process.",
          "Soapless detergents form much more soluble calcium and magnesium salts, so they remain effective."
        ],
        "answer":"Soapless detergent works better because it does not form the same insoluble scum with calcium and magnesium ions."
      },
      "checks":[
        {"prompt":"How is soap made?","answer":"By reacting fats or oils with an alkali such as sodium hydroxide.","explanation":"The reaction is called saponification."},
        {"prompt":"Why does soap form scum in hard water?","answer":"It forms insoluble salts with calcium and magnesium ions.","explanation":"This reduces lather and wastes soap."},
        {"prompt":"Why do soapless detergents work better in hard water?","answer":"Their calcium and magnesium salts remain much more soluble.","explanation":"They continue to act as surfactants instead of precipitating as scum."},
        {"prompt":"How can phosphate in detergent contribute to water pollution?","answer":"It can stimulate excessive algal growth and contribute to eutrophication.","explanation":"Decomposition of excess algae can reduce dissolved oxygen."},
        {"prompt":"Are all modern soapless detergents non-biodegradable and phosphate-containing?","answer":"No.","explanation":"Modern formulations vary, and many are designed to biodegrade and may be phosphate-free."}
      ],
      "summary":"Soap and soapless detergents both remove grease through surfactant action. Hard-water behaviour is a major difference, while biodegradability and environmental effects depend on the actual formulation."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":93,"objectivesBuilt":93}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
