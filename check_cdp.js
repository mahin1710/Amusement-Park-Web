const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--remote-debugging-port=9222',
  '--headless=new',
  'http://localhost:3000/shop'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('TABS:', data);
      chrome.kill();
    });
  }).on('error', (e) => {
    console.error('HTTP Error:', e.message);
    chrome.kill();
  });
}, 2500);
