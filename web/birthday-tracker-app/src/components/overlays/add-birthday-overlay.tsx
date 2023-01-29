import OverlayBase from './overlay-base/overlay-base';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { startOfToday } from 'date-fns';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Button = styled.button`
    margin-top: 20px;
    padding: 10px;
`;

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const AddBirthdayOverlay = (props: any) => {
    const [birthDate, setBirthDate] = useState<Date | null>(startOfToday());
    function handleChange(newBirthDate: Date | null) {
        setBirthDate(newBirthDate)
    }

    return (
        <OverlayBase isVisible={props.isVisible} titleText='Enter New Birthday Details' closeOverlay={() => props.closeOverlay()}>
            <InputsContainer>
                <TextField id="outlined-basic" label="Name" variant="outlined" />
                <br/>
                <LocalizationProvider dateAdapter={AdapterDateFns }>
                <DesktopDatePicker
                    label="Birthday"
                    inputFormat="MM/dd/yyyy"
                    value={birthDate}
                    onChange={(date) => handleChange(date)}
                    renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
                <Button onClick={() => props.closeOverlay()}>Submit</Button>
            </InputsContainer>
        </OverlayBase>
    )
}

export default AddBirthdayOverlay;