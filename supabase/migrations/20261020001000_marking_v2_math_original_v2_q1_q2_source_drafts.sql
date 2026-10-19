-- SPARK Mathematics original-v2 Paper 2 Questions 1 and 2.
-- Source-checked method and accuracy allocations. The exact-fraction question
-- demands the answer in fractional lowest terms, not a decimal.
-- This migration creates NO approval or active paper.
BEGIN;
DO $calibration$
DECLARE
  v_schemes jsonb := '{"p2-q1-v2::a":[{"code":"M1","kind":"M","marks":1,"field":"working","depends":[],"description":"Correctly simplifies numerator to 3/2","check":{"type":"manual-verification","evidence":"Check 3 1/5 - 1 7/10 = 16/5 - 17/10 = 3/2, including equivalent common denominators"},"profile":"source-specific"},{"code":"M2","kind":"M","marks":1,"field":"working","depends":["M1"],"description":"Correctly simplifies denominator to 5/6 and multiplies by reciprocal","check":{"type":"manual-verification","evidence":"Check 2/3+1/6=5/6 and 3/2 ÷ 5/6 = 3/2×6/5"},"profile":"source-specific"},{"code":"A1","kind":"A","marks":1,"field":"answer","depends":["M2"],"description":"States 9/5 or 1 4/5 in lowest fractional terms","check":{"type":"fraction","value":1.8,"requireFraction":true,"simplified":true},"profile":"source-specific"}],"p2-q1-v2::b1":[{"code":"M1","kind":"M","marks":1,"field":"working","depends":[],"description":"Uses 5400 / 1.2 or 5400×100/120 to recover cost price","check":{"type":"anyOf","options":[{"type":"calculation","values":[5400,1.2]},{"type":"calculation","values":[5400,100,120]}]},"profile":"source-specific"},{"code":"A1","kind":"A","marks":1,"field":"answer","depends":["M1"],"description":"Obtains cost price 4500","check":{"type":"numeric","value":4500,"tolerance":0.011},"profile":"source-specific"}],"p2-q1-v2::b2":[{"code":"M1","kind":"M","marks":1,"field":"working","depends":[],"description":"Applies 35% profit as 1.35 times cost price","check":{"type":"anyOf","options":[{"type":"calculation","values":[4500,1.35]},{"type":"calculation","values":[4500,135,100]}]},"profile":"source-specific","followThroughUses":["b1"],"followThroughFormula":"1.35*b1"},{"code":"A1","kind":"A","marks":1,"field":"answer","depends":["M1"],"description":"Gets new selling price 6075, allowing valid ECF","check":{"type":"numeric","value":6075,"tolerance":0.011},"profile":"source-specific","ecf":{"uses":["b1"],"formula":"1.35*b1"}}],"p2-q1-v2::b3":[{"code":"M1","kind":"M","marks":1,"field":"working","depends":[],"description":"Uses increase over original selling price 5400, not original cost price","check":{"type":"anyOf","options":[{"type":"calculation","values":[6075,5400]},{"type":"calculation","values":[675,5400]}]},"profile":"source-specific","followThroughUses":["b2"],"followThroughFormula":"100*(b2-5400)/5400"},{"code":"A1","kind":"A","marks":1,"field":"answer","depends":["M1"],"description":"Finds 12.5 percent increase, allowing valid ECF","check":{"type":"numeric","value":12.5,"tolerance":0.011},"profile":"source-specific","ecf":{"uses":["b2"],"formula":"100*(b2-5400)/5400"}}],"p2-q2-v2::a":[{"code":"M1","kind":"M","marks":1,"field":"working","depends":[],"description":"Multiplies numerator to 15x^5y^5 then subtracts indices in division","check":{"type":"containsEquivalentExpression","value":"15x^5y^5"},"profile":"source-specific"},{"code":"A1","kind":"A","marks":1,"field":"answer","depends":["M1"],"description":"Simplifies to 3x²y²","check":{"type":"expression","value":"3x^2y^2"},"profile":"source-specific"}],"p2-q2-v2::b1":[{"code":"M1","kind":"M","marks":1,"field":"working","depends":[],"description":"Extracts common factor 3 before the difference of squares","check":{"type":"containsEquivalentExpression","value":"3(m^2-49n^2)"},"profile":"source-specific"},{"code":"A1","kind":"A","marks":1,"field":"answer","depends":["M1"],"description":"Factorises fully to 3(m-7n)(m+7n)","check":{"type":"expression","value":"3(m-7n)(m+7n)","requireFullyFactorised":true},"profile":"source-specific"}],"p2-q2-v2::b2":[{"code":"M1","kind":"M","marks":1,"field":"working","depends":[],"description":"Splits middle term and groups factors to isolate x+3","check":{"type":"containsEquivalentExpression","value":"3x(x+3)-2(x+3)"},"profile":"source-specific"},{"code":"A1","kind":"A","marks":1,"field":"answer","depends":["M1"],"description":"Factorises fully to (3x-2)(x+3)","check":{"type":"expression","value":"(3x-2)(x+3)","requireFullyFactorised":true},"profile":"source-specific"}],"p2-q2-v2::c1":[{"code":"B1","kind":"B","marks":1,"field":"answer","depends":[],"description":"Obtains simplified perimeter 6w+10","check":{"type":"expression","value":"6w+10"},"profile":"source-specific"}],"p2-q2-v2::c2":[{"code":"B1","kind":"B","marks":1,"field":"answer","depends":[],"description":"Finds width w=6 cm by solving 6w+10=46","check":{"type":"manual-verification","evidence":"Check width and its label; width 6 cm must not be confused with length 17 cm."},"profile":"source-specific"},{"code":"B2","kind":"B","marks":1,"field":"answer","depends":[],"description":"Finds length 2(6)+5=17 cm","check":{"type":"manual-verification","evidence":"Check length and its label; accept a valid method based on correct width or consistent ECF if warranted by source."},"profile":"source-specific"}]}'::jsonb;
  v_expected jsonb := '{"p2-q1-v2::a":"9/5","p2-q1-v2::b1":"4500.00","p2-q1-v2::b2":"6075.00","p2-q1-v2::b3":"12.5","p2-q2-v2::a":"3x^2y^2","p2-q2-v2::b1":"3(m - 7n)(m + 7n)","p2-q2-v2::b2":"(3x - 2)(x + 3)","p2-q2-v2::c1":"6w + 10","p2-q2-v2::c2":"width 6 cm, length 17 cm"}'::jsonb;
  v_paper spark_grading_private.rubrics_v2%rowtype;
  v_updated jsonb;
  v_found int;
  v_bad int;
