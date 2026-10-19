-- SPARK Practice Paper F: source-bound draft criteria for construction,
-- cumulative-frequency table, cumulative-frequency graph, and tile table.
-- All involve typed diagram/table artefacts. Text alone never verifies them.
-- This migration records no reviews and activates no scoring paper.
begin;
do $v2$
declare
 v_schemes jsonb := '{"p2f-q4::a1":[{"code":"B1","kind":"B","marks":1,"description":"Constructs the equal-radius arcs from A and B, intersecting above and below AB","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Inspect geometric arc artefacts from both endpoints using equal compass radii greater than 4 cm."}},{"code":"B2","kind":"B","marks":1,"description":"Rules the perpendicular bisector through both arc intersection points and M","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Inspect the submitted straight segment passing through midpoint M=(6,2), perpendicular to AB, not a freehand guess."}},{"code":"B3","kind":"B","marks":1,"description":"Leaves the compass construction arcs visible","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Verify the drawn arcs persist in the submitted construction data. A protractor-only 90 degree line is insufficient."}}],"p2f-q4::a2":[{"code":"B1","kind":"B","marks":1,"description":"Constructs angle TMB bisector from M with required compass arcs","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Verify an arc centred at M cuts MT and MB, equal arcs from both cuts intersect, and a ruled bisector connects M to their intersection. A protractor reading earns zero."}}],"p2f-q5::a":[{"code":"B0A","kind":"B","marks":0,"description":"Prerequisite cumulative frequency at upper bound 20 is 15","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Verify cell c1=15 in structured table input (0 direct marks)."}},{"code":"B0B","kind":"B","marks":0,"description":"Prerequisite cumulative frequency at upper bound 30 is 33","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Verify cell c2=33 in structured table input (0 direct marks)."}},{"code":"B1","kind":"B","marks":1,"description":"Cumulative frequency at 40 kg is 42","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Verify student table cell c3=42; do not accept 42 written in an unrelated cell."}},{"code":"B2","kind":"B","marks":1,"description":"Final cumulative frequency at 50 kg is 50","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Verify student table cell c4=50; do not accept 50 placed under the wrong class."}}],"p2f-q5::b":[{"code":"B1","kind":"B","marks":2,"description":"Plots cumulative frequencies at the five correct upper-class boundaries","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Check plotted coordinates (10,4),(20,15),(30,33),(40,42),(50,50) with both axis scales 2 cm for 10 units and correct mass/cumulative frequency axis labels. Source allocates 2 marks for points."}},{"code":"B2","kind":"B","marks":1,"description":"Draws appropriate cumulative frequency curve from plotted data","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Verify increasing curve through the correct points and valid smooth progression; inspect actual curve/path artefact, not text."}}],"p2f-q7::a":[{"code":"B1","kind":"B","marks":1,"description":"Figure 4 contains 16 shaded tiles","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Verify structured table cell q4=16."}},{"code":"B2","kind":"B","marks":1,"description":"Figure 4 contains 20 unshaded tiles","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Verify structured table cell r4=20."}},{"code":"B3","kind":"B","marks":1,"description":"Figure 10 contains 100 shaded tiles","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Verify structured table cell q10=100."}},{"code":"B4","kind":"B","marks":1,"description":"Figure 10 contains 44 unshaded tiles","profile":"visual-or-structured","field":"all","check":{"type":"manual-verification","evidence":"Verify structured table cell r10=44."}}]}'::jsonb;
 v_answers jsonb := '{"p2f-q4::a1":"the perpendicular bisector of AB through M, with the construction arcs shown","p2f-q4::a2":"the bisector of angle TMB drawn from M, with the arc at M and the two equal arcs from where it cuts MT and MB shown","p2f-q5::a":"15, 33, 42, 50","p2f-q5::b":"the points (10, 4), (20, 15), (30, 33), (40, 42), (50, 50) joined by a smooth curve","p2f-q7::a":"16, 20, 100, 44"}'::jsonb;
 v_old spark_grading_private.rubrics_v2%rowtype;
 v_updated jsonb;
 v_count integer;
 v_bad integer;
begin
 select * into v_old from spark_grading_private.rubrics_v2
 where subject_id='mathematics' and paper_id='p2f'
  and rubric_version='source-scheme-draft-v2' for update;
 if not found or v_old.active or v_old.verification_status<>'draft'
  or v_old.verified_by is not null or v_old.verified_at is not null
  or v_old.source_sha256 is distinct from
    encode(pg_catalog.sha256(convert_to(v_old.criteria::text,'UTF8')),'hex') then
  raise exception 'Mathematics Practice F source revision or approval changed';
 end if;
 select count(*),count(*) filter(where
  jsonb_typeof(c->'sourceMarking'->'criteria') is distinct from 'null'
  or c->>'id'<>c->>'sourcePartId'
  or c->'sourceMarking'->>'answer' is distinct from v_answers->>(c->>'id')
  or (c->>'maxMarks')::integer<>
   (select coalesce(sum((k->>'marks')::integer),0)
   from jsonb_array_elements(v_schemes->(c->>'id'))k)
 ) into v_count,v_bad
 from jsonb_array_elements(v_old.criteria)c
 where v_schemes ? (c->>'id');
 if v_count<>5 or v_bad<>0 then
  raise exception 'Mathematics F rich part source mismatch: % of five, % invalid',v_count,v_bad;
 end if;
 select jsonb_agg(
  case when v_schemes ? (p.part->>'id')
   then jsonb_set(p.part,'{sourceMarking,criteria}',v_schemes->(p.part->>'id'))
   else p.part end order by p.ordinal
 ) into v_updated
 from jsonb_array_elements(v_old.criteria) with ordinality p(part,ordinal);
 if jsonb_array_length(v_updated)<>jsonb_array_length(v_old.criteria) then
  raise exception 'Mathematics F part allocation changed';
 end if;
 update spark_grading_private.rubrics_v2
 set criteria=v_updated,
 source_sha256=encode(pg_catalog.sha256(convert_to(v_updated::text,'UTF8')),'hex')
 where subject_id='mathematics' and paper_id='p2f'
   and rubric_version='source-scheme-draft-v2' and active=false
   and verification_status='draft';
 if not found then raise exception 'No editable Mathematics F paper'; end if;
end $v2$;
commit;
