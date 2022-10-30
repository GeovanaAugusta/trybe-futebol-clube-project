'use strict';

module.exports = {
async up (queryInterface, Sequelize) {
const UsersTable = await queryInterface.createTable('users', {
id: {
allowNull: false,
autoIncrement: true,
primaryKey: true,
type: Sequelize.INTEGER
},
username: {
  type: Sequelize.STRING,
  allowNull: false,
},
role: {
  type: Sequelize.STRING,
  allowNull: false,
},
email: {
  type: Sequelize.STRING,
  allowNull: false,
},
password: {
  type: Sequelize.STRING,
  allowNull: false,
},
});
return UsersTable;
},

async down (queryInterface) {
await queryInterface.dropTable('users');
}
};
