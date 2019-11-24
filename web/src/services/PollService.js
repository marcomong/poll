import { pollInstance } from './axios'

function create (payload) {
  return pollInstance.post('/save', payload)
}

function retrievePoll (code) {
  return pollInstance.get('/findPollByCode', { params: { 'code': code } })
}

function answerPoll (payload) {
  return pollInstance.post('/vote', payload)
}

function retrievePollStatistics (code) {
  return pollInstance.get('/statistics', { params: { 'code': code } })
}

export default {
  create,
  retrievePoll,
  answerPoll,
  retrievePollStatistics
}
