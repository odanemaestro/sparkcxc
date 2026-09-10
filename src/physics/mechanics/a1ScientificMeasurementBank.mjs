// SPARK Physics A1 Scientific Method and Measurement production-candidate bank.
// All items are original. `profile` describes this item, not an official
// per-objective CXC profile label.

export const A1_OBJECTIVES = Object.freeze({
  'A1.1':'discuss how the methodology employed by Galileo contributed to the development of Physics',
  'A1.2':'investigate the factors which might affect the period of a simple pendulum',
  'A1.3':'use graphs of experimental data from the simple pendulum',
  'A1.4':'draw a line of ‘best fit’ for a set of plotted values',
  'A1.5':'determine the gradient of the straight line graph',
  'A1.6':'express the result of a measurement or calculation to an appropriate number of significant figures',
  'A1.7':'discuss possible types and sources of error in any measurement',
  'A1.8':'use a variety of instruments to measure different quantities',
  'A1.9':'assess the suitability of instruments on the basis of sensitivity, accuracy and range',
  'A1.10':'apply the formula for density: ρ = m / V',
});

const q=(id,objective,profile,stem,options,answer,explanation,tags=[])=>({
  id,objective,topic:'A1',profile,stem,options,answer,explanation,
  traps:options.map((_,i)=>i===answer?'':`This option does not satisfy the physics or measurement requirement in the question.`),
  tags,
});

