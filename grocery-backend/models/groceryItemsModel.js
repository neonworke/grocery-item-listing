const mongoose = require('mongoose');
const groceryItemsSchema = new mongoose.Schema(
    {
       itemName: String,
       isPurchased: Boolean
    },
    {
        collection: "groceryItemsCollection"
    } 
);

const model = mongoose.model('groceryItemsModel', groceryItemsSchema);
module.exports = model;