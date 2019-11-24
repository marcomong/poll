const log = require('../configuration/logger')
const db = require('./PollSchema')

class Poll {
  constructor(question, answers, votes = [], _id = null, userId = null, code = null) {
    this.question = question
    this.answers = answers
    this.code = code
    this.votes = votes == null ? [] : votes
    this._id = _id
    this.userId = userId
  }

  get numberOfVotes() {
    return this.votes.length
  }

  get answerPercentages() {

    var mapping = new Map(this.answers.map((a) => {
      a.totVotes = 0
      return [a.id, a]
    }))

    let totVotes = 0
    this.votes.forEach((element) => {
      var elementMap = mapping.get(element.answerId)
      elementMap.totVotes +=1
      mapping.set(element.answerId, elementMap)
      totVotes += 1
    })
    
    let answersWithPercentage = []

    mapping.forEach((obj, key, map) => {
      obj.percentage = obj.totVotes / totVotes * 100
      let objPercentage = {
        value: obj.value,
        percentage: obj.percentage
      }
      answersWithPercentage.push(objPercentage)
    })

    return answersWithPercentage
  }
}

module.exports = Poll