import { connect } from 'react-redux';
import Battle from './battle';

const mapStateToProps = (state) => {
    return {
        player: {
            hp: 80,
            hands: [1,2,3]
        },
        enemy:{
            name: "Enemy",
            hp: 20
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
    
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);