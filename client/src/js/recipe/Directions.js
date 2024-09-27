import { useContext } from "react"
import { RecipeContext } from "./Recipe"
import Step from "./Step"

export default function Directions(){
    const recipe = useContext(RecipeContext)
    return(
        <>
        <div className='recipeDirections'>
            <h2>Directions</h2>
            {recipe.steps.map((step, i)=>
                <Step 
                    key={i+1} 
                    step={step} 
                    position={i+1}
                />
            )}
        </div>
        </>
    )
}