import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App container-fluid">
        <div class="row">
            <div class="col-3 bg-red left-panel">
                <h1>左边</h1>
            </div>
            <div class="col-9 bg-red right-panel">
                <h1>右边内容</h1>
            </div>
        </div>
    </div>
  );
}

export default App;
