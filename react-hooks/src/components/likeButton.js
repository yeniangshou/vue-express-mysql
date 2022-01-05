import React, { useState } from "react";


const LikeButton = ()=>{
    const [like, setLike ] = useState(1);
    // 1 赋值给like,然后setLike就是赋值的方法给like。
    const [ on, setOn] = useState(true);

    return (
        <>
        {/* 这里赋值是like+1替换，如果之前是对象，直接替换like+1的值了 */}
            <button onClick={()=> setLike(like+1) }>22 {like}</button>
            <button onClick={()=> setOn(!on) }>{ on ? 'true': 'false' }</button>
        </>
    )
}

export default LikeButton;