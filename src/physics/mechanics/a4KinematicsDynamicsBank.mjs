// SPARK Physics A4 Kinematics and Dynamics production-candidate bank.
// All questions are original. Item `profile` describes the demand of that
// item, not an official per-objective CXC label.

export const A4_SYLLABUS_SOURCE_WORDING = Object.freeze({
  'A4.1': 'define the terms: distance, displacement, speed, velocity, acceleration',
  'A4.2': 'apply displacement- time and velocity- time graphs',
  'A4.3': 'discuss Aristotle\'s arguments in support of his "law of motion”, that is, v  F"',
  'A4.4': "state Newton's three laws of motion",
  'A4.5': "use Newton's laws to explain dynamic systems",
  'A4.6': 'define linear momentum',
  'A4.7': 'describe situations that demonstrate the law of conservation of linear momentum',
  'A4.8': 'apply the law of conservation of linear momentum',
});

// Student-facing objective wording preserves the syllabus language while
// normalising source-PDF spacing/encoding artifacts such as "displacement- time"
// and the legacy proportional symbol in A4.3.
export const A4_OBJECTIVES = Object.freeze({
  'A4.1': 'define the terms: distance, displacement, speed, velocity, acceleration',
  'A4.2': 'apply displacement-time and velocity-time graphs',
  'A4.3': 'discuss Aristotle\'s arguments in support of his "law of motion", that is, v proportional to F',
  'A4.4': "state Newton's three laws of motion",
  'A4.5': "use Newton's laws to explain dynamic systems",
  'A4.6': 'define linear momentum',
  'A4.7': 'describe situations that demonstrate the law of conservation of linear momentum',
  'A4.8': 'apply the law of conservation of linear momentum',
});

const q=(id,objective,profile,stem,options,answer,explanation,traps,tags=[])=>({
  id,objective,topic:'A4',profile,stem,options,answer,explanation,traps,tags,
});

