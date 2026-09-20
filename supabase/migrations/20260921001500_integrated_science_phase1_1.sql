begin;

-- ============================================================================
-- SPARK CSEC Integrated Science Phase 1.1
-- Objective 1.1 interactive membrane transport model
-- Objective 1.2 microscope practical-support diagram
-- ============================================================================

update public.spark_subject_topics
set metadata = jsonb_set(
  metadata,
  '{lesson,interactiveModels}',
  '[
    {
      "id":"m1-t1-1-membrane-transport-model",
      "type":"membrane-transport",
      "title":"Movement of substances across cells"
    }
  ]'::jsonb,
  true
),
updated_at = now()
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-1-diffusion-osmosis-active-transport';


update public.spark_subject_topics
set metadata = jsonb_set(
  metadata,
  '{lesson,interactiveDiagrams}',
  coalesce(metadata #> '{lesson,interactiveDiagrams}','[]'::jsonb)
    || '[
      {
        "id":"m1-t1-2-light-microscope",
        "template":"light-microscope",
        "title":"Label the light microscope",
        "instructions":"This is practical support for examining prepared slides. Drag each label to the correct part of the microscope. On a phone or tablet, tap a label and then tap its target.",
        "labels":[
          {
            "id":"eyepiece",
            "text":"Eyepiece lens",
            "hint":"This is the part you look through.",
            "explanation":"The eyepiece lens is the lens closest to the eye."
          },
          {
            "id":"objective",
            "text":"Objective lens",
            "hint":"Look just above the stage for the lenses closest to the specimen.",
            "explanation":"Objective lenses provide different levels of magnification."
          },
          {
            "id":"stage",
            "text":"Stage",
            "hint":"The prepared slide rests on this flat platform.",
            "explanation":"The stage supports the slide while the specimen is examined."
          },
          {
            "id":"coarse-focus",
            "text":"Coarse focus",
            "hint":"Look for the larger focusing knob.",
            "explanation":"The coarse focus makes larger adjustments when bringing the specimen into focus."
          },
          {
            "id":"fine-focus",
            "text":"Fine focus",
            "hint":"Look for the smaller focusing knob.",
            "explanation":"The fine focus makes small adjustments to sharpen the image."
          },
          {
            "id":"light-source",
            "text":"Light source",
            "hint":"Look below the stage.",
            "explanation":"The light source directs light through the specimen so it can be seen."
          }
        ],
        "targets":[
          {"id":"micro-eyepiece-target","labelId":"eyepiece","boxX":20,"boxY":90,"anchorX":430,"anchorY":82,"side":"left"},
          {"id":"micro-objective-target","labelId":"objective","boxX":20,"boxY":175,"anchorX":485,"anchorY":280,"side":"left"},
          {"id":"micro-stage-target","labelId":"stage","boxX":20,"boxY":260,"anchorX":410,"anchorY":355,"side":"left"},
          {"id":"micro-coarse-target","labelId":"coarse-focus","boxX":790,"boxY":105,"anchorX":590,"anchorY":260,"side":"right"},
          {"id":"micro-fine-target","labelId":"fine-focus","boxX":790,"boxY":190,"anchorX":630,"anchorY":285,"side":"right"},
          {"id":"micro-light-target","labelId":"light-source","boxX":790,"boxY":275,"anchorX":470,"anchorY":430,"side":"right"}
        ]
      }
    ]'::jsonb,
  true
),
updated_at = now()
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-2-animal-and-plant-cells';


insert into public.spark_subject_activity_catalog(
  subject_id,
  activity_key,
  activity_type,
  section_id,
  topic_id,
  title,
  route,
  evidence_weight,
  enabled,
  metadata
)
values (
  'integrated-science',
  'diagram:m1-t1-2-light-microscope',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t1-2-animal-and-plant-cells',
  'Label the light microscope',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t1-2-animal-and-plant-cells',
  0.25,
  true,
  '{
    "syllabusObjective":"1.2",
    "mode":"drag-drop-label",
    "classification":"practical-support",
    "note":"Supports the syllabus practical activity of examining prepared slides under a microscope."
  }'::jsonb
)
on conflict (subject_id,activity_key) do update set
  activity_type = excluded.activity_type,
  section_id = excluded.section_id,
  topic_id = excluded.topic_id,
  title = excluded.title,
  route = excluded.route,
  evidence_weight = excluded.evidence_weight,
  enabled = excluded.enabled,
  metadata = excluded.metadata,
  updated_at = now();


update public.spark_subjects
set stats = coalesce(stats,'{}'::jsonb)
  || '{
    "sections":1,
    "topics":2,
    "objectives":2,
    "interactiveDiagrams":3,
    "interactiveModels":1
  }'::jsonb,
updated_at = now()
where id = 'integrated-science';

commit;