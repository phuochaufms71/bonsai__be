import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
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
    country: {
        type: String,
        require: true
    },
    province: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    commune: {
        type: String,
        require: true
    },
    hamlet: {
        type: String,
        require: true
    },
    more: {
        type: String,
        require: true
    },
})

const Address = mongoose.model("address", addressSchema);

export default Address;