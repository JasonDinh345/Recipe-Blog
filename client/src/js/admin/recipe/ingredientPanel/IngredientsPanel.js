import { useEffect, useState, useReducer, Suspense, lazy } from "react"
import axios from 'axios'
import"../../../../css/admin/IngredientPanel.css"
import SelectedIngredient from "./SelectedIngredient"
import IngredientOption from "./IngredientOption"

import LoadingScreen from "../../../components/LoadingScreen"


const AddIngredient = lazy(()=> import("./AddIngredient"))
export default function IngredientsPanel({isVisible, setVisibility, currentSelectedIngredients, handleSave ,position}){
    
    const selectedIngredientsReducer= (selectedIngredients, action) =>{
        
        switch (action.type){
            case "add/delete":
                if(selectedIngredients.find((anIngrendient) => anIngrendient.name === action.payload.ingredient.name) !== undefined){
                    const newSelectedIngredients = selectedIngredients.filter((anIngrendient) => anIngrendient.name !== action.payload.ingredient.name)
                    return (newSelectedIngredients);
                  
                }else{
                    return ([...selectedIngredients, 
                        {...action.payload.ingredient, quantity: "1", unit: "whole", isOptional: false}])
                  
                }
            case "edit-info":
                const index = selectedIngredients.findIndex(anIngredient => anIngredient.name === action.payload.ingredient.name);
                
                if (index !== -1) {
                    const newSelectedIngredients = [
                        ...selectedIngredients.slice(0, index),
                        action.payload.ingredient,
                        ...selectedIngredients.slice(index + 1)
                ];
                 return (newSelectedIngredients);
                }
                break;

            default: return selectedIngredients ;
        }
    }

    const [ingredients, setIngredients] = useState([])
    const [addIngredVisibility, setAddIngredVisibility] = useState(false)
    const [selectedIngredients, dispatch] = useReducer(selectedIngredientsReducer, currentSelectedIngredients)
    const compareName= (a,b)=>{
        return a.name.localeCompare(b.name)
    }
    useEffect(()=>{
        try{
            axios.get("/ingredient").then(res=>{
            setIngredients(res.data.sort(compareName))
           })

        }catch(err){
            console.log(err)
        }
        
    },[ingredients])
    
   const handleXOut = ()=>{
    setVisibility(!isVisible)
   }
   const handleNewIngredient = (ingredient) =>{
    setIngredients([...ingredients, ingredient])
   }
   
    return(
        <>
        <div className="darkBG" style={{visibility: isVisible ? "visible":"hidden"}}>
            <div className="ingredientsPanel" >
                <p onClick={handleXOut} className="exitOut">x</p>
                <h1 style={{flexBasis: "100%", marginBottom:0}}>Step {position}</h1>
                <div className="ingredientPanelMain">
                    
                   <div className="flexContainerCenter" style={{width:"75%", flexDirection:"column"}}>
                    <h2 style={{textAlign:"left"}}>Ingredients:</h2>
                    
                    <div className="ingredients">
                        <input type="search" placeholder="Search for ingredients..." style={{flexBasis:"100%", height:"fit-content"}}></input>
                        {ingredients.map((ingredient, i)=>
                               <IngredientOption ingredient={ingredient} key={i+1} selectedIngredients={selectedIngredients} dispatch={dispatch}/>
                            )}
                        </div>
                   </div>
                   <div className="flexContainerCenter"style={{width:"20%", flexDirection:"column"}}>
                        <h2 style={{textAlign:"center"}}>Selected Ingredients</h2>
                        <div className="selectedIngredients">
                            <div className="overflowAuto">
                            {selectedIngredients.map((ingredient, i)=>
                                <SelectedIngredient ingredient={ingredient} key={i+1} dispatch={dispatch}/>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ingredientsPanel-buttons">
                    <button onClick={()=>setAddIngredVisibility(!addIngredVisibility)}>Create New Ingredient</button>
                    <button onClick={()=>handleSave(selectedIngredients)}> Save</button>
                </div>
                
            </div>
        </div> 
        
        <Suspense fallback={<LoadingScreen/>}>
            {addIngredVisibility && (
                <AddIngredient 
                style={{visibility: addIngredVisibility ? "visible":"hidden"}} 
                isVisible={addIngredVisibility}
                setVisibility={setAddIngredVisibility} 
                handleNewIngredient={handleNewIngredient}/>
            )}
        </Suspense>
        </>
    )
}