const CONFIG = require('../config/config');
const { to, ReE, ReS } = require('../services/util.service');

const score = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const materials = req.body.materials;
  const materialsCount = materials.length;
  if (materialsCount > CONFIG.scoring_max_ip_size) return ReE(res, 'Payload exceeds allowed limit.', 413);

  materials.forEach((element) => {
    element.score = 1;
  });

  return ReS(res, { materials }, 200);
};

module.exports.score = score;
