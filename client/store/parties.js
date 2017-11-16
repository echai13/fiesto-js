import axios from 'axios'

const defaultParties = []
const GET_PARTIES = 'GET_PARTIES'

const getParties = parties => ({ type: 'GET_PARTIES', parties })

export const fetchParties = () =>
  dispatch =>
    axios.get(`/api/parties`)
      .then(parties => dispatch(getParties(parties.data)))
      .catch(err => console.log(err))

export const joinParty = (userId, partyId) =>
  dispatch =>
    axios.post(`/api/parties`, { userId, partyId })
      .then(party  => console.log(party.data))
      .catch(err => console.log(err))

export const fetchHostedParties = userId =>
  dispatch =>
    axios.get(`/api/parties/host/${userId}`)
      .then(parties => dispatch(getParties(parties.data)))
      .catch(err => console.log(err))


export default function (state = defaultParties, action) {
  switch (action.type) {
    case GET_PARTIES:
      return action.parties
    default:
      return state
  }
}
