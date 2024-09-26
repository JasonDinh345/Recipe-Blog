import { useParams } from 'react-router-dom';
import  { useEffect, useState, useReducer, createContext  } from 'react';
import axios from 'axios'
import NavBar from '../../NavBar';

import "../../../css/admin/AdminRecipe.css"

import RecipeHeader from './RecipeHeader';
import Directions from './Directions';
import RecipeIngredients from './RecipeIngredients';


const ACTION_STEPS ={
    ADD_STEP:"add-step",
    ADD_STEP_INBETWEEN: "add-step-inbetween",
    EDIT_STEP_DIRECTION :"edit-step-direction",
    EDIT_STEP_INGREDIENTS :"edit-step-ingredients",
    DELETE_STEP: "delete-step",
    
}
export const RecipeContext = createContext();
function AdminRecipe({user}){
    const [isLoading, setIsLoading] = useState(true)
    const { name } = useParams(); 
    const [recipe, setRecipe] = useState({})
    const [prepTime, setPrepTime] = useState(0)
    const [cookTime, setCookTime] = useState(0)
    const [isPublic, setPublic] = useState(false)
    const [servings, setServing] = useState(0)
    const [steps, dispatch] = useReducer(stepReducer, [])
    const [totalIngredients, setTotalIngredients] = useState([])
    const [submitResponse, setSubmitResponse] = useState("")
    
    //reducer to handle changes to the steps
    function stepReducer(steps, action){
        let newSteps = [...steps];
        switch (action.type){
            
            case ACTION_STEPS.SET_STEPS:
                return action.payload.steps;
            case ACTION_STEPS.ADD_STEP:
                
                newSteps.push({direction:"", ingredients:[]})
                return newSteps;
            case ACTION_STEPS.ADD_STEP_INBETWEEN:
                return [...steps.slice(0, action.payload.position-1),
                    {direction:"", ingredients:[]},
                    ...steps.slice(action.payload.position-1)
                ];
            case ACTION_STEPS.EDIT_STEP_DIRECTION:
                
                return [...steps.slice(0, action.payload.position-1),
                    {...steps[action.payload.position-1], direction: action.payload.direction},
                    ...steps.slice(action.payload.position)
                ];
            case ACTION_STEPS.EDIT_STEP_INGREDIENTS:
                
                return [...steps.slice(0, action.payload.position-1),
                    {...steps[action.payload.position-1], ingredients: action.payload.ingredients},
                    ...steps.slice(action.payload.position)
                ];
            case ACTION_STEPS.DELETE_STEP:
               
                newSteps = steps.filter((_, i)=> i !== action.payload.position-1);
               
                return newSteps;

            default:
                return steps;
            
        }
        
    }
    // get recipe info
    useEffect(() => {
        axios.get(`/recipe/${name}`).then(res=>{
            setRecipe(res.data)
            setPrepTime(res.data.prepTime)
            setCookTime(res.data.cookTime)
            setPublic(res.data.isPublic)
            setServing(res.data.servings)
            dispatch({type:ACTION_STEPS.SET_STEPS, payload: {steps:res.data.steps}})
            setIsLoading(false)
        }).catch(error => 
            console.error('Error fetching user data:', error));
      }, [name]);
      
      
      //get ingredients for the recipe whenever a change is made
    useEffect(()=>{
        const newTotalIngredients = [] 
        steps.map(step => 
            step.ingredients.map(ingredient =>
                newTotalIngredients.push(ingredient)
            )
        )
        setTotalIngredients(newTotalIngredients)
    },[steps])
    
    const handleHeaderChange = (action, value) =>{
        switch (action){
            case "prepTime":
                return setPrepTime(value)
            case "cookTime":
                return setCookTime(value)
            case "servings": 
                return setServing(value)
            case "public":
                return setPublic(value)
            default: return
        }
    }
    
    //handle save to db
    const handleSave = async() =>{
        setIsLoading(true)
       try{
        const res = await axios.patch(`/recipe/${name}`, {
            steps: steps,
            prepTime:prepTime,
            cookTime:cookTime,
            servings: servings,
            isPublic: isPublic,
            ingredients: totalIngredients
        })
        if (res.status === 200){
            setSubmitResponse("Save Sucessful")
        }
       }catch(err){
            setSubmitResponse("Save Unsucessful! Try Again Later!")
       }
       setIsLoading(false)
    }
    
    return (
    <>
    <RecipeContext.Provider value={recipe}>
        <NavBar user={user}/>
        {isLoading ? (<img src="../../src/img/loading.gif" alt=""></img>):(
        <>
        <div className='adminRecipeBox'>
            <RecipeHeader 
                recipe={recipe} 
                handleChange={handleHeaderChange} 
                isPublic={isPublic}
                cookTime={cookTime}
                prepTime={prepTime}
                servings={servings}
                />
            <div className='recipeInfo'>
                
                <RecipeIngredients totalIngredients={totalIngredients}/>
                <Directions steps={steps} dispatch={dispatch}/>
            </div>
            <button onClick={handleSave}>Save</button> 
            {submitResponse !== "" && (<p>{submitResponse}</p>)}
        </div>
        </>
        )}
        
    </RecipeContext.Provider>
    </>
)
}
export default AdminRecipe