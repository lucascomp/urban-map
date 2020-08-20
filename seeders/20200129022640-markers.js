module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Markers',
    [
      {
        userId: 1,
        accessibilityId: 1,
        lat: -22.909299,
        lng: -43.182624,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et purus nec magna fermentum efficitur. Aliquam nec est quis urna egestas efficitur vel sit amet elit. Aenean sit amet mauris dolor. Praesent eleifend urna ac libero maximus, in pellentesque velit tristique. Mauris at ligula ac orci aliquet dignissim. Vivamus blandit id libero quis dapibus. Donec vitae euismod sem. Sed eget consectetur quam. Mauris maximus id ipsum vitae facilisis. Praesent eu lobortis dui, eget scelerisque diam.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        accessibilityId: 2,
        lat: -22.913893,
        lng: -43.183562,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et purus nec magna fermentum efficitur. Aliquam nec est quis urna egestas efficitur vel sit amet elit. Aenean sit amet mauris dolor. Praesent eleifend urna ac libero maximus, in pellentesque velit tristique. Mauris at ligula ac orci aliquet dignissim. Vivamus blandit id libero quis dapibus. Donec vitae euismod sem. Sed eget consectetur quam. Mauris maximus id ipsum vitae facilisis. Praesent eu lobortis dui, eget scelerisque diam.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        accessibilityId: 3,
        lat: -22.903969,
        lng: -43.177850,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et purus nec magna fermentum efficitur. Aliquam nec est quis urna egestas efficitur vel sit amet elit. Aenean sit amet mauris dolor. Praesent eleifend urna ac libero maximus, in pellentesque velit tristique. Mauris at ligula ac orci aliquet dignissim. Vivamus blandit id libero quis dapibus. Donec vitae euismod sem. Sed eget consectetur quam. Mauris maximus id ipsum vitae facilisis. Praesent eu lobortis dui, eget scelerisque diam.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Markers', null, {}),
};
