begin;

-- CSEC Integrated Science objective 2.2.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t2-1-food-energy-nutrition',
  'module-2-energy',
  '2.2.1 Food as a Source of Energy',
  'Examine food as a source of energy and nutrients, including balanced diet, Caribbean food groups, energy needs, deficiency conditions, food labels and practical food tests.',
  460,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Energy in Life Processes",
      "objective":"2.2.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify carbohydrates as the main dietary source of energy.",
        "Describe the functions and common sources of proteins, fats, vitamins, minerals, fibre and water.",
        "Relate Caribbean food groups to familiar foods.",
        "Explain the meaning of a balanced diet.",
        "Relate selected nutrient deficiencies to their effects.",
        "Explain why energy and nutrient needs vary with age, activity, growth and pregnancy.",
        "Calculate energy in a serving from a food label.",
        "Carry out and interpret standard tests for starch, reducing sugar, protein and fat."
      ],
      "introduction":"Food provides chemical energy and the materials needed for growth, repair and normal body function. Carbohydrates are the main source of energy in the diet, but good nutrition depends on a balanced intake of all required nutrients, fibre and water.",
      "sections":[
        {
          "title":"Carbohydrates and food energy",
          "paragraphs":[
            "Carbohydrates such as starch and sugars are the main dietary source of energy. Caribbean staples such as rice, bread, yam, green banana and breadfruit are important starchy foods.",
            "If energy intake repeatedly exceeds the energy used by the body, much of the excess is stored as fat. This can contribute to overweight and obesity."
          ]
        },
        {
          "title":"Protein and fat",
          "paragraphs":[
            "Protein provides amino acids needed for growth and repair of body tissues. Good sources include legumes such as red peas and beans as well as fish, eggs, meat and milk.",
            "Fat is a concentrated source and store of energy and also helps with insulation. A healthy diet requires appropriate amounts rather than excessive intake."
          ]
        },
        {
          "title":"Vitamins and minerals",
          "paragraphs":[
            "Vitamin A supports normal vision, including vision in dim light. Vitamin C supports healthy connective tissue and wound healing. Vitamin D supports calcium absorption and normal bone mineralisation. Vitamin B₁₂ is needed for normal red blood cell formation.",
            "Iron is needed to make haemoglobin. Calcium supports strong bones and teeth and also has roles in muscle and nerve function. Iodine is needed by the thyroid gland to make thyroid hormones including thyroxine."
          ]
        },
        {
          "title":"Fibre and water",
          "paragraphs":[
            "Dietary fibre adds bulk to intestinal contents and supports movement through the gut, helping to reduce constipation.",
            "Water acts as a solvent and transport medium and helps regulate body temperature. Water does not provide food energy."
          ]
        },
        {
          "title":"Balanced diet and Caribbean food groups",
          "paragraphs":[
            "A balanced diet provides carbohydrates, proteins, fats, vitamins, minerals, fibre and water in suitable proportions for the individual.",
            "Common Caribbean food-group examples include staples, legumes, food from animals, vegetables, fruits, and fats and oils.",
            "MSG is used as a flavour enhancer. Artificial sweeteners are used to provide sweetness with little or no food energy compared with sugar."
          ]
        },
        {
          "title":"Deficiency and excess",
          "paragraphs":[
            "Severe vitamin C deficiency causes scurvy, vitamin D deficiency in children can cause rickets, iodine deficiency can cause goitre, and iron deficiency can lead to iron-deficiency anaemia.",
            "Vitamin A deficiency can impair vision in dim light. Vitamin B₁₂ deficiency can cause anaemia.",
            "Kwashiorkor is associated with severe protein deficiency within protein-energy malnutrition, while marasmus involves severe deficiency of energy and protein with marked wasting.",
            "A high sodium intake is associated with increased blood pressure."
          ]
        },
        {
          "title":"Energy needs",
          "paragraphs":[
            "Energy needs vary with factors such as body size, age, sex, growth and physical activity. A construction worker doing heavy manual labour generally requires more daily energy than a sedentary office worker of similar size.",
            "Growing teenagers need sufficient protein to build new tissues. Pregnancy increases requirements for several nutrients, including iron, because maternal blood volume expands and the developing baby also requires nutrients."
          ]
        },
        {
          "title":"Reading a food label",
          "paragraphs":[
            "If a food label states 1 500 kJ per 100 g, a 40 g serving provides 1 500 × 40 ÷ 100 = 600 kJ.",
            "Always match the amount eaten with the reference amount on the label before calculating total energy."
          ]
        },
        {
          "title":"Food tests",
          "paragraphs":[
            "Starch is tested with iodine solution. A positive result is blue-black.",
            "Reducing sugar is tested by heating the sample with Benedict''s solution in a hot-water bath. A positive result changes from blue towards green, yellow, orange or brick-red depending on the amount of reducing sugar.",
            "Protein is tested using Biuret reagent. A positive result is purple or lilac.",
            "Fat can be detected using a grease-spot test on brown paper. A persistent translucent spot indicates fat."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t2-1-food-energy",
          "type":"food-energy-nutrition",
          "title":"Food energy, nutrition and food-test explorer"
        }
      ],
      "keyPoints":[
        "Carbohydrates are the main source of energy in the diet.",
        "Protein is needed mainly for growth and repair.",
        "A balanced diet contains all required nutrients in suitable proportions.",
        "Vitamin C deficiency causes scurvy.",
        "Vitamin D deficiency in children can cause rickets.",
        "Iron is needed for haemoglobin.",
        "Iodine is needed to make thyroid hormones including thyroxine.",
        "Fibre supports movement through the intestine.",
        "Food energy can be calculated from serving size and label values.",
        "Iodine, Benedict''s, Biuret and grease-spot tests identify selected food substances."
      ],
      "workedExample":{
        "title":"Calculating energy from a food label",
        "prompt":"A food contains 1 500 kJ per 100 g. Calculate the energy in a 40 g serving.",
        "steps":[
          "Energy per 100 g = 1 500 kJ.",
          "The serving is 40 g, which is 40 ÷ 100 of the reference amount.",
          "Energy = 1 500 × 40 ÷ 100.",
          "Energy = 600 kJ."
        ],
        "answer":"The 40 g serving provides 600 kJ."
      },
      "checks":[
        {
          "prompt":"Which nutrient is the main source of energy in the diet?",
          "answer":"Carbohydrate.",
          "explanation":"Starch and sugars are major dietary energy sources."
        },
        {
          "prompt":"Why do growing teenagers need protein?",
          "answer":"They need amino acids to build new tissues during growth.",
          "explanation":"Protein supports growth and repair."
        },
        {
          "prompt":"Which mineral is needed to make haemoglobin?",
          "answer":"Iron.",
          "explanation":"Iron deficiency can reduce haemoglobin production and lead to anaemia."
        },
        {
          "prompt":"What result shows reducing sugar in a Benedict''s test?",
          "answer":"A colour change from blue towards green, yellow, orange or brick-red after heating.",
          "explanation":"A stronger positive result generally produces more orange or brick-red precipitate."
        },
        {
          "prompt":"What does a purple Biuret result show?",
          "answer":"Protein is present.",
          "explanation":"Biuret reagent changes to purple or lilac in the presence of protein."
        }
      ],
      "summary":"Food supplies chemical energy and essential nutrients. Use local food examples, deficiency links, serving-size calculations and practical food tests to connect diet with energy and body function."
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
  || '{"topicsBuilt":46,"objectivesBuilt":46}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
