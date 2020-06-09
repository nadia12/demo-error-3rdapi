require('dotenv').config()
const express = require('express') // memakai package express
const app = express()
const port = process.env.PORT || 3000 //port untuk routing kita
//ga perlu secara explisit path index.js karna sudah otomatis ngemanggil index.js
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use(routes)
app.use(errorHandler)

//app.get('/', (req, res) => res.send({status_code: 200, message :'Hello World!'}))

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))