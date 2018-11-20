const fetch = require('node-fetch');
require('dotenv').config();

const connection = (knex) => {
  const insertListItem = (active, date) => {
    return knex('dayli_list').returning('*')
    .insert({
      active: true,
      date: date,
      user_id: user
    })
  }

  const insertAction = (action_title, description, redFlag, color_category) => {
  	return knex('action').returning('*')
  		.insert({
  			action_title: action_title,
  			description: description,
  			redFlag: redFlag,
  			color_category: color_category,
  			dayli_list_id: dayli_list
  		})
  }

  const listItem = (input) => {
  	return fetch(`http://localhost:8080`)
  	.then((res) => {
      return res.json()
    }).catch(err => {
      console.log("List item res.json", err);
    })
  }

  return listItem;

}



module.exports = connection;