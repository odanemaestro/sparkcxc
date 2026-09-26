export function dashboardAchievementMeta(title = "") {
  const raw = String(title || "").trim();
  const cleanTitle = raw.replace(/^(?:🔥|🏁|📚)\s*/u, "").trim();

  if (/consistency builder/i.test(cleanTitle)) {
    return { title: cleanTitle, icon: "consistency" };
  }
  if (/exam challenger/i.test(cleanTitle)) {
    return { title: cleanTitle, icon: "challenge" };
  }
  if (/lesson builder/i.test(cleanTitle)) {
    return { title: cleanTitle, icon: "lessonBuilder" };
  }

  return { title: cleanTitle || raw || "Learning milestone", icon: "spark" };
}
