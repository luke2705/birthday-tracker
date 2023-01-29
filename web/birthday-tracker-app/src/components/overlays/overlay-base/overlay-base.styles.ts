import styled from 'styled-components';
import COLORS from '../../../assets/colors';
import Z_INDEX from '../../../assets/z-index';

export const BORDER_RADIUS = '16px';

export const Shroud = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: ${Z_INDEX.MODAL};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    transition: all 200ms ease;
    
    &.visible {
        visibility: visible;
        opacity: 1;
    }
    
    &.hidden {
        visibility: hidden;
        opacity: 0;
    }
`;

export const OverlayContainer = styled.div`
    background: white;
    border-radius: ${BORDER_RADIUS};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const TitleText = styled.h1`
    background-color: ${COLORS.DarkIris};
    color: white;
    padding: 20px;
    border-radius: ${BORDER_RADIUS} ${BORDER_RADIUS} 0 0;
`;

export const ContentPadding = styled.div`
    padding: 40px 80px;
`;