import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const templatePath = join(root, "styles", "fonts.css.template");
const fontsCssPath = join(root, "styles", "fonts.css");
const placeholder = "__FONT_VERSION__";

function resolveVersion() {
  if (process.env.NEXT_PUBLIC_FONT_ASSET_VERSION) {
    return process.env.NEXT_PUBLIC_FONT_ASSET_VERSION;
  }
  try {
    return execSync("git rev-parse --short HEAD", {
      cwd: root,
      encoding: "utf8",
    }).trim();
  } catch {
    return "dev";
  }
}

const version = resolveVersion();
const source = readFileSync(templatePath, "utf8");

if (!source.includes(placeholder)) {
  console.error(
    `[font-asset-version] Missing ${placeholder} in styles/fonts.css.template`,
  );
  process.exit(1);
}

const output = source.replaceAll(placeholder, version);
writeFileSync(fontsCssPath, output, "utf8");
console.log(`[font-asset-version] Wrote styles/fonts.css with version: ${version}`);
