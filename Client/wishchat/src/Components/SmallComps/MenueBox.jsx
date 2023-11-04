import React, { useState } from "react";
import "../../Styles/SmallCompsStyling.css"
export const Tooltip = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    function visibilityChange(){
        if(isVisible){
            setIsVisible(false)
        }else if (!isVisible){
            setIsVisible(true)
        }
    }
    return (

        <div
            className="why"
            onClick={visibilityChange}
        >
            {children}
            {isVisible && <div className="toolTip">{text}</div>}
        </div >
    )
}
