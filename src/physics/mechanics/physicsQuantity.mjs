// SPARK Physics quantity-aware unit normalisation.
// This layer is deliberately semantic. Equal dimensions do not automatically
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

// Accept integers, decimals with or without a leading zero, decimal commas,
// ordinary scientific notation and CSEC-style "x 10^n" notation.
const NUMBER_RE = /[-+]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:\s*(?:\*|x)\s*10\s*\^?\s*[-+]?\d+|\s*e\s*[-+]?\d+)?/i;

function numberTokenValue(token) {
  let text = String(token ?? '').trim();
  const scientific = text.match(/^(.*?)(?:\s*(?:\*|x)\s*10\s*\^?\s*|\s*e\s*)([-+]?\d+)$/i);
  let exponent = '';
  if (scientific) {
    text = scientific[1].trim();
    exponent = `e${scientific[2]}`;
  }

  text = text.replace(/\s+/g, '');
  if (text.includes(',') && text.includes('.')) {
    // A dot is treated as the decimal separator and commas as grouping marks.
    text = text.replace(/,/g, '');
  } else if (text.includes(',')) {
    // 1,000 and 170,000 are grouping. 0,5 is a decimal comma.
    if (/^[-+]?\d{1,3}(?:,\d{3})+$/.test(text)) text = text.replace(/,/g, '');
    else text = text.replace(',', '.').replace(/,/g, '');
  }

  const value = Number(`${text}${exponent}`);
  return Number.isFinite(value) ? value : null;
}

export function parseNumber(raw) {
  const text = tidyPhysicsText(raw);
  const match = text.match(NUMBER_RE);
  return match ? numberTokenValue(match[0]) : null;
}

export function rawUnit(raw) {
  const text = tidyPhysicsText(raw);
  const match = text.match(NUMBER_RE);
  if (!match) return null;
  const after = text.slice((match.index ?? 0) + match[0].length).trim()
    .replace(/^[=,:;]+\s*/, '')
    .replace(/[.;,]+$/, '')
    .trim();
  return after || null;
}

