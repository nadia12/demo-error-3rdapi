const jwt = require('jsonwebtoken')
const { User, Todo } = require('../models')

const authentication = (req, res, next) => {
  const { access_token } = req.headers
  if (!access_token) {
    next({ name: 'TOKEN_ERROR' })
    // res.status(404).json({ message: 'Token not found' })
  }
  else {
    var decode = jwt.verify(access_token, process.env.SECRET)
    req.userData = decode
    User.findByPk(req.userData.id)
      .then(data => {
        if (data) {
          next()
        }
        else {
          // next(err)
          console.log("invalid user")
          next({ name: 'NOT_FOUND_ERROR', message: 'User not found' })
          // res.status(404).json({ message: 'Invalid user' })
        }
      })
      .catch(err => {
        next({ name: 'AUTHENTICATION_FAILED' })
        // res.status(401).json({ message: err.message })
      })
  }
}

const authorization = (req, res, next) => {
  const { id } = req.params
  Todo.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'Todo not found' })
      } else if (data.userId !== req.userData.id) {
        res.status(403).json({ message: 'You are not authorized to do this' })
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal server error' })
    })
}

module.exports = {
  authentication, authorization
}