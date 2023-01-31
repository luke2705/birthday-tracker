import BirthdayChip from '../birthday-chip/birthday-chip';
import React, { useEffect, useState } from 'react';
import { Birthday } from '../../types/birthday';
import {
    AddBirthdayButton,
    BirthdayChipContainer,
    ClickingInstructions,
    MainContentContainer
} from './main-birthday-page.styles';
import BirthdayChipLoadingState from '../birthday-chip/birthday-chip-loading-state';
import AddBirthdayOverlay from '../overlays/add-birthday-overlay/add-birthday-overlay';
import { compareAsc, parseISO } from 'date-fns';
import { getBirthdayData } from '../../utils/birthday-data-service';



const MainBirthdayPage = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [birthdays, setBirthdays] = useState<Birthday[]>([]);
    const [selectedBirthday, setSelectedBirthday] = useState<Birthday>();
    const [showAddBirthdayOverlay, setShowAddBirthdayOverlay] = useState(false);


    // get birthday data when this component is initialized
    useEffect(() => {
        // simulate server latency to show loading screen
        setTimeout(async function() {
            const birthdayData = await getBirthdayData(props.useMockData);
            setBirthdays(birthdayData);
            setIsLoading(false);
        }, 3000);
    }, []);

    function handleBirthdayChipClick(birthdayThatWasClicked: Birthday) {
        if (birthdayThatWasClicked === selectedBirthday) {
            // user is unselecting this birthday
            setSelectedBirthday({ name: '', birthday: '', precedingDaysForReminder: 0, reminderEnabled: false});
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

    function addBirthday(birthday: Birthday) {
        const newBirthdayList = [...birthdays, birthday];
        newBirthdayList.sort((a, b) => {
            const a_Birthday = parseISO(a.birthday as string);
            const b_Birthday = parseISO(b.birthday as string);
            return compareAsc(a_Birthday, b_Birthday);
        })
        setBirthdays(newBirthdayList);
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
                            key={index}
                        />
                    )
                }
                <ClickingInstructions>
                    { getInstructionText() }
                </ClickingInstructions>
            </BirthdayChipContainer>
            <AddBirthdayButton onClick={() => setShowAddBirthdayOverlay(true)}>
                Player {birthdays.length + 1} has entered?
            </AddBirthdayButton>
            <AddBirthdayOverlay
                isVisible={showAddBirthdayOverlay}
                closeOverlay={() => setShowAddBirthdayOverlay(false)}
                onBirthdayAdd={addBirthday}/>
        </MainContentContainer>
    );
}

export default MainBirthdayPage;