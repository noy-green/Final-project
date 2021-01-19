const exp = require('express')
const app = exp ()
require('./db')

app.use(exp.json())
app.use(require('cors')())

app.use('/admin', require('./routes/admin'))
app.use('/main', require('./routes/main'))
app.use('/user', require('./routes/user'))

app.listen(1000, () => console.log("the server is runing on port 1000"))