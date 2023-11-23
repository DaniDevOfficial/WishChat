import React, { useState } from "react";
import "../../Styles/SmallCompsStyling.css"
export const Tooltip = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (

        <div
            className="why"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && <div className="toolTip">{text}</div>}
        </div >
    )
}
