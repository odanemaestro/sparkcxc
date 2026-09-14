// SPARK Physics revision formula and relationship list.
// This is a study aid. CSEC Physics does not provide a formula sheet in the examination.

export const PHYSICS_FORMULA_LIST = Object.freeze([
  {
    "name": "Density",
    "equation": "ρ = m / V",
    "symbols": "ρ is density, m is mass, V is volume",
    "unit": "kg/m³, or g/cm³",
    "topic": "A1",
    "section": "A"
  },
  {
    "name": "Period of a simple pendulum",
    "equation": "T = 2π √(l / g)",
    "symbols": "T is the period, l is the length of the string, g is the gravitational field strength",
    "unit": "T in seconds",
    "topic": "A1",
    "section": "A"
  },
  {
    "name": "Gradient of a straight line",
    "equation": "gradient = Δy / Δx",
    "symbols": "Δy is the change in the plotted quantity on the vertical axis, Δx the change on the horizontal",
    "unit": "the unit of the y quantity divided by the unit of the x quantity",
    "topic": "A1",
    "section": "A"
  },
  {
    "name": "Resultant of two perpendicular vectors",
    "equation": "R = √(A² + B²)",
    "symbols": "A and B are the two vectors at right angles, R is the resultant",
    "unit": "the unit of A and B",
    "topic": "A2",
    "section": "A"
  },
  {
    "name": "Weight",
    "equation": "W = m g",
    "symbols": "W is weight, m is mass, g is gravitational field strength",
    "unit": "W in newtons (N), m in kilograms, g in N/kg",
    "topic": "A3",
    "section": "A"
  },
  {
    "name": "Moment of a force",
    "equation": "moment = F × d",
    "symbols": "F is the force, d is the perpendicular distance from the pivot to the line of action of the force",
    "unit": "newton metre (N m)",
    "topic": "A3",
    "section": "A"
  },
  {
    "name": "Principle of moments",
    "equation": "sum of clockwise moments = sum of anticlockwise moments",
    "symbols": "taken about the same point, for a body in equilibrium",
    "unit": "N m",
    "topic": "A3",
    "section": "A"
  },
  {
    "name": "Hooke’s law",
    "equation": "F = k x",
    "symbols": "F is the force applied, x is the extension, k is the spring constant",
    "unit": "F in newtons, x in metres, k in N/m",
    "topic": "A3",
    "section": "A"
  },
  {
    "name": "Speed",
    "equation": "speed = distance / time",
    "symbols": "distance in metres, time in seconds",
    "unit": "m/s",
    "topic": "A4",
    "section": "A"
  },
  {
    "name": "Acceleration",
    "equation": "a = (v − u) / t",
    "symbols": "u is the initial velocity, v is the final velocity, t is the time taken",
    "unit": "m/s²",
    "topic": "A4",
    "section": "A"
  },
  {
    "name": "Newton’s second law",
    "equation": "F = m a",
    "symbols": "F is the resultant force, m is the mass, a is the acceleration",
    "unit": "F in newtons",
    "topic": "A4",
    "section": "A"
  },
  {
    "name": "Linear momentum",
    "equation": "p = m v",
    "symbols": "m is mass, v is velocity",
    "unit": "kg m/s, which is the same as N s",
    "topic": "A4",
    "section": "A"
  },
  {
    "name": "Conservation of linear momentum",
    "equation": "m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂",
    "symbols": "u values are velocities before the collision, v values after",
    "unit": "kg m/s",
    "topic": "A4",
    "section": "A"
  },
  {
    "name": "Work",
    "equation": "W = F × d",
    "symbols": "F is the force, d is the distance moved in the direction of the force",
    "unit": "joule (J)",
    "topic": "A5",
    "section": "A"
  },
  {
    "name": "Gravitational potential energy",
    "equation": "Ep = m g h",
    "symbols": "m is mass, g is gravitational field strength, h is the change in height",
    "unit": "joule (J)",
    "topic": "A5",
    "section": "A"
  },
  {
    "name": "Kinetic energy",
    "equation": "Ek = ½ m v²",
    "symbols": "m is mass, v is speed",
    "unit": "joule (J)",
    "topic": "A5",
    "section": "A"
  },
  {
    "name": "Power",
    "equation": "P = E / t",
    "symbols": "E is the energy transferred, or the work done, t is the time taken",
    "unit": "watt (W)",
    "topic": "A5",
    "section": "A"
  },
  {
    "name": "Efficiency",
    "equation": "efficiency = (useful output energy / total input energy) × 100%",
    "symbols": "both energies in joules, or both powers in watts",
    "unit": "per cent",
    "topic": "A5",
    "section": "A"
  },
  {
    "name": "Pressure",
    "equation": "P = F / A",
    "symbols": "F is the force acting at right angles to the surface, A is the area",
    "unit": "pascal (Pa), which is N/m²",
    "topic": "A6",
    "section": "A"
  },
  {
    "name": "Pressure in a fluid",
    "equation": "p = ρ g h",
    "symbols": "ρ is the density of the fluid, g the gravitational field strength, h the depth below the surface",
    "unit": "pascal (Pa)",
    "topic": "A6",
    "section": "A"
  },
  {
    "name": "Archimedes’ principle",
    "equation": "upthrust = weight of fluid displaced",
    "symbols": "upthrust in newtons",
    "unit": "newton (N)",
    "topic": "A6",
    "section": "A"
  },
  {
    "name": "Kelvin and Celsius",
    "equation": "T (in K) = θ (in °C) + 273",
    "symbols": "T is the absolute temperature, θ the Celsius temperature",
    "unit": "kelvin (K)",
    "topic": "B2",
    "section": "B"
  },
  {
    "name": "Boyle’s law",
    "equation": "P₁V₁ = P₂V₂",
    "symbols": "P is pressure, V is volume, at constant temperature",
    "unit": "any consistent units",
    "topic": "B2",
    "section": "B"
  },
  {
    "name": "Charles’ law",
    "equation": "V₁ / T₁ = V₂ / T₂",
    "symbols": "V is volume, T is absolute temperature, at constant pressure",
    "unit": "T in kelvin",
    "topic": "B2",
    "section": "B"
  },
  {
    "name": "Pressure law",
    "equation": "P₁ / T₁ = P₂ / T₂",
    "symbols": "P is pressure, T is absolute temperature, at constant volume",
    "unit": "T in kelvin",
    "topic": "B2",
    "section": "B"
  },
  {
    "name": "Heat capacity",
    "equation": "C = m c",
    "symbols": "C is the heat capacity of the object, m its mass, c the specific heat capacity of the material",
    "unit": "J/K",
    "topic": "B3",
    "section": "B"
  },
  {
    "name": "Energy to change temperature",
    "equation": "EH = m c ΔT",
    "symbols": "m is mass, c specific heat capacity, ΔT the temperature change",
    "unit": "EH in joules, c in J/kg K",
    "topic": "B3",
    "section": "B"
  },
  {
    "name": "Energy to change phase",
    "equation": "EH = m l",
    "symbols": "m is mass, l the specific latent heat",
    "unit": "EH in joules, l in J/kg",
    "topic": "B3",
    "section": "B"
  },
  {
    "name": "Electrical energy supplied by a heater",
    "equation": "E = P t = V I t",
    "symbols": "P is power, t time, V voltage, I current",
    "unit": "joule (J)",
    "topic": "B3",
    "section": "B"
  },
  {
    "name": "Wave equation",
    "equation": "v = f λ",
    "symbols": "v is wave speed, f is frequency, λ is wavelength",
    "unit": "v in m/s, f in Hz, λ in m",
    "topic": "C1",
    "section": "C"
  },
  {
    "name": "Frequency and period",
    "equation": "f = 1 / T",
    "symbols": "f is frequency, T is period",
    "unit": "f in hertz (Hz), T in seconds",
    "topic": "C1",
    "section": "C"
  },
  {
    "name": "Speed of sound",
    "equation": "v = d / t",
    "symbols": "d is the distance travelled, t the time taken",
    "unit": "m/s",
    "topic": "C2",
    "section": "C"
  },
  {
    "name": "Wave equation applied to sound",
    "equation": "v = f λ",
    "symbols": "v about 340 m/s in air",
    "unit": "m/s",
    "topic": "C2",
    "section": "C"
  },
  {
    "name": "Speed of electromagnetic waves",
    "equation": "c = 3 × 10⁸ m/s",
    "symbols": "c is the speed of all electromagnetic waves in a vacuum",
    "unit": "m/s",
    "topic": "C3",
    "section": "C"
  },
  {
    "name": "Laws of reflection",
    "equation": "angle of incidence = angle of reflection",
    "symbols": "both angles measured from the normal",
    "unit": "degrees",
    "topic": "C4",
    "section": "C"
  },
  {
    "name": "Snell’s law",
    "equation": "n = sin i / sin r",
    "symbols": "n is the refractive index, i the angle of incidence, r the angle of refraction",
    "unit": "n has no unit",
    "topic": "C4",
    "section": "C"
  },
  {
    "name": "Refractive index and speed",
    "equation": "n = speed of light in vacuum / speed of light in the medium",
    "symbols": "n is the refractive index",
    "unit": "no unit",
    "topic": "C4",
    "section": "C"
  },
  {
    "name": "Critical angle",
    "equation": "sin c = 1 / n",
    "symbols": "c is the critical angle, n the refractive index",
    "unit": "c in degrees",
    "topic": "C4",
    "section": "C"
  },
  {
    "name": "Magnification",
    "equation": "m = image size / object size = v / u",
    "symbols": "v is the image distance, u the object distance",
    "unit": "no unit",
    "topic": "C5",
    "section": "C"
  },
  {
    "name": "Lens formula",
    "equation": "1/f = 1/u + 1/v",
    "symbols": "f is the focal length, u the object distance, v the image distance",
    "unit": "all three in the same unit of length",
    "topic": "C5",
    "section": "C"
  },
  {
    "name": "Charge and current",
    "equation": "Q = I t",
    "symbols": "Q is charge, I is current, t is time",
    "unit": "Q in coulombs (C), I in amperes (A), t in seconds",
    "topic": "D2",
    "section": "D"
  },
  {
    "name": "Frequency from a graph",
    "equation": "f = 1 / T",
    "symbols": "T is the period read off the time axis",
    "unit": "hertz (Hz)",
    "topic": "D2",
    "section": "D"
  },
  {
    "name": "Potential difference",
    "equation": "V = E / Q",
    "symbols": "E is the energy transferred, Q the charge",
    "unit": "volt (V), which is one joule per coulomb",
    "topic": "D3",
    "section": "D"
  },
  {
    "name": "Electrical power",
    "equation": "P = I V",
    "symbols": "I is current, V is potential difference",
    "unit": "watt (W)",
    "topic": "D3",
    "section": "D"
  },
  {
    "name": "Electrical energy",
    "equation": "E = P t = I V t",
    "symbols": "t is time in seconds",
    "unit": "joule (J)",
    "topic": "D3",
    "section": "D"
  },
  {
    "name": "Resistance",
    "equation": "R = V / I",
    "symbols": "V is the potential difference across the component, I the current through it",
    "unit": "ohm (Ω)",
    "topic": "D4",
    "section": "D"
  },
  {
    "name": "Resistors in series",
    "equation": "R = R₁ + R₂ + R₃",
    "symbols": "the total resistance of resistors joined end to end",
    "unit": "ohm (Ω)",
    "topic": "D4",
    "section": "D"
  },
  {
    "name": "Resistors in parallel",
    "equation": "1/R = 1/R₁ + 1/R₂",
    "symbols": "the total resistance of resistors joined across the same two points",
    "unit": "ohm (Ω)",
    "topic": "D4",
    "section": "D"
  },
  {
    "name": "Current rating of a fuse",
    "equation": "I = P / V",
    "symbols": "P is the appliance power, V the mains voltage",
    "unit": "ampere (A)",
    "topic": "D4",
    "section": "D"
  },
  {
    "name": "AND",
    "equation": "output is 1 only when both inputs are 1",
    "symbols": "two inputs A and B",
    "unit": "logic levels 0 and 1",
    "topic": "D5",
    "section": "D"
  },
  {
    "name": "OR",
    "equation": "output is 1 when at least one input is 1",
    "symbols": "two inputs A and B",
    "unit": "logic levels 0 and 1",
    "topic": "D5",
    "section": "D"
  },
  {
    "name": "NOT",
    "equation": "output is the opposite of the input",
    "symbols": "one input",
    "unit": "logic levels 0 and 1",
    "topic": "D5",
    "section": "D"
  },
  {
    "name": "NAND and NOR",
    "equation": "the outputs of AND and OR, each inverted",
    "symbols": "two inputs A and B",
    "unit": "logic levels 0 and 1",
    "topic": "D5",
    "section": "D"
  },
  {
    "name": "Right-hand grip rule",
    "equation": "thumb along the conventional current, fingers curl along the field",
    "symbols": "for the field around a straight wire or through a solenoid",
    "unit": "direction only",
    "topic": "D7",
    "section": "D"
  },
  {
    "name": "Fleming’s left-hand (motor) rule",
    "equation": "First finger Field, seCond finger Current, thuMb Motion",
    "symbols": "left hand, three fingers at right angles",
    "unit": "direction only",
    "topic": "D7",
    "section": "D"
  },
  {
    "name": "Fleming’s right-hand (generator) rule",
    "equation": "First finger Field, thuMb Motion, seCond finger induced Current",
    "symbols": "right hand, three fingers at right angles",
    "unit": "direction only",
    "topic": "D7",
    "section": "D"
  },
  {
    "name": "Ideal transformer",
    "equation": "Vs / Vp = Ns / Np",
    "symbols": "V is voltage, N is number of turns, p is primary and s is secondary",
    "unit": "volts and turns",
    "topic": "D7",
    "section": "D"
  },
  {
    "name": "Ideal transformer power",
    "equation": "Pout = Pin, so Vp Ip = Vs Is",
    "symbols": "P is power, I is current",
    "unit": "watt (W)",
    "topic": "D7",
    "section": "D"
  },
  {
    "name": "Mass, atomic and neutron number",
    "equation": "A = Z + N",
    "symbols": "A is the mass number, Z the atomic number or proton number, N the number of neutrons",
    "unit": "counts, no unit",
    "topic": "E2",
    "section": "E"
  },
  {
    "name": "Nuclide notation",
    "equation": "ᴬZ X",
    "symbols": "A above and Z below the chemical symbol X",
    "unit": "none",
    "topic": "E2",
    "section": "E"
  },
  {
    "name": "Half-life",
    "equation": "after n half-lives, the amount remaining is the original divided by 2ⁿ",
    "symbols": "n is the number of half-lives elapsed",
    "unit": "time in the same unit as the half-life",
    "topic": "E3",
    "section": "E"
  },
  {
    "name": "Alpha decay",
    "equation": "A falls by 4, Z falls by 2",
    "symbols": "the emitted particle is a helium nucleus",
    "unit": "none",
    "topic": "E3",
    "section": "E"
  },
  {
    "name": "Beta decay",
    "equation": "A unchanged, Z rises by 1",
    "symbols": "a neutron becomes a proton and an electron, and the electron is emitted",
    "unit": "none",
    "topic": "E3",
    "section": "E"
  },
  {
    "name": "Mass and energy",
    "equation": "E = m c²",
    "symbols": "m is the mass converted, c the speed of light",
    "unit": "E in joules",
    "topic": "E3",
    "section": "E"
  }
]);

export function physicsFormulaStats() {
  return Object.freeze({
    entries: PHYSICS_FORMULA_LIST.length,
    topics: new Set(PHYSICS_FORMULA_LIST.map(item => item.topic)).size,
    sections: new Set(PHYSICS_FORMULA_LIST.map(item => item.section)).size,
  });
}
