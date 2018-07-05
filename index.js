require('module-alias/register');
const api = require('./utils/api');

console.log('init');

api
	.getToken()
	.then(result => {
		api.searchArtist('Muse', result)
	});





