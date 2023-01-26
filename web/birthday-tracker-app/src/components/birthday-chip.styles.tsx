import styled from 'styled-components';

export const ProfilePictureContainer = styled.div`
    border-radius: 50%;
    background: lightgray;
    width: 60px;
    height: 60px;
    margin-right: 10px;
`;

export const ChipContainer = styled.span`
    display: inline-flex;  
    padding: 15px;
    border: 1px solid gray;
    border-radius: 20px;
    transition: box-shadow 500ms, border-color 500ms, transform 500ms linear;
    
    :hover {
        transform: translateY(-10px);
        border-color: purple;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        cursor: pointer;
    }
    
    :not(:last-child) {
        margin: 0 20px 20px 0;   
    }
`;

export const FirstLine = styled.div`
    display: flex;
    align-items: flex-end;
`;

export const Name = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 10px;
    text-transform: capitalize;
`;

export const Birthday = styled.span`
    font-size: 14px;
`;
