const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=5d2ff90952d3350c52994d1a55643ef4&query=${latitude},${longitude}`;
	console.log(url);
	request({ url, json: true }, (error, response) => {
		if (error) {
			callback("Unable to connect to weather service!");
		} else if (response.body.error) {
			callback(`Unable to find location`);
		} else {
			console.log(response);
			const { temperature, feelslike, weather_descriptions } = response.body.current;
			const { localtime } = response.body.location;
			callback(
				undefined,
				`${weather_descriptions}.
				 It is currently ${temperature}${"\u00B0"} out.
				 It feels like ${feelslike}${"\u00B0"} out.
				 ${localtime}   `
			);
		}
	});
};

module.exports = forecast;

// 1. regular fetch request===>
// const url =
// 	"http://api.weatherstack.com/current?access_key=5d2ff90952d3350c52994d1a55643ef4&query=37.8267,-122.4233&units=f";

// request({ url: url, json: true }, (error, response) => {
// 	//Short syntax ===>
// 	// error
// 	// 	? failedMessage("Unable to connect to weather service!")
// 	// 	: successMessage(
// 	// 			`${response.body.current.weather_descriptions}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out. `
// 	// 	  );
// 	// }

// 	//Long syntax ===>
// if (error) {
// 	failedMessage("Unable to connect to weather service!");
// } else if (response.body.error) {
// 	failedMessage(`Unable to find location`);
// } else {
// 	const { temperature, feelslike, weather_descriptions } = response.body.current;
// 	successMessage(
// 		`${weather_descriptions}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. `
// 	);
// }
// });
