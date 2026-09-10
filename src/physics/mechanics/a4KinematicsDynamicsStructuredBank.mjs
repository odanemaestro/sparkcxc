// SPARK Physics A4 Kinematics and Dynamics written-question candidates.
// The questions are original and deliberately include signed velocity so the
// student must distinguish displacement from distance.

const c=(code,profile,objective,description,check=null,extra={})=>({
  code,marks:1,profile,objective,description,...(check?{check}:{}),...extra,
});

export const A4_STRUCTURED_BANK = Object.freeze([
  {
    id:'a4-p2-motion-graph-01',topic:'A4',kind:'structured',marks:15,
    title:'A journey described by a velocity-time graph',
    stem:'A vehicle moves along a straight road. Its velocity changes linearly through the points (0 s, 0 m/s), (4 s, 8 m/s), (8 s, 8 m/s), (12 s, 0 m/s), (16 s, -4 m/s) and (20 s, -4 m/s). Positive velocity is east.',
    parts:[
      {id:'a',marks:3,objective:'A4.2',prompt:'Describe the motion from 0 s to 12 s.',criteria:[
        c('B1','UK','A4.2','0 to 4 s: accelerates uniformly east from rest',{type:'writtenConcept',all:['accelerat'],any:['uniform','constant']}),
        c('B2','UK','A4.2','4 to 8 s: moves east at constant velocity',{type:'writtenConcept',all:['constant'],any:['velocity','8']}),
        c('B3','UK','A4.2','8 to 12 s: slows uniformly to rest',{type:'writtenConcept',all:['rest'],any:['slows','decelerat','speed decreases']}),
      ]},
      {id:'b',marks:3,objective:'A4.2',prompt:'Calculate the acceleration from 0 s to 4 s.',criteria:[
        c('M1','UK','A4.2','uses change in velocity divided by change in time',{type:'formulaUse',formula:'a=(v-u)/t'}),
        c('M2','UK','A4.2','uses change in velocity 8 m/s and time 4 s',{type:'containsValues',values:[8,4],needAll:true}),
        c('A1','UK','A4.2','obtains 2.0 m/s² east',{type:'physicsQuantity',quantity:'acceleration',value:2,unit:'m/s2'},{depends:['M1']}),
      ]},
      {id:'c',marks:4,objective:'A4.2',prompt:'Calculate the displacement from 0 s to 20 s. State its direction.',criteria:[
        c('M1','UK','A4.2','finds the positive area from 0 to 12 s as 64 m',{type:'containsQuantity',quantity:'length',value:64,unit:'m'}),
        c('M2','UK','A4.2','finds the signed negative area from 12 to 20 s as -24 m',{type:'containsSignedQuantity',quantity:'length',value:-24,unit:'m'}),
        c('M3','UK','A4.2','combines signed areas rather than adding magnitudes',{type:'writtenConcept',any:['64 - 24','64+(-24)','signed area','positive area','negative area']}),
        c('A1','UK','A4.2','obtains displacement 40 m east',{type:'directedQuantity',quantity:'length',value:40,unit:'m',direction:'east'},{depends:['M3']}),
      ]},
      {id:'d',marks:3,objective:'A4.2',prompt:'Calculate the total distance travelled from 0 s to 20 s.',criteria:[
        c('M1','UK','A4.2','uses the magnitude of the area below the time axis as 24 m',{type:'containsQuantity',quantity:'length',value:24,unit:'m'}),
        c('M2','UK','A4.2','adds the magnitudes of the forward and backward travel',{type:'writtenConcept',any:['64 + 24','add magnitudes','total path']}),
        c('A1','UK','A4.2','obtains total distance 88 m',{type:'physicsQuantity',quantity:'length',value:88,unit:'m'},{depends:['M2']}),
      ]},
      {id:'e',marks:2,objective:'A4.1',prompt:'Explain why the displacement and distance are different.',criteria:[
        c('B1','KC','A4.1','states that displacement includes direction/sign',{type:'writtenConcept',all:['displacement'],any:['direction','sign','vector']}),
        c('B2','KC','A4.1','states that distance is total path length and does not cancel return travel',{type:'writtenConcept',all:['distance'],any:['path','total','does not cancel','scalar']}),
      ]},
    ],
  },
  {
    id:'a4-p2-newton-01',topic:'A4',kind:'structured',marks:15,
    title:"Newton's laws in dynamic systems",
    stem:'A 55 kg student stands on a trampoline. At one instant the trampoline pushes upward on the student with a force of 825 N. Take g = 10 N/kg.',
    parts:[
      {id:'a',marks:3,objective:'A4.4',prompt:"State Newton's first law and explain the importance of the word resultant.",criteria:[
        c('B1','KC','A4.4','body remains at rest or constant velocity in the absence of a resultant force',{type:'writtenConcept',any:['remains at rest','constant velocity']}),
        c('B2','KC','A4.4','states that a resultant/unbalanced force changes velocity',{type:'writtenConcept',any:['resultant force','unbalanced force']}),
        c('B3','UK','A4.4','explains that individual forces may be present but cancel to zero resultant',{type:'writtenConcept',all:['force'],any:['cancel','balance','zero resultant']}),
      ]},
      {id:'b',marks:4,objective:'A4.5',prompt:'Calculate the resultant force on the student and the acceleration at this instant.',criteria:[
        c('M1','UK','A3.3','calculates the weight as 550 N',{type:'containsQuantity',quantity:'force',value:550,unit:'N'}),
        c('M2','UK','A4.5','subtracts weight from the upward trampoline force',{type:'writtenConcept',any:['825 - 550','resultant','subtract']}),
        c('A1','UK','A4.5','obtains resultant force 275 N upward',{type:'directedQuantity',quantity:'force',value:275,unit:'N',direction:'upward'},{depends:['M2']}),
        c('A2','UK','A4.5','obtains acceleration 5.0 m/s² upward',{type:'directedQuantity',quantity:'acceleration',value:5,unit:'m/s2',direction:'upward'},{depends:['A1']}),
      ]},
      {id:'c',marks:4,objective:'A4.4',prompt:'Identify the Newton third-law partner to the upward force of the trampoline on the student. Explain why the student\'s weight is not that partner.',criteria:[
        c('B1','KC','A4.4','identifies the force of the student on the trampoline',{type:'writtenConcept',all:['student','trampoline'],any:['down','downward','force on']}),
        c('B2','KC','A4.4','states that the partner force is equal in magnitude',{type:'writtenConcept',any:['equal','same magnitude']}),
        c('B3','KC','A4.4','states that it is opposite in direction',{type:'writtenConcept',any:['opposite','downward']}),
        c('B4','UK','A4.4','explains that weight and trampoline force both act on the student, while a third-law pair acts on different bodies',{type:'writtenConcept',all:['different bodies'],any:['weight','same body','student']}),
      ]},
      {id:'d',marks:4,objective:'A4.5',prompt:'Explain how Newton\'s third law accounts for the motion of a rocket in empty space.',criteria:[
        c('B1','KC','A4.4','engine/rocket exerts a force on exhaust gas',{type:'writtenConcept',all:['gas'],any:['pushes','force','exhaust']}),
        c('B2','KC','A4.4','gas exerts an equal force on the rocket',{type:'writtenConcept',all:['rocket'],any:['equal','same']}),
        c('B3','KC','A4.4','the forces are in opposite directions and act on different bodies',{type:'writtenConcept',all:['opposite'],any:['different bodies','gas and rocket']}),
        c('B4','UK','A4.5','states that air is not required because the interaction is rocket-exhaust',{type:'writtenConcept',all:['air'],any:['not required','vacuum','space','exhaust']}),
      ]},
    ],
  },
  {
    id:'a4-p2-momentum-01',topic:'A4',kind:'structured',marks:15,
    title:'Collision and recoil',
    stem:'A 1.5 kg trolley A moves east at 4.0 m/s. It collides with a 0.50 kg trolley B at rest and the trolleys stick together. Later, a spring mechanism separates them. Ignore external horizontal forces during each short interaction.',
    parts:[
      {id:'a',marks:3,objective:'A4.6',prompt:'Define linear momentum and state its SI unit.',criteria:[
        c('B1','KC','A4.6','momentum is mass multiplied by velocity',{type:'writtenConcept',all:['mass','velocity']}),
        c('B2','KC','A4.6','states that momentum is a vector or has the direction of velocity',{type:'writtenConcept',any:['vector','direction']}),
        c('B3','KC','A4.6','states unit kg m s^-1 or N s',{type:'unitName',quantity:'momentum',accepted:['kg m/s','kg m s-1','N s']}),
      ]},
      {id:'b',marks:4,objective:'A4.8',prompt:'Calculate the common velocity immediately after the collision.',criteria:[
        c('M1','UK','A4.8','calculates initial momentum of A as 6.0 kg m/s east',{type:'containsQuantity',quantity:'momentum',value:6,unit:'kg m/s'}),
        c('M2','UK','A4.8','uses total combined mass 2.0 kg',{type:'containsQuantity',quantity:'mass',value:2,unit:'kg'}),
        c('M3','UK','A4.8','uses momentum before = momentum after',{type:'writtenConcept',all:['momentum'],any:['before','after','conserv']}),
        c('A1','UK','A4.8','obtains 3.0 m/s east',{type:'directedQuantity',quantity:'speed',value:3,unit:'m/s',direction:'east'},{depends:['M3']}),
      ]},
      {id:'c',marks:4,objective:'A4.7',prompt:'After the combined trolleys are brought to rest, the spring separates them. Trolley B moves east at 6.0 m/s. Calculate the velocity of trolley A.',criteria:[
        c('M1','UK','A4.7','states total initial momentum of the resting pair is zero',{type:'containsQuantity',quantity:'momentum',value:0,unit:'kg m/s'}),
        c('M2','UK','A4.8','calculates B momentum as 3.0 kg m/s east',{type:'containsQuantity',quantity:'momentum',value:3,unit:'kg m/s'}),
        c('M3','UK','A4.8','assigns A equal momentum in the opposite direction',{type:'writtenConcept',all:['opposite'],any:['west','-3']}),
        c('A1','UK','A4.8','obtains 2.0 m/s west for trolley A',{type:'directedQuantity',quantity:'speed',value:2,unit:'m/s',direction:'west'},{depends:['M3']}),
      ]},
      {id:'d',marks:4,objective:'A4.7',prompt:'Explain why the total momentum of the trolley system is conserved during each short interaction even though the trolleys exert large forces on each other.',criteria:[
        c('B1','KC','A4.7','identifies the two trolleys as the chosen system',{type:'writtenConcept',all:['trolleys'],any:['system','both']}),
        c('B2','KC','A4.7','states that the trolley forces are internal to the system',{type:'writtenConcept',all:['internal'],any:['forces','system']}),
        c('B3','UK','A4.7','states that the resultant external horizontal force/impulse is negligible',{type:'writtenConcept',all:['external'],any:['negligible','zero','no resultant','impulse']}),
        c('B4','UK','A4.7','concludes that total momentum before equals total momentum after',{type:'writtenConcept',all:['momentum'],any:['before equals after','conserved','same before and after']}),
      ]},
    ],
  },
]);

export function a4StructuredCoverage(){
  const objectives=new Set(); const profiles={KC:0,UK:0,XS:0}; let marks=0;
  for(const q of A4_STRUCTURED_BANK) for(const p of q.parts) for(const criterion of p.criteria){
    objectives.add(criterion.objective||p.objective); profiles[criterion.profile]+=(criterion.marks||1); marks+=(criterion.marks||1);
  }
  return {questionCount:A4_STRUCTURED_BANK.length,marks,objectives:[...objectives].sort(),profiles};
}
