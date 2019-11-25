const mongoose = require('mongoose')
const log = require('../configuration/logger')

const randomSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const maxLimitIteration = 1679616

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
  code: String
})

module.exports = Poll = mongoose.model('Poll', pollSchema)

async function savePoll(poll) {
  let pollCode = await generatePollCode()
  let newPoll = new Poll({
    userId: null,
    question: poll.question,
    answers: poll.answers,
    votes: [],
    code: pollCode //getRandomInt(1000, 9999)
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
  const votesToAdd = [...answers.map(a => {
    const vote = {
      votingUserId: votingUserId,
      answerId: a
    }
    return vote
  })]

  return new Promise((resolve, reject) => {
    this.findByCode(pollCode)
    .then((poll) => {
      if (poll.votes.length == 0) {
        poll.votes =  votesToAdd
        resolve(poll.save())
      } else {
        let votingUserIdExists = poll.votes.filter(v => v.votingUserId == votingUserId).length > 0
        if(!votingUserIdExists) {
          poll.votes = [poll.votes, ...votingUserId]
          resolve(poll.save())
        }
        reject({message: `Ooops! Looks like you have already voted`})
      }
    })
    .catch((err) => {
      reject(err)
    })
  })
}

function generatePollCode(attemptNumber = 0) {
  let pollCode = randomString(4)
  let filter = { code: pollCode }
  return new Promise((resolve, reject) => {
    Poll.findOne(filter)
    .then((res) => {
      if (res == null) {
        return resolve(pollCode)
      } else {
        attemptNumber += 1
        if( attemptNumber > maxLimitIteration) {
          reject({message: 'Max number of poll reached'})
        }
        generatePollCode(attemptNumber)
      }
    })
    .catch((err) => {
      log.error('%o', err)
      reject(err)
    })
  })
}

function randomString(length) {
  var result = '';
  for (var i = length; i > 0; --i) result += randomSet[Math.floor(Math.random() * randomSet.length)];
  return result;
}

module.exports.findByCode = findByCode
module.exports.savePoll = savePoll
module.exports.addVotes = addVotes