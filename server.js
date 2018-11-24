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
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(express.static("public"));


const usersRoutes = require("./routes/users");
const daily_listRoutes = require('./routes/dayli_list');
const actionRoutes = require("./routes/actions");
const {newAction, listEdit, userEdit, insertAction} = require('./api/fetch.js')(knex)

app.use("/routes/users", usersRoutes(knex));
app.use("/routes/dayli_list", daily_listRoutes(knex));
app.use("/routes/actions", actionRoutes(knex));

app.get("/", (req, res) => {
	knex('dayli_list')
	.where('active', true)
	.then((result) => {
		res.json(result)
	}).catch((err) => {
		console.log("Dayli list error", err)
	})
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


// 

// app.get('/users', (req, res) => {
// 	knex
// 		.select('*')
// 		.from('users')
// 		.then((results) => {
// 			res.json(results)
// 		}).catch((err) => {
// 			console.log("Users ID req", err)
// 		})
// })

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
    password: bcrypt.hashSync(req.body.password, 10)
    // password: bcrypt.hashSync(req.body.password, 10)
  }).then(() => {
  	res.send("user has been updated")
    // res.redirect('/');
    return;
  }).catch(err => {
    console.log("Users id edit", err);
  })
});

app.get('/overview', (req, res) => {
	res.redirect('/overview')
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
  	res.redirect('/')
  	return;
  }).catch((err) => {
  	console.log("REDIRECT ERROR", err)
  })
})

// actions of a particular user
app.get('/user/:id/actions', (req, res) => {
	knex('actions')
		.innerJoin('dayli_list', 'actions.dayli_list_id', 'dayli_list.id')
		.where('dayli_list.users_id', req.params.id)
		.select('actions.*', 'dayli_list.users_id')
		.then((result) => {
			res.json(result)
		}).catch((err) => {
			console.log("AHAHAHAHAHHAAH", err)
		})
})



// app.post('/action/new', (req, res) => {
// 	// if(!req.body.text){
// 	// 	res.send('You must enter an input')
// 	// }
// 	// newAction(req.body.text)
// 	// .then(() => {
// 		insertAction(req.body)
// 		.catch(err => {
// 			console.log("INSERT ITEM ERROR", err)
// 		}).then(() => {
// 			res.json()
// 		}).catch(err => {
// 			console.log("INSERT ITEM ERROR VOL.2", err)
// 		})
// 	// })
// });

app.get('/dayli_list/:id/actions', (req, res) => {
	knex
		.select('*')
		.from('actions')
		.where({
		dayli_list_id: req.params.id
		}).then((result) => {
			res.json(result)
		}).catch((err) => {
			console.log("Actions list error", err)
		})
});

app.post('/dayli_list/:dlID/actions', (req, res) => {
	console.log(req.body)
	insertAction(req.body, req.params.dlID)
	
		.catch(err => {
			console.log("INSERT ITEM ERROR", err)
		}).then(() => {
			res.json()
		}).catch(err => {
			console.log("INSERT ITEM ERROR VOL.2", err)
		})
});

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});