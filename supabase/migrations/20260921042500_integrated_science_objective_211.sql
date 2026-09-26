begin;

-- CSEC Integrated Science objective 2.1.1
insert into public.spark_subject_sections(
  subject_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'module-2-energy',
  'Module 2: Energy',
  'Study energy forms, transfers, life processes, electricity, heat, light, sound and practical applications using CSEC Integrated Science concepts and investigations.',
  20,
  true,
  '{"module":2,"minimumHours":45,"skills":["Knowledge and Comprehension","Use of Knowledge","Experimental Skills"]}'::jsonb
)
on conflict (subject_id,section_id) do update set
  title=excluded.title,
  description=excluded.description,
  sort_order=excluded.sort_order,
  enabled=excluded.enabled,
  metadata=excluded.metadata,
  updated_at=now();

insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t1-1-energy-concept',
  'module-2-energy',
  '2.1.1 Concept of Energy',
  'Explain the concept of energy, recognise common forms and stores of energy, identify energy possessed because of motion, height or deformation, and state the SI unit of energy.',
  420,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Conservation of Energy",
      "objective":"2.1.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define energy as the capacity to do work.",
        "State the joule as the SI unit of energy and convert between joules and kilojoules.",
        "Identify kinetic, gravitational potential, elastic potential, chemical, sound and light energy in familiar situations.",
        "Explain why food, fuels and batteries contain stored chemical energy.",
        "Recognise situations in which an object possesses more than one form of energy.",
        "Relate mechanical work to a force moving an object through a distance."
      ],
      "introduction":"Energy is needed whenever work is done or change takes place. In Integrated Science, energy is described as the capacity to do work. You should be able to identify the form or store of energy from the situation and use joules correctly.",
      "sections":[
        {
          "title":"Energy and work",
          "paragraphs":[
            "Energy is the capacity to do work. Mechanical work is done when a force causes an object to move through a distance in the direction of the force.",
            "If a force is applied but the object does not move, no mechanical work is done on that object by the force."
          ]
        },
        {
          "title":"Units of energy",
          "paragraphs":[
            "The SI unit of energy is the joule, symbol J. Work is also measured in joules because doing work transfers energy.",
            "One kilojoule is one thousand joules. Therefore, 1 kJ = 1000 J."
          ]
        },
        {
          "title":"Kinetic and potential energy",
          "paragraphs":[
            "Kinetic energy is the energy an object possesses because it is moving. A moving bus, bicycle or aircraft therefore has kinetic energy.",
            "Gravitational potential energy is associated with position in a gravitational field. A coconut high in a tree or a book on a high shelf has gravitational potential energy.",
            "Elastic potential energy is stored when an elastic object is stretched or compressed, such as a stretched rubber band or compressed spring."
          ]
        },
        {
          "title":"Chemical energy",
          "paragraphs":[
            "Food, fuels and batteries store chemical energy. This stored energy can be transferred when chemical reactions take place.",
            "For example, a battery in a toy car stores chemical energy that can be transferred electrically to the motor."
          ]
        },
        {
          "title":"Other forms of energy",
          "paragraphs":[
            "Sound and light are also forms of energy. Sound transfers energy through vibrations, while light transfers energy as electromagnetic radiation.",
            "An object can possess more than one form of energy at the same time. A plane flying high above the ground has kinetic energy because it is moving and gravitational potential energy because it is at a height."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t1-1-energy-concept",
          "type":"energy-concept",
          "title":"Energy forms, work and units explorer"
        }
      ],
      "keyPoints":[
        "Energy is the capacity to do work.",
        "The SI unit of energy is the joule, J.",
        "1 kJ = 1000 J.",
        "Kinetic energy is associated with movement.",
        "Gravitational potential energy is associated with height or position.",
        "Elastic potential energy is stored when an elastic object is stretched or compressed.",
        "Food, fuels and batteries store chemical energy.",
        "One object can possess more than one form of energy at the same time."
      ],
      "workedExample":{
        "title":"Identifying energy in a moving aircraft",
        "prompt":"A plane is flying above the ground. Identify two forms of energy the plane possesses and explain each one.",
        "steps":[
          "The plane is moving, so it possesses kinetic energy.",
          "The plane is above the ground, so it possesses gravitational potential energy.",
          "Both forms are present at the same time."
        ],
        "answer":"The aircraft possesses kinetic energy because it is moving and gravitational potential energy because it is at a height above the ground."
      },
      "checks":[
        {
          "prompt":"What is energy?",
          "answer":"Energy is the capacity to do work.",
          "explanation":"This definition distinguishes energy from force and power."
        },
        {
          "prompt":"State the SI unit of energy.",
          "answer":"The joule, J.",
          "explanation":"The same unit is used for mechanical work."
        },
        {
          "prompt":"What form of energy is stored in a stretched rubber band?",
          "answer":"Elastic potential energy.",
          "explanation":"The energy is stored because the elastic object is deformed."
        },
        {
          "prompt":"Why does a coconut high in a tree have gravitational potential energy?",
          "answer":"It has energy because of its raised position in a gravitational field.",
          "explanation":"Its height gives it gravitational potential energy."
        },
        {
          "prompt":"How many joules are in 3 kJ?",
          "answer":"3000 J.",
          "explanation":"Multiply kilojoules by 1000 to convert to joules."
        }
      ],
      "summary":"Identify energy from the situation. Movement indicates kinetic energy, height indicates gravitational potential energy, deformation indicates elastic potential energy, and food, fuels or batteries indicate chemical energy. State energy in joules."
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
  || '{"sections":2,"topicsBuilt":42,"objectivesBuilt":42}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
