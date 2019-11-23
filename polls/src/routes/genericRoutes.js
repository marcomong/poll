const express = require('express')
const router = express.Router()

const controller = require('../controllers/genericController')

// POST
router.post('/save', controller.save)
router.post('/vote', controller.vote)

// GET
router.get('/findByCode', controller.findByCode)

module.exports = router