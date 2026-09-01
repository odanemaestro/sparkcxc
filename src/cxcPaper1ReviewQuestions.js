// ============================================================================
// CSEC Paper 1-style practice questions
// Done by: Odane Robinson
//
// Original questions using fresh values/wording, mapped to the lesson
// topics in App.js. QA: all 38 items were independently re-derived and
// checked against their stated `correct` option index (arithmetic,
// algebra, geometry/trig, sequences, and matrix/vector operations all
// re-computed from scratch) - no errors were found in this file.
// ============================================================================
// Original CSEC Paper 1-style practice questions based on the supplied past-paper set.
// These questions use fresh values and wording. They are mapped to the lesson topics.

export const CXC_PAPER1_REVIEW_QUESTIONS = {
  "The four basic operations with real numbers": [
    { id:"p1r-comp-001", type:"mcq", difficulty:"easy", marks:1, question:"Calculate: 18 − 4 × (3 + 2).", options:["A) −2","B) 8","C) 28","D) 88"], correct:0, explanation:"Evaluate the bracket first: 3 + 2 = 5. Then 4 × 5 = 20. Finally, 18 − 20 = −2." }
  ],
  "Fractions, decimals and percentages - conversion and calculation": [
    { id:"p1r-frac-001", type:"mcq", difficulty:"easy", marks:1, question:"A shirt costs $4,800. The price is reduced by 15%. What is the sale price?", options:["A) $4,080","B) $4,200","C) $4,320","D) $4,620"], correct:0, explanation:"A 15% reduction leaves 85%. $4,800 × 0.85 = $4,080." }
  ],
  "Ratios and proportion": [
    { id:"p1r-ratio-001", type:"mcq", difficulty:"easy", marks:1, question:"A quantity is divided in the ratio 3:5. If the smaller share is 27, what is the larger share?", options:["A) 36","B) 45","C) 48","D) 54"], correct:1, explanation:"Three parts represent 27, so one part is 9. Five parts give 5 × 9 = 45." }
  ],
  "Simple interest: principal, rate, time, amount": [
    { id:"p1r-si-001", type:"mcq", difficulty:"easy", marks:1, question:"Calculate the simple interest on $8,000 at 6% per annum for 2.5 years.", options:["A) $960","B) $1,080","C) $1,200","D) $1,280"], correct:2, explanation:"SI = PRT/100 = 8,000 × 6 × 2.5 / 100 = $1,200." }
  ],
  "Wages, salaries, overtime and income tax": [
    { id:"p1r-wage-001", type:"mcq", difficulty:"medium", marks:1, question:"A worker earns $16.00 per hour. Overtime is paid at time and a half. How much is earned for 5 overtime hours?", options:["A) $80","B) $96","C) $120","D) $128"], correct:2, explanation:"The overtime rate is 1.5 × $16 = $24 per hour. Five hours give 5 × $24 = $120." }
  ],
  "Problem solving using Venn diagrams": [
    { id:"p1r-venn-001", type:"mcq", difficulty:"medium", marks:1, question:"In a class of 40 students, 24 study French, 19 study Spanish, and 7 study both. How many study neither language?", options:["A) 4","B) 5","C) 6","D) 11"], correct:0, explanation:"French or Spanish = 24 + 19 − 7 = 36. Neither = 40 − 36 = 4. Therefore the correct answer is A." }
  ],
  "Venn diagrams with two sets": [
    { id:"p1r-venn2-001", type:"mcq", difficulty:"easy", marks:1, question:"U = {1,2,3,...,12}. A is the set of multiples of 2 and B is the set of multiples of 3. How many elements are in A ∩ B?", options:["A) 1","B) 2","C) 3","D) 4"], correct:1, explanation:"The common multiples of 2 and 3 in U are 6 and 12. Therefore n(A ∩ B) = 2." }
  ],
  "Volume of solids": [
    { id:"p1r-vol-001", type:"mcq", difficulty:"medium", marks:1, question:"A cuboid has dimensions 12 cm, 8 cm and 5 cm. What is its volume?", options:["A) 25 cm³","B) 96 cm³","C) 480 cm³","D) 960 cm³"], correct:2, explanation:"Volume = length × width × height = 12 × 8 × 5 = 480 cm³." }
  ],
  "Time, distance and speed": [
    { id:"p1r-speed-001", type:"mcq", difficulty:"medium", marks:1, question:"A car travels 150 km in 2 hours 30 minutes. What is its average speed?", options:["A) 50 km/h","B) 60 km/h","C) 65 km/h","D) 75 km/h"], correct:1, explanation:"2 hours 30 minutes = 2.5 hours. Speed = 150 ÷ 2.5 = 60 km/h." }
  ],
  "Maps and scale drawings": [
    { id:"p1r-map-001", type:"mcq", difficulty:"medium", marks:1, question:"A map has scale 1:50,000. Two villages are 6 cm apart on the map. What is the actual distance?", options:["A) 0.3 km","B) 3 km","C) 30 km","D) 300 km"], correct:1, explanation:"6 × 50,000 = 300,000 cm = 3 km." }
  ],
  "Mean, median, mode": [
    { id:"p1r-stat-001", type:"mcq", difficulty:"easy", marks:1, question:"The values are 4, 7, 9, 9, 10, 12, 14. What is the median?", options:["A) 7","B) 9","C) 10","D) 12"], correct:1, explanation:"There are seven ordered values, so the median is the fourth value, 9." }
  ],
  "Laws of indices": [
    { id:"p1r-ind-001", type:"mcq", difficulty:"easy", marks:1, question:"Simplify: x⁴ × x³.", options:["A) x⁷","B) x¹²","C) 2x⁷","D) x"], correct:0, explanation:"When multiplying powers with the same base, add the indices: x⁴ × x³ = x⁷." }
  ],
  "Factorising trinomials (ax² + bx + c)": [
    { id:"p1r-fact-001", type:"mcq", difficulty:"medium", marks:1, question:"Factorise completely: x² + 7x + 12.", options:["A) (x + 2)(x + 6)","B) (x + 3)(x + 4)","C) (x − 3)(x − 4)","D) (x + 1)(x + 12)"], correct:1, explanation:"The two numbers multiply to 12 and add to 7. They are 3 and 4, so the factorisation is (x + 3)(x + 4)." }
  ],
  "Solving simultaneous linear equations algebraically": [
    { id:"p1r-simult-001", type:"mcq", difficulty:"medium", marks:1, question:"Solve 2x + y = 11 and x − y = 1. What is x?", options:["A) 3","B) 4","C) 5","D) 6"], correct:1, explanation:"Adding the equations gives 3x = 12, so x = 4." }
  ],
  "Solving linear inequalities in one unknown": [
    { id:"p1r-ineq-001", type:"mcq", difficulty:"easy", marks:1, question:"Solve: 3x − 5 > 10.", options:["A) x > 5","B) x < 5","C) x > 15","D) x < 15"], correct:0, explanation:"3x > 15, so x > 5." }
  ],
  "Changing the subject of a formula": [
    { id:"p1r-subj-001", type:"mcq", difficulty:"medium", marks:1, question:"Make x the subject of y = 4x + 7.", options:["A) x = (y + 7)/4","B) x = 4y + 7","C) x = (y − 7)/4","D) x = 4(y − 7)"], correct:2, explanation:"Subtract 7 from both sides, then divide by 4. x = (y − 7)/4." }
  ],
  "Evaluating functions": [
    { id:"p1r-func-001", type:"mcq", difficulty:"easy", marks:1, question:"If f(x) = 3x − 2, what is f(5)?", options:["A) 8","B) 13","C) 15","D) 17"], correct:1, explanation:"f(5) = 3(5) − 2 = 15 − 2 = 13." }
  ],
  "Completing the square: a(x + h)² + k form": [
    { id:"p1r-sq-001", type:"mcq", difficulty:"medium", marks:1, question:"Express x² + 6x + 5 in completed-square form.", options:["A) (x + 3)² − 4","B) (x + 3)² + 4","C) (x + 6)² − 31","D) (x − 3)² − 4"], correct:0, explanation:"x² + 6x + 5 = (x + 3)² − 9 + 5 = (x + 3)² − 4." }
  ],
  "Gradient of a straight line": [
    { id:"p1r-grad-001", type:"mcq", difficulty:"easy", marks:1, question:"Find the gradient of the line through (2, 3) and (6, 11).", options:["A) 1/2","B) 2","C) 4","D) 8"], correct:1, explanation:"m = (11 − 3)/(6 − 2) = 8/4 = 2." }
  ],
  "Pythagoras' theorem": [
    { id:"p1r-pyth-001", type:"mcq", difficulty:"easy", marks:1, question:"A right-angled triangle has perpendicular sides of 9 cm and 12 cm. Find the hypotenuse.", options:["A) 13 cm","B) 15 cm","C) 18 cm","D) 21 cm"], correct:1, explanation:"c² = 9² + 12² = 225, so c = 15 cm." }
  ],
  "Sine rule and cosine rule": [
    { id:"p1r-trig-001", type:"mcq", difficulty:"medium", marks:1, question:"Two sides of a triangle are 7 cm and 9 cm, and the included angle is 60°. Find the third side, correct to 1 decimal place.", options:["A) 5.3 cm","B) 8.2 cm","C) 10.0 cm","D) 14.0 cm"], correct:1, explanation:"By the cosine rule, c² = 7² + 9² − 2(7)(9)cos60° = 67. Therefore c ≈ 8.2 cm." }
  ],
  "Solving simultaneous equations using matrix method": [
    { id:"p1r-mat-001", type:"mcq", difficulty:"medium", marks:1, question:"For A = [[2,1],[3,4]], what is det(A)?", options:["A) 5","B) 8","C) 11","D) 14"], correct:0, explanation:"det(A) = 2(4) − 1(3) = 5." }
  ],
  "Vectors to prove geometric results": [
    { id:"p1r-vec-001", type:"mcq", difficulty:"medium", marks:1, question:"If vector a = [3; −2] and vector b = [1; 5], find a + b.", options:["A) [4; 3]","B) [2; −7]","C) [3; 5]","D) [4; −3]"], correct:0, explanation:"Add corresponding components: [3 + 1; −2 + 5] = [4; 3]." }
  ],
  "Finding a formula for the nth term from a pattern": [
    { id:"p1r-pat-001", type:"mcq", difficulty:"easy", marks:1, question:"A sequence is 6, 10, 14, 18, ... Which expression gives the nth term?", options:["A) 2n + 4","B) 4n + 2","C) 4n + 6","D) 6n + 4"], correct:1, explanation:"The common difference is 4. Tₙ = 6 + (n − 1)4 = 4n + 2." }
  ],
  "Standard form and number bases": [
    { id:"p1r-sf-001", type:"mcq", difficulty:"easy", marks:1, question:"Express 0.00072 in standard form.", options:["A) 7.2 × 10⁻⁴","B) 7.2 × 10⁻³","C) 72 × 10⁻⁵","D) 0.72 × 10⁻³"], correct:0, explanation:"Move the decimal point four places to the right to get 7.2, so the power is −4." }
  ],
  "Algebraic fractions and variation (direct and inverse)": [
    { id:"p1r-af-001", type:"mcq", difficulty:"medium", marks:1, question:"y varies directly as x. If y = 18 when x = 6, what is y when x = 10?", options:["A) 24","B) 27","C) 30","D) 36"], correct:2, explanation:"y = kx. Since 18 = 6k, k = 3. Therefore y = 3(10) = 30." }
  ],
  "Circle theorems: tangents, chords and cyclic quadrilaterals": [
    { id:"p1r-circle-001", type:"mcq", difficulty:"medium", marks:1, question:"The angle at the centre standing on an arc is 124°. What is the angle at the circumference standing on the same arc?", options:["A) 31°","B) 62°","C) 124°","D) 248°"], correct:1, explanation:"The angle at the circumference is half the angle at the centre. 124° ÷ 2 = 62°." }
  ],
  "Transformations: reflection, rotation, translation and enlargement": [
    { id:"p1r-tr-001", type:"mcq", difficulty:"easy", marks:1, question:"The point (4, −3) is reflected in the x-axis. What are the coordinates of its image?", options:["A) (−4, −3)","B) (−4, 3)","C) (4, 3)","D) (3, 4)"], correct:2, explanation:"Reflection in the x-axis changes the sign of the y-coordinate. (4, −3) maps to (4, 3)." }
  ],
  "Cumulative frequency, quartiles and pie charts": [
    { id:"p1r-cf-001", type:"mcq", difficulty:"easy", marks:1, question:"A survey has 80 responses. What angle represents 12 responses on a pie chart?", options:["A) 36°","B) 48°","C) 54°","D) 60°"], correct:2, explanation:"Angle = 12/80 × 360° = 54°. Therefore the correct answer is C." }
  ],
  "Quadratic equations: exact roots and simultaneous linear-quadratic systems": [
    { id:"p1r-qe-001", type:"mcq", difficulty:"medium", marks:1, question:"Which is a root of x² − 5x + 6 = 0?", options:["A) 1","B) 2","C) 4","D) 5"], correct:1, explanation:"x² − 5x + 6 = (x − 2)(x − 3), so 2 and 3 are roots." }
  ],
  "Arc length of a circle": [
    { id:"p1r-arc-001", type:"mcq", difficulty:"medium", marks:1, question:"A sector has radius 10 cm and angle 72°. Find its arc length in terms of π.", options:["A) 2π cm","B) 4π cm","C) 6π cm","D) 8π cm"], correct:1, explanation:"Arc length = 72/360 × 2π(10) = 4π cm." }
  ],
  "Identifying and extending visual patterns": [
    { id:"p1r-vpat-001", type:"mcq", difficulty:"easy", marks:1, question:"A pattern has 5, 8, 11 and 14 dots in Figures 1 to 4. How many dots are in Figure 10?", options:["A) 29","B) 30","C) 32","D) 35"], correct:2, explanation:"The common difference is 3. T₁₀ = 5 + 9(3) = 32." }
  ],
  "Area of a circle and sector": [
    { id:"p1r-area-001", type:"mcq", difficulty:"medium", marks:1, question:"Find the area of a sector with radius 7 cm and angle 90°. Use π = 22/7.", options:["A) 38.5 cm²","B) 44 cm²","C) 49 cm²","D) 154 cm²"], correct:0, explanation:"Sector area = 90/360 × 22/7 × 7² = 38.5 cm²." }
  ],
  "Number sequences - finding the rule": [
    { id:"p1r-seqrule-001", type:"mcq", difficulty:"easy", marks:1, question:"The sequence 11, 15, 19, 23, ... has which nth-term formula?", options:["A) 4n + 7","B) 4n + 11","C) 3n + 8","D) 11n + 4"], correct:0, explanation:"The common difference is 4. Tₙ = 11 + (n − 1)4 = 4n + 7." }
  ],
  "Distance-time and speed-time graphs": [
    { id:"p1r-dt-001", type:"mcq", difficulty:"medium", marks:1, question:"On a distance-time graph, a horizontal section represents an object that is:", options:["A) accelerating","B) moving at constant speed","C) stationary","D) moving backwards"], correct:2, explanation:"A horizontal distance-time graph has zero gradient, so the distance does not change. The object is stationary." }
  ],
  "Bearings and navigation": [
    { id:"p1r-bearing-001", type:"mcq", difficulty:"easy", marks:1, question:"The bearing of B from A is 065°. What is the bearing of A from B?", options:["A) 115°","B) 245°","C) 295°","D) 305°"], correct:1, explanation:"Add 180° to a bearing below 180°. 65° + 180° = 245°. Therefore the correct answer is B." }
  ],
  "Position and displacement vectors": [
    { id:"p1r-posvec-001", type:"mcq", difficulty:"medium", marks:1, question:"If OA = a and OB = b, which vector represents AB?", options:["A) a + b","B) a − b","C) b − a","D) −a − b"], correct:2, explanation:"To move from A to B, use position vector of B minus position vector of A. AB = b − a." }
  ],
  "Matrix multiplication": [
    { id:"p1r-matmul-001", type:"mcq", difficulty:"medium", marks:1, question:"If A = [[1,2],[3,4]] and B = [[2,0],[1,5]], what is the top-left entry of AB?", options:["A) 2","B) 3","C) 4","D) 7"], correct:2, explanation:"The top-left entry is the first row of A dotted with the first column of B: 1(2) + 2(1) = 4. Therefore the correct answer is C." }
  ]
};
