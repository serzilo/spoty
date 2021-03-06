const axios = require('axios');
const querystring = require('querystring');
const ramda = require('ramda');
const credentialsConfig = require('@configs/credentials');
const apiConfig = require('@configs/api');


let authData = {
	access_token: null,
	token_type: null,
	expires_in: null,
};

const searchWordsArray = ['a', 'b', 'c', 'm'];
let currentIndex = 0;


const getToken = () => {
	console.log('// getToken');

	const endpoint = apiConfig.getTokenUrl;
	const encodedCredentials = Buffer.from(`${credentialsConfig.clientId}:${credentialsConfig.clientSecret}`).toString('base64');
	const credentials = querystring.stringify({ grant_type: 'client_credentials' });

	const config = {
		headers: {'Authorization': `Basic ${encodedCredentials}`},
	};

	return axios
		.post(
			endpoint,
			credentials,
			config
		)
		.then((response) => {
			console.log('// getToken result');

			authData = response.data;

			console.log('authData: ', authData);
		})
		.catch((error) => {
			console.log('// getToken error');
			console.log(error);
		});
};


const searchArtist = () => {
	console.log('// searchArtist');

	return _search(searchWordsArray[currentIndex], 'artist');
};


const searchAlbum = () => {
	console.log('// searchAlbum');

	return _search(searchWordsArray[currentIndex], 'album');
};

const _getNextWord = () => {
	currentIndex += 1;

	if (searchWordsArray[currentIndex]) {
		return searchWordsArray[currentIndex];
	}

	return false;
};


const _search = (
	query = '',
	type = 'artist',
	endpoint = `${apiConfig.url}search?q=${query}&type=${type}&limit=50`,
) => {
	console.log('_search', query, type);

	if (!authData.access_token) {
		return getToken()
			.then(() => {
				return _search(query, type);
			});
	}

	const config = {
		headers: {'Authorization': `${authData.token_type} ${authData.access_token}`},
	};

	const keysMap = {
		artist: 'artists',
		album: 'albums',
	};

	return axios
		.get(
			endpoint,
			config,
		)
		.then(response => {
			console.log('// search result ----------------------------------------');
			console.log(response.data);

			const nextLink = ramda.pathOr(false, ['data', keysMap[type], 'next'], response);

			console.log('nextLink: ', nextLink);

			// if (nextLink) {
			// 	setTimeout(() => {
			// 		_search(null, type, nextLink);
			// 	}, 500);
			// }

			const nextQueryWord = _getNextWord();

			if (nextQueryWord) {
				_search(nextQueryWord, type);
			}

		})
		.catch(error => {
			console.log('ERROR _search: ', error);
			console.log('ERROR message: ', error.message);
			console.log('ERROR status: ', error.response.status);

			return error;
		});
};


module.exports = {
	getToken,
	searchArtist,
	searchAlbum,
};