const express = require('express');
const router = express.Router();
const groceryItemsModel = require("../models/groceryItemsModel");

router.post("/add", async function (req, res) {
    try {
        const additionResponse = await groceryItemsModel.create(req.body);
        console.log("additionResponse", additionResponse);
        res.send({ result: "item added successfully" });
    } catch (err) {
        console.log("error occured in adding item", err);
    }
})

router.get("/list", async function (req, res) {
    try {
        const groceryList = await groceryItemsModel.find({}, { __v: 0 });
    res.send({ result: groceryList });
    } catch (err) {
        console.log("error occured in adding item", err);
    }
});

router.put("/update", async function (req, res) {
    try {
        const groceryItemRecord = await groceryItemsModel.findOne({
            _id: req.body._id,
        });
        groceryItemRecord.isPurchased = true;
        console.log("groceryItemRecord", groceryItemRecord);
        await groceryItemRecord.save();
        res.send({ result: "Item updated successfully" });
    } catch(err) {
        console.log("error occured in adding the item", err);
    }
});

router.delete("/delete", async function(req, res) {
    try {
        await groceryItemsModel.deleteOne({_id: req.body._id});
        res.send({ result: "Item deleted successfully" });
    } catch (err) {
        console.log("Error occured in deleting the item", err);
    }
})

module.exports = router;