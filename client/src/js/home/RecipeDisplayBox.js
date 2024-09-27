import "../../css/RecipeDisplayBox.css"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App";
function RecipeDisplayBox({recipe, user}){
    const navigate = useNavigate();
    const handleAdminSelect = ()=>{
        navigate("/recipe/admin/"+recipe.name);
    }
    const handleSelect = ()=>{
        navigate("/recipe/"+recipe.name);
    }
    return(
        <>
        <UserContext.Consumer>
        {user=>(
            <div className="recipeBox" onClick={user.role === "admin"?(handleAdminSelect):(handleSelect)}>

            {recipe.img === ""?(
                <div className="img" ></div>
            ):(
                <img className="img" src={recipe.img}alt=""></img>
            )}
            <h3>{recipe.name}</h3>
        </div>
        )}
        </UserContext.Consumer>
        </>
    )
}
export default RecipeDisplayBox;