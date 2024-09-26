import { Link } from 'react-router-dom';
import axios from 'axios';
import "../css/NavBar.css"
import { UserContext } from './App';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate()
    
    const handleLogOut = async() =>{
        await axios.post('/user/logout')
        navigate("/")
        window.location.reload()
        
    }
    
    return(
        <>
        <UserContext.Consumer>
          {user => (
            <div className="nav">
              
              <h2><Link to="/">Recipes</Link></h2>
              <h2><Link to="https://github.com/JasonDinh345">GitHub</Link></h2>
              {user.username === "" ? (
                <h2><Link to="/login">Login</Link></h2>
              ) : (
                <h2 onClick={handleLogOut}>{user.username}</h2>
              )}
            </div>
          )}
        </UserContext.Consumer>
      </>
    )
}
export default NavBar;