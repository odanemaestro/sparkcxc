-- SPARK Integrated Science final visual catch-up package
-- Generated from integrated-science-acceptance-audit
-- Source head before package assembly: d4441cd54fd12785c7ed2d36f2b87ca8b390e4c2
-- 114 objective migrations + 6 supporting migrations = 120 ordered SQL sources.
-- Inner BEGIN/COMMIT statements are removed; the package runs as one outer transaction.
-- Run with psql -v ON_ERROR_STOP=1 -f ".\\integrated-science-visual-catchup.sql"

begin;

-- Preflight accepts either the original 112-legacy/2-canonical baseline
-- or the already-reconciled 0-legacy/114-canonical state.
do $catchup_preflight$
declare
  v_sections integer;
  v_enabled_topics integer;
  v_enabled_legacy integer;
  v_enabled_canonical integer;
begin
  select count(*) into v_sections
  from public.spark_subject_sections
  where subject_id='integrated-science' and enabled=true;

  select count(*) into v_enabled_topics
  from public.spark_subject_topics
  where subject_id='integrated-science' and enabled=true;

  select count(*) into v_enabled_legacy
  from public.spark_subject_topics
  where subject_id='integrated-science' and enabled=true
    and topic_id ~ '^m[123]-o-';

  select count(*) into v_enabled_canonical
  from public.spark_subject_topics
  where subject_id='integrated-science' and enabled=true
    and topic_id !~ '^m[123]-o-';

  if v_sections <> 3 then
    raise exception 'Integrated Science catch-up preflight failed: expected 3 enabled sections, found %', v_sections;
  end if;

  if v_enabled_topics <> 114 then
    raise exception 'Integrated Science catch-up preflight failed: expected 114 enabled topics, found %', v_enabled_topics;
  end if;

  if not (
    (v_enabled_legacy = 112 and v_enabled_canonical = 2)
    or
    (v_enabled_legacy = 0 and v_enabled_canonical = 114)
  ) then
    raise exception 'Integrated Science catch-up preflight failed: expected 112 legacy + 2 canonical OR 0 legacy + 114 canonical; found % legacy + % canonical',
      v_enabled_legacy, v_enabled_canonical;
  end if;
end
$catchup_preflight$;


