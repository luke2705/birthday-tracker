import BirthdayChip from '../birthday-chip/birthday-chip';
import React, {useEffect, useState} from 'react';
import {Birthday} from '../../App';
import mockJson from '../../utils/mockData.json';
import {BirthdayChipContainer, ClickingInstructions, MainContentContainer} from './main-birthday-page.styles';



const MainBirthdayPage = (props: any) => {
    const [birthdays, setBirthdays] = useState<Birthday[]>([]);
    const [selectedBirthday, setSelectedBirthday] = useState<Birthday>();

    function toggleIsSelected(birthdayThatWasClicked: Birthday) {
        if (birthdayThatWasClicked === selectedBirthday) {
            setSelectedBirthday({name: ''});
        } else {
            setSelectedBirthday(birthdayThatWasClicked);
        }
    }

    function loadBirthdayData() {
        if (props.useMockData) {
            const mockData = mockJson as Birthday[];
            setBirthdays(mockData);
            return;
        }

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
            (error) => {
                console.log('error: ', error);
            }
        )
    }

    useEffect(loadBirthdayData, []);

    return (
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
    );
}

export default MainBirthdayPage;