import React, { useState, useEffect } from "react";
import axios from "axios";

const ImgShow = ()=>{
    const [ url, setUrl ] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetch, setFetch] = useState(false);
    const style = {
        width: 200
    };

    useEffect( ()=>{
        setLoading(true);
        axios.get("https://dog.ceo/api/breeds/image/random").then( result =>{
            console.log(result);
            setUrl(result.data.message);
            setLoading(false);
        })
    }, [fetch])  // fetch 依赖这个值变化，然后进行重新调用useEffect里面回调代码；[] 的话，是会组件渲染一次就调用一次;

    return (
        <>
            <p>{ loading ?'读取中': <img src={ url } alt="dog"  style={style}/> }</p>
            <button onClick={()=>{ setFetch(!fetch) }}>更新图片</button>
        </>
    )
}

export default ImgShow;