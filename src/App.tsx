import React from 'react';
import { Header } from './Header';
import { Router } from './routes/Router';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Router/>
    </div>
  );
};

export default App;
