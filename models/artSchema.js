const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    item: Array,
    name: String,
    email: String,
    phone: String,
    addres: String,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order; 

