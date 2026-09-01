// ============================================================================
// Done by: Odane Robinson
// Tests for sortTutors, the pure sort function backing the "Sort by
// rating / price" feature on the Find a Tutor page.
// ============================================================================
import { sortTutors } from "../tutorSort";

const TUTORS = [
  { id: "a", name: "Alice", rating: 4.5, session_count: 20, rate_jmd: 2000 },
  { id: "b", name: "Bob", rating: 4.9, session_count: 5, rate_jmd: 3500 },
  { id: "c", name: "Carla", rating: 4.5, session_count: 40, rate_jmd: 1500 },
  { id: "d", name: "Dane", rating: null, session_count: 0, rate_jmd: 1000 },
  { id: "e", name: "Elle", rating: 3.8, session_count: 12, rate_jmd: 2800 },
];

describe("sortTutors", () => {
  test("does not mutate the original array", () => {
    const original = [...TUTORS];
    sortTutors(TUTORS, "rating_desc");
    expect(TUTORS).toEqual(original);
  });

  test("'default' (or any unrecognized value) preserves original order", () => {
    expect(sortTutors(TUTORS, "default").map(t => t.id)).toEqual(["a", "b", "c", "d", "e"]);
    expect(sortTutors(TUTORS, "anything_else").map(t => t.id)).toEqual(["a", "b", "c", "d", "e"]);
  });

  test("'rating_desc' sorts highest rating first", () => {
    const result = sortTutors(TUTORS, "rating_desc").map(t => t.id);
    // Bob (4.9) first, then Alice/Carla tied at 4.5 (Carla has more
    // sessions so ranks above Alice), then Elle (3.8), then Dane (no
    // rating) last.
    expect(result).toEqual(["b", "c", "a", "e", "d"]);
  });

  test("'rating_desc' breaks ties on rating using session_count descending", () => {
    const result = sortTutors(TUTORS, "rating_desc");
    const alice = result.find(t => t.id === "a");
    const carla = result.find(t => t.id === "c");
    expect(carla.session_count).toBeGreaterThan(alice.session_count);
    expect(result.indexOf(carla)).toBeLessThan(result.indexOf(alice));
  });

  test("an unrated tutor sorts to the end under 'rating_desc', not the front", () => {
    const result = sortTutors(TUTORS, "rating_desc");
    expect(result[result.length - 1].id).toBe("d");
  });

  test("'price_asc' sorts cheapest first", () => {
    const result = sortTutors(TUTORS, "price_asc").map(t => t.id);
    expect(result).toEqual(["d", "c", "a", "e", "b"]);
    // Confirm rates are actually non-decreasing across the sorted result.
    const rates = sortTutors(TUTORS, "price_asc").map(t => t.rate_jmd);
    for (let i = 1; i < rates.length; i++) {
      expect(rates[i]).toBeGreaterThanOrEqual(rates[i - 1]);
    }
  });

  test("'price_desc' sorts most expensive first", () => {
    const result = sortTutors(TUTORS, "price_desc").map(t => t.id);
    expect(result).toEqual(["b", "e", "a", "c", "d"]);
    const rates = sortTutors(TUTORS, "price_desc").map(t => t.rate_jmd);
    for (let i = 1; i < rates.length; i++) {
      expect(rates[i]).toBeLessThanOrEqual(rates[i - 1]);
    }
  });

  test("handles an empty list without error", () => {
    expect(sortTutors([], "rating_desc")).toEqual([]);
    expect(sortTutors(undefined, "price_asc")).toEqual([]);
  });

  test("handles tutors missing rate_jmd or rating gracefully (treated as 0)", () => {
    const sparse = [
      { id: "x", rate_jmd: 500 },
      { id: "y" },
      { id: "z", rate_jmd: 100 },
    ];
    expect(sortTutors(sparse, "price_asc").map(t => t.id)).toEqual(["y", "z", "x"]);
  });
});
