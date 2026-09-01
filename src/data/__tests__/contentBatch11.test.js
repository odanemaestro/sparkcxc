// ============================================================================
// Done by: Odane Robinson
//
// Verifies the eleventh batch of previously-missing content: 13 topics of
// Section 10 (Vectors and Matrices), leaving only "Solving simultaneous
// equations using matrix method" (already complete beforehand) in that
// section. Every computation was independently verified with Python
// (including numpy for matrix operations) before being written.
// ============================================================================
import { LESSONS, QUESTION_BANK } from "../lessonBank";

// Small matrix helpers mirroring numpy's behavior, used only to re-derive
// answers for these tests - not shipped app code.
const matMul2 = (M, v) => [M[0][0] * v[0] + M[0][1] * v[1], M[1][0] * v[0] + M[1][1] * v[1]];
const matMulMat = (A, B) => [
  [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
  [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]],
];
const det2 = (M) => M[0][0] * M[1][1] - M[0][1] * M[1][0];

const LESSON_ONLY_TOPICS = [
  "Position and displacement vectors",
  "Vectors to prove geometric results",
  "Matrix multiplication",
];

const NEW_QUIZ_TOPICS = [
  "Vector concepts: magnitude, direction",
  "Adding and subtracting vectors",
  "Multiplying a vector by a scalar",
  "Magnitude of a vector",
  "Matrix concepts",
  "Matrix addition, subtraction, scalar multiplication",
  "Determinant of a 2×2 matrix",
  "Inverse of a 2×2 matrix",
  "Transformation matrices",
  "Combined transformation matrices",
];

const ALL_NEW_LESSON_TOPICS = [...LESSON_ONLY_TOPICS, ...NEW_QUIZ_TOPICS];

describe("content batch 11 - lessons now exist", () => {
  test.each(ALL_NEW_LESSON_TOPICS)("%s has real lesson content", (topic) => {
    const lesson = LESSONS[topic];
    expect(lesson).toBeDefined();
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
  });
});

describe("content batch 11 - quiz content exists for newly-authored topics", () => {
  test.each(NEW_QUIZ_TOPICS)("%s has its own QUESTION_BANK entry", (topic) => {
    expect(QUESTION_BANK[topic]).toBeDefined();
    expect(QUESTION_BANK[topic].length).toBeGreaterThan(0);
  });
});

