const round = (value, dp = 2) => Number(value).toFixed(dp).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
const money = value => Number(value).toFixed(2);
const fraction = (num, den) => {
  let a = Math.trunc(num);
  let b = Math.trunc(den);
  const gcd = (x, y) => {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) [x, y] = [y, x % y];
    return x || 1;
  };
  if (b < 0) { a = -a; b = -b; }
  const d = gcd(a, b);
  return `${a / d}/${b / d}`;
};
const q = (position, variant, topic, stem, parts, extra = {}) => ({
  question_id: `p2-q${position}-v${variant}`,
  question_number: position,
  section: position <= 7 ? "I" : "II",
  marks: parts.reduce((sum, part) => sum + part.marks, 0),
  topic,
  stem,
  parts,
  source: "SPARK original CSEC-style expansion",
  content_class: "SPARK_CXC_STYLE",
  ...extra,
});
const p = (id, label, prompt, marks, answer, solution, extra = {}) => ({
  id, label, prompt, marks, answer: String(answer), solution, ...extra,
});

function q1() {
  const variants = [
    { units: 240, usd: 135, rate: 158.40, duty: 18, profit: 25 },
    { units: 180, usd: 220, rate: 156.75, duty: 12, profit: 20 },
    { units: 320, usd: 84, rate: 159.20, duty: 15, profit: 30 },
    { units: 150, usd: 310, rate: 157.60, duty: 10, profit: 22 },
  ];
  return variants.map((v, i) => {
    const localCost = v.units * v.usd * v.rate;
    const duty = localCost * v.duty / 100;
    const landed = localCost + duty;
    const unitCost = landed / v.units;
    const selling = unitCost * (1 + v.profit / 100);
    return q(1, i + 7, "Computation and consumer arithmetic",
      `A business imports ${v.units} electronic devices at a cost of US$${v.usd} each. The exchange rate is US$1 = J$${money(v.rate)}. Import charges are ${v.duty}% of the cost in Jamaican dollars. Each device is sold at a profit of ${v.profit}% on its landed cost.`, [
        p("a", "(a)", "Calculate the total cost of the devices in Jamaican dollars before import charges.", 2, money(localCost), `Cost = ${v.units} × ${v.usd} × ${money(v.rate)} = J$${money(localCost)}.`, { prefix: "J$", tolerance: 0.02 }),
        p("b", "(b)", `Calculate the import charges of ${v.duty}%.`, 2, money(duty), `Import charges = ${v.duty}% of J$${money(localCost)} = J$${money(duty)}.`, { prefix: "J$", tolerance: 0.02 }),
        p("c", "(c)", "Calculate the landed cost of ONE device.", 2, money(unitCost), `Landed total = J$${money(landed)}. Divide by ${v.units}: J$${money(unitCost)} per device.`, { prefix: "J$", tolerance: 0.02 }),
        p("d", "(d)", `Calculate the selling price of ONE device after a profit of ${v.profit}% is added.`, 3, money(selling), `Selling price = ${money(unitCost)} × ${1 + v.profit / 100} = J$${money(selling)}.`, { prefix: "J$", tolerance: 0.02 }),
      ]);
  });
}

function q2() {
  const variants = [
    { difference: 5, perimeter: 46, tile: 185 },
    { difference: 8, perimeter: 64, tile: 210 },
    { difference: 3, perimeter: 38, tile: 160 },
    { difference: 7, perimeter: 58, tile: 195 },
  ];
  return variants.map((v, i) => {
    const width = (v.perimeter / 2 - v.difference) / 2;
    const length = width + v.difference;
    const area = width * length;
    const cost = area * v.tile;
    return q(2, i + 7, "Algebra and measurement",
      `The length of a rectangular floor is ${v.difference} m greater than its width. The perimeter of the floor is ${v.perimeter} m. Tiles cost $${v.tile} per square metre.`, [
        p("a", "(a)", "Calculate the width of the floor.", 3, width, `Let the width be w m. Then the length is w + ${v.difference}. Since 2w + 2(w + ${v.difference}) = ${v.perimeter}, solving gives w = ${width} m.`, { suffix: " m" }),
        p("b", "(b)", "Calculate the length of the floor.", 2, length, `Length = ${width} + ${v.difference} = ${length} m.`, { suffix: " m" }),
        p("c", "(c)", "Calculate the area of the floor.", 2, area, `Area = ${length} × ${width} = ${area} m².`, { suffix: " m²" }),
        p("d", "(d)", "Calculate the cost of tiling the entire floor.", 2, money(cost), `Cost = ${area} × ${v.tile} = $${money(cost)}.`, { prefix: "$", tolerance: 0.02 }),
      ]);
  });
}

