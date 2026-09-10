// SPARK Physics quantity-aware unit normalisation.
// This layer is deliberately semantic: equal dimensions do not automatically
// make two unit names interchangeable in a CSEC answer. For example, N m is
// accepted for moment while J is not, even though both reduce dimensionally
// to kg m^2 s^-2.

const superscriptMap = new Map([
  ['⁰','0'],['¹','1'],['²','2'],['³','3'],['⁴','4'],['⁵','5'],
  ['⁶','6'],['⁷','7'],['⁸','8'],['⁹','9'],['⁻','-'],['⁺','+']
]);

function normaliseSuperscripts(text) {
  return [...String(text)].map(ch => superscriptMap.get(ch) ?? ch).join('');
}

export function tidyPhysicsText(raw) {
  return normaliseSuperscripts(String(raw ?? ''))
    .replace(/[−–—]/g, '-')
    .replace(/[×·]/g, '*')
    .replace(/\s+/g, ' ')
    .trim();
}

const NUMBER_RE = /[-+]?\d+(?:[.,]\d+)?(?:\s*(?:\*|x)\s*10\s*\^?\s*[-+]?\d+|\s*e\s*[-+]?\d+)?/i;

export function parseNumber(raw) {
  const text = tidyPhysicsText(raw).replace(/(?<=\d),(?=\d{3}(?:\D|$))/g, '');
  const m = text.match(NUMBER_RE);
  if (!m) return null;
  const value = Number(m[0]
    .replace(/,/g, '')
    .replace(/\s*(?:\*|x)\s*10\s*\^?\s*/i, 'e')
    .replace(/\s+/g, ''));
  return Number.isFinite(value) ? value : null;
}

export function rawUnit(raw) {
  const text = tidyPhysicsText(raw).replace(/(?<=\d),(?=\d{3}(?:\D|$))/g, '');
  const m = text.match(NUMBER_RE);
  if (!m) return null;
  const after = text.slice((m.index ?? 0) + m[0].length).trim()
    .replace(/^[=,:;]+\s*/, '')
    .replace(/[.;,]+$/, '')
    .trim();
  return after || null;
}

