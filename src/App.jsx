import React from 'react';
import './scss/App.scss';
import { Header } from './Header';
import ArtistView from './ArtistView';

const App = () => {
  return (
    <div className="App">
      <Header />
      <ArtistView />
    </div>
  );
};

export default App;
