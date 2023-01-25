import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [greeting, setGreeting] = useState();


  useEffect(() => {
    fetch('http://127.0.0.1:3000/', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.

        headers: {
        'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(
            (result) => {
                setGreeting(result.hello);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.log('error: ', error);
            }
        )
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Birthday Strings</h1>
        <h2>{greeting}</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
