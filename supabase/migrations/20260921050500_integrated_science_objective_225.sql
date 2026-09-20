begin;

-- CSEC Integrated Science objective 2.2.5
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t2-5-aerobic-anaerobic',
  'module-2-energy',
  '2.2.5 Aerobic and Anaerobic Respiration',
  'Distinguish aerobic from anaerobic respiration in terms of oxygen use, products, energy yield and examples in yeast and human muscle.',
  500,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Energy in Life Processes",
      "objective":"2.2.5",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Compare aerobic and anaerobic respiration.",
        "State the anaerobic respiration equation used for yeast.",
        "State the CSEC anaerobic respiration equation used for human muscle.",
        "Explain why anaerobic respiration releases less energy than aerobic respiration.",
        "Relate yeast fermentation to bread-making and brewing.",
        "Explain why breathing remains deep after vigorous exercise.",
        "Interpret a simple yeast-fermentation investigation.",
        "Use the bank energy values to compare aerobic and anaerobic yield."
      ],
      "introduction":"Anaerobic respiration releases energy from glucose without oxygen. Because glucose is only partly broken down, anaerobic respiration releases much less energy than aerobic respiration. The products depend on the organism.",
      "sections":[
        {
          "title":"Aerobic compared with anaerobic respiration",
          "paragraphs":[
            "Aerobic respiration requires oxygen and releases much more energy from each glucose molecule because the glucose is broken down more completely.",
            "Anaerobic respiration does not require oxygen. It releases less energy because breakdown of glucose is incomplete."
          ]
        },
        {
          "title":"Anaerobic respiration in yeast",
          "paragraphs":[
            "Yeast carries out fermentation when oxygen is limited. The word equation is glucose → ethanol + carbon dioxide + energy.",
            "The carbon dioxide produced by yeast can turn limewater milky."
          ]
        },
        {
          "title":"Bread-making and brewing",
          "paragraphs":[
            "In bread-making, carbon dioxide from yeast becomes trapped in the dough and makes it rise. Much of the ethanol formed is lost during baking.",
            "Brewing uses yeast fermentation to produce ethanol in alcoholic drinks."
          ]
        },
        {
          "title":"Anaerobic respiration in human muscle",
          "paragraphs":[
            "During vigorous exercise, energy demand can rise faster than oxygen-supported aerobic metabolism can meet it. Muscle cells then rely more heavily on anaerobic glycolysis.",
            "The CSEC bank uses the word equation glucose → lactic acid + energy. In modern physiology, the product in working muscle is more accurately discussed as lactate together with changes in hydrogen-ion balance."
          ]
        },
        {
          "title":"Recovery after vigorous exercise",
          "paragraphs":[
            "After intense exercise, breathing and heart rate can remain elevated while the body restores oxygen and energy stores and processes metabolites including lactate.",
            "CSEC commonly describes the extra oxygen requirement during recovery as repayment of an oxygen debt.",
            "Lactate accumulation is associated with intense exercise, but current exercise physiology does not identify lactate itself as the direct cause of exercise-associated muscle cramps."
          ]
        },
        {
          "title":"Comparing energy yield",
          "paragraphs":[
            "The bank example gives about 2 900 kJ per mole of glucose for aerobic respiration and about 210 kJ for anaerobic respiration in yeast.",
            "2 900 ÷ 210 is about 14, so the bank example shows aerobic respiration releasing roughly 14 times more energy."
          ]
        },
        {
          "title":"Investigating yeast fermentation",
          "paragraphs":[
            "A warm water bath around 35 °C provides a suitable temperature for many yeast enzymes without overheating the cells.",
            "If gas from fermenting yeast turns limewater milky, the result provides evidence that carbon dioxide is being produced."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t2-5-anaerobic-respiration",
          "type":"anaerobic-respiration",
          "title":"Aerobic and anaerobic respiration comparison"
        }
      ],
      "keyPoints":[
        "Aerobic respiration requires oxygen and releases much more energy.",
        "Anaerobic respiration does not require oxygen.",
        "Yeast: glucose → ethanol + carbon dioxide + energy.",
        "CSEC human-muscle equation: glucose → lactic acid + energy.",
        "Carbon dioxide from yeast makes bread dough rise.",
        "Brewing uses yeast fermentation to produce ethanol.",
        "Post-exercise heavy breathing supports recovery and is described by CSEC using the oxygen-debt concept.",
        "The bank energy values give about 14 times more energy from aerobic respiration than anaerobic respiration in yeast.",
        "Lactate is not treated as the direct cause of exercise-associated muscle cramps in current physiology."
      ],
      "workedExample":{
        "title":"Comparing energy yield",
        "prompt":"Aerobic respiration releases about 2 900 kJ per mole of glucose, while anaerobic respiration in yeast releases about 210 kJ. Calculate how many times more energy aerobic respiration releases.",
        "steps":[
          "Aerobic energy = 2 900 kJ.",
          "Anaerobic energy = 210 kJ.",
          "Calculate 2 900 ÷ 210.",
          "The answer is approximately 13.8, which rounds to about 14."
        ],
        "answer":"Aerobic respiration releases about 14 times more energy than the anaerobic yeast example."
      },
      "checks":[
        {
          "prompt":"What are the products of anaerobic respiration in yeast?",
          "answer":"Ethanol, carbon dioxide and energy.",
          "explanation":"This process is also called fermentation."
        },
        {
          "prompt":"Why does bread dough rise when yeast is active?",
          "answer":"Carbon dioxide gas produced by fermentation becomes trapped in the dough.",
          "explanation":"The gas bubbles expand the dough."
        },
        {
          "prompt":"Why does anaerobic respiration release less energy than aerobic respiration?",
          "answer":"Glucose is only partly broken down.",
          "explanation":"More chemical energy remains in the end products."
        },
        {
          "prompt":"Why does breathing remain deep after a sprint?",
          "answer":"Extra oxygen supports recovery, including restoring oxygen and energy stores and processing metabolites produced during intense exercise.",
          "explanation":"CSEC commonly describes this extra oxygen requirement as repayment of an oxygen debt."
        },
        {
          "prompt":"Why is a yeast fermentation water bath kept near 35 °C in the bank investigation?",
          "answer":"The warm temperature supports rapid enzyme activity without exposing the yeast to damaging high temperature.",
          "explanation":"Fermentation depends on enzyme-controlled reactions."
        }
      ],
      "summary":"Aerobic and anaerobic respiration both release energy from glucose, but they differ in oxygen requirement, products and energy yield. Always state which organism is involved before writing an anaerobic equation."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,
  title=excluded.title,
  description=excluded.description,
  sort_order=excluded.sort_order,
  enabled=excluded.enabled,
  metadata=excluded.metadata,
  updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)
  || '{"topicsBuilt":50,"objectivesBuilt":50}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
