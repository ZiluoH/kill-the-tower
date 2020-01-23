import { connect } from 'react-redux';
import { fetchStarterCards } from '../../actions/card_actions';
import Map from './map';

const mapStateToProps = (state) => {
    return {
        // tweets: Object.values(state.tweets.user),
        // currentUser: state.session.user
        cards: state.cards.starter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchStarterCards: () => dispatch(fetchStarterCards())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);