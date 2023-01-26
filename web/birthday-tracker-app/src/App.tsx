import React, {useEffect, useState} from 'react';
import './App.scss';
import BirthdayChip from './components/birthday-chip';
import styled from 'styled-components';


const MainContentContainer = styled.div`
    padding: 0 80px;
`;

const BirthdayChipContainer = styled.div`
    padding: 80px 40px;
    border-bottom: 4px solid orange;
    margin-bottom: 40px;
`;

function App() {
  const [greeting, setGreeting] = useState();


  useEffect(() => {
    fetch('http://127.0.0.1:3000/', {
        method: 'GET',

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
      </header>
        <MainContentContainer>
            <BirthdayChipContainer>
                {
                    [...Array(5)].map(_ => <BirthdayChip/>)
                }
            </BirthdayChipContainer>
            <h2>Player 3 has entered?</h2>
            <BirthdayChip onClick={() => alert('launch add modal')}/>
        </MainContentContainer>
    </div>
  );
}

export default App;
