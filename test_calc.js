const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html>
<head>
<style>
.header { --logo-large: 96px; --logo-compact: 48px; --shop-shrink: 0; }
.logo {
  height: calc(var(--logo-large) - (var(--logo-large) - var(--logo-compact)) * var(--shop-shrink, 0));
  width: 100px;
  background: red;
}
</style>
</head>
<body>
<div class="header" id="hdr">
  <div class="logo" id="test">Test</div>
</div>
<script>
window.addEventListener('load', () => {
  const h0 = window.getComputedStyle(document.getElementById('test')).height;
  document.getElementById('hdr').style.setProperty('--shop-shrink', '1');
  const h1 = window.getComputedStyle(document.getElementById('test')).height;
  document.body.setAttribute('data-h0', h0);
  document.body.setAttribute('data-h1', h1);
});
</script>
</body>
</html>`;

fs.writeFileSync('test_calc.html', html);
const fullPath = path.resolve('test_calc.html');
const fileUrl = 'file:///' + fullPath.replace(/\\/g, '/');

try {
  const out = execSync(`"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --dump-dom "${fileUrl}"`, { encoding: 'utf-8' });
  console.log("OUT:", out);
} catch (e) {
  console.error("ERR:", e.message);
}
