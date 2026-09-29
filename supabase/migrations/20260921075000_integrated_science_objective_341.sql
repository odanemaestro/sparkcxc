begin;

-- CSEC Integrated Science objective 3.4.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t4-1-force-principles',
  'module-3-environment',
  '3.4.1 Principles of Forces',
  'Investigate basic force principles including resultant force, F = ma, Newton''s third law, aircraft lift and friction.',
  780,
  true,
  '{
    "syllabus":{"module":3,"topic":"Forces","objective":"3.4.1","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Define a force as a push or pull.",
        "State the newton as the SI unit of force.",
        "Use F = ma to calculate force, mass or acceleration.",
        "Determine resultant force for forces acting in opposite directions.",
        "Explain Newton''s third law using rockets, jets and recoil.",
        "Explain the production of aircraft lift in terms of airflow, pressure and downward deflection of air.",
        "Explain why taking off into the wind increases relative air speed.",
        "Discuss useful and unwanted effects of friction.",
        "Explain why tyre tread improves grip on wet roads.",
        "Explain how lubrication reduces friction."
      ],
      "introduction":"A force is a push or pull that can change an object''s speed, direction or shape. Forces are measured in newtons and can combine to produce a resultant force that determines how motion changes.",
      "sections":[
        {"title":"Force and its unit","paragraphs":[
          "A force is a push or pull.",
          "The SI unit of force is the newton, N.",
          "Forces can change motion, change direction or deform an object."
        ]},
        {"title":"Force, mass and acceleration","paragraphs":[
          "Newton''s second law is written F = ma, where F is resultant force in newtons, m is mass in kilograms and a is acceleration in metres per second squared.",
          "A 12 N force acting on a 3 kg mass produces an acceleration of 12 ÷ 3 = 4 m/s².",
          "A 1 200 kg car accelerating at 2 m/s² requires a resultant force of 1 200 × 2 = 2 400 N.",
          "If 50 N produces an acceleration of 5 m/s², the mass is 50 ÷ 5 = 10 kg."
        ]},
        {"title":"Resultant force","paragraphs":[
          "The resultant force is the single force that has the same overall effect as all the forces acting together.",
          "For opposite forces of 35 N and 20 N, the resultant is 35 - 20 = 15 N in the direction of the 35 N force.",
          "If opposing forces are equal, the resultant force is zero."
        ]},
        {"title":"Newton''s third law","paragraphs":[
          "Newton''s third law states that when one object exerts a force on another, the second object exerts an equal-sized force in the opposite direction on the first.",
          "The forces act on different objects.",
          "A rocket pushes hot gases downward and the gases push the rocket upward.",
          "A jet pushes gases backward and the gases push the aircraft forward.",
          "When a gun pushes a bullet forward, the bullet-gun interaction produces an equal opposite force on the gun, causing recoil."
        ]},
        {"title":"Aircraft lift","paragraphs":[
          "An aircraft wing creates a pressure distribution around its surface and deflects air downward. Together these effects produce an upward lift force.",
          "In the simplified CSEC treatment, faster airflow over the upper surface is associated with lower pressure above the wing than below it.",
          "Lift should not be understood as coming from one pressure statement alone; the complete effect involves the overall airflow and pressure field around the wing."
        ]},
        {"title":"Taking off into the wind","paragraphs":[
          "An aircraft wing responds to air speed relative to the aircraft.",
          "A headwind increases the relative airflow over the wings even when ground speed is lower.",
          "This helps the wing produce the required lift at a lower speed over the runway."
        ]},
        {"title":"Useful friction","paragraphs":[
          "Friction between brake pads and a wheel or disc allows brakes to slow a bicycle or vehicle.",
          "Friction between shoes and the ground allows walking without slipping.",
          "Tyre-road friction provides grip for steering and braking."
        ]},
        {"title":"Wet roads and tyre tread","paragraphs":[
          "On wet roads, a layer of water can reduce direct contact between tyre rubber and the road.",
          "Tyre grooves channel water away and help maintain contact and friction.",
          "Smooth worn tyres remove water less effectively and increase the risk of skidding."
        ]},
        {"title":"Unwanted friction and lubrication","paragraphs":[
          "Friction can cause heating, wear and energy loss in machines.",
          "Lubricants such as oil reduce friction by separating moving surfaces and reducing direct contact.",
          "A ball also rolls farther on a smooth floor than on grass because the resistive forces are smaller."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t4-1-force-principles","type":"force-principles","title":"Force, motion, lift and friction explorer"}],
      "keyPoints":[
        "Force is a push or pull measured in newtons.",
        "F = ma.",
        "12 N on 3 kg gives 4 m/s².",
        "1 200 kg at 2 m/s² requires 2 400 N.",
        "35 N against 20 N gives a 15 N resultant toward the 35 N force.",
        "Third-law forces are equal and opposite and act on different objects.",
        "Rockets and jets move by action-reaction force pairs.",
        "Aircraft lift depends on airflow and pressure around the wing.",
        "Tyre tread improves wet-road grip by moving water away.",
        "Lubrication reduces friction."
      ],
      "workedExample":{
        "title":"Using F = ma",
        "prompt":"A 50 N resultant force causes an object to accelerate at 5 m/s². Calculate its mass.",
        "steps":[
          "Start with F = ma.",
          "Rearrange to m = F ÷ a.",
          "m = 50 ÷ 5.",
          "m = 10 kg."
        ],
        "answer":"10 kg."
      },
      "checks":[
        {"prompt":"What is the SI unit of force?","answer":"The newton, N.","explanation":"Force is measured in newtons."},
        {"prompt":"What acceleration does 12 N produce on a 3 kg mass?","answer":"4 m/s².","explanation":"a = F ÷ m = 12 ÷ 3."},
        {"prompt":"What is the resultant of 35 N right and 20 N left?","answer":"15 N to the right.","explanation":"Subtract the smaller opposing force from the larger one."},
        {"prompt":"Why does a rocket move upward when gases are expelled downward?","answer":"The gases exert an equal and opposite force on the rocket.","explanation":"This is Newton''s third law."},
        {"prompt":"Why are worn smooth tyres dangerous on wet roads?","answer":"They remove water less effectively, so tyre-road friction is reduced.","explanation":"Reduced grip increases skidding risk."}
      ],
      "summary":"Force principles connect pushes and pulls to acceleration, reaction forces, lift and friction. Use vectors and F = ma carefully and always identify which objects the forces act on."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":78,"objectivesBuilt":78}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
