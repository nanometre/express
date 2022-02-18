// SETUP /////////////////////////////////////////////////////////////
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const axios = require('axios')

let app = express();

app.set('view engine', 'hbs');

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));

let BASE_API_URL = "https://ckx-movies-api.herokuapp.com"

// ROUTE /////////////////////////////////////////////////////////////
app.get('/', async function(req,res){
    let response = await axios(BASE_API_URL + '/movies')
    // res.send(response.data)
    res.render('index.hbs', {
        movies: response.data
    })
})

app.get('/movie/add', function(req, res){
    res.render('add-movie.hbs')
})

app.post('/movie/add', async function(req, res){
    let {title, plot} = req.body;
    let payload = {title, plot}
    await axios.post(BASE_API_URL + '/movie/create', payload);
    res.redirect('/')
})

app.get('/movie/:movie_id/edit', async function(req,res){
    let movieId = req.params.movie_id;
    let response = await axios.get(BASE_API_URL + '/movie/' + movieId);

    let movie = response.data
    res.render('edit-movie.hbs', {
        movie: movie
    })
})

app.post('/movie/:movie_id/edit', async function(req, res){
    let payload = {
        title: req.body.title,
        plot: req.body.plot,
    }
    let movieId = req.params.movie_id
    await axios.patch(BASE_API_URL + '/movie/' + movieId, payload)
    res.redirect('/')
})

app.get('/movie/:movie_id/delete', async function(req, res){
    let movieId = req.params.movie_id;
    let response = await axios.get(BASE_API_URL + '/movie/' + movieId);
    
    let movie = response.data;
    res.render('delete-movie', {
        movie:movie
    })
})

app.post('/movie/:movie_id/delete', async function(req, res){
    let movieId = req.params.movie_id;
    await axios.delete(BASE_API_URL + '/movie/' + movieId);
    res.redirect('/')
})

// LISTEN ////////////////////////////////////////////////////////////
app.listen(3000, function(){
    console.log('Server started')
})