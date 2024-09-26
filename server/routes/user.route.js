const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
//Get All
router.get('/',  async(req, res) =>{
    try{
        const user = await User.find()
        res.json(user)
    }catch (err){
        res.status(500).json({message: err.message})
    }
})
//Get one
router.get('/:id', getUser, (req, res) =>{
    res.json(res.user)
})
//Create one
router.post('/',  async (req, res) =>{
    const user = await User.findOne({ email: req.body.email });
    if(user != null){
        return res.status(401).json({ message: 'Email already exists!' });
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            role:"user",
            password: hashedPassword
        })
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//login
router.post('/login', async (req,res) =>{
    const user = await User.findOne({ username: req.body.username });
    if (user == null){
        return res.status(404).json({message: "Couldn't Find User"})
    }
    try{
        const passwordMatch = await(bcrypt.compare(req.body.password, user.password))
        if(passwordMatch){
            req.session.user = {username: req.body.username, role: user.role};
        
            res.status(200).json({ message: 'Login successful', user: req.session.user});
        }else{
            res.status(401).json({ message: 'Invalid username or password' });
        }
    }catch{
        res.status(500).send()
    }
})
//logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.send('Error logging out');
      }
      res.redirect('/'); 
    });
  });
//Update One
router.patch('/:id', getUser,  async(req, res) =>{
    if(req.body.username != null){
        res.user.username = req.body.username
    }
    if(req.body.email != null){
        res.user.email = req.body.email
    }
    if(req.body.password != null){
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        res.user.password = hashedPassword
    }
    if(req.body.role != null){
        res.user.role = req.body.role
    }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Delete One
router.delete('/:id', getUser,  async(req, res) =>{
    try{
        await res.user.deleteOne();
        res.json({message: "Deleted User"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getUser(req, res, next){
    let user
    try{
        user = await User.findById(req.params.id)
        if (user == null){
            return res.status(404).json({message: "Couldn't Find User"})
        }
    }catch(err){
        return res.status(500).json({message: err.messege})
    }
    res.user = user
    next()
}
module.exports = router