import { connect } from 'react-redux';
import Battle from './battle';
import {fetchSmallBoss,
        fetchEliteBoss,
        fetchFinalBoss} from '../../actions/enemy_actions';

const mapStateToProps = (state) => {
    return {
      player: {
        hp: 80
      },
      enemy: {
        name: "Enemy",
        hp: 70,
        attack: 10,
        defend: 1
      }
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