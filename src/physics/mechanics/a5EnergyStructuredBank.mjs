// SPARK Physics A5 Energy structured-response production candidates.
// Questions are original. Each automated criterion is one mark so the canonical
// M/A/B/dependency engine can award partial credit without block over-marking.

const c=(code,profile,objective,description,check=null,extra={})=>({
  code,marks:1,profile,objective,description,...(check?{check}:{}),...extra,
});

export const A5_STRUCTURED_BANK=Object.freeze([
  {
    id:'a5-p2-conservation-01',topic:'A5',kind:'structured',marks:15,
    title:'Energy changes in a falling load',
    stem:'A 2.0 kg load is raised vertically through 5.0 m and then released from rest. Take g = 10 N/kg. During the fall, 15 J is transferred to non-useful forms by air resistance.',
    parts:[
      {id:'a',marks:2,objective:'A5.1',prompt:'Define energy and state its SI unit.',criteria:[
        c('B1','KC','A5.1','defines energy as the capacity or ability to do work',{type:'writtenConcept',all:['work'],any:['capacity','ability']}),
        c('B2','KC','A5.1','states the joule as the SI unit',{type:'unitName',accepted:['J','joule']}),
      ]},
      {id:'b',marks:3,objective:'A5.7',prompt:'Calculate the gain in gravitational potential energy when the load is raised.',criteria:[
        c('M1','UK','A5.7','uses ΔEp = mgh',{type:'formulaUse',formula:'Ep=mgh'}),
        c('M2','UK','A5.7','uses the vertical height 5.0 m and the given mass and field strength',{type:'containsValues',values:[2,5,10],needAll:true}),
        c('A1','UK','A5.7','obtains 100 J',{type:'physicsQuantity',quantity:'energy',value:100,unit:'J'},{depends:['M1']}),
      ]},
      {id:'c',marks:5,objective:'A5.10',prompt:'Use conservation of energy to determine the kinetic energy and speed just before the end of the fall.',criteria:[
        c('M1','UK','A5.10','states or uses conservation of energy',{type:'formulaUse',formula:'energy-conservation'}),
        c('M2','UK','A5.10','subtracts the 15 J non-useful transfer from the 100 J released',{type:'writtenConcept',any:['100 - 15','subtract 15','85']}),
        c('A1','UK','A5.10','obtains final kinetic energy 85 J',{type:'physicsQuantity',quantity:'energy',value:85,unit:'J'},{depends:['M1']}),
        c('M3','UK','A5.9','uses Ek = ½mv²',{type:'formulaUse',formula:'Ek=0.5mv2'}),
        c('A2','UK','A5.9','obtains speed about 9.22 m/s',{type:'physicsQuantity',quantity:'speed',value:Math.sqrt(85),unit:'m/s',relativeTolerance:0.005},{depends:['M3']}),
      ]},
      {id:'d',marks:3,objective:'A5.10',prompt:'Explain why it would be wrong to set the gravitational potential energy lost equal to the kinetic energy gained in this situation.',criteria:[
        c('B1','KC','A5.10','identifies air resistance or a resistive force',{type:'writtenConcept',any:['air resistance','drag','resistance']}),
        c('B2','UK','A5.10','states that some energy is transferred to other/non-useful forms',{type:'writtenConcept',all:['energy'],any:['other forms','non-useful','thermal','sound','surroundings']}),
        c('B3','UK','A5.10','states that total energy is still conserved',{type:'writtenConcept',all:['energy'],any:['conserved','not destroyed','cannot be destroyed']}),
      ]},
      {id:'e',marks:2,objective:'A5.9',prompt:'If the same mass moved at twice the speed, state how its kinetic energy would change and explain why.',criteria:[
        c('B1','KC','A5.9','states kinetic energy becomes four times as large',{type:'writtenConcept',any:['four times','4 times','quadruple']}),
        c('B2','UK','A5.9','links the change to the v² term',{type:'writtenConcept',any:['v²','v^2','speed squared','velocity squared']}),
      ]},
    ],
  },
  {
    id:'a5-p2-power-efficiency-01',topic:'A5',kind:'structured',marks:15,
    title:'Measuring power and efficiency',
    stem:'A 60 kg student climbs a staircase with a vertical height of 3.5 m in 5.0 s. Take g = 10 N/kg. A separate electric lifting device takes 500 W of electrical input power and provides 400 W of useful mechanical output power.',
    parts:[
      {id:'a',marks:3,objective:'A5.11',prompt:'Define power, state its SI unit, and state the relationship used to calculate it from energy.',criteria:[
        c('B1','KC','A5.11','defines power as rate of doing work or transferring energy',{type:'writtenConcept',all:['rate'],any:['work','energy']}),
        c('B2','KC','A5.11','states the watt',{type:'unitName',accepted:['W','watt']}),
        c('B3','KC','A5.11','states P = E/t or work/time',{type:'formulaUse',formula:'P=E/t'}),
      ]},
      {id:'b',marks:4,objective:'A5.11',prompt:'Calculate the useful power developed by the student while climbing.',criteria:[
        c('M1','UK','A5.7','calculates the gain in GPE using mgh',{type:'formulaUse',formula:'Ep=mgh'}),
        c('A1','UK','A5.7','obtains 2100 J',{type:'physicsQuantity',quantity:'energy',value:2100,unit:'J'},{depends:['M1']}),
        c('M2','UK','A5.11','divides energy transferred by 5.0 s',{type:'formulaUse',formula:'P=E/t'}),
        c('A2','UK','A5.11','obtains 420 W',{type:'physicsQuantity',quantity:'power',value:420,unit:'W'},{depends:['M2']}),
      ]},
      {id:'c',marks:3,objective:'A5.13',prompt:'Calculate the efficiency of the electric lifting device.',criteria:[
        c('M1','UK','A5.13','uses useful output / total input × 100%',{type:'formulaUse',formula:'eff=useful/input*100'}),
        c('M2','UK','A5.13','uses 400 W as useful output and 500 W as input',{type:'containsValues',values:[400,500],needAll:true}),
        c('A1','UK','A5.13','obtains 80%',{type:'physicsQuantity',quantity:'percent',value:80,unit:'%'},{depends:['M1']}),
      ]},
      {id:'d',marks:2,objective:'A5.12',prompt:'Explain what happens to the other 100 W of input power.',criteria:[
        c('B1','KC','A5.12','states it is transferred to non-useful outputs or surroundings',{type:'writtenConcept',any:['non-useful','not useful','surroundings','waste']}),
        c('B2','UK','A5.12','identifies plausible forms such as thermal energy and sound',{type:'writtenConcept',any:['thermal','heat','sound','friction']}),
      ]},
      {id:'e',marks:3,objective:'A5.11',prompt:'A class investigates student stair-climbing power. State the measurements needed to calculate the gravitational energy transferred and power, and give one reason repeated trials are useful.',responseFields:['energyMeasurements','timeMeasurement','repeatReason'],criteria:[
        c('B1','XS','A5.11','identifies mass and vertical height as measurements needed for mgh',{type:'writtenConcept',all:['mass','height']},{field:'energyMeasurements'}),
        c('B2','XS','A5.11','identifies time as the measurement needed for the rate calculation',{type:'writtenConcept',all:['time']},{field:'timeMeasurement'}),
        c('B3','XS','A5.11','explains repeats reduce random timing variation or allow a mean',{type:'writtenConcept',any:['average','mean','random','reaction time','repeat']},{field:'repeatReason'}),
      ]},
    ],
  },
  {
    id:'a5-p2-caribbean-energy-01',topic:'A5',kind:'extended response',marks:15,
    title:'Choosing energy sources for a Caribbean island',
    stem:'A small Caribbean island imports most of its fuel. It has strong sunshine, steady trade winds in some coastal areas, no large rivers, and no known high-temperature geothermal resource. The electricity grid is small and demand continues after sunset.',
    parts:[
      {id:'a',marks:3,objective:'A5.5',prompt:'Name three different alternative energy sources listed in the CSEC syllabus.',responseFields:['source1','source2','source3'],criteria:[
        c('B1','KC','A5.5','names at least one valid syllabus alternative source',{type:'distinctConceptCount',fields:['source1','source2','source3'],need:1,groups:[['solar'],['wind'],['hydroelectric','hydro'],['geothermal'],['tidal'],['wave'],['nuclear']]},{field:'response'}),
        c('B2','KC','A5.5','names at least two different valid syllabus alternative sources',{type:'distinctConceptCount',fields:['source1','source2','source3'],need:2,groups:[['solar'],['wind'],['hydroelectric','hydro'],['geothermal'],['tidal'],['wave'],['nuclear']]},{field:'response'}),
        c('B3','KC','A5.5','names three different valid syllabus alternative sources',{type:'distinctConceptCount',fields:['source1','source2','source3'],need:3,groups:[['solar'],['wind'],['hydroelectric','hydro'],['geothermal'],['tidal'],['wave'],['nuclear']]},{field:'response'}),
      ]},
      {id:'b',marks:4,objective:'A5.5',prompt:'Explain why solar and wind energy could both be useful on this island.',criteria:[
        c('B1','UK','A5.5','links solar to strong sunshine',{type:'writtenConcept',all:['solar'],any:['sunshine','sun','solar resource']}),
        c('B2','UK','A5.5','links wind to suitable steady trade winds',{type:'writtenConcept',all:['wind'],any:['trade winds','steady','coastal']}),
        c('B3','UK','A5.5','identifies reduced imported-fuel dependence as an advantage',{type:'writtenConcept',all:['fuel'],any:['import','dependence','foreign exchange','local']}),
        c('B4','UK','A5.5','identifies reduced fossil-fuel combustion/emissions as an advantage',{type:'writtenConcept',any:['emission','pollution','fossil','carbon dioxide','co2']}),
      ]},
      {id:'c',marks:4,objective:'A5.5',prompt:'State two limitations of relying heavily on solar and wind, and explain one measure that could help maintain supply after sunset or during low wind.',criteria:[
        c('B1','UK','A5.5','identifies solar intermittency/night-time limitation',{type:'writtenConcept',any:['night','sunset','cloud','intermittent','not always']}),
        c('B2','UK','A5.5','identifies wind variability',{type:'writtenConcept',all:['wind'],any:['variable','intermittent','not always','calm']}),
        c('B3','UK','A5.5','identifies storage, backup generation, demand management or grid interconnection as a response',{type:'writtenConcept',any:['battery','storage','backup','demand management','interconnection','reserve']}),
        c('B4','UK','A5.5','explains that the measure balances supply when renewable output is low',{type:'writtenConcept',all:['supply'],any:['low','not available','demand','reliable','reliability']}),
      ]},
      {id:'d',marks:2,objective:'A5.5',prompt:'Explain why hydroelectricity and geothermal energy are less strongly supported by the information given for this island.',criteria:[
        c('B1','UK','A5.5','links hydroelectric limitation to absence of large rivers or suitable water flow/head',{type:'writtenConcept',all:['hydro'],any:['no large rivers','river','water','flow','head']}),
        c('B2','UK','A5.5','links geothermal limitation to absence of known high-temperature resource',{type:'writtenConcept',all:['geothermal'],any:['no known','resource','high-temperature','volcanic heat']}),
      ]},
      {id:'e',marks:2,objective:'A5.5',prompt:'Explain why “alternative” and “renewable” should not be treated as exact synonyms in this syllabus topic.',criteria:[
        c('B1','KC','A5.5','notes that the syllabus lists nuclear energy among alternative sources',{type:'writtenConcept',all:['nuclear'],any:['alternative','syllabus','listed']}),
        c('B2','UK','A5.5','states that nuclear fuel is finite/non-renewable on human timescales',{type:'writtenConcept',all:['nuclear'],any:['finite','non-renewable','not renewable','fuel']}),
      ]},
    ],
  },
]);

export function a5StructuredCoverage(){
  const objectives=new Set(); const profiles={KC:0,UK:0,XS:0}; let marks=0; let manual=0;
  for(const question of A5_STRUCTURED_BANK) for(const part of question.parts) for(const criterion of part.criteria){
    objectives.add(criterion.objective||part.objective); profiles[criterion.profile]+=(criterion.marks||1); marks+=(criterion.marks||1); if(criterion.manual) manual+=(criterion.marks||1);
  }
  return {questionCount:A5_STRUCTURED_BANK.length,marks,manualMarks:manual,objectives:[...objectives].sort(),profiles};
}
