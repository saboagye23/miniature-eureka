module.exports = app => {

    app.get('/api/notes', (req, res) => {
        res.json([]);
    });
}