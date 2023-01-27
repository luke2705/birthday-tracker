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

const CopyrightText = styled.span`
    color: #adb5bd;
    margin-bottom: 10px;
`;


function App() {
  const useMockData = true;

  return (
      <div className="App">
          <div>
              <header className="App-header">
                  { useMockData &&
                      <MockDataRibbon title={'Consult README for more info'}>
                          Using Mock Data
                      </MockDataRibbon>
                  }
                  <h1>Birthday Tracker</h1>
              </header>
              {/* add more routes here as your empire grows */}
              <MainBirthdayPage useMockData={useMockData}/>
          </div>
          <CopyrightText>
              © 2023 Luke West. All rights reserved.
          </CopyrightText>
      </div>
  );
}

export default App;
