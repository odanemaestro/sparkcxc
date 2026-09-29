begin;

-- CSEC Integrated Science objective 1.7.10
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t7-10-food-contamination',
  'module-1-organisms-life-processes',
  '1.7.10 Food Contamination',
  'Distinguish physical, chemical and biological food contaminants and explain practical ways to prevent contamination and cross-contamination.',
  390,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Health",
      "objective":"1.7.10",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Distinguish physical, chemical and biological food contaminants.",
        "Classify selected examples of each contaminant type.",
        "Explain how undercooked poultry can transmit Salmonella.",
        "Explain cross-contamination between raw and ready-to-eat foods.",
        "Describe the health risk associated with aflatoxins in mouldy food.",
        "Recommend suitable hygiene and food-handling practices."
      ],
      "introduction":"Food contamination occurs when unwanted physical objects, harmful chemicals or biological agents enter food. The type of contaminant matters because prevention depends on where the hazard comes from and how it reaches the food.",
      "sections":[
        {
          "title":"Physical contaminants",
          "paragraphs":[
            "Physical contaminants are unwanted objects in food. Glass, hair and metal fragments are CSEC examples.",
            "They may enter food during processing, preparation, packaging or poor handling and can cause injury as well as making the food unacceptable."
          ]
        },
        {
          "title":"Chemical contaminants",
          "paragraphs":[
            "Chemical contaminants include cleaning chemicals, excessive pesticide residues and environmental pollutants such as mercury.",
            "Cleaning products and pesticides should be stored, labelled and used so that they cannot contact food. Produce should be washed under clean running water before use where appropriate."
          ]
        },
        {
          "title":"Biological contaminants",
          "paragraphs":[
            "Biological contamination includes disease-causing bacteria, viruses, parasites and some fungi or their products.",
            "Salmonella on raw or undercooked poultry is a major example. Adequate cooking destroys the bacteria, while poor handling can spread them to hands, boards, utensils and other foods."
          ]
        },
        {
          "title":"Cross-contamination",
          "paragraphs":[
            "Cross-contamination occurs when a contaminant is transferred from one food, surface or object to another. A common example is using the same unwashed chopping board for raw chicken and a salad.",
            "Separate boards or thoroughly cleaned and sanitised equipment should be used between raw meat and ready-to-eat food. Raw meat should also be stored so that juices cannot drip onto other foods."
          ]
        },
        {
          "title":"Washing fruits and vegetables",
          "paragraphs":[
            "Washing produce under clean running water removes soil and can reduce some surface microorganisms and pesticide residues.",
            "Washing does not guarantee removal of every chemical residue or pathogen, so safe agricultural practice, clean water, suitable storage and proper preparation still matter."
          ]
        },
        {
          "title":"Mould and aflatoxins",
          "paragraphs":[
            "Some Aspergillus moulds can produce aflatoxins in susceptible foods such as peanuts and maize when storage conditions are poor.",
            "Aflatoxins are toxic and can damage the liver. Long-term exposure also increases the risk of liver cancer.",
            "Visible mould is a warning sign. Removing only the visible mould does not prove the rest of the food is safe because toxins may extend beyond the part that can be seen."
          ]
        },
        {
          "title":"Food-handler hygiene",
          "paragraphs":[
            "Food handlers should wash hands, keep fingernails and clothing clean, cover food and keep preparation surfaces and utensils clean.",
            "Hair restraints where appropriate, safe raw-food separation and correct waste disposal reduce contamination. A person with vomiting or diarrhoea should not prepare food for others while ill."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t7-10-food-contamination",
          "type":"food-contamination",
          "title":"Food contamination and cross-contamination explorer"
        }
      ],
      "keyPoints":[
        "Glass, hair and metal are physical contaminants.",
        "Cleaning chemicals, pesticide residues and mercury are chemical contaminants.",
        "Salmonella and other disease-causing microorganisms are biological contaminants.",
        "Undercooked poultry can transmit Salmonella.",
        "Separate raw meat from ready-to-eat food to prevent cross-contamination.",
        "Washing produce can reduce some surface microorganisms and residues but does not remove every hazard.",
        "Some moulds produce aflatoxins that can damage the liver.",
        "Good food-handler hygiene reduces contamination before food reaches the consumer."
      ],
      "workedExample":{
        "title":"Classifying and preventing cross-contamination",
        "prompt":"A cook cuts raw chicken on a board, then uses the same unwashed board to cut lettuce. Identify the hazard and state two ways to reduce the risk.",
        "steps":[
          "Raw chicken can carry biological contaminants such as Salmonella.",
          "The unwashed board can transfer the bacteria to the lettuce.",
          "The lettuce may be eaten without further cooking.",
          "Use a separate board or wash and sanitise the board before preparing the lettuce.",
          "Wash hands and utensils after handling raw chicken."
        ],
        "answer":"The main hazard is biological cross-contamination. Separate raw and ready-to-eat foods and clean hands, boards and utensils between tasks."
      },
      "checks":[
        {
          "prompt":"Classify a piece of glass found in food.",
          "answer":"Physical contaminant.",
          "explanation":"It is a foreign object rather than a chemical or microorganism."
        },
        {
          "prompt":"Why should separate chopping boards be used for raw chicken and salad?",
          "answer":"To prevent bacteria from raw chicken being transferred to salad that may not be cooked before eating.",
          "explanation":"This breaks a common cross-contamination route."
        },
        {
          "prompt":"Why is mouldy peanut food potentially dangerous?",
          "answer":"Some moulds can produce aflatoxins that damage the liver and increase long-term cancer risk.",
          "explanation":"The hazard is not limited to the visible mould."
        },
        {
          "prompt":"State two practices a food handler can use to reduce contamination.",
          "answer":"Examples include hand washing, covering food, separating raw and ready-to-eat food, cleaning surfaces and utensils, and keeping clothing and hair controlled.",
          "explanation":"Each practice blocks a route by which contaminants can enter food."
        }
      ],
      "summary":"Food safety starts by identifying whether the hazard is physical, chemical or biological. Then control the route into the food through separation, cleaning, suitable storage, safe cooking and good personal hygiene."
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
  || '{"topicsBuilt":39,"objectivesBuilt":39}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
