const { Accessibility } = require('../models');

const getAll = async (ctx) => {
  const accessibilities = await Accessibility.findAll({
    attributes: ['id', 'name'],
    raw: true,
  });

  ctx.body = accessibilities;
};

module.exports = {
  getAll,
};
