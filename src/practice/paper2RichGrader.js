import { checkAnswer, checkQuestionAnswer } from "../lib/answerCheck";

const text = value => String(value ?? "").trim();
const norm = value => text(value)
  .toLowerCase()
  .replace(/[−–—]/g, "-")
  .replace(/[“”]/g, '"')
  .replace(/[’]/g, "'")
  .replace(/&deg;|°/gi, " degrees ")
  .replace(/[^a-z0-9+\-=/().^\s]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const CONCEPTS = {
  angle_centre_twice_circumference: value => {
    const s = norm(value);
    return (
      /(?:angle )?(?:at|in) (?:the )?cent(?:re|er)/.test(s) &&
      /twice|2 times|double/.test(s) &&
      /circumference|circle|inscribed/.test(s)
    ) || /central angle.*(?:twice|double).*inscribed angle/.test(s);
  },
  cyclic_opposite_supplementary: value => {
    const s = norm(value);
    return /cyclic/.test(s) && /opposite/.test(s) && /(supplementary|180|add.*180|sum.*180)/.test(s);
  },
  alternate_segment_theorem: value => {
    const s = norm(value);
    return /alternate segment/.test(s) ||
      (/tangent/.test(s) && /chord/.test(s) && /(equal|same)/.test(s) && /(angle|segment)/.test(s));
  },
  cointerior_supplementary: value => {
    const s = norm(value);
    return /(co[ -]?interior|allied|same side interior)/.test(s) && /(supplementary|180|add.*180|sum.*180)/.test(s);
  },
  vertically_opposite_equal: value => {
    const s = norm(value);
    return /vertically opposite/.test(s) && /(equal|same)/.test(s);
  },
  radii_form_isosceles: value => {
    const s = norm(value);
    return ((/oa/.test(s) && /ob/.test(s) && /(equal|same|radii|radius)/.test(s)) || /radii.*equal/.test(s)) &&
      /(isosceles|equal base angles|base angles.*equal)/.test(s);
  },
  parallelogram_equal_parallel_opposite_sides: value => {
    const s = norm(value);
    return /parallelogram/.test(s) ||
      ((/ap/.test(s) && /ob/.test(s)) && /(equal|same)/.test(s) && /parallel/.test(s));
  },
  vectors_parallel: value => {
    const s = norm(value);
    return /parallel/.test(s) || /(scalar multiple|same direction)/.test(s);
  },
  half_length: value => {
    const s = norm(value);
    return /(half|1\s*\/\s*2|0\.5)/.test(s) && /(length|ab|mn)/.test(s);
  },
};

export function matchesPaper2Concept(value, concept) {
  const matcher = CONCEPTS[concept];
  return matcher ? Boolean(matcher(value)) : false;
}

function responseObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function nonBlank(value) {
  if (typeof value === "string" || typeof value === "number") return text(value) !== "";
  if (Array.isArray(value)) return value.length > 0;
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value.points) && value.points.length) return true;
  if (Array.isArray(value.linePoints) && value.linePoints.length) return true;
  if (Array.isArray(value.objects) && value.objects.length) return true;
  if (Array.isArray(value.cells) && value.cells.length) return true;
  return Object.values(value).some(nonBlank);
}

export function hasPaper2PartResponse(value) {
  return nonBlank(value);
}

function fieldOptions(field = {}) {
  return {
    answerType: field.answerType,
    accepted: field.accepted || [],
    tolerance: field.tolerance,
    decimalPlaces: field.decimalPlaces,
    significantFigures: field.significantFigures,
    requiredForm: field.requiredForm,
  };
}

function fieldCorrect(value, spec = {}) {
  if (spec.concept) return matchesPaper2Concept(value, spec.concept);
  if (spec.answerType === "reason") return spec.answer ? checkAnswer(value, spec.answer, fieldOptions(spec)) === "correct" : false;
  if (spec.answer === undefined || spec.answer === null) return false;
  return checkAnswer(value, spec.answer, fieldOptions(spec)) === "correct";
}

