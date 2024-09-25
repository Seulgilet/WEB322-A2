/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Seulgi Lee       Student ID: 134289230       Date: 2024-09-30
*
* Published URL: http://localhost:3000/
*
********************************************************************************/

const express = require('express');
const legoData = require('./modules/legoSets'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
require('pg'); // explicitly require the "pg" module
const Sequelize = require('sequelize');


// Initialize legoSets before starting the server
legoData.initialize()
  .then(() => {
    console.log('Lego sets have been initialized successfully.');


    // 1. GET "/"
    app.get('/', (req, res) => {
      res.send('Assignment 2: Seulgi Lee - 134289230'); 
    });

    // 2. GET "/lego/sets"
    app.get('/lego/sets', (req, res) => {
      legoData.getAllSets()
        .then(sets => res.json(sets))
        .catch(err => res.status(500).send(err));
    });

    // 3. GET "/lego/sets/num-demo"
    app.get('/lego/sets/num-demo', (req, res) => {
      const demoSetNum = 'Jan-01'; 
      legoData.getSetByNum(demoSetNum)
        .then(set => res.json(set))
        .catch(err => res.status(404).send(err));
    });

    // 4. GET "/lego/sets/theme-demo"
    app.get('/lego/sets/theme-demo', (req, res) => {
      const demoTheme = 'town'; 
      legoData.getSetsByTheme(demoTheme)
        .then(sets => res.json(sets))
        .catch(err => res.status(404).send(err));
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize lego sets:', err);
  });