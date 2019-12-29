import { useMachine } from '@xstate/react';
import React from 'react';
import './App.css';
import { fetchMachine } from './machines/fetch';


function App() {
  const [fetchPeopleState, sendToPeopleMachine] = useMachine(fetchMachine, {
    services: {
      fetchData: () => fetch('https://swapi.co/api/people/').then(r => {
        console.log(r)
      return r.results})
    }
  });
 

  return (
    <div className="App">
      <button onClick={() => sendToPeopleMachine({ type: 'FETCH' })}>
        Fetch
      </button>
      {fetchPeopleState.matches('pending') ? <p>Loading</p> : null}
      {fetchPeopleState.matches('successful') ? (
        <ul>
          {fetchPeopleState.context.results &&
            fetchPeopleState.context.results.map((person, index) => (
              <li key={index}>{person.name}</li>
            ))}
        </ul>
      ) : null}
      {fetchPeopleState.matches('failed') ? (
        <p>{fetchPeopleState.context.message}</p>
      ) : null}
    </div>
  );
}

export default App;
