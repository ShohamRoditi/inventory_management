const   Item      = require('../models/item.js')

function withdrawOrdeposit (req, res, result, operator) {
    const {_id = null, amount = 0} = req.query
            if(result){
                const count = result.count
                newCount = operator === "-" ? count - Number(amount) : count + Number(amount)
                const item = new Item({_id: _id, name: result.name, description: result.description, count:newCount})
                opts = {runValidators: true}
                if (newCount < 0) {
                    res.status(200).send(`{"result": "Failure","params": "${newCount}", "error": "the updated count is negative" }`)
                    return
                }
                    
                item.updateOne(item, opts).then((result) => {
                    if(result && result.nModified > 0)
                        res.status(200).send(`{"result": "Success", "params": ${JSON.stringify(item)}}`)
                    else
                        res.status(200).send(`{"result": "Failure", "params":{"id": "${req.query._id}", "update": ${JSON.stringify(item)}}}`)

                },
                (err) =>{
                    console.log(err)
                    res.status(404).send(`{"result": "Failure", "params":{"name": "${name}", "description": "${description}", "count": "${count}"}, "error": ${JSON.stringify(err)}}`)
                })
            }
            else 
                res.status(404).send(`{"result": "Failure", "error": "item is not exists.", "params": "${result}"}`)

}

module.exports = {
    /** get all items */
    getItems: async (req, res) => {
        Item.find({}).then( (result) => {
            if(result) {
                console.log('send items to front')
                res.status(200).send(JSON.stringify(result))
            }
            else 
                res.status(200).send(`{"result": "Failure", "error": "items  are empty.", "params": "${result}"}`)
       },
       err => {
           res.status(404).send(`{"Failure": "No Documents Were Found", "error": ${JSON.stringify(err)}}`)
       })
    },
    /** Get item by id */
    getItemByID: async (req, res) => {
        const id  = req.params
        Item.find(id).then( (result) => {
            if(result.length)
                res.status(200).send(JSON.stringify(result))
            else 
                res.status(200).send(`{"result": "Failure", "error": "item is not exists.", "params": "${result}"}`)
       },
       (err) =>{
           res.status(404).send(`{"Failure": "No Documents Were Found", "error": ${JSON.stringify(err)}}`)
       })
    },
    /** Updates an item */
    updateItem: async (req, res) => {
        const query = req.params,
              {name = null , description = null , count= 0} = req.body,
              update     = {name: name, description: description, count: count}
              opts       = {runValidators: true, useFindAndModify: false, new: true}

        Item.updateOne(query, update, opts).then( result => {
            if(result.nModified === 0){
                res.status(200).send(`{"result": "Failure", "params":{"_id": "${req.params._id}", "name": "${update.name}", "description": "${update.description}", "count": "${update.count}"}}`)
                return
            }

            res.status(200).send(`{"result": "Success",  "params":{"_id": "${req.params._id}", "name": "${update.name}", "description": "${update.description}", "count": "${update.count}"}}`)
         }, err =>{
            res.status(404).send(`{"result": "Failure", "params":{"id": "${req.params._id}", "update": ${JSON.stringify(update)}}, "error": ${JSON.stringify(err)}}`)
         })

         //another option
        //  Item.findOneAndUpdate(query, update, opts).then(result => {
        //      console.log('update',result)
        //     if(result)
        //         res.status(200).send(`{"result": "Success", "params": ${JSON.stringify(result)}}`)
        //     else
        //         res.send(`{"result": "Failure", "error": "item is not exists.", "params": "${result}"}`)
        // },
        // (err) =>{
        //     res.status(404).send(`{"Failure": "No Documents Were Found", "error": ${JSON.stringify(err)}}`)
        //  })
    },
      /** Adds a new item */
      addItem: async (req, res) => {
        const { name = null, description = null, count = 0} = req.body
            const item = new Item({name, description, count})

        item.save().then( (result) => {
            res.status(200).send(`{"result": "Success", "params": ${JSON.stringify(result)}}`)
        },
        (err) =>{
            console.log(err)
            res.status(404).send(`{"result": "Failure", "params":{"name": "${name}", "description": "${description}", "count": "${count}"}, "error": ${JSON.stringify(err)}}`)
        })
    },
    /** delete an item */
    deleteItem: async (req, res) => {
        console.log('test')
        const {_id = null} = req.query
        console.log(_id)
        console.log(req.query)
          
        Item.findOneAndDelete({_id: _id}).then(result => {
            if(result)
                res.status(200).send(`{"result": "Success", "params": ${JSON.stringify(result)}}`)
            else
                res.send(`{"result": "Failure", "error": "item is not exists.", "params": "${result}"}`)
        },
        (err) =>{
            res.status(404).send(`{"Failure": "No Documents Were Found", "error": ${JSON.stringify(err)}}`)
        })
    },
    /** withdraw an  item */
    withdrawItem: (req, res) => {
        const {_id = null, amount = 0} = req.query
        Item.findOne({_id}).then( (result) => {
            withdrawOrdeposit(req, res, result, "-" )
        },
        (err) =>{
            res.status(404).send(`{"Failure": "No Documents Were Found", "error": ${JSON.stringify(err)}}`)
        })
    },

    /** deposit  an item */
    depositItem: (req, res) => {
        const {_id = null, amount = 0} = req.query
        Item.findOne({_id}).then( (result) => {
            withdrawOrdeposit(req, res, result, " + ")
        },
        (err) =>{
            res.status(404).send(`{"Failure": "No Documents Were Found", "error": ${JSON.stringify(err)}}`)
        })
    }
}