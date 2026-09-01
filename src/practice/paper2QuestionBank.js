const round = (value, dp = 2) => Number(value).toFixed(dp).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
const money = value => Number(value).toFixed(2);
const q = (position, variant, topic, stem, parts, extra = {}) => ({
  question_id: `p2-q${position}-v${variant}`,
  question_number: position,
  section: position <= 7 ? "I" : "II",
  marks: parts.reduce((sum, part) => sum + part.marks, 0),
  topic,
  stem,
  parts,
  ...extra,
});
const p = (id, label, prompt, marks, answer, solution, extra = {}) => ({ id, label, prompt, marks, answer: String(answer), solution, ...extra });

function q1() {
  const variants = [
    { price: 2400, discount: 15, tax: 15, deposit: 1200, months: 6 },
    { price: 3600, discount: 12, tax: 15, deposit: 1500, months: 7 },
    { price: 1850, discount: 10, tax: 15, deposit: 900, months: 5 },
    { price: 4250, discount: 18, tax: 15, deposit: 1750, months: 8 },
    { price: 2750, discount: 20, tax: 15, deposit: 1100, months: 6 },
    { price: 5100, discount: 16, tax: 15, deposit: 2100, months: 10 },
  ];
  return variants.map((v, i) => {
    const afterDiscount = v.price * (1 - v.discount / 100);
    const tax = afterDiscount * v.tax / 100;
    const total = afterDiscount + tax;
    const balance = total - v.deposit;
    const instalment = balance / v.months;
    return q(1, i + 1, "Computation and consumer arithmetic",
      `A laptop is marked at $${v.price.toLocaleString()}. A discount of ${v.discount}% is allowed. Tax of ${v.tax}% is then charged on the discounted price. A customer pays a deposit of $${v.deposit.toLocaleString()} and pays the balance in ${v.months} equal monthly instalments.`, [
        p("a", "(a)", "Calculate the amount of the discount.", 2, money(v.price * v.discount / 100), `Discount = ${v.discount}% of ${v.price} = $${money(v.price * v.discount / 100)}.`, { prefix: "$", tolerance: 0.01 }),
        p("b", "(b)", "Calculate the price of the laptop after the discount.", 2, money(afterDiscount), `Discounted price = ${v.price} - ${money(v.price * v.discount / 100)} = $${money(afterDiscount)}.`, { prefix: "$", tolerance: 0.01 }),
        p("c", "(c)", `Calculate the ${v.tax}% tax charged.`, 2, money(tax), `Tax = ${v.tax}% of ${money(afterDiscount)} = $${money(tax)}.`, { prefix: "$", tolerance: 0.01 }),
        p("d", "(d)", "Calculate the amount of each monthly instalment.", 3, money(instalment), `Total after tax = $${money(total)}. Balance = ${money(total)} - ${v.deposit} = $${money(balance)}. Instalment = ${money(balance)} ÷ ${v.months} = $${money(instalment)}.`, { prefix: "$", tolerance: 0.02 }),
      ]);
  });
}

function q2() {
  const variants = [
    { a: 4, b: 7, c: 31, m: 3, n: 5, area: 54 },
    { a: 5, b: 9, c: 44, m: 4, n: 7, area: 84 },
    { a: 6, b: 5, c: 41, m: 5, n: 3, area: 96 },
    { a: 7, b: 8, c: 57, m: 6, n: 5, area: 130 },
    { a: 8, b: 6, c: 62, m: 7, n: 4, area: 144 },
    { a: 9, b: 11, c: 83, m: 8, n: 5, area: 198 },
  ];
  return variants.map((v, i) => {
    const x = (v.c - v.b) / v.a;
    const width = Math.sqrt(v.area * v.n / v.m);
    const length = v.m * width / v.n;
    return q(2, i + 1, "Algebra and measurement",
      `For part (c), a rectangle has length : width = ${v.m} : ${v.n} and area ${v.area} cm².`, [
        p("a", "(a)", `Solve ${v.a}x + ${v.b} = ${v.c}.`, 2, x, `${v.a}x = ${v.c - v.b}, so x = ${x}.`),
        p("b", "(b)", `Factorise completely: ${v.m * 2}y + ${v.m * 6}.`, 2, `${v.m * 2}(y+3)`, `The highest common factor is ${v.m * 2}, giving ${v.m * 2}(y + 3).`, { accepted: [`${v.m * 2}(y+3)`, `${v.m * 2}(y + 3)`], answerType: "expression" }),
        p("c1", "(c)(i)", "Calculate the width of the rectangle, giving your answer correct to 2 decimal places.", 3, round(width, 2), `Let length = ${v.m}k and width = ${v.n}k. Then ${v.m * v.n}k² = ${v.area}. Solve for k, then width = ${v.n}k = ${round(width, 2)} cm.`, { suffix: " cm", tolerance: 0.011 }),
        p("c2", "(c)(ii)", "Calculate the length of the rectangle, giving your answer correct to 2 decimal places.", 2, round(length, 2), `Length = ${v.m}k = ${round(length, 2)} cm.`, { suffix: " cm", tolerance: 0.011 }),
      ]);
  });
}

