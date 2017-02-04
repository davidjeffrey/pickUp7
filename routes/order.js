"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    let d = Date()
    let order = {
      order_modifications: req.query.order_modifications,
      order_phone_num: req.query.order_phone_num,
      order_status: "order sent to db",
      order_time: d
    }
    function itemsOrderedToArray (items, orderId) {
      let result = [];
      items.split("")
      for (let item of items) {
        result.push({item: orderId});
      }
      console.log(result)
      return result;
    }
    console.log(req.query.items);
    console.log(req.query);
    knex
      .insert(order)
      .into("orders")
      .returning('id')
      .then((ordId) => {
        knex
          .batchInsert("cart", itemsOrderedToArray(req.query.items, ordId))
          .returning('*')
          .then((ordId) => {
            res.status(200);
            res.json(results);
          })
        });
  });

  return router;
}
