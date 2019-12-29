import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const App = () =>{

  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http swapi.co/api/planets/');
      console.log(response)
      const data = await response.json();
      setPlanets(data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
   {
     planets.length > 0 &&
     <div>
     {
      planets.map( planet => planet.name)
     }
     </div>

   }
    </div>
  );
}

export default App;
