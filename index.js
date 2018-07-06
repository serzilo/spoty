require('module-alias/register');
const api = require('@utils/api');
const ramda = require('ramda');

console.log('init');

api
	.searchArtist()
	// .searchAlbum()
	.then(result => {
		// console.log(ramda.pathOr([], ['data', 'artists', 'items'], result));
		// console.log(ramda.pathOr([], ['data', 'albums', 'items'], result));

		// console.log(result);
	});








