require('dotenv').config()

const PORT        	= process.env.PORT || 8080;
const ENV         	= process.env.ENV || "development";
const express     	= require("express");
const bodyParser  	= require("body-parser");
// const sass        	= require("node-sass-middleware");
const app        	  = express();
const cookieSession = require('cookie-session')
const bcrypt        = require('bcrypt')

const knexConfig  	= require("./knexfile");
const knex        	= require("knex")(knexConfig[ENV]);
// const morgan      	= require('morgan');
const knexLogger  	= require('knex-logger');
// const fetch       	= require('node-fetch')


app.use(knexLogger(knex));
































app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});