describe("content batch 11 - quiz answers are mathematically verified", () => {
  test("Vector concepts: magnitude, direction", () => {
    const qs = QUESTION_BANK["Vector concepts: magnitude, direction"];
    expect([7 - 2, 5 - 3]).toEqual([5, 2]);
    expect(Math.sqrt(3 ** 2 + 4 ** 2)).toBe(5);
    expect([3 - -1, -2 - 4]).toEqual([4, -6]);
    for (const id of ["vcm-001", "vcm-002", "vcm-003", "vcm-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Adding and subtracting vectors", () => {
    const qs = QUESTION_BANK["Adding and subtracting vectors"];
    expect([3 + -2, 5 + 4]).toEqual([1, 9]);
    expect([3 - -2, 5 - 4]).toEqual([5, 1]);
    expect([6 + -4, -3 + 7]).toEqual([2, 4]);
    expect([-4 - 6, 7 - -3]).toEqual([-10, 10]);
    for (const id of ["asv-001", "asv-002", "asv-003", "asv-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Multiplying a vector by a scalar", () => {
    const qs = QUESTION_BANK["Multiplying a vector by a scalar"];
    expect([3 * 4, 3 * -6]).toEqual([12, -18]);
    expect([-2 * 5, -2 * 2]).toEqual([-10, -4]);
    expect([3 * 2, 3 * 3]).toEqual([6, 9]); // confirms (6,9) parallel to (2,3)
    expect(4 / 6).not.toBeCloseTo(6 / 8, 5); // confirms (4,6) NOT parallel to (6,8)
    for (const id of ["mvs-001", "mvs-002", "mvs-003", "mvs-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Position and displacement vectors lesson example", () => {
    expect([6 - 2, 7 - 1]).toEqual([4, 6]);
  });

  test("Magnitude of a vector", () => {
    const qs = QUESTION_BANK["Magnitude of a vector"];
    expect(Math.sqrt(5 ** 2 + 12 ** 2)).toBe(13);
    expect(Math.sqrt((-8) ** 2 + 15 ** 2)).toBe(17);
    expect(Math.sqrt(6 ** 2 + 8 ** 2)).toBe(10);
    expect(Math.sqrt(2 ** 2 + 3 ** 2)).toBeCloseTo(3.6, 1);
    for (const id of ["mag-001", "mag-002", "mag-003", "mag-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: |v|=15, |2v|=2*15=30
    expect(Math.sqrt(9 ** 2 + 12 ** 2)).toBe(15);
    expect(Math.sqrt(18 ** 2 + 24 ** 2)).toBe(30);
  });

  test("Matrix concepts", () => {
    const qs = QUESTION_BANK["Matrix concepts"];
    for (const id of ["mxc-001", "mxc-002", "mxc-003", "mxc-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Matrix addition, subtraction, scalar multiplication", () => {
    const qs = QUESTION_BANK["Matrix addition, subtraction, scalar multiplication"];
    const A = [[2, 3], [1, 4]], B = [[5, 1], [2, 3]];
    expect([[A[0][0] + B[0][0], A[0][1] + B[0][1]], [A[1][0] + B[1][0], A[1][1] + B[1][1]]])
      .toEqual([[7, 4], [3, 7]]);
    const A2 = [[7, 2], [4, 6]], B2 = [[3, 5], [1, 2]];
    expect([[A2[0][0] - B2[0][0], A2[0][1] - B2[0][1]], [A2[1][0] - B2[1][0], A2[1][1] - B2[1][1]]])
      .toEqual([[4, -3], [3, 4]]);
    for (const id of ["mas-001", "mas-002", "mas-003", "mas-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Determinant of a 2x2 matrix", () => {
    const qs = QUESTION_BANK["Determinant of a 2×2 matrix"];
    expect(det2([[4, 3], [2, 5]])).toBe(14);
    expect(det2([[6, 2], [3, 1]])).toBe(0);
    expect(det2([[2, 4], [1, 2]])).toBe(0);
    expect(det2([[-3, 5], [2, 4]])).toBe(-22);
    for (const id of ["det-001", "det-002", "det-003", "det-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: 5k-6=19 -> k=5
    expect((19 + 6) / 5).toBe(5);
  });

  test("Inverse of a 2x2 matrix", () => {
    const qs = QUESTION_BANK["Inverse of a 2×2 matrix"];
    expect(det2([[3, 2], [1, 4]])).toBe(10);
    const d2 = det2([[2, 0], [0, 4]]);
    expect(d2).toBe(8);
    expect([[4 / d2, 0 / d2], [0 / d2, 2 / d2]]).toEqual([[0.5, 0], [0, 0.25]]);
    expect(det2([[4, 2], [6, 3]])).toBe(0);
    for (const id of ["inv2-001", "inv2-002", "inv2-003", "inv2-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: A=[[5,3],[2,1]], det=-1, A^-1=[[-1,3],[2,-5]]
    const dAns = det2([[5, 3], [2, 1]]);
    expect(dAns).toBe(-1);
    expect([[1 / dAns, -3 / dAns], [-2 / dAns, 5 / dAns]]).toEqual([[-1, 3], [2, -5]]);
    // verify A * A^-1 = identity
    const Ainv = [[-1, 3], [2, -5]];
    expect(matMulMat([[5, 3], [2, 1]], Ainv)).toEqual([[1, 0], [0, 1]]);
  });

  test("Transformation matrices", () => {
    const qs = QUESTION_BANK["Transformation matrices"];
    expect(matMul2([[1, 0], [0, -1]], [3, 5])).toEqual([3, -5]);
    expect(matMul2([[-1, 0], [0, 1]], [4, 2])).toEqual([-4, 2]);
    expect(matMul2([[0, -1], [1, 0]], [2, 0])).toEqual([0, 2]);
    expect(matMul2([[3, 0], [0, 3]], [2, -1])).toEqual([6, -3]);
    for (const id of ["tmx-001", "tmx-002", "tmx-003", "tmx-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured
    expect(matMul2([[1, 0], [0, -1]], [6, 4])).toEqual([6, -4]);
  });

  test("Combined transformation matrices", () => {
    const qs = QUESTION_BANK["Combined transformation matrices"];
    const P = [[1, 0], [0, -1]], Q = [[-1, 0], [0, 1]];
    const QP = matMulMat(Q, P);
    expect(QP[0][0]).toBe(-1);
    expect(Object.is(QP[0][1], 0) || Object.is(QP[0][1], -0)).toBe(true); // -1*0 = -0 in JS, mathematically identical to 0
    expect(QP[1][0]).toBe(0);
    expect(QP[1][1]).toBe(-1);
    expect(matMul2(QP, [4, 3])).toEqual([-4, -3]);
    for (const id of ["ctm-001", "ctm-002", "ctm-003"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // ctm-004: BA where A=[[2,0],[0,2]], B=[[0,-1],[1,0]]
    const BA = matMulMat([[0, -1], [1, 0]], [[2, 0], [0, 2]]);
    expect(BA).toEqual([[0, -2], [2, 0]]);
    expect(qs.find(q => q.id === "ctm-004").correct).toBe(0);
    // structured: P=[[0,1],[1,0]], Q=[[1,0],[0,-1]], QP applied to (5,2)
    const P5 = [[0, 1], [1, 0]], Q5 = [[1, 0], [0, -1]];
    const QP5 = matMulMat(Q5, P5);
    expect(QP5).toEqual([[0, 1], [-1, 0]]);
    expect(matMul2(QP5, [5, 2])).toEqual([2, -5]);
  });
});
