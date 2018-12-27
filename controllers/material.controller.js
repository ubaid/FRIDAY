const config = require('../config/config');
const { reE, reS } = require('../services/util.service');

const score = async(req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // eslint-disable-next-line prefer-destructuring
  const materials = req.body.materials;
  const materialsCount = materials.length;
  if (materialsCount > config.scoring.maxIPSize) {
    return reE(res, 'Payload exceeds allowed limit.', 413);
  }

  materials.forEach((element) => {
    element.score = 1;
  });

  return reS(res, { materials }, 200);
};

module.exports.score = score;
