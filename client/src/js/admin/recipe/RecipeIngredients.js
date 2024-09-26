import Ingredient from "../../recipe/Ingredient"
export default function RecipeIngredients({totalIngredients}){
    return(
        <>
        <div className='recipeIngredients'>
            <h2>Ingredients</h2>
            {totalIngredients.map((ingredient, i)=>
                <Ingredient ingredient={ingredient} key={i+1}/>
            )}
        </div>
        </>
    )
}