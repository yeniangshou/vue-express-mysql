import React, { useState, useEffect, useRef } from 'react'

const { remote } = window.require('electron')

// itemArr 是右键菜单打开的那些项，例如新建，删除之类的
const UseMenu = (itemArr) => {
	let el = useRef(null) // 到时返回判断是哪个dom结点，不归属的dom结点不能打开右键
	useEffect(() => {
        const menu = new remote.Menu();
		itemArr.forEach((item) => {
            menu.append(item);
        });

        const handleContextMenu = (e)=>{
            // 这里要进行限制，当前元素是否文件列表里面；
            el.current = e.target;
            // 菜单在哪个窗口上
            menu.popup({window: remote.getCurrentWindow()});
        }
        window.addEventListener("contextmenu", handleContextMenu);
        return ()=>{
            window.removeEventListener("contextmenu", handleContextMenu)
        }
	}, []);
    return el;
}

export default UseMenu