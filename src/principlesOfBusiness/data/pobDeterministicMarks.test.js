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
 test("limits scoring to three explicit listing parts",()=>{
  expect(POB_DETERMINISTIC_LISTING_KEYS).toHaveLength(3);
  expect(gradePobListingPart(Q+"1:e","A limited company suits the business")).toBeNull();
 });
 test("ungraded narratives prevent publication of a made-up overall score",()=>{
  const review=reviewPobPaper2({[Q+"2:a"]:"Planning; organising"});
  expect(review.questions[1].parts[0].assessedMarks).toBe(2);
  expect(review.confirmedMarks).toBe(2);
  expect(review.fullyAssessed).toBe(false);
  expect(review.assessedMarks).toBeNull();
  expect(review.unresolvedParts).toBe(0);
 });
});
