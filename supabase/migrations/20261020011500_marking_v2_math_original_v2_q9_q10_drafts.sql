-- Private inactive source calibration original-v2 Q9/Q10 (21 marks).
-- Existing vetted structural allocation for Q9(b)(i) is NOT modified.
BEGIN;
DO $q910$
DECLARE s jsonb:='{"p2-q9-v2::a1":[{"code":"M1","kind":"M","marks":1,"description":"central angle twice inscribed angle","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Verify same arc AB and relevant circle theorem"}},{"code":"M2","kind":"M","marks":1,"description":"halve 128 degrees","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Check 128/2=64"}},{"code":"A1","kind":"A","marks":1,"description":"angle ACB=64 degrees","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"numeric","value":64,"tolerance":0.011}}],"p2-q9-v2::a2":[{"code":"M1","kind":"M","marks":1,"description":"OA=OB and isosceles base angles","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Check radii equality and (180-128)/2"}},{"code":"A1","kind":"A","marks":1,"description":"angle OAB=26 degrees","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"numeric","value":26,"tolerance":0.011}}],"p2-q9-v2::b2":[{"code":"M1","kind":"M","marks":1,"description":"PR²=60²+80²","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Check Pythagoras on right angle at Q"}},{"code":"A1","kind":"A","marks":1,"description":"PR=100 km","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"numeric","value":100,"tolerance":0.11}}],"p2-q9-v2::b3":[{"code":"M1","kind":"M","marks":1,"description":"bearing=055+arctan(80/60)","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Check angle ≈53.13 and correct north reference"}},{"code":"A1","kind":"A","marks":1,"description":"bearing 108 degrees","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"numeric","value":108,"tolerance":0.51}}],"p2-q10-v2::a":[{"code":"M1","kind":"M","marks":1,"description":"first matrix row 3,-1","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Check both row1 column products"}},{"code":"M2","kind":"M","marks":1,"description":"second matrix row 2,16","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Check both row2 column products"}},{"code":"A1","kind":"A","marks":1,"description":"matrix [[3,-1],[2,16]]","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"matrix","value":[[3,-1],[2,16]]}}],"p2-q10-v2::b":[{"code":"M1","kind":"M","marks":1,"description":"determinant 3×4-1×2","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Correct ad-bc subtraction"}},{"code":"A1","kind":"A","marks":1,"description":"determinant 10","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"numeric","value":10,"tolerance":0.011}}],"p2-q10-v2::c":[{"code":"M1","kind":"M","marks":1,"description":"adjugate [[4,-1],[-2,3]]","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Swap diagonal and negate off-diagonal"}},{"code":"M2","kind":"M","marks":1,"description":"divide every entry by determinant 10","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Consistent scaling of entire matrix"}},{"code":"A1","kind":"A","marks":1,"description":"inverse (1/10)[[4,-1],[-2,3]]","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"matrix","value":[[0.4,-0.1],[-0.2,0.3]],"tolerance":1e-8}}],"p2-q10-v2::d":[{"code":"M1","kind":"M","marks":1,"description":"system M[x,y]=[11,24]","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Check variable and RHS order"}},{"code":"M2","kind":"M","marks":1,"description":"apply matrix inverse","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Check [20,50]/10 intermediate column"}},{"code":"A1","kind":"A","marks":2,"description":"solution x=2 and y=5 in that order","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"ordered","value":[2,5],"tolerance":0.000001}}]}'::jsonb; a jsonb:='{"p2-q9-v2::a1":"64 degrees, because the angle at the centre is twice the angle at the circumference when both stand on the same arc AB","p2-q9-v2::a2":"26","p2-q9-v2::b2":"100","p2-q9-v2::b3":"108","p2-q10-v2::a":"[[3, -1], [2, 16]]","p2-q10-v2::b":"10","p2-q10-v2::c":"(1/10)[[4, -1], [-2, 3]]","p2-q10-v2::d":"x = 2, y = 5"}'::jsonb;
 old_row spark_grading_private.rubrics_v2%rowtype;
 revised jsonb; matched integer; invalid_parts integer;
BEGIN
 SELECT * INTO old_row FROM spark_grading_private.rubrics_v2
 WHERE subject_id='mathematics' AND paper_id='original-v2'
 AND rubric_version='source-scheme-draft-v2' FOR UPDATE;
 IF NOT FOUND OR old_row.active OR old_row.verification_status<>'draft'
 OR old_row.verified_by IS NOT NULL OR old_row.verified_at IS NOT NULL
 OR old_row.source_sha256 IS DISTINCT FROM
 encode(sha256(convert_to(old_row.criteria::text,'UTF8')),'hex')
 THEN RAISE EXCEPTION 'Math Q9/Q10 source or approval changed'; END IF;
 IF jsonb_array_length(old_row.criteria)<>42 THEN RAISE EXCEPTION 'Source paper length changed'; END IF;
 SELECT count(*),count(*) FILTER(WHERE
 c->>'id' IS DISTINCT FROM c->>'sourcePartId'
 OR c->'sourceMarking'->>'answer' IS DISTINCT FROM a->>(c->>'id')
 OR jsonb_typeof(c->'sourceMarking'->'criteria') IS DISTINCT FROM 'null'
 OR (c->>'maxMarks')::integer IS DISTINCT FROM
 (SELECT sum((z->>'marks')::integer) FROM jsonb_array_elements(s->(c->>'id'))z))
 INTO matched,invalid_parts FROM jsonb_array_elements(old_row.criteria)c
 WHERE s ? (c->>'id');
 IF matched<>8 OR invalid_parts<>0 THEN
 RAISE EXCEPTION 'Q9/Q10 source mismatch %/8; % invalid',matched,invalid_parts; END IF;
 IF (SELECT count(*) FROM jsonb_array_elements(old_row.criteria)c
 WHERE c->>'id'='p2-q9-v2::b1' AND (c->>'maxMarks')::integer=3
 AND jsonb_typeof(c->'sourceMarking'->'criteria')='array'
 AND jsonb_array_length(c->'sourceMarking'->'criteria')=3)<>1
 THEN RAISE EXCEPTION 'Preexisting Q9 bearing scheme must remain intact'; END IF;
 SELECT jsonb_agg(CASE WHEN s ? (t.v->>'id')
 THEN jsonb_set(t.v,'{sourceMarking,criteria}',s->(t.v->>'id'))
 ELSE t.v END ORDER BY t.n) INTO revised
 FROM jsonb_array_elements(old_row.criteria) WITH ORDINALITY t(v,n);
 IF jsonb_array_length(revised)<>42 OR
 (SELECT count(*) FROM jsonb_array_elements(revised)c
 WHERE jsonb_typeof(c->'sourceMarking'->'criteria')='array'
 AND jsonb_array_length(c->'sourceMarking'->'criteria')>0)<>42 OR
 (SELECT sum((c->>'maxMarks')::integer) FROM jsonb_array_elements(revised)c)<>100
 THEN RAISE EXCEPTION 'Final original-v2 42-part 100-mark draft incomplete'; END IF;
 UPDATE spark_grading_private.rubrics_v2 SET criteria=revised,
 source_sha256=encode(sha256(convert_to(revised::text,'UTF8')),'hex')
 WHERE subject_id='mathematics' AND paper_id='original-v2'
 AND rubric_version='source-scheme-draft-v2' AND active=false
 AND verification_status='draft';
 IF NOT FOUND THEN RAISE EXCEPTION 'Q9/Q10 draft-only update rejected'; END IF;
END $q910$;
COMMIT;