function q3() {
  const variants = [
    { A: [2, 1], B: [5, 1], C: [4, 4], tx: -3, ty: 2, rot: "90° anticlockwise" },
    { A: [1, 3], B: [4, 3], C: [4, 6], tx: 2, ty: -4, rot: "90° clockwise" },
    { A: [-2, 1], B: [1, 1], C: [0, 5], tx: 4, ty: 3, rot: "180°" },
    { A: [3, -1], B: [6, -1], C: [5, 2], tx: -2, ty: -3, rot: "90° anticlockwise" },
    { A: [-1, -2], B: [2, -2], C: [1, 2], tx: 5, ty: 1, rot: "90° clockwise" },
    { A: [2, 4], B: [5, 4], C: [3, 7], tx: -4, ty: -2, rot: "180°" },
  ];
  const rotate = ([x, y], type) => type === "90° anticlockwise" ? [-y, x] : type === "90° clockwise" ? [y, -x] : [-x, -y];
  return variants.map((v, i) => {
    const Ap = [v.A[0] + v.tx, v.A[1] + v.ty];
    const Bp = [v.B[0] + v.tx, v.B[1] + v.ty];
    const Cr = rotate(v.C, v.rot);
    const AB = Math.hypot(v.B[0] - v.A[0], v.B[1] - v.A[1]);
    return q(3, i + 1, "Geometry and transformations",
      `The vertices of triangle ABC are A(${v.A[0]}, ${v.A[1]}), B(${v.B[0]}, ${v.B[1]}) and C(${v.C[0]}, ${v.C[1]}).`, [
        p("a", "(a)", `Triangle ABC is translated by the vector (${v.tx}, ${v.ty}). State the coordinates of the image of A.`, 2, `(${Ap[0]}, ${Ap[1]})`, `Add the translation vector to A: (${v.A[0]} + ${v.tx}, ${v.A[1]} + ${v.ty}) = (${Ap[0]}, ${Ap[1]}).`),
        p("b", "(b)", "State the coordinates of the image of B under this translation.", 2, `(${Bp[0]}, ${Bp[1]})`, `B maps to (${Bp[0]}, ${Bp[1]}).`),
        p("c", "(c)", `Point C is rotated ${v.rot} about the origin. State the coordinates of its image.`, 3, `(${Cr[0]}, ${Cr[1]})`, `Apply the coordinate rule for a ${v.rot} rotation to ${JSON.stringify(v.C)}, giving (${Cr[0]}, ${Cr[1]}).`),
        p("d", "(d)", "Calculate the length of AB.", 2, round(AB, 2), `AB = √[(${v.B[0]} - ${v.A[0]})² + (${v.B[1]} - ${v.A[1]})²] = ${round(AB, 2)} units.`, { suffix: " units", tolerance: 0.011 }),
      ]);
  });
}

