-- Private inactive source calibration for original-v2 Q7/Q8 (22 marks).
BEGIN;
DO $q78$
DECLARE s jsonb:='{"p2-q7-v2::a":[{"code":"B1","kind":"B","marks":1,"description":"16 shaded tiles","field":"all","depends":[],"profile":"source-calibration","check":"Verify 16 in Design 4 shaded cell"},{"code":"B2","kind":"B","marks":1,"description":"16 unshaded, 32 total","field":"all","depends":[],"profile":"source-calibration","check":"Verify correct columns for both counts"}],"p2-q7-v2::b":[{"code":"B1","kind":"B","marks":1,"description":"shaded n²","field":"all","depends":[],"profile":"source-calibration","check":"Check shaded role"},{"code":"B2","kind":"B","marks":1,"description":"unshaded 4n","field":"all","depends":[],"profile":"source-calibration","check":"Check unshaded role"},{"code":"B3","kind":"B","marks":1,"description":"sum n²+4n","field":"all","depends":[],"profile":"source-calibration","check":"Check combination"},{"code":"B4","kind":"B","marks":1,"description":"total n(n+4) or n²+4n","field":"all","depends":[],"profile":"source-calibration","check":"Check full expression in total role"}],"p2-q7-v2::c":[{"code":"M1","kind":"M","marks":1,"description":"solve n²+4n=96","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Check valid factorisation (n+12)(n-8)=0"}},{"code":"A1","kind":"A","marks":1,"description":"positive design n=8","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"numeric","value":8,"tolerance":0.011}}],"p2-q7-v2::d":[{"code":"M1","kind":"M","marks":1,"description":"n²=225 gives positive n=15","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Check positive square root"}},{"code":"A1","kind":"A","marks":1,"description":"unshaded 4n=60","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"numeric","value":60,"tolerance":0.011}}],"p2-q8-v2::a":[{"code":"M1","kind":"M","marks":1,"description":"2(x²+6x)+23","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Correct factor 2"}},{"code":"M2","kind":"M","marks":1,"description":"(x+3)²-9","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Correct square completion"}},{"code":"M3","kind":"M","marks":1,"description":"23-18=5","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Correct compensation"}},{"code":"A1","kind":"A","marks":1,"description":"2(x+3)²+5 in required form","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Require completed square, not expanded polynomial"}}],"p2-q8-v2::b1":[{"code":"M1","kind":"M","marks":1,"description":"positive coefficient of square yields minimum","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Explain 2(x+3)²≥0"}},{"code":"A1","kind":"A","marks":1,"description":"minimum 5","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"numeric","value":5,"tolerance":0.011}}],"p2-q8-v2::b2":[{"code":"M1","kind":"M","marks":1,"description":"x+3=0 at vertex","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Verify zero squared term"}},{"code":"A1","kind":"A","marks":1,"description":"x=-3","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"numeric","value":-3,"tolerance":0.011}}],"p2-q8-v2::c":[{"code":"B1","kind":"B","marks":1,"description":"vertical axis at vertex","field":"all","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Vertical x=constant, not y=constant"}},{"code":"A1","kind":"A","marks":1,"description":"x=-3","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"sparkAnswer","answer":"x = -3","accepted":["x=-3","-3"]}}],"p2-q8-v2::d":[{"code":"M1","kind":"M","marks":1,"description":"substitute x=0","field":"working","depends":[],"profile":"source-calibration","check":{"type":"manual-verification","evidence":"Check f(0)=23"}},{"code":"A1","kind":"A","marks":1,"description":"y-axis intercept (0,23)","field":"answer","depends":[],"profile":"source-calibration","check":{"type":"coordinate","value":[0,23]}}]}'::jsonb; a jsonb:='{"p2-q7-v2::a":"16, 16, 32","p2-q7-v2::b":"shaded n^2; unshaded 4n; total n^2 + 4n","p2-q7-v2::c":"8","p2-q7-v2::d":"60","p2-q8-v2::a":"2(x + 3)^2 + 5","p2-q8-v2::b1":"5","p2-q8-v2::b2":"-3","p2-q8-v2::c":"x = -3","p2-q8-v2::d":"(0, 23)"}'::jsonb;
 old_row spark_grading_private.rubrics_v2%rowtype;
 revised jsonb; count_parts integer; invalid_parts integer;
BEGIN
 SELECT * INTO old_row FROM spark_grading_private.rubrics_v2
 WHERE subject_id='mathematics' AND paper_id='original-v2'
 AND rubric_version='source-scheme-draft-v2' FOR UPDATE;
 IF NOT FOUND OR old_row.active OR old_row.verification_status<>'draft'
 OR old_row.verified_by IS NOT NULL OR old_row.verified_at IS NOT NULL
 OR old_row.source_sha256 IS DISTINCT FROM
 encode(sha256(convert_to(old_row.criteria::text,'UTF8')),'hex')
 THEN RAISE EXCEPTION 'Math original-v2 Q7/Q8 source or approval changed'; END IF;
 IF jsonb_array_length(old_row.criteria)<>42 THEN RAISE EXCEPTION 'Source size changed'; END IF;
 SELECT count(*),count(*) FILTER(WHERE
 c->>'id' IS DISTINCT FROM c->>'sourcePartId'
 OR c->'sourceMarking'->>'answer' IS DISTINCT FROM a->>(c->>'id')
 OR jsonb_typeof(c->'sourceMarking'->'criteria') IS DISTINCT FROM 'null'
 OR (c->>'maxMarks')::integer IS DISTINCT FROM
 (SELECT sum((z->>'marks')::integer) FROM jsonb_array_elements(s->(c->>'id'))z))
 INTO count_parts,invalid_parts FROM jsonb_array_elements(old_row.criteria)c
 WHERE s ? (c->>'id');
 IF count_parts<>9 OR invalid_parts<>0 THEN
 RAISE EXCEPTION 'Source Q7/Q8 mismatch %/9; % invalid',count_parts,invalid_parts; END IF;
 SELECT jsonb_agg(CASE WHEN s ? (t.v->>'id')
 THEN jsonb_set(t.v,'{sourceMarking,criteria}',s->(t.v->>'id'))
 ELSE t.v END ORDER BY t.n) INTO revised
 FROM jsonb_array_elements(old_row.criteria) WITH ORDINALITY t(v,n);
 UPDATE spark_grading_private.rubrics_v2 SET criteria=revised,
 source_sha256=encode(sha256(convert_to(revised::text,'UTF8')),'hex')
 WHERE subject_id='mathematics' AND paper_id='original-v2'
 AND rubric_version='source-scheme-draft-v2' AND active=false
 AND verification_status='draft';
 IF NOT FOUND THEN RAISE EXCEPTION 'Q7/Q8 inactive draft update rejected'; END IF;
END $q78$;
COMMIT;