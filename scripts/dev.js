#!/usr/bin/env node

// Development script - Runs both frontend and backend concurrently
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting development servers...\n');

// Start backend
console.log('📦 Starting Backend (port 3000)...');
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, '../Backend'),
  stdio: 'inherit',
  shell: true
});

// Start frontend
console.log('⚛️  Starting Frontend (port 5173)...\n');
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, '../Frontend'),
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\nShutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit(0);
});

// Handle errors
backend.on('error', (error) => {
  console.error('Backend error:', error);
});

frontend.on('error', (error) => {
  console.error('Frontend error:', error);
});
