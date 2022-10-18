//Requiring the applications from the node database. 
const fs = require('fs');
const app = require('express').Router();
const path = require('path');
const data = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');


app.get('/notes', (req, res) =>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/notes', (req, res ) =>{
    let db = fs.readFileSync('./db/db.json');
    res.json(db);
    
    if (req.body){
        const notes ={
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text
        }
        readAndAppend(notes, './db/db.json');
        res.json('Note add successfully');
    }else{
        res.error('Error adding Note.')
    };
});


app.delete('/notes')

module.exports= (app);