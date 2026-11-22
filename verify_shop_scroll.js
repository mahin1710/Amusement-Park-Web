const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--window-size=1280,800',
  'http://localhost:3000/shop'
]);

async function verify() {
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
    
    await new Promise(r => setTimeout(r, 1000));
    
    const getState = async (label) => {
      return await evalScript(`
        (() => {
          const hdr = document.querySelector('[data-purpose="shop-page-header"]');
          const logo = hdr?.querySelector('.origin-top-left');
          return {
            label: "${label}",
            scrollY: window.scrollY,
            headerTransform: hdr?.style.transform,
            headerOpacity: hdr?.style.opacity,
            headerVisibility: hdr?.style.visibility,
            logoTransform: logo?.style.transform
          };
        })()
      `);
    };
    
    const results = [];
    
    results.push(await getState('Top of Page (0px)'));
    
    await evalScript('window.scrollTo(0, 60)');
    await new Promise(r => setTimeout(r, 200));
    results.push(await getState('Initial Scroll (60px) - Shrinking'));
    
    await evalScript('window.scrollTo(0, 120)');
    await new Promise(r => setTimeout(r, 200));
    results.push(await getState('Fully Shrunk (120px) - Compact'));
    
    await evalScript('window.scrollTo(0, 190)');
    await new Promise(r => setTimeout(r, 200));
    results.push(await getState('Further Scroll (190px) - Moving Upward'));
    
    await evalScript('window.scrollTo(0, 300)');
    await new Promise(r => setTimeout(r, 200));
    results.push(await getState('Deep Scroll (300px) - Disappeared'));
    
    await evalScript('window.scrollTo(0, 60)');
    await new Promise(r => setTimeout(r, 200));
    results.push(await getState('Scroll Back Up (60px) - Reappearing & Growing'));
    
    await evalScript('window.scrollTo(0, 0)');
    await new Promise(r => setTimeout(r, 200));
    results.push(await getState('Back at Top (0px) - Fully Restored'));
    
    console.log(JSON.stringify(results, null, 2));

    ws.close();
    chrome.kill();
  };
}

verify().catch(e => {
  console.error(e);
  chrome.kill();
});
