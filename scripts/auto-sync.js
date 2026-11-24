const { spawnSync } = require('child_process');

console.log('Auto-push daemon active. Interval: 10 minutes.');

function sync() {
  try {
    const status = spawnSync('git', ['status', '-s'], { encoding: 'utf8' });
    if (status.stdout && status.stdout.trim()) {
      console.log(`[${new Date().toISOString()}] Changes detected. Committing...`);
      spawnSync('git', ['add', '.']);
      spawnSync('git', ['commit', '-m', 'Auto-sync updates (10min interval)']);
      spawnSync('git', ['push', 'origin', 'main']);
    } else {
      const ahead = spawnSync('git', ['log', 'origin/main..HEAD', '--oneline'], { encoding: 'utf8' });
      if (ahead.stdout && ahead.stdout.trim()) {
        console.log(`[${new Date().toISOString()}] Unpushed commits detected. Pushing...`);
        spawnSync('git', ['push', 'origin', 'main']);
      }
    }
  } catch (err) {
    console.error('Sync error:', err.message);
  }
}

setInterval(sync, 600000);
