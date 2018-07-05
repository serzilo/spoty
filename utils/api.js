const axios = require('axios');
const querystring = require('querystring');
const credentialsConfig = require('@configs/credentials');
const apiConfig = require('@configs/api');


const getToken = () => {
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
			console.log('// getToken');
			console.log(response.data);

			return response.data;
		})
		.catch((error) => {
			console.log('getToken error');
			console.log(error);
		});
};


const searchArtist = (query, authData) => {
	console.log('// searchArtist');

	return _search(query, 'artist', authData);
};


const searchAlbum = (query, authData) => {
	console.log('// searchAlbum');

	return _search(query, 'album', authData);
};


const _search = (query, type, authData) => {
	const endpoint = `${apiConfig.url}search?q=${query}&type=${type}`;
	const config = {
		headers: {'Authorization': `${authData.token_type} ${authData.access_token}`},
	};

	return axios
		.get(
			endpoint,
			config,
		)
		.then(response => {
			console.log('search result');
			console.log(response.data);

			return response;
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