BEGIN
 SELECT * INTO v_paper FROM spark_grading_private.rubrics_v2
 WHERE subject_id='mathematics' AND paper_id='original-v2'
   AND rubric_version='source-scheme-draft-v2' FOR UPDATE;
 IF NOT FOUND OR v_paper.active OR v_paper.verification_status<>'draft'
   OR v_paper.verified_at IS NOT NULL OR v_paper.verified_by IS NOT NULL
   OR v_paper.source_sha256 IS DISTINCT FROM
    encode(pg_catalog.sha256(convert_to(v_paper.criteria::text,'UTF8')),'hex')
 THEN RAISE EXCEPTION 'Mathematics original-v2 source revision or approval changed'; END IF;
 IF jsonb_array_length(v_paper.criteria)<>42 THEN
  RAISE EXCEPTION 'Mathematics original-v2 source part count changed';
 END IF;
 SELECT count(*),count(*) FILTER(WHERE
    c->>'id' IS DISTINCT FROM c->>'sourcePartId'
    OR c->'sourceMarking'->>'answer' IS DISTINCT FROM v_expected->>(c->>'id')
    OR jsonb_typeof(c->'sourceMarking'->'criteria') IS DISTINCT FROM 'null'
    OR (c->>'maxMarks')::int IS DISTINCT FROM
       (SELECT sum((z->>'marks')::int) FROM jsonb_array_elements(v_schemes->(c->>'id')) z)
 ) INTO v_found,v_bad FROM jsonb_array_elements(v_paper.criteria)c
 WHERE v_schemes ? (c->>'id');
 IF v_found<>9 OR v_bad<>0 THEN
  RAISE EXCEPTION 'Math original-v2 Q1/Q2 scheme source mismatch: % of 9, % invalid',v_found,v_bad;
 END IF;
 SELECT jsonb_agg(
  CASE WHEN v_schemes ? (part.item->>'id')
   THEN jsonb_set(part.item,'{sourceMarking,criteria}',v_schemes->(part.item->>'id'))
   ELSE part.item END ORDER BY part.ordinal
 ) INTO v_updated FROM jsonb_array_elements(v_paper.criteria) WITH ORDINALITY part(item,ordinal);
 IF jsonb_array_length(v_updated)<>42 THEN
  RAISE EXCEPTION 'Math original-v2 paper changed while updating source';
 END IF;
 UPDATE spark_grading_private.rubrics_v2 SET
  criteria=v_updated,
  source_sha256=encode(pg_catalog.sha256(convert_to(v_updated::text,'UTF8')),'hex')
 WHERE subject_id='mathematics' AND paper_id='original-v2'
  AND rubric_version='source-scheme-draft-v2'
  AND active=false AND verification_status='draft';
 IF NOT FOUND THEN RAISE EXCEPTION 'Math original-v2 draft update not permitted'; END IF;
END $calibration$;
COMMIT;