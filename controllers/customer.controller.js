const CONFIG = require('../config/config');
const { to, ReE, ReS } = require('../services/util.service');

const score = async function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	
	let customers = req.body.customers;
	const customersCount = customers.length;
	if (customersCount > CONFIG.scoring_max_ip_size) return ReE(res, 'Payload exceeds allowed limit.', 413);

	customers.forEach(element => {
		element.score = 1;
	});

	return ReS(res, { customers }, 200);
}

module.exports.score = score;