import React from 'react';
import './App.scss';
import styled from 'styled-components';
import MainBirthdayPage from './components/main-birthday-page/main-birthday-page';

const MockDataRibbon = styled.span`
    background: green;
    padding: 10px 50px;
    font-size: 12px;
    position: absolute;
    top: 24px;
    left: -49px;
    transform: rotate(-45deg);
`;


function App() {
  const useMockData = true;

  return (
      <div className="App">
          <header className="App-header">
              { useMockData &&
                  <MockDataRibbon title={'Consult README for more info'}>
                      Using Mock Data
                  </MockDataRibbon>
              }
              <h1>Birthday Tracker</h1>
          </header>
          <MainBirthdayPage useMockData={useMockData}/>
      </div>
  );
}

export default App;
