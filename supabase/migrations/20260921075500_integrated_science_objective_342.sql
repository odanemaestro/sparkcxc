begin;

-- CSEC Integrated Science objective 3.4.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t4-2-gravity-inertia',
  'module-3-environment',
  '3.4.2 Gravity and Inertia',
  'Explain gravity as a non-contact force, distinguish mass and weight, and apply inertia, air resistance and centripetal-force ideas.',
  790,
  true,
  '{
    "syllabus":{"module":3,"topic":"Forces","objective":"3.4.2","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Identify gravity as a non-contact force.",
        "Distinguish mass from weight.",
        "Use W = mg in simple calculations.",
        "Explain why mass stays constant but weight changes with gravitational field strength.",
        "Explain falling motion with and without air resistance.",
        "State Newton''s first law.",
        "Explain inertia using a stopping vehicle and seat belts.",
        "Explain centripetal force in circular motion.",
        "Predict motion when centripetal force is removed."
      ],
      "introduction":"Gravity acts at a distance and gives objects weight. Newton''s first law explains why motion continues unless a resultant force acts, while centripetal force explains why moving objects can follow circular paths.",
      "sections":[
        {"title":"Gravity as a non-contact force","paragraphs":[
          "Gravity can act between objects without direct physical contact.",
          "Magnetic and electrostatic forces are also non-contact forces."
        ]},
        {"title":"Mass and weight","paragraphs":[
          "Mass is the amount of matter in an object and is measured in kilograms.",
          "Weight is the gravitational force acting on the object and is measured in newtons.",
          "Weight is calculated using W = mg."
        ]},
        {"title":"Weight calculations","paragraphs":[
          "When g = 10 N/kg, a 50 kg student has a weight of 50 × 10 = 500 N.",
          "A 5 kg bag has a weight of 5 × 10 = 50 N.",
          "The CSEC bank uses g = 10 N/kg for these simple calculations when stated."
        ]},
        {"title":"Mass on Earth and Moon","paragraphs":[
          "An astronaut''s mass is the same on Earth and on the Moon.",
          "The astronaut''s weight is smaller on the Moon because the Moon''s gravitational field is weaker."
        ]},
        {"title":"Falling objects and air resistance","paragraphs":[
          "In the absence of air resistance, objects near Earth fall with the same gravitational acceleration.",
          "A feather and a hammer would therefore land together in a vacuum if released from the same height.",
          "In air, a sheet of paper falls more slowly than a book because air resistance is much larger compared with the paper''s weight."
        ]},
        {"title":"Newton''s first law","paragraphs":[
          "An object remains at rest or continues moving in a straight line at constant speed unless a resultant force acts on it.",
          "This tendency to resist a change in motion is called inertia."
        ]},
        {"title":"Inertia and seat belts","paragraphs":[
          "When a moving car stops suddenly, passengers tend to keep moving forward because of inertia.",
          "A seat belt provides the force needed to slow the passenger with the vehicle."
        ]},
        {"title":"Centripetal force","paragraphs":[
          "An object moving in a circle needs a resultant force directed toward the centre.",
          "This inward force is called centripetal force.",
          "For a satellite orbiting Earth, gravity provides the centripetal force."
        ]},
        {"title":"When the inward force disappears","paragraphs":[
          "A ball whirled on a string follows a circular path while the string supplies the inward force.",
          "If the string breaks, the ball continues in a straight line tangent to the circle at that instant.",
          "This follows Newton''s first law."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t4-2-gravity-inertia","type":"gravity-inertia","title":"Gravity, weight, free fall and inertia explorer"}],
      "keyPoints":[
        "Gravity is a non-contact force.",
        "Mass is measured in kilograms and does not depend on location.",
        "Weight is a force measured in newtons.",
        "W = mg.",
        "50 kg at 10 N/kg weighs 500 N.",
        "In a vacuum, objects fall with the same gravitational acceleration.",
        "Air resistance can make paper or feathers fall more slowly.",
        "Newton''s first law describes inertia.",
        "Seat belts provide the force needed to stop passengers.",
        "Gravity provides centripetal force for satellites."
      ],
      "workedExample":{
        "title":"Calculating weight",
        "prompt":"A bag has a mass of 5 kg. Calculate its weight if g = 10 N/kg.",
        "steps":[
          "Use W = mg.",
          "W = 5 × 10.",
          "W = 50 N."
        ],
        "answer":"50 N."
      },
      "checks":[
        {"prompt":"What is weight?","answer":"The gravitational force acting on an object.","explanation":"Weight is measured in newtons."},
        {"prompt":"Does an astronaut''s mass change on the Moon?","answer":"No.","explanation":"Mass stays the same; weight decreases because gravity is weaker."},
        {"prompt":"Why does paper usually fall more slowly than a book in air?","answer":"Air resistance is larger relative to the paper''s weight.","explanation":"In a vacuum they would fall with the same gravitational acceleration."},
        {"prompt":"What is inertia?","answer":"The tendency of an object to resist a change in its state of motion.","explanation":"It is described by Newton''s first law."},
        {"prompt":"What happens to a ball if the string providing centripetal force breaks?","answer":"It moves in a straight line tangent to the circular path.","explanation":"Without an inward resultant force, its direction no longer changes toward the centre."}
      ],
      "summary":"Gravity controls weight and can provide centripetal force. Inertia explains why motion persists, while air resistance explains many everyday differences in falling motion."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":79,"objectivesBuilt":79}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
