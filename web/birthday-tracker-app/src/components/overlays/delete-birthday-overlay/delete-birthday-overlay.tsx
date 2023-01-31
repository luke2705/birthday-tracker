import OverlayBase from '../overlay-base/overlay-base';
import { BIRTHDAYS_ROUTE } from '../../../utils/routes';
import {ButtonContainer, Button, DeleteButton} from './delete-birthday-overlay.styles';


const DeleteBirthdayOverlay = (props: any) => {

    function deleteBirthday() {
        const payload = {
            'name': props.name,
        };

        fetch(BIRTHDAYS_ROUTE, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(() => {
                props.onBirthdayRemove(props.name);
            },
            (error) => console.log('error: ', error)
            );
        props.closeOverlay();
    }


    return (
        <OverlayBase isVisible={props.isVisible} titleText='Delete Birthday?' closeOverlay={props.closeOverlay}>
            <p>Are you sure you want to delete {props.name}&apos;s birthday?</p>
            <ButtonContainer>
                <Button onClick={props.closeOverlay}>Cancel</Button>
                <DeleteButton onClick={deleteBirthday}>Delete</DeleteButton>
            </ButtonContainer>
        </OverlayBase>
    );
};

export default DeleteBirthdayOverlay;