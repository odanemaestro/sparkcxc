export const A6_OBJECTIVES=Object.freeze({
  'A6.1':'define pressure and apply definition',
  'A6.2':'relate the pressure at a point in a fluid to its depth and the density',
  'A6.3':'apply Archimedes’ principle to predict whether a body would float or sink in a given fluid',
});
const q=(id,objective,profile,stem,options,answer,explanation,traps,tags=[])=>({id,objective,topic:'A6',profile,stem,options,answer,explanation,traps,tags});
export const A6_MCQ_BANK=Object.freeze([
  q('a6-1-01','A6.1','KC','Pressure is defined as',
    ['force per unit area acting normally to a surface','force multiplied by area','mass per unit volume','work done per unit time'],0,'Pressure is normal force divided by area.',['','Multiplying force and area does not define pressure.','That is density.','That is power.'],['pressure']),
  q('a6-1-02','A6.1','KC','The pascal is equivalent to',
    ['N m','N m⁻¹','N m⁻²','kg m s⁻¹'],2,'1 Pa = 1 N/m² = 1 N m⁻².',['That is the unit form used for moment.','This is not pressure.','','That is momentum.'],['pressure','units']),
  q('a6-1-03','A6.1','UK','A force of 200 N acts normally on an area of 0.50 m². The pressure is',
    ['100 Pa','200 Pa','400 Pa','800 Pa'],2,'p = F/A = 200/0.50 = 400 Pa.',['This multiplies F by A.','This copies the force.','','This doubles again.'],['pressure','calculation']),
  q('a6-1-04','A6.1','UK','A 60 kg person stands on one foot of area 0.020 m². Take g = 10 N/kg. The pressure on the ground is',
    ['300 Pa','3000 Pa','30 000 Pa','300 000 Pa'],2,'Weight = 60×10 = 600 N; pressure = 600/0.020 = 30 000 Pa.',['This omits factors of 100.','This is too small by factor ten.','','This is too large by factor ten.'],['pressure','weight']),
  q('a6-1-05','A6.1','UK','Why do wide tyres reduce the pressure exerted on soft ground?',
    ['They reduce the vehicle mass','They increase the contact area for approximately the same force','They increase the force','They remove gravity'],1,'For the same weight, increasing contact area reduces F/A.',['Mass does not have to change.','','Increasing force would increase pressure.','Gravity still acts.'],['pressure','area']),
  q('a6-1-06','A6.1','UK','An area of 25 cm² is equal to',
    ['2.5 × 10⁻⁵ m²','2.5 × 10⁻⁴ m²','2.5 × 10⁻³ m²','0.25 m²'],2,'1 cm² = 10⁻⁴ m², so 25 cm² = 25×10⁻⁴ = 2.5×10⁻³ m².',['This is too small by 100.','This is too small by 10.','','This is far too large.'],['pressure','area-conversion']),

  q('a6-2-01','A6.2','KC','For a fluid at rest, pressure due to the fluid at depth h is given by',
    ['p = ρgh','p = ρg/h','p = h/(ρg)','p = Fh'],0,'The hydrostatic pressure due to the fluid column is p = ρgh.',['','Depth is multiplied, not divided.','This is the reciprocal form.','This is not the hydrostatic relation.'],['fluid-pressure']),
  q('a6-2-02','A6.2','UK','At 3.0 m below the surface of water of density 1000 kg/m³, taking g = 10 N/kg, the pressure due to the water is',
    ['3000 Pa','30 000 Pa','100 000 Pa','300 000 Pa'],1,'p = ρgh = 1000×10×3.0 = 30 000 Pa.',['This omits a factor of ten.','','100 000 Pa is roughly atmospheric pressure, not the water-column pressure here.','This is too large by factor ten.'],['fluid-pressure','calculation']),
  q('a6-2-03','A6.2','KC','Two points are at the same horizontal level in the same connected liquid at rest. Their pressures are',
    ['always different if the container widths differ','the same','zero','determined by the total liquid volume only'],1,'Pressure at equal depth in the same connected fluid at rest is equal.',['Container width does not set pressure at equal depth.','','Pressure need not be zero.','Total volume is not the controlling quantity.'],['fluid-pressure','same-level']),
  q('a6-2-04','A6.2','UK','Why is a dam generally made thicker near the bottom?',
    ['Water density increases greatly near the bottom','Water pressure increases with depth','Gravity is stronger near the bottom','The water volume above has no effect'],1,'Hydrostatic pressure rises with depth.',['For ordinary water the density change is negligible here.','','g is effectively constant over the dam height.','The weight of the fluid column is exactly why pressure increases.'],['fluid-pressure','application']),
  q('a6-2-05','A6.2','UK','Two vessels contain the same liquid to the same depth but have different shapes. Ignoring surface pressure differences, the pressure at the bottom is',
    ['greater in the wider vessel','greater in the narrower vessel','the same in both','proportional to total liquid mass only'],2,'p = ρgh depends on density, g and depth, not vessel shape.',['Width is not in the formula.','Width is not in the formula.','','Total liquid mass is not the determining variable at a point.'],['fluid-pressure','shape']),
  q('a6-2-06','A6.2','UK','A diver is 4.0 m below the surface of a liquid of density 800 kg/m³. Take g = 10 N/kg and atmospheric pressure as 100 kPa. The total pressure is',
    ['32 kPa','68 kPa','100 kPa','132 kPa'],3,'Fluid pressure = 800×10×4 = 32 kPa; total = 100 + 32 = 132 kPa.',['This is only the liquid contribution.','This subtracts instead of adds.','This ignores the liquid pressure.',''],['fluid-pressure','absolute-pressure']),

  q('a6-3-01','A6.3','KC','Archimedes’ principle states that the upthrust on an immersed body equals the',
    ['mass of the body','weight of fluid displaced','volume of fluid displaced','pressure at the bottom surface'],1,'Upthrust equals the weight of the displaced fluid.',['Body mass is not generally equal to upthrust.','','Volume must be converted to displaced-fluid weight using density and g.','Pressure difference produces upthrust, but this is not the principle statement.'],['archimedes']),
  q('a6-3-02','A6.3','UK','A fully immersed object displaces 0.0020 m³ of water of density 1000 kg/m³. Take g = 10 N/kg. The upthrust is',
    ['2 N','20 N','200 N','2000 N'],1,'Upthrust = ρgV = 1000×10×0.0020 = 20 N.',['This omits g.','','This is too large by factor ten.','This is too large by factor 100.'],['archimedes','calculation']),
  q('a6-3-03','A6.3','UK','A body floating at rest in water experiences',
    ['upthrust greater than its weight','upthrust equal to its weight','zero weight','zero upthrust'],1,'A floating body at rest is in vertical equilibrium, so upthrust balances weight.',['Then it would accelerate upward.','','Weight still acts.','Upthrust is required to balance weight.'],['archimedes','floating']),
  q('a6-3-04','A6.3','UK','A fully immersed object has average density 800 kg/m³ in water of density 1000 kg/m³. If released, it tends to',
    ['rise','remain neutrally buoyant','sink','lose its mass'],0,'Its weight per volume is less than the upthrust available in water, so it tends to rise.',['','Neutral buoyancy occurs when average densities are equal.','It is less dense than the water.','Mass is not lost.'],['archimedes','density']),
  q('a6-3-05','A6.3','UK','A uniform block of density 750 kg/m³ floats in water of density 1000 kg/m³. Approximately what fraction of its volume is submerged?',
    ['0.25','0.50','0.75','1.33'],2,'For floating equilibrium, fraction submerged = ρobject/ρfluid = 750/1000 = 0.75.',['That would correspond to density 250 kg/m³.','That would correspond to 500 kg/m³.','','A fraction submerged cannot exceed 1 for a surface-floating body.'],['archimedes','fraction-submerged']),
  q('a6-3-06','A6.3','UK','How can a steel ship float even though steel is denser than water?',
    ['Its overall average density, including the enclosed air space, can be less than water','The steel loses weight in water','Water has no pressure inside a ship','Archimedes’ principle does not apply to hollow objects'],0,'The hollow shape gives a large displaced volume for the ship’s mass, lowering its overall average density.',['','Its gravitational weight still exists.','Pressure acts on the hull.','Archimedes’ principle applies.'],['archimedes','boats']),
]);

