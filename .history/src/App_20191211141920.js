import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const App = () =>{

  const [planets, setPlanets] = useState('redux');
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http swapi.co/api/planets/1/',
      );
      setPlanets(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
   {
     planets.length > 0 &&
     <div>
     {
      plantes.map( planet => planet.name)
     }
     </div>

   }
    </div>
  );
}

export default App;
