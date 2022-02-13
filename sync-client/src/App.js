// import logo from './logo.svg';
import './App.css';
import Dropdown from './components/spotify/Dropdown'


function App() {

      const data = [
            { value: 1, name: 'a' },
            { value: 2, name: 'b' },
            { value: 3, name: 'c' }
      ]

  return (
    <div className="App">
<p> Hello ..</p>
<Dropdown options={data} />
    </div>
  );
}
// onAfterSetupMiddleware

// setupMiddlewares

export default App;