// Keep SI symbol case. Prefix case is physically meaningful, for example
// mW is milliwatt while MW is megawatt. Written unit names are converted to
// canonical symbols case-insensitively before symbol matching.
function keyUnit(raw) {
  if (!raw) return '';
  return tidyPhysicsText(raw)
    .replace(/\bmicroamperes?|\bmicroamps?/gi, 'uA')
    .replace(/\bmilliamperes?|\bmilliamps?/gi, 'mA')
    .replace(/\bkiloamperes?|\bkiloamps?/gi, 'kA')
    .replace(/\bmegaamperes?|\bmegaamps?/gi, 'MA')
    .replace(/\bmillivolts?\b/gi, 'mV')
    .replace(/\bkilovolts?\b/gi, 'kV')
    .replace(/\bmegavolts?\b/gi, 'MV')
    .replace(/\bmillinewtons?\b/gi, 'mN')
    .replace(/\bkilonewtons?\b/gi, 'kN')
    .replace(/\bmeganewtons?\b/gi, 'MN')
    .replace(/\bmillijoules?\b/gi, 'mJ')
    .replace(/\bkilojoules?\b/gi, 'kJ')
    .replace(/\bmegajoules?\b/gi, 'MJ')
    .replace(/\bmilliwatts?\b/gi, 'mW')
    .replace(/\bkilowatts?\b/gi, 'kW')
    .replace(/\bmegawatts?\b/gi, 'MW')
    .replace(/\bmillipascals?\b/gi, 'mPa')
    .replace(/\bkilopascals?\b/gi, 'kPa')
    .replace(/\bmegapascals?\b/gi, 'MPa')
    .replace(/\bmillihertz\b/gi, 'mHz')
    .replace(/\bkilohertz\b/gi, 'kHz')
    .replace(/\bmegahertz\b/gi, 'MHz')
    .replace(/\bgigahertz\b/gi, 'GHz')
    .replace(/\bmillibecquerels?\b/gi, 'mBq')
    .replace(/\bkilobecquerels?\b/gi, 'kBq')
    .replace(/\bmegabecquerels?\b/gi, 'MBq')
    .replace(/degrees?\s+celsius/gi, '°C')
    .replace(/degree\s+celsius/gi, '°C')
    .replace(/\bcelsius\b/gi, '°C')
    .replace(/\bmetres?\b/gi, 'm')
    .replace(/\bmeters?\b/gi, 'm')
    .replace(/\bcentimetres?\b|\bcentimeters?\b/gi, 'cm')
    .replace(/\bmillimetres?\b|\bmillimeters?\b/gi, 'mm')
    .replace(/\bkilometres?\b|\bkilometers?\b/gi, 'km')
    .replace(/\bseconds?\b/gi, 's')
    .replace(/\bminutes?\b|\bmins?\b/gi, 'min')
    .replace(/\bhours?\b|\bhrs?\b/gi, 'h')
    .replace(/\bkilograms?\b/gi, 'kg')
    .replace(/\bgrams?\b/gi, 'g')
    .replace(/\bnewtons?\b/gi, 'N')
    .replace(/\bjoules?\b/gi, 'J')
    .replace(/\bwatts?\b/gi, 'W')
    .replace(/\bpascals?\b/gi, 'Pa')
    .replace(/\bvolts?\b/gi, 'V')
    .replace(/\bamperes?\b|\bamps?\b/gi, 'A')
    .replace(/\bcoulombs?\b/gi, 'C')
    .replace(/\bohms?\b/gi, 'Ω')
    .replace(/[ωΩ]/g, 'Ω')
    .replace(/\bhertz\b/gi, 'Hz')
    .replace(/\bbecquerels?\b/gi, 'Bq')
    .replace(/\bkelvins?\b/gi, 'K')
    .replace(/\bdegrees?\b/gi, '°')
    .replace(/[µμ]/g, 'u')
    .replace(/\bper\b/gi, '/')
    .replace(/\^/g, '')
    .replace(/\s*\/\s*/g, '/')
    .replace(/\s*\*\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Each alias maps to a canonical semantic unit and a multiplicative factor to
// that unit. Lower-case prefixed symbols are only listed when their meaning is
// unambiguous. For example, "mw" is treated as mW, not MW.
const UNIT_DEFS = {
  length: [
    ['m', 1], ['cm', 1e-2], ['mm', 1e-3], ['km', 1e3],
  ],
  area: [
    ['m2', 1], ['m 2', 1], ['cm2', 1e-4], ['cm 2', 1e-4], ['mm2', 1e-6], ['mm 2', 1e-6], ['km2', 1e6],
  ],
  volume: [
    ['m3', 1], ['m 3', 1], ['cm3', 1e-6], ['cm 3', 1e-6], ['mm3', 1e-9], ['mm 3', 1e-9],
    ['L', 1e-3], ['l', 1e-3], ['litre', 1e-3], ['liter', 1e-3], ['mL', 1e-6], ['ml', 1e-6],
  ],
  mass: [['kg',1], ['g',1e-3], ['mg',1e-6]],
  time: [['s',1], ['ms',1e-3], ['min',60], ['h',3600]],
  time_squared: [['s2',1], ['s 2',1]],
  time_squared_per_length: [['s2/m',1], ['s 2/m',1], ['s2 m-1',1], ['s 2 m-1',1]],
  speed: [
    ['m/s',1], ['m s-1',1], ['ms-1',1], ['km/h',1000/3600], ['km h-1',1000/3600],
  ],
  acceleration: [
    ['m/s2',1], ['m s-2',1], ['ms-2',1], ['N/kg',1], ['n/kg',1], ['N kg-1',1], ['n kg-1',1], ['Nkg-1',1], ['nkg-1',1],
  ],
  force: [['N',1], ['n',1], ['kN',1e3], ['kn',1e3], ['mN',1e-3], ['mn',1e-3], ['MN',1e6]],
  moment: [['N m',1], ['n m',1], ['Nm',1], ['nm',1], ['N*m',1], ['n*m',1], ['N cm',1e-2], ['n cm',1e-2], ['Ncm',1e-2], ['ncm',1e-2]],
  energy: [['J',1], ['j',1], ['kJ',1e3], ['kj',1e3], ['mJ',1e-3], ['mj',1e-3], ['MJ',1e6]],
  power: [['W',1], ['w',1], ['kW',1e3], ['kw',1e3], ['mW',1e-3], ['mw',1e-3], ['MW',1e6]],
  pressure: [['Pa',1], ['pa',1], ['kPa',1e3], ['kpa',1e3], ['mPa',1e-3], ['mpa',1e-3], ['MPa',1e6], ['N/m2',1], ['n/m2',1], ['N m-2',1], ['n m-2',1]],
  density: [
    ['kg/m3',1], ['kg m-3',1], ['kgm-3',1], ['g/cm3',1000], ['g cm-3',1000], ['gcm-3',1000],
  ],
  spring_constant: [
    ['N/m',1], ['n/m',1], ['N m-1',1], ['n m-1',1], ['Nm-1',1], ['nm-1',1],
    ['N/cm',100], ['n/cm',100], ['N cm-1',100], ['n cm-1',100], ['Ncm-1',100], ['ncm-1',100],
  ],
  momentum: [['kg m/s',1], ['kg m s-1',1], ['kgm/s',1], ['N s',1], ['n s',1], ['Ns',1], ['ns',1]],
  current: [['A',1], ['a',1], ['mA',1e-3], ['ma',1e-3], ['uA',1e-6], ['ua',1e-6], ['kA',1e3], ['ka',1e3], ['MA',1e6]],
  voltage: [['V',1], ['v',1], ['mV',1e-3], ['mv',1e-3], ['kV',1e3], ['kv',1e3], ['MV',1e6]],
  resistance: [['Ω',1], ['ohm',1], ['kΩ',1e3], ['kohm',1e3], ['mΩ',1e-3], ['mohm',1e-3], ['MΩ',1e6], ['Mohm',1e6]],
  charge: [['C',1], ['c',1], ['mC',1e-3], ['mc',1e-3], ['uC',1e-6], ['uc',1e-6], ['kC',1e3], ['kc',1e3]],
  frequency: [['Hz',1], ['hz',1], ['kHz',1e3], ['khz',1e3], ['mHz',1e-3], ['mhz',1e-3], ['MHz',1e6], ['GHz',1e9], ['ghz',1e9]],
  activity: [['Bq',1], ['bq',1], ['kBq',1e3], ['kbq',1e3], ['mBq',1e-3], ['mbq',1e-3], ['MBq',1e6]],
  heat_capacity: [['J/K',1], ['j/k',1], ['J K-1',1], ['j k-1',1], ['kJ/K',1e3], ['kj/k',1e3]],
  specific_heat_capacity: [
    ['J/kg K',1], ['j/kg k',1], ['J/kgK',1], ['j/kgk',1], ['J kg-1 K-1',1], ['j kg-1 k-1',1], ['Jkg-1K-1',1], ['jkg-1k-1',1], ['J/(kg K)',1], ['j/(kg k)',1],
    ['kJ/kg K',1e3], ['kj/kg k',1e3],
  ],
  specific_latent_heat: [['J/kg',1], ['j/kg',1], ['J kg-1',1], ['j kg-1',1], ['kJ/kg',1e3], ['kj/kg',1e3], ['MJ/kg',1e6]],
  dimensionless: [['',1], ['1',1]],
  percent: [['%',1], ['percent',1]],
  angle: [['°',1], ['deg',1], ['degree',1]],
};

const LOOKUPS = Object.fromEntries(Object.entries(UNIT_DEFS).map(([quantity, defs]) => {
  const map = new Map();
  for (const [alias, factor] of defs) map.set(keyUnit(alias), factor);
  return [quantity, map];
}));

function prefixBoundary(text, length) {
  if (text.length === length) return true;
  const next = text[length];
  return /[\s,.;:!?\)\]\}]/.test(next || '');
}

