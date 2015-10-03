var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('request');

function requestStringBuilder (argument) {
	return requestString = config.api.directions.url + "origin=" + req.body['from'] 
	+ "&destination=" + req.body['to']
	+ "&key" + config.api.directions.key;
}

router.post('/directions', function (req, res, next) {
	var requestString = config.api.directions.url + "origin=" + req.body['from'] 
	+ "&destination=" + req.body['to']
	+ "&key" + config.api.directions.key;

	request(requestString, function (err, resheaders, res) {
		var mapsjson = JSON.parse(res);
		var steps = mapsjson.routes[0].legs[0].steps
		for (var i = 0; i < steps.length; i++) {
			
			var html_instructions = steps[i].html_instructions;
			if (html_instructions.toLowerCase().indexOf("parkway") > -1) {
				// 
				console.log('found the parkway: \n\n');
				console.log(html_instructions);
			var startlatlon = steps[i-1]["end_location"];
			var endlatlon = steps[i+1]["start_location"];
				console.log('parkway starts at');
				console.log(startlatlon); 
				console.log("and ends at");
				console.log(endlatlon);
			};


		};
	});
	
	res.send("thanks for all the fish\n");
});

module.exports = router;
