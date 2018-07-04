const config = require('./config');

const endpoints = {
	artists: q => {
		return `${config.url}search?q=${q}&type=artist`;
	}
};

module.exports = endpoints;