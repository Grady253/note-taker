//Requiring the applications from the node database. 
const fs = require('fs');
const path = require('path');
const data = require('../db/db.json');


module.exports= (app) =>{
    app.get('/api/notes', (req, res) =>{
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    app.post('api/notes', (req, res ) =>{
     let db = fs.readFileSync('./db/db.json');
     res.json(db);
      
    })









};