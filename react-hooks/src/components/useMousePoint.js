import React, { useState, useEffect } from "react";

const useMousePoint = ()=>{
    const [position, setPosition] = useState({x:0,y:0});

    useEffect(()=>{ // 当做componentDidMount和componentDidUpdate的时候
        const updateMouse = (event)=>{
            setPosition({x: event.x,y: event.y});
        };

        document.addEventListener('mousemove', updateMouse)
        console.log('position', position);
        return ()=>{ // 这里不解绑，是因绑定就会一直执行； 挂载完成后绑定事件，卸载组件后解除绑定
            document.removeEventListener('mousemove', updateMouse)
        }
    });

    return position;

}

export default useMousePoint;