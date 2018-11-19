const fetch = require('node-fetch');
require('dotenv').config();

const connection = (knex) => {
	fetch('https://localhost:8080.')
	    .then(res => res.json())
	    .then(json => console.log(json));

  const insertAction = (title, description, redFlag, colorCategtory) => {
    return knex('actions').returning('*')
    .insert({
      title: title,
      description: description,
      user_id: user,
      redFlag: true,
    })
  }

}



module.exports = connectionn