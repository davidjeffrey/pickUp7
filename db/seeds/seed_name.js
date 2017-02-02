
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('menus').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('menus').insert({id: 1, menu_item: 'cheesecake', price: '12', item_description: 'new york style, out of this world', estimated_time: '10'}),
        knex('menus').insert({id: 2, menu_item: 'spaghetti', price: '25', item_description: 'bolognaise with meatballs', estimated_time: '30'}),
        knex('menus').insert({id: 3, menu_item: 'crab cakes', price: '15', item_description: 'served with garlic aioli', estimated_time: '20'}),
        knex('orders').insert({id: 1, menu_id: '1', menu_item: 'cheesecake', price: '12', estimated_time: '10', modifications: 'none', status: 'delivered'})
      ]);
    });
};
