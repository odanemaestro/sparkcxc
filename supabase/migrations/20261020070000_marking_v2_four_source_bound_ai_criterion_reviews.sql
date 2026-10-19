-- SPARK V2 pilot: four genuine AI-assisted source-criterion reviews.
-- The reviewer is explicitly an AI reviewer, not an impersonated person.
-- No paper-level verification, source activation or final score publication.
begin;
DO $pilot$
declare candidate jsonb; source_rubric spark_grading_private.rubrics_v2%rowtype;
 criterion jsonb; detail jsonb; actual integer:=0; existing integer;
 note text;
begin
 select count(*) into existing from spark_grading_private.rubric_criterion_reviews_v2;
 if existing<>0 then raise exception 'Unexpected review baseline: %',existing; end if;
 for candidate in select value from jsonb_array_elements('[{"subject":"mathematics","paper":"original-v1","id":"p2-q4-v1::a1","answer":"15","type":"numeric","value":15,"unit":null,"review":"Confirmed f(x)=2x+7, f(4)=15. Alternative numeric formatting and wrong/competing values tested."},{"subject":"mathematics","paper":"original-v2","id":"p2-q4-v2::a1","answer":"13","type":"numeric","value":13,"unit":null,"review":"Confirmed f(x)=3x-5, f(6)=13. Alternative numeric formatting and wrong/competing values tested."},{"subject":"physics","paper":"spark-phy-p02-practice-4","id":"phy-p2-4-q2::di","answer":"8.0 N","type":"value","value":8,"unit":"N","review":"Confirmed collinear 5 N + 3 N same direction gives 8 N. Force units and wrong units/numbers tested."},{"subject":"physics","paper":"spark-phy-p02-practice-4","id":"phy-p2-4-q2::dii","answer":"2.0 N","type":"value","value":2,"unit":"N","review":"Confirmed opposite collinear 5 N and 3 N gives resultant magnitude 2 N. Force units and wrong units/numbers tested."}]'::jsonb) loop
  select * into source_rubric from spark_grading_private.rubrics_v2
   where subject_id=candidate->>'subject' and paper_id=candidate->>'paper'
    and rubric_version=case when candidate->>'subject'='physics' then 'source-shape-draft-v2' else 'source-scheme-draft-v2' end for share;
  if not found or source_rubric.active or source_rubric.verification_status<>'draft'
    or source_rubric.verified_at is not null or source_rubric.verified_by is not null
    or source_rubric.source_sha256 is distinct from
       encode(pg_catalog.sha256(convert_to(source_rubric.criteria::text,'UTF8')),'hex')
    or source_rubric.expected_total_marks<>100
  then raise exception 'Unreconciled source or rubric status: %',candidate->>'paper'; end if;
  select value into criterion from jsonb_array_elements(source_rubric.criteria)value
    where value->>'id'=candidate->>'id';
  if not found or criterion->>'sourcePartId'<>candidate->>'id'
    or (criterion->>'maxMarks')::int<>1
    or criterion->'sourceMarking'->>'answer'<>candidate->>'answer'
    or jsonb_array_length(criterion->'sourceMarking'->'criteria')<>1
  then raise exception 'Criterion source mismatch: %',candidate->>'id'; end if;
  detail:=criterion->'sourceMarking'->'criteria'->0;
  if (detail->>'marks')::int<>1
    or detail->>'code' NOT IN ('B1','A1')
    or detail->'check'->>'type'<>candidate->>'type'
    or (detail->'check'->>'value')::numeric<>(candidate->>'value')::numeric
    or coalesce(detail->>'manual','false')='true'
    or coalesce(detail->>'reviewRequired','false')='true'
  then raise exception 'Unsafe source check: %',candidate->>'id'; end if;
  if candidate->>'subject'='physics' and
    (detail->'check'->>'unit'<>candidate->>'unit' or detail->>'code'<>'A1')
   then raise exception 'Incorrect Physics source unit: %',candidate->>'id'; end if;
  if candidate->>'subject'='mathematics' and
    (detail->>'code'<>'B1'
     or detail->'depends'<>'[]'::jsonb)
   then raise exception 'Unsupported dependent Mathematics check: %',candidate->>'id'; end if;
  note:='AI-assisted SPARK V2 criterion review, not human attestation; source-derived one-mark accuracy independently inspected. '
   || (candidate->>'review')
   || ' Regression evidence: src/grading/v2CriterionReviewPilot.test.js, source-target positive and negative cases. '
   || 'Final paper attestation, unresolved method review, and live score publication explicitly NOT authorized.';
  insert into spark_grading_private.rubric_criterion_reviews_v2(
   subject_id,rubric_version,paper_id,criterion_id,criterion_sha256,
   verified_by,verified_at,review_note)
  values (candidate->>'subject',source_rubric.rubric_version,candidate->>'paper',
    candidate->>'id',
    encode(pg_catalog.sha256(convert_to(criterion::text,'UTF8')),'hex'),
    'OpenAI GPT-6 (AI criterion QA, nonhuman)',clock_timestamp(),note);
  actual:=actual+1;
 end loop;
 if actual<>4 or (select count(*) from spark_grading_private.rubric_criterion_reviews_v2)<>4
 then raise exception 'Incomplete pilot criterion reviews: %',actual; end if;
end $pilot$;
commit;
