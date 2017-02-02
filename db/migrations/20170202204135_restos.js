exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('menus', function(table){
      table.increments('id').primary();
      table.text('resto_id');
      table.foreign('restos.id').references('resto_id');
      table.text('menu_item');
      table.text('menu_price');
      table.text('menu_item_description');
      table.text('menu_estimated_time');
    }),
    knex.schema.createTable('orders', function(table){
      table.increments('id').primary();
      table.text('menu_id');
      table.foreign('menus.id').references('menu_id');
      table.text('resto_id');
      table.foreign('restos.id').references('resto_id');
      table.text('order_item');
      table.text('order_price');
      table.text('order_estimated_time');
      table.text('order_modifications');
      table.text('order_phone_num');
      table.text('order_status');
    }),
    knex.schema.createTable('restos', function(table){
      table.increments('id').primary();
      table.text('menu_id');
      table.foreign('menus.id').references('menu_id');
      table.text('phone_num_r');
      table.text('resto_name');
      table.text('user');
      table.text('password');
      table.text('fb_stuff');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('menus'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('restos')
  ])
};
