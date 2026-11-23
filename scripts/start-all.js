#!/usr/bin/env node

/**
 * Magic Island — Full Stack Local Development Launcher (Frontend + Backend)
 * 
 * Starts both Laravel Backend (port 8000) and Next.js Frontend (port 3000).
 * If PHP is not installed, gracefully falls back to standalone frontend mode.
 */

const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const frontendDir = path.join(rootDir, 'frontend');
const backendDir = path.join(rootDir, 'backend');

const isWindows = process.platform === 'win32';

function runCmd(cmd, args, options = {}) {
  if (isWindows) {
    return spawnSync('cmd.exe', ['/c', cmd, ...args], {
      stdio: options.stdio || 'inherit',
      cwd: options.cwd || rootDir,
      ...options,
    });
  } else {
    return spawnSync(cmd, args, {
      stdio: options.stdio || 'inherit',
      cwd: options.cwd || rootDir,
      ...options,
    });
  }
}

function spawnLive(cmd, args, options = {}) {
  if (isWindows) {
    return spawn('cmd.exe', ['/c', cmd, ...args], {
      stdio: 'inherit',
      cwd: options.cwd || rootDir,
      ...options,
    });
  } else {
    return spawn(cmd, args, {
      stdio: 'inherit',
      cwd: options.cwd || rootDir,
      ...options,
    });
  }
}

console.log('\n================================================================');
console.log('    🎢  MAGIC ISLAND — FULL STACK DEVELOPMENT SERVER  🎢');
console.log('================================================================\n');

// 1. Prepare Frontend Environment & Dependencies
const frontendEnvLocal = path.join(frontendDir, '.env.local');
const frontendEnvExample = path.join(frontendDir, '.env.example');
if (!fs.existsSync(frontendEnvLocal) && fs.existsSync(frontendEnvExample)) {
  fs.copyFileSync(frontendEnvExample, frontendEnvLocal);
}

const frontendNodeModules = path.join(frontendDir, 'node_modules');
if (!fs.existsSync(frontendNodeModules)) {
  console.log('⏳ Installing frontend dependencies...');
  runCmd('npm', ['install'], { cwd: frontendDir });
}

// 2. Prepare Backend Environment
const backendEnv = path.join(backendDir, '.env');
const backendEnvExample = path.join(backendDir, '.env.example');
if (!fs.existsSync(backendEnv) && fs.existsSync(backendEnvExample)) {
  fs.copyFileSync(backendEnvExample, backendEnv);
}

// 3. Check PHP availability
let hasPhp = false;
try {
  const phpCheck = isWindows
    ? spawnSync('cmd.exe', ['/c', 'php', '-v'], { encoding: 'utf8' })
    : spawnSync('php', ['-v'], { encoding: 'utf8' });
  if (phpCheck.status === 0) {
    hasPhp = true;
  }
} catch (_) {}

let backendProcess = null;

if (hasPhp) {
  console.log('✔ [Backend] PHP detected.');

  // Ensure sqlite database exists
  const dbDir = path.join(backendDir, 'database');
  const sqliteFile = path.join(dbDir, 'database.sqlite');
  if (!fs.existsSync(sqliteFile)) {
    try {
      if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
      fs.writeFileSync(sqliteFile, '');
      console.log('✔ [Backend] Created SQLite database file.');
    } catch (_) {}
  }

  // Check vendor
  const vendorDir = path.join(backendDir, 'vendor');
  if (!fs.existsSync(vendorDir)) {
    console.log('ℹ [Backend] Composer dependencies not installed. Attempting composer install...');
    try {
      runCmd('composer', ['install', '--no-interaction'], { cwd: backendDir });
    } catch (_) {
      console.warn('! [Backend] Composer not found or failed. Backend server will try running.');
    }
  }

  console.log('🚀 Starting Laravel API at http://localhost:8000 ...');
  backendProcess = spawnLive('php', ['artisan', 'serve', '--port=8000'], { cwd: backendDir });
} else {
  console.log('ℹ [Backend] PHP not detected in system PATH.');
  console.log('   The frontend will run standalone with all pages, rides & calculator fully functional!\n');
}

// 4. Start Frontend
console.log('🚀 Starting Next.js Frontend at http://localhost:3000 ...\n');
const frontendProcess = spawnLive('npm', ['run', 'dev'], { cwd: frontendDir });

// Handle termination
function cleanup() {
  if (backendProcess) {
    try { backendProcess.kill(); } catch (_) {}
  }
  if (frontendProcess) {
    try { frontendProcess.kill(); } catch (_) {}
  }
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
