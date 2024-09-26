const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express();
const session = require('express-session');
const mongoose = require('mongoose')
const path = require('path');


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;

db.on('error', (error)  => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));

app.use("/public", express.static(process.env.PUBLIC_FILEPATH, + '/public'));
app.use('/src', express.static(path.join(process.env.PUBLIC_FILEPATH, 'src')));


app.get('/', (req, res) =>{
    res.sendFile(path.join(process.env.PUBLIC_FILEPATH, 'public', 'index.html'));
})


const ingredientRouter = require('./routes/ingredient.route')
app.use('/ingredient', ingredientRouter)

const userRouter = require('./routes/user.route')
app.use('/user', userRouter)

const recipeRouter = require('./routes/recipe.route')
app.use('/recipe', recipeRouter)

const oauthRouter = require('./routes/oauth.route')
app.use('/oauth', oauthRouter)



app.get('/session', (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });

app.listen(3000, () =>{
    console.log("Server Started")
})