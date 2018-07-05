require('module-alias/register');
const axios = require('axios');
const querystring = require('querystring');
const endpoints = require('./endpoints');
const utils = require('./utils/api');

console.log('init');

utils.getToken();




// const bodyParameters = {};
// const config = {
// 	headers: {'Authorization': `Bearer ${credentials.clientSecret}`},
// };
//
// console.log(endpoints.artists('muse'));
// console.log(config);
//
// axios.get(
//     endpoints.artists('muse'),
//     bodyParameters,
// 	config,
// )
//     .then(function (response) {
//         console.log('result');
//         console.log(response);
//     })
// 	.catch(function (error) {
// 		console.error('error');
// 		console.log(error.message);
// 		// console.log(error);
// 	});
