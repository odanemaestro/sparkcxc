begin;

-- CSEC Integrated Science objective 1.6.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t6-1-sense-organs-functions',
  'module-1-organisms-life-processes',
  '1.6.1 Sense Organs and Their Functions',
  'Describe the eye, ear, nose, tongue and skin as sense organs containing receptors that detect stimuli and produce nerve impulses.',
  240,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Sense Organs and Coordination",
      "objective":"1.6.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Name the five major sense organs and the main stimuli they detect.",
        "Explain that receptors convert stimuli into nerve impulses.",
        "Distinguish photoreceptors, mechanoreceptors and chemoreceptors by the stimuli they detect.",
        "Explain how smell contributes to the flavour of food.",
        "Explain why receptor density affects sensitivity in different parts of the skin."
      ],
      "introduction":"A stimulus is a change in the internal or external environment that can be detected. Sense organs contain specialised receptor cells that respond to particular stimuli and convert them into nerve impulses that travel towards the central nervous system.",
      "sections":[
        {
          "title":"Receptors and stimuli",
          "paragraphs":[
            "Receptors are specialised cells or nerve endings that detect specific kinds of change. When stimulated strongly enough, they generate electrical nerve impulses.",
            "The nervous system receives and processes these impulses, allowing the body to become aware of changes and respond appropriately."
          ]
        },
        {
          "title":"The eye",
          "paragraphs":[
            "The eye detects light. Light-sensitive receptor cells called rods and cones are found in the retina.",
            "These photoreceptors convert light energy into nerve impulses that pass along the optic nerve towards the brain."
          ]
        },
        {
          "title":"The ear",
          "paragraphs":[
            "The ear detects sound vibrations. Mechanoreceptors in the inner ear respond when sound causes structures to vibrate.",
            "Other receptors in the inner ear respond to movement and position of the head and therefore contribute to balance."
          ]
        },
        {
          "title":"The nose",
          "paragraphs":[
            "The nose detects chemicals carried in the air. Odour molecules dissolve in the mucus lining the nose and stimulate chemoreceptors.",
            "The resulting nerve impulses travel to the brain and are interpreted as smell."
          ]
        },
        {
          "title":"The tongue",
          "paragraphs":[
            "Taste buds on the tongue contain chemoreceptors that detect chemicals dissolved in saliva.",
            "Taste and smell work together to produce flavour. When the nose is blocked during a cold, fewer smell signals reach the brain and food may seem to have little flavour even though taste receptors are still working."
          ]
        },
        {
          "title":"The skin",
          "paragraphs":[
            "The skin contains receptors for touch, pressure, pain and temperature. Different receptor types respond to different kinds of stimulus.",
            "Sensitivity varies across the body. Fingertips contain many touch receptors packed into a small area and are therefore especially sensitive to fine touch."
          ]
        },
        {
          "title":"From stimulus to response",
          "paragraphs":[
            "A general sequence is: stimulus, receptor, nerve impulse, central nervous system and then, where appropriate, a response.",
            "This same principle forms the basis of later work on neurones, reflex actions and coordination."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t6-1-sense-organs",
          "type":"sense-organs",
          "title":"Sense organs and receptors"
        }
      ],
      "keyPoints":[
        "The eye detects light using photoreceptors in the retina.",
        "The ear detects sound and contributes to balance using mechanoreceptors.",
        "The nose detects chemicals in the air using chemoreceptors.",
        "The tongue detects chemicals dissolved in saliva using taste receptors.",
        "The skin contains receptors for touch, pressure, pain and temperature.",
        "Receptors convert stimuli into nerve impulses.",
        "Smell contributes strongly to flavour.",
        "Areas with a high density of touch receptors, such as fingertips, are especially sensitive."
      ],
      "workedExample":{
        "title":"Why food tastes bland during a cold",
        "prompt":"A student with a blocked nose says that food has almost no flavour, even though the tongue is not injured. Explain why.",
        "steps":[
          "Taste buds still detect chemicals dissolved in saliva.",
          "A blocked nose reduces the movement of odour molecules to smell receptors.",
          "Fewer smell impulses reach the brain.",
          "Flavour depends on information from both taste and smell."
        ],
        "answer":"Food seems bland because smell is reduced. Taste receptors on the tongue still work, but fewer odour signals combine with taste information to create flavour."
      },
      "checks":[
        {
          "prompt":"Which sense organ detects chemicals dissolved in saliva?",
          "answer":"The tongue.",
          "explanation":"Taste receptors in taste buds respond to chemicals dissolved in saliva."
        },
        {
          "prompt":"What do sensory receptors produce when they are stimulated?",
          "answer":"Nerve impulses.",
          "explanation":"Receptors convert stimulus energy into electrical signals in the nervous system."
        },
        {
          "prompt":"Why are fingertips highly sensitive to touch?",
          "answer":"They contain a high density of touch receptors.",
          "explanation":"More receptors in a small area allow finer discrimination of touch."
        },
        {
          "prompt":"Which sense organ detects chemicals in the air?",
          "answer":"The nose.",
          "explanation":"Odour molecules stimulate chemoreceptors after dissolving in nasal mucus."
        }
      ],
      "summary":"Each sense organ contains receptors specialised for particular stimuli. These receptors convert changes such as light, sound, chemicals, pressure or temperature into nerve impulses that the nervous system can process."
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
  || '{"topicsBuilt":24,"objectivesBuilt":24}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
