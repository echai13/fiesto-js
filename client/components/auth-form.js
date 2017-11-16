import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        { name === 'signup' &&
        <span>
          <div>
            <label htmlFor="firstName"><small>First Name</small></label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="lastName"><small>Last Name</small></label>
            <input name="lastName" type="text" />
          </div>
          <div>
            <label><small>Date of Birth</small></label>
            <select name="month">
              { ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select name="day">
              { ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select name="year">
              { ['1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995'].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </span>
        }
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName && evt.target.firstName.value
      const lastName = evt.target.lastName && evt.target.lastName.value
      const month = evt.target.month && evt.target.month.value
      const day = evt.target.day && evt.target.day.value
      const year = evt.target.year && evt.target.year.value

      if (formName === 'login') dispatch(auth(email, password, formName))
      else dispatch(auth(email, password, formName, firstName, lastName, month, day, year))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
