import styled from 'styled-components';

export const ProfilePictureContainer = styled.div`
    border-radius: 50%;
    background: lightgray;
    width: 83px;
    height: 60px;
    margin-right: 10px;
`;

export const ChipContainer = styled.span`
    display: inline-flex;
    padding: 15px;
    border: 1px solid gray;
    border-radius: 20px;
    transition: box-shadow 500ms, border-color 500ms, transform 500ms linear;
    box-shadow: none;
    
    @media (min-width: 500px) {
        :hover, &.selected {
            transform: translateY(-10px);
            box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
            cursor: pointer;
        } 
    }
    
    &.selected {
        transform: translateY(-10px);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        cursor: pointer;
    }
    
    &.selected {
        border-color: purple;
    }
    
    :not(:last-child) {
        margin-bottom: 20px;
        @media (min-width: 500px) {
            margin-right: 20px;   
        }
    }
`;

export const BirthdayInfoContainer = styled.div`
    text-align: start;
    width: 100%;
`;

export const FirstLine = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`;

export const Name = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 10px;
    text-transform: capitalize;
`;

export const XButton = styled.span`
    font-size: 20px;
    font-family: cursive;
`;

export const Birthday = styled.span`
    text-align: start;
    font-size: 14px;
`;
