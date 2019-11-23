const log = require('../configuration/logger')
const db = require('./PollSchema')

class Poll {
  constructor(question, answers, votes = [], _id = null, userId = null) {
    this.question = question
    this.answers = answers
    this.code = null
    this.votes = votes == null ? [] : votes
    this._id = _id
    this.userId = userId
  }

  get numberOfVotes() {
    return this.votes.length()
  }

  getByCode(code) {
    log.info(`getting poll by code ${code}`)
    return db.findByCode(code)
  }

  async save() {
    log.info('saving new poll %o', this)
    return db.savePoll(this)
  }

  update() {
    log.info('updating new poll %o', this)
  }

  delete () {
    log.info('deliting poll %o', this)
  }
}

module.exports = Poll