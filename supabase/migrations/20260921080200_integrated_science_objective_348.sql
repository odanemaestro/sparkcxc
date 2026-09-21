begin;

-- CSEC Integrated Science objective 3.4.8
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values(
  'integrated-science',
  'm3-t4-8-skeletal-muscle-movement',
  'module-3-environment',
  '3.4.8 Skeletal Muscles and Limb Movement',
  'Explain how skeletal muscles, joints, tendons and ligaments work together to move the limbs.',
  806,
  true,
  '{
    "syllabus":{"module":3,"topic":"Forces","objective":"3.4.8","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain why skeletal muscles work in antagonistic pairs.",
        "Describe the action of biceps and triceps during elbow flexion and extension.",
        "Describe the action of quadriceps and hamstrings at the knee.",
        "Distinguish hinge, ball-and-socket, fixed and gliding joints.",
        "State that tendons attach muscle to bone.",
        "State that ligaments connect bone to bone.",
        "Explain why muscles can pull but cannot actively push."
      ],
      "introduction":"Skeletal muscles produce movement by contracting and pulling on bones across joints. Because muscles shorten when they contract and cannot actively push, opposite movements usually require antagonistic muscle pairs.",
      "sections":[
        {"title":"Antagonistic muscle pairs","paragraphs":[
          "Antagonistic muscles work in pairs so that one muscle contracts while the opposing muscle relaxes.",
          "This arrangement allows a limb to move in opposite directions."
        ]},
        {"title":"Biceps and triceps","paragraphs":[
          "To bend the arm at the elbow, the biceps contracts and the triceps relaxes.",
          "To straighten the arm, the triceps contracts and the biceps relaxes.",
          "The elbow is a hinge joint and mainly allows movement in one plane."
        ]},
        {"title":"Movement at the knee","paragraphs":[
          "The knee is also a hinge joint.",
          "When the leg is straightened at the knee, the quadriceps at the front of the thigh contracts while the hamstrings relax.",
          "When the knee bends, the hamstrings contract while the quadriceps relaxes."
        ]},
        {"title":"Joint types","paragraphs":[
          "Hinge joints include the elbow and knee and mainly allow movement in one plane.",
          "Ball-and-socket joints include the shoulder and hip and allow movement in many directions, including rotation.",
          "Fixed joints include the sutures of the cranium and allow little or no movement.",
          "Gliding joints allow small sliding movements and occur between some vertebrae and in the wrist and ankle regions."
        ]},
        {"title":"Tendons and ligaments","paragraphs":[
          "Tendons connect muscles to bones and transmit the pull produced by muscle contraction.",
          "Ligaments connect bone to bone across joints and help stabilise the joint."
        ]},
        {"title":"Why muscles pull","paragraphs":[
          "A skeletal muscle produces force when its fibres contract and shorten.",
          "It therefore pulls on its attachment but does not actively push a bone in the opposite direction.",
          "This is why antagonistic pairs are needed for opposing limb movements."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t4-8-skeletal-muscle-movement","type":"skeletal-muscle-movement","title":"Skeletal muscle and joint movement explorer"}],
      "keyPoints":[
        "Biceps and triceps are an antagonistic pair.",
        "Bending the elbow: biceps contracts, triceps relaxes.",
        "Straightening the elbow: triceps contracts, biceps relaxes.",
        "Straightening the knee: quadriceps contracts, hamstrings relax.",
        "Elbow and knee are hinge joints.",
        "Shoulder and hip are ball-and-socket joints.",
        "Cranial sutures are fixed joints.",
        "Tendons join muscle to bone.",
        "Ligaments join bone to bone."
      ],
      "workedExample":{
        "title":"Straightening the elbow",
        "prompt":"Which muscles contract and relax when the forearm is straightened at the elbow?",
        "steps":[
          "The elbow is a hinge joint.",
          "Extension requires the triceps to shorten.",
          "The opposing biceps relaxes."
        ],
        "answer":"The triceps contracts and the biceps relaxes."
      },
      "checks":[
        {"prompt":"Which muscle contracts to bend the elbow?","answer":"The biceps.","explanation":"The triceps relaxes during elbow flexion."},
        {"prompt":"What type of joint is the shoulder?","answer":"A ball-and-socket joint.","explanation":"It allows movement in many directions."},
        {"prompt":"What connects a muscle to a bone?","answer":"A tendon.","explanation":"Ligaments connect bone to bone."},
        {"prompt":"Why do muscles work in antagonistic pairs?","answer":"Muscles can pull when they contract but cannot actively push.","explanation":"An opposing muscle is needed to move the limb back in the opposite direction."}
      ],
      "summary":"Limb movement results from muscles pulling on bones across joints. Antagonistic pairs provide opposite movements, while tendons and ligaments connect and stabilise the system."
    }
  }'::jsonb
)
on conflict(subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
