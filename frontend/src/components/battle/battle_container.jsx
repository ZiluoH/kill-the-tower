import { connect } from 'react-redux';
import Battle from './battle';
import {fetchSmallBoss,
        fetchEliteBoss,
        fetchFinalBoss} from '../../actions/enemy_actions';

const mapStateToProps = (state) => {
    return {
      enemy:state.enemies[Math.floor(Math.random() * state.enemies.length)],
    };
};

const mapDispatchToProps = dispatch => {
    return {
      fetchSmallBoss: () => dispatch(fetchSmallBoss()),
      fetchEliteBoss: () => dispatch(fetchEliteBoss()),
      fetchFinalBoss: () => dispatch(fetchFinalBoss())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);