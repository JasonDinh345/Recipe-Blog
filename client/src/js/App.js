
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home/Home'
import Login from './Login'
import React, { useEffect, useState } from 'react';
import axios from 'axios'

import Recipe from './recipe/Recipe';
import "../css/App.css"
import AdminRecipe from './admin/recipe/AdminRecipe';
export const UserContext = React.createContext();
function App() {
    const [user, setUser] = useState({username:"", role:"user"})
    useEffect(() => {
        axios.get('/session').then((response) => {
          if (response.data.loggedIn) {
            setUser(response.data.user);
          }
        });
      }, []);
      
    return(
        <>
        <UserContext.Provider value={user}>
        <div className='wholePage'>
       
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/recipe/admin/:name" element={<AdminRecipe />} />
            </Routes>
        </Router>
        
        </div>
        </UserContext.Provider>
        </>
    )
}
export default App;