import React, {useEffect, useState} from 'react';
import './App.scss';
import BirthdayChip from './components/birthday-chip';
import styled from 'styled-components';


const MainContentContainer = styled.div`
    padding: 0 80px;
`;

const BirthdayChipContainer = styled.div`
    padding: 80px 40px 50px;
    border-bottom: 4px solid orange;
    margin-bottom: 40px;
`;

const ClickingInstructions = styled.p`
    margin-top: 20px;
`;

export type Birthday = {
    name: string;
    birthday?: Date;
}

function App() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [selectedBirthday, setSelectedBirthday] = useState<Birthday>();

  function toggleIsSelected(birthdayThatWasClicked: Birthday) {
      if (birthdayThatWasClicked === selectedBirthday) {
          setSelectedBirthday({name: ''});
      } else {
          setSelectedBirthday(birthdayThatWasClicked);
      }
  }


  useEffect(() => {
    fetch('http://127.0.0.1:3000/birthdays', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(
            (result) => {
                setBirthdays(result);
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
        <h1>Birthday Tracker</h1>
      </header>
        <MainContentContainer>
            <BirthdayChipContainer>
                {birthdays &&
                    birthdays.map(birthdayInfo =>
                        <BirthdayChip
                            onClick={()=> toggleIsSelected(birthdayInfo)}
                            isSelected={birthdayInfo.name === selectedBirthday?.name}
                            comparisonBirthday={selectedBirthday?.birthday}
                            birthdayInfo={birthdayInfo}/>)
                }
                <ClickingInstructions>
                    { selectedBirthday?.name=='' &&
                        <span>Select a birthday to show relative ages!</span>
                    }
                    { selectedBirthday?.name!='' &&
                        <span>Click {selectedBirthday?.name} again to show absolute ages!</span>
                    }
                </ClickingInstructions>

            </BirthdayChipContainer>
            <button onClick={() => alert('This functionality  is on the feature backlog')}>Player {birthdays.length + 1} has entered?</button>
        </MainContentContainer>
    </div>
  );
}

export default App;
