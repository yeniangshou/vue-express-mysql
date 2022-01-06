import logo from './logo.svg';
import './App.css';
import LikeButton from './components/likeButton'
import ImgShow from './components/imgshow';
import useMousePoint from './components/useMousePoint';

function App() {
    const position = useMousePoint();
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>x:{position.x},y:{position.y}</p>
        <ImgShow></ImgShow>
        <LikeButton></LikeButton>
      </header>
    </div>
  );
}

export default App;
