const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--window-size=1280,800',
  'http://localhost:3000/shop'
]);

async function check() {
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
    
    await new Promise(r => setTimeout(r, 1200));
    
    const testResult = await evalScript(`
      new Promise(resolve => {
        document.documentElement.scrollTop = 150;
        window.dispatchEvent(new Event('scroll'));
        setTimeout(() => {
          const hdr = document.querySelector('[data-purpose="shop-page-header"]');
          const logo = hdr?.querySelector('.origin-top-left');
          resolve({
            scrollY: window.scrollY,
            docScrollTop: document.documentElement.scrollTop,
            hdrTransform: hdr?.style.transform,
            hdrOpacity: hdr?.style.opacity,
            hdrVisibility: hdr?.style.visibility,
            logoTransform: logo?.style.transform
          });
        }, 100);
      })
    `);
    console.log('TEST WITH SCROLL DISPATCH:', testResult);

    ws.close();
    chrome.kill();
  };
}

check().catch(e => {
  console.error(e);
  chrome.kill();
});
