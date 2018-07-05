const axios = require('axios');
const querystring = require('querystring');
const credentials = require('@configs/credentials');


const getToken = () => {
	const encodedCredentials = Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString('base64');

	return axios
		.post(
			'https://accounts.spotify.com/api/token',
			querystring.stringify({ grant_type: 'client_credentials' }),
			{
				headers: {'Authorization': `Basic ${encodedCredentials}`},
			}
		)
		.then((response) => {
			console.log('result');
			console.log(response.data);
		})
		.catch((error) => {
			console.log('error');
			console.log(error);
		});
};

module.exports = {
	getToken,
};