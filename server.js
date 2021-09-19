const express = require('express')
const app = express();
const path = require('path')

// constants
const PORT = 3000;
const PUBLIC_DIR = __dirname + '/public'

const options = { 
    redirect: true,
    extensions: ['html'],
    index: false
}

// public assets directory
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'), options));


// server api urls
require('./routes/api_route')(app);

// server view urls
require('./routes/view_route')(app, PUBLIC_DIR);


// run express server on port 3000
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});