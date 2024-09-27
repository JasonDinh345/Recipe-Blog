import { useParams } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import LoadingScreen from "../components/LoadingScreen";
import NavBar from "../NavBar";
import { UserContext } from "../App";
import "../../css/Recipe.css"
import RecipeHeader from "./RecipeHeader";
import RecipeIngredients from "./RecipeIngredients";
import Directions from "./Directions";
export const RecipeContext = createContext();
function Recipe(){
    const user = useContext(UserContext)
    const { name } = useParams(); 
    const [recipe, setRecipe] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    console.log(name)
    useEffect(() => {
        axios.get(`/recipe/${name}`).then(res=>{
            setIsLoading(true)
            setRecipe(res.data)
            setIsLoading(false)
        }).catch(error => 
            console.error('Error fetching user data:', error));
      }, [name]);
    return(
        <>
        <NavBar user={user}></NavBar>
        {isLoading ? (<LoadingScreen/>):(
            <RecipeContext.Provider value={recipe}>
            <div className="recipeContiner">
                <RecipeHeader/>
                <div className="recipeInfo">
                    <RecipeIngredients/>
                    <Directions/>
                </div>
            </div>
        </RecipeContext.Provider>
        )}
        
        </>
    )
}
export default Recipe;