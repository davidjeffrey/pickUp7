"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    let d = Date()
    let order = {
      order_modifications: req.body.order_modifications,
      order_phone_num: req.body.order_phone_num,
      order_status: "order sent",
      order_time: d
    }
    console.log(req.body.itemid)
    function itemsOrderedToArray (items, orderId) {
      let result = [];
      items.forEach(function(item) {
        result.push({
          item_id: item,
          order_id: orderId.toString()
        });
      })
      console.log(result)
      return result;
    }
    knex
      .insert(order)
      .into("orders")
      .returning('id')
      .then((ordId) => {
        console.log(ordId)
        knex
          .batchInsert("cart", itemsOrderedToArray(req.body.itemid, ordId))
          .returning('*')
          .then((ord) => {
            res.status(200);
            res.json(ord[0].order_id);
          })
        });
  });

  return router;
}
