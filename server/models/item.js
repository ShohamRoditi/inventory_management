var mongoose    = require('mongoose'),
    inventory_item  = new mongoose.Schema({
        name:  String,
        description: String,
        count:  Number,
    });

var Item = mongoose.model('Item', inventory_item)
module.exports = Item