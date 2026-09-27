begin;

-- CSEC Integrated Science objective 1.7.5
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t7-5-effects-exercise',
  'module-1-organisms-life-processes',
  '1.7.5 Physiological Effects of Exercise',
  'Examine immediate and long-term effects of exercise using pulse recovery, respiration, transport, energy balance and fitness data.',
  340,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Health",
      "objective":"1.7.5",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain why pulse rate and breathing rate increase during exercise.",
        "Interpret pulse-recovery data after exercise.",
        "Use resting pulse and recovery time as evidence when comparing fitness under controlled conditions.",
        "Describe selected long-term effects of regular exercise.",
        "Relate exercise to energy balance and prevention of selected non-communicable diseases.",
        "Plan a fair investigation comparing resting pulse or recovery."
      ],
      "introduction":"Exercise increases the energy demand of skeletal muscles. The respiratory and circulatory systems respond immediately to deliver more oxygen and glucose and remove carbon dioxide and heat. Regular training also produces longer-term changes in the heart, muscles and metabolic health.",
      "sections":[
        {
          "title":"Why the heart beats faster",
          "paragraphs":[
            "During exercise, muscle cells respire more rapidly. They require a faster supply of oxygen and glucose and produce more carbon dioxide.",
            "Heart rate rises so that more blood reaches the working muscles each minute. Blood also carries carbon dioxide away and helps transport heat towards the skin."
          ]
        },
        {
          "title":"Why breathing rate increases",
          "paragraphs":[
            "Breathing becomes faster and usually deeper during exercise. This increases ventilation of the lungs.",
            "More oxygen is brought into the lungs for uptake into the blood, and increased carbon dioxide produced by working muscles can be removed more rapidly."
          ]
        },
        {
          "title":"Pulse recovery after exercise",
          "paragraphs":[
            "After exercise stops, pulse rate does not immediately return to its resting level. The body still has elevated energy and oxygen demands during recovery.",
            "In the CSEC practice dataset, Kerry-Ann''s pulse is 140 beats per minute immediately after exercise. It falls to 124, 108, 94, 84 and 76 during the next five minutes and reaches the resting value of 72 beats per minute after six minutes."
          ]
        },
        {
          "title":"Using recovery time to compare fitness",
          "paragraphs":[
            "When the same exercise task and measuring conditions are used, a lower resting pulse and faster recovery can provide evidence of better cardiorespiratory fitness.",
            "In the SPARK practice table, Andre has a resting pulse of 60 beats per minute and a recovery time of 2 minutes. Bianca has 75 and 5 minutes, Carl has 82 and 8 minutes, and Dana has 70 and 4 minutes. Andre provides the strongest fitness evidence in this dataset."
          ]
        },
        {
          "title":"Why trained people may have a lower resting heart rate",
          "paragraphs":[
            "Regular aerobic training can strengthen the heart and increase stroke volume, the amount of blood pumped with each beat.",
            "If more blood is pumped per beat, the heart may maintain the required resting cardiac output with fewer beats per minute."
          ]
        },
        {
          "title":"Muscles and regular exercise",
          "paragraphs":[
            "Regular activity improves muscle strength, endurance and tone. Muscle tone refers to the slight continuous tension present in muscles even when they are not producing a major movement.",
            "Training also improves the ability of muscles to use oxygen and energy during repeated activity."
          ]
        },
        {
          "title":"Exercise and energy balance",
          "paragraphs":[
            "Food supplies chemical energy and physical activity uses energy. When long-term energy intake greatly exceeds energy use, excess energy is stored, much of it as body fat.",
            "Regular physical activity increases energy expenditure and helps maintain energy balance. Body mass depends on many factors, so exercise should be considered together with nutrition, health and individual needs."
          ]
        },
        {
          "title":"Exercise and disease risk",
          "paragraphs":[
            "Regular physical activity improves insulin sensitivity and glucose use and helps reduce the risk of Type 2 diabetes.",
            "It also helps control body weight and blood pressure and lowers the risk of cardiovascular disease, stroke and several other chronic conditions."
          ]
        },
        {
          "title":"Planning a fair pulse investigation",
          "paragraphs":[
            "A useful investigation might compare resting pulse or recovery time between groups that exercise regularly and groups that do not.",
            "Important control variables include age range, health status, exercise task, exercise duration, time allowed to rest before measuring, method of taking the pulse and duration of the pulse count.",
            "A larger sample and repeated measurements improve reliability. The same standardised procedure should be used for all participants."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t7-5-exercise-physiology",
          "type":"exercise-physiology",
          "title":"Exercise physiology and pulse recovery"
        }
      ],
      "keyPoints":[
        "Heart rate rises during exercise because working muscles need more oxygen and glucose.",
        "Breathing rate rises to increase oxygen uptake and carbon dioxide removal.",
        "The CSEC recovery dataset returns from 140 beats per minute to a resting 72 beats per minute after six minutes.",
        "A lower resting pulse and shorter recovery time can indicate better cardiovascular fitness when conditions are standardised.",
        "Regular training can increase stroke volume and lower resting heart rate.",
        "Regular exercise improves muscle function and helps balance energy input and output.",
        "Physical activity lowers the risk of Type 2 diabetes, hypertension and cardiovascular disease."
      ],
      "workedExample":{
        "title":"Interpreting pulse recovery",
        "prompt":"Kerry-Ann''s resting pulse is 72 beats per minute. Immediately after exercise it is 140, then 124, 108, 94, 84, 76 and 72 beats per minute at one-minute intervals. How long does recovery take, and why is the pulse initially high?",
        "steps":[
          "Identify the resting pulse: 72 beats per minute.",
          "Find the first time after exercise when the pulse reaches 72 again.",
          "This occurs at 6 minutes.",
          "During exercise, muscles respire faster and need more oxygen and glucose.",
          "The heart beats faster to increase blood delivery and remove carbon dioxide."
        ],
        "answer":"Recovery takes six minutes. The pulse is initially high because working muscles require faster transport of oxygen and glucose and faster removal of carbon dioxide."
      },
      "checks":[
        {
          "prompt":"Why does breathing rate increase during exercise?",
          "answer":"To bring in more oxygen for increased respiration and remove the extra carbon dioxide produced by working muscles.",
          "explanation":"Muscle energy demand rises during exercise."
        },
        {
          "prompt":"Which student in the SPARK fitness table shows the strongest fitness evidence?",
          "answer":"Andre.",
          "explanation":"Andre has the lowest resting pulse, 60 beats per minute, and the shortest recovery time, 2 minutes."
        },
        {
          "prompt":"Why may a trained athlete have a lower resting heart rate?",
          "answer":"Training can increase stroke volume, so the heart pumps more blood per beat and needs fewer beats to maintain resting blood flow.",
          "explanation":"Resting pulse should still be interpreted in context because individual values vary."
        },
        {
          "prompt":"State two variables that should be controlled when comparing pulse recovery between students.",
          "answer":"Examples include age, health status, exercise type and duration, rest period before measurement, pulse-count method and time of day.",
          "explanation":"Controlling variables makes the comparison fairer."
        }
      ],
      "summary":"Exercise causes immediate increases in heart rate and breathing because muscles need more energy. Recovery data show how the body returns towards resting conditions, while regular exercise improves cardiovascular efficiency, muscle function and long-term health."
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
  || '{"topicsBuilt":34,"objectivesBuilt":34}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
