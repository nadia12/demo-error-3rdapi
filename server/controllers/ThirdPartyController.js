const axios = require('axios')
class ThirdPartyController {

  // localhost:3000/third-apis/movies
  static getMovies(req, res, next) {
    const api_key = '04c2d55d2cee60935f889ae6de4f097b'
    // process.env.TMDB_KEY

    const { region } = req.body

    axios
      .get('https://api.themoviedb.org/3/movie/upcoming', {
        params: {
          // querystring
          api_key: api_key,
          region: region
        },
      })
      .then(function (response) {
        console.log(response, 'AXIOS RESPONSE')
        res.status(200).json(response.data) // wajib!
      })
      .catch(function (error) {
        next(error)
      })

  }

}

module.exports = ThirdPartyController