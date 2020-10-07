const   express          = require('express')
const itemCtl = require('./controllers/item.ctl')
        app              = express()
        cors             = require('cors')
        parser           = require('body-parser')
        port             = process.env.PORT || 3000

app.set('port', port)
app.use(cors())
app.use(parser.json({extended : true}))
app.use('/', express.static('./public'))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Request-Method", "PUT, DELETE, GET, POST")
    res.header("HTTP/1.1 200 OK")
    res.set("Content-Type", "application/json")
    next()
});

/** items routes */
app.get('/getItems', itemCtl.getItems)
app.get('/getItemByID/:_id', itemCtl.getItemByID)
app.put('/updateItem/:_id', itemCtl.updateItem)
app.post('/addItem', itemCtl.addItem)
app.delete('/deleteItem', itemCtl.deleteItem)
app.put('/withdrawItem', itemCtl.withdrawItem)
app.put('/depositItem', itemCtl.depositItem )

const server = app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.all('*', (req, res) => {
    res.status(404).send(`{"success": false, "message": "Bad Route"}`)
})