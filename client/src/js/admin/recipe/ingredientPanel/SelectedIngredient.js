import "../../../../css/Ingredient.css"
import React, {useState} from "react";
export default function SelectedIngredient({ingredient, handleChange, dispatch}){
    const [quantity, setQuantity] = useState(ingredient.quantity)
    const [unit, setUnit] = useState(ingredient.unit)
    const getGoogleImageSRC = (url) => {
        
        const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
        if(url === undefined){
            return null
        }
        const match = url.match(regex);
        
        
        if (match && match[1]) {
          return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
        }
        
        
        return null;
      };
      const handleInfoChange = (infoType, value)=>{
        if(infoType === "quantity"){
            setQuantity(value)
            
            dispatch({type: "edit-info", payload:{ingredient: {...ingredient, quantity: value }}})
        }else if(infoType === "unit"){
            setUnit(value)
            dispatch({type: "edit-info", payload:{ingredient: {...ingredient, unit: value }}})
        }
      }
    return(
        <>
        <div className="ingredientSelectBox">
            <div className="ingredientSelectBoxContainer" >
            {ingredient.image instanceof File ? (
                    (ingredient.image !== null && (<img width={30} height={30} alt="" src={URL.createObjectURL(ingredient.image)}/>))
                ):(
                    (ingredient.image !== null && (<img width={30} height={30} alt="" src={getGoogleImageSRC(ingredient.image)}/>))
                )}
                {quantity !== undefined &&(<input type="text"pattern="[0-9\/]+" value={quantity} onChange={(e)=>handleInfoChange("quantity",e.target.value)}></input>) }
                <select value={unit} onChange={(e)=>handleInfoChange("unit", e.target.value)}>
                    <option>whole</option>
                    <option>lb</option>
                    <option>cup</option>
                    <option>tbsp</option>
                    <option>tsp</option>
                </select>
                <p>{ingredient.name}</p>
            </div>
        </div>
        </>
    )
}