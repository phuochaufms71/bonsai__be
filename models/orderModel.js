import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    bonsaiOrder: {
        type: Object,
        require: true
    }
});

const Order = mongoose.model('orders', orderSchema);
export default Order;