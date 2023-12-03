import BirthdayChip from './birthday-chip/birthday-chip';
import React, { useEffect, useState } from 'react';
import { Birthday, serverlessBirthdays } from '../../types/birthday';
import {
    AddBirthdayButton,
    BirthdayChipContainer,
    ClickingInstructions,
    MainContentContainer
} from './main-birthday-page.styles';
import BirthdayChipLoadingState from './birthday-chip/birthday-chip-loading-state';
import AddBirthdayOverlay from '../overlays/add-birthday-overlay/add-birthday-overlay';
import { compareAsc, parseISO } from 'date-fns';
import { getBirthdayData } from '../../utils/birthday-data.service';
import Toast from '../overlays/add-birthday-overlay/toast';
import { DataSources } from '../../types/dataSources';


const MainBirthdayPage = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [birthdays, setBirthdays] = useState<Birthday[]>([]);
    const [selectedBirthday, setSelectedBirthday] = useState<Birthday>();
    const [showAddBirthdayOverlay, setShowAddBirthdayOverlay] = useState(false);
    const [showBdayAddedBanner, setShowBdayAddedBanner] = useState(false);
    const [showBdayDeletedBanner, setShowBdayDeletedBanner] = useState(false);


    // get birthday data when this component is initialized
    useEffect(() => {
        if (props.dataSource == DataSources.SERVERLESS) {
            setBirthdays(serverlessBirthdays);
            setIsLoading(false);
        } else {
        // simulate server latency to show loading screen
            setTimeout(async function() {
                const birthdayData = await getBirthdayData(props.useMockData);
                setBirthdays(birthdayData);
                setIsLoading(false);
            }, 3000);
        }
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
            return 'Click on a birthday to show relative ages!';
        } else {
            return 'Click ' + selectedBirthday?.name + ' again to show absolute ages!';
        }
    }

    function addBirthday(birthday: Birthday) {
        const newBirthdayList = [...birthdays, birthday];
        newBirthdayList.sort((a, b) => {
            const aBirthday = parseISO(a.birthday as string);
            const bBirthday = parseISO(b.birthday as string);
            return compareAsc(aBirthday, bBirthday);
        });
        setBirthdays(newBirthdayList);
        setShowBdayAddedBanner(true);
    }

    function removeBirthday(name: string) {
        const updatedBirthdayList = birthdays.filter(birthday => birthday.name !== name);
        setBirthdays(updatedBirthdayList);
        setShowBdayDeletedBanner(true);
    }

    function showAddBirthdayButton() {
        return !isLoading && props.dataSource != DataSources.SERVERLESS;
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
                            dataSource={props.dataSource}
                            isSelected={birthdayInfo.name === selectedBirthday?.name}
                            onBirthdayRemove={removeBirthday}
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
            { !showAddBirthdayButton &&
                <AddBirthdayButton onClick={() => setShowAddBirthdayOverlay(true)}>
                    Player {birthdays.length + 1} has entered?
                </AddBirthdayButton>
            }
            <AddBirthdayOverlay
                isVisible={showAddBirthdayOverlay}
                closeOverlay={() => setShowAddBirthdayOverlay(false)}
                onBirthdayAdd={addBirthday}/>
            <Toast
                open={showBdayAddedBanner}
                onClose={() => setShowBdayAddedBanner(false)}
                message={'Birthday Added!'}
            />
            <Toast
                open={showBdayDeletedBanner}
                onClose={() => setShowBdayDeletedBanner(false)}
                message={'Birthday Deleted!'}
                severity={'error'}
            />
        </MainContentContainer>
    );
};

export default MainBirthdayPage;