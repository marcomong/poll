const mongoose = require('mongoose')
const log = require('../configuration/logger')

let voteSchema = new mongoose.Schema({
  votingUserId: String,
  answerId: Number
})

let answerSchema = new mongoose.Schema({
  id: Number,
  value: String
})

let pollSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  question: String,
  answers: [answerSchema],
  votes: [voteSchema],
  code: Number
})

module.exports = Poll = mongoose.model('Poll', pollSchema)

function savePoll(poll) {
  let newPoll = new Poll({
    userId: null,
    question: poll.question,
    answers: poll.answers,
    votes: [],
    code: 1234 //getRandomInt(1000, 9999)
  })

  return newPoll.save()
}

function findByCode(code) {
  return new Promise((resolve, reject) => {
    return Poll.findOne({code})
      .then((poll) => {
        if(!poll) {
          reject({message: `Poll not found with code ${code}`})
        }
        resolve(poll)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function addVotes(pollCode, votingUserId, answers) {
  const filter = {code: pollCode, votes: { $elemMatch: { votingUserId: {$ne: votingUserId}}}}
  const votesToAdd = [...answers.map(a => {
    const vote = {
      votingUserId: votingUserId,
      answerId: a
    }
    return vote
  })]
  const update = { $push: { votes: votesToAdd} }
  return Poll.findOneAndUpdate(filter, update, {new: true})
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.findByCode = findByCode
module.exports.savePoll = savePoll
module.exports.addVotes = addVotes