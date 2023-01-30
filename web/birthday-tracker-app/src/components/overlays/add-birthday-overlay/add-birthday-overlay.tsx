import OverlayBase from '../overlay-base/overlay-base';
import { TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { add, format, startOfToday } from 'date-fns';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { BIRTHDAYS_ROUTE } from '../../../utils/routes';
import { Button, InputForm } from './add-birthday-overlay.styles';


const AddBirthdayOverlay = (props: any) => {
    const [birthDate, setBirthDate] = useState<Date | null>(startOfToday());

    function postBirthday(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const birthdayInfo = {
            'name': data.get('name'),
            'birthday': format((birthDate as Date), 'yyyy-MM-dd')
        };

        fetch(BIRTHDAYS_ROUTE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(birthdayInfo)
        })
        .then(() => {
            const timezoneAdjustedBirthday = add(birthDate as Date, {days: -1})
            props.onBirthdayAdd({...birthdayInfo, birthday: format(timezoneAdjustedBirthday, 'yyyy-MM-dd')});
        },
        (error) => console.log('error: ', error)
        )
        props.closeOverlay();
    }


    return (
        <OverlayBase isVisible={props.isVisible} titleText='Enter New Birthday Details' closeOverlay={props.closeOverlay}>
            <InputForm onSubmit={postBirthday}>
                <TextField label="Name" variant="outlined" required name="name"/>
                <br/>
                <LocalizationProvider dateAdapter={AdapterDateFns }>
                    <DesktopDatePicker
                        label="Birthday"
                        inputFormat="MM/dd/yyyy"
                        value={birthDate}
                        onChange={setBirthDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Button type={'submit'} value={'Submit'}/>
            </InputForm>
        </OverlayBase>
    )
}

export default AddBirthdayOverlay;