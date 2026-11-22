const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--window-size=1280,800',
  'http://localhost:3000/shop'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  
  const tabs = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
  
  const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost:3000/shop'));
  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();
  
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      console.log('BROWSER LOG:', msg.params.args.map(a => a.value || a.description).join(' '));
    }
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
    
    await new Promise(r => setTimeout(r, 1000));
    
    // Inject test listener
    await evalScript(`
      console.log('PATHNAME:', window.location.pathname);
      console.log('HEADER FOUND:', !!document.querySelector('[data-purpose="shop-page-header"]'));
      window.addEventListener('scroll', () => {
        console.log('WINDOW SCROLL EVENT FIRED! scrollY:', window.scrollY);
      });
      window.scrollTo(0, 120);
    `);
    
    await new Promise(r => setTimeout(r, 500));
    
    ws.close();
    chrome.kill();
  };
}

run().catch(e => {
  console.error(e);
  chrome.kill();
});
