import { mkdirSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

type AccessibilityReport = {
  categories: { accessibility: { score: number | null } };
};

const baseUrl = process.env.AUDIT_URL || "http://localhost:3000";
mkdirSync("accessibility-reports", { recursive: true });
let failed = false;
for (const [name, path] of [["home", "/"], ["liked", "/user/quotes/liked"]]) {
  const output = `accessibility-reports/${name}`;
  const result = spawnSync("npm", ["exec", "--yes", "--package=node@22", "--package=lighthouse@13.5.0", "--", "lighthouse", `${baseUrl}${path}`,
    "--only-categories=accessibility", "--chrome-flags=--headless",
    "--output=html", "--output=json", `--output-path=${output}`], { stdio: "inherit" });
  if (result.error || result.status !== 0) { failed = true; continue; }
  const report = JSON.parse(readFileSync(`${output}.report.json`, "utf8")) as AccessibilityReport;
  const score = report.categories.accessibility.score;
  console.log(`${name}: accessibility ${score === null ? "unavailable" : score * 100}/100`);
  if (score !== 1) failed = true;
}
process.exitCode = failed ? 1 : 0;
