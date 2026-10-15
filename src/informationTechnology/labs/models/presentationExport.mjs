const escapeHtml = value => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export function buildPresentationHtml(slides, theme = "", footer = "") {
  const safeSlides = Array.isArray(slides) ? slides.slice(0, 100) : [];
  const sections = safeSlides.map((slide, index) => {
    const title = escapeHtml(slide.title);
    const content = slide.layout === "Blank" || slide.layout === "Title Only" ? "" : slide.bullets
      ? "<ul>" + String(slide.body ?? "").split(/\r?\n/).filter(Boolean).map(line => "<li>" + escapeHtml(line.replace(/^\s*[•*-]\s*/, "")) + "</li>").join("") + "</ul>"
      : "<p>" + escapeHtml(slide.body).replace(/\r?\n/g, "<br>") + "</p>";
    return '<section class="slide"><h1>' + title + '</h1>' + content + '<footer>' + escapeHtml(footer) + '</footer><small>Slide ' + (index + 1) + ' of ' + safeSlides.length + '</small></section>';
  }).join("\n");
  const themeName = ["Ocean", "Slate", "Light"].includes(theme) ? theme : "Light";
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SPARK Presentation</title><style>body{margin:0;font-family:Arial,sans-serif;background:#eef2f8;color:#14243c}.slide{box-sizing:border-box;min-height:70vh;margin:2rem auto;max-width:960px;padding:5rem;background:white;border-radius:16px;page-break-after:always}body.ocean .slide{background:#12345c;color:white}body.slate .slide{background:#25354b;color:white}h1{font-size:2.5rem}p,li{font-size:1.3rem;line-height:1.6}footer{margin-top:4rem}small{display:block;margin-top:1rem}@media print{.slide{margin:0;max-width:none;border-radius:0;min-height:100vh}}</style></head><body class="' + themeName.toLowerCase() + '">' + sections + '</body></html>';
}
