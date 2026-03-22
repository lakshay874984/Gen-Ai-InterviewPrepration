#!/usr/bin/env node

// Production start script - Runs both frontend and backend
const { exec } = require('child_process');
const path = require('path');

console.log('Starting full-stack application...');
console.log('Detecting environment...');

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  console.log('🚀 Production mode - Starting backend server');
  
  // Start backend on main process
  exec('cd Backend && npm start', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting backend: ${error}`);
      process.exit(1);
    }
    console.log(stdout);
  });
} else {
  console.log('Development mode detected. Use "npm run dev" instead.');
  process.exit(1);
}
