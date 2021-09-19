const fs = require('fs');

const DB_FILE = 'db/db.json';

module.exports = app => {
    let notes = [];

    // read db.json file
    fs.readFile(DB_FILE,'utf8', (err, data) => {
        
        // throw an error if db file do not exit
        if(err) throw err;

        notes = JSON.parse(data);

    });

    const addNoteToDB = (note) => {
        notes.push(note);
        const db_json = JSON.stringify(notes, '\t');
        fs.writeFile(DB_FILE, db_json, err =>{
            if (err) throw err;
            
            console.log('New note added');
            return true;
        });
    };

    app.get('/api/notes', (req, res) => {
        res.json(notes);
    });

    app.post('/api/notes', (req, res) => {
        let note = req.body;
        addNoteToDB(note);
        res.json(note);
    });

}