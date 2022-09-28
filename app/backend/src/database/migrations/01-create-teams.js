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

// SOURCE
// https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/9ae5c22e-c499-48fd-8fd2-516c8c1dd740/recording/1c66a464-8e2d-4c14-b5e9-f09d7a04a12e
