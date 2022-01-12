import React, { useState, useEffect, useRef } from 'react'
// react-fontaweome 图标使用;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import './fileSearch.css'


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
						className="icon-btn"
						onClick={() => {
							setInputActive(true)
						}}
					>
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</div>
			)}
            {inputActive && (
				<div  className="d-flex justify-content-between align-items-center">
                    <div >
                        {/* value 和 onchange 相当于vue中 v-model； react 是要className*/}
					    <input className='form-control ' ref={inputRef} value={value} onChange={(e)=>{ setValue(e.target.value) }}></input>
                    </div>
                    <div >
                        <button
                            type="button"
                            className="icon-btn"
                            onClick={(event) => { 
                                closeSearch(event);
                            }}
                            // 绑定method的方法
                        >
                            <FontAwesomeIcon icon={faTimes} size='1x' />
                        </button>
                    </div>
				</div>
			)}
		</div>
	)
}


export default FileSearch;