begin;

-- CSEC Integrated Science objective 1.7.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t7-4-non-communicable-disease',
  'module-1-organisms-life-processes',
  '1.7.4 Non-communicable Diseases',
  'Discuss selected non-communicable diseases including diabetes, hypertension, allergy, autoimmune disease and asthma, with emphasis on risk factors, effects and prevention.',
  330,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Health",
      "objective":"1.7.4",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define a non-communicable disease.",
        "Distinguish Type 1 and Type 2 diabetes and interpret blood-glucose data.",
        "Explain selected risk factors and consequences of hypertension.",
        "Distinguish allergy from autoimmune disease.",
        "Explain how environmental triggers can worsen asthma.",
        "Recommend appropriate risk-reduction and disease-control practices."
      ],
      "introduction":"Non-communicable diseases are not caused by infectious pathogens and do not spread from one person to another. They include metabolic, cardiovascular, respiratory, allergic and autoimmune conditions. Some risk factors can be changed, while others such as age, family history and genetics cannot.",
      "sections":[
        {
          "title":"Diabetes mellitus",
          "paragraphs":[
            "Diabetes mellitus is a chronic condition in which blood glucose remains too high because insulin production or insulin action is inadequate.",
            "Persistently high blood glucose can damage blood vessels and organs over time."
          ]
        },
        {
          "title":"Type 1 diabetes",
          "paragraphs":[
            "Type 1 diabetes is an autoimmune disease. The immune system destroys insulin-producing beta cells in the pancreas, so the body produces little or no insulin.",
            "People with Type 1 diabetes require insulin replacement and regular management of blood glucose."
          ]
        },
        {
          "title":"Type 2 diabetes",
          "paragraphs":[
            "In Type 2 diabetes, body cells become less responsive to insulin and the pancreas may eventually be unable to produce enough insulin to keep blood glucose within the normal range.",
            "Risk is influenced by several factors including genetics, age, excess body weight and low physical activity. The condition is not caused by eating sugar alone.",
            "Management can include balanced nutrition, regular physical activity, achieving a healthy body weight where appropriate, prescribed medicines and blood-glucose monitoring."
          ]
        },
        {
          "title":"Interpreting a glucose-response graph",
          "paragraphs":[
            "The SPARK practice graph shows two people after a 75 g glucose drink. Person A begins at about 5 mmol per litre, rises to about 7.5 mmol per litre after 30 minutes and returns to about 5 mmol per litre by 120 minutes.",
            "Person B begins at about 8 mmol per litre, rises above 11 mmol per litre and remains high after three hours. In this CSEC practice scenario, Person B is the person most likely to have diabetes because the fasting value is higher and the glucose level does not return towards the normal baseline."
          ]
        },
        {
          "title":"Long-term effects of uncontrolled diabetes",
          "paragraphs":[
            "Long-term high blood glucose can damage the eyes, kidneys, nerves, heart and blood vessels.",
            "Poor circulation and nerve damage can also contribute to slow wound healing and increase the risk of serious foot problems."
          ]
        },
        {
          "title":"Hypertension",
          "paragraphs":[
            "Hypertension is persistently raised blood pressure. It often causes no obvious symptoms, so blood-pressure measurement is important for detection.",
            "Risk is increased by factors including high sodium intake, physical inactivity, excess body weight, tobacco use, harmful alcohol use, stress and some genetic or medical factors.",
            "A high sodium intake can cause the body to retain more water. This can increase blood volume and contribute to increased pressure on artery walls."
          ]
        },
        {
          "title":"Effects of uncontrolled hypertension",
          "paragraphs":[
            "Uncontrolled high blood pressure places extra strain on blood vessels and organs.",
            "It increases the risk of stroke, heart disease, heart failure, kidney damage and damage to blood vessels in the eyes and other tissues."
          ]
        },
        {
          "title":"Allergy",
          "paragraphs":[
            "An allergy is an excessive immune response to a substance that is usually harmless to most people. Such a substance is called an allergen.",
            "Dust, pollen, some foods and other materials can trigger allergic symptoms. Sneezing and itchy eyes after exposure to household dust are typical allergy symptoms."
          ]
        },
        {
          "title":"Autoimmune disease",
          "paragraphs":[
            "In an autoimmune disease, the immune system mistakenly attacks the body''s own cells or tissues.",
            "Lupus and rheumatoid arthritis are syllabus examples. They differ from infectious diseases because no transmissible pathogen causes the immune attack."
          ]
        },
        {
          "title":"Asthma",
          "paragraphs":[
            "Asthma is a chronic inflammatory condition of the airways. The airways can narrow and produce symptoms such as wheezing, coughing, chest tightness and difficulty breathing.",
            "Triggers differ among individuals and can include air pollution, tobacco smoke, dust, allergens, exercise or respiratory infections.",
            "People diagnosed with asthma should follow their individual treatment plan and reduce exposure to known triggers where practical."
          ]
        },
        {
          "title":"Reducing risk",
          "paragraphs":[
            "Regular physical activity, balanced eating, avoiding tobacco, limiting harmful alcohol use and maintaining a healthy body weight reduce several non-communicable disease risks.",
            "Health screening, early diagnosis and following prescribed treatment are also important because some chronic diseases cause few symptoms at first."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t7-4-non-communicable-disease",
          "type":"non-communicable-disease",
          "title":"Non-communicable disease explorer"
        }
      ],
      "keyPoints":[
        "Non-communicable diseases do not spread from person to person.",
        "Type 1 diabetes is an autoimmune condition that results in little or no insulin production.",
        "Type 2 diabetes involves reduced insulin effectiveness and often reduced insulin production over time.",
        "Uncontrolled diabetes can damage eyes, kidneys, nerves and the cardiovascular system.",
        "Hypertension is persistently raised blood pressure and may have no obvious symptoms.",
        "High sodium intake, inactivity, excess body weight, tobacco and harmful alcohol use increase hypertension risk.",
        "Allergy is an excessive response to a usually harmless substance, while autoimmune disease attacks the body''s own tissues.",
        "Air pollution and other triggers can worsen asthma."
      ],
      "workedExample":{
        "title":"Interpreting a glucose-response graph",
        "prompt":"Person A has blood glucose values of 5.0 mmol per litre before a glucose drink, 7.5 after 30 minutes and 5.0 after 120 minutes. Person B begins at 8.0, rises above 11 and remains at 10.0 after 180 minutes. Which person is more likely to have diabetes? Give two reasons.",
        "steps":[
          "Compare the fasting values.",
          "Person B starts at a higher blood glucose level.",
          "Compare what happens after the glucose drink.",
          "Person A returns towards the starting level, while Person B remains markedly elevated.",
          "Use both observations to support the conclusion."
        ],
        "answer":"Person B is more likely to have diabetes because the fasting blood glucose is higher and the blood glucose remains high for several hours instead of returning towards the normal starting level."
      },
      "checks":[
        {
          "prompt":"What is the main difference between Type 1 and Type 2 diabetes?",
          "answer":"In Type 1 diabetes the body produces little or no insulin because insulin-producing cells are destroyed by an autoimmune process. In Type 2 diabetes the body becomes less responsive to insulin and may also produce too little.",
          "explanation":"Both conditions cause abnormal blood-glucose regulation, but their underlying mechanisms differ."
        },
        {
          "prompt":"Explain how high sodium intake can contribute to hypertension.",
          "answer":"Excess sodium can increase water retention, increasing blood volume and contributing to higher pressure on artery walls.",
          "explanation":"Blood pressure is affected by both blood volume and resistance in the blood vessels."
        },
        {
          "prompt":"How does an allergy differ from an autoimmune disease?",
          "answer":"An allergy is an excessive immune response to a usually harmless external substance, while an autoimmune disease involves immune attack on the body''s own tissues.",
          "explanation":"Both involve the immune system but target different things."
        },
        {
          "prompt":"State two possible long-term effects of uncontrolled diabetes.",
          "answer":"Examples include eye damage, kidney damage, nerve damage, heart disease, stroke or poor wound healing.",
          "explanation":"Persistently high blood glucose damages blood vessels and tissues over time."
        }
      ],
      "summary":"Non-communicable diseases have different causes and mechanisms. Use evidence such as blood-glucose patterns and blood-pressure risk factors, and distinguish metabolic, allergic, autoimmune and respiratory conditions rather than treating them as one group."
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
  || '{"topicsBuilt":33,"objectivesBuilt":33}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
