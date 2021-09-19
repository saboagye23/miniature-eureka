const fs = require('fs');
var cuid = require('cuid')

const DB_FILE = 'db/db.json';

module.exports = app => {
    let notes = [];

    // read db.json file
    fs.readFile(DB_FILE,'utf8', (err, data) => {
        
        // throw an error if db file do not exit
        if(err) throw err;

        notes = JSON.parse(data);

    });

    const updateDB = (onSuccess) => {
        const db_json = JSON.stringify(notes, '\t');
        fs.writeFile(DB_FILE, db_json, err => {
            if (err) throw err;
            
            onSuccess();
            return true;
        });
    }

    const addNoteToDB = (note) => {
        // assign id to note
        note.id = cuid();
        notes.push(note);
        updateDB(() => {
            console.log('New note added:', note);
        });
    };

    const deleteNoteFromDB = id => {
        // find the index of note to delete 
        let del_index = notes.map(note => {
            return note.id;
        }).indexOf(id);

        // delete note
        if(del_index > -1){
            let del_note = notes[del_index];
            notes.splice(del_index, 1);
            updateDB(() => {
                console.log('Note deleted: ', del_note);
            });
        }
    };

    app.get('/api/notes', (req, res) => {
        res.json(notes);
    });

    app.post('/api/notes', (req, res) => {
        let note = req.body;
        addNoteToDB(note);
        res.json(note);
    });

    app.delete('/api/notes/:id', (req, res) => {
        deleteNoteFromDB(req.params.id);
        res.json({});
    });

}