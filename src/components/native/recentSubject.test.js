import { readRecentSubject, recentSubjectKey, rememberRecentSubject } from "./recentSubject";

const subjects = [{ id: "mathematics", name: "Mathematics" }, { id: "physics", name: "Physics" }];
let storage;
beforeEach(() => {
  const entries = new Map();
  storage = {
    getItem: jest.fn(key => entries.get(key) || null),
    setItem: jest.fn((key, value) => entries.set(key, value)),
  };
});

test("scopes the recent subject by student and task", () => {
  expect(rememberRecentSubject({ userId: "alice", capability: "study", subjectId: "physics", storage })).toBe(true);
  expect(readRecentSubject({ userId: "alice", capability: "study", subjects, storage })).toBe(subjects[1]);
  expect(readRecentSubject({ userId: "alice", capability: "practice", subjects, storage })).toBeNull();
  expect(readRecentSubject({ userId: "bob", capability: "study", subjects, storage })).toBeNull();
});

test("never exposes unenrolled or removed subjects", () => {
  rememberRecentSubject({ userId: "alice", capability: "study", subjectId: "physics", storage });
  expect(readRecentSubject({ userId: "alice", capability: "study", subjects: subjects.slice(0, 1), storage })).toBeNull();
});

test("does not persist a subject for an unknown user or unrecognized capability", () => {
  expect(recentSubjectKey(null, "study")).toBeNull();
  expect(rememberRecentSubject({ capability: "practice", subjectId: "mathematics", storage })).toBe(false);
  expect(rememberRecentSubject({ userId: "alice", capability: "unknown", subjectId: "mathematics", storage })).toBe(false);
  expect(storage.setItem).not.toHaveBeenCalled();
});

test("gracefully handles disabled storage", () => {
  const broken = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
  expect(readRecentSubject({ userId: "alice", capability: "study", subjects, storage: broken })).toBeNull();
  expect(rememberRecentSubject({ userId: "alice", capability: "study", subjectId: "physics", storage: broken })).toBe(false);
});
