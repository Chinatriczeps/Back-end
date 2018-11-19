const fetch = require('node-fetch');
require('dotenv').config();

const connection = (knex) => {
	fetch('https://localhost:8080/')
	    .then(res => res.json())
	    .then(json => console.log(json));

  const insertListItem = (active, date) => {
    return knex('dayli_list').returning('*')
    .insert({
      active: true,
      date: date,
      user_id: user
    })
  }

  

}



module.exports = connectionn