export const A1_MCQ_BANK = Object.freeze([
  // A1.1 Galileo / scientific method
  q('a1-1-01','A1.1','KC','Which statement best describes Galileo’s methodological contribution to Physics?',
    ['He replaced measurement with logical argument','He tested ideas using observation, measurement and experiment','He showed that every accepted theory is permanent','He avoided mathematical descriptions of motion'],1,
    'The syllabus emphasis is on testing ideas using evidence and measurement, with mathematical description where appropriate.',['scientific-method']),
  q('a1-1-02','A1.1','UK','A claim says heavier objects must always fall faster because an ancient authority said so. Which response is most consistent with Galileo’s methodology?',
    ['Accept the claim because it is old','Design measurements that could test the claim','Vote on which answer sounds reasonable','Change the claim so it cannot be disproved'],1,
    'A scientific claim should be tested against observation or experiment rather than accepted only from authority.',['scientific-method','evidence']),
  q('a1-1-03','A1.1','KC','A useful scientific hypothesis should be',
    ['impossible to test','stated so evidence could support or challenge it','true by definition','based only on opinion'],1,
    'A hypothesis must be testable so observations can count for or against it.',['hypothesis']),
  q('a1-1-04','A1.1','UK','A student changes two important factors at the same time and observes a different result. Why is the conclusion weak?',
    ['There are too many units','The student cannot tell which changed factor caused the effect','Every investigation must use a graph','Two factors always cancel'],1,
    'A fair test normally changes one manipulated variable while controlling other relevant factors.',['variables','fair-test']),
  q('a1-1-05','A1.1','KC','Which sequence best represents a scientific investigation?',
    ['Conclusion → hypothesis → no measurements','Observation/question → hypothesis → experiment → analysis → conclusion','Formula → opinion → answer','Authority → memorise → repeat'],1,
    'The scientific method connects a testable idea to measured evidence and a conclusion.',['scientific-method']),

  // A1.2 pendulum
  q('a1-2-01','A1.2','UK','A student investigates how pendulum length affects period. Which is the manipulated variable?',
    ['Period','Length','Mass of bob','Time for 20 swings'],1,
    'Length is deliberately changed; period is measured as the response.',['pendulum','variables']),
  q('a1-2-02','A1.2','UK','While investigating the effect of pendulum length, which pair should be kept constant?',
    ['Length and period','Mass of bob and initial angle','Period and time','Length and number of oscillations'],1,
    'Mass and initial angle are controlled while length is varied.',['pendulum','controlled-variable']),
  q('a1-2-03','A1.2','UK','Why is the time for 20 oscillations often measured instead of one oscillation?',
    ['It changes the true period','It makes reaction-time uncertainty a smaller fraction of the total time','It makes the bob heavier','It removes gravity'],1,
    'A longer timing interval reduces the fractional effect of start/stop reaction-time uncertainty.',['pendulum','measurement']),
  q('a1-2-04','A1.2','KC','For a simple pendulum in the small-angle regime, increasing the length causes the period to',
    ['decrease','increase','become zero','depend on bob mass'],1,
    'The small-angle relation T = 2π√(l/g) shows that period increases with length.',['pendulum','relationship']),
  q('a1-2-05','A1.2','UK','Which statement about pendulum amplitude is most accurate?',
    ['Angle has no effect at any amplitude','At small angles the effect is very small, but large amplitudes make the period longer','Larger angle always halves the period','Angle matters only because the bob becomes heavier'],1,
    'The familiar simple-pendulum formula is a small-angle approximation; large amplitudes lengthen the period.',['pendulum','small-angle']),

  // A1.3 graphs
  q('a1-3-01','A1.3','KC','For a graph of T² against l, which quantity belongs on the horizontal axis?',
    ['T²','l','T','g'],1,
    'In “y against x”, the second quantity x is placed on the horizontal axis.',['graphs','axes']),
  q('a1-3-02','A1.3','UK','Which graph is expected to be approximately linear for a small-angle simple pendulum?',
    ['T against l','T² against l','l² against T² only','T against 1/l'],1,
    'Squaring T gives T² = (4π²/g)l, which is linear in l.',['graphs','pendulum']),
  q('a1-3-03','A1.3','KC','A good graph axis label is',
    ['length','metres','l / m','horizontal'],2,
    'A clear axis label identifies both the physical quantity and its unit.',['graphs','units']),
  q('a1-3-04','A1.3','UK','Which scale is generally preferable for plotting experimental points?',
    ['One that uses a large fraction of the grid and is easy to read','One that squeezes all points into one corner','An irregular scale that changes midway','Any scale with no numbers'],0,
    'A sensible regular scale should use much of the available grid and support accurate plotting.',['graphs','scale']),
  q('a1-3-05','A1.3','KC','Why is a graph useful in analysing experimental data?',
    ['It guarantees the experiment is correct','It shows trends and scatter that may be less obvious in a table','It removes every error','It replaces the need for units'],1,
    'Graphs reveal relationships, trends, scatter and anomalies while preserving the measured data.',['graphs','analysis']),

  // A1.4 best fit
  q('a1-4-01','A1.4','KC','A line of best fit should usually',
    ['join every plotted point in order','represent the overall trend with scatter reasonably balanced about it','pass through the first and last point','be forced through the origin'],1,
    'Best fit represents the overall trend rather than joining individual readings.',['best-fit']),
  q('a1-4-02','A1.4','UK','One plotted value lies far from an otherwise clear trend. What is the best scientific response?',
    ['Delete it immediately','Check the reading and repeat it if possible','Move it onto the line','Ignore all other readings'],1,
    'An anomalous value should be investigated rather than automatically removed.',['best-fit','anomaly']),
  q('a1-4-03','A1.4','KC','Which method is NOT a best-fit method?',
    ['Drawing a straight trend line through the scatter','Balancing points around the trend','Joining each point to the next point','Using a ruler for a straight relationship'],2,
    'Dot-to-dot joining follows measurement scatter rather than estimating the underlying trend.',['best-fit']),
  q('a1-4-04','A1.4','UK','When should a best-fit line be forced through the origin?',
    ['Always','Never','Only when the physical relationship and data justify it','Whenever the first reading is near zero'],2,
    'The origin is used only when justified by the expected relationship and the evidence.',['best-fit','origin']),
  q('a1-4-05','A1.4','KC','The purpose of a best-fit line is mainly to',
    ['hide uncertainty','represent the underlying trend in scattered measurements','make all readings identical','remove units'],1,
    'A best-fit line gives a reasonable representation of the relationship despite experimental scatter.',['best-fit','analysis']),

  // A1.5 gradient
  q('a1-5-01','A1.5','KC','The gradient of a straight-line graph is',
    ['Δx/Δy','Δy/Δx','x+y','xy'],1,
    'Gradient is change in the vertical quantity divided by change in the horizontal quantity.',['gradient']),
  q('a1-5-02','A1.5','UK','Why should a large triangle be used to determine a graph gradient?',
    ['It makes the line steeper','It reduces the percentage effect of reading uncertainty','It changes the unit','It guarantees the origin is included'],1,
    'Using points far apart makes coordinate-reading uncertainty small compared with Δx and Δy.',['gradient','uncertainty']),
  q('a1-5-03','A1.5','UK','A T²-versus-l line passes through (0.20 m, 0.80 s²) and (0.70 m, 2.80 s²). Its gradient is',
    ['0.25 s²/m','4.0 s²/m','2.0 s²/m','1.4 s²/m'],1,
    'Gradient = (2.80−0.80)/(0.70−0.20) = 2.00/0.50 = 4.0 s²/m.',['gradient','calculation']),
  q('a1-5-04','A1.5','KC','The unit of the gradient of T² in s² against l in m is',
    ['m/s²','s²/m','s/m²','s² m'],1,
    'Gradient unit = vertical unit / horizontal unit = s²/m.',['gradient','unit']),
  q('a1-5-05','A1.5','UK','If the gradient S of T² against l is 4.00 s²/m, which expression gives g?',
    ['S/(4π²)','4π²/S','2π/S','S²/(4π)'],1,
    'From S = 4π²/g, rearrange to g = 4π²/S.',['gradient','pendulum','rearrangement']),

  // A1.6 significant figures
  q('a1-6-01','A1.6','KC','How many significant figures are in 0.0250?',
    ['2','3','4','1'],1,
    'Leading zeros are not significant; 2, 5 and the trailing decimal zero are significant.',['significant-figures']),
  q('a1-6-02','A1.6','UK','12.746 written to 3 significant figures is',
    ['12.7','12.75','12.746','13.0'],0,
    'The first three significant digits are 1, 2, 7 and the next digit is 4, so the result is 12.7.',['significant-figures','rounding']),
  q('a1-6-03','A1.6','UK','0.006387 written to 2 significant figures is',
    ['0.0063','0.0064','0.00639','0.64'],1,
    'The first two significant digits are 6 and 3; the next digit 8 rounds 3 upward.',['significant-figures','rounding']),
  q('a1-6-04','A1.6','KC','Which statement about significant figures and decimal places is correct?',
    ['They always mean the same thing','Significant figures count from the first significant digit; decimal places count digits after the decimal point','Decimal places ignore the decimal point','Significant figures count only digits before the decimal point'],1,
    'They are different ways of describing numerical precision.',['significant-figures','decimal-places']),
  q('a1-6-05','A1.6','UK','Why is it usually better to round only the final answer in a multi-step calculation?',
    ['Intermediate rounding can accumulate error','It makes units unnecessary','It changes the formula','Calculators cannot store decimals'],0,
    'Keeping guard digits through the working reduces avoidable rounding error.',['significant-figures','calculation']),

  // A1.7 errors
  q('a1-7-01','A1.7','KC','Readings fluctuate above and below the best estimate because of small unpredictable variations. This is mainly',
    ['random error','systematic error','zero correction','a unit conversion'],0,
    'Random error varies between repeated measurements.',['errors','random']),
  q('a1-7-02','A1.7','KC','An instrument reads +0.20 when the true zero should be 0.00. This produces primarily',
    ['random scatter','a systematic zero error','no error','a vector error'],1,
    'A zero offset shifts measurements consistently until corrected.',['errors','systematic','zero-error']),
  q('a1-7-03','A1.7','UK','Which action best reduces parallax when reading an analogue scale?',
    ['Read from farther away','Place the eye level and perpendicular to the scale','Take only one reading','Round to fewer figures'],1,
    'Parallax is reduced by viewing the scale square-on at the correct level.',['errors','parallax']),
  q('a1-7-04','A1.7','UK','Which statement about reaction time in stopwatch measurements is most accurate?',
    ['It is always exactly the same delay','Its start/stop effect can vary, so timing many cycles and repeating helps reduce its fractional influence','It is removed by using more significant figures','It changes the true period'],1,
    'Human response varies; longer timing intervals and repeated trials reduce its relative effect.',['errors','reaction-time']),
  q('a1-7-05','A1.7','KC','Which is the best examination description of a source of error?',
    ['human error','the eye was above the meniscus, causing parallax','something went wrong','bad experiment'],1,
    'A useful error statement identifies the actual measurement problem and mechanism.',['errors','exam-language']),

  // A1.8 instruments
  q('a1-8-01','A1.8','KC','Which instrument is most suitable for measuring the diameter of a thin wire?',
    ['Metre rule','Micrometer screw gauge','Measuring cylinder','Stopwatch'],1,
    'A micrometer is designed for very small thicknesses and diameters.',['instruments','micrometer']),
  q('a1-8-02','A1.8','KC','Which instrument is suitable for measuring the internal diameter of a small tube?',
    ['Vernier caliper','Balance','Stopwatch','Thermometer'],0,
    'The inside jaws of a vernier caliper can measure internal diameter.',['instruments','vernier']),
  q('a1-8-03','A1.8','UK','When reading water in a measuring cylinder, the eye should be level with',
    ['the bottom of its concave meniscus','the top of the cylinder','any point above the liquid','the base of the table'],0,
    'For water in clean glass, read the bottom of the concave meniscus at eye level.',['instruments','meniscus']),
  q('a1-8-04','A1.8','KC','Which instrument measures mass?',
    ['Balance','Spring only','Measuring cylinder','Metre rule'],0,
    'A balance measures mass.',['instruments','mass']),
  q('a1-8-05','A1.8','UK','A liquid has a convex meniscus. Which part should be read?',
    ['The bottom','The top','The centre regardless of shape','The cylinder rim'],1,
    'For a convex meniscus, the top is the appropriate reading point; the bottom rule is not universal.',['instruments','meniscus']),

  // A1.9 suitability
  q('a1-9-01','A1.9','KC','The range of an instrument describes',
    ['how close readings are to the accepted value','the interval of values it can measure','how expensive it is','the number of significant figures on a calculator'],1,
    'Range is the span from the lowest to highest measurable value.',['instrument-suitability','range']),
  q('a1-9-02','A1.9','KC','Accuracy refers to',
    ['closeness to the accepted or true value','smallest scale division only','maximum capacity only','number of repeats'],0,
    'Accuracy concerns closeness to the accepted value.',['instrument-suitability','accuracy']),
  q('a1-9-03','A1.9','UK','Two ammeters have 100 equal divisions. One ranges from 0–1 A and the other from 0–10 A. Which has the smaller value per division?',
    ['0–1 A meter','0–10 A meter','Both are identical','Cannot be compared'],0,
    'The 0–1 A meter has 0.01 A per division; the 0–10 A meter has 0.1 A per division.',['instrument-suitability','sensitivity']),
  q('a1-9-04','A1.9','UK','Why might the most sensitive instrument still be unsuitable?',
    ['Its range may not include the expected value','Sensitivity always makes an instrument inaccurate','Sensitive instruments cannot be calibrated','It has no unit'],0,
    'Suitability requires adequate sensitivity and an appropriate range, as well as acceptable accuracy.',['instrument-suitability','range']),
  q('a1-9-05','A1.9','KC','Which statement is correct?',
    ['Sensitivity and accuracy mean exactly the same thing','A sensitive instrument may still give inaccurate readings if badly calibrated','A wide range guarantees high accuracy','A narrow range always means low sensitivity'],1,
    'Sensitivity concerns detecting small changes; calibration can still make readings inaccurate.',['instrument-suitability','accuracy']),

  // A1.10 density
  q('a1-10-01','A1.10','UK','A solid has mass 240 g and volume 80 cm³. Its density is',
    ['0.33 g/cm³','3.0 g/cm³','320 g/cm³','19 200 g/cm³'],1,
    'ρ = m/V = 240/80 = 3.0 g/cm³.',['density','calculation']),
  q('a1-10-02','A1.10','UK','The water level rises from 42.0 cm³ to 57.5 cm³ when an irregular stone is submerged. Its volume is',
    ['99.5 cm³','15.5 cm³','57.5 cm³','42.0 cm³'],1,
    'Displacement volume = final − initial = 57.5 − 42.0 = 15.5 cm³.',['density','displacement']),
  q('a1-10-03','A1.10','UK','2.70 g/cm³ is equal to',
    ['2.70 kg/m³','27 kg/m³','270 kg/m³','2700 kg/m³'],3,
    '1 g/cm³ = 1000 kg/m³, so 2.70 g/cm³ = 2700 kg/m³.',['density','unit-conversion']),
  q('a1-10-04','A1.10','KC','Density is defined as',
    ['volume per unit mass','mass per unit volume','mass × volume','weight per unit time'],1,
    'Density is mass divided by volume.',['density','definition']),
  q('a1-10-05','A1.10','UK','An object has mass 135 g. Water rises from 50.0 cm³ to 100.0 cm³ when it is submerged. Its density is',
    ['1.35 g/cm³','2.70 g/cm³','6.75 g/cm³','270 g/cm³'],1,
    'Volume = 50.0 cm³, so density = 135/50.0 = 2.70 g/cm³.',['density','calculation','displacement']),
]);

