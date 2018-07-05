require('module-alias/register');
const api = require('@utils/api');
const ramda = require('ramda');

console.log('init');

api
	.getToken()
	.then(auth => {
		// return api.searchArtist('Muse', auth);
		return api.searchAlbum('paradigm', auth);
	})
	.then(result => {
		console.log(ramda.pathOr([], ['data', 'artists', 'items'], result));
		console.log(ramda.pathOr([], ['data', 'albums', 'items'], result));
	});





