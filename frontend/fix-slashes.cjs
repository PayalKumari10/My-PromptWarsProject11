const fs = require('fs');

const files = [
  './src/pages/Dashboard.jsx',
  './src/pages/RoadmapDetail.jsx',
  './src/pages/CreateRoadmap.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(file, content);
  console.log('Fixed', file);
});
