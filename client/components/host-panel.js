import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { fetchHostedParties, fetchSingleParty } from '../store'

class HostPanel extends React.Component {

  componentDidMount() {
    this.props.getHostedParties(this.props.userId)
  }

  render() {
    const { parties, userId, getSingleParty } = this.props
    return (
      <div>
        { parties.map(party => (
          <div key={party.id}>
            <Link to={`/${userId}/${party.id}`} onClick={() => getSingleParty(party.id)}>
              <h3>Name: {party.name}</h3>
            </Link>
            <h5>Price: {party.price}</h5>
            <p>Description: {party.description}</p>
            <p>Number of RSVP: {party.attendees ? party.attendees.length : 0}</p>
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
    getHostedParties(userId) {
      dispatch(fetchHostedParties(userId))
    },
    getSingleParty(partyId) {
      dispatch(fetchSingleParty(partyId))
    }
  }
}

export default connect(mapState, mapDispatch)(HostPanel)
