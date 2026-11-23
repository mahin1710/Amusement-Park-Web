#!/usr/bin/env node

/**
 * Magic Island — Complete Project Setup Script
 * Sets up environment files and installs dependencies for both frontend and backend.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const frontendDir = path.join(rootDir, 'frontend');
const backendDir = path.join(rootDir, 'backend');
const isWindows = process.platform === 'win32';

function runCmd(cmd, args, cwd) {
  if (isWindows) {
    return spawnSync('cmd.exe', ['/c', cmd, ...args], { stdio: 'inherit', cwd });
  } else {
    return spawnSync(cmd, args, { stdio: 'inherit', cwd });
  }
}

console.log('\n================================================================');
console.log('       🛠️  MAGIC ISLAND — COMPLETE PROJECT SETUP  🛠️');
console.log('================================================================\n');

// 1. Frontend setup
console.log('[1/4] Setting up Frontend Environment...');
const frontendEnv = path.join(frontendDir, '.env.local');
const frontendEnvExample = path.join(frontendDir, '.env.example');
if (!fs.existsSync(frontendEnv) && fs.existsSync(frontendEnvExample)) {
  fs.copyFileSync(frontendEnvExample, frontendEnv);
  console.log('✔ Created frontend/.env.local');
} else {
  console.log('✔ frontend/.env.local already exists');
}

console.log('\n[2/4] Installing Frontend Dependencies (npm install)...');
runCmd('npm', ['install'], frontendDir);

// 2. Backend setup
console.log('\n[3/4] Setting up Backend Environment...');
const backendEnv = path.join(backendDir, '.env');
const backendEnvExample = path.join(backendDir, '.env.example');
if (!fs.existsSync(backendEnv) && fs.existsSync(backendEnvExample)) {
  fs.copyFileSync(backendEnvExample, backendEnv);
  console.log('✔ Created backend/.env');
} else {
  console.log('✔ backend/.env already exists');
}

const sqliteFile = path.join(backendDir, 'database', 'database.sqlite');
if (!fs.existsSync(sqliteFile)) {
  try {
    fs.mkdirSync(path.join(backendDir, 'database'), { recursive: true });
    fs.writeFileSync(sqliteFile, '');
    console.log('✔ Created backend/database/database.sqlite');
  } catch (_) {}
}

console.log('\n[4/4] Checking Backend Environment...');
if (fs.existsSync(backendEnv)) {
  console.log('✔ Backend configuration ready.');
}
console.log('ℹ Note: The website frontend runs standalone with full attraction & pricing features.');
console.log('  If you also want the Laravel API active, run "npm run dev:all" (requires PHP).');

console.log('\n================================================================');
console.log('  ✨ Setup Complete! You can now start the website with:');
console.log('     npm run dev');
console.log('     or double-click run.bat (on Windows)');
console.log('================================================================\n');
