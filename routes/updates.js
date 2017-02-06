"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("orders")
      .join('cart', 'orders.id', 'cart.order_id')
      .join('items', 'cart.item_id', 'items.id')
      .where("order_id", req.params.id)
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/p/:id", (req, res) => {
    knex
      .select("order_status")
      .from("orders")
      .join('cart', 'orders.id', 'cart.order_id')
      .join('items', 'cart.item_id', 'items.id')
      .where("order_id", req.params.id)
      .then((results) => {
        res.json(results);
    });
  });
  return router;
}
