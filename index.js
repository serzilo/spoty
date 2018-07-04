const axios = require('axios');
const endpoints = require('./endpoints');
const credentials = require('./configs/credentials');


console.log('init');

const bodyParameters = {};
const config = {
	headers: {'Authorization': `Bearer ${credentials.clientSecret}`},
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
