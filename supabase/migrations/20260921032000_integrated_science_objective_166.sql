begin;

-- CSEC Integrated Science objective 1.6.6
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t6-6-endocrine-system',
  'module-1-organisms-life-processes',
  '1.6.6 Structure and Function of the Endocrine System',
  'Relate major endocrine glands to the hormones they release and explain hormone transport, target responses and coordination with the nervous system.',
  290,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Sense Organs and Coordination",
      "objective":"1.6.6",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define an endocrine gland and hormone.",
        "Identify the pituitary, thyroid, adrenal glands, pancreas, ovaries and testes.",
        "Relate selected glands to the hormones they release and their major effects.",
        "Explain how hormones reach target organs through the blood.",
        "Explain how insulin helps regulate blood glucose.",
        "Compare endocrine communication with nervous communication."
      ],
      "introduction":"The endocrine system coordinates body activities using hormones. Endocrine glands are ductless glands that release hormones into the blood. Hormones circulate throughout the body, but a cell responds only when it has suitable receptors for that hormone.",
      "sections":[
        {
          "title":"Hormones and endocrine glands",
          "paragraphs":[
            "A hormone is a chemical messenger produced in small amounts and transported in the blood to target cells or organs.",
            "Endocrine glands have no ducts. Their secretions enter the bloodstream directly.",
            "Because blood circulates throughout the body, one hormone can reach several organs at the same time. Only cells with the appropriate receptors produce the characteristic response."
          ]
        },
        {
          "title":"Pituitary gland and ADH",
          "paragraphs":[
            "The pituitary gland lies at the base of the brain below the hypothalamus and releases several hormones.",
            "Antidiuretic hormone, or ADH, is produced in the hypothalamus and stored and released from the posterior pituitary. ADH increases water reabsorption by the kidneys when the body needs to conserve water.",
            "The pituitary also releases hormones that influence the activity of other endocrine glands."
          ]
        },
        {
          "title":"Thyroid gland and thyroxine",
          "paragraphs":[
            "The thyroid gland is located in the neck. It produces thyroxine, a hormone that influences metabolic rate and supports normal growth and development.",
            "Iodine is required to make thyroid hormones. A long-term lack of iodine can reduce thyroid-hormone production and contribute to enlargement of the thyroid gland, called goitre."
          ]
        },
        {
          "title":"Adrenal glands and adrenaline",
          "paragraphs":[
            "One adrenal gland sits on top of each kidney. The adrenal glands release adrenaline during stressful or emergency situations.",
            "Adrenaline prepares the body for action. It increases heart rate and breathing rate and helps increase the availability of glucose for active tissues."
          ]
        },
        {
          "title":"Pancreas and insulin",
          "paragraphs":[
            "The pancreas has an endocrine role in regulating blood glucose. When blood glucose rises, specialised pancreatic cells release insulin into the blood.",
            "Insulin promotes uptake of glucose by body cells and promotes storage of glucose as glycogen, especially in the liver and muscles. These effects help blood glucose return towards its normal range.",
            "If the body produces too little insulin or does not respond effectively to insulin, blood glucose can remain abnormally high."
          ]
        },
        {
          "title":"Ovaries and testes",
          "paragraphs":[
            "The ovaries produce hormones including oestrogen and progesterone. Oestrogen contributes to female secondary sexual characteristics and changes in the uterine lining.",
            "The testes produce testosterone. Testosterone contributes to sperm production and male secondary sexual characteristics such as facial hair and deepening of the voice."
          ]
        },
        {
          "title":"Endocrine and nervous coordination",
          "paragraphs":[
            "The nervous system sends electrical impulses along neurones. These signals travel rapidly and usually produce short-lived, specific effects.",
            "The endocrine system sends hormones through the blood. Hormonal responses are usually slower to begin but often last longer.",
            "The two systems work together. For example, the hypothalamus receives nervous information and also influences endocrine responses through the pituitary."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t6-6-endocrine-system",
          "type":"endocrine-system",
          "title":"Endocrine glands and hormone action"
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m1-t6-6-endocrine-glands",
          "template":"endocrine-system",
          "title":"Label the major endocrine glands",
          "instructions":"Drag each label to the correct structure. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"pituitary","text":"Pituitary gland","hint":"Look at the small gland at the base of the brain.","explanation":"The pituitary releases several hormones, including release of stored ADH, and influences other endocrine glands."},
            {"id":"thyroid","text":"Thyroid gland","hint":"Look for the gland in the neck region.","explanation":"The thyroid produces thyroxine, which influences metabolic rate."},
            {"id":"adrenal","text":"Adrenal glands","hint":"Look for the small glands sitting above the kidneys.","explanation":"The adrenal glands release adrenaline during fight-or-flight responses."},
            {"id":"pancreas","text":"Pancreas","hint":"Look for the elongated gland across the upper abdomen.","explanation":"The pancreas releases insulin, which helps lower raised blood glucose."},
            {"id":"ovaries","text":"Ovaries","hint":"Look for the paired reproductive glands in the lower abdomen.","explanation":"The ovaries produce hormones including oestrogen and progesterone."},
            {"id":"testes","text":"Testes","hint":"Use the lower-right inset showing the male gonads.","explanation":"The testes produce testosterone and sperm."}
          ],
          "targets":[
            {"id":"endo-pituitary-target","labelId":"pituitary","boxX":20,"boxY":75,"anchorX":500,"anchorY":112,"side":"left"},
            {"id":"endo-thyroid-target","labelId":"thyroid","boxX":20,"boxY":155,"anchorX":500,"anchorY":202,"side":"left"},
            {"id":"endo-adrenal-target","labelId":"adrenal","boxX":20,"boxY":235,"anchorX":410,"anchorY":315,"side":"left"},
            {"id":"endo-pancreas-target","labelId":"pancreas","boxX":790,"boxY":75,"anchorX":500,"anchorY":430,"side":"right"},
            {"id":"endo-ovaries-target","labelId":"ovaries","boxX":790,"boxY":155,"anchorX":500,"anchorY":505,"side":"right"},
            {"id":"endo-testes-target","labelId":"testes","boxX":790,"boxY":235,"anchorX":750,"anchorY":480,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "Endocrine glands are ductless and release hormones into the blood.",
        "Target cells respond when they have receptors for a particular hormone.",
        "The pituitary lies at the base of the brain and releases several hormones.",
        "The thyroid produces thyroxine and requires iodine for normal thyroid-hormone production.",
        "The adrenal glands sit above the kidneys and release adrenaline.",
        "The pancreas releases insulin, which helps lower raised blood glucose.",
        "The ovaries produce oestrogen and progesterone, while the testes produce testosterone.",
        "Nerve impulses are fast and usually brief, while hormonal responses are generally slower and longer-lasting."
      ],
      "workedExample":{
        "title":"How insulin lowers raised blood glucose",
        "prompt":"A healthy person drinks a glucose solution and the blood glucose level rises. Explain how the endocrine system helps return the level towards normal.",
        "steps":[
          "The rise in blood glucose is detected by the pancreas.",
          "The pancreas releases insulin into the blood.",
          "Insulin travels to target tissues.",
          "Cells increase glucose uptake and the liver and muscles increase storage of glucose as glycogen.",
          "Blood glucose falls towards its normal range."
        ],
        "answer":"The pancreas releases insulin when blood glucose rises. Insulin promotes glucose uptake and glycogen storage, lowering blood glucose towards normal."
      },
      "checks":[
        {
          "prompt":"Which gland produces insulin?",
          "answer":"The pancreas.",
          "explanation":"Insulin helps lower raised blood glucose."
        },
        {
          "prompt":"Where are the adrenal glands located and which hormone is associated with fight or flight?",
          "answer":"The adrenal glands sit above the kidneys and release adrenaline.",
          "explanation":"Adrenaline prepares several organs for rapid action."
        },
        {
          "prompt":"Why can one hormone affect several organs at the same time?",
          "answer":"The hormone is carried throughout the body in the blood, and every target organ with suitable receptors can respond.",
          "explanation":"Hormone distribution is widespread even though receptor matching makes the response specific."
        },
        {
          "prompt":"Give one difference between nervous and endocrine communication.",
          "answer":"Nervous messages travel as rapid electrical impulses along neurones, while endocrine messages travel as hormones in the blood and usually act more slowly but for longer.",
          "explanation":"The two systems use different signalling mechanisms."
        }
      ],
      "summary":"Endocrine glands coordinate the body by releasing hormones into the blood. Learn each gland together with its hormone and effect, then compare the slower, longer-lasting endocrine response with rapid nervous signalling."
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
  'diagram:m1-t6-6-endocrine-glands',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t6-6-endocrine-system',
  'Label the major endocrine glands',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t6-6-endocrine-system',
  0.35,
  true,
  '{"syllabusObjective":"1.6.6","mode":"drag-drop-label"}'::jsonb
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
  || '{"topicsBuilt":29,"objectivesBuilt":29}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
