const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));
app.use('/css', express.static(path.join(publicDir, 'css')));
app.use('/js', express.static(path.join(publicDir, 'js')));
app.use('/data', express.static(path.join(publicDir, 'data')));
app.get('/api/portfolio', (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.sendFile(path.join(publicDir, 'data', 'portfolio.json'));
});
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use(express.static(publicDir));
app.get('*', (req, res) => res.sendFile(path.join(publicDir, 'index.html')));
app.listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}`));
