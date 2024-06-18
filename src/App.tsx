import React from 'react';
import './App.css';
import Map from './Map';

const App: React.FC = () => {
  return (
    <div className="App">
      <>
      <h1>Exemple de carte interactive 🗺️</h1>
      <h2>Cette carte codée par votre dev préféré est connectée à <a href="https://airtable.com/app3loNcvd921Yy1G/shr2YGGa66G7iQfhB">un tableau Airtable</a></h2>
      <p>Pour ajouter des coordonées, il suffit d'ajouter une entrée dans le tableau </p>
      <Map />
      </>
    </div>
  );
}

export default App;
