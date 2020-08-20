module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users',
    [
      {
        admin: true,
        firstName: 'Lucas',
        lastName: 'Sousa',
        email: 'lucas@gmail.com',
        passwordHash: 'eed50a187fd69b89ee137f41054355ca14ea48a24300b0571325b50b60964097167cfd1385b499e97b5d61f8a4112722afb1eeb5cd1d87dc2681ea595ea3ee23', // senha: botafogo
        salt: 'd6bd3490b347eca1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
