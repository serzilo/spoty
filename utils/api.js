const axios = require('axios');
const querystring = require('querystring');
const ramda = require('ramda');
const credentialsConfig = require('@configs/credentials');
const apiConfig = require('@configs/api');


const getToken = () => {
	const endpoint = 'https://accounts.spotify.com/api/token';
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
			console.log('// getToken END');

			return response.data;
		})
		.catch((error) => {
			console.log('error');
			console.log(error);
		});
};

const searchArtist = (query, authData) => {
	console.log('// searchArtist');

	const endpoint = `${apiConfig.url}search?q=${query}&type=artist`;
	const config = {
		headers: {'Authorization': `${authData.token_type} ${authData.access_token}`},
	};

	return axios.get(
		endpoint,
		config,
	)
		.then(response => {
			console.log('result');
			console.log(response.data);
		})
		.catch(error => {
			console.error('error');
			console.log(error);
			console.log(error.message);
		});
	};

module.exports = {
	getToken,
	searchArtist,
};