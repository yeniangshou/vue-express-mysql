// import logo from './logo.svg';
import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './component/flieSearch'
import defaultFiles from './config/fileListConfig'
import FileList from './component/fileList'
import FileBtnList from './component/fileBtnlist'
import TabList from './component/tabList'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import menu from './component/menu'

function App() {
	const [files, setFiles] = useState(defaultFiles)
	// const menu = menu([
	// 	{
	// 		lable: '新建',
	// 		click: () => {
	// 			console.log('新建')
	// 		},
	// 	},
	// 	{
	// 		lable: '删除',
	// 		click: () => {
	// 			console.log('删除')
	// 		},
	// 	},
	// ])

	// 新增文件
	
    const AddFiles = () => {
		let item = {
			id: files.length + 1,
			title: '',
			body: 'create a file',
			createdAt: 15637629335704,
		}
		// 这样已经改变了地址才对，为什么还不行
		const newdata = [...files]
		newdata.push(item)
		console.log('newdata', newdata)
		setFiles(newdata)
		console.log('files', files)
	}

	useEffect(() => {
		console.log('files', files)
	}, [files])

	return (
		<div className="App container-fluid">
			<div className="row">
				<div className="col-4 bg-red left-panel no-gutters mx-0 px-0">
					{/* tilte 相当于prop vue中  tilte="文件搜索"    onFileSearch 传递也是*/}
					<FileSearch onFileSearch={() => {}}></FileSearch>
					<FileList
						files={files}
						onFileClick={() => {}}
						onSaveEdit={() => {}}
						onFileDelete={() => {}}
					></FileList>
					<FileBtnList
						// 子组件调用这个，相当于vue的emit;
						onAdd={() => {
							AddFiles()
						}}
						onImport={() => {}}
					></FileBtnList>
				</div>
				<div className="col-8 bg-red right-panel">
					<TabList
						files={defaultFiles}
						activedId="1"
						onTabClick={(id) => {
							console.log(id)
						}}
						onCloseTab={(id) => {
							console.log('close')
						}}
					></TabList>
					<SimpleMDE
						id="your-custom-id"
						value={defaultFiles[0].body}
						options={{ minHeight: '515px' }}
						onChange={(value) => console.log(value)}
					/>
				</div>
			</div>
		</div>
	)
}

export default App
