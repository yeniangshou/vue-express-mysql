import React, { useState, useEffect, useRef } from 'react'

// 这里{ tilte, onFileSearch } 相当于vue中的prop接收;
const FileSearch = ({ tilte, onFileSearch }) => {
    // 这里相当于vue中data
	const [inputActive, setInputActive] = useState(false);
	const [value, setValue] = useState('');
    
    //dom节点
    const inputRef = useRef(null);

    // 相当于method的方法,需要声明
    const closeSearch = (e)=> {
        e.preventDefault();
        setInputActive(false);
        setValue('');
    }

    // 相当于vue mounted 渲染一次就会执行;
    // 这里相当于使用了快捷键的方式;
    useEffect(()=>{
        const handleInputEvent = (event) =>{
            const {keyCode} = event;
            if(keyCode == 13 && inputActive){ 
                console.log("搜索")
                onFileSearch(value);
               
            } else if(keyCode == 27 && inputActive){
                closeSearch(event);
            }
        }

        document.addEventListener('keyup', handleInputEvent);

        return ()=>{
            document.removeEventListener('keyup', handleInputEvent);
        }
    })

    // 根据inputActive动态变化，焦点
    useEffect(() => {
        if(inputActive){
            inputRef.current.focus();
        }
        
      },[inputActive])

	return (
		// booststrap 警告框
		<div className="alert alert-danger">
			{!inputActive && (
				<div className="d-flex justify-content-between align-items-center">
					<span>{tilte}</span>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => {
							setInputActive(true)
						}}
					>
						搜索
					</button>
				</div>
			)}
            {inputActive && (
				<div className="row">
                    <div className='col-7'>
                        {/* value 和 onchange 相当于vue中 v-model； react 是要className*/}
					    <input className='form-control ' ref={inputRef} value={value} onChange={(e)=>{ setValue(e.target.value) }}></input>
                    </div>
                    <div className='col-5'>
                        <button
                            type="button"
                            className="btn btn-primary "
                            onClick={(event) => { 
                                closeSearch(event);
                            }}
                            // 绑定method的方法
                        >
                            关闭
                        </button>
                    </div>
				</div>
			)}
		</div>
	)
}


export default FileSearch;