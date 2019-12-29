import { useMachine } from '@xstate/react';
import React from 'react';
import './App.css';
import { fetchMachine } from './machines/fetch';


function App() {
  const [fetchPeopleState, sendToPeopleMachine] = useMachine(fetchMachine, {
    services: {
      fetchData: () => fetch('https://swapi.co/api/people/')
      .then(response => response.json())
      .then(people => people)
      
      // fetch('https://swapi.co/api/people/').then(r => {
      //   console.log(r)
      // return r.results})
    }
  });
 console.log(fetchPeopleState)

  return (
    <div className="App">
      <button onClick={() => sendToPeopleMachine({ type: 'FETCH' })}>
        Fetch
      </button>
      {fetchPeopleState.matches('pending') ? <p>Loading</p> : null}
      {fetchPeopleState.matches('successful.withData') &&
        <ul>
          {fetchPeopleState.context.results &&
            fetchPeopleState.context.results.results.map((person, index) => (
              <li key={index}>{person.name}</li>
            ))}
        </ul>
      }
      {
        fetchPeopleState.matches('withoutData') &&
        <div> No Data</div>
      }
      {
        fetchPeopleState.matches('failed') &&
        <p>{fetchPeopleState.context.message}</p>
      }
    </div>
  );
}

export default App;
