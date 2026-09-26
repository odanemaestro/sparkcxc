begin;

-- CSEC Integrated Science objective 1.7.9
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t7-9-pest-control',
  'module-1-organisms-life-processes',
  '1.7.9 Control of Pests and Vectors',
  'Evaluate environmental, mechanical, biological and chemical methods used to control selected pests and vectors, including methods that target different mosquito life stages.',
  380,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Health",
      "objective":"1.7.9",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Describe the egg, larval, pupal and adult stages of the mosquito life cycle.",
        "Relate mosquito control methods to the life stage they target.",
        "Explain why source reduction is important in mosquito control.",
        "Compare environmental, mechanical, biological and chemical pest-control methods.",
        "Explain selected advantages and disadvantages of biological and chemical control.",
        "Recommend suitable household and community pest-control practices."
      ],
      "introduction":"Effective pest control targets the organism, its life stage and the conditions that allow it to survive. For mosquitoes, the larval and pupal stages depend on water, while adults fly and bite above the water. Source reduction and sanitation are therefore central to prevention.",
      "sections":[
        {
          "title":"Mosquito life cycle",
          "paragraphs":[
            "Mosquitoes pass through egg, larva, pupa and adult stages. Larvae and pupae are aquatic, while the adult leaves the water and flies.",
            "The CSEC bank identifies the larva and pupa as important water stages that can be targeted before adult mosquitoes emerge."
          ]
        },
        {
          "title":"Source reduction",
          "paragraphs":[
            "Source reduction means removing or preventing mosquito breeding sites. Emptying containers, disposing of old tyres, clearing blocked areas and tightly covering stored water stop mosquitoes from completing their aquatic development.",
            "For household Aedes control, regular removal or management of water-holding containers is the most important starting point."
          ]
        },
        {
          "title":"Biological control",
          "paragraphs":[
            "Biological control uses living organisms to reduce a pest population. The CSEC bank uses guppy fish as an example because they feed on mosquito larvae in suitable water bodies.",
            "A biological control organism must be chosen carefully. An introduced organism may affect non-target species or become a problem itself if used in an unsuitable ecosystem."
          ]
        },
        {
          "title":"Mechanical and physical control",
          "paragraphs":[
            "Mechanical control physically removes or kills pests. Fly swatters and rodent traps are simple examples.",
            "Physical barriers such as window screens reduce entry of adult mosquitoes and flies. Covered water tanks prevent mosquitoes from reaching water to lay eggs."
          ]
        },
        {
          "title":"Chemical control",
          "paragraphs":[
            "Chemical control includes approved larvicides and insecticides. These can be useful when properly selected and applied, especially in organised vector-control programmes.",
            "Repeated or inappropriate chemical use can select for insecticide resistance, contaminate the environment and harm non-target organisms. Labels and public-health directions should be followed."
          ]
        },
        {
          "title":"The CSEC oil-film mechanism",
          "paragraphs":[
            "A banked CSEC question asks why a thin oil film on stagnant water can kill mosquito larvae and pupae. The film interferes with access to air at the water surface, so the aquatic stages can suffocate.",
            "This mechanism should not be interpreted as advice to pour oil into drains, ponds or natural water bodies. Removing standing water or using locally approved vector-control methods is safer and more appropriate."
          ]
        },
        {
          "title":"Controlling adult mosquitoes",
          "paragraphs":[
            "Screens, protective clothing, repellents and suitable bed nets reduce contact with adult mosquitoes. Public-health authorities may also use targeted adult insecticides during outbreaks.",
            "Adult control alone is less effective if large numbers of breeding sites remain. Larval habitat and adult exposure should be addressed together."
          ]
        },
        {
          "title":"Sanitation and other household pests",
          "paragraphs":[
            "Proper garbage storage, regular waste removal, covered food and removal of clutter reduce food and shelter for flies, cockroaches and rodents.",
            "Good sanitation is preventive because it changes the environment instead of waiting until a large pest population is established."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t7-9-pest-control",
          "type":"pest-control",
          "title":"Pest and vector control explorer"
        }
      ],
      "keyPoints":[
        "Mosquitoes pass through egg, larva, pupa and adult stages.",
        "Larvae and pupae develop in water.",
        "Removing standing water targets mosquito development before adults emerge.",
        "Guppy fish are a CSEC example of biological larval control.",
        "Screens and traps are physical or mechanical control methods.",
        "Chemical control can produce resistance and non-target environmental effects if misused.",
        "A thin oil film can block aquatic mosquito stages from accessing air, but source reduction or approved controls are preferred in practice.",
        "Sanitation reduces food and shelter for flies, cockroaches and rodents."
      ],
      "workedExample":{
        "title":"Choosing controls for different mosquito stages",
        "prompt":"A yard contains uncovered drums with mosquito larvae and many adult mosquitoes entering a bedroom. Recommend one control for the aquatic stages and one for the adults.",
        "steps":[
          "Identify the larvae as an aquatic life stage.",
          "Remove the breeding source by emptying or tightly covering the drums where possible.",
          "Identify the adult mosquito as the flying stage.",
          "Use intact window or door screens and appropriate personal protection to reduce adult entry and bites."
        ],
        "answer":"Remove or tightly cover the standing-water source to prevent larval development, and use screens or other suitable personal protection against adult mosquitoes."
      },
      "checks":[
        {
          "prompt":"Which mosquito stages live in water?",
          "answer":"The larval and pupal stages.",
          "explanation":"Egg placement varies by mosquito type, but larvae and pupae are aquatic."
        },
        {
          "prompt":"Why do guppy fish reduce mosquito larvae?",
          "answer":"They feed on mosquito larvae in suitable water bodies.",
          "explanation":"This is biological control because a living organism reduces the pest population."
        },
        {
          "prompt":"State one disadvantage of repeated insecticide misuse.",
          "answer":"It can select for insecticide-resistant pest populations or harm non-target organisms.",
          "explanation":"Chemical control should be targeted and used according to approved guidance."
        },
        {
          "prompt":"Why is removing standing water usually better than controlling only adult mosquitoes?",
          "answer":"It removes the breeding habitat and prevents many mosquitoes from reaching the adult stage.",
          "explanation":"Source reduction interrupts the life cycle before adults emerge."
        }
      ],
      "summary":"Select pest-control methods by identifying the pest, the life stage and the environmental conditions supporting it. Source reduction and sanitation prevent problems, while mechanical, biological and chemical methods add targeted control where appropriate."
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
  || '{"topicsBuilt":38,"objectivesBuilt":38}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
