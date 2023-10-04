// app.js
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('public'));


const blogController = require('./controllers/blogController');


app.use('/blog', blogController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