function rotate90([x, y], clockwise) { return clockwise ? [y, -x] : [-y, x]; }
function q3() {
  const variants = [
    { A: [-3, 2], B: [1, 2], C: [-1, 6], t: [5, -3], clockwise: true },
    { A: [2, -4], B: [6, -4], C: [4, 1], t: [-3, 6], clockwise: false },
    { A: [-5, -1], B: [-1, -1], C: [-3, 3], t: [7, 2], clockwise: true },
    { A: [1, 3], B: [5, 3], C: [3, 8], t: [-4, -5], clockwise: false },
  ];
  return variants.map((v, i) => {
    const add = P => [P[0] + v.t[0], P[1] + v.t[1]];
    const Ap = add(v.A), Bp = add(v.B), Cp = add(v.C);
    const R = rotate90(Cp, v.clockwise);
    const base = Math.abs(Bp[0] - Ap[0]);
    const height = Math.abs(Cp[1] - Ap[1]);
    const area = base * height / 2;
    return q(3, i + 7, "Geometry and transformations",
      `Triangle ABC has vertices A(${v.A.join(", ")}), B(${v.B.join(", ")}) and C(${v.C.join(", ")}). The triangle is translated by the vector (${v.t[0]}, ${v.t[1]}).`, [
        p("a", "(a)", "State the coordinates of the image A′.", 2, `(${Ap[0]}, ${Ap[1]})`, `A′ = (${v.A[0]} + ${v.t[0]}, ${v.A[1]} + ${v.t[1]}) = (${Ap[0]}, ${Ap[1]}).`, { answerType: "coordinate" }),
        p("b", "(b)", "State the coordinates of the image B′.", 2, `(${Bp[0]}, ${Bp[1]})`, `B′ = (${Bp[0]}, ${Bp[1]}).`, { answerType: "coordinate" }),
        p("c", "(c)", `Point C′ is rotated 90° ${v.clockwise ? "clockwise" : "anticlockwise"} about the origin. State the coordinates of its image.`, 3, `(${R[0]}, ${R[1]})`, `Using the 90° rotation rule gives (${R[0]}, ${R[1]}).`, { answerType: "coordinate" }),
        p("d", "(d)", "Calculate the area of triangle A′B′C′.", 2, area, `Translation preserves size. Base = ${base} and perpendicular height = ${height}. Area = 1/2 × ${base} × ${height} = ${area} square units.`, { suffix: " square units" }),
      ]);
  });
}

function q4() {
  const variants = [
    { m: 3, c: -5, x: 4, target: 16, A: [-2, 7] },
    { m: -2, c: 9, x: -3, target: 1, A: [4, -1] },
    { m: 4, c: 3, x: 5, target: 27, A: [-1, 6] },
    { m: -5, c: -2, x: 2, target: 18, A: [3, 4] },
  ];
  return variants.map((v, i) => {
    const fx = v.m * v.x + v.c;
    const solveX = (v.target - v.c) / v.m;
    const perpM = -1 / v.m;
    const perpC = v.A[1] - perpM * v.A[0];
    const eq = `y=${round(perpM, 3)}x${perpC >= 0 ? "+" : ""}${round(perpC, 3)}`;
    return q(4, i + 7, "Relations, functions and coordinate geometry",
      `The function f is defined by f(x) = ${v.m}x ${v.c >= 0 ? "+" : "−"} ${Math.abs(v.c)}. Point P has coordinates (${v.A[0]}, ${v.A[1]}).`, [
        p("a", "(a)", `Calculate f(${v.x}).`, 2, fx, `f(${v.x}) = ${v.m}(${v.x}) + (${v.c}) = ${fx}.`),
        p("b", "(b)", `Determine the value of x for which f(x) = ${v.target}.`, 2, solveX, `Solve ${v.m}x + (${v.c}) = ${v.target}. Therefore x = ${solveX}.`),
        p("c", "(c)", "State the gradient of a line perpendicular to the graph of f.", 2, round(perpM, 3), `The perpendicular gradient is the negative reciprocal of ${v.m}, so m = ${round(perpM, 3)}.`, { tolerance: 0.0011 }),
        p("d", "(d)", "Determine the equation of the line perpendicular to f and passing through P. Give your answer in the form y = mx + c.", 3, eq, `Use y − ${v.A[1]} = ${round(perpM, 3)}(x − ${v.A[0]}). This gives ${eq}.`, { answerType: "expression", requiredForm: "slope_intercept", tolerance: 0.005 }),
      ]);
  });
}

