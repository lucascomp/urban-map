module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Accessibilities',
    [
      {
        name: 'Rampa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sinal sonoro',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Acesso para deficientes visuais',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Libras',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Braile',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Accessibilities', null, {}),
};
