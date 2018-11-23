
exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', (table) => {
		table.increments();
		table.string('name').notNull();
		table.string('email').notNull();
		table.string('avatar');
		table.string('password').notNull();
		table.integer('redPoints');
		table.integer('greenPoints');
	})
	.createTable('dayli_list', (table) => {
		table.increments();
		table.boolean('active').notNull();
		table.integer('users_id').references('id').inTable('users');
		table.timestamps(true, true);
	})
	.createTable('actions', (table) => {
		table.increments();
		table.string('action_title').notNull();
		table.string('description');
		table.boolean('redFlag').notNull();
		table.string('color_category')
    table.integer('dayli_list_id').references('id').inTable('dayli_list');
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users')
	.dropTable('action')
	.dropTable('daily_list')
};
