const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe.model')
//Get All
router.get('/',  async(req, res) =>{
    try{
        const recipe = await Recipe.find()
        res.json(recipe)
    }catch (err){
        res.status(500).json({message: err.message})
    }
})
//Get one

router.get('/:name', getRecipe2, (req, res) =>{
    res.json(res.recipe)
})
router.get('/:id', getRecipe, (req, res) =>{
    res.json(res.recipe)
})
//Create one
router.post('/',  async (req, res) =>{
    const recipe = new Recipe({
        name: req.body.name,
        image: "",
        isPublic: false,
        servings: 0,
        prepTime: 0,
        cookTime:0,
        ingredients:[],
        appliances:[],
        steps:[],

    })
    try {
        const newRecipe= await recipe.save()
        res.status(201).json(newRecipe)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Update One
router.patch('/:name', getRecipe2,  async(req, res) =>{
    if(req.body.name != null){
        res.recipe.name = req.body.name
    }
    if(req.body.image != null){
        res.recipe.image = req.body.image
    }
    if(req.body.isPublic != null){
        res.recipe.isPublic = req.body.isPublic
    }
    if(req.body.servings != null){
        res.recipe.servings = req.body.servings
    }
    if(req.body.prepTime != null){
        res.recipe.prepTime = req.body.prepTime
    }
    if(req.body.cookTime != null){
        res.recipe.cookTime = req.body.cookTime
    }
    if(req.body.ingredients != null){
        res.recipe.ingredients = req.body.ingredients
    }
    if(req.body.appliances != null){
        res.recipe.appliances = req.body.appliances
    }
    if(req.body.steps != null){
        res.recipe.steps = req.body.steps
    }
    try{
        const updatedRecipe = await res.recipe.save()
        res.status(200).json(updatedRecipe)
    }catch(err){
        res.status(400).json({message: err.message})
        console.log(err)
    }
})
//Delete One
router.delete('/:id', getRecipe,  async(req, res) =>{
    try{
        await res.recipe.deleteOne();
        res.json({message: "Deleted Recipe"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getRecipe(req, res, next){
    let recipe
    try{
        recipe = await Recipe.findById(req.params.id)
        if (recipe == null){
            return res.status(404).json({message: "Couldn't Find Recipe"})
        }
    }catch(err){
        return res.status(500).json({message: err.messege})
    }
    res.recipe = recipe
    next()
}
async function getRecipe2(req, res, next){
    let recipe
    try{
        recipe = await Recipe.findOne({name: req.params.name})
        if (recipe == null){
            return res.status(404).json({message: "Couldn't Find Recipe"})
        }
    }catch(err){
        return res.status(500).json({message: err.messege})
    }
    res.recipe = recipe
    next()
}
module.exports = router