function q4() {
  const variants = [
    { m: 2, c: -3, x: 5, ax: 1, ay: 4 },
    { m: -3, c: 7, x: -2, ax: 2, ay: 1 },
    { m: 4, c: 1, x: 3, ax: -1, ay: -2 },
    { m: -2, c: -5, x: 4, ax: 3, ay: 6 },
    { m: 5, c: -4, x: -1, ax: 0, ay: 3 },
    { m: 3, c: 6, x: 2, ax: -2, ay: 5 },
  ];
  return variants.map((v, i) => {
    const fx = v.m * v.x + v.c;
    const inverse = (v.ax - v.c) / v.m;
    const perp = -1 / v.m;
    const pc = v.ay - perp * v.ax;
    const perpEq = `y=${round(perp, 3)}x${pc >= 0 ? "+" : ""}${round(pc, 3)}`;
    return q(4, i + 1, "Relations, functions and coordinate geometry",
      `The function f is defined by f(x) = ${v.m}x ${v.c >= 0 ? "+" : "−"} ${Math.abs(v.c)}.`, [
        p("a", "(a)", `Find f(${v.x}).`, 2, fx, `f(${v.x}) = ${v.m}(${v.x}) ${v.c >= 0 ? "+" : "−"} ${Math.abs(v.c)} = ${fx}.`),
        p("b", "(b)", `Find the value of x for which f(x) = ${v.ax}.`, 2, inverse, `Solve ${v.m}x + (${v.c}) = ${v.ax}, giving x = ${inverse}.`),
        p("c", "(c)", `State the gradient of a line perpendicular to y = ${v.m}x ${v.c >= 0 ? "+" : "−"} ${Math.abs(v.c)}.`, 2, round(perp, 3), `Perpendicular gradients multiply to −1, so the gradient is ${round(perp, 3)}.`, { tolerance: 0.0011 }),
        p("d", "(d)", `Determine the equation of the line which is perpendicular to f and passes through (${v.ax}, ${v.ay}). Give your answer in the form y = mx + c.`, 3, perpEq, `Use y − ${v.ay} = ${round(perp, 3)}(x − ${v.ax}). This simplifies to ${perpEq}.`, { answerType: "expression", accepted: [perpEq, perpEq.replace(/\+/g, " + ").replace(/-/g, " - ")] }),
      ]);
  });
}

function q5() {
  const variants = [
    [4, 6, 7, 7, 7, 9, 9, 10],
    [5, 5, 6, 7, 8, 8, 8, 12],
    [3, 4, 6, 6, 7, 8, 10, 12],
    [2, 5, 5, 7, 7, 7, 11, 13],
    [6, 6, 7, 8, 9, 9, 9, 11],
    [4, 5, 6, 8, 8, 9, 11, 13],
  ];
  return variants.map((data, i) => {
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / data.length;
    const median = (data[3] + data[4]) / 2;
    const modeCounts = data.reduce((o, x) => ({ ...o, [x]: (o[x] || 0) + 1 }), {});
    const mode = Number(Object.entries(modeCounts).sort((a, b) => b[1] - a[1])[0][0]);
    const over8 = data.filter(x => x > 8).length;
    return q(5, i + 1, "Statistics and probability",
      `The table shows the number of books read by eight students during one term.`, [
        p("a", "(a)", "Calculate the mean number of books read by the students.", 3, round(mean, 2), `Sum = ${sum}. Mean = ${sum} ÷ 8 = ${round(mean, 2)}.` , { tolerance: 0.011 }),
        p("b", "(b)", "State the median.", 2, median, `The middle two values are ${data[3]} and ${data[4]}, so median = (${data[3]} + ${data[4]}) ÷ 2 = ${median}.`),
        p("c", "(c)", "State the mode.", 1, mode, `${mode} occurs most often.`),
        p("d", "(d)", "One student is chosen at random. Determine the probability that the student read more than 8 books. Give your answer as a fraction in its simplest form.", 3, `${over8}/8`, `${over8} of the 8 students read more than 8 books, so the probability is ${over8}/8.`, { accepted: [`${over8}/8`, round(over8 / 8, 3)] }),
      ], { table: { headers: ["Student", "A", "B", "C", "D", "E", "F", "G", "H"], rows: [["Books", ...data]] } });
  });
}

