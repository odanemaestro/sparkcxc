export function normalizePagePath(value) {
  const cleaned = String(value ?? "").trim().toLowerCase()
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/[^a-z0-9/_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^\/+|\/+$/g, "");
  return cleaned ? `/${cleaned}` : "/";
}

export function pageForPath(pages, path) {
  const target = normalizePagePath(path);
  return pages.find(page => normalizePagePath(page.path) === target) ?? null;
}

export function checkSiteLinks(pages, links) {
  const issues = [];
  const paths = pages.map(page => normalizePagePath(page.path));
  const duplicates = paths.filter((path, index) => paths.indexOf(path) !== index);

  pages.forEach(page => {
    const path = normalizePagePath(page.path);
    if (!String(page.title ?? "").trim()) issues.push({ pageId: page.id, href: path, type: "page", message: "Page title is empty." });
    if (duplicates.includes(path)) issues.push({ pageId: page.id, href: path, type: "page", message: `Duplicate page path: ${path}` });
  });

  pages.forEach(source => pages.forEach(destination => {
    const href = normalizePagePath(destination.path);
    if (!pageForPath(pages, href)) issues.push({ pageId: source.id, href, type: "internal", message: `Internal destination not found: ${href}` });
  }));

  const emailLabel = String(links.emailLabel ?? "").trim();
  const emailHref = String(links.emailHref ?? "").trim();
  if (!emailLabel) issues.push({ pageId: links.pageId, href: emailHref || "mailto:", type: "email", message: "Email link text is empty." });
  if (!/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(emailHref)) issues.push({ pageId: links.pageId, href: emailHref || "mailto:", type: "email", message: "Enter a valid mailto: email address." });

  const externalLabel = String(links.externalLabel ?? "").trim();
  const externalHref = String(links.externalHref ?? "").trim();
  if (!externalLabel) issues.push({ pageId: links.pageId, href: externalHref || "https://", type: "external", message: "External link text is empty." });
  try {
    const url = new URL(externalHref);
    if (url.protocol !== "https:") throw new Error("protocol");
  } catch {
    issues.push({ pageId: links.pageId, href: externalHref || "https://", type: "external", message: "Enter a complete https:// web address." });
  }
  return { valid: issues.length === 0, checked: pages.length * pages.length + 2, issues };
}