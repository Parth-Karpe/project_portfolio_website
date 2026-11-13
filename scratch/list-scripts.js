const fs = require('fs');
const h = fs.readFileSync('dist/index.html', 'utf8');
const m = h.match(/department\.js\?v=[^"']+/);
console.log(m && m[0]);
const d = fs.readFileSync('dist/department.js', 'utf8');
const i = d.indexOf('function mentorDashboard');
console.log(d.slice(i, i + 700));
