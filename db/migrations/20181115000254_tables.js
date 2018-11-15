
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
	.createTable('action', (table) => {
		table.increments();
		table.string('name').notNull();
		table.string('description');
		table.timestamps(true, true);
		table.boolean('redFlag').notNull();
        table.integer('user_id').references('id').inTable('users');
	}
};

exports.down = function(knex, Promise) {
  
};
