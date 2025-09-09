import troyAvatar from '../../../assets/avatars/troy.png';
import owenAvatar from '../../../assets/avatars/owen.png';
import trevorAvatar from '../../../assets/avatars/trevor.png';
import cassAvatar from '../../../assets/avatars/cass.png';
import kadeAvatar from '../../../assets/avatars/kade.png';
import chloeAvatar from '../../../assets/avatars/chloe.png';
import finleyAvatar from '../../../assets/avatars/finley.png';
import quinnAvatar from '../../../assets/avatars/quinn2.png';
import zoeyAvatar from '../../../assets/avatars/zoey.png';

interface DefaultProfilePictureProps {
    name?: string;
}
// from https://getavataaars.com/
const DefaultProfilePicture = ({ name = '' }: DefaultProfilePictureProps) => {
    // Select avatar based on name
    const getAvatarForName = (name: string) => {
        const lowerName = name.toLowerCase();
        switch (lowerName) {
            case 'troy':
                return troyAvatar;
            case 'owen':
                return owenAvatar;
            case 'trevor':
                return trevorAvatar;
            case 'cass':
                return cassAvatar;
            case 'kade':
                return kadeAvatar;
            case 'chloe':
                return chloeAvatar;
            case 'quinn':
                return quinnAvatar;
            case 'finley':
                return finleyAvatar;
            case 'zoey':
                return zoeyAvatar;
            default:
                return troyAvatar; // Default avatar if no match
        }
    };

    return (
        <img
            src={getAvatarForName(name)}
            alt={`${name || 'Default'} profile`}
            height="100%"
            width="100%"
            style={{ marginTop: '-9px' }}
        />
    );
};

export default DefaultProfilePicture;
