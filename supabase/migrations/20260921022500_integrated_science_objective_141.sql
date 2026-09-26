begin;

-- CSEC Integrated Science objective 1.4.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t4-1-need-for-transport-systems',
  'module-1-organisms-life-processes',
  '1.4.1 Why Living Organisms Need Transport Systems',
  'Justify the need for transport systems by relating surface-area-to-volume ratio and diffusion distance to the movement of materials in large organisms, and connect plant water transport to transpiration.',
  180,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Transport Systems",
      "objective":"1.4.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Calculate surface area, volume and surface-area-to-volume ratio for cubes.",
        "Explain why diffusion alone can meet the needs of small organisms but not large multicellular organisms.",
        "State substances carried by human transport systems.",
        "Define transpiration and relate it to water movement through xylem.",
        "Predict how temperature, humidity, wind and light affect transpiration.",
        "Interpret a potometer investigation and identify suitable variables and precautions."
      ],
      "introduction":"Every living cell needs materials such as oxygen, water and nutrients and must remove waste products. Small organisms can exchange enough material directly across their surface. In larger multicellular organisms, many cells lie far from the body surface and diffusion distances are longer, so specialised transport systems are needed.",
      "sections":[
        {
          "title":"Surface area compared with volume",
          "paragraphs":[
            "As an object becomes larger, its volume increases faster than its surface area. This means its surface-area-to-volume ratio decreases.",
            "For a cube, surface area is 6 × side² and volume is side³. A 1 cm cube has a ratio of 6:1, a 2 cm cube has a ratio of 3:1, and a 3 cm cube has a ratio of 2:1.",
            "The smaller cube therefore has more surface area available for exchange relative to the amount of material inside it."
          ]
        },
        {
          "title":"The agar-cube diffusion investigation",
          "paragraphs":[
            "Agar cubes containing an indicator can be placed in dilute acid. The acid diffuses inward from the surface and changes the colour of the indicator.",
            "The 1 cm cube has the largest surface-area-to-volume ratio and the shortest distance from its surface to its centre, so acid reaches the centre first.",
            "As surface-area-to-volume ratio decreases, the time needed for diffusion to reach the centre increases."
          ],
          "bullets":[
            "1 cm cube: surface area 6 cm², volume 1 cm³, ratio 6:1.",
            "2 cm cube: surface area 24 cm², volume 8 cm³, ratio 3:1.",
            "3 cm cube: surface area 54 cm², volume 27 cm³, ratio 2:1."
          ]
        },
        {
          "title":"Why small organisms can rely on diffusion",
          "paragraphs":[
            "A unicellular organism such as Amoeba has a large surface area relative to its volume and all parts of the cytoplasm are close to the cell surface.",
            "Oxygen and dissolved nutrients can therefore diffuse inward over short distances, while carbon dioxide and other wastes can diffuse outward."
          ]
        },
        {
          "title":"Why large organisms need bulk transport",
          "paragraphs":[
            "Large multicellular organisms have a smaller surface-area-to-volume ratio, and many cells are located deep inside the body. Diffusion over these distances would be too slow to meet the needs of active cells.",
            "A transport system moves materials quickly between exchange surfaces and cells. In humans, blood carries oxygen and digested food to cells and carries carbon dioxide, urea and other wastes away.",
            "Undigested fibre is not transported around the body by blood. It remains in the alimentary canal and is eventually egested."
          ]
        },
        {
          "title":"Water transport in flowering plants",
          "paragraphs":[
            "Plant roots absorb water from the soil. Water and dissolved mineral ions move upward through xylem vessels to stems and leaves.",
            "Water is needed for photosynthesis, maintaining cell turgor, transport of mineral ions and other cell processes."
          ]
        },
        {
          "title":"Transpiration and the transpiration stream",
          "paragraphs":[
            "Transpiration is the loss of water vapour from the aerial parts of a plant, mainly through stomata in the leaves.",
            "Water evaporates from moist cell surfaces inside the leaf and water vapour diffuses out through stomata. This loss of water helps create a transpiration pull that draws a continuous column of water upward through the xylem.",
            "The transpiration stream also carries dissolved mineral ions from the roots and evaporation can help cool the leaves."
          ]
        },
        {
          "title":"Environmental factors affecting transpiration",
          "bullets":[
            "Higher temperature usually increases evaporation and therefore increases transpiration if water is available.",
            "Moving air removes humid air from around the leaf, maintaining a steep water-vapour concentration gradient and increasing transpiration.",
            "High humidity reduces the concentration gradient between the leaf and the air, so transpiration decreases.",
            "Bright light usually increases transpiration because stomata tend to open for photosynthesis.",
            "Darkness usually reduces transpiration because stomata tend to close."
          ]
        },
        {
          "title":"Wilting",
          "paragraphs":[
            "On a hot, sunny day a plant can lose water by transpiration faster than its roots replace it. Cells then lose water and turgor pressure decreases.",
            "Leaves and young stems become less firm, producing wilting. If water uptake catches up with water loss, turgor can be restored."
          ]
        },
        {
          "title":"Using a potometer",
          "paragraphs":[
            "A potometer measures the rate at which a leafy shoot takes up water. Water uptake is commonly used as an estimate of transpiration rate, although not every molecule of water taken up is lost by transpiration.",
            "An air bubble in the capillary tube acts as a marker. Faster movement of the bubble over a fixed time indicates a faster rate of water uptake."
          ],
          "bullets":[
            "Manipulated variable: for example presence or speed of wind from a fan.",
            "Responding variable: distance moved by the air bubble in a fixed time, or calculated rate of water uptake.",
            "Keep light, temperature, leaf area and measurement time constant when wind is being tested.",
            "Cut the shoot under water to reduce the chance of air entering the xylem.",
            "Make sure the apparatus is airtight.",
            "Repeat readings and calculate an average."
          ]
        },
        {
          "title":"Predicting potometer results",
          "paragraphs":[
            "A shoot next to a fan in bright light should usually show faster bubble movement because wind and light increase transpiration.",
            "If the shoot is covered with a clear plastic bag, water vapour accumulates and humidity rises around the leaves. The water-vapour gradient becomes smaller, so transpiration and bubble movement decrease."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t4-1-transport-system-need",
          "type":"transport-system-need",
          "title":"Why organisms need transport systems"
        }
      ],
      "keyPoints":[
        "As organism size increases, surface-area-to-volume ratio decreases.",
        "Large organisms have long diffusion distances, so diffusion alone is too slow to supply all cells.",
        "Bulk transport moves useful substances to cells and carries wastes away.",
        "Xylem carries water and mineral ions upward in flowering plants.",
        "Transpiration is the loss of water vapour mainly through leaf stomata.",
        "Wind, higher temperature and bright light generally increase transpiration, while high humidity generally reduces it.",
        "A potometer estimates transpiration by measuring water uptake by a leafy shoot."
      ],
      "workedExample":{
        "title":"Surface-area-to-volume ratio of a 2 cm cube",
        "prompt":"Calculate the surface-area-to-volume ratio of a cube with sides 2 cm long and explain why acid reaches its centre more slowly than the centre of a 1 cm cube.",
        "steps":[
          "Surface area = 6 × side² = 6 × 2² = 24 cm².",
          "Volume = side³ = 2³ = 8 cm³.",
          "Surface area : volume = 24 : 8 = 3 : 1.",
          "A 1 cm cube has a larger ratio of 6:1 and a shorter diffusion distance to the centre."
        ],
        "answer":"The 2 cm cube has a surface-area-to-volume ratio of 3:1. Acid reaches its centre more slowly because less surface area is available per unit volume and the diffusion distance to the centre is greater."
      },
      "checks":[
        {
          "prompt":"Why does a large multicellular organism need a transport system?",
          "answer":"It has a relatively small surface-area-to-volume ratio and many cells are far from the body surface, so diffusion alone is too slow.",
          "explanation":"Bulk transport shortens the effective distance over which materials must diffuse to reach cells."
        },
        {
          "prompt":"What is transpiration?",
          "answer":"The loss of water vapour from the aerial parts of a plant, mainly through stomata in the leaves.",
          "explanation":"Water evaporates inside the leaf and then diffuses out as vapour."
        },
        {
          "prompt":"Why does high humidity reduce transpiration?",
          "answer":"It reduces the water-vapour concentration gradient between the inside of the leaf and the surrounding air.",
          "explanation":"A smaller gradient reduces the rate of diffusion of water vapour from the leaf."
        },
        {
          "prompt":"Why should a shoot be cut under water when setting up a potometer?",
          "answer":"To reduce the chance of air entering the xylem.",
          "explanation":"Air bubbles in the xylem can break the continuous water column and interfere with water uptake."
        }
      ],
      "summary":"The need for transport follows from scale. Larger organisms have less surface area relative to their volume and longer diffusion distances, so they use specialised transport systems. In plants, water movement through xylem is closely linked to transpiration from the leaves."
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
  || '{"topicsBuilt":18,"objectivesBuilt":18}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
