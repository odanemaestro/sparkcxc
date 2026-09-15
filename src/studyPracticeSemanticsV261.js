// SPARK Study + Practice semantic button coordinator V2.6.1
// Applies semantic UI roles at runtime without rewriting JSX source.

export function normalizeSparkActionText(value) {
  return String(value || "")
    .replace(/[←→↗›»]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function classifySparkStudyPracticeAction(value, className = "", contextText = "") {
  const text = normalizeSparkActionText(value);
  const classes = String(className || "");
  const context = normalizeSparkActionText(contextText);

  if (!text) return null;
  // Dashboard subject-card CTAs have their own established text + circular-arrow design.
  // Keep them outside the Study/Practice recolouring system.
  if (/\bspark-dashboard-card-action\b/i.test(classes)) return null;

  // Deliberate examination controls.
  if (/^submit paper\b/i.test(text)) return "exam";
  if (/^next question$/i.test(text)) return "exam";
  if (/^next$/i.test(text) && /(paper|practice|exam|phy-|pm-|pcl-)/i.test(classes)) return "exam";

  // Navigation and support.
  if (/^back to\b/i.test(text)) return "nav";
  if (/^back$/i.test(text) && (
    /(choose a subject|practice|physics|mathematics)/i.test(context) ||
    /(practice|paper|physics|subject|phy-|pm-|pcl-)/i.test(classes)
  )) return "nav";
  if (/^previous$/i.test(text)) return "nav";
  if (/^physical constants$/i.test(text)) return "nav";
  if (/^(view )?formula sheet$/i.test(text)) return "nav";
  if (/^change subject$/i.test(text)) return "nav";
  if (/^exit$/i.test(text)) return "nav";
  if (/^return to paper$/i.test(text)) return "nav";
  if (/^paper [12] library$/i.test(text)) return "nav";
  if (/^physics practice$/i.test(text)) return "nav";
  if (/^section [a-e] practice$/i.test(text)) return "nav";

  // Forward learning.
  if (/\bopen mathematics\b/i.test(text)) return "forward";
  if (/\bopen physics\b/i.test(text)) return "forward";
  if (/\bopen adaptive practice\b/i.test(text)) return "forward";
  if (/\bopen formula list\b/i.test(text)) return "forward";
  if (/\bopen full section [a-e]\b.*\bstudy tools\b/i.test(text)) return "forward";
  if (/^start examination$/i.test(text)) return "forward";
  if (/^start new paper\b/i.test(text)) return "forward";
  if (/^start another\b/i.test(text)) return "forward";
  if (/^resume\b/i.test(text)) return "forward";
  if (/^continue\b/i.test(text)) return "forward";
  if (/^view instructions$/i.test(text)) return "forward";

  // PracticeHub uses "Open ..." for forward learning cards.
  if (/^open\b/i.test(text) && /practice/i.test(classes)) return "forward";

  return null;
}

function contextForElement(element) {
  const container = element.closest?.(
    "main, section, article, [class*='practice'], [class*='physics'], [class*='subject']"
  );
  return container?.textContent || "";
}

export function applySparkStudyPracticeSemantics(root = document) {
  if (!root?.querySelectorAll) return 0;

  let applied = 0;
  const elements = root.querySelectorAll("button, a, [role='button']");

  elements.forEach(element => {
    const action = classifySparkStudyPracticeAction(
      element.textContent,
      element.className,
      contextForElement(element)
    );

    if (action) {
      if (element.dataset.sparkAction !== action) {
        element.dataset.sparkAction = action;
      }
      applied += 1;
    } else if (element.dataset.sparkActionSource === "v261") {
      delete element.dataset.sparkAction;
      delete element.dataset.sparkActionSource;
    }

    if (action) element.dataset.sparkActionSource = "v261";
  });

  return applied;
}

export function installSparkStudyPracticeSemantics() {
  if (typeof document === "undefined") return () => {};

  const apply = () => applySparkStudyPracticeSemantics(document);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  } else {
    apply();
  }

  if (typeof MutationObserver === "undefined") return () => {};

  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    const schedule = typeof window !== "undefined" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : callback => setTimeout(callback, 0);
    schedule(() => {
      queued = false;
      apply();
    });
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
  });

  return () => observer.disconnect();
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  installSparkStudyPracticeSemantics();
}
