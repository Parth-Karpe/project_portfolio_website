const fs = require('fs');
const s = fs.readFileSync('dist/index.html', 'utf8');
const hits = s.match(/[a-z0-9_-]+\.js\?v=[^"']+/gi) || [];
console.log(hits.join('\n'));
