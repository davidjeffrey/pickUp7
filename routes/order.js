"use strict";

const express = require('express');
const router  = express.Router();

function inputOrder (restoId, orderArray) {
  // let order =  {
  //   resto_id: req.params.id,
  //   order_item:
  //   order_price:
  //     }
      // for (item of orderArray) {
      //     }

  return order;
}

module.exports = (knex) => {

  router.post("/", (req, res) => {
    let d = Date()
    let order = {
      order_modifications: req.query.order_modifications,
      order_phone_num: req.query.order_phone_num,
      order_status: "order sent",
      order_time: d
    }
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
          .batchInsert("cart", itemsOrderedToArray(req.query.itemid, ordId))
          .returning('*')
          .then((ordId) => {
            res.status(200);
            res.json(ordId);
          })
        });
  });

  return router;
}
