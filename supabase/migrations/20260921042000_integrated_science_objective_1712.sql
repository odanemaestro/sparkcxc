begin;

-- CSEC Integrated Science objective 1.7.12
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t7-12-food-preservation',
  'module-1-organisms-life-processes',
  '1.7.12 Food Preservation',
  'Explain the scientific principles behind selected food-preservation methods including refrigeration, drying, salting, curing, sugaring, pickling, canning and pasteurisation.',
  410,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Health",
      "objective":"1.7.12",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define food preservation.",
        "Explain how refrigeration slows food spoilage.",
        "Explain how drying, salt and sugar reduce water available to microorganisms.",
        "Explain how pickling inhibits microorganisms by lowering pH.",
        "Explain the combined role of heat and sealing in canning.",
        "Describe pasteurisation as controlled heating followed by cooling.",
        "Evaluate selected Caribbean food-preservation methods and storage-safety signs."
      ],
      "introduction":"Food preservation is the treatment of food to slow or prevent spoilage and extend useful storage life. Preservation methods work by changing conditions microorganisms need, destroying microorganisms or preventing new contamination.",
      "sections":[
        {
          "title":"Refrigeration",
          "paragraphs":[
            "Low temperature slows microbial metabolism and enzyme activity, so food spoils more slowly. Refrigeration does not kill all microorganisms and does not sterilise food.",
            "The CSEC bank includes an inverter-type refrigerator because variable compressor operation can maintain a steady low temperature while reducing electricity use."
          ]
        },
        {
          "title":"Drying",
          "paragraphs":[
            "Drying removes water from food. With less available water, microorganisms grow more slowly or cannot grow.",
            "Solar drying is useful in the Caribbean because sunlight is widely available and supplies renewable energy. Food must still be protected from insects, dust, rain and re-absorption of moisture."
          ]
        },
        {
          "title":"Salting and curing",
          "paragraphs":[
            "Concentrated salt lowers water availability and draws water out of microbial cells by osmosis. This inhibits growth.",
            "Curing meat may combine salt with approved curing agents such as nitrites. These create conditions that inhibit selected bacteria and also affect the colour and flavour of the product."
          ]
        },
        {
          "title":"Sugaring",
          "paragraphs":[
            "Large amounts of sugar in jams and jellies create a concentrated solution. Water moves out of microbial cells by osmosis, reducing their ability to grow.",
            "Sugar preservation works through reduced water availability, not because sugar supplies heat or oxygen."
          ]
        },
        {
          "title":"Pickling",
          "paragraphs":[
            "Vinegar contains acetic acid and lowers the pH of the food environment. Many spoilage and disease-causing microorganisms grow poorly under sufficiently acidic conditions.",
            "Safe pickling requires an appropriate tested process. Adding a small amount of vinegar without controlling acidity is not the same as proper preservation."
          ]
        },
        {
          "title":"Canning",
          "paragraphs":[
            "Canning combines heat treatment with a sealed container. Heating destroys microorganisms and the airtight seal prevents new microorganisms from entering after processing.",
            "A swollen, leaking or badly damaged can should not be eaten from. Gas production can indicate microbial growth, and some improperly processed canned foods can contain dangerous toxins."
          ]
        },
        {
          "title":"Pasteurisation",
          "paragraphs":[
            "Pasteurisation uses controlled heat to reduce harmful microorganisms without aiming to sterilise the food. The CSEC milk example uses about 72 °C for 15 seconds, followed by rapid cooling.",
            "Pasteurised milk still needs suitable storage because some microorganisms may remain or enter later if handling is poor."
          ]
        },
        {
          "title":"Choosing a method",
          "paragraphs":[
            "The best method depends on the type of food, available equipment, intended storage time, cost, energy use and the quality changes that are acceptable.",
            "Caribbean households and producers may combine traditional methods such as solar drying, salting, sugaring and pickling with refrigeration, freezing, pasteurisation or commercial canning."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t7-12-food-preservation",
          "type":"food-preservation",
          "title":"Food-preservation principles explorer"
        }
      ],
      "keyPoints":[
        "Food preservation slows or prevents spoilage and extends shelf life.",
        "Refrigeration slows microbial and enzyme activity but does not sterilise food.",
        "Drying removes water needed for microbial growth.",
        "Concentrated salt and sugar draw water from microbial cells by osmosis.",
        "Pickling lowers pH.",
        "Canning uses heat followed by an airtight seal to prevent re-contamination.",
        "The CSEC pasteurisation example uses about 72 °C for 15 seconds followed by cooling.",
        "Swollen cans are unsafe warning signs and should not be tasted."
      ],
      "workedExample":{
        "title":"Explaining why salting preserves fish",
        "prompt":"Fish is covered with a high concentration of salt before drying. Explain how the salt slows microbial growth.",
        "steps":[
          "The salt creates a highly concentrated solution around microbial cells.",
          "Water moves from the cells into the surrounding solution by osmosis.",
          "The cells lose water and the amount of water available for growth is reduced.",
          "Microbial growth is therefore inhibited."
        ],
        "answer":"Salt preserves the fish by lowering water availability and drawing water out of microbial cells by osmosis, which inhibits their growth."
      },
      "checks":[
        {
          "prompt":"Why does refrigeration preserve food?",
          "answer":"Low temperature slows microbial growth and enzyme activity.",
          "explanation":"It slows spoilage but does not kill every microorganism."
        },
        {
          "prompt":"How does concentrated sugar help preserve jam?",
          "answer":"It draws water out of microbial cells by osmosis and reduces water available for growth.",
          "explanation":"The mechanism is similar to preservation by concentrated salt."
        },
        {
          "prompt":"Why does canning use both heat and sealing?",
          "answer":"Heat destroys microorganisms and the sealed container prevents new microorganisms from entering after processing.",
          "explanation":"Both steps are needed for safe long-term preservation."
        },
        {
          "prompt":"Why should a swollen can not be tasted?",
          "answer":"Swelling can indicate microbial gas production and possible toxin formation, so tasting the food is unsafe.",
          "explanation":"Food safety should be decided from safe handling rules, not by tasting suspicious food."
        }
      ],
      "summary":"Food-preservation methods work through a small set of scientific principles: lower temperature, less available water, lower pH, heat treatment and prevention of re-contamination. Connect each named method with the principle that limits microbial growth."
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
  || '{"topicsBuilt":41,"objectivesBuilt":41}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
