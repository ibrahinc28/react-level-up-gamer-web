import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/user' element={<UserPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/adminmode' element={<AdminPage />}/>
      </Routes>
    </div>
  );
}

export default App;