function q5() {
  const variants = [
    { values: [10,20,30,40,50], freq: [3,6,9,5,2], threshold: 30, sample: 200 },
    { values: [2,4,6,8,10], freq: [4,7,10,6,3], threshold: 6, sample: 150 },
    { values: [5,10,15,20,25], freq: [2,5,8,9,6], threshold: 15, sample: 240 },
    { values: [12,14,16,18,20], freq: [5,8,11,4,2], threshold: 16, sample: 180 },
  ];
  return variants.map((v, i) => {
    const n = v.freq.reduce((a,b) => a+b,0);
    const sum = v.values.reduce((s,x,j) => s + x*v.freq[j],0);
    const mean = sum/n;
    const maxF = Math.max(...v.freq);
    const mode = v.values[v.freq.indexOf(maxF)];
    const favourable = v.values.reduce((s,x,j) => s + (x > v.threshold ? v.freq[j] : 0), 0);
    const prob = fraction(favourable,n);
    const expected = v.sample * favourable / n;
    return q(5, i + 7, "Statistics and probability",
      "The table shows the values recorded in a survey and their frequencies.", [
        p("a", "(a)", "Calculate the mean value.", 3, round(mean, 2), `Σfx = ${sum} and Σf = ${n}. Mean = ${sum} ÷ ${n} = ${round(mean, 2)}.`, { tolerance: 0.011 }),
        p("b", "(b)", "State the mode.", 1, mode, `The highest frequency is ${maxF}, corresponding to ${mode}.`),
        p("c", "(c)", `A record is chosen at random. Calculate the probability that its value is greater than ${v.threshold}. Give your answer as a fraction in its simplest form.`, 2, prob, `There are ${favourable} favourable records out of ${n}. Probability = ${prob}.`, { requiredForm: "simplified_fraction" }),
        p("d", "(d)", `In another sample of ${v.sample} records with the same distribution, calculate the expected number with a value greater than ${v.threshold}.`, 3, round(expected, 2), `Expected number = ${v.sample} × ${favourable}/${n} = ${round(expected, 2)}.`, { tolerance: 0.011 }),
      ], { table: { headers: ["Value", ...v.values.map(String)], rows: [["Frequency", ...v.freq]] } });
  });
}

function q6() {
  const variants = [
    { r: 1.4, depth: 2.5, fill: 0.72, rate: 35 },
    { r: 1.2, depth: 3.0, fill: 0.65, rate: 40 },
    { r: 1.5, depth: 2.2, fill: 0.80, rate: 50 },
    { r: 1.1, depth: 3.4, fill: 0.75, rate: 30 },
  ];
  return variants.map((v, i) => {
    const capacity = Math.PI * v.r * v.r * v.depth;
    const water = capacity * v.fill;
    const remaining = capacity - water;
    return q(6, i + 7, "Measurement, geometry and trigonometry",
      `A cylindrical water tank has internal radius ${v.r} m and height ${v.depth} m. The tank is ${Math.round(v.fill*100)}% full. Water enters at ${v.rate} litres per minute. Use π = 3.142.`, [
        p("a", "(a)", "Calculate the capacity of the tank in cubic metres, correct to 2 decimal places.", 2, round(3.142*v.r*v.r*v.depth,2), `Capacity = πr²h = 3.142 × ${v.r}² × ${v.depth} = ${round(3.142*v.r*v.r*v.depth,2)} m³.`, { suffix: " m³", decimalPlaces: 2 }),
        p("b", "(b)", "Calculate the volume of water currently in the tank in litres, correct to the nearest litre.", 3, Math.round(3.142*v.r*v.r*v.depth*v.fill*1000), `Water volume = capacity × ${v.fill}. Convert m³ to litres by multiplying by 1000, giving approximately ${Math.round(3.142*v.r*v.r*v.depth*v.fill*1000)} litres.`, { suffix: " litres", tolerance: 1 }),
        p("c", "(c)", "Calculate the volume still required to fill the tank, in litres, correct to the nearest litre.", 2, Math.round(3.142*v.r*v.r*v.depth*(1-v.fill)*1000), `Required volume = full capacity − current water = ${Math.round(3.142*v.r*v.r*v.depth*(1-v.fill)*1000)} litres.`, { suffix: " litres", tolerance: 1 }),
        p("d", "(d)", "Calculate the time, in minutes, required to fill the tank, correct to 1 decimal place.", 2, round((3.142*v.r*v.r*v.depth*(1-v.fill)*1000)/v.rate,1), `Time = required litres ÷ ${v.rate} = ${round((3.142*v.r*v.r*v.depth*(1-v.fill)*1000)/v.rate,1)} minutes.`, { suffix: " minutes", decimalPlaces: 1 }),
      ]);
  });
}