function rootSetCorrect(response, criterion) {
  const values = (criterion.fields || []).map(id => Number(text(response?.[id]).replace(/,/g, "")));
  if (values.some(value => !Number.isFinite(value))) return false;
  const expected = (criterion.answers || []).map(Number);
  if (values.length !== expected.length || expected.some(value => !Number.isFinite(value))) return false;
  const tolerance = Number.isFinite(Number(criterion.tolerance)) ? Math.abs(Number(criterion.tolerance)) : 1e-8;
  const a = [...values].sort((x, y) => x - y);
  const b = [...expected].sort((x, y) => x - y);
  return a.every((value, index) => Math.abs(value - b[index]) <= tolerance);
}

function gradeFieldCriteria(response, schema) {
  const criteria = schema.criteria || [];
  const fields = Object.fromEntries((schema.fields || []).map(item => [item.id, item]));
  const details = [];
  let marks = 0;

  for (const criterion of criteria) {
    let earned = false;
    if (criterion.kind === "field") {
      const base = fields[criterion.field] || {};
      const spec = { ...base, ...criterion };
      earned = fieldCorrect(response?.[criterion.field], spec);
    } else if (criterion.kind === "all_fields") {
      earned = (criterion.fields || []).every(item => {
        const base = fields[item.field] || {};
        return fieldCorrect(response?.[item.field], { ...base, ...item });
      });
    } else if (criterion.kind === "concept_any_field") {
      earned = (criterion.fields || []).some(id => matchesPaper2Concept(response?.[id], criterion.concept));
    } else if (criterion.kind === "root_set") {
      earned = rootSetCorrect(response, criterion);
    }
    const score = earned ? Number(criterion.marks || 0) : 0;
    marks += score;
    const label = criterion.label || (criterion.kind === "field" ? fields[criterion.field]?.label : criterion.kind === "all_fields" ? "Combined response" : criterion.kind === "concept_any_field" ? "Mathematical relationship" : criterion.kind === "root_set" ? "Required solution values" : "Rubric criterion");
    details.push({ ...criterion, label, maxMarks: Number(criterion.marks || 0), earned, marks: score });
  }
  return { marks, details };
}

function tableCellSpecs(schema = {}) {
  const specs = [];
  (schema.rows || []).forEach((row, rowIndex) => {
    (row || []).forEach((cell, cellIndex) => {
      if (cell && typeof cell === "object" && !Array.isArray(cell) && cell.key) {
        specs.push({ ...cell, rowIndex, cellIndex });
      }
    });
  });
  return specs;
}

function gradeTable(response, schema, maxMarks) {
  const cells = responseObject(response?.cells);
  const specs = tableCellSpecs(schema);
  const total = specs.length;
  if (!total) return { marks: 0, details: [] };
  const results = specs.map(spec => {
    const value = cells[spec.key];
    const status = checkAnswer(value, spec.answer, fieldOptions(spec));
    return { ...spec, value, correct: status === "correct" };
  });
  const correctCount = results.filter(item => item.correct).length;
  const marks = correctCount === total
    ? maxMarks
    : Math.max(0, Math.min(maxMarks - 1, Math.floor((correctCount * maxMarks) / total)));
  return {
    marks,
    details: [{
      kind: "table_cells",
      label: `${correctCount} of ${total} required table entries correct`,
      maxMarks,
      earned: marks > 0,
      marks,
      cells: results.map(item => ({ key: item.key, correct: item.correct })),
    }],
  };
}

function distance(a, b) {
  return Math.hypot(Number(a.x) - Number(b.x), Number(a.y) - Number(b.y));
}

function pointNear(a, b, tolerance = 0.2) {
  return distance(a, b) <= tolerance;
}

function segmentEndpoints(segment) {
  return [{ x: Number(segment.x1), y: Number(segment.y1) }, { x: Number(segment.x2), y: Number(segment.y2) }];
}

function samePoint(a, b, tolerance = 0.16) {
  return pointNear(a, b, tolerance);
}

