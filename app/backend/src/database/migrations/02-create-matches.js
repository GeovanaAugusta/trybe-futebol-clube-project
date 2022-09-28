'use strict';

module.exports = {
async up (queryInterface, Sequelize) {
const MatchesTable = await queryInterface.createTable('matches', {
id: {
allowNull: false,
autoIncrement: true,
primaryKey: true,
type: Sequelize.INTEGER
},
home_team: {
  type: Sequelize.INTEGER,
  allowNull: false,
  foreignKey: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  references: {
    model: 'teams',
    key: 'id',
  },
},
home_team_goals: {
  type: Sequelize.INTEGER,
  allowNull: false,
},
away_team: {
  type: Sequelize.INTEGER,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  allowNull: false,
  foreignKey: true,
  references: {
    model: 'teams',
    key: 'id',
  },
},
away_team_goals: {
  type: Sequelize.INTEGER,
  allowNull: false,
},
in_progress: {
  type: Sequelize.INTEGER,
  allowNull: false,
}
});
return MatchesTable;
},

async down (queryInterface) {
await queryInterface.dropTable('matches');
}
};

// SOURCE
// https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/9ae5c22e-c499-48fd-8fd2-516c8c1dd740/recording/1c66a464-8e2d-4c14-b5e9-f09d7a04a12e
