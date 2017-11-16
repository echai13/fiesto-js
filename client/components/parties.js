import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { fetchParties, joinParty } from '../store'

class Party extends React.Component {

  componentDidMount() {
    this.props.getParties()
  }

  render() {
    const { parties, userId } = this.props
    return (
      <div className="row">
        { parties && parties.map(party => (
          <div className="col-md-4" key={party.id}>
            <h3>Name: {party.name}</h3>
            <h5>Price: {party.price}</h5>
            <p>Description: {party.description}</p>
            <p>Posted by: {party.user.firstName}</p>
            <button type="submit" onClick={() => this.props.attendParty(userId, party.id)}>Attend</button>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    parties: state.parties,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getParties() {
      dispatch(fetchParties())
    },
    attendParty(userId, partyId) {
      dispatch(joinParty(userId, partyId))
    }
  }
}

export default connect(mapState, mapDispatch)(Party)
Party.propTypes = {
  getParties: PropTypes.func.isRequired,
  parties: PropTypes.array
}
