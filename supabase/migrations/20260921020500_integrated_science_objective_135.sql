begin;

-- CSEC Integrated Science objective 1.3.5
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-5-birth-control-methods',
  'module-1-organisms-life-processes',
  '1.3.5 Methods of Birth Control',
  'Compare behavioural, barrier, hormonal, intrauterine and surgical methods of birth control, including how they work, their limitations and STI protection.',
  140,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.5",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Classify common birth-control methods.",
        "Explain how selected methods reduce the chance of pregnancy.",
        "Compare temporary and permanent methods.",
        "Explain why fertility-awareness methods can be unreliable when ovulation varies.",
        "Identify methods that reduce sexual transmission of infections.",
        "Distinguish current IUD mechanisms from older simplified descriptions."
      ],
      "introduction":"Birth control includes methods used to reduce the chance of pregnancy. The methods differ in how they work, whether they require action each time sexual intercourse occurs, whether they contain hormones, and whether they are intended to be permanent. Preventing pregnancy and reducing STI transmission are separate issues.",
      "sections":[
        {
          "title":"Abstinence",
          "paragraphs":[
            "Abstinence from sexual intercourse prevents sperm from reaching an ovum and therefore prevents pregnancy while it is maintained.",
            "It also prevents sexual transmission of infections when sexual contact does not occur."
          ]
        },
        {
          "title":"Barrier methods",
          "paragraphs":[
            "Barrier methods physically prevent sperm from reaching the ovum. Examples include condoms, diaphragms and cervical caps.",
            "Condoms also reduce the transmission of many sexually transmitted infections because they reduce contact with semen and other body fluids. Diaphragms and cervical caps do not provide the same STI protection."
          ],
          "bullets":[
            "A condom must be used correctly each time sexual intercourse occurs.",
            "A condom can tear or slip if it is damaged or used incorrectly.",
            "Barrier methods do not permanently affect fertility."
          ]
        },
        {
          "title":"Hormonal methods",
          "paragraphs":[
            "Hormonal methods include contraceptive pills, injections, patches and implants. They mainly prevent ovulation and can also thicken cervical mucus.",
            "These methods do not protect against sexually transmitted infections. Correct use and appropriate medical guidance are important."
          ]
        },
        {
          "title":"Intrauterine devices",
          "paragraphs":[
            "An intrauterine device, or IUD, is a small device placed inside the uterus by a trained health-care provider. Copper and hormonal IUDs work in different ways.",
            "Copper IUDs interfere with sperm movement and fertilisation. Hormonal IUDs release progestin, thicken cervical mucus and inhibit sperm. IUDs do not protect against sexually transmitted infections.",
            "Some older school descriptions state that an IUD prevents implantation. Current medical guidance describes prevention of fertilisation and inhibition of sperm as the main mechanisms, so this lesson uses the current explanation while recognising the older exam wording."
          ]
        },
        {
          "title":"Fertility-awareness methods",
          "paragraphs":[
            "The rhythm or calendar method estimates the fertile part of the menstrual cycle and avoids unprotected intercourse during that period. The Billings method uses changes in cervical mucus as an indicator of fertility.",
            "These methods depend on recognising fertile days correctly. Ovulation can vary from one cycle to another, which makes prediction less reliable."
          ]
        },
        {
          "title":"Withdrawal",
          "paragraphs":[
            "Withdrawal involves removing the penis from the vagina before ejaculation. It is less reliable because withdrawal may be late and sperm may be present before full ejaculation.",
            "Withdrawal does not protect against sexually transmitted infections."
          ]
        },
        {
          "title":"Surgical methods",
          "paragraphs":[
            "A vasectomy cuts or blocks the sperm ducts so sperm do not enter the semen. Tubal ligation cuts or blocks the oviducts so sperm and ovum cannot meet.",
            "These procedures are intended as permanent methods. They do not protect against sexually transmitted infections."
          ]
        },
        {
          "title":"Comparing methods",
          "paragraphs":[
            "When comparing methods, consider how the method works, whether it is reversible, whether it depends on correct use each time, whether a health-care provider is needed and whether it reduces STI transmission.",
            "A condom is important because it is a contraceptive method that also reduces the risk of many STIs. Other contraceptive methods should not be assumed to provide STI protection."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-5-birth-control",
          "type":"birth-control",
          "title":"Birth control comparison"
        }
      ],
      "keyPoints":[
        "Barrier methods physically block sperm.",
        "Hormonal methods mainly prevent ovulation and may thicken cervical mucus.",
        "Fertility-awareness methods depend on estimating fertile days and can be affected by variation in ovulation.",
        "Vasectomy blocks sperm ducts and tubal ligation blocks oviducts.",
        "Condoms reduce transmission of many STIs as well as reducing the chance of pregnancy.",
        "IUDs are intrauterine methods and do not protect against STIs.",
        "Pregnancy prevention and STI protection should be considered separately."
      ],
      "workedExample":{
        "title":"Comparing a condom and the contraceptive pill",
        "prompt":"A student says that the contraceptive pill and a condom provide the same type of protection. Explain why this statement is incorrect.",
        "steps":[
          "Identify how each method prevents pregnancy.",
          "The pill is hormonal and mainly prevents ovulation.",
          "A condom is a physical barrier that prevents sperm from entering the female reproductive tract.",
          "Compare STI protection."
        ],
        "answer":"Both methods reduce the chance of pregnancy, but they work differently. The pill mainly prevents ovulation and does not protect against STIs. A condom forms a barrier and also reduces transmission of many STIs."
      },
      "checks":[
        {
          "prompt":"Why can the rhythm method be unreliable?",
          "answer":"The timing of ovulation can vary from one cycle to another.",
          "explanation":"The method depends on predicting the fertile part of the cycle."
        },
        {
          "prompt":"What is a vasectomy?",
          "answer":"A surgical procedure that cuts or blocks the sperm ducts.",
          "explanation":"Sperm are prevented from entering the semen."
        },
        {
          "prompt":"Which contraceptive method in this lesson also reduces transmission of many STIs?",
          "answer":"The condom.",
          "explanation":"It acts as a physical barrier that reduces exchange of semen and other body fluids."
        },
        {
          "prompt":"How does the Billings method estimate fertility?",
          "answer":"By observing changes in cervical mucus.",
          "explanation":"Changes in cervical mucus are used to identify likely fertile days."
        }
      ],
      "summary":"Know how each method works and what it does not do. A method can prevent pregnancy without protecting against infection. Compare mechanism, correct-use requirements, reversibility and STI protection."
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
  || '{"topicsBuilt":14,"objectivesBuilt":14}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
