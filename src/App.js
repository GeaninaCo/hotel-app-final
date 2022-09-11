import React from 'react'
import './App.scss';
import Home from './pages/home';
import Header from './components/header/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favorites from './pages/favorites';
import About from './pages/about';
import Details from './pages/details';
function App() {

  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route index path='/' element={<Home/>}/>
          <Route path='Favorites' element={<Favorites/>}/>
          <Route path='about' element={<About/>}/>
          <Route path="/details/:id/:name" element={<Details/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
