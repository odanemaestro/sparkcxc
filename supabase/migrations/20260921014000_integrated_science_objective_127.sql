begin;

-- CSEC Integrated Science objective 1.2.7
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t2-7-soil-erosion-food-production',
  'module-1-organisms-life-processes',
  '1.2.7 Soil Erosion and Food Production',
  'Evaluate how water and wind remove fertile topsoil, reduce crop production and affect downstream ecosystems, and explain suitable erosion-control methods.',
  90,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Plants",
      "objective":"1.2.7",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain how water and wind cause soil erosion.",
        "Relate deforestation, bush fires, overgrazing and poor ploughing practices to increased erosion.",
        "Evaluate how loss of fertile topsoil affects crop yield and food production.",
        "Describe how terracing, contour farming, cover crops, windbreaks and strip cropping reduce erosion.",
        "Explain how eroded soil entering rivers and coastal waters can affect fisheries and coral reefs."
      ],
      "introduction":"Soil erosion is the removal and transport of soil by agents such as running water and wind. Some erosion occurs naturally, but farming and land-use practices can increase the rate greatly. The most serious agricultural loss is often the fertile topsoil that supports crop roots.",
      "sections":[
        {
          "title":"Water erosion",
          "paragraphs":[
            "Heavy rain can detach soil particles when raindrops strike bare ground. Surface run-off then carries the loosened particles downhill.",
            "Steep slopes increase the speed of run-off. The risk becomes greater when trees and other vegetation have been removed because there are fewer leaves to reduce raindrop impact and fewer roots to hold the soil together."
          ]
        },
        {
          "title":"Wind erosion",
          "paragraphs":[
            "Strong wind can lift and carry dry, loose soil from exposed fields. Flat or coastal areas with little vegetation are especially vulnerable during dry conditions.",
            "Dry ploughed soil and land left bare after burning or overgrazing are more easily blown away."
          ]
        },
        {
          "title":"Human activities that increase erosion",
          "bullets":[
            "Deforestation removes roots that bind soil and exposes the surface to rain.",
            "Bush fires destroy protective vegetation and leave loose soil exposed.",
            "Overgrazing removes plant cover faster than it can recover.",
            "Ploughing up and down a slope can form channels that direct run-off downhill.",
            "Leaving cultivated soil bare between crops increases exposure to both rain and wind."
          ]
        },
        {
          "title":"Why crop production falls",
          "paragraphs":[
            "Topsoil contains much of the soil humus, mineral nutrients, roots and biological activity needed for plant growth. Severe erosion removes this productive layer.",
            "As topsoil becomes thinner, the remaining soil may hold less water, contain fewer nutrients and provide poorer conditions for roots. Crops grow less well and yields fall. Continued erosion can leave less land suitable for farming and increase the risk of food shortages or higher production costs."
          ]
        },
        {
          "title":"Terracing",
          "paragraphs":[
            "Terraces are flat steps made across a steep hillside. They shorten the effective slope and slow the movement of run-off water, so less soil is carried away."
          ]
        },
        {
          "title":"Contour farming",
          "paragraphs":[
            "Contour farming means ploughing and planting across a slope along its contour lines instead of directly up and down the slope. The ridges act as small barriers that slow run-off."
          ]
        },
        {
          "title":"Vegetation-based controls",
          "paragraphs":[
            "Cover crops protect the soil surface from raindrop impact and their roots help bind soil particles. Windbreaks, usually rows of trees or shrubs, reduce wind speed before it crosses a field.",
            "Strip cropping alternates bands of different crops. The strips interrupt surface flow, trap some moving soil and reduce long stretches of exposed ground."
          ]
        },
        {
          "title":"Effects beyond the farm",
          "paragraphs":[
            "Eroded soil often enters drains, streams and rivers. The extra sediment makes water muddy and may build up in channels.",
            "When large amounts of sediment reach coastal waters, they can settle on coral reefs and other habitats. This can reduce light, smother organisms and affect nursery areas and fisheries that communities depend on."
          ]
        },
        {
          "title":"Evaluating a soil-conservation plan",
          "paragraphs":[
            "The best control depends on the erosion risk. Terracing and contour farming are suited to slopes. Cover crops protect bare soil. Windbreaks are useful where wind erosion is important. Good land management often combines more than one method.",
            "When evaluating a method, state how it changes the movement of water or wind, how it protects the soil surface or roots, and how this helps preserve fertile topsoil."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t2-7-soil-erosion-food-production",
          "type":"soil-erosion-food-production",
          "title":"Soil erosion and food production"
        }
      ],
      "keyPoints":[
        "Water and wind are major agents of soil erosion.",
        "Deforestation, bush fires, overgrazing and poor cultivation practices can accelerate erosion.",
        "Loss of topsoil removes humus and nutrients and reduces crop yield.",
        "Terracing, contour farming, cover crops, windbreaks and strip cropping help reduce erosion in different situations.",
        "Sediment from eroded land can damage rivers, coral reefs and fisheries.",
        "Protecting soil fertility supports long-term food production."
      ],
      "workedExample":{
        "title":"Choosing erosion control on a hillside",
        "prompt":"A Caribbean farmer grows vegetables on a steep hillside. Heavy rain forms fast run-off and soil is being washed into a nearby river. Recommend two suitable control measures and explain how each would help.",
        "steps":[
          "Identify the main agent: heavy rain and surface run-off on a steep slope.",
          "Choose controls suited to a hillside.",
          "Explain how each control slows run-off or protects the soil.",
          "Link the control to reduced loss of fertile topsoil."
        ],
        "answer":"Terracing would create flatter steps that slow run-off, while contour farming or a cover crop would interrupt water flow and protect the surface. Both reduce the amount of fertile topsoil carried downhill."
      },
      "checks":[
        {
          "prompt":"Why does severe soil erosion reduce food production?",
          "answer":"It removes fertile topsoil containing humus and mineral nutrients, so crops grow poorly and yields fall.",
          "explanation":"Topsoil is the most productive soil layer for many crops."
        },
        {
          "prompt":"How does a cover crop reduce erosion?",
          "answer":"Leaves reduce raindrop impact and roots bind the soil.",
          "explanation":"The plant cover protects both the surface and the soil particles beneath it."
        },
        {
          "prompt":"How does a windbreak reduce wind erosion?",
          "answer":"Trees or shrubs reduce wind speed across the field, so less dry topsoil is lifted and carried away.",
          "explanation":"Lower wind speed reduces the force available to move loose soil particles."
        },
        {
          "prompt":"State one way eroded soil can affect coastal food resources.",
          "answer":"Sediment can smother coral reefs or damage nursery habitats, which can reduce fisheries.",
          "explanation":"Soil erosion can affect food production both on land and in aquatic ecosystems."
        }
      ],
      "summary":"Evaluate erosion by following the sequence from cause to consequence. Identify what exposes or moves the soil, explain why fertile topsoil is lost, connect the loss to lower crop production and select a control method that reduces the responsible water or wind movement."
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
  || '{"topicsBuilt":9,"objectivesBuilt":9}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
