exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('menus', function(table){
      table.increments('id').primary();
      table.text('menu_item');
      table.text('price');
      table.text('item_description');
      table.text('estimated_time');
    }),
    knex.schema.createTable('orders', function(table){
      table.increments('id').primary();
      table.text('menu_id');
      table.foreign('menus.id').references('menu_id');
      table.text('menu_item');
      table.text('price');
      table.text('estimated_time');
      table.text('modifications');
      table.text('status');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('menus'),
    knex.schema.dropTable('orders')
  ])
};
