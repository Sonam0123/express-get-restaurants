const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//middleware
app.use(express.json());

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})


app.get("/restaurants/:id", async (req, res) => {
    
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant);
})

app.post("/restaurants", async (req, res) => {
    const restaurant = await Restaurant.create(req.body);
    res.json(restaurant);
})

//Create an express route for updating (replacing) an existing restaurant with a new restaurant on your restaurant database based on ID in the route. For example, restaurant/2 would update the restaurant with an ID of 2.

app.put("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    restaurant.name = req.body.name;
    restaurant.cuisine = req.body.cuisine;
    res.json(restaurant);
})


//Create an express route for deleting (removing) a restaurant on your database based on the id in the route. For example, restaurant/2 would delete the restaurant with an ID of 2.

app.delete("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    restaurant.destroy();
    res.json(restaurant);
})



app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})