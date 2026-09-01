// ============================================================================
// Done by: Odane Robinson
//
// Verifies the country-code phone data used by the new country dropdown,
// and that composing "+<dialCode><localNumber>" for various countries
// (including both Jamaica area codes, 876 and 658) produces strings that
// the existing isValidPhone logic in App.js (a regex-based check, not
// exported, so reproduced here exactly for testing) correctly accepts.
// ============================================================================
import { COUNTRY_CODES, isoToFlagEmoji } from "../countryCodes";

// Reproduces src/App.js's isValidPhone exactly, so this test exercises the
// real validation rules without needing to export internals from App.js.
function isValidPhone(value) {
  const raw = String(value || "").trim();
  if (!raw) return false;
  if (!/^[+0-9\s().-]+$/.test(raw)) return false;
  const digits = raw.replace(/\D/g, "");
  if (/^(876|658)\d{7}$/.test(digits)) return true;
  if (/^1(876|658)\d{7}$/.test(digits) && raw.replace(/\D/g, "").length === 11) return true;
  return raw.startsWith("+") && /^\d{10,15}$/.test(digits);
}

describe("COUNTRY_CODES data integrity", () => {
  test("every entry has a name, dialCode, and 2-letter iso2", () => {
    for (const c of COUNTRY_CODES) {
      expect(typeof c.name).toBe("string");
      expect(c.name.length).toBeGreaterThan(0);
      expect(/^\d+$/.test(c.dialCode)).toBe(true);
      expect(c.iso2).toMatch(/^[A-Z]{2}$/);
    }
  });

  test("no duplicate ISO2 codes", () => {
    const iso2s = COUNTRY_CODES.map(c => c.iso2);
    expect(new Set(iso2s).size).toBe(iso2s.length);
  });

  test("Jamaica is present and listed first (this is a Jamaica-based platform)", () => {
    expect(COUNTRY_CODES[0].iso2).toBe("JM");
    expect(COUNTRY_CODES[0].dialCode).toBe("1876");
  });

  test("a genuinely large, real international list (well over 100 countries)", () => {
    expect(COUNTRY_CODES.length).toBeGreaterThan(200);
  });
});

describe("isoToFlagEmoji", () => {
  test("produces the correct two-codepoint regional indicator sequence", () => {
    // 'J' -> 0x1F1E6 + ('J'.charCodeAt(0) - 65) = 0x1F1E6 + 9 = 0x1F1EF
    // 'M' -> 0x1F1E6 + ('M'.charCodeAt(0) - 65) = 0x1F1E6 + 12 = 0x1F1F2
    const flag = isoToFlagEmoji("JM");
    const codePoints = [...flag].map(c => c.codePointAt(0));
    expect(codePoints).toEqual([0x1f1ef, 0x1f1f2]);
  });

  test("matches known flags for a spot-check of common countries", () => {
    expect(isoToFlagEmoji("US")).toBe(String.fromCodePoint(0x1f1fa, 0x1f1f8));
    expect(isoToFlagEmoji("GB")).toBe(String.fromCodePoint(0x1f1ec, 0x1f1e7));
    expect(isoToFlagEmoji("CA")).toBe(String.fromCodePoint(0x1f1e8, 0x1f1e6));
    expect(isoToFlagEmoji("TT")).toBe(String.fromCodePoint(0x1f1f9, 0x1f1f9));
  });

  test("every country in the list produces a valid 2-codepoint flag", () => {
    for (const c of COUNTRY_CODES) {
      const flag = isoToFlagEmoji(c.iso2);
      expect([...flag].length).toBe(2);
    }
  });
});

describe("composed phone numbers pass the app's real validation logic", () => {
  test("Jamaica with 876 area code", () => {
    const jm = COUNTRY_CODES.find(c => c.iso2 === "JM");
    expect(isValidPhone(`+${jm.dialCode}5551234`)).toBe(true); // +18765551234
  });

  test("Jamaica with the new 658 area code composed manually (JM entry uses 1876, but 658 must still validate)", () => {
    expect(isValidPhone("+18585551234".replace("858", "658"))).toBe(true); // +16585551234
    expect(isValidPhone("6585551234")).toBe(true); // bare local-style 658 number
  });

  test("a selection of other countries produce validatable composed numbers", () => {
    const cases = [
      { iso2: "US", local: "5551234567" },
      { iso2: "GB", local: "7911123456" },
      { iso2: "TT", local: "8681234" },
      { iso2: "CA", local: "4165551234" },
      { iso2: "IN", local: "9876543210" },
    ];
    for (const { iso2, local } of cases) {
      const country = COUNTRY_CODES.find(c => c.iso2 === iso2);
      expect(country).toBeDefined();
      const composed = `+${country.dialCode}${local}`;
      expect(isValidPhone(composed)).toBe(true);
    }
  });

  test("a too-short composed number is correctly rejected", () => {
    const country = COUNTRY_CODES.find(c => c.iso2 === "US");
    expect(isValidPhone(`+${country.dialCode}123`)).toBe(false);
  });
});
