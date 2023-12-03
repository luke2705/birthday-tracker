import styled from 'styled-components';

export const MainContentContainer = styled.div`
    @media (min-width: 450px) {
        padding: 0 80px;
    }
`;

export const BirthdayChipContainer = styled.div`
    @media (min-width: 450px) {
        padding: 80px 40px 50px;
    }
    @media (max-width: 450px) {
        padding: 20px 20px 50px;
    }
    border-bottom: 4px solid orange;
    margin-bottom: 40px;
`;

export const ClickingInstructions = styled.p`
    margin-top: 20px;
`;

export const AddBirthdayButton = styled.button`
    margin-bottom: 20px;
`;