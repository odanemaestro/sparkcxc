begin;

-- CSEC Integrated Science objective 1.6.5
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t6-5-nervous-system',
  'module-1-organisms-life-processes',
  '1.6.5 Structure and Function of the Nervous System',
  'Relate the brain, spinal cord and neurones to coordination, voluntary and involuntary actions, reflexes and nerve-impulse transmission.',
  280,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Sense Organs and Coordination",
      "objective":"1.6.5",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify the brain and spinal cord as the central nervous system.",
        "Relate the cerebrum, cerebellum, hypothalamus and medulla oblongata to their functions.",
        "Distinguish sensory, relay and motor neurones.",
        "Relate the structure of a motor neurone and myelin sheath to impulse transmission.",
        "Trace the pathway of an impulse through a reflex arc.",
        "Distinguish voluntary from involuntary actions.",
        "Explain why spinal cord damage can affect movement below the site of injury."
      ],
      "introduction":"The nervous system detects changes, transmits electrical impulses and coordinates rapid responses. The brain and spinal cord form the central nervous system, while nerves connect the central nervous system to receptors, muscles and glands throughout the body.",
      "sections":[
        {
          "title":"The central nervous system",
          "paragraphs":[
            "The central nervous system, or CNS, consists of the brain and spinal cord.",
            "The brain receives and processes information and coordinates many responses. The spinal cord carries impulses between the brain and the body and provides pathways for many reflex actions."
          ]
        },
        {
          "title":"Cerebrum",
          "paragraphs":[
            "The cerebrum is the largest part of the brain. It is involved in conscious thought, memory, learning, interpretation of sensory information and voluntary actions.",
            "Actions such as writing, choosing to walk and kicking a football involve conscious control by the cerebrum."
          ]
        },
        {
          "title":"Cerebellum",
          "paragraphs":[
            "The cerebellum coordinates muscle activity and helps maintain balance and posture.",
            "Damage to the cerebellum can make movements poorly coordinated and can disturb balance."
          ]
        },
        {
          "title":"Medulla oblongata",
          "paragraphs":[
            "The medulla oblongata helps control involuntary activities such as breathing rate and heartbeat.",
            "These vital processes continue without conscious control."
          ]
        },
        {
          "title":"Hypothalamus and pituitary link",
          "paragraphs":[
            "The hypothalamus helps monitor conditions such as body temperature and the water content of the blood.",
            "It also links nervous coordination with the endocrine system and influences the pituitary gland at the base of the brain.",
            "The pituitary releases hormones including ADH and also regulates several other endocrine glands. The endocrine system is examined in more detail in the next objective."
          ]
        },
        {
          "title":"The spinal cord",
          "paragraphs":[
            "The spinal cord contains nervous tissue and carries impulses between the brain and many parts of the body.",
            "A serious spinal cord injury can interrupt impulse pathways. Muscles and sensory structures below the injury may lose normal communication with the brain, leading to paralysis or loss of sensation."
          ]
        },
        {
          "title":"Types of neurone",
          "paragraphs":[
            "Sensory neurones carry impulses from receptors towards the central nervous system.",
            "Relay neurones are found within the central nervous system and connect sensory pathways with motor pathways.",
            "Motor neurones carry impulses from the central nervous system to effectors such as muscles or glands."
          ]
        },
        {
          "title":"Motor neurone structure",
          "paragraphs":[
            "A motor neurone has a cell body containing the nucleus, branching dendrites, a long axon and nerve endings.",
            "The long axon allows impulses to travel over a considerable distance. The fatty myelin sheath around much of the axon electrically insulates the nerve fibre and increases the speed of impulse transmission."
          ]
        },
        {
          "title":"The reflex arc",
          "paragraphs":[
            "A reflex is a rapid automatic response to a stimulus. A typical reflex pathway is: receptor, sensory neurone, relay neurone, motor neurone and effector.",
            "For example, when the skin detects a harmful hot object, impulses travel through the reflex arc and a muscle contracts to withdraw the hand.",
            "The protective response begins rapidly through the spinal cord without waiting for a conscious decision, although information is also passed to the brain."
          ]
        },
        {
          "title":"Voluntary and involuntary actions",
          "paragraphs":[
            "A voluntary action is under conscious control. Examples include writing, answering a telephone and kicking a ball.",
            "An involuntary action occurs automatically. Examples include the knee-jerk reflex, blinking when dust enters the eye and regulation of heartbeat.",
            "Reflex actions are important because they are rapid and can protect the body from injury."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t6-5-nervous-system",
          "type":"nervous-system",
          "title":"Nervous system and reflex pathways"
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m1-t6-5-human-brain",
          "template":"human-brain",
          "title":"Label the human brain",
          "instructions":"Drag each label to the correct structure. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"cerebrum","text":"Cerebrum","hint":"Look for the large upper part of the brain.","explanation":"The cerebrum is involved in thinking, memory, sensory interpretation and voluntary actions."},
            {"id":"cerebellum","text":"Cerebellum","hint":"Look for the smaller rounded region at the lower back of the brain.","explanation":"The cerebellum coordinates muscle activity and balance."},
            {"id":"medulla","text":"Medulla oblongata","hint":"Look for the lower brainstem just above the spinal cord.","explanation":"The medulla helps control involuntary functions such as breathing and heartbeat."},
            {"id":"hypothalamus","text":"Hypothalamus","hint":"Look for the small region near the base of the cerebrum above the pituitary.","explanation":"The hypothalamus monitors conditions including body temperature and water balance and helps control the pituitary."},
            {"id":"pituitary","text":"Pituitary gland","hint":"Look for the small gland hanging below the hypothalamus.","explanation":"The pituitary releases hormones including ADH and influences other endocrine glands."},
            {"id":"spinal-cord","text":"Spinal cord","hint":"Look for the nervous tissue extending downward from the brainstem.","explanation":"The spinal cord carries impulses between brain and body and coordinates many reflexes."}
          ],
          "targets":[
            {"id":"brain-cerebrum-target","labelId":"cerebrum","boxX":20,"boxY":75,"anchorX":480,"anchorY":170,"side":"left"},
            {"id":"brain-hypothalamus-target","labelId":"hypothalamus","boxX":20,"boxY":155,"anchorX":500,"anchorY":330,"side":"left"},
            {"id":"brain-pituitary-target","labelId":"pituitary","boxX":20,"boxY":235,"anchorX":500,"anchorY":383,"side":"left"},
            {"id":"brain-cerebellum-target","labelId":"cerebellum","boxX":790,"boxY":75,"anchorX":650,"anchorY":405,"side":"right"},
            {"id":"brain-medulla-target","labelId":"medulla","boxX":790,"boxY":155,"anchorX":545,"anchorY":440,"side":"right"},
            {"id":"brain-spinal-target","labelId":"spinal-cord","boxX":790,"boxY":235,"anchorX":560,"anchorY":555,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "The brain and spinal cord form the central nervous system.",
        "The cerebrum controls conscious activities, memory and voluntary actions.",
        "The cerebellum coordinates movement and balance.",
        "The medulla oblongata helps control breathing and heartbeat.",
        "The hypothalamus monitors body temperature and water balance and influences the pituitary gland.",
        "Sensory neurones carry impulses to the CNS, relay neurones connect pathways within the CNS, and motor neurones carry impulses to effectors.",
        "Myelin insulates axons and increases the speed of impulse transmission.",
        "A reflex arc follows receptor to sensory neurone to relay neurone to motor neurone to effector."
      ],
      "workedExample":{
        "title":"Tracing a withdrawal reflex",
        "prompt":"A student accidentally touches a hot metal surface and immediately pulls the hand away. Trace the pathway of the nerve impulse and explain why the action is protective.",
        "steps":[
          "Heat or pain receptors in the skin detect the harmful stimulus.",
          "A sensory neurone carries an impulse to the spinal cord.",
          "A relay neurone passes the impulse within the spinal cord.",
          "A motor neurone carries the impulse to an arm or hand muscle.",
          "The muscle contracts and withdraws the hand.",
          "The response is rapid and automatic, reducing the time the skin remains in contact with the hot surface."
        ],
        "answer":"The impulse travels receptor → sensory neurone → relay neurone → motor neurone → effector. The rapid automatic response helps protect the body from injury."
      },
      "checks":[
        {
          "prompt":"Which part of the brain controls thinking, memory and many voluntary actions?",
          "answer":"The cerebrum.",
          "explanation":"The cerebrum is responsible for conscious activity and interpretation of sensory information."
        },
        {
          "prompt":"State the correct sequence through a simple reflex arc.",
          "answer":"Receptor → sensory neurone → relay neurone → motor neurone → effector.",
          "explanation":"The relay neurone lies within the central nervous system."
        },
        {
          "prompt":"What is the function of a motor neurone?",
          "answer":"It carries nerve impulses from the central nervous system to an effector such as a muscle or gland.",
          "explanation":"The effector then produces the response."
        },
        {
          "prompt":"What is the function of the myelin sheath?",
          "answer":"It insulates the axon and increases the speed of nerve-impulse transmission.",
          "explanation":"Myelin reduces loss of electrical signal and supports faster conduction."
        }
      ],
      "summary":"The nervous system coordinates rapid communication. The brain and spinal cord process information, neurones carry impulses, and reflex arcs provide fast automatic responses that protect the body."
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

insert into public.spark_subject_activity_catalog(
  subject_id,activity_key,activity_type,section_id,topic_id,title,route,evidence_weight,enabled,metadata
)
values (
  'integrated-science',
  'diagram:m1-t6-5-human-brain',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t6-5-nervous-system',
  'Label the human brain',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t6-5-nervous-system',
  0.35,
  true,
  '{"syllabusObjective":"1.6.5","mode":"drag-drop-label"}'::jsonb
)
on conflict (subject_id,activity_key) do update set
  activity_type=excluded.activity_type,
  section_id=excluded.section_id,
  topic_id=excluded.topic_id,
  title=excluded.title,
  route=excluded.route,
  evidence_weight=excluded.evidence_weight,
  enabled=excluded.enabled,
  metadata=excluded.metadata,
  updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)
  || '{"topicsBuilt":28,"objectivesBuilt":28}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
