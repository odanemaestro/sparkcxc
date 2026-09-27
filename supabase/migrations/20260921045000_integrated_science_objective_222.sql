begin;

-- CSEC Integrated Science objective 2.2.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t2-2-human-digestion',
  'module-2-energy',
  '2.2.2 Digestion in Humans',
  'Examine human digestion, digestive enzymes, bile, absorption through villi, assimilation, egestion and the effects of temperature and pH on enzymes.',
  470,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Energy in Life Processes",
      "objective":"2.2.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Distinguish mechanical digestion from chemical digestion.",
        "Identify the main organs of the human digestive system and relate each to its function.",
        "Describe the action of amylase, pepsin, trypsin, maltase, lactase, lipase and rennin.",
        "Explain the role of hydrochloric acid in the stomach.",
        "Explain the production, storage and digestive role of bile.",
        "Explain how villi are adapted for absorption.",
        "Distinguish absorption, assimilation and egestion.",
        "Explain how temperature and pH affect enzyme activity."
      ],
      "introduction":"Digestion breaks large food particles and molecules into forms that the body can absorb and use. Mechanical digestion makes food pieces smaller, while chemical digestion uses enzymes to break large molecules into smaller soluble molecules.",
      "sections":[
        {
          "title":"Mechanical and chemical digestion",
          "paragraphs":[
            "Chewing is mechanical digestion because teeth physically break food into smaller pieces without changing the chemical nature of the molecules.",
            "Chemical digestion uses enzymes. Enzymes are biological catalysts, usually proteins, that speed up chemical reactions without being used up in the reaction."
          ]
        },
        {
          "title":"Mouth and oesophagus",
          "paragraphs":[
            "Digestion of starch begins in the mouth. Salivary amylase breaks starch into maltose.",
            "After swallowing, peristaltic contractions of the oesophagus move the food bolus towards the stomach."
          ]
        },
        {
          "title":"Stomach",
          "paragraphs":[
            "The stomach churns food mechanically and mixes it with gastric juice.",
            "Hydrochloric acid creates a low pH that supports pepsin activity and also kills many microorganisms in swallowed food.",
            "Pepsin digests proteins into shorter polypeptides. Rennin, also called chymosin, acts on milk protein in the stomach of young mammals."
          ]
        },
        {
          "title":"Liver, gall bladder and bile",
          "paragraphs":[
            "Bile is produced by the liver and stored in the gall bladder before release into the duodenum.",
            "Bile emulsifies fat into smaller droplets. This increases the surface area available for lipase action.",
            "Bile also helps neutralise acidic chyme entering the small intestine from the stomach."
          ]
        },
        {
          "title":"Pancreas and small intestine",
          "paragraphs":[
            "The pancreas produces digestive enzymes including pancreatic amylase, trypsin and lipase, which enter the small intestine.",
            "Trypsin digests proteins and polypeptides. Lipase breaks fats into fatty acids and glycerol.",
            "Maltase breaks maltose into glucose. Lactase breaks lactose, the main sugar in milk, into glucose and galactose.",
            "The final products of protein digestion are amino acids."
          ]
        },
        {
          "title":"Absorption through villi",
          "paragraphs":[
            "Most digested food is absorbed in the small intestine. Millions of villi provide a large surface area.",
            "The epithelium of each villus is only one cell thick, giving a short diffusion distance.",
            "Glucose and amino acids enter blood capillaries. Products of fat digestion enter the central lacteal and are transported through lymph."
          ]
        },
        {
          "title":"Large intestine, assimilation and egestion",
          "paragraphs":[
            "Much of the remaining water is absorbed in the large intestine.",
            "Absorption is the movement of digested nutrients from the gut into blood or lymph. Assimilation is the use of absorbed nutrients by body cells for energy, growth, repair or storage.",
            "Egestion is the removal of undigested food from the body through the anus. It is different from excretion, which removes metabolic wastes."
          ]
        },
        {
          "title":"Temperature and enzyme activity",
          "paragraphs":[
            "At low temperature, enzyme-controlled reactions are slow. As temperature rises, reaction rate usually increases up to an optimum.",
            "Many human digestive enzymes work best near body temperature, about 37 °C.",
            "At sufficiently high temperature, the enzyme can be denatured because the shape of its active site changes. The bank example shows no activity at 60 °C."
          ]
        },
        {
          "title":"pH and enzyme activity",
          "paragraphs":[
            "Each enzyme has an optimum pH range. Pepsin works best in strongly acidic conditions in the stomach, close to pH 2.",
            "A pH far from the optimum can alter the enzyme structure and reduce or stop activity. Trypsin and several other digestive enzymes work in the alkaline conditions of the small intestine."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t2-2-human-digestion",
          "type":"human-digestion",
          "title":"Digestion, enzymes and absorption explorer"
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m2-t2-2-digestive-system",
          "template":"human-digestive-system",
          "title":"Label the human digestive system",
          "instructions":"Drag each label to the correct organ. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"mouth","text":"Mouth","hint":"Look at the opening where ingestion and chewing begin.","explanation":"The mouth mechanically breaks food and mixes it with saliva containing amylase."},
            {"id":"oesophagus","text":"Oesophagus","hint":"Look for the tube connecting the mouth region to the stomach.","explanation":"The oesophagus moves food to the stomach by peristalsis."},
            {"id":"stomach","text":"Stomach","hint":"Look for the sac-like organ below the oesophagus.","explanation":"The stomach churns food and provides acidic conditions for pepsin."},
            {"id":"liver","text":"Liver","hint":"Look for the large organ above and beside the stomach.","explanation":"The liver produces bile."},
            {"id":"gall-bladder","text":"Gall bladder","hint":"Look for the small sac tucked beneath the liver.","explanation":"The gall bladder stores and concentrates bile before release."},
            {"id":"pancreas","text":"Pancreas","hint":"Look for the elongated gland close to the stomach and duodenum.","explanation":"The pancreas supplies amylase, proteases and lipase to the small intestine."},
            {"id":"small-intestine","text":"Small intestine","hint":"Look for the long coiled tube in the centre of the abdomen.","explanation":"Digestion is completed and most nutrient absorption occurs in the small intestine."},
            {"id":"large-intestine","text":"Large intestine","hint":"Look for the wider tube surrounding the small intestine.","explanation":"The large intestine absorbs much of the remaining water before egestion."}
          ],
          "targets":[
            {"id":"digestive-mouth-target","labelId":"mouth","boxX":20,"boxY":30,"anchorX":500,"anchorY":80,"side":"left"},
            {"id":"digestive-oesophagus-target","labelId":"oesophagus","boxX":20,"boxY":100,"anchorX":500,"anchorY":185,"side":"left"},
            {"id":"digestive-liver-target","labelId":"liver","boxX":20,"boxY":170,"anchorX":455,"anchorY":245,"side":"left"},
            {"id":"digestive-gall-target","labelId":"gall-bladder","boxX":20,"boxY":240,"anchorX":462,"anchorY":292,"side":"left"},
            {"id":"digestive-stomach-target","labelId":"stomach","boxX":790,"boxY":55,"anchorX":535,"anchorY":295,"side":"right"},
            {"id":"digestive-pancreas-target","labelId":"pancreas","boxX":790,"boxY":125,"anchorX":535,"anchorY":360,"side":"right"},
            {"id":"digestive-small-target","labelId":"small-intestine","boxX":790,"boxY":195,"anchorX":500,"anchorY":445,"side":"right"},
            {"id":"digestive-large-target","labelId":"large-intestine","boxX":790,"boxY":265,"anchorX":420,"anchorY":430,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "Chewing is mechanical digestion.",
        "Salivary amylase begins starch digestion in the mouth.",
        "Pepsin digests protein in acidic stomach conditions.",
        "Bile is produced by the liver and stored in the gall bladder.",
        "Bile emulsifies fat and increases surface area for lipase.",
        "Lipase forms fatty acids and glycerol from fats.",
        "The final products of protein digestion are amino acids.",
        "Villi increase surface area for absorption.",
        "Products of fat digestion enter lacteals.",
        "Assimilation is the use of absorbed nutrients by cells.",
        "Egestion removes undigested food through the anus.",
        "Many human digestive enzymes have an optimum near 37 °C."
      ],
      "workedExample":{
        "title":"Explaining fat digestion",
        "prompt":"Explain how bile and lipase work together during fat digestion in the small intestine.",
        "steps":[
          "Bile enters the duodenum and emulsifies large fat globules into smaller droplets.",
          "This increases the total surface area of fat exposed to lipase.",
          "Lipase then digests fats into fatty acids and glycerol.",
          "These products are absorbed into the lacteals of the villi."
        ],
        "answer":"Bile emulsifies fat into small droplets, increasing surface area for lipase. Lipase then breaks fat into fatty acids and glycerol, which are absorbed through villi into lacteals."
      },
      "checks":[
        {
          "prompt":"What does salivary amylase digest?",
          "answer":"Starch into maltose.",
          "explanation":"Starch digestion begins in the mouth."
        },
        {
          "prompt":"Why does pepsin work well in the stomach?",
          "answer":"The stomach provides strongly acidic conditions close to the enzyme''s optimum pH.",
          "explanation":"Hydrochloric acid creates the low pH."
        },
        {
          "prompt":"Where is bile produced and where is it stored?",
          "answer":"It is produced by the liver and stored in the gall bladder.",
          "explanation":"It is released into the duodenum when needed."
        },
        {
          "prompt":"Why are villi effective absorption surfaces?",
          "answer":"They provide a large surface area, a one-cell-thick epithelium and good transport through blood capillaries and lacteals.",
          "explanation":"These features support rapid movement and removal of absorbed nutrients."
        },
        {
          "prompt":"What happens to many human digestive enzymes at sufficiently high temperature?",
          "answer":"They become denatured and lose activity.",
          "explanation":"The active site changes shape so the substrate no longer fits effectively."
        }
      ],
      "summary":"Human digestion combines mechanical processing, enzyme-controlled chemical digestion, absorption through villi, assimilation by cells and egestion of undigested material. Enzyme activity depends strongly on suitable temperature and pH."
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
  'diagram:m2-t2-2-digestive-system',
  'diagram',
  'module-2-energy',
  'm2-t2-2-human-digestion',
  'Label the human digestive system',
  '/study/integrated-science?section=module-2-energy&topic=m2-t2-2-human-digestion',
  0.35,
  true,
  '{"syllabusObjective":"2.2.2","mode":"drag-drop-label"}'::jsonb
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
  || '{"topicsBuilt":47,"objectivesBuilt":47}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
