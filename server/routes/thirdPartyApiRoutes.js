const router = require('express').Router()
const thirdPartyController = require('../controllers/thirdPartyController')

router.get('/movies', thirdPartyController.getMovies)

module.exports = router