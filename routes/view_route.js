module.exports = (app, dir) => {
    app.get('*', (req, res) => {
        res.sendFile('index.html',{
            root: dir
        });
    });

    app.get('/notes', (req, res) => {
        res.sendFile('notes.html',{
            root: dir
        });
    });
}