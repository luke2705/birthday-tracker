import BirthdayChip from '../birthday-chip/birthday-chip';
import React, { useEffect, useState } from 'react';
import { Birthday } from '../../types/birthday';
import mockJson from '../../utils/mockData.json';
import {
    AddBirthdayButton,
    BirthdayChipContainer,
    ClickingInstructions,
    MainContentContainer
} from './main-birthday-page.styles';
import { BIRTHDAYS_ROUTE } from '../../utils/routes';
import BirthdayChipLoadingState from '../birthday-chip/birthday-chip-loading-state';
import AddBirthdayOverlay from '../overlays/add-birthday-overlay';



const MainBirthdayPage = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [birthdays, setBirthdays] = useState<Birthday[]>([]);
    const [selectedBirthday, setSelectedBirthday] = useState<Birthday>();
    const [showAddBirthdayOverlay, setShowAddBirthdayOverlay] = useState(false);


    // load birthday data when this component is initialized
    useEffect(() => {
        // simulate server latency to show loading screen
        setTimeout(() => {
            loadBirthdayData();
            setIsLoading(false);
        }, 3000);
    }, []);

    function loadBirthdayData() {
        if (props.useMockData) {
            loadMockedData();
        } else {
            loadDataFromServer();
        }
    }

    function loadMockedData() {
        const mockData = mockJson as Birthday[];
        setBirthdays(mockData);
    }

    function loadDataFromServer() {
        fetch(BIRTHDAYS_ROUTE, {
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

    function handleBirthdayChipClick(birthdayThatWasClicked: Birthday) {
        if (birthdayThatWasClicked === selectedBirthday) {
            // user is unselecting this birthday
            setSelectedBirthday({ name: '' });
        } else {
            setSelectedBirthday(birthdayThatWasClicked);
        }
    }

    function getInstructionText() {
        if (selectedBirthday?.name === undefined || selectedBirthday?.name === '') {
            return "Click on a birthday to show relative ages!";
        } else {
            return "Click " + selectedBirthday?.name + " again to show absolute ages!";
        }
    }

    return (
        <MainContentContainer>
            <BirthdayChipContainer>
                { isLoading &&
                [...Array(5)].map((b, index) =>
                    <BirthdayChipLoadingState key={index}/>)}
                { !isLoading && birthdays &&
                    birthdays.map((birthdayInfo, index) =>
                        <BirthdayChip
                            onClick={() => handleBirthdayChipClick(birthdayInfo)}
                            isSelected={birthdayInfo.name === selectedBirthday?.name}
                            comparisonBirthday={selectedBirthday?.birthday}
                            birthdayInfo={birthdayInfo}
                        key={index}/>)
                }
                <ClickingInstructions>
                    <span>
                        { getInstructionText() }
                    </span>
                </ClickingInstructions>
            </BirthdayChipContainer>
            <AddBirthdayButton onClick={() => setShowAddBirthdayOverlay(true)}>
                Player {birthdays.length + 1} has entered?
            </AddBirthdayButton>
            <AddBirthdayOverlay isVisible={showAddBirthdayOverlay} closeOverlay={() => setShowAddBirthdayOverlay(false)}/>
        </MainContentContainer>
    );
}

export default MainBirthdayPage;