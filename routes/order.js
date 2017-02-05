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

    // Twilio Credentials
    var accountSid = 'AC05191b676835f31d0b8df1118296384c';
    var authToken = '23d754a054dd0296c9c0eac58bc8f985';

    //require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
        to: "+16475029768",
        from: "+64475572979",
        body: "This is the ship that made the Kessel Run in fourteen parsecs?",
        mediaUrl: "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
    }, function(err, message) {
        console.log(message);
    });

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
