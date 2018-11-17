const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    }).catch(err => {
    	console.log("users route", err)
    });
  })

  router.get("/", (req, res) => {
    knex
      .select('*')
      .from('dayli_list')
      .then((results) => {
        res.json(results);
      }).catch(err => {
        console.log("dayli_list route", err)
      });
  })

  return router;
}