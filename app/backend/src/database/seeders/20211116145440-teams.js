module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'teams',
      [
        {
          team_name: 'Avaí/Kindermann',
        },
        {
          team_name: 'Bahia',
        },
        {
          team_name: 'Botafogo',
        },
        {
          team_name: 'Corinthians',
        },
        {
          team_name: 'Cruzeiro',
        },
        {
          team_name: 'Ferroviária',
        },
        {
          team_name: 'Flamengo',
        },
        {
          team_name: 'Grêmio',
        },
        {
          team_name: 'Internacional',
        },
        {
          team_name: 'Minas Brasília',
        },
        {
          team_name: 'Napoli-SC',
        },
        {
          team_name: 'Palmeiras',
        },
        {
          team_name: 'Real Brasília',
        },
        {
          team_name: 'Santos',
        },
        {
          team_name: 'São José-SP',
        },
        {
          team_name: 'São Paulo',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('teams', null, {});
  },
};

// SOURCE
// https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/9ae5c22e-c499-48fd-8fd2-516c8c1dd740/recording/1c66a464-8e2d-4c14-b5e9-f09d7a04a12e
