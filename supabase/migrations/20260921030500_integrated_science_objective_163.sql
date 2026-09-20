begin;

-- CSEC Integrated Science objective 1.6.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t6-3-sight-defects',
  'module-1-organisms-life-processes',
  '1.6.3 Sight Defects and Eye Conditions',
  'Analyse short sight, long sight, astigmatism, cataract, glaucoma and colour vision deficiency, including causes and correction or management.',
  260,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Sense Organs and Coordination",
      "objective":"1.6.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Distinguish short sight from long sight using where light is focused relative to the retina.",
        "Explain how concave and convex spectacle lenses correct refractive errors.",
        "Explain why astigmatism causes blurred vision.",
        "Describe cataract, glaucoma and colour vision deficiency.",
        "State appropriate correction or management for the sight defects covered."
      ],
      "introduction":"Sight problems do not all have the same cause. Some are refractive defects, where light is not focused correctly on the retina. Others affect the lens, optic nerve or cone cells. Correct identification depends on linking the defect to the structure or focusing problem involved.",
      "sections":[
        {
          "title":"Short sight or myopia",
          "paragraphs":[
            "A short-sighted person sees near objects clearly but distant objects appear blurred. Light from distant objects is focused in front of the retina.",
            "A concave, or diverging, lens spreads incoming light rays before they enter the eye. The eye then focuses the rays farther back so that they meet on the retina."
          ]
        },
        {
          "title":"Long sight or hypermetropia",
          "paragraphs":[
            "A long-sighted person has difficulty focusing clearly on near objects. Light from a near object would be focused behind the retina if the eye cannot increase its focusing power enough.",
            "A convex, or converging, lens bends incoming rays towards one another before they enter the eye, helping the eye focus them on the retina."
          ]
        },
        {
          "title":"Astigmatism",
          "paragraphs":[
            "Astigmatism occurs when the cornea or lens has uneven curvature. Light is not brought to one sharp focal point, so images can appear blurred or distorted.",
            "Corrective cylindrical or toric lenses compensate for the uneven focusing."
          ]
        },
        {
          "title":"Cataract",
          "paragraphs":[
            "A cataract is clouding of the lens. The cloudy lens reduces clear transmission of light to the retina and causes progressively blurred or hazy vision.",
            "Cataracts may be treated by surgery in which the cloudy natural lens is removed and replaced with an artificial lens."
          ]
        },
        {
          "title":"Glaucoma",
          "paragraphs":[
            "Glaucoma is a group of conditions that damage the optic nerve. Increased pressure inside the eye is an important risk factor in many forms.",
            "Damage to the optic nerve can cause permanent loss of vision, so early detection and treatment are important."
          ]
        },
        {
          "title":"Colour vision deficiency",
          "paragraphs":[
            "Inherited colour vision deficiency results from altered function of particular cone cells in the retina.",
            "Ordinary spectacle lenses do not restore normal colour discrimination because the problem is not caused by the focusing of light."
          ]
        },
        {
          "title":"Protecting the retina",
          "paragraphs":[
            "Looking directly at the Sun is dangerous. The eye focuses intense sunlight onto the retina, where it can cause permanent damage.",
            "Students should never use ordinary sunglasses, exposed film or improvised filters to view the Sun directly."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t6-3-sight-defects",
          "type":"sight-defects",
          "title":"Sight defects and correction"
        }
      ],
      "keyPoints":[
        "Myopia focuses distant images in front of the retina and is corrected with a concave lens.",
        "Hypermetropia focuses near images behind the retina and is corrected with a convex lens.",
        "Astigmatism results from uneven curvature of the cornea or lens.",
        "A cataract is clouding of the lens.",
        "Glaucoma damages the optic nerve and can cause permanent vision loss.",
        "Colour vision deficiency results from altered cone function and is not corrected by ordinary focusing lenses.",
        "Direct viewing of the Sun can damage the retina."
      ],
      "workedExample":{
        "title":"Correcting short sight",
        "prompt":"Tamika can read a book clearly but cannot see writing on the classroom board clearly. Name the defect and explain how spectacles correct it.",
        "steps":[
          "The near object is clear while the distant object is blurred.",
          "This pattern indicates short sight or myopia.",
          "In myopia, distant light focuses in front of the retina.",
          "A concave lens diverges the incoming rays.",
          "The eye then focuses them farther back, on the retina."
        ],
        "answer":"Tamika is short-sighted. A concave lens spreads the incoming light rays so that the eye focuses them on the retina instead of in front of it."
      },
      "checks":[
        {
          "prompt":"Which lens corrects short sight?",
          "answer":"A concave or diverging lens.",
          "explanation":"It spreads incoming rays so their final focus moves farther back onto the retina."
        },
        {
          "prompt":"Where is the image formed in an uncorrected long-sighted eye when viewing a near object?",
          "answer":"Behind the retina.",
          "explanation":"A convex lens increases convergence before the rays enter the eye."
        },
        {
          "prompt":"Why does astigmatism cause blurred vision?",
          "answer":"The cornea or lens is unevenly curved, so light is not focused to one point.",
          "explanation":"Different rays can be focused at different positions."
        },
        {
          "prompt":"Why should glaucoma be detected and treated early?",
          "answer":"Because optic nerve damage can lead to permanent loss of vision.",
          "explanation":"Vision already lost from optic nerve damage may not be restored."
        }
      ],
      "summary":"Analyse a sight problem by identifying where the defect occurs. Refractive problems alter the position of the focus, while cataract, glaucoma and colour vision deficiency affect different eye structures or receptor functions."
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
  || '{"topicsBuilt":26,"objectivesBuilt":26}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
