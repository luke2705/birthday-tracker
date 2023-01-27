import { Birthday, BirthdayInfoContainer, ChipContainer, FirstLine, Name, ProfilePictureContainer } from './birthday-chip.styles';
import React from 'react';
import ProfilePicture from './svgs/profile-picture';
import { add, parseISO } from 'date-fns';
import { formatBirthday, getDisplayAge } from './utils/dates';


const BirthdayChip = (props:any) => {
    // adjustment for timezone. This could probably be cleaned up so it serves eastern hemisphere as well
    const birthday = add(parseISO(props.birthdayInfo?.birthday), {days: 1});
    const comparisonBirthday = add(parseISO(props.comparisonBirthday), {days: 1});

    return (
        <ChipContainer onClick={props.onClick} className={props.isSelected ? 'selected' : ''}>
            <ProfilePictureContainer>
                <ProfilePicture/>
            </ProfilePictureContainer>

            <BirthdayInfoContainer>
                <FirstLine>
                    <Name>{props.birthdayInfo?.name}</Name>
                    <span>{getDisplayAge(birthday, comparisonBirthday)}</span>
                </FirstLine>
                <Birthday>{formatBirthday(birthday)}</Birthday>
            </BirthdayInfoContainer>
        </ChipContainer>
    )
}

export default BirthdayChip;