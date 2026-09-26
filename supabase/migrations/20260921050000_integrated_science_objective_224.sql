begin;

-- CSEC Integrated Science objective 2.2.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t2-4-respiration-energy',
  'module-2-energy',
  '2.2.4 Respiration and Energy',
  'Evaluate the importance of respiration in releasing energy for living processes, including aerobic respiration, ATP, food-energy values and experimental evidence.',
  490,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Energy in Life Processes",
      "objective":"2.2.4",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define respiration as the release of energy from food in living cells.",
        "Distinguish respiration from breathing.",
        "State the word and balanced equations for aerobic respiration.",
        "Identify mitochondria as the main site of aerobic respiration.",
        "Explain the role of ATP in transferring usable energy in cells.",
        "Relate respiration to muscle contraction, active transport, growth and heat production.",
        "Compare the approximate energy released per gram from carbohydrate, protein and fat.",
        "Interpret experiments that show carbon dioxide production and heat release during respiration."
      ],
      "introduction":"Respiration is the series of chemical reactions through which living cells release energy from food. It occurs in all living cells, day and night. Breathing is different because breathing only moves air into and out of the lungs.",
      "sections":[
        {
          "title":"Aerobic respiration",
          "paragraphs":[
            "Aerobic respiration uses oxygen to release energy from glucose. It takes place mainly in mitochondria.",
            "The word equation is glucose + oxygen → carbon dioxide + water + energy.",
            "The balanced chemical equation is C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy."
          ]
        },
        {
          "title":"ATP and energy transfer",
          "paragraphs":[
            "Cells transfer much of the usable energy released during respiration through ATP.",
            "ATP supplies energy for processes such as muscle contraction, active transport, synthesis of new cell material and many other cellular reactions."
          ]
        },
        {
          "title":"Energy for living processes",
          "paragraphs":[
            "Muscle cells require energy for contraction. Cell membranes require energy for active transport. Growing and repairing tissues require energy for synthesis.",
            "Some energy released during respiration is transferred to the surroundings as heat. In mammals, this contributes to maintenance of body temperature."
          ]
        },
        {
          "title":"Respiration occurs in all living cells",
          "paragraphs":[
            "Plants as well as animals respire. Respiration continues during the day and night because living cells continuously need energy.",
            "Do not confuse respiration with photosynthesis. Photosynthesis stores light energy in organic molecules, while respiration releases usable energy from food molecules."
          ]
        },
        {
          "title":"Energy from different foods",
          "paragraphs":[
            "Fat releases about 38 kJ per gram when metabolised, while carbohydrate and protein each provide about 17 kJ per gram in the bank values.",
            "This is why fat is described as a more concentrated energy source than carbohydrate or protein."
          ]
        },
        {
          "title":"Evidence from carbon dioxide",
          "paragraphs":[
            "Germinating seeds respire and release carbon dioxide. Gas from a flask of germinating seeds can turn limewater milky.",
            "A matching flask containing boiled, dead seeds acts as a control because the dead seeds do not respire.",
            "Living woodlice can also increase carbon dioxide concentration. In the bank example, red bicarbonate indicator turns yellow as carbon dioxide rises."
          ]
        },
        {
          "title":"Evidence from heat release",
          "paragraphs":[
            "Germinating seeds placed in an insulated flask can cause the temperature to rise.",
            "The temperature rise provides evidence that some of the chemical energy released during respiration is transferred as heat."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t2-4-respiration-energy",
          "type":"respiration-importance",
          "title":"Respiration, ATP and experimental-evidence explorer"
        }
      ],
      "keyPoints":[
        "Respiration releases energy from food in living cells.",
        "Breathing is not the same as respiration.",
        "Aerobic respiration takes place mainly in mitochondria.",
        "Glucose + oxygen → carbon dioxide + water + energy.",
        "ATP transfers usable energy within cells.",
        "Energy from respiration supports muscle contraction and active transport.",
        "Fat provides about 38 kJ/g, compared with about 17 kJ/g for carbohydrate or protein in the bank values.",
        "Carbon dioxide and heat release can be used as evidence that respiration is occurring.",
        "Boiled seeds provide a non-respiring control."
      ],
      "workedExample":{
        "title":"Using a control in a seed-respiration experiment",
        "prompt":"Germinating seeds in flask A are connected to limewater. Flask B contains boiled seeds. Explain why flask B is needed.",
        "steps":[
          "The germinating seeds in flask A are alive and respire.",
          "The boiled seeds in flask B are dead and do not respire.",
          "Both flasks otherwise experience similar conditions.",
          "A change seen only with flask A supports the conclusion that respiration by living seeds caused the change."
        ],
        "answer":"Flask B is the control. Its dead seeds do not respire, so it shows whether the change in flask A was caused by respiration in living seeds."
      },
      "checks":[
        {
          "prompt":"Where does aerobic respiration take place mainly in a cell?",
          "answer":"In the mitochondria.",
          "explanation":"Mitochondria contain the machinery for aerobic respiration."
        },
        {
          "prompt":"State the word equation for aerobic respiration.",
          "answer":"Glucose + oxygen → carbon dioxide + water + energy.",
          "explanation":"Oxygen allows much more energy to be released from glucose than anaerobic respiration."
        },
        {
          "prompt":"Name two processes that need energy from respiration.",
          "answer":"Examples include muscle contraction and active transport.",
          "explanation":"Growth, repair and maintenance of body temperature also require or involve released energy."
        },
        {
          "prompt":"What does milky limewater show in a respiration experiment?",
          "answer":"Carbon dioxide has been produced.",
          "explanation":"Carbon dioxide reacts with limewater to form a cloudy precipitate."
        },
        {
          "prompt":"Why does the temperature rise in a flask of germinating seeds?",
          "answer":"Respiration releases energy, some of which is transferred as heat.",
          "explanation":"The insulated flask helps the temperature change become measurable."
        }
      ],
      "summary":"Respiration is a cellular energy-releasing process. Aerobic respiration in mitochondria transfers energy from glucose into forms such as ATP that cells use for movement, transport, synthesis and other life processes."
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
  || '{"topicsBuilt":49,"objectivesBuilt":49}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
