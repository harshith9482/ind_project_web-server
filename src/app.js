const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./geocode')
const forecast = require('./forecast')


const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))

hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather '
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page ',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page'
    })
})

app.get('/weather', (req, res) => {
    // res.render('weather', {
    //     title:"Weather "
    // })
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address! '
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send(error)
            }

            res.send({
                address : req.query.address,
                location,
                forecast : forecastData
            })
        })
    })
})



//to show 404 error
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage : 'oops something went wrong!'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})
