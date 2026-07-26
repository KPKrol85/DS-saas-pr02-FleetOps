const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const cssnano = require("cssnano");
const { minify } = require("terser");

const rootDir = __dirname;
const distDir = path.join(rootDir, "dist");

const cssSources = [
  "styles/src/00-settings.css",
  "styles/src/01-base.css",
  "styles/src/02-layout.css",
  "styles/src/03-components.css",
  "styles/src/04-data.css",
  "styles/src/05-landing.css",
  "styles/src/07-footer.css",
  "styles/src/08-header.css",
  "styles/src/06-app.css",
  "styles/src/06-app-components.css",
  "styles/src/09-pages.css",
];

const staticFiles = ["sw.js", "_headers", "_redirects", "robots.txt", "sitemap.xml"];
const htmlEntries = [
  "index.html",
  "404.html",
  "product/index.html",
  "features/index.html",
  "pricing/index.html",
  "about/index.html",
  "contact/index.html",
  "security/index.html",
  "careers/index.html",
  "privacy/index.html",
  "terms/index.html",
  "cookies/index.html",
];

const terserOptions = {
  compress: true,
  mangle: false,
  output: {
    comments: false,
  },
};

function ensureInsideRoot(targetPath) {
  const resolvedRoot = path.resolve(rootDir);
  const resolvedTarget = path.resolve(targetPath);

  if (resolvedTarget !== resolvedRoot && !resolvedTarget.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error(`Refusing to write outside project root: ${resolvedTarget}`);
  }
}

function cleanDist() {
  ensureInsideRoot(distDir);
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
}

function copyFile(sourceRelativePath, outputRelativePath = sourceRelativePath) {
  const sourcePath = path.join(rootDir, sourceRelativePath);
  const outputPath = path.join(distDir, outputRelativePath);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing required file: ${sourceRelativePath}`);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.copyFileSync(sourcePath, outputPath);
}

function copyDirectory(sourceRelativePath, outputRelativePath = sourceRelativePath, excludedRelativePaths = new Set()) {
  if (excludedRelativePaths.has(sourceRelativePath.replace(/\\/g, "/"))) {
    return;
  }

  const sourcePath = path.join(rootDir, sourceRelativePath);
  const outputPath = path.join(distDir, outputRelativePath);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing required directory: ${sourceRelativePath}`);
  }

  fs.mkdirSync(outputPath, { recursive: true });

  for (const entry of fs.readdirSync(sourcePath, { withFileTypes: true })) {
    const sourceChild = path.join(sourceRelativePath, entry.name);
    const outputChild = path.join(outputRelativePath, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourceChild, outputChild, excludedRelativePaths);
    } else if (entry.isFile()) {
      copyFile(sourceChild, outputChild);
    }
  }
}

function getActiveScriptSources(html) {
  const scripts = [];
  const scriptPattern = /<script\b[^>]*\bsrc=["'](?:\.\/|\/)?(scripts\/[^"']+\.js)["'][^>]*><\/script>/g;
  let match;

  while ((match = scriptPattern.exec(html)) !== null) {
    scripts.push(match[1]);
  }

  return scripts;
}

function replaceStylesheets(html) {
  const stylesheet = '<link rel="stylesheet" href="/styles/main.min.css" />';
  const sourceStylesheetPattern = /(\n[ \t]*)<link rel="stylesheet" href="\/styles\/main\.css" \/>\r?\n/;
  const legacyStylesheetPattern =
    /(\n[ \t]*)(?:<link rel="stylesheet" href="\/styles\/(?:base|components|landing|app)\.min\.css" \/>\r?\n[ \t]*)+/;

  let updated = html.replace(sourceStylesheetPattern, `$1${stylesheet}\n`);

  if (updated === html) {
    updated = html.replace(legacyStylesheetPattern, `$1${stylesheet}\n`);
  }

  if (updated === html || !updated.includes(stylesheet)) {
    throw new Error("Could not replace legacy stylesheet links");
  }

  return updated;
}

async function buildCss() {
  const source = cssSources
    .map((sourceRelativePath) => {
      const sourcePath = path.join(rootDir, sourceRelativePath);

      if (!fs.existsSync(sourcePath)) {
        throw new Error(`Missing CSS source: ${sourceRelativePath}`);
      }

      return fs.readFileSync(sourcePath, "utf8");
    })
    .join("\n\n");

  const result = await postcss([cssnano]).process(source, {
    from: undefined,
  });

  const outputPath = path.join(distDir, "styles", "main.min.css");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, result.css);
}

async function buildScripts(scriptSources) {
  for (const scriptSource of scriptSources) {
    const sourceRelativePath = scriptSource.replace(/^\.\//, "");
    const sourcePath = path.join(rootDir, sourceRelativePath);
    const outputPath = path.join(distDir, sourceRelativePath);

    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Missing script source: ${scriptSource}`);
    }

    const code = fs.readFileSync(sourcePath, "utf8");
    const result = await minify(code, terserOptions);

    if (!result.code) {
      throw new Error(`Terser produced no output for: ${scriptSource}`);
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, result.code);
  }
}

function buildHtml() {
  const scriptSources = new Set();

  for (const entry of htmlEntries) {
    const sourcePath = path.join(rootDir, entry);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Missing HTML entry: ${entry}`);
    }

    const html = fs.readFileSync(sourcePath, "utf8");
    getActiveScriptSources(html).forEach((scriptSource) => scriptSources.add(scriptSource));
    const outputPath = path.join(distDir, entry);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, replaceStylesheets(html));
  }

  if (scriptSources.size === 0) {
    throw new Error("No active scripts found in HTML entries");
  }

  return Array.from(scriptSources);
}

async function build() {
  cleanDist();

  copyDirectory("assets", "assets", new Set(["assets/img-src"]));

  for (const file of staticFiles) {
    copyFile(file);
  }

  await buildCss();
  const scriptSources = buildHtml();
  await buildScripts(scriptSources);

  console.log(`[build] Generated ${path.relative(rootDir, distDir)}`);
}

build().catch((error) => {
  console.error(`[build] ${error.message}`);
  process.exit(1);
});
