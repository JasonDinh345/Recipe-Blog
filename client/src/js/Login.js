import {useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "../css/Login.css"
function Login(){
    const [isCreatingUser, setIsCreatingUser] = useState(false)
    const [formData, setFormData] =  useState({username: "", password: "", email:"", confirmPass:""})
    const [error, setError] = useState("")
    
    const navigate = useNavigate();
    async function logIn() {
        try{
            const res = await axios.post('/user/login', {
                username: formData.username,
                password: formData.password
            })
            console.log(res.status)
            if (res.status === 200){
                navigate("/");
                window.location.reload()
            }
        }catch(err){
            
            if (err.response && err.response.status === 401) {
                setError('Invalid username or password');
              } else {
                setError('An error occurred. Please try again.');
              }
        }
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        logIn()
    }
    const handleInputChange = (e) => {
       
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData, // 
          [name]: value,   
        }));

      };
    const handleNewUser = async(e)=>{
        e.preventDefault();
        if(formData.password.length <= 8){
           return setError("Password is too short!")
        }else if(formData.password !== formData.confirmPass){
            return setError("Passwords do not match!");
        }
        try{
            const res = await axios.post("/user",{
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
            console.log(res.status)
            if(res.status === 201){
                logIn()
            }else{
                const message = await res.json()
                console.log(message)
                setError(message)
            }
        }catch(err){
            
            console.log(err.response.data.message)
            setError(err.response.data.message);
        }
    }
    const handleSwitch = ()=>{
        setFormData({username: "", password: "", email:"",confirmPass:""})
        setIsCreatingUser(!isCreatingUser)
        setError("")
    }
    return(
        <>
        {isCreatingUser === false ?(
            <>
            <form onSubmit={handleSubmit} className='loginForm'>
                <label>Username<br/>
                    <input name="username" type="text"value={formData.username} onChange={handleInputChange} />
                </label>

                <label >Password<br/>
                    <input type="password" name="password" value={formData.password}onChange={handleInputChange}/>
                </label>

                {error !== "" ?(<p>{error}</p>):(<></>)}
                <button type='submit'>Login</button>
                <p onClick={handleSwitch}>Create New User</p>
            </form>
            </>
            
        ):(
            <>
            <form className='loginForm' onSubmit={handleNewUser}>
                <label>Username<br/>
                    <input name="username" type="text"value={formData.username} onChange={handleInputChange} />
                </label>
                
                <label>Email<br/>
                    <input name="email" type="email" value={formData.email||""}onChange={handleInputChange}autoComplete='email'/>
                </label>
                

                <label>Password<br/>
                    <input type="password" name="password" value={formData.password}onChange={handleInputChange} autoComplete="new-password"/>
                </label>
                

                <label>Confirm Password<br/>
                    <input type="password" name="confirmPass"value={formData.confirmPass||""}onChange={handleInputChange}/>
                </label>
                

                {error !== "" ?(<p>{error}</p>):(<></>)}
                <button type='submit'>Create Account</button>
                <p onClick={handleSwitch}>Existing User?</p>
            </form>
            </>
        )}
        </>
    )
}
export default Login;