const bcrypt = require('bcrypt');


exports.seed = function(knex, Promise) {

  const deleteAllList = knex('actions').del()
  const deleteAllUsers = deleteAllList.then(() => {
    return knex('user').del()
  })

  const createNewUser = deleteAllUsers.then(() => {
    return knex('user').returning('*').insert([
      {id:1, name: 'Zoe', email: 'zoe@example.com', avatar: '../pics/pic1.png', password: bcrypt.hashSync('321', 10), redPoints: 10, greenPoints: 56},
      {id:2, name: 'Chingiz', email: 'chingiz@example.com', avatar: '../pics/pic2.png', password: bcrypt.hashSync('123', 10), redPoints: 70, greenPoints: 32}
    ])
  })

  const createDailyList = createNewUser.then(() => {
    return knex('dailyList').returning('*').insert([
        {id: 1, active: true, user_id: 1},
        {id: 2, active: false, user_id: 1},
        {id: 3, active: true, user_id: 2}
      ])
  })

  const createAction = createDailyList.then(() => {
    return knex('actions').returning('*').insert([
        {id: 1, action_title: '2 hour workout', description: 'Have spent 2 hours in a gym', redFlag: false, color_category: 'blue', dailyList_id: 1},
        {id: 2, action_title: 'Ate a burger', description: 'Had a burger', redFlag: true, color_category: 'red', dailyList_id: 1},
        {id: 3, action_title: 'Went to BP', description: 'Had 3 slices of pizza', redFlag: true, color_category: 'purple', dailyList_id: 2},
        {id: 4, action_title: 'Went to LHL loundge', description: 'Played a piano', redFlag: false, color_category: 'orange', dailyList_id: 3}
      ])
  })
  return createAction;

};

