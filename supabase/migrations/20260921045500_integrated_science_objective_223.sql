begin;

-- CSEC Integrated Science objective 2.2.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t2-3-teeth-structure-function',
  'module-2-energy',
  '2.2.3 Teeth Structure and Function',
  'Relate the structure of human teeth to their functions in mechanical digestion and examine dental formula, chewing, tooth decay and dental-health practices.',
  480,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Energy in Life Processes",
      "objective":"2.2.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify incisors, canines, premolars and molars and relate shape to function.",
        "State the adult human dental formula and total number of teeth.",
        "Identify crown, root, enamel, dentine, pulp cavity and gum in a tooth.",
        "Explain how chewing supports digestion.",
        "Explain how plaque bacteria and sugar contribute to tooth decay.",
        "Describe practices that reduce tooth decay and gum disease."
      ],
      "introduction":"Teeth begin digestion mechanically. Their shapes are suited to cutting, tearing, crushing and grinding food. Internal tooth structures protect the living tissues while roots anchor the teeth in the jaw.",
      "sections":[
        {
          "title":"Types of human teeth",
          "paragraphs":[
            "Incisors have chisel-shaped edges and are used mainly for biting and cutting.",
            "Canines have pointed crowns and are used for gripping and tearing.",
            "Premolars have broader crowns with cusps and are used for crushing and grinding.",
            "Molars have large broad crowns with several cusps and are used mainly for crushing and grinding."
          ]
        },
        {
          "title":"Adult dental formula",
          "paragraphs":[
            "A complete adult dentition has, on each side of each jaw, 2 incisors, 1 canine, 2 premolars and 3 molars.",
            "The adult dental formula is 2.1.2.3 / 2.1.2.3. Multiplying both upper and lower counts by the two sides of the mouth gives 32 teeth when third molars are present."
          ]
        },
        {
          "title":"Structure of a tooth",
          "paragraphs":[
            "The crown is the visible part above the gum. The root is embedded in the jaw and holds the tooth in its socket.",
            "Enamel forms the hard outer covering of the crown and is the hardest substance in the human body.",
            "Dentine lies beneath the enamel and forms most of the tooth.",
            "The pulp cavity contains nerves and blood vessels that supply the living tissues of the tooth.",
            "The gum surrounds the neck of the tooth and helps protect the tissues around the tooth socket."
          ]
        },
        {
          "title":"Why chewing helps digestion",
          "paragraphs":[
            "Chewing breaks large pieces of food into many smaller pieces. This increases the total surface area exposed to digestive enzymes.",
            "Mechanical digestion therefore makes later chemical digestion more efficient without changing the chemical identity of the food molecules."
          ]
        },
        {
          "title":"Tooth decay",
          "paragraphs":[
            "Plaque is a sticky film containing bacteria. When plaque bacteria use sugars from food and drinks, they produce acids.",
            "Repeated acid exposure removes mineral from enamel. If this continues, a cavity can form and spread into dentine and eventually towards the pulp."
          ]
        },
        {
          "title":"Protecting teeth and gums",
          "paragraphs":[
            "Brushing twice daily with fluoride toothpaste helps remove plaque and expose enamel to fluoride. Fluoride makes enamel more resistant to acid attack.",
            "Cleaning between teeth with floss or another suitable interdental method removes plaque and trapped food from areas a toothbrush may not reach well.",
            "Reducing frequent sugary snacks and drinks lowers repeated acid attacks. Regular dental visits help detect and manage problems early."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t2-3-teeth-function",
          "type":"teeth-function",
          "title":"Tooth types, dental formula and dental-health explorer"
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m2-t2-3-human-tooth",
          "template":"human-tooth",
          "title":"Label the structure of a human tooth",
          "instructions":"Drag each label to the correct tooth structure. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"crown","text":"Crown","hint":"Look for the part of the tooth above the gum line.","explanation":"The crown is the visible part of the tooth above the gum."},
            {"id":"root","text":"Root","hint":"Look for the lower part embedded in the jaw socket.","explanation":"The root anchors the tooth in the jaw."},
            {"id":"enamel","text":"Enamel","hint":"Look for the hard outer layer covering the crown.","explanation":"Enamel is the hardest substance in the human body and protects the crown."},
            {"id":"dentine","text":"Dentine","hint":"Look beneath the enamel for the layer forming most of the tooth.","explanation":"Dentine forms most of the tooth and lies beneath enamel."},
            {"id":"pulp","text":"Pulp cavity","hint":"Look for the central soft region containing vessels and nerves.","explanation":"The pulp cavity contains nerves and blood vessels."},
            {"id":"gum","text":"Gum","hint":"Look for the soft tissue surrounding the neck of the tooth.","explanation":"The gum protects tissues around the tooth and jaw socket."}
          ],
          "targets":[
            {"id":"tooth-crown-target","labelId":"crown","boxX":20,"boxY":55,"anchorX":500,"anchorY":95,"side":"left"},
            {"id":"tooth-enamel-target","labelId":"enamel","boxX":20,"boxY":130,"anchorX":405,"anchorY":165,"side":"left"},
            {"id":"tooth-dentine-target","labelId":"dentine","boxX":20,"boxY":205,"anchorX":450,"anchorY":220,"side":"left"},
            {"id":"tooth-pulp-target","labelId":"pulp","boxX":790,"boxY":80,"anchorX":500,"anchorY":220,"side":"right"},
            {"id":"tooth-gum-target","labelId":"gum","boxX":790,"boxY":155,"anchorX":610,"anchorY":350,"side":"right"},
            {"id":"tooth-root-target","labelId":"root","boxX":790,"boxY":230,"anchorX":520,"anchorY":500,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "Incisors cut and bite.",
        "Canines grip and tear.",
        "Premolars and molars crush and grind.",
        "A complete adult dentition contains 32 teeth when third molars are present.",
        "The root anchors the tooth in the jaw.",
        "Enamel is the hardest substance in the human body.",
        "The pulp cavity contains nerves and blood vessels.",
        "Chewing increases the surface area available to digestive enzymes.",
        "Plaque bacteria produce acids from sugars that can damage enamel.",
        "Brushing, interdental cleaning, fluoride and sensible sugar intake help protect teeth and gums."
      ],
      "workedExample":{
        "title":"Explaining why chewing helps digestion",
        "prompt":"Explain why a person who chews food thoroughly helps the later action of digestive enzymes.",
        "steps":[
          "Chewing mechanically breaks large pieces into smaller pieces.",
          "The smaller pieces have a greater total surface area.",
          "More food surface is exposed to digestive enzymes at the same time.",
          "Chemical digestion can therefore proceed more effectively."
        ],
        "answer":"Chewing increases the total surface area of food exposed to digestive enzymes, so enzyme-controlled digestion proceeds more effectively."
      },
      "checks":[
        {
          "prompt":"Which teeth are mainly used for tearing?",
          "answer":"Canines.",
          "explanation":"Their pointed shape helps grip and tear food."
        },
        {
          "prompt":"What is the adult dental formula?",
          "answer":"2.1.2.3 / 2.1.2.3 on each side, giving 32 teeth when third molars are present.",
          "explanation":"The numbers refer to incisors, canines, premolars and molars."
        },
        {
          "prompt":"Where are nerves and blood vessels found in a tooth?",
          "answer":"In the pulp cavity.",
          "explanation":"The pulp contains the living neurovascular tissue of the tooth."
        },
        {
          "prompt":"How do plaque bacteria contribute to tooth decay?",
          "answer":"They use sugars and produce acids that remove mineral from enamel.",
          "explanation":"Repeated acid exposure can lead to cavities."
        },
        {
          "prompt":"Why is fluoride used in toothpaste?",
          "answer":"It makes enamel more resistant to acid attack.",
          "explanation":"This helps reduce the risk of tooth decay."
        }
      ],
      "summary":"Match each tooth shape to its mechanical role, and relate the internal tooth layers to protection, support and sensation. Good plaque control and reduced frequent sugar exposure help prevent decay and gum disease."
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
  'diagram:m2-t2-3-human-tooth',
  'diagram',
  'module-2-energy',
  'm2-t2-3-teeth-structure-function',
  'Label the structure of a human tooth',
  '/study/integrated-science?section=module-2-energy&topic=m2-t2-3-teeth-structure-function',
  0.35,
  true,
  '{"syllabusObjective":"2.2.3","mode":"drag-drop-label"}'::jsonb
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
  || '{"topicsBuilt":48,"objectivesBuilt":48}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