export const A6_FLASHCARDS=Object.freeze(Object.entries(A6_OBJECTIVES).flatMap(([objective,syllabusWording])=>{
  const cards={
    'A6.1':[['Define pressure.','Normal force per unit area.'],['Pressure formula?','p = F/A.'],['Unit of pressure?','pascal, Pa = N m⁻².']],
    'A6.2':[['Fluid pressure formula?','p = ρgh for pressure due to the fluid column.'],['What happens to fluid pressure with depth?','It increases.'],['Same level in same connected fluid at rest?','Same pressure.']],
    'A6.3':[['State Archimedes’ principle.','Upthrust equals the weight of fluid displaced.'],['Floating equilibrium condition?','Upthrust = weight.'],['Fully immersed density rule?','Less dense rises, equal density neutral, greater density sinks.']],
  };
  return cards[objective].map(([front,back],i)=>({id:`fc-${objective.toLowerCase().replace('.','-')}-${i+1}`,objective,topic:'A6',front,back,syllabusWording}));
}));

function hashSeed(seed){let h=2166136261;for(const ch of String(seed)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function randFactory(seed){ let s=hashSeed(seed)||1; return()=>{ s=Math.imul((s^(s>>>15)),1|s); s^=s+Math.imul((s^(s>>>7)),61|s); return ((s^(s>>>14))>>>0)/4294967296; }; }
function shuffle(arr,rand){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export function buildA6ObjectiveBalancedQuiz({seed='a6',questionsPerObjective=2}={}){
  if(!Number.isInteger(questionsPerObjective)||questionsPerObjective<1||questionsPerObjective>6)throw new RangeError('questionsPerObjective must be an integer from 1 to 6');
  const rand=randFactory(seed);const selected=[];for(const objective of Object.keys(A6_OBJECTIVES)){selected.push(...shuffle(A6_MCQ_BANK.filter(q=>q.objective===objective),rand).slice(0,questionsPerObjective))}return shuffle(selected,rand);
}
