import React from "react"
import {connect} from "react-redux"
import {ReactComponent as Logo} from "../../assets/crown.svg";
import {auth} from "../../firebase/firebase.utils"

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selector";
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {createStructuredSelector} from "reselect";
import {HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer} from "./header.styles";

const Header = ({currentUser, hidden}) =>
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/content'>
                CONTENT
            </OptionLink>
            {
                currentUser ?
                    <OptionDiv onClick={() => auth.signOut()}> SIGN OUT </OptionDiv>
                    :
                    <OptionLink to='sign-in'>SIGN IN</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {hidden ? '' : <CartDropdown/>}
    </HeaderContainer>

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
