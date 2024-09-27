import { useContext } from "react"
import { RecipeContext } from "./Recipe"
import Ingredient from "./Ingredient"
export default function RecipeIngredients(){
    const recipe = useContext(RecipeContext)
    return(
        <>
        <div className='recipeIngredients'>
            <h2>Ingredients</h2>
            {recipe.ingredients.map((ingredient, i)=>
                <Ingredient ingredient={ingredient} key={i+1}/>
            )}
        </div>
        </>
    )
}