begin;

-- CSEC Integrated Science objective 2.2.6
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t2-6-breathing-mechanism',
  'module-2-energy',
  '2.2.6 Mechanism of Breathing',
  'Examine inhalation and exhalation using respiratory anatomy, muscle action, pressure-volume changes, air composition, a bell-jar model and current CPR principles.',
  510,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Energy in Life Processes",
      "objective":"2.2.6",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify the trachea, bronchi, lungs, ribs and diaphragm.",
        "Explain inhalation using diaphragm and intercostal muscle contraction.",
        "Explain exhalation using muscle relaxation, reduced chest volume and increased pressure.",
        "Relate thoracic volume changes to pressure differences and airflow.",
        "Interpret the bell-jar model of breathing and state its limitations.",
        "Compare selected components of inhaled and exhaled air.",
        "Outline the first response to an unresponsive adult and the basic principles of CPR."
      ],
      "introduction":"Breathing moves air into and out of the lungs because respiratory muscles change the volume of the thoracic cavity. Changes in volume create pressure differences between the lungs and the atmosphere, causing air to move.",
      "sections":[
        {
          "title":"Respiratory structures",
          "paragraphs":[
            "Air passes through the trachea, which is supported by rings of cartilage that help keep the airway open. The trachea divides into bronchi that enter the lungs.",
            "The ribs and intercostal muscles form part of the chest wall. The diaphragm is a sheet of muscle beneath the lungs."
          ]
        },
        {
          "title":"Inhalation",
          "paragraphs":[
            "During quiet inhalation, the diaphragm contracts and flattens. The external intercostal muscles contract so the ribs move up and out.",
            "The volume of the thoracic cavity increases. Pressure inside the lungs falls below atmospheric pressure, so air moves into the lungs.",
            "Inhalation requires energy because respiratory muscles contract."
          ]
        },
        {
          "title":"Exhalation",
          "paragraphs":[
            "During quiet exhalation, the diaphragm relaxes and becomes more dome-shaped. The ribs move down and in as the inspiratory muscles relax and elastic tissues recoil.",
            "Thoracic volume decreases. Pressure in the lungs rises above atmospheric pressure, so air moves out."
          ]
        },
        {
          "title":"Bell-jar model",
          "paragraphs":[
            "In the bell-jar model, balloons represent the lungs and the rubber sheet represents the diaphragm.",
            "Pulling the sheet down increases the volume inside the jar and lowers pressure, so air enters and the balloons inflate.",
            "Pushing the sheet up decreases volume and raises pressure, so air leaves and the balloons deflate.",
            "The model is limited because the rigid jar does not reproduce rib and intercostal muscle movement accurately."
          ]
        },
        {
          "title":"Inhaled and exhaled air",
          "paragraphs":[
            "Inhaled air contains about 21% oxygen, while exhaled air contains about 16% oxygen in the bank example because some oxygen diffuses into the blood.",
            "Exhaled air contains more carbon dioxide and water vapour than inhaled air. Nitrogen remains close to 78% because relatively little is exchanged."
          ]
        },
        {
          "title":"Initial response and CPR",
          "paragraphs":[
            "Before beginning CPR, check that the area is safe and whether the person responds. Activate emergency help and assess whether the person is breathing normally.",
            "For an adult who is unresponsive and not breathing normally or only gasping, current AHA guidance recommends chest compressions at about 100 to 120 per minute.",
            "For trained rescuers using conventional CPR without an advanced airway, cycles of 30 compressions followed by 2 breaths remain standard. Rescue breaths supply oxygen to the lungs while compressions circulate blood.",
            "For an untrained bystander who witnesses a sudden adult collapse, hands-only CPR is an accepted approach while emergency help and an AED are obtained."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t2-6-breathing-mechanism",
          "type":"breathing-mechanism",
          "title":"Breathing, pressure and CPR explorer"
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m2-t2-6-respiratory-system",
          "template":"human-respiratory-system",
          "title":"Label the human respiratory system",
          "instructions":"Drag each label to the correct structure. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"trachea","text":"Trachea","hint":"Look for the airway tube running down the neck.","explanation":"The trachea conducts air and is supported by cartilage rings."},
            {"id":"bronchi","text":"Bronchi","hint":"Look for the two main branches entering the lungs.","explanation":"The bronchi carry air from the trachea into each lung."},
            {"id":"lungs","text":"Lungs","hint":"Look for the paired organs filling most of the chest cavity.","explanation":"The lungs contain the branching airways and alveoli used for gaseous exchange."},
            {"id":"ribs","text":"Ribs","hint":"Look for the curved structures surrounding the lungs.","explanation":"Ribs protect the thoracic organs and move during breathing."},
            {"id":"diaphragm","text":"Diaphragm","hint":"Look for the curved muscular sheet below the lungs.","explanation":"The diaphragm changes thoracic volume during breathing."}
          ],
          "targets":[
            {"id":"resp-trachea-target","labelId":"trachea","boxX":20,"boxY":65,"anchorX":500,"anchorY":180,"side":"left"},
            {"id":"resp-bronchi-target","labelId":"bronchi","boxX":20,"boxY":145,"anchorX":500,"anchorY":270,"side":"left"},
            {"id":"resp-ribs-target","labelId":"ribs","boxX":20,"boxY":225,"anchorX":335,"anchorY":285,"side":"left"},
            {"id":"resp-lungs-target","labelId":"lungs","boxX":790,"boxY":95,"anchorX":585,"anchorY":330,"side":"right"},
            {"id":"resp-diaphragm-target","labelId":"diaphragm","boxX":790,"boxY":190,"anchorX":500,"anchorY":445,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "The trachea is supported by cartilage rings.",
        "During inhalation the diaphragm contracts and flattens.",
        "The ribs move up and out during inhalation.",
        "Increasing thoracic volume lowers lung pressure and draws air in.",
        "During quiet exhalation the diaphragm relaxes and thoracic volume decreases.",
        "The bell-jar rubber sheet represents the diaphragm.",
        "Exhaled air contains less oxygen and more carbon dioxide and water vapour than inhaled air.",
        "Adult CPR compression rate is about 100 to 120 per minute.",
        "Conventional trained-rescuer CPR uses 30 compressions to 2 breaths before an advanced airway."
      ],
      "workedExample":{
        "title":"Explaining inhalation",
        "prompt":"Explain why air enters the lungs when the diaphragm contracts.",
        "steps":[
          "The diaphragm contracts and flattens.",
          "The ribs move up and out.",
          "Thoracic volume increases.",
          "Pressure inside the lungs falls below atmospheric pressure.",
          "Air moves into the lungs down the pressure gradient."
        ],
        "answer":"Diaphragm and intercostal muscle contraction increase thoracic volume, lowering lung pressure below atmospheric pressure, so air enters."
      },
      "checks":[
        {
          "prompt":"What happens to the diaphragm during inhalation?",
          "answer":"It contracts and flattens.",
          "explanation":"This increases thoracic volume."
        },
        {
          "prompt":"Why do the balloons inflate when the bell-jar rubber sheet is pulled down?",
          "answer":"The volume inside the jar increases and pressure falls, so air enters the balloons.",
          "explanation":"This models the pressure change during inhalation."
        },
        {
          "prompt":"Approximately how much oxygen is present in exhaled air in the bank example?",
          "answer":"About 16%.",
          "explanation":"Some inhaled oxygen diffuses into the blood."
        },
        {
          "prompt":"What is the current adult chest-compression rate used in the lesson?",
          "answer":"About 100 to 120 compressions per minute.",
          "explanation":"This matches current adult basic life support guidance."
        },
        {
          "prompt":"What should a first-aider check before starting CPR?",
          "answer":"Check scene safety, whether the person responds and whether the person is breathing normally, while activating emergency help.",
          "explanation":"Recognition and emergency activation come before or alongside starting CPR."
        }
      ],
      "summary":"Breathing is a pressure-driven mechanical process. Muscle action changes thoracic volume, pressure changes follow, and air moves down the resulting pressure gradient. The same pressure-volume principle is demonstrated by the bell-jar model."
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
  'diagram:m2-t2-6-respiratory-system',
  'diagram',
  'module-2-energy',
  'm2-t2-6-breathing-mechanism',
  'Label the human respiratory system',
  '/study/integrated-science?section=module-2-energy&topic=m2-t2-6-breathing-mechanism',
  0.35,
  true,
  '{"syllabusObjective":"2.2.6","mode":"drag-drop-label"}'::jsonb
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
  || '{"topicsBuilt":51,"objectivesBuilt":51}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
