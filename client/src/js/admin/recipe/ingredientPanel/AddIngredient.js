import {  useState, useRef } from "react";
import imageCompression from 'browser-image-compression';
import axios from 'axios'
import "../../../../css/admin/AddIngredient.css"
import Ingredient from "../../../recipe/Ingredient";
function AddIngredient({isVisible, setVisibility, handleNewIngredient}) {
    const [image, setImage] = useState(null)
    const [name, setName] = useState("")
    const [submitResponse, setSubmitResponse] = useState("")
    const [isLoading, setLoading] = useState(false)
   
    const fileInputRef = useRef(null)
    const options = {
        maxSizeMB: 1,  
        maxWidthOrHeight: 800, 
        useWebWorker: true, 
      };
    const handleFileChange  = async(e)=>{
        const file = e.target.files[0];
    try {
        const compressedImage = await imageCompression(file, options); // Add appropriate options here
        setImage(compressedImage);
    } catch (error) {
        console.error("Image compression failed:", error);
    }
    }
    


    
    
    const handleNameChange = (e) =>{
        setName(e.target.value)
    }
    const handleAddIngredient = async() =>{
        setLoading(true)
        setSubmitResponse("")
        if(name.length > 24){
            return setSubmitResponse("Name Too Long!")
        }else if( name === "" || image === ""){
            return setSubmitResponse("Enter a valid Input")
        }
        const formData = new FormData();
        formData.append('image', image)
        formData.append('name', name)
       try{
        const res = await axios.post("../../oauth/upload", formData,{
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        
        
            setSubmitResponse('File and data uploaded successfully')
            console.log('File and data uploaded successfully:', res.data);
            handleNewIngredient({image: res.data.url, name: name} )
    
       }catch(err){
            setSubmitResponse("File Too Large!")
       }
     
       setLoading(false)
    }
    const handleXout = ()=>{
        setImage(null)
        setName("")
        fileInputRef.current.value = null
        setSubmitResponse("")
        setVisibility(false)
    }
    return(
        <>
        <div className="darkBG" style={{visibility: isVisible ? "visible":"hidden"}}>
          
            <div className="addIngredientPanel">
                <div className="addIngredientMain">
                    <div className="addIngredientInputs">
                        <label htmlFor="name">
                        Ingredient Name:<br/>
                            <input type="text" value={name} name="name" onChange={handleNameChange}/>
                        </label>
                        <label> Ingredient Image: <br/>
                            <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            />
                        </label>
                        {image !== null && (<img width={100} height={100} alt="" src={URL.createObjectURL(image)}/>)}
                    </div>
                    <div className="ingredientExamplePanel">
                        <p>Example</p>
                        <Ingredient ingredient={{image: image, name: name}}/>
                    </div>
                    
                </div>
                <div className="submitBox">
                    
                    <button onClick={handleAddIngredient}>Submit</button>
                    {submitResponse !== "" && (<p>{submitResponse}</p>)}
                </div>
                <p className="exitOut" onClick={handleXout}>X</p>
            </div>
            
        </div>
        {isLoading && (
            <div className="darkBG">
                <img src="../../src/img/loading.gif" alt=""></img>
            </div>
        )}
        </>
    )
}
export default AddIngredient;