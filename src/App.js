import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';
function App() {
    return (
        <Router>
            <MyNavbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/carrito" element={<Home />} />
                <Route path="/login" element={<Home />} />  
            </Routes>
        </Router>
    );
}

export default App;