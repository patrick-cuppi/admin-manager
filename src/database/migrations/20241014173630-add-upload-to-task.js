'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn("tasks", "path", {
      type: Sequelize.DataTypes.STRING,
    });

    queryInterface.addColumn("tasks", "folder", {
      type: Sequelize.DataTypes.STRING,
    });

    queryInterface.addColumn("tasks", "type", {
      type: Sequelize.DataTypes.STRING,
    });

    queryInterface.addColumn("tasks", "filename", {
      type: Sequelize.DataTypes.STRING,
    });

    queryInterface.addColumn("tasks", "size", {
      type: Sequelize.DataTypes.INTEGER,
    });

  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("tasks", "path"),
      queryInterface.removeColumn("tasks", "folder"),
      queryInterface.removeColumn("tasks", "type"),
      queryInterface.removeColumn("tasks", "filename"),
      queryInterface.removeColumn("tasks", "size"),
    ]);
  }
};
