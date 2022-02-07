const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5f490e84192fb90ffad3e711acc8551c&query=${latitude},${longitude}&units=m`;
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.');
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            const {
                temperature,
                feelslike,
                weather_descriptions,
            } = body.current;

            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out, but it feels like ${feelslike} degrees.`);
        }
    });
};

module.exports = forecast;