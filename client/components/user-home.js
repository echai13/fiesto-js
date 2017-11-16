import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import HostPanel from './host-panel'
import CardData from './card-data'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, user} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>

      { !user.cardAvail && <CardData /> }
      <h5>Your Hosted Parties</h5>
      <HostPanel />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
