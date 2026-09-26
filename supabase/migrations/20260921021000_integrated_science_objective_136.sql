begin;

-- CSEC Integrated Science objective 1.3.6
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-6-prenatal-postnatal-care',
  'module-1-organisms-life-processes',
  '1.3.6 Pre-natal and Post-natal Care',
  'Assess how nutrition, clinical monitoring, avoidance of harmful exposures, breastfeeding, immunisation and follow-up care support mothers and babies.',
  150,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.6",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain the importance of regular pre-natal care.",
        "Relate balanced nutrition, iron, folate and calcium to maternal and foetal health.",
        "Explain how smoking, alcohol and selected infections can harm the developing foetus.",
        "State suitable uses of ultrasound during pregnancy.",
        "Assess the value of breastfeeding and post-natal follow-up.",
        "Explain why childhood immunisation protects babies against infectious disease."
      ],
      "introduction":"Care during pregnancy and after birth reduces avoidable risks and helps health problems to be recognised early. Good care includes nutrition, clinical monitoring, safe choices about medicines and harmful substances, support for the mother after delivery and appropriate care of the newborn.",
      "sections":[
        {
          "title":"Regular pre-natal care",
          "paragraphs":[
            "Pre-natal, or antenatal, visits allow health professionals to monitor the mother and developing baby. Checks can include blood pressure, growth of the uterus, laboratory tests and assessment of the baby''s growth and position.",
            "Regular visits also provide opportunities to discuss nutrition, medicines, symptoms, vaccinations and preparation for birth."
          ]
        },
        {
          "title":"Nutrition during pregnancy",
          "paragraphs":[
            "A balanced diet supplies the energy, protein, vitamins and minerals needed by the mother and developing baby. Iron supports haemoglobin production and helps reduce the risk of iron-deficiency anaemia.",
            "Folate, also called folic acid in supplements, is especially important early in development because adequate intake reduces the risk of neural tube defects. Calcium and vitamin D support normal development of bones and teeth.",
            "Supplements should be taken according to health-care guidance because needs differ and excessive intake of some nutrients can also be harmful."
          ]
        },
        {
          "title":"Ultrasound and monitoring",
          "paragraphs":[
            "Ultrasound uses high-frequency sound waves to produce images. During pregnancy it can be used to estimate gestational age, check growth and position, identify multiple pregnancy and investigate some developmental concerns.",
            "Ultrasound does not use ionising X-rays."
          ]
        },
        {
          "title":"Smoking and tobacco exposure",
          "paragraphs":[
            "Carbon monoxide from tobacco smoke binds strongly to haemoglobin and reduces the amount of oxygen that the blood can transport. Nicotine can also affect blood vessels.",
            "Reduced oxygen and impaired placental blood flow can restrict foetal growth and increase the risk of low birth weight."
          ]
        },
        {
          "title":"Alcohol, drugs and radiation",
          "paragraphs":[
            "Alcohol crosses the placenta and can interfere with development of the foetal brain and other organs. Non-medical drug use can also create serious risks during pregnancy.",
            "A pregnant person should tell health-care providers about the pregnancy before taking medicines or having medical imaging. Unnecessary ionising radiation should be avoided, while medically necessary imaging should be assessed and managed by qualified professionals."
          ]
        },
        {
          "title":"Infections during pregnancy",
          "paragraphs":[
            "Some infections can damage a developing foetus. Rubella infection during early pregnancy is an important syllabus example because it can cause serious congenital problems.",
            "Prevention, vaccination before pregnancy where appropriate, good hygiene and prompt medical care reduce infection risks."
          ]
        },
        {
          "title":"Post-natal care of the mother",
          "paragraphs":[
            "Post-natal care checks that the mother is recovering after delivery. Health workers can assess bleeding, healing, blood pressure, emotional wellbeing and other health concerns.",
            "Post-natal visits also provide support with feeding, contraception, rest, nutrition and care of the newborn."
          ]
        },
        {
          "title":"Breastfeeding",
          "paragraphs":[
            "Breast milk provides suitable nutrients for early growth and contains antibodies and other protective factors. These antibodies give the baby passive protection against some infections.",
            "Breast milk is clean, readily available and normally at the correct temperature. Breastfeeding can also support close contact and bonding between mother and baby."
          ]
        },
        {
          "title":"Care of the newborn",
          "paragraphs":[
            "Newborn care includes monitoring growth, feeding, temperature and general health. Follow-up visits help identify problems early.",
            "Vaccines expose the immune system to safe forms or components of disease-causing organisms. This stimulates production of antibodies and memory cells so the child can respond more effectively if exposed to the disease later."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-6-maternal-baby-care",
          "type":"maternal-baby-care",
          "title":"Maternal and baby care"
        }
      ],
      "keyPoints":[
        "Regular pre-natal visits help monitor the health of mother and baby.",
        "Iron supports haemoglobin, folate reduces the risk of neural tube defects and calcium supports bones and teeth.",
        "Smoking can reduce oxygen reaching the foetus and is linked with low birth weight.",
        "Alcohol can interfere with foetal brain and organ development.",
        "Ultrasound uses sound waves to monitor growth, position and other features of pregnancy.",
        "Breast milk provides nutrients and antibodies that give passive protection.",
        "Post-natal care supports maternal recovery, infant feeding and newborn health.",
        "Immunisation stimulates active immune protection and memory cells."
      ],
      "workedExample":{
        "title":"Explaining low birth weight linked to smoking",
        "prompt":"Explain why smoking during pregnancy can increase the risk of a baby having a low birth weight.",
        "steps":[
          "Tobacco smoke contains carbon monoxide.",
          "Carbon monoxide binds to haemoglobin and reduces oxygen transport.",
          "Nicotine can also reduce blood flow through blood vessels.",
          "Less oxygen and poorer placental blood flow can restrict foetal growth."
        ],
        "answer":"Smoking can reduce the oxygen and blood supply available to the developing foetus. Growth may be restricted, increasing the risk of low birth weight."
      },
      "checks":[
        {
          "prompt":"Why are iron and folate important during pregnancy?",
          "answer":"Iron supports haemoglobin and helps prevent iron-deficiency anaemia. Folate reduces the risk of neural tube defects in the developing baby.",
          "explanation":"Both nutrients support important processes during maternal and foetal development."
        },
        {
          "prompt":"State two uses of ultrasound during pregnancy.",
          "answer":"Examples include checking foetal growth and position, estimating gestational age, identifying twins or investigating some abnormalities.",
          "explanation":"Ultrasound creates images using sound waves rather than ionising X-rays."
        },
        {
          "prompt":"Give two advantages of breastfeeding for a newborn baby.",
          "answer":"Breast milk provides suitable nutrients and contains antibodies that help protect against infection.",
          "explanation":"It also has practical advantages because it is clean and readily available."
        },
        {
          "prompt":"Why are babies immunised?",
          "answer":"Vaccination stimulates the immune system to make antibodies and memory cells against specific diseases.",
          "explanation":"This prepares the child for a faster protective response after later exposure."
        }
      ],
      "summary":"Pre-natal and post-natal care work together. Protect development before birth through nutrition, monitoring and avoidance of harmful exposures, then support recovery, feeding, growth and immunity after birth."
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
  || '{"topicsBuilt":15,"objectivesBuilt":15}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
