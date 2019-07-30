const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4a55b5c084a5c3112a69d4fd4dba68e2/'+ latitude + ','+ longitude +'?units=si';
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the weatcher service.', undefined);
        }else if(body.error){
            callback('Unable to find that location.', undefined);
        }else{
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain. Max temperature: ' + body.daily.data[0].temperatureHigh + '. Min temperature: ' + body.daily.data[0].temperatureLow);
        }
    });
};

module.exports = forecast; 