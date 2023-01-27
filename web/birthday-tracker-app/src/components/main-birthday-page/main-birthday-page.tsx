import BirthdayChip from '../birthday-chip/birthday-chip';
import React, { useEffect, useState } from 'react';
import { Birthday } from '../../types/birthday';
import mockJson from '../../utils/mockData.json';
import { BirthdayChipContainer, ClickingInstructions, MainContentContainer } from './main-birthday-page.styles';



const MainBirthdayPage = (props: any) => {
    const [birthdays, setBirthdays] = useState<Birthday[]>([]);
    const [selectedBirthday, setSelectedBirthday] = useState<Birthday>();

    function handleBirthdayChipClick(birthdayThatWasClicked: Birthday) {
        if (birthdayThatWasClicked === selectedBirthday) {
            // user is unselecting this birthday
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

    function getInstructionText() {
        if (selectedBirthday?.name === undefined || selectedBirthday?.name === '') {
            return "Select a birthday to show relative ages!";
        } else {
            return "Click " + selectedBirthday?.name + " again to show absolute ages!";
        }
    }

    return (
        <MainContentContainer>
            <BirthdayChipContainer>
                {birthdays &&
                    birthdays.map(birthdayInfo =>
                        <BirthdayChip
                            onClick={() => handleBirthdayChipClick(birthdayInfo)}
                            isSelected={birthdayInfo.name === selectedBirthday?.name}
                            comparisonBirthday={selectedBirthday?.birthday}
                            birthdayInfo={birthdayInfo}/>)
                }
                <ClickingInstructions>
                    <span>
                        { getInstructionText() }
                    </span>
                </ClickingInstructions>
            </BirthdayChipContainer>
            <button onClick={() => alert('This functionality  is on the feature backlog')}>
                Player {birthdays.length + 1} has entered?
            </button>
        </MainContentContainer>
    );
}

export default MainBirthdayPage;