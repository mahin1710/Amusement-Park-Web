const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--window-size=1280,800',
  'http://localhost:3000'
]);

async function checkHome() {
  await new Promise(r => setTimeout(r, 2000));
  
  const tabs = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
  
  const pageTab = tabs.find(t => t.type === 'page' && t.url === 'http://localhost:3000/');
  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();
  
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg);
      callbacks.delete(msg.id);
    }
  };
  
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }
  
  ws.onopen = async () => {
    await send('Runtime.enable');
    const evalScript = async (expression) => {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      return res.result?.result?.value;
    };
    
    await new Promise(r => setTimeout(r, 1500));
    
    const calcStatus = await evalScript(`
      (() => {
        const sec = document.getElementById('ride-calculator');
        if (!sec) return { found: false };
        const cards = sec.querySelectorAll('.ride-experience-card');
        return {
          found: true,
          cardsCount: cards.length,
          sectionText: sec.querySelector('h2')?.innerText
        };
      })()
    `);
    console.log('HOME CALCULATOR STATUS:', calcStatus);

    ws.close();
    chrome.kill();
  };
}

checkHome().catch(e => {
  console.error(e);
  chrome.kill();
});
