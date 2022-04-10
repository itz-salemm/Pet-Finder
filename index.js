const express = require('express');
const port = 5000

const app = express();


// view engine
app.set('view engine', 'ejs');


// Website routing
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/reports', (req, res) => {
  res.render('reports');
});

// API routing
app.get('/api/reports', (req, res) => {
  res.json({});
});

app.post('/api/report', (req, res) => {
  res.json({});
});

app.delete('/api/report/:id', (req, res) => {
  res.json({});
});

app.put('/api/report/:id', (req, res) => {
  res.json({});
});



app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`);
});