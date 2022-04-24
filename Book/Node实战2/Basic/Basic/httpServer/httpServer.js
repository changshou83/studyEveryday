import http from 'http';
import fs from 'fs';

http
  .createServer((req, res) => {
    getTitles(res);
  })
  .listen(8008, '127.0.0.1');

function getTitles(res) {
  fs.readFile('./titles.json', (err, data) => {
    if (err) return hadError(err, res);
    getTemplate(JSON.parse(data.toString()), res);
  });
}

function getTemplate(titles, res) {
  fs.readFile('./template.html', (err, data) => {
    if (err) return hadError(err, res);
    formatHTML(titles, data.toString(), res);
  });
}

function formatHTML(titles, template, res) {
  const html = template.replace('%', titles.map(v => `<li>${v}</li>`).join(''));
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}
