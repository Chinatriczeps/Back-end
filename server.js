require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const fetch       = require('node-fetch')

app.use(morgan('dev'));
app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.send("home page");
});

app.get('/userid', (req, res) => {
	ree.send('sends user id to front end')
})

app.post('/register', (req, res) => {
	res.send("registration route");
});

app.post('/login', (req, res) => {
	res.send("login route");
});

app.post('/logout', (req, res) => {
	res.sned("logout route");
});

app.post('/user/:id/edit', (req, res) => {
	res.send('edit users profile');
});

app.post('/action/:id/delete', (req, res) => {
	res.send('delete an action');
});

app.post('/action/new', (req, res) => {
	res.send('add a new action');
});

// app.post('/action/:id/edit', (req, res) => {
// 	res.send('change a action state');
// });

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});