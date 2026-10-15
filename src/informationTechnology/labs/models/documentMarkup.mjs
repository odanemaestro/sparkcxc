const TAGS = new Set(["P","DIV","BR","B","STRONG","I","EM","U","SPAN","FONT","UL","OL","LI"]);
const STYLES = new Set(["text-align","font-weight","font-style","text-decoration","font-size","font-family"]);
const escape = value => String(value ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

export function sanitizeDocumentMarkup(markup, dom = globalThis.document) {
  if (!dom?.createElement) return escape(markup);
  const template = dom.createElement("template");
  template.innerHTML = String(markup ?? "").slice(0, 200000);
  function serialize(node) {
    if (node.nodeType === 3) return escape(node.nodeValue);
    if (node.nodeType !== 1) return "";
    if (!TAGS.has(node.tagName)) return Array.from(node.childNodes).map(serialize).join("");
    const tag = node.tagName.toLowerCase();
    if (tag === "br") return "<br>";
    let style = "";
    for (const prop of STYLES) {
      const value = node.style?.getPropertyValue(prop)?.trim() || "";
      if (!value || !/^[\w\s.,#%()"'\-]{1,80}$/.test(value) || /url\s*\(/i.test(value)) continue;
      style += `${prop}:${value};`;
    }
    const attributes = style ? ` style="${escape(style)}"` : "";
    return `<${tag}${attributes}>${Array.from(node.childNodes).map(serialize).join("")}</${tag}>`;
  }
  return Array.from(template.content.childNodes).map(serialize).join("");
}
