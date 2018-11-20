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
const jwt  				= require('jsonwebtoken');
const bcrypt  		= require('bcrypt');


app.use(morgan('dev'));
app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static("public"));


const usersRoutes = require("./routes/users");
const daily_listRoutes = require('./routes/dayli_list');
const actionRoutes = require("./routes/actions");
const fetchedData = require('./api/fetch.js')(knex)

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
	res.send('duuuuude')
});

app.post('/login', (req, res) => {
	res.send('Login page')
	
 //  if (password === '' || email === "") {
 //    res.send('Both the email and password fields are required')
 //    return;
 //  }

 //  knex.select('id', 'email', 'password').from('users')
 //  .then((arrOfUsers) => {
	//   let userMatch;
	//   console.log(password)
	//   arrOfUsers.forEach((user) => {
	//   	if(req.body.email == user.email && req.body.password == bcrypt.compareSync(password, user.password)){
	// 			res.send('a token');
	// 		} else {
	// 			res.sendStatus(400);
 //  		}
 //  	})
	// });
});

app.post('/logout', (req, res) => {
	res.sned("logout route");
});

app.post('/register', (req, res) => {
	res.send("registration route");
});

app.get('/users', (req, res) => {
	knex
		.select('*')
		.from('users')
		.then((results) => {
			res.json(results)
		}).catch((err) => {
			console.log("Users ID req", err)
		})
})

app.get('/user/:id', (req, res) => {
	knex
		.select('*')
		.from('users')
		.where({id: req.params.id})
		.then((results) => {
			res.json(results)
		}).catch((err) => {
			console.log("id error", err)
		})
})

app.post('/user/:id/edit', (req, res) => {
	knex('users').where({
    id: req.params.id
  }).update({
    email: req.body.email,
    password: 'string'
  }).then(() => {
  	res.send("user has been updated")
    // res.redirect('/');
    return;
  }).catch(err => {
    console.log("Users id edit", err);
  })
});

app.get('/overview', (req, res) => {
	// for graphs
	res.send("overview")
})

app.post('/dayli_list/:id/edit', (req, res) => {
  return knex('dayli_list').returning('*').where({
    id: req.body.id,
  }).update({
  	active: req.body.active
  }).then((result) => {
    res.json(result)
  }).catch(err => {
    console.log("editing daylist", err);
  }).then(() => {
  	res.send('Dayli list has been updated')
  	// res.redirect('/')
  	return;
  }).catch((err) => {
  	console.log("REDIRECT ERROR", err)
  })
})

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});