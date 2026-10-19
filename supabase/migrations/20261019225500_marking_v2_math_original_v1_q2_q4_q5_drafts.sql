-- SPARK Mathematics original-v1 calibrated source draft: Q2, Q4, Q5.
-- Source-based method and accuracy allocations. Manual steps remain
-- unresolved; no reviewer approval or paper activation is created.
begin;
do $calibrate$
declare
 v_schemes jsonb := '{"p2-q2-v1::a":[{"code":"M1","kind":"M","marks":1,"description":"Correctly obtains 12x^5y^5 in the numerator, then reduces the indices","field":"working","depends":[],"profile":"algorithmic","check":{"type":"containsEquivalentExpression","value":"12x^5y^5"}},{"code":"A1","kind":"A","marks":1,"description":"Simplifies to 2xy^3","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"expression","value":"2xy^3"}}],"p2-q2-v1::b1":[{"code":"M1","kind":"M","marks":1,"description":"Extracts the common factor 4 to obtain 4(m^2-25n^2)","field":"working","depends":[],"profile":"algorithmic","check":{"type":"containsEquivalentExpression","value":"4(m^2-25n^2)"}},{"code":"A1","kind":"A","marks":1,"description":"Factorises the difference of squares completely as 4(m-5n)(m+5n)","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"expression","value":"4(m-5n)(m+5n)","requireFullyFactorised":true}}],"p2-q2-v1::b2":[{"code":"M1","kind":"M","marks":1,"description":"Splits 5x into 8x-3x and groups common factors","field":"working","depends":[],"profile":"algorithmic","check":{"type":"containsEquivalentExpression","value":"2x(x+4)-3(x+4)"}},{"code":"A1","kind":"A","marks":1,"description":"Factorises fully to (2x-3)(x+4)","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"expression","value":"(2x-3)(x+4)","requireFullyFactorised":true}}],"p2-q2-v1::c1":[{"code":"B1","kind":"B","marks":1,"description":"Derives simplified perimeter 8w+8","field":"answer","depends":[],"profile":"accuracy","check":{"type":"expression","value":"8w+8"}}],"p2-q2-v1::c2":[{"code":"B1","kind":"B","marks":1,"description":"Solves 8w+8=44 giving width 4.5 cm","field":"answer","depends":[],"profile":"accuracy","check":{"type":"manual-verification","evidence":"Confirm solving for w: 8w=36, w=4.5 cm. Accept equivalent rearrangement and do not confuse the width with the length."}},{"code":"B2","kind":"B","marks":1,"description":"Uses width 4.5 cm to obtain length 17.5 cm","field":"answer","depends":[],"profile":"accuracy","check":{"type":"manual-verification","evidence":"Confirm length 3w+4=17.5 cm. Accept ECF from a wrong width if correctly substituted, according to the question''s source rubric."}}],"p2-q4-v1::a1":[{"code":"B1","kind":"B","marks":1,"description":"Evaluates f(4)=2(4)+7=15","field":"answer","depends":[],"profile":"accuracy","check":{"type":"numeric","value":15,"tolerance":0.001}}],"p2-q4-v1::c":[{"code":"M1","kind":"M","marks":1,"description":"Rearranges x^2-3=13 to x^2=16","field":"working","depends":[],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Evidence of adding 3 to both sides, x²=16, or equivalent equation reasoning."}},{"code":"A1","kind":"A","marks":1,"description":"Obtains both roots +4 and -4","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"set","value":[4,-4],"tolerance":0.001}}],"p2-q5-v1::a":[{"code":"B1","kind":"B","marks":1,"description":"Selects the modal class 16 to 20 kilograms","field":"answer","depends":[],"profile":"accuracy","check":{"type":"sparkAnswer","answer":"16 - 20","accepted":["16-20","16 to 20","16–20"]}}],"p2-q5-v1::b":[{"code":"M1","kind":"M","marks":1,"description":"Uses appropriate class midpoints and frequencies for an estimate","field":"working","depends":[],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Check midpoints 3,8,13,18 with frequencies 4,8,12,16, or equivalent valid midpoint layout."}},{"code":"M2","kind":"M","marks":1,"description":"Correctly sums frequency multiplied by midpoint to 520","field":"working","depends":["M1"],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Verify 4(3)+8(8)+12(13)+16(18)=520 or an equivalent correctly assembled ∑fx."}},{"code":"A1","kind":"A","marks":1,"description":"Divides 520 by 40 to estimate mean 13 kg","field":"answer","depends":["M2"],"profile":"accuracy","check":{"type":"numeric","value":13,"tolerance":0.011}}],"p2-q5-v1::c":[{"code":"B1","kind":"B","marks":1,"description":"Cumulative frequency at 10.5 kg equals 12","field":"answer","depends":[],"profile":"accuracy","check":{"type":"manual-verification","evidence":"Verify cumulative frequency value 12 in the correct row, not an arbitrary occurrence in a free-text response."}},{"code":"B2","kind":"B","marks":1,"description":"Cumulative frequency at 15.5 kg equals 24","field":"answer","depends":[],"profile":"accuracy","check":{"type":"manual-verification","evidence":"Verify cumulative frequency value 24 in the correct row, not an arbitrary occurrence in a free-text response."}},{"code":"B3","kind":"B","marks":1,"description":"Cumulative frequency at 20.5 kg equals 40","field":"answer","depends":[],"profile":"accuracy","check":{"type":"manual-verification","evidence":"Verify cumulative frequency value 40 in the correct row; the given first row is 4 and must not be counted as a missing cell."}}],"p2-q5-v1::d":[{"code":"M1","kind":"M","marks":1,"description":"Identifies 16 of 40 parcels are above 15 kg","field":"working","depends":[],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Requires the 16 parcels in mass class 16-20 and total 40; accept proportional approaches equivalent to 16/40."}},{"code":"A1","kind":"A","marks":1,"description":"Reduces the probability to fraction 2/5","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"fraction","value":0.4,"requireFraction":true,"simplified":true}}]}'::jsonb;
 v_expected jsonb := '{"p2-q2-v1::a":"2xy^3","p2-q2-v1::b1":"4(m - 5n)(m + 5n)","p2-q2-v1::b2":"(2x - 3)(x + 4)","p2-q2-v1::c1":"8w + 8","p2-q2-v1::c2":"width 4.5 cm, length 17.5 cm","p2-q4-v1::a1":"15","p2-q4-v1::c":"4 and -4","p2-q5-v1::a":"16 - 20","p2-q5-v1::b":"13","p2-q5-v1::c":"4, 12, 24, 40","p2-q5-v1::d":"2/5"}'::jsonb;
 v_paper spark_grading_private.rubrics_v2%rowtype;
 v_updated jsonb;
 v_count int;
 v_invalid int;
