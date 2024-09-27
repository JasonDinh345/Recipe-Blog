import { useContext, useEffect, useState } from "react";
import axios from 'axios'

import "../../css/AllRecipes.css"
import RecipeDisplayBox from "./RecipeDisplayBox";
import { UserContext } from "../App";
function AllRecipes(){
    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const user = useContext(UserContext)
    
    useEffect(() => {
        axios.get('/recipe')
        .then(res =>{
            if(user.role === "admin"){
                setRecipes(res.data)
            }else{
                setRecipes(res.data.filter((recipe)=> recipe.isPublic))
            }
           
            setIsLoading(false)
        }).catch(err =>{
          console.error(err)
        })
        // eslint-disable-next-line
      },[user]);
      
    return(
        <>
        
                {isLoading ? (<img src="src/img/loading.gif" alt=""></img>) : (
                <>
                <div className="allRecipesBox">
                    {user.role === "admin" && (
                        <div className="addRecipe"> <h1>+</h1> </div>
                    )}
                    {recipes.map((recipe) => (
                        <RecipeDisplayBox key={recipe._id} recipe={recipe} />
                    ))}
                </div>
                </>
                )}
          
        </>
    )
}
export default AllRecipes;