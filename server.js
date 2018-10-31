const express = require('express');
const server = express();
const request = require('request');
const proxy = require('http-proxy-middleware');

server.set('view engine', 'ejs');

const createProxy = (path, target) =>
  server.use(path, proxy({ target, changeOrigin: true, pathRewrite: {[`^${path}`]: ''} }));

createProxy('/cart', 'http://localhost:3002/');
createProxy('/header', 'http://localhost:3000/');    

server.get('/', (req, res) => res.render('index'));

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Homepage listening on port ${port}`);
});