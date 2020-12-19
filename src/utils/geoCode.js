const request = require("request");

const geoCode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1Ijoibml0emFubWFpemVsIiwiYSI6ImNraXJ5a2R3dDBmbTcycXNjd2g0bmNzb2UifQ.LDvf1a3KYunGnZR6oRI1og&limit=1`;

	request({ url, json: true }, (error, response) => {
		if (error) {
			callback("Unable to connect to weather service!");
		} else if (response.body.features.length === 0) {
			callback(`Unable to find location, Try another search.`);
		} else {
			callback(undefined, {
				latitude: response.body.features[0].center[1],
				longitude: response.body.features[0].center[0],
				location: response.body.features[0].place_name,
			});
		}
	});
};

module.exports = geoCode;

// 1. regular fetch request===>
// const geocodeURL =
// 	"https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoibml0emFubWFpemVsIiwiYSI6ImNraXJ5a2R3dDBmbTcycXNjd2g0bmNzb2UifQ.LDvf1a3KYunGnZR6oRI1og&limit=1";

// request({ url: geocodeURL, json: true }, (error, response) => {
// 	if (error) {
// 		failedMessage("Unable to connect to weather service!");
// 	} else if (response.body.features.length === 0) {
// 		failedMessage(`Unable to find matching result`);
// 	} else {
// const longitude = response.body.features[0].center[0];
// const latitude = response.body.features[0].center[1];
// successMessage(`Longitude: ${longitude}. latitude: ${latitude}. `);
// 	}
// });
