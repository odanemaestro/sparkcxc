// SPARK Physics A5 Energy production-candidate Paper 1 / flashcard bank.
// All items are original. Item `profile` describes the demand of the item,
// not an official profile permanently attached to the syllabus objective.

export const A5_OBJECTIVES = Object.freeze({
  'A5.1':'define energy',
  'A5.2':'identify the various forms of energy',
  'A5.3':'describe the energy transformation(s) in a given situation',
  'A5.4':'apply the relationship: work = force x displacement',
  'A5.5':'discuss the use of energy from alternative sources, and its importance to the Caribbean',
  'A5.6':'define potential energy',
  'A5.7':'calculate the change in gravitational potential energy using Ep = mgh',
  'A5.8':'define kinetic energy',
  'A5.9':'calculate kinetic energies using the expression Ek = ½mv²',
  'A5.10':'apply the law of conservation of energy',
  'A5.11':'define power and apply definition',
  'A5.12':'explain the term efficiency',
  'A5.13':'calculate efficiency in given situations',
});

const q=(id,objective,profile,stem,options,answer,explanation,traps,tags=[])=>({
  id,objective,topic:'A5',profile,stem,options,answer,explanation,traps,tags,
});

export const A5_MCQ_BANK = Object.freeze([
  // A5.1 Energy definition
  q('a5-1-01','A5.1','KC','Energy is best defined as the',
    ['rate of doing work','capacity to do work','force acting per unit area','product of mass and velocity'],1,
    'Energy is the capacity to do work.',['That is power.','','That is pressure.','That is momentum.'],['definition']),
  q('a5-1-02','A5.1','KC','The SI unit of energy is the',
    ['watt','newton','joule','pascal'],2,'Energy is measured in joules (J).',['Watt is power.','Newton is force.','','Pascal is pressure.'],['units']),
  q('a5-1-03','A5.1','KC','Which pair is measured in the same SI unit?',
    ['energy and work','energy and power','force and pressure','power and momentum'],0,'Work and energy are both measured in joules.',['','Power is measured in watts.','Force and pressure have different units.','Power and momentum have different units.'],['units','work']),
  q('a5-1-04','A5.1','UK','A machine transfers 500 J from one form to another. Which statement is correct?',
    ['500 J is a power','500 J is an amount of energy','500 J is a force','500 J is an efficiency'],1,'The joule measures an amount of energy or work.',['Power requires a rate in watts.','','Force is in newtons.','Efficiency is dimensionless or a percentage.'],['definition','units']),

  // A5.2 Forms
  q('a5-2-01','A5.2','KC','A stretched elastic band stores mainly',
    ['elastic energy','kinetic energy','sound energy','nuclear energy'],0,'A stretched elastic object stores elastic potential energy.',['','It need not be moving.','Sound is associated with vibrations propagating through a medium.','Nuclear energy is associated with the nucleus.'],['forms']),
  q('a5-2-02','A5.2','KC','Which form of energy is associated with a moving trolley?',
    ['chemical','kinetic','magnetic','nuclear'],1,'A moving body has kinetic energy.',['Chemical energy is associated with chemical configuration.','','Magnetic energy requires a magnetic system.','Nuclear energy is associated with nuclei.'],['forms']),
  q('a5-2-03','A5.2','KC','Visible light is part of which syllabus energy form?',
    ['electromagnetic','sound','elastic','gravitational'],0,'Visible light is electromagnetic radiation.',['','Sound requires a material medium.','Elastic energy is stored by deformation.','Gravitational energy is associated with position in a gravitational field.'],['forms','electromagnetic']),
  q('a5-2-04','A5.2','KC','A cell before it is connected in a circuit stores energy mainly in',
    ['chemical form','kinetic form','sound form','gravitational form'],0,'A cell stores chemical energy that can later be transferred electrically.',['','The cell as a whole need not be moving.','Sound is not the stored form.','Height is not the relevant store.'],['forms','chemical']),

  // A5.3 Transformations
  q('a5-3-01','A5.3','KC','Which energy chain best represents a battery-powered lamp?',
    ['chemical → electrical → electromagnetic + thermal','electrical → chemical → gravitational','kinetic → nuclear → sound','thermal → gravitational → electrical'],0,
    'Chemical energy in the cell is transferred electrically and becomes electromagnetic radiation plus thermal output.',['','The sequence is reversed and includes the wrong final form.','The stated forms do not describe a lamp.','The chain does not match the device.'],['transformations']),
  q('a5-3-02','A5.3','KC','A loudspeaker mainly transforms electrical energy into',
    ['sound and thermal energy','gravitational and nuclear energy','chemical and elastic energy','magnetic energy only'],0,'A loudspeaker produces useful sound and also non-useful thermal energy.',['','Those are not the main outputs.','Those are not the main outputs.','Magnetic effects occur internally but the output is not only magnetic energy.'],['transformations']),
  q('a5-3-03','A5.3','UK','Which chain best describes hydroelectric generation?',
    ['gravitational potential → kinetic → electrical','electrical → gravitational potential → nuclear','chemical → sound → electrical','kinetic → chemical → thermal'],0,'Falling water loses gravitational potential energy, gains kinetic energy and drives electrical generation.',['','The direction is wrong.','Hydroelectricity does not require chemical energy.','Chemical energy is not produced as the intended step.'],['transformations','hydro']),
  q('a5-3-04','A5.3','KC','When a moving vehicle brakes to rest, much of its kinetic energy is transferred to',
    ['thermal energy in brakes, tyres and surroundings','gravitational potential energy only','nuclear energy','chemical energy in the fuel'],0,'Friction and resistance transfer kinetic energy mainly into thermal energy.',['','There need not be a height increase.','Braking does not create nuclear energy.','The fuel store is not replenished by braking in an ordinary vehicle.'],['transformations','dissipation']),

  // A5.4 Work
  q('a5-4-01','A5.4','UK','A 30 N force moves a box 5.0 m in the direction of the force. The work done is',
    ['6 J','35 J','150 J','750 J'],2,'W = Fd = 30 × 5.0 = 150 J.',['This divides distance by force.','This adds force and distance.','','This multiplies by an extra factor of five.'],['work','calculation']),
  q('a5-4-02','A5.4','UK','A student pushes a rigid wall with a force of 200 N but the wall does not move. The work done on the wall is',
    ['0 J','200 J','400 J','cannot be found without the mass'],0,'There is no displacement of the wall, so W = Fd = 0.',['','Force alone does not determine work.','No displacement means no work.','Mass is irrelevant here.'],['work','concept']),
  q('a5-4-03','A5.4','UK','A suitcase is carried horizontally at constant height. The work done by its weight on the suitcase is',
    ['zero','weight × horizontal distance','mass × horizontal distance','equal to its kinetic energy'],0,'Weight is vertical while displacement is horizontal, so the displacement in the force direction is zero.',['','The displacement is perpendicular to weight.','Mass is not a force.','The suitcase can move at constant speed with no change in KE.'],['work','direction']),
  q('a5-4-04','A5.4','UK','A 50 N horizontal force acts on a crate while it moves 3.0 m horizontally in the same direction. Which value is the energy transferred by this force?',
    ['16.7 J','47 J','150 J','500 J'],2,'The work done is 50 × 3.0 = 150 J.',['This divides force by distance.','This subtracts.','','This is not the product.'],['work','energy-transfer']),

  // A5.5 Caribbean alternative energy
  q('a5-5-01','A5.5','UK','Which source is especially linked to volcanic regions of the Caribbean?',
    ['geothermal energy','tidal energy','wind energy','hydroelectricity'],0,'Geothermal resources are particularly relevant where volcanic geology provides accessible underground heat.',['','Tidal energy depends on coastal tidal conditions.','Wind depends on wind resource rather than volcanism.','Hydro depends mainly on water flow and elevation.'],['caribbean','alternative']),
  q('a5-5-02','A5.5','UK','Which is the strongest reason for considering solar energy across much of the Caribbean?',
    ['good solar resource is available in many locations','solar power works equally at night without storage','solar panels produce no environmental impacts at any stage','solar power never needs maintenance'],0,'Solar radiation is a widely available regional resource, though output varies and systems have costs and impacts.',['','Night-time supply requires storage or another source.','No technology is impact-free across its full life cycle.','Maintenance is still required.'],['caribbean','solar']),
  q('a5-5-03','A5.5','UK','Which statement correctly distinguishes alternative from renewable energy?',
    ['Every alternative source is renewable','Nuclear energy may be treated as an alternative source in the syllabus but it is not renewable on human timescales','Fossil fuels are renewable because new deposits can form','Wind energy is non-renewable'],1,'The syllabus lists nuclear among alternative sources, but nuclear fuel is finite.',['The terms are not identical.','','Fossil fuels form too slowly to count as renewable on human timescales.','Wind is renewable.'],['caribbean','renewable']),
  q('a5-5-04','A5.5','UK','A strong discussion of an energy source for a Caribbean territory should include',
    ['only the name of the source','a regional condition, advantages and disadvantages','only the installation cost','only whether it is renewable'],1,'A discussion should connect the source to local conditions and evaluate trade-offs.',['A list is not a discussion.','','Cost is one factor, not the whole evaluation.','Renewability is only one consideration.'],['caribbean','discussion']),

  // A5.6 Potential energy
  q('a5-6-01','A5.6','KC','Potential energy is energy a body or system has because of its',
    ['position or condition','speed only','temperature only','mass only'],0,'Potential energy is associated with position, condition or configuration.',['','Energy due to motion is kinetic.','Thermal energy is not the general definition of potential energy.','Mass alone is insufficient.'],['potential']),
  q('a5-6-02','A5.6','KC','Which object clearly has elastic potential energy?',
    ['a compressed spring','a stationary unstretched spring at its natural length','a rolling ball','a hot metal block'],0,'Compression stores elastic potential energy.',['','At natural length it need not have elastic strain energy.','A rolling ball has kinetic energy.','A hot block has thermal energy.'],['potential','elastic']),
  q('a5-6-03','A5.6','KC','A book raised onto a shelf gains',
    ['gravitational potential energy','nuclear energy','sound energy','magnetic energy'],0,'Raising the book increases its gravitational potential energy relative to the chosen reference level.',['','Nuclear energy is not changed by placing the book on a shelf.','No sound need be produced.','No magnetic system is required.'],['potential','gpe']),
  q('a5-6-04','A5.6','KC','Which is an example of potential energy named in the syllabus?',
    ['energy stored in a battery','the speed of a moving bicycle','the frequency of a sound wave','the pressure of a gas only'],0,'A battery stores chemical potential energy.',['','Motion gives kinetic energy.','Frequency describes a wave, not a potential-energy store.','Pressure alone is not the syllabus definition.'],['potential','chemical']),

  // A5.7 GPE
  q('a5-7-01','A5.7','UK','A 4.0 kg load is raised 2.5 m. Take g = 10 N/kg. Its gain in gravitational potential energy is',
    ['16 J','25 J','100 J','160 J'],2,'ΔEp = mgh = 4.0 × 10 × 2.5 = 100 J.',['This omits g and uses 4×4.','This uses only g×h.','','This uses the wrong multiplication.'],['gpe','calculation']),
  q('a5-7-02','A5.7','UK','A 3.0 kg suitcase is moved up a 5.0 m ramp that raises it vertically by 1.5 m. Take g = 10 N/kg. The increase in GPE is',
    ['45 J','75 J','150 J','225 J'],0,'Use vertical height: 3.0 × 10 × 1.5 = 45 J.',['','This uses part of the ramp length incorrectly.','This uses the full 5 m ramp length.','This is not mgh with the vertical height.'],['gpe','vertical-height']),
  q('a5-7-03','A5.7','UK','A body gains 600 J of GPE when raised 3.0 m where g = 10 N/kg. Its mass is',
    ['2.0 kg','20 kg','60 kg','200 kg'],1,'m = ΔEp/(gh) = 600/(10×3.0) = 20 kg.',['This divides by 300.','','This omits the height division.','This is too large by a factor of ten.'],['gpe','rearrangement']),
  q('a5-7-04','A5.7','UK','A 2.0 kg object moves downward by 4.0 m. Taking upward height as positive and g = 10 N/kg, its change in GPE is',
    ['+80 J','-80 J','+8 J','-8 J'],1,'ΔEp = mgΔh = 2.0×10×(-4.0) = -80 J.',['The sign is wrong.','','Both magnitude and sign are wrong.','The magnitude is too small.'],['gpe','sign']),

  // A5.8 KE definition
  q('a5-8-01','A5.8','KC','Kinetic energy is the energy a body has because of its',
    ['motion','height only','temperature only','electric charge only'],0,'Kinetic energy is associated with motion.',['','Height gives gravitational potential energy.','Temperature relates to thermal energy.','Charge can be associated with electric potential energy.'],['kinetic']),
  q('a5-8-02','A5.8','KC','Which body definitely has kinetic energy?',
    ['a moving trolley','a stretched spring at rest','a book resting on a shelf','a charged capacitor at rest'],0,'A moving trolley has kinetic energy.',['','That illustrates elastic potential energy.','That illustrates gravitational potential energy.','That illustrates electrical potential energy.'],['kinetic']),
  q('a5-8-03','A5.8','KC','Which statement about kinetic energy is correct?',
    ['It is a vector in the direction of motion','It is a scalar and depends on speed','It is measured in watts','It is independent of mass'],1,'Kinetic energy is scalar and depends on mass and the square of speed.',['KE has no direction.','','Watt is power.','KE is proportional to mass.'],['kinetic','scalar']),
  q('a5-8-04','A5.8','UK','Two identical cars travel in opposite directions at the same speed. Their kinetic energies are',
    ['equal','equal in magnitude but opposite in sign','zero','different because direction is different'],0,'KE depends on speed squared, so direction does not change its value.',['','Kinetic energy is not signed by direction.','Moving cars have KE.','Direction affects velocity and momentum, not the KE value.'],['kinetic','direction']),

  // A5.9 KE calculations
  q('a5-9-01','A5.9','UK','A 2.0 kg object moves at 6.0 m/s. Its kinetic energy is',
    ['6 J','12 J','36 J','72 J'],2,'Ek = ½×2.0×6.0² = 36 J.',['This uses ½mv.','This uses mv.','','This misses the factor ½.'],['kinetic','calculation']),
  q('a5-9-02','A5.9','UK','A 1200 kg car travels at 20 m/s. Its kinetic energy is',
    ['24 kJ','120 kJ','240 kJ','480 kJ'],2,'Ek = 0.5×1200×400 = 240000 J = 240 kJ.',['This is too small by factor ten.','This misses a factor two.','','This omits the factor ½.'],['kinetic','calculation','prefix']),
  q('a5-9-03','A5.9','UK','If the speed of a body doubles while its mass stays constant, its kinetic energy becomes',
    ['twice as large','three times as large','four times as large','eight times as large'],2,'Kinetic energy is proportional to v², so doubling v multiplies Ek by 4.',['That would be linear dependence.','There is no cubic dependence.','','Eight would correspond to a cubic relation.'],['kinetic','proportionality']),
  q('a5-9-04','A5.9','UK','A 0.50 kg ball has kinetic energy 9.0 J. Its speed is',
    ['3.0 m/s','6.0 m/s','9.0 m/s','18 m/s'],1,'9.0 = ½×0.50×v², so v² = 36 and v = 6.0 m/s.',['This would give 2.25 J.','','This would give 20.25 J.','This would give 81 J.'],['kinetic','rearrangement']),

  // A5.10 conservation
  q('a5-10-01','A5.10','KC','The law of conservation of energy states that energy',
    ['can be created but not destroyed','can be destroyed but not created','cannot be created or destroyed, only transferred or transformed','always remains as mechanical energy'],2,'Total energy is conserved, though its form and location can change.',['Creation is not allowed by the law.','Destruction is not allowed.','','Mechanical energy can become thermal or other forms.'],['conservation']),
  q('a5-10-02','A5.10','UK','A 1.0 kg object falls 5.0 m from rest. Ignore resistance and take g = 10 N/kg. Its kinetic energy just before the end of the fall is',
    ['5 J','10 J','25 J','50 J'],3,'GPE lost = mgh = 1×10×5 = 50 J, so KE gained = 50 J.',['This omits g.','This uses only mg.','This uses half the GPE.',''],['conservation','gpe-ke']),
  q('a5-10-03','A5.10','UK','A falling object loses 100 J of GPE but gains only 75 J of KE. The remaining 25 J has most likely been',
    ['destroyed','transferred to other forms such as thermal energy and sound','converted into mass','removed from the universe'],1,'Energy is conserved; the missing mechanical energy has been transferred to other forms.',['Energy is not destroyed.','','The question does not describe mass creation.','Energy remains within the complete system/surroundings accounting.'],['conservation','dissipation']),
  q('a5-10-04','A5.10','UK','A pendulum is momentarily at rest at the highest point of its swing. Compared with the lowest point, it has',
    ['more gravitational potential energy and less kinetic energy','less gravitational potential energy and more kinetic energy','the same kinetic energy','zero total energy'],0,'At the highest point the speed is momentarily zero and GPE is greatest relative to the bottom.',['','The relationship is reversed.','KE is not the same.','The system still has energy.'],['conservation','pendulum']),

  // A5.11 Power
  q('a5-11-01','A5.11','KC','Power is the',
    ['total energy stored','rate of doing work or transferring energy','force per unit area','product of mass and speed'],1,'Power measures how quickly work is done or energy is transferred.',['That is an amount of energy.','','That is pressure.','That is momentum.'],['power','definition']),
  q('a5-11-02','A5.11','KC','One watt is equal to',
    ['1 J s⁻¹','1 N m⁻²','1 kg m s⁻¹','1 J s'],0,'One watt is one joule transferred per second, so 1 W = 1 J s⁻¹.',['','That is a pascal.','That is momentum.','Multiplying joules by seconds is not power.'],['power','units']),
  q('a5-11-03','A5.11','UK','A motor transfers 3600 J in 12 s. Its power is',
    ['30 W','300 W','360 W','43 200 W'],1,'P = E/t = 3600/12 = 300 W.',['This divides by 120.','','This divides by ten.','This multiplies energy by time.'],['power','calculation']),
  q('a5-11-04','A5.11','UK','Two machines each do 2400 J of useful work. Machine X takes 8 s and Y takes 12 s. Which is correct?',
    ['X has greater power','Y has greater power','They have equal power because they do equal work','Power cannot be compared without their masses'],0,'X transfers the same energy in less time, so X has greater power.',['','Y takes longer.','Equal work does not imply equal power if times differ.','Mass is not required for P = W/t.'],['power','comparison']),

  // A5.12 efficiency explanation
  q('a5-12-01','A5.12','KC','Efficiency describes the fraction of the input that is',
    ['useful output','destroyed','always thermal energy','stored forever'],0,'Efficiency compares useful output with total input.',['','Energy is not destroyed.','Thermal energy may be useful or non-useful depending on the device.','That is not the definition.'],['efficiency','definition']),
  q('a5-12-02','A5.12','UK','Why is the measured efficiency of a real motor usually below 100%?',
    ['Some input energy is transferred to non-useful forms such as thermal energy and sound','Energy is destroyed inside the motor','The motor produces more useful output than input','Power and energy have different units'],0,'Real devices normally have non-useful transfers.',['','Energy is conserved.','That would imply efficiency above 100%.','The statement is true but does not explain inefficiency.'],['efficiency','losses']),
  q('a5-12-03','A5.12','KC','Which statement about efficiency is physically correct?',
    ['It can exceed 100% if the machine is powerful enough','It cannot exceed 100%','It must always equal exactly 50%','It is measured in joules'],1,'Useful output cannot exceed total input, so efficiency cannot exceed 100%.',['That would violate energy accounting.','','There is no universal 50% value.','Efficiency is dimensionless or a percentage.'],['efficiency','limit']),
  q('a5-12-04','A5.12','UK','For which device is thermal energy mainly a useful output?',
    ['electric heater','visible-light lamp','electric motor driving a fan','loudspeaker'],0,'The purpose of a heater is to transfer energy thermally, so thermal output is useful.',['','For a lamp, visible electromagnetic output is the intended output.','Mechanical output is intended.','Sound is intended.'],['efficiency','useful-output']),

  // A5.13 efficiency calculations
  q('a5-13-01','A5.13','UK','A motor receives 800 J and produces 600 J of useful work. Its efficiency is',
    ['25%','60%','75%','133%'],2,'Efficiency = 600/800 × 100% = 75%.',['This uses the wasted fraction.','This is not the ratio.','','This reverses input and output.'],['efficiency','calculation']),
  q('a5-13-02','A5.13','UK','A device takes 500 W and delivers 425 W of useful output power. Its efficiency is',
    ['15%','75%','85%','117.6%'],2,'Efficiency = 425/500 × 100% = 85%.',['This is the non-useful fraction.','This is too low.','','This reverses the ratio.'],['efficiency','power']),
  q('a5-13-03','A5.13','UK','A machine is 40% efficient and receives 2000 J. The useful output is',
    ['80 J','500 J','800 J','5000 J'],2,'Useful output = 0.40 × 2000 = 800 J.',['This divides by 25.','This uses 25%.','','This divides input by efficiency.'],['efficiency','rearrangement']),
  q('a5-13-04','A5.13','UK','A calculation gives a machine efficiency of 125%. What is the best conclusion?',
    ['The machine is exceptionally efficient','The input/output data or calculation is inconsistent because efficiency cannot exceed 100%','The answer is acceptable if the machine is electrical','The machine must be producing thermal energy'],1,'A useful output greater than total input violates the energy accounting used in the efficiency definition.',['Efficiency above 100% is not physically valid.','','The energy type does not remove the limit.','Thermal output does not explain an impossible ratio.'],['efficiency','sanity-check']),
]);

