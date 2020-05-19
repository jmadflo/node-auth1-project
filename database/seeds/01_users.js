
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'dummyUser1', password: 'unsafePassword1'},
        {id: 2, username: 'dummyUser2', password: 'unsafePassword2'}
      ]);
    });
};
