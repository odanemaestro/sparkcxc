begin;

-- CSEC Integrated Science objective 1.7.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t7-3-immunisation',
  'module-1-organisms-life-processes',
  '1.7.3 Immunisation and Control of Communicable Disease',
  'Outline how antigens, antibodies, memory cells, vaccination and community immunity help control communicable disease.',
  320,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Health",
      "objective":"1.7.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define immunity, antigen and antibody.",
        "Describe the roles of phagocytes and lymphocytes in defence.",
        "Explain how vaccination produces artificial active immunity.",
        "Explain why memory cells make a later immune response faster and stronger.",
        "Distinguish natural active, artificial active, natural passive and artificial passive immunity.",
        "Explain the purpose of booster doses.",
        "Explain how high community immunity can reduce transmission."
      ],
      "introduction":"Immunity is the ability of the body to resist a particular infection or reduce its effects. The immune system recognises antigens, produces specific responses and can form memory cells that prepare the body for a faster response after later exposure.",
      "sections":[
        {
          "title":"Antigens and antibodies",
          "paragraphs":[
            "An antigen is a molecule recognised as foreign by the immune system. Pathogens carry antigens that can trigger an immune response.",
            "Lymphocytes can produce antibodies that bind specifically to matching antigens. Antibodies can neutralise pathogens or toxins and can mark or clump pathogens so that they are removed more easily."
          ]
        },
        {
          "title":"Phagocytes and lymphocytes",
          "paragraphs":[
            "Phagocytes protect the body by engulfing and digesting pathogens.",
            "Lymphocytes provide specific immune responses. Some produce antibodies, while others become long-lived memory cells.",
            "These defences work together. Antibodies can help identify or clump pathogens, making them easier for phagocytes and other immune mechanisms to remove."
          ]
        },
        {
          "title":"How vaccination works",
          "paragraphs":[
            "Vaccination exposes the immune system to a harmless form of an antigen without requiring the person to first develop the target disease.",
            "Depending on the vaccine, the antigen may come from a weakened or inactivated pathogen, a purified part of a pathogen, or instructions that allow the body to make a harmless antigen.",
            "Lymphocytes respond by producing antibodies and memory cells. This is artificial active immunity because the antigen is provided deliberately and the person''s own immune system makes the response."
          ]
        },
        {
          "title":"Primary and secondary responses",
          "paragraphs":[
            "The first exposure to an antigen usually produces a slower primary immune response. During this response, specific lymphocytes multiply and memory cells are formed.",
            "If the same antigen enters again, memory cells respond more rapidly. The secondary response is usually faster and stronger, allowing the pathogen to be controlled before severe illness develops."
          ]
        },
        {
          "title":"Booster doses",
          "paragraphs":[
            "For some vaccines, protection decreases with time or several exposures are needed to build strong immunity.",
            "A booster dose exposes the immune system to the antigen again, increasing antibody levels and reinforcing immune memory."
          ]
        },
        {
          "title":"Natural active immunity",
          "paragraphs":[
            "Natural active immunity develops when a person is infected naturally and the immune system responds by producing its own antibodies and memory cells.",
            "For example, recovery from some infections can leave immune memory that reduces the chance of the same disease occurring again."
          ]
        },
        {
          "title":"Artificial active immunity",
          "paragraphs":[
            "Artificial active immunity develops after vaccination. The vaccine stimulates the person''s own immune system to form antibodies and memory cells.",
            "Because immune memory is produced, active immunity can last much longer than passive immunity."
          ]
        },
        {
          "title":"Natural passive immunity",
          "paragraphs":[
            "Natural passive immunity occurs when ready-made antibodies pass naturally from one person to another.",
            "A baby receives maternal antibodies before birth through the placenta and receives additional protective antibodies in breast milk. These antibodies provide immediate protection but do not create immune memory in the baby."
          ]
        },
        {
          "title":"Artificial passive immunity",
          "paragraphs":[
            "Artificial passive immunity is produced when ready-made antibodies are given medically.",
            "Examples include specific antibody preparations or antivenom. Protection begins quickly, but it is temporary because the antibodies are gradually broken down and the recipient does not form memory cells from the received antibodies."
          ]
        },
        {
          "title":"Community immunity",
          "paragraphs":[
            "When a large proportion of a community is immune to a communicable disease, the pathogen has fewer susceptible hosts through which to spread.",
            "Reduced transmission can indirectly protect people who are not immune, including some people who cannot receive a particular vaccine.",
            "The level of immunity needed for this effect differs among diseases because pathogens differ in how easily they spread."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t7-3-immunisation",
          "type":"immunisation",
          "title":"Immunity and immunisation"
        }
      ],
      "keyPoints":[
        "Antibodies bind specifically to matching antigens.",
        "Phagocytes engulf pathogens, while lymphocytes produce specific immune responses.",
        "Vaccination produces artificial active immunity by stimulating the person''s own immune system.",
        "Memory cells create a faster and stronger response after later exposure.",
        "Active immunity forms immune memory, while passive immunity provides ready-made antibodies without forming memory cells.",
        "Boosters reinforce immunity after another exposure to the vaccine antigen.",
        "High community immunity reduces opportunities for a pathogen to spread."
      ],
      "workedExample":{
        "title":"Classifying immunity after vaccination",
        "prompt":"A child receives a vaccine and later produces antibodies and memory cells against the pathogen. Classify the immunity as natural or artificial and as active or passive. Explain both choices.",
        "steps":[
          "The antigen was introduced deliberately through vaccination, so the immunity is artificial.",
          "The child''s own immune system produced antibodies and memory cells, so the immunity is active.",
          "The complete classification is artificial active immunity."
        ],
        "answer":"The immunity is artificial active. It is artificial because vaccination introduced the antigen deliberately and active because the child''s own immune system produced antibodies and memory cells."
      },
      "checks":[
        {
          "prompt":"What is an antibody?",
          "answer":"A protein made by lymphocytes that binds specifically to a matching antigen.",
          "explanation":"Antibody binding helps neutralise or mark pathogens for removal."
        },
        {
          "prompt":"Why is passive immunity usually short-lived?",
          "answer":"The person receives ready-made antibodies, which are gradually broken down, and no memory cells are formed from those antibodies.",
          "explanation":"Passive immunity gives immediate protection but does not train the immune system in the same way as active immunity."
        },
        {
          "prompt":"What is the purpose of a booster dose?",
          "answer":"To expose the immune system to the antigen again and strengthen antibody levels and immune memory.",
          "explanation":"Some vaccines require additional doses to maintain or strengthen protection."
        },
        {
          "prompt":"How can high vaccination coverage protect people who are not immune?",
          "answer":"It reduces the number of susceptible hosts and makes sustained transmission of the pathogen more difficult.",
          "explanation":"This indirect protection is often called community or herd immunity."
        }
      ],
      "summary":"Immunisation works by preparing immune memory before later exposure to a pathogen. Active immunity makes memory cells, passive immunity supplies ready-made antibodies, and high levels of immunity in a community can reduce transmission."
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
  || '{"topicsBuilt":32,"objectivesBuilt":32}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
