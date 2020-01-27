import { connect } from 'react-redux';
import MainPage from './main_page';
import { logout } from "../../actions/session_actions";

const mapStateToProps = (state) => ({
    loggedIn: state.session.isAuthenticated
})

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

