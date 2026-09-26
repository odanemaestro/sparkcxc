begin;

-- CSEC Integrated Science objective 1.3.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-4-stages-pregnancy',
  'module-1-organisms-life-processes',
  '1.3.4 Stages of Pregnancy',
  'Discuss fertilisation, implantation, embryo and foetal development, placental exchange, protection of the foetus and the stages of labour.',
  130,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.4",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Outline the sequence from fertilisation to implantation.",
        "Distinguish between the embryo and foetus stages.",
        "Describe the roles of the placenta, umbilical cord, amnion and amniotic fluid.",
        "Explain how substances are exchanged between mother and foetus without normal direct mixing of their blood.",
        "State the approximate duration of human pregnancy.",
        "Describe the three stages of labour in the correct order."
      ],
      "introduction":"Pregnancy begins after fertilisation and continues through implantation, embryonic development, foetal growth and birth. Each stage depends on specialised structures that exchange materials, protect the developing baby and maintain a suitable environment inside the uterus.",
      "sections":[
        {
          "title":"Fertilisation and the zygote",
          "paragraphs":[
            "Fertilisation is the fusion of the nucleus of a sperm with the nucleus of an ovum. It normally occurs in an oviduct and produces a zygote.",
            "The zygote begins repeated cell divisions as it moves towards the uterus. The number of cells increases while the developing structure remains small enough to travel through the oviduct."
          ]
        },
        {
          "title":"Implantation",
          "paragraphs":[
            "About a week after fertilisation, the early embryo reaches the uterus and becomes attached to the thickened endometrium. This attachment is called implantation.",
            "Implantation should not be confused with fertilisation. Fertilisation usually occurs in an oviduct, while implantation occurs in the lining of the uterus."
          ]
        },
        {
          "title":"Embryo and foetus",
          "paragraphs":[
            "During the early weeks, major body structures and organ systems begin to form. The developing human is called an embryo during this early period.",
            "From about eight weeks after fertilisation, when the main body plan and major organs have formed, the developing human is called a foetus. Growth and maturation continue for the remainder of pregnancy."
          ]
        },
        {
          "title":"Placenta and umbilical cord",
          "paragraphs":[
            "The placenta develops where the embryo is attached to the uterine lining. It provides a large, thin exchange surface between the maternal and foetal circulations.",
            "Oxygen, glucose, amino acids, water, mineral ions and some antibodies can pass from the mother towards the foetus. Carbon dioxide and urea pass from the foetus towards the mother.",
            "The mother''s blood and the foetus''s blood normally remain in separate blood vessels and do not mix directly. Materials cross the placental barrier between the two circulations."
          ],
          "bullets":[
            "The umbilical cord contains blood vessels that carry foetal blood between the foetus and the placenta.",
            "The placenta does not act as a perfect barrier. Harmful substances such as alcohol, nicotine and some drugs can cross it."
          ]
        },
        {
          "title":"Amnion and amniotic fluid",
          "paragraphs":[
            "The foetus develops within a fluid-filled amniotic sac. The amnion is the membrane surrounding this space.",
            "Amniotic fluid cushions the foetus against mechanical shocks, allows movement and helps maintain a stable physical environment."
          ]
        },
        {
          "title":"Length of pregnancy",
          "paragraphs":[
            "Human pregnancy lasts about nine months. Clinically, gestation is commonly described as about 40 weeks when counted from the first day of the last menstrual period.",
            "The exact date of birth varies, so 40 weeks is an approximate reference rather than a fixed deadline."
          ]
        },
        {
          "title":"Twins",
          "paragraphs":[
            "Identical twins develop when one fertilised egg divides into two embryos. They therefore have the same genetic information apart from later mutations.",
            "Non-identical twins develop from two separate ova fertilised by two separate sperm and are genetically similar to ordinary brothers or sisters."
          ]
        },
        {
          "title":"The three stages of labour",
          "paragraphs":[
            "During the first stage, rhythmic contractions of the uterus become stronger and the cervix dilates.",
            "During the second stage, strong contractions push the baby through the cervix and vagina. Crowning occurs when the baby''s head becomes visible at the vaginal opening, followed by delivery of the baby.",
            "During the third stage, the uterus continues to contract, the placenta separates from the uterine wall and is expelled through the vagina as the afterbirth."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-4-pregnancy-stages",
          "type":"pregnancy-stages",
          "title":"Pregnancy and birth stages"
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m1-t3-4-pregnancy-uterus",
          "template":"pregnancy-uterus",
          "title":"Label the foetus in the uterus",
          "instructions":"Place each label on the correct pregnancy structure. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"placenta","text":"Placenta","hint":"Look for the specialised tissue attached to the uterine wall.","explanation":"The placenta is the exchange organ between maternal and foetal circulations."},
            {"id":"umbilical-cord","text":"Umbilical cord","hint":"Look for the cord joining the foetus to the placenta.","explanation":"The umbilical cord contains blood vessels carrying foetal blood between the foetus and placenta."},
            {"id":"foetus","text":"Foetus","hint":"Look for the developing baby inside the amniotic sac.","explanation":"The developing human is called a foetus from about eight weeks after fertilisation."},
            {"id":"amnion","text":"Amnion","hint":"Look for the membrane surrounding the fluid-filled space.","explanation":"The amnion forms the membrane of the amniotic sac."},
            {"id":"amniotic-fluid","text":"Amniotic fluid","hint":"Look for the fluid-filled space surrounding the foetus.","explanation":"Amniotic fluid cushions the foetus against shocks and allows movement."},
            {"id":"cervix","text":"Cervix","hint":"Look for the narrow muscular neck at the lower end of the uterus.","explanation":"The cervix dilates during the first stage of labour."}
          ],
          "targets":[
            {"id":"pregnancy-placenta-target","labelId":"placenta","boxX":20,"boxY":75,"anchorX":350,"anchorY":270,"side":"left"},
            {"id":"pregnancy-umbilical-target","labelId":"umbilical-cord","boxX":20,"boxY":155,"anchorX":470,"anchorY":300,"side":"left"},
            {"id":"pregnancy-amnion-target","labelId":"amnion","boxX":20,"boxY":235,"anchorX":630,"anchorY":195,"side":"left"},
            {"id":"pregnancy-foetus-target","labelId":"foetus","boxX":790,"boxY":75,"anchorX":570,"anchorY":320,"side":"right"},
            {"id":"pregnancy-fluid-target","labelId":"amniotic-fluid","boxX":790,"boxY":155,"anchorX":610,"anchorY":410,"side":"right"},
            {"id":"pregnancy-cervix-target","labelId":"cervix","boxX":790,"boxY":235,"anchorX":500,"anchorY":545,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "Fertilisation is fusion of sperm and ovum nuclei and normally occurs in an oviduct.",
        "Implantation is attachment of the embryo to the endometrium.",
        "The developing human is called a foetus from about eight weeks after fertilisation.",
        "The placenta exchanges materials between maternal and foetal circulations without normal direct mixing of their blood.",
        "The umbilical cord carries foetal blood between the foetus and placenta.",
        "Amniotic fluid cushions the foetus against shocks.",
        "Human pregnancy lasts about nine months, approximately 40 weeks by clinical dating.",
        "Labour proceeds through cervical dilation, delivery of the baby and expulsion of the placenta."
      ],
      "workedExample":{
        "title":"Explaining placental exchange",
        "prompt":"State two substances that move from mother to foetus, one substance that moves from foetus to mother, and explain whether the two blood supplies normally mix.",
        "steps":[
          "Choose substances needed by the foetus, such as oxygen and glucose.",
          "Choose a foetal waste product, such as carbon dioxide or urea.",
          "State that the maternal and foetal blood remain in separate vessels.",
          "Explain that substances cross the placental exchange surface."
        ],
        "answer":"Oxygen and glucose can pass from mother to foetus, while carbon dioxide can pass from foetus to mother. The two blood supplies normally remain separate while materials cross the placenta."
      },
      "checks":[
        {
          "prompt":"What is implantation?",
          "answer":"The attachment of the early embryo to the lining of the uterus.",
          "explanation":"Implantation occurs after the dividing zygote reaches the uterus."
        },
        {
          "prompt":"What is the function of amniotic fluid?",
          "answer":"It cushions the foetus against mechanical shocks and allows movement.",
          "explanation":"The fluid surrounds the foetus within the amniotic sac."
        },
        {
          "prompt":"What does the umbilical cord carry?",
          "answer":"Foetal blood between the foetus and the placenta.",
          "explanation":"Its vessels connect the foetal circulation to the placenta."
        },
        {
          "prompt":"State the three stages of labour in order.",
          "answer":"Cervical dilation, delivery of the baby, then separation and expulsion of the placenta.",
          "explanation":"The placenta is expelled after the baby as the afterbirth."
        }
      ],
      "summary":"Follow pregnancy as a sequence: fertilisation, cell division, implantation, embryo development, foetal growth and labour. Link each stage to the placenta, umbilical cord, amnion, amniotic fluid and cervix."
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
  'diagram:m1-t3-4-pregnancy-uterus',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t3-4-stages-pregnancy',
  'Label the foetus in the uterus',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t3-4-stages-pregnancy',
  0.35,
  true,
  '{"syllabusObjective":"1.3.4","mode":"drag-drop-label"}'::jsonb
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
  || '{"topicsBuilt":13,"objectivesBuilt":13}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
