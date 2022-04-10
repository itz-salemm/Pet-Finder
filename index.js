const express = require('express');
const sqlite3 = require('sqlite3').verbose()
const port = 5000
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

let sql;

// Connect to DB
const db = new sqlite3.Database("./models/Dogs.db", sqlite3.OPEN_READWRITE, (err) => {
	if(err) return console.error(err.message)

	console.log("Connected sucessfully")	
})


// CREATE TABLE 
//sql = ``
//db.run(sql)

// INSERT DATA
//sql = `INSERT INTO pets(name, animal, description, location) VALUES (?,?,?,?)`
//db.run(sql,["bush", "dog", "black, tall, and bushy", "los angeles"],(err) => {
  	//if(err) return console.error(err.message)
  //})


// QUERY DATABASE
//sql = `SELECT * FROM pets`
  //db.all(sql, [], (err, rows) => {
  	//if(err) return console.error(err.message)
  	//rows.forEach((row) => {
  		//console.log(row)
  	//})
  //})

// GET AN ITEM FROM DATABASE
 //sql = `SELECT * FROM pets WHERE id = ?`
  //db.all(sql, [1], (err, row) => {
  	//if(err) return console.error(err.message)
  		//console.log(row)
  //})

// UPDATE DATABASE
//sql = `UPDATE pets SET animal = ? WHERE id = ?`
  //db.run(sql,["cat", 1],(err) => {
  	//if(err) return console.error(err.message)
  //})


// DELETE FROM DATABASE
//sql = `DELETE FROM pets WHERE id = ?`
  //db.run(sql,[1],(err) => {
  	//if(err) return console.error(err.message)
  //})


// view engine
app.set('view engine', 'ejs');


// Website routing
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/reports', async (req, res) => {
  let pets = [];
  sql = `SELECT * FROM pets`
  await db.all(sql, [], (err, rows) => {
  	if(err) return console.error(err.message)
  	rows.forEach((row) => {
  		pets.push(row)
  	})
  })
  res.render('reports', {pets});
});

app.get('/report/:id', async (req, res) => {
  const id = req.params.id
  sql = `SELECT * FROM pets WHERE id = ?`
  db.all(sql, [id], (err, row) => {
  	if(err) return console.error(err.message)
  	res.render('reports', {pets});
  })
});

// API routing

// Retrieves all missing pet reports
app.get('/api/reports', async (req, res) => {
  let pets = [];
  sql = `SELECT * FROM pets`
  await db.all(sql, (err, rows) => {
  	if(err) return console.error(err.message)
  	rows.forEach((row) => {
  		pets.push(row)
  	})
  res.json(pets);
  })
});

//Retrieve the information about a specific report
app.get('/api/reports/:id', async (req, res) => {
  const id = req.params.id
  sql = `SELECT * FROM pets WHERE id = ?`
  await db.all(sql, [id], (err, row) => {
  	if(err) return console.error(err.message)
  	res.json(row);
  })
});

// Report a new missing pet
app.post('/api/report', async (req, res) => {
  const {name, animal, description, location} = req.body
  sql = `INSERT INTO pets(name, animal, description, location) VALUES (?,?,?,?)`
  await db.run(sql,[name, animal, description, location],(err) => {
  	if(err) return console.error(err.message)
  	res.json({ Message: "Your report has been filed"});
  })
});

// Remove a report
app.delete('/api/report/:id', async (req, res) => {
   const id = req.params.id
  sql = `DELETE FROM pets WHERE id = ?`
  await db.run(sql,[id],(err) => {
  	if(err) return console.error(err.message)
    res.json({ Message: "Your report has been deleted"});
  })
});

// Update the details of a report
app.put('/api/report/:id', async (req, res) => {
  const id = req.params.id
  const { animal } = req.body
  sql = `UPDATE pets SET animal = ? WHERE id = ?`
  await db.run(sql,[animal, id],(err) => {
  	if(err) return console.error(err.message)
    res.json({ Message: "Your report has been updated"});
  })
});


//db.close((err) => {
	//if(err) return console.error(err.message)
//})

app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`);
});