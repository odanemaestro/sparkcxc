begin;

-- CSEC Integrated Science objective 1.7.11
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t7-11-food-microorganisms',
  'module-1-organisms-life-processes',
  '1.7.11 Microorganisms and Food',
  'Investigate conditions affecting microbial growth in food and explain selected harmful and useful roles of microorganisms in spoilage and food production.',
  400,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Health",
      "objective":"1.7.11",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "State conditions that affect the growth of microorganisms in food.",
        "Interpret the CSEC bread-mould investigation data.",
        "Interpret pH changes in milk stored at 4 °C and 30 °C.",
        "Explain why refrigeration slows food spoilage.",
        "Describe yeast fermentation in bread making.",
        "Describe selected useful roles of microorganisms in food production.",
        "Apply safe practical procedures when investigating food spoilage."
      ],
      "introduction":"Microorganisms can spoil food, cause disease or produce useful foods. Their growth depends on environmental conditions. Moisture, nutrients, temperature and pH are especially important, and oxygen requirements differ among microorganisms.",
      "sections":[
        {
          "title":"Conditions needed for microbial growth",
          "paragraphs":[
            "Microorganisms need nutrients and suitable conditions for enzyme activity and cell processes. Moisture, temperature and pH strongly influence growth.",
            "Some microorganisms require oxygen while others grow with little or no oxygen. The exact optimum conditions depend on the species."
          ]
        },
        {
          "title":"Temperature and the CSEC danger-zone idea",
          "paragraphs":[
            "Warm temperatures usually allow food-spoilage and food-poisoning microorganisms to grow faster than refrigeration temperatures.",
            "The CSEC question bank uses 5 °C to 60 °C as a practical food-temperature danger-zone range. This is a useful exam convention for recognising temperatures at which many bacteria can multiply rapidly."
          ]
        },
        {
          "title":"Bread-mould investigation",
          "paragraphs":[
            "The exact CSEC practical dataset compares four dishes. Dish A contains dry bread at 25 °C and shows 0% mould. Dish B contains moist bread at 25 °C and shows 65% mould. Dish C contains moist bread at 4 °C and shows 5% mould. Dish D contains moist bread with salt at 25 °C and shows 10% mould.",
            "Dish B is the moist 25 °C reference condition. Comparing A with B shows the effect of moisture. Comparing B with C shows the effect of refrigeration. Comparing B with D shows the inhibitory effect of added salt."
          ]
        },
        {
          "title":"Why refrigeration slows spoilage",
          "paragraphs":[
            "Low temperature slows enzyme-controlled reactions and microbial metabolism. Microorganisms usually reproduce more slowly, so spoilage takes longer.",
            "Refrigeration does not sterilise food and does not kill every microorganism. Growth can resume or accelerate when food warms."
          ]
        },
        {
          "title":"Milk pH investigation",
          "paragraphs":[
            "In the CSEC dataset, milk stored at 4 °C has pH values 6.7, 6.7, 6.6, 6.5 and 6.5 at 0, 12, 24, 36 and 48 hours.",
            "Milk stored at 30 °C has pH values 6.7, 6.2, 5.4, 4.8 and 4.5 at the same times. The larger fall in pH at 30 °C shows much faster acid production.",
            "Lactic acid bacteria can use lactose and produce lactic acid. As acid accumulates, the pH falls."
          ]
        },
        {
          "title":"Bread mould structures",
          "paragraphs":[
            "Bread mould grows as thread-like hyphae that spread through or over the food. A mass of hyphae forms a mycelium.",
            "Spores allow mould to reproduce and spread. Suitable moisture and temperature allow spores to germinate and hyphae to grow."
          ]
        },
        {
          "title":"Yeast and bread making",
          "paragraphs":[
            "Yeast ferments sugars in dough. Carbon dioxide produced during fermentation becomes trapped in the dough and makes it rise.",
            "The gas is the direct cause of the increased volume. Baking later sets the structure and kills the active yeast."
          ]
        },
        {
          "title":"Useful microorganisms in foods",
          "paragraphs":[
            "Selected microorganisms are used under controlled conditions to make foods and food ingredients. Bacteria and fungi contribute to products such as cheese, yoghurt, vinegar and fermented soy products.",
            "Useful fermentation is controlled microbial activity. It differs from uncontrolled spoilage because selected organisms, clean conditions and suitable processing are used to produce a desired result."
          ]
        },
        {
          "title":"Food additives that slow mould",
          "paragraphs":[
            "The CSEC bank uses calcium propionate as an example of a preservative that inhibits mould growth in bread and some baked foods.",
            "Preservatives do not replace clean handling and correct storage. They are one part of a wider food-safety system."
          ]
        },
        {
          "title":"Practical safety",
          "paragraphs":[
            "Do not taste food or milk used in a spoilage investigation. Keep samples covered and labelled, wash hands after handling them and dispose of cultures safely.",
            "When using a pH probe, rinse and clean it between samples to reduce cross-contamination and improve measurement quality."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t7-11-food-microorganisms",
          "type":"food-microorganisms",
          "title":"Microorganisms and food investigation explorer"
        }
      ],
      "keyPoints":[
        "Moisture, nutrients, suitable temperature and pH affect microbial growth.",
        "The banked bread investigation records 0%, 65%, 5% and 10% mould for dishes A to D.",
        "Refrigeration slows microbial metabolism but does not sterilise food.",
        "Milk at 30 °C falls from pH 6.7 to 4.5 in 48 hours, while milk at 4 °C changes only slightly.",
        "Lactic acid production lowers the pH of milk.",
        "Yeast fermentation releases carbon dioxide that makes bread dough rise.",
        "Hyphae form the body of mould and spores spread the fungus.",
        "Selected microorganisms are useful in controlled food fermentation."
      ],
      "workedExample":{
        "title":"Interpreting the bread-mould experiment",
        "prompt":"Dish B, moist bread at 25 °C, has 65% mould. Dish C, moist bread at 4 °C, has 5% mould. What factor is being tested and what conclusion is supported?",
        "steps":[
          "Both dishes contain moist bread.",
          "The main changed factor is temperature.",
          "Mould growth is much lower at 4 °C.",
          "The data support the conclusion that refrigeration slows mould growth."
        ],
        "answer":"Temperature is being tested. The much lower mould growth at 4 °C supports the conclusion that low temperature slows mould growth."
      },
      "checks":[
        {
          "prompt":"Which bread dish shows the greatest mould growth in the CSEC dataset?",
          "answer":"Dish B, moist bread at 25 °C, with 65% mould.",
          "explanation":"Warmth and moisture favour mould growth."
        },
        {
          "prompt":"Why does the pH of warm milk fall during storage?",
          "answer":"Microorganisms metabolise nutrients such as lactose and produce acids, including lactic acid.",
          "explanation":"Acid accumulation lowers pH."
        },
        {
          "prompt":"What gas makes bread dough rise during yeast fermentation?",
          "answer":"Carbon dioxide.",
          "explanation":"Gas bubbles become trapped in the dough."
        },
        {
          "prompt":"State two safety precautions for a food-spoilage investigation.",
          "answer":"Examples include not tasting samples, keeping samples covered, washing hands, labelling samples and cleaning the pH probe between samples.",
          "explanation":"The investigation may contain large numbers of microorganisms."
        }
      ],
      "summary":"Microbial growth depends on conditions. Use controlled comparisons and quantitative evidence to explain why warmth and moisture speed spoilage, refrigeration slows it and selected microorganisms can also be used safely in food production."
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
  || '{"topicsBuilt":40,"objectivesBuilt":40}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
