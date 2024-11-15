import {  BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';
import EmptyState from './components/EmptyState';
import SignIn from './components/SignIn';
import CreateNewMovie from './components/CreateNewMovie';
import MovieList from './components/MovieList';

function App() {
  return (
    <Router>
      <div className="d-flex justify-content-center align-items-center min-vh-100 min-vw-98">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/empty-state" element={<EmptyState />} />
        <Route path="/create-movie" element={<CreateNewMovie />} />
        <Route path="/edit/:id" element={<CreateNewMovie />} />
        <Route path="/movies" element={<MovieList />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
