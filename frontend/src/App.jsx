import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Home from './pages/Home';

const isLoggedIn = () => !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            isLoggedIn() ? <AdminPanel /> : <Navigate to="/admin/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
