-- Explicit drafted M/A/B allocation for eight previously empty sourceMarking.criteria.
-- Hand-authored against SPARK's actual assembled paper; not reviewer attestation.
-- Unsupported method, algebra, coordinates and follow-through require examiner review.
begin;
do $v2$ declare v_data jsonb := '{"p2-q3-v1::b":[{"code":"M1","kind":"M","marks":1,"description":"Applies the translation vector (-6,2) to corresponding vertices, retaining the x/y order","field":"working","depends":[],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Check an explicit addition of (-6,2) to A, B or C"}},{"code":"A1","kind":"A","marks":1,"description":"Provides all three translated vertices A''(-5,3), B''(-1,3), C''(-5,6)","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"manual-verification","evidence":"Check all three ordered coordinate pairs with labels or unambiguous corresponding order"}}],"p2-q3-v1::c":[{"code":"M1","kind":"M","marks":1,"description":"Uses the distance formula or Pythagoras with horizontal difference 4 and vertical difference 3","field":"working","depends":[],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Require 4²+3²=25 or equivalent distance method"}},{"code":"A1","kind":"A","marks":1,"description":"Obtains BC=5.00 units","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"numeric","value":5,"tolerance":0.011}}],"p2-q4-v1::a2":[{"code":"M1","kind":"M","marks":1,"description":"Evaluates g(2)=1 before applying f","field":"working","depends":[],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Check g(2)=2²-3=1 or equivalent"}},{"code":"A1","kind":"A","marks":1,"description":"Substitutes into f and obtains fg(2)=9","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"numeric","value":9,"tolerance":0.001}}],"p2-q4-v1::b":[{"code":"M1","kind":"M","marks":1,"description":"Interchanges the roles of x and y and rearranges x=2y+7","field":"working","depends":[],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Check y=2x+7, swap x/y, then rearrange 2y=x-7"}},{"code":"A1","kind":"A","marks":1,"description":"Gives the inverse f⁻¹(x)=(x-7)/2","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"manual-verification","evidence":"Accept algebraically equivalent inverse expressions"}}],"p2-q10-v1::b":[{"code":"B1","kind":"B","marks":1,"description":"Computes det(M)=2×5-3×1=7","field":"answer","depends":[],"profile":"accuracy","check":{"type":"numeric","value":7,"tolerance":0.001}}],"p2-q1-v3::b3":[{"code":"B1","kind":"B","marks":1,"description":"Computes percentage extra cost 600/3600×100=16.67%","field":"answer","depends":[],"profile":"accuracy","check":{"type":"numeric","value":16.67,"tolerance":0.011}}],"p2-q6-v4::a":[{"code":"M1","kind":"M","marks":1,"description":"Applies arc=(120/360)×2×(22/7)×21","field":"working","depends":[],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Accept any equivalent sector arc-length formula using π=22/7"}},{"code":"A1","kind":"A","marks":1,"description":"Obtains arc length 44 cm","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"numeric","value":44,"tolerance":0.011}}],"p2-q6-v4::c":[{"code":"M1","kind":"M","marks":1,"description":"Adds arc length and two radii, 44+21+21","field":"working","depends":[],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Allow correct error-carried-forward from part (a) when consistent"}},{"code":"A1","kind":"A","marks":1,"description":"Obtains perimeter 86 cm","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"numeric","value":86,"tolerance":0.011}}]}'::jsonb;
 v_missing integer; v_bad integer;
begin
 select count(*) into v_missing
 from jsonb_each(v_data) d(key,value)
 where not exists(
 select 1 from spark_grading_private.rubrics_v2 r,
 jsonb_array_elements(r.criteria) c
 where r.subject_id='mathematics'
 and r.paper_id=split_part(d.key,'::',1) -- matched against part's real id below
 and c->>'id'=d.key
 );
 -- Paper identifiers are assembled versions (original-v1 etc), not question IDs.
 select count(*) into v_bad from jsonb_each(v_data) d(key,value)
 where not exists(
 select 1 from spark_grading_private.rubrics_v2 r,
 jsonb_array_elements(r.criteria) c
 where r.subject_id='mathematics'
 and r.paper_id='original-v'||substring(split_part(d.key,'::',1) from 'v([0-9]+)$')
 and c->>'id'=d.key
 and jsonb_typeof(c->'sourceMarking'->'criteria')='array'
 and jsonb_array_length(c->'sourceMarking'->'criteria')=0
 and (select sum((mark->>'marks')::integer)
 from jsonb_array_elements(d.value) mark)=(c->>'maxMarks')::integer
 );
 if v_bad<>0 then raise exception 'Math V2 curated source ID, current draft, or mark-total mismatch: %',v_bad; end if;
 update spark_grading_private.rubrics_v2 r
 set criteria=(select jsonb_agg(case
 when v_data ? (part->>'id') then
   jsonb_set(part,'{sourceMarking,criteria}',v_data->(part->>'id'))
 else part end order by ordinal)
 from jsonb_array_elements(r.criteria) with ordinality parts(part,ordinal))
 where r.subject_id='mathematics' and r.active=false and r.verification_status='draft'
 and exists(select 1 from jsonb_array_elements(r.criteria) part where v_data ? (part->>'id'));
end $v2$;
commit;
