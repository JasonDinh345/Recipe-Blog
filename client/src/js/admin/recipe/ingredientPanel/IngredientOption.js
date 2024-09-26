import { useState } from "react"
import Ingredient from "../../../recipe/Ingredient"
export default function IngredientOption({ingredient, selectedIngredients, dispatch}){
    const [isSelected, setSelected] = useState(()=>{
        if(selectedIngredients.find((anIngredient)=> anIngredient.name === ingredient.name) !== undefined){
            return true;
        }else{
            return false;
        }
    })
    const [isHovered, setHovered] =useState(false)
   
    
    const handleHover = () =>{
        
        setHovered(!isHovered)
        
    }
    const handleOnClick = ()=>{
        
        setSelected(!isSelected)
        dispatch({type:"add/delete", payload: {ingredient: ingredient}})
    }
  
    return(
        <>
         <div className="ingredientOptionContainer" 
           style={{
            backgroundColor: (isHovered && isSelected) ? "white" : (isSelected || isHovered) ? "rgb(109, 186, 248)" : "white",
            boxShadow: isSelected ? "10px 5px 5px rgb(129, 129, 129)" : undefined
          }}
            onClick={()=> handleOnClick()}
            onMouseEnter={()=>handleHover()}
            onMouseLeave={()=>handleHover()}
            >
            <Ingredient ingredient={ingredient} />
        </div>
        </>
    )
}