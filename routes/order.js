"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.post("/", (req, res) => {
    knex
      .insert(req.params.body) //TODO this probaby isnt right
      .into("orders")
      .then((results) => {
        res.status(200);
        res.json(results);
    });
  });
  return router;
}
