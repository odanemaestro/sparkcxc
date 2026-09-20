begin;

-- CSEC Integrated Science objective 1.7.6
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t7-6-drug-use',
  'module-1-organisms-life-processes',
  '1.7.6 Effects of Drug Use',
  'Evaluate selected effects of drug use on the nervous system, body systems, driving, performance, relationships and society.',
  350,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Health",
      "objective":"1.7.6",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Classify selected drugs as stimulants, depressants, hallucinogens or opioids/narcotics.",
        "Explain how alcohol affects reaction time, judgement and coordination.",
        "Evaluate selected health risks of anabolic steroid misuse.",
        "Distinguish tolerance, physical dependence and addiction.",
        "Distinguish physiological, social and economic effects of drug misuse.",
        "Explain why prescription medicines should be used only as directed."
      ],
      "introduction":"A drug is a substance that alters normal body function. Some drugs are useful medicines when taken correctly, while misuse can cause physical, psychological, social and economic harm. Effects depend on the substance, dose, route, frequency, combinations used and the individual.",
      "sections":[
        {
          "title":"Stimulants",
          "paragraphs":[
            "Stimulants increase activity in parts of the central nervous system. Caffeine and cocaine are syllabus examples.",
            "Caffeine can increase alertness. Larger amounts may cause nervousness, disturbed sleep and a rapid heartbeat in some people.",
            "Cocaine is a powerful stimulant that can increase alertness and heart rate and carries serious cardiovascular and addiction risks."
          ]
        },
        {
          "title":"Depressants",
          "paragraphs":[
            "Depressants reduce activity in the central nervous system. Alcohol is the main syllabus example.",
            "Alcohol can slow reaction time and impair judgement, attention, balance and coordination. Increasing alcohol exposure also increases the risk of injury and dangerous impairment."
          ]
        },
        {
          "title":"Alcohol and driving",
          "paragraphs":[
            "Driving requires rapid reactions, accurate judgement, sustained attention and motor coordination. Alcohol impairs all of these abilities.",
            "A person may be impaired before obvious signs such as slurred speech appear. Coffee does not reverse alcohol-related impairment because the body still needs time to metabolise the alcohol."
          ]
        },
        {
          "title":"Hallucinogens",
          "paragraphs":[
            "Hallucinogens alter perception, thought and sensory experience. LSD is a syllabus example.",
            "A user may experience perceptions that do not match the external environment, making judgement and behaviour less predictable."
          ]
        },
        {
          "title":"Opioids and the older term narcotics",
          "paragraphs":[
            "Morphine and heroin belong to the opioid group. Some CSEC questions use the older broad term narcotics.",
            "Opioids can relieve pain and cause drowsiness. High doses can dangerously slow breathing, and repeated non-medical use can lead to dependence or addiction."
          ]
        },
        {
          "title":"Cannabis",
          "paragraphs":[
            "Cannabis does not fit neatly into one simple stimulant-or-depressant category. Its effects vary with dose and product.",
            "THC can impair judgement, attention, motor coordination and reaction time. These effects make driving after cannabis use unsafe."
          ]
        },
        {
          "title":"Anabolic steroids",
          "paragraphs":[
            "Anabolic steroids are synthetic substances related to testosterone. Some people misuse them to increase muscle size or athletic appearance.",
            "Misuse can affect the cardiovascular system, liver, skin, mood, normal hormone production and reproductive function.",
            "In adolescents, misuse can interfere with normal growth and development."
          ]
        },
        {
          "title":"Tolerance, physical dependence and addiction",
          "paragraphs":[
            "Tolerance means that repeated exposure reduces the effect of the same dose, so a larger amount may be required to produce the previous effect.",
            "Physical dependence means the body has adapted to repeated exposure and withdrawal symptoms can occur if use is stopped suddenly. Dependence can occur with some prescribed medicines even when taken correctly.",
            "Addiction is characterised by compulsive drug seeking or use despite harmful consequences. Physical dependence can occur with addiction but does not by itself mean that a person is addicted."
          ]
        },
        {
          "title":"Prescription medicines",
          "paragraphs":[
            "Prescription medicines are supplied for a specific patient and dose under the direction of an authorised health professional.",
            "Misuse includes taking someone else''s medicine, taking more than prescribed or using a medicine for a different purpose. Prescription medicines can have side effects and interactions and should be used as directed."
          ]
        },
        {
          "title":"Social and economic effects",
          "paragraphs":[
            "Drug misuse can contribute to family conflict, financial hardship, neglect, violence, poor school or work performance, accidents and loss of employment.",
            "Communities and countries can also face higher health-care, treatment, policing and productivity costs."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t7-6-drug-effects",
          "type":"drug-effects",
          "title":"Drug classes and effects"
        }
      ],
      "keyPoints":[
        "Caffeine and cocaine are stimulants.",
        "Alcohol is a central nervous system depressant and impairs reaction time, judgement and coordination.",
        "LSD is a hallucinogen.",
        "Morphine and heroin are opioids. CSEC may use the older term narcotics.",
        "Cannabis can impair judgement, coordination and reaction time and does not fit neatly into one simple drug class.",
        "Anabolic steroid misuse can harm cardiovascular, liver, hormonal and reproductive systems.",
        "Physical dependence is not the same as addiction.",
        "Drug misuse can have physical, social and economic consequences."
      ],
      "workedExample":{
        "title":"Why alcohol and driving do not mix",
        "prompt":"Explain why a person who has been drinking alcohol should not drive even if the person does not appear drunk.",
        "steps":[
          "Alcohol depresses the central nervous system.",
          "Reaction time becomes slower.",
          "Judgement, attention and coordination are impaired.",
          "These functions are essential for safe driving.",
          "Visible drunkenness is not required for driving skills to be impaired."
        ],
        "answer":"Alcohol slows central nervous system activity and impairs reaction time, judgement and coordination. These changes increase crash risk even before obvious signs of intoxication appear."
      },
      "checks":[
        {
          "prompt":"Why is caffeine classified as a stimulant?",
          "answer":"It increases activity in the central nervous system and can increase alertness.",
          "explanation":"Excess intake can also cause unwanted effects such as disturbed sleep or rapid heartbeat."
        },
        {
          "prompt":"What is the modern drug class for morphine and heroin?",
          "answer":"Opioids.",
          "explanation":"Some CSEC material uses the older term narcotics."
        },
        {
          "prompt":"How does physical dependence differ from addiction?",
          "answer":"Physical dependence is a body adaptation that can cause withdrawal when a drug is stopped, while addiction involves compulsive use despite harmful consequences.",
          "explanation":"Dependence may occur without addiction."
        },
        {
          "prompt":"State one physiological and one social effect of harmful drug use.",
          "answer":"Physiological examples include impaired coordination, liver damage or cardiovascular effects. Social examples include family conflict, loss of employment or neglect.",
          "explanation":"The same pattern of drug misuse can affect both the individual and wider relationships."
        }
      ],
      "summary":"Evaluate drug use by identifying the drug class, immediate body effects, longer-term health risks and wider consequences. Medicines also require safe use, and physical dependence should not be confused with addiction."
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
  || '{"topicsBuilt":35,"objectivesBuilt":35}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