-- ============================================================================
-- SOURCE 1/120: supabase/migrations/20260921000500_integrated_science_objective_111.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.1.1
insert into public.spark_subject_topics(
 subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values(
 'integrated-science','m1-t1-1-cell-transport','module-1-organisms-life-processes',
 '1.1.1 Diffusion, Osmosis and Active Transport',
 'Analyse diffusion, osmosis and active transport and apply them to cells and simple investigations.',
 10,true,
 '{
  "syllabus":{"module":1,"topic":"Units of Life","objective":"1.1.1","source":"CXC 23/G/SYLL 23, amended 2026"},
  "lesson":{
   "objectives":[
    "Define diffusion as net particle movement down a concentration gradient.",
    "Define osmosis as water movement through a selectively permeable membrane from higher water concentration to lower water concentration.",
    "Explain active transport as movement against a concentration gradient using energy from respiration.",
    "Compare the energy and membrane requirements of the three processes.",
    "Apply osmosis to plant and animal cells.",
    "Explain mineral-ion uptake by root hair cells and glucose uptake by intestinal cells.",
    "Interpret osmometer, potato-strip and Visking-tubing investigations.",
    "Explain factors that increase diffusion rate."
   ],
   "introduction":"Cells constantly exchange substances with their surroundings. Diffusion, osmosis and active transport differ in what moves, the direction of movement and whether cellular energy is required.",
   "sections":[
    {"title":"Diffusion","paragraphs":[
     "Diffusion is the net movement of particles from a region of higher concentration to a region of lower concentration.",
     "The particles move down a concentration gradient and no energy from the cell is required.",
     "A steeper concentration gradient increases the rate of diffusion. Higher temperature, larger surface area and shorter diffusion distance can also increase rate."
    ]},
    {"title":"Diffusion in living systems","paragraphs":[
     "Oxygen diffuses from alveoli into blood because oxygen concentration is higher in alveolar air than in deoxygenated blood.",
     "Carbon dioxide diffuses in the opposite direction where its concentration gradient favours movement."
    ]},
    {"title":"Osmosis","paragraphs":[
     "Osmosis is the net movement of water molecules through a selectively permeable membrane from a region of higher water concentration to a region of lower water concentration.",
     "It can also be described as movement of water from a more dilute solution to a more concentrated solution through a selectively permeable membrane.",
     "The membrane is essential because it allows water through while restricting some solute particles."
    ]},
    {"title":"Osmosis in plant cells","paragraphs":[
     "A plant cell in pure water gains water by osmosis and becomes turgid.",
     "The cellulose cell wall resists further expansion and prevents the cell from bursting.",
     "In a concentrated salt or sugar solution, water leaves the cell by osmosis, reducing turgor and causing tissues such as potato strips to become softer and smaller."
    ]},
    {"title":"Osmosis in animal cells","paragraphs":[
     "Animal cells have no cell wall.",
     "A red blood cell placed in distilled water gains water by osmosis, swells and may burst.",
     "A sufficiently concentrated external solution causes water to leave the cell."
    ]},
    {"title":"Active transport","paragraphs":[
     "Active transport moves substances from a region of lower concentration to a region of higher concentration, against the concentration gradient.",
     "It requires energy released by respiration and uses transport proteins in the cell membrane.",
     "Root hair cells can absorb mineral ions from dilute soil solution by active transport.",
     "Cells lining the small intestine can absorb glucose against a concentration gradient using active transport."
    ]},
    {"title":"Osmometer investigation","paragraphs":[
     "An osmometer containing concentrated sugar solution is separated from distilled water by a selectively permeable membrane.",
     "Water enters the sugar solution by osmosis, causing the liquid level in the capillary tube to rise."
    ]},
    {"title":"Potato-strip investigation","paragraphs":[
     "Equal potato strips are placed in solutions of different concentration and the change in length or mass is measured.",
     "A gain in size indicates net water entry. A loss indicates net water exit.",
     "Where there is little or no change, the external solution is close to the concentration of the cell sap."
    ]},
    {"title":"Visking-tubing investigation","paragraphs":[
     "Visking tubing acts as a model selectively permeable membrane.",
     "Small iodine molecules can pass through more readily than large starch molecules.",
     "If iodine surrounds starch inside the tubing, iodine enters and turns the starch blue-black while starch remains inside."
    ]}
   ],
   "interactiveModels":[
    {"id":"m1-t1-1-transport-processes","type":"membrane-transport","title":"Diffusion, osmosis and active transport explorer"},
    {"id":"m1-t1-1-transport-investigations","type":"transport-investigations","title":"Transport practical investigations"}
   ],
   "keyPoints":[
    "Diffusion moves particles down a concentration gradient.",
    "Osmosis is water movement through a selectively permeable membrane.",
    "Active transport moves substances against a concentration gradient and requires energy.",
    "Plant cells become turgid in dilute solutions because their walls resist expansion.",
    "Animal cells can burst in very dilute solutions because they lack a cell wall.",
    "Root hair cells use active transport to absorb mineral ions.",
    "Osmometers, potato strips and Visking tubing provide evidence for membrane transport."
   ],
   "workedExample":{
    "title":"Potato strip in concentrated solution",
    "prompt":"A potato strip becomes shorter after being placed in concentrated sugar solution. Explain the observation.",
    "steps":[
     "The sugar solution has a lower water concentration than the potato cell sap.",
     "Water moves out of the potato cells through their selectively permeable membranes.",
     "The cells lose turgor.",
     "The strip becomes shorter and softer."
    ],
    "answer":"Water leaves the potato cells by osmosis, so the cells lose turgor and the strip shrinks."
   },
   "checks":[
    {"prompt":"Which transport process requires energy from respiration?","answer":"Active transport.","explanation":"It moves substances against a concentration gradient."},
    {"prompt":"Why does a red blood cell swell in distilled water?","answer":"Water enters by osmosis.","explanation":"Distilled water has a higher water concentration than the cell contents."},
    {"prompt":"What happens to the liquid level in an osmometer containing concentrated sugar solution?","answer":"It rises.","explanation":"Water enters through the selectively permeable membrane by osmosis."},
    {"prompt":"Why can root hair cells take up mineral ions from a more dilute soil solution?","answer":"They use active transport.","explanation":"Energy is used to move ions against the concentration gradient."}
   ],
   "summary":"Diffusion and osmosis are passive processes moving down appropriate gradients. Active transport uses cellular energy to move substances against a concentration gradient."
  }
 }'::jsonb
)
on conflict(subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":114,"objectivesBuilt":114}'::jsonb,updated_at=now() where id='integrated-science';

-- ============================================================================
-- SOURCE 2/120: supabase/migrations/20260921000600_subject_progress_diagram_activity.sql
-- ============================================================================
-- ============================================================================
-- SPARK canonical subject progress: interactive diagram support
--
-- Preserve the complete live activity-type contract and add `diagram`.
-- Existing production types:
-- lesson, lab, flashcard, flashcard_review, sba_review, topic_quiz,
-- section_checkpoint, exam, practice, other.
-- ============================================================================

alter table public.spark_subject_progress
  drop constraint if exists spark_subject_progress_activity_type_check;

alter table public.spark_subject_progress
  add constraint spark_subject_progress_activity_type_check
  check (
    activity_type in (
      'lesson',
      'lab',
      'flashcard',
      'flashcard_review',
      'sba_review',
      'topic_quiz',
      'section_checkpoint',
      'exam',
      'practice',
      'diagram',
      'other'
    )
  );

alter table public.spark_subject_activity_events
  drop constraint if exists spark_subject_activity_events_activity_type_check;

alter table public.spark_subject_activity_events
  add constraint spark_subject_activity_events_activity_type_check
  check (
    activity_type in (
      'lesson',
      'lab',
      'flashcard',
      'flashcard_review',
      'sba_review',
      'topic_quiz',
      'section_checkpoint',
      'exam',
      'practice',
      'diagram',
      'other'
    )
  );


create or replace function public.spark_record_subject_progress(
  p_subject_id text,
  p_activity_key text,
  p_activity_type text,
  p_section_id text default null,
  p_topic_id text default null,
  p_title text default null,
  p_completed boolean default true,
  p_score numeric default null,
  p_max_score numeric default null,
  p_percent numeric default null,
  p_metadata jsonb default '{}'::jsonb,
  p_silent boolean default false
)
returns public.spark_subject_progress
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_user_id uuid := auth.uid();
  v_subject_id text := lower(trim(coalesce(p_subject_id, '')));
  v_key text := trim(coalesce(p_activity_key, ''));
  v_type text := lower(trim(coalesce(p_activity_type, '')));
  v_title text := left(coalesce(nullif(trim(p_title), ''), v_key), 180);
  v_score numeric := case when p_score is null then null else greatest(0, p_score) end;
  v_max numeric := case when p_max_score is null then null else greatest(0, p_max_score) end;
  v_percent numeric(6,2);
  v_row public.spark_subject_progress;
  v_is_attempt boolean;
  v_existing_completed_at timestamptz;
  v_should_log boolean := false;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;

  if not exists (
    select 1 from public.profiles p
    where p.id = v_user_id and p.role = 'student'
  ) then
    raise exception 'Only Student accounts can record learning progress';
  end if;

  if v_subject_id !~ '^[a-z0-9][a-z0-9_-]{0,39}$' then
    raise exception 'Invalid subject id';
  end if;

  if char_length(v_key) not between 1 and 120 then
    raise exception 'Invalid activity key';
  end if;

  if v_type not in (
    'lesson','lab','flashcard','flashcard_review','sba_review',
    'topic_quiz','section_checkpoint','exam','practice','diagram','other'
  ) then
    raise exception 'Unsupported subject activity type';
  end if;

  if v_score is not null and v_max is not null and v_max > 0 then
    v_score := least(v_score, v_max);
    v_percent := round((v_score / v_max) * 100, 2);
  elsif p_percent is not null then
    v_percent := greatest(0, least(100, p_percent));
  else
    v_percent := null;
  end if;

  v_is_attempt := v_type in ('topic_quiz','section_checkpoint','exam','practice');

  select sp.completed_at
    into v_existing_completed_at
  from public.spark_subject_progress sp
  where sp.user_id = v_user_id
    and sp.subject_id = v_subject_id
    and sp.activity_key = v_key;

  insert into public.spark_subject_progress(
    user_id, subject_id, activity_key, activity_type, section_id, topic_id, title,
    completed, score, max_score, percent, best_percent, attempt_count, metadata,
    completed_at, first_recorded_at, updated_at
  ) values (
    v_user_id, v_subject_id, v_key, v_type,
    nullif(trim(coalesce(p_section_id,'')),''),
    nullif(trim(coalesce(p_topic_id,'')),''),
    v_title, coalesce(p_completed,false),
    v_score, v_max, v_percent, v_percent,
    case when v_is_attempt and not coalesce(p_silent,false) then 1 else 0 end,
    coalesce(p_metadata,'{}'::jsonb) || jsonb_build_object('subject_id',v_subject_id),
    case when coalesce(p_completed,false) then now() else null end,
    now(), now()
  )
  on conflict (user_id, subject_id, activity_key) do update set
    activity_type = excluded.activity_type,
    section_id = coalesce(excluded.section_id, public.spark_subject_progress.section_id),
    topic_id = coalesce(excluded.topic_id, public.spark_subject_progress.topic_id),
    title = excluded.title,
    completed = excluded.completed,
    completed_at = coalesce(public.spark_subject_progress.completed_at, excluded.completed_at),
    score = coalesce(excluded.score, public.spark_subject_progress.score),
    max_score = coalesce(excluded.max_score, public.spark_subject_progress.max_score),
    percent = coalesce(excluded.percent, public.spark_subject_progress.percent),
    best_percent = case
      when excluded.percent is null then public.spark_subject_progress.best_percent
      else greatest(coalesce(public.spark_subject_progress.best_percent,0), excluded.percent)
    end,
    attempt_count = public.spark_subject_progress.attempt_count
      + case when v_is_attempt and not coalesce(p_silent,false) then 1 else 0 end,
    metadata = public.spark_subject_progress.metadata || excluded.metadata,
    updated_at = now()
  returning * into v_row;

  if not coalesce(p_silent,false) then
    v_should_log := v_is_attempt
      or v_type = 'flashcard'
      or (
        v_type in ('lesson','lab','flashcard_review','sba_review','diagram')
        and coalesce(p_completed,false)
        and v_existing_completed_at is null
      );
  end if;

  if v_should_log then
    insert into public.spark_subject_activity_events(
      user_id, subject_id, activity_key, activity_type, section_id, topic_id, title,
      completed, score, max_score, percent, metadata, occurred_at, created_at
    ) values (
      v_user_id, v_subject_id, v_key, v_type,
      nullif(trim(coalesce(p_section_id,'')),''),
      nullif(trim(coalesce(p_topic_id,'')),''),
      v_title, coalesce(p_completed,false),
      v_score, v_max, v_percent,
      coalesce(p_metadata,'{}'::jsonb) || jsonb_build_object('subject_id',v_subject_id),
      now(), now()
    );
  end if;

  return v_row;
end;
$function$;

revoke all on function public.spark_record_subject_progress(
  text,text,text,text,text,text,boolean,numeric,numeric,numeric,jsonb,boolean
) from public, anon;

grant execute on function public.spark_record_subject_progress(
  text,text,text,text,text,text,boolean,numeric,numeric,numeric,jsonb,boolean
) to authenticated;


create or replace function public.spark_sync_subject_progress(
  p_subject_id text,
  p_rows jsonb
)
returns integer
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_user_id uuid := auth.uid();
  v_subject_id text := lower(trim(coalesce(p_subject_id,'')));
  v_item jsonb;
  v_count integer := 0;
  v_key text;
  v_type text;
  v_percent numeric;
  v_best numeric;
  v_attempts integer;
  v_when timestamptz;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;

  if not exists (
    select 1 from public.profiles p
    where p.id = v_user_id and p.role = 'student'
  ) then
    raise exception 'Only Student accounts can sync learning progress';
  end if;

  if v_subject_id !~ '^[a-z0-9][a-z0-9_-]{0,39}$' then
    raise exception 'Invalid subject id';
  end if;

  if jsonb_typeof(coalesce(p_rows,'[]'::jsonb)) <> 'array' then
    raise exception 'Progress rows must be an array';
  end if;

  if jsonb_array_length(coalesce(p_rows,'[]'::jsonb)) > 250 then
    raise exception 'Too many progress rows';
  end if;

  for v_item in
    select value
    from jsonb_array_elements(coalesce(p_rows,'[]'::jsonb))
  loop
    v_key := trim(coalesce(v_item->>'activity_key',''));
    v_type := lower(trim(coalesce(v_item->>'activity_type','')));

    if char_length(v_key) not between 1 and 120 then continue; end if;

    if v_type not in (
      'lesson','lab','flashcard','flashcard_review','sba_review',
      'topic_quiz','section_checkpoint','exam','practice','diagram','other'
    ) then
      continue;
    end if;

    begin v_percent := nullif(v_item->>'percent','')::numeric;
    exception when others then v_percent := null;
    end;

    begin v_best := nullif(v_item->>'best_percent','')::numeric;
    exception when others then v_best := null;
    end;

    begin
      v_attempts := greatest(
        0,
        coalesce(nullif(v_item->>'attempt_count','')::integer,0)
      );
    exception when others then
      v_attempts := 0;
    end;

    begin v_when := nullif(v_item->>'occurred_at','')::timestamptz;
    exception when others then v_when := null;
    end;

    insert into public.spark_subject_progress(
      user_id, subject_id, activity_key, activity_type, section_id, topic_id, title,
      completed, score, max_score, percent, best_percent, attempt_count, metadata,
      completed_at, first_recorded_at, updated_at
    ) values (
      v_user_id, v_subject_id, v_key, v_type,
      nullif(trim(coalesce(v_item->>'section_id','')),''),
      nullif(trim(coalesce(v_item->>'topic_id','')),''),
      left(coalesce(nullif(trim(v_item->>'title'),''),v_key),180),
      coalesce((v_item->>'completed')::boolean,false),
      case when v_item ? 'score' and nullif(v_item->>'score','') is not null
        then greatest(0,(v_item->>'score')::numeric) else null end,
      case when v_item ? 'max_score' and nullif(v_item->>'max_score','') is not null
        then greatest(0,(v_item->>'max_score')::numeric) else null end,
      case when v_percent is null then null
        else greatest(0,least(100,v_percent)) end,
      case when coalesce(v_best,v_percent) is null then null
        else greatest(0,least(100,coalesce(v_best,v_percent))) end,
      v_attempts,
      coalesce(v_item->'metadata','{}'::jsonb)
        || jsonb_build_object('subject_id',v_subject_id,'backfilled',true),
      case when coalesce((v_item->>'completed')::boolean,false)
        then coalesce(v_when,now()) else null end,
      coalesce(v_when,now()),
      coalesce(v_when,now())
    )
    on conflict (user_id,subject_id,activity_key) do update set
      completed = case
        when excluded.activity_type in ('lesson','lab','diagram')
        then public.spark_subject_progress.completed or excluded.completed
        else public.spark_subject_progress.completed
      end,
      completed_at = coalesce(
        public.spark_subject_progress.completed_at,
        excluded.completed_at
      ),
      score = coalesce(
        public.spark_subject_progress.score,
        excluded.score
      ),
      max_score = coalesce(
        public.spark_subject_progress.max_score,
        excluded.max_score
      ),
      percent = coalesce(
        public.spark_subject_progress.percent,
        excluded.percent
      ),
      best_percent = greatest(
        coalesce(public.spark_subject_progress.best_percent,0),
        coalesce(excluded.best_percent,0)
      ),
      attempt_count = greatest(
        public.spark_subject_progress.attempt_count,
        excluded.attempt_count
      ),
      metadata = public.spark_subject_progress.metadata || excluded.metadata,
      updated_at = case
        when public.spark_subject_progress.updated_at is null then excluded.updated_at
        when v_when is null then public.spark_subject_progress.updated_at
        else greatest(
          public.spark_subject_progress.updated_at,
          excluded.updated_at
        )
      end;

    v_count := v_count + 1;
  end loop;

  return v_count;
end;
$function$;

revoke all on function public.spark_sync_subject_progress(text,jsonb)
from public, anon;

grant execute on function public.spark_sync_subject_progress(text,jsonb)
to authenticated;

-- ============================================================================
-- SOURCE 3/120: supabase/migrations/20260921001000_integrated_science_objective_112.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.1.2
insert into public.spark_subject_topics(
 subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values(
 'integrated-science','m1-t1-2-plant-animal-cells','module-1-organisms-life-processes',
 '1.1.2 Plant and Animal Cells',
 'Examine plant and animal cells, identify major structures and relate cell structure to function.',
 20,true,
 '{
  "syllabus":{"module":1,"topic":"Units of Life","objective":"1.1.2","source":"CXC 23/G/SYLL 23, amended 2026"},
  "lesson":{
   "objectives":[
    "Identify structures found in both plant and animal cells.",
    "Identify structures characteristic of plant cells.",
    "State the functions of the nucleus, cytoplasm, cell membrane, mitochondria and ribosomes.",
    "State the functions of the cell wall, chloroplast and large permanent vacuole.",
    "Explain why active cells such as muscle cells contain many mitochondria.",
    "Explain why root hair and onion bulb cells may lack chloroplasts.",
    "Use a light microscope to observe prepared cells."
   ],
   "introduction":"Plant and animal cells share several basic structures, but plant cells also have structures linked to support, storage and photosynthesis. Cell structure is closely related to cell function.",
   "sections":[
    {"title":"Structures found in both plant and animal cells","paragraphs":[
     "Both plant and animal cells have a cell membrane, cytoplasm, a nucleus in most living cells, mitochondria and ribosomes.",
     "The cell membrane controls movement of substances into and out of the cell.",
     "The cytoplasm is the site of many chemical reactions.",
     "The nucleus contains genetic material and controls cell activities.",
     "Mitochondria are the main sites of aerobic respiration.",
     "Ribosomes are the sites of protein synthesis."
    ]},
    {"title":"Structures characteristic of plant cells","paragraphs":[
     "Plant cells have a cellulose cell wall outside the cell membrane. The wall provides support and helps maintain shape.",
     "Many plant cells contain chloroplasts with chlorophyll for photosynthesis.",
     "A large permanent vacuole contains cell sap and helps keep the cell firm when water enters by osmosis."
    ]},
    {"title":"Animal cells","paragraphs":[
     "Animal cells do not have a cellulose cell wall or chloroplasts.",
     "Their outer boundary is the cell membrane, so their shape is generally less fixed than that of plant cells."
    ]},
    {"title":"Specialised cells and organelle number","paragraphs":[
     "Muscle cells require large amounts of energy and therefore contain many mitochondria.",
     "Red blood cells in mammals lose their nucleus and most organelles as they mature, leaving more space for haemoglobin."
    ]},
    {"title":"Cells without chloroplasts","paragraphs":[
     "Not every plant cell contains chloroplasts.",
     "Root hair cells are underground and receive little or no light, so chloroplasts would not support photosynthesis there.",
     "Onion bulb cells are underground storage cells and usually lack chloroplasts."
    ]},
    {"title":"Using a light microscope","paragraphs":[
     "Cells are too small to examine clearly with the unaided eye, so a light microscope is used.",
     "A prepared specimen is placed on the stage and viewed first with a low-power objective.",
     "The coarse and fine focus controls are used to sharpen the image."
    ]},
    {"title":"Comparing plant and animal cells","paragraphs":[
     "Cell wall, chloroplasts and a large permanent vacuole are characteristic plant-cell structures.",
     "Cell membrane, cytoplasm, nucleus, mitochondria and ribosomes occur in typical cells of both groups."
    ]}
   ],
   "interactiveDiagrams":[
    {
     "id":"m1-t1-2-plant-cell",
     "template":"plant-cell",
     "title":"Label a plant cell",
     "instructions":"Drag each label to the correct structure. On a phone or tablet, tap a label and then tap the numbered target.",
     "labels":[
      {"id":"cell-wall","text":"Cell wall","hint":"Look for the thick outer boundary.","explanation":"The cellulose cell wall supports the plant cell and helps maintain its shape."},
      {"id":"cell-membrane","text":"Cell membrane","hint":"Look just inside the cell wall.","explanation":"The cell membrane controls movement of substances into and out of the cell."},
      {"id":"nucleus","text":"Nucleus","hint":"Look for the large round control centre.","explanation":"The nucleus contains genetic material and controls cell activities."},
      {"id":"vacuole","text":"Large vacuole","hint":"Look for the large central fluid-filled space.","explanation":"The vacuole contains cell sap and helps maintain turgor."},
      {"id":"chloroplast","text":"Chloroplast","hint":"Look for an oval photosynthetic organelle.","explanation":"Chloroplasts contain chlorophyll and are the site of photosynthesis."},
      {"id":"mitochondrion","text":"Mitochondrion","hint":"Look for an oval organelle with an internal folded line.","explanation":"Mitochondria are sites of aerobic respiration."}
     ],
     "targets":[
      {"id":"pc-wall","labelId":"cell-wall","boxX":20,"boxY":65,"anchorX":250,"anchorY":280,"side":"left"},
      {"id":"pc-membrane","labelId":"cell-membrane","boxX":20,"boxY":145,"anchorX":270,"anchorY":320,"side":"left"},
      {"id":"pc-nucleus","labelId":"nucleus","boxX":20,"boxY":225,"anchorX":405,"anchorY":285,"side":"left"},
      {"id":"pc-vacuole","labelId":"vacuole","boxX":790,"boxY":80,"anchorX":525,"anchorY":305,"side":"right"},
      {"id":"pc-chloroplast","labelId":"chloroplast","boxX":790,"boxY":160,"anchorX":650,"anchorY":190,"side":"right"},
      {"id":"pc-mito","labelId":"mitochondrion","boxX":790,"boxY":240,"anchorX":655,"anchorY":335,"side":"right"}
     ]
    },
    {
     "id":"m1-t1-2-animal-cell",
     "template":"animal-cell",
     "title":"Label an animal cell",
     "instructions":"Drag each label to the correct structure. On a phone or tablet, tap a label and then tap the numbered target.",
     "labels":[
      {"id":"cell-membrane","text":"Cell membrane","hint":"Look for the outer boundary of the cell.","explanation":"The membrane controls movement into and out of the cell."},
      {"id":"cytoplasm","text":"Cytoplasm","hint":"Look for the jelly-like interior around the organelles.","explanation":"Many cell reactions occur in the cytoplasm."},
      {"id":"nucleus","text":"Nucleus","hint":"Look for the large central round structure.","explanation":"The nucleus contains genetic material and controls cell activities."},
      {"id":"mitochondrion","text":"Mitochondrion","hint":"Look for an oval organelle with an internal folded line.","explanation":"Mitochondria release usable energy during aerobic respiration."},
      {"id":"ribosome","text":"Ribosome","hint":"Look for a very small dot in the cytoplasm.","explanation":"Ribosomes are sites of protein synthesis."},
      {"id":"small-vacuole","text":"Small vacuole","hint":"Look for the small oval storage region.","explanation":"Small vacuoles may store water or dissolved substances in animal cells."}
     ],
     "targets":[
      {"id":"ac-membrane","labelId":"cell-membrane","boxX":20,"boxY":65,"anchorX":285,"anchorY":305,"side":"left"},
      {"id":"ac-cytoplasm","labelId":"cytoplasm","boxX":20,"boxY":145,"anchorX":350,"anchorY":210,"side":"left"},
      {"id":"ac-nucleus","labelId":"nucleus","boxX":20,"boxY":225,"anchorX":460,"anchorY":300,"side":"left"},
      {"id":"ac-mito","labelId":"mitochondrion","boxX":790,"boxY":80,"anchorX":610,"anchorY":350,"side":"right"},
      {"id":"ac-ribosome","labelId":"ribosome","boxX":790,"boxY":160,"anchorX":345,"anchorY":190,"side":"right"},
      {"id":"ac-vacuole","labelId":"small-vacuole","boxX":790,"boxY":240,"anchorX":590,"anchorY":245,"side":"right"}
     ]
    },
    {
     "id":"m1-t1-2-light-microscope",
     "template":"light-microscope",
     "title":"Label a light microscope",
     "instructions":"Drag each label to the correct microscope part. On a phone or tablet, tap a label and then tap the numbered target.",
     "labels":[
      {"id":"eyepiece","text":"Eyepiece","hint":"Look at the top where the observer looks through.","explanation":"The eyepiece contains the ocular lens."},
      {"id":"objective","text":"Objective lens","hint":"Look above the stage for a short lens.","explanation":"Objective lenses provide the main magnification."},
      {"id":"stage","text":"Stage","hint":"Look for the flat platform holding the slide.","explanation":"The slide is placed on the stage."},
      {"id":"light","text":"Light source","hint":"Look below the stage.","explanation":"The light source illuminates the specimen."},
      {"id":"focus","text":"Focus control","hint":"Look for a side knob.","explanation":"Focus controls sharpen the image."},
      {"id":"base","text":"Base","hint":"Look at the broad bottom support.","explanation":"The base supports the microscope."}
     ],
     "targets":[
      {"id":"mic-eye","labelId":"eyepiece","boxX":20,"boxY":65,"anchorX":440,"anchorY":85,"side":"left"},
      {"id":"mic-objective","labelId":"objective","boxX":20,"boxY":145,"anchorX":480,"anchorY":285,"side":"left"},
      {"id":"mic-stage","labelId":"stage","boxX":20,"boxY":225,"anchorX":470,"anchorY":355,"side":"left"},
      {"id":"mic-light","labelId":"light","boxX":790,"boxY":80,"anchorX":470,"anchorY":430,"side":"right"},
      {"id":"mic-focus","labelId":"focus","boxX":790,"boxY":160,"anchorX":590,"anchorY":260,"side":"right"},
      {"id":"mic-base","labelId":"base","boxX":790,"boxY":240,"anchorX":510,"anchorY":505,"side":"right"}
     ]
    }
   ],
   "keyPoints":[
    "Plant and animal cells both contain a cell membrane, cytoplasm, mitochondria and ribosomes.",
    "The nucleus contains genetic material and controls cell activities.",
    "Plant cells have a cellulose cell wall and may contain chloroplasts and a large permanent vacuole.",
    "Ribosomes make proteins.",
    "Mitochondria are sites of aerobic respiration.",
    "Muscle cells contain many mitochondria because they have a high energy demand.",
    "Root hair and onion bulb cells usually lack chloroplasts because they are not exposed to enough light for photosynthesis."
   ],
   "workedExample":{
    "title":"Identifying a cell",
    "prompt":"A cell contains a nucleus, cytoplasm, cell membrane and many mitochondria but no cell wall. What type of cell is it likely to be?",
    "steps":[
     "No cell wall indicates it is not a typical plant cell.",
     "Many mitochondria suggest a high demand for energy.",
     "Muscle cells are active animal cells that require large amounts of energy."
    ],
    "answer":"It is most likely a muscle cell."
   },
   "checks":[
    {"prompt":"Which two structures are characteristic of plant cells but not animal cells?","answer":"Cell wall and chloroplasts.","explanation":"Plant cells also usually have a large permanent vacuole."},
    {"prompt":"Where are proteins made?","answer":"At ribosomes.","explanation":"Ribosomes are the sites of protein synthesis."},
    {"prompt":"Why do muscle cells contain many mitochondria?","answer":"They need large amounts of energy from aerobic respiration.","explanation":"Mitochondria support high energy demand."},
    {"prompt":"Why do onion bulb cells usually lack chloroplasts?","answer":"They grow underground and do not receive enough light for photosynthesis.","explanation":"Chloroplasts are unnecessary in non-photosynthetic storage tissue."}
   ],
   "summary":"Plant and animal cells share essential structures, but plant cells have additional structures associated with support, storage and photosynthesis."
  }
 }'::jsonb
)
on conflict(subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":114,"objectivesBuilt":114}'::jsonb,updated_at=now() where id='integrated-science';

-- ============================================================================
-- SOURCE 4/120: supabase/migrations/20260921001500_integrated_science_phase1_1.sql
-- ============================================================================
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

-- ============================================================================
-- SOURCE 5/120: supabase/migrations/20260921010000_integrated_science_acceptance_gate_v1.sql
-- ============================================================================
-- ============================================================================
-- SPARK CSEC Integrated Science acceptance audit V1
-- Objective mapping and learner progression corrections.
-- Objective 1.1.1 lesson strengthened using the canonical v1.2 question bank.
-- ============================================================================

update public.spark_subjects
set learning_config = coalesce(learning_config,'{}'::jsonb)
  || '{
    "progression":"sequential",
    "lessonNavigation":"mathematics-style",
    "directRouteProtection":true
  }'::jsonb,
updated_at = now()
where id = 'integrated-science';

update public.spark_subject_topics
set
  title = '1.1.1 Diffusion, Osmosis and Active Transport',
  description = 'Analyse diffusion, osmosis and active transport and apply each process to living cells, everyday examples and practical investigations.',
  metadata = jsonb_set(
    jsonb_set(
      metadata,
      '{syllabus,objective}',
      '"1.1.1"'::jsonb,
      true
    ),
    '{lesson}',
    '{
      "objectives":[
        "Analyse diffusion, osmosis and active transport using concentration gradients, membranes and cellular energy.",
        "Explain how diffusion, osmosis and active transport move substances into and out of cells.",
        "Explain why the cell membrane is described as selectively permeable.",
        "Apply the processes to living examples, environmental examples and practical investigations."
      ],
      "introduction":"Living cells constantly exchange substances with their surroundings. Oxygen, water, glucose and mineral ions do not all cross cell boundaries in the same way. The key is to identify what is moving, the direction of the concentration gradient, whether a membrane is involved and whether the cell must supply energy.",
      "sections":[
        {
          "title":"Concentration and net movement",
          "paragraphs":[
            "Concentration describes how much of a substance is present in a given space. A concentration gradient exists when one region has a higher concentration than another.",
            "Particles move randomly all the time. When more particles move in one direction than the other, there is a net movement. The direction of that net movement helps distinguish diffusion, osmosis and active transport."
          ]
        },
        {
          "title":"Diffusion",
          "paragraphs":[
            "Diffusion is the net movement of particles from a region of higher concentration to a region of lower concentration. The particles move down the concentration gradient and the cell does not supply energy for the process.",
            "A steeper concentration gradient increases the rate of diffusion because there is a larger difference in concentration between the two regions."
          ],
          "bullets":[
            "Oxygen diffuses from the alveoli into the blood when the oxygen concentration is higher in the alveoli.",
            "Carbon dioxide diffuses from respiring cells into the blood when its concentration is higher in the cells.",
            "Perfume, smoke, smog and fine volcanic ash spread from regions where their particles are more concentrated to regions where they are less concentrated."
          ]
        },
        {
          "title":"Osmosis",
          "paragraphs":[
            "Osmosis is the net movement of water molecules through a selectively permeable membrane from a region of higher water concentration to a region of lower water concentration.",
            "A selectively permeable membrane allows some particles to pass more easily than others. This property is important because cells must control what enters and leaves."
          ],
          "bullets":[
            "A plant cell in pure water takes in water and becomes turgid. The cell wall resists further expansion, so the cell does not burst.",
            "A plant cell in a concentrated solution loses water and becomes flaccid because the vacuole and cytoplasm lose water.",
            "An animal cell in distilled water may swell and burst because it has no cell wall to resist the pressure.",
            "Dried raisins swell in water because water enters the cells by osmosis."
          ]
        },
        {
          "title":"Active transport",
          "paragraphs":[
            "Active transport moves particles from a region of lower concentration to a region of higher concentration. This is against the concentration gradient and requires energy released by respiration.",
            "Carrier proteins in cell membranes help move the particles."
          ],
          "bullets":[
            "Root hair cells absorb mineral ions from the soil even when the concentration of those ions is lower in the soil than inside the cell.",
            "Cells lining the small intestine can absorb glucose even when the glucose concentration in the gut is lower than in the cells."
          ]
        },
        {
          "title":"How to identify the process",
          "bullets":[
            "Diffusion: particles move down a concentration gradient. No cellular energy is required.",
            "Osmosis: water moves through a selectively permeable membrane down its water concentration gradient.",
            "Active transport: particles move against a concentration gradient and the cell supplies energy."
          ]
        },
        {
          "title":"Practical focus",
          "paragraphs":[
            "CSEC questions often use an osmometer, potato strips or Visking tubing to test your understanding. Do not memorise the apparatus alone. Identify the variable changed, what was measured, what should be kept constant, the observation and the conclusion supported by the evidence.",
            "For potato-strip investigations, the concentration that produces little or no change in length is close to the concentration of the cell sap because there is no net movement of water."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t1-1-membrane-transport-model",
          "type":"membrane-transport",
          "title":"Movement of substances across cells"
        },
        {
          "id":"m1-t1-1-transport-investigations",
          "type":"transport-investigations",
          "title":"Investigating movement across membranes"
        }
      ],
      "keyPoints":[
        "Diffusion moves particles down a concentration gradient.",
        "Osmosis is the net movement of water through a selectively permeable membrane.",
        "Active transport moves particles against a concentration gradient and requires cellular energy.",
        "Plant and animal cells respond differently to water gain because plant cells have a cell wall.",
        "Practical questions require you to connect variables, observations and conclusions."
      ],
      "workedExample":{
        "title":"Explaining a potato-strip result",
        "prompt":"A potato strip becomes shorter after one hour in a concentrated sugar solution. Explain the change.",
        "steps":[
          "Identify the moving substance: water.",
          "Compare the concentrations: the external solution is more concentrated than the cell sap, so it has a lower water concentration.",
          "State the direction: water moves out of the potato cells through selectively permeable cell membranes.",
          "Name the process and effect: osmosis causes the cells to lose turgor, so the strip becomes shorter and softer."
        ],
        "answer":"Water leaves the potato cells by osmosis because the surrounding solution has a lower water concentration than the cell sap. The cells lose turgor, so the strip becomes shorter and softer."
      },
      "checks":[
        {
          "prompt":"Perfume is opened at the front of a classroom and is later smelled at the back. Which process explains the spread?",
          "answer":"Diffusion.",
          "explanation":"Perfume particles move from the region of higher concentration near the bottle to regions of lower concentration."
        },
        {
          "prompt":"Why can a root hair cell absorb mineral ions when their concentration is lower in the soil than inside the cell?",
          "answer":"The ions are absorbed by active transport.",
          "explanation":"The ions move against their concentration gradient, so the cell must supply energy."
        },
        {
          "prompt":"What happens to a red blood cell placed in distilled water, and why?",
          "answer":"It swells and may burst.",
          "explanation":"Water enters by osmosis. The cell has no cell wall to resist the increase in pressure."
        },
        {
          "prompt":"In a Visking-tubing investigation, iodine enters the tubing but starch remains inside. What does this show?",
          "answer":"The membrane is selectively permeable.",
          "explanation":"Smaller iodine molecules pass through more easily while the larger starch molecules do not."
        }
      ],
      "summary":"To analyse a transport problem, identify the substance, compare concentrations, decide whether a selectively permeable membrane is involved, state the direction of net movement and decide whether cellular energy is required."
    }'::jsonb,
    true
  ),
  updated_at = now()
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-1-diffusion-osmosis-active-transport';

update public.spark_subject_topics
set
  title = '1.1.2 Animal and Plant Cells',
  metadata = jsonb_set(metadata,'{syllabus,objective}','"1.1.2"'::jsonb,true),
  updated_at = now()
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-2-animal-and-plant-cells';

update public.spark_subject_activity_catalog
set metadata = jsonb_set(coalesce(metadata,'{}'::jsonb),'{syllabusObjective}','"1.1.2"'::jsonb,true),
    updated_at = now()
where subject_id = 'integrated-science'
  and activity_key in (
    'diagram:m1-t1-2-plant-cell',
    'diagram:m1-t1-2-animal-cell',
    'diagram:m1-t1-2-light-microscope'
  );

-- ============================================================================
-- SOURCE 6/120: supabase/migrations/20260921010500_integrated_science_objective_112_acceptance.sql
-- ============================================================================
-- ============================================================================
-- SPARK CSEC Integrated Science Objective 1.1.2 acceptance audit
-- Preserve the approved plant cell, animal cell and microscope interactives
-- while strengthening learner explanation, application and practical context.
-- ============================================================================

update public.spark_subject_topics
set
  title = '1.1.2 Animal and Plant Cells',
  description = 'Examine animal and plant cells, relate visible and microscopic structures to their functions, compare the two cell types and produce clear biological drawings.',
  metadata = jsonb_set(
    jsonb_set(metadata,'{syllabus,objective}','"1.1.2"'::jsonb,true),
    '{lesson}',
    coalesce(metadata #> '{lesson}','{}'::jsonb)
      || '{
        "objectives":[
          "Identify the main structures in unspecialised animal and plant cells.",
          "Relate the cell wall, cell membrane, nucleus, cytoplasm, ribosomes, mitochondria, vacuoles and chloroplasts to their functions.",
          "Compare typical animal and plant cells and explain why some specialised plant cells do not contain chloroplasts.",
          "Examine prepared plant and animal cells using a light microscope and make clear annotated biological drawings."
        ],
        "introduction":"Cells are the basic units of living organisms. Their structures are linked to the work they carry out. A useful cell diagram therefore shows more than names. It helps you connect each structure with its function and recognise why different cells do not always look identical.",
        "sections":[
          {
            "title":"Structures found in both plant and animal cells",
            "bullets":[
              "Cell membrane: controls movement of substances into and out of the cell.",
              "Cytoplasm: contains enzymes and is where many chemical reactions take place.",
              "Nucleus: contains genetic information and helps control cell activities.",
              "Ribosomes: sites of protein production.",
              "Mitochondria: sites where energy is released during aerobic respiration.",
              "Vacuoles: contain water and dissolved substances. Plant cells usually have a much larger permanent vacuole."
            ]
          },
          {
            "title":"Structures associated with plant cells",
            "bullets":[
              "Cell wall: made mainly of cellulose. It supports the cell and helps it keep a fixed shape.",
              "Chloroplasts: contain chlorophyll and absorb light for photosynthesis.",
              "Large permanent vacuole: contains cell sap and helps maintain turgor."
            ]
          },
          {
            "title":"Cell structure depends on function",
            "paragraphs":[
              "Not every plant cell contains chloroplasts. Root hair cells and cells from an onion bulb usually develop where little or no light reaches them, so chloroplasts would not help them carry out photosynthesis.",
              "Cells that require large amounts of energy often contain many mitochondria. Muscle cells are a useful example because contraction requires a continuous supply of energy from respiration."
            ]
          },
          {
            "title":"Using a light microscope",
            "paragraphs":[
              "Cells are too small to examine clearly with the unaided eye. A light microscope enlarges the image of a prepared specimen so that visible structures can be examined.",
              "Begin with the lower-power objective lens. Place the slide on the stage, centre the specimen over the light, use the coarse focus to obtain an image, then use the fine focus to sharpen it. Higher power should be used only after the specimen is clearly located."
            ],
            "bullets":[
              "Eyepiece lens: the lens closest to the eye.",
              "Objective lenses: provide different magnifications.",
              "Stage: supports the prepared slide.",
              "Coarse focus: makes larger focusing adjustments.",
              "Fine focus: sharpens the image using small adjustments.",
              "Light source: directs light through the specimen."
            ]
          },
          {
            "title":"Biological drawing",
            "paragraphs":[
              "Draw what is visible rather than every structure shown in a textbook diagram. A prepared onion epidermis, for example, may show cell walls, cytoplasm, a nucleus and a vacuole, but chloroplasts should not be added if they are not visible.",
              "Make the drawing large. Use clear single lines, do not shade, use ruled label lines that do not cross, and place labels outside the drawing. Include an appropriate title."
            ]
          },
          {
            "title":"Comparing plant and animal cells",
            "bullets":[
              "Both contain a cell membrane, cytoplasm, nucleus, ribosomes and mitochondria.",
              "Plant cells have a cellulose cell wall; animal cells do not.",
              "Photosynthetic plant cells contain chloroplasts; animal cells do not.",
              "Plant cells usually have a large permanent vacuole; animal-cell vacuoles are much smaller when present.",
              "The cell wall gives many plant cells a more regular fixed shape."
            ]
          }
        ],
        "keyPoints":[
          "Cell structure and cell function must be learned together.",
          "Plant and animal cells share several organelles, but plant cells also have a cell wall and may contain chloroplasts.",
          "Specialised cells do not always contain every structure shown in a typical textbook cell.",
          "A light microscope supports direct examination of prepared cells.",
          "Good biological drawings show only visible structures using clear lines and accurate labels."
        ],
        "workedExample":{
          "title":"Recognising a plant cell from a diagram",
          "prompt":"A cell diagram shows a cell wall, chloroplasts, a nucleus and a large vacuole. State two features which identify it as a plant cell.",
          "steps":[
            "Look for structures that animal cells do not have.",
            "A cell wall is a plant-cell feature.",
            "Chloroplasts are also plant-cell structures in photosynthetic tissue.",
            "A large permanent vacuole supports the identification but two correct distinguishing features are enough."
          ],
          "answer":"The cell wall and chloroplasts identify the cell as a plant cell. A large permanent vacuole is another acceptable feature."
        },
        "checks":[
          {
            "prompt":"Which structure is the site of protein production?",
            "answer":"Ribosomes.",
            "explanation":"Ribosomes assemble proteins needed by the cell."
          },
          {
            "prompt":"Why would a root hair cell usually lack chloroplasts?",
            "answer":"It develops underground where there is little or no light for photosynthesis.",
            "explanation":"Chloroplasts would not provide an advantage in tissue that does not receive enough light to photosynthesise."
          },
          {
            "prompt":"Why are many mitochondria found in active cells such as muscle cells?",
            "answer":"They need a large supply of energy from aerobic respiration.",
            "explanation":"Mitochondria are the main sites where energy is released during aerobic respiration."
          },
          {
            "prompt":"When examining a prepared slide, why should you begin with the lower-power objective lens?",
            "answer":"It gives a wider field of view and makes the specimen easier to locate and focus.",
            "explanation":"Once the specimen is centred and focused, a higher-power objective can be used for more detail."
          }
        ],
        "summary":"When you examine a cell, identify its visible structures, link each structure to its function, decide which features distinguish plant from animal cells and remember that specialised cells may not contain every organelle shown in a typical diagram."
      }'::jsonb,
    true
  ),
  updated_at = now()
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-2-animal-and-plant-cells';

-- ============================================================================
-- SOURCE 7/120: supabase/migrations/20260921011000_integrated_science_objective_121.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.2.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t2-1-asexual-sexual-reproduction',
  'module-1-organisms-life-processes',
  '1.2.1 Asexual and Sexual Reproduction',
  'Distinguish between asexual and sexual reproduction and relate each type to cell division, inheritance, variation and crop production.',
  30,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Plants",
      "objective":"1.2.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Distinguish between asexual and sexual reproduction.",
        "Relate asexual reproduction to mitosis and genetically identical offspring.",
        "Relate sexual reproduction to meiosis, gametes, fertilisation and genetic variation.",
        "Compare advantages and disadvantages of asexual and sexual reproduction in crop production."
      ],
      "introduction":"Reproduction produces new organisms, but the genetic result depends on how the new organism is formed. Asexual reproduction keeps the parent combination of genes almost unchanged, while sexual reproduction combines genetic material and produces variation.",
      "sections":[
        {
          "title":"Asexual reproduction",
          "paragraphs":[
            "Asexual reproduction involves one parent and no fusion of male and female gametes. Cell division by mitosis produces genetically identical cells, so the offspring are clones of the parent unless a mutation occurs."
          ],
          "bullets":[
            "One parent is required.",
            "No fertilisation occurs.",
            "Mitosis produces genetically identical cells.",
            "Offspring usually keep the same inherited qualities as the parent.",
            "Many offspring can be produced quickly."
          ]
        },
        {
          "title":"Asexual reproduction in crop production",
          "paragraphs":[
            "A farmer can reproduce a crop with useful qualities such as good fruit size, taste or yield and expect the offspring to keep those qualities. Pineapples grown from suckers are one example.",
            "Low genetic variation is also a risk. If a field contains genetically identical plants and the parent type is susceptible to a disease, the disease may affect the whole crop."
          ]
        },
        {
          "title":"Sexual reproduction",
          "paragraphs":[
            "Sexual reproduction involves the fusion of a male gamete and a female gamete during fertilisation. Gametes are produced by meiosis, which reduces the chromosome number. Fertilisation restores the full chromosome number in the zygote."
          ],
          "bullets":[
            "Gametes are produced by meiosis.",
            "Male and female gametes fuse during fertilisation.",
            "The fertilised cell is called a zygote.",
            "Offspring are genetically different from one another and from their parents."
          ]
        },
        {
          "title":"Why variation matters",
          "paragraphs":[
            "Variation means that individuals in a population are not genetically identical. If disease, climate or another environmental condition changes, some individuals may have characteristics that improve their chance of survival.",
            "Plant breeders use variation from sexual reproduction when selecting new varieties, including plants with improved resistance to disease."
          ]
        },
        {
          "title":"Comparing the two methods",
          "bullets":[
            "Asexual reproduction is usually faster and needs only one parent, but it produces little genetic variation.",
            "Sexual reproduction usually takes more time and energy and involves gametes, but it produces variation.",
            "Asexual reproduction is useful for keeping desired crop qualities unchanged.",
            "Sexual reproduction creates new combinations of genes from which useful traits can be selected."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t2-1-reproduction-comparison",
          "type":"reproduction-comparison",
          "title":"Asexual and sexual reproduction"
        }
      ],
      "keyPoints":[
        "Asexual reproduction involves one parent, no fusion of gametes and usually mitosis.",
        "Asexual offspring are genetically identical clones, so useful traits are retained but variation is low.",
        "Sexual reproduction involves gametes produced by meiosis and their fusion at fertilisation.",
        "Sexual reproduction produces variation, which supports adaptation and selective breeding."
      ],
      "workedExample":{
        "title":"Choosing a reproduction method",
        "prompt":"A farmer wants to reproduce a pineapple plant with excellent fruit quality. Explain why using suckers is useful, then state one risk.",
        "steps":[
          "Suckers reproduce the plant asexually.",
          "Mitosis produces offspring with the same inherited qualities as the parent plant.",
          "The excellent fruit quality is therefore retained.",
          "Because the plants are genetically alike, one disease may affect many or all of them."
        ],
        "answer":"Using suckers produces genetically identical plants with the desired fruit quality, but the lack of variation can make the crop vulnerable to the same disease."
      },
      "checks":[
        {
          "prompt":"Which type of cell division is linked with asexual reproduction?",
          "answer":"Mitosis.",
          "explanation":"Mitosis produces genetically identical cells and supports asexual reproduction."
        },
        {
          "prompt":"Which type of cell division produces gametes?",
          "answer":"Meiosis.",
          "explanation":"Meiosis reduces the chromosome number before fertilisation."
        },
        {
          "prompt":"Why can one disease destroy a field of genetically identical banana plants?",
          "answer":"The plants have little or no genetic variation in disease resistance.",
          "explanation":"If the clone used for the crop is susceptible, the same susceptibility is present throughout the field."
        },
        {
          "prompt":"Why can sexual reproduction help breeders develop a disease-resistant crop variety?",
          "answer":"It produces genetic variation.",
          "explanation":"Variation creates different combinations of traits from which resistant individuals can be selected."
        }
      ],
      "summary":"To distinguish the methods, ask how many parents are involved, whether gametes fuse, which cell division is involved and whether the offspring are genetically identical or show variation."
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
  || '{"topicsBuilt":3,"objectivesBuilt":3}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 8/120: supabase/migrations/20260921011500_integrated_science_objective_122.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.2.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t2-2-asexual-reproduction-plants',
  'module-1-organisms-life-processes',
  '1.2.2 Asexual Reproduction in Plants',
  'Examine natural and artificial methods of asexual reproduction in plants and relate each method to structure, crop examples and agricultural use.',
  40,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Plants",
      "objective":"1.2.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify natural methods of vegetative propagation and give suitable plant examples.",
        "Describe artificial methods such as cuttings, grafting, budding, layering and tissue culture.",
        "Explain how vegetative propagation produces genetically identical offspring.",
        "Relate propagation methods to crop production and survival through unfavourable conditions."
      ],
      "introduction":"Plants can reproduce asexually from stems, roots, leaves or small pieces of tissue. No gametes fuse, so the new plants are clones of the parent. Some methods occur naturally. Others are carried out by growers to multiply crops with useful qualities.",
      "sections":[
        {
          "title":"Natural vegetative propagation",
          "paragraphs":[
            "Natural vegetative propagation uses modified plant structures that store food, spread to new locations or survive unfavourable conditions. These structures contain buds that can grow into new shoots."
          ],
          "bullets":[
            "Bulb, onion: fleshy storage leaves surround a short stem. Buds develop into new shoots.",
            "Corm, dasheen or eddoe: a swollen solid underground stem stores food and produces new shoots from buds.",
            "Rhizome, ginger or canna lily: a horizontal underground stem grows through the soil and produces roots and shoots at nodes.",
            "Runner or stolon, strawberry and some grasses: a horizontal stem grows along the soil surface and forms new plants at nodes.",
            "Tuber, Irish potato: a swollen underground stem stores food. The eyes are buds that can grow into new shoots."
          ]
        },
        {
          "title":"Perennating organs",
          "paragraphs":[
            "Bulbs, corms, rhizomes and tubers are also perennating organs. Their stored food allows the plant to remain alive through an unfavourable period such as a dry season and then regrow when conditions improve."
          ]
        },
        {
          "title":"Stem cuttings",
          "paragraphs":[
            "A piece of stem containing at least one healthy bud is cut from the parent and planted in suitable conditions. New roots and shoots develop from the cutting.",
            "Sugar cane is commonly planted from pieces of stem called setts. Cuttings keep the inherited qualities of the parent plant."
          ]
        },
        {
          "title":"Grafting and budding",
          "paragraphs":[
            "Grafting joins a shoot called a scion from a desired variety to a rooted plant called the rootstock. The cut surfaces are fitted so that the cambium layers are in contact, then the join is tied and sealed until the tissues grow together.",
            "Budding is similar, but a single bud from the desired variety is inserted into the rootstock. Citrus plants are commonly propagated in this way."
          ],
          "bullets":[
            "The rootstock may provide strong roots or resistance to difficult soil conditions.",
            "The scion or bud provides the desired fruit quality."
          ]
        },
        {
          "title":"Layering",
          "paragraphs":[
            "In layering, a low branch remains attached to the parent while part of it is bent to the ground and covered with soil. Roots form on the buried section. Once rooted, the new plant is cut away from the parent."
          ]
        },
        {
          "title":"Tissue culture",
          "paragraphs":[
            "Tissue culture starts with a small piece of plant tissue grown under sterile conditions on a nutrient medium containing the substances needed for growth.",
            "The cells divide and form many small plantlets. The plantlets are genetically identical to the parent plant when produced from the same tissue."
          ],
          "bullets":[
            "Large numbers of plants can be produced quickly.",
            "Plantlets can be produced in a small space throughout the year.",
            "Careful sterile technique can provide disease-free planting material.",
            "Bananas are commonly multiplied by tissue culture."
          ]
        },
        {
          "title":"Why farmers use artificial propagation",
          "paragraphs":[
            "Artificial propagation helps growers multiply plants that already have useful characteristics. Because the offspring are clones, fruit quality, yield and other inherited characteristics can be retained.",
            "The same lack of variation is also a risk. A large genetically identical crop may be vulnerable if a new disease affects the parent variety."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t2-2-vegetative-propagation",
          "type":"vegetative-propagation",
          "title":"Natural and artificial vegetative propagation"
        }
      ],
      "keyPoints":[
        "Natural vegetative propagation includes bulbs, corms, rhizomes, runners and tubers.",
        "Bulbs, corms, rhizomes and tubers also store food and help plants survive unfavourable conditions.",
        "Artificial methods include cuttings, grafting, budding, layering and tissue culture.",
        "Vegetative propagation produces clones, so useful inherited qualities are retained.",
        "Tissue culture can produce large numbers of identical, disease-free plantlets when carried out under sterile conditions."
      ],
      "workedExample":{
        "title":"Describing grafting",
        "prompt":"A citrus grower wants strong roots and fruit from a high-quality variety. Describe how grafting can be used.",
        "steps":[
          "Choose a rooted plant to act as the rootstock.",
          "Cut a shoot called the scion from the variety with the desired fruit.",
          "Fit the cut surfaces together so that their cambium layers touch.",
          "Tie and seal the join until the tissues grow together."
        ],
        "answer":"A scion from the desired citrus variety is fitted to a suitable rootstock with the cambium layers in contact. The join is tied and sealed until the two parts grow together."
      },
      "checks":[
        {
          "prompt":"Which natural vegetative structure is used by onion?",
          "answer":"A bulb.",
          "explanation":"An onion bulb has fleshy storage leaves around a short stem."
        },
        {
          "prompt":"What is the natural propagation structure of ginger?",
          "answer":"A rhizome.",
          "explanation":"A rhizome is a horizontal underground stem that produces roots and shoots at nodes."
        },
        {
          "prompt":"Why is tissue culture useful for banana production?",
          "answer":"It can produce many identical plantlets quickly, including disease-free planting material when sterile technique is used.",
          "explanation":"A small amount of parent tissue can be multiplied repeatedly on a nutrient medium."
        },
        {
          "prompt":"What is the difference between the scion and the rootstock in grafting?",
          "answer":"The scion is the shoot from the desired variety, while the rootstock is the rooted plant onto which it is joined.",
          "explanation":"The scion provides the desired shoot and fruit characteristics, while the rootstock supplies the established root system."
        }
      ],
      "summary":"When identifying a propagation method, look at the plant structure or procedure, decide whether it is natural or artificial, name a matching crop example and explain why the method is useful to the plant or grower."
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
  || '{"topicsBuilt":4,"objectivesBuilt":4}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 9/120: supabase/migrations/20260921012000_integrated_science_objective_123.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.2.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t2-3-sexual-reproduction-plants',
  'module-1-organisms-life-processes',
  '1.2.3 Sexual Reproduction in Plants',
  'Examine flower structure, pollination, fertilisation, seed and fruit formation, seed structure and germination.',
  50,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Plants",
      "objective":"1.2.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify the main parts of a flower and relate each part to its function.",
        "Distinguish between self-pollination and cross-pollination and compare insect- and wind-pollinated flowers.",
        "Describe the sequence from pollination to fertilisation and the formation of seeds and fruits.",
        "Identify the main structures in a bean seed and state the conditions needed for germination."
      ],
      "introduction":"Sexual reproduction in flowering plants begins with the production and transfer of pollen and continues through fertilisation, seed formation and germination. Understanding the process requires you to connect the visible parts of a flower with the events taking place inside the ovary and ovule.",
      "sections":[
        {
          "title":"The reproductive parts of a flower",
          "bullets":[
            "Stamen: the male part of the flower. It consists of the anther and filament.",
            "Anther: produces pollen grains containing the male gametes.",
            "Filament: holds the anther in a position where pollen can be transferred.",
            "Carpel or pistil: the female part. It consists of the stigma, style and ovary.",
            "Stigma: receives pollen grains.",
            "Style: connects the stigma to the ovary and provides a route for the pollen tube.",
            "Ovary: contains one or more ovules and develops into the fruit after fertilisation.",
            "Ovule: contains the female gamete and develops into a seed after fertilisation.",
            "Petals: often attract animal pollinators.",
            "Sepals: protect the flower while it is in the bud stage.",
            "Receptacle: supports the flower parts."
          ]
        },
        {
          "title":"Pollination",
          "paragraphs":[
            "Pollination is the transfer of pollen from an anther to a stigma. Self-pollination occurs when pollen reaches a stigma on the same plant. Cross-pollination occurs when pollen is transferred to a flower on a different plant of the same species.",
            "Cross-pollination combines genetic material from different plants and therefore increases variation in the offspring."
          ]
        },
        {
          "title":"Insect and wind pollination",
          "bullets":[
            "Insect-pollinated flowers often have large or brightly coloured petals, scent and nectar. Their pollen is often sticky or spiky and produced in smaller quantities.",
            "Wind-pollinated flowers usually have small dull petals, exposed anthers and feathery stigmas. They produce large quantities of light, smooth pollen.",
            "A pollination feature is useful only if it improves the chance that pollen reaches a suitable stigma."
          ]
        },
        {
          "title":"From pollen grain to fertilisation",
          "paragraphs":[
            "A compatible pollen grain germinates on the stigma and grows a pollen tube down through the style. The male nucleus travels through the pollen tube towards an ovule.",
            "The pollen tube enters the ovule through the micropyle. The male nucleus then fuses with the female nucleus. This fusion is fertilisation and the fertilised cell is called a zygote."
          ]
        },
        {
          "title":"Seed and fruit formation",
          "paragraphs":[
            "After fertilisation, the ovule develops into a seed and the ovary develops into a fruit. The seed protects the young plant embryo and contains a food supply for early growth.",
            "A bean seed contains a testa, cotyledons, a plumule and a radicle. The testa protects the seed. Cotyledons store food. The plumule develops into the shoot and the radicle develops into the root."
          ]
        },
        {
          "title":"Germination",
          "paragraphs":[
            "Germination begins when a seed resumes growth. The main conditions required are water, oxygen and a suitable temperature.",
            "Water activates the seed and helps enzymes and stored food move through the tissues. Oxygen is required for aerobic respiration, which releases energy for growth. A suitable temperature allows enzymes to work effectively."
          ],
          "bullets":[
            "The radicle normally emerges first and grows downwards to form the root system.",
            "The plumule then develops into the shoot.",
            "Waterlogged soil can reduce germination because soil air spaces fill with water and the seed receives too little oxygen."
          ]
        },
        {
          "title":"Biological drawing and magnification",
          "paragraphs":[
            "A flower or seed drawing should be large, use clear single lines, contain no shading and include only structures that are visible. Ruled label lines should not cross.",
            "Magnification is calculated as drawing size divided by actual size. Use the same units for both measurements and include the multiplication sign in the final answer."
          ]
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m1-t2-3-flower",
          "title":"Label a longitudinal section of a flower",
          "template":"flower-longitudinal",
          "mode":"drag-drop-label",
          "instructions":"Desktop: drag each label to its target. Phone or tablet: tap a label, then tap the numbered target.",
          "labels":[
            {"id":"petal","text":"Petal","hint":"Look for the large coloured structure.","explanation":"Petals often attract animal pollinators."},
            {"id":"sepal","text":"Sepal","hint":"Look at the green leaf-like structure beneath the petals.","explanation":"Sepals protect the flower while it is a bud."},
            {"id":"anther","text":"Anther","hint":"Find the pollen-producing structure at the tip of a stamen.","explanation":"Anthers produce pollen grains."},
            {"id":"filament","text":"Filament","hint":"Find the stalk supporting an anther.","explanation":"The filament supports the anther."},
            {"id":"stigma","text":"Stigma","hint":"Find the receptive surface at the top of the carpel.","explanation":"The stigma receives pollen grains."},
            {"id":"style","text":"Style","hint":"Find the narrow structure between stigma and ovary.","explanation":"The pollen tube grows down through the style."},
            {"id":"ovary","text":"Ovary","hint":"Find the swollen base of the carpel.","explanation":"The ovary contains ovules and develops into the fruit."},
            {"id":"ovule","text":"Ovule","hint":"Find one of the small structures inside the ovary.","explanation":"An ovule contains the female gamete and develops into a seed after fertilisation."},
            {"id":"receptacle","text":"Receptacle","hint":"Look at the base supporting the flower parts.","explanation":"The receptacle supports the parts of the flower."}
          ],
          "targets":[
            {"id":"flower-petal","labelId":"petal","boxX":20,"boxY":45,"anchorX":340,"anchorY":180,"side":"left"},
            {"id":"flower-sepal","labelId":"sepal","boxX":20,"boxY":135,"anchorX":350,"anchorY":315,"side":"left"},
            {"id":"flower-anther","labelId":"anther","boxX":20,"boxY":225,"anchorX":398,"anchorY":175,"side":"left"},
            {"id":"flower-filament","labelId":"filament","boxX":20,"boxY":315,"anchorX":415,"anchorY":250,"side":"left"},
            {"id":"flower-receptacle","labelId":"receptacle","boxX":20,"boxY":405,"anchorX":455,"anchorY":430,"side":"left"},
            {"id":"flower-stigma","labelId":"stigma","boxX":790,"boxY":55,"anchorX":500,"anchorY":125,"side":"right"},
            {"id":"flower-style","labelId":"style","boxX":790,"boxY":155,"anchorX":500,"anchorY":220,"side":"right"},
            {"id":"flower-ovary","labelId":"ovary","boxX":790,"boxY":275,"anchorX":555,"anchorY":360,"side":"right"},
            {"id":"flower-ovule","labelId":"ovule","boxX":790,"boxY":395,"anchorX":535,"anchorY":350,"side":"right"}
          ]
        },
        {
          "id":"m1-t2-3-bean-seed",
          "title":"Label an opened bean seed",
          "template":"bean-seed",
          "mode":"drag-drop-label",
          "instructions":"Place the four labels on the correct parts of the bean seed.",
          "labels":[
            {"id":"testa","text":"Testa","hint":"Look for the outer seed coat.","explanation":"The testa protects the seed."},
            {"id":"cotyledon","text":"Cotyledon","hint":"Look for the large food-storage seed leaf.","explanation":"The cotyledons store food for the embryo."},
            {"id":"plumule","text":"Plumule","hint":"Find the small embryonic shoot.","explanation":"The plumule develops into the shoot."},
            {"id":"radicle","text":"Radicle","hint":"Find the embryonic root.","explanation":"The radicle develops into the root and normally emerges first during germination."}
          ],
          "targets":[
            {"id":"seed-testa","labelId":"testa","boxX":30,"boxY":95,"anchorX":290,"anchorY":310,"side":"left"},
            {"id":"seed-cotyledon","labelId":"cotyledon","boxX":30,"boxY":315,"anchorX":400,"anchorY":315,"side":"left"},
            {"id":"seed-plumule","labelId":"plumule","boxX":780,"boxY":105,"anchorX":470,"anchorY":205,"side":"right"},
            {"id":"seed-radicle","labelId":"radicle","boxX":780,"boxY":330,"anchorX":490,"anchorY":415,"side":"right"}
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t2-3-flower-reproduction-process",
          "type":"flower-reproduction-process",
          "title":"From pollination to seed and fruit"
        }
      ],
      "keyPoints":[
        "The stamen is the male part and the carpel is the female part of a flower.",
        "Pollination transfers pollen from anther to stigma. Fertilisation is the fusion of male and female nuclei.",
        "Cross-pollination increases genetic variation.",
        "After fertilisation, the ovule develops into a seed and the ovary develops into a fruit.",
        "Bean seed structures include the testa, cotyledons, plumule and radicle.",
        "Water, oxygen and a suitable temperature are needed for germination."
      ],
      "workedExample":{
        "title":"Explaining fertilisation in a flower",
        "prompt":"Describe what happens from the time a pollen grain lands on a stigma until fertilisation occurs.",
        "steps":[
          "A compatible pollen grain germinates on the stigma.",
          "A pollen tube grows down through the style.",
          "The pollen tube enters an ovule through the micropyle.",
          "The male nucleus travels down the tube and fuses with the female nucleus to form a zygote."
        ],
        "answer":"The pollen grain grows a pollen tube through the style to an ovule. The male nucleus travels down the tube and fuses with the female nucleus in the ovule, forming a zygote."
      },
      "checks":[
        {
          "prompt":"Which flower structure produces pollen grains?",
          "answer":"The anther.",
          "explanation":"The anther is part of the stamen and produces pollen."
        },
        {
          "prompt":"What is the difference between pollination and fertilisation?",
          "answer":"Pollination is the transfer of pollen to a stigma. Fertilisation is the fusion of male and female nuclei.",
          "explanation":"Pollination must normally occur before a pollen tube grows and fertilisation takes place."
        },
        {
          "prompt":"What do the ovule and ovary become after fertilisation?",
          "answer":"The ovule becomes a seed and the ovary becomes a fruit.",
          "explanation":"These changes protect and help disperse the developing embryo."
        },
        {
          "prompt":"State the three main conditions required for germination.",
          "answer":"Water, oxygen and a suitable temperature.",
          "explanation":"Water activates the seed, oxygen supports aerobic respiration and suitable temperature supports enzyme activity."
        }
      ],
      "summary":"Follow the sequence in order: pollen is produced in the anther, pollination transfers it to the stigma, a pollen tube grows through the style, fertilisation occurs inside an ovule, the ovule becomes a seed and the ovary becomes a fruit."
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
values
(
  'integrated-science',
  'diagram:m1-t2-3-flower',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t2-3-sexual-reproduction-plants',
  'Label a longitudinal section of a flower',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t2-3-sexual-reproduction-plants',
  0.35,
  true,
  '{"syllabusObjective":"1.2.3","mode":"drag-drop-label"}'::jsonb
),
(
  'integrated-science',
  'diagram:m1-t2-3-bean-seed',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t2-3-sexual-reproduction-plants',
  'Label an opened bean seed',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t2-3-sexual-reproduction-plants',
  0.35,
  true,
  '{"syllabusObjective":"1.2.3","mode":"drag-drop-label"}'::jsonb
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
  || '{"topicsBuilt":5,"objectivesBuilt":5}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 10/120: supabase/migrations/20260921012500_integrated_science_objective_124.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.2.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t2-4-growth-patterns-plants',
  'module-1-organisms-life-processes',
  '1.2.4 Growth Patterns in Plants',
  'Analyse seed germination, seedling growth and changes in plant mass using experiments, tables and graphs.',
  60,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Plants",
      "objective":"1.2.4",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain the conditions needed for seed germination.",
        "Interpret tables and graphs showing changes in plant height and dry mass.",
        "Relate early seedling growth to the use of stored food and later growth to photosynthesis.",
        "Plan a simple investigation into the effect of one environmental factor on germination."
      ],
      "introduction":"Plant growth is measured as a permanent increase in size or dry mass. During germination and early seedling growth, the pattern changes as stored food is used, roots and shoots emerge and the first leaves begin to photosynthesise.",
      "sections":[
        {
          "title":"Conditions for germination",
          "paragraphs":[
            "Most seeds require water, oxygen and a suitable temperature. Light is not a general requirement because the embryo initially uses stored food."
          ],
          "bullets":[
            "Water softens the testa, rehydrates tissues and activates enzymes that break down stored food.",
            "Oxygen is needed for aerobic respiration, which releases energy for growth.",
            "A suitable temperature allows enzymes to work effectively. Temperatures that are too low slow enzyme activity, while excessive heat may damage enzymes."
          ]
        },
        {
          "title":"The first stages of growth",
          "paragraphs":[
            "The radicle normally emerges first and develops into the root. The plumule develops into the shoot. Before the first leaves are able to photosynthesise, the embryo depends on food stored in the cotyledons.",
            "Respiration uses some of this stored material, so the dry mass of the seedling may fall during the early days of germination."
          ]
        },
        {
          "title":"When dry mass begins to rise",
          "paragraphs":[
            "Once the first green leaves expand, photosynthesis begins to make new organic material. When the rate of photosynthesis produces material faster than respiration uses it, the dry mass starts to increase."
          ]
        },
        {
          "title":"Reading a growth curve",
          "paragraphs":[
            "A growth graph should be described from the evidence. State where growth is slow, where it becomes rapid and where it slows or levels off. Quote time intervals or values when they are available.",
            "If a graph shows a steady trend, interpolation estimates a value between measured points and extrapolation estimates a value beyond the measured range. Extrapolation is less reliable because the pattern may change."
          ]
        },
        {
          "title":"Annual plant growth",
          "paragraphs":[
            "An annual plant completes its life cycle in one growing season. It germinates, grows, flowers, forms seeds and dies within that period. Maize and beans are common examples."
          ]
        },
        {
          "title":"Planning a germination investigation",
          "paragraphs":[
            "To investigate temperature, place equal numbers of similar seeds on equal amounts of moist material and keep the dishes at different temperatures. Keep water, seed type, number of seeds and observation time constant.",
            "The manipulated variable is temperature. A suitable responding variable is the number or percentage of seeds germinated after a fixed time, or the time taken to germinate."
          ],
          "bullets":[
            "Use enough seeds in each group to reduce the effect of individual differences.",
            "Keep the cotton wool moist with equal volumes of water.",
            "Record results at the same time each day.",
            "Define germination clearly, for example when the radicle first appears."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t2-4-growth-investigation",
          "type":"plant-growth-investigation",
          "title":"Germination and growth patterns"
        }
      ],
      "keyPoints":[
        "Water, oxygen and a suitable temperature are the main requirements for germination.",
        "The radicle forms the first root and the plumule develops into the shoot.",
        "Dry mass may fall at first because stored food is used in respiration.",
        "Dry mass rises after photosynthesis begins to produce new organic material.",
        "Growth graphs should be described using the pattern and the data.",
        "A fair germination investigation changes one factor and keeps other important conditions constant."
      ],
      "workedExample":{
        "title":"Explaining a fall in seedling dry mass",
        "prompt":"The dry mass of a germinating seedling falls for the first six days, then begins to increase. Explain the pattern.",
        "steps":[
          "Before the first leaves photosynthesise, the embryo uses stored food.",
          "Stored organic food is broken down during respiration to release energy for growth.",
          "This reduces dry mass during the early days.",
          "When leaves begin photosynthesis, new organic material is produced and dry mass starts to rise."
        ],
        "answer":"Dry mass falls because stored food is being used in respiration before the leaves photosynthesise. It rises later when photosynthesis produces new organic material faster than respiration uses it."
      },
      "checks":[
        {
          "prompt":"State the three main conditions required for germination.",
          "answer":"Water, oxygen and a suitable temperature.",
          "explanation":"These conditions support enzyme activity and aerobic respiration during early growth."
        },
        {
          "prompt":"Why is light not usually required for a seed to begin germinating?",
          "answer":"The embryo initially uses stored food rather than photosynthesis.",
          "explanation":"Light becomes important after green leaves develop and photosynthesis begins."
        },
        {
          "prompt":"Why can dry mass decrease during the first days of germination?",
          "answer":"Stored food is broken down in respiration.",
          "explanation":"Respiration releases energy for growth but uses organic material, reducing dry mass."
        },
        {
          "prompt":"In an investigation of temperature and germination, identify the manipulated variable and one responding variable.",
          "answer":"Manipulated variable: temperature. Responding variable: number or percentage of seeds germinated, or time taken to germinate.",
          "explanation":"The investigation deliberately changes temperature and measures a germination outcome."
        }
      ],
      "summary":"Analyse plant growth by linking germination conditions to enzyme activity and respiration, early dry-mass loss to stored-food use, later mass gain to photosynthesis and graph shape to changing growth rate."
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
  || '{"topicsBuilt":6,"objectivesBuilt":6}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 11/120: supabase/migrations/20260921013000_integrated_science_objective_125.sql
-- ============================================================================
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

-- ============================================================================
-- SOURCE 12/120: supabase/migrations/20260921013500_integrated_science_objective_126.sql
-- ============================================================================
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

-- ============================================================================
-- SOURCE 13/120: supabase/migrations/20260921014000_integrated_science_objective_127.sql
-- ============================================================================
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

-- ============================================================================
-- SOURCE 14/120: supabase/migrations/20260921014500_integrated_science_objective_131.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.3.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-1-asexual-reproduction-animals',
  'module-1-organisms-life-processes',
  '1.3.1 Asexual Reproduction in Animals',
  'Outline binary fission, budding, fragmentation and parthenogenesis and compare the speed and genetic consequences of asexual reproduction.',
  100,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "State the main features of asexual reproduction.",
        "Outline binary fission, budding, fragmentation and parthenogenesis using suitable examples.",
        "Distinguish the four methods from one another by how the new individual forms.",
        "Explain one advantage and one disadvantage of asexual reproduction."
      ],
      "introduction":"Asexual reproduction produces new individuals without the fusion of male and female gametes. Only one parent is required. Because the genetic material comes from one parent, the offspring are usually genetically very similar to the parent and to one another.",
      "sections":[
        {
          "title":"Binary fission",
          "paragraphs":[
            "In binary fission, one parent cell copies its genetic material and divides into two daughter cells. Amoeba and Paramecium are common syllabus examples of organisms that reproduce this way.",
            "Amoeba and Paramecium are unicellular protists rather than animals, but the process is useful for understanding how a single cell can reproduce asexually. Many bacteria also reproduce by binary fission."
          ]
        },
        {
          "title":"Budding",
          "paragraphs":[
            "In budding, a small outgrowth develops on the parent. The bud grows by cell division and may later separate to live as an independent individual.",
            "Hydra is a common animal example. Budding also occurs in yeast, which is a fungus."
          ]
        },
        {
          "title":"Fragmentation and regeneration",
          "paragraphs":[
            "Fragmentation occurs when part of a parent organism separates and the fragment develops into a new individual by regenerating missing structures.",
            "Planarian flatworms can reproduce from suitable fragments. Some echinoderms can also regenerate from fragments when the fragment contains the tissues needed to form a complete new individual."
          ]
        },
        {
          "title":"Parthenogenesis",
          "paragraphs":[
            "Parthenogenesis is the development of a new individual from an unfertilised egg. Fertilisation does not occur.",
            "Examples include some aphids and male honeybees. In honeybees, drone males develop from unfertilised eggs."
          ]
        },
        {
          "title":"Advantages and disadvantages",
          "paragraphs":[
            "Asexual reproduction can be rapid because a mate is not required. A successful organism can produce many offspring with the same useful features.",
            "The main disadvantage is low genetic variation. If the environment changes or a new disease affects the parent type, many genetically similar offspring may be affected in the same way."
          ]
        },
        {
          "title":"How to identify the method",
          "bullets":[
            "A single cell splitting into two suggests binary fission.",
            "A small outgrowth growing from the parent suggests budding.",
            "A body piece developing into a complete individual suggests fragmentation with regeneration.",
            "An unfertilised egg developing into an individual indicates parthenogenesis."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-1-animal-asexual-reproduction",
          "type":"animal-asexual-reproduction",
          "title":"Methods of asexual reproduction"
        }
      ],
      "keyPoints":[
        "Asexual reproduction requires one parent and no fusion of gametes.",
        "Binary fission produces two daughter cells from one parent cell.",
        "Budding produces a new individual as an outgrowth from the parent.",
        "Fragmentation produces new individuals from suitable pieces of a parent organism.",
        "Parthenogenesis is development from an unfertilised egg.",
        "Asexual reproduction is efficient but usually produces little genetic variation."
      ],
      "workedExample":{
        "title":"Identifying an asexual method",
        "prompt":"A small outgrowth develops on the body of a Hydra. It grows, develops tentacles and later separates from the parent. Name the method and explain your answer.",
        "steps":[
          "Look for the feature that identifies the method.",
          "The new individual begins as an outgrowth attached to the parent.",
          "An attached outgrowth is characteristic of budding."
        ],
        "answer":"The method is budding because the new Hydra develops as an outgrowth on the parent before separating."
      },
      "checks":[
        {
          "prompt":"What is binary fission?",
          "answer":"One parent cell divides to form two daughter cells.",
          "explanation":"The genetic material is copied before the cell divides."
        },
        {
          "prompt":"How does fragmentation differ from budding?",
          "answer":"In fragmentation, a separated piece of the parent regenerates into a new individual. In budding, a new outgrowth develops on the parent.",
          "explanation":"The starting structure of the new individual is different in the two methods."
        },
        {
          "prompt":"What is parthenogenesis?",
          "answer":"The development of an individual from an unfertilised egg.",
          "explanation":"No fusion of male and female gametes occurs."
        },
        {
          "prompt":"Why can low genetic variation be a disadvantage?",
          "answer":"A disease or environmental change that affects one genetic type may affect many of the genetically similar offspring.",
          "explanation":"Variation increases the chance that some individuals will survive a new challenge."
        }
      ],
      "summary":"Identify the method by the way the offspring begins. Splitting gives binary fission, an attached outgrowth gives budding, a separated piece that regrows gives fragmentation, and development from an unfertilised egg gives parthenogenesis."
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
  || '{"topicsBuilt":10,"objectivesBuilt":10}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 15/120: supabase/migrations/20260921015000_integrated_science_objective_132.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.3.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-2-human-reproductive-organs',
  'module-1-organisms-life-processes',
  '1.3.2 Human Reproductive Organs',
  'Describe the main structures of the male and female reproductive systems and relate each organ to sperm production, ovum production, fertilisation and development.',
  110,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify the main organs of the male and female reproductive systems.",
        "Relate each reproductive organ to its function.",
        "Trace the pathway taken by sperm from the testes to the outside of the body.",
        "Trace the pathway of an ovum from the ovary to the uterus and identify the usual site of fertilisation.",
        "Explain why the testes are held in the scrotum outside the main body cavity."
      ],
      "introduction":"The human reproductive system contains specialised organs that produce gametes, transport them and support fertilisation and development. Learn each structure together with its function and pathway. This makes labelled diagrams and application questions easier to solve.",
      "sections":[
        {
          "title":"Male reproductive organs",
          "paragraphs":[
            "The testes produce sperm and the hormone testosterone. They lie in the scrotum outside the main body cavity. Sperm production works best at a temperature slightly below core body temperature.",
            "Sperm mature and are stored in the epididymis. During ejaculation they move through the sperm duct, also called the vas deferens, towards the urethra."
          ],
          "bullets":[
            "Seminal vesicles add fluid containing nutrients that support sperm.",
            "The prostate gland adds fluid to semen and helps create a suitable environment for sperm.",
            "Cowper''s glands add a small amount of lubricating and alkaline fluid to the urethra.",
            "The urethra carries semen through the penis to the outside of the body. In males it also carries urine, but urine and semen do not normally pass through at the same time.",
            "The penis deposits semen in the female reproductive tract during sexual intercourse."
          ]
        },
        {
          "title":"The sperm pathway",
          "paragraphs":[
            "A useful sequence is: testes to epididymis to sperm duct to urethra to penis. Fluids from the seminal vesicles, prostate gland and Cowper''s glands are added along the route to form semen.",
            "The testes make sperm, while the epididymis stores and matures them. Do not confuse either structure with the sperm duct, whose main role is transport."
          ]
        },
        {
          "title":"Female reproductive organs",
          "paragraphs":[
            "The ovaries produce ova and hormones including oestrogen and progesterone. Usually one ovum is released during ovulation and enters an oviduct, also called a Fallopian tube.",
            "The oviduct carries the ovum towards the uterus and is the usual site of fertilisation. If both oviducts are blocked, sperm cannot normally reach the ovum."
          ],
          "bullets":[
            "The uterus is a muscular organ where an embryo implants and the foetus develops.",
            "The endometrium is the inner lining of the uterus. It thickens during the menstrual cycle and supports implantation if pregnancy occurs.",
            "The cervix is the narrow muscular neck of the uterus. It opens into the vagina and dilates during childbirth.",
            "The vagina is a muscular canal that receives the penis and semen and forms part of the birth canal."
          ]
        },
        {
          "title":"The ovum pathway",
          "paragraphs":[
            "A useful sequence is: ovary to oviduct to uterus. Fertilisation usually occurs in the oviduct. The early embryo then moves to the uterus, where implantation normally occurs in the endometrium.",
            "The ovary is not the usual site of fertilisation, and the vagina is not the normal site of implantation."
          ]
        },
        {
          "title":"Structure and function together",
          "paragraphs":[
            "CSEC questions often give a function and ask for the organ, or give an organ and ask for the function. Study both directions. For example, sperm production identifies the testes, sperm storage identifies the epididymis, and normal fertilisation identifies the oviduct.",
            "When a question refers to the organ that widens during birth, the answer is the cervix. When it refers to the organ in which the foetus develops, the answer is the uterus."
          ]
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m1-t3-2-female-reproductive-system",
          "template":"female-reproductive-system",
          "title":"Label the female reproductive system",
          "instructions":"Drag each label to the correct structure. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"ovary","text":"Ovary","hint":"Look for the oval organ near the end of the oviduct.","explanation":"The ovaries produce ova and reproductive hormones including oestrogen and progesterone."},
            {"id":"oviduct","text":"Oviduct","hint":"This tube connects the region of the ovary to the uterus.","explanation":"The oviduct carries the ovum towards the uterus and is the usual site of fertilisation."},
            {"id":"uterus","text":"Uterus","hint":"Look for the central muscular organ.","explanation":"The uterus is where the embryo implants and the foetus develops."},
            {"id":"endometrium","text":"Endometrium","hint":"Look for the inner lining of the uterus.","explanation":"The endometrium thickens during the menstrual cycle and supports implantation."},
            {"id":"cervix","text":"Cervix","hint":"This is the narrow neck at the lower end of the uterus.","explanation":"The cervix connects the uterus to the vagina and dilates during childbirth."},
            {"id":"vagina","text":"Vagina","hint":"Look for the canal below the cervix.","explanation":"The vagina receives semen and forms part of the birth canal."}
          ],
          "targets":[
            {"id":"female-ovary-target","labelId":"ovary","boxX":20,"boxY":75,"anchorX":235,"anchorY":225,"side":"left"},
            {"id":"female-oviduct-target","labelId":"oviduct","boxX":20,"boxY":155,"anchorX":345,"anchorY":190,"side":"left"},
            {"id":"female-uterus-target","labelId":"uterus","boxX":20,"boxY":235,"anchorX":455,"anchorY":310,"side":"left"},
            {"id":"female-endometrium-target","labelId":"endometrium","boxX":790,"boxY":75,"anchorX":515,"anchorY":300,"side":"right"},
            {"id":"female-cervix-target","labelId":"cervix","boxX":790,"boxY":155,"anchorX":500,"anchorY":435,"side":"right"},
            {"id":"female-vagina-target","labelId":"vagina","boxX":790,"boxY":235,"anchorX":500,"anchorY":520,"side":"right"}
          ]
        },
        {
          "id":"m1-t3-2-male-reproductive-system",
          "template":"male-reproductive-system",
          "title":"Label the male reproductive system",
          "instructions":"Place each label on the correct structure. Use the numbered targets on portrait phone and tablet layouts.",
          "labels":[
            {"id":"testis","text":"Testis","hint":"Look inside the scrotum for the oval organ.","explanation":"The testes produce sperm and testosterone."},
            {"id":"scrotum","text":"Scrotum","hint":"This sac surrounds the testes outside the main body cavity.","explanation":"The scrotum holds the testes at a temperature slightly below core body temperature, which supports sperm production."},
            {"id":"epididymis","text":"Epididymis","hint":"Look for the coiled structure beside the testis.","explanation":"Sperm mature and are stored in the epididymis."},
            {"id":"sperm-duct","text":"Sperm duct","hint":"Trace the tube leaving the epididymis and travelling upward.","explanation":"The sperm duct, or vas deferens, carries sperm from the epididymis towards the urethra."},
            {"id":"seminal-vesicle","text":"Seminal vesicle","hint":"Look for the gland behind the bladder region.","explanation":"The seminal vesicles add nutrient-containing fluid to sperm."},
            {"id":"prostate","text":"Prostate gland","hint":"Look for the gland just below the bladder.","explanation":"The prostate gland adds fluid to semen and helps provide a suitable environment for sperm."},
            {"id":"cowper","text":"Cowper''s gland","hint":"Look for the small gland below the prostate.","explanation":"Cowper''s glands add lubricating and alkaline fluid to the urethra."},
            {"id":"urethra","text":"Urethra","hint":"Trace the tube passing through the penis.","explanation":"The male urethra carries semen and urine to the outside of the body at different times."},
            {"id":"penis","text":"Penis","hint":"Look for the external organ containing the urethra.","explanation":"The penis deposits semen in the female reproductive tract during sexual intercourse."}
          ],
          "targets":[
            {"id":"male-testis-target","labelId":"testis","boxX":20,"boxY":40,"anchorX":405,"anchorY":458,"side":"left"},
            {"id":"male-scrotum-target","labelId":"scrotum","boxX":20,"boxY":110,"anchorX":340,"anchorY":475,"side":"left"},
            {"id":"male-epididymis-target","labelId":"epididymis","boxX":20,"boxY":180,"anchorX":360,"anchorY":455,"side":"left"},
            {"id":"male-sperm-duct-target","labelId":"sperm-duct","boxX":20,"boxY":250,"anchorX":370,"anchorY":300,"side":"left"},
            {"id":"male-seminal-vesicle-target","labelId":"seminal-vesicle","boxX":790,"boxY":40,"anchorX":600,"anchorY":190,"side":"right"},
            {"id":"male-prostate-target","labelId":"prostate","boxX":790,"boxY":110,"anchorX":505,"anchorY":250,"side":"right"},
            {"id":"male-cowper-target","labelId":"cowper","boxX":790,"boxY":180,"anchorX":530,"anchorY":302,"side":"right"},
            {"id":"male-urethra-target","labelId":"urethra","boxX":790,"boxY":250,"anchorX":665,"anchorY":350,"side":"right"},
            {"id":"male-penis-target","labelId":"penis","boxX":790,"boxY":320,"anchorX":775,"anchorY":370,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "Testes produce sperm and testosterone; the epididymis stores and matures sperm.",
        "The sperm duct transports sperm to the urethra.",
        "Seminal vesicles, the prostate gland and Cowper''s glands add fluids that contribute to semen.",
        "The ovaries produce ova and reproductive hormones.",
        "Fertilisation normally occurs in an oviduct.",
        "The uterus supports development, the endometrium supports implantation, and the cervix forms the muscular neck of the uterus.",
        "The vagina receives semen and forms part of the birth canal."
      ],
      "workedExample":{
        "title":"Explaining blocked oviducts",
        "prompt":"A woman produces ova normally, but both oviducts are blocked. Explain why natural fertilisation is unlikely to occur.",
        "steps":[
          "An ovum released from an ovary normally enters an oviduct.",
          "Sperm must travel through the female reproductive tract to reach the ovum.",
          "The oviduct is the usual site where sperm and ovum meet.",
          "A blockage prevents the two gametes from meeting normally."
        ],
        "answer":"Natural fertilisation is unlikely because the blocked oviducts prevent sperm from reaching the ovum at the usual site of fertilisation."
      },
      "checks":[
        {
          "prompt":"Trace the pathway taken by sperm from where they are produced to the outside of the body.",
          "answer":"Testis to epididymis to sperm duct to urethra to penis.",
          "explanation":"The testes make sperm, the epididymis stores and matures them, and the ducts transport them."
        },
        {
          "prompt":"Why are the testes located in the scrotum outside the main body cavity?",
          "answer":"Sperm production requires a temperature slightly lower than core body temperature.",
          "explanation":"The scrotum helps keep the testes cooler than the abdominal cavity."
        },
        {
          "prompt":"Where does fertilisation normally occur, and where does the foetus develop?",
          "answer":"Fertilisation normally occurs in an oviduct, and the foetus develops in the uterus.",
          "explanation":"These structures have different roles in the reproductive pathway."
        },
        {
          "prompt":"Which structure dilates during childbirth?",
          "answer":"The cervix.",
          "explanation":"The cervix is the muscular neck of the uterus and widens during labour."
        }
      ],
      "summary":"Learn the reproductive systems as pathways rather than isolated names. Follow sperm from the testes outward and follow an ovum from the ovary through the oviduct to the uterus, linking every structure to its role."
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
values
(
  'integrated-science',
  'diagram:m1-t3-2-female-reproductive-system',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t3-2-human-reproductive-organs',
  'Label the female reproductive system',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t3-2-human-reproductive-organs',
  0.35,
  true,
  '{"syllabusObjective":"1.3.2","mode":"drag-drop-label"}'::jsonb
),
(
  'integrated-science',
  'diagram:m1-t3-2-male-reproductive-system',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t3-2-human-reproductive-organs',
  'Label the male reproductive system',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t3-2-human-reproductive-organs',
  0.35,
  true,
  '{"syllabusObjective":"1.3.2","mode":"drag-drop-label"}'::jsonb
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
  || '{"topicsBuilt":11,"objectivesBuilt":11}'::jsonb,
updated_at=now()
where id='integrated-science';
