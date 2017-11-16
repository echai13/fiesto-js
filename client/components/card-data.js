import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {submitCard} from '../store'

const CardData = props => {
  const { handleSubmit, user } = props
  return (
    <form onSubmit={(evt) => { evt.preventDefault(); handleSubmit(user, evt.target.cardNumber.value, evt.target.expMonth.value, evt.target.expYear.value, evt.target.cvc.value)}}>
       <div>
         <label htmlFor="cardNumber"><small>Card Number</small></label>
         <input name="cardNumber" type="text" />
       </div>

       <div>
         <label htmlFor="expMonth"><small>Expiration Month</small></label>
         <select name="expMonth">
           { ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(month => (
             <option key={month}>{month}</option>
           ))}
         </select>
      </div>
      <div>
         <label htmlFor="expYear"><small>Expiration Year</small></label>
         <select name="expYear">
           {[2017, 2018, 2019, 2020, 2021, 2022, 2023].map(year => (
             <option value={year} key={year}>{year}</option>
           ))}
         </select>
       </div>
       <div>
         <label htmlFor="cvc"><small>CVC</small></label>
         <input name="cvc" type="text" className="form-control" />
       </div>
       <button type="submit">Submit!</button>
    </form>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(user, cardNumber, expMonth, expYear, cvc) {
      dispatch(submitCard({user, cardNumber, expMonth, expYear, cvc}))
    }
  }
}

export default connect(mapState, mapDispatch)(CardData)
