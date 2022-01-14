import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './component/flieSearch'
import defaultFiles from './config/fileListConfig';
import FileList from './component/fileList';
import FileBtnList from './component/fileBtnlist'

function App() {
  return (
    <div className="App container-fluid">
        <div className="row">
            <div className="col-4 bg-red left-panel no-gutters">
                {/* tilte 相当于prop vue中  tilte="文件搜索"    onFileSearch 传递也是*/}
               <FileSearch  onFileSearch={()=>{}}></FileSearch>
               <FileList files={defaultFiles}  onFileClick={()=>{}}  onSaveEdit={()=>{}}  onFileDelete={()=>{}}></FileList>
               <FileBtnList onAdd={()=>{}} onImport={()=>{}}></FileBtnList>
            </div>
            <div className="col-8 bg-red right-panel">
                <h1>右边内容</h1>
            </div>
        </div>
    </div>
  );
}

export default App;
