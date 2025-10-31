/**
 * Build script for static e-commerce site
 * Creates a production-ready dist folder
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const ROOT_DIR = path.join(__dirname, '..');

// Files and folders to copy
const COPY_PATTERNS = [
  'index.html',
  'product.html',
  'cart.html',
  'about.html',
  'contact.html',
  'pages',
  'styles',
  'scripts',
  'assets',
  'package.json',
  'README.md'
];

// Files/folders to exclude
const EXCLUDE = [
  'node_modules',
  'dist',
  '.git',
  'docs',
  'scripts/build.js'
];

/**
 * Recursively copy directory
 */
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Skip excluded items (normalize paths for cross-platform)
    const normalizedSrcPath = srcPath.replace(/\\/g, '/');
    if (EXCLUDE.some(ex => normalizedSrcPath.includes(ex.replace(/\\/g, '/')))) {
      continue;
    }

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Copy file or directory
 */
function copyItem(item) {
  const src = path.join(ROOT_DIR, item);
  const dest = path.join(DIST_DIR, item);

  if (!fs.existsSync(src)) {
    console.warn(`⚠️  ${item} not found, skipping...`);
    return;
  }

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
    console.log(`✓ Copied directory: ${item}`);
  } else {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied file: ${item}`);
  }
}

/**
 * Clean dist directory
 */
function clean() {
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
    console.log('🗑️  Cleaned dist directory');
  }
}

/**
 * Main build function
 */
function build() {
  const isClean = process.argv[2] === 'clean';
  
  if (isClean) {
    clean();
    return;
  }

  console.log('🚀 Starting build...\n');

  // Clean dist first
  clean();

  // Create dist directory
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  // Copy all files and directories
  COPY_PATTERNS.forEach(item => {
    copyItem(item);
  });

  // Create .gitignore for dist
  const gitignoreContent = `node_modules/\n.git/\n`;
  fs.writeFileSync(path.join(DIST_DIR, '.gitignore'), gitignoreContent);

  console.log('\n✨ Build complete! Output in ./dist');
  console.log('📦 You can deploy the dist folder to any static hosting service.\n');
}

// Run build
build();

