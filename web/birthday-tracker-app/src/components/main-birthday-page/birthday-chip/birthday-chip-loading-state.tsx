import { ChipContainer } from './birthday-chip.styles';
import React from 'react';
import ContentLoader from 'react-content-loader';

const BirthdayChipLoadingState = () => {
    return (
        <ChipContainer>

            <ContentLoader
                speed={2}
                width={302}
                height={60}
                viewBox="0 0 302 60"
                backgroundColor="#c7c7c7"
                foregroundColor="#ecebeb"
            >
                <circle cx="30" cy="30" r="30" />
                <rect x="78" y="8" rx="3" ry="3" width="288" height="16" />
                <rect x="78" y="36" rx="3" ry="3" width="152" height="16" />
            </ContentLoader>
        </ChipContainer>
    );
};

export default BirthdayChipLoadingState;