// SPARK Physics A2 Vectors production-candidate bank.
// All items are original. `profile` is item demand, not an official
// per-objective profile label.

export const A2_OBJECTIVES = Object.freeze({
  'A2.1':'distinguish between scalars and vectors and give examples of each',
  'A2.2':'use scale diagrams to find the resultant of two vectors',
  'A2.3':'calculate the resultant of vectors which are parallel, anti-parallel and perpendicular',
  'A2.4':'explain that a single vector is equivalent to two other vectors at right angles',
});

const q=(id,objective,profile,stem,options,answer,explanation,tags=[])=>({
  id,objective,topic:'A2',profile,stem,options,answer,explanation,
  traps:options.map((_,i)=>i===answer?'':'This option uses an incorrect vector definition, direction or construction.'),tags,
});

export const A2_MCQ_BANK = Object.freeze([
  // A2.1 scalars/vectors: 10
  q('a2-1-01','A2.1','KC','Which quantity is a vector?',['Mass','Temperature','Weight','Time'],2,'Weight is a force, so it has magnitude and direction.',['classification']),
  q('a2-1-02','A2.1','KC','Which pair contains only scalar quantities?',['speed and distance','velocity and speed','force and mass','displacement and time'],0,'Speed and distance have magnitude only.',['classification']),
  q('a2-1-03','A2.1','KC','Which pair contains only vector quantities?',['energy and power','displacement and velocity','mass and weight','distance and acceleration'],1,'Displacement and velocity both require direction.',['classification']),
  q('a2-1-04','A2.1','UK','A car goes around a bend at constant speed. Which statement is correct?',['Its velocity is constant','Its velocity changes because its direction changes','Its speed must be zero','Its mass changes'],1,'Velocity is a vector, so a change of direction changes velocity even at constant speed.',['velocity']),
  q('a2-1-05','A2.1','UK','A student walks 20 m east and 20 m west, returning to the start. The distance and displacement are',['0 m and 40 m east','40 m and 0 m','20 m and 20 m west','40 m and 40 m east'],1,'Distance is total path length, 40 m; displacement is zero because final and initial positions coincide.',['distance-displacement']),
  q('a2-1-06','A2.1','KC','A vector quantity must have',['magnitude only','direction only','magnitude and direction','a positive value only'],2,'A vector is specified by both magnitude and direction.',['definition']),
  q('a2-1-07','A2.1','KC','Which quantity is NOT a vector?',['momentum','acceleration','energy','force'],2,'Energy is scalar; momentum, acceleration and force are vectors.',['classification']),
  q('a2-1-08','A2.1','UK','Two hurricane reports give “80 km/h” and “80 km/h north-west”. Which is a complete vector description?',['80 km/h only','80 km/h north-west','Both, because speed is always a vector','Neither, because vectors have no units'],1,'The second gives both magnitude and direction.',['everyday-vector']),
  q('a2-1-09','A2.1','KC','Which statement correctly compares mass and weight?',['Both are vectors','Mass is scalar and weight is vector','Mass is vector and weight is scalar','Both are scalars'],1,'Mass has magnitude only; weight is a force and has direction.',['mass-weight']),
  q('a2-1-10','A2.1','UK','A runner completes one full lap of a circular track and stops at the start. Which is zero?',['distance','speed throughout','displacement','time'],2,'The final position equals the initial position, so displacement is zero.',['distance-displacement']),

  // A2.2 scale diagrams: 10
  q('a2-2-01','A2.2','KC','In a tip-to-tail construction, where does the second vector begin?',['At the tail of the first','At the tip of the first','At the midpoint of the first','Anywhere on the page'],1,'The second vector is drawn from the tip of the first while preserving its own direction.',['scale-diagram']),
  q('a2-2-02','A2.2','KC','The resultant in a tip-to-tail diagram is drawn from',['tip of first to tail of second','tail of first to tip of second','midpoint to midpoint','tip of second to tail of first only'],1,'The resultant closes the vector triangle from the initial tail to the final tip.',['scale-diagram']),
  q('a2-2-03','A2.2','UK','Using a scale of 1 cm = 5 N, a 20 N force should be drawn with length',['2 cm','4 cm','5 cm','100 cm'],1,'20 ÷ 5 = 4 cm.',['scale','calculation']),
  q('a2-2-04','A2.2','UK','A resultant measures 6.4 cm on a diagram whose scale is 1 cm = 10 N. Its magnitude is',['0.64 N','6.4 N','64 N','640 N'],2,'6.4 × 10 = 64 N.',['scale','calculation']),
  q('a2-2-05','A2.2','KC','Why must the scale be stated on a vector diagram?',['To define how drawn lengths represent physical magnitudes','To change the directions','To avoid using a ruler','Because every vector must be vertical'],0,'Without the scale, measured line lengths cannot be converted to physical magnitudes.',['scale-diagram']),
  q('a2-2-06','A2.2','UK','Which scale is best for two forces of about 30 N on a normal page?',['1 cm = 1 N, producing lines about 30 cm long','1 cm = 10 N, producing lines about 3 cm long','1 cm = 1000 N, producing almost invisible lines','No scale'],1,'A useful scale makes the diagram large enough to measure accurately but small enough to fit.',['scale-choice']),
  q('a2-2-07','A2.2','KC','The parallelogram method and tip-to-tail method for the same two vectors should give',['different resultants','the same resultant within drawing accuracy','opposite resultants','zero resultant always'],1,'Both are valid geometric representations of vector addition.',['parallelogram']),
  q('a2-2-08','A2.2','UK','Two oblique forces are to be combined without using trigonometric calculation. Which method matches the syllabus objective?',['Add the magnitudes','Use a scale diagram','Use Pythagoras regardless of angle','Subtract the smaller from the larger'],1,'A scale construction can combine oblique vectors while preserving direction.',['oblique','scale-diagram']),
  q('a2-2-09','A2.2','KC','After drawing an oblique resultant to scale, a complete answer normally requires',['magnitude only','direction only','magnitude and direction','area of the triangle'],2,'A resultant is a vector, so both magnitude and direction are needed.',['scale-diagram','direction']),
  q('a2-2-10','A2.2','UK','A student changes the angle of one vector but keeps its drawn length unchanged. What has changed?',['Only magnitude','Only direction','Both magnitude and unit','Nothing'],1,'The length represents magnitude and is unchanged; the arrow direction has changed.',['scale-diagram','vector-definition']),

  // A2.3 calculations: 10
  q('a2-3-01','A2.3','UK','Forces of 8 N east and 6 N west act on a body. The resultant is',['2 N east','2 N west','14 N east','10 N east'],0,'Opposite collinear forces subtract; the larger total is eastward.',['anti-parallel']),
  q('a2-3-02','A2.3','UK','Forces of 4 N north and 3 N north have resultant',['1 N north','7 N north','12 N north','7 N south'],1,'Parallel vectors in the same direction add.',['parallel']),
  q('a2-3-03','A2.3','UK','A 3 N north force and a 4 N east force have resultant magnitude',['1 N','5 N','7 N','12 N'],1,'For perpendicular vectors, R = √(3²+4²)=5 N.',['perpendicular','pythagoras']),
  q('a2-3-04','A2.3','UK','A 6 N east force and an 8 N north force give a resultant of magnitude',['2 N','10 N','14 N','48 N'],1,'R = √(6²+8²)=10 N.',['perpendicular','pythagoras']),
  q('a2-3-05','A2.3','UK','For 3 N north and 4 N east, the direction of the 5 N resultant measured north of east is about',['37°','53°','90°','5°'],0,'tanθ = 3/4, so θ ≈ 36.9° north of east.',['perpendicular','direction']),
  q('a2-3-06','A2.3','UK','For 5 N east, 2 N west and 4 N east, the resultant is',['7 N east','3 N east','11 N east','1 N west'],0,'Taking east as positive: 5 − 2 + 4 = 7 N east.',['parallel','multiple-vectors']),
  q('a2-3-07','A2.3','UK','For 10 N north, 4 N south, 3 N north and 1 N south, the resultant is',['8 N north','18 N north','2 N north','8 N south'],0,'North positive: 10 − 4 + 3 − 1 = 8 N north.',['anti-parallel','four-vectors']),
  q('a2-3-08','A2.3','KC','When is Pythagoras directly appropriate for finding the magnitude of the resultant of two vectors?',['When they are parallel','When they are perpendicular','For every pair of vectors','Only when both are equal'],1,'Pythagoras applies directly when the two components are at right angles.',['perpendicular']),
  q('a2-3-09','A2.3','UK','Two perpendicular velocity components are 5 m/s east and 12 m/s north. Resultant speed is',['7 m/s','13 m/s','17 m/s','60 m/s'],1,'R = √(5²+12²)=13 m/s.',['perpendicular','velocity']),
  q('a2-3-10','A2.3','UK','A resultant from perpendicular components is 10 N, with an 8 N horizontal component. The vertical component is',['2 N','6 N','18 N','80 N'],1,'Vertical = √(10²−8²)=6 N.',['perpendicular','rearrangement']),

  // A2.4 components: 10
  q('a2-4-01','A2.4','KC','Resolving a vector means',['changing its magnitude','replacing it with perpendicular components having the same combined effect','making it a scalar','reversing it'],1,'Resolution expresses one vector as perpendicular component vectors.',['components']),
  q('a2-4-02','A2.4','UK','A 20 N force acts at 60° above the horizontal. Its horizontal component is',['10 N','17.3 N','20 N','34.6 N'],0,'Horizontal = 20 cos60° = 10 N.',['components','cosine']),
  q('a2-4-03','A2.4','UK','A 20 N force acts at 60° above the horizontal. Its vertical component is approximately',['10 N','17.3 N','20 N','40 N'],1,'Vertical = 20 sin60° ≈ 17.3 N.',['components','sine']),
  q('a2-4-04','A2.4','UK','A 50 N force acts at 30° above the horizontal. Which expression gives its horizontal component?',['50 sin30°','50 cos30°','50 tan30°','50/cos30°'],1,'The horizontal component is adjacent to an angle measured from the horizontal.',['components','cosine']),
  q('a2-4-05','A2.4','UK','A 50 N force acts at 30° above the horizontal. Which expression gives its vertical component?',['50 sin30°','50 cos30°','50/tan30°','50+30'],0,'The vertical component is opposite an angle measured from the horizontal.',['components','sine']),
  q('a2-4-06','A2.4','KC','Why can perpendicular components replace the original vector?',['They have the same combined vector effect','They always have the same magnitude individually','They remove direction','They must both point horizontally'],0,'Vector addition of the components reconstructs the original vector.',['components','equivalence']),
  q('a2-4-07','A2.4','UK','A velocity of 10 m/s is directed 37° above the horizontal. Taking cos37°≈0.80 and sin37°≈0.60, the components are',['8 m/s horizontal and 6 m/s vertical','6 m/s horizontal and 8 m/s vertical','10 m/s each','4 m/s horizontal and 3 m/s vertical'],0,'Components are 10cos37°=8 and 10sin37°=6.',['components','calculation']),
  q('a2-4-08','A2.4','UK','If the angle of a vector is measured from the vertical instead of the horizontal, which rule is safest?',['Always use cosine horizontally','Always use sine vertically','Identify the side adjacent and opposite to the stated angle before choosing sine or cosine','Add both components'],2,'Sine/cosine choice depends on which axis the angle is measured from.',['components','angle-reference']),
  q('a2-4-09','A2.4','UK','A 30 N force is horizontal. Its horizontal and vertical components are',['0 N and 30 N','30 N and 0 N','30 N and 30 N','15 N and 15 N'],1,'At 0° to the horizontal, Fcos0°=F and Fsin0°=0.',['components','boundary-case']),
  q('a2-4-10','A2.4','UK','A 24 N force is vertical upward. Relative to horizontal and vertical axes, its components are',['24 N horizontal, 0 N vertical','0 N horizontal, 24 N vertical','12 N each','24 N each'],1,'A vertical vector has no horizontal component and its full magnitude is vertical.',['components','boundary-case']),
]);

