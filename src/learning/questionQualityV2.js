// SPARK question-quality signals.
// These signals are for review and calibration only. They never change a
// canonical answer, mark scheme or question automatically.

export function classifyObservedQuestionDifficulty({
  attemptCount = 0,
  successRate = null,
  authoredDifficulty = "",
} = {}) {
  const attempts = Number(attemptCount || 0);
  const success = Number(successRate);
  if (!Number.isFinite(success) || attempts < 10) {
    return { confidence:"low", observed:"unknown", flag:null };
  }

  const observed = success >= 0.78 ? "easy" : success >= 0.48 ? "medium" : "hard";
  const confidence = attempts >= 50 ? "high" : attempts >= 25 ? "medium" : "low";
  const authored = String(authoredDifficulty || "").trim().toLowerCase();

  let flag = null;
  if (attempts >= 25 && authored && ["easy","medium","hard"].includes(authored) && authored !== observed) {
    flag = {
      type:"difficulty_mismatch",
      message:`Authored difficulty is ${authored}, while observed performance currently looks ${observed}. Review the item before changing anything.`,
    };
  } else if (attempts >= 30 && success <= 0.20) {
    flag = {
      type:"very_low_success",
      message:"Very few students are succeeding on this item. Review wording, prerequisite demand and marking before changing the item.",
    };
  } else if (attempts >= 30 && success >= 0.95) {
    flag = {
      type:"very_high_success",
      message:"Almost every student is succeeding on this item. Check whether it is serving the intended level of challenge.",
    };
  }

  return { confidence, observed, flag };
}