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

-- ============================================================================
-- SOURCE 16/120: supabase/migrations/20260921015500_integrated_science_objective_133.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.3.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-3-menstrual-cycle',
  'module-1-organisms-life-processes',
  '1.3.3 The Menstrual Cycle',
  'Analyse changes in the uterine lining, ovulation, oestrogen and progesterone during a typical menstrual cycle and relate hormone changes to menstruation.',
  120,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define menstruation and ovulation.",
        "Describe changes in the uterine lining during a typical menstrual cycle.",
        "Relate oestrogen to rebuilding of the uterine lining.",
        "Relate progesterone to maintenance of the uterine lining after ovulation.",
        "Explain why a fall in progesterone is associated with the start of menstruation when pregnancy does not occur.",
        "Estimate the likely time of ovulation in a regular cycle using the approximate interval before the next period."
      ],
      "introduction":"The menstrual cycle is a repeating sequence of changes in the ovaries and uterus. A 28-day cycle is often used as a teaching example, but real cycles differ in length and timing. The important skill is to understand the pattern and the relationship among ovulation, the uterine lining and hormone levels.",
      "sections":[
        {
          "title":"Menstruation",
          "paragraphs":[
            "Day 1 is the first day of menstrual bleeding. During menstruation, the thickened lining of the uterus breaks down and is shed with blood and tissue.",
            "In a typical 28-day teaching cycle, menstruation commonly occupies about Days 1 to 5. The exact duration varies among individuals and from cycle to cycle."
          ]
        },
        {
          "title":"Rebuilding the uterine lining",
          "paragraphs":[
            "After menstruation, the endometrium repairs and becomes thicker again. Oestrogen produced by the developing ovarian follicle contributes to this rebuilding.",
            "Oestrogen generally rises during the first half of the cycle and reaches a high level before ovulation."
          ]
        },
        {
          "title":"Ovulation",
          "paragraphs":[
            "Ovulation is the release of a mature ovum from an ovary. In a typical 28-day cycle, ovulation is often shown around Day 14.",
            "Cycle length varies, so Day 14 should not be treated as a fixed date for every person. For a regular cycle, ovulation is often estimated at roughly 14 days before the next menstrual period."
          ]
        },
        {
          "title":"Progesterone after ovulation",
          "paragraphs":[
            "After ovulation, progesterone levels rise. Progesterone helps maintain the thick endometrium so that it is ready for possible implantation.",
            "If pregnancy does not occur, progesterone levels fall near the end of the cycle. The uterine lining is no longer maintained and a new menstrual period begins."
          ]
        },
        {
          "title":"Reading a menstrual-cycle graph",
          "paragraphs":[
            "First identify the horizontal axis and the day of the cycle. Then look for the fall in lining thickness during menstruation, the rebuilding before ovulation and the maintained thick lining after ovulation.",
            "On a simplified hormone graph, oestrogen rises before ovulation. Progesterone is low before ovulation, rises afterwards and falls again if pregnancy does not occur."
          ]
        },
        {
          "title":"Estimating ovulation in a regular cycle",
          "paragraphs":[
            "An approximate rule is to count back about 14 days from the expected start of the next period. For a regular 30-day cycle, this gives an estimate around Day 16.",
            "This is an estimate, not a guarantee. Biological cycles vary and calendar prediction alone should not be treated as a precise indicator of fertility."
          ]
        },
        {
          "title":"Menopause",
          "paragraphs":[
            "Menopause is the stage when menstrual cycles permanently stop as ovarian activity declines. Oestrogen levels fall and ovulation ceases.",
            "Menopause is a normal biological stage and should not be confused with a temporary missed period."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-3-menstrual-cycle",
          "type":"menstrual-cycle",
          "title":"Menstrual cycle model"
        }
      ],
      "keyPoints":[
        "Menstruation is the shedding of the uterine lining.",
        "Ovulation is the release of an ovum from an ovary.",
        "Oestrogen helps rebuild and thicken the uterine lining before ovulation.",
        "Progesterone helps maintain the uterine lining after ovulation.",
        "If pregnancy does not occur, progesterone falls and menstruation begins.",
        "Day 14 is a teaching estimate for a 28-day cycle, not a fixed ovulation day for every cycle.",
        "Menopause is the permanent stopping of menstrual cycles as ovarian activity declines."
      ],
      "workedExample":{
        "title":"Estimating ovulation in a 30-day cycle",
        "prompt":"A woman has a regular 30-day menstrual cycle. Estimate the cycle day on which ovulation is most likely to occur.",
        "steps":[
          "Use the approximate rule that ovulation occurs about 14 days before the next period.",
          "The next period is expected after a 30-day cycle.",
          "Count back about 14 days from the end of the cycle.",
          "30 minus 14 gives approximately Day 16."
        ],
        "answer":"Ovulation is estimated around Day 16. This is only an estimate because menstrual cycles vary."
      },
      "checks":[
        {
          "prompt":"What is ovulation?",
          "answer":"The release of a mature ovum from an ovary.",
          "explanation":"In a typical 28-day teaching cycle this is often shown around Day 14."
        },
        {
          "prompt":"What happens to the uterine lining during menstruation?",
          "answer":"The lining breaks down and is shed with blood and tissue.",
          "explanation":"Day 1 of menstrual bleeding marks the start of a new cycle."
        },
        {
          "prompt":"What is the main role of progesterone after ovulation?",
          "answer":"It helps maintain the thickened uterine lining ready for possible implantation.",
          "explanation":"A fall in progesterone when pregnancy does not occur is associated with breakdown of the lining."
        },
        {
          "prompt":"Why should Day 14 not be treated as the ovulation day for every menstrual cycle?",
          "answer":"Cycle length and timing vary. Day 14 is an estimate based on a typical 28-day cycle.",
          "explanation":"Ovulation is often estimated more generally as about 14 days before the next period."
        }
      ],
      "summary":"Analyse the cycle as a sequence. Menstruation removes the old lining, oestrogen helps rebuild it, ovulation releases an ovum, progesterone maintains the lining afterwards, and falling progesterone leads into the next period if pregnancy does not occur."
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
  || '{"topicsBuilt":12,"objectivesBuilt":12}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 17/120: supabase/migrations/20260921020000_integrated_science_objective_134.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.3.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-4-stages-pregnancy',
  'module-1-organisms-life-processes',
  '1.3.4 Stages of Pregnancy',
  'Discuss fertilisation, implantation, embryo and foetal development, placental exchange, protection of the foetus and the stages of labour.',
  130,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.4",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Outline the sequence from fertilisation to implantation.",
        "Distinguish between the embryo and foetus stages.",
        "Describe the roles of the placenta, umbilical cord, amnion and amniotic fluid.",
        "Explain how substances are exchanged between mother and foetus without normal direct mixing of their blood.",
        "State the approximate duration of human pregnancy.",
        "Describe the three stages of labour in the correct order."
      ],
      "introduction":"Pregnancy begins after fertilisation and continues through implantation, embryonic development, foetal growth and birth. Each stage depends on specialised structures that exchange materials, protect the developing baby and maintain a suitable environment inside the uterus.",
      "sections":[
        {
          "title":"Fertilisation and the zygote",
          "paragraphs":[
            "Fertilisation is the fusion of the nucleus of a sperm with the nucleus of an ovum. It normally occurs in an oviduct and produces a zygote.",
            "The zygote begins repeated cell divisions as it moves towards the uterus. The number of cells increases while the developing structure remains small enough to travel through the oviduct."
          ]
        },
        {
          "title":"Implantation",
          "paragraphs":[
            "About a week after fertilisation, the early embryo reaches the uterus and becomes attached to the thickened endometrium. This attachment is called implantation.",
            "Implantation should not be confused with fertilisation. Fertilisation usually occurs in an oviduct, while implantation occurs in the lining of the uterus."
          ]
        },
        {
          "title":"Embryo and foetus",
          "paragraphs":[
            "During the early weeks, major body structures and organ systems begin to form. The developing human is called an embryo during this early period.",
            "From about eight weeks after fertilisation, when the main body plan and major organs have formed, the developing human is called a foetus. Growth and maturation continue for the remainder of pregnancy."
          ]
        },
        {
          "title":"Placenta and umbilical cord",
          "paragraphs":[
            "The placenta develops where the embryo is attached to the uterine lining. It provides a large, thin exchange surface between the maternal and foetal circulations.",
            "Oxygen, glucose, amino acids, water, mineral ions and some antibodies can pass from the mother towards the foetus. Carbon dioxide and urea pass from the foetus towards the mother.",
            "The mother''s blood and the foetus''s blood normally remain in separate blood vessels and do not mix directly. Materials cross the placental barrier between the two circulations."
          ],
          "bullets":[
            "The umbilical cord contains blood vessels that carry foetal blood between the foetus and the placenta.",
            "The placenta does not act as a perfect barrier. Harmful substances such as alcohol, nicotine and some drugs can cross it."
          ]
        },
        {
          "title":"Amnion and amniotic fluid",
          "paragraphs":[
            "The foetus develops within a fluid-filled amniotic sac. The amnion is the membrane surrounding this space.",
            "Amniotic fluid cushions the foetus against mechanical shocks, allows movement and helps maintain a stable physical environment."
          ]
        },
        {
          "title":"Length of pregnancy",
          "paragraphs":[
            "Human pregnancy lasts about nine months. Clinically, gestation is commonly described as about 40 weeks when counted from the first day of the last menstrual period.",
            "The exact date of birth varies, so 40 weeks is an approximate reference rather than a fixed deadline."
          ]
        },
        {
          "title":"Twins",
          "paragraphs":[
            "Identical twins develop when one fertilised egg divides into two embryos. They therefore have the same genetic information apart from later mutations.",
            "Non-identical twins develop from two separate ova fertilised by two separate sperm and are genetically similar to ordinary brothers or sisters."
          ]
        },
        {
          "title":"The three stages of labour",
          "paragraphs":[
            "During the first stage, rhythmic contractions of the uterus become stronger and the cervix dilates.",
            "During the second stage, strong contractions push the baby through the cervix and vagina. Crowning occurs when the baby''s head becomes visible at the vaginal opening, followed by delivery of the baby.",
            "During the third stage, the uterus continues to contract, the placenta separates from the uterine wall and is expelled through the vagina as the afterbirth."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-4-pregnancy-stages",
          "type":"pregnancy-stages",
          "title":"Pregnancy and birth stages"
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m1-t3-4-pregnancy-uterus",
          "template":"pregnancy-uterus",
          "title":"Label the foetus in the uterus",
          "instructions":"Place each label on the correct pregnancy structure. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"placenta","text":"Placenta","hint":"Look for the specialised tissue attached to the uterine wall.","explanation":"The placenta is the exchange organ between maternal and foetal circulations."},
            {"id":"umbilical-cord","text":"Umbilical cord","hint":"Look for the cord joining the foetus to the placenta.","explanation":"The umbilical cord contains blood vessels carrying foetal blood between the foetus and placenta."},
            {"id":"foetus","text":"Foetus","hint":"Look for the developing baby inside the amniotic sac.","explanation":"The developing human is called a foetus from about eight weeks after fertilisation."},
            {"id":"amnion","text":"Amnion","hint":"Look for the membrane surrounding the fluid-filled space.","explanation":"The amnion forms the membrane of the amniotic sac."},
            {"id":"amniotic-fluid","text":"Amniotic fluid","hint":"Look for the fluid-filled space surrounding the foetus.","explanation":"Amniotic fluid cushions the foetus against shocks and allows movement."},
            {"id":"cervix","text":"Cervix","hint":"Look for the narrow muscular neck at the lower end of the uterus.","explanation":"The cervix dilates during the first stage of labour."}
          ],
          "targets":[
            {"id":"pregnancy-placenta-target","labelId":"placenta","boxX":20,"boxY":75,"anchorX":350,"anchorY":270,"side":"left"},
            {"id":"pregnancy-umbilical-target","labelId":"umbilical-cord","boxX":20,"boxY":155,"anchorX":470,"anchorY":300,"side":"left"},
            {"id":"pregnancy-amnion-target","labelId":"amnion","boxX":20,"boxY":235,"anchorX":630,"anchorY":195,"side":"left"},
            {"id":"pregnancy-foetus-target","labelId":"foetus","boxX":790,"boxY":75,"anchorX":570,"anchorY":320,"side":"right"},
            {"id":"pregnancy-fluid-target","labelId":"amniotic-fluid","boxX":790,"boxY":155,"anchorX":610,"anchorY":410,"side":"right"},
            {"id":"pregnancy-cervix-target","labelId":"cervix","boxX":790,"boxY":235,"anchorX":500,"anchorY":545,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "Fertilisation is fusion of sperm and ovum nuclei and normally occurs in an oviduct.",
        "Implantation is attachment of the embryo to the endometrium.",
        "The developing human is called a foetus from about eight weeks after fertilisation.",
        "The placenta exchanges materials between maternal and foetal circulations without normal direct mixing of their blood.",
        "The umbilical cord carries foetal blood between the foetus and placenta.",
        "Amniotic fluid cushions the foetus against shocks.",
        "Human pregnancy lasts about nine months, approximately 40 weeks by clinical dating.",
        "Labour proceeds through cervical dilation, delivery of the baby and expulsion of the placenta."
      ],
      "workedExample":{
        "title":"Explaining placental exchange",
        "prompt":"State two substances that move from mother to foetus, one substance that moves from foetus to mother, and explain whether the two blood supplies normally mix.",
        "steps":[
          "Choose substances needed by the foetus, such as oxygen and glucose.",
          "Choose a foetal waste product, such as carbon dioxide or urea.",
          "State that the maternal and foetal blood remain in separate vessels.",
          "Explain that substances cross the placental exchange surface."
        ],
        "answer":"Oxygen and glucose can pass from mother to foetus, while carbon dioxide can pass from foetus to mother. The two blood supplies normally remain separate while materials cross the placenta."
      },
      "checks":[
        {
          "prompt":"What is implantation?",
          "answer":"The attachment of the early embryo to the lining of the uterus.",
          "explanation":"Implantation occurs after the dividing zygote reaches the uterus."
        },
        {
          "prompt":"What is the function of amniotic fluid?",
          "answer":"It cushions the foetus against mechanical shocks and allows movement.",
          "explanation":"The fluid surrounds the foetus within the amniotic sac."
        },
        {
          "prompt":"What does the umbilical cord carry?",
          "answer":"Foetal blood between the foetus and the placenta.",
          "explanation":"Its vessels connect the foetal circulation to the placenta."
        },
        {
          "prompt":"State the three stages of labour in order.",
          "answer":"Cervical dilation, delivery of the baby, then separation and expulsion of the placenta.",
          "explanation":"The placenta is expelled after the baby as the afterbirth."
        }
      ],
      "summary":"Follow pregnancy as a sequence: fertilisation, cell division, implantation, embryo development, foetal growth and labour. Link each stage to the placenta, umbilical cord, amnion, amniotic fluid and cervix."
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
  'diagram:m1-t3-4-pregnancy-uterus',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t3-4-stages-pregnancy',
  'Label the foetus in the uterus',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t3-4-stages-pregnancy',
  0.35,
  true,
  '{"syllabusObjective":"1.3.4","mode":"drag-drop-label"}'::jsonb
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
  || '{"topicsBuilt":13,"objectivesBuilt":13}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 18/120: supabase/migrations/20260921020500_integrated_science_objective_135.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.3.5
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-5-birth-control-methods',
  'module-1-organisms-life-processes',
  '1.3.5 Methods of Birth Control',
  'Compare behavioural, barrier, hormonal, intrauterine and surgical methods of birth control, including how they work, their limitations and STI protection.',
  140,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.5",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Classify common birth-control methods.",
        "Explain how selected methods reduce the chance of pregnancy.",
        "Compare temporary and permanent methods.",
        "Explain why fertility-awareness methods can be unreliable when ovulation varies.",
        "Identify methods that reduce sexual transmission of infections.",
        "Distinguish current IUD mechanisms from older simplified descriptions."
      ],
      "introduction":"Birth control includes methods used to reduce the chance of pregnancy. The methods differ in how they work, whether they require action each time sexual intercourse occurs, whether they contain hormones, and whether they are intended to be permanent. Preventing pregnancy and reducing STI transmission are separate issues.",
      "sections":[
        {
          "title":"Abstinence",
          "paragraphs":[
            "Abstinence from sexual intercourse prevents sperm from reaching an ovum and therefore prevents pregnancy while it is maintained.",
            "It also prevents sexual transmission of infections when sexual contact does not occur."
          ]
        },
        {
          "title":"Barrier methods",
          "paragraphs":[
            "Barrier methods physically prevent sperm from reaching the ovum. Examples include condoms, diaphragms and cervical caps.",
            "Condoms also reduce the transmission of many sexually transmitted infections because they reduce contact with semen and other body fluids. Diaphragms and cervical caps do not provide the same STI protection."
          ],
          "bullets":[
            "A condom must be used correctly each time sexual intercourse occurs.",
            "A condom can tear or slip if it is damaged or used incorrectly.",
            "Barrier methods do not permanently affect fertility."
          ]
        },
        {
          "title":"Hormonal methods",
          "paragraphs":[
            "Hormonal methods include contraceptive pills, injections, patches and implants. They mainly prevent ovulation and can also thicken cervical mucus.",
            "These methods do not protect against sexually transmitted infections. Correct use and appropriate medical guidance are important."
          ]
        },
        {
          "title":"Intrauterine devices",
          "paragraphs":[
            "An intrauterine device, or IUD, is a small device placed inside the uterus by a trained health-care provider. Copper and hormonal IUDs work in different ways.",
            "Copper IUDs interfere with sperm movement and fertilisation. Hormonal IUDs release progestin, thicken cervical mucus and inhibit sperm. IUDs do not protect against sexually transmitted infections.",
            "Some older school descriptions state that an IUD prevents implantation. Current medical guidance describes prevention of fertilisation and inhibition of sperm as the main mechanisms, so this lesson uses the current explanation while recognising the older exam wording."
          ]
        },
        {
          "title":"Fertility-awareness methods",
          "paragraphs":[
            "The rhythm or calendar method estimates the fertile part of the menstrual cycle and avoids unprotected intercourse during that period. The Billings method uses changes in cervical mucus as an indicator of fertility.",
            "These methods depend on recognising fertile days correctly. Ovulation can vary from one cycle to another, which makes prediction less reliable."
          ]
        },
        {
          "title":"Withdrawal",
          "paragraphs":[
            "Withdrawal involves removing the penis from the vagina before ejaculation. It is less reliable because withdrawal may be late and sperm may be present before full ejaculation.",
            "Withdrawal does not protect against sexually transmitted infections."
          ]
        },
        {
          "title":"Surgical methods",
          "paragraphs":[
            "A vasectomy cuts or blocks the sperm ducts so sperm do not enter the semen. Tubal ligation cuts or blocks the oviducts so sperm and ovum cannot meet.",
            "These procedures are intended as permanent methods. They do not protect against sexually transmitted infections."
          ]
        },
        {
          "title":"Comparing methods",
          "paragraphs":[
            "When comparing methods, consider how the method works, whether it is reversible, whether it depends on correct use each time, whether a health-care provider is needed and whether it reduces STI transmission.",
            "A condom is important because it is a contraceptive method that also reduces the risk of many STIs. Other contraceptive methods should not be assumed to provide STI protection."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-5-birth-control",
          "type":"birth-control",
          "title":"Birth control comparison"
        }
      ],
      "keyPoints":[
        "Barrier methods physically block sperm.",
        "Hormonal methods mainly prevent ovulation and may thicken cervical mucus.",
        "Fertility-awareness methods depend on estimating fertile days and can be affected by variation in ovulation.",
        "Vasectomy blocks sperm ducts and tubal ligation blocks oviducts.",
        "Condoms reduce transmission of many STIs as well as reducing the chance of pregnancy.",
        "IUDs are intrauterine methods and do not protect against STIs.",
        "Pregnancy prevention and STI protection should be considered separately."
      ],
      "workedExample":{
        "title":"Comparing a condom and the contraceptive pill",
        "prompt":"A student says that the contraceptive pill and a condom provide the same type of protection. Explain why this statement is incorrect.",
        "steps":[
          "Identify how each method prevents pregnancy.",
          "The pill is hormonal and mainly prevents ovulation.",
          "A condom is a physical barrier that prevents sperm from entering the female reproductive tract.",
          "Compare STI protection."
        ],
        "answer":"Both methods reduce the chance of pregnancy, but they work differently. The pill mainly prevents ovulation and does not protect against STIs. A condom forms a barrier and also reduces transmission of many STIs."
      },
      "checks":[
        {
          "prompt":"Why can the rhythm method be unreliable?",
          "answer":"The timing of ovulation can vary from one cycle to another.",
          "explanation":"The method depends on predicting the fertile part of the cycle."
        },
        {
          "prompt":"What is a vasectomy?",
          "answer":"A surgical procedure that cuts or blocks the sperm ducts.",
          "explanation":"Sperm are prevented from entering the semen."
        },
        {
          "prompt":"Which contraceptive method in this lesson also reduces transmission of many STIs?",
          "answer":"The condom.",
          "explanation":"It acts as a physical barrier that reduces exchange of semen and other body fluids."
        },
        {
          "prompt":"How does the Billings method estimate fertility?",
          "answer":"By observing changes in cervical mucus.",
          "explanation":"Changes in cervical mucus are used to identify likely fertile days."
        }
      ],
      "summary":"Know how each method works and what it does not do. A method can prevent pregnancy without protecting against infection. Compare mechanism, correct-use requirements, reversibility and STI protection."
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
  || '{"topicsBuilt":14,"objectivesBuilt":14}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 19/120: supabase/migrations/20260921021000_integrated_science_objective_136.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.3.6
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-6-prenatal-postnatal-care',
  'module-1-organisms-life-processes',
  '1.3.6 Pre-natal and Post-natal Care',
  'Assess how nutrition, clinical monitoring, avoidance of harmful exposures, breastfeeding, immunisation and follow-up care support mothers and babies.',
  150,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.6",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain the importance of regular pre-natal care.",
        "Relate balanced nutrition, iron, folate and calcium to maternal and foetal health.",
        "Explain how smoking, alcohol and selected infections can harm the developing foetus.",
        "State suitable uses of ultrasound during pregnancy.",
        "Assess the value of breastfeeding and post-natal follow-up.",
        "Explain why childhood immunisation protects babies against infectious disease."
      ],
      "introduction":"Care during pregnancy and after birth reduces avoidable risks and helps health problems to be recognised early. Good care includes nutrition, clinical monitoring, safe choices about medicines and harmful substances, support for the mother after delivery and appropriate care of the newborn.",
      "sections":[
        {
          "title":"Regular pre-natal care",
          "paragraphs":[
            "Pre-natal, or antenatal, visits allow health professionals to monitor the mother and developing baby. Checks can include blood pressure, growth of the uterus, laboratory tests and assessment of the baby''s growth and position.",
            "Regular visits also provide opportunities to discuss nutrition, medicines, symptoms, vaccinations and preparation for birth."
          ]
        },
        {
          "title":"Nutrition during pregnancy",
          "paragraphs":[
            "A balanced diet supplies the energy, protein, vitamins and minerals needed by the mother and developing baby. Iron supports haemoglobin production and helps reduce the risk of iron-deficiency anaemia.",
            "Folate, also called folic acid in supplements, is especially important early in development because adequate intake reduces the risk of neural tube defects. Calcium and vitamin D support normal development of bones and teeth.",
            "Supplements should be taken according to health-care guidance because needs differ and excessive intake of some nutrients can also be harmful."
          ]
        },
        {
          "title":"Ultrasound and monitoring",
          "paragraphs":[
            "Ultrasound uses high-frequency sound waves to produce images. During pregnancy it can be used to estimate gestational age, check growth and position, identify multiple pregnancy and investigate some developmental concerns.",
            "Ultrasound does not use ionising X-rays."
          ]
        },
        {
          "title":"Smoking and tobacco exposure",
          "paragraphs":[
            "Carbon monoxide from tobacco smoke binds strongly to haemoglobin and reduces the amount of oxygen that the blood can transport. Nicotine can also affect blood vessels.",
            "Reduced oxygen and impaired placental blood flow can restrict foetal growth and increase the risk of low birth weight."
          ]
        },
        {
          "title":"Alcohol, drugs and radiation",
          "paragraphs":[
            "Alcohol crosses the placenta and can interfere with development of the foetal brain and other organs. Non-medical drug use can also create serious risks during pregnancy.",
            "A pregnant person should tell health-care providers about the pregnancy before taking medicines or having medical imaging. Unnecessary ionising radiation should be avoided, while medically necessary imaging should be assessed and managed by qualified professionals."
          ]
        },
        {
          "title":"Infections during pregnancy",
          "paragraphs":[
            "Some infections can damage a developing foetus. Rubella infection during early pregnancy is an important syllabus example because it can cause serious congenital problems.",
            "Prevention, vaccination before pregnancy where appropriate, good hygiene and prompt medical care reduce infection risks."
          ]
        },
        {
          "title":"Post-natal care of the mother",
          "paragraphs":[
            "Post-natal care checks that the mother is recovering after delivery. Health workers can assess bleeding, healing, blood pressure, emotional wellbeing and other health concerns.",
            "Post-natal visits also provide support with feeding, contraception, rest, nutrition and care of the newborn."
          ]
        },
        {
          "title":"Breastfeeding",
          "paragraphs":[
            "Breast milk provides suitable nutrients for early growth and contains antibodies and other protective factors. These antibodies give the baby passive protection against some infections.",
            "Breast milk is clean, readily available and normally at the correct temperature. Breastfeeding can also support close contact and bonding between mother and baby."
          ]
        },
        {
          "title":"Care of the newborn",
          "paragraphs":[
            "Newborn care includes monitoring growth, feeding, temperature and general health. Follow-up visits help identify problems early.",
            "Vaccines expose the immune system to safe forms or components of disease-causing organisms. This stimulates production of antibodies and memory cells so the child can respond more effectively if exposed to the disease later."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-6-maternal-baby-care",
          "type":"maternal-baby-care",
          "title":"Maternal and baby care"
        }
      ],
      "keyPoints":[
        "Regular pre-natal visits help monitor the health of mother and baby.",
        "Iron supports haemoglobin, folate reduces the risk of neural tube defects and calcium supports bones and teeth.",
        "Smoking can reduce oxygen reaching the foetus and is linked with low birth weight.",
        "Alcohol can interfere with foetal brain and organ development.",
        "Ultrasound uses sound waves to monitor growth, position and other features of pregnancy.",
        "Breast milk provides nutrients and antibodies that give passive protection.",
        "Post-natal care supports maternal recovery, infant feeding and newborn health.",
        "Immunisation stimulates active immune protection and memory cells."
      ],
      "workedExample":{
        "title":"Explaining low birth weight linked to smoking",
        "prompt":"Explain why smoking during pregnancy can increase the risk of a baby having a low birth weight.",
        "steps":[
          "Tobacco smoke contains carbon monoxide.",
          "Carbon monoxide binds to haemoglobin and reduces oxygen transport.",
          "Nicotine can also reduce blood flow through blood vessels.",
          "Less oxygen and poorer placental blood flow can restrict foetal growth."
        ],
        "answer":"Smoking can reduce the oxygen and blood supply available to the developing foetus. Growth may be restricted, increasing the risk of low birth weight."
      },
      "checks":[
        {
          "prompt":"Why are iron and folate important during pregnancy?",
          "answer":"Iron supports haemoglobin and helps prevent iron-deficiency anaemia. Folate reduces the risk of neural tube defects in the developing baby.",
          "explanation":"Both nutrients support important processes during maternal and foetal development."
        },
        {
          "prompt":"State two uses of ultrasound during pregnancy.",
          "answer":"Examples include checking foetal growth and position, estimating gestational age, identifying twins or investigating some abnormalities.",
          "explanation":"Ultrasound creates images using sound waves rather than ionising X-rays."
        },
        {
          "prompt":"Give two advantages of breastfeeding for a newborn baby.",
          "answer":"Breast milk provides suitable nutrients and contains antibodies that help protect against infection.",
          "explanation":"It also has practical advantages because it is clean and readily available."
        },
        {
          "prompt":"Why are babies immunised?",
          "answer":"Vaccination stimulates the immune system to make antibodies and memory cells against specific diseases.",
          "explanation":"This prepares the child for a faster protective response after later exposure."
        }
      ],
      "summary":"Pre-natal and post-natal care work together. Protect development before birth through nutrition, monitoring and avoidance of harmful exposures, then support recovery, feeding, growth and immunity after birth."
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
  || '{"topicsBuilt":15,"objectivesBuilt":15}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 20/120: supabase/migrations/20260921021500_integrated_science_objective_137.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.3.7
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-7-growth-patterns-males-females',
  'module-1-organisms-life-processes',
  '1.3.7 Growth Patterns of Males and Females',
  'Compare average male and female growth patterns during childhood and adolescence using CSEC height and mass data and relate the differences to puberty.',
  160,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.7",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Interpret line graphs and tables showing average height and mass at different ages.",
        "Compare the timing of adolescent growth spurts in boys and girls.",
        "Calculate changes in height or mass over an age interval.",
        "Relate puberty to rapid growth and development of secondary sexual characteristics.",
        "Recognise that population averages do not predict the exact growth pattern of an individual."
      ],
      "introduction":"Human growth is not equally rapid at every age. Growth is fast during infancy, slows through much of childhood and increases again during the adolescent growth spurt. Boys and girls show overlapping patterns, but girls usually enter puberty and the adolescent growth spurt earlier on average.",
      "sections":[
        {
          "title":"Reading growth data",
          "paragraphs":[
            "A growth graph shows how a measurement such as height changes with age. A steeper line means a greater increase over that interval.",
            "Always read the axes and units before comparing the curves. A higher curve at one age shows a larger average measurement at that age, but it does not mean every individual in that group is taller or heavier."
          ]
        },
        {
          "title":"Height pattern in the SPARK CSEC dataset",
          "paragraphs":[
            "In the supplied practice dataset, boys and girls have similar average heights in the earlier years. The girls'' curve rises earlier during the first part of adolescence, reflecting the earlier average onset of puberty.",
            "The boys'' curve becomes steeper later and continues rising strongly through the mid-teen years. By the later teen years, the boys'' average height is greater in this dataset."
          ]
        },
        {
          "title":"Mass pattern in the SPARK CSEC dataset",
          "paragraphs":[
            "At age 12, the table gives an average mass of 40 kg for boys and 42 kg for girls. At age 14, boys average 51 kg and girls 50 kg.",
            "From age 12 to 14, boys increase by 11 kg, the largest two-year gain shown for boys in this dataset. After age 16, boys also gain more mass than girls in the table."
          ]
        },
        {
          "title":"Puberty and the growth spurt",
          "paragraphs":[
            "Puberty is the stage when reproductive maturity develops under the influence of hormones. It is associated with rapid growth and development of secondary sexual characteristics.",
            "Girls usually begin puberty earlier on average. Oestrogen contributes to features such as breast development and widening of the hips. Boys generally begin their major adolescent growth spurt later, and testosterone contributes to features such as deepening of the voice, facial hair and broader shoulders."
          ]
        },
        {
          "title":"Individual variation",
          "paragraphs":[
            "Growth charts describe averages and ranges, not a fixed timetable for every person. Genetics, nutrition, health, physical activity, hormones and other factors affect growth.",
            "A healthy individual may therefore grow earlier, later, faster or more slowly than the average curve."
          ]
        },
        {
          "title":"How to compare two growth curves",
          "bullets":[
            "Identify where one curve lies above the other.",
            "Look for the steepest section to locate the greatest rate of increase.",
            "Calculate a change by subtracting the earlier value from the later value.",
            "Use age intervals, units and numerical evidence in the comparison.",
            "Relate adolescent differences to the timing of puberty without treating averages as rules for individuals."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-7-human-growth",
          "type":"human-growth",
          "title":"Human growth data explorer"
        }
      ],
      "keyPoints":[
        "Human growth is especially rapid during infancy and puberty.",
        "Girls usually enter puberty and their adolescent growth spurt earlier on average than boys.",
        "Boys commonly have a later major adolescent growth spurt.",
        "The steepness of a graph shows how rapidly a measurement is changing.",
        "The SPARK practice dataset shows girls heavier than boys at age 12 and boys making their greatest two-year mass gain from ages 12 to 14.",
        "Growth data are averages and do not determine the growth of an individual."
      ],
      "workedExample":{
        "title":"Comparing mass gain",
        "prompt":"In the CSEC practice table, boys average 40 kg at age 12 and 51 kg at age 14. Girls average 42 kg at age 12 and 50 kg at age 14. Compare the mass gain of the two groups.",
        "steps":[
          "Boys: 51 kg - 40 kg = 11 kg.",
          "Girls: 50 kg - 42 kg = 8 kg.",
          "Compare the two changes.",
          "11 kg - 8 kg = 3 kg."
        ],
        "answer":"Between ages 12 and 14, boys gain 11 kg on average and girls gain 8 kg on average in this dataset. The boys'' average gain is 3 kg greater."
      },
      "checks":[
        {
          "prompt":"Why is the steepest section of a growth curve important?",
          "answer":"It shows the age interval with the greatest increase in the measured quantity.",
          "explanation":"A steep line represents a large change over a small age interval."
        },
        {
          "prompt":"At age 12 in the SPARK mass dataset, which group is heavier on average?",
          "answer":"Girls, at 42 kg compared with 40 kg for boys.",
          "explanation":"The values must be read directly from the table."
        },
        {
          "prompt":"Why do girls often appear to have an earlier adolescent growth spurt than boys?",
          "answer":"Girls usually enter puberty earlier on average.",
          "explanation":"The timing of puberty shifts the timing of rapid adolescent growth."
        },
        {
          "prompt":"Why should an average growth curve not be used to predict one student''s exact height?",
          "answer":"Individuals vary because growth is affected by genetics, nutrition, health, hormones and other factors.",
          "explanation":"Population averages describe groups, not fixed outcomes for each person."
        }
      ],
      "summary":"Use data to compare growth patterns. Read the axes, identify the steepest sections, calculate changes and relate the adolescent growth spurts to puberty while remembering that individual growth varies."
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
  || '{"topicsBuilt":16,"objectivesBuilt":16}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 21/120: supabase/migrations/20260921022000_integrated_science_objective_138.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.3.8
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-8-human-population-control',
  'module-1-organisms-life-processes',
  '1.3.8 Human Population Growth and Control',
  'Discuss why rapid population growth can place pressure on food, water, housing, employment and natural resources, and evaluate voluntary approaches to population planning.',
  170,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.8",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain how birth rate, death rate, immigration and emigration affect population size.",
        "Interpret a population-growth graph and calculate change over time.",
        "Explain how rapid population growth can affect food, water, housing, jobs, waste management and natural resources.",
        "Explain how teenage pregnancy and early childbearing can increase population growth.",
        "Assess voluntary approaches such as family-planning education, access to contraception and education of girls and women.",
        "Explain why population planning should respect individual rights and informed choice."
      ],
      "introduction":"Human populations change when births, deaths and migration change. Rapid growth can improve the size of the labour force and increase demand for goods and services, but it can also place heavy pressure on resources and public services when growth is faster than a country can plan for.",
      "sections":[
        {
          "title":"How population size changes",
          "paragraphs":[
            "A population increases when births and immigration are greater than deaths and emigration. It decreases when deaths and emigration are greater than births and immigration.",
            "The natural increase of a population is the difference between births and deaths. Migration also changes the total number of people living in a country."
          ],
          "bullets":[
            "A high birth rate increases population size.",
            "A falling death rate can increase population growth if the birth rate remains high.",
            "Immigration adds people to a population.",
            "Emigration removes people from a population."
          ]
        },
        {
          "title":"Reading the SPARK CSEC population graph",
          "paragraphs":[
            "The practice graph shows a population rising from about 4 million in 1960 to about 28 million in 2020.",
            "Between 1980 and 2020, the population rises from about 8 million to 28 million. The increase is therefore about 20 million.",
            "The curve becomes steeper over time, showing that the absolute increase per decade becomes larger in the later part of the graph."
          ]
        },
        {
          "title":"Pressure on food and water",
          "paragraphs":[
            "More people require more food and clean water. If agricultural production, storage and distribution do not keep pace, food shortages and higher prices can occur.",
            "Greater water demand can place pressure on rivers, reservoirs and groundwater supplies. Poor water infrastructure may increase the risk of shortages and contamination."
          ]
        },
        {
          "title":"Housing, jobs and public services",
          "paragraphs":[
            "Rapid population growth increases demand for housing, schools, health services, transport, electricity and employment.",
            "When housing supply grows too slowly, overcrowding and informal settlements may increase. When job creation is too slow, unemployment and underemployment can rise."
          ]
        },
        {
          "title":"Waste and environmental pressure",
          "paragraphs":[
            "A larger population produces more sewage and solid waste. Without adequate collection and treatment, pollution and disease risk can increase.",
            "Growing demand for land, food, timber and energy can contribute to deforestation, habitat loss, soil degradation, overfishing and pressure on fresh water."
          ]
        },
        {
          "title":"Teenage pregnancy and population growth",
          "paragraphs":[
            "When childbearing begins at a younger age, the time between generations becomes shorter. If a person also has more reproductive years remaining, the number of children over a lifetime may be greater.",
            "For this reason, high rates of teenage pregnancy can contribute to faster population growth in a community or country."
          ]
        },
        {
          "title":"Voluntary family planning",
          "paragraphs":[
            "Family-planning education helps people understand reproduction, contraception, birth spacing and the health and economic effects of family size.",
            "Voluntary access to safe and suitable contraceptive methods allows people to decide whether and when to have children. These decisions should be informed and free from coercion."
          ]
        },
        {
          "title":"Education and opportunity",
          "paragraphs":[
            "Continued education for girls and women is associated with wider employment opportunities, later average age at first birth and greater ability to make informed reproductive decisions.",
            "Education of both males and females is important because decisions about relationships, contraception, parenting and family size involve shared responsibility."
          ]
        },
        {
          "title":"Population planning and human rights",
          "paragraphs":[
            "Governments need population information to plan schools, hospitals, housing, water systems, food supply, transport and waste management.",
            "Population programmes should support voluntary, informed decisions and respect individual rights. Coercive population policies can cause serious ethical and social harm."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-8-population-growth",
          "type":"population-growth",
          "title":"Population growth and resource pressure"
        }
      ],
      "keyPoints":[
        "Population change depends on births, deaths, immigration and emigration.",
        "The SPARK practice graph increases from about 8 million in 1980 to 28 million in 2020, an increase of about 20 million.",
        "Rapid population growth can increase demand for food, water, housing, jobs, schools, health care and waste services.",
        "Population growth can increase pressure on forests, habitats, fresh water and other natural resources.",
        "Early childbearing shortens generation time and can contribute to faster population growth.",
        "Family-planning education and voluntary access to contraception support informed birth spacing and family-size decisions.",
        "Population planning should respect human rights and informed choice."
      ],
      "workedExample":{
        "title":"Calculating population increase",
        "prompt":"A graph shows a population of 8 million in 1980 and 28 million in 2020. Calculate the increase and state one likely pressure caused by this growth.",
        "steps":[
          "Read the two population values from the graph.",
          "Subtract the earlier population from the later population.",
          "28 million - 8 million = 20 million.",
          "Link the increase to a resource or service that more people require."
        ],
        "answer":"The population increased by about 20 million. One likely pressure is greater demand for housing, food, clean water or jobs."
      },
      "checks":[
        {
          "prompt":"When does a population increase naturally?",
          "answer":"When the number of births is greater than the number of deaths.",
          "explanation":"Migration also changes total population size, but natural increase refers to births minus deaths."
        },
        {
          "prompt":"Why can better health care increase population growth?",
          "answer":"If health care lowers the death rate while the birth rate remains high, more people survive and the population grows.",
          "explanation":"Population growth depends on the balance between births and deaths."
        },
        {
          "prompt":"How can teenage pregnancy contribute to rapid population growth?",
          "answer":"Earlier childbearing shortens the time between generations and may increase the number of children a person has over a lifetime.",
          "explanation":"Shorter generation intervals can increase the rate at which a population grows."
        },
        {
          "prompt":"State two voluntary measures that can help reduce rapid population growth.",
          "answer":"Examples include family-planning education, access to contraception, sex education and continued education of girls and women.",
          "explanation":"These approaches support informed decisions rather than coercion."
        }
      ],
      "summary":"Population growth must be understood through data and resource demand. Compare births and deaths, include migration, calculate changes from graphs and connect rapid growth to food, water, housing, employment, public services and environmental pressure."
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
  || '{"topicsBuilt":17,"objectivesBuilt":17}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 22/120: supabase/migrations/20260921022500_integrated_science_objective_141.sql
-- ============================================================================
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

-- ============================================================================
-- SOURCE 23/120: supabase/migrations/20260921023000_integrated_science_objective_142.sql
-- ============================================================================
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

-- ============================================================================
-- SOURCE 24/120: supabase/migrations/20260921023500_integrated_science_objective_143.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.4.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t4-3-blood-groups',
  'module-1-organisms-life-processes',
  '1.4.3 Blood Groups',
  'Distinguish ABO and Rhesus blood groups using red-cell antigens, plasma antibodies, agglutination tests, inheritance and transfusion compatibility.',
  200,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Transport Systems",
      "objective":"1.4.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Distinguish blood groups A, B, AB and O by their red-cell antigens and plasma antibodies.",
        "Interpret blood-typing tests using anti-A and anti-B sera.",
        "Explain agglutination and why incompatible red-cell transfusions are dangerous.",
        "Use an ABO compatibility table while recognising that clinical transfusion also requires Rh typing and cross-matching.",
        "Explain how ABO blood group is inherited.",
        "Explain Rhesus incompatibility in pregnancy and the purpose of anti-D immunoglobulin.",
        "State basic safety precautions when handling blood."
      ],
      "introduction":"Blood groups are determined by antigens on the surface of red blood cells. In the ABO system, the important antigens are A and B. Plasma can contain antibodies against whichever ABO antigen is absent. If a matching antibody meets its antigen on transfused red cells, agglutination can occur.",
      "sections":[
        {
          "title":"Blood group A",
          "paragraphs":[
            "Group A red blood cells carry antigen A. The plasma contains anti-B antibodies.",
            "In an ABO typing test, group A blood clumps with anti-A serum but does not clump with anti-B serum."
          ]
        },
        {
          "title":"Blood group B",
          "paragraphs":[
            "Group B red blood cells carry antigen B. The plasma contains anti-A antibodies.",
            "In an ABO typing test, group B blood does not clump with anti-A serum but clumps with anti-B serum."
          ]
        },
        {
          "title":"Blood group AB",
          "paragraphs":[
            "Group AB red blood cells carry both antigen A and antigen B. The plasma normally contains neither anti-A nor anti-B antibodies.",
            "In an ABO typing test, group AB blood clumps with both anti-A and anti-B sera."
          ]
        },
        {
          "title":"Blood group O",
          "paragraphs":[
            "Group O red blood cells carry neither antigen A nor antigen B. The plasma contains both anti-A and anti-B antibodies.",
            "In an ABO typing test, group O blood does not clump with either anti-A or anti-B serum."
          ]
        },
        {
          "title":"Agglutination",
          "paragraphs":[
            "Agglutination is the clumping of red blood cells when antibodies bind to matching antigens on their surfaces.",
            "For example, anti-A antibodies react with red cells carrying antigen A. In an incompatible transfusion, widespread agglutination and destruction of red cells can obstruct small vessels and cause a dangerous transfusion reaction."
          ]
        },
        {
          "title":"Reading the W, X, Y and Z blood test",
          "paragraphs":[
            "The SPARK question-bank table shows sample W clumping with anti-A only, so W is group A. Sample X clumps with anti-B only, so X is group B.",
            "Sample Y clumps with both sera, so Y is group AB. Sample Z does not clump with either serum, so Z is group O."
          ]
        },
        {
          "title":"ABO red-cell compatibility",
          "paragraphs":[
            "For ABO red-cell transfusion, donor red-cell antigens must not react with antibodies in the recipient plasma.",
            "Group A can receive ABO red cells from A or O. Group B can receive from B or O. Group AB can receive from A, B, AB or O in the ABO system. Group O can receive ABO red cells only from O."
          ],
          "bullets":[
            "Group O red cells have no A or B antigens. This is why school questions often describe group O as the universal donor in the ABO system.",
            "Group AB plasma has no anti-A or anti-B antibodies. This is why school questions often describe group AB as the universal recipient in the ABO system.",
            "In real transfusion practice, Rh type and other red-cell antigens also matter. O negative red cells are used when a broadly compatible emergency red-cell type is required, and compatibility testing remains essential."
          ]
        },
        {
          "title":"Cross-matching",
          "paragraphs":[
            "Before a planned transfusion, laboratory staff determine blood groups and cross-match donor red cells with recipient plasma to look for harmful reactions.",
            "Cross-matching reduces the risk of agglutination caused by ABO, Rh or other clinically important blood-group antigens."
          ]
        },
        {
          "title":"Inheritance of ABO blood group",
          "paragraphs":[
            "ABO blood group is inherited through genes from both parents. The A and B alleles are codominant, while the O allele is recessive to both A and B.",
            "A person with group A may carry A and A or A and O alleles. A person with group B may carry B and B or B and O. Group AB has one A and one B allele, while group O has two O alleles.",
            "Because group A and group B parents may each carry an O allele, some A-by-B parental combinations can produce children with group A, B, AB or O."
          ]
        },
        {
          "title":"The Rhesus factor",
          "paragraphs":[
            "The Rhesus, or Rh, system is separate from the ABO system. A person whose red cells carry the D antigen is described as Rh positive. A person without the D antigen is Rh negative.",
            "Rh type must be considered in transfusion compatibility as well as ABO type."
          ]
        },
        {
          "title":"Rhesus incompatibility in pregnancy",
          "paragraphs":[
            "An Rh-negative mother carrying an Rh-positive foetus can be exposed to small numbers of foetal Rh-positive red cells, especially around delivery. This exposure can sensitise her immune system to the D antigen.",
            "After sensitisation, maternal anti-D antibodies can cross the placenta during a later Rh-positive pregnancy and destroy foetal red blood cells. This can cause haemolytic disease of the foetus and newborn."
          ]
        },
        {
          "title":"Why anti-D is given",
          "paragraphs":[
            "Anti-D immunoglobulin is given to eligible Rh-negative pregnant women at recommended times and after events where Rh-positive foetal cells may enter the maternal circulation.",
            "The anti-D removes or neutralises Rh-positive foetal red cells before the mother develops her own long-lasting immune response, reducing the risk of sensitisation and protecting future Rh-positive pregnancies."
          ]
        },
        {
          "title":"Handling blood safely",
          "paragraphs":[
            "Blood must be treated as potentially infectious. Health workers use gloves and other infection-control procedures to reduce exposure to blood-borne pathogens such as HIV and hepatitis viruses.",
            "Gloves do not prevent agglutination. Their purpose is to reduce contact between blood and the worker."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t4-3-blood-groups",
          "type":"blood-groups",
          "title":"ABO and Rhesus blood groups"
        }
      ],
      "keyPoints":[
        "Group A has antigen A and anti-B antibodies.",
        "Group B has antigen B and anti-A antibodies.",
        "Group AB has both A and B antigens and neither anti-A nor anti-B antibodies.",
        "Group O has neither A nor B antigen and has both anti-A and anti-B antibodies.",
        "Agglutination occurs when an antibody reacts with its matching antigen on red cells.",
        "ABO typing uses anti-A and anti-B sera. Clumping shows that the corresponding antigen is present.",
        "ABO-only compatibility is a simplified school model. Rh type, other antigens and cross-matching are also important in real transfusion practice.",
        "Anti-D immunoglobulin helps prevent sensitisation of an Rh-negative mother to Rh-positive foetal red cells."
      ],
      "workedExample":{
        "title":"Identifying a blood sample",
        "prompt":"A blood sample clumps when mixed with anti-A serum but shows no clumping with anti-B serum. Identify the ABO blood group and explain your answer.",
        "steps":[
          "Clumping with anti-A means antigen A is present on the red blood cells.",
          "No clumping with anti-B means antigen B is absent.",
          "Red cells with antigen A but not antigen B are group A."
        ],
        "answer":"The sample is blood group A because its red cells carry antigen A but not antigen B."
      },
      "checks":[
        {
          "prompt":"Why does incompatible blood agglutinate?",
          "answer":"Antibodies in the plasma bind to matching antigens on red blood cells, linking the cells together into clumps.",
          "explanation":"This antigen-antibody reaction is the basis of both blood typing and dangerous incompatible transfusion reactions."
        },
        {
          "prompt":"A sample clumps with both anti-A and anti-B serum. What is its ABO group?",
          "answer":"AB.",
          "explanation":"Both antigen A and antigen B are present on the red cells."
        },
        {
          "prompt":"Why is group O called a universal donor in simplified ABO questions?",
          "answer":"Group O red cells have neither A nor B antigens, so recipient anti-A or anti-B antibodies do not react with those ABO antigens.",
          "explanation":"This statement applies to the simplified ABO red-cell model. Rh type and cross-matching are also required in clinical transfusion."
        },
        {
          "prompt":"Why may an Rh-negative mother be given anti-D immunoglobulin?",
          "answer":"To reduce the chance that she becomes sensitised to Rh-positive foetal red cells and forms long-lasting anti-D antibodies.",
          "explanation":"Preventing sensitisation lowers the risk to a later Rh-positive foetus."
        }
      ],
      "summary":"Identify ABO groups from antigens and antibodies, use agglutination to interpret blood tests, and apply compatibility rules carefully. Then add the Rhesus factor and cross-matching to understand why real transfusion safety is more detailed than the simplified ABO table."
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
  || '{"topicsBuilt":20,"objectivesBuilt":20}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 25/120: supabase/migrations/20260921024000_integrated_science_objective_151.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.5.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t5-1-excretion-egestion',
  'module-1-organisms-life-processes',
  '1.5.1 Excretion and Egestion',
  'Distinguish excretion from egestion by tracing the origin of removed materials and relating metabolic wastes to the organs that remove them.',
  210,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Excretion",
      "objective":"1.5.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define excretion and egestion.",
        "Distinguish metabolic waste from undigested or unabsorbed food.",
        "Identify carbon dioxide, urea, excess water and salts as excretory products.",
        "Relate common human excretory products to their origins and routes out of the body.",
        "Explain why faeces are mainly associated with egestion while some substances within faeces, such as bile pigments, are excretory products."
      ],
      "introduction":"Excretion and egestion both remove material from the body, but they are not the same process. The distinction depends on where the material came from. Excretion removes waste products formed by metabolism inside the body, while egestion removes undigested or unabsorbed material from the alimentary canal.",
      "sections":[
        {
          "title":"What is excretion?",
          "paragraphs":[
            "Excretion is the removal from the body of waste products produced by metabolism, together with substances present in excess.",
            "These materials have been produced by body cells or are part of the internal body environment. If they accumulate, they can disturb normal cell function."
          ]
        },
        {
          "title":"What is egestion?",
          "paragraphs":[
            "Egestion is the removal of undigested or unabsorbed food from the alimentary canal.",
            "This material was never absorbed into the internal body environment and never became part of body cells. It passes through the digestive tract and leaves through the anus."
          ]
        },
        {
          "title":"Carbon dioxide",
          "paragraphs":[
            "Carbon dioxide is produced by aerobic respiration in body cells. Because it is a metabolic waste product, its removal is excretion.",
            "Carbon dioxide is transported in the blood to the lungs and leaves the body in exhaled air. Water vapour is also lost through the lungs."
          ]
        },
        {
          "title":"Urea",
          "paragraphs":[
            "Proteins are digested to amino acids. The body cannot store large quantities of excess amino acids.",
            "In the liver, excess amino acids are deaminated. The nitrogen-containing part is converted to urea. Urea is carried in the blood to the kidneys and removed mainly in urine.",
            "Urea is therefore an excretory product because it is formed by metabolism inside the body."
          ]
        },
        {
          "title":"Water and mineral salts",
          "paragraphs":[
            "Water and mineral salts are essential to the body, but amounts above what is needed must be regulated.",
            "The kidneys remove excess water and salts in urine. Sweat glands in the skin also remove water, salts and a small amount of urea in sweat."
          ]
        },
        {
          "title":"Bile pigments",
          "paragraphs":[
            "Old red blood cells are broken down and haemoglobin is processed. Pigments formed from this breakdown are handled by the liver and released in bile into the gut.",
            "These pigments eventually leave the body in faeces. Although they leave through the alimentary canal, they are excretory products because they originated from metabolism inside the body."
          ]
        },
        {
          "title":"Why faeces are not simply an excretory product",
          "paragraphs":[
            "Faeces contain a mixture of substances. Much of the solid material is undigested food, especially fibre, plus bacteria and other material from the gut.",
            "The removal of undigested food is egestion because the food was never absorbed into body cells. This is different from excretory substances such as bile pigments that are released into the gut after being produced inside the body."
          ]
        },
        {
          "title":"Excretory organs and products",
          "bullets":[
            "Lungs: carbon dioxide and water vapour.",
            "Kidneys: urea, excess water and excess mineral salts.",
            "Skin: water, mineral salts and a small amount of urea in sweat.",
            "Liver: forms urea from excess amino acids and releases bile pigments into bile.",
            "Anus: route by which egested undigested material leaves the alimentary canal."
          ]
        },
        {
          "title":"A reliable way to distinguish the two",
          "paragraphs":[
            "Ask whether the material was produced by metabolism or entered the internal body environment. If it is a metabolic waste or an excess internal substance being removed, the process is excretion.",
            "If the material is undigested or unabsorbed food that stayed within the alimentary canal, its removal is egestion."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t5-1-excretion-egestion",
          "type":"excretion-egestion",
          "title":"Excretion or egestion?"
        }
      ],
      "keyPoints":[
        "Excretion removes metabolic wastes and excess substances from the internal body environment.",
        "Egestion removes undigested or unabsorbed food from the alimentary canal.",
        "Carbon dioxide is an excretory product of respiration.",
        "Urea is produced in the liver from the breakdown of excess amino acids.",
        "The skin excretes water, salts and a small amount of urea in sweat.",
        "Faeces are mainly associated with egestion, but bile pigments in faeces are excretory products."
      ],
      "workedExample":{
        "title":"Classifying carbon dioxide and fibre",
        "prompt":"A student says that breathing out carbon dioxide and passing out undigested fibre are both examples of excretion because both remove unwanted material. Explain why the statement is incorrect.",
        "steps":[
          "Identify the origin of carbon dioxide.",
          "Carbon dioxide is produced by respiration in body cells.",
          "Identify the origin of undigested fibre.",
          "Fibre remains in the alimentary canal and is not digested and absorbed into body cells.",
          "Classify each process according to origin."
        ],
        "answer":"Breathing out carbon dioxide is excretion because carbon dioxide is a metabolic waste produced by respiration. Passing out undigested fibre is egestion because the fibre was never absorbed into body cells."
      },
      "checks":[
        {
          "prompt":"What is excretion?",
          "answer":"The removal from the body of waste products produced by metabolism and substances present in excess.",
          "explanation":"Examples include carbon dioxide, urea and excess water and salts."
        },
        {
          "prompt":"Why is passing out faeces usually described as egestion?",
          "answer":"Much of the material is undigested or unabsorbed food that never entered body cells.",
          "explanation":"Egestion concerns material remaining in the alimentary canal rather than metabolic wastes from cells."
        },
        {
          "prompt":"Why is urea an excretory product?",
          "answer":"It is formed in the liver from the breakdown of excess amino acids.",
          "explanation":"Because it is produced by metabolism inside the body, its removal is excretion."
        },
        {
          "prompt":"Bile pigments leave the body in faeces. Why are they still described as excretory products?",
          "answer":"They originate from the breakdown of substances inside the body, including haemoglobin from old red blood cells.",
          "explanation":"Classification depends on the origin of the material, not only the route by which it leaves."
        }
      ],
      "summary":"To distinguish excretion from egestion, trace the material back to its origin. Metabolic waste from inside the body is excreted. Undigested or unabsorbed food that stayed in the alimentary canal is egested."
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
  || '{"topicsBuilt":21,"objectivesBuilt":21}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 26/120: supabase/migrations/20260921024500_integrated_science_objective_152.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.5.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t5-2-human-excretion-mechanisms',
  'module-1-organisms-life-processes',
  '1.5.2 Excretion by the Lungs, Skin and Kidneys',
  'Explain how the lungs, skin and kidneys remove metabolic wastes and regulate water and salts, including nephron function, ADH and dialysis.',
  220,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Excretion",
      "objective":"1.5.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain how carbon dioxide and water vapour are excreted by the lungs.",
        "Explain how sweat glands excrete water, mineral salts and a small amount of urea.",
        "Describe the gross structure of the kidney and the route of urine to the bladder.",
        "Explain ultrafiltration and selective reabsorption in the nephron.",
        "Relate ADH to water reabsorption and urine concentration.",
        "Explain the principles of dialysis when kidneys fail."
      ],
      "introduction":"The lungs, skin and kidneys all remove substances from the internal body environment, but they do so in different ways. The lungs remove gaseous wastes, the skin removes substances in sweat, and the kidneys filter the blood and regulate its water and salt content.",
      "sections":[
        {
          "title":"Excretion by the lungs",
          "paragraphs":[
            "Carbon dioxide is produced during aerobic respiration in body cells and is carried in the blood to the lungs.",
            "At the alveoli, carbon dioxide diffuses from the blood into the air spaces because its concentration is higher in the blood than in the alveolar air. It leaves the body when the person exhales.",
            "Water vapour is also lost from the moist respiratory surfaces and leaves in exhaled air."
          ]
        },
        {
          "title":"Excretion by the skin",
          "paragraphs":[
            "Sweat glands in the dermis produce sweat containing mainly water and mineral salts, with a small amount of urea.",
            "Sweat travels through ducts to pores at the skin surface. When it evaporates, heat is removed from the skin, helping to cool the body.",
            "When the body is too hot, more sweat is produced and blood vessels near the skin surface dilate so more heat can be lost."
          ]
        },
        {
          "title":"Gross structure of the kidney",
          "paragraphs":[
            "The kidney has an outer cortex, an inner medulla and a central pelvis. The pelvis collects urine and leads into the ureter.",
            "The ureter carries urine from each kidney to the bladder. The bladder stores urine before it leaves through the urethra.",
            "Many glomeruli and Bowman''s capsules are found in the cortex, while loops of Henle and collecting ducts extend into the medulla."
          ]
        },
        {
          "title":"The nephron",
          "paragraphs":[
            "A nephron is the functional unit of the kidney. It begins with Bowman''s capsule surrounding a glomerulus and continues through the proximal coiled tubule, loop of Henle, distal tubule and collecting duct."
          ]
        },
        {
          "title":"Ultrafiltration",
          "paragraphs":[
            "Blood enters the glomerulus under relatively high pressure. Water and small dissolved substances such as glucose, urea and mineral salts are forced through the filtration barrier into Bowman''s capsule.",
            "Blood cells and large plasma proteins normally remain in the blood because they are too large to pass through the filtration barrier."
          ]
        },
        {
          "title":"Selective reabsorption",
          "paragraphs":[
            "Useful substances are returned from the filtrate to the blood as the filtrate passes along the nephron.",
            "In a healthy person, all filtered glucose is normally reabsorbed, mainly in the proximal coiled tubule. Much of the water and needed mineral salts are also reabsorbed.",
            "The remaining fluid contains urea together with excess water and mineral salts. This becomes urine and passes into collecting ducts."
          ]
        },
        {
          "title":"Water balance and ADH",
          "paragraphs":[
            "Antidiuretic hormone, ADH, helps regulate the amount of water reabsorbed by the kidney tubules and collecting ducts.",
            "When a person loses much water through sweating, the blood becomes more concentrated. More ADH is released by the pituitary gland, more water is reabsorbed, and a small volume of concentrated urine is produced.",
            "After drinking a large amount of water, less ADH is released. Less water is reabsorbed and a larger volume of dilute urine is produced."
          ]
        },
        {
          "title":"What healthy urine contains",
          "paragraphs":[
            "Healthy urine normally contains water, urea and dissolved mineral salts. It should not normally contain significant amounts of glucose or large proteins.",
            "Protein molecules are normally too large to pass through the glomerular filtration barrier. Glucose is filtered but normally reabsorbed completely."
          ]
        },
        {
          "title":"Dialysis",
          "paragraphs":[
            "If the kidneys fail, wastes and excess water and salts can accumulate in the blood. Dialysis can remove these substances from the blood.",
            "In haemodialysis, the patient''s blood flows past dialysis fluid across a partially permeable membrane. Urea diffuses from the blood into the dialysis fluid because the fluid initially contains little or no urea.",
            "The dialysis fluid contains glucose and appropriate mineral salts at concentrations similar to normal blood so that useful substances are not lost in large amounts.",
            "Dialysis can keep a patient alive but is time-consuming, expensive and carries risks such as infection. A kidney transplant may be another treatment option for some patients."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t5-2-human-excretion-mechanisms",
          "type":"human-excretion-mechanisms",
          "title":"Human excretion mechanisms"
        }
      ],
      "keyPoints":[
        "The lungs excrete carbon dioxide and water vapour.",
        "Sweat contains water, mineral salts and a small amount of urea.",
        "Ultrafiltration occurs at the glomerulus and Bowman''s capsule.",
        "Selective reabsorption returns useful substances such as glucose to the blood.",
        "ADH increases water reabsorption and reduces urine volume when the body needs to conserve water.",
        "Healthy urine normally contains urea, water and salts but not significant glucose or large proteins.",
        "Dialysis removes urea and excess water and salts when kidneys fail."
      ],
      "workedExample":{
        "title":"Explaining concentrated urine on a hot day",
        "prompt":"A student plays football in the hot sun and drinks very little water. Later, the student produces a small volume of dark urine. Explain the change.",
        "steps":[
          "The student loses water by sweating.",
          "The blood becomes more concentrated.",
          "The pituitary releases more ADH.",
          "The kidney tubules and collecting ducts reabsorb more water.",
          "Less water remains in the urine, so the urine volume is small and more concentrated."
        ],
        "answer":"Water loss in sweat increases ADH release. More water is reabsorbed by the kidneys, producing a small volume of concentrated urine."
      },
      "checks":[
        {
          "prompt":"What is ultrafiltration?",
          "answer":"The filtration of water and small dissolved substances from blood in the glomerulus into Bowman''s capsule under pressure.",
          "explanation":"Blood cells and large proteins normally remain in the blood."
        },
        {
          "prompt":"Why is glucose normally absent from the urine of a healthy person?",
          "answer":"Although glucose is filtered at the glomerulus, it is normally completely reabsorbed into the blood.",
          "explanation":"Most glucose reabsorption occurs in the proximal coiled tubule."
        },
        {
          "prompt":"How does ADH affect urine when the body is short of water?",
          "answer":"More ADH increases water reabsorption, producing a smaller volume of more concentrated urine.",
          "explanation":"This helps conserve body water."
        },
        {
          "prompt":"Why does dialysis fluid contain glucose and salts at concentrations similar to normal blood?",
          "answer":"So there is little or no concentration gradient causing useful glucose and necessary salts to leave the blood.",
          "explanation":"The main aim is to remove wastes such as urea and correct excess water and salt levels."
        }
      ],
      "summary":"Excretion by the lungs, skin and kidneys depends on different mechanisms. Diffusion removes carbon dioxide at the lungs, sweat glands release water and salts at the skin, and the kidneys use filtration, selective reabsorption and hormonal control to regulate the blood and form urine."
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
  || '{"topicsBuilt":22,"objectivesBuilt":22}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 27/120: supabase/migrations/20260921025000_integrated_science_objective_153.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.5.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t5-3-excretion-flowering-plants',
  'module-1-organisms-life-processes',
  '1.5.3 Excretion in Flowering Plants',
  'Identify how flowering plants remove gaseous wastes, excess water and stored waste products through stomata and tissue shedding.',
  230,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Excretion",
      "objective":"1.5.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify oxygen, carbon dioxide and water vapour as substances flowering plants may remove.",
        "Explain how stomata provide a route for gaseous wastes and excess water vapour.",
        "Compare gaseous outputs in bright light and darkness.",
        "Explain how waste substances stored in leaves or bark can be removed when those tissues are shed.",
        "Explain why flowering plants do not require specialised excretory organs like kidneys."
      ],
      "introduction":"Flowering plants do not have specialised excretory organs such as kidneys. They produce fewer toxic metabolic wastes than animals, can reuse some products, and remove other substances by diffusion, transpiration or storage in tissues that are later shed.",
      "sections":[
        {
          "title":"Gases leave through stomata",
          "paragraphs":[
            "Stomata are pores in the leaf epidermis controlled by guard cells. They provide a route for gas exchange between the leaf and the surrounding air.",
            "Excess oxygen produced during photosynthesis can diffuse out through stomata. Carbon dioxide produced by respiration can also diffuse out when it is not being used rapidly by photosynthesis."
          ]
        },
        {
          "title":"Water vapour",
          "paragraphs":[
            "Water evaporates from moist cell surfaces inside the leaf and diffuses out through stomata as water vapour. This loss of water vapour is part of transpiration.",
            "When water loss exceeds the amount needed by the plant, the excess water is therefore removed through the leaves."
          ]
        },
        {
          "title":"Bright light and darkness",
          "paragraphs":[
            "In bright light, photosynthesis usually occurs faster than respiration in green leaves. More oxygen is produced than the plant needs for respiration, so excess oxygen diffuses out.",
            "At night, photosynthesis stops because light is unavailable, but respiration continues. Carbon dioxide produced by respiration is therefore released."
          ]
        },
        {
          "title":"Storage in leaves and bark",
          "paragraphs":[
            "Some waste products are stored in plant tissues such as old leaves or bark. Examples include tannins and other compounds that the plant does not need to keep in active tissues.",
            "When old leaves fall or bark peels away, the stored waste leaves the plant with the shed tissue."
          ]
        },
        {
          "title":"Why no specialised excretory organs are needed",
          "paragraphs":[
            "Plants can reuse several metabolic products. Carbon dioxide from respiration can be used in photosynthesis, while oxygen from photosynthesis can be used in respiration.",
            "Many plant wastes are produced relatively slowly, can diffuse directly through stomata or can be isolated safely in tissues. This reduces the need for a specialised excretory system."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t5-3-plant-excretion",
          "type":"plant-excretion",
          "title":"Excretion in flowering plants"
        }
      ],
      "keyPoints":[
        "Excess oxygen from photosynthesis can diffuse out through stomata.",
        "Carbon dioxide from respiration is released when it is not being used by photosynthesis.",
        "Water vapour leaves mainly through stomata during transpiration.",
        "At night respiration continues while photosynthesis stops, so carbon dioxide is released.",
        "Some wastes are stored in leaves or bark and removed when those tissues are shed.",
        "Plants can reuse some metabolic products and therefore do not need kidney-like excretory organs."
      ],
      "workedExample":{
        "title":"Comparing a leaf in daylight and darkness",
        "prompt":"A green leaf is kept in bright sunlight and another similar leaf is kept in darkness. State the main gaseous waste expected from each and explain the difference.",
        "steps":[
          "In bright light, both photosynthesis and respiration occur.",
          "Photosynthesis is usually faster, so more oxygen is produced than is needed for respiration.",
          "In darkness, photosynthesis stops but respiration continues.",
          "Respiration produces carbon dioxide."
        ],
        "answer":"The leaf in bright light mainly releases excess oxygen, while the leaf in darkness releases carbon dioxide because respiration continues but photosynthesis stops."
      },
      "checks":[
        {
          "prompt":"Through which structures do leaves mainly lose excess water vapour?",
          "answer":"Through stomata.",
          "explanation":"Water vapour diffuses from internal leaf air spaces through the stomatal pores."
        },
        {
          "prompt":"Why can a green plant release carbon dioxide at night?",
          "answer":"Respiration continues at night while photosynthesis stops.",
          "explanation":"Without photosynthesis using the carbon dioxide, the gas diffuses out."
        },
        {
          "prompt":"How can a plant remove wastes stored in old leaves?",
          "answer":"The wastes leave the plant when the old leaves are shed.",
          "explanation":"Some waste compounds are isolated in tissues that are later discarded."
        },
        {
          "prompt":"Why do plants not need specialised excretory organs like kidneys?",
          "answer":"They produce fewer toxic wastes, reuse some metabolic products, and can remove other wastes by diffusion or tissue shedding.",
          "explanation":"Their waste-removal needs differ from those of animals."
        }
      ],
      "summary":"Flowering plants excrete by using existing structures rather than specialised organs. Stomata release gases and water vapour, while some wastes are stored in leaves or bark and removed when those tissues are shed."
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
  || '{"topicsBuilt":23,"objectivesBuilt":23}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 28/120: supabase/migrations/20260921025500_integrated_science_objective_161.sql
-- ============================================================================
-- CSEC Integrated Science objective 1.6.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t6-1-sense-organs-functions',
  'module-1-organisms-life-processes',
  '1.6.1 Sense Organs and Their Functions',
  'Describe the eye, ear, nose, tongue and skin as sense organs containing receptors that detect stimuli and produce nerve impulses.',
  240,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Sense Organs and Coordination",
      "objective":"1.6.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Name the five major sense organs and the main stimuli they detect.",
        "Explain that receptors convert stimuli into nerve impulses.",
        "Distinguish photoreceptors, mechanoreceptors and chemoreceptors by the stimuli they detect.",
        "Explain how smell contributes to the flavour of food.",
        "Explain why receptor density affects sensitivity in different parts of the skin."
      ],
      "introduction":"A stimulus is a change in the internal or external environment that can be detected. Sense organs contain specialised receptor cells that respond to particular stimuli and convert them into nerve impulses that travel towards the central nervous system.",
      "sections":[
        {
          "title":"Receptors and stimuli",
          "paragraphs":[
            "Receptors are specialised cells or nerve endings that detect specific kinds of change. When stimulated strongly enough, they generate electrical nerve impulses.",
            "The nervous system receives and processes these impulses, allowing the body to become aware of changes and respond appropriately."
          ]
        },
        {
          "title":"The eye",
          "paragraphs":[
            "The eye detects light. Light-sensitive receptor cells called rods and cones are found in the retina.",
            "These photoreceptors convert light energy into nerve impulses that pass along the optic nerve towards the brain."
          ]
        },
        {
          "title":"The ear",
          "paragraphs":[
            "The ear detects sound vibrations. Mechanoreceptors in the inner ear respond when sound causes structures to vibrate.",
            "Other receptors in the inner ear respond to movement and position of the head and therefore contribute to balance."
          ]
        },
        {
          "title":"The nose",
          "paragraphs":[
            "The nose detects chemicals carried in the air. Odour molecules dissolve in the mucus lining the nose and stimulate chemoreceptors.",
            "The resulting nerve impulses travel to the brain and are interpreted as smell."
          ]
        },
        {
          "title":"The tongue",
          "paragraphs":[
            "Taste buds on the tongue contain chemoreceptors that detect chemicals dissolved in saliva.",
            "Taste and smell work together to produce flavour. When the nose is blocked during a cold, fewer smell signals reach the brain and food may seem to have little flavour even though taste receptors are still working."
          ]
        },
        {
          "title":"The skin",
          "paragraphs":[
            "The skin contains receptors for touch, pressure, pain and temperature. Different receptor types respond to different kinds of stimulus.",
            "Sensitivity varies across the body. Fingertips contain many touch receptors packed into a small area and are therefore especially sensitive to fine touch."
          ]
        },
        {
          "title":"From stimulus to response",
          "paragraphs":[
            "A general sequence is: stimulus, receptor, nerve impulse, central nervous system and then, where appropriate, a response.",
            "This same principle forms the basis of later work on neurones, reflex actions and coordination."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t6-1-sense-organs",
          "type":"sense-organs",
          "title":"Sense organs and receptors"
        }
      ],
      "keyPoints":[
        "The eye detects light using photoreceptors in the retina.",
        "The ear detects sound and contributes to balance using mechanoreceptors.",
        "The nose detects chemicals in the air using chemoreceptors.",
        "The tongue detects chemicals dissolved in saliva using taste receptors.",
        "The skin contains receptors for touch, pressure, pain and temperature.",
        "Receptors convert stimuli into nerve impulses.",
        "Smell contributes strongly to flavour.",
        "Areas with a high density of touch receptors, such as fingertips, are especially sensitive."
      ],
      "workedExample":{
        "title":"Why food tastes bland during a cold",
        "prompt":"A student with a blocked nose says that food has almost no flavour, even though the tongue is not injured. Explain why.",
        "steps":[
          "Taste buds still detect chemicals dissolved in saliva.",
          "A blocked nose reduces the movement of odour molecules to smell receptors.",
          "Fewer smell impulses reach the brain.",
          "Flavour depends on information from both taste and smell."
        ],
        "answer":"Food seems bland because smell is reduced. Taste receptors on the tongue still work, but fewer odour signals combine with taste information to create flavour."
      },
      "checks":[
        {
          "prompt":"Which sense organ detects chemicals dissolved in saliva?",
          "answer":"The tongue.",
          "explanation":"Taste receptors in taste buds respond to chemicals dissolved in saliva."
        },
        {
          "prompt":"What do sensory receptors produce when they are stimulated?",
          "answer":"Nerve impulses.",
          "explanation":"Receptors convert stimulus energy into electrical signals in the nervous system."
        },
        {
          "prompt":"Why are fingertips highly sensitive to touch?",
          "answer":"They contain a high density of touch receptors.",
          "explanation":"More receptors in a small area allow finer discrimination of touch."
        },
        {
          "prompt":"Which sense organ detects chemicals in the air?",
          "answer":"The nose.",
          "explanation":"Odour molecules stimulate chemoreceptors after dissolving in nasal mucus."
        }
      ],
      "summary":"Each sense organ contains receptors specialised for particular stimuli. These receptors convert changes such as light, sound, chemicals, pressure or temperature into nerve impulses that the nervous system can process."
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
  || '{"topicsBuilt":24,"objectivesBuilt":24}'::jsonb,
updated_at=now()
where id='integrated-science';

-- ============================================================================
-- SOURCE 29/120: supabase/migrations/20260921030000_integrated_science_objective_162.sql
-- ============================================================================
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

-- ============================================================================
-- SOURCE 30/120: supabase/migrations/20260921030500_integrated_science_objective_163.sql
-- ============================================================================
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
