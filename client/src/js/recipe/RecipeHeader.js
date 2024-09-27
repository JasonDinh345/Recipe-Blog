import { useContext } from "react"
import { RecipeContext } from "./Recipe"

export default function RecipeHeader(){
    const  recipe = useContext(RecipeContext)
    return(
        <>
        <div className='recipeHeader'>
            <h1 style={{width:"50%"}}>{recipe.name}</h1>
            <div className='recipeMisc'>
                <h2>Prep Time: {recipe.prepTime}min </h2>
                <h2>Cook Time: {recipe.cookTime}min </h2>
                <h2>Servings: {recipe.servings} </h2>
            </div>
        </div>
       
        </>
    )
}