const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        console.log(results, "results")
        res.json(results);
    }).catch(err => {
    	console.log("users route", err)
    });
  });

  return router;
}