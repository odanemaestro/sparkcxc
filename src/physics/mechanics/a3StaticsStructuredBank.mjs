// SPARK Physics A3 Statics structured and data-analysis production candidates.
// Questions are original and use CSEC-style command language. Marks are split
// into single-mark criteria wherever possible to avoid accidental over-award.
// `profile` uses only the three reported CXC profiles: KC, UK and XS.

const c = (code, profile, objective, description, check = null, extra = {}) => ({
  code, marks: 1, profile, objective, description, ...(check ? { check } : {}), ...extra,
});

export const A3_STRUCTURED_BANK = Object.freeze([
  {
    id: 'a3-p2-beam-01', topic: 'A3', kind: 'structured', marks: 15,
    title: 'A uniform beam in equilibrium',
    stem: 'A uniform metre rule of mass 0.20 kg is supported at the 50 cm mark. A 6.0 N load hangs at the 20 cm mark. A load P hangs at the 80 cm mark. Take g = 10 N/kg.',
    parts: [
      {
        id: 'a', marks: 3, objective: 'A3.8',
        prompt: 'Define the moment of a force about a point and state its SI unit.',
        criteria: [
          c('B1','KC','A3.8','states that moment is force multiplied by a distance',{type:'writtenConcept',all:['force','distance']}),
          c('B2','KC','A3.8','states that the distance is perpendicular from the point/pivot to the line of action',{type:'writtenConcept',all:['perpendicular'],any:['pivot','point','line of action']}),
          c('B3','KC','A3.8','states the unit newton metre',{type:'unitName',quantity:'moment',accepted:['N m','newton metre'],forbidden:['J','joule']}),
        ],
      },
      {
        id: 'b', marks: 2, objective: 'A3.3',
        prompt: 'Calculate the weight of the metre rule.',
        criteria: [
          c('M1','UK','A3.3','uses W = mg',{type:'formulaUse',formula:'W=mg'}),
          c('A1','UK','A3.3','obtains the weight with unit',{type:'physicsQuantity',quantity:'force',value:2.0,unit:'N',tolerance:1e-9},{depends:['M1']}),
        ],
      },
      {
        id: 'c', marks: 2, objective: 'A3.9',
        prompt: 'Explain why the weight of the uniform metre rule produces no moment about the support.',
        criteria: [
          c('B1','KC','A3.11','states that the centre of gravity of the uniform rule is at the 50 cm mark',{type:'writtenConcept',all:['50'],any:['centre of gravity','center of gravity']}),
          c('B2','UK','A3.9','states that the line of action passes through the pivot so the perpendicular distance is zero',{type:'writtenConcept',all:['zero'],any:['distance','line of action','pivot']}),
        ],
      },
      {
        id: 'd', marks: 5, objective: 'A3.9',
        prompt: 'Calculate P.',
        criteria: [
          c('M1','UK','A3.9','finds the 0.30 m moment arm of the 6.0 N load',{type:'containsQuantity',quantity:'length',value:0.30,unit:'m',acceptedUnits:['m','cm']}),
          c('M2','UK','A3.9','calculates the 6.0 N moment as 1.8 N m',{type:'containsQuantity',quantity:'moment',value:1.8,unit:'N m'}),
          c('M3','UK','A3.9','applies clockwise moment = anticlockwise moment',{type:'writtenConcept',all:['clockwise','anticlockwise'],any:['equal','=', 'equilibrium']}),
          c('M4','UK','A3.9','uses the 0.30 m moment arm for P',{type:'containsQuantity',quantity:'length',value:0.30,unit:'m',acceptedUnits:['m','cm']}),
          c('A1','UK','A3.9','obtains P = 6.0 N',{type:'physicsQuantity',quantity:'force',value:6.0,unit:'N',tolerance:1e-9},{depends:['M3']}),
        ],
      },
      {
        id: 'e', marks: 3, objective: 'A3.12',
        prompt: 'A tall box is more stable when placed on its broad face. Explain why.',
        criteria: [
          c('B1','UK','A3.12','identifies the wider base',{type:'writtenConcept',any:['wider base','broad base','larger base']}),
          c('B2','UK','A3.12','identifies the lower centre of gravity in the broad-face orientation',{type:'writtenConcept',all:['lower'],any:['centre of gravity','center of gravity']}),
          c('B3','UK','A3.12','explains that the line of action of weight must move outside the base before toppling',{type:'writtenConcept',all:['outside','base'],any:['line of action','weight','vertical']}),
        ],
      },
    ],
  },
  {
    id: 'a3-p2-spring-data-01', topic: 'A3', kind: 'data analysis', marks: 25,
    title: 'Force and extension of a spring',
    stem: 'A student investigates the extension of a spring. Its original length is 10.0 cm. The student adds loads and records the spring length. Take g = 10 N/kg.\nMass / g: 0, 50, 100, 150, 200, 250, 300\nLength / cm: 10.0, 11.0, 12.0, 13.0, 14.0, 15.1, 16.8',
    parts: [
      {
        id: 'a', marks: 5, objective: 'A3.13',
        prompt: 'Calculate the force and extension for the 200 g load, and state the manipulated and responding variables.',
        responseFields: ['force','extension','manipulated','responding'],
        criteria: [
          c('M1','UK','A3.3','converts 200 g to 0.200 kg',{type:'containsQuantity',quantity:'mass',value:0.200,unit:'kg'}, {field:'working'}),
          c('A1','UK','A3.3','gives force = 2.0 N',{type:'physicsQuantity',quantity:'force',value:2.0,unit:'N'}, {field:'force'}),
          c('A2','UK','A3.13','gives extension = 4.0 cm',{type:'physicsQuantity',quantity:'length',value:0.040,unit:'m'}, {field:'extension'}),
          c('B1','XS','A3.13','identifies force/load as the manipulated variable',{type:'writtenConcept',any:['force','load','weight']}, {field:'manipulated'}),
          c('B2','XS','A3.13','identifies extension as the responding variable',{type:'writtenConcept',any:['extension']}, {field:'responding'}),
        ],
      },
      {
        id: 'b', marks: 6, objective: 'A1.3', requireDrawing: true,
        prompt: 'Plot force on the vertical axis against extension on the horizontal axis. Draw the best-fit straight line through the proportional region and show the final reading.',
        criteria: [
          c('B1','XS','A1.3','horizontal axis labelled extension with unit',null,{manual:true}),
          c('B2','XS','A1.3','vertical axis labelled force with unit',null,{manual:true}),
          c('B3','XS','A1.3','sensible scale using a large part of the grid',null,{manual:true}),
          c('B4','XS','A1.3','points plotted accurately',null,{manual:true}),
          c('B5','XS','A1.4','best-fit straight line drawn for the proportional region',null,{manual:true}),
          c('B6','UK','A3.13','recognises that the last reading departs from the proportional trend',{type:'writtenConcept',any:['300','last','6.8','off the line','not proportional','curve']}),
        ],
      },
      {
        id: 'c', marks: 4, objective: 'A1.5', requireDrawing: true,
        prompt: 'Use the straight part of the graph to determine the spring constant. Give your answer in N/m.',
        criteria: [
          c('M1','XS','A1.5','uses a large gradient triangle on the best-fit line',null,{manual:true}),
          c('M2','UK','A1.5','uses change in force divided by change in extension',{type:'formulaUse',formula:'gradient=deltaF/deltax'}),
          c('A1','UK','A3.14','obtains a spring constant close to 50 N/m',{type:'physicsQuantity',quantity:'spring_constant',value:50,unit:'N/m',relativeTolerance:0.08},{depends:['M2']}),
          c('B1','KC','A3.14','identifies the force-extension gradient as the spring constant',{type:'writtenConcept',any:['spring constant','k']}),
        ],
      },
      {
        id: 'd', marks: 4, objective: 'A3.14',
        prompt: "State Hooke's law and explain why the 300 g reading should not be used to calculate k for the proportional region.",
        criteria: [
          c('B1','KC','A3.14','states that extension is proportional to applied force',{type:'writtenConcept',all:['extension','force','proportional']}),
          c('B2','KC','A3.14','states the condition that the limit of proportionality is not exceeded',{type:'writtenConcept',any:['limit of proportionality','proportional limit']}),
          c('B3','UK','A3.13','states that the 300 g point no longer lies on the straight proportional trend',{type:'writtenConcept',any:['not proportional','off the line','curve','not straight']}),
          c('B4','UK','A3.14','explains that F/x would no longer represent the constant gradient k of the proportional region',{type:'writtenConcept',all:['k'],any:['gradient','constant','proportional region']}),
        ],
      },
      {
        id: 'e', marks: 6, objective: 'A1.7',
        prompt: 'Give one source of measurement error and a matching precaution. Then state two improvements that help determine whether the spring has been permanently deformed.',
        responseFields: ['error','precaution','improvement1','improvement2','analysis'],
        criteria: [
          c('B1','XS','A1.7','names a specific measurement error',{type:'writtenConcept',any:['parallax','zero error','spring not vertical','ruler not vertical']}, {field:'error'}),
          c('B2','XS','A1.7','gives a precaution that matches the named error',{type:'matchedErrorPrecaution',errorField:'error',precautionField:'precaution'}, {field:'response'}),
          c('B3','XS','A3.13','takes readings while removing loads',{type:'writtenConcept',any:['remove','unload','decreasing load']}, {field:'improvement1'}),
          c('B4','XS','A3.13','checks whether the spring returns to its original length',{type:'writtenConcept',all:['original'],any:['length','returns','return']}, {field:'improvement2'}),
          c('B5','UK','A3.13','links failure to return with permanent deformation',{type:'writtenConcept',any:['permanent deformation','elastic limit exceeded','does not return']}, {field:'analysis'}),
          c('B6','UK','A3.13','distinguishes limit of proportionality from elastic limit',{type:'writtenConcept',all:['limit of proportionality','elastic limit'],any:['different','not the same','distinct']}, {field:'analysis'}),
        ],
      },
    ],
  },
  {
    id: 'a3-p2-levers-cg-01', topic: 'A3', kind: 'structured', marks: 15,
    title: 'Levers, centre of gravity and stability',
    stem: 'A student studies a bottle opener, an irregular cardboard lamina and a model vehicle.',
    parts: [
      {
        id: 'a', marks: 4, objective: 'A3.10',
        prompt: 'Explain how a bottle opener acts as a lever and why a long handle reduces the effort needed.',
        criteria: [
          c('B1','KC','A3.10','identifies the fulcrum/pivot',{type:'writtenConcept',any:['fulcrum','pivot']}),
          c('B2','KC','A3.10','identifies that the load lies between fulcrum and effort for a second-class lever',{type:'writtenConcept',all:['load'],any:['between','second class','second-class']}),
          c('B3','UK','A3.10','states that a longer effort arm gives a greater moment for the same effort',{type:'writtenConcept',all:['moment'],any:['longer','greater distance','effort arm']}),
          c('B4','UK','A3.10','concludes that a smaller effort can balance the load moment',{type:'writtenConcept',all:['smaller'],any:['effort','force']}),
        ],
      },
      {
        id: 'b', marks: 5, objective: 'A3.11',
        prompt: 'Describe how to locate the centre of gravity of the irregular lamina using a plumbline.',
        criteria: [
          c('B1','XS','A3.11','suspends the lamina freely from a point',{type:'writtenConcept',all:['suspend'],any:['freely','point']}),
          c('B2','XS','A3.11','hangs a plumbline from the same suspension point',{type:'writtenConcept',all:['plumb'],any:['same point','suspension']}),
          c('B3','XS','A3.11','marks/draws the vertical line',{type:'writtenConcept',any:['draw the line','mark the line','vertical line']}),
          c('B4','XS','A3.11','repeats from another suspension point',{type:'writtenConcept',all:['repeat'],any:['another point','second point','different point']}),
          c('B5','UK','A3.11','identifies the intersection of the lines as the centre of gravity',{type:'writtenConcept',all:['intersection'],any:['centre of gravity','center of gravity']}),
        ],
      },
      {
        id: 'c', marks: 6, objective: 'A3.12',
        prompt: 'The model vehicle is made wider and its battery is moved lower. Explain how each change affects stability and state the condition for toppling.',
        criteria: [
          c('B1','UK','A3.12','wider base increases stability',{type:'writtenConcept',all:['wider'],any:['stable','stability']}),
          c('B2','UK','A3.12','wider base requires a larger tilt before the weight line leaves the base',{type:'writtenConcept',all:['base'],any:['larger angle','more tilt','further','line of action']}),
          c('B3','UK','A3.12','lower battery lowers the centre of gravity',{type:'writtenConcept',all:['lower'],any:['centre of gravity','center of gravity']}),
          c('B4','UK','A3.12','lower centre of gravity increases stability',{type:'writtenConcept',all:['stable'],any:['lower centre','lower center']}),
          c('B5','KC','A3.12','states that weight acts vertically through the centre of gravity',{type:'writtenConcept',all:['weight'],any:['vertical','line of action','centre of gravity','center of gravity']}),
          c('B6','UK','A3.12','states that toppling begins when that vertical line passes outside the base',{type:'writtenConcept',all:['outside','base'],any:['vertical','line of action','weight']}),
        ],
      },
    ],
  },
]);

export function a3StructuredCoverage() {
  const objectives = new Set();
  const profiles = { KC:0, UK:0, XS:0 };
  let marks = 0;
  for (const q of A3_STRUCTURED_BANK) {
    for (const part of q.parts) {
      for (const criterion of part.criteria) {
        objectives.add(criterion.objective || part.objective);
        profiles[criterion.profile] += criterion.marks || 1;
        marks += criterion.marks || 1;
      }
    }
  }
  return { questionCount:A3_STRUCTURED_BANK.length, marks, objectives:[...objectives].sort(), profiles };
}
