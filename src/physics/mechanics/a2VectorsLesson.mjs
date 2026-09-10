export const A2_LESSON = Object.freeze({
  id:'A2', title:'Vectors',
  purpose:'How to recognise quantities with direction, combine vectors and resolve one vector into perpendicular components.',
  objectives:[
    ['A2.1','distinguish between scalars and vectors and give examples of each'],
    ['A2.2','use scale diagrams to find the resultant of two vectors'],
    ['A2.3','calculate the resultant of vectors which are parallel, anti-parallel and perpendicular'],
    ['A2.4','explain that a single vector is equivalent to two other vectors at right angles'],
  ].map(([id,text])=>({id,text})),
  sections:[
    {id:'scalar-vector',heading:'Scalars and vectors',body:'A scalar has magnitude only. A vector has magnitude and direction. Mass, time, distance, speed, energy and temperature are scalars. Displacement, velocity, acceleration, force, weight and momentum are vectors.'},
    {id:'scale',heading:'Scale diagrams',body:'For two oblique vectors, choose and state a scale, draw the first vector accurately, draw the second tip-to-tail in its own direction, then draw the resultant from the tail of the first to the tip of the second. Measure both magnitude and direction. A parallelogram construction gives the same resultant.'},
    {id:'parallel',heading:'Parallel and anti-parallel vectors',body:'Vectors acting along the same line in the same direction add. Vectors acting along the same line in opposite directions subtract, and the resultant points in the direction of the larger total.'},
    {id:'perpendicular',heading:'Perpendicular vectors',body:'For perpendicular components, use Pythagoras for the magnitude and trigonometry for the direction. Always state what the angle is measured from.'},
    {id:'components',heading:'Resolving a vector',body:'A vector can be replaced by two perpendicular components that together have the same effect. If the angle is measured from the horizontal, the horizontal component is F cosθ and the vertical component is F sinθ. If the angle is measured from another axis, identify the adjacent and opposite sides before choosing sine or cosine.'},
  ],
  formulas:[
    {label:'Perpendicular resultant',equation:'R = √(A² + B²)',unit:'same unit as A and B'},
    {label:'Direction',equation:'tan θ = opposite/adjacent',unit:'degrees'},
    {label:'Horizontal component',equation:'Fₓ = F cos θ',unit:'same unit as F'},
    {label:'Vertical component',equation:'Fᵧ = F sin θ',unit:'same unit as F'},
  ],
  interactives:['Tip-to-Tail Builder','Parallelogram Resultant','Perpendicular Resultant Lab','Component Resolver'],
  stopShipTruths:[
    'Never add vector magnitudes unless the directions justify it.',
    'Never use Pythagoras for vectors that are not perpendicular.',
    'Never accept a vector result with magnitude only when direction is explicitly required.',
    'Never hard-code sine or cosine without checking which axis the stated angle is measured from.',
  ],
});
