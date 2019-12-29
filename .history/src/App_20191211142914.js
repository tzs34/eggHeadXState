import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const App = () =>{

  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      fetch('https://swapi.co/api/people/')
          .then(response => response.json())
          .then(people => setPlanets({ data: people.results }));
      // console.log(response)
      // const data = await response.json();
      // setPlanets(data);
    };
    fetchData();
  }, []);

  console.log(planets)

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