function q7() {
  const variants = [
    { first: 8, diff: 5, n: 18, target: 103, sumN: 20 },
    { first: 13, diff: 4, n: 16, target: 89, sumN: 18 },
    { first: 5, diff: 7, n: 14, target: 117, sumN: 15 },
    { first: 21, diff: 3, n: 25, target: 96, sumN: 24 },
  ];
  return variants.map((v, i) => {
    const c = v.first - v.diff;
    const formula = `${v.diff}n${c >= 0 ? "+" : ""}${c}`;
    const nth = v.first + (v.n-1)*v.diff;
    const sum = v.sumN/2 * (2*v.first + (v.sumN-1)*v.diff);
    const terms = [0,1,2,3].map(k => v.first+k*v.diff).join(", ");
    return q(7, i + 7, "Sequences, patterns and investigation",
      `The first four terms of an arithmetic sequence are ${terms}.`, [
        p("a", "(a)", "State the common difference.", 2, v.diff, `The common difference is ${v.diff}.`),
        p("b", "(b)", "Write an expression for the nth term in the form an + b.", 3, formula, `Tₙ = ${v.first} + (n − 1)${v.diff} = ${formula}.`, { answerType: "expression" }),
        p("c", "(c)", `Calculate the ${v.n}th term.`, 2, nth, `T${v.n} = ${formula.replace("n", `(${v.n})`)} = ${nth}.`),
        p("d", "(d)", `Calculate the sum of the first ${v.sumN} terms.`, 3, sum, `Sₙ = n/2[2a + (n − 1)d]. Hence S${v.sumN} = ${sum}.`),
      ]);
  });
}

function q8() {
  const variants = [
    { r1: -3, r2: 7, x: 2, shift: 12 },
    { r1: -5, r2: 4, x: -2, shift: 9 },
    { r1: 2, r2: 9, x: 5, shift: 14 },
    { r1: -6, r2: 3, x: 1, shift: 16 },
  ];
  return variants.map((v, i) => {
    const B = -(v.r1+v.r2), C=v.r1*v.r2;
    const evalY = v.x*v.x + B*v.x + C;
    const vx = (v.r1+v.r2)/2;
    const vy = vx*vx + B*vx + C;
    const disc = B*B - 4*(C-v.shift);
    const s1 = (-B-Math.sqrt(disc))/2, s2=(-B+Math.sqrt(disc))/2;
    return q(8, i + 7, "Algebra, relations and functions",
      `The quadratic function h is defined by h(x) = x² ${B >= 0 ? "+" : "−"} ${Math.abs(B)}x ${C >= 0 ? "+" : "−"} ${Math.abs(C)}.`, [
        p("a", "(a)", "Solve h(x) = 0.", 3, `${v.r1}, ${v.r2}`, `h(x) = (x − (${v.r1}))(x − (${v.r2})), so x = ${v.r1} or x = ${v.r2}.`, { accepted: [`x=${v.r1} or x=${v.r2}`, `x=${v.r2} or x=${v.r1}`] }),
        p("b", "(b)", `Calculate h(${v.x}).`, 3, evalY, `Substitute x = ${v.x}, giving h(${v.x}) = ${evalY}.`),
        p("c", "(c)", "State the coordinates of the turning point of h.", 3, `(${vx}, ${vy})`, `The axis is halfway between the roots, x = ${vx}. Substitution gives y = ${vy}. Turning point = (${vx}, ${vy}).`, { answerType: "coordinate" }),
        p("d", "(d)", `Solve h(x) = ${v.shift}, giving your answers correct to 2 decimal places.`, 3, `${round(s1,2)}, ${round(s2,2)}`, `Solve x² + (${B})x + (${C-v.shift}) = 0. The solutions are x = ${round(s1,2)} or x = ${round(s2,2)}.`, { decimalPlaces: 2 }),
      ]);
  });
}

