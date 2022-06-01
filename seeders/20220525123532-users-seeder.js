'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Bagus',
          profession: 'admin',
          email: 'bagusoktaviadi1@gmail.com',
          password: await bcrypt.hash('123456', 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Student',
          profession: 'student',
          email: 'student@gmail.com',
          password: await bcrypt.hash('123456', 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
