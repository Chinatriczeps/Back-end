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
const fetch       = require('node-fetch');


app.use(morgan('dev'));
app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static("public"));

const fetchedData = require('./api/fetch.js')(knex)

const usersRoutes = require("./routes/users");
const daily_listRoutes = require('./routes/dayli_list');
const actionRoutes = require("./routes/actions");

app.use("/routes/users", usersRoutes(knex));
app.use("/routes/dayli_list", daily_listRoutes(knex));
app.use("/routes/actions", actionRoutes(knex));

app.get("/", (req, res) => {
	// knex
	//   .select("*")
	//   .from("users")
	//   .then((results) => {
	//     console.log(results, "results")
	//     res.json(results);
	// }).catch(err => {
	// 	console.log("users route", err)
	// });
});


// app.get('/userid', (req, res) => {
// 	ree.send('sends user id to front end')
// })

// app.post('/register', (req, res) => {
// 	res.send("registration route");
// });

// app.post('/login', (req, res) => {
// 	res.send("login route");
// });

// app.post('/logout', (req, res) => {
// 	res.sned("logout route");
// });

// app.post('/user/:id/edit', (req, res) => {
// 	res.send('edit users profile');
// });

// app.post('/action/:id/delete', (req, res) => {
// 	res.send('delete an action');
// });

// app.post('/action/new', (req, res) => {
// 	res.send('add a new action');
// });


app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});