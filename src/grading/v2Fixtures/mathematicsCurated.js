/**
 * Hand-calibrated source-specific Mathematics answers. These fixtures use
 * the registered original Paper 2 M/A/B rules, not a generated rubric.
 * A replacement test class supersedes ONLY the broad generic fixture for
 * the same part and class, so source-derived working cannot be ignored.
 */
const F=(cls,response,expect,note)=>({cls,response,expect,note});
export const CURATED_MATHEMATICS={
 // Source requires obtaining 12x^5y^5 in the working before reduction.
 "p2-q2-v1::a":[
  F("full",{answer:"2xy^3",working:"12x^5y^5"},2,
   "source M1 numerator followed by the A1 simplified expression"),
  F("partial",{answer:"3xy^4",working:"12x^5y^5"},1,
   "source numerator obtained but final simplified result incorrect")
 ],
 // The source M1 is the extracted difference-of-squares factor.
 "p2-q2-v1::b1":[
  F("full",{answer:"4(m-5n)(m+5n)",working:"4(m^2-25n^2)"},2,
   "source common factor working and complete factorisation"),
  F("partial",{answer:"4(m^2-25n^2)",working:"4(m^2-25n^2)"},1,
   "only extracts common factor four without complete factorisation")
 ],
 // A reflected length earns B1; an independent explanation earns B2.
 "p2-q3-v1::d":[
  F("partial",{answer:"5.00 cm"},1,
   "source B1 length only; no reflection-isometry explanation")
 ],
 // Denying a many-to-one map's inverse must not earn two B marks.
 "p2-q4-v1::d":[
  F("incorrect",{answer:"Yes, g has an inverse because it is one-to-one."},0,
   "explicit opposite claim to source marking"),
  F("competing",{answer:"g does not have an inverse or g has an inverse"},0,
   "mutually contradictory conclusions")
 ],
 // M1: back bearing 220; M2: bearing 130; A1: angle 90.
 "p2-q9-v1::b1":[
  F("partial",{answer:"",working:"Bearing of P from Q = 220. Bearing of R from Q = 130."},2,
   "two source bearings shown without final 90-degree angle")
 ],
 // A false reason about the determinant is worth no B1.
 "p2-q10-v1::b2":[
  F("incorrect",{answer:"M is singular because its determinant is zero."},0,
   "states the opposite of the original source conclusion"),
  F("competing",{answer:"M is not singular or M is singular."},0,
   "two incompatible answers; no certain reason")
 ]
};