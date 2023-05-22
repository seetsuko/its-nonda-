import React from 'react';
import './scss/App.scss';
import { Header } from './Header';
import { Counter } from './Counter';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Counter />
    </div>
  );
};

export default App;
