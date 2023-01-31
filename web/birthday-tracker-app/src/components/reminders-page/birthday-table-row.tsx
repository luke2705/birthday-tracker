import { StyledSelect, TableData, TableRow } from './reminders-page.styles';
import { add, format, parseISO } from "date-fns";
import { Checkbox, MenuItem, SelectChangeEvent } from '@mui/material';
import React from 'react';

const BirthdayTableRow = (props: any) => {
    const birthdayInfo = props.birthdayInfo;
    // adjustment for timezone. This could probably be cleaned up so it serves eastern hemisphere as well
    const birthday = add(parseISO(props.birthdayInfo?.birthday), {days: 1});

    function handleReminderEnabledChange(event: React.ChangeEvent<HTMLInputElement>) {
        const updatedBirthday = {...birthdayInfo, reminderEnabled: event.target.checked};
        props.handleBirthdayUpdate(updatedBirthday);
    }

    function handlePrecedingDayChange(event: SelectChangeEvent<any>) {
        const updatedBirthday = {...birthdayInfo, precedingDaysForReminder: event.target.value};
        props.handleBirthdayUpdate(updatedBirthday);
    }

    return (
        <TableRow key={birthdayInfo.name}>
            <TableData>{birthdayInfo.name}</TableData>
            <TableData>{format(birthday, 'MMM d')}</TableData>
            <TableData>
                <StyledSelect onChange={(event) => handlePrecedingDayChange(event)} defaultValue={birthdayInfo.precedingDaysForReminder == null ? 1 : birthdayInfo.precedingDaysForReminder}>
                    <MenuItem value={0}>Day of</MenuItem>
                    <MenuItem value={1}>1 Day</MenuItem>
                    <MenuItem value={3}>3 Days</MenuItem>
                    <MenuItem value={7}>7 Days</MenuItem>
                </StyledSelect>
            </TableData>
            <TableData>
                <Checkbox checked={birthdayInfo.reminderEnabled} onChange={handleReminderEnabledChange} color="default" />
            </TableData>
        </TableRow>
    )
}

export default BirthdayTableRow;