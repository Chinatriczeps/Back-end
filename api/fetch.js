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

  const insertAction = ({action_title, description, color_category, redFlag}, dailyListID) => {
  	return knex('actions').returning('*')
  		.insert({
  			action_title: action_title,
  			description: description,
  			color_category: color_category,
  			redFlag: redFlag,
  			dayli_list_id: dailyListID
  		})
  }
 	// already getting info in post method
  // const newAction = (input) => {
  // 	return fetch(`http://localhost:8080/action/new`, {
  // 		method: 'POST'
  // 	})
  // 	.then((res) => {
  //     return res.json()
  //   }).catch(err => {
  //     console.log("New ACTION ERROR", err);
  //   })
  // }

  const listEdit = (input) => {
  	return fetch(`/dayli_list/${req.params.id}/edit`)
  	.then((res) => {
      return res.json()
    }).catch(err => {
      console.log("LIST EDIT ERROR", err);
    })
  }

  const userEdit = (input) => {
  	return fetch(`http://localhost:8080/user/${req.params.id}/edit`)
  	.then((res) => {
      return res.json()
    }).catch(err => {
      console.log("USER EDIT ERROR", err);
    })
  }

  return {listEdit, userEdit, insertAction};

}



module.exports = connection;