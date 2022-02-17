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

//ROUTE
app.get('/add-food', (req,res)=>{
    res.render('add-food')
})

app.post('/add-food', (req,res)=>{
    let foodName = req.body.foodName;
    let calories = req.body.calories;
    let tags = req.body.tags || [];
    tags = Array.isArray(tags) ? tags : [tags];
    console.log(tags)
    res.render("display-food-summary", {
        foodName,
        calories,
        tags: tags

    })
})

// HANDS ON A//////////////////////////////////
app.get('/calculate-bmi', function (req,res){
    res.render('calculate-bmi')
})

app.post('/calculate-bmi', function(req,res){
    let w = req.body.weight;
    let h = req.body.height;
    let bmi = w / (h ** 2)
    res.render('display-bmi', {
        bmi:bmi
    })
})

// HANDS ON B ///////////////////////////////
app.get('/fruits', function(req, res){
    res.render('fruits.hbs')
})

app.post('/fruits', function(req, res){
    let items = req.body.items || [];
    items = Array.isArray(items) ? items : [items];
    let totalCost = 0;
    let fruitObject = {
        apple: 3,
        durian: 15,
        orange: 6,
        banana: 4,
    }
    // REDUCE METHOD /////////////////////////////////////
    totalCost = items.reduce(function(previous, current){
        return previous + fruitObject[current]
    }, 0);

    // OBJECT METHOD /////////////////////////////////////
    // if (items == []) {

    // } else {
    //     for (let item of items) {
    //         totalCost += fruitObject[item];
    //     }
    // }

    res.send("Total cost is $" + totalCost);
})

// HANDS ON C /////////////////////////////////////////
app.get('/lost-and-found', function(req,res){
    res.render('lost-and-found.hbs')
})

app.listen(3000, function(){
    console.log("Server has started")
})
