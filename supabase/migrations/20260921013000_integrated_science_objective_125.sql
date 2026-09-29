begin;

-- CSEC Integrated Science objective 1.2.5
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t2-5-crop-production-methods',
  'module-1-organisms-life-processes',
  '1.2.5 Methods Used in Crop Production',
  'Describe common crop-production methods and select suitable methods for different farming, soil, space and resource conditions.',
  70,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Plants",
      "objective":"1.2.5",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Describe hydroponics, greenhouse farming, container gardening, crop rotation, strip planting, organic farming and tissue culture.",
        "State an advantage and a limitation of each crop-production method.",
        "Choose a suitable crop-production method for a stated situation and justify the choice.",
        "Explain how selected methods help farmers manage limited space, poor soil, pests, erosion or the need for large numbers of planting material."
      ],
      "introduction":"Crop production is more than planting seeds in soil. Farmers choose methods according to the crop, available land, soil quality, water supply, cost, pest pressure and the amount of control needed over growing conditions. A good answer should describe how a method works and explain why it suits a particular situation.",
      "sections":[
        {
          "title":"Hydroponics",
          "paragraphs":[
            "Hydroponics is the production of plants without soil. The roots receive water containing dissolved mineral nutrients needed for growth.",
            "It is useful where soil is poor, contaminated or unavailable, and it can support production in small spaces. The nutrient solution, water supply and equipment must be monitored carefully."
          ]
        },
        {
          "title":"Greenhouse farming",
          "paragraphs":[
            "A greenhouse is a protected structure in which factors such as temperature, humidity, water supply and exposure to pests can be managed more closely than in an open field.",
            "Greenhouses can protect crops from heavy rain and allow production outside the usual season. Construction and maintenance are costly, and cooling may be important in hot Caribbean conditions."
          ]
        },
        {
          "title":"Container gardening",
          "paragraphs":[
            "Container gardening uses pots, buckets, boxes or similar containers filled with a suitable growing medium. It is practical for homes, schools and urban areas where yard space is limited.",
            "Containers need regular watering because the small volume of growing medium can dry quickly. Root space is also limited."
          ]
        },
        {
          "title":"Crop rotation",
          "paragraphs":[
            "Crop rotation means growing different crops on the same plot in a planned sequence over successive seasons. For example, a farmer may grow corn, then peas, then sweet potato.",
            "Changing the crop can interrupt the life cycles of pests and diseases that depend on one host. A well-planned rotation can also improve the way soil nutrients are used."
          ]
        },
        {
          "title":"Strip planting",
          "paragraphs":[
            "Strip planting places different crops in alternating strips across a field. The strips interrupt the movement of water and wind across the soil surface.",
            "This arrangement can reduce soil erosion and may slow the spread of some pests. It requires careful field layout."
          ]
        },
        {
          "title":"Organic farming",
          "paragraphs":[
            "Organic farming emphasises natural nutrient sources such as compost and animal manure and uses cultural or biological methods of pest control instead of depending on synthetic fertilisers and pesticides.",
            "It can reduce synthetic chemical residues and improve soil organic matter. Pest control may require more labour and yields may be lower in some situations."
          ],
          "bullets":[
            "Ladybirds can be encouraged or introduced to feed on aphids.",
            "Compost and well-rotted animal manure return organic matter and nutrients to the soil.",
            "Crop rotation can form part of an organic pest-management programme."
          ]
        },
        {
          "title":"Tissue culture",
          "paragraphs":[
            "Tissue culture uses small pieces of plant tissue grown under sterile conditions on a nutrient medium. The tissue develops into plantlets that can later be transferred to suitable growing conditions.",
            "The method can produce large numbers of genetically identical plants quickly and can provide disease-free planting material. It requires sterile technique, trained workers and specialised equipment."
          ]
        },
        {
          "title":"Choosing the method",
          "paragraphs":[
            "The best method depends on the problem the grower is trying to solve. A student living in an apartment may choose container gardening. A farmer with poor soil may consider hydroponics. A farmer losing topsoil on a sloping field may use strip planting as part of soil-conservation practice.",
            "In examination questions, name the method, describe how it works and connect its advantage to the situation given."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t2-5-crop-production-systems",
          "type":"crop-production-systems",
          "title":"Crop production systems"
        }
      ],
      "keyPoints":[
        "Hydroponics grows plants without soil using a nutrient solution.",
        "Greenhouses provide a protected environment where growing conditions can be managed.",
        "Container gardening is suited to limited space.",
        "Crop rotation changes the crop grown on the same land from season to season.",
        "Strip planting uses alternating crop strips and can help reduce erosion.",
        "Organic farming emphasises natural nutrient sources and biological or cultural pest control.",
        "Tissue culture produces many plantlets from small pieces of plant tissue under sterile conditions."
      ],
      "workedExample":{
        "title":"Choosing a method for limited space",
        "prompt":"A family lives in a Kingston apartment and wants to grow herbs and small vegetables. There is no yard, but the balcony receives several hours of sunlight each day. Recommend a suitable production method and explain your choice.",
        "steps":[
          "Identify the main limitation: there is no open ground for a garden.",
          "Choose a method that does not require a field or large plot.",
          "Link the method to the available balcony space.",
          "State one management point, such as regular watering."
        ],
        "answer":"Container gardening is suitable because crops can be grown in pots, buckets or boxes on the balcony without a yard. The containers should be watered regularly because they can dry out quickly."
      },
      "checks":[
        {
          "prompt":"What makes hydroponics different from ordinary soil cultivation?",
          "answer":"Plants are grown without soil and their roots receive dissolved mineral nutrients in water.",
          "explanation":"The nutrient solution supplies the mineral ions that soil would normally provide."
        },
        {
          "prompt":"Why can crop rotation reduce some pest problems?",
          "answer":"A different crop removes the host needed by pests or diseases that depend on the previous crop.",
          "explanation":"Changing the host crop can interrupt the pest or disease life cycle."
        },
        {
          "prompt":"State one advantage and one limitation of greenhouse farming.",
          "answer":"Advantage: growing conditions and pests can be managed more closely. Limitation: the structure and its maintenance can be costly.",
          "explanation":"Protected production gives more control but requires equipment and management."
        },
        {
          "prompt":"Why is sterile technique important in tissue culture?",
          "answer":"It prevents microorganisms from contaminating the nutrient medium and competing with or damaging the plant tissue.",
          "explanation":"The nutrient medium also supports rapid growth of contaminating microorganisms if they enter the culture."
        }
      ],
      "summary":"Know how each production method works, then connect the method to the problem it solves. In CSEC questions, marks often depend on linking a named method to soil, space, erosion, pest control, cost or the need for rapid plant production."
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
  || '{"topicsBuilt":7,"objectivesBuilt":7}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