export const A4_MCQ_BANK = Object.freeze([
  // A4.1 definitions
  q('a4-1-01','A4.1','KC','A student walks 30 m east and then 30 m west to the starting point. What are the distance travelled and displacement?',
    ['0 m and 60 m east','60 m and 0 m','30 m and 30 m west','60 m and 60 m west'],1,
    'Distance is the total path length, 60 m. Displacement is the directed change from start to finish, which is zero.',
    ['The two quantities are reversed.','','This ignores half the path.','Returning to the start gives zero displacement.'],['distance','displacement']),
  q('a4-1-02','A4.1','KC','Which statement correctly distinguishes speed and velocity?',
    ['Speed has direction but velocity does not','Velocity is distance per unit time only','Speed is scalar; velocity includes direction','Both are always vectors'],2,
    'Speed is a scalar rate of distance travelled. Velocity is a vector rate of displacement.',
    ['The direction property is reversed.','Velocity is based on displacement.','','Speed is scalar.'],['speed','velocity']),
  q('a4-1-03','A4.1','KC','Acceleration is defined as the',
    ['rate of change of distance','rate of change of speed only','rate of change of velocity','distance travelled each second'],2,
    'Acceleration is the rate of change of velocity. A change in direction can therefore be an acceleration even at constant speed.',
    ['That is not acceleration.','Direction changes also matter.','','That describes speed.'],['acceleration']),
  q('a4-1-04','A4.1','UK','A car moves around a circular bend at a constant speed. Which statement is correct?',
    ['Its acceleration is zero because its speed is constant','Its velocity changes because its direction changes','Its displacement must be zero','Its mass increases because it turns'],1,
    'Velocity includes direction, so changing direction changes velocity and implies acceleration.',
    ['Constant speed does not mean constant velocity.','','Displacement depends on the start and end positions.','Turning does not increase mass.'],['velocity','acceleration']),
  q('a4-1-05','A4.1','UK','A cyclist changes velocity from 4 m/s east to 10 m/s east in 3 s. The acceleration is',
    ['2 m/s² east','3 m/s² east','6 m/s² east','14 m/s² east'],0,
    'a = (v - u)/t = (10 - 4)/3 = 2 m/s² east.',
    ['','This divides 10 - 4 by 2.','This gives the change in velocity, not the rate.','This adds the velocities.'],['acceleration','calculation']),

  // A4.2 motion graphs
  q('a4-2-01','A4.2','KC','On a displacement-time graph, the gradient of a straight line represents',
    ['acceleration','velocity','distance','force'],1,
    'Gradient = change in displacement / change in time, which is velocity.',
    ['That is the gradient of a velocity-time graph.','','Distance is not the gradient here.','Force is not read from this graph.'],['motion-graphs','displacement-time']),
  q('a4-2-02','A4.2','KC','On a velocity-time graph, the gradient of a straight line represents',
    ['acceleration','displacement','distance','momentum'],0,
    'Gradient = change in velocity / change in time, which is acceleration.',
    ['','Displacement comes from signed area, not gradient.','Distance requires the magnitude of area on each side of the axis.','Momentum also requires mass.'],['motion-graphs','velocity-time']),
  q('a4-2-03','A4.2','UK','A body moves at +4 m/s for 3 s and then at -2 m/s for 3 s. What are its displacement and total distance?',
    ['6 m and 18 m','18 m and 6 m','6 m and 6 m','18 m and 18 m'],0,
    'Signed area gives displacement: 4×3 + (-2)×3 = 6 m. Distance is 12 + 6 = 18 m.',
    ['','The two quantities are reversed.','Distance ignores the return section.','Displacement must include the sign of velocity.'],['motion-graphs','area','distance-v-displacement']),
  q('a4-2-04','A4.2','UK','A velocity-time graph is a straight line from 0 m/s at 0 s to 12 m/s at 4 s. The acceleration is',
    ['3 m/s²','12 m/s²','24 m/s²','48 m/s²'],0,
    'The gradient is 12/4 = 3 m/s².',
    ['','This uses the final velocity only.','This doubles the correct result.','This multiplies velocity by time.'],['motion-graphs','gradient']),
  q('a4-2-05','A4.2','UK','A velocity-time line crosses from positive velocity to negative velocity. What does the crossing of v = 0 show?',
    ['The object has zero acceleration','The object is momentarily at rest and changes direction','The total distance becomes zero','The mass of the object changes'],1,
    'At the crossing, velocity is zero. Passing from positive to negative velocity means the direction of motion reverses.',
    ['The slope may still be non-zero.','','Distance already travelled does not disappear.','Motion does not change mass.'],['motion-graphs','direction-change']),

  // A4.3 Aristotle and the development of motion ideas
  q('a4-3-01','A4.3','KC','Aristotle\'s proposed law of motion is summarized in the syllabus as',
    ['v proportional to F','F = ma','p = mv','total momentum before = total momentum after'],0,
    'Aristotle argued that a continuing force is associated with continuing motion, summarized as v proportional to F.',
    ['','This is Newton\'s second-law form used at CSEC.','This defines momentum.','This is conservation of momentum.'],['history-of-motion','aristotle']),
  q('a4-3-02','A4.3','UK','Why can Aristotle\'s view seem reasonable in everyday life?',
    ['Because friction and resistance usually slow moving objects when the push stops','Because gravity disappears when a push stops','Because mass becomes zero without a force','Because velocity is not measurable'],0,
    'Friction and other resistive forces are common, so objects often slow after the driving force is removed.',
    ['','Gravity does not disappear.','Mass does not vanish.','Velocity can be measured.'],['history-of-motion','friction']),
  q('a4-3-03','A4.3','UK','What observation most directly weakens the claim that a continuous force is needed to maintain motion?',
    ['A trolley travels farther before stopping when friction is reduced','A heavier trolley has more mass','A ruler has a centre of gravity','A spring stretches under load'],0,
    'Reducing friction lets motion persist longer, supporting the idea that stopping is caused by resistance rather than the absence of a forward force.',
    ['','That does not address whether motion needs a continuous force.','This belongs to statics.','This belongs to elasticity.'],['history-of-motion','galileo','friction']),
  q('a4-3-04','A4.3','KC','Which later idea replaced Aristotle\'s claim that a force is needed to keep an object moving?',
    ['Newton\'s first law','Hooke\'s law','Archimedes\' principle','Ohm\'s law'],0,
    'Newton\'s first law states that constant velocity continues unless a resultant force acts.',
    ['','Hooke\'s law concerns springs.','Archimedes\' principle concerns upthrust.','Ohm\'s law concerns current and potential difference.'],['history-of-motion','newton-first-law']),
  q('a4-3-05','A4.3','UK','A puck glides almost at constant velocity across a nearly frictionless surface after the push ends. This evidence is most consistent with',
    ['v proportional to applied force at every instant','Newton\'s first law','the idea that motion requires a larger mass','Hooke\'s law'],1,
    'With very small resultant force, the puck continues at nearly constant velocity, as Newton\'s first law predicts.',
    ['The applied push has ended.','','Mass alone does not require motion to stop.','No spring is involved.'],['history-of-motion','newton-first-law']),

  // A4.4 Newton's three laws
  q('a4-4-01','A4.4','KC','Newton\'s first law states that a body remains at rest or moves with constant velocity unless',
    ['its mass becomes zero','a resultant force acts','its kinetic energy becomes negative','an action-reaction pair cancels'],1,
    'A non-zero resultant force is required to change velocity.',
    ['Mass need not change.','','Kinetic energy is not negative in this context.','Third-law pairs act on different bodies.'],['newton-laws','first-law']),
  q('a4-4-02','A4.4','KC','For a constant mass, Newton\'s second law at this level is written',
    ['F = ma','F = mv','F = m/g','F = a/m'],0,
    'The resultant force equals mass multiplied by acceleration.',
    ['','mv is momentum.','This is not a force relation.','The arrangement is wrong.'],['newton-laws','second-law']),
  q('a4-4-03','A4.4','KC','Newton\'s third law says that interacting bodies exert forces that are',
    ['equal in size, opposite in direction, and act on different bodies','equal in size and act on the same body','different in size but act in the same direction','present only when both bodies are moving'],0,
    'A third-law pair consists of equal and opposite forces on different bodies.',
    ['','Forces on the same body are not a third-law pair.','The forces are equal in magnitude and opposite in direction.','The law also applies in static interactions.'],['newton-laws','third-law']),
  q('a4-4-04','A4.4','UK','A book rests on a table. Which pair is a Newton third-law pair?',
    ['The weight of the book and the normal force on the book','The force of the book on the table and the force of the table on the book','The weight of the book and the weight of the table','The normal force and friction on the book'],1,
    'The book pushes the table and the table pushes the book with equal and opposite forces on different bodies.',
    ['Both forces act on the same book.','','These are not the mutual interaction pair.','These are different interactions and may not both be present.'],['newton-laws','third-law','free-body']),
  q('a4-4-05','A4.4','UK','A 2.0 kg trolley has a resultant force of 6.0 N. Its acceleration is',
    ['0.33 m/s²','3.0 m/s²','8.0 m/s²','12 m/s²'],1,
    'a = F/m = 6.0/2.0 = 3.0 m/s².',
    ['This divides mass by force.','','This adds force and mass.','This multiplies force by mass.'],['newton-laws','second-law','calculation']),

  // A4.5 dynamic systems
  q('a4-5-01','A4.5','UK','A rocket accelerates upward in space because',
    ['it pushes against the air','the engine pushes exhaust gas backward and the gas exerts an equal opposite force on the rocket','gravity pulls it upward','its mass becomes zero'],1,
    'The rocket and exhaust gas form a Newton third-law interaction. Air is not required.',
    ['A rocket works in a vacuum.','','Gravity acts downward near a planet.','The rocket retains mass.'],['dynamic-systems','rocket','third-law']),
  q('a4-5-02','A4.5','UK','A garden sprinkler rotates as water jets leave its arms. The rotation is explained mainly by',
    ['Newton\'s third law','Hooke\'s law','Archimedes\' principle','Boyle\'s law'],0,
    'The sprinkler pushes water one way and the water exerts an opposite force on the sprinkler.',
    ['','No spring relationship is required.','No buoyancy principle is involved.','No gas pressure-volume law is required.'],['dynamic-systems','sprinkler','third-law']),
  q('a4-5-03','A4.5','UK','A person of weight 600 N is pushed upward by a trampoline with a force of 900 N. Ignoring other forces, the resultant upward force is',
    ['300 N','600 N','900 N','1500 N'],0,
    'Resultant upward force = 900 - 600 = 300 N.',
    ['','This is the weight only.','This is the trampoline force only.','Opposite forces subtract, not add.'],['dynamic-systems','resultant-force']),
  q('a4-5-04','A4.5','UK','A trolley moves at constant velocity along a horizontal track. What can be concluded about the resultant force on it?',
    ['It is zero','It must be forward','It must equal the weight','It increases with time'],0,
    'Constant velocity means zero acceleration, so the resultant force is zero.',
    ['','A forward driving force may be balanced by resistance.','Weight is vertical and may be balanced by the normal force.','No increase follows from constant velocity.'],['dynamic-systems','first-law']),
  q('a4-5-05','A4.5','UK','Two horizontal forces of 18 N east and 11 N west act on a 3.5 kg body. Its acceleration is',
    ['2.0 m/s² east','2.0 m/s² west','8.3 m/s² east','29 m/s² east'],0,
    'Resultant force = 18 - 11 = 7 N east. a = 7/3.5 = 2.0 m/s² east.',
    ['','The direction follows the larger force.','This uses an incorrect resultant.','This adds the forces and ignores mass.'],['dynamic-systems','second-law','calculation']),

  // A4.6 momentum
  q('a4-6-01','A4.6','KC','Linear momentum is defined as',
    ['mass × velocity','mass × acceleration','force × time only','half mass × speed squared'],0,
    'Linear momentum is the product of mass and velocity: p = mv.',
    ['','That is force through F = ma.','Impulse can equal change in momentum, but this is not the definition of momentum.','That is kinetic energy.'],['momentum','definition']),
  q('a4-6-02','A4.6','KC','Which is a valid unit of linear momentum?',
    ['kg m s⁻¹','kg m s⁻²','J s⁻¹','N m'],0,
    'Momentum has unit kg m s⁻¹, equivalent to N s.',
    ['','This is force.','This is power.','This is the moment unit or energy dimensions, not momentum.'],['momentum','units']),
  q('a4-6-03','A4.6','UK','A 0.50 kg ball moves east at 8.0 m/s. Its momentum is',
    ['4.0 kg m/s east','16 kg m/s east','4.0 N east','8.5 kg m/s east'],0,
    'p = mv = 0.50 × 8.0 = 4.0 kg m/s east.',
    ['','This divides incorrectly.','Momentum is not measured in newtons.','This adds instead of multiplies.'],['momentum','calculation']),
  q('a4-6-04','A4.6','UK','Taking east as positive, a 2.0 kg trolley moving west at 3.0 m/s has momentum',
    ['+6.0 kg m/s','-6.0 kg m/s','+1.5 kg m/s','-1.5 kg m/s'],1,
    'West is negative under the chosen convention, so p = 2.0 × (-3.0) = -6.0 kg m/s.',
    ['The sign ignores direction.','','This divides instead of multiplies.','Both magnitude and operation are wrong.'],['momentum','sign-convention']),
  q('a4-6-05','A4.6','KC','Why is momentum a vector?',
    ['Because it has magnitude and direction inherited from velocity','Because mass is a vector','Because its unit contains metres','Because it can never be negative'],0,
    'Mass is scalar, but velocity is vector, so momentum has the direction of the velocity.',
    ['','Mass is scalar.','Units alone do not determine vector character.','A signed component of momentum can be negative.'],['momentum','vector']),

  // A4.7 demonstrations of momentum conservation
  q('a4-7-01','A4.7','KC','In an isolated collision system, the total linear momentum',
    ['before equals the total after','after is always zero','before is always larger','depends only on the heavier body'],0,
    'With no resultant external force on the system, total momentum is conserved.',
    ['','It is zero only in some systems.','Conservation means equality, not a decrease.','All bodies in the system contribute.'],['momentum-conservation']),
  q('a4-7-02','A4.7','UK','A stationary gun fires a bullet forward. Why does the gun recoil?',
    ['The total initial momentum is zero, so the gun gains momentum opposite to the bullet','The bullet has no momentum','Gravity suddenly reverses','The gun must have the same velocity as the bullet'],0,
    'The bullet and gun acquire equal and opposite total momenta so the system total remains zero.',
    ['','The moving bullet has momentum.','Gravity is not the explanation.','Equal momentum does not mean equal velocity when masses differ.'],['momentum-conservation','recoil']),
  q('a4-7-03','A4.7','UK','Two skaters initially at rest push apart on nearly frictionless ice. Which statement best demonstrates momentum conservation?',
    ['Their momenta are equal in magnitude and opposite in direction','They move with equal velocities regardless of mass','Only the heavier skater has momentum','Both move in the same direction'],0,
    'Initial total momentum is zero, so their final momenta must add to zero.',
    ['','Equal momentum does not require equal velocity if masses differ.','Both have momentum.','They move apart in opposite directions.'],['momentum-conservation','demonstration']),
  q('a4-7-04','A4.7','KC','For momentum conservation to be applied directly to a chosen system during a short interaction, the system should have',
    ['no resultant external force or negligible external impulse','no internal forces','equal masses only','zero kinetic energy'],0,
    'Internal forces can be large, but the total momentum remains constant when external impulse is negligible.',
    ['','Internal interaction forces are expected.','Masses need not be equal.','Kinetic energy need not be zero or conserved.'],['momentum-conservation','system']),
  q('a4-7-05','A4.7','UK','Which situation is the least suitable for applying momentum conservation to the object alone without expanding the system?',
    ['A ball striking the ground while Earth is excluded from the system','Two trolleys colliding on a low-friction track','Two skaters pushing apart','A gun and bullet during firing'],0,
    'The ground exerts a large external impulse on the ball if Earth is not included in the system.',
    ['','The trolley system can be approximately isolated horizontally.','The skaters can be approximately isolated horizontally.','Gun plus bullet is the standard recoil system.'],['momentum-conservation','system-boundary']),

  // A4.8 conservation calculations
  q('a4-8-01','A4.8','UK','A 2.0 kg trolley moving at 3.0 m/s catches and sticks to a 1.0 kg trolley initially at rest. Their common velocity is',
    ['1.0 m/s','2.0 m/s','3.0 m/s','6.0 m/s'],1,
    'Initial momentum = 2.0×3.0 = 6.0 kg m/s. Total mass = 3.0 kg, so v = 6.0/3.0 = 2.0 m/s.',
    ['This divides by 6.','', 'This ignores the added mass.','This copies momentum as velocity.'],['momentum-conservation','collision','calculation']),
  q('a4-8-02','A4.8','UK','A 0.020 kg pellet moving at 200 m/s embeds in a 0.98 kg block at rest. The combined speed is',
    ['0.4 m/s','4.0 m/s','20 m/s','200 m/s'],1,
    'Initial momentum = 0.020×200 = 4.0 kg m/s. Combined mass = 1.00 kg, so speed = 4.0 m/s.',
    ['This uses 0.1 kg total mass.','','This ignores the block mass.','This assumes velocity is unchanged.'],['momentum-conservation','collision','calculation']),
  q('a4-8-03','A4.8','UK','Taking right as positive, a 1.0 kg ball travels at +6.0 m/s and rebounds at -4.0 m/s. Its change in momentum is',
    ['-10 kg m/s','-2 kg m/s','+2 kg m/s','+10 kg m/s'],0,
    'Δp = p_final - p_initial = 1(-4) - 1(6) = -10 kg m/s.',
    ['','This subtracts magnitudes without direction.','The sign is wrong.','The direction change must be included.'],['momentum','rebound','sign-convention']),
  q('a4-8-04','A4.8','UK','A 60 kg skater at rest pushes a 40 kg skater, who moves east at 3.0 m/s. Ignoring external horizontal forces, the 60 kg skater moves',
    ['2.0 m/s west','2.0 m/s east','4.5 m/s west','4.5 m/s east'],0,
    'Initial momentum is zero. 40×3 = 120 kg m/s east, so the other skater has 120 kg m/s west. v = 120/60 = 2.0 m/s west.',
    ['','The direction must oppose the other skater.','This uses the mass ratio the wrong way.','Both magnitude and direction are wrong.'],['momentum-conservation','recoil','calculation']),
  q('a4-8-05','A4.8','UK','Why must directions be assigned signs before a one-dimensional momentum calculation?',
    ['Momentum is a vector, so opposite directions must contribute with opposite signs','Mass can be negative','Time changes sign after a collision','Kinetic energy is always negative'],0,
    'Signed velocities preserve the vector direction of momentum in the conservation equation.',
    ['','Mass is not negative here.','Time does not reverse.','Kinetic energy is not negative.'],['momentum-conservation','sign-convention']),
]);

