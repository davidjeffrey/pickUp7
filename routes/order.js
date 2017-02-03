"use strict";

const express = require('express');
const router  = express.Router();

let order = {
  id: 5,
  name: "req.params.body"
}

module.exports = (knex) => {

  router.post("/", (req, res) => {
    let d = Date()
    let order = {
      order_modifications: req.query.order_modifications,
      order_phone_num: req.query.order_phone_num,
      order_status: "order sent to db",
      order_time: d
    }
    console.log(req.query);
    knex
      .insert(order)
      .into("orders")
      .then((results) => {
        res.status(200);
        res.json(results);
    });
  });

  return router;
}
