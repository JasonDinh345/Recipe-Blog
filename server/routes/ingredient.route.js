const express = require('express')
const router = express.Router()
const Ingredient = require('../models/ingredient.model')
//Get All
router.get('/',  async(req, res) =>{
    try{
        const ingredient = await Ingredient.find()
        res.status(200).json(ingredient)
    }catch (err){
        res.status(500).json({message: err.message})
    }
})
//Get one
router.get('/:id', getIngredient, (req, res) =>{
    res.json(res.ingredient)
})

//Create one
router.post('/',  async (req, res) =>{
    const ingredient = new Ingredient({
        name: req.body.name,
        image: req.body.image
    })
    try {
        const newIngredient = await ingredient.save()
        res.status(201).json(newIngredient)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Update One
router.patch('/:id', getIngredient,  async(req, res) =>{
    if(req.body.name != null){
        res.ingredient.name = req.body.name
    }
    if(req.body.image != null){
        res.ingredient.image = req.body.image
    }
    
    try{
        const updatedIngredient = await res.ingredient.save()
        res.json(updatedIngredient)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Delete One
router.delete('/:id', getIngredient,  async(req, res) =>{
    try{
        await res.ingredient.deleteOne();
        res.json({message: "Deleted Ingredient"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getIngredient(req, res, next){
    let ingredient
    try{
        ingredient = await Ingredient.findById(req.params.id)
        if (ingredient == null){
            return res.status(404).json({message: "Couldn't Find Ingredient"})
        }
    }catch(err){
        return res.status(500).json({message: err.messege})
    }
    res.ingredient = ingredient
    next()
}
module.exports = router