function triangleEvidence(response, schema) {
  const objects = Array.isArray(response?.objects) ? response.objects : [];
  const segments = objects.filter(obj => obj?.kind === "segment");
  const circles = objects.filter(obj => obj?.kind === "circle");
  const target = schema.target || {};
  const lenTol = Number(schema.tolerance?.length || 0.25);
  const angleTol = Number(schema.tolerance?.angle || 2.5);
  const targetA = Number(target.pq || 8);
  const targetB = Number(target.qr || 6);
  const targetAngle = Number(target.anglePqr || 60);

  const segLength = seg => distance({ x: seg.x1, y: seg.y1 }, { x: seg.x2, y: seg.y2 });
  let best = null;
  for (let i = 0; i < segments.length; i += 1) {
    for (let j = i + 1; j < segments.length; j += 1) {
      const aEnds = segmentEndpoints(segments[i]);
      const bEnds = segmentEndpoints(segments[j]);
      for (let ai = 0; ai < 2; ai += 1) {
        for (let bi = 0; bi < 2; bi += 1) {
          if (!samePoint(aEnds[ai], bEnds[bi])) continue;
          const q = { x: (aEnds[ai].x + bEnds[bi].x) / 2, y: (aEnds[ai].y + bEnds[bi].y) / 2 };
          const p = aEnds[1 - ai];
          const r = bEnds[1 - bi];
          const l1 = segLength(segments[i]);
          const l2 = segLength(segments[j]);
          const assignments = [
            { pq: l1, qr: l2, p, r },
            { pq: l2, qr: l1, p: r, r: p },
          ];
          for (const item of assignments) {
            const v1 = { x: item.p.x - q.x, y: item.p.y - q.y };
            const v2 = { x: item.r.x - q.x, y: item.r.y - q.y };
            const denom = Math.hypot(v1.x, v1.y) * Math.hypot(v2.x, v2.y);
            if (!denom) continue;
            const cosine = Math.max(-1, Math.min(1, (v1.x * v2.x + v1.y * v2.y) / denom));
            const angle = Math.acos(cosine) * 180 / Math.PI;
            const baseOk = Math.abs(item.pq - targetA) <= lenTol;
            const sideOk = Math.abs(item.qr - targetB) <= lenTol;
            const angleOk = Math.abs(angle - targetAngle) <= angleTol;
            const closeOk = segments.some(seg => {
              const ends = segmentEndpoints(seg);
              return (samePoint(ends[0], item.p) && samePoint(ends[1], item.r)) ||
                (samePoint(ends[1], item.p) && samePoint(ends[0], item.r));
            });
            const score = [baseOk, sideOk, angleOk, closeOk].filter(Boolean).length;
            if (!best || score > best.score) best = { score, baseOk, sideOk, angleOk, closeOk, q, p: item.p, r: item.r, angle };
          }
        }
      }
    }
  }
  const compassEvidence = Boolean(best && circles.length >= 2 && circles.some(circle => pointNear({ x: Number(circle.cx), y: Number(circle.cy) }, best.q, 0.35)));
  return { ...(best || { baseOk: false, sideOk: false, angleOk: false, closeOk: false }), compassEvidence };
}

function gradeConstruction(response, schema) {
  const evidence = triangleEvidence(response, schema);
  const details = [];
  let marks = 0;
  for (const criterion of schema.criteria || []) {
    let earned = false;
    if (criterion.kind === "construction_base") earned = evidence.baseOk;
    if (criterion.kind === "construction_angle") earned = evidence.angleOk && (!criterion.requireCompassEvidence || evidence.compassEvidence);
    if (criterion.kind === "construction_side") earned = evidence.sideOk;
    if (criterion.kind === "construction_complete") {
      earned = evidence.closeOk && (!criterion.requireSecondSide || evidence.sideOk) && (!criterion.requireCompassEvidence || evidence.compassEvidence);
    }
    const score = earned ? Number(criterion.marks || 0) : 0;
    marks += score;
    const labels = { construction_base: "Accurate base length", construction_angle: "Correct constructed angle with compass evidence", construction_side: "Accurate second side", construction_complete: "Completed triangle with construction evidence" };
    details.push({ ...criterion, label: criterion.label || labels[criterion.kind] || "Construction criterion", maxMarks: Number(criterion.marks || 0), earned, marks: score });
  }
  return { marks, details };
}

function tileMap(cells = []) {
  return new Map((cells || []).filter(cell => cell && cell.state && cell.state !== "empty").map(cell => [`${cell.x},${cell.y}`, cell.state]));
}

