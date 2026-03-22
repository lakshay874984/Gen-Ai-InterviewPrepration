#!/usr/bin/env node
// Render build script - handles Node.js compatibility issues
// This runs during npm ci in render.yaml

const fs = require('fs');
const path = require('path');

console.log('🔧 Render build compatibility check...\n');

// Skip pdf-parse native modules if having issues
process.env.PDF_PARSE_SKIP_NATIVE = 'true';

// Handle potential puppeteer issues on Render
process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = 'true';

console.log('✅ Environment variables set for Render:');
console.log('  - PDF_PARSE_SKIP_NATIVE=true');
console.log('  - PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true\n');

console.log('💡 Note: If pdf-parse or puppeteer features fail:');
console.log('  1. Upgrade to Render Standard plan ($7/month) for more RAM');
console.log('  2. Replace puppeteer with playwright or cheerio');
console.log('  3. Use a headless browser service instead\n');

process.exit(0);
