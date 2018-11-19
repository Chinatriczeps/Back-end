const fetch = require('node-fetch');
require('dotenv').config();

const connection = (knex) => {
	fetch('https://localhost:8080.')
	    .then(res => res.json())
	    .then(json => console.log(json));
}



module.exports = connectionn