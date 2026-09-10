// Original A1 written/data-analysis candidates. Criteria are one mark each.
const c=(code,profile,objective,description,check=null,extra={})=>({code,marks:1,profile,objective,description,...(check?{check}:{}),...extra});

export const A1_STRUCTURED_BANK=Object.freeze([
  {
    id:'a1-p2-pendulum-data-01',topic:'A1',kind:'data analysis',marks:25,title:'Period of a simple pendulum',
    stem:'A student measures the period T of a pendulum for six lengths l. The student times 20 oscillations at each length and calculates T. The results are: l/m: 0.20, 0.30, 0.40, 0.50, 0.60, 0.70; T/s: 0.90, 1.10, 1.27, 1.42, 1.55, 1.67.',
    parts:[
      {id:'a',marks:4,objective:'A1.2',prompt:'State the manipulated variable, responding variable and two controlled variables.',responseFields:['manipulated','responding','controlled1','controlled2'],criteria:[
        c('B1','XS','A1.2','length is manipulated',{type:'writtenConcept',any:['length','l']},{field:'manipulated'}),
        c('B2','XS','A1.2','period is responding',{type:'writtenConcept',any:['period','T']},{field:'responding'}),
        c('B3','XS','A1.2','mass of bob controlled',{type:'writtenConcept',all:['mass'],any:['bob']},{field:'controlled1'}),
        c('B4','XS','A1.2','initial angular displacement controlled',{type:'writtenConcept',any:['angle','angular displacement','amplitude']},{field:'controlled2'}),
      ]},
      {id:'b',marks:4,objective:'A1.2',prompt:'Explain how the period is measured reliably.',criteria:[
        c('B1','XS','A1.2','measures length to centre of bob',{type:'writtenConcept',all:['centre','bob'],any:['support','suspension','length']}),
        c('B2','XS','A1.2','releases bob without pushing',{type:'writtenConcept',any:['release without pushing','release gently','no push']}),
        c('B3','XS','A1.2','times many oscillations',{type:'writtenConcept',all:['oscillation'],any:['20','many','several']}),
        c('B4','UK','A1.2','divides total time by number of oscillations',{type:'writtenConcept',any:['divide by 20','divide by number','time/20','t/20']}),
      ]},
      {id:'c',marks:3,objective:'A1.3',prompt:'Calculate T² for 0.20 m, 0.40 m and 0.70 m.',responseFields:['t2_020','t2_040','t2_070'],criteria:[
        c('A1','UK','A1.3','0.81 s²',{type:'physicsQuantity',quantity:'time_squared',value:0.81,unit:'s²',relativeTolerance:0.015},{field:'t2_020'}),
        c('A2','UK','A1.3','1.61 s²',{type:'physicsQuantity',quantity:'time_squared',value:1.6129,unit:'s²',relativeTolerance:0.015},{field:'t2_040'}),
        c('A3','UK','A1.3','2.79 s²',{type:'physicsQuantity',quantity:'time_squared',value:2.7889,unit:'s²',relativeTolerance:0.015},{field:'t2_070'}),
      ]},
      {id:'d',marks:5,objective:'A1.3',requireDrawing:true,prompt:'Plot T² against l and draw a best-fit line.',criteria:[
        c('B1','XS','A1.3','horizontal axis l with unit',null,{manual:true}),c('B2','XS','A1.3','vertical axis T² with unit',null,{manual:true}),
        c('B3','XS','A1.3','sensible scale',null,{manual:true}),c('B4','XS','A1.3','points plotted accurately',null,{manual:true}),c('B5','XS','A1.4','best-fit line',null,{manual:true}),
      ]},
      {id:'e',marks:5,objective:'A1.5',requireDrawing:true,prompt:'Determine the gradient of the best-fit line and hence calculate g using S = 4π²/g.',responseFields:['gradient','g'],criteria:[
        c('M1','XS','A1.5','large gradient triangle',null,{manual:true}),
        c('M2','UK','A1.5','uses ΔT²/Δl',{type:'formulaUse',formula:'gradient=deltaT2/deltal'}),
        c('A1','UK','A1.5','gradient close to 4.0 s²/m',{type:'physicsQuantity',quantity:'time_squared_per_length',value:4.0,unit:'s²/m',relativeTolerance:0.08},{field:'gradient'}),
        c('M3','UK','A1.5','uses g=4π²/S',{type:'formulaUse',formula:'g=4pi2/S'}),
        c('A2','UK','A1.5','g close to 9.9 m/s²',{type:'physicsQuantity',quantity:'acceleration',value:9.87,unit:'m/s²',relativeTolerance:0.08},{field:'g'}),
      ]},
      {id:'f',marks:4,objective:'A1.7',prompt:'State one realistic source of error and matching improvement, and explain why timing 20 oscillations helps.',responseFields:['error','precaution','why'],criteria:[
        c('B1','XS','A1.7','names specific error',{type:'writtenConcept',any:['reaction time','parallax','length measurement']},{field:'error'}),
        c('B2','XS','A1.7','matching precaution',{type:'matchedErrorPrecaution',errorField:'error',precautionField:'precaution'},{field:'response'}),
        c('B3','UK','A1.7','longer timing interval reduces fractional timing uncertainty',{type:'writtenConcept',all:['smaller'],any:['fraction','percentage','relative','proportion']},{field:'why'}),
        c('B4','XS','A1.7','repetition/mean identified',{type:'writtenConcept',any:['repeat','mean','average']},{field:'why'}),
      ]},
    ],
  },
  {
    id:'a1-p2-instruments-01',topic:'A1',kind:'structured',marks:15,title:'Measurement and instrument choice',stem:'A student must measure a wire diameter, a tube internal diameter, a pendulum length, a liquid volume and the period of oscillation.',parts:[
      {id:'a',marks:5,objective:'A1.8',prompt:'Name a suitable instrument for each measurement.',criteria:[
        c('B1','KC','A1.8','micrometer for wire',{type:'writtenConcept',all:['micrometer']}),c('B2','KC','A1.8','vernier for internal diameter',{type:'writtenConcept',all:['vernier']}),
        c('B3','KC','A1.8','metre rule/tape for pendulum length',{type:'writtenConcept',any:['metre rule','meter rule','tape']}),c('B4','KC','A1.8','measuring cylinder for volume',{type:'writtenConcept',all:['measuring cylinder']}),c('B5','KC','A1.8','stopwatch/clock for period',{type:'writtenConcept',any:['stopwatch','stop clock','clock']}),
      ]},
      {id:'b',marks:4,objective:'A1.9',prompt:'Explain sensitivity, accuracy and range and why all three matter when choosing an instrument.',criteria:[
        c('B1','KC','A1.9','sensitivity linked to small detectable/scale change',{type:'writtenConcept',any:['small change','scale division','value per division','detect']}),
        c('B2','KC','A1.9','accuracy linked to closeness to accepted/true value',{type:'writtenConcept',all:['close'],any:['true','accepted']}),
        c('B3','KC','A1.9','range linked to interval/min-max',{type:'writtenConcept',any:['interval','minimum','maximum','largest','smallest']}),
        c('B4','UK','A1.9','choice must cover expected value while resolving needed change',{type:'writtenConcept',all:['range'],any:['sensitive','sensitivity','change']}),
      ]},
      {id:'c',marks:3,objective:'A1.7',prompt:'Distinguish random and systematic error and give one way to reduce each.',criteria:[
        c('B1','KC','A1.7','random varies between readings',{type:'writtenConcept',all:['random'],any:['vary','scatter','different']}),
        c('B2','KC','A1.7','systematic gives consistent bias',{type:'writtenConcept',all:['systematic'],any:['same direction','bias','zero','calibration','consistent']}),
        c('B3','UK','A1.7','appropriate reductions stated',{type:'writtenConcept',all:['repeat'],any:['calibrate','zero','correction','average','mean']}),
      ]},
      {id:'d',marks:3,objective:'A1.8',prompt:'Explain how to read the liquid level correctly in a measuring cylinder.',criteria:[
        c('B1','XS','A1.8','eye level',{type:'writtenConcept',all:['eye'],any:['level','same height']}),
        c('B2','XS','A1.8','bottom for concave meniscus',{type:'writtenConcept',all:['bottom','concave']}),
        c('B3','XS','A1.8','top for convex meniscus',{type:'writtenConcept',all:['top','convex']}),
      ]},
    ],
  },
  {
    id:'a1-p2-density-01',topic:'A1',kind:'structured',marks:15,title:'Density of an irregular solid and a liquid',stem:'An irregular solid has mass 135 g. The water level in a measuring cylinder rises from 50.0 cm³ to 100.0 cm³ when the solid is fully submerged.',parts:[
      {id:'a',marks:4,objective:'A1.10',prompt:'Calculate the volume and density of the solid.',responseFields:['volume','density'],criteria:[
        c('M1','UK','A1.10','uses displacement final-initial',{type:'formulaUse',formula:'V=Vfinal-Vinitial'}),
        c('A1','UK','A1.10','volume 50.0 cm³',{type:'physicsQuantity',quantity:'volume',value:50,unit:'cm³'},{field:'volume'}),
        c('M2','UK','A1.10','uses rho=m/V',{type:'formulaUse',formula:'rho=m/V'}),
        c('A2','UK','A1.10','density 2.70 g/cm³ or equivalent',{type:'physicsQuantity',quantity:'density',value:2.70,unit:'g/cm³'},{field:'density'}),
      ]},
      {id:'b',marks:3,objective:'A1.10',prompt:'Convert the density to kg/m³ and describe one precaution when using displacement.',responseFields:['density_si','precaution'],criteria:[
        c('A1','UK','A1.10','2700 kg/m³',{type:'physicsQuantity',quantity:'density',value:2700,unit:'kg/m³'},{field:'density_si'}),
        c('B1','XS','A1.10','solid fully submerged',{type:'writtenConcept',all:['submerged']},{field:'precaution'}),
        c('B2','XS','A1.10','avoids trapped air or reads meniscus correctly',{type:'writtenConcept',any:['air bubble','trapped air','meniscus','eye level']},{field:'precaution'}),
      ]},
      {id:'c',marks:4,objective:'A1.6',prompt:'Explain what significant figures communicate, and round 2.7468 to 3 significant figures and 0.006387 to 2 significant figures.',responseFields:['explanation','first','second'],criteria:[
        c('B1','KC','A1.6','links significant figures to justified precision',{type:'writtenConcept',any:['precision','measurement','justified']},{field:'explanation'}),
        c('B2','UK','A1.6','2.75',{type:'writtenConcept',any:['2.75']},{field:'first'}),
        c('B3','UK','A1.6','0.0064',{type:'writtenConcept',any:['0.0064']},{field:'second'}),
        c('B4','UK','A1.6','rounds at end',{type:'writtenConcept',all:['round'],any:['end','final']},{field:'explanation'}),
      ]},
      {id:'d',marks:4,objective:'A1.1',prompt:'Explain how this density investigation reflects scientific methodology.',criteria:[
        c('B1','KC','A1.1','measurement is used',{type:'writtenConcept',any:['measure','measurement']}),
        c('B2','KC','A1.1','evidence is recorded/analyzed',{type:'writtenConcept',any:['record','data','analyse','analyze','calculation']}),
        c('B3','UK','A1.1','result is used to test/answer a question',{type:'writtenConcept',any:['test','question','evidence','conclusion']}),
        c('B4','UK','A1.1','method can be repeated/checked',{type:'writtenConcept',any:['repeat','reproduce','check']})
      ]},
    ],
  },
]);

export function a1StructuredCoverage(){const objectives=new Set();const profiles={KC:0,UK:0,XS:0};let marks=0;for(const q of A1_STRUCTURED_BANK)for(const p of q.parts)for(const x of p.criteria){objectives.add(x.objective||p.objective);profiles[x.profile]+=x.marks||1;marks+=x.marks||1;}return{questionCount:A1_STRUCTURED_BANK.length,marks,objectives:[...objectives].sort(),profiles};}
