import { connect } from 'react-redux';
import { fetchAllMaps, createMap, updateMap, deleteMap } from '../../actions/map_actions';
import Play from './play';

const mapStateToProps = (state) => {
    const loggedInUserId = state.session.user ? state.session.user.id : null
    return {
        maps: Object.values(state.maps),
        currentUserId: loggedInUserId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllMaps: () => dispatch(fetchAllMaps()),
        createMap: (formData) => dispatch(createMap(formData)),
        updateMap: (formData) => dispatch(updateMap(formData)),
        deleteMap: (id) => dispatch(deleteMap(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);