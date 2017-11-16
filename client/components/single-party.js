import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { payForParty } from '../store'

const SingleParty = props => {
  const { singleParty, handleSubmit } = props
  return (
    <div>
      <h3>{ singleParty.name }</h3>
      <h5>Price: { singleParty.price }</h5>
      <h5>Attendees</h5>
      <table>
        <thead>
          <tr>
            <th>Name of Attendee</th>
            <th>Enter Passcode to Pay</th>
          </tr>
        </thead>
        <tbody>
          { singleParty.attendees && singleParty.attendees.map(attendee => (
            <tr key={attendee.id}>

                <td>{attendee.user.firstName} {attendee.user.lastName}</td>
                <td>{attendee.attending ? 'Paid. Attending.' :
                  <form onSubmit={(evt) => { evt.preventDefault(); handleSubmit(singleParty.id, attendee.user, evt.target.passcode.value, singleParty.price) }}>
                  <input type="text" name="passcode" />
                  <button type="submit">Pay</button>
                  </form>
                }</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapState = state => {
  return {
    singleParty: state.party
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(singlePartyId, attendee, passcode, price) {
      dispatch(payForParty(singlePartyId, attendee, passcode, price))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleParty)
