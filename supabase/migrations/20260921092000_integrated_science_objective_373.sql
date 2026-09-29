begin;

-- CSEC Integrated Science objective 3.7.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t7-3-plastics',
  'module-3-environment',
  '3.7.3 Plastics',
  'Explain useful properties and uses of plastics and evaluate environmental problems caused by persistence, marine litter, microplastics and unsafe disposal.',
  960,
  true,
  '{
    "syllabus":{"module":3,"topic":"Pollutants","objective":"3.7.3","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain why plastics are widely used.",
        "Identify medical and construction uses of plastics.",
        "Explain why most common plastics persist in the environment.",
        "Explain how plastic bags can harm sea turtles.",
        "Explain how microplastics enter marine food webs.",
        "Explain why uncontrolled burning of plastic waste is harmful.",
        "Explain benefits and limits of plastic recycling.",
        "Apply refuse, reduce, reuse and recycle principles.",
        "Explain how reducing single-use plastic can reduce litter, drain blockage and marine pollution."
      ],
      "introduction":"Plastics are light, durable, corrosion-resistant and easy to shape, so they have many important uses. These same properties can create long-lasting pollution when plastic is unnecessary, littered, poorly collected or openly burned.",
      "sections":[
        {"title":"Useful properties of plastics","paragraphs":[
          "Many plastics are light, durable, easily moulded and inexpensive to manufacture.",
          "They do not rust like iron and many resist water and chemical attack.",
          "These properties make plastics useful in packaging, medicine, construction, electrical insulation and household products."
        ]},
        {"title":"Medical uses","paragraphs":[
          "Plastics are used for disposable syringes, gloves, tubing and sterile packaging.",
          "They can be manufactured cleanly, formed into precise shapes and discarded after use when single-use infection control is necessary."
        ]},
        {"title":"Construction uses","paragraphs":[
          "PVC pipes, electrical insulation, roofing materials and window components are common examples.",
          "Plastics are attractive for construction because they are light, durable and resistant to corrosion."
        ]},
        {"title":"Why plastic waste persists","paragraphs":[
          "Most conventional plastics are non-biodegradable because microorganisms do not readily break down their long synthetic polymer chains.",
          "Sunlight, heat and physical abrasion may fragment plastic into smaller pieces without completely removing the material from the environment."
        ]},
        {"title":"Sea turtles and plastic bags","paragraphs":[
          "Floating plastic bags can resemble jellyfish.",
          "Sea turtles may swallow plastic by mistake.",
          "Ingested plastic can block or injure the digestive tract, reduce feeding and contribute to illness or death."
        ]},
        {"title":"Microplastics","paragraphs":[
          "Microplastics are very small plastic particles produced when larger items fragment or released directly from some products and materials.",
          "Plankton, shellfish, fish, seabirds and other organisms can ingest these particles.",
          "Microplastics can move through food webs, although their biological effects vary with particle size, composition, dose and the organism exposed."
        ]},
        {"title":"Open burning","paragraphs":[
          "Open burning of plastic waste is unsafe.",
          "Uncontrolled combustion can release smoke, fine particles, carbon monoxide and irritating or toxic organic compounds.",
          "Chlorine-containing waste and poor combustion conditions can contribute to the formation of dioxins and furans.",
          "It is more accurate to say that hazardous emissions depend on the material and burning conditions than to claim that every plastic always releases the same substances."
        ]},
        {"title":"Recycling","paragraphs":[
          "Where suitable collection and processing systems exist, recycling plastic can reduce landfill demand and reduce the need for some virgin raw material.",
          "Recycling does not make plastic biodegradable and not every plastic item can be recycled economically or locally.",
          "Reducing unnecessary plastic use remains important."
        ]},
        {"title":"Refuse, reduce and reuse","paragraphs":[
          "Refuse unnecessary single-use items when practical, for example by carrying a reusable shopping bag.",
          "Reduce the amount of disposable plastic used and choose durable alternatives.",
          "Reuse suitable items safely before disposal."
        ]},
        {"title":"Single-use plastic reduction","paragraphs":[
          "Reducing disposable bags and foam food containers can decrease litter and the amount of persistent debris reaching rivers and the sea.",
          "Plastic litter can block drains and gullies and contribute to local flooding during heavy rainfall.",
          "Waste-reduction measures work best when alternatives, collection systems and public participation are available."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t7-3-plastics","type":"plastics","title":"Plastics uses, pollution and waste-reduction explorer"}],
      "keyPoints":[
        "Plastics are light, durable, easily moulded and often inexpensive.",
        "Plastics are important in medicine and construction.",
        "Most conventional plastics are non-biodegradable.",
        "Sea turtles may mistake floating plastic bags for prey.",
        "Microplastics can be eaten by marine organisms and enter food webs.",
        "Open burning of plastics can release harmful pollution.",
        "Dioxin formation depends on material composition and combustion conditions.",
        "Recycling can conserve resources and reduce landfill waste.",
        "Refuse and reduce unnecessary plastic before relying on disposal.",
        "Reusable shopping bags can reduce single-use plastic consumption."
      ],
      "workedExample":{
        "title":"Choosing the better plastic-waste action",
        "prompt":"A shopper is offered a new single-use plastic bag but already has a durable reusable bag. Which action best reduces plastic waste?",
        "steps":[
          "The new plastic bag is unnecessary.",
          "Waste prevention is better than creating waste and managing it later.",
          "The shopper can refuse the disposable bag.",
          "The reusable bag can be used again many times."
        ],
        "answer":"Refuse the single-use bag and use the reusable bag."
      },
      "checks":[
        {"prompt":"Why are plastics widely used?","answer":"They are generally light, durable, mouldable and often inexpensive.","explanation":"Different plastics can also resist water, chemicals and corrosion."},
        {"prompt":"Why do many plastics remain in the environment for a long time?","answer":"Microorganisms do not easily break down most conventional plastics.","explanation":"They are usually non-biodegradable and may only fragment into smaller pieces."},
        {"prompt":"How can plastic bags harm sea turtles?","answer":"Turtles may mistake them for food and swallow them.","explanation":"Ingested plastic can block or injure the digestive tract."},
        {"prompt":"Why is open burning of plastic waste unsafe?","answer":"It can release harmful smoke, particles, carbon monoxide and toxic combustion products.","explanation":"The exact pollutants depend on the plastic and burning conditions."},
        {"prompt":"What is one direct way to reduce single-use plastic waste?","answer":"Carry and use a reusable shopping bag.","explanation":"This prevents an unnecessary disposable bag from becoming waste."}
      ],
      "summary":"Plastics provide important benefits, but unnecessary single-use consumption and poor disposal create long-lasting pollution. Waste prevention, reuse, appropriate recycling and controlled disposal are safer than littering or open burning."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
