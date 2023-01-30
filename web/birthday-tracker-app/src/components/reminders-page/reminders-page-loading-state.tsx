import ContentLoader from 'react-content-loader';
import React from 'react';
import styled from 'styled-components';

const PagePadding = styled.div`
    padding-top: 20px;
`;

const RemindersPageLoadingState = () => {
    return (
        <PagePadding>
            <ContentLoader
                speed={2}
                width={1022}
                height={600}
                viewBox="0 0 1022 600"
                backgroundColor="#d9d9d9"
                foregroundColor="#ededed"
            >
                {[...Array(5)].map((_, index) => {
                    return <rect x="0" y={(90*index)} rx="4" ry="4" width="1022" height="75" />
                })}
            </ContentLoader>
        </PagePadding>
    )
}

export default RemindersPageLoadingState;