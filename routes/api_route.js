const fs = require('fs');


module.exports = app => {
    let notes = [];
    
    // read db.json file
    fs.readFile('db/db.json','utf8', (err, data) => {
        
        // throw an error if db file do not exit
        if(err) throw err;

        notes = JSON.parse(data);

    });

    app.get('/api/notes', (req, res) => {
        res.json(notes);
    });

}