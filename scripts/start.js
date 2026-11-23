#!/usr/bin/env node

/**
 * Magic Island — Universal Local Development Launcher
 * 
 * This script ensures seamless, zero-friction startup on any local machine:
 * 1. Verifies that required environment files (.env.local) exist, automatically copying from .env.example if missing.
 * 2. Checks if frontend node_modules are installed; if missing, installs them automatically before launching.
 * 3. Checks if backend environment is set up.
 * 4. Starts the Next.js development server with clear terminal instructions.
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
console.log('       🎢  MAGIC ISLAND — LOCAL DEVELOPMENT STARTER  🎢');
console.log('================================================================\n');

// 1. Ensure frontend .env.local exists
const frontendEnvLocal = path.join(frontendDir, '.env.local');
const frontendEnvExample = path.join(frontendDir, '.env.example');

if (!fs.existsSync(frontendEnvLocal)) {
  if (fs.existsSync(frontendEnvExample)) {
    try {
      fs.copyFileSync(frontendEnvExample, frontendEnvLocal);
      console.log('✔ [Config] Created frontend/.env.local from .env.example');
    } catch (e) {
      console.warn('! [Config] Could not copy frontend/.env.example:', e.message);
    }
  }
} else {
  console.log('✔ [Config] frontend/.env.local is ready.');
}

// 2. Ensure backend .env exists
const backendEnv = path.join(backendDir, '.env');
const backendEnvExample = path.join(backendDir, '.env.example');

if (!fs.existsSync(backendEnv)) {
  if (fs.existsSync(backendEnvExample)) {
    try {
      fs.copyFileSync(backendEnvExample, backendEnv);
      console.log('✔ [Config] Created backend/.env from .env.example');
    } catch (e) {
      // Non-critical
    }
  }
}

// 3. Ensure frontend dependencies are installed
const frontendNodeModules = path.join(frontendDir, 'node_modules');
const nextBin = path.join(frontendNodeModules, 'next');

if (!fs.existsSync(frontendNodeModules) || !fs.existsSync(nextBin)) {
  console.log('\n📦 [Dependencies] Frontend packages not detected.');
  console.log('⏳ Installing frontend dependencies (this only happens on the first run)...');
  console.log('----------------------------------------------------------------');

  const installResult = runCmd('npm', ['install'], { cwd: frontendDir });

  if (installResult.status !== 0) {
    console.error('\n❌ [Error] Failed to install frontend dependencies.');
    console.error('Please run "cd frontend && npm install" manually to inspect errors.\n');
    process.exit(1);
  }

  console.log('----------------------------------------------------------------');
  console.log('✔ [Dependencies] Frontend dependencies installed successfully!\n');
} else {
  console.log('✔ [Dependencies] Frontend dependencies are installed.');
}

// 4. Check if user passed --open flag to launch browser automatically
const shouldOpenBrowser = process.argv.includes('--open');

if (shouldOpenBrowser) {
  setTimeout(() => {
    const url = 'http://localhost:3000';
    try {
      if (isWindows) {
        spawn('cmd.exe', ['/c', 'start', url]);
      } else if (process.platform === 'darwin') {
        spawn('open', [url]);
      } else {
        spawn('xdg-open', [url]);
      }
    } catch (_) {}
  }, 3500);
}

// 5. Start Next.js Development Server
console.log('\n🚀 Starting Magic Island Frontend Server...');
console.log('👉 Open your browser at: http://localhost:3000');
console.log('----------------------------------------------------------------\n');

const devProcess = spawnLive('npm', ['run', 'dev'], { cwd: frontendDir });

devProcess.on('error', (err) => {
  console.error('❌ Failed to start dev server:', err);
});

// Handle termination gracefully
process.on('SIGINT', () => {
  devProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  devProcess.kill('SIGTERM');
  process.exit(0);
});
