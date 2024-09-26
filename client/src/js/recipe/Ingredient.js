import "../../css/Ingredient.css"
import React from "react";
export default function Ingredient({ingredient}){
    
    
    const getGoogleImageSRC = (url) => {
        
        const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
        const match = url.match(regex);
        
        
        if (match && match[1]) {
          return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
        }
        
        
        return null;
      };
      
    return(
        <>
        <div className="ingredientContainer" >
        {ingredient.image instanceof Blob ? (
                (ingredient.image !== null && (<img width={30} height={30} alt="" src={URL.createObjectURL(ingredient.image)}/>))
            ):(
                (ingredient.image !== null && (<img width={30} height={30} alt="" src={getGoogleImageSRC(ingredient.image)}/>))
            )}
            {ingredient.quantity !== undefined &&(<p>{ingredient.quantity}</p>) }
            {ingredient.unit !== undefined &&(<p>{ingredient.unit}</p>) }
            <p>{ingredient.name}</p>
        </div>
        </>
    )
}