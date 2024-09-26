import AllRecipes from "./AllRecipes";
import { UserContext } from "../App";
import NavBar from "../NavBar";

function Home(){
    return(
        <>
        <UserContext.Consumer>
            {user=>(
          
                <>
                <NavBar />
                <AllRecipes />
                </>
                    
                
            )}
        </UserContext.Consumer>
        
        </>
    )
}
export default Home;