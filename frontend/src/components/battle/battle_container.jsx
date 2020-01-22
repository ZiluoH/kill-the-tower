import { connect } from 'react-redux';
import Battle from './battle';

const mapStateToProps = (state) => {
    return {
        battle: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
    
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);