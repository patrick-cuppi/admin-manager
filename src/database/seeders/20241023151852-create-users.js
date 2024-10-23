'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', 
      [
        {
          name: 'Admin User',
          email: "admin@example.com",
          password_hash: "",
          role: "admin",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Manager User',
          email: "manager@example.com",
          password_hash: "",
          role: "manager",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        }
    ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});
  
  }
};
