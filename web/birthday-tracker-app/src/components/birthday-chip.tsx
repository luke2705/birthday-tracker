import { Birthday, ChipContainer, FirstLine, Name, ProfilePictureContainer } from './birthday-chip.styles';
import React from 'react';
import ProfilePicture from './svgs/profile-picture';


const BirthdayChip = (props:any) => {
    return (
        <ChipContainer onClick={props.onClick}>
            <ProfilePictureContainer>
                <ProfilePicture/>
            </ProfilePictureContainer>

            <div>
                <FirstLine>
                    <Name>Owen</Name>
                    <span>3 years old</span>
                </FirstLine>
                <Birthday>Mar 9, 2020</Birthday>
            </div>
        </ChipContainer>
    )
}

export default BirthdayChip;