'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'wakatime_api_key', {
      type: Sequelize.STRING,
      allowNull: true,
      default: null,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'wakatime_api_key');
  },
};
