import React, { useEffect, useState } from 'react';
import { Birthday } from '../../types/birthday';
import { Checkbox, MenuItem } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { MuiTelInput } from 'mui-tel-input';
import {
    BirthdayRemindersTable,
    PageContainer,
    SaveRemindersButton,
    StyledSelect, SubTitle, TableData,
    TableHeaders,
    Title, TableRow
} from './reminders-page.styles';
import {getBirthdayData} from '../../utils/birthday-data-service';
import RemindersPageLoadingState from './reminders-page-loading-state';


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
            <SaveRemindersButton>Save</SaveRemindersButton>
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
                        { birthdays && birthdays.map(birthday =>
                            <TableRow key={birthday.name}>
                                <TableData>{birthday.name}</TableData>
                                <TableData>{format(parseISO(birthday?.birthday as string), 'MMM d')}</TableData>
                                <TableData>
                                    <StyledSelect defaultValue="1">
                                        <MenuItem value={0}>Day of</MenuItem>
                                        <MenuItem value={1}>1 Day</MenuItem>
                                        <MenuItem value={3}>3 Days</MenuItem>
                                        <MenuItem value={7}>7 Days</MenuItem>
                                    </StyledSelect>
                                </TableData>
                                <TableData>
                                    <Checkbox color="default" />
                                </TableData>
                            </TableRow>
                        )}
                    </tbody>
                </BirthdayRemindersTable>
                }
        </PageContainer>
    )
}

export default RemindersPage;