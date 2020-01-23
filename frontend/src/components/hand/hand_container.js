import {connect} from 'react-redux'
import Hand from './hand'

const mapStateToProps = ({cards}) => {
    const dummy = { cost: 1, name: "Strike", description: "Deal 6 damage", img: "" }

    return {
        cards: [dummy, dummy, dummy, dummy, dummy]
    }
}

export default connect(mapStateToProps, null)(Hand)

