import React, {useState, useEffect} from 'react';
import {fetchMachine} from './machines/fetch'
import {useMachine} from '@xstate/react'
import './App.css';

const App = () =>{

  const [people, setPeople] = useState([]);
  const [loadData, setLoadData] = useState([false]);
const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
  actions:{
    fetchData: (ctx, event) => {
      try{
        fetch('https://swapi.co/api/people/')
        .then(response => response.json())
        .then(({results}) => sendToFetchMachine({type: 'RESOLVE', results}))
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
   <div> 
   { fetchState.matches('pending') &&
    <span> {'Loading'}</span>
   }
    </div>
   <button onClick={()=>{sendToFetchMachine({type: 'FETCH'})}}>Load People</button>
    </div>
  );
}

export default App;