export const A4_FLASHCARDS = Object.freeze(Object.entries(A4_OBJECTIVES).flatMap(([objective,syllabusWording])=>{
  const cards={
    'A4.1': [
      ['Distance vs displacement?','Distance is total path length and is scalar. Displacement is directed change in position and is vector.'],
      ['Speed vs velocity?','Speed is distance per time and is scalar. Velocity is displacement per time and includes direction.'],
      ['Define acceleration.','Rate of change of velocity: a = (v - u)/t.'],
    ],
    'A4.2': [
      ['Gradient of a displacement-time graph?','Velocity.'],
      ['Gradient of a velocity-time graph?','Acceleration.'],
      ['Area under a velocity-time graph?','Signed area gives displacement. Total distance is found by adding the magnitudes of areas on each side of v = 0.'],
    ],
    'A4.3': [
      ["What was Aristotle's motion claim?",'A continuing force was needed for continuing motion, summarized in the syllabus as v proportional to F.'],
      ['Why did Aristotle seem reasonable?','Everyday friction and resistance make objects slow when the driving push stops.'],
      ['What observation undermined the claim?','When friction is reduced, motion persists longer; Newton later stated that constant velocity needs no resultant force.'],
    ],
    'A4.4': [
      ["Newton's first law?",'A body remains at rest or at constant velocity unless a resultant force acts.'],
      ["Newton's second law at CSEC level?",'Resultant force equals mass times acceleration: F = ma.'],
      ["Newton's third law?",'Interacting bodies exert equal and opposite forces on each other; the two forces act on different bodies.'],
    ],
    'A4.5': [
      ['Why does a rocket work in space?','It pushes exhaust gas backward; the gas pushes the rocket forward with an equal and opposite force. No air is required.'],
      ['What does zero resultant force imply?','Zero acceleration, so the body remains at rest or continues at constant velocity.'],
      ['How do you solve a dynamic system?','Choose the body, identify all forces on it, find the resultant, then apply the appropriate Newton law.'],
    ],
    'A4.6': [
      ['Define linear momentum.','p = mv, the product of mass and velocity.'],
      ['Unit of momentum?','kg m s⁻¹, equivalent to N s.'],
      ['Why is momentum directional?','Velocity is a vector, so momentum points in the same direction as velocity.'],
    ],
    'A4.7': [
      ['State conservation of linear momentum.','For a system with negligible resultant external impulse, total momentum before equals total momentum after.'],
      ['Explain recoil.','If a system begins with zero momentum, forward momentum of one part is balanced by equal momentum in the opposite direction of another part.'],
      ['What matters when choosing a momentum system?','Include the interacting bodies so external impulse during the interaction is negligible.'],
    ],
    'A4.8': [
      ['First step in a 1D momentum calculation?','Choose a positive direction and give every velocity the correct sign.'],
      ['If two bodies stick together after collision?','They share one final velocity, so final momentum is (m1 + m2)v.'],
      ['What happens to the sign when a body rebounds?','Its velocity reverses sign, so its momentum reverses direction.'],
    ],
  };
  return cards[objective].map(([front,back],i)=>({id:`fc-${objective.toLowerCase().replace('.','-')}-${i+1}`,objective,topic:'A4',front,back,syllabusWording}));
}));

export function buildA4ObjectiveBalancedQuiz({ seed = 'a4', questionsPerObjective = 1 } = {}) {
  if (!Number.isInteger(questionsPerObjective) || questionsPerObjective < 1 || questionsPerObjective > 5) {
    throw new RangeError('questionsPerObjective must be an integer from 1 to 5');
  }
  let state = 2166136261;
  for (const ch of String(seed)) { state ^= ch.charCodeAt(0); state = Math.imul(state, 16777619) >>> 0; }
  const random=()=>{ state += 0x6D2B79F5; let t=state; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; };
  const out=[];
  for(const objective of Object.keys(A4_OBJECTIVES)){
    const pool=A4_MCQ_BANK.filter(item=>item.objective===objective).slice();
    for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]];}
    out.push(...pool.slice(0,questionsPerObjective));
  }
  for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1)); [out[i],out[j]]=[out[j],out[i]];}
  return out;
}
