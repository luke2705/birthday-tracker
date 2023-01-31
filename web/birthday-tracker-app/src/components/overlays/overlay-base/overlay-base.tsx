import { ContentPadding, OverlayContainer, Shroud, TitleText } from './overlay-base.styles';

const OverlayBase = (props: any) => {
    const stopPropagation = (event: React.MouseEvent) => {
        // catch the click so it doesn't propagate up to the ClickedOutsideOfModal handler
        event.stopPropagation();
    };

    return (
        <Shroud className={props.isVisible ? 'visible' : 'hidden'} onClick={props.closeOverlay}>
            <OverlayContainer onClick={stopPropagation}>
                <TitleText>{props.titleText}</TitleText>
                <ContentPadding>
                    { props.children }
                </ContentPadding>
            </OverlayContainer>
        </Shroud>
    );
};

export default OverlayBase;