import { createOfficePackage } from "./officePackage.mjs";
import { validateWebFiles, buildSandboxPreview } from "./webSourceWorkspace.mjs";

export function buildSourceProjectArchive(files) {
  const errors = validateWebFiles(files);
  if (errors.length) return { data: null, errors };
  // Do not package unsafe active content as a completed SPARK project.
  for (const name of Object.keys(files)) {
    if (name.endsWith(".html")) {
      const checked = buildSandboxPreview({ "index.html": files[name], "styles.css": files["styles.css"] });
      if (checked.errors.length) return { data: null, errors: checked.errors.map(error => name + ": " + error) };
    }
  }
  return { data: createOfficePackage(files), errors: [] };
}
