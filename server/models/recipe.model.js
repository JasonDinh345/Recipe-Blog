const mongoose = require('mongoose')
const ingredientModel = require('./ingredient.model')

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    isPublic:{
        type:Boolean,
        required:true
    },
    servings:{
        type:Number,
        required:true
    },
    prepTime:{
        type:Number,
        required:true
    },
    cookTime:{
        type:Number,
        required:true
    },
    ingredients:[{
        name:{
            type: String,
            required: true
        },
        image:{
            type:String,
            required: true
        },
        quantity:{
            type:Number,
            required: true
        },
        unit:{
            type:String,
            required: true
        },
        isOptional:{
            type: Boolean,
            required: true
        },
    }],
    appliances:[{
        name:{
            type: String,
            required: true
        },
        image:{
            type:String,
            required: true
        }
    }],
    steps:[{
        direction:{
            type:String,
            required: true
        },
        ingredients:[{
            name:{
                type: String,
                required: true
            },
            image:{
                type:String,
                required: true
            },
            quantity:{
                type:String,
                required: true
            },
            unit:{
                type:String,
                required: true
            },
            isOptional:{
                type: Boolean,
                required: true
            },
            
        }]
    }]
})

module.exports = mongoose.model('Recipe', recipeSchema)