function lookupUnitFactor(quantity, unit) {
  const q = String(quantity ?? '').toLowerCase();
  if (!unit && q === 'dimensionless') return 1;
  const map = LOOKUPS[q];
  if (!map) return null;
  const key = keyUnit(unit);
  if (map.has(key)) return map.get(key);

  // Written answers often continue after the unit, for example
  // "5 m because ...". Accept a valid unit only when it starts the unit tail
  // and ends at a clear boundary. Longest aliases are checked first.
  const aliases = [...map.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const [alias, factor] of aliases) {
    if (alias && key.startsWith(alias) && prefixBoundary(key, alias.length)) return factor;
  }
  return null;
}

function matchesUnitKey(unit, aliases) {
  const key = keyUnit(unit);
  for (const alias of aliases) {
    const candidate = keyUnit(alias);
    if (key === candidate) return true;
    if (candidate && key.startsWith(candidate) && prefixBoundary(key, candidate.length)) return true;
  }
  return false;
}

export function inferPhysicsQuantity(unit) {
  if (!unit) return 'dimensionless';
  if (matchesUnitKey(unit, ['°C', 'Celsius', 'degrees Celsius', 'K'])) return 'temperature';
  const key = keyUnit(unit);
  const preferred = [
    'length','area','volume','mass','time','time_squared','time_squared_per_length',
    'speed','acceleration','force','moment','energy','power','pressure','density',
    'spring_constant','momentum','current','voltage','resistance','charge','frequency',
    'activity','heat_capacity','specific_heat_capacity','specific_latent_heat','percent','angle',
  ];
  for (const quantity of preferred) {
    if (LOOKUPS[quantity]?.has(key)) return quantity;
  }
  return null;
}

