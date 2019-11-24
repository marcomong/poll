const express = require('express')
const router = express.Router()

const controller = require('../controllers/genericController')

// POST
router.post('/save', controller.save)
router.post('/vote', controller.vote)

// GET
router.get('/findPollByCode', controller.findByCode)
router.get('/statistics', controller.getPollStatistics)

module.exports = router