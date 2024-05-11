import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { About, Contact, Experience, Hero, Navbar, Tech } from './components';
import Cursor from './components/Cursor';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Cursor />
        <div className="relative z-0 bg-primary">
          <div>
            <Navbar />
            <Hero />
          </div>
          <About />
          <Tech />
          <Experience />
          <div className="relative z-0">
            <Contact />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
