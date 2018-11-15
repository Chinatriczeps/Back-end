const bcrypt = require('bcrypt');


exports.seed = function(knex, Promise) {

  const deleteAllList = knex('action').del()
  const deleteAllUsers = deleteAllList.then(() => {
    return knex('users').del()
  })

  const createNewUsers = deleteAllUsers.then(() => {
    return knex('users').returning('*').insert([
      {id:1, name: 'Zoe', email: 'zoe@example.com', avatar: '../pics/pic1.png', password: bcrypt.hashSync('321', 10), redPoints: 10, greenPoints: 56},
      {id:2, name: 'Chingiz', email: 'chingiz@example.com', avatar: '../pics/pic2.png', password: bcrypt.hashSync('123', 10), redPoints: 70, greenPoints: 32}
    ])
  })

  const createList = createNewUsers.then(() => {
    return knex('action').returning('*').insert([
        {id: 1, name: '2 hour workout', description: 'Have spent 2 hours in a gym', redFlag: false, user_id: 1},
        {id: 2, name: 'Ate a burger', description: 'Had a burger', redFlag: true, user_id: 1},
        {id: 3, name: 'Went to BP', description: 'Had 3 slices of pizza', redFlag: true, user_id: 2},
        {id: 4, name: 'Went to LHL loundge', description: 'Played a piano', redFlag: false, user_id: 2}
      ])
  })
  return createList;

};

