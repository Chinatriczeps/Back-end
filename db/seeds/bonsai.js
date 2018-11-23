const bcrypt = require('bcrypt');


exports.seed = function(knex, Promise) {

  const deleteAllList = knex('actions').del()
  const deleteAllUsers = deleteAllList.then(() => {
    return knex('users').del()
  })

  const createNewUser = deleteAllUsers.then(() => {
    return knex('users').returning('*').insert([
      {id:1, name: 'Zoe', email: 'zoe@example.com', avatar: '../pics/pic1.png', password: bcrypt.hashSync('321', 10), redPoints: 10, greenPoints: 56},
      {id:2, name: 'Chingiz', email: 'chingiz@example.com', avatar: '../pics/pic2.png', password: bcrypt.hashSync('123', 10), redPoints: 70, greenPoints: 32}
    ])
  })

  const createDayliList = createNewUser.then(() => {
    return knex('dayli_list').returning('*').insert([
        {id: 1, active: true, users_id: 1},
        {id: 2, active: false, users_id: 1},
        {id: 3, active: false, users_id: 2},
        {id: 4, active: false, users_id: 1},
        {id: 5, active: false, users_id: 1},
        {id: 6, active: false, users_id: 1},
        {id: 7, active: false, users_id: 1},
        {id: 8, active: false, users_id: 1},
        {id: 9, active: false, users_id: 1},
        {id: 10, active: false, users_id: 2},
        {id: 11, active: false, users_id: 2},
        {id: 12, active: false, users_id: 2},
        
      ])
  })

  const createAction = createDayliList.then(() => {
    return knex('actions').returning('*').insert([
        {id: 1, action_title: '2 hour workout', description: 'Have spent 2 hours in a gym', redFlag: false, color_category: 'blue', dayli_list_id: 1},
        {id: 2, action_title: 'Ate a burger', description: 'Had a burger', redFlag: true, color_category: 'red', dayli_list_id: 1},
        {id: 3, action_title: 'Went to BP', description: 'Had 3 slices of pizza', redFlag: true, color_category: 'purple', dayli_list_id: 2},
        {id: 4, action_title: 'Went to LHL loundge', description: 'Played a piano', redFlag: false, color_category: 'orange', dayli_list_id: 3},

        {id: 5, action_title: '1 hour workout', description: 'Have spent 1 hours in a gym', redFlag: false, color_category: 'orange', dayli_list_id: 4},
        {id: 6, action_title: '30 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 4},
        {id: 7, action_title: '60 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 4},

        {id: 8, action_title: '1 hour workout', description: 'Have spent 1 hours in a gym', redFlag: false, color_category: 'orange', dayli_list_id: 5},
        {id: 9, action_title: '30 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 5},
        {id: 10, action_title: '60 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 5},
        
        {id: 11, action_title: '1 hour workout', description: 'Have spent 1 hours in a gym', redFlag: false, color_category: 'orange', dayli_list_id: 6},
        {id: 12, action_title: '30 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 6},
        {id: 13, action_title: '60 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 6},

        {id: 14, action_title: '1 hour workout', description: 'Have spent 1 hours in a gym', redFlag: false, color_category: 'orange', dayli_list_id: 7},
        {id: 15, action_title: '30 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 7},
        {id: 16, action_title: '60 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 7},

        {id: 17, action_title: '1 hour workout', description: 'Have spent 1 hours in a gym', redFlag: false, color_category: 'orange', dayli_list_id: 8},
        {id: 18, action_title: '30 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 8},
        {id: 19, action_title: '60 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 8},

        {id: 20, action_title: '1 hour workout', description: 'Have spent 1 hours in a gym', redFlag: false, color_category: 'orange', dayli_list_id: 9},
        {id: 21, action_title: '30 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 9},
        {id: 22, action_title: '60 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 9},

        {id: 23, action_title: '1 hour workout', description: 'Have spent 1 hours in a gym', redFlag: false, color_category: 'orange', dayli_list_id: 10},
        {id: 24, action_title: '30 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 10},
        {id: 25, action_title: '60 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 10},

        {id: 26, action_title: '1 hour workout', description: 'Have spent 1 hours in a gym', redFlag: false, color_category: 'orange', dayli_list_id: 11},
        {id: 27, action_title: '30 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 11},
        {id: 28, action_title: '60 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 11},

        {id: 29, action_title: '1 hour workout', description: 'Have spent 1 hours in a gym', redFlag: false, color_category: 'orange', dayli_list_id: 12},
        {id: 30, action_title: '30 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 12},
        {id: 31, action_title: '60 minutes reading', description: 'reading', redFlag: false, color_category: 'blue', dayli_list_id: 12},



      ])
  })
  return createAction;

};

