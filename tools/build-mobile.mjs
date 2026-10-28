// Build SPARK's existing Vite app for a local Capacitor WebView.
// GitHub Pages uses /sparkcxc/; native bundles require relative asset URLs.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const command = process.platform === "win32" ? "npm.cmd" : "npm";
const result = spawnSync(command, ["run", "build"], {
  cwd: root,
  env: { ...process.env, PUBLIC_URL: "./" },
  stdio: "inherit",
  shell: process.platform === "win32",
});
if (result.error) {
  console.error("SPARK mobile web build failed:", result.error.message);
  process.exit(1);
}
process.exit(result.status ?? 1);
