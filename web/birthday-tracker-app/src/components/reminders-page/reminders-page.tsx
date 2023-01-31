import React, { useEffect, useState } from 'react';
import { Birthday } from '../../types/birthday';
import { MuiTelInput } from 'mui-tel-input';
import {
    BirthdayRemindersTable,
    PageContainer,
    SaveRemindersButton,
    SubTitle, TableData,
    TableHeaders,
    Title
} from './reminders-page.styles';
import { getBirthdayData, postBirthdayReminders } from '../../utils/birthday-data-service';
import RemindersPageLoadingState from './reminders-page-loading-state';
import BirthdayTableRow from './birthday-table-row';


const RemindersPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthdays, setBirthdays] = useState<Birthday[]>([]);

    // get birthday data when this component is initialized
    useEffect(() => {
        // simulate server latency to show loading screen
        setTimeout(async function() {
            const birthdayData = await getBirthdayData(false);
            setBirthdays(birthdayData);
            setIsLoading(false);
        }, 3000);
    }, []);

    function handleSaveClick() {
        postBirthdayReminders(phoneNumber, birthdays);
    }

    function updateBirthdays(updatedBirthday: Birthday) {
        const updatedBirthdaysList = birthdays.map(birthday => {
            if (birthday.name === updatedBirthday.name) {
                return updatedBirthday;
            } else {
                return birthday;
            }
        })
        setBirthdays(updatedBirthdaysList);
    }

    return (
        <PageContainer>
            <Title>Reminders</Title>
            <SubTitle>
                Use this page to manage SMS text reminders for your saved birthdays. Standard messaging rates apply.
                Currently, only phone numbers based in the United States are supported.
            </SubTitle>
            <MuiTelInput
                disableDropdown
                defaultCountry="US"
                value={phoneNumber}
                onChange={setPhoneNumber}
            />
            <SaveRemindersButton onClick={handleSaveClick}>Save</SaveRemindersButton>
            <hr/>
            { isLoading && <RemindersPageLoadingState/>}
            { !isLoading &&
                <BirthdayRemindersTable>
                    <tbody>
                        <TableHeaders>
                            <TableData>Name</TableData>
                            <TableData>Birthday</TableData>
                            <TableData>Number of days before</TableData>
                            <TableData>Reminder Enabled</TableData>
                        </TableHeaders>
                        { birthdays && birthdays.map(birthdayInfo =>
                            <BirthdayTableRow birthdayInfo={birthdayInfo} handleBirthdayUpdate={updateBirthdays}/>
                        )}
                    </tbody>
                </BirthdayRemindersTable>
                }
        </PageContainer>
    )
}

export default RemindersPage;