begin
 select * into v_paper from spark_grading_private.rubrics_v2
 where subject_id='mathematics' and paper_id='original-v1'
 and rubric_version='source-scheme-draft-v2' for update;
 if not found or v_paper.active or v_paper.verification_status<>'draft'
  or v_paper.verified_by is not null or v_paper.verified_at is not null
  or v_paper.source_sha256 is distinct from
   encode(pg_catalog.sha256(convert_to(v_paper.criteria::text,'UTF8')),'hex') then
  raise exception 'Math original-v1 draft approval or source changed';
 end if;
 select count(*),count(*) filter(where
  c->>'id' is distinct from c->>'sourcePartId'
  or c->'sourceMarking'->>'answer' is distinct from v_expected->>(c->>'id')
  or jsonb_typeof(c->'sourceMarking'->'criteria') is distinct from 'null'
  or (c->>'maxMarks')::int is distinct from
   (select sum((k->>'marks')::int) from jsonb_array_elements(v_schemes->(c->>'id')) k)
 ) into v_count,v_invalid
 from jsonb_array_elements(v_paper.criteria)c
 where v_schemes ? (c->>'id');
 if v_count<>11 or v_invalid<>0 then
  raise exception 'Math source mismatch, found %/11, invalid %',v_count,v_invalid;
 end if;
 select jsonb_agg(
  case when v_schemes ? (c.part->>'id')
   then jsonb_set(c.part,'{sourceMarking,criteria}',v_schemes->(c.part->>'id'))
   else c.part end order by c.ordinal
 ) into v_updated
 from jsonb_array_elements(v_paper.criteria) with ordinality c(part,ordinal);
 if jsonb_array_length(v_updated)<>jsonb_array_length(v_paper.criteria) then
  raise exception 'Math source row count drifted';
 end if;
 update spark_grading_private.rubrics_v2
 set criteria=v_updated,
 source_sha256=encode(pg_catalog.sha256(convert_to(v_updated::text,'UTF8')),'hex')
 where subject_id='mathematics' and paper_id='original-v1'
  and rubric_version='source-scheme-draft-v2'
  and active=false and verification_status='draft';
 if not found then raise exception 'Math draft-only update rejected'; end if;
end $calibrate$;
commit;
