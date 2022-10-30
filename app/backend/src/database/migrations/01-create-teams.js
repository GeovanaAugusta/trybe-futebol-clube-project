'use strict';

module.exports = {
async up (queryInterface, Sequelize) {
const TeamsTable = await queryInterface.createTable('teams', {
id: {
allowNull: false,
autoIncrement: true,
primaryKey: true,
type: Sequelize.INTEGER
},
team_name: {
  type: Sequelize.STRING,
  allowNull: false,
},
});
return TeamsTable;
},

async down (queryInterface) {
await queryInterface.dropTable('teams');
}
};