function q6() {
  const variants = [
    { r: 7, h: 12, angle: 38, hyp: 15 },
    { r: 5, h: 18, angle: 42, hyp: 20 },
    { r: 6, h: 15, angle: 35, hyp: 17 },
    { r: 8, h: 10, angle: 47, hyp: 14 },
    { r: 4, h: 21, angle: 31, hyp: 24 },
    { r: 9, h: 14, angle: 53, hyp: 19 },
  ];
  return variants.map((v, i) => {
    const opposite = v.hyp * Math.sin(v.angle * Math.PI / 180);
    return q(6, i + 1, "Measurement, geometry and trigonometry",
      `A cylindrical water tank has radius ${v.r} m and height ${v.h} m. A right-angled triangle has hypotenuse ${v.hyp} cm and an acute angle of ${v.angle}°.`, [
        p("a", "(a)", "Using π = 3.142, calculate the area of the circular base of the tank, giving your answer correct to 2 decimal places.", 2, round(3.142 * v.r * v.r, 2), `Area = πr² = 3.142 × ${v.r}² = ${round(3.142 * v.r * v.r, 2)} m².`, { suffix: " m²", tolerance: 0.011 }),
        p("b", "(b)", "Using π = 3.142, calculate the volume of the tank, giving your answer correct to 2 decimal places.", 3, round(3.142 * v.r * v.r * v.h, 2), `Volume = πr²h = 3.142 × ${v.r}² × ${v.h} = ${round(3.142 * v.r * v.r * v.h, 2)} m³.`, { suffix: " m³", tolerance: 0.011 }),
        p("c", "(c)", `Calculate the length of the side opposite the ${v.angle}° angle, giving your answer correct to 1 decimal place.`, 2, round(opposite, 1), `sin ${v.angle}° = opposite/${v.hyp}. Opposite = ${v.hyp} sin ${v.angle}° = ${round(opposite, 1)} cm.`, { suffix: " cm", tolerance: 0.051 }),
        p("d", "(d)", `Calculate the circumference of the base of the tank, using π = 3.142. Give your answer correct to 2 decimal places.`, 2, round(2 * 3.142 * v.r, 2), `Circumference = 2πr = 2 × 3.142 × ${v.r} = ${round(2 * 3.142 * v.r, 2)} m.`, { suffix: " m", tolerance: 0.011 }),
      ]);
  });
}

function q7() {
  const variants = [
    { first: 7, diff: 4, n: 12, target: 79 },
    { first: 11, diff: 5, n: 15, target: 96 },
    { first: 3, diff: 6, n: 10, target: 81 },
    { first: 14, diff: 3, n: 20, target: 71 },
    { first: 9, diff: 7, n: 11, target: 100 },
    { first: 5, diff: 8, n: 9, target: 93 },
  ];
  return variants.map((v, i) => {
    const seq = [0,1,2,3].map(k => v.first + k * v.diff);
    const nth = v.first + (v.n - 1) * v.diff;
    const c = v.first - v.diff;
    const targetN = (v.target - c) / v.diff;
    const formula = `${v.diff}n${c >= 0 ? "+" : ""}${c}`;
    return q(7, i + 1, "Sequences, patterns and investigation",
      `The first four terms of an arithmetic sequence are ${seq.join(", ")}.`, [
        p("a", "(a)", "State the common difference.", 2, v.diff, `Each term increases by ${v.diff}.`),
        p("b", "(b)", "Write an expression for the nth term of the sequence in the form an + b.", 3, formula, `Tₙ = ${v.first} + (n − 1)${v.diff} = ${formula}.`, { answerType: "expression", accepted: [formula, formula.replace("+", " + ").replace("-", " - ")] }),
        p("c", "(c)", `Calculate the ${v.n}th term.`, 2, nth, `T${v.n} = ${v.first} + (${v.n} − 1)${v.diff} = ${nth}.`),
        p("d", "(d)", `Determine the number of the term which has value ${v.target}.`, 3, targetN, `Solve ${formula} = ${v.target}. This gives n = ${targetN}.`),
      ]);
  });
}

