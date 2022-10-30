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