function makeFlashcards(){
  const prompts={
    'A2.1':[
      ['Scalar?','A quantity with magnitude only.'],['Vector?','A quantity with magnitude and direction.'],['Scalar examples?','Mass, time, distance, speed, energy, temperature.'],['Vector examples?','Displacement, velocity, acceleration, force, weight, momentum.'],['Why is displacement a vector while distance is a scalar?','Distance is total path length; displacement includes straight-line change in position and direction.'],['Why is velocity a vector while speed is a scalar?','Speed is scalar; velocity includes direction.'],
    ],
    'A2.2':[
      ['Tip-to-tail rule?','Draw the second vector from the tip of the first, preserving its direction.'],['Where is the resultant drawn?','From the tail of the first vector to the tip of the final vector.'],['Why state the scale?','So measured drawing lengths can be converted to physical magnitudes.'],['What must a scale-diagram answer include?','Magnitude and direction.'],['Alternative construction?','Draw both vectors from one point and complete the parallelogram; the diagonal is the resultant.'],['Best scale?','One that makes the diagram large enough to measure accurately while fitting the page.'],
    ],
    'A2.3':[
      ['Same-direction parallel vectors?','Add their magnitudes and keep the common direction.'],['Anti-parallel vectors?','Subtract using a sign convention; direction follows the larger total.'],['Perpendicular resultant magnitude?','R = √(A²+B²).'],['Perpendicular resultant direction?','Use tanθ = opposite/adjacent and state the reference direction.'],['Why use signs for collinear vectors?','They preserve direction automatically in the arithmetic.'],['Calculation syllabus limit?','Four or fewer vectors.'],
    ],
    'A2.4':[
      ['What are vector components?','Perpendicular vectors that together have the same effect as the original vector.'],['Angle measured from horizontal: horizontal component?','F cosθ.'],['Angle measured from horizontal: vertical component?','F sinθ.'],['Why can components be treated separately?','Their vector sum reconstructs the original vector.'],['How do you avoid mixing sine and cosine?','Mark the given angle and identify adjacent and opposite components.'],['A horizontal vector has what vertical component?','Zero.'],
    ],
  };
  const out=[];
  for(const [objective,cards] of Object.entries(prompts)) cards.forEach(([front,back],i)=>out.push({id:`fc-${objective.toLowerCase().replace('.','-')}-${i+1}`,objective,topic:'A2',front,back}));
  return out;
}
export const A2_FLASHCARDS=Object.freeze(makeFlashcards());

export function buildA2TopicTest({seed=1,count=12}={}){
  if(count<4) throw new Error('A2 topic test must contain at least 4 questions to cover all objectives.');
  let state=(Number(seed)>>>0)||1; const rnd=()=>((state=(1664525*state+1013904223)>>>0)/4294967296);
  const chosen=[];
  for(const obj of Object.keys(A2_OBJECTIVES)){
    const pool=A2_MCQ_BANK.filter(x=>x.objective===obj); chosen.push(pool[Math.floor(rnd()*pool.length)]);
  }
  const remaining=A2_MCQ_BANK.filter(x=>!chosen.some(c=>c.id===x.id));
  while(chosen.length<count&&remaining.length){const idx=Math.floor(rnd()*remaining.length);chosen.push(remaining.splice(idx,1)[0]);}
  for(let i=chosen.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[chosen[i],chosen[j]]=[chosen[j],chosen[i]];}
  return chosen;
}
