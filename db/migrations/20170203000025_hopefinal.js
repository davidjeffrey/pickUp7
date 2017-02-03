exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function(table){
      table.increments('id').primary();
      table.text('order_estimated_time');
      table.text('order_modifications');
      table.text('order_phone_num');
      table.text('order_status');
      table.text('order_time');
    }),
    knex.schema.createTable('restos', function(table){
      table.increments('id').primary();
      table.text('phone_num_r');
      table.text('resto_name');
      table.text('user');
      table.text('password');
      table.text('fb_stuff');
    }),
    knex.schema.createTable('menus', function(table){
      table.increments('id').primary();
      table.integer('resto_id').references('restos.id');
      table.text('menu_estimated_time');
      table.text('menu_name');
      table.text('location');
    }),
    knex.schema.createTable('items', function(table){
      table.increments('id').primary();
      table.integer('menu_id').references('menus.id');
      table.text('item');
      table.text('price');
      table.text('item_description');
    }),
    knex.schema.createTable('cart', function(table){
      table.integer('item_id').references('items.id');
      table.integer('order_id').references('orders.id');
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('menus'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('restos'),
    knex.schema.dropTable('items'),
    knex.schema.dropTable('cart')
  ])
};
