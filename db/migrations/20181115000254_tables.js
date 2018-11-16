
exports.up = function(knex, Promise) {
	return knex.schema.createTable('user', (table) => {
		table.increments();
		table.string('name').notNull();
		table.string('email').notNull();
		table.string('avatar');
		table.string('password').notNull();
		table.integer('redPoints');
		table.integer('greenPoints');
	})
	.createTable('dailyList', (table) => {
		table.increments();
		table.boolean('active').notNull();
		table.integer('user_id').references('id').inTable('user');
		table.timestamps(true, true);
	})
	.createTable('actions', (table) => {
		table.increments();
		table.string('action_title').notNull();
		table.string('description');
		table.boolean('redFlag').notNull();
		table.string('color_category')
    	table.integer('dailyList_id').references('id').inTable('dailyList');
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('user')
	.dropTable('action')
	.dropTable('dailyList')
};
