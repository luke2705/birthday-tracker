import { StyledSelect, TableData, TableRow } from './reminders-page.styles';
import { format, parseISO } from "date-fns";
import { Checkbox, MenuItem, SelectChangeEvent } from '@mui/material';
import React from 'react';

const BirthdayTableRow = (props: any) => {
    const birthday = props.birthday;

    function handleReminderEnabledChange(event: React.ChangeEvent<HTMLInputElement>) {
        const updatedBirthday = {...birthday, reminderEnabled: event.target.checked};
        props.handleBirthdayUpdate(updatedBirthday);
    }

    function handlePrecedingDayChange(event: SelectChangeEvent<any>) {
        const updatedBirthday = {...birthday, precedingDaysForReminder: event.target.value};
        props.handleBirthdayUpdate(updatedBirthday);
    }

    return (
        <TableRow key={birthday.name}>
            <TableData>{birthday.name}</TableData>
            <TableData>{format(parseISO(birthday?.birthday as string), 'MMM d')}</TableData>
            <TableData>
                <StyledSelect onChange={(event) => handlePrecedingDayChange(event)} defaultValue={birthday.precedingDaysForReminder == null ? 1 : birthday.precedingDaysForReminder}>
                    <MenuItem value={0}>Day of</MenuItem>
                    <MenuItem value={1}>1 Day</MenuItem>
                    <MenuItem value={3}>3 Days</MenuItem>
                    <MenuItem value={7}>7 Days</MenuItem>
                </StyledSelect>
            </TableData>
            <TableData>
                <Checkbox checked={birthday.reminderEnabled} onChange={handleReminderEnabledChange} color="default" />
            </TableData>
        </TableRow>
    )
}

export default BirthdayTableRow;