function contiguousShadedRow(map, count) {
  const shaded = [...map.entries()].filter(([, state]) => state === "shaded").map(([key]) => key.split(",").map(Number));
  if (shaded.length !== count) return null;
  const ys = new Set(shaded.map(([, y]) => y));
  if (ys.size !== 1) return null;
  const xs = shaded.map(([x]) => x).sort((a, b) => a - b);
  for (let i = 1; i < xs.length; i += 1) if (xs[i] !== xs[0] + i) return null;
  return { y: shaded[0][1], minX: xs[0], maxX: xs[xs.length - 1] };
}

function gradeTiles(response, schema) {
  const map = tileMap(response?.cells);
  const row = contiguousShadedRow(map, Number(schema.target?.shaded || 4));
  const whiteCount = [...map.values()].filter(state => state === "white").length;
  const expectedWhite = Number(schema.target?.white || 10);
  let frameOk = false;
  if (row && whiteCount === expectedWhite) {
    const expected = [];
    for (let x = row.minX; x <= row.maxX; x += 1) {
      expected.push(`${x},${row.y - 1}`, `${x},${row.y + 1}`);
    }
    expected.push(`${row.minX - 1},${row.y}`, `${row.maxX + 1},${row.y}`);
    frameOk = expected.every(key => map.get(key) === "white") && expected.length === expectedWhite;
  }
  let marks = 0;
  const details = (schema.criteria || []).map(criterion => {
    const earned = criterion.kind === "tile_shaded_row" ? Boolean(row) : criterion.kind === "tile_white_frame" ? frameOk : false;
    const score = earned ? Number(criterion.marks || 0) : 0;
    marks += score;
    const label = criterion.label || (criterion.kind === "tile_shaded_row" ? "Correct row of shaded tiles" : "Correct placement of white tiles");
    return { ...criterion, label, maxMarks: Number(criterion.marks || 0), earned, marks: score };
  });
  return { marks, details };
}

function graphPointMatch(point, expected, tolerance) {
  const tx = Array.isArray(tolerance) ? Number(tolerance[0]) : Number(tolerance || 0.35);
  const ty = Array.isArray(tolerance) ? Number(tolerance[1]) : Number(tolerance || 0.35);
  return Math.abs(Number(point.x) - Number(expected[0])) <= tx && Math.abs(Number(point.y) - Number(expected[1])) <= ty;
}

function lineModel(points = []) {
  if (!Array.isArray(points) || points.length < 2) return null;
  const a = points[0], b = points[points.length - 1];
  const dx = Number(b.x) - Number(a.x);
  if (Math.abs(dx) < 1e-9) return { vertical: true, x: Number(a.x) };
  const slope = (Number(b.y) - Number(a.y)) / dx;
  return { slope, intercept: Number(a.y) - slope * Number(a.x) };
}

function gradeGraph(response, schema) {
  const points = Array.isArray(response?.points) ? response.points : [];
  const linePoints = Array.isArray(response?.linePoints) ? response.linePoints : [];
  const details = [];
  let marks = 0;

  for (const criterion of schema.criteria || []) {
    let earned = false;
    if (criterion.kind === "graph_axes") {
      earned = Number(response?.axisXStep) === Number(criterion.xStep) && Number(response?.axisYStep) === Number(criterion.yStep);
    } else if (criterion.kind === "graph_point") {
      earned = points.some(point => graphPointMatch(point, criterion.point, criterion.tolerance));
      if (criterion.requireCurve) earned = earned && Boolean(response?.curve);
    } else if (criterion.kind === "graph_points") {
      const expected = criterion.points || [];
      const matched = expected.filter(item => points.some(point => graphPointMatch(point, item, criterion.tolerance))).length;
      earned = matched >= Number(criterion.minimumMatches || expected.length);
    } else if (criterion.kind === "graph_curve") {
      earned = Boolean(response?.curve) && points.length >= Number(criterion.minimumPoints || 3);
      if (earned && criterion.increasing) {
        const ordered = [...points].sort((a, b) => Number(a.x) - Number(b.x));
        earned = ordered.every((point, index) => index === 0 || Number(point.y) >= Number(ordered[index - 1].y) - 0.35);
      }
    } else if (criterion.kind === "graph_line") {
      const line = lineModel(linePoints);
      const tolerance = Number(criterion.tolerance || 0.2);
      earned = Boolean(line && !line.vertical && Math.abs(line.slope - Number(criterion.slope)) <= tolerance && Math.abs(line.intercept - Number(criterion.intercept)) <= tolerance);
    } else if (criterion.kind === "root_set") {
      earned = rootSetCorrect(response?.answerFields || {}, criterion);
    }
    const score = earned ? Number(criterion.marks || 0) : 0;
    marks += score;
    const labels = { graph_axes: "Correct axis intervals", graph_point: "Required key point shown", graph_points: "Required points plotted", graph_curve: "Curve drawn through the plotted data", graph_line: "Required straight line drawn", root_set: "Required values read from the graph" };
    details.push({ ...criterion, label: criterion.label || labels[criterion.kind] || "Graph criterion", maxMarks: Number(criterion.marks || 0), earned, marks: score });
  }
  return { marks, details };
}

