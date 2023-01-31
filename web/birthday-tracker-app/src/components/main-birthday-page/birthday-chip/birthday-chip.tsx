import {
    Birthday,
    BirthdayInfoContainer,
    ChipContainer,
    FirstLine,
    Name,
    ProfilePictureContainer,
    XButton
} from './birthday-chip.styles';
import React, { useState } from 'react';
import DefaultProfilePicture from './default-profile-picture';
import { add, parseISO } from 'date-fns';
import { formatBirthday, getDisplayAge } from '../../../utils/dates.service';
import DeleteBirthdayOverlay from '../../overlays/delete-birthday-overlay/delete-birthday-overlay';


const BirthdayChip = (props:any) => {
    const [showDeleteBirthdayOverlay, setShowDeleteBirthdayOverlay] = useState(false);
    // adjustment for timezone. This could probably be cleaned up so it serves eastern hemisphere as well
    const birthday = add(parseISO(props.birthdayInfo?.birthday), {days: 1});
    const comparisonBirthday = add(parseISO(props.comparisonBirthday), {days: 1});

    function handleXClick (event: React.MouseEvent) {
        event.stopPropagation();
        setShowDeleteBirthdayOverlay(true);
    }

    return (
        <>
            <ChipContainer onClick={props.onClick} className={props.isSelected ? 'selected' : ''}>
                <ProfilePictureContainer>
                    <DefaultProfilePicture/>
                </ProfilePictureContainer>
                <BirthdayInfoContainer>
                    <FirstLine>
                        <span>
                            <Name>{props.birthdayInfo?.name}</Name>
                            <span>{getDisplayAge(birthday, comparisonBirthday)}</span>
                        </span>
                        <XButton onClick={handleXClick}>X</XButton>
                    </FirstLine>
                    <Birthday>{formatBirthday(birthday)}</Birthday>
                </BirthdayInfoContainer>
            </ChipContainer>
            <DeleteBirthdayOverlay
                isVisible={showDeleteBirthdayOverlay}
                name={props.birthdayInfo.name}
                onBirthdayRemove={props.onBirthdayRemove}
                closeOverlay={() => setShowDeleteBirthdayOverlay(false)}
            />
        </>
    );
};

export default BirthdayChip;