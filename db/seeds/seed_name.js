
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // return knex()
    // .then(function () {
      return knex('restos')
          .insert({id: 1, phone_num_r: '4168888888', resto_name: 'guicci food', user: 'jumaal', password: 'p@assword', fb_stuff: 'nadaa'})
          .then(() => Promise.all([
            knex('orders').insert({id: 1, order_estimated_time: '10', order_modifications: 'none', order_status: 'delivered', order_time:'1486082819184'}),
            knex('menus').insert({id: 1, menu_name: 'fall', resto_id: 1, menu_estimated_time: '10'}),
            knex('items').insert({id:2, menu_id: 1, item: 'crab cakes', price: '40', item_description: 'served with garlic aioli'}),
            knex('items').insert({id:3, menu_id: 1, item: 'cheesecake', price: '10', item_description: 'new york style, out of this world'}),
            knex('items').insert({id:4, menu_id: 1, item: 'lasagna', price: '12', item_description: 'delcious'}),
            knex('items').insert({id:1, menu_id: 1, item: 'spaghetti', price: '30', item_description: 'bolognaise with meatballs'}),
            ]))
            .then(() => Promise.all([
              knex('cart').insert({item_id: 1, order_id: 1}),
              knex('cart').insert({item_id: 2, order_id: 1}),
              knex('cart').insert({item_id: 3, order_id: 1})
            ]));
    // });
};
