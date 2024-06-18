import React from 'react';
import './App.css';
import Map from './Map';

const App: React.FC = () => {
  return (
    <div className="App">
      <>
      <h1>Example de carte interactive 🗺️</h1>
      <h2>Cette carte codée par votre dev préféré est connectée à un tableau Airtable</h2>
      <p>Pour ajouter des coordonées, il suffit d'ajouter une entrée dans le tableau </p>
      <Map />
      </>
    </div>
  );
}

export default App;
