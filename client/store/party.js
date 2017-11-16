import axios from 'axios'

const defaultSingleParty = {}
const GET_SINGLE_PARTY = 'GET_SINGLE_PARTY'

const getSingleParty = party => ({ type: GET_SINGLE_PARTY, party })

export const fetchSingleParty = partyId =>
  dispatch =>
    axios.get(`/api/parties/${partyId}`)
      .then(party => dispatch(getSingleParty(party.data)))
      .catch(err => console.log(err))

export const payForParty = (partyId, user, passcode, price) =>
  dispatch =>
    axios.put(`/api/parties/${partyId}`, {user, passcode, price})
      .then(party => dispatch(getSingleParty(party.data)))
      .catch(err => console.log(err))

export default function (state = defaultSingleParty, action) {
  switch (action.type) {
    case GET_SINGLE_PARTY:
      return action.party
    default:
      return state
  }
}
