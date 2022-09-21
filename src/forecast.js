const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d4c0a0d9c41d69a1953ab872e3d1f374&query=' + longitude + ',' + latitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'it is currently ' + body.current.temperature + ' degrees out. it feels like ' + body.current.feelslike + ' degrees out. ')
        }
    })
}

module.exports = forecast