export const A5_FLASHCARDS = Object.freeze(Object.entries(A5_OBJECTIVES).flatMap(([objective,syllabusWording])=>{
  const cards={
    'A5.1':[['Define energy.','The capacity to do work.'],['SI unit of energy?','joule (J).'],['Energy or power: which is an amount?','Energy is an amount; power is a rate.']],
    'A5.2':[['Name the syllabus energy forms.','Gravitational, elastic, chemical, electrical, magnetic, electromagnetic, thermal, nuclear, kinetic and sound.'],['Energy of motion?','Kinetic energy.'],['Visible light belongs to which syllabus form?','Electromagnetic energy.']],
    'A5.3':[['What is an energy transformation?','A change from one energy form to another.'],['What must never be said about energy?','That it is created, destroyed or simply disappears.'],['Battery lamp chain?','Chemical → electrical → electromagnetic + thermal.']],
    'A5.4':[['Work formula?','W = Fd, using displacement in the force direction.'],['When does a force do zero work?','When its point of application has no displacement in the force direction.'],['Unit of work?','joule (J).']],
    'A5.5':[['Alternative sources named by the syllabus?','Hydroelectric, geothermal, tidal/wave, solar, wind and nuclear.'],['Alternative vs renewable?','They are not identical; nuclear is listed as alternative but uses finite fuel.'],['What makes a Caribbean energy discussion strong?','Link source to local conditions, then evaluate advantages and disadvantages.']],
    'A5.6':[['Define potential energy.','Energy due to position, condition or configuration.'],['Elastic potential example?','A stretched or compressed spring/elastic band.'],['Gravitational potential example?','An object raised above a reference level.']],
    'A5.7':[['GPE change formula?','ΔEp = mgh.'],['What does h mean?','Vertical change in height.'],['Unit of GPE?','joule (J).']],
    'A5.8':[['Define kinetic energy.','Energy a body has because of its motion.'],['Is KE scalar or vector?','Scalar.'],['Does direction change KE at fixed speed?','No. KE depends on speed squared.']],
    'A5.9':[['KE formula?','Ek = ½mv².'],['If speed doubles, KE becomes?','Four times as large.'],['If mass doubles at fixed speed, KE becomes?','Twice as large.']],
    'A5.10':[['State conservation of energy.','Energy cannot be created or destroyed; it is transferred or transformed.'],['Ideal fall from rest: GPE lost becomes?','Kinetic energy gained.'],['With friction, where does missing mechanical energy go?','Into other forms, commonly thermal energy and sound.']],
    'A5.11':[['Define power.','Rate of doing work or transferring energy.'],['Power formula?','P = E/t or W/t.'],['One watt equals?','One joule per second.']],
    'A5.12':[['Define efficiency.','Fraction of total input converted to useful output.'],['Maximum possible efficiency?','100%; it cannot exceed 100%.'],['Why are real devices often below 100%?','Some input is transferred to non-useful forms.']],
    'A5.13':[['Efficiency formula?','useful output ÷ total input × 100%.'],['Can energy data and power data both be used?','Yes, but compare like with like.'],['What does an answer above 100% mean?','The data, chosen outputs or calculation is inconsistent.']],
  };
  return cards[objective].map(([front,back],i)=>({id:`fc-${objective.toLowerCase().replace('.','-')}-${i+1}`,objective,topic:'A5',front,back,syllabusWording}));
}));

function hashSeed(seed){
  let h=2166136261;
  for(const ch of String(seed)){ h^=ch.charCodeAt(0); h=Math.imul(h,16777619); }
  return h>>>0;
}
function randFactory(seed){ let s=hashSeed(seed)||1; return()=>{ s=Math.imul((s^(s>>>15)),1|s); s^=s+Math.imul((s^(s>>>7)),61|s); return ((s^(s>>>14))>>>0)/4294967296; }; }
function shuffle(arr,rand){ const a=[...arr]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(rand()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

export function buildA5ObjectiveBalancedQuiz({seed='a5',questionsPerObjective=1}={}){
  if(!Number.isInteger(questionsPerObjective)||questionsPerObjective<1||questionsPerObjective>4) throw new RangeError('questionsPerObjective must be an integer from 1 to 4');
  const rand=randFactory(seed); const selected=[];
  for(const objective of Object.keys(A5_OBJECTIVES)){
    const pool=A5_MCQ_BANK.filter(x=>x.objective===objective);
    selected.push(...shuffle(pool,rand).slice(0,questionsPerObjective));
  }
  return shuffle(selected,rand);
}
