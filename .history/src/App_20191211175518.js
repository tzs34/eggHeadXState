import React, {useState, useEffect} from 'react';
import {fetchMachine} from './machines/fetch'
import {useMachine} from '@xstate/react'
import './App.css';

const App = () =>{

  const [people, setPeople] = useState([]);
  const [loadData, setLoadData] = useState([false]);
const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
  actions:{
    fectchData: (ctx, event) => {
      try{
        fetch('https://swapi.co/api/people/')
        .then(response => response.json())
        .then(({results}) => sendToFetchMachine({type: 'RESOVE', results}))
        }
        catch({message}){
        sendToFetchMachine({type: 'REJECT', message})
      }
    }
  } 
})



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
   <button onClick={()=>{setLoadData(!loadData)}}>Load People</button>
    </div>
  );
}

export default App;
