const log = require('../configuration/logger')
const PollSchema= require('../models/PollSchema')
const Poll = require('../models/Poll')
const Response = require('../models/Response')

function save (req, res) {
  const { body } = req
  const question = body.question
  const answers = body.answers

  let newPoll = new Poll(question, answers)
  return PollSchema.savePoll(newPoll)
    .then((doc) => {
      newPoll.code = doc.code
      newPoll._id = doc._id
      return new Response(res, 200, 'Poll saved', newPoll).send()
    })
    .catch((err) => {
      return new Response(res, 500, err.message).send()
    })
}

function findByCode (req, res) {
   let code = req.query.code

   PollSchema.findByCode(code)
    .then(doc => {
      let poll = new Poll(doc.question, doc.answers, doc.votes, doc._id, null, doc.code)
      return new Response(res, 200, 'Found poll', poll).send()
    })
    .catch((err) => {
      return new Response(res, 500, err.message).send()
    })
}

function vote (req, res) {
  const { body } = req

  const pollCode = body.code
  const votingUserId = body.fingerPrint == null ? 'userFingerPrintTest' : body.fingerPrint
  const answers = body.answers

  PollSchema.addVotes(pollCode, votingUserId, answers)
    .then(doc => {
      if(!doc) {
        return new Response(res, 400, `Poll Code ${pollCode} does not exists or you have already voted`).send()
      }
      const poll = new Poll(doc.question, doc.answers, doc.votes, doc._id, null, doc.code)
      return new Response(res, 200, 'Vote added', poll).send()
    })
    .catch(err => {
      return new Response(res, 500, err.message).send()
    })
}

function getPollStatistics (req, res) {
  let code = req.query.code

  PollSchema.findByCode(code)
    .then(doc => {
      if(!doc) {
        return new Response(res, 400, `Poll Code ${pollCode} does not exists or you have already voted`).send()
      }
      let poll = new Poll(doc.question, doc.answers, doc.votes, doc._id, null, doc.code)
      let pollStatistics = {
        code: poll.code,
        statistics: poll.answerPercentages,
        question: poll.question,
        votes: poll.numberOfVotes
      }

      return new Response(res, 200, 'Got Statistics', pollStatistics).send()
    })
    .catch(err => {
      return new Response(res, 500, err.message).send()
    })
}


module.exports.save = save
module.exports.findByCode = findByCode
module.exports.vote = vote
module.exports.getPollStatistics = getPollStatistics