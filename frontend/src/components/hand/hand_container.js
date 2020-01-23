import {connect} from 'react-redux'
import Hand from './hand'

const mapStateToProps = {cards} => {
    return {
        cards
    }
}

export default connect(mapStateToProps, null)(Hand)

