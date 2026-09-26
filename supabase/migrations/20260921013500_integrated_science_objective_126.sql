begin;

-- CSEC Integrated Science objective 1.2.6
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t2-6-soil-fertility-properties',
  'module-1-organisms-life-processes',
  '1.2.6 Soil Fertility and Soil Properties',
  'Relate soil fertility to particle size, drainage, water retention, aeration, humus, soil organisms, mineral nutrients and pH.',
  80,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Plants",
      "objective":"1.2.6",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Compare sandy, clay and loam soils using particle size, pore space, drainage, aeration and water-holding capacity.",
        "Explain how humus and soil organisms improve soil fertility.",
        "Explain the roles of nitrogen-fixing, nitrifying and denitrifying bacteria in soil fertility.",
        "Relate soil pH to crop growth and explain why lime may be added to acidic soil.",
        "Interpret and plan simple investigations of soil composition, drainage, water retention and humus content."
      ],
      "introduction":"Fertile soil supplies plant roots with water, mineral nutrients and oxygen while still allowing excess water to drain away. Fertility depends on physical properties such as particle size and pore spaces and on chemical and biological properties such as pH, humus, mineral ions and soil organisms.",
      "sections":[
        {
          "title":"Soil texture and particle size",
          "paragraphs":[
            "Sand has the largest particles and clay has the smallest. Silt particles are intermediate in size. Loam contains a useful mixture of sand, silt, clay and humus.",
            "Particle size affects the size of the spaces between particles. These pore spaces control how quickly water drains and how much air remains in the soil."
          ],
          "bullets":[
            "Sandy soil has large pore spaces, drains quickly and holds relatively little water.",
            "Clay soil has very small pore spaces, drains slowly and can become waterlogged.",
            "Loam usually provides a useful balance of drainage, water retention and aeration for crop roots."
          ]
        },
        {
          "title":"Why waterlogging reduces plant growth",
          "paragraphs":[
            "When soil becomes waterlogged, water fills many of the pore spaces that would normally contain air. Roots then receive less oxygen.",
            "Root cells need oxygen for aerobic respiration. If respiration is limited, active transport of mineral ions and other energy-requiring cell processes are affected, so plant growth may be poor."
          ]
        },
        {
          "title":"Humus and compost",
          "paragraphs":[
            "Humus is dark organic material formed as dead plant and animal material decomposes. Compost is made by allowing decomposers such as bacteria and fungi to break down organic waste.",
            "Humus improves fertility in several ways. It releases mineral nutrients as decomposition continues, increases water-holding capacity and helps bind soil particles into crumbs that improve soil structure, aeration and drainage."
          ]
        },
        {
          "title":"Soil organisms",
          "paragraphs":[
            "A fertile soil contains many organisms. Decomposers break down dead material and return mineral nutrients to the soil. Earthworms make burrows that improve aeration and drainage and their casts mix organic matter with mineral soil.",
            "Nematodes and many other small organisms also form part of the soil community. Their effects vary, but their presence shows that soil is a living system rather than an inert material."
          ]
        },
        {
          "title":"Nitrogen and soil fertility",
          "paragraphs":[
            "Plants need nitrogen compounds to make amino acids and proteins. Different groups of bacteria affect how much usable nitrogen is available in soil."
          ],
          "bullets":[
            "Nitrogen-fixing bacteria, including bacteria in the root nodules of legumes such as peas and beans, convert nitrogen gas into nitrogen compounds.",
            "Nitrifying bacteria convert ammonium compounds into nitrites and then nitrates that plants can absorb.",
            "Denitrifying bacteria convert nitrates back to nitrogen gas. This removes available nitrogen from the soil and can reduce fertility.",
            "Decomposers return nitrogen-containing compounds to the soil when they break down dead organisms and waste."
          ]
        },
        {
          "title":"Soil pH",
          "paragraphs":[
            "Soil pH affects the availability of mineral nutrients and the activity of soil organisms. Many vegetable crops grow well in slightly acidic to neutral soil, roughly pH 6 to 7.",
            "A soil with pH 4.5 is strongly acidic for many common crops. Lime, such as calcium carbonate, may be added to reduce acidity and raise the pH."
          ]
        },
        {
          "title":"Investigating drainage and water retention",
          "paragraphs":[
            "To compare soils, place equal masses of soil in identical funnels, add the same volume of water and allow drainage for the same length of time. Measure the volume collected.",
            "Water retained is calculated by subtracting the volume drained from the volume added. A sample that drains less water has retained more."
          ],
          "bullets":[
            "Keep the mass of soil constant.",
            "Add the same volume of water to each sample.",
            "Use the same drainage time and similar apparatus.",
            "Repeat measurements where possible and calculate an average."
          ]
        },
        {
          "title":"Investigating soil composition and humus",
          "paragraphs":[
            "A simple sedimentation test is carried out by shaking soil with water in a transparent container and leaving it to settle. Large, dense particles settle first, while finer particles settle later and low-density organic matter may float.",
            "Humus content can be compared by drying equal masses of soil, heating them strongly to burn off organic matter, cooling and reweighing. The sample with the greater loss in mass contains more organic material, provided the procedure is controlled carefully."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t2-6-soil-fertility",
          "type":"soil-fertility",
          "title":"Soil fertility lab"
        }
      ],
      "keyPoints":[
        "Soil fertility depends on physical, chemical and biological properties.",
        "Sand drains quickly, clay retains much water and loam provides a useful balance for many crops.",
        "Waterlogged soil contains less air, so roots receive less oxygen for aerobic respiration.",
        "Humus adds nutrients, holds water and improves soil structure.",
        "Nitrogen-fixing and nitrifying bacteria increase usable nitrogen compounds, while denitrifying bacteria remove nitrates from soil.",
        "Lime can be used to reduce excessive soil acidity.",
        "Fair soil investigations keep soil mass, water volume, time and apparatus consistent."
      ],
      "workedExample":{
        "title":"Interpreting a drainage test",
        "prompt":"Students pour 100 cm3 of water through equal masses of three soil samples. After 10 minutes, sample P has drained 70 cm3, Q has drained 25 cm3 and R has drained 48 cm3. Which sample is most likely to be clay, and how much water did it retain?",
        "steps":[
          "Clay drains slowly because its particles and pore spaces are small.",
          "Sample Q drained the least water, so it has the greatest water retention.",
          "Water retained = 100 cm3 - 25 cm3.",
          "The retained volume is 75 cm3."
        ],
        "answer":"Sample Q is most likely to be clay. It retained 75 cm3 of water."
      },
      "checks":[
        {
          "prompt":"Why can vegetables grow poorly in waterlogged clay soil?",
          "answer":"Water fills the soil air spaces, so roots receive too little oxygen for aerobic respiration.",
          "explanation":"Reduced respiration limits energy supply for active transport and normal root function."
        },
        {
          "prompt":"Give three ways humus improves soil fertility.",
          "answer":"It releases mineral nutrients, increases water-holding capacity and improves soil structure, aeration and drainage.",
          "explanation":"Humus affects both nutrient supply and the physical condition of soil."
        },
        {
          "prompt":"Where are nitrogen-fixing bacteria commonly found in legumes?",
          "answer":"In root nodules.",
          "explanation":"These bacteria convert nitrogen gas into nitrogen compounds that enter the soil and plant nutrient cycle."
        },
        {
          "prompt":"A soil sample has a pH of 4.5. What material may be added to make it more suitable for many crops?",
          "answer":"Lime, for example calcium carbonate.",
          "explanation":"Lime is basic and neutralises excessive soil acidity."
        }
      ],
      "summary":"Relate fertility to what happens around the roots. The soil must hold enough water and nutrients, drain excess water, contain air for respiration and maintain chemical conditions that make nutrients available."
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
  || '{"topicsBuilt":8,"objectivesBuilt":8}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
