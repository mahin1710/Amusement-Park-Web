const { execSync } = require('child_process');
const fs = require('fs');

const testHtml = `
const puppeteer = require('node:child_process');
`;

// Let's test by fetching the page and checking console errors or run Chrome with remote debugging
// We can use Chrome DevTools protocol directly via fetch to /json/list or WebSocket!
console.log("Testing...");