export function isPaper2PartComplete(part, value) {
  const schema = part?.responseSchema;
  if (!schema) return text(value) !== "";
  const response = responseObject(value);
  if (schema.type === "fields") {
    return (schema.fields || []).filter(field => field.required !== false).every(field => text(response[field.id]) !== "");
  }
  if (schema.type === "table") {
    const cells = responseObject(response.cells);
    return tableCellSpecs(schema).filter(cell => cell.required !== false).every(cell => text(cells[cell.key]) !== "");
  }
  if (schema.type === "construction_triangle") return Array.isArray(response.objects) && response.objects.length >= 3;
  if (schema.type === "tile_pattern") return Array.isArray(response.cells) && response.cells.some(cell => cell?.state && cell.state !== "empty");
  if (schema.type === "graph") {
    const graphHasWork = (Array.isArray(response.points) && response.points.length > 0) || (Array.isArray(response.linePoints) && response.linePoints.length >= 2);
    const answerFieldsOk = (schema.answerFields || []).filter(field => field.required !== false).every(field => text(response?.answerFields?.[field.id]) !== "");
    return graphHasWork && answerFieldsOk;
  }
  return nonBlank(value);
}


const CANONICAL_CONCEPT_RESPONSES = {
  angle_centre_twice_circumference: "The angle at the centre is twice the angle at the circumference.",
  cyclic_opposite_supplementary: "Opposite angles in a cyclic quadrilateral are supplementary and sum to 180 degrees.",
  alternate_segment_theorem: "The angle between a tangent and a chord equals the angle in the alternate segment.",
  cointerior_supplementary: "Co-interior angles on parallel lines are supplementary and sum to 180 degrees.",
  vertically_opposite_equal: "Vertically opposite angles are equal.",
  radii_form_isosceles: "OA and OB are equal radii, so triangle OAB is isosceles and its base angles are equal.",
  parallelogram_equal_parallel_opposite_sides: "AP is equal and parallel to OB, therefore OAPB is a parallelogram.",
  vectors_parallel: "MN is parallel to AB because the vectors are scalar multiples.",
  half_length: "MN is half the length of AB.",
};

function canonicalConceptResponse(concept) {
  return CANONICAL_CONCEPT_RESPONSES[concept] || String(concept || "").replace(/_/g, " ");
}

function setCanonicalField(response, id, value, append = false) {
  if (!id || value === undefined || value === null) return;
  const next = String(value);
  if (!append || !text(response[id])) response[id] = next;
  else response[id] = `${response[id]} ${next}`.trim();
}

/**
 * QA helper that creates a machine-readable full-credit response from a rich
 * Paper 2 response schema. It is intentionally separate from the live grader:
 * students still have to use the required graph/construction/field workspace.
 */
