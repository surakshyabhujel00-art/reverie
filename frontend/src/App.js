import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import CharacterCreate from './pages/CharacterCreate';
import StoryFeed from './pages/StoryFeed';
import Chat from './pages/Chat';
import './App.css';

const AppContent = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <Router>
      <nav className="navbar">
        <h1>✨ Reverie</h1>
        <div className="nav-links">
          {token ? (
            <>
              <Link to="/feed">Feed</Link>
              <Link to="/characters">Characters</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/feed" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/feed" />} />
        <Route path="/feed" element={token ? <StoryFeed /> : <Navigate to="/login" />} />
        <Route path="/characters" element={token ? <CharacterCreate /> : <Navigate to="/login" />} />
        <Route path="/chat/:characterId" element={token ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={token ? "/feed" : "/login"} />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
