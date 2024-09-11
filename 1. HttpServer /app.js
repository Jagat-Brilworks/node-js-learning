const http = require('http');

const app = http.createServer();
const port = 3000;

app.on('request', (req, res) => {
  switch (req.url) {
    case '/partner':
      res.write('Hello ParTner');
      break;
    case '/':
      res.write('Hello world');
      break;
    default:
      res.write('Page not found.');
      break;
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Sever is listening on Port ${port}`);
});
