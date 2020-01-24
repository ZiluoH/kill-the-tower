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
      },
      deck: [
        {
          _id: "5e2775641c9d4400003f79f3",
          name: "Strike",
          cost: 1,
          img: "",
          action: "attack",
          type: "starter",
          description: "Deal 6 damage"
        },
        {
          _id: "5e2777981c9d4400003f79f5",
          name: "Defend",
          cost: 1,
          img: "",
          action: "defend",
          type: "starter",
          description: "Gain 5 shield"
        },
        {
          _id: "5e27797d1c9d4400003f79f6",
          name: "Barrier",
          cost: 2,
          img: "",
          action: "defend",
          type: "starter",
          description: "Gain 12 shield"
        },
        {
          _id: "5e2779e31c9d4400003f79f7",
          name: "Bash",
          cost: 2,
          img: "",
          action: "attack",
          type: "starter",
          description: "Deal 14 damage"
        },
        {
          _id: "5e277adb1c9d4400003f79f8",
          name: "Deflect",
          cost: 0,
          img: "",
          action: "defend",
          type: "common",
          description: "Gain 3 shield"
        },
        {
          _id: "5e277b341c9d4400003f79f9",
          name: "Claw",
          cost: 0,
          img: "",
          action: "attack",
          type: "common",
          description: "Deal 3 damage"
        }
      ]
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