function q8() {
  const variants = [
    { r1: 3, r2: 5, a: 2, b: 3, c: 19, d: 1, e: -1, f: -1 },
    { r1: -2, r2: 6, a: 3, b: 2, c: 16, d: 1, e: 2, f: 8 },
    { r1: 1, r2: 7, a: 4, b: 1, c: 18, d: 2, e: -1, f: 3 },
    { r1: -4, r2: 3, a: 2, b: 5, c: 21, d: 3, e: -1, f: 4 },
    { r1: 2, r2: 8, a: 5, b: 2, c: 24, d: 1, e: 1, f: 6 },
    { r1: -3, r2: 4, a: 3, b: 4, c: 25, d: 2, e: -1, f: 2 },
  ];
  return variants.map((v, i) => {
    const sum = v.r1 + v.r2;
    const product = v.r1 * v.r2;
    const B = -sum, C = product;
    const det = v.a * v.e - v.b * v.d;
    const sx = (v.c * v.e - v.b * v.f) / det;
    const sy = (v.a * v.f - v.c * v.d) / det;
    const vertexX = sum / 2;
    const vertexY = vertexX * vertexX + B * vertexX + C;
    return q(8, i + 1, "Algebra, relations and functions",
      `The function g is defined by g(x) = x² ${B >= 0 ? "+" : "−"} ${Math.abs(B)}x ${C >= 0 ? "+" : "−"} ${Math.abs(C)}.`, [
        p("a", "(a)", "Solve g(x) = 0.", 3, `${v.r1}, ${v.r2}`, `g(x) = (x − ${v.r1})(x − ${v.r2}), so x = ${v.r1} or x = ${v.r2}.`, { accepted: [`${v.r1}, ${v.r2}`, `${v.r2}, ${v.r1}`, `x=${v.r1} or x=${v.r2}`, `x = ${v.r1} or x = ${v.r2}`] }),
        p("b", "(b)", `Solve simultaneously the equations ${v.a}x ${v.b >= 0 ? "+" : "−"} ${Math.abs(v.b)}y = ${v.c} and ${v.d}x ${v.e >= 0 ? "+" : "−"} ${Math.abs(v.e)}y = ${v.f}. Give your answer in the form (x, y).`, 3, `(${round(sx, 3)}, ${round(sy, 3)})`, `Solving the two equations gives x = ${round(sx, 3)}, y = ${round(sy, 3)}.`),
        p("c", "(c)", "State the x-coordinate of the turning point of g.", 3, vertexX, `For x² + bx + c, the turning point has x = −b/2. Here x = ${vertexX}.`),
        p("d", "(d)", "State the y-coordinate of the turning point of g.", 3, vertexY, `Substitute x = ${vertexX} into g(x), giving y = ${vertexY}.`),
      ]);
  });
}

function q9() {
  const variants = [
    { a: 9, b: 12, C: 48 },
    { a: 11, b: 15, C: 57 },
    { a: 8, b: 13, C: 64 },
    { a: 14, b: 17, C: 39 },
    { a: 10, b: 16, C: 72 },
    { a: 12, b: 18, C: 51 },
  ];
  return variants.map((v, i) => {
    const rad = v.C * Math.PI / 180;
    const c = Math.sqrt(v.a ** 2 + v.b ** 2 - 2 * v.a * v.b * Math.cos(rad));
    const area = 0.5 * v.a * v.b * Math.sin(rad);
    const A = Math.asin(v.a * Math.sin(rad) / c) * 180 / Math.PI;
    const B = 180 - v.C - A;
    return q(9, i + 1, "Geometry and trigonometry",
      `In triangle ABC, BC = ${v.a} cm, AC = ${v.b} cm and angle ACB = ${v.C}°.`, [
        p("a", "(a)", "Calculate the length of AB, giving your answer correct to 1 decimal place.", 3, round(c, 1), `Using the cosine rule, AB² = ${v.a}² + ${v.b}² − 2(${v.a})(${v.b})cos ${v.C}°. Thus AB = ${round(c, 1)} cm.`, { suffix: " cm", tolerance: 0.051 }),
        p("b", "(b)", "Calculate the area of triangle ABC, giving your answer correct to 1 decimal place.", 3, round(area, 1), `Area = 1/2 ab sin C = 1/2(${v.a})(${v.b})sin ${v.C}° = ${round(area, 1)} cm².`, { suffix: " cm²", tolerance: 0.051 }),
        p("c", "(c)", "Calculate angle BAC, giving your answer correct to 1 decimal place.", 3, round(A, 1), `Using the sine rule, sin A/${v.a} = sin ${v.C}°/${round(c, 3)}. Therefore A = ${round(A, 1)}°.` , { suffix: "°", tolerance: 0.051 }),
        p("d", "(d)", "Calculate angle ABC, giving your answer correct to 1 decimal place.", 3, round(B, 1), `B = 180° − ${v.C}° − ${round(A, 1)}° = ${round(B, 1)}°.` , { suffix: "°", tolerance: 0.101 }),
      ]);
  });
}

