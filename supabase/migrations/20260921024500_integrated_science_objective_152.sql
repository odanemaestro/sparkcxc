begin;

-- CSEC Integrated Science objective 1.5.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t5-2-human-excretion-mechanisms',
  'module-1-organisms-life-processes',
  '1.5.2 Excretion by the Lungs, Skin and Kidneys',
  'Explain how the lungs, skin and kidneys remove metabolic wastes and regulate water and salts, including nephron function, ADH and dialysis.',
  220,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Excretion",
      "objective":"1.5.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain how carbon dioxide and water vapour are excreted by the lungs.",
        "Explain how sweat glands excrete water, mineral salts and a small amount of urea.",
        "Describe the gross structure of the kidney and the route of urine to the bladder.",
        "Explain ultrafiltration and selective reabsorption in the nephron.",
        "Relate ADH to water reabsorption and urine concentration.",
        "Explain the principles of dialysis when kidneys fail."
      ],
      "introduction":"The lungs, skin and kidneys all remove substances from the internal body environment, but they do so in different ways. The lungs remove gaseous wastes, the skin removes substances in sweat, and the kidneys filter the blood and regulate its water and salt content.",
      "sections":[
        {
          "title":"Excretion by the lungs",
          "paragraphs":[
            "Carbon dioxide is produced during aerobic respiration in body cells and is carried in the blood to the lungs.",
            "At the alveoli, carbon dioxide diffuses from the blood into the air spaces because its concentration is higher in the blood than in the alveolar air. It leaves the body when the person exhales.",
            "Water vapour is also lost from the moist respiratory surfaces and leaves in exhaled air."
          ]
        },
        {
          "title":"Excretion by the skin",
          "paragraphs":[
            "Sweat glands in the dermis produce sweat containing mainly water and mineral salts, with a small amount of urea.",
            "Sweat travels through ducts to pores at the skin surface. When it evaporates, heat is removed from the skin, helping to cool the body.",
            "When the body is too hot, more sweat is produced and blood vessels near the skin surface dilate so more heat can be lost."
          ]
        },
        {
          "title":"Gross structure of the kidney",
          "paragraphs":[
            "The kidney has an outer cortex, an inner medulla and a central pelvis. The pelvis collects urine and leads into the ureter.",
            "The ureter carries urine from each kidney to the bladder. The bladder stores urine before it leaves through the urethra.",
            "Many glomeruli and Bowman''s capsules are found in the cortex, while loops of Henle and collecting ducts extend into the medulla."
          ]
        },
        {
          "title":"The nephron",
          "paragraphs":[
            "A nephron is the functional unit of the kidney. It begins with Bowman''s capsule surrounding a glomerulus and continues through the proximal coiled tubule, loop of Henle, distal tubule and collecting duct."
          ]
        },
        {
          "title":"Ultrafiltration",
          "paragraphs":[
            "Blood enters the glomerulus under relatively high pressure. Water and small dissolved substances such as glucose, urea and mineral salts are forced through the filtration barrier into Bowman''s capsule.",
            "Blood cells and large plasma proteins normally remain in the blood because they are too large to pass through the filtration barrier."
          ]
        },
        {
          "title":"Selective reabsorption",
          "paragraphs":[
            "Useful substances are returned from the filtrate to the blood as the filtrate passes along the nephron.",
            "In a healthy person, all filtered glucose is normally reabsorbed, mainly in the proximal coiled tubule. Much of the water and needed mineral salts are also reabsorbed.",
            "The remaining fluid contains urea together with excess water and mineral salts. This becomes urine and passes into collecting ducts."
          ]
        },
        {
          "title":"Water balance and ADH",
          "paragraphs":[
            "Antidiuretic hormone, ADH, helps regulate the amount of water reabsorbed by the kidney tubules and collecting ducts.",
            "When a person loses much water through sweating, the blood becomes more concentrated. More ADH is released by the pituitary gland, more water is reabsorbed, and a small volume of concentrated urine is produced.",
            "After drinking a large amount of water, less ADH is released. Less water is reabsorbed and a larger volume of dilute urine is produced."
          ]
        },
        {
          "title":"What healthy urine contains",
          "paragraphs":[
            "Healthy urine normally contains water, urea and dissolved mineral salts. It should not normally contain significant amounts of glucose or large proteins.",
            "Protein molecules are normally too large to pass through the glomerular filtration barrier. Glucose is filtered but normally reabsorbed completely."
          ]
        },
        {
          "title":"Dialysis",
          "paragraphs":[
            "If the kidneys fail, wastes and excess water and salts can accumulate in the blood. Dialysis can remove these substances from the blood.",
            "In haemodialysis, the patient''s blood flows past dialysis fluid across a partially permeable membrane. Urea diffuses from the blood into the dialysis fluid because the fluid initially contains little or no urea.",
            "The dialysis fluid contains glucose and appropriate mineral salts at concentrations similar to normal blood so that useful substances are not lost in large amounts.",
            "Dialysis can keep a patient alive but is time-consuming, expensive and carries risks such as infection. A kidney transplant may be another treatment option for some patients."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t5-2-human-excretion-mechanisms",
          "type":"human-excretion-mechanisms",
          "title":"Human excretion mechanisms"
        }
      ],
      "keyPoints":[
        "The lungs excrete carbon dioxide and water vapour.",
        "Sweat contains water, mineral salts and a small amount of urea.",
        "Ultrafiltration occurs at the glomerulus and Bowman''s capsule.",
        "Selective reabsorption returns useful substances such as glucose to the blood.",
        "ADH increases water reabsorption and reduces urine volume when the body needs to conserve water.",
        "Healthy urine normally contains urea, water and salts but not significant glucose or large proteins.",
        "Dialysis removes urea and excess water and salts when kidneys fail."
      ],
      "workedExample":{
        "title":"Explaining concentrated urine on a hot day",
        "prompt":"A student plays football in the hot sun and drinks very little water. Later, the student produces a small volume of dark urine. Explain the change.",
        "steps":[
          "The student loses water by sweating.",
          "The blood becomes more concentrated.",
          "The pituitary releases more ADH.",
          "The kidney tubules and collecting ducts reabsorb more water.",
          "Less water remains in the urine, so the urine volume is small and more concentrated."
        ],
        "answer":"Water loss in sweat increases ADH release. More water is reabsorbed by the kidneys, producing a small volume of concentrated urine."
      },
      "checks":[
        {
          "prompt":"What is ultrafiltration?",
          "answer":"The filtration of water and small dissolved substances from blood in the glomerulus into Bowman''s capsule under pressure.",
          "explanation":"Blood cells and large proteins normally remain in the blood."
        },
        {
          "prompt":"Why is glucose normally absent from the urine of a healthy person?",
          "answer":"Although glucose is filtered at the glomerulus, it is normally completely reabsorbed into the blood.",
          "explanation":"Most glucose reabsorption occurs in the proximal coiled tubule."
        },
        {
          "prompt":"How does ADH affect urine when the body is short of water?",
          "answer":"More ADH increases water reabsorption, producing a smaller volume of more concentrated urine.",
          "explanation":"This helps conserve body water."
        },
        {
          "prompt":"Why does dialysis fluid contain glucose and salts at concentrations similar to normal blood?",
          "answer":"So there is little or no concentration gradient causing useful glucose and necessary salts to leave the blood.",
          "explanation":"The main aim is to remove wastes such as urea and correct excess water and salt levels."
        }
      ],
      "summary":"Excretion by the lungs, skin and kidneys depends on different mechanisms. Diffusion removes carbon dioxide at the lungs, sweat glands release water and salts at the skin, and the kidneys use filtration, selective reabsorption and hormonal control to regulate the blood and form urine."
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
  || '{"topicsBuilt":22,"objectivesBuilt":22}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
