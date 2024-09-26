import "../../css/components/ToggleSwitch.css"
export default function ToggleSwitch({isToggled, onToggle}){
   
    return(
        <>
        <label className="switch">
            <input type="checkbox" checked={isToggled} onChange={(onToggle)}></input>
            <span className="slider"></span>
        </label>
        </>
    )

}