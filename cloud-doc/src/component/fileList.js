import React, { useState, useEffect, useRef } from 'react'
// react-fontaweome 图标使用;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash , faTimes} from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import './fileList.css'
import { hasSelectionSupport } from '@testing-library/user-event/dist/utils'

// 本地存储
// const Store = require("electron-store")
// const store = new Store();
// store.set("name", "huangbo");
// let value = store.get("name")
// console.log("value", value)
// store.delete("name");
//  value = store.get("name")
// console.log("value", value)


const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
	const [inputActive, setInputActive] = useState(false);
    const [status, setStatus] = useState(false);

    // 新增新字段判断是否显示输入框
    let ary = files.map(item => {item.inputActive = false; return item;});
    const [fileLists, setFiles] = useState(ary) 

    // 输入框数据绑定
    const setFileListValue = (value, id)=>{
        let mm = fileLists.map(item => {
            if(item.id === id){
               item.title = value;
            }
            return item
        });
        setFiles(mm);
    }
    

    // 打开编辑
    const openEdit = (id)=>{
        setStatus(id);
    }

    //关闭编辑
    const closeEdit = (id)=>{
        setStatus(false);
    }

    // 删除列表项
    const deleteItem = (id)=>{
        let ary  = fileLists.filter(item => {
            if(item.id != id) return true;
            return false;
        });
        setFiles(ary);
    }


	return (
		<ul className="list-group list-group-flush ">
			{fileLists.map((file) => (
				<li
					className="list-group-item "
					key={file.id}
				>
					{(status!=file.id) && (
						<div  className='d-flex justify-content-between align-items-center'>
							<div>
								<FontAwesomeIcon icon={faMarkdown} />
								<span className="file-title">{file.title}</span>
							</div>

							<div>
								<button type="button" className="icon-btn" onClick={(e) =>{ openEdit(file.id) } }>
									<FontAwesomeIcon icon={faEdit} />
								</button>
								<button type="button" className="icon-btn">
									<FontAwesomeIcon icon={faTrash} onClick={(e) =>{ deleteItem( file.id) } } />
								</button>
							</div>
						</div>
					)}{
                        (status==file.id) &&
                        <div className='d-flex justify-content-between align-items-center'>
							<div>
                                <input className='form-control'  value={file.title} onChange={(e)=>{ setFileListValue(e.target.value, file.id) }}></input>
							</div>

							<div>
								<button type="button" className="icon-btn">
									<FontAwesomeIcon icon={faTimes} onClick={()=>{ closeEdit(file.id)  }}/>
								</button>
							</div>
						</div>
                    }
				</li>
			))}
		</ul>
	)
}

// 做类型检查
FileList.propTypes = {
	files: PropTypes.array,
}

FileList.defaultProps = {
	// tilte: '我的云文档'
}

export default FileList
