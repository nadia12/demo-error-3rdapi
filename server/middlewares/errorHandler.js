function errorHandler(err, req, res, next){
  console.log(err, "<<< errorHandler")
  // console.error(err.stack)
  // res.status().json

  let statusCode = ''
  let errorMessage = ''
  let errorCode = ''

  switch(err.name){
    case 'TOKEN_ERROR':
      statusCode = 404
      errorCode = err.name
      errorMessage = 'Token Not Found'
      break
    case 'NOT_FOUND_ERROR':
      statusCode = 404
      errorCode = err.name
      errorMessage = err.message || 'Data not found'
      break
    case 'AUTHENTICATION_FAILED':
      statusCode = 401
      errorCode = err.name
      errorMessage = 'Authencation error!'
      break
    case 'SequelizeValidationError':
      statusCode = 400
      errorCode = 'VALIDATION_ERROR'

      const validationErrors = []

      err.errors.forEach(e => {
        validationErrors.push(e.message)
      });

      errorMessage = validationErrors
      break
    default:
      statusCode = 500
      errorMessage = 'internal error server'
      errorCode = 'INTERNAL_ERROR_SERVER'
  }

  res.status(statusCode).json({
    errorCode,
    message: errorMessage
  })
}

module.exports = errorHandler