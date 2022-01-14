import React, { useState, useEffect, useRef } from 'react'  

const KeyUpDown = ({targetCode})=>{
    const [keyStatus, setKeyStatus] = useState(false);
    
    const keyUpFun = ({keycode})=>{
        debugger
        if(keycode === targetCode){
            setKeyStatus(true);
        }
    }

    const keyDownFun =({keycode}) =>{
        debugger
        if(keycode === targetCode){
            setKeyStatus(false);
        }
    }

    useEffect(()=>{
        document.addEventListener('keyup', keyUpFun);
        document.addEventListener('keydown', keyDownFun);

        return ()=>{
            document.removeEventListener('keyup', keyUpFun);
            document.removeEventListener('keydown', keyDownFun);
        }
    })
    
    return keyStatus;
}

export default KeyUpDown;