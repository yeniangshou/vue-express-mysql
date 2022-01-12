import React, { useState } from 'react'

// 这里{ tilte, onFileSearch } 相当于vue中的prop接收;
const FileSearch = ({ tilte, onFileSearch }) => {
    // 这里相当于vue中data
	const [inputActive, setInputActive] = useState(false)
	const [value, setValue] = useState('')

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
					    <input className='form-control ' value={value} onChange={(e)=>{ setValue(e.target.value) }}></input>
                    </div>
                    <div className='col-5'>
                        <button
                            type="button"
                            className="btn btn-primary "
                            onClick={() => {
                                setInputActive(false)
                            }}
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