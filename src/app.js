const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirectoryFile = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryFile));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ivan Grosse'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided.'
        })
    }
    
    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if(error){
          return  res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
    })


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ivan Grosse'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Example message for help view.',
        name: 'Ivan Grosse'
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: 'Help',
        name: 'Ivan Grosse',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: 'Page not found',
        name: 'Ivan Grosse',
        error: 'The page that you specified was not found. Please return to the home.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});