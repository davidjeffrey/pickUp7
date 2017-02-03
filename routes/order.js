"use strict";

const express = require('express');
const router  = express.Router();

function inputOrder (restoId, orderArray) {
  // let order =  {
  //   resto_id: req.params.id,
  //   order_item:
  //   order_price:
  //     }
  //     // for (item of orderArray) {
  //     //     }
  return order;
}

module.exports = (knex) => {
  router.post("/:id", (req, res) => {
    knex
      .insert(inputOrder(req.params.body.order)) //TODO this probaby isnt right
      .into("orders")
      .where("")
      .then((results) => {
        res.status(200);
        res.json(results);
    });
  });

  return router;
}
