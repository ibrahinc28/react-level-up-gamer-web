import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import MyNavbar from './components/MyNavbar';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#FFFFFF' }}>
      <MyNavbar />
      <Home />
    </div>
  );
}

export default App;
