const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define the paths for express configuration
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials' )

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup the static directory to serve 
app.use(express.static(publicDir))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Shawndale Shogbamimu'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'This is the About Page',
        name: 'Shawndale Shogbamimu'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'This is the Help Page',
        message:'Please wait an aassistant will be with you shortly to answer any of your queries',
        name: 'Shawndale Shogbamimu'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You need to provide a valid address'
        })
    }
   

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
    
    forecast(latitude, longitude, (error, forecastData) => {
        if(error){
            return res.send({
                error
            })
        }
    
        res.send({
        forecast:forecastData,
        address: req.query.address,
        location,
 
      })
    })
    

    
    })
})

app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    
    })

})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Shanwdale Shogbamimu',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Shawndale Shogbamimu',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})