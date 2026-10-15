const esc = value => String(value ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const safeHref = (href, type) => {
  const text = String(href || "").trim();
  if (type === "email") return /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(text) ? text : "#";
  return /^https:\/\/[^\s/]+(?:\/[^\s]*)?$/i.test(text) ? text : "#";
};
export function exportSitePage(page, pages, links, showImage = false) {
  const navigation = pages.map(item => `<a href="#${esc(item.id)}">${esc(item.title)}</a>`).join(" ");
  const sections = pages.map(item => `<section id="${esc(item.id)}"><h1>${esc(item.heading)}</h1><p>${esc(item.body)}</p></section>`).join("\n");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(page.title)}</title><style>body{font-family:system-ui,sans-serif;margin:0;color:#132b4c;background:#f8fafc;line-height:1.6}header{background:#12355b;color:white;padding:1.5rem}nav{display:flex;flex-wrap:wrap;gap:1rem}nav a{color:inherit}main{max-width:960px;margin:auto;padding:2rem}section{background:white;border-radius:1rem;padding:2rem;margin-bottom:1rem}a:focus-visible{outline:3px solid #e8a044}</style></head><body><header><strong>Technology Club</strong><nav aria-label="Site navigation">${navigation}</nav></header><main>${sections}${showImage ? '<p role="img" aria-label="Technology illustration">Technology · Create · Code · Connect</p>' : ""}<footer><a href="${esc(safeHref(links.emailHref,"email"))}">${esc(links.emailLabel)}</a> · <a href="${esc(safeHref(links.externalHref,"external"))}">${esc(links.externalLabel)}</a></footer></main></body></html>`;
}
