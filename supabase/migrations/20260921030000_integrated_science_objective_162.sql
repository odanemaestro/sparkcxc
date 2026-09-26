begin;

-- CSEC Integrated Science objective 1.6.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t6-2-mammalian-eye',
  'module-1-organisms-life-processes',
  '1.6.2 Structure and Function of the Mammalian Eye',
  'Relate the structures of the mammalian eye to their functions and explain accommodation and pupil responses.',
  250,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Sense Organs and Coordination",
      "objective":"1.6.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify the major structures of the mammalian eye.",
        "Relate each eye structure to its function.",
        "Explain accommodation for near and distant vision.",
        "Explain how the iris controls pupil size in bright and dim light.",
        "Describe the image formed on the retina."
      ],
      "introduction":"The eye forms an image by refracting light and focusing it on the retina. Different structures protect the eye, control the amount of light entering, adjust focus and convert light into nerve impulses.",
      "sections":[
        {
          "title":"Cornea and sclera",
          "paragraphs":[
            "The sclera is the tough white outer coat that protects the eyeball and helps maintain its shape.",
            "At the front of the eye, the sclera becomes the transparent cornea. The cornea allows light to enter and provides most of the refraction, or bending, of light entering the eye."
          ]
        },
        {
          "title":"Iris and pupil",
          "paragraphs":[
            "The iris is the coloured muscular part of the eye. The pupil is the opening in the centre of the iris.",
            "In bright light, circular muscles of the iris contract and the pupil becomes smaller, reducing the amount of light entering.",
            "In dim light, radial muscles contract and the pupil becomes larger, allowing more light to enter."
          ]
        },
        {
          "title":"Lens, ciliary muscles and suspensory ligaments",
          "paragraphs":[
            "The lens is transparent and elastic. It fine-tunes the focus of light onto the retina.",
            "For a near object, the ciliary muscles contract, the suspensory ligaments slacken and the lens becomes fatter or more convex. This increases its refractive power.",
            "For a distant object, the ciliary muscles relax, the suspensory ligaments tighten and the lens becomes thinner. This reduces its refractive power."
          ]
        },
        {
          "title":"Retina, fovea and blind spot",
          "paragraphs":[
            "The retina contains rods and cones, which are light-sensitive receptor cells.",
            "The fovea is the region of sharpest vision because it has a high concentration of cones.",
            "The blind spot is where the optic nerve leaves the eye. It contains no photoreceptors, so an image falling there cannot be detected."
          ]
        },
        {
          "title":"Choroid and optic nerve",
          "paragraphs":[
            "The choroid is a dark, blood-rich layer inside the sclera. It supplies tissues of the eye and absorbs stray light, reducing internal reflection.",
            "The optic nerve carries nerve impulses from the retina to the brain."
          ]
        },
        {
          "title":"Image formation",
          "paragraphs":[
            "Light is refracted mainly by the cornea and then adjusted by the lens so that rays meet on the retina.",
            "The image formed on the retina is real, inverted and smaller than the object. The brain processes the pattern of nerve impulses so that the visual scene is perceived in its normal orientation."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t6-2-eye-function",
          "type":"eye-function",
          "title":"Eye accommodation and pupil response"
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m1-t6-2-mammalian-eye",
          "template":"mammalian-eye",
          "title":"Label the mammalian eye",
          "instructions":"Drag each label to the correct structure. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"cornea","text":"Cornea","hint":"Look at the transparent curved front of the eye.","explanation":"The cornea allows light to enter and provides most of the eye''s refraction."},
            {"id":"iris","text":"Iris","hint":"Look for the muscular ring near the front of the eye.","explanation":"The iris controls pupil size and therefore the amount of light entering."},
            {"id":"lens","text":"Lens","hint":"Look for the transparent oval structure behind the pupil.","explanation":"The lens changes shape during accommodation and fine-tunes focus on the retina."},
            {"id":"retina","text":"Retina","hint":"Look for the light-sensitive inner layer at the back of the eye.","explanation":"The retina contains rods and cones that convert light into nerve impulses."},
            {"id":"choroid","text":"Choroid","hint":"Look for the dark layer between sclera and retina.","explanation":"The choroid supplies blood and absorbs stray light."},
            {"id":"sclera","text":"Sclera","hint":"Look for the tough outer coat of the eyeball.","explanation":"The sclera protects the eye and maintains its shape."},
            {"id":"optic-nerve","text":"Optic nerve","hint":"Look for the nerve leaving the back of the eye.","explanation":"The optic nerve carries impulses from the retina to the brain."},
            {"id":"fovea","text":"Fovea","hint":"Look for the small retinal region associated with sharpest vision.","explanation":"The fovea has a high concentration of cones and gives the sharpest vision."}
          ],
          "targets":[
            {"id":"eye-cornea-target","labelId":"cornea","boxX":20,"boxY":55,"anchorX":300,"anchorY":310,"side":"left"},
            {"id":"eye-iris-target","labelId":"iris","boxX":20,"boxY":125,"anchorX":350,"anchorY":255,"side":"left"},
            {"id":"eye-lens-target","labelId":"lens","boxX":20,"boxY":195,"anchorX":405,"anchorY":310,"side":"left"},
            {"id":"eye-sclera-target","labelId":"sclera","boxX":20,"boxY":265,"anchorX":520,"anchorY":125,"side":"left"},
            {"id":"eye-retina-target","labelId":"retina","boxX":790,"boxY":55,"anchorX":635,"anchorY":260,"side":"right"},
            {"id":"eye-choroid-target","labelId":"choroid","boxX":790,"boxY":125,"anchorX":660,"anchorY":225,"side":"right"},
            {"id":"eye-optic-nerve-target","labelId":"optic-nerve","boxX":790,"boxY":195,"anchorX":770,"anchorY":340,"side":"right"},
            {"id":"eye-fovea-target","labelId":"fovea","boxX":790,"boxY":265,"anchorX":625,"anchorY":310,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "The cornea provides most refraction of incoming light.",
        "The iris controls pupil size.",
        "The lens changes shape during accommodation.",
        "For near vision, ciliary muscles contract, suspensory ligaments slacken and the lens becomes more convex.",
        "For distant vision, ciliary muscles relax, suspensory ligaments tighten and the lens becomes thinner.",
        "The retina contains rods and cones.",
        "The fovea gives the sharpest vision and the blind spot contains no photoreceptors.",
        "The optic nerve carries impulses to the brain."
      ],
      "workedExample":{
        "title":"Focusing on a near object",
        "prompt":"Explain how the eye changes when a student shifts focus from the classroom board to a book held nearby.",
        "steps":[
          "The object is now near the eye.",
          "The ciliary muscles contract.",
          "The suspensory ligaments slacken.",
          "The elastic lens becomes fatter or more convex.",
          "The thicker lens bends light more strongly so it focuses on the retina."
        ],
        "answer":"For near vision, ciliary muscles contract, suspensory ligaments slacken and the lens becomes more convex so that light is focused on the retina."
      },
      "checks":[
        {
          "prompt":"Which part of the eye provides most of the refraction of incoming light?",
          "answer":"The cornea.",
          "explanation":"The lens adjusts focus, but the cornea provides most of the initial bending of light."
        },
        {
          "prompt":"What happens to the pupil in bright light?",
          "answer":"It becomes smaller because the circular muscles of the iris contract.",
          "explanation":"This reduces the amount of light entering the eye."
        },
        {
          "prompt":"Why is vision sharpest at the fovea?",
          "answer":"The fovea has a high concentration of cone cells.",
          "explanation":"Cones provide detailed colour vision."
        },
        {
          "prompt":"Describe the image formed on the retina.",
          "answer":"It is real, inverted and smaller than the object.",
          "explanation":"The brain processes the resulting nerve impulses so the scene is perceived normally."
        }
      ],
      "summary":"Relate every structure to a function. The cornea and lens focus light, the iris controls light entry, the retina detects light and the optic nerve carries visual impulses to the brain."
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
  'diagram:m1-t6-2-mammalian-eye',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t6-2-mammalian-eye',
  'Label the mammalian eye',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t6-2-mammalian-eye',
  0.35,
  true,
  '{"syllabusObjective":"1.6.2","mode":"drag-drop-label"}'::jsonb
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
  || '{"topicsBuilt":25,"objectivesBuilt":25}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
