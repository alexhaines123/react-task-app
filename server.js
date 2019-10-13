const app = require('./app');

// app.get('/', (req, res) => {
//   res.send('Hello world\n');
// });

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);