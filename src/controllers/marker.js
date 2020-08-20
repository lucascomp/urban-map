const { Op } = require('sequelize');
const { Accessibility, Marker } = require('../models');

const getAll = async (ctx) => {
  const {
    north,
    south,
    east,
    west,
  } = ctx.query;

  if (!north) {
    ctx.throw(400, "O parâmetro 'north' deve ser informado");
  }

  if (!south) {
    ctx.throw(400, "O parâmetro 'south' deve ser informado");
  }

  if (!east) {
    ctx.throw(400, "O parâmetro 'east' deve ser informado");
  }

  if (!west) {
    ctx.throw(400, "O parâmetro 'west' deve ser informado");
  }

  const where = {
    lat: {
      [Op.between]: [parseFloat(south), parseFloat(north)],
    },
    lng: {
      [Op.between]: [parseFloat(west), parseFloat(east)],
    },
  };

  const markers = await Marker.findAll({
    attributes: [
      'id',
      'lat',
      'lng',
      'description',
    ],
    include: [{
      model: Accessibility,
      as: 'accessibility',
      attributes: ['id', 'name'],
    }],
    raw: true,
    where,
  });

  ctx.body = markers;
};

const create = async (ctx) => {
  const {
    lat,
    lng,
    description,
    accessibilityId,
  } = ctx.request.body;

  const { id: userId } = ctx.state.user;

  await Marker.create({
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    userId,
    accessibilityId: parseInt(accessibilityId, 10),
    description,
  });

  ctx.status = 200;
};

const edit = async (ctx) => {
  const { admin } = ctx.state.user;

  if (!admin) {
    ctx.throw(401, 'Apenas usuário admin pode realizar edições');
  }

  const {
    id,
    lat,
    lng,
    description,
    accessibilityId,
  } = ctx.request.body;

  await Marker.update({
    lat,
    lng,
    description,
    accessibilityId,
  }, { where: { id } });

  ctx.status = 200;
};

module.exports = {
  getAll,
  create,
  edit,
};
