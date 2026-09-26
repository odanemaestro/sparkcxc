begin;

-- CSEC Integrated Science objective 1.3.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-2-human-reproductive-organs',
  'module-1-organisms-life-processes',
  '1.3.2 Human Reproductive Organs',
  'Describe the main structures of the male and female reproductive systems and relate each organ to sperm production, ovum production, fertilisation and development.',
  110,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify the main organs of the male and female reproductive systems.",
        "Relate each reproductive organ to its function.",
        "Trace the pathway taken by sperm from the testes to the outside of the body.",
        "Trace the pathway of an ovum from the ovary to the uterus and identify the usual site of fertilisation.",
        "Explain why the testes are held in the scrotum outside the main body cavity."
      ],
      "introduction":"The human reproductive system contains specialised organs that produce gametes, transport them and support fertilisation and development. Learn each structure together with its function and pathway. This makes labelled diagrams and application questions easier to solve.",
      "sections":[
        {
          "title":"Male reproductive organs",
          "paragraphs":[
            "The testes produce sperm and the hormone testosterone. They lie in the scrotum outside the main body cavity. Sperm production works best at a temperature slightly below core body temperature.",
            "Sperm mature and are stored in the epididymis. During ejaculation they move through the sperm duct, also called the vas deferens, towards the urethra."
          ],
          "bullets":[
            "Seminal vesicles add fluid containing nutrients that support sperm.",
            "The prostate gland adds fluid to semen and helps create a suitable environment for sperm.",
            "Cowper''s glands add a small amount of lubricating and alkaline fluid to the urethra.",
            "The urethra carries semen through the penis to the outside of the body. In males it also carries urine, but urine and semen do not normally pass through at the same time.",
            "The penis deposits semen in the female reproductive tract during sexual intercourse."
          ]
        },
        {
          "title":"The sperm pathway",
          "paragraphs":[
            "A useful sequence is: testes to epididymis to sperm duct to urethra to penis. Fluids from the seminal vesicles, prostate gland and Cowper''s glands are added along the route to form semen.",
            "The testes make sperm, while the epididymis stores and matures them. Do not confuse either structure with the sperm duct, whose main role is transport."
          ]
        },
        {
          "title":"Female reproductive organs",
          "paragraphs":[
            "The ovaries produce ova and hormones including oestrogen and progesterone. Usually one ovum is released during ovulation and enters an oviduct, also called a Fallopian tube.",
            "The oviduct carries the ovum towards the uterus and is the usual site of fertilisation. If both oviducts are blocked, sperm cannot normally reach the ovum."
          ],
          "bullets":[
            "The uterus is a muscular organ where an embryo implants and the foetus develops.",
            "The endometrium is the inner lining of the uterus. It thickens during the menstrual cycle and supports implantation if pregnancy occurs.",
            "The cervix is the narrow muscular neck of the uterus. It opens into the vagina and dilates during childbirth.",
            "The vagina is a muscular canal that receives the penis and semen and forms part of the birth canal."
          ]
        },
        {
          "title":"The ovum pathway",
          "paragraphs":[
            "A useful sequence is: ovary to oviduct to uterus. Fertilisation usually occurs in the oviduct. The early embryo then moves to the uterus, where implantation normally occurs in the endometrium.",
            "The ovary is not the usual site of fertilisation, and the vagina is not the normal site of implantation."
          ]
        },
        {
          "title":"Structure and function together",
          "paragraphs":[
            "CSEC questions often give a function and ask for the organ, or give an organ and ask for the function. Study both directions. For example, sperm production identifies the testes, sperm storage identifies the epididymis, and normal fertilisation identifies the oviduct.",
            "When a question refers to the organ that widens during birth, the answer is the cervix. When it refers to the organ in which the foetus develops, the answer is the uterus."
          ]
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m1-t3-2-female-reproductive-system",
          "template":"female-reproductive-system",
          "title":"Label the female reproductive system",
          "instructions":"Drag each label to the correct structure. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"ovary","text":"Ovary","hint":"Look for the oval organ near the end of the oviduct.","explanation":"The ovaries produce ova and reproductive hormones including oestrogen and progesterone."},
            {"id":"oviduct","text":"Oviduct","hint":"This tube connects the region of the ovary to the uterus.","explanation":"The oviduct carries the ovum towards the uterus and is the usual site of fertilisation."},
            {"id":"uterus","text":"Uterus","hint":"Look for the central muscular organ.","explanation":"The uterus is where the embryo implants and the foetus develops."},
            {"id":"endometrium","text":"Endometrium","hint":"Look for the inner lining of the uterus.","explanation":"The endometrium thickens during the menstrual cycle and supports implantation."},
            {"id":"cervix","text":"Cervix","hint":"This is the narrow neck at the lower end of the uterus.","explanation":"The cervix connects the uterus to the vagina and dilates during childbirth."},
            {"id":"vagina","text":"Vagina","hint":"Look for the canal below the cervix.","explanation":"The vagina receives semen and forms part of the birth canal."}
          ],
          "targets":[
            {"id":"female-ovary-target","labelId":"ovary","boxX":20,"boxY":75,"anchorX":235,"anchorY":225,"side":"left"},
            {"id":"female-oviduct-target","labelId":"oviduct","boxX":20,"boxY":155,"anchorX":345,"anchorY":190,"side":"left"},
            {"id":"female-uterus-target","labelId":"uterus","boxX":20,"boxY":235,"anchorX":455,"anchorY":310,"side":"left"},
            {"id":"female-endometrium-target","labelId":"endometrium","boxX":790,"boxY":75,"anchorX":515,"anchorY":300,"side":"right"},
            {"id":"female-cervix-target","labelId":"cervix","boxX":790,"boxY":155,"anchorX":500,"anchorY":435,"side":"right"},
            {"id":"female-vagina-target","labelId":"vagina","boxX":790,"boxY":235,"anchorX":500,"anchorY":520,"side":"right"}
          ]
        },
        {
          "id":"m1-t3-2-male-reproductive-system",
          "template":"male-reproductive-system",
          "title":"Label the male reproductive system",
          "instructions":"Place each label on the correct structure. Use the numbered targets on portrait phone and tablet layouts.",
          "labels":[
            {"id":"testis","text":"Testis","hint":"Look inside the scrotum for the oval organ.","explanation":"The testes produce sperm and testosterone."},
            {"id":"scrotum","text":"Scrotum","hint":"This sac surrounds the testes outside the main body cavity.","explanation":"The scrotum holds the testes at a temperature slightly below core body temperature, which supports sperm production."},
            {"id":"epididymis","text":"Epididymis","hint":"Look for the coiled structure beside the testis.","explanation":"Sperm mature and are stored in the epididymis."},
            {"id":"sperm-duct","text":"Sperm duct","hint":"Trace the tube leaving the epididymis and travelling upward.","explanation":"The sperm duct, or vas deferens, carries sperm from the epididymis towards the urethra."},
            {"id":"seminal-vesicle","text":"Seminal vesicle","hint":"Look for the gland behind the bladder region.","explanation":"The seminal vesicles add nutrient-containing fluid to sperm."},
            {"id":"prostate","text":"Prostate gland","hint":"Look for the gland just below the bladder.","explanation":"The prostate gland adds fluid to semen and helps provide a suitable environment for sperm."},
            {"id":"cowper","text":"Cowper''s gland","hint":"Look for the small gland below the prostate.","explanation":"Cowper''s glands add lubricating and alkaline fluid to the urethra."},
            {"id":"urethra","text":"Urethra","hint":"Trace the tube passing through the penis.","explanation":"The male urethra carries semen and urine to the outside of the body at different times."},
            {"id":"penis","text":"Penis","hint":"Look for the external organ containing the urethra.","explanation":"The penis deposits semen in the female reproductive tract during sexual intercourse."}
          ],
          "targets":[
            {"id":"male-testis-target","labelId":"testis","boxX":20,"boxY":40,"anchorX":405,"anchorY":458,"side":"left"},
            {"id":"male-scrotum-target","labelId":"scrotum","boxX":20,"boxY":110,"anchorX":340,"anchorY":475,"side":"left"},
            {"id":"male-epididymis-target","labelId":"epididymis","boxX":20,"boxY":180,"anchorX":360,"anchorY":455,"side":"left"},
            {"id":"male-sperm-duct-target","labelId":"sperm-duct","boxX":20,"boxY":250,"anchorX":370,"anchorY":300,"side":"left"},
            {"id":"male-seminal-vesicle-target","labelId":"seminal-vesicle","boxX":790,"boxY":40,"anchorX":600,"anchorY":190,"side":"right"},
            {"id":"male-prostate-target","labelId":"prostate","boxX":790,"boxY":110,"anchorX":505,"anchorY":250,"side":"right"},
            {"id":"male-cowper-target","labelId":"cowper","boxX":790,"boxY":180,"anchorX":530,"anchorY":302,"side":"right"},
            {"id":"male-urethra-target","labelId":"urethra","boxX":790,"boxY":250,"anchorX":665,"anchorY":350,"side":"right"},
            {"id":"male-penis-target","labelId":"penis","boxX":790,"boxY":320,"anchorX":775,"anchorY":370,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "Testes produce sperm and testosterone; the epididymis stores and matures sperm.",
        "The sperm duct transports sperm to the urethra.",
        "Seminal vesicles, the prostate gland and Cowper''s glands add fluids that contribute to semen.",
        "The ovaries produce ova and reproductive hormones.",
        "Fertilisation normally occurs in an oviduct.",
        "The uterus supports development, the endometrium supports implantation, and the cervix forms the muscular neck of the uterus.",
        "The vagina receives semen and forms part of the birth canal."
      ],
      "workedExample":{
        "title":"Explaining blocked oviducts",
        "prompt":"A woman produces ova normally, but both oviducts are blocked. Explain why natural fertilisation is unlikely to occur.",
        "steps":[
          "An ovum released from an ovary normally enters an oviduct.",
          "Sperm must travel through the female reproductive tract to reach the ovum.",
          "The oviduct is the usual site where sperm and ovum meet.",
          "A blockage prevents the two gametes from meeting normally."
        ],
        "answer":"Natural fertilisation is unlikely because the blocked oviducts prevent sperm from reaching the ovum at the usual site of fertilisation."
      },
      "checks":[
        {
          "prompt":"Trace the pathway taken by sperm from where they are produced to the outside of the body.",
          "answer":"Testis to epididymis to sperm duct to urethra to penis.",
          "explanation":"The testes make sperm, the epididymis stores and matures them, and the ducts transport them."
        },
        {
          "prompt":"Why are the testes located in the scrotum outside the main body cavity?",
          "answer":"Sperm production requires a temperature slightly lower than core body temperature.",
          "explanation":"The scrotum helps keep the testes cooler than the abdominal cavity."
        },
        {
          "prompt":"Where does fertilisation normally occur, and where does the foetus develop?",
          "answer":"Fertilisation normally occurs in an oviduct, and the foetus develops in the uterus.",
          "explanation":"These structures have different roles in the reproductive pathway."
        },
        {
          "prompt":"Which structure dilates during childbirth?",
          "answer":"The cervix.",
          "explanation":"The cervix is the muscular neck of the uterus and widens during labour."
        }
      ],
      "summary":"Learn the reproductive systems as pathways rather than isolated names. Follow sperm from the testes outward and follow an ovum from the ovary through the oviduct to the uterus, linking every structure to its role."
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
values
(
  'integrated-science',
  'diagram:m1-t3-2-female-reproductive-system',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t3-2-human-reproductive-organs',
  'Label the female reproductive system',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t3-2-human-reproductive-organs',
  0.35,
  true,
  '{"syllabusObjective":"1.3.2","mode":"drag-drop-label"}'::jsonb
),
(
  'integrated-science',
  'diagram:m1-t3-2-male-reproductive-system',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t3-2-human-reproductive-organs',
  'Label the male reproductive system',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t3-2-human-reproductive-organs',
  0.35,
  true,
  '{"syllabusObjective":"1.3.2","mode":"drag-drop-label"}'::jsonb
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
  || '{"topicsBuilt":11,"objectivesBuilt":11}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