function keyUnit(raw) {
  if (!raw) return '';
  return tidyPhysicsText(raw)
    .toLowerCase()
    .replace(/degrees?\s*celsius/g, '°c')
    .replace(/degree\s*celsius/g, '°c')
    .replace(/metres?/g, 'm')
    .replace(/meters?/g, 'm')
    .replace(/centimetres?|centimeters?/g, 'cm')
    .replace(/millimetres?|millimeters?/g, 'mm')
    .replace(/kilometres?|kilometers?/g, 'km')
    .replace(/seconds?/g, 's')
    .replace(/minutes?/g, 'min')
    .replace(/hours?|hrs?/g, 'h')
    .replace(/kilograms?/g, 'kg')
    .replace(/grams?/g, 'g')
    .replace(/newtons?/g, 'n')
    .replace(/joules?/g, 'j')
    .replace(/watts?/g, 'w')
    .replace(/pascals?/g, 'pa')
    .replace(/volts?/g, 'v')
    .replace(/amperes?|amps?/g, 'a')
    .replace(/coulombs?/g, 'c')
    .replace(/ohms?/g, 'ohm')
    .replace(/hertz/g, 'hz')
    .replace(/kelvins?/g, 'k')
    .replace(/per/g, '/')
    .replace(/\^/g, '')
    .replace(/\s*\/\s*/g, '/')
    .replace(/\s*\*\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Each alias maps to a canonical semantic unit and a multiplicative factor to
// that unit. Temperature is handled separately because Celsius is affine.
const UNIT_DEFS = {
  length: [
    ['m', 1], ['cm', 1e-2], ['mm', 1e-3], ['km', 1e3],
  ],
  area: [
    ['m2', 1], ['m 2', 1], ['cm2', 1e-4], ['cm 2', 1e-4], ['mm2', 1e-6], ['mm 2', 1e-6],
  ],
  volume: [
    ['m3', 1], ['m 3', 1], ['cm3', 1e-6], ['cm 3', 1e-6], ['mm3', 1e-9], ['mm 3', 1e-9],
    ['l', 1e-3], ['litre', 1e-3], ['liter', 1e-3], ['ml', 1e-6],
  ],
  mass: [['kg',1], ['g',1e-3]],
  time: [['s',1], ['min',60], ['h',3600]],
  time_squared: [['s2',1], ['s 2',1]],
  time_squared_per_length: [['s2/m',1], ['s 2/m',1], ['s2 m-1',1], ['s 2 m-1',1]],
  speed: [
    ['m/s',1], ['m s-1',1], ['ms-1',1], ['km/h',1000/3600], ['km h-1',1000/3600],
  ],
  acceleration: [
    ['m/s2',1], ['m s-2',1], ['ms-2',1], ['n/kg',1], ['n kg-1',1], ['nkg-1',1],
  ],
  force: [['n',1], ['kn',1e3], ['mn',1e-3]],
  moment: [['n m',1], ['nm',1], ['n*m',1], ['n cm',1e-2], ['ncm',1e-2]],
  energy: [['j',1], ['kj',1e3], ['mj',1e6]],
  power: [['w',1], ['kw',1e3], ['mw',1e6]],
  pressure: [['pa',1], ['kpa',1e3], ['mpa',1e6], ['n/m2',1], ['n m-2',1]],
  density: [
    ['kg/m3',1], ['kg m-3',1], ['kgm-3',1], ['g/cm3',1000], ['g cm-3',1000], ['gcm-3',1000],
  ],
  spring_constant: [
    ['n/m',1], ['n m-1',1], ['nm-1',1], ['n/cm',100], ['n cm-1',100], ['ncm-1',100],
  ],
  momentum: [['kg m/s',1], ['kg m s-1',1], ['kgm/s',1], ['n s',1], ['ns',1]],
  current: [['a',1], ['ma',1e-3], ['ua',1e-6], ['µa',1e-6]],
  voltage: [['v',1], ['mv',1e-3], ['kv',1e3]],
  resistance: [['ohm',1], ['ω',1], ['kω',1e3], ['kohm',1e3], ['mω',1e6], ['mohm',1e6]],
  charge: [['c',1], ['mc',1e-3], ['uc',1e-6], ['µc',1e-6]],
  frequency: [['hz',1], ['khz',1e3], ['mhz',1e6]],
  heat_capacity: [['j/k',1], ['j k-1',1]],
  specific_heat_capacity: [['j/kg k',1], ['j/kgk',1], ['j kg-1 k-1',1], ['jkg-1k-1',1], ['j/(kg k)',1]],
  specific_latent_heat: [['j/kg',1], ['j kg-1',1], ['kj/kg',1e3]],
  dimensionless: [['',1], ['1',1]],
  percent: [['%',1], ['percent',1]],
  angle: [['°',1], ['deg',1], ['degree',1]],
};

const LOOKUPS = Object.fromEntries(Object.entries(UNIT_DEFS).map(([quantity, defs]) => {
  const map = new Map();
  for (const [alias, factor] of defs) map.set(keyUnit(alias), factor);
  return [quantity, map];
}));

function unitFactor(quantity, unit) {
  if (!unit && quantity === 'dimensionless') return 1;
  const map = LOOKUPS[quantity];
  if (!map) return null;
  const key = keyUnit(unit);
  if (map.has(key)) return map.get(key);
  return null;
}

export function convertQuantityValue(value, unit, quantity) {
  if (!Number.isFinite(Number(value))) return null;
  if (quantity === 'temperature') {
    const k = keyUnit(unit);
    if (k === 'k') return Number(value);
    if (k === '°c' || k === 'c') return Number(value) + 273.15;
    return null;
  }
  if (quantity === 'temperature_change') {
    const k = keyUnit(unit);
    if (k === 'k' || k === '°c' || k === 'c') return Number(value);
    return null;
  }
  const factor = unitFactor(quantity, unit);
  return factor === null ? null : Number(value) * factor;
}

export function parsePhysicsQuantity(raw, quantity) {
  const value = parseNumber(raw);
  if (value === null) return { ok:false, reason:'no-number', value:null, unit:null, baseValue:null };
  const unit = rawUnit(raw);
  if (!unit && quantity !== 'dimensionless') {
    return { ok:false, reason:'unit-missing', value, unit:null, baseValue:null };
  }
  const baseValue = convertQuantityValue(value, unit || '', quantity);
  if (baseValue === null) {
    return { ok:false, reason:'unit-incompatible', value, unit, baseValue:null };
  }
  return { ok:true, reason:'parsed', value, unit, baseValue };
}

export function comparePhysicsQuantity(raw, expected, {
  quantity,
  tolerance = 1e-9,
  relativeTolerance = 1e-6,
  unitRequired = true,
} = {}) {
  const value = parseNumber(raw);
  if (value === null) return { correct:false, reason:'no-number' };
  const writtenUnit = rawUnit(raw);
  if (unitRequired && !writtenUnit && quantity !== 'dimensionless') {
    return { correct:false, reason:'unit-missing', value };
  }
  const got = convertQuantityValue(value, writtenUnit || '', quantity);
  if (got === null) return { correct:false, reason:'unit-incompatible', value, unit:writtenUnit };

  const expectedValue = typeof expected === 'number' ? expected : Number(expected.value);
  const expectedUnit = typeof expected === 'number' ? '' : expected.unit;
  const want = convertQuantityValue(expectedValue, expectedUnit || '', quantity);
  if (want === null) throw new Error(`Invalid expected unit ${expectedUnit} for ${quantity}`);

  const diff = Math.abs(got - want);
  // CSEC classroom conversions commonly use T/K = theta/degC + 273 while the
  // thermodynamic offset is 273.15. Accept either convention when comparing
  // absolute temperature, without weakening tolerances for other quantities.
  const courseTemperatureTolerance = quantity === 'temperature' ? 0.2 : 0;
  const allowed = Math.max(tolerance, Math.abs(want) * relativeTolerance, courseTemperatureTolerance);
  return {
    correct: diff <= allowed,
    reason: diff <= allowed ? 'correct' : 'value-mismatch',
    got,
    want,
    unit: writtenUnit,
    difference: diff,
    allowed,
  };
}

export function countSignificantFigures(raw) {
  const text = tidyPhysicsText(raw).replace(/(?<=\d),(?=\d{3}(?:\D|$))/g, '');
  const m = text.match(/[-+]?\d*\.?\d+/);
  if (!m) return 0;
  const s = m[0].replace(/^[-+]/, '');
  if (!s.includes('.')) {
    const stripped = s.replace(/^0+/, '').replace(/0+$/, '');
    return stripped.length || (/[1-9]/.test(s) ? s.replace(/^0+/, '').length : 0);
  }
  return s.replace('.', '').replace(/^0+/, '').length;
}

export function countDecimalPlaces(raw) {
  const text = tidyPhysicsText(raw);
  const m = text.match(/[-+]?\d+\.(\d+)/);
  return m ? m[1].length : 0;
}
