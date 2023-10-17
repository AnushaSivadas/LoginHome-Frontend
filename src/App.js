import './App.css';
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import EmailVerify from './components/EmailVerify';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route
          path="/"
          element={<Login/>}
        />
        <Route
          path="/dashboard"
          element={<Dashboard/>}
        />
        <Route
          path="/home"
          element={<Home/>}
        />
        <Route
          path="/:id/verify/:token"
          element={<EmailVerify/>}
        />
      </Routes>
    </div>
  );
}

export default App;
