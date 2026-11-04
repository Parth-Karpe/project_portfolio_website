/**
 * ProjectGate AI Local Development Server
 * Serves static assets from /dist and routes /api/chat through api/chat.js.
 * Eliminates all browser CORS errors when using Ollama Cloud or Gemini.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const chatHandler = require('./api/chat.js');

const PORT = parseInt(process.argv[2] || process.env.PORT || '4174', 10);
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);
  const pathname = parsedUrl.pathname;

  // Route /api/chat
  if (pathname === '/api/chat') {
    let bodyData = '';
    req.on('data', chunk => {
      bodyData += chunk;
      if (bodyData.length > 10 * 1024 * 1024) {
        req.destroy(); // Protection against oversized bodies
      }
    });

    req.on('end', async () => {
      let parsedBody = {};
      try {
        if (bodyData) parsedBody = JSON.parse(bodyData);
      } catch (e) {
        parsedBody = {};
      }

      req.body = parsedBody;

      // Mock express-like res helpers for Vercel handler compatibility
      res.status = function (code) {
        res.statusCode = code;
        return res;
      };
      res.json = function (obj) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(obj));
        return res;
      };

      try {
        await chatHandler(req, res);
      } catch (err) {
        if (!res.writableEnded) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, useFallback: true }));
        }
      }
    });
    return;
  }

  // Handle static files in /dist
  let relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  let filePath = path.join(DIST_DIR, relativePath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.statusCode = 403;
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // If path not found and has no extension, try with .html
      if (!path.extname(filePath)) {
        const htmlPath = filePath + '.html';
        if (fs.existsSync(htmlPath)) {
          filePath = htmlPath;
        } else {
          res.statusCode = 404;
          res.end('File Not Found');
          return;
        }
      } else {
        res.statusCode = 404;
        res.end('File Not Found');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[ProjectGate AI] Server listening on http://127.0.0.1:${PORT}`);
  console.log(`[ProjectGate AI] Static directory: ${DIST_DIR}`);
  console.log(`[ProjectGate AI] API endpoint: http://127.0.0.1:${PORT}/api/chat`);
});
