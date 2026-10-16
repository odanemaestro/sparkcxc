import {gradePobListingPart,POB_DETERMINISTIC_LISTING_KEYS} from "./pobDeterministicMarks";
import {reviewPobPaper2} from "./pobRubricReview";
const Q="POB-SPARK-P2-ORIGINAL-01-Q";
describe("calibrated exact-listing partial marks",()=>{
 test("gives partial credit for one of two management functions",()=>{
  expect(gradePobListingPart(Q+"2:a","Planning").marks).toBe(1);
  expect(gradePobListingPart(Q+"2:a","Leading and controlling").marks).toBe(2);
  expect(gradePobListingPart(Q+"2:a","Planning and planning").marks).toBe(1);
 });
 test("accepts any two different marketing Ps except price",()=>{
  expect(gradePobListingPart(Q+"3:b","Place and promotion").marks).toBe(2);
  expect(gradePobListingPart(Q+"3:b","Price and place").marks).toBe(1);
 });
 test("accepts distinct shipment documents and caps scores",()=>{
  expect(gradePobListingPart(Q+"4:b","Bill of lading; commercial invoice; delivery note").marks).toBe(3);
  expect(gradePobListingPart(Q+"4:b","Invoice and invoice").marks).toBe(1);
 });
 test("does not credit directly negated terms",()=>{
  expect(gradePobListingPart(Q+"2:a","Not planning, but leading").marks).toBe(1);
 });
 test("state three distinct start-up investigation areas, with criterion-matched partial credit",()=>{
  const q=Q+"1:b";
  expect(gradePobListingPart(q,"I would check customer demand, startup costs and food safety regulations")).toMatchObject({marks:3,criterionMarks:[1,1,1]});
  expect(gradePobListingPart(q,"I would check suppliers and health requirements")).toMatchObject({marks:1,criterionMarks:[0,0,1]});
  expect(gradePobListingPart(q,"Not market demand. Instead, assess capital and licensing.")).toMatchObject({marks:2,criterionMarks:[0,1,1]});
 });
 test("limits scoring to four explicitly bounded listing parts",()=>{
  expect(POB_DETERMINISTIC_LISTING_KEYS).toHaveLength(4);
  expect(gradePobListingPart(Q+"1:e","A limited company suits the business")).toBeNull();
 });
 test("ungraded narratives prevent publication of a made-up overall score",()=>{
  const review=reviewPobPaper2({[Q+"2:a"]:"Planning; organising"});
  expect(review.questions[1].parts[0].assessedMarks).toBe(2);
  expect(review.confirmedMarks).toBe(2);
  expect(review.fullyAssessed).toBe(true);
  expect(review.assessedMarks).toBe(2);
  expect(review.unresolvedParts).toBe(0);
 });
});
