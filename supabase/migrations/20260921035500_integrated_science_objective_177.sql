begin;

-- CSEC Integrated Science objective 1.7.7
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t7-7-personal-hygiene',
  'module-1-organisms-life-processes',
  '1.7.7 Personal Hygiene',
  'Discuss how hand washing, bathing, menstrual and genital hygiene, clean clothing and safe handling of personal items reduce odour, contamination and infection.',
  360,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Health",
      "objective":"1.7.7",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain how personal hygiene reduces the spread of microorganisms.",
        "Interpret data from the CSEC hand-washing investigation.",
        "Explain the main cause of body odour.",
        "Distinguish deodorant from antiperspirant action.",
        "Describe suitable menstrual and genital hygiene practices.",
        "Explain why personal items such as towels and razors should not be shared.",
        "Explain why food handlers require high standards of personal hygiene."
      ],
      "introduction":"Personal hygiene helps remove sweat, oils, dirt and microorganisms from the body and reduces the chance of transferring pathogens to other people, food or shared surfaces. Good hygiene also helps reduce body odour and skin or genital irritation.",
      "sections":[
        {
          "title":"Hand washing",
          "paragraphs":[
            "Hands frequently contact surfaces, food, body fluids and the toilet environment. Microorganisms picked up on the hands can be transferred to the mouth, eyes, other people or food.",
            "Washing with soap and clean running water removes dirt, oils and microorganisms. Outside health-care settings, a useful public-health guide is to scrub all hand surfaces for about 20 seconds before rinsing and drying.",
            "Important times include after using the toilet, before preparing or eating food, after coughing or sneezing and after handling garbage or animal waste."
          ]
        },
        {
          "title":"The CSEC hand-washing investigation",
          "paragraphs":[
            "In the SPARK practical dataset, fingertip contact with nutrient agar produced 86 bacterial colonies after no washing, 54 after water only, 12 after soap and water and 18 after hand sanitiser.",
            "The percentage decrease from 86 colonies to 12 after soap and water is calculated as (86 - 12) divided by 86, multiplied by 100. This gives about 86%.",
            "For this particular investigation, soap and water produced the lowest colony count. The result should be interpreted as evidence from the stated procedure rather than proof that every soap or sanitiser performs identically under all conditions."
          ]
        },
        {
          "title":"Body odour",
          "paragraphs":[
            "Fresh sweat itself has little odour. Body odour develops mainly when bacteria on the skin break down components of sweat and other skin secretions.",
            "Regular bathing and clean clothing remove sweat, oils, dead skin cells and microorganisms, reducing the material available for bacterial breakdown."
          ]
        },
        {
          "title":"Deodorants and antiperspirants",
          "paragraphs":[
            "Deodorants are designed mainly to reduce or mask odour and some contain ingredients that reduce bacterial growth.",
            "Antiperspirants reduce the amount of sweat reaching the skin surface by temporarily reducing sweat flow from treated areas.",
            "Neither product replaces regular washing."
          ]
        },
        {
          "title":"Menstrual and genital hygiene",
          "paragraphs":[
            "Regular cleaning of the external genital area, clean breathable underwear and changing damp clothing help maintain comfort and reduce excessive microbial growth.",
            "Menstrual pads, tampons and other menstrual products should be changed at suitable intervals and hands should be washed before and after changing them.",
            "Strong perfumes or heavily scented products are not required for cleanliness and may irritate sensitive skin."
          ]
        },
        {
          "title":"Do not share personal items",
          "paragraphs":[
            "Towels, razors, toothbrushes and similar items can carry microorganisms or body fluids from one person to another.",
            "Razors are especially important because small cuts can contaminate the razor with blood. Sharing personal items therefore increases avoidable infection risk."
          ]
        },
        {
          "title":"Food handlers",
          "paragraphs":[
            "A food handler can transfer pathogens from unwashed hands, skin, contaminated surfaces or the toilet environment to food.",
            "If contaminated food is then stored under conditions that support microbial growth, the number of microorganisms can increase and cause food-borne illness.",
            "Food handlers should wash hands at appropriate times, wear clean clothing, cover wounds and follow safe food-handling procedures."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t7-7-personal-hygiene",
          "type":"personal-hygiene",
          "title":"Personal hygiene and contamination"
        }
      ],
      "keyPoints":[
        "Hand washing with soap and water removes microorganisms and reduces disease transmission.",
        "The CSEC practical dataset shows 86 colonies after no washing and 12 after soap and water.",
        "Body odour is mainly produced when skin bacteria break down sweat and skin secretions.",
        "Deodorants mainly reduce odour, while antiperspirants reduce sweating.",
        "Regular washing, clean breathable underwear and appropriate menstrual-product changes support genital hygiene.",
        "Towels and razors should not be shared because they can transfer microorganisms or blood.",
        "Food-handler hygiene reduces contamination of food."
      ],
      "workedExample":{
        "title":"Calculating the effect of hand washing",
        "prompt":"A nutrient-agar plate shows 86 colonies after no hand washing and 12 colonies after washing with soap and water. Calculate the percentage decrease.",
        "steps":[
          "Find the decrease: 86 - 12 = 74 colonies.",
          "Divide by the original value: 74 divided by 86.",
          "Multiply by 100.",
          "The result is approximately 86%."
        ],
        "answer":"The colony count decreased by about 86%."
      },
      "checks":[
        {
          "prompt":"Why does washing hands after using the toilet reduce intestinal infections?",
          "answer":"It removes faecal microorganisms from the hands before they can be transferred to food, the mouth, surfaces or other people.",
          "explanation":"Hand washing interrupts the faecal-oral route of transmission."
        },
        {
          "prompt":"What causes most body odour?",
          "answer":"Bacteria breaking down sweat and other skin secretions.",
          "explanation":"Fresh sweat itself has little smell."
        },
        {
          "prompt":"Why should razors not be shared?",
          "answer":"They can carry microorganisms and may be contaminated with blood from small cuts.",
          "explanation":"Sharing raises the risk of transmitting skin or blood-borne infections."
        },
        {
          "prompt":"Why is good personal hygiene important for a food handler?",
          "answer":"It reduces the chance of transferring pathogens from the hands, body or toilet environment to food.",
          "explanation":"Contaminated food can then spread disease to customers."
        }
      ],
      "summary":"Good personal hygiene reduces microorganisms, contamination and odour. The reason for each practice matters, because hygiene is most effective when it breaks a specific route by which microorganisms spread."
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
  || '{"topicsBuilt":36,"objectivesBuilt":36}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