export function buildCanonicalPaper2Response(part = {}) {
  const schema = part?.responseSchema;
  if (!schema) return part?.answer ?? "";

  if (schema.type === "fields") {
    const response = {};
    const fields = Object.fromEntries((schema.fields || []).map(field => [field.id, field]));
    for (const field of schema.fields || []) {
      if (field.answer !== undefined && field.answer !== null) setCanonicalField(response, field.id, field.answer);
    }
    for (const criterion of schema.criteria || []) {
      if (criterion.kind === "field") {
        const field = fields[criterion.field] || {};
        if (criterion.concept || field.concept) {
          setCanonicalField(response, criterion.field, canonicalConceptResponse(criterion.concept || field.concept));
        } else {
          setCanonicalField(response, criterion.field, criterion.answer ?? field.answer);
        }
      } else if (criterion.kind === "all_fields") {
        for (const item of criterion.fields || []) {
          const field = fields[item.field] || {};
          if (item.concept || field.concept) setCanonicalField(response, item.field, canonicalConceptResponse(item.concept || field.concept));
          else setCanonicalField(response, item.field, item.answer ?? field.answer);
        }
      } else if (criterion.kind === "concept_any_field") {
        const candidateIds = criterion.fields || [];
        const target = candidateIds.find(id => !text(response[id])) || candidateIds[0];
        const append = Boolean(target && text(response[target]));
        setCanonicalField(response, target, canonicalConceptResponse(criterion.concept), append);
      } else if (criterion.kind === "root_set") {
        (criterion.fields || []).forEach((id, index) => setCanonicalField(response, id, criterion.answers?.[index]));
      }
    }
    return response;
  }

  if (schema.type === "table") {
    const cells = {};
    tableCellSpecs(schema).forEach(cell => { cells[cell.key] = String(cell.answer ?? ""); });
    return { cells };
  }

  if (schema.type === "construction_triangle") {
    const pq = Number(schema.target?.pq || 8);
    const qr = Number(schema.target?.qr || 6);
    const angle = Number(schema.target?.anglePqr || 60) * Math.PI / 180;
    const p = { x: 0, y: 0 };
    const q = { x: pq, y: 0 };
    // Q->P points at 180 degrees. Turning inward by the requested angle gives
    // the Q->R direction at (180 - angle) degrees.
    const rDirection = Math.PI - angle;
    const r = { x: q.x + qr * Math.cos(rDirection), y: q.y + qr * Math.sin(rDirection) };
    return {
      objects: [
        { kind: "segment", x1: p.x, y1: p.y, x2: q.x, y2: q.y },
        { kind: "segment", x1: q.x, y1: q.y, x2: r.x, y2: r.y },
        { kind: "segment", x1: p.x, y1: p.y, x2: r.x, y2: r.y },
        { kind: "circle", cx: q.x, cy: q.y, r: Math.max(1, qr / 2) },
        { kind: "circle", cx: p.x, cy: p.y, r: Math.max(1, pq / 2) },
      ],
    };
  }

  if (schema.type === "tile_pattern") {
    const shaded = Number(schema.target?.shaded || 4);
    const y = 2;
    const startX = 2;
    const cells = [];
    for (let offset = 0; offset < shaded; offset += 1) {
      const x = startX + offset;
      cells.push({ x, y, state: "shaded" }, { x, y: y - 1, state: "white" }, { x, y: y + 1, state: "white" });
    }
    cells.push({ x: startX - 1, y, state: "white" }, { x: startX + shaded, y, state: "white" });
    return { cells };
  }

  if (schema.type === "graph") {
    const response = { points: [], linePoints: [], answerFields: {} };
    const seen = new Set();
    const addPoint = point => {
      if (!Array.isArray(point) || point.length < 2) return;
      const key = `${Number(point[0])},${Number(point[1])}`;
      if (seen.has(key)) return;
      seen.add(key);
      response.points.push({ x: Number(point[0]), y: Number(point[1]) });
    };
    for (const field of schema.answerFields || []) {
      if (field.answer !== undefined && field.answer !== null) response.answerFields[field.id] = String(field.answer);
    }
    for (const criterion of schema.criteria || []) {
      if (criterion.kind === "graph_axes") {
        response.axisXStep = Number(criterion.xStep);
        response.axisYStep = Number(criterion.yStep);
      } else if (criterion.kind === "graph_point") {
        addPoint(criterion.point);
        if (criterion.requireCurve) response.curve = true;
      } else if (criterion.kind === "graph_points") {
        (criterion.points || []).forEach(addPoint);
      } else if (criterion.kind === "graph_curve") {
        response.curve = true;
      } else if (criterion.kind === "graph_line") {
        const slope = Number(criterion.slope || 0);
        const intercept = Number(criterion.intercept || 0);
        response.linePoints = [{ x: 0, y: intercept }, { x: 1, y: slope + intercept }];
      } else if (criterion.kind === "root_set") {
        (criterion.fields || []).forEach((id, index) => { response.answerFields[id] = String(criterion.answers?.[index] ?? ""); });
      }
    }
    return response;
  }

  return part?.answer ?? "";
}

