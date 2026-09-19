import { checkSiteLinks, normalizePagePath, pageForPath } from "./siteModel.mjs";

const pages = [
  { id: "home", title: "Home", path: "/" },
  { id: "activities", title: "Activities", path: "/activities" },
  { id: "contact", title: "Contact", path: "/contact" },
];

describe("web site model", () => {
  test("normalizes and resolves internal page paths", () => {
    expect(normalizePagePath(" Club Activities ")).toBe("/club-activities");
    expect(pageForPath(pages, "https://spark.local/activities")?.id).toBe("activities");
  });

  test("passes valid navigation, email and external links", () => {
    const result = checkSiteLinks(pages, { pageId: "contact", emailLabel: "Email us", emailHref: "mailto:club@school.edu.jm", externalLabel: "School website", externalHref: "https://school.edu.jm" });
    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  test("reports duplicate paths and malformed links", () => {
    const broken = checkSiteLinks([...pages, { id: "news", title: "News", path: "/contact" }], { pageId: "home", emailLabel: "", emailHref: "club", externalLabel: "School", externalHref: "http://school.edu.jm" });
    expect(broken.valid).toBe(false);
    expect(broken.issues.map(issue => issue.type)).toEqual(expect.arrayContaining(["page", "email", "external"]));
  });
});