const axios = require('axios');
const endpoints = require('./endpoints');


console.log('init');

const TOKEN = 'hdsfhkgksdfkgsdg';

const bodyParameters = {};
const config = {
	headers: {'Authorization': `bearer ${TOKEN}`},
};

axios.get(
    endpoints.artists('a'),
    bodyParameters,
	config,
)
    .then(function (response) {
        console.log('result');
        console.log(response);
    })
	.catch(function (error) {
		console.error('error');
		console.log(error.message);
		console.log(error);
	});
