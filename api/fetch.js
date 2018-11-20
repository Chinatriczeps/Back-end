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

  const insertAction = (action_title, description, color_category, dayli_list, redFlag) => {
  	return knex('action').returning('*')
  		.insert({
  			action_title: action_title,
  			description: description,
  			redFlag: true,
  			color_category: color_category,
  			dayli_list_id: dayli_list,
  			active: true
  		})
  }

  const newAction = (input) => {
  	return fetch(`http://localhost:8080/action/new`)
  	.then((res) => {
      return res.json()
    }).catch(err => {
      console.log("New ACTION ERROR", err);
    })
  }

  const listEdit = (input) => {
  	return fetch(`/dayli_list/${req.body.id}/edit`)
  	.then((res) => {
      return res.json()
    }).catch(err => {
      console.log("LIST EDIT ERROR", err);
    })
  }

  const userEdit = (input) => {
  	return fetch(`http://localhost:8080/user/${req.body.id}/edit`)
  	.then((res) => {
      return res.json()
    }).catch(err => {
      console.log("USER EDIT ERROR", err);
    })
  }

  return {newAction, listEdit, userEdit};

}



module.exports = connection;