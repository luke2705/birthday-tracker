import styled from 'styled-components';

export const ButtonContainer = styled.div`
    display: flex;  
    justify-content: center;
    gap: 30px;
`;

export const Button = styled.button`
    text-align: center;
    width: 100px;
    padding: 10px;
    margin-top: 20px;
    align-self: center;
    background: white;
    color: #4a5b7e;
    border: 2px solid #4a5b7e;
    border-radius: 6px;
    font-size: 20px;
    cursor: pointer;
`;

export const DeleteButton = styled.button`
    width: 102px;
    text-align: center;
    padding: 11px;
    margin-top: 20px;
    align-self: center;
    background: red;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 20px;
    cursor: pointer;
`;