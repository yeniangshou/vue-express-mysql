// import logo from './logo.svg';
import './App.css'
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './component/flieSearch'
import defaultFiles from './config/fileListConfig'
import FileList from './component/fileList'
import FileBtnList from './component/fileBtnlist'
import TabList from './component/tabList'
import SimpleMDE from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css"

function App() {
	return (
		<div className="App container-fluid">
			<div className="row">
				<div className="col-4 bg-red left-panel no-gutters mx-0 px-0">
					{/* tilte 相当于prop vue中  tilte="文件搜索"    onFileSearch 传递也是*/}
					<FileSearch onFileSearch={() => {}}></FileSearch>
					<FileList
						files={defaultFiles}
						onFileClick={() => {}}
						onSaveEdit={() => {}}
						onFileDelete={() => {}}
					></FileList>
					<FileBtnList
						onAdd={() => {}}
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
                        options={{minHeight:'515px'}}
						onChange={(value) => console.log(value)}
					/>
				</div>
			</div>
		</div>
	)
}

export default App
