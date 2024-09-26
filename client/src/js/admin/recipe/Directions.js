import { RecipeContext } from "./AdminRecipe";
import AdminStep from "./AdminStep";

export default function Directions({dispatch, steps}){
    return(
        <>
        <RecipeContext.Consumer>
            {recipe=>(
                <div className='recipeDirections'>
                <h2>Directions</h2>
                    
                    {steps.map((step, i) =>
                   
                        <AdminStep 
                            key={i+1} 
                            step={step} 
                            position={i+1}  
                            dispatch={dispatch}
                        >
                        </AdminStep>
                    )}
                
                    <button onClick={()=>dispatch({type:"add-step"})}>Add Step</button>
                </div>
    
            )}
        </RecipeContext.Consumer>
        </>
    )
}