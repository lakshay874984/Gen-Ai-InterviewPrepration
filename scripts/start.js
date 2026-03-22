#!/usr/bin/env node
// Root start script - starts backend from root directory
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Interview Backend from root...\n');

const backend = spawn('npm', ['start'], {
  cwd: path.join(__dirname, '../Backend'),
  stdio: 'inherit',
  shell: true
});

backend.on('error', (error) => {
  console.error('❌ Backend error:', error);
  process.exit(1);
});

backend.on('exit', (code) => {
  console.log(`Backend exited with code ${code}`);
  process.exit(code);
});

// Handle termination
process.on('SIGTERM', () => {
  console.log('\nShutting down...');
  backend.kill();
  process.exit(0);
});
