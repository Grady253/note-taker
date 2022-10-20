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
    if (req.body){
        const notes ={
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text
        };
        console.log(notes);
        readAndAppend(notes, './db/db.json');
        res.json('Note add successfully');
    }else{
        res.error('Error adding Note.')
    };
    console.log("it worked");
});


app.delete('/notes/:notesId', (req, res) => {
   const notesId = req.params.notesId;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) =>{
        const result =json.filter((notes) => notes.id !== notesId);
        writeToFile('./db/db.json', result);
        res.json(`Note ${notesId} has been deleted`);
    });

});

module.exports= app;