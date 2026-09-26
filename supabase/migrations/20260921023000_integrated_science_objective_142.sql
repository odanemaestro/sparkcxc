begin;

-- CSEC Integrated Science objective 1.4.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t4-2-transport-structures-functions',
  'module-1-organisms-life-processes',
  '1.4.2 Structures and Functions in Transport Systems',
  'Relate blood cells, blood vessels, heart structures, xylem and phloem to the transport functions they perform.',
  190,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Transport Systems",
      "objective":"1.4.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Relate the structures of red blood cells, white blood cells, platelets and plasma to their functions.",
        "Compare arteries, veins and capillaries in structure and function.",
        "Identify the main chambers, valves and blood vessels of the human heart.",
        "Trace the pathway of blood through the heart, lungs and body.",
        "Describe diastole, atrial systole and ventricular systole.",
        "Compare xylem and phloem in terms of structure, substances transported and direction of movement.",
        "Explain why removing a complete ring of bark can eventually kill a tree."
      ],
      "introduction":"Transport systems work because their structures are suited to their functions. Blood components carry different materials, arteries and veins withstand different pressures, capillaries provide thin exchange surfaces, heart chambers generate pressure, and plant vascular tissues move water, minerals and sugars.",
      "sections":[
        {
          "title":"Blood plasma",
          "paragraphs":[
            "Plasma is the liquid part of blood and is mostly water. It carries blood cells and dissolved substances around the body.",
            "Substances transported in plasma include glucose, amino acids, mineral ions, hormones, urea, much of the carbon dioxide, antibodies and other plasma proteins. Plasma also helps distribute heat."
          ]
        },
        {
          "title":"Red blood cells",
          "paragraphs":[
            "Red blood cells transport oxygen. They contain haemoglobin, which combines reversibly with oxygen in the lungs and releases it in tissues where oxygen concentration is lower.",
            "A mature human red blood cell has no nucleus, leaving more space for haemoglobin. Its biconcave shape gives a large surface area and a short diffusion distance for oxygen."
          ],
          "bullets":[
            "Red blood cells are flexible enough to pass through narrow capillaries.",
            "Extra red blood cells increase the oxygen-carrying capacity of blood. This is why blood doping can improve endurance performance, although it is prohibited in sport and carries health risks."
          ]
        },
        {
          "title":"White blood cells and platelets",
          "paragraphs":[
            "Phagocytes protect the body by engulfing and digesting pathogens. Their flexible shape allows them to leave capillaries and move through tissues.",
            "Lymphocytes produce antibodies that are specific to antigens on pathogens. Some lymphocytes form memory cells that support a faster response during later exposure.",
            "Platelets are small cell fragments involved in blood clotting. At a damaged vessel they help start reactions that form a clot, reducing blood loss and helping block entry of pathogens."
          ]
        },
        {
          "title":"Arteries",
          "paragraphs":[
            "Arteries carry blood away from the heart. Blood leaves the ventricles under high pressure, so arteries have thick muscular and elastic walls.",
            "Elastic tissue stretches when pressure rises and recoils when pressure falls, helping maintain blood flow between heartbeats. Arteries have a relatively narrow lumen compared with veins."
          ]
        },
        {
          "title":"Veins",
          "paragraphs":[
            "Veins carry blood towards the heart at lower pressure. Their walls are thinner than artery walls and their lumens are wider.",
            "Many veins contain valves. These valves prevent backflow and help maintain one-way movement towards the heart, especially in the limbs."
          ]
        },
        {
          "title":"Capillaries",
          "paragraphs":[
            "Capillaries are microscopic vessels that connect small arteries to small veins and form dense networks close to body cells.",
            "Their walls are only one cell thick, creating a short diffusion distance. Their narrow lumen slows blood flow and brings red cells close to the wall, supporting exchange of oxygen, nutrients and wastes."
          ]
        },
        {
          "title":"The four chambers of the heart",
          "paragraphs":[
            "The right atrium receives deoxygenated blood from the body through the vena cava. It passes blood through the tricuspid valve into the right ventricle.",
            "The right ventricle pumps blood through the pulmonary artery to the lungs. Oxygenated blood returns through the pulmonary veins to the left atrium and passes through the bicuspid, or mitral, valve into the left ventricle.",
            "The left ventricle pumps blood into the aorta and around the entire body. Its muscular wall is much thicker than the right ventricular wall because it must generate higher pressure for the systemic circulation."
          ]
        },
        {
          "title":"Valves and one-way flow",
          "paragraphs":[
            "Heart valves prevent backflow. The tricuspid valve lies between the right atrium and right ventricle, while the bicuspid valve lies between the left atrium and left ventricle.",
            "Semilunar valves at the bases of the pulmonary artery and aorta prevent blood returning to the ventricles after it has been ejected."
          ]
        },
        {
          "title":"Pathway of blood",
          "bullets":[
            "Body → vena cava → right atrium → tricuspid valve → right ventricle → pulmonary artery → lungs.",
            "Lungs → pulmonary veins → left atrium → bicuspid valve → left ventricle → aorta → body.",
            "The pulmonary artery carries deoxygenated blood even though it is an artery.",
            "The pulmonary veins carry oxygenated blood even though they are veins."
          ]
        },
        {
          "title":"The heartbeat",
          "paragraphs":[
            "During diastole, the heart muscle relaxes and the chambers fill with blood. The atrioventricular valves are open while blood flows from atria to ventricles.",
            "During atrial systole, the atria contract and push the remaining blood into the ventricles.",
            "During ventricular systole, the ventricles contract. The tricuspid and bicuspid valves close, preventing backflow into the atria, and blood is forced into the pulmonary artery and aorta."
          ]
        },
        {
          "title":"Xylem",
          "paragraphs":[
            "Xylem carries water and dissolved mineral ions mainly upward from roots to leaves. Mature xylem vessels are formed from dead cells joined end to end to make long hollow tubes.",
            "Their walls are strengthened with lignin, which helps prevent collapse under tension and also gives mechanical support to the plant."
          ]
        },
        {
          "title":"Phloem",
          "paragraphs":[
            "Phloem transports dissolved organic food, mainly sucrose, from sources to sinks. Sources are regions that release sugar, such as photosynthesising leaves. Sinks are regions that use or store sugar, such as roots, fruits and growing tissues.",
            "Phloem contains living sieve-tube elements supported by companion cells. Transport can occur upward or downward depending on the locations of sources and sinks."
          ]
        },
        {
          "title":"Ringing a tree",
          "paragraphs":[
            "Phloem lies close to the inner bark. If a complete ring of bark is removed around a trunk, phloem transport across that ring is interrupted.",
            "Sugars made in the leaves cannot reach the roots below the ring. The roots eventually run out of stored food, respiration and active uptake decline, and the tree may die."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t4-2-transport-structures",
          "type":"transport-structures",
          "title":"Transport structures and functions"
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m1-t4-2-human-heart",
          "template":"human-heart",
          "title":"Label the human heart",
          "instructions":"Place each label on the correct heart structure. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"right-atrium","text":"Right atrium","hint":"This upper chamber receives blood from the vena cava.","explanation":"The right atrium receives deoxygenated blood returning from the body."},
            {"id":"right-ventricle","text":"Right ventricle","hint":"This lower chamber pumps blood towards the lungs.","explanation":"The right ventricle pumps deoxygenated blood into the pulmonary artery."},
            {"id":"left-atrium","text":"Left atrium","hint":"This upper chamber receives blood returning from the lungs.","explanation":"The left atrium receives oxygenated blood through the pulmonary veins."},
            {"id":"left-ventricle","text":"Left ventricle","hint":"Look for the lower chamber with the thickest muscular wall.","explanation":"The left ventricle pumps blood at high pressure through the aorta to the body."},
            {"id":"aorta","text":"Aorta","hint":"This large artery leaves the left ventricle and arches upward.","explanation":"The aorta carries oxygenated blood from the left ventricle to the systemic circulation."},
            {"id":"vena-cava","text":"Vena cava","hint":"This large vein returns blood from the body to the right atrium.","explanation":"The vena cava carries deoxygenated blood from the body to the right atrium."},
            {"id":"pulmonary-artery","text":"Pulmonary artery","hint":"This vessel leaves the right ventricle and carries blood to the lungs.","explanation":"The pulmonary artery carries deoxygenated blood from the right ventricle to the lungs."},
            {"id":"pulmonary-vein","text":"Pulmonary vein","hint":"This vessel enters the left atrium from the lungs.","explanation":"Pulmonary veins carry oxygenated blood from the lungs to the left atrium."},
            {"id":"tricuspid","text":"Tricuspid valve","hint":"This valve lies between the right atrium and right ventricle.","explanation":"The tricuspid valve prevents backflow from the right ventricle into the right atrium."},
            {"id":"bicuspid","text":"Bicuspid valve","hint":"This valve lies between the left atrium and left ventricle.","explanation":"The bicuspid, or mitral, valve prevents backflow from the left ventricle into the left atrium."}
          ],
          "targets":[
            {"id":"heart-ra-target","labelId":"right-atrium","boxX":20,"boxY":55,"anchorX":390,"anchorY":230,"side":"left"},
            {"id":"heart-rv-target","labelId":"right-ventricle","boxX":20,"boxY":125,"anchorX":400,"anchorY":390,"side":"left"},
            {"id":"heart-vena-target","labelId":"vena-cava","boxX":20,"boxY":195,"anchorX":365,"anchorY":105,"side":"left"},
            {"id":"heart-pa-target","labelId":"pulmonary-artery","boxX":20,"boxY":265,"anchorX":530,"anchorY":175,"side":"left"},
            {"id":"heart-tricuspid-target","labelId":"tricuspid","boxX":20,"boxY":335,"anchorX":420,"anchorY":308,"side":"left"},
            {"id":"heart-la-target","labelId":"left-atrium","boxX":790,"boxY":55,"anchorX":610,"anchorY":230,"side":"right"},
            {"id":"heart-lv-target","labelId":"left-ventricle","boxX":790,"boxY":125,"anchorX":600,"anchorY":390,"side":"right"},
            {"id":"heart-aorta-target","labelId":"aorta","boxX":790,"boxY":195,"anchorX":650,"anchorY":80,"side":"right"},
            {"id":"heart-pv-target","labelId":"pulmonary-vein","boxX":790,"boxY":265,"anchorX":690,"anchorY":220,"side":"right"},
            {"id":"heart-bicuspid-target","labelId":"bicuspid","boxX":790,"boxY":335,"anchorX":590,"anchorY":308,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "Red blood cells carry oxygen using haemoglobin and have no nucleus when mature.",
        "Phagocytes engulf pathogens, lymphocytes produce antibodies, and platelets help blood clot.",
        "Arteries have thick muscular and elastic walls, veins have valves and a wide lumen, and capillaries have walls one cell thick.",
        "The left ventricle has the thickest wall because it pumps blood around the whole body.",
        "Heart valves prevent backflow and maintain one-way movement.",
        "The pulmonary artery carries deoxygenated blood to the lungs and pulmonary veins return oxygenated blood to the heart.",
        "Xylem carries water and mineral ions mainly upward. Phloem transports dissolved food to sources and sinks in either direction."
      ],
      "workedExample":{
        "title":"Explaining the thick wall of the left ventricle",
        "prompt":"The wall of the left ventricle is much thicker than the wall of the right ventricle. Explain why.",
        "steps":[
          "Identify where each ventricle sends blood.",
          "The right ventricle pumps only to the nearby lungs.",
          "The left ventricle pumps through the systemic circulation to the whole body.",
          "The left ventricle therefore needs more muscle to generate greater pressure."
        ],
        "answer":"The left ventricle has a thicker muscular wall because it must generate high pressure to pump blood around the whole body, while the right ventricle only pumps blood to the lungs."
      },
      "checks":[
        {
          "prompt":"Why are red blood cells well adapted to carry oxygen?",
          "answer":"They contain haemoglobin, lack a nucleus when mature and have a biconcave shape that provides a large surface area and short diffusion distance.",
          "explanation":"These features increase the amount and rate of oxygen transport."
        },
        {
          "prompt":"Why do veins contain valves?",
          "answer":"To prevent backflow of blood and maintain movement towards the heart.",
          "explanation":"Blood pressure in veins is relatively low."
        },
        {
          "prompt":"Trace the path of blood from the lungs to the body.",
          "answer":"Pulmonary vein → left atrium → bicuspid valve → left ventricle → aorta → body.",
          "explanation":"This is the oxygenated side of the double circulation."
        },
        {
          "prompt":"Compare xylem and phloem transport.",
          "answer":"Xylem carries water and mineral ions mainly upward from roots, while phloem carries dissolved organic food such as sucrose between sources and sinks and can transport in either direction.",
          "explanation":"The tissues differ in both the materials carried and the direction of movement."
        }
      ],
      "summary":"Structure determines transport function. Thick artery and ventricular walls handle pressure, thin capillary walls support exchange, valves maintain one-way flow, blood cells are specialised for transport and defence, and plant vascular tissues are specialised for water, minerals and food."
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
  'diagram:m1-t4-2-human-heart',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t4-2-transport-structures-functions',
  'Label the human heart',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t4-2-transport-structures-functions',
  0.35,
  true,
  '{"syllabusObjective":"1.4.2","mode":"drag-drop-label"}'::jsonb
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
  || '{"topicsBuilt":19,"objectivesBuilt":19}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
