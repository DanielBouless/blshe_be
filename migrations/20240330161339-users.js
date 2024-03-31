'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.createTable('users', { 
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type:Sequelize.STRING,
      allowNull:false
    },
      email: {
        type: Sequelize.STRING,
      allowNull:false
    },
      passwordDigest: {
        type: Sequelize.TEXT,
      allowNull: false
    }
    });
     
  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.dropTable('users');
  
  }
};
