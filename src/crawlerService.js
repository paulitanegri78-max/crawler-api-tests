const http = require('http');

const port = 4567;

const dummyHtml = `<!doctype html>
<html>
  <head><title>Test Page</title></head>
  <body>
    <h1>Security in HTML</h1>
    <!-- This is a hidden COMMENT containing secret -->
    <div class="content">Some text about CRAWL and search.</div>
  </body>
</html>`;

const sendJson = (res, statusCode, payload) => {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
};

const crawls = new Map();

const sitePages = new Map([
  ['https://example.com/index.html', `<!doctype html>
<html>
  <head><title>Test Page</title></head>
  <body>
    <h1>Security in HTML</h1>
    <!-- This is a hidden COMMENT containing secret -->
    <div class="content">Some text about crawl and search.</div>
  </body>
</html>`],
  ['https://example.com/about.html', `<!doctype html>
<html>
  <body>
    <p>The search term appears in this ABOUT page information.</p>
    <div>Another line with the word Security.</div>
  </body>
</html>`],
  ['https://example.com/contact.html', `<!doctype html>
<html>
  <body>
    <p>Contact page with no matching search term.</p>
  </body>
</html>`]
]);

const getIdFromUrl = (url) => {
  if (!url.startsWith('/crawl/')) {
    return null;
  }
  return url.slice('/crawl/'.length);
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/crawl') {
    let rawData = '';
    req.on('data', (chunk) => {
      rawData += chunk;
    });

    req.on('end', () => {
      let data;
      try {
        data = JSON.parse(rawData || '{}');
      } catch {
        sendJson(res, 400, { error: 'Invalid JSON' });
        return;
      }

      const { keyword } = data;
      if (!keyword || typeof keyword !== 'string' || keyword.length < 4 || keyword.length > 32) {
        sendJson(res, 400, { error: 'keyword must be between 4 and 32 characters' });
        return;
      }

      const keywordLower = keyword.toLowerCase();
      const urls = [];
      for (const [url, html] of sitePages.entries()) {
        if (html.toLowerCase().includes(keywordLower)) {
          urls.push(url);
        }
      }

      const id = Math.random().toString(36).slice(2, 10).padEnd(8, '0');
      const crawl = {
        id,
        keyword,
        status: 'completed',
        found: urls.length > 0,
        urls,
      };
      crawls.set(id, crawl);
      sendJson(res, 200, crawl);
    });
    return;
  }

  if (req.method === 'GET') {
    const id = getIdFromUrl(req.url);
    if (!id) {
      sendJson(res, 404, { error: 'Not found' });
      return;
    }

    if (id.length > 32) {
      sendJson(res, 400, { error: 'id cannot exceed 32 characters' });
      return;
    }

    const crawl = crawls.get(id);
    if (!crawl) {
      sendJson(res, 404, { error: 'Crawl not found' });
      return;
    }

    sendJson(res, 200, crawl);
    return;
  }

  sendJson(res, 404, { error: 'Not found' });
});

if (require.main === module) {
  server.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });
}

module.exports = server;
