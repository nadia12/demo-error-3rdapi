require('dotenv').config()
const express = require('express') // memakai package express
const app = express()
const port = process.env.PORT || 3000 //port untuk routing kita
//ga perlu secara explisit path index.js karna sudah otomatis ngemanggil index.js
const routes = require('./routes')

//untuk mengirim data pakai urlencoded true (string, array) | false (berbagai tipe)
app.use(express.urlencoded({extended : true}))

app.use (routes)
//app.get('/', (req, res) => res.send({status_code: 200, message :'Hello World!'}))

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))