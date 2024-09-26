
import { RecipeContext } from './AdminRecipe';
import ToggleSwitch from '../../components/ToggleSwitch';
import NumberInput from '../../components/NumberInput';

export default function RecipeHeader({ handleChange, isPublic, cookTime, prepTime, servings}){
   
   
    
    return(
        <>
        <RecipeContext.Consumer>
            {recipe =>(
                <div className='recipeHeader'>
                <h1 style={{width:"50%"}}>{recipe.name}</h1>
                <div className='recipeMisc'>
                    <div className='recipeMiscIfo'>
                        <h2>Prep Time: 
                           <NumberInput initalValue={prepTime} type={"prepTime"}handleChange={handleChange}/>min
                        </h2>
                        <h2>Cook Time: 
                            <NumberInput initalValue={cookTime} type={"cookTime"}handleChange={handleChange}/>min
                            </h2>
                        <h2>Servings: 
                            <button>-</button>
                            <NumberInput initalValue={servings} type={"servings"}handleChange={handleChange}/>
                            <button>+</button>
                        </h2>
                        <div className='recipeHeader-isPublic'><h2>{isPublic ? ("Public"):("Unlisted")}</h2><ToggleSwitch isToggled={isPublic} onToggle={()=>handleChange("public", !isPublic)}/></div>
                    </div>
                    <div>
                       
                    </div>
                </div>
            </div>
            )}
        </RecipeContext.Consumer>
        </>
    )
}