export function convertQuantityValue(value, unit, quantity) {
  if (!Number.isFinite(Number(value))) return null;
  const q = String(quantity ?? '').toLowerCase();
  if (q === 'temperature') {
    if (matchesUnitKey(unit, ['K'])) return Number(value);
    if (matchesUnitKey(unit, ['°C', 'Celsius', 'degrees Celsius'])) return Number(value) + 273.15;
    return null;
  }
  if (q === 'temperature_change') {
    if (matchesUnitKey(unit, ['K', '°C', 'Celsius', 'degrees Celsius'])) return Number(value);
    return null;
  }
  const factor = lookupUnitFactor(q, unit);
  return factor === null ? null : Number(value) * factor;
}

export function parsePhysicsQuantity(raw, quantity) {
  const value = parseNumber(raw);
  if (value === null) return { ok:false, reason:'no-number', value:null, unit:null, baseValue:null };
  const q = String(quantity ?? '').toLowerCase();
  const unit = rawUnit(raw);
  if (!unit && q !== 'dimensionless') {
    return { ok:false, reason:'unit-missing', value, unit:null, baseValue:null };
  }
  const baseValue = convertQuantityValue(value, unit || '', q);
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
  const q = String(quantity ?? '').toLowerCase();
  const value = parseNumber(raw);
  if (value === null) return { correct:false, reason:'no-number' };
  const writtenUnit = rawUnit(raw);
  if (unitRequired && !writtenUnit && q !== 'dimensionless') {
    return { correct:false, reason:'unit-missing', value };
  }
  const got = convertQuantityValue(value, writtenUnit || '', q);
  if (got === null) return { correct:false, reason:'unit-incompatible', value, unit:writtenUnit };

  const expectedValue = typeof expected === 'number' ? expected : Number(expected.value);
  const expectedUnit = typeof expected === 'number' ? '' : expected.unit;
  const want = convertQuantityValue(expectedValue, expectedUnit || '', q);
  if (want === null) throw new Error(`Invalid expected unit ${expectedUnit} for ${q}`);

  const diff = Math.abs(got - want);
  // CSEC classroom conversions commonly use T/K = theta/degC + 273 while the
  // thermodynamic offset is 273.15. Accept either convention when comparing
  // absolute temperature, without weakening tolerances for other quantities.
  const courseTemperatureTolerance = q === 'temperature' ? 0.2 : 0;
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
  const text = tidyPhysicsText(raw);
  const m = text.match(/[-+]?(?:\d*\.?\d+)/);
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
  const m = text.match(/[-+]?(?:\d+)?[.,](\d+)/);
  return m ? m[1].length : 0;
}
