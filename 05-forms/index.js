// SETUP //////////////////
const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');

// create the express application
const app = express();
app.set('view engine', 'hbs'); // the second argument hbs as string, not the object

waxOn.on(hbs.handlebars);  // the first argument is the hbs object, not string
waxOn.setLayoutPath('./views/layouts'); 

app.use(express.static('public')); // set the static folder to public

// ENABLE FORMS
app.use(express.urlencoded({extended:false}));


// ROUTES /////////////////

// The route below is HTTP GET /add-food
app.get('/add-food', function(req,res){
    res.render('add-food')
})

// intercept the data of the form
// that is render at GET /add-food
app.post('/add-food', function(req,res){
    let foodName = req.body.foodName;
    let calories = req.body.calories;
    let meal = req.body.meal;
    let description = req.body.description;

    // LONG METHOD TO CONVERT CHECKBOXES RESULT INTO ARRAY
    // let tags = null;
    // // req.body.tags is truly if it contains something that is not undefined
    // if (req.body.tags) {
    //     // req.body.tags is either a single string or an array of strings
    //     if (Array.isArray(req.body.tags)) {
    //         tags = req.body.tags;
    //     } else {
    //         // req.body.tags is a single string
    //         tags = [ req.body.tags ]
    //     }

    // } else {
    //     // req.body.tags is undefined then we set tags to be an empty array
    //     tags = [];
    // }

    // SHORT METHOD TO CONVERT CHECKBOXES RESULTS INTO ARRAY
    let tags = req.body.tags || [];
    tags = Array.isArray(tags) ? tags : [tags];

    console.log(req.body);
    console.log("tags=", tags);
    res.send("Form recieved");
})

// LISTEN //////////////////////
app.listen(3000, function(){
    console.log("Server has started")
})