function q9() {
  const variants = [
    { a: 84, b: 63, C: 72, fence: 4250 },
    { a: 56, b: 71, C: 48, fence: 3800 },
    { a: 95, b: 68, C: 61, fence: 4650 },
    { a: 74, b: 82, C: 53, fence: 4100 },
  ];
  return variants.map((v, i) => {
    const rad=v.C*Math.PI/180;
    const c=Math.sqrt(v.a*v.a+v.b*v.b-2*v.a*v.b*Math.cos(rad));
    const area=0.5*v.a*v.b*Math.sin(rad);
    const perimeter=v.a+v.b+c;
    const cost=perimeter*v.fence;
    return q(9, i + 7, "Geometry and trigonometry",
      `A triangular parcel of land ABC has AB = ${v.a} m, AC = ${v.b} m and angle BAC = ${v.C}°. Fencing costs $${v.fence.toLocaleString()} per metre.`, [
        p("a", "(a)", "Calculate the length BC, correct to 1 decimal place.", 3, round(c,1), `By the cosine rule, BC² = ${v.a}² + ${v.b}² − 2(${v.a})(${v.b})cos ${v.C}°. Hence BC = ${round(c,1)} m.`, { suffix: " m", decimalPlaces: 1 }),
        p("b", "(b)", "Calculate the area of triangle ABC, correct to the nearest square metre.", 3, Math.round(area), `Area = 1/2 × ${v.a} × ${v.b} × sin ${v.C}° = ${Math.round(area)} m² to the nearest square metre.`, { suffix: " m²", tolerance: 1 }),
        p("c", "(c)", "Calculate the perimeter of the parcel, correct to 1 decimal place.", 3, round(perimeter,1), `Perimeter = ${v.a} + ${v.b} + ${round(c,1)} = ${round(perimeter,1)} m.`, { suffix: " m", decimalPlaces: 1 }),
        p("d", "(d)", "Calculate the cost of fencing the parcel, correct to the nearest dollar.", 3, Math.round(cost), `Cost = perimeter × ${v.fence} ≈ $${Math.round(cost).toLocaleString()}.`, { prefix: "$", tolerance: v.fence*0.06 }),
      ]);
  });
}

function q10() {
  const variants = [
    { A:[[3,1],[2,4]], B:[[2,-1],[5,3]], v:[4,-3], k:2 },
    { A:[[2,5],[1,3]], B:[[4,2],[-1,2]], v:[-2,5], k:-3 },
    { A:[[5,-2],[3,1]], B:[[1,4],[2,3]], v:[3,4], k:4 },
    { A:[[1,3],[4,2]], B:[[2,0],[-2,5]], v:[-5,-12], k:-2 },
  ];
  const flat=M=>`${M[0][0]},${M[0][1]},${M[1][0]},${M[1][1]}`;
  return variants.map((v,i)=>{
    const add=[[v.A[0][0]+v.B[0][0],v.A[0][1]+v.B[0][1]],[v.A[1][0]+v.B[1][0],v.A[1][1]+v.B[1][1]]];
    const mult=[
      [v.A[0][0]*v.B[0][0]+v.A[0][1]*v.B[1][0],v.A[0][0]*v.B[0][1]+v.A[0][1]*v.B[1][1]],
      [v.A[1][0]*v.B[0][0]+v.A[1][1]*v.B[1][0],v.A[1][0]*v.B[0][1]+v.A[1][1]*v.B[1][1]],
    ];
    const det=v.A[0][0]*v.A[1][1]-v.A[0][1]*v.A[1][0];
    const kv=[v.k*v.v[0],v.k*v.v[1]];
    return q(10,i+7,"Vectors and matrices",
      `The matrices A = [[${v.A[0].join(", ")}],[${v.A[1].join(", ")}]] and B = [[${v.B[0].join(", ")}],[${v.B[1].join(", ")}]], and the vector v = (${v.v[0]}, ${v.v[1]}), are given.`,[
        p("a","(a)","Calculate A + B.",3,flat(add),`A + B = [[${add[0].join(", ")}],[${add[1].join(", ")}]].`,{answerType:"ordered",inputHint:"Enter the four matrix entries row by row, separated by commas."}),
        p("b","(b)","Calculate AB.",3,flat(mult),`AB = [[${mult[0].join(", ")}],[${mult[1].join(", ")}]].`,{answerType:"ordered",inputHint:"Enter the four matrix entries row by row, separated by commas."}),
        p("c","(c)","Calculate det(A).",3,det,`det(A) = (${v.A[0][0]})(${v.A[1][1]}) − (${v.A[0][1]})(${v.A[1][0]}) = ${det}.`),
        p("d","(d)",`Calculate ${v.k}v.`,3,`(${kv[0]}, ${kv[1]})`,`${v.k}v = (${kv[0]}, ${kv[1]}).`,{answerType:"vector",inputHint:"Enter the vector as an ordered pair."}),
      ]);
  });
}

export const PAPER2_QUESTION_BANK_EXPANSION = [
  ...q1(), ...q2(), ...q3(), ...q4(), ...q5(), ...q6(), ...q7(), ...q8(), ...q9(), ...q10(),
];
