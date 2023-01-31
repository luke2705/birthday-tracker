import styled from 'styled-components';
import {Select} from '@mui/material';

export const PageContainer = styled.div`
    padding: 30px;
`;

export const TopPanel = styled.div`
    padding-bottom: 20px;
    border-bottom: 4px solid orange;
`;

export const Title = styled.h1`
    margin-bottom: 10px;
`;

export const SubTitle = styled.p`
    width: 500px;
    margin: 0 auto 30px;
`;

export const SaveRemindersButton = styled.button`
    padding: 15px;
    margin: 0 0 20px 20px;
`;

export const BirthdayRemindersTable = styled.table`
    text-align: start;
    border: 1px solid lightgray;
    margin: 35px auto;
    border-radius: 8px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const TableHeaders = styled.tr`
    font-weight: 600;
    text-decoration: underline;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
    background: #4a5b7eb3;
    }
`;

export const TableData = styled.td`
    font-size: 26px;
    padding: 10px 45px;
    text-align: center;
`;

export const StyledSelect = styled(Select)`
    width: 100px;
`;
