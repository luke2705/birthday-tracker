import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavbarContainer = styled.div`
    width: 100%;
    text-align: start;
`;

const StyledLink = styled(NavLink)`
    color: white;
    margin-right: 20px;
    font-size: 24px;
    text-decoration: none;
    
    &.active, :hover {
        border-bottom: 1px solid white;
    }
`;

const Navbar = () => {
    return (
        <NavbarContainer>
            <StyledLink to={'/'}>Home</StyledLink>
            <StyledLink to={'/reminders'}>Reminders</StyledLink>
        </NavbarContainer>
    );
};

export default Navbar;