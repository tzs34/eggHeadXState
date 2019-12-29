import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const App = () =>{

  const [people, setPeople] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      fetch('https://swapi.co/api/people/')
          .then(response => response.json())
          .then(({data}) => setPeople({ data }));
      // console.log(response)
      // const data = await response.json();
      // setPlanets(data);
    };
    fetchData();
  }, []);
console.log(people)


  return (
    <div className="App">
   {
     people.length > 0 &&
     <div>
     {
      people.map( peep => peep.name)
     }
     </div>

   }
    </div>
  );
}

export default App;
