"use strict";

const express = require('express');
const router  = express.Router();
var accountSid = 'AC05191b676835f31d0b8df1118296384c';
var authToken = '23d754a054dd0296c9c0eac58bc8f985';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);
// var client = new twilio.RestClient(accountSid, authToken);

function sendToResto (order) {
client.messages.create({
    to: "+16475029768",
    from: "+16475572979",
    body: "order for pickup: " + order,
}, function(err, message) {
    console.log(message.sid);
});
}
module.exports = (knex) => {

  router.post("/", (req, res) => {
    let d = Date()
    let order = {
      order_modifications: req.body.order_modifications,
      order_phone_num: req.body.order_phone_num,
      order_status: "order placed",
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

            console.log(ord[0].order_id)
            // sendToResto (ord)
            knex
              .select("item")
              .from("orders")
              .join('cart', 'orders.id', 'cart.order_id')
              .join('items', 'cart.item_id', 'items.id')
              .where("order_id", ord[0].order_id)
              .returning("*")
              .then((results) => {
                let ord = []
                results.forEach(function(item) {
                  ord.push(item.item)
                })
                sendToResto(ord)

            });
          })
        });
        console.log(req.body.itemid, "pppp")


  });
  return router;
}
