begin;

-- CSEC Integrated Science objective 1.3.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-3-menstrual-cycle',
  'module-1-organisms-life-processes',
  '1.3.3 The Menstrual Cycle',
  'Analyse changes in the uterine lining, ovulation, oestrogen and progesterone during a typical menstrual cycle and relate hormone changes to menstruation.',
  120,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define menstruation and ovulation.",
        "Describe changes in the uterine lining during a typical menstrual cycle.",
        "Relate oestrogen to rebuilding of the uterine lining.",
        "Relate progesterone to maintenance of the uterine lining after ovulation.",
        "Explain why a fall in progesterone is associated with the start of menstruation when pregnancy does not occur.",
        "Estimate the likely time of ovulation in a regular cycle using the approximate interval before the next period."
      ],
      "introduction":"The menstrual cycle is a repeating sequence of changes in the ovaries and uterus. A 28-day cycle is often used as a teaching example, but real cycles differ in length and timing. The important skill is to understand the pattern and the relationship among ovulation, the uterine lining and hormone levels.",
      "sections":[
        {
          "title":"Menstruation",
          "paragraphs":[
            "Day 1 is the first day of menstrual bleeding. During menstruation, the thickened lining of the uterus breaks down and is shed with blood and tissue.",
            "In a typical 28-day teaching cycle, menstruation commonly occupies about Days 1 to 5. The exact duration varies among individuals and from cycle to cycle."
          ]
        },
        {
          "title":"Rebuilding the uterine lining",
          "paragraphs":[
            "After menstruation, the endometrium repairs and becomes thicker again. Oestrogen produced by the developing ovarian follicle contributes to this rebuilding.",
            "Oestrogen generally rises during the first half of the cycle and reaches a high level before ovulation."
          ]
        },
        {
          "title":"Ovulation",
          "paragraphs":[
            "Ovulation is the release of a mature ovum from an ovary. In a typical 28-day cycle, ovulation is often shown around Day 14.",
            "Cycle length varies, so Day 14 should not be treated as a fixed date for every person. For a regular cycle, ovulation is often estimated at roughly 14 days before the next menstrual period."
          ]
        },
        {
          "title":"Progesterone after ovulation",
          "paragraphs":[
            "After ovulation, progesterone levels rise. Progesterone helps maintain the thick endometrium so that it is ready for possible implantation.",
            "If pregnancy does not occur, progesterone levels fall near the end of the cycle. The uterine lining is no longer maintained and a new menstrual period begins."
          ]
        },
        {
          "title":"Reading a menstrual-cycle graph",
          "paragraphs":[
            "First identify the horizontal axis and the day of the cycle. Then look for the fall in lining thickness during menstruation, the rebuilding before ovulation and the maintained thick lining after ovulation.",
            "On a simplified hormone graph, oestrogen rises before ovulation. Progesterone is low before ovulation, rises afterwards and falls again if pregnancy does not occur."
          ]
        },
        {
          "title":"Estimating ovulation in a regular cycle",
          "paragraphs":[
            "An approximate rule is to count back about 14 days from the expected start of the next period. For a regular 30-day cycle, this gives an estimate around Day 16.",
            "This is an estimate, not a guarantee. Biological cycles vary and calendar prediction alone should not be treated as a precise indicator of fertility."
          ]
        },
        {
          "title":"Menopause",
          "paragraphs":[
            "Menopause is the stage when menstrual cycles permanently stop as ovarian activity declines. Oestrogen levels fall and ovulation ceases.",
            "Menopause is a normal biological stage and should not be confused with a temporary missed period."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-3-menstrual-cycle",
          "type":"menstrual-cycle",
          "title":"Menstrual cycle model"
        }
      ],
      "keyPoints":[
        "Menstruation is the shedding of the uterine lining.",
        "Ovulation is the release of an ovum from an ovary.",
        "Oestrogen helps rebuild and thicken the uterine lining before ovulation.",
        "Progesterone helps maintain the uterine lining after ovulation.",
        "If pregnancy does not occur, progesterone falls and menstruation begins.",
        "Day 14 is a teaching estimate for a 28-day cycle, not a fixed ovulation day for every cycle.",
        "Menopause is the permanent stopping of menstrual cycles as ovarian activity declines."
      ],
      "workedExample":{
        "title":"Estimating ovulation in a 30-day cycle",
        "prompt":"A woman has a regular 30-day menstrual cycle. Estimate the cycle day on which ovulation is most likely to occur.",
        "steps":[
          "Use the approximate rule that ovulation occurs about 14 days before the next period.",
          "The next period is expected after a 30-day cycle.",
          "Count back about 14 days from the end of the cycle.",
          "30 minus 14 gives approximately Day 16."
        ],
        "answer":"Ovulation is estimated around Day 16. This is only an estimate because menstrual cycles vary."
      },
      "checks":[
        {
          "prompt":"What is ovulation?",
          "answer":"The release of a mature ovum from an ovary.",
          "explanation":"In a typical 28-day teaching cycle this is often shown around Day 14."
        },
        {
          "prompt":"What happens to the uterine lining during menstruation?",
          "answer":"The lining breaks down and is shed with blood and tissue.",
          "explanation":"Day 1 of menstrual bleeding marks the start of a new cycle."
        },
        {
          "prompt":"What is the main role of progesterone after ovulation?",
          "answer":"It helps maintain the thickened uterine lining ready for possible implantation.",
          "explanation":"A fall in progesterone when pregnancy does not occur is associated with breakdown of the lining."
        },
        {
          "prompt":"Why should Day 14 not be treated as the ovulation day for every menstrual cycle?",
          "answer":"Cycle length and timing vary. Day 14 is an estimate based on a typical 28-day cycle.",
          "explanation":"Ovulation is often estimated more generally as about 14 days before the next period."
        }
      ],
      "summary":"Analyse the cycle as a sequence. Menstruation removes the old lining, oestrogen helps rebuild it, ovulation releases an ovum, progesterone maintains the lining afterwards, and falling progesterone leads into the next period if pregnancy does not occur."
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
  || '{"topicsBuilt":12,"objectivesBuilt":12}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
