import { useRef } from "react"
export default function NumberInput({initalValue, handleChange, type}){
    const inputRef = useRef(null)
    return(
        <>
         <input type='number' 
            value={initalValue} 
            ref={inputRef} 
            onFocus={()=>{inputRef.current.select()}}
            onChange={(e)=>handleChange(type,e.target.value)}>
        </input>
        </>
    )
}