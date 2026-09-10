const c=(code,profile,objective,description,check=null,extra={})=>({code,marks:1,profile,objective,description,...(check?{check}:{}),...extra});
export const A6_STRUCTURED_BANK=Object.freeze([
  {
    id:'a6-p2-pressure-01',topic:'A6',kind:'structured',marks:15,title:'Pressure in solids and liquids',
    stem:'A student of mass 60 kg stands on one shoe with contact area 200 cm². The student then investigates pressure in water using a tank 0.80 m deep. Take g = 10 N/kg and water density = 1000 kg/m³.',
    parts:[
      {id:'a',marks:3,objective:'A6.1',prompt:'Define pressure, state its SI unit, and write the equation used to calculate it.',criteria:[
        c('B1','KC','A6.1','pressure is normal force per unit area',{type:'writtenConcept',all:['force','area'],any:['normal','perpendicular']}),
        c('B2','KC','A6.1','states pascal or N/m²',{type:'unitName',accepted:['Pa','pascal','N/m2','N m-2']}),
        c('B3','KC','A6.1','states p = F/A',{type:'formulaUse',formula:'pressure=F/A'}),
      ]},
      {id:'b',marks:4,objective:'A6.1',prompt:'Calculate the pressure exerted by the student on the floor.',criteria:[
        c('M1','UK','A3.3','calculates weight 600 N',{type:'containsQuantity',quantity:'force',value:600,unit:'N'}),
        c('M2','UK','A6.1','converts 200 cm² to 0.020 m²',{type:'containsQuantity',quantity:'area',value:0.020,unit:'m2'}),
        c('M3','UK','A6.1','uses p = F/A',{type:'formulaUse',formula:'pressure=F/A'}),
        c('A1','UK','A6.1','obtains 30 000 Pa',{type:'physicsQuantity',quantity:'pressure',value:30000,unit:'Pa'},{depends:['M3']}),
      ]},
      {id:'c',marks:3,objective:'A6.2',prompt:'Calculate the pressure due to the water at the bottom of the tank.',criteria:[
        c('M1','UK','A6.2','uses p = ρgh',{type:'formulaUse',formula:'fluid-pressure=rho*g*h'}),
        c('M2','UK','A6.2','uses density 1000 kg/m³ and depth 0.80 m',{type:'containsValues',values:[1000,0.8,10],needAll:true}),
        c('A1','UK','A6.2','obtains 8000 Pa',{type:'physicsQuantity',quantity:'pressure',value:8000,unit:'Pa'},{depends:['M1']}),
      ]},
      {id:'d',marks:3,objective:'A6.2',prompt:'Two holes are made in the side of the tank, one near the surface and one near the bottom. Explain why water leaves the lower hole with the greater initial speed.',criteria:[
        c('B1','KC','A6.2','lower hole is at greater depth',{type:'writtenConcept',all:['lower'],any:['greater depth','deeper']}),
        c('B2','UK','A6.2','pressure is greater at greater depth',{type:'writtenConcept',all:['pressure'],any:['greater','higher','increases']}),
        c('B3','UK','A6.2','greater pressure difference produces a greater driving effect on the outflow',{type:'writtenConcept',any:['greater force','greater pressure difference','faster','greater speed']}),
      ]},
      {id:'e',marks:2,objective:'A6.2',prompt:'The tank has one narrow side and one wide side. Compare the water pressure at two points at the same depth in the same water and explain.',criteria:[
        c('B1','KC','A6.2','states pressures are the same',{type:'writtenConcept',any:['same','equal'],forbidden:['not same','different pressure','unequal']}),
        c('B2','UK','A6.2','explains pressure depends on density and depth, not container width/shape',{type:'writtenConcept',all:['depth'],any:['density','ρgh','not shape','not width','independent of shape','independent of width'],forbidden:['depends on width','depends on shape']}),
      ]},
    ],
  },
  {
    id:'a6-p2-buoyancy-01',topic:'A6',kind:'structured',marks:15,title:'Floating, sinking and ballast',
    stem:'A sealed block has mass 1.6 kg and volume 0.0020 m³. It is placed fully under water of density 1000 kg/m³. Take g = 10 N/kg.',
    parts:[
      {id:'a',marks:3,objective:'A6.3',prompt:'State Archimedes’ principle and name the upward force on the block.',criteria:[
        c('B1','KC','A6.3','states upthrust equals weight of fluid displaced',{type:'writtenConcept',all:['weight','fluid'],any:['displaced','displacement']}),
        c('B2','KC','A6.3','identifies the upward force as upthrust/buoyant force',{type:'writtenConcept',any:['upthrust','buoyant force','buoyancy']}),
        c('B3','KC','A6.3','states the force acts upward',{type:'writtenConcept',any:['upward','up']}),
      ]},
      {id:'b',marks:4,objective:'A6.3',prompt:'Calculate the upthrust on the fully immersed block.',criteria:[
        c('M1','UK','A6.3','uses upthrust = ρgV or weight of fluid displaced',{type:'formulaUse',formula:'upthrust=rho*g*V'}),
        c('M2','UK','A6.3','calculates displaced-water mass as 2.0 kg',{type:'containsQuantity',quantity:'mass',value:2.0,unit:'kg'}),
        c('M3','UK','A6.3','converts displaced-fluid mass to weight using g',{type:'writtenConcept',any:['2 × 10','2*10','weight','mg']}),
        c('A1','UK','A6.3','obtains 20 N upthrust',{type:'physicsQuantity',quantity:'force',value:20,unit:'N'},{depends:['M1']}),
      ]},
      {id:'c',marks:3,objective:'A6.3',prompt:'Calculate the block’s weight and predict what it does immediately after release.',responseFields:['weight','comparison','prediction'],criteria:[
        c('M1','UK','A3.3','calculates weight 16 N',{type:'physicsQuantity',quantity:'force',value:16,unit:'N'},{field:'weight'}),
        c('M2','UK','A6.3','compares 20 N upthrust with 16 N weight',{type:'containsValues',values:[20,16],needAll:true},{field:'comparison'}),
        c('A1','UK','A6.3','predicts that the block rises',{type:'writtenConcept',any:['rise','rises','upward','floats up'],forbidden:['sinks','downward']},{field:'prediction'}),
      ]},
      {id:'d',marks:3,objective:'A6.3',prompt:'When the block finally floats at rest, explain why it is only partly submerged.',criteria:[
        c('B1','KC','A6.3','floating at rest means upthrust equals weight',{type:'writtenConcept',all:['upthrust','weight'],any:['equal','balance']}),
        c('B2','UK','A6.3','the full submerged volume would displace more water weight than needed',{type:'writtenConcept',any:['full volume','fully submerged','too much','20 N','greater upthrust']}),
        c('B3','UK','A6.3','therefore a smaller displaced/submerged volume is sufficient',{type:'writtenConcept',all:['volume'],any:['smaller','less','partly','partial']}),
      ]},
      {id:'e',marks:2,objective:'A6.3',prompt:'Explain how a submarine can change from floating near the surface to sinking.',criteria:[
        c('B1','KC','A6.3','takes water into ballast tanks/increases ballast',{type:'writtenConcept',all:['ballast'],any:['water','fill','takes in']}),
        c('B2','UK','A6.3','increases average density/weight relative to available upthrust so it sinks',{type:'writtenConcept',any:['average density','density increases','weight increases','upthrust less','sinks']}),
      ]},
    ],
  },
]);
export function a6StructuredCoverage(){const objectives=new Set();const profiles={KC:0,UK:0,XS:0};let marks=0;for(const q of A6_STRUCTURED_BANK)for(const p of q.parts)for(const c of p.criteria){objectives.add(c.objective||p.objective);profiles[c.profile]+=(c.marks||1);marks+=(c.marks||1)}return{questionCount:A6_STRUCTURED_BANK.length,marks,objectives:[...objectives].sort(),profiles}}