function q10() {
  const variants = [
    { A: [[2,1],[3,4]], B: [[1,2],[0,3]], vx: 4, vy: -1, k: 3 },
    { A: [[1,3],[2,5]], B: [[4,0],[1,2]], vx: -2, vy: 5, k: 2 },
    { A: [[3,2],[1,6]], B: [[2,1],[4,0]], vx: 3, vy: 2, k: -2 },
    { A: [[4,1],[2,3]], B: [[0,5],[1,2]], vx: -4, vy: 1, k: 4 },
    { A: [[2,5],[1,3]], B: [[3,1],[2,4]], vx: 1, vy: -3, k: 5 },
    { A: [[5,2],[3,1]], B: [[1,4],[2,0]], vx: -3, vy: -2, k: -3 },
  ];
  const flat = M => `${M[0][0]},${M[0][1]},${M[1][0]},${M[1][1]}`;
  return variants.map((v, i) => {
    const add = [[v.A[0][0]+v.B[0][0],v.A[0][1]+v.B[0][1]],[v.A[1][0]+v.B[1][0],v.A[1][1]+v.B[1][1]]];
    const mult = [
      [v.A[0][0]*v.B[0][0]+v.A[0][1]*v.B[1][0], v.A[0][0]*v.B[0][1]+v.A[0][1]*v.B[1][1]],
      [v.A[1][0]*v.B[0][0]+v.A[1][1]*v.B[1][0], v.A[1][0]*v.B[0][1]+v.A[1][1]*v.B[1][1]],
    ];
    const magnitude = Math.hypot(v.vx, v.vy);
    return q(10, i + 1, "Vectors and matrices",
      `Given the matrices A = [[${v.A[0].join(", ")}],[${v.A[1].join(", ")}]] and B = [[${v.B[0].join(", ")}],[${v.B[1].join(", ")}]], and the vector v = (${v.vx}, ${v.vy}), answer the following questions.`, [
        p("a", "(a)", "Find A + B. Enter the four entries row by row, separated by commas.", 3, flat(add), `A + B = [[${add[0].join(", ")}],[${add[1].join(", ")}]].`, { accepted: [flat(add), `[[${add[0].join(",")}],[${add[1].join(",")}]]`], answerType: "ordered" }),
        p("b", "(b)", "Find AB. Enter the four entries row by row, separated by commas.", 3, flat(mult), `AB = [[${mult[0].join(", ")}],[${mult[1].join(", ")}]].`, { accepted: [flat(mult), `[[${mult[0].join(",")}],[${mult[1].join(",")}]]`], answerType: "ordered" }),
        p("c", "(c)", `Find ${v.k}v. Give your answer as an ordered pair.`, 3, `(${v.k*v.vx}, ${v.k*v.vy})`, `${v.k}v = (${v.k*v.vx}, ${v.k*v.vy}).`),
        p("d", "(d)", "Calculate the magnitude of v, giving your answer correct to 2 decimal places.", 3, round(magnitude, 2), `|v| = √(${v.vx}² + ${v.vy}²) = ${round(magnitude, 2)}.`, { tolerance: 0.011 }),
      ]);
  });
}

export const PAPER2_QUESTION_BANK = [
  ...q1(), ...q2(), ...q3(), ...q4(), ...q5(), ...q6(), ...q7(), ...q8(), ...q9(), ...q10(),
];

export const PAPER2_TOPICS = [
  "Computation and consumer arithmetic",
  "Algebra and measurement",
  "Geometry and transformations",
  "Relations, functions and coordinate geometry",
  "Statistics and probability",
  "Measurement, geometry and trigonometry",
  "Sequences, patterns and investigation",
  "Algebra, relations and functions",
  "Geometry and trigonometry",
  "Vectors and matrices",
];
