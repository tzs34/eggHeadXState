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
        //console.log('try')
        fetch('https://swapi.co/api/people/')
        .then(response => response.json())
        .then(({results}) => {
          //console.log('RESULTS')
          sendToFetchMachine({type: 'RESOLVE', results})
        })
      }
        catch({message}){
        sendToFetchMachine({type: 'REJECT', message})
      }
    }
  } 
})

useEffect(()=>{
  const fetchData = () => {
    fetch('https://swapi.co/api/people/')
    .then(response => response.json())
    .then(({results}) => {
      //console.log('RESULTS')
      setPeople(results)
    })
  }
  fetchData()
}, [])

console.log(people)

  return (
    <div className="App">
   {
     fetchState.matches('successful') &&
     <div>
     {
      fetchState.context.results.map( ({name}) => <div key={name}>{name}</div>)
     }
     </div>

   }
   <div>
     {
       fetchState.matches('failed') &&
       <span>{fetchState.context.message}</span>
     }
   </div>
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