function makeFlashcards(){
  const prompts = {
    'A1.1':[
      ['What was central to Galileo’s methodology?','Testing ideas using observation, measurement and experiment.'],
      ['Why is a testable hypothesis important?','Evidence must be able to support or challenge it.'],
      ['What makes an investigation a fair test?','Change one manipulated variable while controlling other important factors.'],
    ],
    'A1.2':[
      ['How is pendulum length measured?','From the point of suspension to the centre of the bob.'],
      ['Why time many oscillations?','To reduce the fractional effect of reaction-time uncertainty.'],
      ['What is true about amplitude?','At small angles its effect is very small; at larger amplitudes the period increases.'],
    ],
    'A1.3':[
      ['In “T² against l”, which axis gets l?','The horizontal axis.'],
      ['Why plot T² against l?','The small-angle relation is linear: T² ∝ l.'],
      ['What belongs in an axis label?','The physical quantity and its unit.'],
    ],
    'A1.4':[
      ['What is a line of best fit?','A line representing the overall trend of scattered data.'],
      ['Should you join experimental points dot-to-dot?','No, not when a best-fit line or curve is required.'],
      ['What should you do with an anomalous point?','Check or repeat it if possible; do not delete it automatically.'],
    ],
    'A1.5':[
      ['Gradient formula?','Δy/Δx.'],
      ['Why use a large gradient triangle?','It reduces the percentage effect of coordinate-reading uncertainty.'],
      ['Unit of gradient?','Vertical-axis unit divided by horizontal-axis unit.'],
    ],
    'A1.6':[
      ['How many significant figures in 0.0250?','Three.'],
      ['When should you round a multi-step calculation?','Usually at the final answer, keeping guard digits during working.'],
      ['Significant figures vs decimal places?','Significant figures count meaningful digits; decimal places count digits after the decimal point.'],
    ],
    'A1.7':[
      ['Random error?','Unpredictable variation between repeated readings.'],
      ['Systematic error?','A consistent bias such as zero or calibration error.'],
      ['How is parallax reduced?','Read the scale at eye level and perpendicular to it.'],
    ],
    'A1.8':[
      ['Best instrument for a thin-wire diameter?','Micrometer screw gauge.'],
      ['Best instrument for internal diameter?','Vernier caliper.'],
      ['Meniscus rule?','Read a concave meniscus at the bottom and a convex meniscus at the top, at eye level.'],
    ],
    'A1.9':[
      ['What is range?','The interval of values an instrument can measure.'],
      ['What is accuracy?','Closeness of a measurement to the accepted or true value.'],
      ['What does a smaller value per scale division indicate?','Greater sensitivity for that scale.'],
    ],
    'A1.10':[
      ['Density formula?','ρ = m/V.'],
      ['How do you find the volume of an irregular solid?','Use displacement: final liquid volume minus initial liquid volume.'],
      ['Key density conversion?','1 g/cm³ = 1000 kg/m³.'],
    ],
  };
  const out=[];
  for(const [objective,cards] of Object.entries(prompts)) cards.forEach(([front,back],i)=>out.push({id:`fc-${objective.toLowerCase().replace('.','-')}-${i+1}`,objective,topic:'A1',front,back}));
  return out;
}
export const A1_FLASHCARDS = Object.freeze(makeFlashcards());

export function buildA1TopicTest({seed=1,count=10}={}){
  if(count < 10) throw new Error('A1 topic test must contain at least 10 questions to cover all objectives.');
  const objectives=Object.keys(A1_OBJECTIVES);
  let state=(Number(seed)>>>0)||1;
  const rnd=()=>((state=(1664525*state+1013904223)>>>0)/4294967296);
  const chosen=[];
  for(const obj of objectives){
    const pool=A1_MCQ_BANK.filter(x=>x.objective===obj);
    chosen.push(pool[Math.floor(rnd()*pool.length)]);
  }
  const remaining=A1_MCQ_BANK.filter(x=>!chosen.some(c=>c.id===x.id));
  while(chosen.length<count && remaining.length){
    const idx=Math.floor(rnd()*remaining.length); chosen.push(remaining.splice(idx,1)[0]);
  }
  for(let i=chosen.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[chosen[i],chosen[j]]=[chosen[j],chosen[i]];}
  return chosen;
}
