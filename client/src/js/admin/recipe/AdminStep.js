import {  useState, useEffect, useRef, lazy, Suspense } from "react"
import"../../../css/admin/AdminStep.css"

import Ingredient from "../../recipe/Ingredient"
import LoadingScreen from "../../components/LoadingScreen"
const IngredientsPanel = lazy(()=> import("./ingredientPanel/IngredientsPanel"))

function AdminStep({step, position, dispatch}){
    const [direction, setDirection] = useState(step.direction)
    const [ingredients, setIngredients] = useState(step.ingredients)
    
    
    const [isIngredPanelVisibility, setIsIngredPanelVisiblity] = useState(false)
    const inputRef = useRef(null)
    useEffect(() => {
        setDirection(step.direction);
        setIngredients(step.ingredients)
        const textarea = inputRef.current
        textarea.style.height = "auto"; 
        textarea.style.height = `${textarea.scrollHeight}px`; 
    }, [step.direction, step.ingredients]);
    
    const handleChange = (e)=>{
        
        dispatch({type:"edit-step-direction", payload:{direction:e.target.value,  position: position}})
    }
    const handleDelete = ()=>{
        
        dispatch({type:"delete-step" ,payload:{position: position}})
    }
    const handleIngredientChange = (ingredients) =>{
        
        dispatch({type:"edit-step-ingredients", payload:{position: position, ingredients: ingredients}})
    }
    
    
    return(
        <>
        <button  className="adminAddStepAbove" onClick={()=>dispatch({type:"add-step-inbetween", payload:{position: position}})}>^</button>
        <div className="adminStep">
           <label>
                Step {position}:
                <textarea className="stepInput" name={"Step" + position} value={direction||""} onChange={(e)=>handleChange(e)} ref={inputRef} ></textarea>
                <div className="stepButtons">
                    <button onClick={()=>setIsIngredPanelVisiblity(!isIngredPanelVisibility)}>Add Ingredients</button>
                    <button onClick={handleDelete}>Delete Step</button>
                </div>
                
           </label>
           <ul className="adminStep-ingredients">
                {ingredients.map((ingredient, i)=>
                    <Ingredient ingredient={ingredient} key={i+1}/>
                )}
           </ul>
            
        </div>
        
        <Suspense fallback={<LoadingScreen/>}>
           {isIngredPanelVisibility &&(
             <IngredientsPanel 
             isVisible={isIngredPanelVisibility} 
             setVisibility={setIsIngredPanelVisiblity} 
             currentSelectedIngredients={step.ingredients} 
             handleSave={handleIngredientChange} 
             position={position}/>
           )}
        </Suspense>
        </>
    )
}
export default AdminStep