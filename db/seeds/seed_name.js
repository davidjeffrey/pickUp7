
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('menus').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('menus').insert({id: 1, menu_item: 'cheesecake', resto_id: '1', menu_price: '12', menu_item_description: 'new york style, out of this world', menu_estimated_time: '10'}),
        knex('menus').insert({id: 2, menu_item: 'spaghetti', resto_id: '1', menu_price: '25', menu_item_description: 'bolognaise with meatballs', menu_estimated_time: '30'}),
        knex('menus').insert({id: 3, menu_item: 'crab cakes', resto_id: '1', menu_price: '15', menu_item_description: 'served with garlic aioli', menu_estimated_time: '20'}),
        knex('orders').insert({id: 1, menu_id: '1', resto_id: '1', order_item: 'cheesecake', order_price: '12', order_estimated_time: '10', order_modifications: 'none', order_status: 'delivered'}),
        knex('restos').insert({id: 1, menu_id: '1', phone_num_r: '4168888888', resto_name: 'guicci food', user: 'jumaal', password: 'p@assword', fb_stuff: 'nadaa'})
      ]);
    });
};
