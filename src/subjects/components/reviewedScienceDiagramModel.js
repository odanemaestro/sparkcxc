const attributes = ["aria-label", "class", "d", "points", "transform", "x", "y", "x1", "x2", "y1", "y2", "cx", "cy", "r", "rx", "ry", "width", "height", "fill", "stroke", "opacity"];

// Match the rendered control state, not just a title shared by several variants.
export function scienceDiagramSignature(svg) {
  if (!svg) return "";
  const parts = [svg, ...svg.querySelectorAll("*")].map(node => {
    const values = attributes.map(name => {
      const value = node.getAttribute(name);
      return value ? `${name}=${value.replace(/\s+/g, " ").trim()}` : "";
    }).filter(Boolean);
    if (node.localName === "text" || node.localName === "tspan") {
      values.push(`text=${node.textContent.replace(/\s+/g, " ").trim()}`);
    }
    return [node.localName, ...values].join("|");
  }).join("\n");
  let hash = 2166136261;
  for (let index = 0; index < parts.length; index += 1) {
    hash = Math.imul(hash ^ parts.charCodeAt(index), 16777619);
  }
  return (hash >>> 0).toString(16);
}
