const express = require('express')
require('./db/mongoose')
const app = express()
const cors = require('cors')
const port = 4000
const noteRouter = require('./routers/note')

app.use(express.json())
app.use(cors())
app.use(noteRouter)


app.listen(port, () => {
    console.log('server is up on port ' + port)
})