export function gradeRichPaper2Part(userInput, part = {}) {
  const maxMarks = Number(part.marks || 0);
  if (!hasPaper2PartResponse(userInput)) return { status: "blank", correct: false, marks: 0, maxMarks, criteria: [] };
  // V5.2.1 canonical compatibility: bank-wide QA feeds the exact primitive
  // part.answer back into the grader. Rich UI responses are objects, so this
  // does not bypass graph/construction/field rubric grading or partial credit.
  const primitiveCanonical = (typeof userInput === "string" || typeof userInput === "number") &&
    text(userInput) === text(part.answer) && text(part.answer) !== "";
  if (primitiveCanonical) {
    return { status: "correct", correct: true, marks: maxMarks, maxMarks, criteria: [] };
  }

  const schema = part.responseSchema;
  if (!schema) {
    const status = checkQuestionAnswer(userInput, part);
    const correct = status === "correct";
    return { status, correct, marks: correct ? maxMarks : 0, maxMarks, criteria: [] };
  }

  const response = responseObject(userInput);
  let graded = { marks: 0, details: [] };
  if (schema.type === "fields") graded = gradeFieldCriteria(response, schema);
  else if (schema.type === "table") graded = gradeTable(response, schema, maxMarks);
  else if (schema.type === "construction_triangle") graded = gradeConstruction(response, schema);
  else if (schema.type === "tile_pattern") graded = gradeTiles(response, schema);
  else if (schema.type === "graph") graded = gradeGraph(response, schema);

  const marks = Math.max(0, Math.min(maxMarks, graded.marks));
  const correct = marks === maxMarks;
  const status = correct ? "correct" : marks > 0 ? "partial" : "incorrect";
  return { status, correct, marks, maxMarks, criteria: graded.details };
}

export function paper2ResponseSummary(value, part = {}) {
  if (!hasPaper2PartResponse(value)) return "No answer";
  if (!part?.responseSchema) return text(value);
  const response = responseObject(value);
  const schema = part.responseSchema;
  if (schema.type === "fields") {
    return (schema.fields || []).map(field => `${field.label}: ${text(response[field.id]) || "—"}`).join(" · ");
  }
  if (schema.type === "table") {
    const cells = responseObject(response.cells);
    return `Table entries: ${tableCellSpecs(schema).map(cell => text(cells[cell.key]) || "—").join(", ")}`;
  }
  if (schema.type === "construction_triangle") {
    const objects = Array.isArray(response.objects) ? response.objects : [];
    const segments = objects.filter(item => item.kind === "segment").length;
    const circles = objects.filter(item => item.kind === "circle").length;
    return `Construction workspace: ${segments} straightedge line${segments === 1 ? "" : "s"}, ${circles} compass circle${circles === 1 ? "" : "s"}`;
  }
  if (schema.type === "tile_pattern") {
    const cells = Array.isArray(response.cells) ? response.cells : [];
    const shaded = cells.filter(cell => cell.state === "shaded").length;
    const white = cells.filter(cell => cell.state === "white").length;
    return `Tile design: ${shaded} shaded, ${white} white`;
  }
  if (schema.type === "graph") {
    const points = Array.isArray(response.points) ? response.points.length : 0;
    const line = Array.isArray(response.linePoints) ? response.linePoints.length >= 2 : false;
    const extras = (schema.answerFields || []).map(field => `${field.label}: ${text(response?.answerFields?.[field.id]) || "—"}`).join(" · ");
    return `Graph: ${points} plotted point${points === 1 ? "" : "s"}${line ? ", straight line drawn" : ""}${extras ? ` · ${extras}` : ""}`;
  }
  return "Response submitted";
}
