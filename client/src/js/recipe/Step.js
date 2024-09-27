import Ingredient from "./Ingredient"
export default function Step({step, position}){
    return(
        <>
        <div className="recipeStep">
            <h3>Step {position}:</h3>
            <p>{step.direction}</p>
            <ul className="recipeStep-ingredients">
                {step.ingredients.map((ingredient, i)=>
                    <Ingredient ingredient={ingredient} key={i+1}/>
                )}
           </ul>
        </div>
        </>
    )
}