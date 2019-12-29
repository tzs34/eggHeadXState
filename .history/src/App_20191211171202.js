import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const App = () =>{

  const [people, setPeople] = useState([]);
  const [loadData, setLoadData] = useState([false]);

  useEffect(() => {
    const fetchData = async () => {
      fetch('https://swapi.co/api/people/')
          .then(response => response.json())
          .then(({results}) => setPeople( results ));
    };
    fetchData();
  }, [loadData]);


  return (
    <div className="App">
   {
     people.length > 0 &&
     <div>
     {
      people.map( peep => <div>{peep.name}</div>)
     }
     </div>

   }
   <button onClick{()=>{setLoadData(!loadData)}}>Load People</button>
    </div>
  );
}

export default App;
